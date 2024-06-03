import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function AlertButton({ productId, alerted }) {
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
    } else if (userInfo && !loading) {
      fetch("http://localhost:3032/user/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.id,
          productId: productId,
        }),
      })
        .then(async (response) => {
          console.log(await response.json());
        })
        .catch((error) => {
          console.error("Erreur lors de la requête POST /user/like", error);
        });
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
          // If the product is alerted, change the color to gold
          fill: alerted ? "gold" : "white",
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
