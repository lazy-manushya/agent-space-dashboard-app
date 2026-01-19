import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../index";
import { listStateRemover, listStateSetter } from "../utils";

type ItemId = string;

type Item = {
  id: ItemId;
  name: string;
};

export interface TagState {
  items: Item[];
}

const initialState: TagState = {
  items: [],
};

export const tagSlice = createSlice({
  name: "TAG",
  initialState,
  reducers: {
    addTags: (
      state,
      action: PayloadAction<{
        items: Item[];
        replaceData?: boolean;
        replaceList?: boolean;
      }>,
    ) => {
      const { items, replaceData, replaceList } = action.payload;
      state.items = listStateSetter(state.items, items, {
        replaceData,
        replaceList,
      });
    },

    removeTags: (
      state,
      action: PayloadAction<{
        idList: ItemId[];
      }>,
    ) => {
      const { idList } = action.payload;
      state.items = listStateRemover(state.items, idList);
    },
  },
});

export const selectItem = (id: ItemId) => (state: AppState) =>
  state.tag.items.find((item) => item.id === id);
export const selectItems = (idList: ItemId[]) => (state: AppState) =>
  state.tag.items.filter((item) => idList.includes(item.id));

export const tagActions = tagSlice.actions;
export const tagReducer = tagSlice.reducer;
