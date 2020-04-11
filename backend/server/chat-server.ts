import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as pino from 'express-pino-logger';

export class ChatServer {
  public static readonly PORT: number = 3001;
  private app: express.Application;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(pino);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private listen(): void {
    this.app.listen(this.port, (): void => {
      console.log('Express server is running on localhost:3001');
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
