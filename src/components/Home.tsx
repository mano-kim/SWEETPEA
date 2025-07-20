import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import NewArrival from './NewArrival';
import Features from './Features';
import Categories from './Categories';
import Contact from './Contact';
import Footer from './Footer';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero />
      <NewArrival />
      <Features />
      <Categories />
      <Contact />
      <Footer />
    </HomeContainer>
  );
};

export default Home; 