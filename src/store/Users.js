import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  users: null,
  user: null,
  curUser: null,
};

const userSlice = createSlice({
  name: "Users",
  initialState: initialUserState,
  reducers: {
    storeUsers(state, action) {
      state.users = action.payload;
    },
    storeUser(state, action) {
      state.user = action.payload;
    },
    storeCurUser(state, action) {
      state.curUser = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
