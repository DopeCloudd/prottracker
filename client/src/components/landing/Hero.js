import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PagePresentation from "../../assets/page_presentation_app.png";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundImage: `linear-gradient(#171717, ${alpha("#171717", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 12,
          pb: 8,
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Compare to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: "#00A656",
              }}
            >
              compete.
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Découvrez notre application populaire pour suivre aussi bien votre
            budget que vos performmances. Restez alerté sur les derniers deals
            sur vos produits préférés.
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: { xs: 200, sm: 580 },
            width: "100%",
            backgroundImage: `url(${PagePresentation})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor: alpha("#00A656", 0.1),
            boxShadow: `0 0 24px 12px ${alpha("#00A656", 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
