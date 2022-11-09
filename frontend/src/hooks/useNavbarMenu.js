import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useNavbarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRedirectToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/login");
  };

  const getUserInitial = () => {
    return cookies.username.charAt(0).toUpperCase();
  };

  const handleRedirectToHistory = () => {
    navigate("/history");
  };

  return {
    handleOpenUserMenu,
    menuProps: {
      anchorEl: anchorElUser,
      open: Boolean(anchorElUser),
      onClose: handleCloseUserMenu,
    },
    handleRedirectToProfile,
    handleLogout,
    getUserInitial,
    handleRedirectToHistory,
  };
};

export default useNavbarMenu;
