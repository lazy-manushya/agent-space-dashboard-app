import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RASelect,
  SelectValue,
} from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import InputField from "@/components/InputField";
import Image from "@/components/Image";

import { ISelectProps } from "./Select.types";
import styles from "./Select.module.css";

function Select({
  className,
  label,
  onChange,
  placeholder,
  value,
  items= [],
}: ISelectProps) {
  return (
    <InputField
      className={className}
      inputComponent={
        <RASelect
          className={joinClassNames(styles.Select)}
          placeholder={placeholder}
          selectedKey={value}
          onSelectionChange={(value) => {
            if (value && onChange) {
              onChange(value.toString());
            }
          }}
        >
          <Label className="d-none">{label}</Label>
          <Button className={styles.Button}>
            <SelectValue className={styles.SelectValue} />
            <Image
              className={styles.Icon}
              src="/assets/images/icons/chevron_left.svg"
              alt="Info"
              height={20}
              width={20}
            />
          </Button>
          <Popover className={styles.Popover} offset={8}>
            <ListBox className={styles.ListBox}>
              {items.map(({ label, value }) => (
                <ListBoxItem key={value} className={styles.ListBoxItem}>
                  {label}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </RASelect>
      }
    />
  );
}

export default Select;
