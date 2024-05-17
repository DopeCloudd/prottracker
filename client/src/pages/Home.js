import styled from "styled-components";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Highlights from "../components/Highlights";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const HomeContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MainSection = styled.section`
    width: 100%;
    padding: 2%;
    background-color: #171717;
    color: #EAEDED;
    text-align: center;
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
        padding: 5%;
    }

    & h1 {
        width: 80%;
        font-family: "Integral", sans-serif;
        text-transform: uppercase;
        font-size: clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem);

        @media (max-width: 600px) {
            width: 100%;
        }

        & span {
            color: #00A656;
            font-family: "Integral Oblique", sans-serif;
            text-transform: uppercase;
            font-size: clamp(1.625rem, -0.4063rem + 6.5vw, 3.25rem);
        }
    }
`;

const ButtonSection = styled.section`
    background-color: #171717;
    padding-top: 40px;
    height: fit-content;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
`;

const BottomButton = styled.button`
    width: 40%;
    background-color: #00A656;
    color: #FFFFFF;
    padding: 12px;
    border-radius: 18px;
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
`;

function Home() {

    // For translation
    const {t} = useTranslation();
    // For navigation
    const navigate = useNavigate();
    // Go to filtres page
    const handleButtonClick = () => {
        navigate("/categories");
    };

    return (
        <Container>
            <HomeContent>
                <MainSection>
                    <h1 dangerouslySetInnerHTML={{__html: t("home.main-text")}}/>
                </MainSection>
                <ButtonSection>
                    <BottomButton onClick={handleButtonClick}>
                        {t('home.button')}
                    </BottomButton>
                </ButtonSection>
                <Hero/>
                <Highlights/>
                <Pricing/>
            </HomeContent>
        </Container>
    );
}

export default Home;