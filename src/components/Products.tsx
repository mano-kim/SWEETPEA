import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductsSection = styled.section`
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: #ff6b9d;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b9d;
  margin-bottom: 20px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: #ff6b9d;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #ff4d8d;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const products = [
  {
    id: 1,
    title: '로즈골드 머그컵',
    description: '아름다운 로즈골드 머그컵으로 따뜻한 아침을 시작하세요',
    price: '₩15,000',
    emoji: '☕',
  },
  {
    id: 2,
    title: '세라믹 그릇 세트',
    description: '일상의 식사를 더욱 특별하게 만드는 아름다운 그릇 세트',
    price: '₩45,000',
    emoji: '🍽️',
  },
  {
    id: 3,
    title: '유리 와인잔',
    description: '투명하고 깔끔한 유리잔으로 와인을 더욱 맛있게',
    price: '₩25,000',
    emoji: '🍷',
  },
  {
    id: 4,
    title: '도자기 접시 세트',
    description: '전통과 현대가 조화를 이룬 아름다운 접시 세트',
    price: '₩35,000',
    emoji: '🥘',
  },
  {
    id: 5,
    title: '스테인리스 수저 세트',
    description: '깔끔하고 내구성이 좋은 스테인리스 수저 세트',
    price: '₩18,000',
    emoji: '🍴',
  },
  {
    id: 6,
    title: '선물용 커피잔 세트',
    description: '소중한 사람에게 전하는 특별한 커피잔 선물세트',
    price: '₩55,000',
    emoji: '🎁',
  },
];

const Products: React.FC = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    alert('장바구니에 추가되었습니다! 🛒');
  };

  return (
    <ProductsSection id="products">
      <Container>
        <SectionTitle>인기 상품</SectionTitle>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage>
                <span>{product.emoji}</span>
                <WishlistButton>
                  <FaHeart />
                </WishlistButton>
              </ProductImage>
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price}</ProductPrice>
                <AddToCartButton 
                  onClick={() => addToCart(product.id)}
                  disabled={cartItems.includes(product.id)}
                >
                  <FaShoppingCart />
                  {cartItems.includes(product.id) ? '추가됨' : '장바구니 추가'}
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </ProductsSection>
  );
};

export default Products; 