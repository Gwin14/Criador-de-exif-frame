import { toCanvas } from "html-to-image"; // Mudamos para toCanvas por ser mais estável

export const exportImage = async (frameRef, imageLoaded) => {
  if (!frameRef.current || !imageLoaded) return;

  try {
    // Configurações otimizadas para Safari
    const options = {
      cacheBust: true,
      pixelRatio: 4, // Safari tem limites severos de memória. 2 ou 3 é o ideal.
      backgroundColor: "#ffffff",
    };

    // 1. "Esquenta" o renderizador (Safari Bug Fix)
    await toCanvas(frameRef.current, options);

    // 2. Renderização real
    const canvas = await toCanvas(frameRef.current, options);

    // 3. Conversão para Blob (mais seguro que dataUrl no Safari)
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `frame-${Date.now()}.png`;
        link.href = url;

        // Simula clique e limpa memória
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 200);
      },
      "image/png",
      1.0
    );
  } catch (error) {
    console.error("Falha na exportação:", error);
    alert("Erro ao gerar imagem. Tente novamente.");
  }
};
