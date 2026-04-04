import { useCallback, useState } from 'react';
import './portfolio.css';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import PersonPage from './pages/PersonPage';
import { people } from './data/portfolioData';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setActivePage(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActivePage(null);
    window.scrollTo(0, 0);
  };

  const activePerson = people.find(p => p.id === activePage) ?? null;

  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <div className="portfolio-root">
      {!splashDone && <SplashScreen onDone={handleSplashDone} />}
      <div className="app" style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>
        {activePerson ? (
          <PersonPage person={activePerson} onBack={handleBack} />
        ) : (
          <HomePage onOpen={handleOpen} />
        )}
      </div>
    </div>
  );
}
