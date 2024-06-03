import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function AlertButton() {
  const {
    openSnackbarAlert,
    setOpenSnackbarAlert,
    openSnackbarLike,
    setOpenSnackbarLike,
  } = useContext(SnackbarContext);
  const { userInfo, loading } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (!userInfo && !loading) {
      if (openSnackbarLike) {
        setOpenSnackbarLike(false);
      }
      setOpenSnackbarAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarAlert(false);
  };

  return (
    <Box>
      <NotificationsIcon
        onClick={handleClick}
        sx={{
          marginRight: "8px",
          padding: "10px",
          backgroundColor: "#171717",
          border: "1px solid",
          borderRadius: "6px",
          borderColor: "#00A656",
          cursor: "pointer",
          fontSize: "40px",
          "&:hover": {
            fill: "gold",
          },
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbarAlert}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          Merci de vous connecter pour activer les notifications.
        </Alert>
      </Snackbar>
    </Box>
  );
}
