import { Administrator } from "./administrator.model";

export interface Subscription {
  id: string;
  subscriptionType: SubscriptionType;
  paidAt: Date;
  expiresAt: Date;
  administrator: Administrator;
}

export enum SubscriptionType {
  Deraou = 'Deraou',
  Klasel = 'Klasel',
  Stroll = 'Stroll'
}
