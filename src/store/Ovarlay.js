import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  backdropVisible: false,
};

const ovarlaySlice = createSlice({
  name: "overlay-controller",
  initialState: initialUserState,
  reducers: {
    backdropVisible(state, action) {
      state.backdropVisible = action.payload;
    },
  },
});

export const overlayActions = ovarlaySlice.actions;

export default ovarlaySlice.reducer;
