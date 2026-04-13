# 와플커뮤니케이션 프리미엄 SPA 웹사이트 구축 계획

와플커뮤니케이션의 정체성을 담은 프리미엄 소개 웹사이트를 순수 HTML, CSS, JavaScript만을 사용하여 구축합니다. "무중력(Antigravity)" 테마와 "글래스모피즘" 스타일링을 통해 최신 기술력을 시각적으로 증명합니다.

## User Review Required

> [!IMPORTANT]
> **기술 스택 준수**: React나 TailwindCSS 없이 순수 바닐라 기술만 사용합니다.
> **애니메이션 성능**: 하드웨어 가속(GPU)을 활용한 CSS 및 JS 애니메이션으로 부드러운 사용자 경험을 제공합니다.

## Proposed Changes

### [Web Infrastructure]

#### [NEW] [index.html](file:///c:/Works/WaffleComm/index.html)
- 시맨틱 HTML5 구조 (Header, Main, Section, Footer)
- SEO 최적화 메타 태그 및 오픈 그래프 설정
- 스택 구성요소 간의 SPA 스타일 섹션 배치

#### [NEW] [style.css](file:///c:/Works/WaffleComm/style.css)
- **디자인 시스템**: 고급스러운 그라데이션 배경 및 글래스모피즘 유틸리티
- **Antigravity 효과**: 3D 입체 오브젝트를 위한 CSS3 스타일링
- **반응형 디자인**: CSS Media Query를 통한 기기별(PC/Tablet/Mobile) 최적화 배치
- **애니메이션**: Fade-in Up 효과 및 서비스 카드 카드 뒤집기/입체 효과

#### [NEW] [script.js](file:///c:/Works/WaffleComm/script.js)
- **Physics Engine (Lightweight)**: Hero 섹션의 무중력 떠다니는 오브젝트 물리 구현 (마우스 반응성 포함)
- **Scroll Observer**: Intersection Observer를 활용한 스크롤 애니메이션 제어
- **Form Handling**: Contact 폼 유효성 검사 및 간단한 피드백 로직

## Open Questions

- 제공해주신 목업 이미지(Portfolio용)가 따로 없으므로, 프리미엄한 기본 자리표시자 이미지들을 AI로 생성하여 배치할 예정입니다. 괜찮으신가요?
- "Google Antigravity" 이스터에그처럼 요소들이 아래로 떨어지는 '중력 붕괴' 효과가 필요한지, 아니면 초기 기획안처럼 '무중력 상태로 둥둥 떠 있는' 우아한 느낌을 원하시는지 확인이 필요합니다. (현재 계획은 '둥둥 떠 있는' 우아한 효과입니다.)

## Verification Plan

### Automated Tests
- 브라우저 도구를 사용하여 PC, 태블릿, 모바일 해상도별 레이아웃 확인
- Lighthouse를 통한 성능 및 SEO 점수 체크

### Manual Verification
- Hero 섹션의 무중력 오브젝트가 마우스 위치에 따라 부드럽게 반응하는지 확인
- 스크롤 시 텍스트 Fade-in Up 효과가 적절한 타이밍에 작동하는지 확인
- 서비스 카드 호버 시 입체적인 애니메이션 작동 확인
