export type ColorOption = {
  name: string;
  hex: string;
};

export type Category =
  | "T-Shirts"
  | "Shirts"
  | "Polo Shirts"
  | "Jeans"
  | "Shorts"
  | "Jackets"
  | "Coats"
  | "Suits";

export const CATEGORIES: Category[] = [
  "Shirts",
  "Polo Shirts",
  "Shorts",
  "Suits",
  "T-Shirts",
  "Jeans",
  "Jackets",
  "Coats",
];

export const COLLECTIONS = ["New", "Best sellers"] as const;
export type Collection = (typeof COLLECTIONS)[number];

export const SIZES = ["XS", "S", "M", "L", "XL", "2X"] as const;
export type Size = (typeof SIZES)[number];

export type Product = {
  slug: string;
  /** Small label above the product name, e.g. "Cotton T Shirt". */
  family: string;
  name: string;
  price: number;
  category: Category;
  collections: Collection[];
  audience: ("Men" | "Women" | "Kid")[];
  colors: ColorOption[];
  sizes: Size[];
  /** Unsplash photo ids; the first is the primary shot. */
  images: string[];
  description: string;
  tags: string[];
  rating: number;
  inStock: boolean;
};

const INK: ColorOption = { name: "Black", hex: "#111111" };
const BONE: ColorOption = { name: "Bone", hex: "#efece4" };
const SAND: ColorOption = { name: "Sand", hex: "#cbbba0" };
const SLATE: ColorOption = { name: "Slate", hex: "#5b6570" };
const OLIVE: ColorOption = { name: "Olive", hex: "#5f6144" };
const CLAY: ColorOption = { name: "Clay", hex: "#a4695a" };
const INDIGO: ColorOption = { name: "Indigo", hex: "#33445e" };
const GREY: ColorOption = { name: "Heather", hex: "#9b9b96" };

const ALL_SIZES = [...SIZES];

export const PRODUCTS: Product[] = [
  {
    slug: "embroidered-seersucker-shirt",
    family: "V-Neck T-Shirt",
    name: "Embroidered Seersucker Shirt",
    price: 99,
    category: "Shirts",
    collections: ["New"],
    audience: ["Men"],
    colors: [BONE, INK, SAND, SLATE, OLIVE],
    sizes: ALL_SIZES,
    images: [
      "photo-1596755094514-f87e34085b2c",
      "photo-1523381210434-271e8be1f52b",
      "photo-1490481651871-ab68de25d43d",
      "photo-1567401893414-76b7b1e5a7a5",
    ],
    description:
      "Relaxed-fit shirt in crinkled seersucker cotton. Camp collar, short sleeves and a tonal chest embroidery finished by hand.",
    tags: ["Cotton", "Summer", "Relaxed"],
    rating: 4.8,
    inStock: true,
  },
  {
    slug: "basic-slim-fit-t-shirt",
    family: "Cotton T Shirt",
    name: "Basic Slim Fit T-Shirt",
    price: 99,
    category: "T-Shirts",
    collections: ["New", "Best sellers"],
    audience: ["Men", "Women"],
    colors: [INK, BONE, GREY, OLIVE, CLAY, SLATE],
    sizes: ALL_SIZES,
    images: [
      "photo-1521572163474-6864f9cf17ab",
      "photo-1571945153237-4929e783af4a",
      "photo-1552374196-c4e7ffc6e126",
      "photo-1529374255404-311a2a4f1fd9",
    ],
    description:
      "A slim-cut tee in long-staple combed cotton. Ribbed crew neck, clean side seams and a hem that holds its shape wash after wash.",
    tags: ["Cotton", "Everyday", "Slim"],
    rating: 4.6,
    inStock: true,
  },
  {
    slug: "blurred-print-t-shirt",
    family: "Henley T-Shirt",
    name: "Blurred Print T-Shirt",
    price: 99,
    category: "T-Shirts",
    collections: ["New"],
    audience: ["Men"],
    colors: [BONE, INK, INDIGO],
    sizes: ALL_SIZES,
    images: [
      "photo-1503341455253-b2e723bb3dbb",
      "photo-1618354691373-d851c5c3a990",
      "photo-1618453292459-53424b66bb6a",
      "photo-1552374196-c4e7ffc6e126",
    ],
    description:
      "Heavyweight jersey tee with a soft-focus placement print, screened in water-based inks so the hand stays light.",
    tags: ["Print", "Heavyweight"],
    rating: 4.7,
    inStock: true,
  },
  {
    slug: "full-sleeve-zipper",
    family: "Crewneck T-Shirt",
    name: "Full Sleeve Zipper",
    price: 99,
    category: "Jackets",
    collections: ["New"],
    audience: ["Men", "Women"],
    colors: [SLATE, INK],
    sizes: ALL_SIZES,
    images: [
      "photo-1591047139829-d91aecb6caea",
      "photo-1611312449408-fcece27cdbb7",
      "photo-1551028719-00167b16eac5",
      "photo-1521223890158-f9f7c3d5d504",
    ],
    description:
      "Full-zip layer in brushed loopback cotton. Set-in sleeves, tonal hardware and a stand collar that sits flat under a coat.",
    tags: ["Layer", "Zip", "Brushed"],
    rating: 4.5,
    inStock: true,
  },
  {
    slug: "basic-heavy-weight-t-shirt",
    family: "Cotton T Shirt",
    name: "Basic Heavy Weight T-shirt",
    price: 199,
    category: "T-Shirts",
    collections: ["Best sellers"],
    audience: ["Men", "Women", "Kid"],
    colors: [BONE, INK, SAND, GREY, OLIVE],
    sizes: ALL_SIZES,
    images: [
      "photo-1620799140408-edc6dcb6d633",
      "photo-1529374255404-311a2a4f1fd9",
      "photo-1554568218-0f1715e72254",
      "photo-1521572163474-6864f9cf17ab",
    ],
    description:
      "240gsm cotton, garment-dyed for depth of colour. Boxy through the body with a double-stitched collar that will not roll.",
    tags: ["Cotton", "Boxy", "Garment-dyed"],
    rating: 4.9,
    inStock: true,
  },
  {
    slug: "soft-wash-straight-fit-jeans",
    family: "Cotton jeans",
    name: "Soft Wash Straight Fit Jeans",
    price: 199,
    category: "Jeans",
    collections: ["Best sellers"],
    audience: ["Men", "Women"],
    colors: [INDIGO, SLATE, INK, BONE, GREY, SAND],
    sizes: ALL_SIZES,
    images: [
      "photo-1602293589930-45aad59ba3ab",
      "photo-1560243563-062bfc001d68",
      "photo-1495121605193-b116b5b9c5fe",
      "photo-1475178626620-a4d074967452",
    ],
    description:
      "Straight leg in 12oz rigid denim, stone-washed to a lived-in hand. Mid rise, five pockets, copper rivets.",
    tags: ["Denim", "Straight", "Washed"],
    rating: 4.7,
    inStock: true,
  },
  {
    slug: "abstract-print-shirt",
    family: "Cotton Shirt",
    name: "Abstract Print Shirt",
    price: 99,
    category: "Shirts",
    collections: ["New", "Best sellers"],
    audience: ["Men"],
    colors: [BONE, INK, CLAY, OLIVE],
    sizes: ALL_SIZES,
    images: [
      "photo-1576566588028-4147f3842f27",
      "photo-1503341455253-b2e723bb3dbb",
      "photo-1618354691373-d851c5c3a990",
      "photo-1618453292459-53424b66bb6a",
    ],
    description:
      "Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.",
    tags: ["Print", "Camp collar", "Relaxed"],
    rating: 4.8,
    inStock: true,
  },
  {
    slug: "pique-polo-shirt",
    family: "Cotton Polo",
    name: "Piqué Polo Shirt",
    price: 129,
    category: "Polo Shirts",
    collections: ["New"],
    audience: ["Men"],
    colors: [BONE, OLIVE, INK, SLATE],
    sizes: ALL_SIZES,
    images: [
      "photo-1622519407650-3df9883f76a5",
      "photo-1552374196-c4e7ffc6e126",
      "photo-1571945153237-4929e783af4a",
      "photo-1618453292459-53424b66bb6a",
    ],
    description:
      "Classic three-button polo in cotton piqué with a ribbed collar and side vents at the hem.",
    tags: ["Piqué", "Classic"],
    rating: 4.4,
    inStock: true,
  },
  {
    slug: "pleated-tailored-shorts",
    family: "Linen Shorts",
    name: "Pleated Tailored Shorts",
    price: 119,
    category: "Shorts",
    collections: ["New"],
    audience: ["Men", "Women"],
    colors: [SAND, BONE, INK],
    sizes: ALL_SIZES,
    images: [
      "photo-1594633312681-425c7b97ccd1",
      "photo-1475178626620-a4d074967452",
      "photo-1495121605193-b116b5b9c5fe",
    ],
    description:
      "Single-pleat shorts cut from washed linen. Extended tab closure and a tailored break just above the knee.",
    tags: ["Linen", "Tailored", "Summer"],
    rating: 4.3,
    inStock: true,
  },
  {
    slug: "double-breasted-wool-suit",
    family: "Wool Suit",
    name: "Double Breasted Wool Suit",
    price: 649,
    category: "Suits",
    collections: ["Best sellers"],
    audience: ["Men"],
    colors: [INK, SLATE, INDIGO],
    sizes: ALL_SIZES,
    images: [
      "photo-1617137968427-85924c800a22",
      "photo-1487222477894-8943e31ef7b2",
      "photo-1521223890158-f9f7c3d5d504",
    ],
    description:
      "Peak-lapel suit in a mid-weight wool twill. Half-canvassed construction, functional cuffs, flat-front trouser.",
    tags: ["Wool", "Tailoring", "Formal"],
    rating: 4.9,
    inStock: false,
  },
  {
    slug: "boxy-denim-jacket",
    family: "Denim Jacket",
    name: "Boxy Denim Jacket",
    price: 229,
    category: "Jackets",
    collections: ["Best sellers"],
    audience: ["Men", "Women"],
    colors: [INDIGO, BONE, INK],
    sizes: ALL_SIZES,
    images: [
      "photo-1611312449408-fcece27cdbb7",
      "photo-1516257984-b1b4d707412e",
      "photo-1560243563-062bfc001d68",
      "photo-1495121605193-b116b5b9c5fe",
    ],
    description:
      "A squared-off trucker in rigid selvedge denim, cut a size up through the shoulder so it layers over knitwear.",
    tags: ["Denim", "Boxy", "Selvedge"],
    rating: 4.6,
    inStock: true,
  },
  {
    slug: "wool-overcoat",
    family: "Wool Coat",
    name: "Single Breasted Overcoat",
    price: 549,
    category: "Coats",
    collections: ["New", "Best sellers"],
    audience: ["Men", "Women"],
    colors: [SAND, INK, SLATE],
    sizes: ALL_SIZES,
    images: [
      "photo-1483985988355-763728e1935b",
      "photo-1608234808654-2a8875faa7fd",
      "photo-1487222477894-8943e31ef7b2",
    ],
    description:
      "Knee-length overcoat in a brushed wool-cashmere blend. Notch lapel, welt pockets, unstructured shoulder.",
    tags: ["Wool", "Cashmere", "Outerwear"],
    rating: 4.8,
    inStock: true,
  },
  {
    slug: "oversized-poplin-shirt",
    family: "Poplin Shirt",
    name: "Oversized Poplin Shirt",
    price: 149,
    category: "Shirts",
    collections: ["New"],
    audience: ["Women"],
    colors: [BONE, INK, INDIGO, CLAY],
    sizes: ALL_SIZES,
    images: [
      "photo-1581044777550-4cfa60707c03",
      "photo-1554568218-0f1715e72254",
      "photo-1523381210434-271e8be1f52b",
      "photo-1490481651871-ab68de25d43d",
    ],
    description:
      "Dropped-shoulder shirt in crisp cotton poplin with a concealed placket and a curved shirttail hem.",
    tags: ["Poplin", "Oversized"],
    rating: 4.5,
    inStock: true,
  },
  {
    slug: "wide-leg-trouser-jean",
    family: "Cotton jeans",
    name: "Wide Leg Trouser Jean",
    price: 189,
    category: "Jeans",
    collections: ["New"],
    audience: ["Women"],
    colors: [INDIGO, BONE, INK],
    sizes: ALL_SIZES,
    images: [
      "photo-1475178626620-a4d074967452",
      "photo-1594633312681-425c7b97ccd1",
      "photo-1602293589930-45aad59ba3ab",
    ],
    description:
      "High-rise denim with a full, straight-falling leg and a clean tonal topstitch throughout.",
    tags: ["Denim", "Wide leg", "High rise"],
    rating: 4.4,
    inStock: true,
  },
  {
    slug: "cropped-bomber-jacket",
    family: "Nylon Jacket",
    name: "Cropped Bomber Jacket",
    price: 279,
    category: "Jackets",
    collections: ["New"],
    audience: ["Women"],
    colors: [INK, OLIVE, BONE],
    sizes: ALL_SIZES,
    images: [
      "photo-1521223890158-f9f7c3d5d504",
      "photo-1551028719-00167b16eac5",
      "photo-1487222477894-8943e31ef7b2",
    ],
    description:
      "Lightweight bomber in matte technical nylon. Ribbed collar and cuffs, two-way zip, packable.",
    tags: ["Nylon", "Cropped", "Technical"],
    rating: 4.5,
    inStock: true,
  },
  {
    slug: "kids-heavy-jersey-tee",
    family: "Cotton T Shirt",
    name: "Kids Heavy Jersey Tee",
    price: 59,
    category: "T-Shirts",
    collections: ["New"],
    audience: ["Kid"],
    colors: [BONE, INK, CLAY, OLIVE],
    sizes: ["XS", "S", "M"],
    images: [
      "photo-1613852348851-df1739db8201",
      "photo-1529374255404-311a2a4f1fd9",
      "photo-1576566588028-4147f3842f27",
    ],
    description:
      "The heavyweight tee, scaled down. Reinforced neck tape and a generous cut for room to grow.",
    tags: ["Cotton", "Kids"],
    rating: 4.7,
    inStock: true,
  },
  {
    slug: "merino-crew-knit",
    family: "Merino Knit",
    name: "Fine Gauge Crew Knit",
    price: 209,
    category: "T-Shirts",
    collections: ["Best sellers"],
    audience: ["Men", "Women"],
    colors: [SAND, INK, SLATE, OLIVE],
    sizes: ALL_SIZES,
    images: [
      "photo-1434389677669-e08b4cac3105",
      "photo-1622519407650-3df9883f76a5",
      "photo-1509319117193-57bab727e09d",
    ],
    description:
      "Extra-fine merino knit in a 14-gauge crew. Light enough to wear alone, thin enough to layer under tailoring.",
    tags: ["Merino", "Knit"],
    rating: 4.8,
    inStock: true,
  },
  {
    slug: "utility-chore-coat",
    family: "Cotton Coat",
    name: "Utility Chore Coat",
    price: 319,
    category: "Coats",
    collections: ["New"],
    audience: ["Men"],
    colors: [OLIVE, INK, SAND],
    sizes: ALL_SIZES,
    images: [
      "photo-1608234808654-2a8875faa7fd",
      "photo-1483985988355-763728e1935b",
      "photo-1487222477894-8943e31ef7b2",
    ],
    description:
      "Three-pocket chore coat in dry-handle cotton canvas that softens with wear. Corozo buttons throughout.",
    tags: ["Canvas", "Workwear"],
    rating: 4.6,
    inStock: true,
  },
];

export const PRODUCT_MAP = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return PRODUCT_MAP.get(slug);
}

export function formatPrice(value: number): string {
  return `$ ${value.toFixed(0)}`;
}

export function relatedProducts(slug: string, count = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return PRODUCTS.slice(0, count);

  return PRODUCTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === current.category ? 2 : 0) +
        (p.audience.some((x) => current.audience.includes(x)) ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}
