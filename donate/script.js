/**
 * ☕ Minimal Coffee Donation Platform JavaScript
 * - Paperlogy UI Interaction & Theme Management
 * - PortOne V2 SDK & PayPal JS SDK Integration
 * - Supabase Cloud DB SDK & Smart LocalStorage Fallback Storage
 * - URL Parameter Parsing (target, amount, message)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 0. Cloud DB (Supabase SDK) Configuration
  // ==========================================
  // [안내] Supabase(무료) 가입 후 Project URL과 Anon Key만 입력하면 실시간 클라우드 DB로 즉시 연동됩니다.
  // 키를 입력하지 않아도 LocalStorage를 통해 새로고침 후에도 영구 저장되도록 자동 동작합니다.
  const SUPABASE_CONFIG = {
    url: 'https://xojswhauzuqwtresgycm.supabase.co',
    anonKey: 'sb_publishable_IfjfDaVF-sYRqlj-n63jOw_xuewXHO5',
    tableName: 'donations'
  };

  let supabaseClient = null;
  const isSupabaseConfigured = () => {
    return window.supabase && 
           SUPABASE_CONFIG.url && 
           !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE_PROJECT_ID') &&
           SUPABASE_CONFIG.anonKey &&
           !SUPABASE_CONFIG.anonKey.includes('YOUR_SUPABASE_ANON_KEY');
  };

  if (isSupabaseConfigured()) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('✅ Supabase Cloud DB 연결 성공 (Realtime 지원)');
    } catch (e) {
      console.warn('Supabase 초기화 오류, LocalStorage로 자동 전환합니다.', e);
    }
  }

  // ==========================================
  // 1. State Management
  // ==========================================
  const defaultSupporters = [
    { id: 'sample-1', name: '민우', cups: 3, amount: '₩9,000', message: '오픈소스 라이브러리 덕분에 프로젝트 잘 마쳤습니다! 커피 드시고 힘내세요 ☕☕☕', time: '10분 전' },
    { id: 'sample-2', name: 'Alex K.', cups: 5, amount: '$15.00', message: 'Amazing work on the AI workflow! Keep building awesome stuff 🚀', time: '1시간 전' },
    { id: 'sample-3', name: '지현', cups: 1, amount: '₩3,000', message: '작은 응원이지만 보탭니다. 항상 응원해요!', time: '3시간 전' },
    { id: 'sample-4', name: '도현', cups: 3, amount: '₩9,000', message: '와플커뮤니케이션 게임 너무 재밌어요 ㅎㅎ 개발 파이팅!', time: '어제' }
  ];

  const state = {
    target: '와플커뮤니케이션',
    targetId: 'wafflecomm',
    cups: 1,
    unitPriceKRW: 3000,
    unitPriceUSD: 3.00,
    amountKRW: 3000,
    amountUSD: 3.00,
    isCustom: false,
    nickname: '',
    message: '',
    paymentMethod: 'portone', // 'portone' | 'paypal'
    supporters: []
  };

  // ==========================================
  // 2. DOM Elements
  // ==========================================
  const elements = {
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    creatorName: document.getElementById('creator-name'),
    creatorBio: document.getElementById('creator-bio'),
    presetBtns: document.querySelectorAll('.preset-btn'),
    customAmountContainer: document.getElementById('custom-amount-container'),
    customAmountInput: document.getElementById('custom-amount-input'),
    nicknameInput: document.getElementById('nickname-input'),
    messageInput: document.getElementById('message-input'),
    charCount: document.getElementById('char-count'),
    totalAmountKRW: document.getElementById('total-amount-krw'),
    totalAmountUSD: document.getElementById('total-amount-usd'),
    tabPortone: document.getElementById('tab-portone'),
    tabPaypal: document.getElementById('tab-paypal'),
    portoneContainer: document.getElementById('portone-container'),
    paypalContainer: document.getElementById('paypal-container'),
    btnPortonePay: document.getElementById('btn-portone-pay'),
    supportersList: document.getElementById('supporters-list'),
    successModal: document.getElementById('success-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalSupporterName: document.getElementById('modal-supporter-name'),
    modalAmount: document.getElementById('modal-amount'),
    modalMessage: document.getElementById('modal-message')
  };

  // ==========================================
  // 3. Theme & Color Palette Handler (System / Light / Dark)
  // ==========================================
  const THEME_MODES = ['system', 'light', 'dark'];

  function applyThemeMode(mode) {
    const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = false;

    if (mode === 'system') {
      isDark = isOsDark;
      if (elements.themeIcon) {
        elements.themeIcon.setAttribute('icon', 'solar:monitor-smartphone-bold-duotone');
      }
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.setAttribute('data-tooltip', `화면 모드: 시스템 설정 (${isDark ? '다크' : '라이트'})`);
      }
    } else if (mode === 'light') {
      isDark = false;
      if (elements.themeIcon) {
        elements.themeIcon.setAttribute('icon', 'solar:sun-2-bold-duotone');
      }
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.setAttribute('data-tooltip', '화면 모드: 라이트');
      }
    } else if (mode === 'dark') {
      isDark = true;
      if (elements.themeIcon) {
        elements.themeIcon.setAttribute('icon', 'solar:moon-bold-duotone');
      }
      if (elements.themeToggleBtn) {
        elements.themeToggleBtn.setAttribute('data-tooltip', '화면 모드: 다크');
      }
    }

    document.documentElement.classList.toggle('dark', isDark);

    // 툴팁 활성 상태 시 툴팁 내용도 즉시 업데이트
    const tooltip = document.getElementById('custom-tooltip');
    if (tooltip && tooltip.classList.contains('show') && elements.themeToggleBtn) {
      tooltip.textContent = elements.themeToggleBtn.getAttribute('data-tooltip');
    }
  }

  function initTheme() {
    // 1) System / Light / Dark Theme Sync (Default: system)
    const currentMode = localStorage.getItem('donation_theme_mode') || 'system';
    applyThemeMode(currentMode);

    // OS 테마 변경 시 시스템 모드 실시간 자동 반응
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const mode = localStorage.getItem('donation_theme_mode') || 'system';
      if (mode === 'system') {
        applyThemeMode('system');
      }
    });

    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', () => {
        const mode = localStorage.getItem('donation_theme_mode') || 'system';
        const nextIndex = (THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length;
        const nextMode = THEME_MODES[nextIndex];
        localStorage.setItem('donation_theme_mode', nextMode);
        applyThemeMode(nextMode);
      });
    }

    // 2) Color Palette Swatches (Default: mocha)
    const savedColor = localStorage.getItem('donation_color_theme') || 'mocha';
    applyColorTheme(savedColor);

    const paletteChips = document.querySelectorAll('.palette-chip');
    paletteChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const color = chip.dataset.color;
        applyColorTheme(color);
        localStorage.setItem('donation_color_theme', color);
      });
    });
  }

  function applyColorTheme(color) {
    document.documentElement.setAttribute('data-color-theme', color);
    const paletteChips = document.querySelectorAll('.palette-chip');
    paletteChips.forEach(chip => {
      if (chip.dataset.color === color) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 4. URL Parameters Parser
  // ==========================================
  function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetParam = urlParams.get('target');
    const amountParam = urlParams.get('amount');
    const messageParam = urlParams.get('message');

    if (targetParam) {
      state.target = targetParam;
      state.targetId = targetParam.toLowerCase().replace(/[^a-z0-9]/g, '');
      elements.creatorName.textContent = `${state.target}`;
      elements.creatorBio.textContent = `${state.target} 님의 창작 활동과 오픈소스 유지를 위한 커피 후원 페이지입니다.`;
      document.title = `${state.target} 님에게 커피 후원하기 ☕`;
    }

    if (messageParam) {
      elements.messageInput.value = messageParam;
      state.message = messageParam;
      elements.charCount.textContent = `${messageParam.length}/200`;
    }

    if (amountParam) {
      const parsedAmount = parseInt(amountParam, 10);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        setAmount(parsedAmount);
      }
    } else {
      setPreset(1);
    }
  }

  // ==========================================
  // 5. Amount & Preset Calculation
  // ==========================================
  function setPreset(cups) {
    state.isCustom = false;
    state.cups = cups;
    state.amountKRW = cups * state.unitPriceKRW;
    state.amountUSD = (cups * state.unitPriceUSD);

    elements.customAmountContainer.classList.add('hidden');
    elements.customAmountInput.value = '';

    elements.presetBtns.forEach(btn => {
      const btnCups = parseInt(btn.dataset.cups, 10);
      if (btnCups === cups) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateAmountDisplay();
    reRenderPayPal();
  }

  function setCustomAmount() {
    state.isCustom = true;
    elements.presetBtns.forEach(btn => {
      if (btn.dataset.cups === 'custom') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    elements.customAmountContainer.classList.remove('hidden');
    elements.customAmountInput.focus();

    const val = parseInt(elements.customAmountInput.value, 10) || state.unitPriceKRW;
    setAmount(val);
  }

  function setAmount(amountKRW) {
    state.amountKRW = Math.max(1000, amountKRW);
    state.cups = Math.round(state.amountKRW / state.unitPriceKRW);
    state.amountUSD = parseFloat((state.amountKRW / 1000).toFixed(2));

    updateAmountDisplay();
    reRenderPayPal();
  }

  function updateAmountDisplay() {
    elements.totalAmountKRW.textContent = `₩${state.amountKRW.toLocaleString()}`;
    elements.totalAmountUSD.textContent = `$${state.amountUSD.toFixed(2)}`;
  }

  // ==========================================
  // 6. UI Event Listeners
  // ==========================================
  elements.presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cups = btn.dataset.cups;
      if (cups === 'custom') {
        setCustomAmount();
      } else {
        setPreset(parseInt(cups, 10));
      }
    });
  });

  elements.customAmountInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1000) {
      setAmount(val);
    }
  });

  elements.messageInput.addEventListener('input', (e) => {
    const len = e.target.value.length;
    elements.charCount.textContent = `${len}/200`;
    state.message = e.target.value;
  });

  elements.nicknameInput.addEventListener('input', (e) => {
    state.nickname = e.target.value;
  });

  // Payment Tabs Switcher
  elements.tabPortone.addEventListener('click', () => {
    state.paymentMethod = 'portone';
    elements.tabPortone.classList.add('border-orange-500', 'text-orange-600', 'dark:text-orange-400', 'font-bold');
    elements.tabPortone.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    elements.tabPaypal.classList.remove('border-orange-500', 'text-orange-600', 'dark:text-orange-400', 'font-bold');
    elements.tabPaypal.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');

    elements.portoneContainer.classList.remove('hidden');
    elements.paypalContainer.classList.add('hidden');
  });

  elements.tabPaypal.addEventListener('click', () => {
    state.paymentMethod = 'paypal';
    elements.tabPaypal.classList.add('border-orange-500', 'text-orange-600', 'dark:text-orange-400', 'font-bold');
    elements.tabPaypal.classList.remove('border-transparent', 'text-gray-500', 'dark:text-gray-400');
    elements.tabPortone.classList.remove('border-orange-500', 'text-orange-600', 'dark:text-orange-400', 'font-bold');
    elements.tabPortone.classList.add('border-transparent', 'text-gray-500', 'dark:text-gray-400');

    elements.paypalContainer.classList.remove('hidden');
    elements.portoneContainer.classList.add('hidden');
    reRenderPayPal();
  });

  // ==========================================
  // 7. PortOne V2 Payment Integration
  // ==========================================
  elements.btnPortonePay.addEventListener('click', async () => {
    const termsCheck = document.getElementById('terms-agree-check');
    if (termsCheck && !termsCheck.checked) {
      alert('이용약관, 개인정보처리방침 및 환불정책에 동의해 주세요.');
      termsCheck.focus();
      return;
    }

    const supporterName = state.nickname.trim() || '익명의 후원자';
    const message = state.message.trim() || '따뜻한 커피 한 잔 보내드립니다!';
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (window.PortOne) {
      try {
        elements.btnPortonePay.disabled = true;
        elements.btnPortonePay.innerHTML = `<iconify-icon icon="solar:spinner-linear" class="animate-spin text-xl"></iconify-icon> 결제창 호출 중...`;

        const response = await PortOne.requestPayment({
          storeId: "store-4ff4afb2-3213-40f9-a2a4-b032483d735d",
          channelKey: "channel-key-0f69cf81-d006-4351-be62-7d31dda92e5a",
          paymentId: paymentId,
          orderName: `☕ ${state.target} 님을 위한 커피 후원 (${state.cups}잔)`,
          totalAmount: state.amountKRW,
          currency: "CURRENCY_KRW",
          payMethod: "EASY_PAY",
          easyPay: {
            easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY"
          },
          customer: {
            fullName: supporterName,
          },
          customData: {
            target: state.target,
            targetId: state.targetId,
            cups: state.cups,
            message: message,
          },
          redirectUrl: `${window.location.origin}${window.location.pathname}?paymentId=${paymentId}&target=${encodeURIComponent(state.target)}`
        });

        if (response.code != null) {
          alert(`결제가 취소되었거나 실패했습니다: ${response.message || '사용자 취소'}`);
        } else {
          // Success Callback & Save to DB
          await saveSupporterToDB({
            name: supporterName,
            cups: state.cups,
            amount: `₩${state.amountKRW.toLocaleString()}`,
            amount_krw: state.amountKRW,
            message: message,
            payment_id: paymentId,
            target: state.target
          });
          showSuccessModal(supporterName, `₩${state.amountKRW.toLocaleString()}`, message);
        }
      } catch (err) {
        console.error("PortOne 결제 처리 오류:", err);
        alert(`결제 처리 중 오류가 발생했습니다: ${err.message || '잠시 후 다시 시도해 주세요.'}`);
      } finally {
        elements.btnPortonePay.disabled = false;
        elements.btnPortonePay.innerHTML = `<span>국내 결제하기 (카드 / 카카오 / 토스)</span><iconify-icon icon="solar:arrow-right-bold" class="text-xl"></iconify-icon>`;
      }
    } else {
      await saveSupporterToDB({
        name: supporterName,
        cups: state.cups,
        amount: `₩${state.amountKRW.toLocaleString()}`,
        amount_krw: state.amountKRW,
        message: message,
        payment_id: paymentId,
        target: state.target
      });
      showSuccessModal(supporterName, `₩${state.amountKRW.toLocaleString()}`, message);
    }
  });

  // ==========================================
  // 8. PayPal Donate SDK Integration (https://developer.paypal.com/sdk/donate/)
  // ==========================================
  function reRenderPayPal() {
    const paypalWrapper = document.getElementById('paypal-button-wrapper');
    if (!paypalWrapper) return;
    paypalWrapper.innerHTML = '';

    const supporterName = state.nickname.trim() || 'Anonymous';
    const message = state.message.trim() || 'Enjoy your coffee!';

    // 1. PayPal Official Donate SDK (PayPal.Donation.Button)
    if (window.PayPal && window.PayPal.Donation && window.PayPal.Donation.Button) {
      try {
        window.PayPal.Donation.Button({
          env: 'production', // 'sandbox' | 'production'
          business: 'ihnseob.kim@gmail.com', // PayPal Business Receiver
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
            title: 'PayPal - The safer, easier way to pay online!',
            alt: 'Donate with PayPal button'
          },
          item_name: `☕ ${state.target} 님을 위한 커피 후원 (${state.cups}잔)`,
          amount: state.amountUSD.toFixed(2),
          currency_code: 'USD',
          onComplete: async function (params) {
            console.log('PayPal Donation Completed:', params);
            await saveSupporterToDB({
              name: supporterName,
              cups: state.cups,
              amount: `$${state.amountUSD.toFixed(2)}`,
              amount_usd: state.amountUSD,
              message: message,
              payment_id: params.tx || `pp_donate_${Date.now()}`,
              target: state.target
            });
            showSuccessModal(supporterName, `$${state.amountUSD.toFixed(2)}`, message);
          }
        }).render('#paypal-button-wrapper');
        return;
      } catch (e) {
        console.warn('PayPal Donate SDK Button 렌더링 실패, Smart Buttons로 전환:', e);
      }
    }

    // 2. PayPal Smart Buttons SDK (Fallback)
    if (window.paypal && window.paypal.Buttons) {
      try {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'donate'
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: `Coffee donation for ${state.target} (${state.cups} cups)`,
                amount: {
                  currency_code: 'USD',
                  value: state.amountUSD.toFixed(2)
                },
                custom_id: JSON.stringify({
                  target: state.target,
                  nickname: supporterName,
                  message: message
                })
              }]
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            const payerName = details.payer.name.given_name || supporterName;
            await saveSupporterToDB({
              name: payerName,
              cups: state.cups,
              amount: `$${state.amountUSD.toFixed(2)}`,
              amount_usd: state.amountUSD,
              message: message,
              payment_id: details.id || `pp_${Date.now()}`,
              target: state.target
            });
            showSuccessModal(payerName, `$${state.amountUSD.toFixed(2)}`, message);
          },
          onError: (err) => {
            console.error('PayPal Error:', err);
            alert('PayPal 결제 중 오류가 발생했습니다.');
          }
        }).render('#paypal-button-wrapper');
      } catch (e) {
        console.warn('PayPal Buttons render failed:', e);
      }
    } else {
      paypalWrapper.innerHTML = `
        <div class="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 text-center text-sm text-gray-500">
          <p class="mb-2 font-medium">PayPal Donate SDK 로드 중</p>
          <button id="demo-paypal-btn" class="w-full py-3 bg-[#FFC439] hover:bg-[#F2BA36] text-black font-bold rounded-full shadow transition flex items-center justify-center gap-2">
            <iconify-icon icon="logos:paypal" class="text-xl"></iconify-icon> PayPal 모의 결제 완료
          </button>
        </div>
      `;
      const demoBtn = document.getElementById('demo-paypal-btn');
      if (demoBtn) {
        demoBtn.addEventListener('click', async () => {
          await saveSupporterToDB({
            name: supporterName,
            cups: state.cups,
            amount: `$${state.amountUSD.toFixed(2)}`,
            amount_usd: state.amountUSD,
            message: message,
            payment_id: `demo_${Date.now()}`,
            target: state.target
          });
          showSuccessModal(supporterName, `$${state.amountUSD.toFixed(2)}`, message);
        });
      }
    }
  }

  // ==========================================
  // 9. Cloud DB & Local Storage Handler
  // ==========================================
  async function loadSupportersFromDB() {
    let loaded = [];

    // 1) Supabase Cloud DB에서 조회 시도
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from(SUPABASE_CONFIG.tableName)
          .select('*')
          .eq('target', state.target)
          .order('created_at', { ascending: false })
          .limit(20);

        if (!error && data && data.length > 0) {
          loaded = data.map(item => ({
            id: item.id || item.payment_id,
            name: item.nickname || item.name,
            cups: item.cups || 1,
            amount: item.amount || `₩${(item.amount_krw || item.cups * 3000).toLocaleString()}`,
            message: item.message,
            time: formatTimeAgo(new Date(item.created_at))
          }));
        }
      } catch (err) {
        console.warn('Supabase 데이터 조회 실패, LocalStorage로 전환:', err);
      }
    }

    // 2) Supabase에 데이터가 없거나 미설정 시 LocalStorage에서 조회
    if (loaded.length === 0) {
      try {
        const localData = localStorage.getItem(`waffle_donations_${state.targetId}`);
        if (localData) {
          loaded = JSON.parse(localData);
        }
      } catch (e) {
        console.warn('LocalStorage 파싱 오류:', e);
      }
    }

    // 3) 둘 다 없으면 기본 샘플 후원자 표시
    state.supporters = (loaded.length > 0) ? loaded : defaultSupporters;
    renderSupporters();

    // 4) Supabase Realtime 구독 활성화
    if (supabaseClient) {
      supabaseClient
        .channel('realtime_donations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: SUPABASE_CONFIG.tableName }, payload => {
          const newDoc = payload.new;
          if (newDoc && newDoc.target === state.target) {
            state.supporters.unshift({
              id: newDoc.id || newDoc.payment_id,
              name: newDoc.nickname || newDoc.name,
              cups: newDoc.cups || 1,
              amount: newDoc.amount || `₩${(newDoc.amount_krw || newDoc.cups * 3000).toLocaleString()}`,
              message: newDoc.message,
              time: '방금 전'
            });
            renderSupporters();
          }
        })
        .subscribe();
    }
  }

  async function saveSupporterToDB(donationData) {
    const newEntry = {
      id: donationData.payment_id || `don_${Date.now()}`,
      name: donationData.name,
      nickname: donationData.name,
      cups: donationData.cups,
      amount: donationData.amount,
      amount_krw: donationData.amount_krw || null,
      amount_usd: donationData.amount_usd || null,
      message: donationData.message,
      payment_id: donationData.payment_id,
      target: donationData.target,
      time: '방금 전',
      created_at: new Date().toISOString()
    };

    // 1. Supabase Cloud DB에 저장
    if (supabaseClient) {
      try {
        await supabaseClient.from(SUPABASE_CONFIG.tableName).insert([{
          nickname: newEntry.name,
          cups: newEntry.cups,
          amount: newEntry.amount,
          amount_krw: newEntry.amount_krw,
          amount_usd: newEntry.amount_usd,
          message: newEntry.message,
          payment_id: newEntry.payment_id,
          target: newEntry.target
        }]);
      } catch (err) {
        console.warn('Supabase INSERT 실패:', err);
      }
    }

    // 2. LocalStorage에 영구 저장 (오프라인/클라이언트 영구 캐시)
    try {
      const storageKey = `waffle_donations_${state.targetId}`;
      let localList = [];
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        localList = JSON.parse(saved);
      }
      localList.unshift(newEntry);
      // 최대 30개 보관
      if (localList.length > 30) localList = localList.slice(0, 30);
      localStorage.setItem(storageKey, JSON.stringify(localList));
    } catch (e) {
      console.warn('LocalStorage 저장 오류:', e);
    }

    // 3. UI State에 추가
    state.supporters.unshift(newEntry);
    renderSupporters();
  }

  // ==========================================
  // 10. Supporters List & Success Modal
  // ==========================================
  function renderSupporters() {
    elements.supportersList.innerHTML = '';
    state.supporters.forEach(supporter => {
      const item = document.createElement('div');
      item.className = 'p-4 rounded-2xl theme-card border shadow-sm card-hover-effect flex items-start gap-3';
      item.innerHTML = `
        <div class="w-10 h-10 rounded-full theme-accent-sub-bg theme-accent-text flex items-center justify-center font-bold text-base shrink-0">
          ☕
        </div>
        <div class="flex-grow min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-bold text-sm text-gray-900 dark:text-white truncate">${escapeHtml(supporter.name)}</span>
            <span class="text-xs text-gray-400 shrink-0">${supporter.time}</span>
          </div>
          <p class="text-xs font-semibold theme-accent-text mb-1.5">커피 ${supporter.cups}잔 (${supporter.amount}) 후원</p>
          <p class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed break-words">${escapeHtml(supporter.message)}</p>
        </div>
      `;
      elements.supportersList.appendChild(item);
    });
  }

  function showSuccessModal(name, amount, message) {
    elements.modalSupporterName.textContent = name;
    elements.modalAmount.textContent = amount;
    elements.modalMessage.textContent = message;
    elements.successModal.classList.remove('hidden');

    // Reset Form
    elements.nicknameInput.value = '';
    elements.messageInput.value = '';
    elements.charCount.textContent = '0/200';
    state.nickname = '';
    state.message = '';
  }

  elements.modalCloseBtn.addEventListener('click', () => {
    elements.successModal.classList.add('hidden');
  });

  function formatTimeAgo(date) {
    if (isNaN(date.getTime())) return '방금 전';
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return '방금 전';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // ==========================================
  // 12. Share & Toast Functionality
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message = '후원 링크가 클립보드에 복사되었습니다! ☕') {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 2400);
  }

  async function handleShare() {
    const shareData = {
      title: '와플커뮤니케이션 님에게 커피 후원하기 ☕',
      text: '개발자와 크리에이터의 창작 활동을 응원하는 가장 쉬운 방법. 커피 한 잔으로 힘을 보태주세요!',
      url: window.location.href
    };

    // 1. Web Share API (모바일 및 지원 브라우저)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        console.warn('Web Share 실패, 클립보드 복사로 대체합니다.', err);
      }
    }

    // 2. Fallback: 클립보드 복사
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      showToast('후원 링크가 클립보드에 복사되었습니다! ☕');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      showToast('링크 복사에 실패했습니다. 브라우저 주소를 직접 복사해 주세요.');
    }
  }

  function initShare() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', handleShare);
    }
  }

  // ==========================================
  // 13. Custom Floating Tooltip Handler
  // ==========================================
  function initCustomTooltips() {
    const tooltip = document.getElementById('custom-tooltip');
    if (!tooltip) return;

    // 브라우저 기본 title 속성 -> data-tooltip 이관 (기본 OS 툴팁 중복 방지)
    document.querySelectorAll('[title]').forEach(el => {
      if (!el.hasAttribute('data-tooltip')) {
        el.setAttribute('data-tooltip', el.getAttribute('title'));
      }
      el.removeAttribute('title');
    });

    let currentTarget = null;

    function positionTooltip(el) {
      const text = el.getAttribute('data-tooltip');
      if (!text) return hideTooltip();

      tooltip.textContent = text;
      tooltip.classList.add('show');

      const targetRect = el.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      let top = targetRect.top - tooltipRect.height - 8;

      // 상단 공간 부족 시 아래쪽으로 표시
      if (top < 8) {
        top = targetRect.bottom + 8;
      }

      // 좌우 화면 밖으로 벗어남 방지 (8px 여백)
      const padding = 8;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
    }

    function hideTooltip() {
      currentTarget = null;
      tooltip.classList.remove('show');
    }

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        currentTarget = target;
        positionTooltip(target);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target && target === currentTarget) {
        hideTooltip();
      }
    });

    document.addEventListener('focusin', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        currentTarget = target;
        positionTooltip(target);
      }
    });

    document.addEventListener('focusout', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target && target === currentTarget) {
        hideTooltip();
      }
    });

    window.addEventListener('scroll', hideTooltip, { passive: true });
    window.addEventListener('touchstart', hideTooltip, { passive: true });
  }

  // ==========================================
  // 11. Initialization
  // ==========================================
  initTheme();
  initShare();
  initCustomTooltips();
  parseUrlParameters();
  loadSupportersFromDB();
});
