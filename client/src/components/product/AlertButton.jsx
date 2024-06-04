import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductsAlerted } from "../../redux/user/user_products.actions";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function AlertButton({ productId, alerted }) {
  const dispatch = useDispatch();
  const {
    openSnackbarAlert,
    setOpenSnackbarAlert,
    openSnackbarLike,
    setOpenSnackbarLike,
  } = useContext(SnackbarContext);
  const { userInfo, loading } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("warning");

  const handleClick = () => {
    setOpenSnackbarAlert(false);
    if (openSnackbarLike) {
      setOpenSnackbarLike(false);
    }
    if (!userInfo && !loading) {
      setMessage("Merci de vous connecter pour activer les notifications.");
      setSeverity("warning");
      setOpenSnackbarAlert(true);
    } else if (userInfo && !loading) {
      if (!alerted) {
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
            dispatch(fetchUserProductsAlerted(userInfo.id));
            const data = await response.json();
            setMessage(data.message);
            setSeverity("success");
            setOpenSnackbarAlert(true);
          })
          .catch((error) => {
            console.error("Erreur lors de la requête POST /user/like", error);
          });
      } else {
        fetch("http://localhost:3032/user/unalert", {
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
            dispatch(fetchUserProductsAlerted(userInfo.id));
            const data = await response.json();
            setMessage(data.message);
            setSeverity("success");
            setOpenSnackbarAlert(true);
          })
          .catch((error) => {
            console.error("Erreur lors de la requête POST /user/unlike", error);
          });
      }
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
          // If the product is alerted, change the color to #faaf00
          fill: alerted ? "#faaf00" : "white",
          "&:hover": {
            fill: "gold",
          },
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbarAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
