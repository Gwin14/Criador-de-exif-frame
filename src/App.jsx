import React, { useRef, useState, useEffect } from "react";
import exifr from "exifr";
import { toPng } from "html-to-image";
import Classic from "./components/frames/Classic";
import "./App.css";
import { FiTrash2 } from "react-icons/fi";
import Confetti from "react-confetti";

const DB_NAME = "exif-frame-db";
const STORE_NAME = "images";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveItem(key, value) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(value, key);
}

async function getItem(key) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const req = tx.objectStore(STORE_NAME).get(key);

  return new Promise((resolve) => {
    req.onsuccess = () => resolve(req.result || null);
  });
}

async function clearStore() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).clear();
}

export default function App() {
  const [metadata, setMetadata] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const frameRef = useRef(null);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [showConfetti, setShowConfetti] = useState(false);

  // ---------- helpers ----------

  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const waitForImages = async (element) => {
    const images = element.querySelectorAll("img");

    await Promise.all(
      [...images].map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth !== 0) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve; // não trava export
            }
          })
      )
    );
  };

  // ---------- effects ----------

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

  useEffect(() => {
    (async () => {
      const img = await getItem("lastImage");
      const meta = await getItem("lastMetadata");

      if (img && meta) {
        setImageUrl(img);
        setMetadata(meta);
      }
    })();
  }, []);

  // ---------- actions ----------

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoaded(false);

    const base64 = await fileToBase64(file);
    setImageUrl(base64);
    await saveItem("lastImage", base64);

    const data = await exifr.parse(file, {
      exif: true,
      tiff: true,
      gps: true,
    });

    setMetadata(data);
    await saveItem("lastMetadata", data);
  };

  const exportImage = async () => {
    if (!frameRef.current || !imageLoaded) return;

    // garante que TODAS as imagens do frame carregaram
    await waitForImages(frameRef.current);

    const dataUrl = await toPng(frameRef.current, {
      cacheBust: false,
      pixelRatio: 4,
      skipFonts: true,

      includeQueryParams: true,

      fetchRequestInit: {
        cache: "force-cache",
      },
    });

    const link = document.createElement("a");
    link.download = "foto-com-metadados.png";
    link.href = dataUrl;
    link.click();

    if (!showConfetti) setShowConfetti(true);
  };

  const preloadImages = [
    "/assets/apple.png",
    "/assets/canon.png",
    "/assets/sony.png",
    "/assets/nikon.png",
    "/assets/fuji.png",
    "/assets/olympus.png",
    "/assets/panasonic.png",
    "/assets/leica.png",
  ];

  // ---------- render ----------

  return (
    <div>
      <div style={{ display: "none" }}>
        {preloadImages.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

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
              onClick={exportImage}
              disabled={!imageLoaded}
            >
              Exportar como imagem
            </button>

            <button
              className="trash-button blue-btn"
              onClick={async () => {
                setImageUrl(null);
                setMetadata(null);
                await clearStore();
              }}
            >
              <FiTrash2 />
            </button>
          </section>
        </>
      ) : (
        <div>
          <h1 className="title">Gerador de EXIF Frame</h1>

          <div className="image-upload">
            <p>Clique ou arraste uma foto</p>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
        </div>
      )}
    </div>
  );
}
