"use client";

import TextField, { ITextFieldProps } from "@/components/TextField";
import Image from "@/components/Image";
import Button from "@/components/Button";

function SearchField(
  props: Pick<
    ITextFieldProps,
    | "id"
    | "value"
    | "onChange"
    | "onBlur"
    | "name"
    | "placeholder"
    | "aria-labelledby"
    | "aria-label"
    | "className"
  >
) {
  return (
    <TextField
      placeholder="Search"
      {...props}
      prependContent={
        <Image
          src="/assets/images/icons/search.svg"
          alt="Search"
          height={18}
          width={18}
        />
      }
      appendContent={
        props.value ? (
          <Button
            variant="ghost"
            onClick={() => {
              if (props.onChange) {
                props.onChange("");
              }
            }}
          >
            <Image
              src="/assets/images/icons/cross.svg"
              alt="Close"
              height={18}
              width={18}
            />
          </Button>
        ) : null
      }
    />
  );
}

export default SearchField;
