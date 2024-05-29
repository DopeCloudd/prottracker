import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleButtonClick = () => {
    navigate("/login");
  };

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "100%",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 10,
            color: "#EAEDED",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Merci de scanner votre carte pour accéder à notre salle 🏋️
          </Typography>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{ mt: 2 }}
          >
            Connexion
          </Button>
        </Box>
      </Container>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
