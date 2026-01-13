import {
  formatFNumber,
  formatFocalLength,
  formatShutter,
} from "../../utils/exifFormatters";
import { getCameraBrandLogo } from "../../utils/cameraBrandLogos";
import "./Classic.css";
import Sidebar from "../Sidebar";
import { useState } from "react";

export default function Classic({
  frameRef,
  imageUrl,
  metadata,
  setImageLoaded,
}) {
  const brand = getCameraBrandLogo(metadata.Make);
  const [modifiers, setModifiers] = useState({});

  const initialModifiers = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    outerBorderRadius: 0,
    innerBorderRadius: 0,
  };

  return (
    <>
      <div
        ref={frameRef}
        className="classic-frame"
        style={{
          paddingTop: `${modifiers.paddingTop ?? 0}px`,
          paddingLeft: `${modifiers.paddingLeft ?? 0}px`,
          paddingRight: `${modifiers.paddingRight ?? 0}px`,
          paddingBottom: `${modifiers.paddingBottom ?? 0}px`,
          borderRadius: `${modifiers.outerBorderRadius ?? 0}px`,
        }}
      >
        {/* FOTO */}
        <img
          className="photo"
          src={imageUrl}
          alt="foto"
          crossOrigin="anonymous"
          onLoad={() => setImageLoaded(true)}
          style={{ borderRadius: `${modifiers.innerBorderRadius}px` }}
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

      <Sidebar initialModifiers={initialModifiers} onChange={setModifiers} />
    </>
  );
}
