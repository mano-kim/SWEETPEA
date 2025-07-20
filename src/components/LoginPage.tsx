import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  padding: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const FormContainer = styled.div`
  padding: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
  box-sizing: border-box;
  
  &:focus {
    border-color: #ff6b9d;
  }
  
  &.error {
    border-color: #e74c3c;
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
  background: linear-gradient(135deg, #ff6b9d 0%, #ff4d8d 100%);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
  
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

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 30px;
  color: #666;
  
  a {
    color: #ff6b9d;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  text-align: center;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('사용자명과 비밀번호를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: formData.username,
        password: formData.password
      });
      
      setSuccess('로그인 성공! 홈페이지로 이동합니다.');
      // 실제로는 로그인 상태를 전역으로 관리해야 합니다
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.error || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>
      
      <LoginCard>
        <Header>
          <Title>SWEETPEA 로그인</Title>
          <Subtitle>아름다운 테이블웨어와 함께하는 특별한 경험</Subtitle>
        </Header>
        
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <Input
                type="text"
                placeholder="사용자명"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </InputGroup>
            
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
          </Form>
          
          <RegisterLink>
            계정이 없으신가요? <Link to="/register">회원가입하기</Link>
          </RegisterLink>
        </FormContainer>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 