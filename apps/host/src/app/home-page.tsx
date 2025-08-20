import React from 'react';
import styled from 'styled-components';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
`;

export const HomePage = () => (
  <WelcomeContainer>
    <Title>Welcome to the Process Workflow Platform</Title>
  </WelcomeContainer>
);

export default HomePage;