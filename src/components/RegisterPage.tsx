import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaCalendar, FaMapMarkerAlt, FaMapPin, FaCity, FaHome, FaArrowLeft, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const RegisterContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f7 0%, #f8f9fa 100%);
  padding: 20px;
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

const RegisterCard = styled.div`
  max-width: 800px;
  margin: 80px auto 0;
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

const FormSection = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 15px;
  padding: 25px;
  background: #fafafa;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const AddressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddressRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 15px;
  align-items: end;
`;

const AddressButton = styled.button`
  padding: 15px 20px;
  background: #ff6b9d;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: #ff4d8d;
  }
`;

const DefaultAddressToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff6b9d;
  }
  
  &.active {
    border-color: #ff6b9d;
    background: #fff5f7;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #ff6b9d;
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
  margin-top: 20px;
  
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

const LoginLink = styled.div`
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
  margin-top: 5px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  
  const [formData, setFormData] = useState({
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
    country: 'Korea',
    is_default_address: true
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.username) newErrors.username = '사용자명은 필수입니다.';
    if (!formData.email) newErrors.email = '이메일은 필수입니다.';
    if (!formData.password) newErrors.password = '비밀번호는 필수입니다.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    if (!formData.address) newErrors.address = '주소는 필수입니다.';
    if (!formData.city) newErrors.city = '도시는 필수입니다.';
    if (!formData.postal_code) newErrors.postal_code = '우편번호는 필수입니다.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone,
        birth_date: formData.birth_date,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal_code,
        country: formData.country,
        is_default_address: isDefaultAddress
      });
      
      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.error || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = () => {
    // 실제 주소 검색 API 연동 (카카오 주소 API 등)
    alert('주소 검색 기능은 카카오 주소 API와 연동하여 구현됩니다.');
  };

  return (
    <RegisterContainer>
      <BackButton onClick={() => navigate('/')}>
        <FaArrowLeft />
      </BackButton>
      
      <RegisterCard>
        <Header>
          <Title>SWEETPEA 회원가입</Title>
          <Subtitle>아름다운 테이블웨어와 함께하는 특별한 경험</Subtitle>
        </Header>
        
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <FaUser />
                기본 정보
              </SectionTitle>
              <FormRow>
                <InputGroup>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="사용자명 *"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className={errors.username ? 'error' : ''}
                  />
                  {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
                </InputGroup>
                
                <InputGroup>
                  <InputIcon>
                    <FaEnvelope />
                  </InputIcon>
                  <Input
                    type="email"
                    placeholder="이메일 *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </InputGroup>
              </FormRow>
              
              <FormRow>
                <InputGroup>
                  <InputIcon>
                    <FaUser />
                  </InputIcon>
                  <Input
                    type="text"
                    placeholder="실명"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </InputGroup>
                
                <InputGroup>
                  <InputIcon>
                    <FaPhone />
                  </InputIcon>
                  <Input
                    type="tel"
                    placeholder="연락처"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                  value={formData.birth_date}
                  onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                />
              </InputGroup>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <FaLock />
                보안 정보
              </SectionTitle>
              <FormRow>
                <InputGroup>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호 *"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={errors.password ? 'error' : ''}
                  />
                  <PasswordToggle 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordToggle>
                  {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                </InputGroup>
                
                <InputGroup>
                  <InputIcon>
                    <FaLock />
                  </InputIcon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호 확인 *"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                </InputGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <FaMapMarkerAlt />
                배송 주소 (필수)
              </SectionTitle>
              <AddressSection>
                <AddressRow>
                  <InputGroup>
                    <InputIcon>
                      <FaMapMarkerAlt />
                    </InputIcon>
                    <Input
                      type="text"
                      placeholder="주소 *"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                  </InputGroup>
                  <AddressButton type="button" onClick={handleAddressSearch}>
                    주소 검색
                  </AddressButton>
                </AddressRow>
                
                <FormRow>
                  <InputGroup>
                    <InputIcon>
                      <FaCity />
                    </InputIcon>
                    <Input
                      type="text"
                      placeholder="도시 *"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                  </InputGroup>
                  
                  <InputGroup>
                    <InputIcon>
                      <FaMapPin />
                    </InputIcon>
                    <Input
                      type="text"
                      placeholder="우편번호 *"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                      className={errors.postal_code ? 'error' : ''}
                    />
                    {errors.postal_code && <ErrorMessage>{errors.postal_code}</ErrorMessage>}
                  </InputGroup>
                </FormRow>
                
                <DefaultAddressToggle 
                  className={isDefaultAddress ? 'active' : ''}
                  onClick={() => setIsDefaultAddress(!isDefaultAddress)}
                >
                  <Checkbox
                    type="checkbox"
                    checked={isDefaultAddress}
                    onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                  />
                  <FaHome />
                  <span>기본 배송지로 설정</span>
                  {isDefaultAddress && <FaCheck style={{ color: '#ff6b9d', marginLeft: 'auto' }} />}
                </DefaultAddressToggle>
              </AddressSection>
            </FormSection>
            
            <SubmitButton type="submit" disabled={loading}>
              {loading ? '회원가입 중...' : '회원가입 완료'}
            </SubmitButton>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
          </Form>
          
          <LoginLink>
            이미 계정이 있으신가요? <Link to="/login">로그인하기</Link>
          </LoginLink>
        </FormContainer>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default RegisterPage; 