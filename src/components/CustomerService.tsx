import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaQuestionCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaSearch, FaChevronDown, FaChevronUp, FaShippingFast, FaUndo, FaShieldAlt, FaCreditCard, FaUser, FaBox, FaComments, FaHistory, FaVolumeUp, FaNewspaper, FaUserCircle, FaCreditCard as FaCard, FaTruck, FaExchangeAlt, FaMoneyBillWave, FaGift, FaMobile, FaCalendarAlt, FaUsers, FaLock } from 'react-icons/fa';

const ServiceContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 0;
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

const ServiceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  margin: -20px -20px 30px -20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 30px;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SearchTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const SearchBox = styled.div`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  
  &:focus-within {
    border-color: #ff6b9d;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: none;
  outline: none;
  font-size: 0.95rem;
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background: #ff6b9d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: #ff4d8d;
  }
`;

const ChatButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 15px auto 0;
  transition: background 0.3s ease;
  
  &:hover {
    background: #0056b3;
  }
`;

const TabNavigation = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px 20px;
  border: none;
  background: ${props => props.active ? '#ff6b9d' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ff4d8d' : '#f8f9fa'};
  }
`;

const CategoryNavigation = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  padding: 10px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff6b9d;
    border-radius: 2px;
  }
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? '#ff6b9d' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ff4d8d' : '#e9ecef'};
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const FAQSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 10px;
`;

const FAQQuestion = styled.div`
  padding: 15px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff6b9d;
  }
`;

const QuestionIcon = styled.div`
  color: #ff6b9d;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.1rem;
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '15px 0' : '0 0'};
  max-height: ${props => props.isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #666;
  line-height: 1.6;
  padding-left: 25px;
`;

const ContactSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
  font-size: 0.9rem;
`;

const ContactValue = styled.div`
  color: #666;
  font-size: 0.85rem;
`;

const ServiceFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 30px;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 auto 12px;
`;

const FeatureTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const CustomerService: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  const [activeCategory, setActiveCategory] = useState('membership');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const tabs = [
    { id: 'faq', label: '자주묻는 질문', icon: <FaQuestionCircle /> },
    { id: 'history', label: '문의내역', icon: <FaHistory /> },
    { id: 'voice', label: '고객의 소리', icon: <FaVolumeUp /> },
    { id: 'news', label: 'SWEETPEA 소식', icon: <FaNewspaper /> }
  ];

  const categories = [
    { id: 'membership', label: '멤버십' },
    { id: 'exchange', label: '취소/교환/반품' },
    { id: 'delivery', label: '배송문의' },
    { id: 'member', label: '회원서비스' },
    { id: 'order', label: '주문/결제' },
    { id: 'refund', label: '환불' },
    { id: 'coupon', label: '쿠폰/포인트' },
    { id: 'gift', label: '선물하기' },
    { id: 'mobile', label: '모바일앱' },
    { id: 'regular', label: '정기배송' }
  ];

  const faqData = {
    membership: [
      {
        question: "SWEETPEA 멤버십을 해지하고 싶어요.",
        answer: "마이페이지 > 멤버십 관리에서 언제든지 해지할 수 있습니다. 해지 시 남은 혜택은 즉시 중단되며, 환불은 3-5일 내 처리됩니다."
      },
      {
        question: "멤버십 해지하면 언제 환불되나요?",
        answer: "멤버십 해지 시 미사용 금액은 3-5일 내 환불 처리됩니다. 신용카드 결제 시 다음 달 청구서에서 확인하실 수 있습니다."
      },
      {
        question: "멤버십 혜택은 언제부터 적용되나요?",
        answer: "멤버십 가입 즉시 모든 혜택이 적용됩니다. 무료 배송, 할인 쿠폰, 특별 이벤트 참여 등이 바로 이용 가능합니다."
      }
    ],
    exchange: [
      {
        question: "상품을 교환/반품하고 싶어요.",
        answer: "상품 수령 후 7일 이내에 교환/반품 신청이 가능합니다. 마이페이지 > 주문내역에서 신청하거나 고객센터로 연락해주세요."
      },
      {
        question: "교환/반품 배송비는 누가 부담하나요?",
        answer: "상품 하자나 오배송의 경우 무료, 단순 변심의 경우 고객 부담입니다. 단, 5만원 이상 구매 시 무료 반품이 가능합니다."
      },
      {
        question: "교환/반품 신청 후 언제 처리되나요?",
        answer: "신청 후 1-2일 내 수거, 수거 완료 후 3-5일 내 처리됩니다. 환불은 처리 완료 후 3-5일 내 입금됩니다."
      }
    ],
    delivery: [
      {
        question: "주문한 상품은 언제 배송되나요?",
        answer: "일반 배송은 2-3일, 빠른 배송은 1-2일 소요됩니다. 도서산간 지역의 경우 추가 1-2일이 소요될 수 있습니다."
      },
      {
        question: "배송 조회는 어떻게 하나요?",
        answer: "마이페이지 > 주문내역에서 배송 조회가 가능합니다. 운송장 번호를 클릭하면 실시간 배송 현황을 확인할 수 있습니다."
      },
      {
        question: "배송지 변경은 언제까지 가능한가요?",
        answer: "상품 출고 전까지 배송지 변경이 가능합니다. 출고 후에는 변경이 어려우니 주문 시 정확한 주소를 입력해주세요."
      }
    ],
    order: [
      {
        question: "결제 방법은 어떤 것이 있나요?",
        answer: "신용카드, 체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이, 페이코)를 지원합니다."
      },
      {
        question: "주문 취소는 언제까지 가능한가요?",
        answer: "상품 출고 전까지 언제든지 취소 가능합니다. 출고 후에는 교환/반품으로 처리됩니다."
      },
      {
        question: "무료 배송 기준이 있나요?",
        answer: "5만원 이상 구매 시 무료 배송이 적용됩니다. 5만원 미만 구매 시 배송비 3,000원이 추가됩니다."
      }
    ]
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const currentFAQs = faqData[activeCategory as keyof typeof faqData] || [];

  return (
    <ServiceContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>
      
      <ServiceContent>
        <Header>
          <Title>고객센터</Title>
          <Subtitle>SWEETPEA와 함께하는 아름다운 경험을 도와드립니다 🌸</Subtitle>
        </Header>
        
        <SearchSection>
          <SearchTitle>자주묻는 질문 검색</SearchTitle>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="궁금한 내용을 검색해보세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>
              <FaSearch />
            </SearchButton>
          </SearchBox>
          <ChatButton>
            <FaComments />
            채팅 상담하기
          </ChatButton>
        </SearchSection>
        
        <TabNavigation>
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </TabButton>
          ))}
        </TabNavigation>
        
        {activeTab === 'faq' && (
          <>
            <CategoryNavigation>
              {categories.map(category => (
                <CategoryButton
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </CategoryButton>
              ))}
            </CategoryNavigation>
            
            <MainGrid>
              <FAQSection>
                <SectionTitle>
                  <FaQuestionCircle />
                  자주 묻는 질문
                </SectionTitle>
                {currentFAQs.map((faq, index) => (
                  <FAQItem key={index}>
                    <FAQQuestion onClick={() => toggleFAQ(index)}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <QuestionIcon>Q</QuestionIcon>
                        {faq.question}
                      </div>
                      {openFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                    </FAQQuestion>
                    <FAQAnswer isOpen={openFAQ === index}>
                      {faq.answer}
                    </FAQAnswer>
                  </FAQItem>
                ))}
              </FAQSection>
              
              <ContactSection>
                <SectionTitle>
                  <FaPhone />
                  연락처
                </SectionTitle>
                <ContactItem>
                  <ContactIcon>
                    <FaPhone />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>고객센터</ContactLabel>
                    <ContactValue>1588-1234 (유료)</ContactValue>
                  </ContactInfo>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <FaClock />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>운영시간</ContactLabel>
                    <ContactValue>365일, 24시간 운영</ContactValue>
                  </ContactInfo>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <FaEnvelope />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>이메일</ContactLabel>
                    <ContactValue>help@sweetpea.com</ContactValue>
                  </ContactInfo>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <FaMapMarkerAlt />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>주소</ContactLabel>
                    <ContactValue>서울 강남구 테헤란로 123<br />SWEETPEA 빌딩 5층</ContactValue>
                  </ContactInfo>
                </ContactItem>
              </ContactSection>
            </MainGrid>
          </>
        )}
        
        {activeTab === 'history' && (
          <div style={{ background: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
            <FaHistory style={{ fontSize: '3rem', color: '#ff6b9d', marginBottom: '20px' }} />
            <h3>문의내역</h3>
            <p>로그인 후 문의내역을 확인할 수 있습니다.</p>
          </div>
        )}
        
        {activeTab === 'voice' && (
          <div style={{ background: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
            <FaVolumeUp style={{ fontSize: '3rem', color: '#ff6b9d', marginBottom: '20px' }} />
            <h3>고객의 소리</h3>
            <p>SWEETPEA를 더욱 발전시킬 의견을 들려주세요.</p>
          </div>
        )}
        
        {activeTab === 'news' && (
          <div style={{ background: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center' }}>
            <FaNewspaper style={{ fontSize: '3rem', color: '#ff6b9d', marginBottom: '20px' }} />
            <h3>SWEETPEA 소식</h3>
            <p>최신 이벤트와 업데이트 소식을 확인하세요.</p>
          </div>
        )}
        
        <ServiceFeatures>
          <FeatureCard>
            <FeatureIcon>
              <FaShippingFast />
            </FeatureIcon>
            <FeatureTitle>빠른 배송</FeatureTitle>
            <FeatureDescription>
              전국 어디든 빠르고 안전하게 배송해드립니다
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaUndo />
            </FeatureIcon>
            <FeatureTitle>쉬운 교환/반품</FeatureTitle>
            <FeatureDescription>
              7일 이내 무료 교환/반품 서비스를 제공합니다
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureTitle>안전한 결제</FeatureTitle>
            <FeatureDescription>
              다양한 결제 방법과 보안 시스템을 제공합니다
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaUser />
            </FeatureIcon>
            <FeatureTitle>전문 상담</FeatureTitle>
            <FeatureDescription>
              전문 상담사가 친절하게 도와드립니다
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaCreditCard />
            </FeatureIcon>
            <FeatureTitle>할인 혜택</FeatureTitle>
            <FeatureDescription>
              회원 전용 할인 쿠폰과 특별 혜택을 제공합니다
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <FaBox />
            </FeatureIcon>
            <FeatureTitle>품질 보증</FeatureTitle>
            <FeatureDescription>
              모든 상품에 대해 품질을 보증합니다
            </FeatureDescription>
          </FeatureCard>
        </ServiceFeatures>
      </ServiceContent>
    </ServiceContainer>
  );
};

export default CustomerService; 