import * as React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: white;
`;

function NotFound() {

    // For navigation
    const navigate = useNavigate();

    return (
        <Container>
            <h1>Erreur 404</h1>
            <h2>Page non trouvée</h2>
        </Container>
    );
}

export default NotFound;