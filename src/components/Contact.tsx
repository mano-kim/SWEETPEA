import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = styled.section`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: #ff6b9d;
  width: 50px;
  height: 50px;
  background: #fff5f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const ContactLabel = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ContactForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const EmailContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const DomainSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6b9d;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #ff6b9d;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #ff4d8d;
  }
`;

const domains = [
  'naver.com',
  'gmail.com',
  'daum.net',
  'hanmail.net',
  'outlook.com',
  'yahoo.com',
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    emailDomain: 'naver.com',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullEmail = `${formData.emailId}@${formData.emailDomain}`;
    alert(`문의가 접수되었습니다!\n이메일: ${fullEmail}\n연락처: ${formData.phone}`);
    setFormData({
      name: '',
      emailId: '',
      emailDomain: 'naver.com',
      phone: '',
      message: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>문의하기</SectionTitle>
        <ContactGrid>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>
                <ContactLabel>주소</ContactLabel>
                서울특별시 강남구 테헤란로 123<br />
                봉봉빌딩 5층
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactText>
                <ContactLabel>전화번호</ContactLabel>
                02-1234-5678
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>
                <ContactLabel>이메일</ContactLabel>
                hello@bongbong.co.kr
              </ContactText>
            </ContactItem>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이름 *</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>이메일 *</Label>
              <EmailContainer>
                <EmailInput
                  type="text"
                  placeholder="이메일"
                  value={formData.emailId}
                  onChange={(e) => handleChange('emailId', e.target.value)}
                  required
                />
                <span style={{ display: 'flex', alignItems: 'center' }}>@</span>
                <DomainSelect
                  value={formData.emailDomain}
                  onChange={(e) => handleChange('emailDomain', e.target.value)}
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </DomainSelect>
              </EmailContainer>
            </FormGroup>
            
            <FormGroup>
              <Label>연락처</Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="010-1234-5678"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>문의내용 *</Label>
              <TextArea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="문의하실 내용을 자유롭게 작성해주세요."
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              문의하기 📧
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact; 