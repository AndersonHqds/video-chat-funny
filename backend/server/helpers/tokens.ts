import * as AccessToken from 'twilio/lib/jwt/AccessToken';
import { VideoGrant } from 'twilio/lib/jwt/AccessToken';

const generateToken = (config: types.TwilioConfig): AccessToken => {
  console.log(config);
  return new AccessToken(config.twilio.accountSid, config.twilio.apiKey, config.twilio.apiSecret);
};

const videoToken = (identity: string, room: string, config: types.TwilioConfig): AccessToken => {
  const videoGrant = typeof room !== 'undefined' ? new VideoGrant({ room }) : new VideoGrant();
  const token: any = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};

export { videoToken };
