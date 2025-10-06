import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";
import Header from "./components/header";

const headerHeight = 80;
const drawerWidth = 280;

export default function Layout() {
  const [open, setOpen] = useState(true);

  const toggleBar = () => setOpen(!open);

  return (
    <div style={{ display: "flex" }}>
      <Header onMenuClick={toggleBar} />
      <SideBar open={open} onClose={toggleBar} />
      <main
        style={{
          flex: 1,
          marginTop: `${headerHeight}px`,
          marginLeft: open ? `${drawerWidth}px` : "0px",
          padding: "10px",
          background: "#ffffffda",
          minHeight: `calc(90vh - ${headerHeight}px)`,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
