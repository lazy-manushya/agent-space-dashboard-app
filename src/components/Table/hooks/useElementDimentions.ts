import { useCallback, useEffect, useMemo, useState } from "react";

import lodashGet from "lodash/get";
import debounce from "lodash/debounce";

const useElementDimentions = (elementRef: any) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const updateElementDimentions = useCallback(() => {
    if (!elementRef) {
      return;
    }

    const rect = elementRef.getBoundingClientRect();
    const width = lodashGet(rect, "width");
    const height = lodashGet(rect, "height");
    setHeight(height);
    setWidth(width);
  }, [elementRef]);

  const updateElementDimentionsDebounced = useMemo(
    () => debounce(updateElementDimentions, 20),
    [updateElementDimentions]
  );

  //--------------------------------------

  useEffect(() => {
    window.addEventListener("resize", updateElementDimentionsDebounced);

    return () => {
      window.removeEventListener("resize", updateElementDimentionsDebounced);
    };
  }, [updateElementDimentionsDebounced]);

  useEffect(() => {
    updateElementDimentions();
  }, [updateElementDimentions]);

  //--------------------------------------

  return {
    height,
    width,
    updateDimentions: updateElementDimentions,
  };
};

export default useElementDimentions;
