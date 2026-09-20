/**
 * Waffle Communication Self-Contained Client-side i18n Engine v2.5
 * Fully supports offline, file:// protocol, localhost, and production HTTPS.
 * Instant 0ms language switching with zero network dependency.
 * Supported languages: Korean (ko), English (en), Japanese (ja), Chinese (zh)
 */
(function () {
  'use strict';

  const SUPPORTED_LANGS = ['ko', 'en', 'ja', 'zh'];
  const DEFAULT_LANG = 'ko';
  const STORAGE_KEY = 'waffle_lang';

  const LANG_NAMES = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文'
  };

  const LANG_FLAGS = {
    ko: '🇰🇷',
    en: '🇺🇸',
    ja: '🇯🇵',
    zh: '🇨🇳'
  };

  // Embedded Translation Dictionaries (Full 4 Languages, 120+ keys each)
  const TRANSLATIONS = {
  "ko": {
    "meta": {
      "title": "와플커뮤니케이션 | Waffle Communication - Funny Flow, Happy Connect",
      "description": "와플커뮤니케이션은 캐주얼 게임, 에듀테크, 트래픽캐쳐 AI, 그리고 실전 엔지니어링 스터디를 선도하는 창의적인 소프트웨어 개발 기업입니다.",
      "keywords": "와플커뮤니케이션, Waffle Communication, AI 웹개발, 트래픽캐쳐, 소프트웨어개발, 게임개발, 에듀테크, 다크네온 디자인시스템, 멀티AI협업, Moodify Q"
    },
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "portfolio": "Portfolio",
      "study": "Study",
      "partners": "Partners",
      "contact": "Contact"
    },
    "lang_selector": {
      "current": "한국어",
      "ko": "한국어 (KO)",
      "en": "English (EN)",
      "ja": "日本語 (JA)",
      "zh": "中文 (ZH)"
    },
    "hero": {
      "title_1": "Funny Flow",
      "title_2": "Happy Connect",
      "subtitle": "Innovating the Future through<br>Creative Technology",
      "btn_services": "Our Services",
      "btn_contact": "Get in Touch",
      "scroll_down": "Scroll Down"
    },
    "about": {
      "tag": "About Us",
      "title": "창의적인 플레이,<br>혁신적인 개발",
      "desc": "와플커뮤니케이션은 2012년 설립 이후, 기술과 재미의 경계를 허무는 혁신적인 솔루션을 제공해 왔습니다. 단순한 소프트웨어를 넘어 사용자의 삶에 즐거움과 효율을 더하는 가치를 창출합니다.",
      "vision_title": "Vision",
      "vision_desc": "글로벌 소셜 엔터테인먼트의 중심",
      "mission_title": "Mission",
      "mission_desc": "AI 기술로 사람을 연결하고 세상을 더 즐겁고 행복하게"
    },
    "services": {
      "tag": "What We Do",
      "title": "Our Services",
      "desc": "최신 기술을 활용한 다양한 분야의 소프트웨어 솔루션을 제공합니다.",
      "traffic_catcher_badge": "⚡ AI Platform",
      "traffic_catcher_title": "트래픽 캐쳐 (Traffic Catcher)",
      "traffic_catcher_slogan": "\"AI 트래픽을 잡아 5분 만에 나만의 글 작성!\"",
      "traffic_catcher_desc": "실시간 급상승 키워드와 포털·OTT·주식 트렌드를 스마트하게 포착하여 고품질 콘텐츠를 5분 만에 완성하는 올인원 AI 글작성 솔루션입니다.",
      "service_link": "서비스 바로가기",
      "games_title": "캐주얼 & 온라인 게임",
      "games_desc": "다함께 즐기는 소셜 엔터테인먼트, 혁신적인 보드게임과 파티게임 경험을 선사합니다.",
      "planning_badge": "🛠️ 기획중",
      "edutech_title": "교육용 앱 솔루션",
      "edutech_desc": "재미와 배움을 융합한 에듀테크 서비스로 학습의 효율성을 극대화합니다.",
      "moodify_badge": "🎧 Moodify Q Web",
      "moodify_title": "Moodify Q",
      "moodify_slogan": "\"오늘 나의 분위기, 그 순간을 채우는 완벽한 배경음악.\"",
      "moodify_desc": "사용자의 사진과 무드, 감성을 AI로 정밀 분석하여 나만의 맞춤형 플레이리스트와 감성 배경음악을 스마트하게 제작 및 추천합니다.",
      "moodify_link": "Moodify Q 바로가기",
      "music_diffuser_badge": "▶ YouTube",
      "music_diffuser_title": "Music Diffuser",
      "music_diffuser_desc": "공부, 업무, 휴식 및 명상을 위한 감성적인 AI Lo-Fi & Ambient 배경음악 공식 유튜브 채널입니다.",
      "youtube_link": "유튜브 채널 감상하기",
      "uzgame_badge": "▶ YouTube",
      "uzgame_title": "우짤게임 (UZGAME)",
      "uzgame_slogan": "\"그래서, 우짤래? 일단 게임부터 시작하지! 🎮\"",
      "uzgame_desc": "다양한 게임의 세계를 유쾌하고 재밌게 풀어내는 게임 플레이 스트리밍 채널입니다. 복잡한 고민은 접어두고 함께 즐겨보세요!"
    },
    "portfolio": {
      "tag": "Portfolio",
      "title": "Selected Works",
      "quote_sub1": "AI 시대 전에는",
      "quote_focus1": "기술을 가진 사람이 문제를 찾았다 면",
      "quote_sub2": "AI 시대 이후는",
      "quote_focus2": "문제를 가진 사람이 기술을 쓰는 시대",
      "quote_sub3": "입니다.",
      "item1_title": "Wellness Connect",
      "item1_desc": "Lifestyle App",
      "item2_title": "Waffle Pay",
      "item2_desc": "Fintech Solution",
      "item3_title": "CITY 2048",
      "item3_desc": "3D Puzzle Game"
    },
    "study": {
      "tag": "Learning & Growth",
      "title": "Engineering Study",
      "desc": "AI 에이전트 협업, 모던 디자인 시스템, 무중단 배포까지 실전 개발 워크플로우를 학습하고 공유합니다.",
      "guide_btn": "가이드 보기",
      "card1_badge": "AI Workflow",
      "card1_title": "AI-Powered Web Dev",
      "card1_sub": "기획부터 배포까지 6단계 30분 완성 워크플로우",
      "card1_desc": "NotebookLM 기획부터 Cloudflare 배포까지, 최신 AI 도구를 결합하여 1인 개발자도 전문 웹서비스를 신속하게 빌드하는 실전 파이프라인 가이드입니다.",
      "card2_badge": "Design System",
      "card2_title": "다크 네온 디자인 시스템",
      "card2_sub": "사이버펑크 글래스모피즘 & 8대 추천 폰트 스타터 킷",
      "card2_desc": "어떤 웹앱에도 즉시 이식 가능한 다크 네온 UI 테마 토큰, Paperlogy 등 8대 폰트 비교 분석, 엠비언트 특수 FX, 모바일 Safe Area 표준을 집대성했습니다.",
      "card3_badge": "Multi-Agent",
      "card3_title": "AI 협업·통합 운영 가이드",
      "card3_sub": "Gemini, Codex, Claude 3대 에이전트 무충돌 파이프라인",
      "card3_desc": "각기 다른 AI 에이전트의 작업을 안전하게 통합하고, 로컬·스테이징·운영 3단계 환경을 통해 하나의 완성도 높은 제품으로 연결하는 운영 기준입니다.",
      "card4_badge": "Release Pattern",
      "card4_title": "웹앱 업데이트 & 캐시 갱신",
      "card4_sub": "브라우저·PWA·웹뷰 캐시 트러블을 원천 차단하는 배포 설계",
      "card4_desc": "Git Commit SHA를 번들과 매니페스트에 주입하여, 새 배포 감지 시 사용자에게 끊김 없이 최신 버전을 갱신시키는 재사용 가능한 릴리스 프로세스입니다.",
      "card5_badge": "Product Architecture",
      "card5_title": "모바일·PC 듀얼 UI 아키텍처",
      "card5_sub": "One Core, Two Shells 실전 웹앱 아키텍처 가이드",
      "card5_desc": "모바일 웹·PWA·설치 앱의 안정성을 100% 보존하면서 하나의 서비스에 PC 최적화 화면을 확장하는 One Core, Two Shells 분리 렌더링 및 기능 플래그 점진 배포 표준입니다."
    },
    "partners": {
      "tag": "Partners",
      "title": "Global Partners",
      "desc": "글로벌 리딩 기업들과 함께 혁신적인 미래를 만들어갑니다."
    },
    "contact": {
      "tag": "Get in Touch",
      "title": "행복한 미래를<br>함께 만들어갑니다",
      "desc": "비즈니스 제휴 및 채용에 관한 문의를 환영합니다.",
      "email_label": "Email:",
      "location_label": "Location:",
      "location_val": "서울특별시 강남구 테헤란로 423, 현대타워 2층",
      "form_name_ph": "Name",
      "form_email_ph": "Email",
      "form_msg_ph": "Message",
      "form_submit": "메시지 보내기"
    },
    "footer": {
      "biz_name_label": "상호명 :",
      "biz_name_val": "와플커뮤니케이션",
      "ceo_label": "대표자 :",
      "ceo_val": "김인섭",
      "biz_num_label": "사업자등록번호 :",
      "biz_num_val": "214-13-58853",
      "biz_type_label": "업태/종목 :",
      "biz_type_val": "서비스 / 소프트웨어개발및공급",
      "telecom_num_label": "통신판매업신고 :",
      "telecom_num_val": "제2026-서울강남-04919호",
      "addr_label": "사업장 주소 :",
      "addr_val": "(06159) 서울특별시 강남구 테헤란로 423, 2층 2440호 (삼성동, 현대타워)",
      "cs_label": "고객센터 :",
      "cs_val": "02-561-0770 (평일 10:00~18:00)",
      "email_label": "이메일 :",
      "email_val": "waffle.comm@gmail.com",
      "terms": "이용약관",
      "privacy": "개인정보처리방침",
      "refund": "환불정책",
      "coffee_support": "커피후원",
      "rights": "© 2026 Waffle Communication. All rights reserved."
    },
    "floating": {
      "coffee_tooltip": "커피 한 잔 후원하기 ☕",
      "coffee_aria": "커피 후원하기",
      "back_to_top_aria": "맨 위로 이동"
    }
  },
  "en": {
    "meta": {
      "title": "Waffle Communication - Funny Flow, Happy Connect",
      "description": "Waffle Communication is a creative software development company leading casual games, edutech, Traffic Catcher AI, and practical engineering studies.",
      "keywords": "Waffle Communication, AI Web Development, Traffic Catcher, Software Development, Game Development, EduTech, Dark Neon Design System, Multi-AI Collaboration, Moodify Q"
    },
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "portfolio": "Portfolio",
      "study": "Study",
      "partners": "Partners",
      "contact": "Contact"
    },
    "lang_selector": {
      "current": "English",
      "ko": "한국어 (KO)",
      "en": "English (EN)",
      "ja": "日本語 (JA)",
      "zh": "中文 (ZH)"
    },
    "hero": {
      "title_1": "Funny Flow",
      "title_2": "Happy Connect",
      "subtitle": "Innovating the Future through<br>Creative Technology",
      "btn_services": "Our Services",
      "btn_contact": "Get in Touch",
      "scroll_down": "Scroll Down"
    },
    "about": {
      "tag": "About Us",
      "title": "Creative Play,<br>Innovative Tech",
      "desc": "Since its founding in 2012, Waffle Communication has provided innovative solutions breaking boundaries between technology and fun. Beyond simple software, we create value that adds joy and efficiency to people's lives.",
      "vision_title": "Vision",
      "vision_desc": "Global Hub of Social Entertainment",
      "mission_title": "Mission",
      "mission_desc": "Connecting people with AI to make the world more joyful and happy"
    },
    "services": {
      "tag": "What We Do",
      "title": "Our Services",
      "desc": "We offer state-of-the-art software solutions across diverse fields.",
      "traffic_catcher_badge": "⚡ AI Platform",
      "traffic_catcher_title": "Traffic Catcher",
      "traffic_catcher_slogan": "\"Catch AI Traffic & Create Quality Posts in 5 Minutes!\"",
      "traffic_catcher_desc": "An all-in-one AI automated writing solution that intelligently captures surging keywords and real-time trends across portals, OTT, and stocks to generate high-quality articles in 5 minutes.",
      "service_link": "Visit Service",
      "games_title": "Casual & Online Games",
      "games_desc": "Social entertainment for everyone, delivering innovative board games and interactive party game experiences.",
      "planning_badge": "🛠️ In Planning",
      "edutech_title": "EduTech App Solutions",
      "edutech_desc": "Educational technology services fusing fun with learning to maximize knowledge retention and study efficiency.",
      "moodify_badge": "🎧 Moodify Q Web",
      "moodify_title": "Moodify Q",
      "moodify_slogan": "\"Today's mood, the perfect soundtrack for every moment.\"",
      "moodify_desc": "Smart AI music curation and production analyzing user photos, emotions, and contexts to craft personalized playlists and ambient soundtracks.",
      "moodify_link": "Try Moodify Q",
      "music_diffuser_badge": "▶ YouTube",
      "music_diffuser_title": "Music Diffuser",
      "music_diffuser_desc": "Official YouTube channel offering emotional AI Lo-Fi & Ambient background music curated for study, deep work, relaxation, and mindfulness.",
      "youtube_link": "Watch on YouTube",
      "uzgame_badge": "▶ YouTube",
      "uzgame_title": "UZGAME",
      "uzgame_slogan": "\"So, what's next? Let's just start gaming! 🎮\"",
      "uzgame_desc": "A vibrant game streaming channel delivering fun and energetic gameplay across diverse worlds. Take a break and dive into the fun!"
    },
    "portfolio": {
      "tag": "Portfolio",
      "title": "Selected Works",
      "quote_sub1": "Before the AI era,",
      "quote_focus1": "people with technology looked for problems",
      "quote_sub2": "After the AI era,",
      "quote_focus2": "people with problems use technology",
      "quote_sub3": "to create solutions.",
      "item1_title": "Wellness Connect",
      "item1_desc": "Lifestyle App",
      "item2_title": "Waffle Pay",
      "item2_desc": "Fintech Solution",
      "item3_title": "CITY 2048",
      "item3_desc": "3D Puzzle Game"
    },
    "study": {
      "tag": "Learning & Growth",
      "title": "Engineering Study",
      "desc": "We explore and share practical engineering workflows covering AI collaboration, modern design systems, and zero-downtime deployment.",
      "guide_btn": "View Guide",
      "card1_badge": "AI Workflow",
      "card1_title": "AI-Powered Web Dev",
      "card1_sub": "6-Step 30-Minute Workflow from Planning to Live Deployment",
      "card1_desc": "A production-grade pipeline guide showing how solo developers can rapidly build professional web services combining NotebookLM and Cloudflare Pages.",
      "card2_badge": "Design System",
      "card2_title": "Dark Neon Design System",
      "card2_sub": "Cyberpunk Glassmorphism & 8 Curated Fonts Starter Kit",
      "card2_desc": "A comprehensive design system featuring reusable dark neon tokens, font comparisons (Paperlogy, etc.), ambient glow FX, and mobile safe area standards.",
      "card3_badge": "Multi-Agent",
      "card3_title": "AI Co-Work & Integration Guide",
      "card3_sub": "Conflict-Free Git Pipeline for Gemini, Codex, and Claude",
      "card3_desc": "Operational standards for safely integrating diverse AI agent outputs through local, staging, and production environments into one polished product.",
      "card4_badge": "Release Pattern",
      "card4_title": "Web App Update & Cache Invalidation",
      "card4_sub": "Bulletproof Deployment Architecture Eliminating Browser/PWA Cache Issues",
      "card4_desc": "A reusable release pattern injecting Git Commit SHA into manifests to notify users and smoothly update client bundles without cache disruption.",
      "card5_badge": "Product Architecture",
      "card5_title": "Mobile & Desktop Dual UI Architecture",
      "card5_sub": "One Core, Two Shells Practical Web App Architecture",
      "card5_desc": "An architectural standard preserving 100% mobile web/PWA stability while expanding desktop-optimized workspaces using split rendering and feature flags."
    },
    "partners": {
      "tag": "Partners",
      "title": "Global Partners",
      "desc": "Shaping an innovative future together with global tech leaders."
    },
    "contact": {
      "tag": "Get in Touch",
      "title": "Creating a Happy Future<br>Together with You",
      "desc": "We welcome inquiries regarding business partnerships and careers.",
      "email_label": "Email:",
      "location_label": "Location:",
      "location_val": "2F, Hyundai Tower, 423 Teheran-ro, Gangnam-gu, Seoul, Korea",
      "form_name_ph": "Name",
      "form_email_ph": "Email",
      "form_msg_ph": "Message",
      "form_submit": "Send Message"
    },
    "footer": {
      "biz_name_label": "Company :",
      "biz_name_val": "Waffle Communication",
      "ceo_label": "CEO :",
      "ceo_val": "Inseob Kim",
      "biz_num_label": "Business Reg. No :",
      "biz_num_val": "214-13-58853",
      "biz_type_label": "Business Type :",
      "biz_type_val": "Services / Software Development & Supply",
      "telecom_num_label": "E-Commerce Reg :",
      "telecom_num_val": "No. 2026-SeoulGangnam-04919",
      "addr_label": "Address :",
      "addr_val": "2F #2440 Hyundai Tower, 423 Teheran-ro, Gangnam-gu, Seoul (06159), Korea",
      "cs_label": "Customer Support :",
      "cs_val": "+82-2-561-0770 (Weekdays 10:00~18:00 KST)",
      "email_label": "Email :",
      "email_val": "waffle.comm@gmail.com",
      "terms": "Terms of Service",
      "privacy": "Privacy Policy",
      "refund": "Refund Policy",
      "coffee_support": "Buy Coffee",
      "rights": "© 2026 Waffle Communication. All rights reserved."
    },
    "floating": {
      "coffee_tooltip": "Buy Me a Coffee ☕",
      "coffee_aria": "Coffee Donation",
      "back_to_top_aria": "Back to Top"
    }
  },
  "ja": {
    "meta": {
      "title": "ワッフルコミュニケーション | Waffle Communication - Funny Flow, Happy Connect",
      "description": "ワッフルコミュニケーションは、カジュアルゲーム、エデュテック、トラフィックキャッチャーAI、実践エンジニアリングスタディをリードする創造的なソフトウェア開発企業です。",
      "keywords": "ワッフルコミュニケーション, Waffle Communication, AI Web開発, トラフィックキャッチャー, ソフトウェア開発, ゲーム開発, エデュテック, ダークネオンデザインシステム, マルチAI協業, Moodify Q"
    },
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "portfolio": "Portfolio",
      "study": "Study",
      "partners": "Partners",
      "contact": "Contact"
    },
    "lang_selector": {
      "current": "日本語",
      "ko": "한국어 (KO)",
      "en": "English (EN)",
      "ja": "日本語 (JA)",
      "zh": "中文 (ZH)"
    },
    "hero": {
      "title_1": "Funny Flow",
      "title_2": "Happy Connect",
      "subtitle": "Innovating the Future through<br>Creative Technology",
      "btn_services": "Our Services",
      "btn_contact": "Get in Touch",
      "scroll_down": "Scroll Down"
    },
    "about": {
      "tag": "About Us",
      "title": "クリエイティブな遊び、<br>革新的な開発",
      "desc": "ワッフルコミュニケーションは2012年の設立以来、技術と楽しさの境界を打ち破る革新的なソリューションを提供してきました。単なるソフトウェアを超え、ユーザーの日常に楽しさと効率を届ける価値を創造します。",
      "vision_title": "Vision",
      "vision_desc": "グローバル・ソーシャルエンターテインメントの中心へ",
      "mission_title": "Mission",
      "mission_desc": "AI技術で人々をつなぎ、世界をもっと楽しく幸せに"
    },
    "services": {
      "tag": "What We Do",
      "title": "Our Services",
      "desc": "最新テクノロジーを活用した多彩な分野のソフトウェアソリューションをお届けします。",
      "traffic_catcher_badge": "⚡ AI Platform",
      "traffic_catcher_title": "トラフィックキャッチャー (Traffic Catcher)",
      "traffic_catcher_slogan": "「AIトラフィックを捉え、5分で自分だけの記事を作成！」",
      "traffic_catcher_desc": "ポータル・OTT・株式トレンドや急上昇キーワードをスマートに捉え、高品質なコンテンツを5分で完成させるオールインワンAI記事作成ソリューションです。",
      "service_link": "サービスを見る",
      "games_title": "カジュアル＆オンラインゲーム",
      "games_desc": "みんなで楽しむソーシャルエンターテインメント。革新的なボードゲームとパーティーゲーム体験をお届けします。",
      "planning_badge": "🛠️ 企画中",
      "edutech_title": "教育用アプリソリューション",
      "edutech_desc": "楽しさと学びを融合させたエデュテックサービスで、学習の効率と定着を最大化します。",
      "moodify_badge": "🎧 Moodify Q Web",
      "moodify_title": "Moodify Q",
      "moodify_slogan": "「今日の気分、その瞬間を満たす完璧なBGM。」",
      "moodify_desc": "ユーザーの写真や感情、ムードをAIで精密分析し、あなただけのカスタムプレイリストと感性豊かなBGMをスマートに生成・レコメンドします。",
      "moodify_link": "Moodify Q を体験",
      "music_diffuser_badge": "▶ YouTube",
      "music_diffuser_title": "Music Diffuser",
      "music_diffuser_desc": "勉強・仕事・リラックス・瞑想のための感性豊かなAI Lo-Fi＆アンビエントBGM公式YouTubeチャンネルです。",
      "youtube_link": "YouTubeで聴く",
      "uzgame_badge": "▶ YouTube",
      "uzgame_title": "ウッチャルゲーム (UZGAME)",
      "uzgame_slogan": "「で、どうする？まずはゲームから始めよう！🎮」",
      "uzgame_desc": "多彩なゲームの世界を愉快かつ楽しくお届けするゲーム実況ストリーミングチャンネルです。悩みは忘れて一緒に楽しみましょう！"
    },
    "portfolio": {
      "tag": "Portfolio",
      "title": "Selected Works",
      "quote_sub1": "AI時代の前は、",
      "quote_focus1": "「技術を持つ人が問題を探していた」",
      "quote_sub2": "AI時代以降は、",
      "quote_focus2": "「問題を持つ人が技術を使う時代」",
      "quote_sub3": "です。",
      "item1_title": "Wellness Connect",
      "item1_desc": "Lifestyle App",
      "item2_title": "Waffle Pay",
      "item2_desc": "Fintech Solution",
      "item3_title": "CITY 2048",
      "item3_desc": "3D Puzzle Game"
    },
    "study": {
      "tag": "Learning & Growth",
      "title": "Engineering Study",
      "desc": "AIエージェント協業、モダンデザインシステム、無停止デプロイまで、実践的な開発ワークフローを学び共有します。",
      "guide_btn": "ガイドを見る",
      "card1_badge": "AI Workflow",
      "card1_title": "AI-Powered Web Dev",
      "card1_sub": "企画からデプロイまで6段階・30分完成ワークフロー",
      "card1_desc": "NotebookLM企画からCloudflareデプロイまで、最新AIツールを融合し個人開発者でも本格Webサービスを迅速に構築する実践ガイドです。",
      "card2_badge": "Design System",
      "card2_title": "ダークネオンデザインシステム",
      "card2_sub": "サイバーパンク・グラスモーフィズム＆おすすめ8大フォント",
      "card2_desc": "あらゆるWebアプリに即座に適用可能なダークネオンUIトークン、Paperlogy等8大フォント比較、アンビエント発光FX、モバイルSafe Area標準を凝縮しました。",
      "card3_badge": "Multi-Agent",
      "card3_title": "AI協業・統合運用ガイド",
      "card3_sub": "Gemini・Codex・Claude 3大エージェント無衝突パイプライン",
      "card3_desc": "異なるAIエージェントの作業を安全に統合し、ローカル・ステージング・本番の3段階環境を通じて完成度の高いプロダクトに仕上げる運用基準です。",
      "card4_badge": "Release Pattern",
      "card4_title": "Webアプリ更新＆キャッシュ更新",
      "card4_sub": "ブラウザ・PWA・WebViewキャッシュトラブルを遮断する設計",
      "card4_desc": "Git Commit SHAをバンドルとマニフェストに注入し、新バージョン配信時にユーザーへシームレスに最新版を反映させる再利用可能なリリースプロセスです。",
      "card5_badge": "Product Architecture",
      "card5_title": "モバイル・PC デュアルUI設計",
      "card5_sub": "One Core, Two Shells 実践Webアプリアーキテクチャ",
      "card5_desc": "モバイルWeb・PWAの安定性を100%保ちながら、PC最適化画面を拡張するOne Core, Two Shells分離レンダリングとFeature Flag段階デプロイ標準です。"
    },
    "partners": {
      "tag": "Partners",
      "title": "Global Partners",
      "desc": "グローバルリーディングカンパニーと共に革新的な未来を築きます。"
    },
    "contact": {
      "tag": "Get in Touch",
      "title": "幸せな未来を<br>共に創りましょう",
      "desc": "ビジネス提携や採用に関するお問い合わせを心よりお待ちしております。",
      "email_label": "Email:",
      "location_label": "Location:",
      "location_val": "大韓民国 ソウル特別市 江南区 テヘラン路 423, 現代タワー 2階",
      "form_name_ph": "Name",
      "form_email_ph": "Email",
      "form_msg_ph": "Message",
      "form_submit": "メッセージを送信"
    },
    "footer": {
      "biz_name_label": "商号 :",
      "biz_name_val": "ワッフルコミュニケーション",
      "ceo_label": "代表者 :",
      "ceo_val": "金 仁燮 (Inseob Kim)",
      "biz_num_label": "事業者登録番号 :",
      "biz_num_val": "214-13-58853",
      "biz_type_label": "業態/種目 :",
      "biz_type_val": "サービス / ソフトウェア開発および供給",
      "telecom_num_label": "通信販売業届出 :",
      "telecom_num_val": "第2026-ソウル江南-04919号",
      "addr_label": "事業所所在地 :",
      "addr_val": "(06159) ソウル特別市 江南区 テヘラン路 423, 2階 2440号 (現代タワー)",
      "cs_label": "カスタマーサポート :",
      "cs_val": "+82-2-561-0770 (平日 10:00~18:00 KST)",
      "email_label": "メール :",
      "email_val": "waffle.comm@gmail.com",
      "terms": "利用規約",
      "privacy": "プライバシーポリシー",
      "refund": "返金ポリシー",
      "coffee_support": "コーヒーを奢る",
      "rights": "© 2026 Waffle Communication. All rights reserved."
    },
    "floating": {
      "coffee_tooltip": "コーヒー一杯を奢る ☕",
      "coffee_aria": "コーヒーサポート",
      "back_to_top_aria": "ページトップへ戻る"
    }
  },
  "zh": {
    "meta": {
      "title": "华夫通讯 | Waffle Communication - Funny Flow, Happy Connect",
      "description": "华夫通讯（Waffle Communication）是一家引领休闲游戏、教育科技、Traffic Catcher AI 及实战工程研讨的创新型软件开发企业。",
      "keywords": "华夫通讯, Waffle Communication, AI网站开发, Traffic Catcher, 软件开发, 游戏开发, 教育科技, 暗黑霓虹设计系统, 多AI协作, Moodify Q"
    },
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "portfolio": "Portfolio",
      "study": "Study",
      "partners": "Partners",
      "contact": "Contact"
    },
    "lang_selector": {
      "current": "中文",
      "ko": "한국어 (KO)",
      "en": "English (EN)",
      "ja": "日本語 (JA)",
      "zh": "中文 (ZH)"
    },
    "hero": {
      "title_1": "Funny Flow",
      "title_2": "Happy Connect",
      "subtitle": "Innovating the Future through<br>Creative Technology",
      "btn_services": "Our Services",
      "btn_contact": "Get in Touch",
      "scroll_down": "Scroll Down"
    },
    "about": {
      "tag": "About Us",
      "title": "创意畅玩，<br>革新开发",
      "desc": "华夫通讯自2012年成立以来，始终致力于打破科技与乐趣的界限，提供创新的解决方案。超越传统软件，为用户的生活创造更多乐趣与高效价值。",
      "vision_title": "Vision",
      "vision_desc": "成为全球社交娱乐的创新核心",
      "mission_title": "Mission",
      "mission_desc": "用AI科技连接彼此，让世界更加充满欢笑与幸福"
    },
    "services": {
      "tag": "What We Do",
      "title": "Our Services",
      "desc": "运用前沿科技，在多元化领域提供卓越的软件解决方案。",
      "traffic_catcher_badge": "⚡ AI Platform",
      "traffic_catcher_title": "流量捕手 (Traffic Catcher)",
      "traffic_catcher_slogan": "“捕捉AI热点流量，5分钟极速生成专属爆款文章！”",
      "traffic_catcher_desc": "智能捕捉全网突发热词与门户·OTT·股市流行趋势，5分钟一键完成高质量内容的一站式AI自动化写作营销平台。",
      "service_link": "访问服务",
      "games_title": "休闲与在线游戏",
      "games_desc": "全民共享的社交娱乐，呈现革新性的桌游与聚会派对游戏极致体验。",
      "planning_badge": "🛠️ 企划中",
      "edutech_title": "教育科技应用解决方案",
      "edutech_desc": "融汇趣味与知识的教育科技服务，全面提升学习与知识留存效率。",
      "moodify_badge": "🎧 Moodify Q Web",
      "moodify_title": "Moodify Q",
      "moodify_slogan": "“今天的氛围，点亮这一刻的完美背景音乐。”",
      "moodify_desc": "通过AI精密分析用户的照片、情绪与场景氛围，智能定制专属播放列表与高品质情感背景音乐。",
      "moodify_link": "体验 Moodify Q",
      "music_diffuser_badge": "▶ YouTube",
      "music_diffuser_title": "Music Diffuser",
      "music_diffuser_desc": "专为学习、深度工作、放松与冥想打造的治愈系 AI Lo-Fi & Ambient 背景音乐官方YouTube频道。",
      "youtube_link": "在YouTube上收听",
      "uzgame_badge": "▶ YouTube",
      "uzgame_title": "乌扎游戏 (UZGAME)",
      "uzgame_slogan": "“所以呢？先从游戏开始爽快开战吧！🎮”",
      "uzgame_desc": "幽默风趣地解构各类精彩游戏世界的实况直播频道。抛开烦恼，一起快乐畅玩！"
    },
    "portfolio": {
      "tag": "Portfolio",
      "title": "Selected Works",
      "quote_sub1": "在AI时代之前，",
      "quote_focus1": "“掌握技术的人在寻找问题”",
      "quote_sub2": "在AI时代之后，",
      "quote_focus2": "“面临问题的人在运用技术”",
      "quote_sub3": "解决问题。",
      "item1_title": "Wellness Connect",
      "item1_desc": "Lifestyle App",
      "item2_title": "Waffle Pay",
      "item2_desc": "Fintech Solution",
      "item3_title": "CITY 2048",
      "item3_desc": "3D Puzzle Game"
    },
    "study": {
      "tag": "Learning & Growth",
      "title": "Engineering Study",
      "desc": "深入探讨并分享从多AI Agent协同、现代设计系统到零停机发布的实战工程工作流。",
      "guide_btn": "查看指南",
      "card1_badge": "AI Workflow",
      "card1_title": "AI-Powered Web Dev",
      "card1_sub": "从企划到上线 6步30分钟极速工作流",
      "card1_desc": "融合NotebookLM企划与Cloudflare部署，指导独立开发者快速构建专业级Web服务的实战全流程指南。",
      "card2_badge": "Design System",
      "card2_title": "暗黑霓虹设计系统",
      "card2_sub": "赛博朋克毛玻璃风格 & 8大精选字体实战套件",
      "card2_desc": "可即刻复用至任何Web应用的暗黑霓虹UI设计令牌、Paperlogy等8大字体深度对比、环境光晕FX及移动端Safe Area标准。",
      "card3_badge": "Multi-Agent",
      "card3_title": "AI协同与集成运营指南",
      "card3_sub": "Gemini、Codex、Claude 三大Agent无冲突Git管线",
      "card3_desc": "安全整合不同AI Agent的工作产出，贯通本地·预发·生产三级环境，打造高度成熟产品的工程规范。",
      "card4_badge": "Release Pattern",
      "card4_title": "Web应用更新与缓存刷新",
      "card4_sub": "根除浏览器·PWA·WebView缓存故障的发布架构",
      "card4_desc": "将Git Commit SHA注入打包产物与Manifest，检测到新版本时无缝为用户刷新最新版本的可复用发布模式。",
      "card5_badge": "Product Architecture",
      "card5_title": "移动端与PC双端UI架构",
      "card5_sub": "One Core, Two Shells 实战Web应用架构指南",
      "card5_desc": "在100%保留移动端Web与PWA稳定性的同时，通过分层渲染与Feature Flag逐步扩展PC大屏工作台的标准规范。"
    },
    "partners": {
      "tag": "Partners",
      "title": "Global Partners",
      "desc": "与全球科技领军企业携手，共同开创突破性的科技未来。"
    },
    "contact": {
      "tag": "Get in Touch",
      "title": "携手共创<br>充满幸福的未来",
      "desc": "竭诚欢迎商业合作与人才招聘相关咨询。",
      "email_label": "Email:",
      "location_label": "Location:",
      "location_val": "韩国首尔特别市江南区德黑兰路423 现代大厦2楼",
      "form_name_ph": "Name",
      "form_email_ph": "Email",
      "form_msg_ph": "Message",
      "form_submit": "发送消息"
    },
    "footer": {
      "biz_name_label": "商号 :",
      "biz_name_val": "华夫通讯 (Waffle Communication)",
      "ceo_label": "代表 :",
      "ceo_val": "金仁燮 (Inseob Kim)",
      "biz_num_label": "营业执照注册号 :",
      "biz_num_val": "214-13-58853",
      "biz_type_label": "行业/项目 :",
      "biz_type_val": "服务业 / 软件开发与供应",
      "telecom_num_label": "电子商务申报 :",
      "telecom_num_val": "第2026-首尔江南-04919号",
      "addr_label": "营业场所地址 :",
      "addr_val": "(06159) 韩国首尔特别市江南区德黑兰路423 现代大厦2楼2440号",
      "cs_label": "客服中心 :",
      "cs_val": "+82-2-561-0770 (工作日 10:00~18:00 KST)",
      "email_label": "电子邮箱 :",
      "email_val": "waffle.comm@gmail.com",
      "terms": "服务条款",
      "privacy": "隐私政策",
      "refund": "退款政策",
      "coffee_support": "请喝咖啡",
      "rights": "© 2026 Waffle Communication. All rights reserved."
    },
    "floating": {
      "coffee_tooltip": "请作者喝杯咖啡 ☕",
      "coffee_aria": "咖啡赞助",
      "back_to_top_aria": "回到顶部"
    }
  }
};

  let currentLang = DEFAULT_LANG;

  // 1. Determine Initial Language
  function detectLanguage() {
    // 1-1. Check URL param (?lang=en)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LANGS.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }
    } catch (e) {}

    // 1-2. Check LocalStorage
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
        return savedLang;
      }
    } catch (e) {}

    // 1-3. Check Navigator Language
    try {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('ko')) return 'ko';
      if (browserLang.startsWith('ja')) return 'ja';
      if (browserLang.startsWith('zh')) return 'zh';
      if (browserLang.startsWith('en')) return 'en';
    } catch (e) {}

    return DEFAULT_LANG;
  }

  // 2. Helper to resolve nested key (e.g. "services.traffic_catcher_title")
  function getNestedValue(obj, path) {
    if (!obj || !path) return null;
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  // 3. Update DOM Elements with Translations
  function updateDOM(data, lang) {
    if (!data) return;

    // 3-1. Document HTML lang attribute
    document.documentElement.lang = lang;

    // 3-2. Meta tags & Title
    if (data.meta) {
      if (data.meta.title) {
        document.title = data.meta.title;
      }
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && data.meta.description) {
        metaDesc.setAttribute('content', data.meta.description);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && data.meta.title) {
        ogTitle.setAttribute('content', data.meta.title);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && data.meta.description) {
        ogDesc.setAttribute('content', data.meta.description);
      }

      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle && data.meta.title) {
        twTitle.setAttribute('content', data.meta.title);
      }

      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc && data.meta.description) {
        twDesc.setAttribute('content', data.meta.description);
      }
    }

    // 3-3. [data-i18n] Text & HTML replacement
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        if (el.hasAttribute('data-i18n-html') || /<[a-z][\s\S]*>/i.test(val)) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 3-4. [data-i18n-placeholder] Input placeholder replacement
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('placeholder', val);
      }
    });

    // 3-5. [data-i18n-title] Tooltip / title attribute
    const titled = document.querySelectorAll('[data-i18n-title]');
    titled.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('title', val);
      }
    });

    // 3-6. [data-i18n-aria] Aria labels
    const ariaEls = document.querySelectorAll('[data-i18n-aria]');
    ariaEls.forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = getNestedValue(data, key);
      if (val !== null && val !== undefined) {
        el.setAttribute('aria-label', val);
      }
    });

    // 3-7. Update Language Switcher UI components
    updateSwitcherUI(lang);
  }

  // 4. Update Language Switcher UI components
  function updateSwitcherUI(lang) {
    const currentLabels = document.querySelectorAll('.lang-current-text');
    currentLabels.forEach(el => {
      el.textContent = LANG_NAMES[lang] || lang.toUpperCase();
    });

    const currentFlags = document.querySelectorAll('.lang-current-flag');
    currentFlags.forEach(el => {
      el.textContent = LANG_FLAGS[lang] || '🌐';
    });

    // Highlight active in menu
    const menuItems = document.querySelectorAll('[data-set-lang]');
    menuItems.forEach(item => {
      const itemLang = item.getAttribute('data-set-lang');
      if (itemLang === lang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });
  }

  // 5. Set Language (Public Method - Instant Synchronous Execution)
  function setLanguage(lang, updateUrl = true) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      lang = DEFAULT_LANG;
    }

    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    const translations = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    updateDOM(translations, lang);

    // Update URL parameter without page reload
    if (updateUrl && window.history && window.history.replaceState) {
      try {
        const url = new URL(window.location.href);
        if (lang === DEFAULT_LANG) {
          url.searchParams.delete('lang');
        } else {
          url.searchParams.set('lang', lang);
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {}
    }

    // Trigger Custom Event for other modules
    try {
      window.dispatchEvent(new CustomEvent('waffle:langchange', { detail: { lang, translations } }));
    } catch (e) {}

    console.log(`[i18n] Language changed to: ${lang} (${LANG_NAMES[lang]})`);
  }

  // 6. Initialize Switcher Events & Dropdowns
  function setupSwitcherEvents() {
    // Dropdown toggle
    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.lang-dropdown-toggle');
      const dropdown = e.target.closest('.lang-dropdown');

      // Close all other dropdowns
      document.querySelectorAll('.lang-dropdown.open').forEach(d => {
        if (!dropdown || d !== dropdown) {
          d.classList.remove('open');
        }
      });

      if (toggleBtn && dropdown) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('open');
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-dropdown')) {
        document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });

    // Language option click (Delegated handler)
    document.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('[data-set-lang]');
      if (optionBtn) {
        e.preventDefault();
        e.stopPropagation();
        const selectedLang = optionBtn.getAttribute('data-set-lang');
        if (selectedLang) {
          setLanguage(selectedLang, true);
          
          // Close dropdown
          document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
        }
      }
    });

    // Direct binding on all existing buttons to guarantee trigger
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedLang = this.getAttribute('data-set-lang');
        if (selectedLang) {
          setLanguage(selectedLang, true);
          document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });
  }

  // 7. Bootstrap Engine
  function init() {
    setupSwitcherEvents();
    const initialLang = detectLanguage();
    setLanguage(initialLang, false);
  }

  // Expose global API
  window.WaffleI18n = {
    setLanguage: setLanguage,
    getLanguage: () => currentLang,
    getSupportedLangs: () => [...SUPPORTED_LANGS],
    getTranslations: (lang) => TRANSLATIONS[lang || currentLang] || TRANSLATIONS[DEFAULT_LANG]
  };
  window.setLanguage = setLanguage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
