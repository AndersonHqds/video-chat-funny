export as namespace types;

export interface TwilioConfig {
  twilio: {
    accountSid: string;
    apiKey: string;
    apiSecret: string;
  };
}
