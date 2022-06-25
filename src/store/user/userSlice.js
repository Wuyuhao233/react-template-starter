import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:{}};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inject: (state, { payload }) => {
      state.value = payload.value;
    },
  },
});

// 方法名字存在在action上
export const { inject } = userSlice.actions;
// 暴露reducer
export default userSlice.reducer