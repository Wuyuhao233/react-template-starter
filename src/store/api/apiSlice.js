// 拆分代码的基础服务
import { getBaseUrl, getLocalToken } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48"
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders:(headers) => { 
      const token =getLocalToken()
      if(token){
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers
     }
  }),
  reducerPath: "baseApi",
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: 60,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (params) => ({
        url: "immp-user/api/v3/user/login",
        method: "POST",
        body: params,
      }),
    }),
  }),
});
export const { useLoginUserMutation } = apiSlice;
