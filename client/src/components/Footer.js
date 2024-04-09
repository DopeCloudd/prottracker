import styled from "styled-components";
import * as React from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  color: #EAEDED;
`;

function Footer() {

    // For translation
    const { t } = useTranslation();

    return (
        <Container>
            <p>Copyright © 2024 MYPROTTRACKER. {t('copyright.rights')} {t('copyright.terms')}</p>
        </Container>
    );
}

export default Footer;