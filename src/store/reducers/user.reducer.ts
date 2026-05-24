import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ReduxSlices } from "@/types/enums";
import { User } from "@/types/user";

export const initialUserState: User = {
  _id: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  status: "",
  firstName: "",
  lastName: "",
  profilePicture: "",
  location: "",
  timezone: "",
  language: "",
  dateFormat: "",
  createdAt: "",
  lastLogin: "",
};

export const userSlice = createSlice({
  name: ReduxSlices.User,
  initialState: initialUserState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },

    logoutUser: () => initialUserState,
  },
});

export const { setUser, updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
