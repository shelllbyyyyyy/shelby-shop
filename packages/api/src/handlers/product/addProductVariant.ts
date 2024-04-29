import defaultAxios, { AxiosPromise } from "axios";
import { ProductVariant } from "@shelby/db";
import { AddProductVariantDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type AddProductVariantDTOWithFile = AddProductVariantDTO & {
  imageFile: File | null;
  slug: string | null;
};

const addProductVariant: ApiFn<
  AddProductVariantDTOWithFile,
  AxiosPromise<ProductVariant>
> = (payloadInput, { axios = defaultAxios }) => {
  const { name, price, imageFile, sku, label, slug } = payloadInput;

  const addProductFormData = new FormData();

  if (name) {
    addProductFormData.append("name", name);
  }

  if (price) {
    addProductFormData.append("price", price.toString());
  }

  if (sku) {
    addProductFormData.append("sku", sku);
  }

  if (label) {
    addProductFormData.append("label", label);
  }

  if (slug) {
    addProductFormData.append("slug", slug);
  }

  if (imageFile) {
    addProductFormData.append("product-image", imageFile);
  }

  return axios.post(`/products/${slug}`, payloadInput, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof addProductVariant;

export const useAddProductVariantMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => addProductVariant(body, { axios }),
    ...config,
  });
};
