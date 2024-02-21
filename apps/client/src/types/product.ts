export type ProductCardProps = {
  onClick?: () => void;
  id?: string | undefined;
  productName: string;
  desciprion: string | undefined;
  price: number | undefined;
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  slug: string | undefined;
};
