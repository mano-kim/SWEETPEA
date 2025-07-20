import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar, FaMapMarkerAlt, FaMapPin, FaCity } from 'react-icons/fa';
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  max-width: 90vw;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.active ? '#ff6b9d' : '#666'};
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#ff6b9d' : 'transparent'};
  transition: all 0.3s;
  
  &:hover {
    color: #ff6b9d;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ff6b9d;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #ff4d8d;
  }
`;

const FormSection = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 15px;
  padding: 20px;
  background: #fafafa;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
  box-sizing: border-box;
  
  &:focus {
    border-color: #ff6b9d;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 1.1rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
  background: #ff6b9d;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  
  &:hover {
    background: #ff4d8d;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
`;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // 로그인 폼
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // 회원가입 폼
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    birth_date: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'Korea'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: loginData.username,
        password: loginData.password
      });
      
      setSuccess('로그인 성공!');
      onLoginSuccess(response.data);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.error || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (registerData.password !== registerData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        full_name: registerData.full_name,
        phone: registerData.phone,
        birth_date: registerData.birth_date,
        address: registerData.address,
        city: registerData.city,
        postal_code: registerData.postal_code,
        country: registerData.country
      });
      
      setSuccess('회원가입이 완료되었습니다!');
      setTimeout(() => {
        setActiveTab('login');
        setSuccess('');
        setRegisterData({ 
          username: '', 
          email: '', 
          password: '', 
          confirmPassword: '', 
          full_name: '', 
          phone: '', 
          birth_date: '', 
          address: '', 
          city: '', 
          postal_code: '', 
          country: 'Korea' 
        });
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.error || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <Title>SWEETPEA</Title>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            로그인
          </Tab>
          <Tab 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')}
          >
            회원가입
          </Tab>
        </TabContainer>
        
        {activeTab === 'login' ? (
          <Form onSubmit={handleLogin}>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                placeholder="사용자명"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputGroup>
            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </SubmitButton>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <FormSection>
              <SectionTitle>
                <FaUser />
                기본 정보
              </SectionTitle>
              <InputGroup>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <Input
                  type="text"
                  placeholder="사용자명 *"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <Input
                  type="email"
                  placeholder="이메일 *"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </InputGroup>
              
              <FormRow>
                <InputGroup>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="실명"
                    value={registerData.full_name}
                    onChange={(e) => setRegisterData({...registerData, full_name: e.target.value})}
                  />
                </InputGroup>
                
                <InputGroup>
                  <InputIcon>
                    <FaPhone />
                  </InputIcon>
                  <Input
                    type="tel"
                    placeholder="연락처"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  />
                </InputGroup>
              </FormRow>
              
              <InputGroup>
                <InputIcon>
                  <FaCalendar />
                </InputIcon>
                <Input
                  type="date"
                  placeholder="생년월일"
                  value={registerData.birth_date}
                  onChange={(e) => setRegisterData({...registerData, birth_date: e.target.value})}
                />
              </InputGroup>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <FaLock />
                보안 정보
              </SectionTitle>
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 *"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
                <PasswordToggle 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputGroup>
              
              <InputGroup>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 확인 *"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </InputGroup>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <FaMapMarkerAlt />
                배송 주소
              </SectionTitle>
              <InputGroup>
                <InputIcon>
                  <FaMapMarkerAlt />
                </InputIcon>
                <Input
                  type="text"
                  placeholder="주소"
                  value={registerData.address}
                  onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                />
              </InputGroup>
              
              <FormRow>
                <InputGroup>
                  <InputIcon>
                    <FaCity />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="도시"
                    value={registerData.city}
                    onChange={(e) => setRegisterData({...registerData, city: e.target.value})}
                  />
                </InputGroup>
                
                <InputGroup>
                  <InputIcon>
                    <FaMapPin />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="우편번호"
                    value={registerData.postal_code}
                    onChange={(e) => setRegisterData({...registerData, postal_code: e.target.value})}
                  />
                </InputGroup>
              </FormRow>
            </FormSection>
            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '회원가입 중...' : '회원가입'}
            </SubmitButton>
          </Form>
        )}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal; 