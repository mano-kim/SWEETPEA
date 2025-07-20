import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft, FaMinus, FaPlus, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import axios from 'axios';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
`;

const BackButton = styled.button`
  position: fixed;
  top: 30px;
  left: 30px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: translateX(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProductSection = styled.div`
  max-width: 1200px;
  margin: 80px auto 0;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageBadge = styled.div<{ type: 'new' | 'trending' }>`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${props => props.type === 'new' ? '#ff6b9d' : '#dda0dd'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
`;

const ImageActions = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff6b9d;
    color: white;
    transform: scale(1.1);
  }
`;

const InfoSection = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProductCategory = styled.div`
  color: #ff6b9d;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
`;

const PriceSection = styled.div`
  margin-bottom: 30px;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff6b9d;
  margin-bottom: 10px;
`;

const StockInfo = styled.div`
  color: #27ae60;
  font-weight: 600;
  font-size: 1rem;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const QuantityLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff6b9d;
    color: white;
  }
  
  &:disabled {
    background: #e9ecef;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 45px;
  border: none;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  background: white;
  
  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 2;
  padding: 18px 30px;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background: linear-gradient(135deg, #ff4d8d 0%, #ff2d7d 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 157, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const WishlistButton = styled.button`
  flex: 1;
  padding: 18px 20px;
  background: transparent;
  color: #ff6b9d;
  border: 2px solid #ff6b9d;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background: #ff6b9d;
    color: white;
  }
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #666;
  font-size: 0.95rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  
  h2 {
    color: #e74c3c;
    margin-bottom: 20px;
  }
  
  button {
    padding: 12px 24px;
    background: #ff6b9d;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
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

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      setError('상품을 불러오는데 실패했습니다.');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await axios.post('http://localhost:5000/api/cart', {
        product_id: product.id,
        quantity: quantity
      });
      alert('장바구니에 추가되었습니다! 🌸');
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니 추가에 실패했습니다.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        상품을 불러오는 중... 🌸
      </LoadingContainer>
    );
  }

  if (error || !product) {
    return (
      <ErrorContainer>
        <h2>상품을 찾을 수 없습니다</h2>
        <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
      </ErrorContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>
      
      <ProductSection>
        <ProductLayout>
          <ImageSection>
            <ProductImage src={product.image_url} alt={product.name} />
            {product.is_new && <ImageBadge type="new">NEW</ImageBadge>}
            {product.is_trending && <ImageBadge type="trending">TRENDING</ImageBadge>}
            <ImageActions>
              <ActionButton>
                <FaHeart />
              </ActionButton>
              <ActionButton>
                <FaStar />
              </ActionButton>
            </ImageActions>
          </ImageSection>
          
          <InfoSection>
            <ProductCategory>{product.category}</ProductCategory>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            
            <PriceSection>
              <Price>₩{product.price.toLocaleString()}</Price>
              <StockInfo>재고: {product.stock}개</StockInfo>
            </PriceSection>
            
            <QuantitySection>
              <QuantityLabel>수량:</QuantityLabel>
              <QuantityControl>
                <QuantityButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </QuantityButton>
                <QuantityInput
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stock}
                />
                <QuantityButton
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <FaPlus />
                </QuantityButton>
              </QuantityControl>
            </QuantitySection>
            
            <ActionButtons>
              <AddToCartButton
                onClick={addToCart}
                disabled={addingToCart || product.stock === 0}
              >
                {addingToCart ? (
                  '추가 중...'
                ) : (
                  <>
                    <FaShoppingCart />
                    장바구니에 추가
                  </>
                )}
              </AddToCartButton>
              <WishlistButton>
                <FaHeart />
                위시리스트
              </WishlistButton>
            </ActionButtons>
            
            <FeaturesSection>
              <Feature>
                <FaTruck />
                무료 배송
              </Feature>
              <Feature>
                <FaShieldAlt />
                안전한 결제
              </Feature>
              <Feature>
                <FaUndo />
                환 보장
              </Feature>
            </FeaturesSection>
          </InfoSection>
        </ProductLayout>
      </ProductSection>
    </DetailContainer>
  );
};

export default ProductDetail; 