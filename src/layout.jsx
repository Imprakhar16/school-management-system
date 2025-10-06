import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";
import Header from "./components/header";

const headerHeight = 80;

export default function Layout() {
  const [open, setOpen] = useState(false);

  const toggleBar = () => setOpen(!open);

  return (
    <div style={{ display: "flex" }}>
      <Header onMenuClick={toggleBar} />
      <SideBar open={open} onClose={toggleBar} />
      <main
        style={{
          flex: 1,
          marginTop: `${headerHeight}px`,
          marginLeft: open ? "280px" : "0px",
          padding: "10px",
          background: "#e4d3d3b6",
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
