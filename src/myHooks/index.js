import React, { Children, createContext, useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const navigate = useNavigate();

  // login函数 , 异步函数
  const login = (data) => {
    setUser(data);
    navigate("/profile");
  };
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
}
export const useAuth = () => { 
    // 返回该 context 的当前值,context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
    // 获取value
    return useContext(AuthContext) 
 }

export const useLocalStorage = (keyName, defaltValue) => {
    
    // storedvalue 等于return的值
    const [storedValue,setStoredValue] = useState(() => { 
        try {
            const value = window.localStorage.getItem(keyName)
            if(value){
                return JSON.parse(value)
            }else{
                window.localStorage.setItem(keyName,JSON.stringify(defaltValue))
                return defaltValue
            }
        } catch (error) {
            return defaltValue
        }
     })
     // 通过setValue to调用setStoredValue
     const setValue = (newValue) => { 
        try {
            // 如果缓存没值，就设置
            window.localStorage.setItem(keyName,newValue)
        } catch (error) {
            // 有值的情况，更新默认的值
            setStoredValue(newValue)
        }
      }
      return[storedValue,setValue]
};
