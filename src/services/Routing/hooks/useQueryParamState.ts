import {
  createParser,
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsFloat,
  parseAsHex,
  parseAsBoolean,
} from "nuqs";
import { useMemo } from "react";

// Utility to infer the correct nuqs parser for a value
function getPrimitiveParserForValue(value: unknown) {
  if (typeof value === "string")
    return parseAsString.withDefault(value as string);
  if (typeof value === "number" && Number.isInteger(value))
    return parseAsInteger.withDefault(value as number);
  if (typeof value === "number")
    return parseAsFloat.withDefault(value as number);
  if (typeof value === "boolean")
    return parseAsBoolean.withDefault(value as boolean);
  // Accept hex as string starting with 0x
  if (typeof value === "string" && /^0x[0-9a-fA-F]+$/.test(value))
    return parseAsHex.withDefault(parseInt(value as string, 16));
  if (Array.isArray(value)) {
    // Try to infer the item type from the default array
    const first = value[0];
    let parseItem: (s: string) => unknown = (s) => s;
    let serializeItem: (v: unknown) => string = (v) => String(v);
    if (typeof first === "number" && Number.isInteger(first)) {
      parseItem = (s) => (s === "" ? null : parseInt(s, 10));
      serializeItem = (v) => String(v);
    } else if (typeof first === "number") {
      parseItem = (s) => (s === "" ? null : parseFloat(s));
      serializeItem = (v) => String(v);
    } else if (typeof first === "boolean") {
      parseItem = (s) => s === "true";
      serializeItem = (v) => (v ? "true" : "false");
    } else if (typeof first === "string") {
      parseItem = (s) => s;
      serializeItem = (v) => String(v);
    }
    return createParser({
      parse(queryValue: string) {
        if (queryValue === "") return [];
        return queryValue.split(",").map(parseItem);
      },
      serialize(arr: unknown) {
        if (!Array.isArray(arr)) return "";
        return arr.map(serializeItem).join(",");
      },
    }).withDefault(value);
  }
  if (typeof value === "object" && value !== null) {
    // Encode/decode object as JSON string
    return createParser({
      parse(queryValue: string) {
        if (queryValue === "") return null;
        try {
          return JSON.parse(decodeURIComponent(queryValue));
        } catch {
          return null;
        }
      },
      serialize(obj: unknown) {
        if (obj === null || obj === undefined) return "";
        return encodeURIComponent(JSON.stringify(obj));
      },
    }).withDefault(value);
  }
  // fallback to string
  return parseAsString.withDefault(String(value));
}

// Create a parser schema from an object, using nuqs primitive parsers and withDefault
function createNuqsParserSchemaFromObject<T extends Record<string, unknown>>(
  obj: T,
) {
  const schema: Record<
    string,
    ReturnType<typeof getPrimitiveParserForValue>
  > = {};
  for (const key in obj) {
    schema[key] = getPrimitiveParserForValue(obj[key]);
  }
  return schema as {
    [K in keyof T]: ReturnType<typeof getPrimitiveParserForValue>;
  };
}

// Generic hook for any object shape, using useQueryStates and parser map
export function useQueryParamState<T extends Record<string, unknown>>(
  defaultObj: T,
  options?: Parameters<typeof useQueryStates>[1],
) {
  const parserMap = createNuqsParserSchemaFromObject(defaultObj);
  const [values, setValues] = useQueryStates(parserMap, options);

  const value = useMemo(
    () => ({
      values: values as T,
      setValues: setValues as React.Dispatch<React.SetStateAction<Partial<T>>>,
      nuqsParser: parserMap,
    }),
    [values, setValues, parserMap],
  );

  return value;
}
