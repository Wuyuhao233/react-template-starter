import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../myHooks";

export default function ProtectedRoutes({children}) {
    
  const { user } = useAuth();
  if(!user){
    return <Navigate to={'/login'}/>
  }
  return <div>{children}</div>;
}
