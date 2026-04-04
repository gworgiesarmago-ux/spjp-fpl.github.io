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
  prologue: '🥟', toc: '📋', bionote: '🏮', sanaysay: '📖',
  liham: '📬', resume: '🎋', proyekto: '🫕', epilogue: '🎉',
};

export default function DenverPage({ person, onBack }: Props) {
  const initialOpen: Record<string, boolean> = {};
  person.sections.forEach(s => { initialOpen[s.id] = s.defaultOpen ?? false; });
  const [open, setOpen] = useState(initialOpen);
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
        .dp-page {
          min-height: 100vh;
          background-color: #FDF6E3;
          background-image:
            radial-gradient(circle at 20px 20px, rgba(192,57,43,0.06) 2px, transparent 2px),
            radial-gradient(circle at 60px 60px, rgba(192,57,43,0.04) 2px, transparent 2px);
          background-size: 80px 80px;
          padding-bottom: 50px;
          font-family: 'Special Elite', monospace;
        }
        @keyframes dpHeroIn {
          from { opacity: 0; transform: translateY(-26px) rotate(-1.2deg) scale(0.98); filter: blur(5px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes dpMenuIn {
          from { opacity: 0; transform: translateX(-36px) skewX(-2.5deg); }
          to { opacity: 1; transform: none; }
        }
        @keyframes dpBlockIn {
          from { opacity: 0; transform: translateY(22px) scale(0.985); }
          to { opacity: 1; transform: none; }
        }
        .dp-hdr {
          background: linear-gradient(180deg, #C0392B 0%, #a93226 100%);
          padding: 0 0 0;
          position: relative;
          overflow: hidden;
          animation: dpHeroIn 0.64s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .dp-hdr-stripe {
          height: 8px;
          background: repeating-linear-gradient(
            90deg,
            #D4A017 0px, #D4A017 20px,
            #C0392B 20px, #C0392B 40px
          );
        }
        .dp-hdr-body {
          padding: 20px 16px 24px;
          text-align: center;
          position: relative;
        }
        .dp-back {
          position: absolute; top: 14px; right: 14px; left: auto;
          z-index: 30;
          background: rgba(255,255,255,0.95); border: 2px solid rgba(0,0,0,0.15);
          color: #a93226; border-radius: 8px;
          padding: 10px 18px; min-height: 44px; min-width: 92px;
          font-family: 'Special Elite', monospace; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
          -webkit-tap-highlight-color: transparent;
        }
        .dp-back:hover { background: white; transform: scale(1.03); box-shadow: 0 6px 18px rgba(0,0,0,0.3); }
        .dp-back:focus-visible { outline: 2px solid #D4A017; outline-offset: 2px; }
        .dp-lanterns {
          display: flex; justify-content: center; gap: 16px; margin-bottom: 8px;
          font-size: 32px; animation: dp-lantern-sway 3s ease-in-out infinite;
        }
        @keyframes dp-lantern-sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .dp-restaurant {
          font-size: 11px; color: rgba(255,255,255,0.7); text-transform: uppercase;
          letter-spacing: 3px; margin-bottom: 4px;
        }
        .dp-name {
          font-family: 'DM Serif Display', serif;
          font-size: 28px; color: white;
          text-shadow: 1px 2px 6px rgba(0,0,0,0.3);
        }
        .dp-tagline {
          font-size: 12px; color: rgba(255,255,255,0.8); margin-top: 6px;
        }
        .dp-dumpling-row {
          display: flex; justify-content: center; gap: 4px;
          font-size: 20px; margin-top: 10px;
          animation: dp-steam 2s ease-in-out infinite;
        }
        @keyframes dp-steam {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-4px); opacity: 0.85; }
        }
        .dp-menu-card {
          background: white;
          border: 2px solid #C0392B;
          border-top: 6px solid #C0392B;
          margin: 0 12px 14px;
          box-shadow: 0 4px 18px rgba(192,57,43,0.15);
          animation: dpMenuIn 0.58s cubic-bezier(0.34, 1.15, 0.64, 1) 0.09s both;
        }
        .dp-enter-block {
          animation: dpBlockIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--enter-delay, 0s);
        }
        .dp-footer-stack {
          animation: dpBlockIn 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--footer-delay, 0.5s);
        }
        .dp-menu-title {
          background: #C0392B; color: white;
          font-family: 'DM Serif Display', serif; font-size: 14px;
          text-transform: uppercase; letter-spacing: 2px;
          padding: 8px 14px; text-align: center;
        }
        .dp-menu-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .dp-menu-item {
          padding: 10px 14px;
          border-right: 1px solid #f0d0c0;
          border-bottom: 1px solid #f0d0c0;
        }
        .dp-menu-item:nth-child(even) { border-right: none; }
        .dp-menu-item:nth-child(3), .dp-menu-item:nth-child(4) { border-bottom: none; }
        .dp-ml { font-size: 9px; text-transform: uppercase; letter-spacing: 1.5px; color: #C0392B; font-weight: 700; }
        .dp-mv { font-size: 12.5px; color: #2c1810; margin-top: 2px; font-family: 'Special Elite', monospace; }
        .dp-sec {
          margin: 0 12px 10px;
          background: white;
          border: 1.5px solid #d4b094;
          border-left: 5px solid #C0392B;
          box-shadow: 0 2px 10px rgba(192,57,43,0.08);
          position: relative;
          overflow: hidden;
        }
        .dp-sec::before {
          content: '';
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 4px; background: repeating-linear-gradient(
            180deg, #D4A017 0px, #D4A017 8px, transparent 8px, transparent 16px
          );
        }
        .dp-sec-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 22px 13px 14px; cursor: pointer;
          background: linear-gradient(90deg, #fff9f5, white);
          user-select: none; transition: background 0.2s;
        }
        .dp-sec-hdr:hover { background: linear-gradient(90deg, #fff0e8, #fff9f5); }
        .dp-sec-icon { font-size: 18px; }
        .dp-sec-title {
          flex: 1; font-family: 'DM Serif Display', serif; font-size: 17px;
          color: #C0392B;
        }
        .dp-arrow { font-size: 11px; color: #C0392B; transition: transform 0.3s; }
        .dp-arrow.open { transform: rotate(90deg); }
        .dp-body { max-height: 0; overflow: hidden; transition: max-height 0.45s ease; }
        .dp-body.open { max-height: 3000px; }
        .dp-inner {
          padding: 14px 20px 18px;
          border-top: 1px dashed #d4b094;
        }
        .dp-always {
          margin: 0 12px 10px;
          background: white;
          border: 1.5px solid #d4b094;
          border-left: 5px solid #8B4513;
          padding: 14px 20px 18px;
          box-shadow: 0 2px 10px rgba(192,57,43,0.08);
        }
        .dp-always-title {
          font-family: 'DM Serif Display', serif; font-size: 18px;
          color: #C0392B; margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .dp-pdf-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #C0392B; color: white; border: none;
          padding: 10px 20px; font-family: 'Special Elite', monospace; font-size: 14px;
          cursor: pointer; margin-top: 10px; border-radius: 2px;
          box-shadow: 3px 3px 0px #8B2020;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .dp-pdf-btn:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0px #8B2020; }
        .dp-page .si { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
        .dp-page .dot {
          width: 10px; height: 10px; flex-shrink: 0; margin-top: 4px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Ccircle cx='5' cy='5' r='4' fill='%23C0392B'/%3E%3C/svg%3E") center/contain no-repeat;
        }
        .dp-page .st { font-size: 13px; color: #2c1810; }
        .dp-page .sn { font-size: 12px; color: #8B5A3A; margin-top: 3px; line-height: 1.65; }
        .dp-page .essay-box {
          background: #fffdf8;
          border: 1px solid #e8d4c4;
          color: #2c1810;
        }
        .dp-page .essay-box p { color: #2c1810; font-size: 13px; line-height: 1.9; margin-bottom: 10px; }
        .dp-page .essay-sig { color: #a93226; font-family: 'Caveat', cursive; font-size: 16px; }
        .dp-page .st strong { color: #C0392B; font-weight: 700; }
        .dp-page .toc-table { width: 100%; }
        .dp-page .toc-row {
          display: flex; justify-content: space-between;
          border-bottom: 1px dashed #d4b094; padding: 8px 0;
          font-size: 12.5px; color: #2c1810;
        }
        .dp-page .thumb { border: 2px solid #C0392B; }
        .dp-page .thumb-btn { color: #C0392B; font-size: 11px; text-align: center; margin-top: 4px; }
        .dp-steamer-deco {
          text-align: center; font-size: 24px; margin-top: 4px; letter-spacing: 6px;
          animation: dp-steam 2.5s ease-in-out infinite;
        }
        .dp-footer {
          text-align: center; margin-top: 20px; padding: 16px;
          border-top: 2px solid #d4b094;
          color: #C0392B; font-family: 'DM Serif Display', serif;
          font-size: 15px;
        }
        .dp-footer-sub { font-size: 11px; color: #8B5A3A; margin-top: 4px; font-family: 'Special Elite', monospace; letter-spacing: 1px; }
        .dp-page .bionote-text { color: #2c1810; }
        .dp-page .bionote-name { color: #a93226; font-family: 'DM Serif Display', serif; font-size: 15px; }
        .dp-page .bionote-school { color: #8B5A3A; }
        .dp-page .bionote-bio { color: #2c1810; }
        @media (prefers-reduced-motion: reduce) {
          .dp-hdr, .dp-menu-card, .dp-enter-block, .dp-footer-stack { animation: none; }
        }
      `}</style>
      <div className="dp-page">
        <div className="dp-hdr">
          <div className="dp-hdr-stripe" />
          <div className="dp-hdr-body">
            <button className="dp-back" onClick={onBack}>← Back</button>
            <div className="dp-lanterns">🏮 🏮 🏮</div>
            <div className="dp-restaurant">Din Tai Fung</div>
            <div className="dp-name">{person.fullName}</div>
            <div className="dp-tagline">Grade 11 - SPJP (ABM) · {person.card.dateSubmission}</div>
            <div className="dp-dumpling-row">🥟 🥟 🥟 🥟 🥟</div>
          </div>
        </div>

        <div className="dp-menu-card">
          <div className="dp-menu-title">🥢 Menu ng Portfolio 🥢</div>
          <div className="dp-menu-grid">
            <div className="dp-menu-item">
              <div className="dp-ml">Portfolio Title</div>
              <div className="dp-mv">{person.card.portfolioTitle}</div>
            </div>
            <div className="dp-menu-item">
              <div className="dp-ml">Grade &amp; Section</div>
              <div className="dp-mv">{person.card.gradeSection}</div>
            </div>
            <div className="dp-menu-item">
              <div className="dp-ml">Teacher</div>
              <div className="dp-mv">{person.card.teacherName}</div>
            </div>
            <div className="dp-menu-item">
              <div className="dp-ml">Date Submitted</div>
              <div className="dp-mv">{person.card.dateSubmission}</div>
            </div>
          </div>
        </div>

        {person.sections.map((section, idx) => {
          const icon = SECTION_ICONS[section.id] ?? '🥟';
          const isOpen = open[section.id];
          const hasDropdown = section.defaultOpen !== undefined;
          const enterDelay = `${0.15 + idx * 0.044}s`;

          if (!hasDropdown) {
            return (
              <div key={section.id} className="dp-always dp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
                <div className="dp-always-title">{icon} {section.title}</div>
                <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="dp-pdf-btn" pdfBtnLabel="🥟 Tingnan ang PDF" />
              </div>
            );
          }
          return (
            <div key={section.id} className="dp-sec dp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
              <div className="dp-sec-hdr" onClick={() => toggle(section.id)}>
                <span className="dp-sec-icon">{icon}</span>
                <span className="dp-sec-title">{section.title}</span>
                <span className={`dp-arrow${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              <div className={`dp-body${isOpen ? ' open' : ''}`}>
                <div className="dp-inner">
                  <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="dp-pdf-btn" pdfBtnLabel="🥟 Tingnan ang PDF" />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="dp-steamer-deco dp-footer-stack"
          style={{ '--footer-delay': `${0.18 + person.sections.length * 0.044}s` } as CSSProperties}
        >
          🥟🥟🥟🥟
        </div>
        <div
          className="dp-footer dp-footer-stack"
          style={{ '--footer-delay': `${0.22 + person.sections.length * 0.044}s` } as CSSProperties}
        >
          Din Tai Fung · 鼎泰豐
          <div className="dp-footer-sub">Since 1958 · "Best Dumpling in the World"</div>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      {pdfSrc && <PdfLightbox src={pdfSrc} onClose={() => setPdfSrc(null)} />}
    </>
  );
}
