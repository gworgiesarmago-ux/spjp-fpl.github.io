interface Props {
  src: string;
  onClose: () => void;
}

export default function PdfLightbox({ src, onClose }: Props) {
  return (
    <div className="pdf-lb on">
      <div className="pdf-lb-toolbar">
        <button className="pdf-lb-close" onClick={onClose}>&#215; Isara</button>
      </div>
      <iframe className="pdf-lb-frame" src={src} title="Panukalang Proyekto" />
    </div>
  );
}
