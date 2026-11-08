import { POLICY_TOPICS } from './data.js';

const K_TOPIC = 'think_active_topic_id';
const K_TAB = 'think_active_tab';
const K_CUSTOM_ARGS = 'think_user_arguments';

let activeTopic = POLICY_TOPICS.find(t => t.id === localStorage.getItem(K_TOPIC)) || POLICY_TOPICS[0];
let activeTab = localStorage.getItem(K_TAB) || 'stakeholders'; // 'stakeholders' | 'debate' | 'impact'
let leverValues = {};
let stakeholderSliders = {};
let userArgs = JSON.parse(localStorage.getItem(K_CUSTOM_ARGS) || '[]');

function init() {
  initLeverValues();
  initStakeholdersState();
  renderHeader();
  renderTopicStrip();
  renderHero();
  renderNavTabs();
  renderActiveView();
}

function initLeverValues() {
  leverValues = {};
  activeTopic.levers.forEach(l => {
    leverValues[l.id] = l.default;
  });
}

function initStakeholdersState() {
  stakeholderSliders = {};
  activeTopic.stakeholders.forEach(s => {
    stakeholderSliders[s.id] = {
      influence: s.influence,
      satisfaction: s.satisfaction
    };
  });
}

function renderHeader() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  document.getElementById('btn-theme')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.getElementById('btn-theme').textContent = next === 'dark' ? '☀️ 淺紙' : '🌙 墨夜';
  });
}

function renderTopicStrip() {
  const container = document.getElementById('topic-strip');
  if (!container) return;

  container.innerHTML = POLICY_TOPICS.map(t => `
    <div class="tk-topic-card ${t.id === activeTopic.id ? 'active' : ''}" data-tid="${t.id}">
      <div>
        <span class="tk-topic-badge">${t.badge}</span>
        <h3 class="tk-topic-title">${t.title}</h3>
        <p class="tk-topic-desc">${t.summary}</p>
      </div>
      <div style="font-family: var(--mono); font-size: 0.7rem; color: var(--ink-3); margin-top: 0.8rem;">
        編號：${t.code}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.tk-topic-card').forEach(card => {
    card.addEventListener('click', () => {
      const tid = card.dataset.tid;
      activeTopic = POLICY_TOPICS.find(t => t.id === tid);
      localStorage.setItem(K_TOPIC, tid);
      initLeverValues();
      initStakeholdersState();
      renderTopicStrip();
      renderHero();
      renderActiveView();
    });
  });
}

function renderHero() {
  const hero = document.getElementById('topic-hero');
  if (!hero) return;

  hero.innerHTML = `
    <div class="tk-hero-kicker">
      <span>${activeTopic.badge}</span> · <span style="font-family: var(--mono);">${activeTopic.code}</span>
    </div>
    <h1 class="tk-hero-title">${activeTopic.title}</h1>
    <p class="tk-hero-sub">${activeTopic.subtitle}</p>
    <div class="tk-hero-summary">
      <b>爭點聚焦：</b>${activeTopic.summary}
    </div>
  `;
}

function renderNavTabs() {
  const tabs = document.querySelectorAll('.tk-tab-btn');
  tabs.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === activeTab);
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      localStorage.setItem(K_TAB, activeTab);
      tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
      renderActiveView();
    });
  });
}

function renderActiveView() {
  const stage = document.getElementById('sandbox-stage');
  if (!stage) return;

  if (activeTab === 'stakeholders') {
    renderStakeholdersView(stage);
  } else if (activeTab === 'debate') {
    renderDebateView(stage);
  } else if (activeTab === 'impact') {
    renderImpactView(stage);
  }
}

// 模組 A: 利害關係人沙盒
function renderStakeholdersView(stage) {
  const score = calculateFeasibility();

  stage.innerHTML = `
    <div class="tk-gauge-box">
      <div>
        <div style="font-size: 0.82rem; font-family: var(--mono); color: var(--ink-3); margin-bottom: 0.2rem;">
          POLITICAL FEASIBILITY INDEX
        </div>
        <div style="font-size: 1.15rem; font-weight: 800;">
          當前利害關係人平衡與政策可行性指數
        </div>
      </div>
      <div style="display: flex; align-items: baseline; gap: 0.4rem;">
        <span class="tk-gauge-num" id="gauge-score">${score.val}</span>
        <span style="font-family: var(--mono); font-size: 1.1rem; color: var(--ink-3);">/ 100</span>
      </div>
      <div style="font-size: 0.85rem; max-width: 320px; color: var(--ink-2); line-height: 1.5;">
        ${score.comment}
      </div>
    </div>

    <div class="tk-stk-grid">
      ${activeTopic.stakeholders.map(s => {
        const cur = stakeholderSliders[s.id] || { influence: s.influence, satisfaction: s.satisfaction };
        return `
          <div class="tk-stk-card" data-sid="${s.id}">
            <div class="tk-stk-head">
              <span class="tk-stk-role" style="border-left: 3px solid ${s.color}; padding-left: 0.5rem;">
                ${s.role}
              </span>
              <span style="font-family: var(--mono); font-size: 0.72rem; color: var(--ink-3);">
                權重影響力
              </span>
            </div>
            <p class="tk-stk-stance">${s.stance}</p>
            <div class="tk-stk-demands">
              <div style="font-size: 0.76rem; font-weight: bold; color: var(--ink-3); margin-bottom: 0.2rem;">核心訴求：</div>
              ${s.demands.map(d => `<li>${d}</li>`).join('')}
            </div>
            <div class="tk-stk-sliders">
              <div class="tk-slider-row">
                <span>政治影響力：</span>
                <input type="range" min="10" max="100" value="${cur.influence}" data-stk="${s.id}" data-metric="influence">
                <span class="val-text">${cur.influence}%</span>
              </div>
              <div class="tk-slider-row">
                <span>政策滿意度：</span>
                <input type="range" min="0" max="100" value="${cur.satisfaction}" data-stk="${s.id}" data-metric="satisfaction">
                <span class="val-text">${cur.satisfaction}%</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // 綁定滑桿事件
  stage.querySelectorAll('.tk-slider-row input[type="range"]').forEach(input => {
    input.addEventListener('input', (e) => {
      const sid = e.target.dataset.stk;
      const metric = e.target.dataset.metric;
      const val = parseInt(e.target.value, 10);
      stakeholderSliders[sid][metric] = val;
      e.target.nextElementSibling.textContent = `${val}%`;

      const nextScore = calculateFeasibility();
      const gaugeEl = stage.querySelector('#gauge-score');
      if (gaugeEl) gaugeEl.textContent = nextScore.val;
    });
  });
}

function calculateFeasibility() {
  let totalWeight = 0;
  let weightedSat = 0;

  activeTopic.stakeholders.forEach(s => {
    const cur = stakeholderSliders[s.id] || { influence: s.influence, satisfaction: s.satisfaction };
    totalWeight += cur.influence;
    weightedSat += (cur.influence * cur.satisfaction);
  });

  const val = Math.round(weightedSat / (totalWeight || 1));
  let comment = '';
  if (val >= 75) {
    comment = '各方協商高度共識，行政與國會阻力極低，具備順利立法並推行之成熟條件。';
  } else if (val >= 50) {
    comment = '中度爭議。主流團體尚可接受，但特定弱勢或前瞻社群仍有激烈保留，需透過協商配套調解。';
  } else {
    comment = '嚴重對立。核心利害關係人極度不滿，若強行闖關恐引發大規模司法訴訟或體制外抗爭。';
  }
  return { val, comment };
}

// 模組 B: 論點樹與辯論推演
function renderDebateView(stage) {
  const tree = activeTopic.argumentTree;

  stage.innerHTML = `
    <div class="tk-tree-box">
      <div style="text-align: center; font-family: var(--mono); font-size: 0.74rem; color: var(--shu); letter-spacing: 0.1em; margin-bottom: 0.5rem;">
        DEBATE CRUCIBLE & ARGUMENT MAPPING
      </div>
      <div class="tk-tree-claim">
        <b>爭端核心主張：</b>「${tree.claim}」
      </div>
      <div class="tk-tree-sides">
        <div class="tk-side-col tk-side-pro">
          <h3><span>⚖️ 正方主張（嚴格監管 / 實質救濟）</span></h3>
          ${tree.pros.map(p => `
            <div class="tk-arg-card">
              <div class="tk-arg-title">${p.title}</div>
              <div class="tk-arg-reason">${p.reason}</div>
              <div class="tk-arg-evidence"><b>實證資料：</b>${p.evidence}</div>
              <div class="tk-arg-rebuttal"><b>潛在抗辯：</b>${p.rebuttal}</div>
            </div>
          `).join('')}
        </div>
        <div class="tk-side-col tk-side-con">
          <h3><span>⚡ 反方抗辯（市場自由 / 彈性創新）</span></h3>
          ${tree.cons.map(c => `
            <div class="tk-arg-card">
              <div class="tk-arg-title">${c.title}</div>
              <div class="tk-arg-reason">${c.reason}</div>
              <div class="tk-arg-evidence"><b>實證資料：</b>${c.evidence}</div>
              <div class="tk-arg-rebuttal"><b>潛在抗辯：</b>${c.rebuttal}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 使用者思辨參與區 -->
    <div class="tk-user-arg-box">
      <h3 style="margin-top: 0; font-size: 1.05rem; font-weight: 700;">
        ✍️ 掛載你的思辨論點（參與論點樹共筆）
      </h3>
      <p style="font-size: 0.84rem; color: var(--ink-2); margin-bottom: 1rem;">
        身為公民研究員，你可以針對本議題提交論證理由。思辨沙盒將本地保存你的觀點，並納入論證網絡。
      </p>
      <div style="display: grid; grid-template-columns: 140px 1fr; gap: 0.8rem; margin-bottom: 0.8rem;">
        <select class="tk-user-input" id="new-arg-stance">
          <option value="pro">支持正方</option>
          <option value="con">支持反方</option>
        </select>
        <input type="text" class="tk-user-input" id="new-arg-title" placeholder="論點摘要（例：中小企業合規輔導配套之必要）">
      </div>
      <textarea class="tk-user-input" id="new-arg-reason" rows="3" placeholder="請闡明你的邏輯理由與法益衡量依據..."></textarea>
      <div style="display: flex; justify-content: flex-end;">
        <button class="tk-btn accent" id="btn-submit-arg">發布思辨論點</button>
      </div>

      <!-- 使用者歷史發表論點 -->
      <div id="user-args-list" style="margin-top: 1.5rem;">
        ${renderUserArgs()}
      </div>
    </div>
  `;

  stage.querySelector('#btn-submit-arg')?.addEventListener('click', () => {
    const stance = stage.querySelector('#new-arg-stance').value;
    const title = stage.querySelector('#new-arg-title').value.trim();
    const reason = stage.querySelector('#new-arg-reason').value.trim();

    if (!title || !reason) {
      alert('請填寫完整的論點標題與論證理由！');
      return;
    }

    const newArg = {
      id: `usr-arg-${Date.now()}`,
      topicId: activeTopic.id,
      stance,
      title,
      reason,
      createdAt: new Date().toLocaleDateString()
    };
    userArgs.unshift(newArg);
    localStorage.setItem(K_CUSTOM_ARGS, JSON.stringify(userArgs));

    stage.querySelector('#new-arg-title').value = '';
    stage.querySelector('#new-arg-reason').value = '';
    stage.querySelector('#user-args-list').innerHTML = renderUserArgs();
  });
}

function renderUserArgs() {
  const currentTopicArgs = userArgs.filter(a => a.topicId === activeTopic.id);
  if (!currentTopicArgs.length) return '';

  return `
    <div style="font-size: 0.84rem; font-weight: bold; margin-bottom: 0.6rem; color: var(--ink-2);">
      已發表之研究員論點 (${currentTopicArgs.length})：
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.6rem;">
      ${currentTopicArgs.map(a => `
        <div class="tk-arg-card" style="border-left: 3px solid ${a.stance === 'pro' ? '#3d5a80' : 'var(--shu)'};">
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-family: var(--mono); color: var(--ink-3);">
            <span>${a.stance === 'pro' ? '支持正方' : '支持反方'}</span>
            <span>${a.createdAt}</span>
          </div>
          <div style="font-weight: 700; margin: 0.2rem 0; font-size: 0.9rem;">${a.title}</div>
          <div style="font-size: 0.82rem; color: var(--ink-2);">${a.reason}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// 模組 C: 政策衝擊模擬與決策沙盒
function renderImpactView(stage) {
  const impact = calculateImpact();

  stage.innerHTML = `
    <div class="tk-sim-grid">
      <!-- 左側政策操縱桿 (Policy Levers) -->
      <div class="tk-levers-panel">
        <h3 style="margin-top: 0; font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
          <span>🎛️ 政策調控槓桿（Policy Levers）</span>
          <button class="tk-btn" id="btn-reset-levers" style="font-size: 0.7rem;">重設槓桿</button>
        </h3>
        <p style="font-size: 0.8rem; color: var(--ink-3); margin-bottom: 1.4rem;">
          滑動調節各項法定參數，即時推演對創新動能、人權公平與治理成本之結構性衝擊。
        </p>

        ${activeTopic.levers.map(l => `
          <div class="tk-lever-item">
            <div class="tk-lever-label">
              <span>${l.name}</span>
              <span class="tk-lever-val" id="val-${l.id}">
                ${leverValues[l.id]} ${l.unit}
              </span>
            </div>
            <input 
              type="range" 
              class="tk-lever-slider" 
              min="${l.min}" 
              max="${l.max}" 
              value="${leverValues[l.id]}"
              data-lid="${l.id}"
              data-unit="${l.unit}"
            >
          </div>
        `).join('')}
      </div>

      <!-- 右側預測衝擊面板 -->
      <div class="tk-impact-panel">
        <h3 style="margin-top: 0; font-size: 1.05rem; font-weight: 700;">
          📊 系統動態評估指標
        </h3>

        <div class="tk-metric-bar">
          <div class="tk-metric-head">
            <span>創新與產業競爭活力 (Innovation Velocity)</span>
            <span class="font-mono" id="metric-innov">${impact.innovation}%</span>
          </div>
          <div class="tk-progress-track">
            <div class="tk-progress-fill" id="fill-innov" style="width: ${impact.innovation}%; background: #3d5a80;"></div>
          </div>
        </div>

        <div class="tk-metric-bar">
          <div class="tk-metric-head">
            <span>社會實質公平與人權保障 (Equity & Rights)</span>
            <span class="font-mono" id="metric-equity">${impact.equity}%</span>
          </div>
          <div class="tk-progress-track">
            <div class="tk-progress-fill" id="fill-equity" style="width: ${impact.equity}%; background: var(--shu);"></div>
          </div>
        </div>

        <div class="tk-metric-bar">
          <div class="tk-metric-head">
            <span>行政監管合規執行成本 (Compliance Friction)</span>
            <span class="font-mono" id="metric-friction">${impact.friction}%</span>
          </div>
          <div class="tk-progress-track">
            <div class="tk-progress-fill" id="fill-friction" style="width: ${impact.friction}%; background: #588157;"></div>
          </div>
        </div>

        <div style="border-top: 1px solid var(--rule); padding-top: 1rem; margin-top: 0.5rem;">
          <div style="font-size: 0.78rem; font-weight: bold; color: var(--ink-2); margin-bottom: 0.3rem;">智庫綜合評判：</div>
          <p style="font-size: 0.84rem; color: var(--ink); line-height: 1.6; margin: 0;" id="impact-comment">
            ${impact.comment}
          </p>
        </div>

        <button class="tk-btn accent" id="btn-gen-brief" style="margin-top: auto; justify-content: center; padding: 0.6rem;">
          📜 生成政策研究簡報 (Policy Brief)
        </button>
      </div>
    </div>

    <!-- 政策評估報告書展示區 -->
    <div id="brief-container"></div>
  `;

  // 滑桿事件
  stage.querySelectorAll('.tk-lever-slider').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const lid = e.target.dataset.lid;
      const unit = e.target.dataset.unit;
      const val = parseInt(e.target.value, 10);
      leverValues[lid] = val;
      stage.querySelector(`#val-${lid}`).textContent = `${val} ${unit}`;

      const updated = calculateImpact();
      stage.querySelector('#metric-innov').textContent = `${updated.innovation}%`;
      stage.querySelector('#fill-innov').style.width = `${updated.innovation}%`;

      stage.querySelector('#metric-equity').textContent = `${updated.equity}%`;
      stage.querySelector('#fill-equity').style.width = `${updated.equity}%`;

      stage.querySelector('#metric-friction').textContent = `${updated.friction}%`;
      stage.querySelector('#fill-friction').style.width = `${updated.friction}%`;

      stage.querySelector('#impact-comment').textContent = updated.comment;
    });
  });

  stage.querySelector('#btn-reset-levers')?.addEventListener('click', () => {
    initLeverValues();
    renderImpactView(stage);
  });

  stage.querySelector('#btn-gen-brief')?.addEventListener('click', renderPolicyBrief);
}

function calculateImpact() {
  const vals = Object.values(leverValues);
  const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);

  // 簡化模擬演算法
  let innovation = Math.max(10, Math.min(95, Math.round(100 - avg * 0.75 + 15)));
  let equity = Math.max(10, Math.min(95, Math.round(avg * 0.9 + 5)));
  let friction = Math.max(15, Math.min(95, Math.round(avg * 0.8 + 10)));

  let comment = '';
  if (equity >= 70 && innovation >= 60) {
    comment = '✨ 理想黃金平衡點：在充分保障公民弱勢權益之同時，保留足夠的彈性激勵新興產業投資。';
  } else if (equity >= 75 && innovation < 50) {
    comment = '監管嚴謹但產業活力承壓：高度防弊可能減緩商業創新與資本意願，建議增加中小企業過渡寬限期。';
  } else if (innovation >= 75 && equity < 50) {
    comment = '極端市場導向：技術演進迅速，但弱勢權利可能遭實質外部化，恐累積強烈社會民怨與法治風險。';
  } else {
    comment = '中度常態運行區間，各項法益處於動態拉鋸中。';
  }

  return { innovation, equity, friction, comment };
}

function renderPolicyBrief() {
  const briefBox = document.getElementById('brief-container');
  if (!briefBox) return;

  const impact = calculateImpact();
  const feasibility = calculateFeasibility();
  const now = new Date().toLocaleDateString();

  briefBox.innerHTML = `
    <div class="tk-brief-card">
      <div class="tk-brief-header">
        <div>
          <div style="font-family: var(--mono); font-size: 0.75rem; color: var(--shu); letter-spacing: 0.1em;">
            POLICY RESEARCH BRIEF · 思辨智庫政策備忘錄
          </div>
          <h2 style="margin: 0.3rem 0 0; font-size: 1.4rem; font-weight: 800;">
            ${activeTopic.title} 之立法調控與衝擊評估報告
          </h2>
        </div>
        <div style="font-family: var(--mono); font-size: 0.78rem; color: var(--ink-3);">
          發布日期：${now}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; background: var(--paper-2); padding: 1rem; border-radius: var(--radius);">
        <div>
          <div style="font-size: 0.72rem; color: var(--ink-3); font-mono;">政治可行性</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: var(--shu);">${feasibility.val} / 100</div>
        </div>
        <div>
          <div style="font-size: 0.72rem; color: var(--ink-3); font-mono;">創新競爭力評級</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: #3d5a80;">${impact.innovation}%</div>
        </div>
        <div>
          <div style="font-size: 0.72rem; color: var(--ink-3); font-mono;">人權公平指數</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: var(--shu);">${impact.equity}%</div>
        </div>
      </div>

      <div style="font-size: 0.9rem; line-height: 1.8; color: var(--ink);">
        <p><b>一、核心立法爭議：</b>${activeTopic.summary}</p>
        <p><b>二、調控槓桿設定：</b>${activeTopic.levers.map(l => `${l.name}：${leverValues[l.id]} ${l.unit}`).join('；')}。</p>
        <p><b>三、政策建議總結：</b>${impact.comment} 綜觀當前利害關係人分佈，建議在立法時確立「過渡期日落條款」並設置獨立申訴仲裁委員會，以最大化全社會長遠法益福祉。</p>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 1.5rem; border-top: 1px solid var(--rule); padding-top: 1rem;">
        <button class="tk-btn" id="btn-copy-brief">📋 複製報告全文</button>
      </div>
    </div>
  `;

  briefBox.scrollIntoView({ behavior: 'smooth', block: 'start' });

  briefBox.querySelector('#btn-copy-brief')?.addEventListener('click', () => {
    const text = `【思辨智庫政策簡報】\n議題：${activeTopic.title}\n日期：${now}\n政治可行性：${feasibility.val}/100\n創新活力：${impact.innovation}%\n人權公平：${impact.equity}%\n結論：${impact.comment}`;
    navigator.clipboard.writeText(text);
    alert('政策簡報已複製至剪貼簿！');
  });
}

window.addEventListener('DOMContentLoaded', init);
