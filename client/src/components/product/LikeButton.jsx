import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProducts } from "../../redux/user/user_products.actions";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function LikeButton({ productId, liked }) {
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
    if (openSnackbarAlert) {
      setOpenSnackbarAlert(false);
    }
    if (!userInfo && !loading) {
      setMessage("Merci de vous connecter pour activer les notifications.");
      setSeverity("warning");
      setOpenSnackbarLike(true);
    } else if (userInfo && !loading) {
      if (!liked) {
        fetch("http://localhost:3032/user/like", {
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
            dispatch(fetchUserProducts(userInfo.id));
            const data = await response.json();
            setMessage(data.message);
            setSeverity("success");
            setOpenSnackbarLike(true);
          })
          .catch((error) => {
            console.error("Erreur lors de la requête POST /user/like", error);
          });
      } else {
        fetch("http://localhost:3032/user/unlike", {
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
            dispatch(fetchUserProducts(userInfo.id));
            const data = await response.json();
            setMessage(data.message);
            setSeverity("success");
            setOpenSnackbarLike(true);
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
          // If the product is liked, change the color to red
          fill: liked ? "red" : "white",
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
