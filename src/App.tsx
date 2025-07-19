import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import NewArrival from './components/NewArrival';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppContainer = styled.div`
  min-height: 100vh;
  background: white;
  width: 1200px;         // 고정 폭
  max-width: 100vw;      // 화면보다 커지지 않게
  min-width: 1200px;     // 최소 폭 고정
  margin: 0 auto;        // 중앙 정렬
  box-shadow: 0 0 24px 0 rgba(221,160,221,0.06); // 약간의 그림자(선택)
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-arrival" element={<NewArrival />} />
        </Routes>
        <Hero />
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App; 