export interface Subscription {
  id: string;
  subscriptionType: SubscriptionType;
  paidAt: Date;
  expiresAt: Date;
}

export enum SubscriptionType {
  Deraou = 'Deraou',
  Klasel = 'Klasel',
  Stroll = 'Stroll'
}
