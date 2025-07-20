# 🌸 SWEETPEA - 라이프스타일 커머스

아름답고 감성적인 리빙 소품들을 만나보세요. 스위트피처럼 달콤하고 우아한 일상의 아름다움을 선물합니다.

## 🚀 주요 기능

### 🛍️ 쇼핑 기능
- **상품 목록**: 신상품, 베스트 상품 카테고리별 분류
- **상품 상세**: 상품 정보, 가격, 장바구니 추가
- **장바구니**: 상품 추가/삭제, 수량 관리
- **트렌딩 아이템**: 실시간 인기 상품 추천

### 👤 사용자 관리
- **회원가입**: 실시간 주소 검증, 기본 배송지 설정
- **로그인/로그아웃**: 안전한 인증 시스템
- **사용자 정보**: 개인정보 관리

### 🎨 UI/UX
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **아름다운 애니메이션**: 부드러운 전환 효과
- **직관적인 네비게이션**: 쉬운 사용자 경험

### 🎯 고객 서비스
- **고객센터**: FAQ, 문의하기, 공지사항
- **탭 네비게이션**: 카테고리별 정보 분류
- **실시간 채팅**: 고객 지원

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안정성
- **Styled Components** - CSS-in-JS 스타일링
- **React Router** - SPA 라우팅
- **FontAwesome** - 아이콘 라이브러리

### Backend
- **Python Flask** - RESTful API 서버
- **SQLite** - 데이터베이스
- **SQLAlchemy** - ORM
- **Flask-CORS** - 크로스 오리진 지원

## �� 프로젝트 구조

```
SWEETPEA/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Header.tsx      # 네비게이션 헤더
│   │   ├── Hero.tsx        # 메인 비주얼
│   │   ├── Products.tsx    # 상품 목록
│   │   ├── ProductDetail.tsx # 상품 상세
│   │   ├── Cart.tsx        # 장바구니
│   │   ├── RegisterPage.tsx # 회원가입
│   │   ├── LoginPage.tsx   # 로그인
│   │   ├── CustomerService.tsx # 고객센터
│   │   └── ...
│   ├── App.tsx             # 메인 앱 컴포넌트
│   └── index.tsx           # 진입점
├── backend/                # Flask 백엔드
│   ├── app.py             # 메인 서버 파일
│   ├── init_db.py         # 데이터베이스 초기화
│   └── database.db        # SQLite 데이터베이스
└── public/                # 정적 파일
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/sweetpea.git
cd sweetpea
```

### 2. Frontend 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 3. Backend 설정
```bash
cd backend

# Python 의존성 설치
pip install flask flask-cors flask-sqlalchemy

# 서버 실행
python app.py
```

### 4. 접속
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🌟 주요 페이지

### 🏠 홈페이지
- 아름다운 히어로 섹션
- 신상품 및 베스트 상품 그리드
- 트렌딩 아이템 추천
- 이벤트 배너

### 🛍️ 상품 페이지
- 카테고리별 상품 분류
- 상품 검색 기능
- 상품 상세 정보
- 장바구니 추가

### 👤 사용자 페이지
- 회원가입 (실시간 주소 검증)
- 로그인/로그아웃
- 개인정보 관리

### 🎯 고객센터
- FAQ (자주 묻는 질문)
- 문의하기
- 공지사항
- 탭 네비게이션

## 🎨 디자인 특징

### 컬러 팔레트
- **Primary**: #ff6b9d (핑크)
- **Secondary**: #dda0dd (라벤더)
- **Background**: #fff5f7 (연한 핑크)
- **Text**: #333 (다크 그레이)

### UI 컴포넌트
- **그라데이션 배경**: 부드러운 색상 전환
- **카드 디자인**: 그림자와 호버 효과
- **버튼**: 그라데이션과 애니메이션
- **모달**: 깔끔한 팝업 인터페이스

## 🔧 개발 환경

### 요구사항
- Node.js 16+
- Python 3.8+
- npm 또는 yarn

### 개발 도구
- **VS Code** - 코드 에디터
- **React Developer Tools** - React 디버깅
- **Postman** - API 테스트

## 📝 API 문서

### 인증 API
- `POST /api/register` - 회원가입
- `POST /api/login` - 로그인

### 상품 API
- `GET /api/products` - 상품 목록
- `GET /api/products/:id` - 상품 상세

### 장바구니 API
- `GET /api/cart` - 장바구니 조회
- `POST /api/cart` - 장바구니 추가

## 🚀 배포

### Vercel 배포
1. GitHub 저장소 연결
2. Vercel 프로젝트 생성
3. 자동 배포 설정

### 환경 변수
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👥 팀

- **개발자**: [Your Name]
- **디자이너**: [Designer Name]
- **기획자**: [Planner Name]

## 📞 연락처

- **이메일**: info@sweetpea.com
- **전화**: 1588-1234
- **운영시간**: 평일 09:00-18:00

---

🌸 **SWEETPEA** - 일상의 소소한 순간들을 특별하게 만들어드리는 라이프스타일 브랜드 🌸 