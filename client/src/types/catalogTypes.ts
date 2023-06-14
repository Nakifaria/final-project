export type StateType = {
    catalog: CatalogType[],
    category: CategoryType[]
  }

  export type CatalogType = {
    id: number;
    title: string,
  }

  export type CategoryType = {
    id: number;
    name: string,
    price: number,
    img: string
  }