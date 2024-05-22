import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SwitchLangage from "./SwitchLangage";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar, Box, Typography} from "@mui/material";
import {useGetUserDetailsQuery} from "../auth/auth.service";
import {setCredentials, logout} from "../auth/auth.slice";

function Navbar() {
    // Hooks
    const {userInfo, userToken} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // automatically authenticate user if token is found
    const userDetailsQuery = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
    });

    useEffect(() => {
        if (userToken && userDetailsQuery.data) {
            dispatch(setCredentials(userDetailsQuery.data))
        }
    }, [userToken, userDetailsQuery.data, dispatch])

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
                "& svg": {
                    fill: "#00A656",
                    paddingTop: "4px",
                },
                "& img": {
                    height: "100px",
                    width: "100px",
                    cursor: "pointer",
                },
            }}
        >
            <Typography
                variant="h6"
                onClick={handleButtonClick}
                sx={{
                    fontFamily: "Integral Oblique, sans-serif",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
                    "& span": {
                        color: "#00A656",
                        fontFamily: "Integral Oblique, sans-serif",
                        textTransform: "uppercase",
                    },
                }}
            >
                MY<span>PROT</span>TRACKER
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& svg": {
                        fontSize: "38px",
                        cursor: "pointer",
                        padding: "0",
                    },
                }}
            >
                <SwitchLangage/>
                {userInfo ? (
                    <>
                        <Box ml={2} mr={3}>
                            <Avatar
                                sx={{cursor: "pointer"}}
                                onClick={handleProfile}
                            >
                                {userInfo.firstName
                                    ? userInfo.firstName.substring(0, 1)
                                    : ""}
                            </Avatar>
                        </Box>
                        <LogoutIcon onClick={() => dispatch(logout())}/>
                    </>
                ) : (
                    <PersonOutlineOutlinedIcon onClick={handleLogin}/>
                )}
            </Box>
        </Box>
    );
}

export default Navbar;