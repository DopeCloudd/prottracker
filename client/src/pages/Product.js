import * as React from "react";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Box, Rating, Skeleton} from '@mui/material';

const ProductWrapper = styled.div`
    width: 60%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
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
    font-size: clamp(1.375rem, 0.9063rem + 1.25vw, 2rem);
`;

const TitleSection = styled.h2`
    padding: 0 4px;
    margin-bottom: 10px;
    width: fit-content;
    border-bottom: 3px solid #00A656;
    font-size: clamp(1.375rem, 0.9063rem + 1.25vw, 2rem);
`;

const BuyButton = styled.button`
    width: 100%;
    background-color: #00A656;
    color: white;
    padding: 12px;
    margin: 12px 0;
    border-radius: 18px;
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 90%;
    }
`;

const TextLowOpacity = styled.p`
    opacity: 0.5;
    font-size: clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem);
`;

const TextDescription = styled.div`
    font-size: clamp(1rem, 0.7188rem + 0.75vw, 1.375rem);
`;

// Format the number in euros
const Prix = ({prix}) => {

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
    const blob = new Blob([uint8Array], {type: 'image/jpeg'});
    const url = URL.createObjectURL(blob);
    return url;
};

function Product() {

    // State of product information management
    const [product, setProduct] = useState([]);
    // axios request loading management state
    const [loading, setLoading] = useState(true);
    // For translation
    const {t} = useTranslation();
    // Retrieve the categoryId parameter from the page URL
    const {productId} = useParams();

    useEffect(() => {
        const getProduct = async () => {
            try {
                // For production
                //const response = await axios.get(`/api/product/${productId}`);
                // For developement
                const response = await axios.get(`http://localhost:3032/api/product/${productId}`);
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
        <Box
            sx={{
                padding: '0 5%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '16px',
                }}
            >
                <div></div>
                <Box
                    component='p'
                    onClick={() => backPreviousPage()}
                    sx={{
                        width: 'fit-content',
                        borderBottom: '1px solid',
                        opacity: '0.5',
                        cursor: 'pointer',
                        '&::before': {
                            content: '"< "',
                        }
                    }}
                >
                    {t('main.back')}
                </Box>
            </Box>
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
                                      sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}}/>
                        </ProductHeader>
                        <ProductContent>
                            <Skeleton variant="rectangular" width={'100%'} height={300}
                                      sx={{bgcolor: 'rgba(255, 255, 255, 0.13)'}}/>
                        </ProductContent>
                    </ProductWrapper>
                </>
            ) : (
                product == null ? (
                    // If parameter id doesn't exist
                    <>
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
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '50% 1fr',
                                gridTemplateRows: '1fr',
                                gridColumnGap: '0px',
                                gridRowGap: '0px',
                            }}
                        >
                            <Box
                                sx={{
                                    '& img': {
                                        aspectRatio: '4/4',
                                        width: '100%',
                                    }
                                }}
                            >
                                <img
                                    src={convertirUint8ArrayEnUrl(new Uint8Array(product.image.data))}
                                    alt={`Image de ${product.title}`}
                                />
                            </Box>
                            <Box
                                sx={{
                                    padding: 2,
                                    backgroundColor: '#171717',
                                    borderRadius: '10px',
                                }}
                            >
                                <h1>{product.title}</h1>
                                <Rating name="read-only" value={4.5} precision={0.5} readOnly/>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'end'
                                    }}
                                >
                                    <Prix prix={product.currentPrice}/>
                                    <TextLowOpacity>{product.quantity}</TextLowOpacity>
                                </Box>
                                <TextLowOpacity>Vendu par {product.brand}</TextLowOpacity>
                                <TextLowOpacity>Prix le plus bas : {product.lowestPrice} €</TextLowOpacity>
                                <BuyButton onClick={() => goToUrl(product.url)}>{t('product.button')}</BuyButton>
                                <TitleSection>Analyse</TitleSection>
                                <TextDescription>
                                    Notre analyse de la composition de ce produit a pu mettre en avant que ...
                                </TextDescription>
                                <TitleSection>Description</TitleSection>
                                <TextDescription>{product.description}</TextDescription>
                            </Box>
                        </Box>
                    </>
                )
            )}
        </Box>
    );
}

export default Product;