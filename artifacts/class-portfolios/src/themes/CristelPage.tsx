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
  prologue: '🌸', toc: '📋', bionote: '🐰', sanaysay: '🌷',
  liham: '💌', resume: '✨', proyekto: '🌟', epilogue: '🎀',
};

export default function CristelPage({ person, onBack }: Props) {
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
        .cp-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #fff5fb 0%, #ffe8f4 40%, #ffdaee 100%);
          padding-bottom: 40px;
        }
        @keyframes cpHdrIn {
          from { opacity: 0; transform: translateY(-22px) scale(0.97); filter: blur(5px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes cpCardPop {
          0% { opacity: 0; transform: translateY(28px) rotate(-2deg) scale(0.94); }
          70% { transform: translateY(-4px) rotate(0.6deg) scale(1.02); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes cpSecRise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
        .cp-hdr {
          background: radial-gradient(ellipse 130% 110% at 50% 36%, #f2a6c2 0%, #f6bdd5 45%, #fceef5 82%, #fffafd 100%);
          padding: 24px 16px 40px;
          text-align: center;
          position: relative;
          overflow: visible;
          animation: cpHdrIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .cp-back {
          position: absolute; left: 14px; top: 18px;
          background: white; border: 2px solid #ff9ec9; color: #b05080;
          border-radius: 20px; padding: 6px 14px;
          font-family: 'Caveat', cursive; font-size: 16px;
          cursor: pointer; z-index: 5;
          transition: transform 0.2s;
        }
        .cp-back:hover { transform: scale(1.05); }
        .cp-deco-star { position: absolute; font-size: 18px; opacity: 0.35; }
        .cp-bunny-row { display: flex; justify-content: center; gap: 20px; margin-bottom: 10px; }
        .cp-bunny {
          width: 90px; height: 90px; object-fit: cover;
          border-radius: 50%; border: 4px solid white;
          box-shadow: 0 4px 16px rgba(255,120,180,0.4);
          animation: cp-float 2.8s ease-in-out infinite;
        }
        .cp-bunny.cp-bunny-clickable {
          cursor: zoom-in;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cp-bunny.cp-bunny-clickable:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 22px rgba(255,100,160,0.45);
        }
        .cp-bunny:nth-child(2) { animation-delay: 0.7s; width: 80px; height: 80px; }
        @keyframes cp-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .cp-name {
          font-family: 'Caveat', cursive; font-size: 34px;
          color: white; text-shadow: 1px 2px 6px rgba(160,60,100,0.35);
        }
        .cp-sub { font-size: 13px; color: rgba(255,255,255,0.9); margin-top: 4px; }
        .cp-card {
          background: white; border: 2.5px dashed #ffb8d4; border-radius: 22px;
          padding: 20px 20px 16px; margin: -20px 14px 16px;
          position: relative; z-index: 2;
          box-shadow: 0 6px 24px rgba(255,140,200,0.2);
          animation: cpCardPop 0.72s cubic-bezier(0.34, 1.3, 0.64, 1) 0.1s both;
        }
        .cp-enter-block {
          animation: cpSecRise 0.52s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--enter-delay, 0s);
        }
        .cp-footer-animate {
          animation: cpSecRise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--footer-delay, 0.5s);
        }
        .cp-bow {
          position: absolute; top: -20px; left: 50%;
          transform: translateX(-50%); font-size: 32px;
        }
        .cp-fl { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #e080b0; margin-top: 10px; }
        .cp-fv { font-family: 'Caveat', cursive; font-size: 18px; color: #5c2d45; margin-top: 2px; }
        .cp-sec {
          margin: 0 12px 10px; background: white; border-radius: 18px;
          border: 1.5px solid #ffd0e8; overflow: hidden;
          box-shadow: 0 2px 12px rgba(255,150,200,0.1);
        }
        .cp-sec-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; cursor: pointer;
          background: linear-gradient(90deg, #fff8fc, #ffeef8);
          user-select: none; transition: background 0.2s;
        }
        .cp-sec-hdr:hover { background: linear-gradient(90deg, #ffe8f5, #ffdaee); }
        .cp-sec-icon { font-size: 20px; }
        .cp-sec-title { flex: 1; font-family: 'Caveat', cursive; font-size: 21px; color: #a04070; }
        .cp-arrow { font-size: 11px; color: #e090c0; transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .cp-arrow.open { transform: rotate(90deg); }
        .cp-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cp-body.open { max-height: 3000px; }
        .cp-inner { padding: 14px 18px 20px; }
        .cp-always {
          margin: 0 12px 10px; background: white; border-radius: 18px;
          border: 1.5px solid #ffd0e8; padding: 14px 18px 20px;
          box-shadow: 0 2px 12px rgba(255,150,200,0.1);
        }
        .cp-always-title {
          font-family: 'Caveat', cursive; font-size: 22px; color: #a04070;
          margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
        }
        .cp-pdf-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #ff9ec9, #ff6fa8);
          color: white; border: none; border-radius: 22px;
          padding: 11px 22px; font-family: 'Caveat', cursive; font-size: 19px;
          cursor: pointer; margin-top: 10px;
          box-shadow: 0 4px 14px rgba(255,100,160,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cp-pdf-btn:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 8px 22px rgba(255,100,160,0.5); }
        .cp-page .si { display: flex; gap: 12px; margin-bottom: 10px; align-items: flex-start; }
        .cp-page .dot { width: 8px; height: 8px; border-radius: 50%; background: #ff9ec9; flex-shrink: 0; margin-top: 5px; }
        .cp-page .st { font-size: 13px; color: #5c2d45; }
        .cp-page .sn { font-size: 12px; color: #a06080; margin-top: 3px; line-height: 1.6; }
        .cp-page .essay-box {
          background: #fff9fc;
          border: 1px solid #ffd0e8;
          color: #5c2d45;
        }
        .cp-page .essay-box p { color: #5c2d45; font-size: 13px; line-height: 1.8; margin-bottom: 10px; }
        .cp-page .essay-sig { color: #a04070; font-family: 'Caveat', cursive; font-size: 16px; }
        .cp-page .st strong { color: #a04070; font-weight: 700; }
        .cp-page .toc-table { width: 100%; }
        .cp-page .toc-row {
          display: flex; justify-content: space-between;
          border-bottom: 1px dashed #ffd0e8; padding: 7px 0;
          font-size: 12.5px; color: #5c2d45;
        }
        .cp-footer { text-align: center; padding: 24px 16px; font-size: 28px; letter-spacing: 10px; }
        .cp-page .bionote-text { color: #5c2d45; }
        .cp-page .bionote-name { color: #a04070; font-family: 'Caveat', cursive; font-size: 18px; }
        .cp-page .bionote-school { color: #a06080; }
        .cp-page .bionote-bio { color: #5c2d45; font-family: 'Caveat', cursive; font-size: 13px; line-height: 1.65; }
        @media (prefers-reduced-motion: reduce) {
          .cp-hdr, .cp-card, .cp-enter-block, .cp-footer-animate { animation: none; }
        }
        @keyframes cp-boing {
          0% { transform: scale(1); } 40% { transform: scale(1.06); } 70% { transform: scale(0.97); } 100% { transform: scale(1); }
        }
      `}</style>
      <div className="cp-page">
        <div className="cp-hdr">
          <button className="cp-back" onClick={onBack}>← Back</button>
          <span className="cp-deco-star" style={{ top: 12, right: 20 }}>🌸</span>
          <span className="cp-deco-star" style={{ top: 60, right: 40, fontSize: '14px' }}>⭐</span>
          <span className="cp-deco-star" style={{ bottom: 14, left: 24, fontSize: '14px' }}>🎀</span>
          <div className="cp-bunny-row">
            <img
              className="cp-bunny cp-bunny-clickable"
              src={`${BASE}bunny1.png`}
              alt=""
              onClick={() => setLightbox({ src: `${BASE}bunny1.png`, caption: '✨' })}
              onKeyDown={e => e.key === 'Enter' && setLightbox({ src: `${BASE}bunny1.png`, caption: '✨' })}
              role="button"
              tabIndex={0}
            />
            <img
              className="cp-bunny cp-bunny-clickable"
              src={`${BASE}bunny2.png`}
              alt=""
              style={{ animationDelay: '0.7s' }}
              onClick={() => setLightbox({ src: `${BASE}bunny2.png`, caption: '✨' })}
              onKeyDown={e => e.key === 'Enter' && setLightbox({ src: `${BASE}bunny2.png`, caption: '✨' })}
              role="button"
              tabIndex={0}
            />
          </div>
          <div className="cp-name">{person.fullName}</div>
          <div className="cp-sub">🐇✨</div>
        </div>

        <div className="cp-card">
          <div className="cp-bow">🎀</div>
          <div className="cp-fl">Portfolio Title</div>
          <div className="cp-fv">{person.card.portfolioTitle}</div>
          <div className="cp-fl">Grade &amp; Section</div>
          <div className="cp-fv">{person.card.gradeSection}</div>
          <div className="cp-fl">Teacher's Name</div>
          <div className="cp-fv">{person.card.teacherName}</div>
          <div className="cp-fl">Date of Submission</div>
          <div className="cp-fv">{person.card.dateSubmission}</div>
        </div>

        {person.sections.map((section, idx) => {
          const icon = SECTION_ICONS[section.id] ?? '🐰';
          const isOpen = open[section.id];
          const hasDropdown = section.defaultOpen !== undefined;
          const enterDelay = `${0.16 + idx * 0.042}s`;

          if (!hasDropdown) {
            return (
              <div key={section.id} className="cp-always cp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
                <div className="cp-always-title">{icon} {section.title}</div>
                <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="cp-pdf-btn" pdfBtnLabel="🐰 Tingnan ang PDF" />
              </div>
            );
          }
          return (
            <div key={section.id} className="cp-sec cp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
              <div className="cp-sec-hdr" onClick={() => toggle(section.id)}>
                <span className="cp-sec-icon">{icon}</span>
                <span className="cp-sec-title">{section.title}</span>
                <span className={`cp-arrow${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              <div className={`cp-body${isOpen ? ' open' : ''}`}>
                <div className="cp-inner">
                  <SectionBody content={section.content} onOpenImage={(s, c) => setLightbox({ src: s, caption: c })} onOpenPdf={setPdfSrc} pdfBtnClass="cp-pdf-btn" pdfBtnLabel="🐰 Tingnan ang PDF" />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="cp-footer cp-footer-animate"
          style={{ '--footer-delay': `${0.2 + person.sections.length * 0.042}s` } as CSSProperties}
        >
          🐰🎀🐰🎀🐰
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      {pdfSrc && <PdfLightbox src={pdfSrc} onClose={() => setPdfSrc(null)} />}
    </>
  );
}
