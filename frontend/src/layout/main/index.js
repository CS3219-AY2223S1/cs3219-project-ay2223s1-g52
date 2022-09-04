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
    handleRedirectToPofile,
    handleLogout,
  } = useNavbarMenu();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={styles.appTitle}
          >
            PeerPrep
          </Typography>
          <Box>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar sx={styles.avatar}>T</Avatar>
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
              <MenuItem onClick={handleRedirectToPofile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
