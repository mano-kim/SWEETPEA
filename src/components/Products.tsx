import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaHeart, FaStar, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductsContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(221, 160, 221, 0.15);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProductBadge = styled.div<{ type: 'new' | 'trending' }>`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${props => props.type === 'new' ? '#ff6b9d' : '#dda0dd'};
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const ProductActions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ActionButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff6b9d;
    color: white;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff6b9d;
  margin-bottom: 15px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: linear-gradient(135deg, #ff4d8d 0%, #ff2d7d 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ViewDetailsButton = styled.button`
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #ff6b9d;
  border: 2px solid #ff6b9d;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover {
    background: #ff6b9d;
    color: white;
  }
`;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  is_new: boolean;
  is_trending: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('상품을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number) => {
    setAddingToCart(productId);
    try {
      await axios.post('http://localhost:5000/api/cart', {
        product_id: productId,
        quantity: 1
      });
      alert('장바구니에 추가되었습니다! 🌸');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가에 실패했습니다.');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <ProductsContainer>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>상품을 불러오는 중... 🌸</div>
        </div>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage onClick={() => handleProductClick(product.id)}>
              <img src={product.image_url} alt={product.name} />
              {product.is_new && <ProductBadge type="new">NEW</ProductBadge>}
              {product.is_trending && <ProductBadge type="trending">TRENDING</ProductBadge>}
              <ProductActions>
                <ActionButton>
                  <FaHeart />
                </ActionButton>
                <ActionButton>
                  <FaEye />
                </ActionButton>
              </ProductActions>
            </ProductImage>
            <ProductInfo>
              <ProductName onClick={() => handleProductClick(product.id)}>
                {product.name}
              </ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>₩{product.price.toLocaleString()}</ProductPrice>
              <AddToCartButton
                onClick={() => addToCart(product.id)}
                disabled={addingToCart === product.id}
              >
                {addingToCart === product.id ? (
                  '추가 중...'
                ) : (
                  <>
                    <FaShoppingCart />
                    장바구니에 추가
                  </>
                )}
              </AddToCartButton>
              <ViewDetailsButton onClick={() => handleProductClick(product.id)}>
                상세보기
              </ViewDetailsButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsContainer>
  );
};

export default Products; 