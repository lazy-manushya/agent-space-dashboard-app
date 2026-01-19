/* eslint-disable @typescript-eslint/no-explicit-any */
export function listStateSetter<ValueType>(
  draft: any,
  data: ValueType[],
  settings: {
    replaceData?: boolean;
    replaceList?: boolean;
    itemIdKey?: string;
    oldNewItemCombineFunction?: (
      oldValue: ValueType,
      newValue: ValueType
    ) => ValueType;
  } = {}
) {
  const {
    replaceData,
    replaceList,
    itemIdKey = "id",
    oldNewItemCombineFunction,
  } = settings;

  if (replaceList) {
    return data;
  }

  data.forEach((item: any) => {
    const id = item[itemIdKey];
    const indexInList = draft.findIndex((b: any) => b.id === id);

    if (indexInList === -1) {
      draft.unshift(item);
    } else {
      if (replaceData) {
        draft[indexInList] = item;
        draft = [...draft];
      } else {
        const prevData = draft[indexInList];
        const updatedItem = oldNewItemCombineFunction
          ? oldNewItemCombineFunction(prevData, item)
          : {
              ...prevData,
              ...item,
            };
        draft[indexInList] = updatedItem;
      }
    }
  });

  return draft;
}

export function listStateRemover<VauleType>(
  draft: any,
  dataIdList: VauleType[]
) {
  return draft.filter((item: any) => !dataIdList.includes(item.id));
}
