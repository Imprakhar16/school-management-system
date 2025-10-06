import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { showToast } from "./toaster";
import ReusableModal from "./modal";
import ButtonComp from "./button";

const drawerWidth = 280;

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogOut = () => {
    setTimeout(() => {
      localStorage.removeItem("authToken");
      navigate("/login");
    }, 2000);
    showToast({ message: "Logout Successfully", status: "success" });
    setLogoutModalOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `100%`,
          ml: `${drawerWidth}px`,
          bgcolor: "white",
          color: "text.primary",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                School Manager
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Management System
              </Typography>
            </Box>
          </Box>

          {/* Center - Logo */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="https://play-lh.googleusercontent.com/INY4vfQNUb6DmvSAmEDqcZAJzYbDkPa9WORf0AdZMeJQDBXkPeQypC-25Cl1Rc1XLzA=w600-h300-pc0xffffff-pd"
              alt="School Logo"
              style={{ height: "55px", width: "auto", objectFit: "contain" }}
              onClick={() => navigate("/")}
            />
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              sx={{
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s ease",
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  width: 45,
                  height: 45,
                  fontWeight: 600,
                }}
              >
                {}
              </Avatar>
            </IconButton>
            <IconButton onClick={() => setLogoutModalOpen(true)} aria-label="Logout">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ReusableModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Logout"
        actions={
          <>
            <ButtonComp
              title="Cancel"
              variant="outlined"
              onClick={() => setLogoutModalOpen(false)}
            />
            <ButtonComp title="Logout" variant="contained" color="error" onClick={handleLogOut} />
          </>
        }
      >
        <Typography>Are you sure you want to log out?</Typography>
      </ReusableModal>
    </>
  );
}
