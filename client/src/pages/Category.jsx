import { Box, Rating, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BackLink from "../components/BackLink";
import Brand from "../components/filters/Brand";
import Rate from "../components/filters/Rate";
import Sort from "../components/filters/Sort";

const CardImage = styled.div`
  grid-area: 1 / 1 / 4 / 2;
  position: relative;

  @media (max-width: 600px) {
    grid-area: 1 / 1 / 2 / 2;
  }

  & img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 4/4;
  }
`;

const TextLowOpacity = styled.p`
  opacity: 0.5;
`;

const CardTopContainer = styled.div`
  grid-area: 1 / 2 / 2 / 6;

  @media (max-width: 600px) {
    margin-left: 8px;
  }

  & h3 {
    line-height: normal;
    text-transform: uppercase;
  }

  & h4 {
    color: #e00034;
  }
`;

const CardMiddleContainer = styled.div`
  grid-area: 2 / 2 / 3 / 6;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    grid-area: 2 / 1 / 3 / 6;
  }
`;

const CardBottomContainer = styled.div`
  grid-area: 3 / 2 / 4 / 6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    grid-area: 3 / 1 / 4 / 6;
  }
`;

const BuyButton = styled.button`
  width: 40%;
  background-color: #00a656;
  color: white;
  padding: 12px;
  border-radius: 18px;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

// Format the number in euros
const Prix = ({ prix }) => {
  const prixFormate = prix.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return <h4>{prixFormate}</h4>;
};

// Function to convert Uint8Array to image URL
const convertirUint8ArrayEnUrl = (uint8Array) => {
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  return url;
};

function Category() {
  // State of products list
  const [produits, setProduits] = useState([]);
  // State of brands list
  const [brands, setBrands] = useState([]);
  // State of loading axios request
  const [loading, setLoading] = useState(true);
  // State of category name
  const [categoryName, setCategoryName] = useState("");

  // Translate
  const { t } = useTranslation();

  // Retrieve the categoryId parameter from the page URL
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        // For production
        //const response = await axios.get(`/api/products/${categoryId}`);
        // For developement
        const response = await axios.get(
          `http://localhost:3032/api/products/${categoryId}`
        );
        // Set products list in price order
        setProduits(
          response.data.sort((a, b) => a.currentPrice - b.currentPrice)
        );
        // Set brands list
        const newBrands = response.data
          .map((produit) => produit.brand)
          .filter((brand, index, array) => array.indexOf(brand) === index);
        setBrands(newBrands);
        // End of loading axios request
        setLoading(false);
      } catch (error) {
        // Error handling
        console.error("Erreur lors de la récupération des produits", error);
        setLoading(false);
      }
    };
    fetchProduits();
  }, [categoryId]);

  useEffect(() => {
    // Get category name
    const fetchCategory = async () => {
      try {
        fetch(`http://localhost:3032/api/categories/${categoryId}`).then(
          (response) => {
            response.json().then((data) => {
              setCategoryName(data.name);
            });
          }
        );
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie", error);
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Add navigate
  const navigate = useNavigate();
  // Function that sends to the product file according to the product id
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };
  // Function that sends to merchant site url
  const goToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        padding: "0 5%",
        pb: 8,
      }}
    >
      <BackLink />
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontFamily: "Integral, sans-serif",
          texTransform: "uppercase",
          fontSize: "clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem)",
        }}
      >
        {categoryName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          mt: 2,
          mb: 2,
        }}
      >
        <Brand list={brands} />
        <Sort />
        <Rate />
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
              <CardImage>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
              </CardImage>
              <CardTopContainer>
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
              </CardTopContainer>
              <CardMiddleContainer>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                />
              </CardMiddleContainer>
              <CardBottomContainer>
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
              </CardBottomContainer>
            </Box>
          ))
        ) : produits.length === 0 ? (
          <>
            <Box
              sx={{
                marginTop: 1,
                textAlign: "center",
              }}
            >
              <h1>
                Oops ! Aucune catégorie ne correspond, merci de revenir en lieu
                sûr.
              </h1>
            </Box>
          </>
        ) : (
          // Display product list once loaded
          <>
            {produits.map((produit) => (
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
                <CardImage>
                  <img
                    src={convertirUint8ArrayEnUrl(
                      new Uint8Array(produit.image.data)
                    )}
                    alt={`${produit.title}`}
                  />
                </CardImage>
                <CardTopContainer>
                  <h3>{produit.title}</h3>
                  <TextLowOpacity>{produit.brand}</TextLowOpacity>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Prix prix={produit.currentPrice} />
                    <span>&nbsp;·&nbsp;</span>
                    <TextLowOpacity>{produit.quantity}</TextLowOpacity>
                  </Box>
                </CardTopContainer>
                <CardMiddleContainer>
                  <TextLowOpacity>
                    {produit.description.substring(0, 120)}...
                  </TextLowOpacity>
                </CardMiddleContainer>
                <CardBottomContainer>
                  <Rating
                    name="read-only"
                    value={4.5}
                    precision={0.5}
                    readOnly
                  />
                  <BuyButton
                    onClick={(e) => {
                      e.stopPropagation();
                      goToUrl(produit.url);
                    }}
                  >
                    {t("product.button")}
                  </BuyButton>
                </CardBottomContainer>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Category;