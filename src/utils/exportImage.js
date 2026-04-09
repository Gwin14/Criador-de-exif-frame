import { toCanvas } from "html-to-image";

const isMobile = () => /android|iphone|ipad|ipod/i.test(navigator.userAgent);

const renderCanvas = async (frameRef) => {
  const options = {
    cacheBust: true,
    pixelRatio: 3,
    backgroundColor: "#ffffff",
    style: { transform: "none", margin: "0" },
  };

  // warm render (helps Safari)
  await toCanvas(frameRef.current, options);
  return toCanvas(frameRef.current, options);
};

const downloadBlob = (blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `exif-frame-${Date.now()}.png`;
  link.href = url;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
};

const openImageFallback = (blob) => {
  const url = URL.createObjectURL(blob);
  const newTab = window.open(url, "_blank");

  // iOS Safari fallback: user long press → save image
  if (!newTab) {
    window.location.href = url;
  }
};

export const exportImage = async (frameRef, imageLoaded) => {
  if (!frameRef.current || !imageLoaded) return;

  try {
    const canvas = await renderCanvas(frameRef);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        const file = new File([blob], `exif-frame-${Date.now()}.png`, {
          type: "image/png",
        });

        // 1️⃣ Best case: native share sheet (mobile)
        if (
          isMobile() &&
          navigator.share &&
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          try {
            await navigator.share({
              files: [file],
              title: "EXIF Frame",
              text: "Imagem gerada",
            });
            return;
          } catch (err) {
            // user cancelled or unsupported
          }
        }

        // 2️⃣ Desktop / Android download
        if (!isMobile()) {
          downloadBlob(blob);
          return;
        }

        // 3️⃣ Mobile fallback (open image so user can save)
        openImageFallback(blob);
      },
      "image/png",
      1,
    );
  } catch (error) {
    console.error("Falha na exportação:", error);
    alert("Erro ao gerar imagem. Tente novamente.");
  }
};
