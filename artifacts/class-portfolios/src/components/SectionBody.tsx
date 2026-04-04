import { SectionContent } from '../data/portfolioData';

interface Props {
  content: SectionContent;
  onOpenImage: (src: string, caption?: string) => void;
  onOpenPdf: (src: string) => void;
  pdfBtnClass?: string;
  pdfBtnLabel?: string;
}

export default function SectionBody({ content, onOpenImage, onOpenPdf, pdfBtnClass, pdfBtnLabel }: Props) {
  const btnClass = pdfBtnClass ?? 'pdf-btn';
  const btnLabel = pdfBtnLabel ?? '📄 Tingnan ang PDF';

  switch (content.type) {
    case 'bullet-list':
      return (
        <>
          {content.items.map((item, i) => (
            <div key={i} className="si">
              <div className="dot" />
              <div>
                <div className="st"><strong>{item.title}</strong></div>
                {item.note && <div className="sn">{item.note}</div>}
              </div>
            </div>
          ))}
        </>
      );

    case 'placeholder-bullets':
      return (
        <>
          {content.items.map((item, i) => (
            <div key={i} className="si">
              <div className="dot" />
              <div className="st">{item}</div>
            </div>
          ))}
        </>
      );

    case 'toc':
      return (
        <div className="toc-table">
          {content.rows.map((row, i) => (
            <div key={i} className="toc-row">
              <span>{row.label}</span>
              <span>{row.page}</span>
            </div>
          ))}
        </div>
      );

    case 'essay':
      return (
        <div className="essay-box">
          {content.paragraphs.map((p, i) => (
            <p key={i} style={{ whiteSpace: 'pre-line' }}>{p}</p>
          ))}
          {content.signature && (
            <div className="essay-sig" style={{ whiteSpace: 'pre-line' }}>
              {content.signature}
            </div>
          )}
        </div>
      );

    case 'writing-tags':
      return (
        <div className="wgrid">
          {content.tags.map((tag, i) => (
            <div key={i} className="wtag">{tag}</div>
          ))}
        </div>
      );

    case 'image-thumb':
      return (
        <>
          <div className="si">
            <div className="dot" />
            <div>
              <div className="st"><strong>Depinisyon</strong></div>
              <div className="sn">{content.definition}</div>
            </div>
          </div>
          <div className="si">
            <div className="dot" />
            <div><div className="st"><strong>Panghuling Produkto</strong></div></div>
          </div>
          <div className="thumb-wrap">
            <div>
              <img
                className="thumb"
                src={content.imageSrc}
                alt={content.caption}
                onClick={() => onOpenImage(content.imageSrc, content.caption)}
              />
              <div className="thumb-btn">🔍 tap to expand</div>
            </div>
          </div>
        </>
      );

    case 'pdf-button':
      return (
        <>
          <div className="si">
            <div className="dot" />
            <div>
              <div className="st"><strong>Depinisyon</strong></div>
              <div className="sn">{content.definition}</div>
            </div>
          </div>
          <div className="si">
            <div className="dot" />
            <div><div className="st"><strong>Panghuling Produkto</strong></div></div>
          </div>
          <button className={btnClass} onClick={() => onOpenPdf(content.pdfSrc)}>
            {btnLabel}
          </button>
        </>
      );

    case 'bionote':
      return (
        <div className="bionote-row">
          {content.imageSrc ? (
            <div className="bionote-photo">
              <img
                className="thumb bionote-thumb"
                src={content.imageSrc}
                alt={content.name}
                onClick={() => onOpenImage(content.imageSrc!, content.name)}
              />
              <div className="thumb-btn bionote-thumb-btn">🔍 click to enlarge</div>
            </div>
          ) : null}
          <div className="bionote-text">
            <div className="bionote-name">{content.name}</div>
            {content.school ? <div className="bionote-school">{content.school}</div> : null}
            <p className="bionote-bio">{content.bio}</p>
          </div>
        </div>
      );

    case 'bionote-placeholder':
      return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div className="ph-box">2×2<br />PHOTO<br />HERE</div>
          <div>
            <div className="st"><strong>{content.name}</strong></div>
            <div className="sn" style={{ marginTop: '4px' }}>Short professional biographical note</div>
          </div>
        </div>
      );

    case 'writing-section-placeholder':
      return (
        <>
          <div className="si"><div className="dot" /><div><div className="st"><strong>Definition</strong></div></div></div>
          <div className="si"><div className="dot" /><div><div className="st"><strong>Final Output</strong></div></div></div>
        </>
      );

    default:
      return null;
  }
}
