import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function LikeButton() {
  const {
    openSnackbarAlert,
    setOpenSnackbarAlert,
    openSnackbarLike,
    setOpenSnackbarLike,
  } = useContext(SnackbarContext);
  const { userInfo, loading } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (!userInfo && !loading) {
      if (openSnackbarAlert) {
        setOpenSnackbarAlert(false);
      }
      setOpenSnackbarLike(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarLike(false);
  };

  return (
    <Box>
      <FavoriteIcon
        onClick={handleClick}
        sx={{
          padding: "10px",
          backgroundColor: "#171717",
          border: "1px solid",
          borderRadius: "6px",
          borderColor: "#00A656",
          cursor: "pointer",
          fontSize: "40px",
          "&:hover": {
            fill: "red",
          },
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbarLike}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          Merci de vous connecter pour liker un produit.
        </Alert>
      </Snackbar>
    </Box>
  );
}
