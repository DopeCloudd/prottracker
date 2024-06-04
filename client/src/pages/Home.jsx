import { Box } from "@mui/material";
import * as React from "react";
import CallToAction from "../components/landing/CallToAction";
import Hero from "../components/landing/Hero";
import Highlights from "../components/landing/Highlights";
import Pricing from "../components/landing/Pricing";
import Title from "../components/landing/Title";

function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Title />
        <CallToAction />
        <Hero />
        <Highlights />
        <Pricing />
      </Box>
    </Box>
  );
}

export default Home;
