import type { CSSProperties } from 'react';
import { people, DENIM_BG } from '../data/portfolioData';

interface Props {
  onOpen: (id: string) => void;
}

export default function HomePage({ onOpen }: Props) {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${DENIM_BG})` }}>
      <div className="bg-overlay" />
      <div className="denim-tex" />
      <div className="stitch-border" />
      <div className="home-vignette" aria-hidden />

      <div className="home-content">
        <div className="receipt-hdr">
          <div className="rh-title">PORTFOLIOS</div>
          <div className="rh-sub">CLASS COLLECTION</div>
          <hr className="rh-hr" />
          <div className="rh-tap">TAP A PHOTO TO OPEN</div>
        </div>

        <div className="home-polaroids">
          {people.map((person, index) => (
            <div
              key={person.id}
              className="pol"
              style={{ '--pol-i': index } as CSSProperties}
              onClick={() => onOpen(person.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpen(person.id)}
            >
              <div className="tape" />
              <div className="pol-img">
                <div className="pol-bg" style={{ backgroundImage: `url(${DENIM_BG})` }} />
                <div className="pol-ov" style={{ background: person.overlayColor }} />
                <span className="pol-initial">{person.initial}</span>
              </div>
              <div className="pol-name">{person.displayName}</div>
            </div>
          ))}
        </div>

        <div className="hint">
          <span>✦ tap any polaroid to open ✦</span>
        </div>
      </div>

      <div className="star-a" aria-hidden />
      <div className="star-b" aria-hidden />
    </div>
  );
}
