import { joinClassNames } from "@/utils";

import { IExampleComponentProps } from "./ExampleComponent.types";
import styles from "./ExampleComponent.module.css";

function ExampleComponent({ className }: IExampleComponentProps) {
  return (
    <div className={joinClassNames(className, styles.Container)}>
      Example Component
    </div>
  );
}

export default ExampleComponent;
