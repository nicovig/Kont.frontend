export interface Establishment {
  id: string;
  name: string;
  address: string;
  ipAddress: string;
  contactEmail: string;
  contactPhone: string;
  subscription: Subscription;
  admins: string[];
  delegates: string[];
  isActive: boolean;
  createdAt: Date;
  lastActivity?: Date;
}

export interface Subscription {
  id: string;
  establishmentId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  monthlyPoolsLimit: number;
  currentMonthPools: number;
  startDate: Date;
  endDate: Date;
  price: number;
  autoRenew: boolean;
}

export enum SubscriptionPlan {
  DERAU = 'derau',
  KLASEL = 'klasel',
  STROLL = 'stroll'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

