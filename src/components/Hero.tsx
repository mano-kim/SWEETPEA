import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  background: white;
  min-height: 100vh;
`;

// Hero Section
const HeroSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
`;

const HeroImage = styled.div`
  margin-bottom: 40px;
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

// Main Banner
const MainBanner = styled.div`
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
  padding: 40px 20px;
  margin: 20px 0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(221,160,221,0.1);
`;

const BannerContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDesc = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const BannerBtn = styled.button`
  background: linear-gradient(135deg, #ff6b9d 0%, #dda0dd 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255,107,157,0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,107,157,0.4);
  }
`;

// Category Navigation
const CategoryNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const CategoryBtn = styled.button`
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  padding: 15px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  
  &:hover {
    border-color: #ff6b9d;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255,107,157,0.2);
  }
`;

const CategoryIcon = styled.span`
  font-size: 1.5rem;
`;

// Product Grid
const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin: 40px 0 20px 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const ProductEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #ff6b9d;
  margin-bottom: 15px;
`;

const CartButton = styled.button`
  background: linear-gradient(135deg, #ff6b9d 0%, #dda0dd 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255,107,157,0.3);
  }
`;

// Event Banner
const EventBanner = styled.div`
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
  padding: 30px 20px;
  margin: 40px 0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(221,160,221,0.1);
`;

// Trending Section
const TrendingSection = styled.div`
  background: white;
  padding: 40px 20px;
  margin: 40px 0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const TrendingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const TrendingTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TrendingNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TrendingUpdate = styled.span`
  font-size: 1rem;
  color: #666;
`;

const TrendingPagination = styled.div`
  display: flex;
  gap: 10px;
`;

const PageCircle = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  background: ${props => props.active ? '#ff6b9d' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#666'};
  
  &:hover {
    background: ${props => props.active ? '#ff6b9d' : '#e0e0e0'};
  }
`;

const TrendingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeaturedProduct = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 15px;
`;

const ProductImageContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const FeaturedProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const AwardBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #4CAF50;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ViewCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const BrandName = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
`;

const FeaturedProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const OriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
`;

const DiscountPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #4CAF50;
`;

const ProductTags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Tag = styled.span<{ color: string }>`
  background: ${props => props.color};
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const TrendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TrendingItem = styled.div<{ active: boolean }>`
  background: ${props => props.active ? '#fff5f7' : 'white'};
  border: 2px solid ${props => props.active ? '#ff6b9d' : '#f0f0f0'};
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff6b9d;
    transform: translateY(-2px);
  }
`;

const TrendingItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const TrendingRank = styled.span`
  background: #ff6b9d;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TrendingItemName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

// Sample Products Data
const sampleProducts = [
  { id: 1, name: "화이트 꽃병", price: 45000, emoji: "🏺" },
  { id: 2, name: "세라믹 머그컵", price: 28000, emoji: "☕" },
  { id: 3, name: "화이트 꽃", price: 32000, emoji: "🌸" },
  { id: 4, name: "라벤더 디퓨저", price: 38000, emoji: "🌿" },
  { id: 5, name: "핑크 쿠션", price: 25000, emoji: "🛋️" },
  { id: 6, name: "아로마 캔들", price: 22000, emoji: "🕯️" }
];

const Hero: React.FC = () => {
  const [currentTrendingPage, setCurrentTrendingPage] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const navigate = useNavigate();
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

  const handleTrendingPageChange = (page: number) => {
    setCurrentTrendingPage(page);
    setSelectedProduct(null);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  return (
    <MainContainer>
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
          onClick={()=>navigate('/register')}
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
    </MainContainer>
  );
};

export default Hero; 