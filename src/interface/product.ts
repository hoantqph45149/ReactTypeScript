export interface IProduct {
  id?: number | string;
  title: string;
  thumbnail: string;
  price: number;
  brand: string;
  description: string;
  images: [string];
}

export type fromProduct = Pick<IProduct, "title" | "price" | "description">;
