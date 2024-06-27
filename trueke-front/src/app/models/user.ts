export interface IUser{
  id: number;
  name: string,
  surname: string,
  email: string,
  country?: string,
  city?: string,
  phone?: string,
  image?: string,
  password: string,
}

export type getUserResponse = Omit<IUser, 'password'>;
export type patchUserRequest = Omit<Partial<IUser>, 'id'>;
