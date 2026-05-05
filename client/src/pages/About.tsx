import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              {t('about.title')}
            </h1>
            <p className="text-gold-light text-lg max-w-2xl">
              {t('about.description')}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Mission */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                🎯 Η Αποστολή Μας
              </h2>
              <p className="text-lg text-text leading-relaxed mb-4">
                Το VouliWatch CY δημιουργήθηκε με στόχο να κάνει τη Βουλή των Αντιπροσώπων της Κύπρου πιο κατανοητή και προσβάσιμη σε όλους τους πολίτες. Πιστεύουμε ότι η διαφάνεια και η πληροφόρηση είναι θεμέλιο της δημοκρατίας.
              </p>
              <p className="text-lg text-text leading-relaxed">
                Χρησιμοποιούμε τεχνολογία και AI για να μετατρέψουμε πολύωρα βίντεο συνεδριάσεων σε σαφείς, σύντομες συνόψεις που εξηγούν τι αποφάσισε η Βουλή και γιατί αυτό σημαίνει για εσάς.
              </p>
            </div>

            {/* Four Pillars */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-navy mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
                🏛️ Οι Τέσσερις Στύλοι Μας
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🔍',
                    title: t('about.pillar1Title'),
                    desc: t('about.pillar1Desc'),
                    detail: 'Δημοσιοποιούμε πληροφορίες που είναι δύσκολο να βρεις αλλιώς. Κάθε απόφαση τεκμηριώνεται με αποδείξεις από τα επίσημα έγγραφα.',
                  },
                  {
                    icon: '⏱️',
                    title: t('about.pillar2Title'),
                    desc: t('about.pillar2Desc'),
                    detail: 'Δεν χρειάζεται να παρακολουθήσεις 6+ ώρες βίντεο. Διαβάζεις τα σημαντικά σε 5 λεπτά.',
                  },
                  {
                    icon: '🗣️',
                    title: t('about.pillar3Title'),
                    desc: t('about.pillar3Desc'),
                    detail: 'Αποφεύγουμε τη νομική ορολογία. Εξηγούμε τι σημαίνει κάθε απόφαση για την καθημερινή ζωή σου.',
                  },
                  {
                    icon: '✅',
                    title: t('about.pillar4Title'),
                    desc: t('about.pillar4Desc'),
                    detail: 'Δεν λέμε "εγκρίθηκε" χωρίς να δείξουμε πού. Κάθε σύνοψη συνδέεται με το βίντεο και τα έγγραφα.',
                  },
                ].map((pillar, idx) => (
                  <div key={idx} className="bg-cream p-6 rounded-lg border border-gray-soft">
                    <p className="text-4xl mb-3">{pillar.icon}</p>
                    <h3 className="text-xl font-bold text-navy mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-3">{pillar.desc}</p>
                    <p className="text-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Work */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-navy mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
                ⚙️ Πώς Δουλεύουμε
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, text: t('howItWorks.step1') },
                  { step: 2, text: t('howItWorks.step2') },
                  { step: 3, text: t('howItWorks.step3') },
                  { step: 4, text: t('howItWorks.step4') },
                  { step: 5, text: t('howItWorks.step5') },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-muted italic mt-6 p-4 bg-cream rounded-lg border-l-4 border-gold">
                {t('howItWorks.note')}
              </p>
            </div>

            {/* Open Source */}
            <div className="bg-cream p-8 rounded-lg border border-gold mb-12">
              <h3 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                💻 Open Source
              </h3>
              <p className="text-text mb-4">
                Το VouliWatch CY είναι ένα open-source project. Ο κώδικας είναι διαθέσιμος στο GitHub για όποιον θέλει να συνεισφέρει ή να το προσαρμόσει για άλλες χώρες.
              </p>
              <a
                href="https://github.com/vouliwatchcy/vouliwatch-cy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Δες το στο GitHub
              </a>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-navy mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                📬 Επικοινωνία
              </h3>
              <p className="text-text mb-6">
                Έχεις ερώτηση ή πρόταση; Επικοίνωνα μαζί μας:
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="https://instagram.com/vouliwatchcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Instagram @vouliwatchcy
                </a>
                <a
                  href="https://t.me/vouliwatchcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Telegram @vouliwatchcy
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
