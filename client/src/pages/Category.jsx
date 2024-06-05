import { Box, Rating, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackLink from "../components/BackLink";
import DisplayFilters from "../components/filters/DisplayFilters";
import BuyButton from "../components/product/BuyButton";
import Price from "../components/product/Price";

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
  // State of filters
  const [filters, setFilters] = useState({
    sort: "",
    brand: "",
  });

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

  const filterAndSortProducts = () => {
    let filteredProducts = produits.filter((product) => {
      const matchesBrand = filters.brand
        ? product.brand.toLowerCase().includes(filters.brand.toLowerCase())
        : true;
      return matchesBrand;
    });

    switch (filters.sort) {
      case "Ascending Price":
        return filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
      case "Descending Price":
        return filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
      case "Ascending Rate":
        return filteredProducts.sort((a, b) => a.rating - b.rating);
      case "Descending Rate":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
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
      <DisplayFilters
        brandList={brands}
        filters={filters}
        setFilters={setFilters}
      />
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
            {filterAndSortProducts().map((produit) => (
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
                      fontSize: "1rem",
                      opacity: "0.5",
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
                      fontSize: "1rem",
                      opacity: "0.5",
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
                    value={produit.rating || 4}
                    precision={0.1}
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

export default Category;
