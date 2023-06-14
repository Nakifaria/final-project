export type StateType = {
    catalog: CatalogType[],
    category: CategoryType[],
    item: object
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

  export type ItemType = {
    id: number;
    name: string,
    price: number,
    img: string,
    description: object
  }