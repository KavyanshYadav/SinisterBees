import { Request, Response, NextFunction } from 'express';
import ApiRespone from '../libs/ApiRespone';

export const CheckAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  CheckSessionAuthentication(req, res, next);
};

export const CheckSessionAuthentication = (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    return res.status(401).json(
      new ApiRespone(401, 'User not authorized', null, null, {
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'User not authenticated' },
      }),
    );
  } else {
    next();
  }
};
