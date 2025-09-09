export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  pin: string;
  role: UserRole;
  poolId?: string;
  isActive: boolean;
  createdAt: Date;
  lastActivity?: Date;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  DELEGATE = 'delegate',
  USER = 'user'
}

export interface UserSession {
  userId: string;
  poolId: string;
  isConnected: boolean;
  lastSeen: Date;
}

