import { DEFAULT_COURSES, INITIAL_USER_NOTES } from './data.js';

// 本地存儲鍵名
const K_COURSES = 'nthu_courses_v2';
const K_NOTES = 'nthu_notes_v2';
const K_STATE = 'nthu_reader_state_v2';

// 初始狀態
let courses = loadData(K_COURSES, DEFAULT_COURSES);
let userNotes = loadData(K_NOTES, INITIAL_USER_NOTES);
let readerState = loadData(K_STATE, {
  courseId: 'law-intro',
  chapterId: 'law-intro-1',
  mode: 'double',
  zoom: 100,
  navOpen: window.innerWidth >= 960,
  sideOpen: window.innerWidth >= 1200,
  theme: 'light'
});

let activeCourse = courses.find(c => c.id === readerState.courseId) || courses[0];
let activeChapter = activeCourse.chapters.find(ch => ch.id === readerState.chapterId) || activeCourse.chapters[0];
let isEditorMode = false;
let currentSelection = { text: '', sectionId: null };
let activeSideTab = 'chapter'; // chapter | all | new
let editingNoteId = null;

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveData(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('儲存失敗', e);
  }
}

function init() {
  document.documentElement.dataset.theme = readerState.theme;
  const app = document.getElementById('app');
  app.dataset.mode = readerState.mode;

  renderBar();
  renderNav();
  renderStage();
  renderSide();
  setupGlobalEvents();
}

// 渲染頂部工具列
function renderBar() {
  const bar = document.getElementById('rd-bar');
  if (!bar) return;

  bar.innerHTML = `
    <div class="rd-bar-left">
      <a class="rd-back" href="/sites" title="返回智庫專案列表">← 站點</a>
      <button class="rd-tool ${readerState.navOpen ? 'active' : ''}" id="btn-toggle-nav" type="button" title="切換章節目錄">
        <span>☰</span> 目錄
      </button>
      <div class="rd-title-box">
        <span class="rd-main-title">${activeCourse.title}</span>
        <span class="rd-sub-title">${activeChapter.title}</span>
      </div>
    </div>
    <div class="rd-bar-right">
      <div class="rd-seg" role="group" aria-label="排版模式">
        <button type="button" class="${readerState.mode === 'single' ? 'active' : ''}" data-mode="single">單頁</button>
        <button type="button" class="${readerState.mode === 'double' ? 'active' : ''}" data-mode="double">雙欄</button>
        <button type="button" class="${readerState.mode === 'scroll' ? 'active' : ''}" data-mode="scroll">捲動</button>
      </div>
      <div class="rd-zoom">
        <button class="rd-tool" id="btn-zoom-out" type="button">−</button>
        <span class="mono-val" id="zoom-val">${readerState.zoom}%</span>
        <button class="rd-tool" id="btn-zoom-in" type="button">+</button>
      </div>
      <button class="rd-tool ${isEditorMode ? 'active' : ''}" id="btn-toggle-editor" type="button" title="編輯當前共筆正文">
        <span>✎</span> ${isEditorMode ? '檢視閱讀' : '編輯共筆'}
      </button>
      <button class="rd-tool accent ${readerState.sideOpen ? 'active' : ''}" id="btn-toggle-side" type="button" title="筆記與註釋欄">
        <span>📌</span> 筆記 (<span id="note-count">${getChapterNotes().length}</span>)
      </button>
      <button class="rd-tool" id="btn-theme-toggle" type="button" title="切換護眼墨色">
        ${readerState.theme === 'dark' ? '☀️ 淺墨' : '🌙 深墨'}
      </button>
    </div>
  `;

  // 綁定頂部事件
  bar.querySelector('#btn-toggle-nav')?.addEventListener('click', toggleNav);
  bar.querySelector('#btn-toggle-side')?.addEventListener('click', toggleSide);
  bar.querySelector('#btn-toggle-editor')?.addEventListener('click', toggleEditor);
  bar.querySelector('#btn-theme-toggle')?.addEventListener('click', toggleTheme);

  bar.querySelectorAll('.rd-seg button').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      readerState.mode = mode;
      document.getElementById('app').dataset.mode = mode;
      saveData(K_STATE, readerState);
      renderBar();
    });
  });

  bar.querySelector('#btn-zoom-out')?.addEventListener('click', () => adjustZoom(-10));
  bar.querySelector('#btn-zoom-in')?.addEventListener('click', () => adjustZoom(10));
}

// 調整縮放
function adjustZoom(delta) {
  readerState.zoom = Math.max(70, Math.min(150, readerState.zoom + delta));
  saveData(K_STATE, readerState);
  document.getElementById('rd-book').style.fontSize = `${readerState.zoom}%`;
  document.getElementById('zoom-val').textContent = `${readerState.zoom}%`;
}

// 切換夜間模式
function toggleTheme() {
  readerState.theme = readerState.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = readerState.theme;
  saveData(K_STATE, readerState);
  renderBar();
}

// 切換導航欄
function toggleNav() {
  readerState.navOpen = !readerState.navOpen;
  document.getElementById('rd-nav').classList.toggle('collapsed', !readerState.navOpen);
  saveData(K_STATE, readerState);
  renderBar();
}

// 切換筆記欄
function toggleSide() {
  readerState.sideOpen = !readerState.sideOpen;
  document.getElementById('rd-side').classList.toggle('collapsed', !readerState.sideOpen);
  saveData(K_STATE, readerState);
  renderBar();
}

// 切換編輯模式
function toggleEditor() {
  isEditorMode = !isEditorMode;
  renderBar();
  renderStage();
}

// 渲染左側目錄
function renderNav() {
  const nav = document.getElementById('rd-nav');
  if (!nav) return;
  nav.classList.toggle('collapsed', !readerState.navOpen);

  nav.innerHTML = `
    <div class="rd-nav-head">
      <div class="rd-nav-title">
        <span>清大共筆 · 目錄</span>
        <span style="font-family: var(--mono); font-size: 0.7rem; color: var(--shu);">${courses.length} 門課程</span>
      </div>
      <select class="rd-course-selector" id="select-course">
        ${courses.map(c => `<option value="${c.id}" ${c.id === activeCourse.id ? 'selected' : ''}>${c.code} ${c.title}</option>`).join('')}
      </select>
      <input type="text" class="rd-search-input" id="input-nav-search" placeholder="搜尋章節關鍵字...">
    </div>
    <ul class="rd-nav-list" id="nav-chapter-list">
      ${renderChapterList(activeCourse.chapters)}
    </ul>
    <div class="rd-nav-foot">
      <button class="rd-tool" style="width: 100%; justify-content: center;" id="btn-add-chapter">
        ✚ 新增本課章節
      </button>
    </div>
  `;

  nav.querySelector('#select-course')?.addEventListener('change', (e) => {
    switchCourse(e.target.value);
  });

  nav.querySelector('#input-nav-search')?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = activeCourse.chapters.filter(ch => 
      ch.title.toLowerCase().includes(q) || 
      (ch.subtitle && ch.subtitle.toLowerCase().includes(q))
    );
    document.getElementById('nav-chapter-list').innerHTML = renderChapterList(filtered);
    bindNavChapterClicks();
  });

  nav.querySelector('#btn-add-chapter')?.addEventListener('click', handleAddNewChapter);

  bindNavChapterClicks();
}

function renderChapterList(chapters) {
  return chapters.map((ch, idx) => `
    <li class="rd-nav-item ${ch.id === activeChapter.id ? 'active' : ''}" data-chid="${ch.id}">
      <span class="ch-title">${ch.title}</span>
      ${ch.subtitle ? `<span class="ch-sub">${ch.subtitle}</span>` : ''}
    </li>
  `).join('');
}

function bindNavChapterClicks() {
  document.querySelectorAll('.rd-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const chid = item.dataset.chid;
      switchChapter(chid);
    });
  });
}

function switchCourse(courseId) {
  activeCourse = courses.find(c => c.id === courseId) || courses[0];
  activeChapter = activeCourse.chapters[0];
  readerState.courseId = activeCourse.id;
  readerState.chapterId = activeChapter.id;
  saveData(K_STATE, readerState);
  renderBar();
  renderNav();
  renderStage();
  renderSide();
}

function switchChapter(chapterId) {
  const found = activeCourse.chapters.find(ch => ch.id === chapterId);
  if (found) {
    activeChapter = found;
    readerState.chapterId = found.id;
    saveData(K_STATE, readerState);
    renderBar();
    renderNav();
    renderStage();
    renderSide();
  }
}

// 新增自訂章節
function handleAddNewChapter() {
  const title = prompt('請輸入新章節標題（例：第四章：憲法訴訟與合憲解釋）：');
  if (!title) return;
  const subtitle = prompt('請輸入章節副標題或重點提要（可留空）：') || '';
  const newChapter = {
    id: `custom-ch-${Date.now()}`,
    title: title.trim(),
    subtitle: subtitle.trim(),
    sections: [
      {
        id: `sec-${Date.now()}-1`,
        heading: '一、引言與問題意識',
        content: '在此填寫本節共筆論述重點。可點擊上方「編輯共筆」按鈕進入完整編輯器進行修改。'
      }
    ]
  };
  activeCourse.chapters.push(newChapter);
  saveData(K_COURSES, courses);
  switchChapter(newChapter.id);
}

// 渲染中央舞台 (閱讀視圖或編輯視圖)
function renderStage() {
  const stage = document.getElementById('rd-stage');
  if (!stage) return;

  if (isEditorMode) {
    // 編輯模式
    stage.innerHTML = `
      <div class="rd-editor-wrap active">
        <div class="rd-editor-bar">
          <div class="rd-editor-title">
            <span>✎ 編輯章節內容</span>
            <span style="font-size: 0.8rem; font-weight: normal; color: var(--ink-3);">（支援 Markdown 格式）</span>
          </div>
          <div class="rd-editor-tools">
            <button class="rd-md-btn" data-insert="## ">標題</button>
            <button class="rd-md-btn" data-insert="**粗體**">粗體</button>
            <button class="rd-md-btn" data-insert="> 引用：">引文</button>
            <button class="rd-md-btn" data-insert="*清單*">清單</button>
            <button class="rd-md-btn" data-insert="[文獻/判決連結](url)">連結</button>
          </div>
        </div>
        <div class="rd-editor-inputs">
          <input type="text" class="rd-input-field" id="edit-ch-title" value="${escapeHtml(activeChapter.title)}" placeholder="章節名稱">
          <input type="text" class="rd-input-field" id="edit-ch-subtitle" value="${escapeHtml(activeChapter.subtitle || '')}" placeholder="副標題 / 重點綱要">
          <textarea class="rd-textarea" id="edit-ch-content" placeholder="輸入 Markdown 或分段共筆內容...">${escapeHtml(serializeChapterContent(activeChapter))}</textarea>
        </div>
        <div class="rd-editor-footer">
          <button class="rd-tool" id="btn-editor-cancel">取消退出</button>
          <div style="display: flex; gap: 0.6rem;">
            <button class="rd-tool" id="btn-editor-reset" style="color: var(--shu);">還原預設本章</button>
            <button class="rd-note-save-btn" id="btn-editor-save">儲存章節更新</button>
          </div>
        </div>
      </div>
    `;

    // 編輯模式事件
    const textarea = stage.querySelector('#edit-ch-content');
    stage.querySelectorAll('.rd-md-btn').forEach(b => {
      b.addEventListener('click', () => {
        const ins = b.dataset.insert;
        textarea.setRangeText(ins, textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      });
    });

    stage.querySelector('#btn-editor-cancel').addEventListener('click', toggleEditor);
    stage.querySelector('#btn-editor-save').addEventListener('click', () => {
      const newTitle = stage.querySelector('#edit-ch-title').value.trim();
      const newSubtitle = stage.querySelector('#edit-ch-subtitle').value.trim();
      const text = textarea.value;

      activeChapter.title = newTitle || activeChapter.title;
      activeChapter.subtitle = newSubtitle;
      activeChapter.sections = parseChapterContent(text);
      saveData(K_COURSES, courses);

      isEditorMode = false;
      renderBar();
      renderNav();
      renderStage();
    });

    stage.querySelector('#btn-editor-reset').addEventListener('click', () => {
      if (confirm('確定要還原此章節至系統初始教材嗎？自訂的修改將被覆蓋。')) {
        const origCourse = DEFAULT_COURSES.find(c => c.id === activeCourse.id);
        const origChap = origCourse?.chapters.find(ch => ch.id === activeChapter.id);
        if (origChap) {
          activeChapter.title = origChap.title;
          activeChapter.subtitle = origChap.subtitle;
          activeChapter.sections = JSON.parse(JSON.stringify(origChap.sections));
          saveData(K_COURSES, courses);
          renderStage();
        }
      }
    });

    return;
  }

  // 正常書卷閱讀模式
  const chapterNotes = getChapterNotes();

  stage.innerHTML = `
    <div class="rd-book" id="rd-book" style="font-size: ${readerState.zoom}%;">
      <div class="rd-spine"></div>
      <header class="rd-chapter-header">
        <span class="rd-course-kicker">${activeCourse.code} · ${activeCourse.title}</span>
        <h1 class="rd-chapter-title">${activeChapter.title}</h1>
        ${activeChapter.subtitle ? `<p style="margin: 0 0 0.8rem; font-size: 1.05rem; color: var(--ink-2); font-style: italic;">${activeChapter.subtitle}</p>` : ''}
        <div class="rd-chapter-meta">
          <span>授課：${activeCourse.instructor}</span>
          <span>學期：${activeCourse.term}</span>
          <span>章節筆記：${chapterNotes.length} 則</span>
        </div>
      </header>
      <div class="rd-content">
        ${activeChapter.sections.map((sec, idx) => {
          const secNotes = chapterNotes.filter(n => n.sectionId === sec.id);
          return `
            <article class="rd-section" id="sec-${sec.id}" data-secid="${sec.id}">
              ${sec.heading ? `<h2 class="rd-section-heading">${sec.heading}</h2>` : ''}
              ${sec.content.split('\n\n').map((para, pIdx) => `
                <p class="rd-p" data-para-idx="${pIdx}">
                  <span class="rd-p-num">§ ${(idx + 1)}.${pIdx + 1}</span>
                  ${renderParagraphText(para, sec.id)}
                </p>
              `).join('')}
              ${secNotes.length > 0 ? `
                <div class="rd-note-pin" title="此段有 ${secNotes.length} 則共筆註記（點擊展開）" data-secid="${sec.id}">
                  ${secNotes.length}
                </div>
              ` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // 綁定印章點擊事件
  stage.querySelectorAll('.rd-note-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const secid = pin.dataset.secid;
      if (!readerState.sideOpen) toggleSide();
      activeSideTab = 'chapter';
      renderSide();
      highlightSectionNotes(secid);
    });
  });
}

function renderParagraphText(text, secId) {
  // 將換行替換為 <br>
  let escaped = escapeHtml(text).replace(/\n/g, '<br>');
  // 尋找此段是否有劃線或引用筆記
  const secNotes = userNotes.filter(n => n.sectionId === secId && n.quote);
  secNotes.forEach(note => {
    const q = escapeHtml(note.quote);
    if (escaped.includes(q)) {
      escaped = escaped.replaceAll(q, `<mark class="rd-highlight" style="background: rgba(237, 182, 78, 0.35); padding: 0 2px; border-bottom: 1.5px solid var(--shu);">${q}</mark>`);
    }
  });
  return escaped;
}

function serializeChapterContent(chap) {
  return chap.sections.map(s => {
    return (s.heading ? `## ${s.heading}\n\n` : '') + s.content;
  }).join('\n\n---\n\n');
}

function parseChapterContent(raw) {
  const blocks = raw.split(/\n\s*---\s*\n/);
  return blocks.map((block, idx) => {
    const lines = block.trim().split('\n');
    let heading = '';
    let contentLines = [];
    if (lines[0].startsWith('## ')) {
      heading = lines[0].replace(/^##\s*/, '').trim();
      contentLines = lines.slice(1);
    } else {
      contentLines = lines;
    }
    return {
      id: `sec-${idx + 1}`,
      heading,
      content: contentLines.join('\n').trim()
    };
  });
}

// 渲染右側筆記欄
function renderSide() {
  const side = document.getElementById('rd-side');
  if (!side) return;
  side.classList.toggle('collapsed', !readerState.sideOpen);

  const chapterNotes = getChapterNotes();
  const allNotes = userNotes;

  side.innerHTML = `
    <div class="rd-side-head">
      <div class="rd-side-title">
        <span>📖 共筆札記</span>
      </div>
      <div style="display: flex; gap: 0.4rem;">
        <button class="rd-tool" id="btn-export-notes" title="匯出筆記 Markdown">匯出</button>
        <button class="rd-tool" id="btn-close-side" title="關閉側欄">✕</button>
      </div>
    </div>
    <div class="rd-side-tabs">
      <button class="rd-side-tab ${activeSideTab === 'chapter' ? 'active' : ''}" data-tab="chapter">
        本章 (${chapterNotes.length})
      </button>
      <button class="rd-side-tab ${activeSideTab === 'all' ? 'active' : ''}" data-tab="all">
        全部 (${allNotes.length})
      </button>
      <button class="rd-side-tab ${activeSideTab === 'new' ? 'active' : ''}" data-tab="new">
        ✚ 新筆記
      </button>
    </div>
    <div class="rd-notes-list" id="notes-list-box">
      ${renderNotesList(activeSideTab === 'chapter' ? chapterNotes : allNotes)}
    </div>
    <div class="rd-new-note-box" id="new-note-box">
      <div class="rd-new-note-head">
        <span>${editingNoteId ? '編輯筆記' : '快速新增共筆札記'}</span>
        ${currentSelection.text ? '<span style="color: var(--shu); font-size: 0.72rem;">已錨定選取文字</span>' : ''}
      </div>
      ${currentSelection.text ? `
        <div class="rd-quote-preview">「${escapeHtml(currentSelection.text)}」</div>
      ` : ''}
      <textarea class="rd-note-textarea" id="input-note-body" placeholder="記錄你的理解、質疑、考試考點或延伸判決..."></textarea>
      <div style="display: flex; gap: 0.5rem; align-items: center; justify-content: space-between;">
        <select class="rd-tag-select" id="select-note-tag">
          <option value="核心概念">核心概念</option>
          <option value="考試重點">考試重點</option>
          <option value="思考疑問">思考疑問</option>
          <option value="法條參照">法條參照</option>
          <option value="延伸文獻">延伸文獻</option>
        </select>
        <div style="display: flex; gap: 0.4rem;">
          ${editingNoteId ? `<button class="rd-tool" id="btn-cancel-edit-note">取消</button>` : ''}
          <button class="rd-note-save-btn" id="btn-save-note">
            ${editingNoteId ? '更新筆記' : '儲存筆記'}
          </button>
        </div>
      </div>
    </div>
  `;

  // 綁定側欄事件
  side.querySelector('#btn-close-side')?.addEventListener('click', toggleSide);
  side.querySelector('#btn-export-notes')?.addEventListener('click', handleExportNotes);

  side.querySelectorAll('.rd-side-tab').forEach(t => {
    t.addEventListener('click', () => {
      activeSideTab = t.dataset.tab;
      renderSide();
    });
  });

  side.querySelector('#btn-save-note')?.addEventListener('click', handleSaveNote);
  side.querySelector('#btn-cancel-edit-note')?.addEventListener('click', () => {
    editingNoteId = null;
    currentSelection = { text: '', sectionId: null };
    renderSide();
  });

  bindNoteCardActions();
}

function renderNotesList(list) {
  if (!list.length) {
    return `<div class="rd-empty-notes">尚無筆記。在正文中選取文字或於下方新增你的第一則共筆筆記。</div>`;
  }

  return list.map(n => `
    <div class="rd-note-card" id="note-card-${n.id}" data-nid="${n.id}" data-secid="${n.sectionId}">
      <div class="rd-note-meta">
        <span class="rd-note-tag">${n.tag || '筆記'}</span>
        <span>${n.updatedAt || '剛才'}</span>
      </div>
      ${n.quote ? `<div class="rd-note-quote">「${escapeHtml(n.quote)}」</div>` : ''}
      <div class="rd-note-body">${escapeHtml(n.content)}</div>
      <div class="rd-note-actions">
        <button class="rd-note-btn btn-note-jump">跳至段落</button>
        <button class="rd-note-btn btn-note-edit">編輯</button>
        <button class="rd-note-btn btn-note-del" style="color: var(--shu);">刪除</button>
      </div>
    </div>
  `).join('');
}

function bindNoteCardActions() {
  document.querySelectorAll('.rd-note-card').forEach(card => {
    const nid = card.dataset.nid;
    const secid = card.dataset.secid;
    const note = userNotes.find(n => n.id === nid);

    card.querySelector('.btn-note-jump')?.addEventListener('click', () => {
      const el = document.getElementById(`sec-${secid}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.backgroundColor = 'rgba(237, 182, 78, 0.2)';
        setTimeout(() => el.style.backgroundColor = '', 1600);
      }
    });

    card.querySelector('.btn-note-edit')?.addEventListener('click', () => {
      editingNoteId = nid;
      currentSelection = { text: note.quote || '', sectionId: note.sectionId };
      activeSideTab = 'new';
      renderSide();
      const ta = document.getElementById('input-note-body');
      if (ta) {
        ta.value = note.content;
        ta.focus();
      }
      const tagSel = document.getElementById('select-note-tag');
      if (tagSel) tagSel.value = note.tag || '核心概念';
    });

    card.querySelector('.btn-note-del')?.addEventListener('click', () => {
      if (confirm('確定要刪除這則筆記嗎？')) {
        userNotes = userNotes.filter(n => n.id !== nid);
        saveData(K_NOTES, userNotes);
        renderBar();
        renderStage();
        renderSide();
      }
    });
  });
}

function handleSaveNote() {
  const bodyInput = document.getElementById('input-note-body');
  const tagInput = document.getElementById('select-note-tag');
  const content = bodyInput?.value.trim();
  if (!content) {
    alert('請輸入筆記內容！');
    return;
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  if (editingNoteId) {
    const existing = userNotes.find(n => n.id === editingNoteId);
    if (existing) {
      existing.content = content;
      existing.tag = tagInput?.value || existing.tag;
      existing.updatedAt = dateStr;
      if (currentSelection.text) existing.quote = currentSelection.text;
    }
    editingNoteId = null;
  } else {
    const newNote = {
      id: `note-${Date.now()}`,
      courseId: activeCourse.id,
      chapterId: activeChapter.id,
      sectionId: currentSelection.sectionId || activeChapter.sections[0]?.id || 'p1',
      quote: currentSelection.text || '',
      tag: tagInput?.value || '核心概念',
      content,
      updatedAt: dateStr
    };
    userNotes.unshift(newNote);
  }

  saveData(K_NOTES, userNotes);
  currentSelection = { text: '', sectionId: null };

  renderBar();
  renderStage();
  activeSideTab = 'chapter';
  renderSide();
}

function getChapterNotes() {
  return userNotes.filter(n => n.courseId === activeCourse.id && n.chapterId === activeChapter.id);
}

function highlightSectionNotes(secid) {
  document.querySelectorAll('.rd-note-card').forEach(c => {
    if (c.dataset.secid === secid) {
      c.classList.add('highlight');
      c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      c.classList.remove('highlight');
    }
  });
}

// 匯出筆記
function handleExportNotes() {
  const notes = getChapterNotes();
  if (!notes.length) {
    alert('當前章節尚無筆記可匯出！');
    return;
  }
  let md = `# 《${activeCourse.title}》共筆札記\n## 章節：${activeChapter.title}\n匯出日期：${new Date().toLocaleDateString()}\n\n---\n\n`;
  notes.forEach((n, idx) => {
    md += `### 筆記 [${n.tag || '摘要'}] § ${idx + 1}\n`;
    if (n.quote) md += `> 引文：${n.quote}\n\n`;
    md += `${n.content}\n\n*記錄時間：${n.updatedAt}*\n\n---\n\n`;
  });

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${activeCourse.code}_${activeChapter.title}_筆記.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// 全域選取與划線事件
function setupGlobalEvents() {
  const popover = document.getElementById('rd-popover');

  document.addEventListener('mouseup', (e) => {
    if (isEditorMode) return;
    const sel = window.getSelection();
    const selected = sel?.toString().trim();

    if (selected && selected.length > 2) {
      // 檢查是否選在 stage 內
      const stage = document.getElementById('rd-stage');
      if (stage && stage.contains(sel.anchorNode)) {
        // 獲取所屬 section
        let secNode = sel.anchorNode;
        while (secNode && !secNode.dataset?.secid && secNode !== stage) {
          secNode = secNode.parentElement;
        }
        const secId = secNode?.dataset?.secid || 'p1';

        currentSelection = { text: selected, sectionId: secId };

        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (popover) {
          popover.style.display = 'flex';
          popover.style.top = `${window.scrollY + rect.bottom + 8}px`;
          popover.style.left = `${window.scrollX + rect.left}px`;
        }
        return;
      }
    }

    if (popover && !popover.contains(e.target)) {
      popover.style.display = 'none';
    }
  });

  popover?.querySelector('#btn-pop-note')?.addEventListener('click', () => {
    popover.style.display = 'none';
    if (!readerState.sideOpen) toggleSide();
    activeSideTab = 'new';
    renderSide();
    const ta = document.getElementById('input-note-body');
    if (ta) ta.focus();
  });

  popover?.querySelector('#btn-pop-copy')?.addEventListener('click', () => {
    popover.style.display = 'none';
    if (currentSelection.text) {
      navigator.clipboard.writeText(currentSelection.text);
    }
  });

  // 鍵盤快捷鍵：T 開關目錄，N 開關筆記，E 開關編輯
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    if (e.key === 't' || e.key === 'T') toggleNav();
    if (e.key === 'n' || e.key === 'N') toggleSide();
    if (e.key === 'e' || e.key === 'E') toggleEditor();
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.addEventListener('DOMContentLoaded', init);
