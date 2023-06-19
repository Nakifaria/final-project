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

export type ChooseHandlerType = {
  (
    id: number,
    significance: number,
    currentItemId: number,
    currentItemName: string,
    currentItemPrice: number
  ): void;
};

export type modalConfiguratorProps = {
  openModal: boolean;
  categoryId: number;
  choosenCategory: choosenCategory[];
  primaryParts: number;
  primaryPartsTotalAmount: number;
  significance: number;
  categoryTitle: string;
  isLoading: boolean;
  categoryItems: CategoryType[];
  choosenItem: choosenItemType[];
  ChooseHandler: ChooseHandlerType;
};

export type choosenItemType = {
  id: number;
  name: string;
  price: string;
};

export type configuratorSliceType = {
  categoriesArr: category[];
  primaryParts: number;
  primaryPartsTotalAmount: number;
  progressbarStyle: object;
  choosenCategory: choosenCategory[];
  openModal: boolean;
  categoryId: number;
  significance: number;
  categoryTitle: string;
  choosenItem: choosenItemType[];
};
