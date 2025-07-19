import React from 'react';
import styled from 'styled-components';
import { FaTruck, FaShieldAlt, FaHeadset, FaGift } from 'react-icons/fa';

const FeaturesSection = styled.section`
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #ff6b9d;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const features = [
  {
    id: 1,
    title: '무료 배송',
    description: '5만원 이상 구매 시 전국 무료 배송',
    icon: <FaTruck />,
  },
  {
    id: 2,
    title: '안전한 결제',
    description: 'SSL 보안 결제로 안전하게 쇼핑하세요',
    icon: <FaShieldAlt />,
  },
  {
    id: 3,
    title: '고객 지원',
    description: '언제든지 문의해주세요. 친절하게 도와드립니다',
    icon: <FaHeadset />,
  },
  {
    id: 4,
    title: '선물 포장',
    description: '선물용 포장 서비스로 특별한 마음을 전하세요',
    icon: <FaGift />,
  },
];

const Features: React.FC = () => {
  return (
    <FeaturesSection>
      <Container>
        <SectionTitle>서비스 특징</SectionTitle>
        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
};

export default Features; 