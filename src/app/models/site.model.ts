import { Administrator } from "./administrator.model";
import { Activity } from "./activity.model";

export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  state: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  description?: string;
  logo?: string;
  administrators: Administrator[];
  activities: Activity[];
}
