import {IUser} from "./user.js";

export type NewUserPostRequest = Pick<IUser,'name' | 'surname' | 'country' | 'email' | 'password'> & {
  password_confirmation: string
};

export type SigninPostRequest = Pick<IUser,'email' | 'password'>;

export interface SigninResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}
