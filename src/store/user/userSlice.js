import { Request } from "@/request/axios";
import { clearToken, getLocalUser, setLocalUser } from "@/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = { value: {} };
export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
  const res = await Request.getUserInfo();
  return res;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inject: (state, { payload }) => {
      state.value = payload.value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        const userStatus = getLocalUser();
        // 如果为null
        if (userStatus === null || userStatus.status === "waiting" || !userStatus.status) {
          state.value = payload.data.data;
          setLocalUser(JSON.stringify({ user: state.value, status: "success" }));
          message.info("登陆成功");
        }
        // 缓存有效的情况下，需要将请求回来的值注入redux
        if (Reflect.ownKeys(state.value).length === 0) {
          state.value = payload.data.data;
        }
      })
      // 两种情况，有user 和没有user 。 没有
      // err是一个对象
      .addCase(getUserInfo.rejected, (state, err) => {
        const userStatus = getLocalUser();
        if (userStatus === null || userStatus.status === "success" || !userStatus.status) {
          state.value = {};
          setLocalUser(JSON.stringify({ status: "waiting" }));
          message.error("用户信息认证失败，请重新登陆");
          clearToken();
        }
      });
  },
});

// 方法名字存在在action上
export const { inject } = userSlice.actions;
// 暴露reducer
export default userSlice.reducer;
