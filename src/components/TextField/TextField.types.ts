import { TextFieldProps } from "react-aria-components";

import { IInputFieldProps } from "@/components/InputField";

export interface ITextFieldProps
  extends TextFieldProps,
    Omit<IInputFieldProps, "inputComponent" | "style"> {
  className?: string;
  placeholder?: string;
  error?: boolean;
  style?: React.CSSProperties;
  min?: number | string;
  max?: number | string;
}
