# 🧇 와플커뮤니케이션 통합 홈페이지 & 커피 후원 플랫폼 상세 기획서
> **Waffle Communication Official Website & Coffee Donation Platform Specification**  
> **문서 버전:** v2.5 (i18n 4개국어 다국어 시스템, Moodify Q, 5대 Study 가이드, SEO 인프라 전면 고도화 개정판)  
> **최종 수정일:** 2026년 9월 20일  
> **작성자 / 총괄:** 와플커뮤니케이션 (대표자: 김인섭)

---

## 📑 목차 (Table of Contents)

1. [프로젝트 개요 (Project Overview)](#1-프로젝트-개요-project-overview)
2. [공식 사업자 정보 및 법적 고지](#2-공식-사업자-정보-및-법적-고지)
3. [통신판매업등록(개인사업자) 절차 및 가이드](#3-통신판매업등록개인사업자-절차-및-가이드)
4. [시스템 아키텍처 및 기술 스택 (Tech Stack)](#4-시스템-아키텍처-및-기술-스택-tech-stack)
5. [디자인 시스템 & UI/UX 가이드라인](#5-디자인-시스템--uiux-가이드라인)
6. [페이지별 화면 및 기능 명세](#6-페이지별-화면-및-기능-명세)
   - 6.1 메인 홈페이지 (`index.html`) & 4개 국어 i18n 시스템
   - 6.2 6대 핵심 서비스 라인업
   - 6.3 14개 글로벌 파트너스 연동
   - 6.4 커피 후원 플랫폼 (`donate/index.html`)
   - 6.5 전자상거래 3대 약관 및 정책 페이지
   - 6.6 Engineering Study 5대 실전 가이드라인 (`study/`)
   - 6.7 글로벌 SEO & 검색엔진 최적화 인프라 (`sitemap.xml`, `robots.txt`)
7. [결제 인프라 및 SDK 연동 상세](#7-결제-인프라-및-sdk-연동-상세)
   - 7.1 국내 결제 (PortOne SDK V2)
   - 7.2 해외 결제 (PayPal Official Donate SDK)
8. [데이터베이스 스키마 및 보안 (Supabase)](#8-데이터베이스-스키마-및-보안-supabase)
9. [PG사/포트원 심사 5대 필수 요건 검증 결과](#9-pg사포트원-심사-5대-필수-요건-검증-결과)
10. [배포 및 운영 현황](#10-배포-및-운영-현황)
11. [향후 로드맵 및 고도화 계획](#11-향후-로드맵-및-고도화-계획)

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 서비스 비전 및 목적
와플커뮤니케이션(Waffle Communication)은 실시간 AI 마케팅 솔루션, 캐주얼 보드게임, 교육용 인터랙티브 앱, AI 음악 추천 및 생성 솔루션을 개발하는 테크 소프트웨어 개발사입니다.  
본 프로젝트는 **브랜드 아이덴티티를 나타내는 프리미엄 공식 웹사이트**와 함께, 지속 가능한 오픈소스 개발 및 창작 생태계를 지원하기 위한 **글로벌 커피 후원 플랫폼(Coffee Donation System)**, 그리고 개발자 생태계 기여를 위한 **5대 Engineering Study 실전 가이드**를 원스톱으로 구축하고 서비스하는 것을 목적으로 합니다.

### 1.2 핵심 개발 목표
* 🌐 **JSON 기반 4개 국어(KO/EN/JA/ZH) i18n 시스템**: 무설치 클라이언트 비동기 DOM 바인딩 및 브라우저 자동 감지 다국어 지원
* 🌟 **Vantablack Luxe UI**: Glassmorphism과 다크 테마를 기반으로 한 하이엔드 테크 감성 홈페이지 구축
* ☕ **원클릭 커피 후원 플랫폼**: 국내(카드/카카오/토스) 및 해외(PayPal) 듀얼 결제를 지원하는 후원 시스템
* 🗄️ **Serverless Realtime DB**: Supabase PostgreSQL을 통한 실시간 후원 피드 동기화 및 무설치 로컬 스토리지 폴백 지원
* 📚 **Engineering Study 5대 가이드**: AI 웹 개발, 웹앱 디자인, AI 협업 프롬프트, 앱 업데이트 전략, 듀얼 UI 아키텍처 실전 지침 완비
* 🔍 **글로벌 SEO 인프라**: `xhtml:link` `hreflang` 4개 국어 다국어 sitemap 및 robots.txt 검색 크롤러 최적화
* ⚖️ **전자상거래 100% 법적 준수**: 사업자 정보, 통신판매업 신고, 이용약관, 개인정보처리방침, 환불정책, 거래조건 고지 완비
* 🎨 **Paperlogy 타이포그래피**: 국문/영문 모두 가독성과 감성이 뛰어난 프리미엄 Paperlogy 웹폰트 전면 적용

---

## 2. 공식 사업자 정보 및 법적 고지

전자상거래 등에서의 소비자보호에 관한 법률 및 PG사 결제 승인 기준에 따른 공식 사업자 정보입니다. (전체 페이지 푸터 적용 완료)

| 항목 | 사업자 등록 내용 |
| :--- | :--- |
| **대표 회사명(상호)** | **와플커뮤니케이션** (Waffle Communication) |
| **사업자 구분** | **개인 사업자** |
| **대표자명** | **김인섭** |
| **사업자등록번호** | **`214-13-58853`** |
| **통신판매업신고번호** | **제2026-서울강남-04919호** |
| **업태 / 종목** | **서비스 / 소프트웨어개발및공급** |
| **사업장 주소** | **(06159) 서울특별시 강남구 테헤란로 423, 2층 2440호 (삼성동, 현대타워)** |
| **고객센터 유선번호** | **`02-561-0770`** (운영시간: 평일 10:00 ~ 18:00) |
| **공식 대표 이메일** | **`waffle.comm@gmail.com`** |
| **대표 도메인 URL** | **`https://iwaffle.kr/`** |
| **PayPal 수취 계정** | **`ihnseob.kim@gmail.com`** (Production 실결제) |

---

## 3. 통신판매업등록(개인사업자) 절차 및 가이드

개인사업자의 통신판매업 신고는 **'구매안전서비스 이용확인증(에스크로)'**만 준비되면 **정부24(gov.kr)**에서 온라인으로 10분 만에 신청할 수 있습니다.  
*(※ 신고를 진행하기 전, 반드시 먼저 사업자등록(214-13-58853)이 완료되어 있어야 합니다.)*

```
[ 통신판매업 신고 3단계 프로세스 ]
1단계: 필수 준비물 챙기기 (사업자등록증, 에스크로 확인증, 간편인증)
   ↓
2단계: 정부24 온라인 신청 (신청서 작성, 도메인 입력, 에스크로 첨부)
   ↓
3단계: 등록면허세 납부 및 발급 (위택스/이택스 납부 후 온라인 출력)
```

### 3.1 1단계: 필수 준비물 챙기기
* **사업자등록증**: 사업자등록번호(`214-13-58853`) 및 기본 정보
* **구매안전서비스 이용확인증 (에스크로)**: PDF 또는 이미지 파일
  - PG사(토스페이먼츠, 포트원 등) 가입 후 발급받거나 국민·기업·농협 등 은행 에스크로 가입 후 발급
  - 스마트스토어/쿠팡 등 오픈마켓 판매자센터의 '정보변경/관리' 메뉴에서도 다운로드 가능
* **공인인증서 또는 간편인증**: 정부24 로그인 및 본인인증용 (카카오, 토스, PASS 등)

### 3.2 2단계: 정부24 온라인 신청 방법
1. **정부24 접속 및 로그인**: 정부24 공식 홈페이지(`gov.kr`) 접속 후 간편인증 로그인
2. **서비스 검색**: 검색창에 **'통신판매업 신고'** 검색 후 신청서비스 목록에서 **[신청]** 버튼 클릭
3. **신청서 작성**:
   - **업체 정보**: 상호(와플커뮤니케이션), 사업자등록번호(`214-13-58853`), 사업장 주소, 전화번호 입력
   - **대표자 정보**: 성명(김인섭), 생년월일/주민등록번호, 주소, 휴대폰 번호 입력
   - **판매 정보**: 판매방식(`인터넷`), 취급품목(`종합몰` 또는 `소프트웨어/인터넷서비스`) 선택
   - **인터넷 도메인 이름**: 판매 플랫폼 주소 입력 (예: `https://iwaffle.kr/` 또는 `https://wafflecomm.github.io/WaffleCommunication/`)
4. **구비서류 첨부**: '구매안전서비스 이용확인증' 파일 첨부
5. **수령방법 및 기관 선택**:
   - 수령방법: **'온라인발급(본인출력)'** 선택 (사무실/자택에서 즉시 인쇄 가능)
   - 구비서류 열람 동의: 사업자등록증 확인을 위해 **행정정보 공동이용 동의** 체크
6. **민원 신청하기**: **[민원신청하기]** 버튼 클릭하여 접수 완료

### 3.3 3단계: 면허세 납부 및 발급 (평균 1~3일 소요)
* 접수가 완료되면 관할 지자체(강남구청 등) 심사 후 **등록면허세 납부 안내 알림톡/문자** 발송
* **위택스(WETAX)**, **서울 이택스(ETAX)** 또는 은행 앱을 통해 등록면허세(지역에 따라 연간 약 22,500원 ~ 45,000원) 납부
* 납부 확인 즉시 정부24 **'MY GOV > 서비스 신청내역'**에서 통신판매업 신고증을 온라인으로 직접 출력 및 다운로드 완료 (신고번호: **제2026-서울강남-04919호**)

---

## 4. 시스템 아키텍처 및 기술 스택 (Tech Stack)

```
[ Front-End Client (Zero-Build Vanilla Web Architecture) ]
├── HTML5 / CSS3 / Vanilla JavaScript (No Framework Build Required)
├── Tailwind CSS (Utility-First Styling CDN)
├── Paperlogy Typography System (Weights: 400, 500, 600, 700, 800)
├── Iconify Solar Icons (Duotone & Linear)
├── Client-Side i18n Engine (asset/js/i18n.js + asset/lang/{ko,en,ja,zh}.json)
└── SEO & Crawling Engine (sitemap.xml with xhtml:link hreflang, robots.txt)
          │
          ├── [ 다국어 엔진 ] ──> JSON 비동기 패치 & DOM [data-i18n] 속성 실시간 바인딩
          ├── [ 국내 결제 ]   ──> PortOne Browser SDK V2 (신용카드, 카카오페이, 토스페이)
          ├── [ 해외 결제 ]   ──> PayPal Official Donate SDK (USD 환산 결제)
          └── [ 실시간 DB ]   ──> Supabase JS SDK (PostgreSQL Realtime WebSocket)
                                      │
                                      └── (폴백) 브라우저 LocalStorage Cache
```

### 상세 스택 사양
* **프론트엔드 엔진**: 순수 HTML5 / Vanilla ES6+ (빌드 의존성 없이 즉시 실행 가능한 초경량 아키텍처)
* **다국어(i18n) 시스템**: Client-side JSON 기반 엔진 (4개 국어 119개 언어 키 100% 매핑)
* **스타일링**: Tailwind CSS CDN + 커스텀 CSS 변수 테마 엔진
* **폰트 시스템**: 눈누(Noonnu) CDN Paperlogy Webfont 400~800 웨이트
* **결제 게이트웨이**:
  - 국내: `https://cdn.portone.io/v2/browser-sdk.js` (PortOne V2)
  - 해외: `https://www.paypalobjects.com/donate/sdk/donate-sdk.js` (PayPal Donate SDK)
* **클라우드 데이터베이스**: Supabase Database (`https://xojswhauzuqwtresgycm.supabase.co`)
* **호스팅 & 도메인**: 
  - 커스텀 도메인: `https://iwaffle.kr/`
  - GitHub Pages: `https://wafflecomm.github.io/WaffleCommunication/`

---

## 5. 디자인 시스템 & UI/UX 가이드라인

### 5.1 메인 홈페이지: Vantablack Luxe & Glassmorphism
* **배경 팔레트**: `#000000` (Vantablack) ~ `#09090B` (Deep Zinc)
* **글래스모피즘**: `backdrop-filter: blur(16px)`, 반투명 보더 `rgba(255, 255, 255, 0.08)`
* **시그니처 인터랙션**:
  - 우측 상단 다크네온 글래스모피즘 지구본(🌐) 다국어 드롭다운 캡슐
  - 우측 하단 플로팅 커피 후원 버튼 (펄스 링 파동 애니메이션 + 호버 시 Paperlogy "커피 후원하기" 텍스트 슬라이드)
  - 글로벌 파트너사 14개 로고 카드 호버 시 부드러운 스케일업 및 하이라이트

### 5.2 도네이션 플랫폼: Option A 웜 모카 & 크림 (Warm Mocha & Cream)
도네이션 페이지는 과도한 채도를 걷어내고, 눈의 피로를 덜어주는 아늑하고 신뢰감 있는 웜 톤을 기본 테마로 채택했습니다. (상단에 4색 미니멀 컬러 도트 스와치 및 뒤로가기 버튼 탑재)

| 구분 | 라이트 모드 (Default) | 다크 모드 (Dark) |
| :--- | :--- | :--- |
| **페이지 배경 (`--theme-bg-page`)** | `#FBF9F5` (부드러운 오트밀 베이지) | `#141211` (딥 웜 차콜) |
| **카드 배경 (`--theme-bg-card`)** | `#FFFFFF` (클린 화이트) | `#1E1A17` (다크 에스프레소) |
| **보더 라인 (`--theme-border`)** | `#ECE4D9` (웜 그레이 보더) | `#2E2823` (차콜 브라운 보더) |
| **메인 포인트 (`--theme-accent`)** | `#785238` (로스티드 모카 브라운) | `#B0825E` (샌드 브라운) |
| **버튼 그라데이션** | `linear-gradient(#8C6243, #6F4A30)` | `linear-gradient(#B0825E, #946643)` |
| **서브 배경 (`--theme-accent-sub`)** | `#F5EEE6` (모카 밀크 틴트) | `#2B231D` (딥 웜 틴트) |

---

## 6. 페이지별 화면 및 기능 명세

### 6.1 메인 홈페이지 (`index.html`) & 4개 국어 i18n 시스템
* **Hero Section**: 브랜드 슬로건, 핵심 가치 전달, 주요 서비스 및 프로젝트 안내
* **Multilingual i18n System (4개 국어 실시간 다국어 지원)**:
  - 🇰🇷 한국어 (KO, 기본), 🇺🇸 영어 (EN), 🇯🇵 일본어 (JA), 🇨🇳 중국어 (ZH)
  - JSON 기반 비동기 DOM 치환 엔진 (`asset/js/i18n.js` & `asset/lang/*.json`)
  - 119개 언어 키(Key) 4개 언어 파일 100% 매칭
  - 브라우저 언어 자동 감지, `localStorage` 설정 영구 보존, URL 파라미터(`?lang=`) 우선 지원
  - 상단 헤더 글래스모피즘 지구본(🌐) 드롭다운 캡슐 및 모바일 선택기 그룹
* **Floating Coffee Action Button**: 화면 우측 하단 고정, 클릭 시 후원 페이지(`donate/index.html`)로 부드럽게 전환
* **Footer**: 법적 사업자 정보 7대 항목 및 이용약관, 개인정보처리방침, 환불정책 링크 완비

---

### 6.2 6대 핵심 서비스 라인업 (Our Services)
1. ⚡ **1. 트래픽 캐쳐 (Traffic Catcher AI)**: 실시간 급상승 키워드 & 트렌드 기반 올인원 AI 자동 글작성 마케팅 플랫폼 ([trafficcatcher.ai](https://www.trafficcatcher.ai))
2. 🎮 **2. 캐주얼 & 온라인 게임**: 소셜 엔터테인먼트, 혁신적인 보드게임 및 파티게임
3. 📚 **3. 교육용 앱 솔루션**: 재미와 배움을 융합한 에듀테크 서비스
4. 🎵 **4. AI 음악 추천 및 제작 (Moodify Q)**: 사진과 감정을 분석하여 맞춤형 배경음악과 플레이리스트를 제작하는 스마트 AI 음악 솔루션 ([moodifyq.com](https://moodifyq.com), `asset/images/service-moodifyq.png`)
5. ☕🎵 **5. Music Diffuser (YouTube 공식 채널)**: 공부, 업무, 휴식/명상을 위한 감성적인 AI Lo-Fi & Ambient 배경음악 채널 ([@Music_Diffuser](https://www.youtube.com/@Music_Diffuser))
6. 🎮🔥 **6. 우짤게임 UZGAME (YouTube 공식 채널)**: 유쾌하고 재밌는 실시간 게임 플레이 스트리밍 채널 ([@uzgame-201](https://www.youtube.com/@uzgame-201)) 연동

---

### 6.3 14개 글로벌 파트너스 연동 (Global Partners)
1. **Google** (`https://google.com`)
2. **Claude / Anthropic** (`https://anthropic.com`)
3. **OpenAI** (`https://openai.com`)
4. **Ollama** (`https://ollama.com`)
5. **GitHub** (`https://github.com`)
6. **Cloudflare** (`https://cloudflare.com`)
7. **Vercel** (`https://vercel.com`)
8. **Oracle Cloud Free Tier** (`https://www.oracle.com/kr/cloud/free/`)
9. **PayPal** (`https://paypal.com`)
10. **Supabase** (`https://supabase.com`)
11. **PortOne** (`https://portone.io`)
12. **Resend** (`https://resend.com`)
13. **Netlify Drop** (`https://app.netlify.com/drop`)
14. **Google Antigravity** (`https://antigravity.google/`)

---

### 6.4 커피 후원 플랫폼 (`donate/index.html`)
* **상단 뒤로가기 버튼 (`<`)**: 좌측 상단 배치, 마우스 호버 시 선택된 테마 시안(모카/모노/세이지/인디고)에 맞춘 리플 배경 인터랙션 제공
* **상단 컬러 스와치 & 테마 토글**: 4가지 미니멀 컬러 도트 칩 및 다크/라이트 모드 전환
* **크리에이터 프로필 카드**: 와플커뮤니케이션 프로필 및 소개 문구
* **커피 잔 수 프리셋**:
  - ☕ 1잔: ₩3,000 ($3.00)
  - ☕☕ 3잔: ₩9,000 ($9.00)
  - ☕☕☕ 5잔: ₩15,000 ($15.00)
  - ✏️ 직접입력: 1,000원 단위 자유 설정
* **후원자 입력 폼**: 닉네임 입력(최대 20자), 응원 메시지(최대 200자 실시간 카운팅)
* **결제 수단 듀얼 탭**:
  - [국내 결제]: PortOne V2 (신용/체크카드, 카카오페이, 토스페이)
  - [해외 결제]: PayPal Official Donate SDK
* **결제 전 필수 동의 체크박스**:
  - `[필수] 이용약관, 개인정보처리방침 및 환불정책을 확인하였으며 이에 동의합니다.`
* **서비스 상품 정보 및 거래 조건 법적 고지 카드**:
  - 상품명: 크리에이터 커피 후원권 (디지털 응원 리워드)
  - 제공방식: 결제 즉시 실시간 명단 등재 및 감사 영수증 발급
  - 가격: VAT 포함 표기
  - 환불기준: 7일 이내 100% 전액 환불
* **실시간 후원자 피드 (Live Supporters Feed)**: Supabase PostgreSQL 실시간 동기화
* **감사 영수증 팝업 모달**: 결제 성공 시 후원 내역 및 축하 영수증 표시

---

### 6.5 전자상거래 3대 약관 및 정책 페이지
* 📜 **서비스 이용약관 (`donate/terms.html`)**: 서비스 목적, 권리/의무, 후원금 결제 및 서비스 제공 기준 규정
* 🔒 **개인정보처리방침 (`donate/privacy.html`)**: 수집 항목(닉네임, 메시지, 결제식별자), 보유기간 5년(전자상거래법), 제3자 제공(포트원/페이팔), 개인정보 보호책임자 명시
* 💸 **환불 및 청약철회 정책 (`donate/refund.html`)**: 결제 후 7일 이내 100% 청약철회/환불 보장, 3단계 환불 신청 절차 및 고객센터 유선번호(`02-561-0770`) 명시

---

### 6.6 Engineering Study 5대 실전 가이드라인 (`study/`)
와플커뮤니케이션의 실제 개발 노하우와 아키텍처 방법론을 집대성한 인터랙티브 가이드 문서군입니다.

1. 💻 **AI 기반 웹 개발 실전 전략** (`study/ai-powered-web-dev/index.html`):
   - Claude 3.7 Sonnet, Antigravity, GitHub Copilot을 활용한 하이브리드 바닐라 웹 개발 워크플로우
2. 🎨 **웹앱 디자인 시스템 & UI/UX 가이드** (`study/webapp-design-guide/index.html`):
   - Vantablack Luxe 다크 테마, 글래스모피즘, Paperlogy 타이포그래피 및 인터랙션 디자인 가이드
3. 🤖 **AI 협업 및 프롬프트 엔지니어링 마스터 가이드** (`study/ai-cowork-guide/index.html`):
   - Context Summary 관리, 단계별 아키텍처 검증, Subagent 위임 및 고도화 프롬프트 기법
4. 🚀 **웹/앱 업데이트 및 버전 관리 전략** (`study/app-update-plan/index.html`):
   - Git 브랜치 전략, Semantic Versioning, 무중단 배포 및 변경 이력 추적 가이드
5. 📱💻 **모바일 & PC 듀얼 UI 아키텍처 가이드** (`study/mobile-pc-dual-ui-architecture/index.html`):
   - 단일 코드베이스 반응형 그리드, 모바일 뷰포트 최적화, 터치/마우스 인터랙션 분기 아키텍처

---

### 6.7 글로벌 SEO & 검색엔진 최적화 인프라
* **다국어 Sitemap (`sitemap.xml`)**:
  - `xmlns:xhtml="http://www.w3.org/1999/xhtml"` 네임스페이스 적용
  - 메인 및 기획서, 5대 Study 가이드, 약관 페이지에 대해 `ko`, `en`, `ja`, `zh`, `x-default` `xhtml:link` `hreflang` 태그 완비
* **검색엔진 크롤러 규칙 (`robots.txt`)**:
  - 모든 정상 크롤러(`User-agent: *`) 대상 Allow 설정 및 `Sitemap: https://iwaffle.kr/sitemap.xml` 명시
* **메타태그 최적화**:
  - OpenGraph (og:title, og:description, og:image, og:url), Twitter Card 메타태그 적용

---

## 7. 결제 인프라 및 SDK 연동 상세

### 7.1 국내 결제 (PortOne V2 Browser SDK)
```javascript
const response = await PortOne.requestPayment({
  storeId: "store-2374a47d-68f6-44ef-835f-4e57b838fb1c",
  channelKey: "channel-key-0f69cf81-d006-4351-be62-7d31dda92e5a",
  paymentId: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  orderName: `☕ ${state.target} 님을 위한 커피 후원 (${state.cups}잔)`,
  totalAmount: state.amountKRW,
  currency: "CURRENCY_KRW",
  payMethod: "CARD",
  customer: {
    fullName: supporterName,
  }
});
```

### 7.2 해외 결제 (PayPal Official Donate SDK)
* **공식 SDK**: `https://www.paypalobjects.com/donate/sdk/donate-sdk.js`
* **비즈니스 수취 계정**: `ihnseob.kim@gmail.com`
* **운영 모드**: `env: 'production'` (실결제 활성화)
```javascript
window.PayPal.Donation.Button({
  env: 'production',
  business: 'ihnseob.kim@gmail.com',
  item_name: `☕ ${state.target} 님을 위한 커피 후원 (${state.cups}잔)`,
  amount: state.amountUSD.toFixed(2),
  currency_code: 'USD',
  onComplete: async function (params) {
    // 결제 완료 시 Supabase DB 실시간 저장 및 영수증 모달 출력
    await saveSupporterToDB({ ... });
  }
}).render('#paypal-button-wrapper');
```

---

## 8. 데이터베이스 스키마 및 보안 (Supabase)

```sql
-- donations 테이블 생성
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL DEFAULT '익명의 후원자',
    cups INTEGER NOT NULL DEFAULT 1 CHECK (cups > 0),
    amount TEXT NOT NULL,
    amount_krw NUMERIC DEFAULT 0,
    amount_usd NUMERIC DEFAULT 0,
    message TEXT DEFAULT '따뜻한 커피 한 잔 보내드립니다!',
    target TEXT DEFAULT '와플커뮤니케이션',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 설정
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.donations FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.donations FOR INSERT WITH CHECK (true);

-- Realtime 복제 채널 등록
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
```

---

## 9. PG사/포트원 심사 5대 필수 요건 검증 결과

| 검증 항목 | 법적 요구사항 | 구축 및 반영 상태 |
| :--- | :--- | :---: |
| **1. 사업자 정보 유무** | 상호, 대표자, 사업자번호, 통신판매업, 주소, 전화번호, 이메일 | ✅ **100% 충족** |
| **2. 이용약관 유무** | 전자상거래 표준 이용약관 독립 페이지 및 링크 연결 | ✅ **100% 충족** (`donate/terms.html`) |
| **3. 개인정보처리방침 유무** | 수집 항목, 보유 기간, 3자 제공, 개인정보 보호책임자 명시 | ✅ **100% 충족** (`donate/privacy.html`) |
| **4. 환불 정책 유무** | 7일 이내 청약철회 규정, 환불 소요기간, 고객센터 접수처 고지 | ✅ **100% 충족** (`donate/refund.html`) |
| **5. 상품 등록 및 가격 고지** | 판매 상품명, 제공 시기/방식, VAT 포함 가격, 결제 전 필수 동의 | ✅ **100% 충족** (`donate/index.html`) |

---

## 10. 배포 및 운영 현황

* **공식 대표 도메인**: `https://iwaffle.kr/`
* **공식 깃허브 저장소**: `https://github.com/wafflecomm/WaffleCommunication`
* **배포 브랜치**: `main` (CI/CD 자동 반영)
* **라이브 접속 URL**:
  - 🧇 **공식 메인 사이트**: `https://iwaffle.kr/` (또는 `https://wafflecomm.github.io/WaffleCommunication/`)
  - ☕ **커피 후원 플랫폼**: `https://iwaffle.kr/donate/`
  - 📑 **기획서 웹 뷰어**: `https://iwaffle.kr/WEBSITE_PLANNING.html`
  - 📜 **서비스 이용약관**: `https://iwaffle.kr/donate/terms.html`
  - 🔒 **개인정보처리방침**: `https://iwaffle.kr/donate/privacy.html`
  - 💸 **환불 및 청약철회 정책**: `https://iwaffle.kr/donate/refund.html`
  - 📚 **5대 Engineering Study 가이드**:
    1. AI 웹 개발 실전 전략: `https://iwaffle.kr/study/ai-powered-web-dev/`
    2. 웹앱 디자인 가이드: `https://iwaffle.kr/study/webapp-design-guide/`
    3. AI 협업 가이드: `https://iwaffle.kr/study/ai-cowork-guide/`
    4. 앱 업데이트 계획: `https://iwaffle.kr/study/app-update-plan/`
    5. 모바일/PC 듀얼 UI: `https://iwaffle.kr/study/mobile-pc-dual-ui-architecture/`

---

## 11. 향후 로드맵 및 고도화 계획

1. ✅ **🌐 다국어(i18n) 지원 완료**: 4개 국어(한국어, 영어, 일본어, 중국어) 실시간 전환 엔진 구축 완료
2. ✅ **📚 Engineering Study 가이드 구축 완료**: 5대 핵심 실전 개발 가이드라인 완비
3. ✅ **🎵 Moodify Q 서비스 리뉴얼 완료**: 공식 서비스 도메인 연동 및 UI 에셋 최신화
4. **🏆 후원자 명예의 전당 (Leaderboard)**: 누적 후원 잔 수 기준 Top 10 크리에이터 및 서포터 뱃지 부여
5. **🔔 실시간 디스코드/슬랙 웹훅 알림**: 후원 발생 시 크리에이터 채널로 즉시 응원 메시지 알림 봇 연동
6. **🎟️ 디지털 리워드 다운로드**: 정기 후원자 대상 독점 월페이퍼, 음원 스템 파일 다운로드 기능 연계
