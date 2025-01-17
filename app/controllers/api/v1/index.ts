import { Request, Response, Router } from 'express';
import { CheckAuthentication } from '../../../middleware/CheckAuthentication';
const v1 = Router();

v1.get('/test', CheckAuthentication, (req: Request, res: Response) => {
  res.send('working');
});

export default v1;
