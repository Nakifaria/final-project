export type category = {
  id: number;
  title: string;
  amountItems: number;
  significance: boolean;
};
export type choosenCategory = {
  id: number;
  choosen: boolean;
};

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}
