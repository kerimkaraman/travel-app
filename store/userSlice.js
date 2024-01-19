import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    namesurname: "",
    email: "",
    password: "",
    favorites: [],
  },

  reducers: {
    setNameSurname: (state, action) => {
      state.namesurname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setEmail, setId, setNameSurname, setPassword } =
  userSlice.actions;
