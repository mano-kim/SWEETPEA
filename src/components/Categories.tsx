import React from 'react';
import styled from 'styled-components';
import { FaCoffee, FaUtensils, FaGlassWhiskey, FaGift } from 'react-icons/fa';

const CategoriesSection = styled.section`
  padding: 80px 20px;
  background: #fafafa;
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  color: #ff6b9d;
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const CategoryDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const categories = [
  {
    id: 1,
    title: '커피잔 & 머그컵',
    description: '따뜻한 아침을 시작하는 예쁜 커피잔과 머그컵',
    icon: <FaCoffee />,
  },
  {
    id: 2,
    title: '식기류',
    description: '일상의 식사를 더욱 특별하게 만드는 아름다운 식기',
    icon: <FaUtensils />,
  },
  {
    id: 3,
    title: '유리잔 & 컵',
    description: '투명하고 깔끔한 유리잔으로 음료를 더욱 맛있게',
    icon: <FaGlassWhiskey />,
  },
  {
    id: 4,
    title: '선물세트',
    description: '소중한 사람에게 전하는 특별한 선물세트',
    icon: <FaGift />,
  },
];

const Categories: React.FC = () => {
  return (
    <CategoriesSection id="categories">
      <Container>
        <SectionTitle>카테고리</SectionTitle>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard key={category.id}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </CategoriesSection>
  );
};

export default Categories; 