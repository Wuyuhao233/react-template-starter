/* eslint-disable react-hooks/exhaustive-deps */
import { Request } from "@/request/axios";
import { inject } from "@/store/user/userSlice";
import { getLocalToken } from "@/utils";
import { useRequest } from "ahooks";
import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UsecheckLogin = ({ children }) => {
  const token = getLocalToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.user);
  const { run } = useRequest(Request.getUserInfo, {
    staleTime: 5,
    onSuccess: ({ data }) => {
      if (store.status === "pending") {
        dispatch(
          inject({
            value: data.data,
            status: "sucess",
          })
        );
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/login");
      dispatch(inject({ value: {}, status: "pending" }));
      message.error("登录信息过期", [1]);
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      run(token);
    }
  }, []);
  return token ? children : null;
};

export const useCheckAuth = () => { }