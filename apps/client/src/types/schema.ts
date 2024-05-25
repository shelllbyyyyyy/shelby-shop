export interface Cart {
  id: string;
  quantity: number;
  deletedAt?: Date | null;
  checkoutAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  productVariantId: string;
  ProductVariant: ProductVariant;
  userId: string;
  User: User;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  imageUrl: string;
  label: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  discount?: number;
  cart: Cart[];
  inventory: Inventory[];
  product: Product | null;
}

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  profilePictureUrl: string | null;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
  cart: Cart[];
  address: Address[];
}

export interface Address {
  id: string;
  user: User;
  userId: string;
  label: string;
  detail: string;
  googleMapsUrl: string;
  phoneNumber: string;
  recipientName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesOnProducts: CategoriesOnProducts[];
  productVariant: ProductVariant[];
}

export interface CategoriesOnProducts {
  categoryId: string;
  category: Category;
  productId: string;
  product: Product;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoriesOnProducts: CategoriesOnProducts[];
}

export interface Inventory {
  id: string;
  quantity: number;
  status: InventoryStatus;
  productVariantId: string;
  ProductVariant: ProductVariant;
}

export enum InventoryStatus {
  AVAILABLE = "AVAILABLE",
  ON_ORDER = "ON_ORDER",
  RESERVED = "RESERVED",
}
