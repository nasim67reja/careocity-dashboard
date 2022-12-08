import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  backdropVisible: false,
  updateFormIsVisible: false,
};

const ovarlaySlice = createSlice({
  name: "overlay-controller",
  initialState: initialUserState,
  reducers: {
    backdropVisible(state, action) {
      state.backdropVisible = action.payload;
    },
    updateFormVisiblity(state, action) {
      state.updateFormIsVisible = action.payload;
    },
  },
});

export const overlayActions = ovarlaySlice.actions;

export default ovarlaySlice.reducer;
