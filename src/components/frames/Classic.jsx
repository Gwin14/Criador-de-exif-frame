import {
  formatFNumber,
  formatFocalLength,
  formatShutter,
} from "../../utils/exifFormatters";
import { getCameraBrandLogo } from "../../utils/cameraBrandLogos";
import "./Classic.css";

export default function Classic({
  frameRef,
  imageUrl,
  metadata,
  setImageLoaded,
}) {
  const brand = getCameraBrandLogo(metadata.Make);

  return (
    <div ref={frameRef} className="classic-frame">
      {/* FOTO */}
      <img
        className="photo"
        src={imageUrl}
        alt="foto"
        crossOrigin="anonymous"
        onLoad={() => setImageLoaded(true)}
      />

      {/* METADADOS */}
      <div className="metadados">
        <div>
          <p>
            <span>ISO: {metadata.ISO ?? "-"} </span>
            <span>f/{formatFNumber(metadata.FNumber)}</span>
            <br />
            <span className="bold">
              {formatShutter(metadata.ExposureTime)}{" "}
            </span>
            <span className="bold">
              {formatFocalLength(metadata.FocalLength)}
            </span>
          </p>
        </div>
        {brand.logo && (
          <img className="brand-logo" src={brand.logo} alt={brand.name} />
        )}
        <div className="lens">
          <p>
            <span>
              {metadata.Make} {metadata.Model}
            </span>
            <br />
            <span className="bold">{metadata.LensModel}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
