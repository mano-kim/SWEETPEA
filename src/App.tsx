import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import CustomerService from './components/CustomerService';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Header />
              <Cart />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <Header />
              <ProductDetail />
            </>
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customer-service" element={<CustomerService />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App; 