// Main Application Logic

let sessionsData = {};

// Load sessions data
async function loadSessions() {
  try {
    const response = await fetch('./data/sessions.json');
    if (!response.ok) throw new Error('Failed to load sessions');
    sessionsData = await response.json();
  } catch (error) {
    console.error('Error loading sessions:', error);
    sessionsData = {};
  }
}

// Pages
const pages = {
  async home() {
    const sessions = Object.values(sessionsData).sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestSession = sessions[0];
    
    if (!latestSession) {
      return `${components.navbar()}<div class="container"><p>${i18n.t('sessions.noSessions')}</p></div>${components.footer()}`;
    }
    
    const topics = latestSession.topics || [];
    const topicsHtml = topics.map((topic, idx) => `
      <div class="topic-card">
        <div class="card-date">${components.formatDate(latestSession.date)}</div>
        ${components.statusBadge(topic.status)}
        <h3 class="card-title">${topic.title}</h3>
        <p class="card-description">${topic.simple}</p>
        <div class="card-meta">
          ${topic.votes ? `
            <div class="card-votes">
              <span class="vote-badge">✓ ${topic.votes.for}</span>
              <span class="vote-badge">✗ ${topic.votes.against}</span>
              <span class="vote-badge">– ${topic.votes.abstain}</span>
            </div>
          ` : ''}
          ${topic.certainty ? `<div>${components.certaintyBadge(topic.certainty)}</div>` : ''}
        </div>
        <a href="/sessions/${latestSession.id}?topic=${idx}" class="card-link" data-link>${i18n.t('sessionDetail.plainLanguage')} →</a>
      </div>
    `).join('');
    
    const previousSessions = sessions.slice(1, 6).map(session => `
      <div class="session-card">
        <div class="session-date">${components.formatDate(session.date)}</div>
        <h3 class="session-title">${session.title}</h3>
        <p class="session-summary">${session.summary}</p>
        <div class="session-stats">
          ${session.topics ? `<div class="stat"><span class="stat-number">${session.topics.length}</span> <span>${i18n.t('previousSessions.topicsLabel')}</span></div>` : ''}
        </div>
        <a href="/sessions/${session.id}" class="session-link" data-link>${i18n.t('previousSessions.viewAll')}</a>
      </div>
    `).join('');
    
    return `
      ${components.navbar()}
      <div class="hero">
        <div class="container">
          <div class="hero-header">
            <div class="hero-label">${i18n.t('hero.label')}</div>
            <h1 class="hero-title">${i18n.t('hero.label')} — ${components.formatDate(latestSession.date)}</h1>
            <p class="hero-subtitle">${i18n.t('hero.swipeHint')}</p>
          </div>
          
          <div class="swipe-deck">
            <div class="deck-counter">${1} ${i18n.t('hero.topicCounter')} ${topics.length}</div>
            <div class="deck-container" id="deck">
              ${topicsHtml}
            </div>
          </div>
          
          <div class="hero-buttons">
            ${latestSession.youtube ? `<a href="${latestSession.youtube}" target="_blank" class="btn btn-primary">${i18n.t('hero.youtubeButton')}</a>` : ''}
            <a href="/sessions/${latestSession.id}" class="btn btn-secondary" data-link>${i18n.t('hero.fullSummaryButton')}</a>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="container">
          <h2 class="section-title">${i18n.t('previousSessions.title')}</h2>
          <div class="sessions-grid">
            ${previousSessions}
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="container">
          <h2 class="section-title">${i18n.t('about.title')}</h2>
          <div class="about-content">
            <p class="about-description">${i18n.t('about.description')}</p>
            
            <div class="pillars">
              <div class="pillar">
                <div class="pillar-icon">🏛️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar1Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar1Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">⏱️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar2Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar2Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">🗣️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar3Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar3Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">✅</div>
                <h3 class="pillar-title">${i18n.t('about.pillar4Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="disclaimer">
        <h3 class="disclaimer-title">${i18n.t('disclaimer.title')}</h3>
        <p class="disclaimer-text">${i18n.t('disclaimer.text')}</p>
      </div>
      
      ${components.footer()}
    `;
  },
  
  async sessions() {
    const sessions = Object.values(sessionsData).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (sessions.length === 0) {
      return `${components.navbar()}<div class="container"><p>${i18n.t('sessions.noSessions')}</p></div>${components.footer()}`;
    }

    const locale = i18n.currentLang === 'el' ? 'el-GR' : 'en-US';

    // Group sessions by year-month
    const groups = {};
    sessions.forEach(session => {
      const [year, month] = session.date.split('-');
      const key = `${year}-${month}`;
      if (!groups[key]) {
        const d = new Date(parseInt(year), parseInt(month) - 1, 1);
        groups[key] = {
          label: d.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
          sessions: []
        };
      }
      groups[key].sessions.push(session);
    });

    const groupsHtml = Object.entries(groups).map(([, group]) => `
      <div class="sessions-group">
        <h2 class="sessions-group-header">${group.label}</h2>
        <div class="sessions-grid">
          ${group.sessions.map(session => `
            <div class="session-card">
              <div class="session-date">${components.formatDate(session.date)}</div>
              <h3 class="session-title">${session.title}</h3>
              <p class="session-summary">${session.summary}</p>
              <div class="session-stats">
                ${session.topics ? `<div class="stat"><span class="stat-number">${session.topics.length}</span> <span>${i18n.t('previousSessions.topicsLabel')}</span></div>` : ''}
              </div>
              <a href="/sessions/${session.id}" class="session-link" data-link>${i18n.t('previousSessions.viewAll')}</a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    return `
      ${components.navbar()}
      <div class="section">
        <div class="container">
          <h1 class="section-title">${i18n.t('sessions.title')}</h1>
          ${groupsHtml}
        </div>
      </div>
      ${components.footer()}
    `;
  },
  
  async sessionDetail(id) {
    const session = sessionsData[id];
    
    if (!session) {
      return `${components.navbar()}<div class="container"><p>${i18n.t('sessions.noSessions')}</p></div>${components.footer()}`;
    }
    
    const topicsHtml = (session.topics || []).map((topic, idx) => `
      <div class="topic-detail">
        <div style="display: flex; gap: 1rem; align-items: start; margin-bottom: 1rem;">
          ${components.statusBadge(topic.status)}
          ${topic.certainty ? `<div>${components.certaintyBadge(topic.certainty)}</div>` : ''}
        </div>
        
        <h2 class="topic-detail-title">${topic.title}</h2>
        
        <div class="topic-detail-section">
          <h3 class="topic-detail-section-title">${i18n.t('sessionDetail.plainLanguage')}</h3>
          <p class="topic-detail-section-content">${topic.simple}</p>
        </div>
        
        ${topic.votes ? `
          <div class="topic-detail-section">
            <h3 class="topic-detail-section-title">${i18n.t('sessionDetail.votes')}</h3>
            <div class="votes-display">
              <div class="vote-item">
                <span class="vote-number">${topic.votes.for}</span>
                <span class="vote-label">${i18n.t('sessionDetail.for')}</span>
              </div>
              <div class="vote-item">
                <span class="vote-number">${topic.votes.against}</span>
                <span class="vote-label">${i18n.t('sessionDetail.against')}</span>
              </div>
              <div class="vote-item">
                <span class="vote-number">${topic.votes.abstain}</span>
                <span class="vote-label">${i18n.t('sessionDetail.abstain')}</span>
              </div>
            </div>
          </div>
        ` : ''}
        
        ${topic.evidence ? `
          <div class="topic-detail-section">
            <h3 class="topic-detail-section-title">${i18n.t('sessionDetail.evidence')}</h3>
            <p class="topic-detail-section-content">${topic.evidence}</p>
          </div>
        ` : ''}
        
        ${topic.why_matters ? `
          <div class="topic-detail-section">
            <h3 class="topic-detail-section-title">${i18n.t('sessionDetail.whyMatters')}</h3>
            <p class="topic-detail-section-content">${topic.why_matters}</p>
          </div>
        ` : ''}
        
        ${topic.pdf ? `
          <div class="topic-detail-section">
            <h3 class="topic-detail-section-title">${i18n.t('sessionDetail.pdf')}</h3>
            <p class="topic-detail-section-content">${topic.pdf}${topic.pdf_pages ? ` - ${i18n.t('sessionDetail.page')} ${topic.pdf_pages}` : ''}</p>
          </div>
        ` : ''}
      </div>
    `).join('');
    
    return `
      ${components.navbar()}
      <div class="session-detail">
        <div class="container">
          <a href="/sessions" class="btn btn-outline" data-link style="margin-bottom: 2rem;">← ${i18n.t('sessionDetail.back')}</a>

          <div class="session-header">
            <h1 class="session-header-title">${session.title}</h1>
            <p class="session-header-date">${components.formatDate(session.date)}</p>
            ${session.youtube ? `<a href="${session.youtube}" target="_blank" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">▶ ${i18n.t('hero.youtubeButton')}</a>` : ''}
          </div>
          
          ${session.summary ? `
            <div class="section">
              <h2>${i18n.t('hero.label')}</h2>
              <p>${session.summary}</p>
            </div>
          ` : ''}
          
          <div class="section">
            <h2>${i18n.t('previousSessions.title')}</h2>
            <div class="topics-list">
              ${topicsHtml}
            </div>
          </div>
        </div>
      </div>
      ${components.footer()}
    `;
  },
  
  async about() {
    return `
      ${components.navbar()}
      <div class="section">
        <div class="container">
          <div class="about-content">
            <h1>${i18n.t('about.title')}</h1>
            <p class="about-description">${i18n.t('about.description')}</p>
            
            <h2>${i18n.t('about.pillar1Title')}</h2>
            <div class="pillars">
              <div class="pillar">
                <div class="pillar-icon">🏛️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar1Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar1Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">⏱️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar2Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar2Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">🗣️</div>
                <h3 class="pillar-title">${i18n.t('about.pillar3Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar3Desc')}</p>
              </div>
              <div class="pillar">
                <div class="pillar-icon">✅</div>
                <h3 class="pillar-title">${i18n.t('about.pillar4Title')}</h3>
                <p class="pillar-description">${i18n.t('about.pillar4Desc')}</p>
              </div>
            </div>
            
            <h2>${i18n.t('howItWorks.title')}</h2>
            <div class="how-it-works">
              <div class="steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <p class="step-title">${i18n.t('howItWorks.step1')}</p>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <p class="step-title">${i18n.t('howItWorks.step2')}</p>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <p class="step-title">${i18n.t('howItWorks.step3')}</p>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <p class="step-title">${i18n.t('howItWorks.step4')}</p>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <p class="step-title">${i18n.t('howItWorks.step5')}</p>
                </div>
              </div>
              <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--neutral-600);">${i18n.t('howItWorks.note')}</p>
            </div>
            
            <div class="disclaimer">
              <h3 class="disclaimer-title">${i18n.t('disclaimer.title')}</h3>
              <p class="disclaimer-text">${i18n.t('disclaimer.text')}</p>
            </div>
          </div>
        </div>
      </div>
      ${components.footer()}
    `;
  },
  
  async notFound() {
    return `
      ${components.navbar()}
      <div class="section">
        <div class="container text-center">
          <h1>404 - ${i18n.t('sessions.noSessions')}</h1>
          <p style="margin-bottom: 2rem;">The page you're looking for doesn't exist.</p>
          <a href="/" class="btn btn-primary" data-link>${i18n.t('nav.home')}</a>
        </div>
      </div>
      ${components.footer()}
    `;
  }
};

// Register routes
router.register('/', pages.home);
router.register('/sessions', pages.sessions);
router.register('/about', pages.about);
router.register('/404', pages.notFound);

// Handle dynamic session detail routes
router.routes['/sessions/:id'] = async function() {
  const id = window.location.pathname.split('/')[2];
  return pages.sessionDetail(id);
};

// Override render to handle dynamic routes
const originalRender = router.render.bind(router);
router.render = async function() {
  const path = window.location.pathname;
  
  // Check for session detail route
  if (path.startsWith('/sessions/') && path !== '/sessions') {
    const id = decodeURIComponent(path.split('/')[2]);
    const content = await pages.sessionDetail(id);
    document.getElementById('app').innerHTML = content;
    window.scrollTo(0, 0);
    return;
  }
  
  // Use standard routing
  const handler = this.routes[path] || this.routes['/404'];
  if (handler) {
    const content = await handler();
    document.getElementById('app').innerHTML = content;
    window.scrollTo(0, 0);
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
  await loadSessions();
  router.init();
});
