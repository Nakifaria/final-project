export type category = {
  id: number;
  title: string;
  amountItems: number;
  significance: number;
};

export type choosenCategory = {
  id: number;
  choosen: boolean;
};

export type modalConfiguratorProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: number;
  setProgressbarStyle: React.Dispatch<React.SetStateAction<object>>;
  choosenCategory: choosenCategory[];
  setChoosenCategory: React.Dispatch<React.SetStateAction<choosenCategory[]>>;
  primaryParts: number;
  primaryPartsTotalAmount: number;
  setPrimaryParts: React.Dispatch<React.SetStateAction<number>>;
  significance: number;
  categoryTitle: string;
};

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}
