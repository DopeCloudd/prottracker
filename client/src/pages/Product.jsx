import { Box, Rating, Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import { SnackbarContext } from "../components/contexts/SnackbarContext";
import AlertButton from "../components/product/AlertButton";
import BuyButton from "../components/product/BuyButton";
import Error from "../components/product/Error";
import LikeButton from "../components/product/LikeButton";
import Price from "../components/product/Price";
import ProductSkeleton from "../components/product/ProductSkeleton";
import TitleSection from "../components/product/TitleSection";

// Function to convert Uint8Array to image URL
const convertirUint8ArrayEnUrl = (uint8Array) => {
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  return url;
};

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function Product() {
  const { likedProducts, alertedProducts } = useSelector(
    (state) => state.userProducts
  );
  const [liked, setLiked] = useState(false);
  const [alerted, setAlerted] = useState(false);
  // State of the alert snackbar
  const [openSnackbarAlert, setOpenSnackbarAlert] = useState(false);
  const [openSnackbarLike, setOpenSnackbarLike] = useState(false);
  // State of product information management
  const [product, setProduct] = useState([]);
  // axios request loading management state
  const [loading, setLoading] = useState(true);
  // Retrieve the categoryId parameter from the page URL
  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        // For production
        //const response = await axios.get(`/api/product/${productId}`);
        // For developement
        const response = await axios.get(
          `http://localhost:3032/api/product/${productId}`
        );
        // Set product informations
        setProduct(response.data);
        // End load
        setLoading(false);
      } catch (error) {
        // Error handling
        console.error(
          "Erreur lors de la récupération des informations du produit",
          error
        );
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  useEffect(() => {
    // If productId is in the likedProducts array, set liked to true
    if (likedProducts.includes(parseInt(productId, 10))) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    // If productId is in the alertedProducts array, set alerted to true
    if (alertedProducts.includes(parseInt(productId, 10))) {
      setAlerted(true);
    } else {
      setAlerted(false);
    }
  }, [likedProducts, alertedProducts, productId]);

  return (
    <Box
      sx={{
        padding: "0 5%",
      }}
    >
      <BackLink />
      {loading ? (
        // Display Skeleton cards during loading
        <ProductSkeleton />
      ) : product == null ? (
        // If product doesn't exist
        <Error />
      ) : (
        // Display product information
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
          <Box
            sx={{
              "& img": {
                aspectRatio: "4/4",
                width: "100%",
              },
            }}
          >
            <img
              src={convertirUint8ArrayEnUrl(new Uint8Array(product.image.data))}
              alt={`${product.title}`}
            />
          </Box>
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SnackbarContext.Provider
                value={{
                  openSnackbarAlert,
                  setOpenSnackbarAlert,
                  openSnackbarLike,
                  setOpenSnackbarLike,
                }}
              >
                <AlertButton productId={productId} alerted={alerted} />
                <LikeButton productId={productId} liked={liked} />
              </SnackbarContext.Provider>
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "Integral Oblique, sans-serif",
                fontSize: "2rem",
              }}
            >
              {removeAccents(product.title)}
            </Typography>
            <Rating name="read-only" value={4.5} precision={0.5} readOnly />
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Price value={product.currentPrice} />
              <Typography
                component="p"
                sx={{
                  opacity: "0.5",
                  fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
                }}
              >
                {product.quantity}
              </Typography>
            </Box>
            <Typography
              component="p"
              sx={{
                opacity: "0.5",
                fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
              }}
            >
              Vendu par {product.brand}
            </Typography>
            <Typography
              component="p"
              sx={{
                opacity: "0.5",
                fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
              }}
            >
              Prix le plus bas : {product.lowestPrice} €
            </Typography>
            <BuyButton url={product.url} />
            <TitleSection text={"Analyse"} />
            <Typography
              component="p"
              sx={{ fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)" }}
            >
              Notre analyse de la composition de ce produit a pu mettre en avant
              que ...
            </Typography>
            <TitleSection text={"Description"} />
            <Typography
              component="p"
              sx={{ fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)" }}
            >
              {product.description}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Product;
