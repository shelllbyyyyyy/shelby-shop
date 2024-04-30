import defaultAxios, { AxiosPromise } from "axios";
import { Prisma } from "@shelby/db";
import { useQuery } from "@tanstack/react-query";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const user = Prisma.validator<Prisma.UserDefaultArgs>()({});

type User = Prisma.UserGetPayload<typeof user>;

export const getAllUser: ApiFn<{}, AxiosPromise<User[]>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/user");
};

type QueryFnType = typeof getAllUser;

type UseGetAllUserQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllUserQuery = ({ config }: UseGetAllUserQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["user"],
    queryFn: () => getAllUser({}, { axios }),
    staleTime: 60 * 1000, // 60 seconds
    ...config,
  });
};
