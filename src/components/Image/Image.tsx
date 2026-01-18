import NextImage from "next/image";

import { IImageProps } from "./Image.types";

function Image({ src, alt, width, height, className, style }: IImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}

export default Image;
