import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaShoppingCart, FaUser, FaLeaf, FaBars, FaTimes, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  background: white;
  min-height: 100vh;
`;

// Top Bar
const TopBar = styled.div`
  background: #F8F8F8;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #E8E8E8;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
    font-size: 11px;
  }
  
  a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
`;

const TopBarRight = styled.div`
  a {
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
`;

// Navigation
const Navigation = styled.nav`
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: 72px;
  box-sizing: border-box;
  border-bottom: 1.5px solid #f3e6f7;
  position: relative;
  z-index: 200;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  transition: color 0.3s;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const NavIcon = styled.div`
  color: #666;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: #333;
  }
`;

const BrandIcon = styled.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
  color: #2E7D32;
  font-size: 30px;
  filter: drop-shadow(0 2px 4px rgba(46, 125, 50, 0.3));
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-radius: 50%;
  padding: 8px;
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%);
  
  &:hover {
    transform: translateX(-50%) scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(46, 125, 50, 0.4));
    background: radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, transparent 70%);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 120px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-top: 1px solid #F0F0F0;
  }
`;

const MobileNavLinks = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MobileNavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  font-weight: 300;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0;
  transition: color 0.3s;
  
  &:hover {
    color: #666;
  }
`;

// Search Modal
const SearchModal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  align-items: center;
  justify-content: center;
`;

const SearchModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const SearchModalClose = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #E8E8E8;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  
  &:focus {
    border-color: #333;
  }
`;

// Cart Modal
const CartModal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  align-items: center;
  justify-content: center;
`;

const CartModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const CartModalClose = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #F0F0F0;
`;

const CartItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: #F8F8F8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const CartItemInfo = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 5px 0;
    font-size: 14px;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;

const CartTotal = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F0F0F0;
  text-align: center;
  
  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  button {
    background: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    
    &:hover {
      background: #555;
    }
  }
`;

// Hero Section
const HeroSection = styled.section`
  min-height: 80vh;
  background: #FAFAFA;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeroPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
  font-size: 18px;
  font-weight: 300;
`;

// Grid Section
const GridSection = styled.section`
  padding: 80px 40px;
  background: white;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const GridItem = styled.div`
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const GridImage = styled.div`
  width: 100%;
  height: 300px;
  background: #F8F8F8;
  margin-bottom: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: linear-gradient(135deg, #E8E8E8 0%, #D8D8D8 100%);
    border-radius: 5px;
  }
`;

const GridTitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #333;
  margin-bottom: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const GridDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  font-weight: 300;
  max-width: 300px;
  margin: 0 auto;
`;

const MainBanner = styled.section`
  width: 100%;
  min-height: auto;
  background: linear-gradient(90deg, #ffb6c1 0%, #dda0dd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 8px 32px rgba(221,160,221,0.08);
  margin-bottom: 40px;
`;
const BannerContent = styled.div`
  text-align: center;
  color: #fff;
`;
const BannerTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 2px;
`;
const BannerDesc = styled.p`
  font-size: 0.95rem;
  font-weight: 300;
  margin-bottom: 24px;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
const BannerBtn = styled.button`
  background: #fff;
  color: #d16ba5;
  border: none;
  border-radius: 24px;
  padding: 12px 36px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255,182,193,0.12);
  transition: background 0.2s;
  margin-top: -8px;
  &:hover { background: #ffe4f0; }
`;

const CategoryNav = styled.section`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;
`;
const CategoryBtn = styled.button`
  background: linear-gradient(135deg, #ffb6c1 60%, #dda0dd 100%);
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 18px 28px;
  font-size: 1.1rem;
  font-weight: 500;
  box-shadow: 0 2px 12px rgba(221,160,221,0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: linear-gradient(135deg, #dda0dd 60%, #ffb6c1 100%); }
`;
const CategoryIcon = styled.span`
  font-size: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d16ba5;
  margin-bottom: 24px;
  margin-top: 32px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
`;
const ProductCard = styled.div`
  background: #fff0f6;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(221,160,221,0.10);
  padding: 32px 20px 24px 20px;
  text-align: center;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 6px 24px rgba(221,160,221,0.18); }
`;
const ProductEmoji = styled.div`
  font-size: 48px;
  margin-bottom: 18px;
`;
const ProductName = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.3;
`;
const ProductPrice = styled.div`
  color: #d16ba5;
  font-size: 1rem;
  margin-bottom: 18px;
`;
const CartButton = styled.button`
  background: linear-gradient(90deg, #ffb6c1 0%, #dda0dd 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #dda0dd; }
`;

const EventBanner = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #dda0dd 0%, #ffb6c1 100%);
  color: #fff;
  border-radius: 24px;
  text-align: center;
  padding: 32px 0 28px 0;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 48px 0 0 0;
  box-shadow: 0 2px 12px rgba(221,160,221,0.10);
`;

const TrendingSection = styled.section`
  padding: 40px 40px;
  background: #fff;
  margin-bottom: 0;
`;

const TrendingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TrendingTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
`;

const TrendingNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #666;
`;

const TrendingUpdate = styled.span`
  color: #d16ba5;
  font-weight: 500;
`;

const TrendingPagination = styled.div`
  display: flex;
  gap: 4px;
`;

const PageCircle = styled.div<{ active?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.active ? '#d16ba5' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#666'};
`;

const TrendingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeaturedProduct = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 16px 24px 12px 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  position: relative;
`;

const ProductImageContainer = styled.div`
  position: relative;
  margin-bottom: 6px;
`;

const FeaturedProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const AwardBadge = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  background: #28a745;
  color: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
`;

const ViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 4px;
`;

const BrandName = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 2px;
`;

const FeaturedProductName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const PriceContainer = styled.div`
  margin-bottom: 6px;
`;

const OriginalPrice = styled.div`
  font-size: 0.7rem;
  color: #999;
  text-decoration: line-through;
  margin-bottom: 2px;
`;

const DiscountPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #28a745;
`;

const ProductTags = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ color: string }>`
  background: ${props => props.color};
  color: #fff;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.6rem;
  font-weight: 500;
`;

const TrendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TrendingItem = styled.div<{ active?: boolean }>`
  padding: 6px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: ${props => props.active ? '2px solid #d16ba5' : '1px solid #f0f0f0'};
  background: ${props => props.active ? '#fff5f7' : '#fff'};
  
  &:hover {
    border-color: #d16ba5;
    background: #fff5f7;
  }
`;

const TrendingItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
`;

const TrendingRank = styled.div`
  width: 14px;
  height: 14px;
  background: #d16ba5;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.55rem;
  font-weight: 600;
`;

const TrendingItemName = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: #333;
  line-height: 1.2;
`;



const sampleProducts = [
  { id: 1, name: '화이트 꽃병', price: 45000, emoji: '🏺' },
  { id: 2, name: '세라믹 머그컵', price: 28000, emoji: '☕' },
  { id: 3, name: '화이트 꽃', price: 32000, emoji: '🌸' },
  { id: 4, name: '화이트 그릇', price: 35000, emoji: '🍽️' },
  { id: 5, name: '테이블웨어', price: 39000, emoji: '☕' },
];

const Hero: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof sampleProducts>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();
  const [searchBarValue, setSearchBarValue] = useState('');
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [currentTrendingPage, setCurrentTrendingPage] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const recentKeywords: string[] = [];
  const trendingKeywords = [
    { word: '핑크쿠션', up: true },
    { word: '라벤더크림', up: false, new: true },
    { word: '머그컵', up: true },
    { word: '플라워', new: true },
    { word: '테이블웨어', up: false },
    { word: '디퓨저', up: true },
    { word: '선물세트', new: true },
    { word: '아로마', up: false },
    { word: '캔들', up: true },
    { word: '쿠션', new: true },
  ];

  const allTrendingProducts = [
    [
      {
        id: 1,
        name: "[모딱이 장난감 추천] 모딱이와 아이들의 즐거운 시간",
        brand: "모딱이",
        price: "12,800",
        originalPrice: "16,000",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "쿠폰", "바로출발"]
      },
      {
        id: 2,
        name: "[예삐야 장난감 추천] 더블기획 8종 골라담기",
        brand: "예삐야",
        price: "28,600",
        originalPrice: "39,900",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "바로출발"]
      },
      {
        id: 3,
        name: "[단독기획] 스위트피아 플라워 그릇 4종 세트",
        brand: "SWEETPEA",
        price: "42,400",
        originalPrice: "53,000",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "단독기획", "테이블웨어"]
      },
      {
        id: 4,
        name: "[NEW] 핑크 라벤더 디퓨저 & 캔들 홈세트",
        brand: "SWEETPEA",
        price: "36,900",
        originalPrice: "46,100",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "NEW", "홈데코"]
      },
      {
        id: 5,
        name: "[베스트] 로즈골드 와인잔 & 치즈보드 세트",
        brand: "SWEETPEA",
        price: "29,600",
        originalPrice: "37,000",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "베스트", "선물세트"]
      }
    ],
    [
      {
        id: 6,
        name: "[뽕양이 추천] 뽕양이 브러쉬 세트",
        brand: "뽕양이",
        price: "15,800",
        originalPrice: "19,800",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "쿠폰", "NEW"]
      },
      {
        id: 7,
        name: "[봉봉이 기획] 봉봉이 머그컵 6종 세트",
        brand: "봉봉이",
        price: "32,600",
        originalPrice: "40,800",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "기획", "테이블웨어"]
      },
      {
        id: 8,
        name: "[단독] 마리화나 꽃병 & 화분 3종 세트",
        brand: "SWEETPEA",
        price: "38,400",
        originalPrice: "48,000",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "단독", "인테리어"]
      },
      {
        id: 9,
        name: "[NEW] 스위트피아 아로마 오일 & 디퓨저",
        brand: "SWEETPEA",
        price: "28,900",
        originalPrice: "36,100",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "NEW", "아로마"]
      },
      {
        id: 10,
        name: "[베스트] 핑크 라벤더 커피잔 & 접시 세트",
        brand: "SWEETPEA",
        price: "24,600",
        originalPrice: "30,800",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "베스트", "커피용품"]
      }
    ],
    [
      {
        id: 11,
        name: "[마봉이 추천] 마봉이 키링 & 스티커 세트",
        brand: "마봉이",
        price: "8,800",
        originalPrice: "11,000",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "쿠폰", "액세서리"]
      },
      {
        id: 12,
        name: "[뽕뽕이 기획] 뽕뽕이 포토카드 & 앨범",
        brand: "뽕뽕이",
        price: "18,600",
        originalPrice: "23,300",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "기획", "포토"]
      },
      {
        id: 13,
        name: "[단독] 스위트피아 플라워 프린트 린넨",
        brand: "SWEETPEA",
        price: "45,400",
        originalPrice: "56,800",
        image: "https://images.unsplash.com/photo-1602928321679-7111d5acd9ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "단독", "홈텍스타일"]
      },
      {
        id: 14,
        name: "[NEW] 라벤더 아로마 캔들 & 매치",
        brand: "SWEETPEA",
        price: "22,900",
        originalPrice: "28,600",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "NEW", "캔들"]
      },
      {
        id: 15,
        name: "[베스트] 로즈골드 티포트 & 찻잔 세트",
        brand: "SWEETPEA",
        price: "52,600",
        originalPrice: "65,800",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        tags: ["세일", "베스트", "티웨어"]
      }
    ]
  ];

  const currentTrendingProducts = allTrendingProducts[currentTrendingPage - 1];
  const displayProduct = selectedProduct;

  // 자동 페이지 전환 (3초마다)
  useEffect(() => {
    let page = currentTrendingPage;
    let products = allTrendingProducts[page - 1];
    let idx = selectedProduct ? products.findIndex(p => p.id === selectedProduct.id) : -1;
    let interval = setInterval(() => {
      if (idx < products.length - 1) {
        idx++;
      } else {
        idx = -1;
        const nextPage = page === 3 ? 1 : page + 1;
        setCurrentTrendingPage(nextPage);
        setSelectedProduct(null);
        return;
      }
      setSelectedProduct(idx === -1 ? null : products[idx]);
    }, isHovering ? 7000 : 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isHovering, currentTrendingPage, selectedProduct]);

  // 페이지가 바뀔 때마다 해당 페이지의 첫 번째 아이템을 자동 선택
  useEffect(() => {
    const products = allTrendingProducts[currentTrendingPage - 1];
    setSelectedProduct(products[0]);
  }, [currentTrendingPage]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = sampleProducts.filter(p => p.name.includes(searchQuery.trim()));
      setSearchResults(results);
      setSearchPerformed(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGridItemClick = (category: string) => {
    if (category === 'NEW ARRIVAL') {
      navigate('/new-arrival');
    } else {
      alert(`${category} 카테고리로 이동합니다.`);
    }
  };

  const handleTopBarClick = (action: string) => {
    alert(`${action} 기능을 실행합니다.`);
  };

  const handleNavClick = (page: string) => {
    alert(`${page} 페이지로 이동합니다.`);
  };

  const handleTrendingPageChange = (page: number) => {
    setCurrentTrendingPage(page);
    // 페이지가 바뀌면 첫 번째 아이템을 선택
    const products = allTrendingProducts[page - 1];
    setSelectedProduct(products[0]);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <MainContainer>
      {/* Navigation */}
      <Navigation>
        <NavLinks>
          <NavLink onClick={() => handleNavClick('ABOUT')}>ABOUT</NavLink>
          <NavLink onClick={() => handleNavClick('SHOP')}>SHOP</NavLink>
          <NavLink onClick={() => handleNavClick('LOOKBOOK')}>LOOKBOOK</NavLink>
          <NavLink onClick={() => handleNavClick('Q&A')}>Q&A</NavLink>
          <NavLink onClick={() => handleNavClick('CONTACT')}>CONTACT</NavLink>
          <NavLink onClick={() => handleNavClick('REVIEW')}>REVIEW</NavLink>
          <NavIcon onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart />
          </NavIcon>
          <NavIcon onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </NavIcon>
        </NavLinks>
        <BrandIcon>
          <FaSeedling />
        </BrandIcon>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </Navigation>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLinks>
          <MobileNavLink onClick={() => { handleNavClick('ABOUT'); setIsMobileMenuOpen(false); }}>ABOUT</MobileNavLink>
          <MobileNavLink onClick={() => { handleNavClick('SHOP'); setIsMobileMenuOpen(false); }}>SHOP</MobileNavLink>
          <MobileNavLink onClick={() => { handleNavClick('LOOKBOOK'); setIsMobileMenuOpen(false); }}>LOOKBOOK</MobileNavLink>
          <MobileNavLink onClick={() => { handleNavClick('Q&A'); setIsMobileMenuOpen(false); }}>Q&A</MobileNavLink>
          <MobileNavLink onClick={() => { handleNavClick('CONTACT'); setIsMobileMenuOpen(false); }}>CONTACT</MobileNavLink>
          <MobileNavLink onClick={() => { handleNavClick('REVIEW'); setIsMobileMenuOpen(false); }}>REVIEW</MobileNavLink>
        </MobileNavLinks>
      </MobileMenu>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen}>
        <SearchModalContent>
          <SearchModalClose onClick={() => { setIsSearchOpen(false); setSearchPerformed(false); setSearchResults([]); setSearchQuery(''); }}>×</SearchModalClose>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>상품 검색</h2>
          <SearchInput
            type="text"
            placeholder="찾고 계신 상품을 검색해보세요..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchPerformed(false); }}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            style={{
              marginTop: '15px',
              background: '#333',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            검색하기
          </button>
          {/* 검색 결과 */}
          {searchPerformed && (
            <div style={{ marginTop: 30 }}>
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontSize: 32 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{item.name}</div>
                      <div style={{ color: '#888', fontSize: 14 }}>₩{item.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#888', marginTop: 20 }}>검색 결과가 없습니다.</div>
              )}
            </div>
          )}
        </SearchModalContent>
      </SearchModal>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen}>
        <CartModalContent>
          <CartModalClose onClick={() => setIsCartOpen(false)}>×</CartModalClose>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>장바구니</h2>
          <CartItem>
            <CartItemImage>🏺</CartItemImage>
            <CartItemInfo>
              <h4>화이트 꽃병</h4>
              <p>₩45,000</p>
            </CartItemInfo>
          </CartItem>
          <CartItem>
            <CartItemImage>☕</CartItemImage>
            <CartItemInfo>
              <h4>세라믹 머그컵</h4>
              <p>₩28,000</p>
            </CartItemInfo>
          </CartItem>
          <CartTotal>
            <h3>총 금액: ₩73,000</h3>
            <button onClick={() => { alert('주문 페이지로 이동합니다.'); setIsCartOpen(false); }}>
              주문하기
            </button>
          </CartTotal>
        </CartModalContent>
      </CartModal>

      {/* Hero Section */}
      <HeroSection>
        <HeroImage>
          <img src="/images/sweetpea-flower.png" alt="Sweetpea Flower" style={{
            width: '320px',
            maxWidth: '90vw',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(221,160,221,0.13)',
            display: 'block',
            margin: '0 auto'
          }} />
        </HeroImage>
      </HeroSection>

      {/* 상단 대형 배너 */}
      <MainBanner>
        <BannerContent>
          <BannerTitle>🌸 스위트피 (Sweet Pea)</BannerTitle>
          <BannerDesc>
            <span style={{color: '#8B5A96'}}>스위트피는 꽃에서 달콤한 향이 나기 때문에 영어로</span> <span style={{color: '#FFD700', fontWeight: 'bold'}}>Sweet (달콤한) Pea (완두)</span><span style={{color: '#8B5A96'}}>라는 이름이 붙었지만, </span>
            <span style={{color: '#A0A0A0'}}>실제 맛이 단 것은 아니며 식용으로는 적합하지 않습니다.</span> <span style={{color: '#8B5A96'}}>특히, 스위트피는 독성을 가진 식물로 알려져 있어, </span>
            <span style={{color: '#A0A0A0'}}>과다 섭취하거나 오랜 기간 먹을 경우 하반신 마비 등의 신경계 이상을 일으킬 수 있습니다.</span> 
            <span style={{color: '#8B5A96'}}>사람뿐 아니라 반려동물(강아지, 고양이 등)에게도 유해하므로 섭취를 피해야 합니다.</span>
            <br /><br />
            <span style={{color: '#9C27B0'}}>현재는 식용보다는 향수, 바디로션, 화장품 원료 등 향료용으로 널리 활용되고 있습니다.</span> 
            <span style={{color: '#8B5A96'}}>스위트피는 1699년 시칠리아 출신의 수도승 프란치스코 쿠파니(Francis Cupani)가 영국에 소개하면서 관상용으로 재배되기 시작했습니다.</span> 
            <span style={{color: '#FFD700', fontWeight: 'bold'}}>19세기 영국의 원예가 헨리 에크포드(Henry Eckford)</span><span style={{color: '#8B5A96'}}>에 의해 화려하고 크기가 큰 품종들이 육성되며 대중화되었습니다.</span>
            <br /><br />
            <span style={{color: '#8B5A96'}}>일본에서는 마츠다 세이코의 히트곡</span> <span style={{color: '#A0A0A0', fontWeight: 'bold'}}>〈붉은 스위트피〉</span><span style={{color: '#8B5A96'}}>로도 유명해져 대중적으로 사랑받고 있습니다.</span>
          </BannerDesc>
          <BannerBtn onClick={()=>navigate('/new-arrival')}>신상품 보러가기</BannerBtn>
        </BannerContent>
      </MainBanner>
      {/* 카테고리 바로가기 */}
      <CategoryNav>
        <CategoryBtn onClick={()=>navigate('/new-arrival')}><CategoryIcon>🆕</CategoryIcon>NEW</CategoryBtn>
        <CategoryBtn><CategoryIcon>⭐</CategoryIcon>BEST</CategoryBtn>
        <CategoryBtn><CategoryIcon>🎁</CategoryIcon>기획전</CategoryBtn>
        <CategoryBtn><CategoryIcon>🍽️</CategoryIcon>테이블웨어</CategoryBtn>
      </CategoryNav>
      {/* 신상품 그리드 */}
      <SectionTitle>신상품</SectionTitle>
      <ProductGrid>
        {sampleProducts.slice(0,3).map(product => (
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
      {/* 베스트 그리드 */}
      <SectionTitle>베스트</SectionTitle>
      <ProductGrid>
        {sampleProducts.slice(1,4).map(product => (
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
      {/* 하단 이벤트 배너 */}
      <EventBanner style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'24px',flexWrap:'wrap'}}>
        <div style={{textAlign:'left'}}>
          <div style={{fontWeight:700,fontSize:'1.15rem',marginBottom:2}}>🎉 지금 회원가입하면 <span style={{color:'#d16ba5',fontWeight:900}}>10% 할인쿠폰</span> 증정!</div>
          <div style={{fontSize:'0.95rem',fontWeight:400}}>SWEETPEA에서만 만나는 특별한 혜택을 놓치지 마세요.</div>
        </div>
        <button
          style={{
            background:'linear-gradient(90deg,#ffb6c1 0%,#dda0dd 100%)',
            color:'#fff',
            border:'none',
            borderRadius:'24px',
            padding:'12px 32px',
            fontSize:'1.08rem',
            fontWeight:700,
            boxShadow:'0 2px 8px rgba(221,160,221,0.12)',
            cursor:'pointer',
            transition:'background 0.2s',
            marginLeft:'12px',
            whiteSpace:'nowrap'
          }}
          onClick={()=>setIsJoinOpen(true)}
        >회원가입</button>
      </EventBanner>

      {/* 급상승 아이템 섹션 */}
      <TrendingSection 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <TrendingHeader>
          <TrendingTitle>급상승 아이템</TrendingTitle>
          <TrendingNav>
            <TrendingUpdate>최근 업데이트</TrendingUpdate>
            <TrendingPagination>
              <PageCircle active={currentTrendingPage === 1} onClick={() => handleTrendingPageChange(1)}>1</PageCircle>
              <PageCircle active={currentTrendingPage === 2} onClick={() => handleTrendingPageChange(2)}>2</PageCircle>
              <PageCircle active={currentTrendingPage === 3} onClick={() => handleTrendingPageChange(3)}>3</PageCircle>
            </TrendingPagination>
          </TrendingNav>
        </TrendingHeader>
        <TrendingContent>
                      <FeaturedProduct>
              <ProductImageContainer>
                {displayProduct ? (
                  <FeaturedProductImage src={displayProduct.image} alt={displayProduct.name} />
                ) : (
                  <div style={{width:'100%',height:'400px',background:'#f3f3f3',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#ccc',fontSize:'1.2rem',marginBottom:'16px'}}>이미지 미리보기</div>
                )}
                <AwardBadge>BEST</AwardBadge>
              </ProductImageContainer>
            {displayProduct && <>
              <ViewCount>
                <FaUser /> 1,234
              </ViewCount>
              <BrandName>{displayProduct.brand}</BrandName>
              <FeaturedProductName>{displayProduct.name}</FeaturedProductName>
              <PriceContainer>
                <OriginalPrice>₩{displayProduct.originalPrice}</OriginalPrice>
                <DiscountPrice>₩{displayProduct.price}</DiscountPrice>
              </PriceContainer>
              <ProductTags>
                {displayProduct.tags.map((tag: string, index: number) => (
                  <Tag key={index} color={tag === '세일' ? '#FF69B4' : tag === '쿠폰' ? '#FFB6C1' : '#DDA0DD'}>{tag}</Tag>
                ))}
              </ProductTags>
            </>}
          </FeaturedProduct>
          <TrendingList>
            {currentTrendingProducts.map(item => (
              <TrendingItem key={item.id} active={!!selectedProduct && selectedProduct.id === item.id} onClick={() => handleProductClick(item)}>
                <TrendingItemHeader>
                  <TrendingRank>{item.id}</TrendingRank>
                  <TrendingItemName>{item.name}</TrendingItemName>
                </TrendingItemHeader>
                <BrandName>{item.brand}</BrandName>
                <PriceContainer>
                  <OriginalPrice>₩{item.originalPrice}</OriginalPrice>
                  <DiscountPrice>₩{item.price}</DiscountPrice>
                </PriceContainer>
                <ProductTags>
                  {item.tags.map((tag: string, index: number) => (
                    <Tag key={index} color={tag === '세일' ? '#FF69B4' : tag === '쿠폰' ? '#FFB6C1' : '#DDA0DD'}>{tag}</Tag>
                  ))}
                </ProductTags>
              </TrendingItem>
            ))}
          </TrendingList>
        </TrendingContent>
      </TrendingSection>

      {/* 로그인 모달 */}
      <SearchModal isOpen={isLoginOpen}>
        <SearchModalContent>
          <SearchModalClose onClick={() => setIsLoginOpen(false)}>×</SearchModalClose>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>로그인</h2>
          <input type="text" placeholder="아이디" style={{width:'100%',marginBottom:10,padding:10}} />
          <input type="password" placeholder="비밀번호" style={{width:'100%',marginBottom:20,padding:10}} />
          <button style={{width:'100%',background:'#333',color:'#fff',padding:10,border:'none',borderRadius:5}}>로그인</button>
        </SearchModalContent>
      </SearchModal>
      {/* 회원가입 모달 */}
      <SearchModal isOpen={isJoinOpen}>
        <SearchModalContent>
          <SearchModalClose onClick={() => setIsJoinOpen(false)}>×</SearchModalClose>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>회원가입</h2>
          <input type="text" placeholder="아이디" style={{width:'100%',marginBottom:10,padding:10}} />
          <input type="password" placeholder="비밀번호" style={{width:'100%',marginBottom:10,padding:10}} />
          <input type="text" placeholder="이메일" style={{width:'100%',marginBottom:20,padding:10}} />
          <button style={{width:'100%',background:'#333',color:'#fff',padding:10,border:'none',borderRadius:5}}>회원가입</button>
        </SearchModalContent>
      </SearchModal>
      {/* 마이페이지 모달 */}
      <SearchModal isOpen={isMyPageOpen}>
        <SearchModalContent>
          <SearchModalClose onClick={() => setIsMyPageOpen(false)}>×</SearchModalClose>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>마이페이지</h2>
          <div style={{marginBottom:20}}>마이페이지 기능은 준비중입니다.</div>
          <button style={{width:'100%',background:'#333',color:'#fff',padding:10,border:'none',borderRadius:5}} onClick={()=>setIsMyPageOpen(false)}>닫기</button>
        </SearchModalContent>
      </SearchModal>
    </MainContainer>
  );
};

export default Hero; 