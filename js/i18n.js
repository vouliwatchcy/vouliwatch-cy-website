// i18n - Lightweight internationalization
const i18n = {
  currentLang: localStorage.getItem('vouliwatch-lang') || 'el',
  
  messages: {
    el: {
      nav: {
        home: 'Αρχική',
        sessions: 'Συνεδρίες',
        about: 'Τι είναι το VouliWatch',
        language: 'EN'
      },
      hero: {
        label: 'Τελευταία Συνεδρία',
        swipeHint: '← Σύρε για να δεις όλα τα θέματα →',
        topicCounter: 'από',
        youtubeButton: 'Δες στο YouTube',
        fullSummaryButton: 'Δες την πλήρη σύνοψη'
      },
      previousSessions: {
        title: 'Προηγούμενες Συνεδρίες',
        viewAll: 'Δες όλες →',
        topicsLabel: 'Θέματα/Αποφάσεις',
        approved: 'εγκρίθηκαν',
        postponed: 'αναβλήθηκαν',
        rejected: 'απορρίφθηκαν',
        withdrawn: 'αποσύρθηκαν'
      },
      about: {
        title: 'Τι είναι το VouliWatch CY',
        description: 'Το VouliWatch CY είναι ένα civic-tech project που παρακολουθεί τη Βουλή των Αντιπροσώπων της Κύπρου και εξηγεί τη νομοθετική δραστηριότητα με απλή, κατανοητή γλώσσα για τους πολίτες.',
        pillar1Title: 'Διαφάνεια',
        pillar1Desc: '"Τι έγινε στη βουλή εύκολα και γρήγορα"',
        pillar2Title: 'Εξοικονόμηση χρόνου',
        pillar2Desc: 'Δεν χρειάζεται να παρακολουθείς ώρες βίντεο',
        pillar3Title: 'Απλή γλώσσα',
        pillar3Desc: 'Χωρίς νομικούς όρους και γραφειοκρατία',
        pillar4Title: 'Τεκμηρίωση',
        pillar4Desc: 'Κάθε απόφαση συνοδεύεται από αποδείξεις'
      },
      howItWorks: {
        title: 'Πώς λειτουργεί',
        step1: 'Κάθε Πέμπτη ανεβαίνει στο YouTube η συνεδρία Ολομέλειας',
        step2: 'Συλλέγουμε υπότιτλους και PDF ημερήσιας διάταξης',
        step3: 'Τα δεδομένα τροφοδοτούνται σε AI μοντέλο',
        step4: 'Το AI παράγει σαφή σύνοψη θεμάτων και αποφάσεων',
        step5: 'Δημοσιεύεται στο Instagram, Telegram και vouliwatch.cy',
        note: 'Το project βρίσκεται σε πιλοτική φάση. Ενδέχεται να υπάρχουν ανακρίβειες.'
      },
      disclaimer: {
        title: '⚠️ Πιλοτική Φάση',
        text: 'Το VouliWatch CY παράγει αποτελέσματα με τη βοήθεια AI. Γίνεται πάντα προσπάθεια διασταύρωσης με επίσημες πηγές, αλλά ενδέχεται να υπάρχουν λάθη. Αν εντοπίσετε κάτι ανακριβές, επικοινωνήστε μαζί μας.'
      },
      footer: {
        tagline: '<i>"Τι έγινε στη βουλή εύκολα και γρήγορα"</i>',
        instagram: 'Instagram',
        telegram: 'Telegram',
        contact: 'Contact',
        email: 'vouliwatchcy@gmail.com',
        legal: 'Νομική σημείωση',
        builtWith: 'Κατασκευάστηκε με ❤️ για τη κυπριακή δημοκρατία',
        copyright: '© 2026 VouliWatch CY. Νομική σημείωση'
      },
      sessions: {
        title: 'Όλες οι Συνεδρίες',
        noSessions: 'Δεν βρέθηκαν συνεδρίες'
      },
      sessionDetail: {
        plainLanguage: 'Με απλά λόγια',
        votes: 'Ψηφοφορία',
        for: 'Υπέρ',
        against: 'Κατά',
        abstain: 'Αποχές',
        evidence: 'Απόδειξη',
        certainty: 'Βεβαιότητα',
        whyMatters: 'Γιατί έχει σημασία',
        pdf: 'PDF',
        page: 'σελ.',
        back: 'Πίσω',
        previous: 'Προηγούμενη',
        next: 'Επόμενη'
      },
      status: {
        approved: 'Εγκρίθηκε',
        postponed: 'Αναβλήθηκε',
        rejected: 'Απορρίφθηκε',
        withdrawn: 'Αποσύρθηκε'
      },
      certainty: {
        high: 'Υψηλό',
        medium: 'Μέτριο',
        low: 'Χαμηλό'
      },
      colors: {
        high: '#22c55e',
        medium: '#eab308',
        low: '#ef4444'
      }
    },
    en: {
      nav: {
        home: 'Home',
        sessions: 'Sessions',
        about: 'About VouliWatch',
        language: 'EL'
      },
      hero: {
        label: 'Latest Session',
        swipeHint: '← Swipe to see all topics →',
        topicCounter: 'of',
        youtubeButton: 'Watch on YouTube',
        fullSummaryButton: 'View full summary'
      },
      previousSessions: {
        title: 'Previous Sessions',
        viewAll: 'View all →',
        topicsLabel: 'Topics/Decisions',
        approved: 'approved',
        postponed: 'postponed',
        rejected: 'rejected',
        withdrawn: 'withdrawn'
      },
      about: {
        title: 'About VouliWatch CY',
        description: 'VouliWatch CY is a civic-tech project that tracks the Cyprus House of Representatives and explains parliamentary activity in plain language for citizens.',
        pillar1Title: 'Transparency',
        pillar1Desc: '"What happened in parliament easily and quickly"',
        pillar2Title: 'Time-saving',
        pillar2Desc: 'No need to watch hours of video',
        pillar3Title: 'Plain language',
        pillar3Desc: 'No legal jargon or bureaucracy',
        pillar4Title: 'Evidence',
        pillar4Desc: 'Every decision comes with proof'
      },
      howItWorks: {
        title: 'How it works',
        step1: 'Every Thursday, the plenary session is uploaded to YouTube',
        step2: 'We collect subtitles and agenda PDFs',
        step3: 'Data is fed into an AI model',
        step4: 'AI generates clear summaries of topics and decisions',
        step5: 'Published on Instagram, Telegram, and vouliwatch.cy',
        note: 'This project is in pilot phase. There may be inaccuracies.'
      },
      disclaimer: {
        title: '⚠️ Pilot Phase',
        text: 'VouliWatch CY produces results with AI assistance. We always try to cross-check with official sources, but errors may occur. If you find something inaccurate, please contact us.'
      },
      footer: {
        tagline: '<i>"What happened in parliament easily and quickly"</i>',
        instagram: 'Instagram',
        telegram: 'Telegram',
        contact: 'Contact',
        email: 'vouliwatchcy@gmail.com',
        legal: 'Legal notice',
        builtWith: 'Built with ❤️ for Cypriot democracy',
        copyright: '© 2026 VouliWatch CY. Legal notice'
      },
      sessions: {
        title: 'All Sessions',
        noSessions: 'No sessions found'
      },
      sessionDetail: {
        plainLanguage: 'Plain language',
        votes: 'Votes',
        for: 'For',
        against: 'Against',
        abstain: 'Abstain',
        evidence: 'Evidence',
        certainty: 'Certainty',
        whyMatters: 'Why it matters',
        pdf: 'PDF',
        page: 'p.',
        back: 'Back',
        previous: 'Previous',
        next: 'Next'
      },
      status: {
        approved: 'Approved',
        postponed: 'Postponed',
        rejected: 'Rejected',
        withdrawn: 'Withdrawn'
      },
      certainty: {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      colors: {
        high: '#22c55e',
        medium: '#eab308',
        low: '#ef4444'
      }
    }
  },
  
  t(key) {
    const keys = key.split('.');
    let value = this.messages[this.currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  },
  
  setLanguage(lang) {
    if (lang === 'el' || lang === 'en') {
      this.currentLang = lang;
      localStorage.setItem('vouliwatch-lang', lang);
      document.documentElement.lang = lang;
    }
  },
  
  toggleLanguage() {
    this.setLanguage(this.currentLang === 'el' ? 'en' : 'el');
  }
};

// Set initial language
document.documentElement.lang = i18n.currentLang;
