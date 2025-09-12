export interface Role {
  id: string;
  roleType: RoleType;
  createdAt: Date;
}

export enum RoleType {
  God = 'God',
  Admin = 'Admin',
  Manager = 'Manager'
}
