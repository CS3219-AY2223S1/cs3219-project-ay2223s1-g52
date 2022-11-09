import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import useNavbarMenu from "hooks/useNavbarMenu";

import { styles } from "./styles";

const MainLayout = () => {
  const {
    handleOpenUserMenu,
    menuProps,
    handleRedirectToProfile,
    handleLogout,
    getUserInitial,
    handleRedirectToHistory,
  } = useNavbarMenu();

  return (
    <Box sx={styles.mainContainer}>
      <AppBar position="static">
        <Toolbar sx={styles.navBar}>
          <Typography variant="h6" component="a" href="/" sx={styles.appTitle}>
            PeerPrep
          </Typography>
          <Box>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar sx={styles.avatar}>{getUserInitial()}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              {...menuProps}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleRedirectToProfile}>Profile</MenuItem>
              <MenuItem onClick={handleRedirectToHistory}>History</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
