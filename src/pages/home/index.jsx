import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function HomePage() {
  
  return (
    <div>
      HomePage
      <Link to={"homeson"}>Homoson</Link>
      <Outlet />
    </div>
  );
}
