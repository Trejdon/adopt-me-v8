import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchParamsState {
  location: string;
  breed: string;
  animal: string;
}

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
    },
  },
  reducers: {
    all: (state, action: PayloadAction<SearchParamsState>) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
