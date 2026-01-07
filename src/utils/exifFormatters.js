export function formatFNumber(value) {
  if (!value) return "-";
  return Number(value).toLocaleString("pt-BR", {
    maximumFractionDigits: 2,
  });
}

export function formatShutter(exposureTime) {
  const t = Number(exposureTime);
  if (!t) return "-";

  if (t >= 1) return `${t}s`;
  return `1/${Math.round(1 / t)}s`;
}

export function formatFocalLength(value) {
  if (!value) return "-";
  return `${Math.round(Number(value))}mm`;
}
