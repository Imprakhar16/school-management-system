import React from "react";
import { Link, useLocation } from "react-router-dom";
import { privateRoutes } from "../components/routes";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import {
  Home,
  Dashboard,
  School,
  People,
  Assignment,
  EventNote,
  Settings,
  AccountCircle,
  Class,
  Assessment,
  Close,
  Info,
  Subject,
} from "@mui/icons-material";

const drawerWidth = 280;

const iconMap = {
  home: <Home />,
  dashboard: <Dashboard />,
  students: <People />,
  teachers: <School />,
  classes: <Class />,
  subjects: <Subject />,
  assignments: <Assignment />,
  attendance: <EventNote />,
  reports: <Assessment />,
  settings: <Settings />,
  profile: <AccountCircle />,
  about: <Info />,
};

export default function SideBar({ open, onClose }) {
  const location = useLocation();

  const getIcon = (routeName) => {
    const key = routeName.toLowerCase().replace(/\s+/g, "");
    return iconMap[key] || <Dashboard />;
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)",
          color: "#fff",
          borderRight: "none",
          top: 80,
          height: "100vh",
          position: "fixed",
        },
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 80px)",
          overflowY: "auto",
          overflowX: "hidden",
          pb: 2,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(255,255,255,0.5)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pr: 1,
            pt: 1,
          }}
        >
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <Close />
          </IconButton>
        </Box>

        <List sx={{ px: 2, pt: 1 }}>
          {privateRoutes
            .filter((route) => route.showInSidebar)
            .map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <ListItem key={route.path} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={route.path}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      transition: "all 0.3s ease",
                      bgcolor: isActive ? "rgba(255, 255, 255, 0.25)" : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.15)",
                        transform: "translateX(8px)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: isActive ? 4 : 0,
                        height: "70%",
                        bgcolor: "#fff",
                        borderRadius: "0 4px 4px 0",
                        transition: "width 0.3s ease",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#fff",
                        minWidth: 45,
                        opacity: isActive ? 1 : 0.8,
                      }}
                    >
                      {getIcon(route.name)}
                    </ListItemIcon>
                    <ListItemText
                      primary={route.name}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 400,
                        fontSize: "0.95rem",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Drawer>
  );
}
