import React from 'react';
import styled from 'styled-components';

const newArrivalProducts = [
  { id: 1, name: '화이트 꽃병', price: 45000, emoji: '🏺' },
  { id: 3, name: '화이트 꽃', price: 32000, emoji: '🌸' },
  { id: 4, name: '화이트 그릇', price: 35000, emoji: '🍽️' },
];

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px 20px;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: #222;
  letter-spacing: 2px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 32px 20px 24px 20px;
  text-align: center;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  }
`;

const ProductEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 18px;
`;

const ProductName = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ProductPrice = styled.div`
  color: #888;
  font-size: 1rem;
  margin-bottom: 18px;
`;

const CartButton = styled.button`
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #555;
  }
`;

const SearchBar = styled.input`
  width: 260px;   // 원하는 크기로 조절
  max-width: 90vw;
  padding: 8px 36px 8px 16px;  // 높이도 줄이고 싶으면 padding도 줄이세요
  border: 2px solid #ffb6c1;
  border-radius: 32px;
  font-size: 1.08rem;
  outline: none;
  background: #fff;
  transition: border 0.2s;
  box-shadow: none;
  &:focus {
    border: 2px solid #dda0dd;
  }
`;

const NewArrival: React.FC = () => {
  return (
    <PageContainer>
      <Title>NEW ARRIVAL</Title>
      <ProductGrid>
        {newArrivalProducts.map(product => (
          <ProductCard key={product.id}>
            <ProductEmoji>{product.emoji}</ProductEmoji>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>₩{product.price.toLocaleString()}</ProductPrice>
            <CartButton onClick={() => alert(`${product.name}을(를) 장바구니에 담았습니다!`)}>
              장바구니
            </CartButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  );
};

export default NewArrival; 