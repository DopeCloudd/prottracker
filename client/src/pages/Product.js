import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Rating, Skeleton } from '@mui/material';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const ProductWrapper = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  @media (max-width: 600px) {
    width: 100%;
    grid-template-rows: repeat(3, auto);
    margin-bottom: 60px;
  }
`;

const ProductImage = styled.div`
  grid-area: 1 / 1 / 4 / 3;

  @media (max-width: 600px) {
    grid-area: 2 / 1 / 3 / 7;
  }

  & img {
    aspect-ratio: 4/4;
    width: 100%;
  }
`;

const ProductHeader = styled.div`
  grid-area: 1 / 3 / 2 / 7;

  @media (max-width: 600px) {
    grid-area: 1 / 1 / 2 / 7;
  }

  & h1 {
    font-size: clamp(1.75rem, 0.8571rem + 2.381vw, 3rem);
  }
`;

const ProductContent = styled.div`
  grid-area: 2 / 3 / 4 / 7;

  @media (max-width: 600px) {
    grid-area: 3 / 1 / 4 / 7;
  }
`;

const PrixDisplay = styled.h2`
  color: #e00034;
  margin-right: 10px;
  font-size: clamp(1.375rem, 0.6607rem + 1.9048vw, 2.375rem);
`;

const TitleSection = styled.h2`
  padding: 0 4px;
  margin-bottom: 10px;
  width: fit-content;
  border-bottom: 3px solid #00A656;
  font-size: clamp(1.375rem, 0.8393rem + 1.4286vw, 2.125rem);
`;

const BuyButton = styled.button`
  position: fixed;
  bottom: 20px;
  width: 60%;
  background-color: #00A656;
  color: white;
  padding: 12px;
  border-radius: 18px;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const BackLinkContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BackLink = styled.p`
  margin-left: auto;
  width: fit-content;
  border-bottom: 1px solid;
  cursor: pointer;
  opacity: 0.5;

  &:before {
    content: '< ';
  }
`;

const TextLowOpacity = styled.p`
  opacity: 0.5;
  font-size: clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem);
`;

const TextDescription = styled.div`
  font-size: clamp(1rem, 0.6429rem + 0.9524vw, 1.5rem);
`;

// Format the number in euros
const Prix = ({ prix }) => {

  const prixFormate = prix.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  });

  return (
    <PrixDisplay>{prixFormate}</PrixDisplay>
  );
};

// Function to convert Uint8Array to image URL
const convertirUint8ArrayEnUrl = (uint8Array) => {
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const url = URL.createObjectURL(blob);
  return url;
};

function Product() {

  // State of product information management
  const [product, setProduct] = useState([]);
  // axios request loading management state
  const [loading, setLoading] = useState(true);
  // For translation
  const { t } = useTranslation();
  // Retrieve the categoryId parameter from the page URL
  const { productId } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        // For production
        const response = await axios.get(`/api/product/${productId}`);
        // For developement
        //const response = await axios.get(`http://localhost:3032/api/product/${productId}`);
        // Set product informations
        setProduct(response.data);
        // End load
        setLoading(false);
      } catch (error) { // Error handling
        console.error('Erreur lors de la récupération des informations du produit', error);
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  // For navigation
  const navigate = useNavigate();
  // Function that sends to the list of all products in the category
  const backToList = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  // Function that sends to merchant site url
  const goToUrl = (url) => {
    window.open(url, "_blank")
  };
  // Function that sends to the list of all products in the category
  const backPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Container>
      {loading ? (
        // Display Skeleton cards during loading
        <>
          <ProductWrapper>
            <ProductImage>
              <Skeleton variant="rectangular" width={'100%'} height={300}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.13)'
                }}
              />
            </ProductImage>
            <ProductHeader>
              <Skeleton variant="rectangular" width={'60%'} height={100}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
            </ProductHeader>
            <ProductContent>
              <Skeleton variant="rectangular" width={'100%'} height={300}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
            </ProductContent>
          </ProductWrapper>
        </>
      ) : (
        product == null ? (
          // If parameter id doesn't exist
          <>
            <BackLinkContainer>
              <div></div>
              <BackLink onClick={() => backPreviousPage()}>{t('main.back')}</BackLink>
            </BackLinkContainer>
            <Box sx={{
              marginTop: 1,
              textAlign: 'center'
            }}>
              <h1>Oops ! Aucun produit ne correspond, merci de revenir en lieu sûr.</h1>
            </Box>
          </>
        ) : (
          // Display product information
          <>
            <BackLinkContainer>
              <div></div>
              <BackLink onClick={() => backToList(product.id_category)}>{t('main.back')}</BackLink>
            </BackLinkContainer>
            <ProductWrapper>
              <ProductImage>
                <img
                  src={convertirUint8ArrayEnUrl(new Uint8Array(product.image.data))}
                  alt={`Image de ${product.title}`}
                />
              </ProductImage>
              <ProductHeader>
                <h1>{product.title}</h1>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'end'
                  }}
                >
                  <Prix prix={product.currentPrice} />
                  <TextLowOpacity>{product.quantity}</TextLowOpacity>
                </Box>
                <TextLowOpacity>Vendu par {product.brand}</TextLowOpacity>
                <TextLowOpacity>Prix le plus bas : {product.lowestPrice} €</TextLowOpacity>
              </ProductHeader>
              <ProductContent>
                <TitleSection>Score</TitleSection>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                <TitleSection>Analyse</TitleSection>
                <TextDescription>
                  Notre analyse de la composition de ce produit a pu mettre en avant que ...
                </TextDescription>
                <TitleSection>Description</TitleSection>
                <TextDescription>{product.description}</TextDescription>
              </ProductContent>
            </ProductWrapper>
            <BuyButton onClick={() => goToUrl(product.url)}>{t('product.button')}</BuyButton>
          </>
        )
      )}
    </Container>
  );
}

export default Product;