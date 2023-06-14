export type category = {
  id: number;
  title: string;
  amountItems: number;
};

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}
