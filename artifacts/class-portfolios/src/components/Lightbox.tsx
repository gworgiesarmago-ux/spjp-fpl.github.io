interface Props {
  src: string;
  caption?: string;
  onClose: () => void;
}

export default function Lightbox({ src, caption, onClose }: Props) {
  return (
    <div className="lb on" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lb-inner">
        <button className="lb-close" onClick={onClose}>&#215;</button>
        <img className="lb-img" src={src} alt={caption || ''} />
        {caption && <div className="lb-caption">{caption}</div>}
      </div>
    </div>
  );
}
