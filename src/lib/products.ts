export type ProductCategory = "Furniture" | "Lighting" | "Objects" | "Tableware" | "Textiles";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material: string;
  finish: string;
  price: number;
  image: string;
  alt: string;
  description: string;
  featured?: boolean;
  badge?: string;
};

const image = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  {
    id: "sora-lamp",
    slug: "sora-portable-lamp",
    name: "Sora portable lamp",
    category: "Lighting",
    material: "Powder-coated steel",
    finish: "Fog grey",
    price: 248,
    image: image("photo-1507473885765-e6ed057f782c"),
    alt: "Sculptural graphite table lamp against a pale wall",
    description: "A softly sculpted silhouette that brings a warm, focused glow to slow evenings and everyday moments.",
    featured: true,
    badge: "New",
  },
  {
    id: "tide-set",
    slug: "tide-serving-bowls",
    name: "Tide serving bowls",
    category: "Tableware",
    material: "Glazed stoneware",
    finish: "Sea glass",
    price: 96,
    image: image("photo-1578749556568-bc2c40e68b61"),
    alt: "Hand-finished ceramic bowls in cool, muted glazes",
    description: "A pair of gently irregular serving bowls, finished by hand in a soft sea-glass glaze.",
    featured: true,
  },
  {
    id: "miro-vase",
    slug: "miro-sculpted-vase",
    name: "Miro sculpted vase",
    category: "Objects",
    material: "Stoneware",
    finish: "Chalk",
    price: 86,
    image: image("photo-1578500494198-246f612d3b3d"),
    alt: "Textured vase styled beside a relaxed living room sofa",
    description: "A tactile, sculptural vessel with a quiet presence, with or without a few branches.",
    featured: true,
  },
  {
    id: "haven-chair",
    slug: "haven-lounge-chair",
    name: "Haven lounge chair",
    category: "Furniture",
    material: "Solid oak and linen",
    finish: "Natural / oat",
    price: 1280,
    image: image("photo-1600607687939-ce8a6c25118c"),
    alt: "Light-filled contemporary living room with sculptural seating",
    description: "A generous, low-slung seat with a solid oak frame and a soft, removable linen cover.",
    featured: true,
  },
  {
    id: "morrow-lounge",
    slug: "morrow-living-room-set",
    name: "Morrow living room edit",
    category: "Furniture",
    material: "Oak, wool and linen",
    finish: "Natural tones",
    price: 860,
    image: image("photo-1600210492486-724fe5c67fb0"),
    alt: "Warm living room arranged with natural materials and soft light",
    description: "A considered arrangement of relaxed forms and natural textures for slower afternoons.",
  },
  {
    id: "loom-cushion",
    slug: "loom-linen-cushion",
    name: "Loom linen cushion",
    category: "Textiles",
    material: "European flax linen",
    finish: "Oat",
    price: 72,
    image: image("photo-1616486338812-3dadae4b4ace"),
    alt: "Layered neutral textiles in a considered living room",
    description: "An easy, substantial cushion in washed European flax linen, made to soften with time.",
  },
  {
    id: "tide-bowls",
    slug: "tide-stoneware-set",
    name: "Tide stoneware set",
    category: "Tableware",
    material: "Hand-glazed stoneware",
    finish: "Mixed coast",
    price: 64,
    image: image("photo-1578749556568-bc2c40e68b61"),
    alt: "Stacked ceramic plates and bowls in a coastal palette",
    description: "Everyday tableware with a slightly organic edge and a glaze inspired by the shoreline.",
  },
  {
    id: "arc-lamp",
    slug: "arc-reading-lamp",
    name: "Arc reading lamp",
    category: "Lighting",
    material: "Powder-coated steel",
    finish: "Graphite",
    price: 310,
    image: image("photo-1507473885765-e6ed057f782c"),
    alt: "A clean-lined reading lamp with a broad, angled shade",
    description: "A pared-back reading light with a balanced arm and a directional shade.",
  },
];

export const categories = [
  {
    name: "Furniture",
    description: "Grounded forms for living well.",
    image: image("photo-1600607687939-ce8a6c25118c", 1200),
    alt: "Sunlit contemporary living room",
  },
  {
    name: "Lighting",
    description: "A softer kind of atmosphere.",
    image: image("photo-1507473885765-e6ed057f782c", 1200),
    alt: "Sculptural lamp with a quiet silhouette",
  },
  {
    name: "Objects & textiles",
    description: "Thoughtful details for daily rituals.",
    image: image("photo-1578749556568-bc2c40e68b61", 1200),
    alt: "Muted hand-finished ceramic tableware",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
