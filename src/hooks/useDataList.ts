import useSWR from "swr";

type DataListFiltersOptions = {
  limit?: number;
  page?: number;
  search?: string;
};

type Data = object;

function fetchData({}: { filters: DataListFiltersOptions }) {
  return Promise.resolve([] as Data[]);
}

function useDataList({
  filters = { limit: 5 },
}: {
  filters?: DataListFiltersOptions;
} = {}) {
  const {
    data,
    isLoading: isLoadingFromHook,
    error,
    mutate,
  } = useSWR("data", () => fetchData({ filters: filters }));

  const tenders = data || [];
  const isLoading = isLoadingFromHook && !data;
  const isUpdating = isLoading && !!data;
  const noData = !isLoading && (!data || !tenders.length);

  return {
    tenders,
    error,
    isLoading,
    isUpdating,
    refresh: () => mutate(),
    noData,
  };
}

export default useDataList;
