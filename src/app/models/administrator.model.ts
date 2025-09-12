import { Role } from './role.model';
import { Site } from './site.model';
import { User } from './user.model';
import { Subscription } from './subscription.model';

export interface Administrator extends User {
  phoneNumber: string;
  subscription: Subscription;
  manager?: Administrator;
  sites: Site[];
  role: Role;
}
