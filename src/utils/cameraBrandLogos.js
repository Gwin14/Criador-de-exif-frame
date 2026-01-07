const BRANDS = [
  {
    name: "Apple",
    match: ["apple", "iphone"],
    logo: "src/assets/brandIcons/apple.png",
  },
  {
    name: "Canon",
    match: ["canon"],
    logo: "src/assets/brandIcons/canon.png",
  },
  {
    name: "Nikon",
    match: ["nikon"],
    logo: "src/assets/brandIcons/nikon.png",
  },
  {
    name: "Sony",
    match: ["sony"],
    logo: "src/assets/brandIcons/sony.png",
  },
  {
    name: "Fujifilm",
    match: ["fujifilm", "fuji"],
    logo: "src/assets/brandIcons/fujifilm.png",
  },
  {
    name: "Leica",
    match: ["leica"],
    logo: "src/assets/brandIcons/leica.png",
  },
  {
    name: "Panasonic",
    match: ["panasonic", "lumix"],
    logo: "src/assets/brandIcons/panasonic.png",
  },
  {
    name: "Olympus",
    match: ["olympus", "om system", "omsystem"],
    logo: "src/assets/brandIcons/olympus.png",
  },
  {
    name: "Pentax",
    match: ["pentax", "ricoh"],
    logo: "src/assets/brandIcons/pentax.png",
  },
  {
    name: "Hasselblad",
    match: ["hasselblad"],
    logo: "src/assets/brandIcons/hasselblad.png",
  },
  {
    name: "DJI",
    match: ["dji"],
    logo: "src/assets/brandIcons/dji.png",
  },
  {
    name: "GoPro",
    match: ["gopro"],
    logo: "src/assets/brandIcons/gopro.png",
  },
];

export function getCameraBrandLogo(make) {
  if (!make) {
    return {
      name: null,
      logo: null,
    };
  }

  const normalized = make.toLowerCase();

  const brand = BRANDS.find((b) =>
    b.match.some((keyword) => normalized.includes(keyword))
  );

  if (!brand) {
    return {
      name: null,
      logo: null,
    };
  }

  return {
    name: brand.name,
    logo: brand.logo,
  };
}
