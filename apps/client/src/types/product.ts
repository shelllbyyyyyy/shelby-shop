export type ProductCardProps = {
  onClick?: () => void;
  id?: string | undefined;
  productName: string | undefined;
  desciprion: string | undefined;
  price: number | undefined;
  image: {
    src: string | undefined | null;
    alt: string | undefined;
    height: number | undefined;
    width: number | undefined;
  };
  slug: string | undefined;
};
