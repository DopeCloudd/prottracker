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
  padding: 8px;
  color: white;
`;

const Card = styled.div`
  width: 60%;
  height: 220px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #171717;
  box-shadow: 0px 0px 15px 2px #0c0c0c;
  margin: 4px 0;
  border-radius: 10px;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

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
  width: fit-content;
  border-bottom: 1px solid;
  opacity: 0.5;
  cursor: pointer;

  &:before {
    content: '< ';
  }
`;

const BuyButton = styled.button`
  width: 40%;
  background-color: #00A656;
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

    const prixFormate = prix.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    });

    return (
        <h4>{prixFormate}</h4>
    );
};

// Function to convert Uint8Array to image URL
const convertirUint8ArrayEnUrl = (uint8Array) => {
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    return url;
};

function Category() {

    // State of products list
    const [produits, setProduits] = useState([]);
    // State of loading axios request
    const [loading, setLoading] = useState(true);

    // Translate
    const { t } = useTranslation();

    // Retrieve the categoryId parameter from the page URL
    const { categoryId } = useParams();

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                // For production
                const response = await axios.get(`/api/products/${categoryId}`);
                // For developement
                //const response = await axios.get(`http://localhost:3032/api/products/${categoryId}`);
                // Set products list in price order
                setProduits(response.data.sort((a, b) => a.currentPrice - b.currentPrice));
                // End of loading axios request
                setLoading(false);
            } catch (error) { // Error handling
                console.error('Erreur lors de la récupération des produits', error);
                setLoading(false);
            }
        };

        fetchProduits();
    }, [categoryId]);

    // Add navigate
    const navigate = useNavigate();
    // Function that sends to the product file according to the product id
    const goToProduct = (productId) => {
        navigate(`/product/${productId}`);
    };
    // Function sending to category selection
    const backToCategory = () => {
        navigate(`/filtres`);
    };
    // Function that sends to the list of all products in the category
    const backPreviousPage = () => {
        navigate(-1);
    };
    // Function that sends to merchant site url
    const goToUrl = (url) => {
        window.open(url, "_blank")
    };

    return (
        <Container>
            {loading ? (
                // Display Skeleton cards during loading
                Array.from({ length: 5 }).map((_, index) => (
                    <Card key={index}>
                        <CardImage>
                            <Skeleton variant="rectangular" width={'100%'} height={'100%'}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                        </CardImage>
                        <CardTopContainer>
                            <Skeleton variant="h3" width={'100%'}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                            <Skeleton variant="p" width={'40%'}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                            <Skeleton variant="h4" width={'40%'}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                        </CardTopContainer>
                        <CardMiddleContainer>
                            <Skeleton variant="rectangular" width={'100%'} height={'100%'}
                                sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                        </CardMiddleContainer>
                        <CardBottomContainer>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Skeleton variant="rectangular" width={'30%'} height={'80%'}
                                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                                <Skeleton variant="rectangular" width={'30%'} height={'80%'}
                                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }} />
                            </Box>
                        </CardBottomContainer>
                    </Card>
                ))
            ) : (
                produits.length === 0 ? (
                    <>
                        <BackLinkContainer>
                            <div></div>
                            <BackLink onClick={() => backPreviousPage()}>{t('main.back')}</BackLink>
                        </BackLinkContainer>
                        <Box sx={{
                            marginTop: 1,
                            textAlign: 'center'
                        }}>
                            <h1>Oops ! Aucune catégorie ne correspond, merci de revenir en lieu sûr.</h1>
                        </Box>
                    </>
                ) : (
                    // Display product list once loaded
                    <>
                        <BackLinkContainer>
                            <div></div>
                            <BackLink onClick={() => backToCategory()}>{t('main.back')}</BackLink>
                        </BackLinkContainer>
                        {produits.map((produit) => (
                            <Card key={produit.id} onClick={() => goToProduct(produit.id)}>
                                <CardImage>
                                    <img
                                        src={convertirUint8ArrayEnUrl(new Uint8Array(produit.image.data))}
                                        alt={`Image de ${produit.title}`}
                                    />
                                </CardImage>
                                <CardTopContainer>
                                    <h3>{produit.title}</h3>
                                    <TextLowOpacity>{produit.brand}</TextLowOpacity>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Prix
                                            prix={produit.currentPrice} /><span>&nbsp;·&nbsp;</span><TextLowOpacity>{produit.quantity}</TextLowOpacity>
                                    </Box>
                                </CardTopContainer>
                                <CardMiddleContainer>
                                    <TextLowOpacity>{produit.description.substring(0, 120)}...</TextLowOpacity>
                                </CardMiddleContainer>
                                <CardBottomContainer>
                                    <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                                    <BuyButton onClick={(e) => {
                                        e.stopPropagation();
                                        goToUrl(produit.url);
                                    }}>
                                        {t('product.button')}
                                    </BuyButton>
                                </CardBottomContainer>
                            </Card>
                        ))}
                    </>
                )
            )}
        </Container>
    );
}

export default Category;