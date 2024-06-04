import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Categories() {
  // State of category list management
  const [categories, setCategories] = useState([]);
  // axios request loading management state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // For production
        //const response = await axios.get(`/api/categories`);
        // For developement
        const response = await axios.get(
          `http://localhost:3032/api/categories`
        );
        // Set categories
        setCategories(response.data);
        // End loading
        setLoading(false);
      } catch (error) {
        // Error handling
        console.error("Erreur lors de la récupération des categories", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // For translation
  const { t } = useTranslation();
  // For navigate
  const navigate = useNavigate();
  // Function to go to the selected category
  const handleButtonClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Box sx={{ pb: { xs: 8, sm: 0 } }}>
      <Box
        component="section"
        sx={{
          padding: "2%",
          color: "#EAEDED",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
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
          CHOISISSEZ UNE <span>CATEGORIE</span>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)", // 1 colonne sur les petits écrans
            sm: "repeat(2, 1fr)", // 2 colonnes sur les écrans moyens
            md: "repeat(3, 1fr)", // 3 colonnes sur les grands écrans
          },
          gap: "20px",
          padding: "3% 5%",
        }}
      >
        {loading
          ? // Display Skeleton cards during loading
            Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#171717",
                  boxShadow: "0px 0px 15px 2px #0c0c0c",
                  padding: "20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  margin: "4px 0",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "12px",
                    "&:first-letter": {
                      color: "#00A656",
                    },
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"40%"}
                    height={50}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                  />
                </Typography>
                <div>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={65}
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.13)" }}
                  />
                </div>
              </Box>
            ))
          : categories.map((category, index) => (
              <Box
                key={index}
                onClick={() => handleButtonClick(category.id)}
                sx={{
                  backgroundColor: "#171717",
                  boxShadow: "0px 0px 15px 2px #0c0c0c",
                  padding: "20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  margin: "4px 0",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "12px",
                    fontFamily: "Integral, sans-serif",
                    fontSize: "clamp(1rem, 0.4375rem + 1.5vw, 1.75rem)",
                    texTransform: "uppercase",
                    "&:first-letter": {
                      color: "#00A656",
                    },
                  }}
                >
                  {t(`${category.name}.title`)}
                </Typography>
                <Box
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    lineClamp: 3,
                  }}
                >
                  {t(`${category.name}.description`)}
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  );
}

export default Categories;
