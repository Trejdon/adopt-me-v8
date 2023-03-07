import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "./APIResponsesTypes";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  } as unknown as Pet, 
  // TODO: Update the type once we see how the payload will be passed
  reducers: {
    adopt: (state, action: PayloadAction<null | Pet>) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
