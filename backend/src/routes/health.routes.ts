import { Router, type Request, type Response } from 'express';

const healthRoutes = Router();

healthRoutes.get('/', (_request: Request, response: Response) => {
  response.status(200).json({
    status: 'OK',
    timestamp: `${new Date().toUTCString()}`
  });
});

export default healthRoutes;
