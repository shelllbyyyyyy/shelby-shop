export type ProductCardProps = {
  onClick?: () => void;
  id?: string | undefined;
  productName: string;
  desciprion: string | undefined;
  price: number | undefined;
  image: {
    src: string;
    alt: string;
  };
  slug: string | undefined;
};
