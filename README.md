# 봉봉이네 잡화점 🧸✨

**올리브영 스타일**의 예쁜 그릇과 컵을 판매하는 React + Python 쇼핑몰입니다.

## 🎯 프로젝트 구조

```
bongbong-react-app/
├── src/                    # React 프론트엔드
│   ├── components/         # React 컴포넌트들
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── index.tsx          # 앱 진입점
├── backend/               # Python 백엔드
│   ├── app.py             # Flask API 서버
│   └── requirements.txt   # Python 의존성
├── package.json           # React 의존성
└── README.md             # 프로젝트 설명서
```

## 🚀 시작하기

### 1. 프론트엔드 (React) 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3000)
npm start
```

### 2. 백엔드 (Python Flask) 설정

```bash
# backend 디렉토리로 이동
cd backend

# Python 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# Flask 서버 실행 (포트 5000)
python app.py
```

## 🌟 주요 기능

### 🛍️ 쇼핑몰 기능
- **상품 목록**: 카테고리별 상품 조회
- **상품 상세**: 개별 상품 정보 확인
- **장바구니**: 상품 추가/삭제/수량 관리
- **검색**: 상품명으로 검색

### 🎨 디자인 특징
- **올리브영 스타일**: 깔끔하고 모던한 UI
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **애니메이션**: 부드러운 호버 효과
- **색상 팔레트**: 핑크/빨강 계열의 따뜻한 색상

### 🔧 기술 스택
- **Frontend**: React 18, TypeScript, Styled Components
- **Backend**: Python Flask, SQLite
- **API**: RESTful API
- **스타일링**: CSS-in-JS (Styled Components)

## 📱 화면 구성

### 1. 헤더
- 로고 및 네비게이션
- 검색 기능
- 장바구니 (아이템 수 표시)
- 모바일 햄버거 메뉴

### 2. 히어로 섹션
- 메인 타이틀 및 설명
- CTA 버튼
- 그라데이션 배경

### 3. 카테고리
- 그릇, 접시, 컵/잔, 수저, 액세서리
- 카드형 레이아웃
- 호버 애니메이션

### 4. 상품 목록
- 그리드 레이아웃
- 상품 카드 (이미지, 이름, 가격, 설명)
- 장바구니 추가 버튼

### 5. 특징 섹션
- 배송, 품질, 고객서비스
- 아이콘과 설명

### 6. 연락처
- 문의 폼
- 이메일 입력 (도메인 선택)

### 7. 푸터
- 회사 정보
- 링크들
- 카피라이트

## 🗄️ 데이터베이스

### 상품 테이블 (products)
- id: 상품 고유 ID
- name: 상품명
- description: 상품 설명
- price: 가격
- category: 카테고리
- image_url: 이미지 URL
- stock: 재고 수량
- created_at: 생성일

### 장바구니 테이블 (cart)
- id: 장바구니 아이템 ID
- product_id: 상품 ID (외래키)
- quantity: 수량
- created_at: 추가일

## 🔌 API 엔드포인트

### 상품 관련
- `GET /api/products` - 전체 상품 목록
- `GET /api/products?category=bowls` - 카테고리별 상품
- `GET /api/products/{id}` - 개별 상품 정보

### 장바구니 관련
- `GET /api/cart` - 장바구니 목록
- `POST /api/cart` - 장바구니에 상품 추가
- `DELETE /api/cart/{id}` - 장바구니에서 상품 삭제

### 기타
- `GET /api/categories` - 카테고리 목록
- `POST /api/contact` - 문의 폼 제출

## 🎨 스타일 가이드

### 색상 팔레트
- **Primary**: #ff6b6b (핑크)
- **Secondary**: #ff9a9e (연한 핑크)
- **Background**: #ffffff (화이트)
- **Text**: #1a1a1a (다크 그레이)
- **Border**: #f0f0f0 (연한 그레이)

### 타이포그래피
- **Font**: Noto Sans KR
- **Weights**: 300, 400, 500, 700

### 컴포넌트 스타일
- **Border Radius**: 12px (카드), 25px (버튼)
- **Shadow**: 0 4px 20px rgba(0, 0, 0, 0.08)
- **Transition**: 0.3s ease

## 🚀 배포

### Vercel 배포 (프론트엔드)
```bash
npm run build
# Vercel CLI로 배포
```

### Heroku 배포 (백엔드)
```bash
# Procfile 생성
echo "web: python app.py" > Procfile
# Heroku CLI로 배포
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/bongbong-store](https://github.com/your-username/bongbong-store)

---

**봉봉이네 잡화점**에서 예쁜 그릇과 컵을 만나보세요! 🧸✨ 