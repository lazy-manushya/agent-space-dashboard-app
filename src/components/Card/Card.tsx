import { joinClassNames } from "@/utils";

import { ICardProps } from "./Card.types";
import styles from "./Card.module.css";

function Card({
  className,
  title,
  children,
  style,
  contentContainerClassName,
}: ICardProps) {
  return (
    <div className={joinClassNames(className, styles.Container)} style={style}>
      {!!title && <h3 className={styles.Title}>{title}</h3>}
      <div
        className={joinClassNames(styles.Content, contentContainerClassName)}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
