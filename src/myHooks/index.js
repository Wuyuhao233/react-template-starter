import React, { createContext, useState } from "react";
import { useContext } from "react";
import * as auth from "../utils/user";
import {useMount} from 'ahooks'

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  //  因为需要全局注入user，所以将login的方法也写在这里
  // { data, userInfo }
  const login = (params) => auth.login(params).then(({ data, userInfo }) => {
    // 需要一个settoken方法\
    setUser(userInfo);
  });
  useMount(() => { 
    boostRun()
   })
  const value = {
    user,
    login,
  };
  // 启动时，观察下user是否存在
  // 需要一个get token方法
  const boostRun = async () => { 
    const token = window.localStorage.getItem('token')
    if(!!token){
      let info = await auth.getUserInfo(token)
      setUser(info)
    }
   }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  // 返回该 context 的当前值,context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
  // 获取value
  return useContext(AuthContext);
};

export const useLocalStorage = (keyName, defaltValue) => {
  // storedvalue 等于return的值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaltValue));
        return defaltValue;
      }
    } catch (error) {
      return defaltValue;
    }
  });
  // 通过setValue to调用setStoredValue
  const setValue = (newValue) => {
    try {
      // 如果缓存没值，就设置
      window.localStorage.setItem(keyName, newValue);
    } catch (error) {
      // 有值的情况，更新默认的值
      setStoredValue(newValue);
    }
  };
  return [storedValue, setValue];
};
