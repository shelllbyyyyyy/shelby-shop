import defaultAxios, { AxiosPromise } from "axios";
import { Product } from "@shelby/db";
import { UpdateProductDTO } from "@shelby/dto";
import { useMutation } from "@tanstack/react-query";

import { ApiFn, MutationConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

type UpdateProductDTOWithFile = UpdateProductDTO & { imageFile?: File };

const UpdateProduct: ApiFn<
  UpdateProductDTOWithFile & { slug: string },
  AxiosPromise<Product>
> = (updateProductDTO, { axios = defaultAxios }) => {
  const { name, price, description, imageFile, slug } = updateProductDTO;

  const updateProductFormData = new FormData();

  if (name) {
    updateProductFormData.append("name", name);
  }

  if (price) {
    updateProductFormData.append("price", price.toString());
  }

  if (description) {
    updateProductFormData.append("description", description);
  }

  if (slug) {
    updateProductFormData.append("slug", slug);
  }

  if (imageFile) {
    updateProductFormData.append("product-image", imageFile);
  }

  return axios.patch(`/products/${slug}`, updateProductFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

type MutationFnType = typeof UpdateProduct;

export const useUpdateProductMutation = (
  config: MutationConfig<MutationFnType> = {}
) => {
  const { axios } = useApiClient();

  return useMutation({
    mutationFn: (body) => UpdateProduct(body, { axios }),
    ...config,
  });
};
