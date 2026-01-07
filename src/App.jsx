import React, { useRef, useState, useEffect } from "react";
import exifr from "exifr";
import { toPng } from "html-to-image";
import Classic from "./components/frames/Classic";
import "./App.css";
import { FiTrash2 } from "react-icons/fi";

import Confetti from "react-confetti";

export default function App() {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const frameRef = useRef(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    if (showConfetti) return;
    setShowConfetti(true);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoaded(false);
    const base64 = await fileToBase64(file);
    setImageUrl(base64);

    const data = await exifr.parse(file, {
      exif: true,
      tiff: true,
      gps: true,
    });

    setMetadata(data);
  };

  const exportImage = async () => {
    if (!frameRef.current || !imageLoaded) return;

    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await toPng(frameRef.current, {
      cacheBust: true,
      pixelRatio: 4,
      skipFonts: true,
    });

    const link = document.createElement("a");
    link.download = "foto-com-metadados.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={size.width}
          height={size.height}
          numberOfPieces={500}
          recycle={false}
          gravity={0.3}
        />
      )}

      {imageUrl && metadata ? (
        <>
          {/* FRAME */}
          <Classic
            frameRef={frameRef}
            imageUrl={imageUrl}
            metadata={metadata}
            setImageLoaded={setImageLoaded}
          />

          <br />
          <section className="action-buttons">
            <button
              className="export-button blue-btn"
              onClick={() => {
                exportImage();
                handleClick();
              }}
              disabled={!imageLoaded}
            >
              Exportar como imagem
            </button>
            <button
              className="trash-button blue-btn"
              onClick={() => setImageUrl(null)}
            >
              <FiTrash2 />
            </button>
          </section>
        </>
      ) : (
        <div>
          <h1 className="title">Gerador de exif frame</h1>
          <div className="image-upload">
            <p>Clique ou arraste uma foto</p>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
        </div>
      )}
    </div>
  );
}
