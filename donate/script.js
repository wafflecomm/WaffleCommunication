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
  // 3. Theme Handler (OS Sync + LocalStorage)
  // ==========================================
  function initTheme() {
    const savedTheme = localStorage.getItem('donation_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      updateThemeIcon(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeIcon(false);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('donation_theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          updateThemeIcon(true);
        } else {
          document.documentElement.classList.remove('dark');
          updateThemeIcon(false);
        }
      }
    });

    elements.themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('donation_theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (elements.themeIcon) {
      elements.themeIcon.setAttribute('icon', isDark ? 'solar:sun-2-bold-duotone' : 'solar:moon-bold-duotone');
    }
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
    const supporterName = state.nickname.trim() || '익명의 후원자';
    const message = state.message.trim() || '따뜻한 커피 한 잔 보내드립니다!';
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    if (window.PortOne) {
      try {
        elements.btnPortonePay.disabled = true;
        elements.btnPortonePay.innerHTML = `<iconify-icon icon="solar:spinner-linear" class="animate-spin text-xl"></iconify-icon> 결제창 호출 중...`;

        const response = await PortOne.requestPayment({
          storeId: "store-4ff4afb2-3213-40f9-a2a4-b032483d735d",
          channelKey: "channel-key-b8f498c8-1123-455b",
          paymentId: paymentId,
          orderName: `☕ ${state.target} 님을 위한 커피 후원 (${state.cups}잔)`,
          totalAmount: state.amountKRW,
          currency: "CURRENCY_KRW",
          payMethod: "CARD",
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
        console.warn("PortOne SDK 호출 시뮬레이션:", err);
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
  // 8. PayPal JS SDK Integration
  // ==========================================
  function reRenderPayPal() {
    const paypalWrapper = document.getElementById('paypal-button-wrapper');
    if (!paypalWrapper) return;
    paypalWrapper.innerHTML = '';

    if (window.paypal) {
      try {
        paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'pay'
          },
          createOrder: (data, actions) => {
            const supporterName = state.nickname.trim() || 'Anonymous';
            const message = state.message.trim() || 'Enjoy your coffee!';
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
            const supporterName = details.payer.name.given_name || state.nickname.trim() || 'Anonymous';
            const msg = state.message || 'Thank you for your creation!';
            await saveSupporterToDB({
              name: supporterName,
              cups: state.cups,
              amount: `$${state.amountUSD.toFixed(2)}`,
              amount_usd: state.amountUSD,
              message: msg,
              payment_id: details.id || `pp_${Date.now()}`,
              target: state.target
            });
            showSuccessModal(supporterName, `$${state.amountUSD.toFixed(2)}`, msg);
          },
          onError: (err) => {
            console.error('PayPal Error:', err);
            alert('PayPal 결제 중 오류가 발생했습니다.');
          }
        }).render('#paypal-button-wrapper');
      } catch (e) {
        console.warn('PayPal Button render failed:', e);
      }
    } else {
      paypalWrapper.innerHTML = `
        <div class="p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 text-center text-sm text-gray-500">
          <p class="mb-2 font-medium">PayPal SDK 로드 준비 중</p>
          <button id="demo-paypal-btn" class="w-full py-3 bg-[#FFC439] hover:bg-[#F2BA36] text-black font-bold rounded-full shadow transition flex items-center justify-center gap-2">
            <iconify-icon icon="logos:paypal" class="text-xl"></iconify-icon> PayPal 모의 결제 완료
          </button>
        </div>
      `;
      const demoBtn = document.getElementById('demo-paypal-btn');
      if (demoBtn) {
        demoBtn.addEventListener('click', async () => {
          const supporterName = state.nickname.trim() || '글로벌 후원자';
          const msg = state.message || 'Awesome creator! ☕';
          await saveSupporterToDB({
            name: supporterName,
            cups: state.cups,
            amount: `$${state.amountUSD.toFixed(2)}`,
            amount_usd: state.amountUSD,
            message: msg,
            payment_id: `demo_${Date.now()}`,
            target: state.target
          });
          showSuccessModal(supporterName, `$${state.amountUSD.toFixed(2)}`, msg);
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
      item.className = 'p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-700/60 shadow-sm card-hover-effect flex items-start gap-3';
      item.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-base shrink-0">
          ☕
        </div>
        <div class="flex-grow min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="font-bold text-sm text-gray-900 dark:text-white truncate">${escapeHtml(supporter.name)}</span>
            <span class="text-xs text-gray-400 shrink-0">${supporter.time}</span>
          </div>
          <p class="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1.5">커피 ${supporter.cups}잔 (${supporter.amount}) 후원</p>
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
  // 11. Initialization
  // ==========================================
  initTheme();
  parseUrlParameters();
  loadSupportersFromDB();
});
