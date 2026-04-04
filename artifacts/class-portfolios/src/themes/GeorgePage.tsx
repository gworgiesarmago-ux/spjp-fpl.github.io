import { useState, type CSSProperties } from 'react';
import { PersonData } from '../data/portfolioData';
import SectionBody from '../components/SectionBody';
import Lightbox from '../components/Lightbox';
import PdfLightbox from '../components/PdfLightbox';
import LakersGameTracker from '../components/LakersGameTracker';

interface Props {
  person: PersonData;
  onBack: () => void;
}

const SECTION_ICONS: Record<string, string> = {
  prologue: '🏀', toc: '📋', bionote: '🏆', talumpati: '🎤',
  sanaysay: '📝', liham: '📜', resume: '⭐', proyekto: '🔥',
  'app-letter': '📜', 'panukala': '🔥', epilogue: '👑',
};

export default function GeorgePage({ person, onBack }: Props) {
  const initialOpen: Record<string, boolean> = {};
  person.sections.forEach(s => { initialOpen[s.id] = s.defaultOpen ?? false; });
  const [open, setOpen] = useState(initialOpen);
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));
  const BASE = import.meta.env.BASE_URL;

  return (
    <>
      <style>{`
        .gp-page {
          min-height: 100vh;
          background: #0d0521;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(253,185,39,0.07) 59px, rgba(253,185,39,0.07) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(253,185,39,0.07) 59px, rgba(253,185,39,0.07) 60px);
          padding-bottom: 50px;
          font-family: system-ui, sans-serif;
        }
        @keyframes gpArenaIn {
          from { opacity: 0; transform: perspective(520px) rotateX(7deg) translateY(24px); filter: blur(4px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes gpRowIn {
          from { opacity: 0; transform: translateX(40px) scale(0.96); }
          to { opacity: 1; transform: none; }
        }
        .gp-hdr {
          background: linear-gradient(180deg, #1a0533 0%, #0d0521 100%);
          border-bottom: 3px solid #FDB927;
          padding: 0 0 0;
          position: relative;
          overflow: hidden;
          animation: gpArenaIn 0.68s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .gp-enter-block {
          animation: gpRowIn 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--enter-delay, 0s);
        }
        .gp-footer-animate {
          animation: gpRowIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--footer-delay, 0.5s);
        }
        .gp-hdr-top {
          display: flex; align-items: stretch;
          min-height: 160px;
        }
        .gp-lebron-wrap {
          position: relative; overflow: hidden; flex-shrink: 0;
          width: 130px;
        }
        .gp-lebron {
          width: 130px; height: 180px; object-fit: cover; object-position: top center;
          display: block;
          filter: saturate(1.1) contrast(1.05);
        }
        .gp-lebron-fade {
          position: absolute; right: 0; top: 0; bottom: 0; width: 40px;
          background: linear-gradient(to right, transparent, #0d0521);
        }
        .gp-hdr-info {
          flex: 1; padding: 18px 16px 18px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .gp-number {
          font-size: 52px; font-weight: 900; line-height: 1;
          color: #FDB927;
          text-shadow: 0 0 30px rgba(253,185,39,0.5);
          font-style: italic;
          animation: gp-pulse 3s ease-in-out infinite;
        }
        @keyframes gp-pulse {
          0%, 100% { text-shadow: 0 0 20px rgba(253,185,39,0.4); }
          50% { text-shadow: 0 0 40px rgba(253,185,39,0.8); }
        }
        .gp-name {
          font-size: 15px; font-weight: 800; color: white;
          text-transform: uppercase; letter-spacing: 1px; line-height: 1.2;
          margin-top: 4px;
        }
        .gp-team {
          font-size: 11px; color: #FDB927; text-transform: uppercase;
          letter-spacing: 2px; margin-top: 4px;
        }
        .gp-back {
          position: absolute; top: 14px; right: 14px;
          background: #FDB927; border: none; color: #0d0521;
          border-radius: 6px; padding: 6px 14px;
          font-weight: 800; font-size: 13px; text-transform: uppercase;
          cursor: pointer; letter-spacing: 0.5px;
          transition: background 0.2s, transform 0.2s;
        }
        .gp-back:hover { background: #e8a800; transform: scale(1.04); }
        .gp-scoreboard {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(253,185,39,0.2);
          border-top: 1px solid rgba(253,185,39,0.3);
        }
        .gp-score-cell {
          background: #130630; padding: 10px 14px;
        }
        .gp-score-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 2px;
          color: #FDB927; font-weight: 700;
        }
        .gp-score-val {
          font-size: 13px; color: white; font-weight: 600; margin-top: 3px;
        }
        .gp-sec {
          margin: 12px 12px 0;
          background: #130630;
          border: 1px solid rgba(253,185,39,0.25);
          border-left: 4px solid #FDB927;
          border-radius: 4px;
          overflow: hidden;
        }
        .gp-sec-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; cursor: pointer;
          background: linear-gradient(90deg, #1a0a40, #130630);
          user-select: none; transition: background 0.2s;
        }
        .gp-sec-hdr:hover { background: linear-gradient(90deg, #220d50, #1a0a40); }
        .gp-sec-icon { font-size: 18px; }
        .gp-sec-title {
          flex: 1; font-size: 14px; font-weight: 800; color: #FDB927;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .gp-arrow {
          width: 20px; height: 20px; border-radius: 50%;
          background: #FDB927; display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: #0d0521; font-weight: 900;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .gp-arrow.open { transform: rotate(90deg); }
        .gp-body { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .gp-body.open { max-height: 3000px; }
        .gp-inner { padding: 16px 18px 20px; }
        .gp-always {
          margin: 12px 12px 0;
          background: #130630;
          border: 1px solid rgba(253,185,39,0.25);
          border-left: 4px solid #552583;
          border-radius: 4px;
          padding: 16px 18px 20px;
        }
        .gp-always-title {
          font-size: 14px; font-weight: 800; color: #FDB927;
          text-transform: uppercase; letter-spacing: 0.5px;
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .gp-pdf-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #FDB927, #e8a800);
          color: #0d0521; border: none; border-radius: 6px;
          padding: 12px 22px; font-size: 13px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.5px;
          cursor: pointer; margin-top: 10px;
          box-shadow: 0 4px 16px rgba(253,185,39,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gp-pdf-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 24px rgba(253,185,39,0.5); }
        .gp-page .si { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
        .gp-page .dot { width: 8px; height: 8px; border-radius: 50%; background: #FDB927; flex-shrink: 0; margin-top: 5px; }
        .gp-page .st { font-size: 13px; color: rgba(255,255,255,0.9); }
        .gp-page .sn { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 3px; line-height: 1.6; }
        .gp-page .essay-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(253,185,39,0.3);
          color: rgba(255,255,255,0.92);
        }
        .gp-page .essay-box p { color: rgba(255,255,255,0.88); font-size: 13px; line-height: 1.85; margin-bottom: 10px; }
        .gp-page .essay-sig { color: #FDB927; font-style: italic; }
        .gp-page .st strong { color: #ffe08a; font-weight: 700; }
        .gp-page .toc-table { width: 100%; }
        .gp-page .toc-row {
          display: flex; justify-content: space-between;
          border-bottom: 1px solid rgba(253,185,39,0.2); padding: 8px 0;
          font-size: 12.5px; color: rgba(255,255,255,0.8);
        }
        .gp-page .thumb { border: 2px solid #FDB927; }
        .gp-page .thumb-btn { color: #FDB927; font-size: 11px; text-align: center; margin-top: 4px; }
        .gp-basketball-spin {
          position: absolute; bottom: 10px; right: 10px;
          font-size: 28px; animation: gp-spin 4s linear infinite; opacity: 0.3;
        }
        @keyframes gp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .gp-footer {
          text-align: center; margin-top: 20px; padding: 16px;
          border-top: 1px solid rgba(253,185,39,0.2);
          color: #FDB927; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;
        }
        .gp-nba {
          margin: 8px 12px 18px;
          padding: 8px 12px 10px;
          border-radius: 6px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(253,185,39,0.22);
          font-size: 11px;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
        }
        .gp-nba-live {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 6px 10px;
          margin-bottom: 6px;
          color: #ff5a5a;
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .gp-nba-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff3333;
          box-shadow: 0 0 6px #ff3333;
          animation: gp-nba-pulse 1.1s ease-in-out infinite;
        }
        @keyframes gp-nba-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .gp-nba-score {
          color: rgba(255,255,255,0.95);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: none;
        }
        .gp-nba-detail {
          color: rgba(255,200,120,0.9);
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0.02em;
        }
        .gp-nba-record {
          color: rgba(255,255,255,0.88);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1.4;
        }
        .gp-nba-wl { color: #FDB927; }
        .gp-nba-dot { color: rgba(255,255,255,0.35); margin: 0 4px; }
        .gp-nba-muted { color: rgba(255,255,255,0.45); font-weight: 500; }
        .gp-nba-source {
          margin-top: 6px;
          font-size: 9px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.02em;
        }
        .gp-page .bionote-text { color: rgba(255,255,255,0.88); }
        .gp-page .bionote-name { color: #FDB927; }
        .gp-page .bionote-school { color: rgba(253,185,39,0.55); }
        .gp-page .bionote-bio { color: rgba(255,255,255,0.82); }
        @media (prefers-reduced-motion: reduce) {
          .gp-hdr, .gp-enter-block, .gp-footer-animate { animation: none; }
        }
      `}</style>
      <div className="gp-page">
        <div className="gp-hdr">
          <button className="gp-back" onClick={onBack}>← Back</button>
          <div className="gp-hdr-top">
            <div className="gp-lebron-wrap">
              <img className="gp-lebron" src={`${BASE}lebron.png`} alt="LeBron" />
              <div className="gp-lebron-fade" />
            </div>
            <div className="gp-hdr-info">
              <div className="gp-number">#23</div>
              <div className="gp-name">{person.fullName}</div>
              <div className="gp-team">Los Angeles Lakers · Grade 11 - SPJP (ABM)</div>
            </div>
          </div>
          <div className="gp-scoreboard">
            <div className="gp-score-cell">
              <div className="gp-score-label">Portfolio Title</div>
              <div className="gp-score-val">{person.card.portfolioTitle}</div>
            </div>
            <div className="gp-score-cell">
              <div className="gp-score-label">Grade &amp; Section</div>
              <div className="gp-score-val">{person.card.gradeSection}</div>
            </div>
            <div className="gp-score-cell">
              <div className="gp-score-label">Coach / Teacher</div>
              <div className="gp-score-val">{person.card.teacherName}</div>
            </div>
            <div className="gp-score-cell">
              <div className="gp-score-label">Date Submitted</div>
              <div className="gp-score-val">{person.card.dateSubmission}</div>
            </div>
          </div>
          <div className="gp-basketball-spin">🏀</div>
        </div>

        {person.sections.map((section, idx) => {
          const icon = SECTION_ICONS[section.id] ?? '🏀';
          const isOpen = open[section.id];
          const hasDropdown = section.defaultOpen !== undefined;
          const enterDelay = `${0.14 + idx * 0.042}s`;

          if (!hasDropdown) {
            return (
              <div key={section.id} className="gp-always gp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
                <div className="gp-always-title">{icon} {section.title}</div>
                <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="gp-pdf-btn" pdfBtnLabel="🏀 Tingnan ang PDF" />
              </div>
            );
          }
          return (
            <div key={section.id} className="gp-sec gp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
              <div className="gp-sec-hdr" onClick={() => toggle(section.id)}>
                <span className="gp-sec-icon">{icon}</span>
                <span className="gp-sec-title">{section.title}</span>
                <span className={`gp-arrow${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              <div className={`gp-body${isOpen ? ' open' : ''}`}>
                <div className="gp-inner">
                  <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="gp-pdf-btn" pdfBtnLabel="🏀 Tingnan ang PDF" />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="gp-footer gp-footer-animate"
          style={{ '--footer-delay': `${0.2 + person.sections.length * 0.042}s` } as CSSProperties}
        >
          🏀 Lakers Nation · Est. 1947 🏀
        </div>
        <div className="gp-footer-animate" style={{ '--footer-delay': `${0.26 + person.sections.length * 0.042}s` } as CSSProperties}>
          <LakersGameTracker />
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      {pdfSrc && <PdfLightbox src={pdfSrc} onClose={() => setPdfSrc(null)} />}
    </>
  );
}
