export type ProductCardProps = {
  onClick?: () => void;
  id?: string | undefined;
  name: string;
  description: string | undefined;
  price: number | undefined;
  imageUrl: string[];
  slug: string | undefined;
};
