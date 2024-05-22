import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Ne pas afficher le Breadcrumb sur la page d'accueil
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
      sx={{
        padding: "0 5%",
      }}
    >
      <Typography component={Link} to="/">
        <HomeIcon
          fontSize="medium"
          sx={{
            color: "inherit",
            fill: "white",
          }}
        />
      </Typography>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return isLast ? (
          <Typography
            color="textPrimary"
            sx={{
              opacity: "0.5",
              "&:first-letter": {
                textTransform: "uppercase",
              },
            }}
            key={to}
          >
            {value}
          </Typography>
        ) : (
          <Typography
            component={Link}
            sx={{
              color: "white",
              textDecoration: "none",
              "&:first-letter": {
                textTransform: "uppercase",
              },
            }}
            to={to}
            key={to}
          >
            {value}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
