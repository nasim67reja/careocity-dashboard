import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  users: null,
};

const userSlice = createSlice({
  name: "Users",
  initialState: initialUserState,
  reducers: {
    storeUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
