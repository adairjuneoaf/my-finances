// React-Query Imports
import { useQuery } from "react-query";

// API Imports
import { getAllTransactions } from "../services/api";

export const useReactQuery = () => {
  const { data, isLoading, isFetching } = useQuery("transactions", getAllTransactions, {
    cacheTime: 1000 * 60 * 1, // 1 Minute
    staleTime: 1000 * 60 * 1, // 1 Minute
    refetchInterval: 1000 * 60 * 1, // 1 Minute
    refetchOnWindowFocus: true,
    retry: false,
  });

  return { data, isLoading, isFetching };
};
