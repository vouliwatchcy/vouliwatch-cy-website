// Reusable UI Components

const components = {
  navbar() {
    return `
      <nav class="navbar">
        <div class="container">
          <div class="navbar-content">
            <a href="/" class="navbar-logo" data-link>
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#1e3a5f"/>
                <text x="50" y="60" font-size="60" fill="#d4af37" text-anchor="middle" font-weight="bold">Β</text>
              </svg>
              VouliWatch CY
            </a>
            <ul class="navbar-nav">
              <li><a href="/" data-link>${i18n.t('nav.home')}</a></li>
              <li><a href="/sessions" data-link>${i18n.t('nav.sessions')}</a></li>
              <li><a href="/about" data-link>${i18n.t('nav.about')}</a></li>
              <li><button class="lang-toggle" onclick="i18n.toggleLanguage(); location.reload()">${i18n.t('nav.language')}</button></li>
            </ul>
            <button class="hamburger-menu" onclick="document.querySelector('.mobile-menu').classList.toggle('active')">☰</button>
            <ul class="mobile-menu">
              <li><a href="/" data-link>${i18n.t('nav.home')}</a></li>
              <li><a href="/sessions" data-link>${i18n.t('nav.sessions')}</a></li>
              <li><a href="/about" data-link>${i18n.t('nav.about')}</a></li>
              <li><button class="mobile-lang-toggle" onclick="i18n.toggleLanguage(); location.reload()">${i18n.t('nav.language')}</button></li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  },
  
  footer() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>${i18n.t('footer.tagline')}</h3>
              <p>${i18n.t('footer.builtWith')}</p>
            </div>
            <div class="footer-section">
              <h3>Follow</h3>
              <div class="footer-social">
                <a href="https://instagram.com/vouliwatchcy" target="_blank">${i18n.t('footer.instagram')}</a>
                <a href="https://t.me/vouliwatchcy" target="_blank">${i18n.t('footer.telegram')}</a>
              </div>
            </div>
            <div class="footer-section">
              <h3>${i18n.t('footer.contact')}</h3>
              <a href="mailto:vouliwatchcy@gmail.com">vouliwatchcy@gmail.com</a>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 VouliWatch CY. ${i18n.t('footer.legal')}</p>
          </div>
        </div>
      </footer>
    `;
  },
  
  statusBadge(status) {
    const statusMap = {
      'Εγκρίθηκε': 'approved',
      'Approved': 'approved',
      'Αναβλήθηκε': 'postponed',
      'Postponed': 'postponed',
      'Απορρίφθηκε': 'rejected',
      'Rejected': 'rejected',
      'Αποσύρθηκε': 'withdrawn',
      'Withdrawn': 'withdrawn'
    };
    
    const statusClass = statusMap[status] || 'postponed';
    return `<span class="card-status status-${statusClass}">${status}</span>`;
  },
  
  certaintyBadge(level) {
    const levelMap = {
      'Υψηλό': 'high',
      'High': 'high',
      'Μέτριο': 'medium',
      'Medium': 'medium',
      'Χαμηλό': 'low',
      'Low': 'low'
    };
    
    const levelClass = levelMap[level] || 'medium';
    const emoji = levelClass === 'high' ? '🟢' : levelClass === 'medium' ? '🟡' : '🔴';
    
    return `<span class="certainty-badge certainty-${levelClass}">${emoji} ${level}</span>`;
  },
  
  formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(i18n.currentLang === 'el' ? 'el-GR' : 'en-US', options);
  }
};

