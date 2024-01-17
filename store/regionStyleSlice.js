import { createSlice } from "@reduxjs/toolkit";

export const regionStyle = createSlice({
  name: "regionStyle",
  initialState: {
    clickedId: 0,
    clickedRegion: "All",
  },
  reducers: {
    setClickedId: (state, action) => {
      state.clickedId = action.payload;
    },
    setClickedRegion: (state, action) => {
      state.clickedRegion = action.payload;
    },
  },
});

export default regionStyle.reducer;
export const { setClickedId, setClickedRegion } = regionStyle.actions;
