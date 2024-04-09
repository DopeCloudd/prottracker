import styled from "styled-components";
import * as React from "react";
import SwitchLangage from "./SwitchLangage";
import {useLocation, useNavigate} from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {logout} from "../actions/auth";
import {clearMessage} from "../actions/messages";
import {Avatar, Box} from "@mui/material";

const ContainerNavbar = styled.div`
  height: 100px;
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #EAEDED;
  font-weight: bold;
  font-size: 18px;
  padding: 0 5%;

  & svg {
    fill: #00A656;
    padding-top: 4px;
  }

  & img {
    height: 100px;
    width: 100px;
    cursor: pointer;
  }
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    font-size: 38px;
    cursor: pointer;
    padding: 0;
  }
`;

const Title = styled.div`
  font-family: "Integral Oblique", sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  font-size: clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem);

  & span {
    color: #00A656;
    font-family: "Integral Oblique", sans-serif;
    text-transform: uppercase;
  }
`;

function Navbar() {
    // Hooks for navigation and Redux state management
    const navigate = useNavigate();
    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let location = useLocation();

    // Effect hook to clear messages on location change, for specific paths
    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage()); // clear message when changing location
        }
    }, [dispatch, location]);
    // Callback for handling logout, dispatching the logout action
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

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
        <ContainerNavbar>
            <Title onClick={handleButtonClick}>MY<span>PROT</span>TRACKER</Title>
            <RightContainer>
                <SwitchLangage/>
                {currentUser ? (
                    <>
                        <Box ml={2} mr={3}>
                            <Avatar sx={{
                                cursor: 'pointer'
                            }} onClick={handleProfile}>{currentUser.firstName.substring(0, 1)}</Avatar>
                        </Box>
                        <LogoutIcon onClick={logOut}/>
                    </>
                ) : (
                    <PersonOutlineOutlinedIcon onClick={handleLogin}/>
                )}
            </RightContainer>
        </ContainerNavbar>
    );
}

export default Navbar;