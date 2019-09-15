export default function (req: any, res: any, next: any) {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
