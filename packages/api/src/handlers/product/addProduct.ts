import defaultAxios, { AxiosPromise } from "axios";
import { Product } from "@shelby/db";
import { AddProductDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type AddProductDTOWithFile = AddProductDTO & { image: File | null };

const addProduct: ApiFn<AddProductDTOWithFile, AxiosPromise<Product>> = (
  addProductDTO,
  { axios = defaultAxios }
) => {
  const { name, price, description, slug, imageUrl, image } = addProductDTO;

  const addProductFormData = new FormData();

  if (name) {
    addProductFormData.append("name", name);
  }

  if (price) {
    addProductFormData.append("price", price.toString());
  }

  if (description) {
    addProductFormData.append("description", description);
  }

  if (slug) {
    addProductFormData.append("slug", name);
  }

  if (imageUrl) {
    addProductFormData.append("imageUrl", imageUrl);
  }
  if (image) {
    addProductFormData.append("product-image", image);
  }

  return axios.post("/products", addProductDTO, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof addProduct;

export const useAddProductMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addProduct(body, { axios }),
    ...config,
  });
};
