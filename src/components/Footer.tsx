import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background:rgb(244, 240, 240);
  border-top: 1px solidrgb(206, 199, 199);
  padding: 20px 20px 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgb(250, 248, 248);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const FooterSection = styled.div`
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  h3 {
    font-size: 13px;
    font-weight: 400;
    color: #333;
    margin-bottom: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  
  p, a {
    font-size: 11px;
    color: #666;
    line-height: 1.4;
    font-weight: 300;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #333;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 3px;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateX(4px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const SocialIcon = styled.a`
  color: #666;
  font-size: 13px;
  transition: color 0.3s;
  
  &:hover {
    color: #333;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #E8E8E8;
  margin-top: 12px;
  padding-top: 8px;
  text-align: center;
  
  p {
    font-size: 9px;
    color: #999;
    font-weight: 300;
    margin: 0;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>SWEETPEA</h3>
          <p>
            일상의 소소한 순간들을<br />
            특별하게 만들어드리는<br />
            라이프스타일 브랜드입니다.
          </p>
          <SocialLinks>
            <SocialIcon href="#instagram">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#facebook">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#twitter">
              <FaTwitter />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>SHOP</h3>
          <ul>
            <li><a href="#new">NEW ARRIVAL</a></li>
            <li><a href="#best">BEST ITEM</a></li>
            <li><a href="#living">LIVING</a></li>
            <li><a href="#tableware">TABLEWARE</a></li>
            <li><a href="#sale">SALE</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>CUSTOMER</h3>
          <ul>
            <li><a href="#notice">공지사항</a></li>
            <li><a href="#faq">자주묻는질문</a></li>
            <li><a href="#review">리뷰</a></li>
            <li><a href="#contact">문의하기</a></li>
            <li><a href="#size">사이즈가이드</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>CONTACT</h3>
          <p>
            고객센터<br />
            1588-1234<br />
            평일 09:00 - 18:00<br />
            주말 10:00 - 17:00<br />
            <br />
            이메일<br />
            info@sweetpea.com
          </p>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>
          © 2025 SWEETPEA. All rights reserved. | 
          <a href="#privacy" style={{ marginLeft: '10px' }}>개인정보처리방침</a> | 
          <a href="#terms" style={{ marginLeft: '10px' }}>이용약관</a>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 