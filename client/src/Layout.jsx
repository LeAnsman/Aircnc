import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="w-11/12 mx-auto flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
