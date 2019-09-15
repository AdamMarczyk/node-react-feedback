import passport from 'passport';

export default (app: any) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req: any, res: any) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req: any, res: any) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req: any, res: any) => {
    res.send(req.user);
  });
};
