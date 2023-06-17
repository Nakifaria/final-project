import { CategoryType } from "./catalogTypes";

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
  isLoading: boolean;
  categoryItems: CategoryType[];
  setChoosenItem: React.Dispatch<React.SetStateAction<choosenItemType[]>>;
};

export type choosenItemType = {
  id: number;
  name: string;
  price: string;
};
