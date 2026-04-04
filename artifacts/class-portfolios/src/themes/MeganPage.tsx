import { useState, type CSSProperties } from 'react';
import { PersonData } from '../data/portfolioData';
import SectionBody from '../components/SectionBody';
import Lightbox from '../components/Lightbox';
import PdfLightbox from '../components/PdfLightbox';

interface Props {
  person: PersonData;
  onBack: () => void;
}

const SECTION_ICONS: Record<string, string> = {
  prologue: '🏎️', toc: '📋', bionote: '👤', talumpati: '🎤',
  sanaysay: '🔴', liham: '📄', resume: '⚡', proyekto: '🏁',
  'app-letter': '📄', 'panukala': '🏁', epilogue: '🎯',
};

export default function MeganPage({ person, onBack }: Props) {
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
        .mp-page {
          min-height: 100vh;
          background: #111;
          background-image:
            repeating-linear-gradient(
              -60deg,
              transparent,
              transparent 28px,
              rgba(220,0,0,0.04) 28px,
              rgba(220,0,0,0.04) 30px
            );
          padding-bottom: 50px;
          font-family: system-ui, sans-serif;
        }
        @keyframes mpPitIn {
          from { opacity: 0; transform: translateX(-48px) skewX(-4deg); filter: blur(5px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes mpPitLane {
          from { opacity: 0; transform: translateX(32px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .mp-hdr {
          background: #0a0a0a;
          border-bottom: 4px solid #DC0000;
          padding: 0;
          position: relative;
          overflow: hidden;
          animation: mpPitIn 0.62s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .mp-enter-block {
          animation: mpPitLane 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--enter-delay, 0s);
        }
        .mp-footer-animate {
          animation: mpPitLane 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--footer-delay, 0.5s);
        }
        .mp-stripe {
          height: 6px;
          background: linear-gradient(90deg, #DC0000 0%, #ff2020 40%, #DC0000 60%, #111 100%);
        }
        .mp-hdr-body {
          padding: 0 0 0;
          position: relative;
        }
        .mp-back {
          position: absolute; top: 14px; right: 14px;
          z-index: 20;
          background: #DC0000; border: none; color: white;
          padding: 10px 16px; min-height: 44px; min-width: 88px;
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
          cursor: pointer; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: background 0.2s, transform 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .mp-back:hover { background: #aa0000; transform: scale(1.03); }
        .mp-back:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
        .mp-hdr-top {
          display: flex; align-items: stretch;
          min-height: 168px;
        }
        .mp-leclerc-wrap {
          position: relative; overflow: hidden; flex-shrink: 0;
          width: 130px;
        }
        .mp-leclerc {
          width: 130px; height: 188px; object-fit: cover; object-position: top center;
          display: block;
          filter: saturate(1.08) contrast(1.05);
        }
        .mp-leclerc-fade {
          position: absolute; right: 0; top: 0; bottom: 0; width: 44px;
          background: linear-gradient(to right, transparent, #0a0a0a);
        }
        .mp-hdr-info {
          flex: 1; padding: 18px 96px 18px 14px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .mp-ferrari-logo {
          height: 56px; width: auto; max-width: 140px;
          object-fit: contain; object-position: left center;
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 8px rgba(220,0,0,0.35));
        }
        .mp-number {
          font-size: 48px; font-weight: 900; line-height: 1;
          color: #DC0000;
          text-shadow: 0 0 24px rgba(220,0,0,0.45);
          font-style: italic;
        }
        .mp-name {
          font-size: 15px; font-weight: 800; color: white;
          text-transform: uppercase; letter-spacing: 1px; line-height: 1.2;
          margin-top: 6px;
        }
        .mp-sub { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
        .mp-speed-lines {
          position: absolute; bottom: 0; right: 0; left: 0; height: 3px;
          background: linear-gradient(90deg, transparent 0%, #DC0000 60%, #ff4040 80%, transparent 100%);
          animation: mp-zoom 2.5s ease-in-out infinite;
        }
        @keyframes mp-zoom {
          0%, 100% { opacity: 0.5; transform: scaleX(0.8); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        .mp-card {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: #222; margin: 0 0 12px;
          border-bottom: 2px solid rgba(220,0,0,0.5);
          animation: mpPitLane 0.55s cubic-bezier(0.34, 1.1, 0.64, 1) 0.08s both;
        }
        .mp-card-cell {
          background: #151515; padding: 10px 14px;
        }
        .mp-card-cell:first-child { grid-column: 1 / -1; }
        .mp-fl {
          font-size: 9px; text-transform: uppercase; letter-spacing: 2px;
          color: #DC0000; font-weight: 700;
        }
        .mp-fv {
          font-size: 13px; color: white; font-weight: 600; margin-top: 3px;
        }
        .mp-sec {
          margin: 0 10px 8px;
          background: #151515;
          border: 1px solid #2a2a2a;
          border-left: 4px solid #DC0000;
          overflow: hidden;
        }
        .mp-sec-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 16px; cursor: pointer;
          background: #1a1a1a; user-select: none;
          transition: background 0.15s;
        }
        .mp-sec-hdr:hover { background: #202020; }
        .mp-sec-icon { font-size: 16px; }
        .mp-sec-title {
          flex: 1; font-size: 13px; font-weight: 800; color: #DC0000;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .mp-arrow {
          font-size: 10px; color: #DC0000;
          transition: transform 0.3s;
        }
        .mp-arrow.open { transform: rotate(90deg); }
        .mp-body { max-height: 0; overflow: hidden; transition: max-height 0.45s ease; }
        .mp-body.open { max-height: 3000px; }
        .mp-inner { padding: 16px 18px 20px; }
        .mp-always {
          margin: 0 10px 8px;
          background: #151515;
          border: 1px solid #2a2a2a;
          border-left: 4px solid #888;
          padding: 14px 18px 20px;
        }
        .mp-always-title {
          font-size: 13px; font-weight: 800; color: #DC0000;
          text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .mp-pdf-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #DC0000; color: white; border: none;
          padding: 11px 22px; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px;
          cursor: pointer; margin-top: 10px;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 0 4px 16px rgba(220,0,0,0.4);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .mp-pdf-btn:hover { background: #aa0000; transform: translateX(4px); box-shadow: 0 6px 22px rgba(220,0,0,0.55); }
        .mp-page .si { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
        .mp-page .dot { width: 6px; height: 6px; background: #DC0000; flex-shrink: 0; margin-top: 5px; }
        .mp-page .st { font-size: 13px; color: rgba(255,255,255,0.9); }
        .mp-page .sn { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 3px; line-height: 1.65; }
        .mp-page .essay-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(220,0,0,0.28);
          color: rgba(255,255,255,0.92);
        }
        .mp-page .essay-box p { color: rgba(255,255,255,0.88); font-size: 13px; line-height: 1.85; margin-bottom: 10px; }
        .mp-page .essay-sig { color: #ff4444; }
        .mp-page .st strong { color: #ff6b6b; font-weight: 700; }
        .mp-page .toc-table { width: 100%; }
        .mp-page .toc-row {
          display: flex; justify-content: space-between;
          border-bottom: 1px solid #2a2a2a; padding: 8px 0;
          font-size: 12.5px; color: rgba(255,255,255,0.8);
        }
        .mp-page .thumb { border: 2px solid #DC0000; }
        .mp-page .thumb-btn { color: #DC0000; font-size: 11px; text-align: center; margin-top: 4px; }
        .mp-rpm {
          display: flex; align-items: center; gap: 10px; margin-top: 16px;
          padding-top: 16px; border-top: 1px solid #2a2a2a;
        }
        .mp-rpm-bar {
          flex: 1; height: 4px; background: #2a2a2a; border-radius: 2px; overflow: hidden;
        }
        .mp-rpm-fill {
          height: 100%; background: linear-gradient(90deg, #DC0000, #ff4040);
          width: 85%; animation: mp-revup 3s ease-in-out infinite;
        }
        @keyframes mp-revup {
          0%, 100% { width: 40%; } 60% { width: 90%; } 80% { width: 70%; }
        }
        .mp-rpm-label { font-size: 10px; color: #666; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
        .mp-footer {
          text-align: center; margin-top: 24px; padding: 16px;
          border-top: 1px solid #2a2a2a;
          color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 3px;
        }
        .mp-page .bionote-text { color: rgba(255,255,255,0.88); }
        .mp-page .bionote-name { color: #DC0000; }
        .mp-page .bionote-school { color: rgba(255,255,255,0.48); }
        .mp-page .bionote-bio { color: rgba(255,255,255,0.82); }
        @media (prefers-reduced-motion: reduce) {
          .mp-hdr, .mp-card, .mp-enter-block, .mp-footer-animate { animation: none; }
        }
      `}</style>
      <div className="mp-page">
        <div className="mp-hdr">
          <div className="mp-stripe" />
          <button type="button" className="mp-back" onClick={onBack}>← Back</button>
          <div className="mp-hdr-body">
            <div className="mp-hdr-top">
              <div className="mp-leclerc-wrap">
                <img className="mp-leclerc" src={`${BASE}leclerc.png`} alt="" />
                <div className="mp-leclerc-fade" aria-hidden />
              </div>
              <div className="mp-hdr-info">
                <img className="mp-ferrari-logo" src={`${BASE}ferrari-logo.png`} alt="Scuderia Ferrari" />
                <div className="mp-number">#16</div>
                <div className="mp-name">{person.fullName}</div>
                <div className="mp-sub">Grade 11 - SPJP (ABM)</div>
              </div>
            </div>
            <div className="mp-speed-lines" />
          </div>
        </div>

        <div className="mp-card">
          <div className="mp-card-cell">
            <div className="mp-fl">Portfolio Title</div>
            <div className="mp-fv">{person.card.portfolioTitle}</div>
          </div>
          <div className="mp-card-cell">
            <div className="mp-fl">Grade &amp; Section</div>
            <div className="mp-fv">{person.card.gradeSection}</div>
          </div>
          <div className="mp-card-cell">
            <div className="mp-fl">Teacher</div>
            <div className="mp-fv">{person.card.teacherName}</div>
          </div>
          <div className="mp-card-cell">
            <div className="mp-fl">Date Submitted</div>
            <div className="mp-fv">{person.card.dateSubmission}</div>
          </div>
        </div>

        {person.sections.map((section, idx) => {
          const icon = SECTION_ICONS[section.id] ?? '🏎️';
          const isOpen = open[section.id];
          const hasDropdown = section.defaultOpen !== undefined;
          const enterDelay = `${0.13 + idx * 0.042}s`;

          if (!hasDropdown) {
            return (
              <div key={section.id} className="mp-always mp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
                <div className="mp-always-title">{icon} {section.title}</div>
                <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="mp-pdf-btn" pdfBtnLabel="🏎️ Tingnan ang PDF" />
              </div>
            );
          }
          return (
            <div key={section.id} className="mp-sec mp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
              <div className="mp-sec-hdr" onClick={() => toggle(section.id)}>
                <span className="mp-sec-icon">{icon}</span>
                <span className="mp-sec-title">{section.title}</span>
                <span className={`mp-arrow${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              <div className={`mp-body${isOpen ? ' open' : ''}`}>
                <div className="mp-inner">
                  <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="mp-pdf-btn" pdfBtnLabel="🏎️ Tingnan ang PDF" />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="mp-rpm mp-footer-animate"
          style={{ margin: '0 10px', '--footer-delay': `${0.18 + person.sections.length * 0.042}s` } as CSSProperties}
        >
          <span className="mp-rpm-label">Engine</span>
          <div className="mp-rpm-bar"><div className="mp-rpm-fill" /></div>
          <span className="mp-rpm-label">3.9L V8 · 710 hp</span>
        </div>
        <div
          className="mp-footer mp-footer-animate"
          style={{ '--footer-delay': `${0.24 + person.sections.length * 0.042}s` } as CSSProperties}
        >
          🏁 Scuderia Ferrari · Maranello, Italy 🏁
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      {pdfSrc && <PdfLightbox src={pdfSrc} onClose={() => setPdfSrc(null)} />}
    </>
  );
}
