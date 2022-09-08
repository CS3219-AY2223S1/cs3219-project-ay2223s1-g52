import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const useNavbarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
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
    navigate("/login");
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
  };
};

export default useNavbarMenu;
