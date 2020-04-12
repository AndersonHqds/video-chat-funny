import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as pino from 'express-pino-logger';
import * as cors from 'cors';

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
    try {
      console.log('Firmezera');
      this.app = express();
      this.app.use(cors());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(bodyParser.json());
      this.app.use(pino());
    } catch (error) {
      console.log(error);
    }
  }

  private config(): void {
    try {
      this.port = process.env.PORT || ChatServer.PORT;
    } catch (error) {
      console.log(error);
    }
  }

  private listen(): void {
    try {
      this.app.listen(this.port, (): void => {
        console.log(`Express server is running on localhost:${this.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public getApp(): express.Application {
    return this.app;
  }
}
