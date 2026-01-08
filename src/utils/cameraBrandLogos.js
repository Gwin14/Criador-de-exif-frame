import apple from "../assets/brandIcons/apple.png";
import canon from "../assets/brandIcons/canon.png";
import nikon from "../assets/brandIcons/nikon.png";
import sony from "../assets/brandIcons/sony.png";
import fujifilm from "../assets/brandIcons/fujifilm.png";
import leica from "../assets/brandIcons/leica.png";
import panasonic from "../assets/brandIcons/panasonic.png";
import olympus from "../assets/brandIcons/olympus.png";
import pentax from "../assets/brandIcons/pentax.png";
import hasselblad from "../assets/brandIcons/hasselblad.png";
import dji from "../assets/brandIcons/dji.png";
import gopro from "../assets/brandIcons/gopro.png";
import samsung from "../assets/brandIcons/samsung.png";
import xiaomi from "../assets/brandIcons/xiaomi.png";
import huawei from "../assets/brandIcons/huawei.png";
import google from "../assets/brandIcons/google.png";
import oneplus from "../assets/brandIcons/oneplus.png";
import oppo from "../assets/brandIcons/oppo.png";

const BRANDS = [
  { name: "Apple", match: ["apple", "iphone"], logo: apple },
  { name: "Canon", match: ["canon"], logo: canon },
  { name: "Nikon", match: ["nikon"], logo: nikon },
  { name: "Sony", match: ["sony"], logo: sony },
  { name: "Fujifilm", match: ["fujifilm", "fuji"], logo: fujifilm },
  { name: "Leica", match: ["leica"], logo: leica },
  { name: "Panasonic", match: ["panasonic", "lumix"], logo: panasonic },
  { name: "Pentax", match: ["pentax", "ricoh"], logo: pentax },
  { name: "Hasselblad", match: ["hasselblad"], logo: hasselblad },
  { name: "DJI", match: ["dji"], logo: dji },
  { name: "GoPro", match: ["gopro"], logo: gopro },
  { name: "Samsung", match: ["samsung"], logo: samsung },
  { name: "Xiaomi", match: ["xiaomi", "redmi", "poco"], logo: xiaomi },
  { name: "Huawei", match: ["huawei", "honor"], logo: huawei },
  { name: "Google", match: ["pixel", "google"], logo: google },
  { name: "OnePlus", match: ["oneplus"], logo: oneplus },
  { name: "Oppo", match: ["oppo", "realme"], logo: oppo },
  {
    name: "Olympus",
    match: ["olympus", "om system", "omsystem"],
    logo: olympus,
  },
];

export function getCameraBrandLogo(make) {
  if (!make) {
    return { name: null, logo: null };
  }

  const normalized = make.toLowerCase();

  const brand = BRANDS.find((b) =>
    b.match.some((keyword) => normalized.includes(keyword))
  );

  if (!brand) {
    return { name: null, logo: null };
  }

  return { name: brand.name, logo: brand.logo };
}
