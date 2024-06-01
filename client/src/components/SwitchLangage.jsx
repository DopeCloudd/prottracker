import React from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../translate/Language";
// Flags
import France from "../assets/flags/fr.svg";
import England from "../assets/flags/gb.svg";
// MUI
import { Box, ListItemIcon } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Object mapping language codes to flag images
const flags = {
  fr: France,
  en: England,
};

const SwitchLangage = () => {
  // Hooks for managing language state and the anchor for the dropdown menu
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFlag, setSelectedFlag] = React.useState(i18n.language);
  const open = Boolean(anchorEl);
  // Function to change the app's language
  let changeLanguage = (flag) => {
    switch (flag) {
      case Language.EN:
        i18n.changeLanguage(Language.EN);
        break;
      case Language.FR:
      default:
        i18n.changeLanguage(Language.FR);
        break;
    }
  };

  // Event handlers for opening and selecting items in the language menu
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, flag) => {
    setSelectedFlag(flag);
    changeLanguage(flag);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        color: "#EAEDED",
        backgroundColor: "#121212",
        mr: 2,
        "& img": {
          width: "36px",
          height: "27px",
        },
      }}
    >
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemIcon
            sx={{
              minWidth: "fit-content",
            }}
          >
            <img src={flags[selectedFlag]} alt={flags[selectedFlag]} />
          </ListItemIcon>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        <MenuItem
          key={"France"}
          selected={"France" === selectedFlag}
          onClick={(event) => handleMenuItemClick(event, Language.FR)}
        >
          <ListItemIcon>
            <img
              src={France}
              alt="French flag"
              width={"36px"}
              height={"27px"}
            />
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          key={"England"}
          selected={"England" === selectedFlag}
          onClick={(event) => handleMenuItemClick(event, Language.EN)}
        >
          <ListItemIcon>
            <img
              src={England}
              alt="English flag"
              width={"36px"}
              height={"27px"}
            />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SwitchLangage;
