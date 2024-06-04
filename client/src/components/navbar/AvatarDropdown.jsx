import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AvatarDropdown({ text }) {
  const navigate = useNavigate();
  const [avatarEl, setAvatarEl] = useState(null);

  const handleAvatarClick = (e) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const open = Boolean(avatarEl);
  const id = open ? "simple-popover" : undefined;

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  const handleAlertes = () => {
    navigate("/alertes");
  };

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
          <Avatar>{text}</Avatar>
          <KeyboardArrowDownIcon />
        </Button>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mon compte" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleFavorites}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Mes favoris" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleAlertes}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Mes alertes" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
}
