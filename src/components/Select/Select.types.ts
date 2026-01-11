import React from "react";

type Value = string | number;

export type Item = {
  label: React.ReactNode;
  value: Value;
};

export interface ISelectProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: Value;
  onChange?: (value: Value) => void;
  items: Item[];
}
