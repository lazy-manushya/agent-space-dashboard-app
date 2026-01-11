"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import isObject from "lodash/isObject";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Config = {
  encode?: boolean;
  parseJson?: boolean;
  replaceHistory?: boolean;
};

const processRawValue = <T>(
  value: string,
  defaultValue: T,
  { parseJson, encode }: Config = {}
) => {
  if (value === null) {
    return defaultValue;
  }

  try {
    let procccedValue = value;
    if (encode) {
      procccedValue = atob(procccedValue);
    }

    if (parseJson) {
      return JSON.parse(procccedValue) as T;
    }

    return value as T;
  } catch {
    return value as T;
  }
};

/**
 * A custom hook that syncs state with a URL search parameter.
 * Supports string, number, boolean, and object values.
 * @param key The search parameter key to sync with.
 * @param defaultValue The default value for the state.
 * @returns A stateful value, and a function to update it.
 */
export function useParamState<T>(
  key: string,
  defaultValue: T,
  config: Config = {}
): [T, (newValue?: T, replaceHistory?: boolean) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;
  const paramValue = searchParams.get(key);
  const {
    encode = isObject(defaultValue),
    parseJson = true,
    replaceHistory = true,
  } = config;

  const value = useMemo(
    () =>
      processRawValue<T>(paramValue || "", defaultValue, { encode, parseJson }),
    [paramValue, defaultValue, encode, parseJson]
  );
  const [state, setState] = useState(value);

  const setParamState = useCallback(
    (newValue?: T, replaceHistory_?: boolean) => {
      try {
        setState(
          processRawValue<T>(newValue as string, defaultValue, {
            encode,
            parseJson,
          })
        );
        const newSearchParams = new URLSearchParams(searchParamsRef.current);

        if (newValue === undefined) {
          newSearchParams.delete(key);
        } else {
          let urlValue = parseJson
            ? JSON.stringify(newValue)
            : (newValue as string);

          if (encode) {
            urlValue = btoa(urlValue);
          }

          newSearchParams.set(key, urlValue);
        }

        const newUrl = [pathname, newSearchParams.toString()].join("?");

        const rh =
          replaceHistory_ !== undefined ? replaceHistory_ : replaceHistory;
        if (rh) {
          router.replace(newUrl);
        } else {
          router.push(newUrl);
        }
      } catch (err) {
        console.error("Error setting param state:", err);

        const newSearchParams = new URLSearchParams(searchParamsRef.current);
        if (newValue === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, JSON.stringify(newValue));
        }
      }
    },
    [defaultValue, encode, parseJson, pathname, key, router, replaceHistory]
  );

  //-------------------

  const stateRef = useRef(state);
  stateRef.current = state;
  useEffect(() => {
    const value_ = processRawValue<T>(value as string, defaultValue, {
      encode,
      parseJson,
    });
    if (JSON.stringify(stateRef.current) !== JSON.stringify(value_)) {
      setState(value_);
    }
  }, [value, defaultValue, config, encode, parseJson]);

  //-------------------

  return [value, setParamState];
}
