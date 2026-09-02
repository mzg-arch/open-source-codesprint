export type AuthUser = {
  id: string;
  email: string;
  username: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  username: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type RegisterResponse = AuthUser & {
  createdAt: string;
};
