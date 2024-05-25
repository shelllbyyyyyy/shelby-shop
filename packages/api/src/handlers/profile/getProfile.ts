import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@shelby/db";
import defaultAxios, { AxiosPromise } from "axios";

import { ApiFn, ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { useApiClient } from "../../providers";

const profile = Prisma.validator<Prisma.UserDefaultArgs>()({});

export type Profile = Prisma.UserGetPayload<typeof profile>;

export const getProfile: ApiFn<{}, AxiosPromise<Profile>> = (
  {},
  { axios = defaultAxios }
) => {
  return axios.get("/profiles");
};

type QueryFnType = typeof getProfile;

type UseGetProfileQueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetProfileQuery = ({ config }: UseGetProfileQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["getProfile"],
    queryFn: () => getProfile({}, { axios }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...config,
  });
};
