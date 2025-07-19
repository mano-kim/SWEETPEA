import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 10px 20px;
  text-align: center;
`;

const WelcomeText = styled.p`
  font-size: 0.7rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <WelcomeText>
        🍀 아름답고 감성적인 리빙 소품들을 만나보세요. 
        스위트피처럼 달콤하고 우아한 일상의 아름다움을 선물합니다. 🍀
      </WelcomeText>
    </HomeContainer>
  );
};

export default Home; 