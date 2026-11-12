/**
 * ============================================================================
 * DesignNova AI - All-in-One AI Design Assistant Engine
 * Superpowers:
 * 1. AI Resume Builder (Multiple Templates + Real PDF Export)
 * 2. AI Portfolio Builder (Responsive Prototypes + Real ZIP/HTML Export)
 * 3. AI Logo Designer (Vector SVG + High-Res PNG Export)
 * 4. Poster, Banner & Invite Designer (Canvas Graphics + PNG/PDF Export)
 * 5. Website & UI/UX Designer (Interactive Sandboxes + Viewport Toggles)
 * 6. PPT & Document Creator (Interactive Slides + Native PPTX Export)
 * 7. Code Generator & Sandbox (Syntax Highlighting + Live Web Runner)
 * 8. General AI Design Chat (Color Harmony, Typography, UX Audits)
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Storage Keys & Initial Preset Data
  // --------------------------------------------------------------------------
  const STORAGE_KEYS = {
    CONVERSATIONS: 'designnova_allinone_conversations_v4',
    ACTIVE_ID: 'designnova_allinone_active_id_v4',
    THEME: 'designnova_theme_preference_v1',
    TTS: 'designnova_tts_preference_v1'
  };

  // Preloaded All-in-One Showcase Conversations
  const DEFAULT_CONVERSATIONS = [
    {
      id: 'session-resume',
      title: 'Full-Stack Developer Resume',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      messages: [
        {
          id: 'm1',
          role: 'user',
          text: 'Create a professional resume for a Senior Full-Stack Developer named Alex Rivera with skills in React, TypeScript, Node.js, and Cloud Architecture.',
          timestamp: '10:15 AM'
        },
        {
          id: 'm2',
          role: 'assistant',
          text: `### DesignNova AI Resume Engine\n\nI have structured and generated a tailored executive resume for **Alex Rivera**. You can switch templates, edit fields live, and download a print-ready PDF below:`,
          timestamp: '10:15 AM',
          designType: 'resume',
          designData: {
            name: 'Alex Rivera',
            title: 'Senior Full-Stack Developer & Cloud Architect',
            email: 'alex.rivera@example.com',
            phone: '+1 (555) 382-9104',
            location: 'San Francisco, CA • Remote',
            website: 'alexrivera.dev',
            summary: 'Impact-focused Full-Stack Engineer with 6+ years of experience engineering high-throughput web applications, microservices, and design systems. Proven record reducing latency by 42% and leading frontend architecture across distributed teams.',
            skills: ['React / Next.js', 'TypeScript', 'Node.js / Express', 'GraphQL', 'TailwindCSS & Vanilla CSS', 'PostgreSQL / Redis', 'Docker & AWS', 'UI/UX Prototyping'],
            experience: [
              {
                role: 'Lead Frontend Architect',
                company: 'Veloce Labs Inc.',
                period: '2022 - Present',
                bullets: [
                  'Architected real-time analytics dashboard serving 1.2M daily active users with sub-100ms response time.',
                  'Built enterprise design system adopted by 18 engineers, cutting UI delivery cycles by 35%.'
                ]
              },
              {
                role: 'Senior Software Engineer',
                company: 'Aura Fintech',
                period: '2019 - 2022',
                bullets: [
                  'Engineered PCI-compliant checkout workflow processing $45M+ in annual transaction volume.',
                  'Integrated automated CI/CD pipeline and end-to-end test suite achieving 94% code coverage.'
                ]
              }
            ],
            education: [
              {
                degree: 'B.S. in Computer Science',
                school: 'University of California, Berkeley',
                year: '2015 - 2019'
              }
            ],
            template: 'modern'
          }
        }
      ]
    },
    {
      id: 'session-logo',
      title: 'Artisanal Coffee Roastery Logo',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      messages: [
        {
          id: 'm3',
          role: 'user',
          text: 'Design a vector logo for an artisanal coffee roastery named BeanCraft in warm amber and espresso brown.',
          timestamp: 'Yesterday'
        },
        {
          id: 'm4',
          role: 'assistant',
          text: `### DesignNova AI Logo Designer\n\nHere is your custom vector logo for **BeanCraft**. It incorporates geometric roastery emblems, warm coffee amber gradients, and balanced typography. You can download vector SVG or high-resolution PNG:`,
          timestamp: 'Yesterday',
          designType: 'logo',
          designData: {
            brandName: 'BeanCraft',
            tagline: 'Artisanal Coffee Roastery',
            primaryColor: '#d97706',
            secondaryColor: '#451a03',
            symbol: 'coffee',
            style: 'geometric-badge'
          }
        }
      ]
    },
    {
      id: 'session-ppt',
      title: 'AI in Healthcare Presentation',
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      messages: [
        {
          id: 'm5',
          role: 'user',
          text: 'Create a 4-slide presentation on The Future of AI in Healthcare with market trends and clinical impact.',
          timestamp: '2 days ago'
        },
        {
          id: 'm6',
          role: 'assistant',
          text: `### DesignNova PPT & Presentation Creator\n\nI have generated a structured 4-slide deck for **The Future of AI in Healthcare**. Use the carousel to inspect slides and click **Download PPTX** for an editable Microsoft PowerPoint file:`,
          timestamp: '2 days ago',
          designType: 'presentation',
          designData: {
            title: 'The Future of AI in Healthcare',
            subtitle: 'Clinical Diagnosis, Drug Discovery & Operational Efficiency',
            slides: [
              {
                title: 'Executive Summary',
                tag: 'Overview & Vision',
                bullets: [
                  'Artificial Intelligence is transitioning from experimental diagnostics to clinical decision support.',
                  'Global healthcare AI market projected to grow from $15.4B to $187B by 2030 (37% CAGR).',
                  'Key value drivers: Early pathology detection, precision oncology, and administrative triage.'
                ]
              },
              {
                title: 'Primary Clinical Applications',
                tag: 'Clinical Impact',
                bullets: [
                  'Computer Vision in Radiology: Reducing mammography and CT false negatives by 26%.',
                  'Predictive Sepsis Alerting: Early vitals modeling enabling intervention 4 hours before septic shock.',
                  'AI-Assisted Robotic Surgery: Enhancing micro-incision precision and shortening patient recovery.'
                ]
              },
              {
                title: 'Accelerated Drug Discovery',
                tag: 'Bioinformatics',
                bullets: [
                  'Target Identification: Machine learning modeling protein fold structures (e.g. AlphaFold).',
                  'Clinical Trial Optimization: Synthetic patient cohorts accelerating Phase II enrollment by 40%.',
                  'Repurposing Existing Molecules: Identifying novel oncology compounds in months instead of years.'
                ]
              },
              {
                title: 'Strategic Implementation & Ethics',
                tag: 'Key Takeaways',
                bullets: [
                  'Data Privacy & HIPAA Compliance: Federated learning trains algorithms across hospitals without transferring patient records.',
                  'Explainable AI (XAI): Clinicians demand interpretable attribution maps before accepting diagnostic suggestions.',
                  'Action Item: Launch departmental pilot focused on clinical documentation automation.'
                ]
              }
            ]
          }
        }
      ]
    }
  ];

  // --------------------------------------------------------------------------
  // 2. Application Reactive State
  // --------------------------------------------------------------------------
  let state = {
    conversations: [],
    activeChatId: null,
    isResponding: false,
    ttsEnabled: false,
    searchQuery: '',
    attachedFile: null,
    recognitionInstance: null,
    isRecording: false,
    // Active Preview Modal Context
    activeModalDesign: null,
    activeViewportMode: 'desktop',
    // In-Memory registry of rendered interactive designs
    registry: {},
    // Backend AI Server Status
    serverOnline: false,
    serverProvider: null
  };

  // --------------------------------------------------------------------------
  // 3. DOM Cache Elements — populated inside initializeData() after DOM ready
  // --------------------------------------------------------------------------
  let elements = {};

  function cacheDomElements() {
    elements = {
      // Sidebar
      sidebar: document.getElementById('sidebar'),
      sidebarOverlay: document.getElementById('sidebarOverlay'),
      toggleSidebarBtn: document.getElementById('toggleSidebarBtn'),
      closeSidebarBtn: document.getElementById('closeSidebarBtn'),
      newChatBtn: document.getElementById('newChatBtn'),
      topbarNewChat: document.getElementById('topbarNewChat'),
      chatSearchInput: document.getElementById('chatSearchInput'),
      searchClearBtn: document.getElementById('searchClearBtn'),
      chatHistoryList: document.getElementById('chatHistoryList'),
      chatCountBadge: document.getElementById('chatCountBadge'),
      clearAllBtn: document.getElementById('clearAllBtn'),
      exportChatBtn: document.getElementById('exportChatBtn'),
      modeChips: document.querySelectorAll('.mode-chip'),

      // Theme Elements
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeIcon: document.getElementById('themeIcon'),
      themeText: document.getElementById('themeText'),
      themeBadge: document.getElementById('themeBadge'),

      // Topbar Controls
      speechToggleBtn: document.getElementById('speechToggleBtn'),
      speechIcon: document.getElementById('speechIcon'),
      infoBtn: document.getElementById('infoBtn'),

      // Viewport & Messages
      chatViewport: document.getElementById('chatViewport'),
      welcomeScreen: document.getElementById('welcomeScreen'),
      messagesContainer: document.getElementById('messagesContainer'),
      typingIndicator: document.getElementById('typingIndicator'),
      scrollAnchor: document.getElementById('scrollAnchor'),

      // Input Area (critical for Send button)
      messageInput: document.getElementById('messageInput'),
      sendBtn: document.getElementById('sendBtn'),
      attachBtn: document.getElementById('attachBtn'),
      fileInput: document.getElementById('fileInput'),
      attachedFilePreview: document.getElementById('attachedFilePreview'),
      attachedFileName: document.getElementById('attachedFileName'),
      attachedFileSize: document.getElementById('attachedFileSize'),
      removeFileBtn: document.getElementById('removeFileBtn'),
      micBtn: document.getElementById('micBtn'),
      quickChips: document.querySelectorAll('.quick-chip'),
      suggestionCards: document.querySelectorAll('.suggestion-card'),

      // Studio Preview Modal Elements
      studioPreviewModal: document.getElementById('studioPreviewModal'),
      studioModalTitle: document.getElementById('studioModalTitle'),
      studioModalSubtitle: document.getElementById('studioModalSubtitle'),
      studioModalIcon: document.getElementById('studioModalIcon'),
      deviceViewportToggles: document.getElementById('deviceViewportToggles'),
      deviceToggleBtns: document.querySelectorAll('.device-toggle-btn'),
      studioEditBtn: document.getElementById('studioEditBtn'),
      studioDownloadBtn: document.getElementById('studioDownloadBtn'),
      studioDownloadBtnText: document.getElementById('studioDownloadBtnText'),
      closeStudioModalBtn: document.getElementById('closeStudioModalBtn'),
      studioViewportArena: document.getElementById('studioViewportArena'),
      studioEditDrawer: document.getElementById('studioEditDrawer'),
      closeEditDrawerBtn: document.getElementById('closeEditDrawerBtn'),
      studioEditDrawerBody: document.getElementById('studioEditDrawerBody'),
      studioModalFooterActions: document.getElementById('studioModalFooterActions'),

      // Documentation Modal & Confirm Clear Modal
      infoModal: document.getElementById('infoModal'),
      closeInfoModalBtn: document.getElementById('closeInfoModalBtn'),
      confirmModalBtn: document.getElementById('confirmModalBtn'),
      modalTabs: document.querySelectorAll('.modal-tab'),
      tabPanes: document.querySelectorAll('.tab-pane'),
      confirmClearModal: document.getElementById('confirmClearModal'),
      cancelClearBtn: document.getElementById('cancelClearBtn'),
      proceedClearBtn: document.getElementById('proceedClearBtn'),
      toastContainer: document.getElementById('toastContainer')
    };

    // Verify critical input elements exist
    if (!elements.messageInput) console.error('[DesignNova] CRITICAL: #messageInput not found in DOM.');
    if (!elements.sendBtn) console.error('[DesignNova] CRITICAL: #sendBtn not found in DOM.');
  }

  // --------------------------------------------------------------------------
  // 4. Persistence & Initialization
  // --------------------------------------------------------------------------
  function initializeData() {
    // MUST be first: cache all DOM references before any other setup
    cacheDomElements();

    try {
      const storedChats = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (storedChats) {
        state.conversations = JSON.parse(storedChats);
      } else {
        state.conversations = JSON.parse(JSON.stringify(DEFAULT_CONVERSATIONS));
        saveConversations();
      }

      const storedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
      if (storedActiveId && state.conversations.some(c => c.id === storedActiveId)) {
        state.activeChatId = storedActiveId;
      } else if (state.conversations.length > 0) {
        state.activeChatId = state.conversations[0].id;
      } else {
        state.activeChatId = null;
      }

      state.ttsEnabled = localStorage.getItem(STORAGE_KEYS.TTS) === 'true';
    } catch (err) {
      console.warn('LocalStorage notice:', err);
      state.conversations = JSON.parse(JSON.stringify(DEFAULT_CONVERSATIONS));
      state.activeChatId = state.conversations[0]?.id || null;
    }

    initializeTheme();
    updateTtsButtonState();
    renderSidebarHistory();
    renderActiveChat();
    setupEventListeners();
    setupSpeechRecognition();
    // Ensure send button reflects initial state correctly
    updateInputState();
  }

  function saveConversations() {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(state.conversations));
      if (state.activeChatId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, state.activeChatId);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
      }
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  // --------------------------------------------------------------------------
  // 5. Theme & Voice Setup
  // --------------------------------------------------------------------------
  function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    applyTheme(savedTheme, false);
  }

  function applyTheme(theme, showNotice = true) {
    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (elements.themeIcon) elements.themeIcon.className = 'fa-solid fa-moon';
      if (elements.themeText) elements.themeText.textContent = 'Dark Studio';
      if (elements.themeBadge) elements.themeBadge.textContent = 'Light Active';
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (elements.themeIcon) elements.themeIcon.className = 'fa-solid fa-sun';
      if (elements.themeText) elements.themeText.textContent = 'Light Studio';
      if (elements.themeBadge) elements.themeBadge.textContent = 'Dark Active';
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (showNotice) {
      showToast(`Switched to ${theme === 'light' ? 'Light' : 'Dark'} Studio Theme`, 'fa-circle-half-stroke');
    }
  }

  function toggleTheme() {
    const isCurrentLight = document.body.classList.contains('light-theme');
    applyTheme(isCurrentLight ? 'dark' : 'light', true);
  }

  function toggleTtsVoice() {
    state.ttsEnabled = !state.ttsEnabled;
    localStorage.setItem(STORAGE_KEYS.TTS, state.ttsEnabled);
    updateTtsButtonState();

    if (state.ttsEnabled) {
      showToast('DesignNova Voice Feedback enabled', 'fa-volume-high');
      speakText('DesignNova voice assistant active.');
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      showToast('Voice Feedback muted', 'fa-volume-xmark');
    }
  }

  function updateTtsButtonState() {
    if (!elements.speechToggleBtn || !elements.speechIcon) return;
    if (state.ttsEnabled) {
      elements.speechToggleBtn.classList.add('speech-active');
      elements.speechIcon.className = 'fa-solid fa-volume-high';
      elements.speechToggleBtn.title = 'AI Voice Feedback: Active';
    } else {
      elements.speechToggleBtn.classList.remove('speech-active');
      elements.speechIcon.className = 'fa-solid fa-volume-xmark';
      elements.speechToggleBtn.title = 'AI Voice Feedback: Muted';
    }
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const cleanSpeech = text
      .replace(/```[\s\S]*?```/g, 'Code snippet omitted.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[#*`_>|]/g, '')
      .replace(/\[.*?\]/g, '')
      .trim();

    if (!cleanSpeech) return;

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (friendlyVoice) utterance.voice = friendlyVoice;

    window.speechSynthesis.speak(utterance);
  }

  // --------------------------------------------------------------------------
  // 6. Sidebar & Session Navigation
  // --------------------------------------------------------------------------
  function renderSidebarHistory() {
    if (!elements.chatHistoryList) return;

    elements.chatHistoryList.innerHTML = '';
    const q = state.searchQuery.toLowerCase().trim();

    const filtered = state.conversations.filter(chat => {
      if (!q) return true;
      const titleMatch = chat.title.toLowerCase().includes(q);
      const msgMatch = chat.messages.some(m => m.text.toLowerCase().includes(q));
      return titleMatch || msgMatch;
    });

    if (elements.chatCountBadge) {
      elements.chatCountBadge.textContent = state.conversations.length;
    }

    if (filtered.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'history-empty-message';
      if (q) {
        emptyLi.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><br>No sessions found for "${escapeHtml(q)}"`;
      } else {
        emptyLi.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i><br>No recent design sessions.<br>Click "+ New Creative Session" to start!`;
      }
      elements.chatHistoryList.appendChild(emptyLi);
      return;
    }

    filtered.forEach(chat => {
      const li = document.createElement('li');
      li.className = `history-item ${chat.id === state.activeChatId ? 'active' : ''}`;
      li.dataset.chatId = chat.id;

      li.innerHTML = `
        <i class="fa-solid fa-layer-group"></i>
        <span class="history-title" title="${escapeHtml(chat.title)}">${escapeHtml(chat.title)}</span>
        <div class="history-item-actions">
          <button class="history-action-btn edit-title-btn" title="Rename session" aria-label="Rename session">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="history-action-btn delete-btn" title="Delete session" aria-label="Delete session">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;

      li.addEventListener('click', (e) => {
        if (e.target.closest('.history-action-btn')) return;
        selectConversation(chat.id);
        closeMobileSidebar();
      });

      const editBtn = li.querySelector('.edit-title-btn');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renameConversation(chat.id);
      });

      const delBtn = li.querySelector('.delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteConversation(chat.id);
      });

      elements.chatHistoryList.appendChild(li);
    });
  }

  function selectConversation(id) {
    if (state.isResponding) {
      showToast('Please wait for current generation to complete.', 'fa-hourglass-half');
      return;
    }
    state.activeChatId = id;
    saveConversations();
    renderSidebarHistory();
    renderActiveChat();
  }

  function createNewChat() {
    if (state.isResponding) {
      showToast('Please wait for current generation to complete.', 'fa-hourglass-half');
      return;
    }

    state.activeChatId = null;
    clearAttachedFile();
    saveConversations();
    renderSidebarHistory();
    renderActiveChat();
    elements.messageInput.value = '';
    updateInputState();
    elements.messageInput.focus();
    closeMobileSidebar();
    showToast('New creative canvas initialized.', 'fa-wand-magic-sparkles');
  }

  function renameConversation(id) {
    const chat = state.conversations.find(c => c.id === id);
    if (!chat) return;

    const newTitle = prompt('Enter a new title for this session:', chat.title);
    if (newTitle && newTitle.trim()) {
      chat.title = newTitle.trim();
      saveConversations();
      renderSidebarHistory();
      showToast(`Renamed to "${chat.title}"`, 'fa-pen-to-square');
    }
  }

  function deleteConversation(id) {
    const chatToDelete = state.conversations.find(c => c.id === id);
    const title = chatToDelete ? chatToDelete.title : 'Session';

    state.conversations = state.conversations.filter(c => c.id !== id);

    if (state.activeChatId === id) {
      state.activeChatId = state.conversations.length > 0 ? state.conversations[0].id : null;
    }

    saveConversations();
    renderSidebarHistory();
    renderActiveChat();
    showToast(`Deleted "${title}"`, 'fa-trash-can');
  }

  function openClearAllModal() {
    if (state.conversations.length === 0) {
      showToast('No saved design sessions to clear.', 'fa-circle-info');
      return;
    }
    if (elements.confirmClearModal) elements.confirmClearModal.classList.add('open');
  }

  function closeClearAllModal() {
    if (elements.confirmClearModal) elements.confirmClearModal.classList.remove('open');
  }

  function executeClearAll() {
    state.conversations = [];
    state.activeChatId = null;
    saveConversations();
    renderSidebarHistory();
    renderActiveChat();
    closeClearAllModal();
    showToast('All design history cleared.', 'fa-trash-arrow-up');
  }

  function exportActiveChat() {
    const chat = state.conversations.find(c => c.id === state.activeChatId);
    if (!chat || chat.messages.length === 0) {
      showToast('No active design session to export.', 'fa-circle-info');
      return;
    }

    let markdown = `# DesignNova AI Creative Session: ${chat.title}\n`;
    markdown += `*Generated by DesignNova AI Studio on ${new Date().toLocaleString()}*\n\n---\n\n`;

    chat.messages.forEach(msg => {
      const sender = msg.role === 'user' ? '### 👤 User / Creator' : '### ✨ DesignNova AI Assistant';
      markdown += `${sender} (${msg.timestamp})\n\n${msg.text}\n\n`;
      if (msg.designType) {
        markdown += `> **Generated Asset Type:** ${msg.designType.toUpperCase()}\n\n`;
      }
      markdown += `---\n\n`;
    });

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    const sanitizedTitle = chat.title.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    downloadAnchor.download = `${sanitizedTitle || 'designnova_session'}.md`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    showToast('Session exported as Markdown file!', 'fa-file-arrow-down');
  }

  // --------------------------------------------------------------------------
  // 7. Message Rendering & Viewport Management
  // --------------------------------------------------------------------------
  function renderActiveChat() {
    if (!elements.messagesContainer) return;

    elements.messagesContainer.innerHTML = '';
    const currentChat = state.conversations.find(c => c.id === state.activeChatId);

    if (!currentChat || currentChat.messages.length === 0) {
      if (elements.welcomeScreen) elements.welcomeScreen.style.display = 'block';
      return;
    }

    if (elements.welcomeScreen) elements.welcomeScreen.style.display = 'none';

    currentChat.messages.forEach(msg => {
      appendMessageToDOM(msg, false);
    });

    scrollToBottom(false);
  }

  function appendMessageToDOM(msg, animate = true) {
    const isUser = msg.role === 'user';
    const row = document.createElement('div');
    row.className = `message-row ${isUser ? 'user-row' : 'ai-row'}`;
    row.dataset.msgId = msg.id;

    const avatarHtml = isUser
      ? `<div class="avatar user-avatar-bubble"><i class="fa-solid fa-user-astronaut"></i></div>`
      : `<div class="avatar ai-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>`;

    const formattedContent = formatMarkdown(msg.text);

    // If this message contains a structured design output (Resume, Portfolio, Logo, etc.)
    let outputCardHtml = '';
    if (msg.designType && msg.designData) {
      const designKey = `design_${msg.id}`;
      state.registry[designKey] = {
        type: msg.designType,
        data: msg.designData,
        msgId: msg.id
      };
      outputCardHtml = renderOutputCard(designKey, msg.designType, msg.designData);
    }

    const aiActionsHtml = !isUser
      ? `
        <div class="message-actions-toolbar">
          <button class="meta-action-btn speak-msg-btn" title="Read Aloud">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="meta-action-btn thumbs-up-btn" title="Great Output">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="meta-action-btn thumbs-down-btn" title="Needs Revision">
            <i class="fa-regular fa-thumbs-down"></i>
          </button>
          <button class="meta-action-btn regen-msg-btn" title="Regenerate Output">
            <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
      `
      : '';

    row.innerHTML = `
      ${avatarHtml}
      <div class="message-content-wrapper">
        <div class="message-bubble">
          ${formattedContent}
          ${outputCardHtml}
        </div>
        <div class="message-meta">
          <span>${msg.timestamp || getFormattedTime()}</span>
          <button class="meta-action-btn copy-msg-btn" title="Copy text">
            <i class="fa-regular fa-copy"></i>
            <span>Copy</span>
          </button>
          ${aiActionsHtml}
        </div>
      </div>
    `;

    // Attach output card event handlers if present
    if (msg.designType && msg.designData) {
      const designKey = `design_${msg.id}`;
      bindOutputCardEvents(row, designKey, msg.designType, msg.designData);
    }

    // Copy Handler
    const copyBtn = row.querySelector('.copy-msg-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => copyToClipboard(msg.text, copyBtn));
    }

    // Speak Handler
    const speakBtn = row.querySelector('.speak-msg-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => speakText(msg.text));
    }

    // Feedback Handlers
    const thumbsUp = row.querySelector('.thumbs-up-btn');
    const thumbsDown = row.querySelector('.thumbs-down-btn');
    if (thumbsUp && thumbsDown) {
      thumbsUp.addEventListener('click', () => {
        thumbsUp.classList.toggle('active');
        thumbsDown.classList.remove('active');
        if (thumbsUp.classList.contains('active')) showToast('Thanks for your feedback!', 'fa-thumbs-up');
      });
      thumbsDown.addEventListener('click', () => {
        thumbsDown.classList.toggle('active');
        thumbsUp.classList.remove('active');
        if (thumbsDown.classList.contains('active')) showToast('Feedback recorded. Refining output!', 'fa-thumbs-down');
      });
    }

    // Regenerate Handler
    const regenBtn = row.querySelector('.regen-msg-btn');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => {
        regenerateLastResponse();
      });
    }

    // Code Block Copy Buttons Handlers
    const codeCopyButtons = row.querySelectorAll('.code-copy-btn');
    codeCopyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeBlock = btn.closest('.code-block');
        const codeEl = codeBlock ? codeBlock.querySelector('pre code') : null;
        if (codeEl) copyToClipboard(codeEl.textContent, btn, true);
      });
    });

    elements.messagesContainer.appendChild(row);

    if (animate) {
      scrollToBottom(true);
    }
  }

  function scrollToBottom(smooth = true) {
    if (!elements.chatViewport) return;
    setTimeout(() => {
      elements.chatViewport.scrollTo({
        top: elements.chatViewport.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }, 50);
  }

  // --------------------------------------------------------------------------
  // 8. Markdown Parser & HTML Formatter
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMarkdown(content) {
    if (!content) return '';

    let text = content;

    // 1. Process fenced code blocks
    const codeBlockRegex = /```([a-zA-Z0-9_\-\+]*)\n([\s\S]*?)```/g;
    const codeBlocks = [];

    text = text.replace(codeBlockRegex, (match, lang, code) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      const language = (lang || 'code').trim();
      const escapedCode = escapeHtml(code.trim());

      const isWebCode = ['html', 'css', 'javascript', 'js'].includes(language.toLowerCase());
      const runBtnHtml = isWebCode
        ? `<button class="output-action-btn run-code-btn" data-code="${encodeURIComponent(code.trim())}" style="padding: 2px 8px; font-size: 0.7rem;"><i class="fa-solid fa-play"></i> Run Preview</button>`
        : '';

      const blockHtml = `
        <div class="code-block">
          <div class="code-header">
            <span class="code-lang"><i class="fa-solid fa-code"></i> ${language}</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${runBtnHtml}
              <button class="code-copy-btn" title="Copy code snippet">
                <i class="fa-regular fa-copy"></i>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <pre><code>${escapedCode}</code></pre>
        </div>
      `;
      codeBlocks.push(blockHtml);
      return placeholder;
    });

    // 2. Process Tables
    const tables = [];
    const tableRegex = /(\|[^\n]+\|\r?\n\|[\s:-|]+\|\r?\n(?:\|[^\n]+\|\r?\n?)+)/g;
    text = text.replace(tableRegex, (match) => {
      const placeholder = `__TABLE_BLOCK_${tables.length}__`;
      const rows = match.trim().split('\n').map(r => r.trim()).filter(Boolean);
      if (rows.length < 2) return match;

      const headerCols = rows[0].split('|').map(c => c.trim()).filter(Boolean);
      const dataRows = rows.slice(2);

      let tableHtml = '<div class="table-wrapper"><table class="styled-table"><thead><tr>';
      headerCols.forEach(col => {
        tableHtml += `<th>${col}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      dataRows.forEach(row => {
        const cols = row.split('|').map(c => c.trim()).filter(Boolean);
        tableHtml += '<tr>';
        cols.forEach(col => {
          tableHtml += `<td>${col}</td>`;
        });
        tableHtml += '</tr>';
      });

      tableHtml += '</tbody></table></div>';
      tables.push(tableHtml);
      return placeholder;
    });

    // 3. Headings
    text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h2>$1</h2>');

    // 4. Blockquotes
    text = text.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // 5. Inline code
    text = text.replace(/`([^`]+)`/g, (match, p1) => `<code>${escapeHtml(p1)}</code>`);

    // 6. Bold & Italic
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // 7. Lists
    const lines = text.split('\n');
    let inUl = false;
    let inOl = false;
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ulMatch = line.match(/^(\s*)[-*]\s+(.+)/);
      const olMatch = line.match(/^(\s*)\d+\.\s+(.+)/);

      if (ulMatch) {
        if (!inUl) {
          if (inOl) { processedLines.push('</ol>'); inOl = false; }
          processedLines.push('<ul>');
          inUl = true;
        }
        processedLines.push(`<li>${ulMatch[2]}</li>`);
      } else if (olMatch) {
        if (!inOl) {
          if (inUl) { processedLines.push('</ul>'); inUl = false; }
          processedLines.push('<ol>');
          inOl = true;
        }
        processedLines.push(`<li>${olMatch[2]}</li>`);
      } else {
        if (inUl) { processedLines.push('</ul>'); inUl = false; }
        if (inOl) { processedLines.push('</ol>'); inOl = false; }
        processedLines.push(line);
      }
    }
    if (inUl) processedLines.push('</ul>');
    if (inOl) processedLines.push('</ol>');

    text = processedLines.join('\n');

    // 8. Paragraphs
    text = text
      .split('\n\n')
      .map(para => {
        para = para.trim();
        if (!para) return '';
        if (
          para.startsWith('__CODE_BLOCK_') ||
          para.startsWith('__TABLE_BLOCK_') ||
          para.startsWith('<h3>') ||
          para.startsWith('<h2>') ||
          para.startsWith('<ul>') ||
          para.startsWith('<ol>') ||
          para.startsWith('<blockquote>')
        ) {
          return para;
        }
        return `<p>${para.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n');

    // 9. Re-inject code blocks and tables
    codeBlocks.forEach((block, index) => {
      text = text.replace(`__CODE_BLOCK_${index}__`, block);
    });

    tables.forEach((table, index) => {
      text = text.replace(`__TABLE_BLOCK_${index}__`, table);
    });

    return text;
  }

  // --------------------------------------------------------------------------
  // 9. Interactive Output Card Renderers (Embedded In Chat)
  // --------------------------------------------------------------------------
  function renderOutputCard(key, type, data) {
    let icon = 'fa-cube';
    let title = 'Generated Output';
    let badge = type.toUpperCase();
    let previewHtml = '';
    let actionsHtml = '';

    switch (type) {
      case 'resume':
        icon = 'fa-file-invoice';
        title = `${data.name || 'Professional'} Resume`;
        badge = 'RESUME (PDF READY)';
        previewHtml = `<div class="resume-mini-preview" style="transform: scale(0.65); transform-origin: top center; pointer-events: none; height: 320px; overflow: hidden;">${renderResumeHtml(data, data.template || 'modern')}</div>`;
        actionsHtml = `
          <button class="output-action-btn primary-action open-preview-btn" data-key="${key}"><i class="fa-solid fa-expand"></i> Preview & Edit</button>
          <button class="output-action-btn download-pdf-btn" data-key="${key}"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
          <button class="output-action-btn switch-template-btn" data-key="${key}"><i class="fa-solid fa-swatchbook"></i> Templates</button>
        `;
        break;

      case 'portfolio':
        icon = 'fa-globe';
        title = `${data.name || 'Personal'} Portfolio Website`;
        badge = 'WEB PORTFOLIO (RESPONSIVE)';
        previewHtml = `
          <div style="background: #0f172a; border-radius: 8px; padding: 18px; text-align: center; color: #fff;">
            <h4 style="margin-bottom: 4px; font-size: 1.1rem; color: #6366f1;">${escapeHtml(data.name || 'Developer')} • Portfolio</h4>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 12px;">${escapeHtml(data.intro || 'UI/UX & Frontend Architect')}</p>
            <div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">
              ${(data.skills || ['React', 'CSS3', 'UI/UX']).map(s => `<span class="feature-pill" style="font-size: 0.72rem;">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>
        `;
        actionsHtml = `
          <button class="output-action-btn primary-action open-preview-btn" data-key="${key}"><i class="fa-solid fa-play"></i> Live Sandbox</button>
          <button class="output-action-btn download-zip-btn" data-key="${key}"><i class="fa-solid fa-file-zipper"></i> Download ZIP</button>
          <button class="output-action-btn download-html-btn" data-key="${key}"><i class="fa-solid fa-file-code"></i> Download HTML</button>
        `;
        break;

      case 'logo':
        icon = 'fa-icons';
        title = `${data.brandName || 'Brand'} Vector Logo`;
        badge = 'VECTOR LOGO (SVG/PNG)';
        previewHtml = `<div class="logo-display-box">${renderLogoSvg(data)}</div>`;
        actionsHtml = `
          <button class="output-action-btn primary-action open-preview-btn" data-key="${key}"><i class="fa-solid fa-eye"></i> Fullscreen Preview</button>
          <button class="output-action-btn download-svg-btn" data-key="${key}"><i class="fa-solid fa-file-image"></i> Download SVG</button>
          <button class="output-action-btn download-png-btn" data-key="${key}"><i class="fa-solid fa-image"></i> High-Res PNG</button>
        `;
        break;

      case 'poster':
        icon = 'fa-image';
        title = `${data.title || 'Event'} Graphic Poster`;
        badge = 'POSTER & BANNER';
        previewHtml = `<div class="poster-display-box">${renderPosterSvg(data)}</div>`;
        actionsHtml = `
          <button class="output-action-btn primary-action open-preview-btn" data-key="${key}"><i class="fa-solid fa-expand"></i> Inspect Artwork</button>
          <button class="output-action-btn download-png-btn" data-key="${key}"><i class="fa-solid fa-image"></i> Download PNG</button>
          <button class="output-action-btn download-pdf-btn" data-key="${key}"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
        `;
        break;

      case 'website':
        icon = 'fa-laptop-code';
        title = `${data.title || 'Modern'} Web Prototype`;
        badge = 'LIVE PROTOTYPE';
        previewHtml = `
          <div style="background: #111827; border-radius: 8px; padding: 20px; text-align: center; color: #fff;">
            <div style="font-size: 0.72rem; color: #a855f7; font-weight: 700; text-transform: uppercase;">✨ Functional Prototype</div>
            <h4 style="font-size: 1.15rem; margin: 6px 0;">${escapeHtml(data.title || 'Modern UI')}</h4>
            <p style="font-size: 0.82rem; color: #9ca3af;">Responsive HTML5/CSS3 prototype with live interactive preview.</p>
          </div>
        `;
        actionsHtml = `
          <button class="output-action-btn primary-action open-preview-btn" data-key="${key}"><i class="fa-solid fa-play"></i> Open Interactive Sandbox</button>
          <button class="output-action-btn download-html-btn" data-key="${key}"><i class="fa-solid fa-download"></i> Download HTML</button>
        `;
        break;

      case 'presentation':
        icon = 'fa-file-powerpoint';
        title = `${data.title || 'Presentation'} Slide Deck`;
        badge = 'PPTX PRESENTATION';
        previewHtml = renderSlideDeckHtml(data, 0);
        actionsHtml = `
          <button class="output-action-btn primary-action download-pptx-btn" data-key="${key}"><i class="fa-solid fa-file-powerpoint"></i> Download PPTX</button>
          <button class="output-action-btn open-preview-btn" data-key="${key}"><i class="fa-solid fa-expand"></i> Present Slides</button>
          <button class="output-action-btn download-pdf-btn" data-key="${key}"><i class="fa-solid fa-file-pdf"></i> Download PDF</button>
        `;
        break;
    }

    return `
      <div class="design-output-card" id="card-${key}">
        <div class="output-card-header">
          <div class="output-card-title-wrap">
            <div class="output-card-icon"><i class="fa-solid ${icon}"></i></div>
            <span class="output-card-title">${escapeHtml(title)}</span>
          </div>
          <span class="output-card-badge">${escapeHtml(badge)}</span>
        </div>
        <div class="output-card-body">
          ${previewHtml}
        </div>
        <div class="output-card-footer">
          <div class="output-btn-group">
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  }

  function bindOutputCardEvents(containerRow, key, type, data) {
    const cardEl = containerRow.querySelector(`#card-${key}`);
    if (!cardEl) return;

    // 1. Open Preview Modal
    const openBtn = cardEl.querySelector('.open-preview-btn');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        openStudioPreviewModal(key, type, data);
      });
    }

    // 2. Download PDF
    const pdfBtn = cardEl.querySelector('.download-pdf-btn');
    if (pdfBtn) {
      pdfBtn.addEventListener('click', () => {
        if (type === 'resume') downloadResumePdf(data, data.template || 'modern');
        else if (type === 'poster') downloadPosterPdf(data);
        else if (type === 'presentation') downloadPresentationPdf(data);
        else showToast('Generating PDF...', 'fa-file-pdf');
      });
    }

    // 3. Download PPTX
    const pptxBtn = cardEl.querySelector('.download-pptx-btn');
    if (pptxBtn) {
      pptxBtn.addEventListener('click', () => {
        downloadPresentationPptx(data);
      });
    }

    // 4. Download ZIP (Portfolio)
    const zipBtn = cardEl.querySelector('.download-zip-btn');
    if (zipBtn) {
      zipBtn.addEventListener('click', () => {
        downloadPortfolioZip(data);
      });
    }

    // 5. Download HTML
    const htmlBtn = cardEl.querySelector('.download-html-btn');
    if (htmlBtn) {
      htmlBtn.addEventListener('click', () => {
        const fullHtml = type === 'portfolio' ? generatePortfolioFullHtml(data) : generateWebsiteFullHtml(data);
        downloadFile(`${(data.title || data.name || 'design').replace(/\s+/g, '_')}.html`, fullHtml, 'text/html');
      });
    }

    // 6. Download SVG (Logo)
    const svgBtn = cardEl.querySelector('.download-svg-btn');
    if (svgBtn) {
      svgBtn.addEventListener('click', () => {
        const svgContent = renderLogoSvg(data);
        downloadFile(`${(data.brandName || 'logo').replace(/\s+/g, '_')}_logo.svg`, svgContent, 'image/svg+xml');
      });
    }

    // 7. Download PNG (Logo or Poster)
    const pngBtn = cardEl.querySelector('.download-png-btn');
    if (pngBtn) {
      pngBtn.addEventListener('click', () => {
        if (type === 'logo') downloadLogoPng(data);
        else if (type === 'poster') downloadPosterPng(data);
      });
    }

    // 8. Template Switcher (Resume)
    const tplBtn = cardEl.querySelector('.switch-template-btn');
    if (tplBtn) {
      tplBtn.addEventListener('click', () => {
        const templates = ['modern', 'executive', 'creative', 'tech'];
        const currentIdx = templates.indexOf(data.template || 'modern');
        data.template = templates[(currentIdx + 1) % templates.length];
        showToast(`Switched resume template to: ${data.template.toUpperCase()}`, 'fa-swatchbook');
        // Refresh preview in card
        const miniEl = cardEl.querySelector('.resume-mini-preview');
        if (miniEl) miniEl.innerHTML = renderResumeHtml(data, data.template);
      });
    }

    // Slide Carousel Controls
    bindSlideDeckControls(cardEl, data);
  }

  // --------------------------------------------------------------------------
  // 10. Studio Preview Modal Handler
  // --------------------------------------------------------------------------
  function openStudioPreviewModal(key, type, data) {
    state.activeModalDesign = { key, type, data };

    if (!elements.studioPreviewModal) return;

    elements.studioModalTitle.textContent = data.title || data.brandName || data.name || 'Creative Prototype';
    elements.studioModalSubtitle.textContent = `DesignNova Studio • ${type.toUpperCase()}`;

    // Show device toggles only for websites & portfolios
    if (type === 'portfolio' || type === 'website') {
      elements.deviceViewportToggles.style.display = 'flex';
    } else {
      elements.deviceViewportToggles.style.display = 'none';
    }

    // Render body into arena
    renderModalArenaContent(type, data);

    // Setup edit drawer fields
    setupEditDrawerFields(type, data);

    // Bind modal download button
    elements.studioDownloadBtn.onclick = () => {
      triggerDesignDownload(type, data);
    };

    // Bind edit button toggle
    elements.studioEditBtn.onclick = () => {
      const isDrawerOpen = elements.studioEditDrawer.style.display === 'flex';
      elements.studioEditDrawer.style.display = isDrawerOpen ? 'none' : 'flex';
      elements.studioEditBtn.classList.toggle('active', !isDrawerOpen);
    };

    // Dynamic footer format chips
    renderModalFooterChips(type, data);

    elements.studioPreviewModal.classList.add('open');
  }

  function closeStudioPreviewModal() {
    if (elements.studioPreviewModal) {
      elements.studioPreviewModal.classList.remove('open');
      elements.studioEditDrawer.style.display = 'none';
      if (elements.studioViewportArena) elements.studioViewportArena.innerHTML = '';
    }
  }

  function renderModalArenaContent(type, data) {
    if (!elements.studioViewportArena) return;

    elements.studioViewportArena.innerHTML = '';

    if (type === 'resume') {
      elements.studioViewportArena.innerHTML = `
        <div id="modal-resume-container" style="width: 100%; display: flex; justify-content: center; padding: 20px 0;">
          ${renderResumeHtml(data, data.template || 'modern')}
        </div>
      `;
    } else if (type === 'portfolio' || type === 'website') {
      const fullHtml = type === 'portfolio' ? generatePortfolioFullHtml(data) : generateWebsiteFullHtml(data);
      const wrapper = document.createElement('div');
      wrapper.className = `studio-iframe-wrapper viewport-${state.activeViewportMode}`;
      wrapper.id = 'studioIframeWrapper';

      const iframe = document.createElement('iframe');
      wrapper.appendChild(iframe);
      elements.studioViewportArena.appendChild(wrapper);

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(fullHtml);
      iframe.contentWindow.document.close();
    } else if (type === 'logo') {
      elements.studioViewportArena.innerHTML = `
        <div style="background: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 20px 20px; border-radius: 16px; padding: 60px 40px; display: flex; align-items: center; justify-content: center; width: 100%; max-width: 600px; box-shadow: var(--shadow-lg);">
          ${renderLogoSvg(data, 420, 260)}
        </div>
      `;
    } else if (type === 'poster') {
      elements.studioViewportArena.innerHTML = `
        <div style="display: flex; justify-content: center; width: 100%; padding: 20px;">
          ${renderPosterSvg(data, 480, 640)}
        </div>
      `;
    } else if (type === 'presentation') {
      elements.studioViewportArena.innerHTML = `
        <div style="width: 100%; max-width: 900px;" id="modal-slides-deck">
          ${renderSlideDeckHtml(data, 0)}
        </div>
      `;
      bindSlideDeckControls(elements.studioViewportArena.querySelector('#modal-slides-deck'), data);
    }
  }

  function setupEditDrawerFields(type, data) {
    if (!elements.studioEditDrawerBody) return;
    elements.studioEditDrawerBody.innerHTML = '';

    if (type === 'resume') {
      elements.studioEditDrawerBody.innerHTML = `
        <div class="edit-form-group">
          <label>Full Name</label>
          <input type="text" id="edit-res-name" value="${escapeHtml(data.name || '')}">
        </div>
        <div class="edit-form-group">
          <label>Job Title</label>
          <input type="text" id="edit-res-title" value="${escapeHtml(data.title || '')}">
        </div>
        <div class="edit-form-group">
          <label>Email & Phone</label>
          <input type="text" id="edit-res-contact" value="${escapeHtml(data.email || '')} • ${escapeHtml(data.phone || '')}">
        </div>
        <div class="edit-form-group">
          <label>Professional Summary</label>
          <textarea id="edit-res-summary" rows="4">${escapeHtml(data.summary || '')}</textarea>
        </div>
        <div class="edit-form-group">
          <label>Skills (Comma-separated)</label>
          <input type="text" id="edit-res-skills" value="${escapeHtml((data.skills || []).join(', '))}">
        </div>
        <div class="edit-form-group">
          <label>Select Template</label>
          <select id="edit-res-tpl">
            <option value="modern" ${data.template === 'modern' ? 'selected' : ''}>Modern Indigo</option>
            <option value="executive" ${data.template === 'executive' ? 'selected' : ''}>Executive Crimson</option>
            <option value="creative" ${data.template === 'creative' ? 'selected' : ''}>Creative Emerald</option>
            <option value="tech" ${data.template === 'tech' ? 'selected' : ''}>Tech Dark/Mono</option>
          </select>
        </div>
      `;

      // Two-way bind edits
      const updateResume = () => {
        data.name = document.getElementById('edit-res-name').value;
        data.title = document.getElementById('edit-res-title').value;
        data.summary = document.getElementById('edit-res-summary').value;
        data.template = document.getElementById('edit-res-tpl').value;
        const skillsVal = document.getElementById('edit-res-skills').value;
        data.skills = skillsVal.split(',').map(s => s.trim()).filter(Boolean);
        renderModalArenaContent(type, data);
      };

      elements.studioEditDrawerBody.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('input', updateResume);
      });
    } else if (type === 'logo') {
      elements.studioEditDrawerBody.innerHTML = `
        <div class="edit-form-group">
          <label>Brand Name</label>
          <input type="text" id="edit-logo-name" value="${escapeHtml(data.brandName || '')}">
        </div>
        <div class="edit-form-group">
          <label>Tagline</label>
          <input type="text" id="edit-logo-tagline" value="${escapeHtml(data.tagline || '')}">
        </div>
        <div class="edit-form-group">
          <label>Primary Brand Color</label>
          <input type="color" id="edit-logo-color" value="${data.primaryColor || '#6366f1'}">
        </div>
      `;

      const updateLogo = () => {
        data.brandName = document.getElementById('edit-logo-name').value;
        data.tagline = document.getElementById('edit-logo-tagline').value;
        data.primaryColor = document.getElementById('edit-logo-color').value;
        renderModalArenaContent(type, data);
      };

      elements.studioEditDrawerBody.querySelectorAll('input').forEach(el => el.addEventListener('input', updateLogo));
    } else if (type === 'poster') {
      elements.studioEditDrawerBody.innerHTML = `
        <div class="edit-form-group">
          <label>Event Headline</label>
          <input type="text" id="edit-poster-title" value="${escapeHtml(data.title || '')}">
        </div>
        <div class="edit-form-group">
          <label>Subtitle / Subtext</label>
          <input type="text" id="edit-poster-sub" value="${escapeHtml(data.subtitle || '')}">
        </div>
        <div class="edit-form-group">
          <label>Date & Location</label>
          <input type="text" id="edit-poster-date" value="${escapeHtml(data.dateLocation || '')}">
        </div>
      `;

      const updatePoster = () => {
        data.title = document.getElementById('edit-poster-title').value;
        data.subtitle = document.getElementById('edit-poster-sub').value;
        data.dateLocation = document.getElementById('edit-poster-date').value;
        renderModalArenaContent(type, data);
      };

      elements.studioEditDrawerBody.querySelectorAll('input').forEach(el => el.addEventListener('input', updatePoster));
    }
  }

  function renderModalFooterChips(type, data) {
    if (!elements.studioModalFooterActions) return;
    elements.studioModalFooterActions.innerHTML = '';

    if (type === 'resume') {
      elements.studioModalFooterActions.innerHTML = `
        <button class="output-action-btn" id="modal-tpl-modern">Modern</button>
        <button class="output-action-btn" id="modal-tpl-executive">Executive</button>
        <button class="output-action-btn" id="modal-tpl-creative">Creative</button>
        <button class="output-action-btn" id="modal-tpl-tech">Tech</button>
      `;
      ['modern', 'executive', 'creative', 'tech'].forEach(tpl => {
        const btn = document.getElementById(`modal-tpl-${tpl}`);
        if (btn) {
          btn.onclick = () => {
            data.template = tpl;
            renderModalArenaContent(type, data);
          };
        }
      });
    }
  }

  function triggerDesignDownload(type, data) {
    switch (type) {
      case 'resume':
        downloadResumePdf(data, data.template || 'modern');
        break;
      case 'portfolio':
        downloadPortfolioZip(data);
        break;
      case 'logo':
        downloadLogoPng(data);
        break;
      case 'poster':
        downloadPosterPng(data);
        break;
      case 'website':
        const fullHtml = generateWebsiteFullHtml(data);
        downloadFile(`${(data.title || 'prototype').replace(/\s+/g, '_')}.html`, fullHtml, 'text/html');
        break;
      case 'presentation':
        downloadPresentationPptx(data);
        break;
      default:
        showToast('Initiating file download...', 'fa-download');
    }
  }

  // --------------------------------------------------------------------------
  // 11. Concrete Generators & Real Download Implementations
  // --------------------------------------------------------------------------

  // --- RESUME BUILDER ---
  function renderResumeHtml(data, template = 'modern') {
    const skillsList = data.skills || ['JavaScript', 'HTML5/CSS3', 'UI Design', 'Git'];
    const exps = data.experience || [
      {
        role: 'Senior Specialist',
        company: 'Apex Digital Inc.',
        period: '2021 - Present',
        bullets: ['Led cross-functional team delivering mission-critical projects on schedule.']
      }
    ];

    const edus = data.education || [
      { degree: 'B.S. in Computer Science', school: 'State University', year: '2016 - 2020' }
    ];

    return `
      <div class="resume-sheet template-${template}" id="resume-export-sheet">
        <header class="resume-header">
          <h1 class="resume-name">${escapeHtml(data.name || 'Candidate Name')}</h1>
          <div class="resume-job-title">${escapeHtml(data.title || 'Professional Title')}</div>
          <div class="resume-contact-bar">
            ${data.email ? `<span><i class="fa-solid fa-envelope"></i> ${escapeHtml(data.email)}</span>` : ''}
            ${data.phone ? `<span><i class="fa-solid fa-phone"></i> ${escapeHtml(data.phone)}</span>` : ''}
            ${data.location ? `<span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(data.location)}</span>` : ''}
            ${data.website ? `<span><i class="fa-solid fa-globe"></i> ${escapeHtml(data.website)}</span>` : ''}
          </div>
        </header>

        <section class="resume-section">
          <h2 class="resume-section-title">Professional Summary</h2>
          <p class="resume-summary-text">${escapeHtml(data.summary || 'Accomplished professional with a proven track record.')}</p>
        </section>

        <section class="resume-section">
          <h2 class="resume-section-title">Professional Experience</h2>
          ${exps.map(exp => `
            <div class="resume-experience-item">
              <div class="resume-exp-header">
                <span>${escapeHtml(exp.role)}</span>
                <span>${escapeHtml(exp.period || '')}</span>
              </div>
              <div class="resume-exp-sub">${escapeHtml(exp.company)}</div>
              <ul style="padding-left: 18px; margin: 4px 0; font-size: 0.82rem;">
                ${(exp.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </section>

        <section class="resume-section">
          <h2 class="resume-section-title">Core Competencies & Skills</h2>
          <div class="resume-skills-grid">
            ${skillsList.map(s => `<span class="resume-skill-tag">${escapeHtml(s)}</span>`).join('')}
          </div>
        </section>

        <section class="resume-section">
          <h2 class="resume-section-title">Education</h2>
          ${edus.map(edu => `
            <div style="font-size: 0.84rem; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <strong>${escapeHtml(edu.degree)}</strong>
              <span style="color: #64748b;">${escapeHtml(edu.year || '')}</span>
            </div>
            <div style="font-size: 0.78rem; color: #64748b;">${escapeHtml(edu.school)}</div>
          `).join('')}
        </section>
      </div>
    `;
  }

  function downloadResumePdf(data, template = 'modern') {
    if (typeof html2pdf === 'undefined') {
      showToast('PDF generator loading...', 'fa-hourglass');
      return;
    }

    showToast('Compiling high-resolution PDF...', 'fa-file-pdf');

    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '794px'; // Standard A4 at 96 DPI
    wrapper.innerHTML = renderResumeHtml(data, template);
    document.body.appendChild(wrapper);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${(data.name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(wrapper.firstElementChild).save().then(() => {
      document.body.removeChild(wrapper);
      showToast('PDF downloaded successfully!', 'fa-circle-check');
    }).catch(err => {
      console.error('PDF error:', err);
      document.body.removeChild(wrapper);
      showToast('PDF download failed. Check browser print permissions.', 'fa-triangle-exclamation');
    });
  }

  // --- LOGO DESIGNER ---
  function renderLogoSvg(data, width = 320, height = 200) {
    const brand = escapeHtml(data.brandName || 'Nova');
    const tagline = escapeHtml(data.tagline || 'STUDIO');
    const color = data.primaryColor || '#6366f1';
    const color2 = data.secondaryColor || '#a855f7';

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <linearGradient id="logoGrad_${brand}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${color2}" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Emblem Symbol -->
        <g transform="translate(${width / 2}, 60)">
          <polygon points="0,-36 32,18 -32,18" fill="url(#logoGrad_${brand})" filter="url(#logoGlow)" opacity="0.3" />
          <polygon points="0,-32 28,16 -28,16" fill="url(#logoGrad_${brand})" />
          <polygon points="0,-16 14,8 -14,8" fill="#0f172a" />
          <circle cx="0" cy="-2" r="5" fill="${color2}" />
        </g>

        <!-- Brand Name -->
        <text x="${width / 2}" y="134" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#f8fafc" text-anchor="middle" letter-spacing="-0.02em">
          ${brand}
        </text>

        <!-- Tagline -->
        <text x="${width / 2}" y="156" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="${color}" text-anchor="middle" letter-spacing="0.22em">
          ${tagline.toUpperCase()}
        </text>
      </svg>
    `;
  }

  function downloadLogoPng(data) {
    showToast('Rendering high-resolution 1200x1200px PNG...', 'fa-image');
    const svgString = renderLogoSvg(data, 600, 600);
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    // Fill transparent or dark canvas
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, 1200, 1200);

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1200, 1200);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `${(data.brandName || 'logo').replace(/\s+/g, '_')}_1200px.png`;
      a.href = pngUrl;
      a.click();
      showToast('High-Res PNG downloaded!', 'fa-circle-check');
    };
    img.src = url;
  }

  // --- POSTER & BANNER DESIGNER ---
  function renderPosterSvg(data, width = 420, height = 560) {
    const title = escapeHtml(data.title || 'CREATIVE SUMMIT 2026');
    const sub = escapeHtml(data.subtitle || 'INNOVATION & DESIGN CONFERENCE');
    const dateLoc = escapeHtml(data.dateLocation || 'OCTOBER 24 • SAN FRANCISCO');
    const color = data.color || '#ec4899';
    const color2 = data.color2 || '#8b5cf6';

    return `
      <svg class="poster-canvas-render" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <defs>
          <linearGradient id="posterBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#090d16" />
            <stop offset="50%" stop-color="#141a2e" />
            <stop offset="100%" stop-color="#04060a" />
          </linearGradient>
          <linearGradient id="posterAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="100%" stop-color="${color2}" />
          </linearGradient>
        </defs>

        <!-- Background -->
        <rect width="${width}" height="${height}" rx="12" fill="url(#posterBg)" />

        <!-- Abstract Decorative Mesh Circles -->
        <circle cx="${width * 0.8}" cy="${height * 0.2}" r="160" fill="${color}" opacity="0.25" filter="blur(60px)" />
        <circle cx="${width * 0.2}" cy="${height * 0.7}" r="180" fill="${color2}" opacity="0.22" filter="blur(60px)" />

        <!-- Geometric Grid Lines -->
        <line x1="24" y1="36" x2="${width - 24}" y2="36" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <line x1="24" y1="${height - 40}" x2="${width - 24}" y2="${height - 40}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

        <!-- Top Badge -->
        <rect x="24" y="50" width="130" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
        <text x="89" y="66" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#f8fafc" text-anchor="middle" letter-spacing="0.1em">★ OFFICIAL EVENT</text>

        <!-- Main Headline -->
        <text x="24" y="${height * 0.42}" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="-0.03em">
          ${title}
        </text>

        <!-- Gradient Highlight Bar -->
        <rect x="24" y="${height * 0.46}" width="70" height="4" rx="2" fill="url(#posterAccent)" />

        <!-- Subtitle -->
        <text x="24" y="${height * 0.54}" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="${color}">
          ${sub}
        </text>

        <!-- Details / Date / Location -->
        <text x="24" y="${height * 0.62}" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="500" fill="#94a3b8" letter-spacing="0.05em">
          ${dateLoc}
        </text>

        <!-- Call to Action Box -->
        <rect x="24" y="${height - 96}" width="${width - 48}" height="42" rx="10" fill="url(#posterAccent)" />
        <text x="${width / 2}" y="${height - 70}" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.04em">
          REGISTER NOW • LIMITED CAPACITY
        </text>
      </svg>
    `;
  }

  function downloadPosterPng(data) {
    showToast('Rendering high-res Poster PNG...', 'fa-image');
    const svgStr = renderPosterSvg(data, 800, 1060);
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 2120;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1600, 2120);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `${(data.title || 'poster').replace(/\s+/g, '_')}_poster.png`;
      a.href = pngUrl;
      a.click();
      showToast('Poster PNG downloaded!', 'fa-circle-check');
    };
    img.src = url;
  }

  function downloadPosterPdf(data) {
    if (typeof html2pdf === 'undefined') {
      showToast('PDF engine loading...', 'fa-hourglass');
      return;
    }
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderPosterSvg(data, 600, 800);
    const opt = {
      margin: 5,
      filename: `${(data.title || 'poster').replace(/\s+/g, '_')}.pdf`,
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(wrapper.firstElementChild).save();
  }

  // --- PRESENTATION PPT CREATOR ---
  function renderSlideDeckHtml(data, activeIdx = 0) {
    const slides = data.slides || [{ title: 'Slide 1', tag: 'Intro', bullets: ['Overview'] }];
    const currentSlide = slides[activeIdx] || slides[0];

    return `
      <div class="slides-deck-viewer" data-active-slide="${activeIdx}">
        <div class="slide-card-screen">
          <div class="slide-glow-accent"></div>
          <div>
            <div style="font-size: 0.72rem; color: #a855f7; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              ${escapeHtml(currentSlide.tag || 'SLIDE ' + (activeIdx + 1))}
            </div>
            <h3 style="font-size: 1.45rem; font-weight: 800; color: #f8fafc; margin-bottom: 18px;">
              ${escapeHtml(currentSlide.title)}
            </h3>
            <ul style="padding-left: 24px; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
              ${(currentSlide.bullets || []).map(b => `<li style="margin-bottom: 8px;">${escapeHtml(b)}</li>`).join('')}
            </ul>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; font-size: 0.75rem; color: #94a3b8;">
            <span>${escapeHtml(data.title || 'Presentation')}</span>
            <span>Slide ${activeIdx + 1} of ${slides.length}</span>
          </div>
        </div>

        <div class="slide-deck-controls">
          <button class="slide-nav-btn prev-slide-btn" ${activeIdx === 0 ? 'disabled' : ''}><i class="fa-solid fa-arrow-left"></i> Previous</button>
          <span class="slide-counter-badge">${activeIdx + 1} / ${slides.length}</span>
          <button class="slide-nav-btn next-slide-btn" ${activeIdx >= slides.length - 1 ? 'disabled' : ''}>Next <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;
  }

  function bindSlideDeckControls(container, data) {
    if (!container) return;
    const deck = container.querySelector('.slides-deck-viewer');
    if (!deck) return;

    const prevBtn = deck.querySelector('.prev-slide-btn');
    const nextBtn = deck.querySelector('.next-slide-btn');
    let currentIdx = parseInt(deck.dataset.activeSlide || '0', 10);

    const updateView = (newIdx) => {
      deck.outerHTML = renderSlideDeckHtml(data, newIdx);
      bindSlideDeckControls(container, data);
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (currentIdx > 0) updateView(currentIdx - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (currentIdx < (data.slides || []).length - 1) updateView(currentIdx + 1);
      };
    }
  }

  function downloadPresentationPptx(data) {
    if (typeof PptxGenJS === 'undefined') {
      showToast('PptxGenJS library loading...', 'fa-hourglass');
      return;
    }

    showToast('Generating Microsoft PowerPoint (.pptx) file...', 'fa-file-powerpoint');

    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      pptx.title = data.title || 'DesignNova Presentation';

      // Title Slide
      const titleSlide = pptx.addSlide();
      titleSlide.background = { color: '090D16' };
      titleSlide.addText(data.title || 'Strategic Overview', {
        x: 0.8, y: 2.2, w: 8.5, h: 1.2,
        fontSize: 32, color: 'FFFFFF', bold: true, fontFace: 'Arial'
      });
      if (data.subtitle) {
        titleSlide.addText(data.subtitle, {
          x: 0.8, y: 3.5, w: 8.5, h: 0.8,
          fontSize: 16, color: '6366F1', fontFace: 'Arial'
        });
      }

      // Content Slides
      (data.slides || []).forEach((slide, idx) => {
        const s = pptx.addSlide();
        s.background = { color: '0B1120' };

        // Header
        s.addText(slide.title, {
          x: 0.8, y: 0.6, w: 8.5, h: 0.8,
          fontSize: 22, color: '6366F1', bold: true, fontFace: 'Arial'
        });

        // Bullets
        if (slide.bullets && slide.bullets.length) {
          const bulletItems = slide.bullets.map(b => ({
            text: b,
            options: { bullet: true, color: 'E2E8F0', fontSize: 14 }
          }));
          s.addText(bulletItems, {
            x: 0.8, y: 1.6, w: 8.5, h: 4.2,
            lineSpacing: 24, fontFace: 'Arial'
          });
        }
      });

      const filename = `${(data.title || 'presentation').replace(/\s+/g, '_')}.pptx`;
      pptx.writeFile({ fileName: filename }).then(() => {
        showToast('PPTX Presentation downloaded!', 'fa-circle-check');
      });
    } catch (err) {
      console.error('PPTX error:', err);
      showToast('PPTX export error. Try again.', 'fa-triangle-exclamation');
    }
  }

  function downloadPresentationPdf(data) {
    showToast('Printing slides to PDF...', 'fa-file-pdf');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = (data.slides || []).map((s, i) => `
      <div style="page-break-after: always; padding: 30px; background: #0f172a; color: #fff; font-family: sans-serif; min-height: 400px;">
        <h2 style="color: #6366f1;">${escapeHtml(s.title)}</h2>
        <ul style="font-size: 16px; line-height: 1.8;">
          ${(s.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    const opt = {
      margin: 10,
      filename: `${(data.title || 'presentation').replace(/\s+/g, '_')}.pdf`,
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(wrapper).save();
  }

  // --- PORTFOLIO & WEBSITE PROTOTYPER ---
  function generatePortfolioFullHtml(data) {
    const name = escapeHtml(data.name || 'Alex Rivera');
    const intro = escapeHtml(data.intro || 'Full-Stack Developer & UI/UX Architect');
    const skills = data.skills || ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'CSS3'];
    const projects = data.projects || [
      { title: 'SaaS Design System', desc: 'Enterprise component library with 40+ production components.' },
      { title: 'Real-Time Analytics App', desc: 'Ultra-low-latency dashboard tracking 1M+ active events.' },
      { title: 'Fintech Mobile Checkout', desc: '1-click seamless checkout flow with biometric authentication.' }
    ];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #090d16; color: #f8fafc; line-height: 1.6; }
    header { padding: 80px 24px; text-align: center; max-width: 800px; margin: 0 auto; }
    h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; background: linear-gradient(135deg, #6366f1, #a855f7 50%, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 12px; }
    p.lead { font-size: 1.2rem; color: #94a3b8; margin-bottom: 24px; }
    .skills-row { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
    .skill-pill { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); padding: 6px 14px; border-radius: 9999px; font-size: 0.85rem; color: #c084fc; font-weight: 600; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto; padding: 24px; }
    .card { background: #121828; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-4px); border-color: #6366f1; }
    .card h3 { font-size: 1.2rem; margin-bottom: 8px; color: #fff; }
    .card p { font-size: 0.9rem; color: #94a3b8; }
    footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); }
    .btn { display: inline-block; background: #6366f1; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; margin-top: 20px; }
  </style>
</head>
<body>
  <header>
    <h1>${name}</h1>
    <p class="lead">${intro}</p>
    <div class="skills-row">
      ${skills.map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join('')}
    </div>
    <a href="#contact" class="btn">Get In Touch</a>
  </header>
  <main class="projects-grid">
    ${projects.map(p => `
      <div class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
      </div>
    `).join('')}
  </main>
  <footer id="contact">
    <p>Handcrafted portfolio generated with DesignNova AI Studio</p>
  </footer>
</body>
</html>`;
  }

  function downloadPortfolioZip(data) {
    showToast('Packing multi-file Portfolio ZIP bundle...', 'fa-file-zipper');

    if (typeof JSZip === 'undefined') {
      const fullHtml = generatePortfolioFullHtml(data);
      downloadFile(`${(data.name || 'portfolio').replace(/\s+/g, '_')}.html`, fullHtml, 'text/html');
      return;
    }

    try {
      const zip = new JSZip();
      const htmlContent = generatePortfolioFullHtml(data);
      zip.file('index.html', htmlContent);
      zip.file('README.md', `# ${data.name} - Portfolio Website\n\nGenerated with DesignNova AI Studio.\nOpen \`index.html\` in your browser to view.`);

      zip.generateAsync({ type: 'blob' }).then(content => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(data.name || 'portfolio').replace(/\s+/g, '_')}_Website.zip`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Portfolio ZIP downloaded!', 'fa-circle-check');
      });
    } catch (err) {
      console.error('ZIP error:', err);
      const fullHtml = generatePortfolioFullHtml(data);
      downloadFile(`${(data.name || 'portfolio').replace(/\s+/g, '_')}.html`, fullHtml, 'text/html');
    }
  }

  function generateWebsiteFullHtml(data) {
    const title = escapeHtml(data.title || 'Next-Gen Web Prototype');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #080c14; color: #f8fafc; line-height: 1.6; }
    .hero { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 24px; position: relative; overflow: hidden; }
    .glow { position: absolute; width: 450px; height: 450px; background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%); filter: blur(80px); pointer-events: none; }
    h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; max-width: 800px; margin-bottom: 16px; }
    .gradient-text { background: linear-gradient(135deg, #6366f1, #a855f7, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { font-size: 1.1rem; color: #94a3b8; max-width: 600px; margin-bottom: 28px; }
    .btn-group { display: flex; gap: 12px; }
    .btn-primary { background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
    .btn-secondary { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="hero">
    <div class="glow"></div>
    <h1>${title} with <span class="gradient-text">DesignNova AI</span></h1>
    <p>A production-ready prototype featuring modern glassmorphism, responsive clamp typography, and interactive components.</p>
    <div class="btn-group">
      <a href="#" class="btn-primary">Explore Platform</a>
      <a href="#" class="btn-secondary">Documentation</a>
    </div>
  </div>
</body>
</html>`;
  }

  // --- GENERIC DOWNLOAD UTILITY ---
  function downloadFile(filename, content, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}!`, 'fa-circle-check');
  }

  // --------------------------------------------------------------------------
  // 12. Intent Classifier & Smart Generation Dispatcher
  // --------------------------------------------------------------------------
  function classifyUserIntent(prompt) {
    const p = prompt.toLowerCase();

    // 1. Resume
    if (p.includes('resume') || p.includes('cv') || p.includes('curriculum vitae')) {
      return 'resume';
    }
    // 2. Portfolio
    if (p.includes('portfolio') || p.includes('personal website') || (p.includes('showcase') && p.includes('developer'))) {
      return 'portfolio';
    }
    // 3. Logo
    if (p.includes('logo') || p.includes('brandmark') || p.includes('wordmark') || p.includes('brand identity')) {
      return 'logo';
    }
    // 4. Poster / Banner / Invitation
    if (p.includes('poster') || p.includes('banner') || p.includes('invitation') || p.includes('invite') || p.includes('flyer')) {
      return 'poster';
    }
    // 5. Presentation / PPT
    if (p.includes('presentation') || p.includes('ppt') || p.includes('pptx') || p.includes('slide') || p.includes('slides') || p.includes('pitch deck')) {
      return 'presentation';
    }
    // 6. Website / UI/UX
    if (p.includes('website') || p.includes('landing page') || p.includes('ui') || p.includes('ux') || p.includes('prototype') || p.includes('wireframe') || p.includes('hero section')) {
      return 'website';
    }
    // 7. Code
    if (p.includes('write code') || p.includes('function') || p.includes('script') || p.includes('python code') || p.includes('javascript code') || p.includes('css code') || p.includes('debug')) {
      return 'code';
    }
    // 8. General Chat
    return 'general_chat';
  }

  function extractEntity(prompt, regex, fallback = '') {
    const match = prompt.match(regex);
    return match ? match[1].trim() : fallback;
  }

  function generateSmartAiReply(userPrompt, conversationHistory) {
    const intent = classifyUserIntent(userPrompt);
    const p = userPrompt;

    switch (intent) {
      case 'resume': {
        const name = extractEntity(p, /(?:named|for|name is)\s+([A-Z][a-zA-Z\s]+?)(?:,|\.|\s+with|\s+as|\s+who|$)/i, 'Alex Rivera');
        const role = extractEntity(p, /(?:developer|engineer|designer|manager|architect|specialist|consultant|analyst)/i, 'Senior Full-Stack Developer');
        return {
          text: `### DesignNova AI Resume Builder\n\nI have generated a professional, ATS-optimized executive resume for **${escapeHtml(name)}** (${escapeHtml(role)}). You can preview the full sheet, switch templates, and click **Download PDF** for a print-ready document:`,
          designType: 'resume',
          designData: {
            name: name,
            title: role,
            email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            phone: '+1 (555) 729-4018',
            location: 'San Francisco, CA • Remote',
            website: `${name.toLowerCase().replace(/\s+/g, '')}.dev`,
            summary: `High-impact ${role} with extensive experience architecting modern digital solutions, leading agile workflows, and delivering user-centric performance improvements.`,
            skills: ['React / Next.js', 'TypeScript', 'Node.js', 'Cloud Infrastructure', 'UI/UX Prototyping', 'System Architecture'],
            experience: [
              {
                role: role,
                company: 'Veloce Labs Inc.',
                period: '2022 - Present',
                bullets: [
                  'Led architecture for enterprise web platform scaling to 1M+ active sessions.',
                  'Reduced frontend bundle sizes by 38% utilizing modern code-splitting and asset optimization.'
                ]
              },
              {
                role: 'Software Engineer',
                company: 'Aura Systems',
                period: '2019 - 2022',
                bullets: [
                  'Implemented secure microservices API and automated testing pipelines.',
                  'Partnered with product managers to deliver 14 core user-facing features.'
                ]
              }
            ],
            education: [
              { degree: 'B.S. in Computer Science', school: 'University of California, Berkeley', year: '2015 - 2019' }
            ],
            template: 'modern'
          }
        };
      }

      case 'portfolio': {
        const name = extractEntity(p, /(?:named|for|name is)\s+([A-Z][a-zA-Z\s]+?)(?:,|\.|\s+with|\s+as|\s+who|$)/i, 'Maya Lin');
        return {
          text: `### DesignNova AI Portfolio Builder\n\nI have created a responsive portfolio website prototype for **${escapeHtml(name)}**. You can test the live interactive preview, switch viewports (desktop, tablet, mobile), and click **Download ZIP** for the complete code bundle:`,
          designType: 'portfolio',
          designData: {
            name: name,
            intro: 'Creative UI/UX Designer & Frontend Engineer',
            skills: ['Figma', 'React', 'CSS3 & Tailwind', 'Motion Design', 'User Research'],
            projects: [
              { title: 'PulseAI Dashboard', desc: 'Predictive analytics studio with responsive data cards.' },
              { title: 'Fintech Express Pay', desc: '1-click checkout flow with biometric identity verification.' },
              { title: 'Aura Design System', desc: '40+ accessible Figma and CSS components.' }
            ]
          }
        };
      }

      case 'logo': {
        const brand = extractEntity(p, /(?:named|called|for)\s+([A-Za-z0-9\s]+?)(?:in|\.|\s+with|\s+as|$)/i, 'BeanCraft');
        return {
          text: `### DesignNova AI Logo Designer\n\nHere is your custom vector logo for **${escapeHtml(brand)}**. It combines clean geometric emblems, brand typography, and gradient accents. You can export vector SVG or high-res PNG below:`,
          designType: 'logo',
          designData: {
            brandName: brand,
            tagline: 'Crafted with Precision',
            primaryColor: '#6366f1',
            secondaryColor: '#a855f7',
            style: 'geometric-badge'
          }
        };
      }

      case 'poster': {
        const title = extractEntity(p, /(?:for|named|about)\s+([A-Za-z0-9\s]+?)(?:on|\.|\s+with|\s+in|$)/i, 'TECH SUMMIT 2026');
        return {
          text: `### DesignNova Poster & Banner Designer\n\nI have generated an event poster graphic for **${escapeHtml(title)}**. You can inspect the artwork, adjust text, and download in PNG or PDF format:`,
          designType: 'poster',
          designData: {
            title: title.toUpperCase(),
            subtitle: 'INNOVATION & DESIGN SUMMIT',
            dateLocation: 'OCTOBER 24 • SAN FRANCISCO, CA',
            color: '#ec4899',
            color2: '#8b5cf6'
          }
        };
      }

      case 'presentation': {
        const topic = extractEntity(p, /(?:on|about)\s+([A-Za-z0-9\s]+?)(?:with|\.|\s+in|$)/i, 'Artificial Intelligence in Healthcare');
        return {
          text: `### DesignNova PPT & Presentation Creator\n\nI have structured a 4-slide presentation on **${escapeHtml(topic)}**. You can navigate through the slide carousel and click **Download PPTX** for an editable Microsoft PowerPoint file:`,
          designType: 'presentation',
          designData: {
            title: topic,
            subtitle: 'Strategic Overview, Core Trends & Key Takeaways',
            slides: [
              {
                title: 'Market Landscape & Executive Overview',
                tag: 'Introduction',
                bullets: [
                  'AI adoption in this sector is accelerating across cloud-based workflows.',
                  'Compound annual growth rate (CAGR) exceeding 35% through 2030.',
                  'Major efficiency gains realized in automated data processing.'
                ]
              },
              {
                title: 'Core Technologies & Applications',
                tag: 'Key Trends',
                bullets: [
                  'Large Language Models augmenting customer and internal communications.',
                  'Predictive analytics improving resource allocation by 28%.',
                  'Computer vision automating quality control and visual inspections.'
                ]
              },
              {
                title: 'Implementation Challenges & Solutions',
                tag: 'Overcoming Barriers',
                bullets: [
                  'Data Privacy: Strict governance frameworks and local encryption standards.',
                  'Legacy Integration: Modular API wrappers connecting modern microservices.',
                  'Workforce Upskilling: Cross-departmental training cohorts.'
                ]
              },
              {
                title: 'Summary & Strategic Next Steps',
                tag: 'Conclusion',
                bullets: [
                  'Launch pilot initiative targeting highest-ROI bottleneck first.',
                  'Establish measurable KPI benchmarks before enterprise-wide expansion.',
                  'Schedule quarterly retrospective to assess technology milestones.'
                ]
              }
            ]
          }
        };
      }

      case 'website': {
        const title = extractEntity(p, /(?:for|named|about)\s+([A-Za-z0-9\s]+?)(?:with|\.|\s+in|$)/i, 'Modern SaaS Landing Page');
        return {
          text: `### DesignNova Website & UI/UX Designer\n\nI have generated an interactive web prototype for **${escapeHtml(title)}**. Click **Open Interactive Sandbox** to test in full screen with desktop/tablet/mobile toggles:`,
          designType: 'website',
          designData: {
            title: title
          }
        };
      }

      case 'code': {
        return {
          text: `### DesignNova Code Generator\n\nHere is the clean, commented code snippet for your request:\n\n` +
            `\`\`\`html\n<!-- Responsive Animated Card -->\n<div class="card-container">\n` +
            `  <h3 class="card-title">Interactive Element</h3>\n` +
            `  <p class="card-body">High-performance CSS transition with subtle border glow.</p>\n` +
            `  <button class="cta-button" onclick="alert('Action clicked!')">Explore</button>\n` +
            `</div>\n\`\`\`\n\n` +
            `\`\`\`css\n.card-container {\n` +
            `  background: #111827;\n` +
            `  border: 1px solid rgba(255, 255, 255, 0.12);\n` +
            `  border-radius: 16px;\n` +
            `  padding: 24px;\n` +
            `  transition: transform 0.25s ease, border-color 0.25s ease;\n` +
            `}\n\n` +
            `.card-container:hover {\n` +
            `  transform: translateY(-4px);\n` +
            `  border-color: #6366f1;\n` +
            `}\n\n` +
            `.cta-button {\n` +
            `  background: #6366f1;\n` +
            `  color: #ffffff;\n` +
            `  border: none;\n` +
            `  padding: 8px 18px;\n` +
            `  border-radius: 8px;\n` +
            `  cursor: pointer;\n` +
            `}\n\`\`\`\n\n` +
            `> You can click **Run Preview** in the code block header to test this live in your browser sandbox!`
        };
      }

      default: {
        return {
          text: `### DesignNova AI Creative Studio 🎨\n\n` +
            `I am your All-in-One AI Design Assistant! I can instantly create:\n` +
            `- 📄 **AI Resume Builder:** Tell me your role and skills to generate an interactive resume with instant PDF download.\n` +
            `- 🌐 **AI Portfolio Builder:** Request a portfolio for downloadable responsive code and live sandboxes.\n` +
            `- ✨ **AI Logo Designer:** Give me your brand name and industry to get vector SVG & PNG logos.\n` +
            `- 🎨 **Poster & Banner Designer:** Describe an event to get stylish graphics with PNG/PDF export.\n` +
            `- 💻 **Website & UI/UX Designer:** Request landing pages or app prototypes with live mobile/desktop previews.\n` +
            `- 📊 **PPT & Presentation Creator:** Ask for a presentation on any topic to generate real Microsoft PowerPoint (.pptx) files.\n\n` +
            `*What would you like to build right now?*`
        };
      }
    }
  }

  function handleSendMessage() {
    let rawText = elements.messageInput.value.trim();
    if ((!rawText && !state.attachedFile) || state.isResponding) return;

    if (state.attachedFile) {
      const fileHeader = `[Attached Asset: ${state.attachedFile.name} (${state.attachedFile.size})]\n`;
      rawText = fileHeader + (rawText || 'Please inspect this design asset and provide advice.');
      clearAttachedFile();
    }

    elements.messageInput.value = '';
    updateInputState();

    if (elements.welcomeScreen) {
      elements.welcomeScreen.style.display = 'none';
    }

    let currentChat = state.conversations.find(c => c.id === state.activeChatId);
    if (!currentChat) {
      const generatedTitle = generateChatTitle(rawText);
      currentChat = {
        id: 'session-' + Date.now(),
        title: generatedTitle,
        createdAt: new Date().toISOString(),
        messages: []
      };
      state.conversations.unshift(currentChat);
      state.activeChatId = currentChat.id;
      renderSidebarHistory();
    }

    const userMsg = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: rawText,
      timestamp: getFormattedTime()
    };
    currentChat.messages.push(userMsg);
    saveConversations();
    appendMessageToDOM(userMsg, true);

    triggerSimulatedAiResponse(currentChat, rawText);
  }

  function regenerateLastResponse() {
    if (state.isResponding) return;
    const currentChat = state.conversations.find(c => c.id === state.activeChatId);
    if (!currentChat || currentChat.messages.length === 0) return;

    let lastUserPrompt = '';
    for (let i = currentChat.messages.length - 1; i >= 0; i--) {
      if (currentChat.messages[i].role === 'user') {
        lastUserPrompt = currentChat.messages[i].text;
        break;
      }
    }

    if (!lastUserPrompt) return;

    if (currentChat.messages[currentChat.messages.length - 1].role === 'assistant') {
      currentChat.messages.pop();
      saveConversations();
      renderActiveChat();
    }

    showToast('Regenerating creative output...', 'fa-arrows-rotate');
    triggerSimulatedAiResponse(currentChat, lastUserPrompt);
  }

  async function triggerSimulatedAiResponse(currentChat, userPrompt) {
    state.isResponding = true;
    updateInputState();
    showTypingIndicator(true);

    let replyResult = null;

    // -----------------------------------------------------------------------
    // Step 1: Try the backend /api/chat (only when page is served via server)
    // -----------------------------------------------------------------------
    if (window.location.protocol !== 'file:') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userPrompt,
            history: currentChat.messages.slice(-6).map(m => ({ role: m.role, text: m.text })),
            feature: 'general'
          })
        });

        if (response.ok) {
          const data = await response.json();

          if (data.ok && !data.offlineFallback && data.reply) {
            // Real AI reply from server
            replyResult = { text: data.reply };
          }
          // If offlineFallback === true, data.reply is empty — fall through to built-in engine
        }
      } catch (networkErr) {
        // Server not running or network error — silently fall through to built-in engine
        console.warn('[DesignNova] Backend not reachable, using built-in engine:', networkErr.message);
      }
    }

    // -----------------------------------------------------------------------
    // Step 2: Built-in intelligence engine (always works, no API key needed)
    // -----------------------------------------------------------------------
    if (!replyResult) {
      try {
        replyResult = generateSmartAiReply(userPrompt, currentChat.messages);
      } catch (engineErr) {
        console.error('[DesignNova] Engine error:', engineErr);
        replyResult = {
          text: `### DesignNova AI — Error\n\nSomething went wrong while generating a response.\n\n**Error:** ${engineErr.message || 'Unknown error'}\n\nPlease try rephrasing your request.`
        };
      }
    }

    // -----------------------------------------------------------------------
    // Step 3: Render the reply
    // -----------------------------------------------------------------------
    showTypingIndicator(false);

    const aiMsg = {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      text: (replyResult && replyResult.text) ? replyResult.text : String(replyResult || ''),
      designType: (replyResult && replyResult.designType) ? replyResult.designType : null,
      designData: (replyResult && replyResult.designData) ? replyResult.designData : null,
      timestamp: getFormattedTime()
    };

    currentChat.messages.push(aiMsg);
    saveConversations();

    appendMessageToDOM(aiMsg, true);
    state.isResponding = false;
    updateInputState();
    if (elements.messageInput) elements.messageInput.focus();

    if (state.ttsEnabled) {
      speakText(aiMsg.text);
    }
  }

  function showTypingIndicator(show) {
    if (!elements.typingIndicator) return;
    elements.typingIndicator.style.display = show ? 'block' : 'none';
    if (show) scrollToBottom(true);
  }

  function generateChatTitle(prompt) {
    if (!prompt) return 'New Design Session';
    const clean = prompt.replace(/[#*`_\[\]]/g, '').trim();
    if (clean.length <= 32) return clean;
    return clean.slice(0, 30) + '...';
  }

  function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  // --------------------------------------------------------------------------
  // 13. Clipboard & File Attachments
  // --------------------------------------------------------------------------
  function copyToClipboard(text, triggerBtn, isCodeSnippet = false) {
    if (!navigator.clipboard) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      triggerCopyFeedback(triggerBtn, isCodeSnippet);
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      triggerCopyFeedback(triggerBtn, isCodeSnippet);
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
      showToast('Could not copy to clipboard.', 'fa-triangle-exclamation');
    });
  }

  function triggerCopyFeedback(triggerBtn, isCodeSnippet) {
    if (!triggerBtn) return;
    const originalHtml = triggerBtn.innerHTML;
    triggerBtn.innerHTML = isCodeSnippet
      ? '<i class="fa-solid fa-check"></i> <span>Copied!</span>'
      : '<i class="fa-solid fa-check"></i> <span>Copied</span>';

    showToast(isCodeSnippet ? 'Code snippet copied!' : 'Recommendation copied!', 'fa-clipboard-check');

    setTimeout(() => {
      triggerBtn.innerHTML = originalHtml;
    }, 2000);
  }

  function handleFileSelected(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    state.attachedFile = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`
    };

    if (elements.attachedFilePreview && elements.attachedFileName && elements.attachedFileSize) {
      elements.attachedFileName.textContent = state.attachedFile.name;
      elements.attachedFileSize.textContent = `(${state.attachedFile.size})`;
      elements.attachedFilePreview.style.display = 'flex';
    }

    updateInputState();
    elements.messageInput.focus();
    showToast(`Staged asset "${file.name}"`, 'fa-paperclip');
    e.target.value = '';
  }

  function clearAttachedFile() {
    state.attachedFile = null;
    if (elements.attachedFilePreview) {
      elements.attachedFilePreview.style.display = 'none';
    }
    updateInputState();
  }

  function showToast(message, iconClass = 'fa-circle-info', duration = 2800) {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${escapeHtml(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 260);
    }, duration);
  }

  function updateInputState() {
    // Guard: elements may not yet be cached (called before initializeData completes)
    if (!elements.messageInput || !elements.sendBtn) return;

    const text = elements.messageInput.value.trim();
    const hasContent = text.length > 0 || state.attachedFile !== null;
    elements.sendBtn.disabled = !hasContent || state.isResponding;

    elements.messageInput.style.height = 'auto';
    const newHeight = Math.min(elements.messageInput.scrollHeight, 180);
    elements.messageInput.style.height = `${newHeight}px`;
  }

  // --------------------------------------------------------------------------
  // 14. Mobile Drawer & Modals Handlers
  // --------------------------------------------------------------------------
  function openMobileSidebar() {
    if (elements.sidebar) elements.sidebar.classList.add('open');
    if (elements.sidebarOverlay) elements.sidebarOverlay.classList.add('active');
  }

  function closeMobileSidebar() {
    if (elements.sidebar) elements.sidebar.classList.remove('open');
    if (elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('active');
  }

  function openInfoModal() {
    if (elements.infoModal) elements.infoModal.classList.add('open');
  }

  function closeInfoModal() {
    if (elements.infoModal) elements.infoModal.classList.remove('open');
  }

  function setupModalTabs() {
    elements.modalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTabId = tab.dataset.tab;
        elements.modalTabs.forEach(t => t.classList.remove('active'));
        elements.tabPanes.forEach(pane => pane.classList.remove('active'));

        tab.classList.add('active');
        const activePane = document.getElementById(targetTabId);
        if (activePane) activePane.classList.add('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 15. Speech Recognition Setup
  // --------------------------------------------------------------------------
  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      if (elements.micBtn) elements.micBtn.title = 'Voice input (Not supported in this browser)';
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        state.isRecording = true;
        if (elements.micBtn) elements.micBtn.classList.add('recording');
        showToast('Listening... Speak your design prompt.', 'fa-microphone');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(res => res[0].transcript)
          .join('');
        elements.messageInput.value = transcript;
        updateInputState();
      };

      recognition.onerror = (event) => {
        state.isRecording = false;
        if (elements.micBtn) elements.micBtn.classList.remove('recording');
        if (event.error !== 'no-speech') {
          showToast(`Microphone: ${event.error}`, 'fa-microphone-slash');
        }
      };

      recognition.onend = () => {
        state.isRecording = false;
        if (elements.micBtn) elements.micBtn.classList.remove('recording');
        if (elements.messageInput.value.trim()) {
          showToast('Voice transcription finished.', 'fa-check');
        }
      };

      state.recognitionInstance = recognition;
    } catch (err) {
      console.warn('Speech recognition notice:', err);
    }
  }

  function toggleVoiceInput() {
    if (!state.recognitionInstance) {
      showToast('Voice recognition not supported in this browser.', 'fa-microphone-slash');
      return;
    }

    if (state.isRecording) {
      state.recognitionInstance.stop();
    } else {
      try {
        state.recognitionInstance.start();
      } catch (err) {
        state.recognitionInstance.stop();
      }
    }
  }

  // --------------------------------------------------------------------------
  // 16. Event Listeners Setup
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Critical guard: if input elements are missing, nothing works
    if (!elements.messageInput || !elements.sendBtn) {
      console.error('[DesignNova] setupEventListeners: messageInput or sendBtn is null. Check IDs in HTML.');
      return;
    }

    // Input typing → enable/disable send button
    elements.messageInput.addEventListener('input', updateInputState);

    // Send button click
    elements.sendBtn.addEventListener('click', () => {
      handleSendMessage();
    });

    // Enter to send, Shift+Enter for new line
    elements.messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!elements.sendBtn.disabled) {
          handleSendMessage();
        }
      }
    });

    // Also listen for 'change' as fallback for some browsers
    elements.messageInput.addEventListener('change', updateInputState);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        createNewChat();
      }
    });

    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (elements.speechToggleBtn) {
      elements.speechToggleBtn.addEventListener('click', toggleTtsVoice);
    }

    if (elements.newChatBtn) {
      elements.newChatBtn.addEventListener('click', createNewChat);
    }
    if (elements.topbarNewChat) {
      elements.topbarNewChat.addEventListener('click', createNewChat);
    }

    // Quick Mode Chips in Sidebar
    elements.modeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const mode = chip.dataset.mode;
        const promptMap = {
          resume: 'Create a professional resume for a Senior Software Engineer',
          portfolio: 'Build a personal developer portfolio website with responsive sections',
          logo: 'Design a modern logo for a creative studio named NovaCraft',
          poster: 'Design an event poster for Global Tech Summit 2026',
          website: 'Design a modern SaaS landing page hero section with glassmorphism',
          presentation: 'Create a 4-slide presentation on The Future of AI'
        };
        const p = promptMap[mode] || 'Create a design prototype';
        elements.messageInput.value = p;
        updateInputState();
        handleSendMessage();
      });
    });

    // Search Box
    if (elements.chatSearchInput) {
      elements.chatSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (elements.searchClearBtn) {
          elements.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderSidebarHistory();
      });
    }

    if (elements.searchClearBtn) {
      elements.searchClearBtn.addEventListener('click', () => {
        if (elements.chatSearchInput) elements.chatSearchInput.value = '';
        state.searchQuery = '';
        elements.searchClearBtn.style.display = 'none';
        renderSidebarHistory();
      });
    }

    // Clear All
    if (elements.clearAllBtn) {
      elements.clearAllBtn.addEventListener('click', openClearAllModal);
    }
    if (elements.cancelClearBtn) {
      elements.cancelClearBtn.addEventListener('click', closeClearAllModal);
    }
    if (elements.proceedClearBtn) {
      elements.proceedClearBtn.addEventListener('click', executeClearAll);
    }

    // Export Chat
    if (elements.exportChatBtn) {
      elements.exportChatBtn.addEventListener('click', exportActiveChat);
    }

    // Sidebar Mobile Drawer
    if (elements.toggleSidebarBtn) {
      elements.toggleSidebarBtn.addEventListener('click', openMobileSidebar);
    }
    if (elements.closeSidebarBtn) {
      elements.closeSidebarBtn.addEventListener('click', closeMobileSidebar);
    }
    if (elements.sidebarOverlay) {
      elements.sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Attach File
    if (elements.attachBtn && elements.fileInput) {
      elements.attachBtn.addEventListener('click', () => elements.fileInput.click());
      elements.fileInput.addEventListener('change', handleFileSelected);
    }

    if (elements.removeFileBtn) {
      elements.removeFileBtn.addEventListener('click', clearAttachedFile);
    }

    // Voice Input Mic
    if (elements.micBtn) {
      elements.micBtn.addEventListener('click', toggleVoiceInput);
    }

    // Suggestion Cards
    elements.suggestionCards.forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.dataset.prompt;
        if (prompt) {
          elements.messageInput.value = prompt;
          updateInputState();
          handleSendMessage();
        }
      });
    });

    // Quick Chips
    elements.quickChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.dataset.prompt;
        if (prompt) {
          elements.messageInput.value = prompt;
          updateInputState();
          elements.messageInput.focus();
        }
      });
    });

    // Studio Preview Modal Close
    if (elements.closeStudioModalBtn) {
      elements.closeStudioModalBtn.addEventListener('click', closeStudioPreviewModal);
    }
    if (elements.closeEditDrawerBtn) {
      elements.closeEditDrawerBtn.addEventListener('click', () => {
        elements.studioEditDrawer.style.display = 'none';
        elements.studioEditBtn.classList.remove('active');
      });
    }

    // Viewport Device Toggles
    elements.deviceToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.deviceToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeViewportMode = btn.dataset.viewport;
        const wrapper = document.getElementById('studioIframeWrapper');
        if (wrapper) {
          wrapper.className = `studio-iframe-wrapper viewport-${state.activeViewportMode}`;
        }
      });
    });

    // Global Run Code Button delegate
    document.addEventListener('click', (e) => {
      const runBtn = e.target.closest('.run-code-btn');
      if (runBtn) {
        const code = decodeURIComponent(runBtn.dataset.code || '');
        openStudioPreviewModal('code-run', 'website', { title: 'Code Live Sandbox', html: code });
      }
    });

    // Info Modal & Tabs
    if (elements.infoBtn) {
      elements.infoBtn.addEventListener('click', openInfoModal);
    }
    if (elements.closeInfoModalBtn) {
      elements.closeInfoModalBtn.addEventListener('click', closeInfoModal);
    }
    if (elements.confirmModalBtn) {
      elements.confirmModalBtn.addEventListener('click', closeInfoModal);
    }

    setupModalTabs();

    // Escape Key to dismiss overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeStudioPreviewModal();
        closeInfoModal();
        closeClearAllModal();
        closeMobileSidebar();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileSidebar();
    });
  }

  // --------------------------------------------------------------------------
  // 17. Bootstrap Application
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeData);
  } else {
    initializeData();
  }

})();
