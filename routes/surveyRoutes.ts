import _ from 'lodash';
import mongoose from 'mongoose';
import Path from 'path-parser';
import { URL } from 'url';
import requireCredits from '../middlewares/requireCredits';
import requireLogin from '../middlewares/requireLogin';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import Mailer from '../services/Mailer';

const Survey = mongoose.model('surveys');

export default (app: any) => {
  app.get('api/surveys', requireLogin, async (req: any, res: any) => {
    const surveys = await Survey.find({
      _user: req.user.id
    }).select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req: any, res: any) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req: any, res: any) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }: any) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            //@ts-ignore
            surveyId: match.surveyId,
            //@ts-ignore
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }: any) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req: any, res: any) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email: any) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
