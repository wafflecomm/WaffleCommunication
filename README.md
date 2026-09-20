# 🧇 Waffle Communication (와플커뮤니케이션)

> **Funny Flow, Happy Connect — 창의적인 플레이, 혁신적인 개발**  
> **공식 서비스 도메인:** [https://iwaffle.kr/](https://iwaffle.kr/)  
> **문서 버전:** v2.5.2 (i18n 다국어 시스템, Moodify Q, 5대 Study 가이드, 커피 후원 플랫폼 통합본)

[![Platform](https://img.shields.io/badge/Platform-Web-blue.svg)](https://iwaffle.kr/)
[![i18n](https://img.shields.io/badge/i18n-KO%20|%20EN%20|%20JA%20|%20ZH-orange.svg)](https://iwaffle.kr/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](https://iwaffle.kr/)
[![Payments](https://img.shields.io/badge/Payments-PortOne%20%7C%20PayPal-green.svg)](https://iwaffle.kr/donate/)

와플커뮤니케이션은 실시간 AI 마케팅 솔루션, 캐주얼 보드게임, 교육용 인터랙티브 앱, AI 음악 추천 및 제작(Moodify Q) 솔루션을 개발하는 소프트웨어 개발사입니다.  
본 프로젝트는 **브랜드 아이덴티티를 나타내는 프리미엄 공식 웹사이트**, 지속 가능한 창작 생태계를 위한 **글로벌 커피 후원 플랫폼(Coffee Donation)**, 그리고 실전 개발 노하우를 공유하는 **5대 Engineering Study 실전 가이드**를 원스톱으로 제공하는 제로-빌드(Zero-Build) 바닐라 웹 플랫폼입니다.

---

## ✨ 핵심 기능 (Key Features)

### 🌐 1. JSON 기반 4개 국어(KO/EN/JA/ZH) i18n 다국어 시스템
- **0ms 인메모리 번역 엔진 (`asset/js/i18n.js`):** 4개 국어(한국어, English, 日本語, 中文) 120개 언어 키 100% 매칭
- **지능형 언어 감지:** 브라우저 기본 언어 자동 감지, `localStorage` 설정 보존, URL 파라미터(`?lang=`) 실시간 동기화
- **글로벌 SaaS 뱃지 UI:** OS 호환성이 뛰어난 텍스트 뱃지 캡슐(`KO`, `EN`, `JA`, `ZH`) 및 다크네온 글래스모피즘 지구본(🌐) 드롭다운

### 🛸 2. Antigravity Hero & Vantablack Luxe UI
- **무중력 물리 엔진 (Vanilla Physics):** 마우스 커서에 실시간 반응하여 자연스럽게 부유하고 튕겨나가는 파티클 오브젝트
- **Vantablack 다크 글래스모피즘:** 심도 있는 블랙(`#000000` ~ `#09090B`) 배경과 `backdrop-filter: blur(16px)` 반투명 글래스 디자인
- **Paperlogy 타이포그래피:** 가독성과 미려한 곡선이 돋보이는 눈누 Paperlogy 프리미엄 웹폰트 전면 적용

### ☕ 3. 원클릭 커피 후원 플랫폼 (`donate/`)
- **국내/해외 듀얼 결제 인프라:**
  - **국내 결제:** PortOne Browser SDK V2 (신용/체크카드, 카카오페이, 토스페이)
  - **해외 결제:** PayPal Official Donate SDK (`USD` 환산 결제)
- **4단계 잔 수 프리셋:** 1잔(₩3,000 / $3), 3잔(₩9,000 / $9), 5잔(₩15,000 / $15), 직접입력 지원
- **실시간 서포터즈 피드:** Supabase PostgreSQL Realtime WebSocket 연동
- **감사 영수증 팝업:** 결제 완료 시 즉시 발급되는 인터랙티브 감사 영수증 모달
- **전자상거래 3대 약관 완비:** [이용약관](https://iwaffle.kr/donate/terms.html), [개인정보처리방침](https://iwaffle.kr/donate/privacy.html), [환불정책](https://iwaffle.kr/donate/refund.html)

### ⚡ 4. Our Services (6대 핵심 서비스 라인업)
1. ⚡ **트래픽 캐쳐 AI (Traffic Catcher):** 실시간 급상승 키워드 & 트렌드 기반 올인원 AI 자동 글작성 마케팅 플랫폼 ([trafficcatcher.ai](https://www.trafficcatcher.ai))
2. 🎮 **캐주얼 & 온라인 게임:** 소셜 엔터테인먼트, 혁신적인 보드게임 및 파티게임
3. 📚 **교육용 앱 솔루션 (EduTech):** 재미와 배움을 효과적으로 융합한 인터랙티브 에듀테크
4. 🎵 **Moodify Q (AI 음악 솔루션):** 사진과 감정을 분석하여 맞춤형 배경음악과 플레이리스트를 제작하는 스마트 AI 음악 솔루션 ([moodifyq.com](https://moodifyq.com))
5. ☕🎵 **Music Diffuser:** 공부, 업무, 휴식/명상을 위한 감성 AI Lo-Fi & Ambient 음악 공식 유튜브 채널 ([@Music_Diffuser](https://www.youtube.com/@Music_Diffuser))
6. 🎮🔥 **우짤게임 UZGAME:** 유쾌하고 재밌는 실시간 게임 플레이 스트리밍 공식 유튜브 채널 ([@uzgame-201](https://www.youtube.com/@uzgame-201))

### 📚 5. Engineering Study 5대 실전 가이드라인 (`study/`)
1. 💻 [AI 기반 웹 개발 실전 전략](https://iwaffle.kr/study/ai-powered-web-dev/): Claude 3.7 + Antigravity 하이브리드 바닐라 웹 워크플로우
2. 🎨 [웹앱 디자인 시스템 가이드](https://iwaffle.kr/study/webapp-design-guide/): Vantablack Luxe & Glassmorphism UI 설계
3. 🤖 [AI 협업 프롬프트 마스터 가이드](https://iwaffle.kr/study/ai-cowork-guide/): Context 관리 및 Subagent 위임 전략
4. 🚀 [웹/앱 업데이트 & 버전 전략](https://iwaffle.kr/study/app-update-plan/): Semantic Versioning & 무중단 배포 체계
5. 📱 [모바일 & PC 듀얼 UI 아키텍처](https://iwaffle.kr/study/mobile-pc-dual-ui-architecture/): 단일 코드베이스 반응형 그리드 & 뷰포트 최적화

### 🤝 6. 14대 글로벌 파트너스 연동
- Google, Claude(Anthropic), OpenAI, Ollama, GitHub, Cloudflare, Vercel, Oracle Cloud Free Tier, PayPal, Supabase, PortOne, Resend, Netlify Drop, Google Antigravity

### 🔍 7. 글로벌 SEO & 검색엔진 최적화
- **다국어 Sitemap (`sitemap.xml`):** `xhtml:link` `hreflang` 4개 국어 및 5대 Study 가이드 색인 완비
- **크롤러 규칙 (`robots.txt`):** 모든 검색엔진 크롤러 허용 및 사이트맵 명시
- **소셜 메타태그:** OpenGraph & Twitter Card 최적화

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
| :--- | :--- |
| **Front-End** | Vanilla HTML5, CSS3, Modern JavaScript (ES6+), Tailwind CSS CDN |
| **Typography** | Paperlogy Webfont (Weights: 400, 600, 700, 800), Outfit, Noto Sans KR |
| **i18n Engine** | Client-Side In-Memory JSON DOM Binding Engine (KO/EN/JA/ZH) |
| **Icons** | Iconify Solar Icons (Duotone & Linear) |
| **Domestic Pay** | PortOne Browser SDK V2 (신용/체크카드, 카카오페이, 토스페이) |
| **Global Pay** | PayPal Official Donate SDK (Production USD) |
| **Database** | Supabase PostgreSQL (Realtime WebSocket, Row Level Security) |
| **Hosting & CDN**| GitHub Pages + Custom Domain (`https://iwaffle.kr/`) |

---

## 📂 프로젝트 구조 (Structure)

```text
WaffleComm/
├── asset/
│   ├── images/              # 서비스 썸네일, 파트너 로고, og-image 등
│   ├── js/
│   │   └── i18n.js          # 4개 국어 자체 내장 i18n 엔진
│   └── lang/
│       ├── ko.json          # 한국어 사전 (120 keys)
│       ├── en.json          # 영어 사전 (120 keys)
│       ├── ja.json          # 일본어 사전 (120 keys)
│       └── zh.json          # 중국어 사전 (120 keys)
├── donate/
│   ├── index.html           # 커피 후원 플랫폼 메인
│   ├── guide.html           # 개발 가이드 인터랙티브 뷰어
│   ├── terms.html           # 전자상거래 서비스 이용약관
│   ├── privacy.html         # 개인정보처리방침
│   ├── refund.html          # 환불 및 청약철회 정책
│   └── planning.html        # 기획서 뷰어 복사본
├── study/
│   ├── ai-powered-web-dev/               # 1. AI 웹 개발 실전 전략
│   ├── webapp-design-guide/              # 2. 웹앱 디자인 시스템 가이드
│   ├── ai-cowork-guide/                  # 3. AI 협업 프롬프트 가이드
│   ├── app-update-plan/                  # 4. 앱 업데이트 & 버전 전략
│   └── mobile-pc-dual-ui-architecture/   # 5. 모바일/PC 듀얼 UI 아키텍처
├── index.html               # 메인 공식 웹사이트 (4개국어 지원)
├── style.css                # Vantablack Luxe 다크 디자인 시스템
├── script.js                # 안티그래비티 물리 엔진 & 스크롤 애니메이션
├── sitemap.xml              # 4개 국어 hreflang 지원 다국어 사이트맵
├── robots.txt               # 검색엔진 크롤러 최적화 명세
├── WEBSITE_PLANNING.md      # 통합 기획서 마크다운 원본 (v2.5)
├── WEBSITE_PLANNING.html    # 통합 기획서 인터랙티브 웹 뷰어
├── README.md                # 저장소 메인 설명서
└── README.html              # README 인터랙티브 웹 뷰어
```

---

## 🏢 공식 사업자 정보 및 법적 고지

- **상호명:** 와플커뮤니케이션 (개인사업자)
- **대표자:** 김인섭
- **사업자등록번호:** `214-13-58853`
- **통신판매업신고번호:** `제2026-서울강남-04919호`
- **업태 / 종목:** 서비스 / 소프트웨어개발및공급
- **사업장 주소:** (06159) 서울특별시 강남구 테헤란로 423, 2층 2440호 (삼성동, 현대타워)
- **고객센터:** `02-561-0770` (평일 10:00 ~ 18:00)
- **대표 이메일:** `waffle.comm@gmail.com`
- **공식 도메인:** [https://iwaffle.kr/](https://iwaffle.kr/)

---

## 🚀 빠른 시작 (Getting Started)

빌드 도구나 무거운 npm 패키지 설치 없이 브라우저에서 즉시 실행 가능합니다.

```bash
# 1. 저장소 클론
git clone https://github.com/wafflecomm/WaffleCommunication.git

# 2. 프로젝트 디렉토리 이동
cd WaffleCommunication

# 3. index.html을 브라우저에서 직접 열거나 로컬 웹 서버 실행 (VS Code Live Server 권장)
```

---

&copy; 2026 **Waffle Communication**. All rights reserved.
