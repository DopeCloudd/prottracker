import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function ProductSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "50% 1fr",
        gridTemplateRows: "1fr",
        gridColumnGap: "0px",
        gridRowGap: "0px",
        marginBottom: "60px",
      }}
    >
      <Box>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={500}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.13)",
          }}
        />
      </Box>
      <Box>
        <Skeleton
          variant="rectangular"
          width={"60%"}
          height={200}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
        />
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={300}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
        />
      </Box>
    </Box>
  );
}
