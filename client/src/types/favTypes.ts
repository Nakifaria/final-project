
export type ItemsType = {
    items: TrueItemType[]
  }

  export type TrueItemType = {
    id: number;
    name: string,
    price: number,
    order_count: number,
    img: string,
    description: object
  }
