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

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-top: 1rem;
`;

export const HomePage = () => (
  <WelcomeContainer>
    <Title>Welcome to the Process Workflow Platform</Title>
    <Subtitle>
      You are now logged in. Select a module from the navigation to get started.
    </Subtitle>
  </WelcomeContainer>
);

export default HomePage;