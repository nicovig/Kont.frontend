export interface JwtResponse {
  token: string;
  userId: string;
  role: string;
  email: string;
  firstname: string;
  lastname: string;
  expiresAt: Date;
}
