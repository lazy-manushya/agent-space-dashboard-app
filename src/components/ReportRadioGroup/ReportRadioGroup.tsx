"use client";

import React from "react";
import {
  RadioGroup as RACRadioGroup,
  Radio as RACRadio,
  Label,
} from "react-aria-components";

import { joinClassNames } from "@/utils/classNames";
import Card from "@/components/Card";

import { ReportRadioGroupProps } from "./ReportRadioGroup.types";
import styles from "./ReportRadioGroup.module.css";

const ReportRadioGroup: React.FC<ReportRadioGroupProps> = ({
  className,
  options,
  value,
  onChange,
}) => {
  return (
    <RACRadioGroup
      value={value}
      onChange={onChange}
      className={joinClassNames(styles.RadioGroup, className)}
    >
      <Label className="sr-only">Select Report Type</Label>
      <div className={styles.OptionsGrid}>
        {options.map((option) => (
          <RACRadio
            key={option.id}
            value={option.id}
            className={styles.RadioOption}
          >
            {({ isSelected }) => (
              <Card
                className={joinClassNames(
                  styles.OptionCard,
                  isSelected && styles.Selected
                )}
                style={{ "--color": option.color } as React.CSSProperties}
              >
                <div className={styles.CardContent}>
                  <div className={styles.Icon}>{option.icon}</div>
                  <div className={styles.TextContent}>
                    <div className={styles.Title}>{option.title}</div>
                    <div className={styles.Subtitle}>{option.subtitle}</div>
                  </div>
                </div>
              </Card>
            )}
          </RACRadio>
        ))}
      </div>
    </RACRadioGroup>
  );
};

export default ReportRadioGroup;