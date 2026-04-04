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
  intro: '📖',
  acknowledgment: '🙏',
  description: '📋',
  'writing-types': '✍️',
  'talumpati-ejk': '⚖️',
  'talumpati-relocation': '🏠',
};

export default function GroupPage({ person, onBack }: Props) {
  const initialOpen: Record<string, boolean> = {};
  person.sections.forEach(s => { initialOpen[s.id] = s.defaultOpen ?? false; });
  const [open, setOpen] = useState(initialOpen);
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);
  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Source+Serif+4:wght@300;400;600&display=swap');
        .grp-page {
          min-height: 100vh;
          background: #0e0e12;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,220,100,0.08), transparent),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.02) 79px, rgba(255,255,255,0.02) 80px);
          padding-bottom: 60px;
          font-family: 'Source Serif 4', Georgia, serif;
        }
        @keyframes grpBandIn {
          from { opacity: 0; transform: scaleY(0.88) translateY(-20px); transform-origin: top center; filter: blur(4px); }
          to { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes grpFloatUp {
          from { opacity: 0; transform: translateY(26px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .grp-hdr {
          position: relative;
          background: linear-gradient(180deg, #1a1a22 0%, #0e0e12 100%);
          border-bottom: 1px solid rgba(255,220,100,0.3);
          padding: 28px 18px 22px;
          text-align: center;
          overflow: hidden;
          animation: grpBandIn 0.66s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .grp-enter-block {
          animation: grpFloatUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--enter-delay, 0s);
        }
        .grp-footer-animate {
          animation: grpFloatUp 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--footer-delay, 0.5s);
        }
        .grp-hdr::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .grp-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,220,100,0.7); margin-bottom: 8px; font-family: 'Source Serif 4', serif;
          font-weight: 600;
        }
        .grp-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px; font-weight: 700; color: #fff;
          line-height: 1.2; letter-spacing: -0.5px;
        }
        .grp-title em {
          font-style: italic; color: #ffd864;
        }
        .grp-subtitle {
          font-size: 11px; color: rgba(255,255,255,0.45);
          margin-top: 8px; letter-spacing: 1.5px; text-transform: uppercase;
        }
        .grp-meta {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(255,220,100,0.15);
          border-top: 1px solid rgba(255,220,100,0.2);
          margin-top: 18px;
        }
        .grp-meta-cell {
          background: #0e0e12; padding: 10px 14px;
        }
        .grp-meta-label {
          font-size: 8px; text-transform: uppercase; letter-spacing: 2px;
          color: rgba(255,220,100,0.6); font-weight: 600; margin-bottom: 3px;
        }
        .grp-meta-val {
          font-size: 12px; color: rgba(255,255,255,0.85); font-weight: 400;
        }
        .grp-back {
          position: absolute; top: 16px; right: 16px;
          background: transparent; border: 1px solid rgba(255,220,100,0.4);
          color: rgba(255,220,100,0.9); border-radius: 4px; padding: 6px 14px;
          font-size: 12px; font-family: 'Source Serif 4', serif; letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.2s;
        }
        .grp-back:hover { background: rgba(255,220,100,0.1); border-color: #ffd864; color: #ffd864; }
        .grp-members {
          display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;
          padding: 14px 18px 0;
          animation: grpFloatUp 0.52s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .grp-member-tag {
          background: rgba(255,220,100,0.08); border: 1px solid rgba(255,220,100,0.2);
          border-radius: 20px; padding: 4px 12px;
          font-size: 11px; color: rgba(255,255,255,0.7);
          font-family: 'Source Serif 4', serif;
        }
        .grp-sec {
          margin: 14px 14px 0;
          border: 1px solid rgba(255,255,255,0.07);
          border-top: 2px solid rgba(255,220,100,0.4);
          border-radius: 2px;
          overflow: hidden;
          background: #12121a;
        }
        .grp-sec-hdr {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px; cursor: pointer; user-select: none;
          background: #12121a;
          transition: background 0.2s;
        }
        .grp-sec-hdr:hover { background: #16161f; }
        .grp-sec-icon { font-size: 16px; flex-shrink: 0; }
        .grp-sec-title {
          flex: 1; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9);
          font-family: 'Playfair Display', serif; letter-spacing: 0.3px;
        }
        .grp-chevron {
          width: 18px; height: 18px; display: flex; align-items: center; justify-content: center;
          color: rgba(255,220,100,0.6); font-size: 10px;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .grp-chevron.open { transform: rotate(90deg); }
        .grp-body { max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1); }
        .grp-body.open { max-height: 6000px; }
        .grp-inner { padding: 16px 18px 22px; border-top: 1px solid rgba(255,255,255,0.05); }
        .grp-always {
          margin: 14px 14px 0;
          background: #12121a;
          border: 1px solid rgba(255,255,255,0.07);
          border-top: 2px solid rgba(255,220,100,0.4);
          border-radius: 2px;
          padding: 16px 18px 22px;
        }
        .grp-always-label {
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9);
          font-family: 'Playfair Display', serif; margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }
        /* shared sub-styles */
        .grp-page .si { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
        .grp-page .dot { width: 5px; height: 5px; border-radius: 50%; background: #ffd864; flex-shrink: 0; margin-top: 6px; }
        .grp-page .st { font-size: 13px; color: rgba(255,255,255,0.9); font-weight: 600; }
        .grp-page .st strong { color: #ffe08a; font-weight: 700; }
        .grp-page .sn { font-size: 12.5px; color: rgba(255,255,255,0.72); margin-top: 3px; line-height: 1.7; font-weight: 400; }
        .grp-page .essay-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,220,100,0.15);
          color: rgba(255,255,255,0.88);
        }
        .grp-page .essay-box p { color: rgba(255,255,255,0.84); font-size: 13px; line-height: 1.9; margin-bottom: 12px; font-weight: 400; }
        .grp-page .essay-sig { color: rgba(255,220,100,0.75); font-style: italic; font-size: 12px; margin-top: 10px; text-align: right; }
        .grp-page .grp-pdf-btn {
          font-family: 'Source Serif 4', serif;
          font-size: 11px; letter-spacing: 1px;
          background: rgba(255,220,100,0.12);
          color: #ffe9a8;
          border: 1px solid rgba(255,220,100,0.35);
          padding: 9px 16px; cursor: pointer; border-radius: 4px;
          margin-top: 12px; display: inline-flex; align-items: center; gap: 6px;
        }
        .grp-page .grp-pdf-btn:hover {
          background: rgba(255,220,100,0.2);
          border-color: #ffd864;
          color: #fff;
        }
        .grp-page .toc-table { width: 100%; }
        .grp-page .toc-row {
          display: flex; justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.06); padding: 9px 0;
          font-size: 12.5px; color: rgba(255,255,255,0.7); font-weight: 300;
        }
        .grp-divider {
          text-align: center; padding: 24px 18px 8px;
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,220,100,0.3);
        }
        .grp-footer {
          text-align: center; margin-top: 30px; padding: 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.2); font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; font-family: 'Source Serif 4', serif;
        }
        .grp-star { color: rgba(255,220,100,0.3); margin: 0 6px; }
        .grp-page .bionote-text { color: rgba(255,255,255,0.84); }
        .grp-page .bionote-name { color: #ffe08a; font-family: 'Playfair Display', Georgia, serif; font-size: 15px; }
        .grp-page .bionote-school { color: rgba(255,220,100,0.58); font-family: 'Source Serif 4', serif; }
        .grp-page .bionote-bio { color: rgba(255,255,255,0.78); font-family: 'Source Serif 4', serif; font-size: 13px; line-height: 1.75; }
        .grp-page .bionote-row .thumb-btn { color: rgba(255,220,100,0.65); }
        @media (prefers-reduced-motion: reduce) {
          .grp-hdr, .grp-members, .grp-enter-block, .grp-footer-animate { animation: none; }
        }
      `}</style>

      <div className="grp-page">
        <div className="grp-hdr">
          <button className="grp-back" onClick={onBack}>← Bumalik</button>
          <div className="grp-eyebrow">Sacred Heart School – Hijas de Jesus</div>
          <div className="grp-title">
            <em>Kolektibong</em> Paglalakbay
          </div>
          <div className="grp-subtitle">Grade 11 - SPJP (ABM) · Saint Pope John Paul II · 2025–2026</div>
          <div className="grp-meta">
            <div className="grp-meta-cell">
              <div className="grp-meta-label">Guro</div>
              <div className="grp-meta-val">{person.card.teacherName}</div>
            </div>
            <div className="grp-meta-cell">
              <div className="grp-meta-label">Petsa ng Pagpasa</div>
              <div className="grp-meta-val">{person.card.dateSubmission}</div>
            </div>
          </div>
        </div>

        <div className="grp-members">
          {['George Ethan Sarmago', 'Megan Claire Tan', 'Nathaniel Denver Uy', 'Jin Lin Wang'].map(n => (
            <div key={n} className="grp-member-tag">{n}</div>
          ))}
        </div>

        {person.sections.map((section, idx) => {
          const icon = SECTION_ICONS[section.id] ?? '✦';
          const isOpen = open[section.id];
          const hasDropdown = section.defaultOpen !== undefined;
          const enterDelay = `${0.14 + idx * 0.04}s`;

          if (!hasDropdown) {
            return (
              <div key={section.id} className="grp-always grp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
                <div className="grp-always-label">{icon} {section.title}</div>
                <SectionBody
                  content={section.content}
                  onOpenImage={(s, c) => setLightbox({ src: s, caption: c })}
                  onOpenPdf={setPdfSrc}
                  pdfBtnClass="grp-pdf-btn"
                  pdfBtnLabel="📄 Tingnan ang PDF"
                />
              </div>
            );
          }

          return (
            <div key={section.id} className="grp-sec grp-enter-block" style={{ '--enter-delay': enterDelay } as CSSProperties}>
              <div className="grp-sec-hdr" onClick={() => toggle(section.id)}>
                <span className="grp-sec-icon">{icon}</span>
                <span className="grp-sec-title">{section.title}</span>
                <span className={`grp-chevron${isOpen ? ' open' : ''}`}>▶</span>
              </div>
              <div className={`grp-body${isOpen ? ' open' : ''}`}>
                <div className="grp-inner">
                  <SectionBody
                    content={section.content}
                    onOpenImage={(s, c) => setLightbox({ src: s, caption: c })}
                    onOpenPdf={setPdfSrc}
                    pdfBtnClass="grp-pdf-btn"
                    pdfBtnLabel="📄 Tingnan ang PDF"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="grp-footer grp-footer-animate"
          style={{ '--footer-delay': `${0.2 + person.sections.length * 0.04}s` } as CSSProperties}
        >
          <span className="grp-star">✦</span>
          Grade 11 - SPJP (ABM) · SHS-HDJ · 2025–2026
          <span className="grp-star">✦</span>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
      {pdfSrc && <PdfLightbox src={pdfSrc} onClose={() => setPdfSrc(null)} />}
    </>
  );
}
