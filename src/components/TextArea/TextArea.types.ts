import { TextAreaProps } from "react-aria-components";
import { IInputFieldProps } from "@/components/InputField";

export interface ITextAreaProps
  extends TextAreaProps,
    Omit<IInputFieldProps, "inputComponent" | "style"> {
  className?: string;
  placeholder?: string;
  error?: boolean;
  style?: React.CSSProperties;
}
