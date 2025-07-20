import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const CartTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const CartIcon = styled.div`
  font-size: 2rem;
  color: #ff6b9d;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 20px;
`;

const EmptyCartText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ContinueShoppingButton = styled.button`
  background: #ff6b9d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #ff4d8d;
  }
`;

const CartItemsContainer = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 40px;
`;

const CartItem = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ItemImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b9d;
  margin-bottom: 8px;
`;

const ItemQuantity = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background: #c0392b;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #ff6b9d;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  transition: all 0.3s;
  
  &:hover {
    background: #ff4d8d;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #e74c3c;
  padding: 40px;
`;

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
  total: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/cart');
      setCartItems(response.data);
      setError(null);
    } catch (err) {
      setError('장바구니를 불러오는데 실패했습니다.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      alert('상품이 장바구니에서 제거되었습니다.');
    } catch (err) {
      alert('상품 제거에 실패했습니다.');
      console.error('Error removing from cart:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  const handleCheckout = () => {
    alert('주문 기능은 준비 중입니다! 🛒');
  };

  if (loading) {
    return (
      <CartContainer>
        <LoadingMessage>장바구니를 불러오는 중...</LoadingMessage>
      </CartContainer>
    );
  }

  if (error) {
    return (
      <CartContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <BackButton onClick={() => navigate('/')}>
          <FaArrowLeft />
          뒤로가기
        </BackButton>
        <CartIcon>
          <FaShoppingCart />
        </CartIcon>
        <CartTitle>장바구니</CartTitle>
      </CartHeader>

      {cartItems.length === 0 ? (
        <EmptyCart>
          <EmptyCartIcon>
            <FaShoppingCart />
          </EmptyCartIcon>
          <EmptyCartText>장바구니가 비어있습니다.</EmptyCartText>
          <ContinueShoppingButton onClick={() => navigate('/')}>
            쇼핑 계속하기
          </ContinueShoppingButton>
        </EmptyCart>
      ) : (
        <>
          <CartItemsContainer>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem'
                    }}>
                      🍽️
                    </div>
                  )}
                </ItemImage>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>₩{item.price.toLocaleString()}</ItemPrice>
                  <ItemQuantity>수량: {item.quantity}개</ItemQuantity>
                </ItemInfo>
                <ItemActions>
                  <RemoveButton onClick={() => removeFromCart(item.id)}>
                    <FaTrash />
                    삭제
                  </RemoveButton>
                </ItemActions>
              </CartItem>
            ))}
          </CartItemsContainer>

          <CartSummary>
            <SummaryTitle>주문 요약</SummaryTitle>
            <SummaryRow>
              <span>상품 수:</span>
              <span>{cartItems.length}개</span>
            </SummaryRow>
            <SummaryRow>
              <span>총 수량:</span>
              <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}개</span>
            </SummaryRow>
            <SummaryTotal>
              <span>총 금액:</span>
              <span>₩{calculateTotal().toLocaleString()}</span>
            </SummaryTotal>
            <CheckoutButton onClick={handleCheckout}>
              <FaCreditCard />
              주문하기
            </CheckoutButton>
          </CartSummary>
        </>
      )}
    </CartContainer>
  );
};

export default Cart; 