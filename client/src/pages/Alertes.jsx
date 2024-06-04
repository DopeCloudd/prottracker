import { Box, Rating, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BuyButton from "../components/product/BuyButton";
import Price from "../components/product/Price";

// Function to convert Uint8Array to image URL
const convertirUint8ArrayEnUrl = (uint8Array) => {
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  return url;
};

export default function Alertes() {
  // User alertes products
  const { alertedProducts, loading } = useSelector(
    (state) => state.userProducts
  );

  // Add navigate
  const navigate = useNavigate();

  // Function that sends to the product file according to the product id
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{ padding: "0 5%", pb: { xs: 8, sm: 0 } }}>
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            width: "80%",
            fontFamily: "Integral, sans-serif",
            texTransform: "uppercase",
            fontSize: "clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem)",
            "& span": {
              color: "#00A656",
              fontFamily: "Integral Oblique, sans-serif",
            },
          }}
        >
          MES <span>ALERTES</span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: "20px",
        }}
      >
        {loading ? (
          // Display Skeleton cards during loading
          Array.from({ length: 16 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                height: "220px",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gridColumnGap: "0px",
                gridRowGap: "0px",
                backgroundColor: "#171717",
                boxShadow: "0px 0px 15px 2px #0c0c0c",
                margin: "4px 0",
                borderRadius: "10px",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <Box
                sx={{
                  gridArea: "1 / 1 / 4 / 2",
                  position: "relative",
                  "@media (max-width: 600px)": {
                    gridArea: "1 / 1 / 2 / 2",
                  },
                  "& img": {
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    aspectRatio: "4/4",
                  },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
              </Box>
              <Box
                sx={{
                  gridArea: "1 / 2 / 2 / 6",
                  "@media (max-width: 600px)": {
                    marginLeft: "8px",
                  },
                  "& h3": {
                    lineHeight: "normal",
                    textTransform: "uppercase",
                  },
                  "& h4": {
                    color: "#e00034",
                  },
                }}
              >
                <Skeleton
                  variant="h3"
                  width={"100%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
                <Skeleton
                  variant="p"
                  width={"40%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
                <Skeleton
                  variant="h4"
                  width={"40%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
              </Box>
              <Box
                sx={{
                  gridArea: "2 / 2 / 3 / 6",
                  display: "flex",
                  alignItems: "center",
                  "@media (max-width: 600px)": {
                    gridArea: "2 / 1 / 3 / 6",
                  },
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
              </Box>
              <Box
                sx={{
                  gridArea: "3 / 2 / 4 / 6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  "@media (max-width: 600px)": {
                    gridArea: "3 / 1 / 4 / 6",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "space-between",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"30%"}
                    height={"80%"}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={"30%"}
                    height={"80%"}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                  />
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          // Display products list
          <>
            {alertedProducts.map((produit) => (
              <Box
                key={produit.id}
                onClick={() => goToProduct(produit.id)}
                sx={{
                  height: "220px",
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gridColumnGap: "0px",
                  gridRowGap: "0px",
                  backgroundColor: "#171717",
                  boxShadow: "0px 0px 15px 2px #0c0c0c",
                  margin: "4px 0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <Box
                  sx={{
                    gridArea: "1 / 1 / 4 / 2",
                    position: "relative",
                    "@media (max-width: 600px)": {
                      gridArea: "1 / 1 / 2 / 2",
                    },
                    "& img": {
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      aspectRatio: "4/4",
                    },
                  }}
                >
                  <img
                    src={convertirUint8ArrayEnUrl(
                      new Uint8Array(produit.image.data)
                    )}
                    alt={`${produit.title}`}
                  />
                </Box>
                <Box
                  sx={{
                    gridArea: "1 / 2 / 2 / 6",
                    "@media (max-width: 600px)": {
                      marginLeft: "8px",
                    },
                    "& h3": {
                      lineHeight: "normal",
                      textTransform: "uppercase",
                    },
                    "& h4": {
                      color: "#e00034",
                    },
                  }}
                >
                  <h3>{produit.title}</h3>
                  <Typography
                    component="p"
                    sx={{
                      opacity: "0.5",
                      fontSize: "1rem",
                    }}
                  >
                    {produit.brand}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Price value={produit.currentPrice} type="card" />
                    <span>&nbsp;·&nbsp;</span>
                    <Typography
                      component="p"
                      sx={{
                        fontSize: "1rem",
                        opacity: "0.5",
                      }}
                    >
                      {produit.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    gridArea: "2 / 2 / 3 / 6",
                    display: "flex",
                    alignItems: "center",
                    "@media (max-width: 600px)": {
                      gridArea: "2 / 1 / 3 / 6",
                    },
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      opacity: "0.5",
                      fontSize: "1rem",
                    }}
                  >
                    {produit.description.substring(0, 120)}...
                  </Typography>
                </Box>
                <Box
                  sx={{
                    gridArea: "3 / 2 / 4 / 6",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    "@media (max-width: 600px)": {
                      gridArea: "3 / 1 / 4 / 6",
                    },
                  }}
                >
                  <Rating
                    name="read-only"
                    value={4.5}
                    precision={0.5}
                    readOnly
                  />
                  <BuyButton url={produit.url} type="card" />
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
