import { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar.jsx';
import { HeroSection } from './components/sections/HeroSection.jsx';
import { AboutSection } from './components/sections/AboutSection.jsx';
import { SkillsSection } from './components/sections/SkillsSection.jsx';
import { ProjectsSection } from './components/sections/ProjectsSection.jsx';
import { JourneySection } from './components/sections/JourneySection.jsx';
import { CertificationSection } from './components/sections/CertificationSection.jsx';
import { QuoteSection } from './components/sections/QuoteSection.jsx';
import { ContactSection } from './components/sections/ContactSection.jsx';
import { Footer } from './components/sections/Footer.jsx';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <div className="relative overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.14),_transparent_22%)] dark:opacity-50" />
      <div className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <CertificationSection />
        <QuoteSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}

export default App;
