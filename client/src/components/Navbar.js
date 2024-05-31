import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../auth/auth.service";
import { logout, setCredentials, setLoading } from "../auth/auth.slice";
import SwitchLangage from "./SwitchLangage";

function Navbar() {
  const { t } = useTranslation();
  // Hooks
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const userDetailsQuery = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (userToken && userDetailsQuery.data) {
      dispatch(setCredentials(userDetailsQuery.data));
    }
  }, [userToken, userDetailsQuery.data, dispatch]);

  useEffect(() => {
    if (userDetailsQuery.isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [userDetailsQuery.isLoading, dispatch]);

  // Event handlers for navigation button clicks
  const handleButtonClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <Box
      sx={{
        minHeight: "100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#EAEDED",
        fontWeight: "bold",
        fontSize: "18px",
        padding: "0 5%",
        "& img": {
          height: "100px",
          width: "100px",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ height: "40px", width: "40px", marginTop: "6px" }}
          src="/icon.png"
          alt="logo"
          onClick={handleButtonClick}
        />
        <Typography
          variant="h6"
          onClick={handleButtonClick}
          sx={{
            fontFamily: "Integral Oblique, sans-serif",
            textTransform: "uppercase",
            cursor: "pointer",
            fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
            ml: 1,
            "& span": {
              color: "#00A656",
              fontFamily: "Integral Oblique, sans-serif",
              textTransform: "uppercase",
            },
          }}
        >
          MY<span>PROT</span>TRACKER
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwitchLangage />
        {userInfo ? (
          <>
            <Box mr={3}>
              <Avatar sx={{ cursor: "pointer" }} onClick={handleProfile}>
                {userInfo.firstName ? userInfo.firstName.substring(0, 1) : ""}
              </Avatar>
            </Box>
            <Button variant="outlined" onClick={() => dispatch(logout())}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              <span>{t("nav.logout")}</span>
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={handleLogin}>
            <LoginIcon fontSize="small" sx={{ mr: 1 }} />
            <span>{t("nav.login")}</span>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
