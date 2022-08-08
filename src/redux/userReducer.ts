import { createSlice, configureStore } from "@reduxjs/toolkit";
import userModel from "model/userModel";

const initialState: userModel = {
  public_id: "",
  name: "",
  email: "",
  favorite_color: "",
  hated_color: "",
  lucky_color: "",
  random_color: "",
  jwt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, data) => {
      return {
        ...state,
        public_id: data.payload.public_id,
        name: data.payload.name,
        email: data.payload.email,
        favorite_color: data.payload.favorite_color,
        hated_color: data.payload.hated_color,
        lucky_color: data.payload.lucky_color,
        random_color: data.payload.random_color,
      };
    },
    addJwt: (state, data) => {
      return {
        ...state,
        jwt: data.payload,
      };
    },
    changeRandomColor: (state, data) => {
      return {
        ...state,
        random_color: data.payload,
      };
    },
  },
});

export default userSlice.reducer;
export const { addUser, addJwt, changeRandomColor } = userSlice.actions;
