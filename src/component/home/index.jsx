import React from "react";
import { useAuth } from "../../myHooks";
import {Link,Outlet} from 'react-router-dom'

export default function HomePage() {
  const context = useAuth();
  const {user} = context
  console.log('home',user)
  return (
    <div>
      <p>
        username:{user?.userName}
        <br />
        name : {user?.realName}
      </p>
      <Link to={'homeson'}>homeson</Link>
      <Outlet/>
    </div>
  );
}
