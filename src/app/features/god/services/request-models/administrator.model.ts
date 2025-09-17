import { Site, SubscriptionType } from "../../../../models";

export interface CreateAdministratorRequest {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    phoneNumber: string;
    sites: Site[];
    role: { id: string; roleType: string };
    isActive: boolean;
    subscriptionType: SubscriptionType;
  }