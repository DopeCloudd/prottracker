import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials, setLoading } from "../redux/auth/auth.slice";
import { useGetUserDetailsQuery } from "../redux/auth/auth.service";
import {
  fetchUserProductsAlerted,
  fetchUserProductsLiked,
} from "../redux/user/user_products.actions";
import SwitchLangage from "./SwitchLangage";
import AvatarDropdown from "./navbar/AvatarDropdown";

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
      dispatch(fetchUserProductsLiked(userDetailsQuery.data.id));
      dispatch(fetchUserProductsAlerted(userDetailsQuery.data.id));
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
        <Box
          sx={{
            height: { xs: "30px", sm: "40px" },
            width: { xs: "30px", sm: "40px" },
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
            }}
            src="/icon.png"
            alt="logo"
            onClick={handleButtonClick}
          />
        </Box>
        <Typography
          variant="h6"
          onClick={handleButtonClick}
          sx={{
            fontFamily: "Integral Oblique, sans-serif",
            textTransform: "uppercase",
            cursor: "pointer",
            fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)",
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
            <Box sx={{ mr: { xs: 1, md: 3 } }}>
              <AvatarDropdown
                text={
                  userInfo.firstName ? userInfo.firstName.substring(0, 1) : ""
                }
              />
            </Box>
            <Button variant="outlined" onClick={() => dispatch(logout())}>
              <LogoutIcon fontSize="small" sx={{ mr: { xs: 0, md: 1 } }} />
              <Typography
                component="span"
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                {t("nav.logout")}
              </Typography>
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={handleLogin}>
            <LoginIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography
              component="span"
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              {t("nav.login")}
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
