export interface ICreateUser {
  name: string;
  mobile: string;
  email: string;
  gender: string;
  createdBy: string;
}

export interface IUpdateUser {
  name?: string;
  mobile?: string;
  email?: string;
  gender?: string;
}
