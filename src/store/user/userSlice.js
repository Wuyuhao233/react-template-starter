import { Request } from "@/request/axios";
import { clearToken } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = { value: {}, status: "pending" };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inject: (state, { payload }) => {
      [state.value,state.status] = [payload.value,payload.status];
    },
  },
});

// 方法名字存在在action上
export const { inject } = userSlice.actions;
// 暴露reducer
export default userSlice.reducer;
