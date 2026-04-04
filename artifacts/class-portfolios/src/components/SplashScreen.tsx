import { useEffect, useState } from 'react';
import { DENIM_BG } from '../data/portfolioData';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 2800);
    const doneTimer = setTimeout(() => onDone(), 3500);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash${hiding ? ' hiding' : ''}`}>
      <div className="splash-bg" style={{ backgroundImage: `url(${DENIM_BG})` }} />
      <div className="splash-content">
        <div className="splash-stars">
          <div className="splash-star" />
          <div className="splash-star" />
          <div className="splash-star" />
        </div>
        <div className="splash-receipt">
          <div className="splash-title">PORTFOLIOS</div>
          <div className="splash-sub">CLASS COLLECTION</div>
          <hr className="splash-hr" />
          <div className="splash-tagline">Loading your files...</div>
          <div className="splash-gems">
            {[0, 1, 2, 3, 4].map(i => <div key={i} className="gem" />)}
          </div>
        </div>
        <div className="splash-hint">✦ TAP ANY POLAROID TO OPEN ✦</div>
      </div>
    </div>
  );
}
