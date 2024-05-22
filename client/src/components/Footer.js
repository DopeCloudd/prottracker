import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {"Copyright © "}
      <Link href="https://mui.com/">Myprottracker&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const element = document.getElementById(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <>
      <Divider />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Integral Oblique, sans-serif",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
                  "& span": {
                    color: "primary.main",
                    fontFamily: "Integral Oblique, sans-serif",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
                  },
                }}
              >
                MY<span>PROT</span>TRACKER
              </Typography>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Abonnez-vous à notre newsletter pour recevoir des mises à jour
                hebdomadaires et des promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Entrer votre adresse email"
                  placeholder="Votre adresse email"
                  inputProps={{
                    autoComplete: "off",
                    "aria-label": "Entrer votre adresse email",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flexShrink: 0 }}
                >
                  S'abonner
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Product
            </Typography>
            <Link
              color="text.secondary"
              href="#hero"
              onClick={(event) => handleLinkClick(event, "hero")}
            >
              Features
            </Link>
            <Link
              color="text.secondary"
              href="#highlights"
              onClick={(event) => handleLinkClick(event, "highlights")}
            >
              Highlights
            </Link>
            <Link
              color="text.secondary"
              href="#pricing"
              onClick={(event) => handleLinkClick(event, "pricing")}
            >
              Pricing
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Company
            </Typography>
            <Link color="text.secondary" href="#">
              About us
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Legal
            </Typography>
            <Link color="text.secondary" href="#">
              Terms
            </Link>
            <Link color="text.secondary" href="#">
              Privacy
            </Link>
            <Link color="text.secondary" href="#">
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 4, sm: 8 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Link color="text.secondary" href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: "text.secondary",
            }}
          >
            <IconButton
              color="inherit"
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: "center" }}
            >
              <FacebookIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
