import * as express from 'express';
import * as AccessToken from 'twilio/lib/jwt/AccessToken';

import { videoToken } from '../helpers/tokens';
import config from '../configs/config';

export class Routes {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  private sendTokenResponse = (token: AccessToken, res: express.Response): express.Response => {
    res.set('Content-Type', 'application/json');
    return res.send(
      JSON.stringify({
        token: token.toJwt(),
      }),
    );
  };

  private getToken(): void {
    this.app.post('/video/token', (req: express.Request, res: express.Response) => {
      const identity: string = req.query.identity.toString();
      const room: string = req.query.room.toString();
      const token = videoToken(identity, room, config);
      this.sendTokenResponse(token, res);
    });
  }

  public getRoutes(): void {
    this.getToken();
  }
}
