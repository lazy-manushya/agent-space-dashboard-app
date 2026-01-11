import { useQueryState, createParser } from "nuqs";
import set from "lodash/set";
import { useCallback } from "react";

// Generic types for useQueryParams hook
export type QueryParamsGetter<T> = T;
// (removed duplicate)
export type QueryParamsDotSetter<T> = (
  key: string,
  value: unknown
) => { updated: T };
export type QueryParamsSetter<T> = (newFilters: Partial<T> | ((prev: T) => Partial<T>)) => void;

export type UseQueryParamsReturn<T> = [
  QueryParamsGetter<T>,
  QueryParamsSetter<T>,
  QueryParamsDotSetter<T>
];

export function useQueryParams<T extends Record<string, unknown>>(
  initialValues: T
): UseQueryParamsReturn<T> {
  const jsonParser = createParser({
    parse: (val: string | null) => {
      if (!val) return initialValues;
      try {
        return JSON.parse(decodeURIComponent(val));
      } catch {
        return initialValues;
      }
    },
    serialize: (val: object) => encodeURIComponent(JSON.stringify(val)),
  });

  const [data, setData] = useQueryState(
    "filters",
    jsonParser.withDefault(initialValues)
  );

  // Set multiple keys
  const setFilters: QueryParamsSetter<T> = useCallback(
    (newFilters) => {
      if (typeof newFilters === "function") {
        const partial = newFilters(data as T);
        setData({ ...data, ...partial });
      } else {
        setData({ ...data, ...newFilters });
      }
    },
    [data, setData]
  );

  // Set a single key (supports dot notation for nested)
  const setFilterByKey = useCallback(
    (key: string, value: unknown) => {
      const updated = JSON.parse(JSON.stringify(data));
      set(updated, key, value);
      setData(updated);

      return {
        updated,
      };
    },
    [data, setData]
  );

  return [data as T, setFilters, setFilterByKey];
}
