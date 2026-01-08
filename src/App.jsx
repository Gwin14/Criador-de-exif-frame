import React, { useRef, useState, useEffect } from "react";
import exifr from "exifr";
import Classic from "./components/frames/Classic";
import "./App.css";
import { FiTrash2 } from "react-icons/fi";
import Confetti from "react-confetti";
import { exportImage } from "./utils/exportImage";

export default function App() {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const frameRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (showConfetti) return;
    setShowConfetti(true);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoaded(false);
    try {
      const base64 = await fileToBase64(file);
      setImageUrl(base64);

      const data = await exifr.parse(file, {
        exif: true,
        tiff: true,
        gps: true,
      });
      setMetadata(data || {});
    } catch (err) {
      console.error("Erro ao processar imagem:", err);
    }
  };

  return (
    <div className="container">
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
          <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
            <Classic
              frameRef={frameRef}
              imageUrl={imageUrl}
              metadata={metadata}
              setImageLoaded={setImageLoaded}
            />
          </div>

          <section className="action-buttons" style={{ marginTop: "20px" }}>
            <button
              className="export-button blue-btn"
              onClick={() => {
                exportImage(frameRef, imageLoaded);
                handleClick();
              }}
              disabled={!imageLoaded}
            >
              {imageLoaded ? "Exportar como imagem" : "Carregando..."}
            </button>
            <button
              className="trash-button blue-btn"
              onClick={() => {
                setImageUrl(null);
                setMetadata(null);
                setImageLoaded(false);
              }}
            >
              <FiTrash2 />
            </button>
          </section>
        </>
      ) : (
        <div className="upload-screen">
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
