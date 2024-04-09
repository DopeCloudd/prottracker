import styled from "styled-components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from '@mui/material';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  color: white;
`;

const Card = styled.div`
  width: 60%;
  background-color: #171717;
  box-shadow: 0px 0px 15px 2px #0c0c0c;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  margin: 4px 0;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 12px;

  &:first-letter {
    color: #00A656;
  }
`;

const CardContent = styled.div``;

function Filtres() {

  // State of category list management
  const [categories, setCategories] = useState([]);
  // axios request loading management state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // For production
        const response = await axios.get(`/api/categories`);
        // For developement
        //const response = await axios.get(`http://localhost:3032/api/categories`);
        // Set categories
        setCategories(response.data);
        // End loading
        setLoading(false);
      } catch (error) { // Error handling
        console.error('Erreur lors de la récupération des categories', error);
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
    <Container>
      {loading ? (
        // Display Skeleton cards during loading
        Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardTitle>
              <Skeleton variant="rectangular" width={'40%'} height={50}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
            </CardTitle>
            <CardContent>
              <Skeleton variant="rectangular" width={'100%'} height={25}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
            </CardContent>
          </Card>
        ))
      ) : (
        categories.map((category) => (
          <Card onClick={() => handleButtonClick(category.id)}>
            <CardTitle>{t(`${category.name}.title`)}</CardTitle>
            <CardContent>{t(`${category.name}.description`)}</CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Filtres;