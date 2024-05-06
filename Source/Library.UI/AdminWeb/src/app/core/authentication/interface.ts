export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  isAdmin?: boolean,
  isActive?: boolean,
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;

  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
  exp?: number;
  refreshToken?: string;
}
