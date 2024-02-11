import { DefaultOptions, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error as AxiosError;

        if (err.response && err.response.status >= 500) {
          return;
        }
      }
    },
  }),
});
