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
      try {
        if (!req.body.identity || !req.body.room) {
          return res.status(400).send('You need to send identity and room');
        }
        const identity: string = req.body.identity.toString();
        const room: string = req.body.room.toString();
        console.log(config);
        const token = videoToken(identity, room, config);
        this.sendTokenResponse(token, res);
      } catch (error) {
        console.log(error);
      }
    });
  }

  public getRoutes(): void {
    this.getToken();
  }
}
