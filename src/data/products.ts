export type Product = {
  id: number;
  slug: string;
  title: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: boolean;
  inStock: boolean;
  width?: string;
  height?: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 1,
    slug: "fist-bump-couple-sculpture",
    title: "Fist Bump Couple Sculpture",
    category: "Showpieces",
    price: 89,
    oldPrice: 129,
    rating: 4.8,
    reviews: 124,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/showpieces/showpiece2.png",
    gallery: [
      "/images/showpieces/showpiece2.png",
      "/images/showpieces/showpiece2.1.png",
      "/images/showpieces/showpiece2.2.png",
    ],
    description:
      "Black and red ceramic hand or fist sculptures in fist bump pose. Bold conversation piece.",
    features: [
      "Premium ceramic finish",
      "Handcrafted detailing",
      "Luxury decor piece",
      "Modern aesthetic",
    ],
  },

  {
    id: 2,
    slug: "hug-couple-figurine",
    title: "Hug Couple Figurine",
    category: "Handcraft Idols",
    price: 119,
    oldPrice: 169,
    rating: 4.7,
    reviews: 96,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/Idols/idols2.png",
    gallery: [
      "/images/Idols/idols2.png",
      "/images/Idols/idols2.1.png",
      "/images/Idols/idols2.2.png",
      "/images/Idols/idols2.3.png",
    ],
    description:
      "White and black abstract human couple hugging each other. Togetherness concept piece.",
    features: [
      "Marble dust finish",
      "Elegant handcrafted style",
      "Premium quality",
      "Luxury decor appeal",
    ],
  },

  {
    id: 3,
    slug: "teal-floral-crown-donut-vase",
    title: "Teal Floral Crown Donut Vase",
    category: "Vases",
    price: 59,
    oldPrice: 89,
    rating: 4.9,
    reviews: 142,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/Vases/Vase2.jpeg",
    gallery: [
      "/images/Vases/vase2.jpeg",
      "/images/Vases/Vase2.1.jpeg",
      "/images/Vases/Vase2.2.jpeg",
      "/images/Vases/Vase2.jpeg",
    ],
    description:
      "Teal donut vase with stunning 3D ceramic flower crown on top. Premium product shot.",
    features: [
      "Premium ceramic material",
      "Luxury matte finish",
      "Dishwasher safe",
      "Modern design",
    ],
  },

  {
    id: 4,
    slug: "black-phoenix",
    title: "Black Phoenix",
    category: "Showpieces",
    price: 149,
    oldPrice: 199,
    rating: 4.8,
    reviews: 88,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/showpieces/showpiece3.png",
    gallery: [
      "/images/showpieces/showpiece3.png",
      "/images/showpieces/showpiece3.1.png",
      "/images/showpieces/showpiece3.2.png",
      "/images/showpieces/showpiece3.3.png",
    ],
    description:
      "Black and red matching phoenix or bird abstract sculptures. Foam background product shot.",
    features: [
      "Handcrafted design",
      "Premium finish",
      "Luxury home decor",
      "Durable quality",
    ],
  },

  {
    id: 5,
    slug: "speckled-orbit-vase",
    title: "Speckled Orbit Vase",
    category: "Vases",
    price: 99,
    oldPrice: 139,
    rating: 4.7,
    reviews: 103,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/Vases/Vase3.png",
    gallery: [
      "/images/Vases/Vase3.png",
      "/images/Vases/Vase3.1.png",
      "/images/Vases/Vase3.2.png",
      "/images/Vases/Vase3.3.png",
    ],
    description:
      "Round donut-shaped beige matte vase with blue speckles and center hole. Minimalist handcrafted design.",
    features: [
      "Premium ceramic body",
      "Scratch resistant",
      "Luxury finish",
      "Food safe material",
    ],
  },

  {
    id: 6,
    slug: "white-yoga-thinker-set",
    title: "White Yoga Thinker Set",
    category: "Handcraft Idols",
    price: 79,
    oldPrice: 119,
    rating: 4.6,
    reviews: 65,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/Idols/idols3.png",
    gallery: [
      "/images/Idols/idols3.png",
      "/images/Idols/idols3.1.png",
      "/images/Idols/idols3.2.png",
      "/images/Idols/idols3.3.png",
    ],
    description:
      "3 white abstract human figurines in yoga or contemplative sitting poses. Workshop floor shot.",
    features: [
      "Wall hanging ready",
      "Traditional artwork",
      "Premium finish",
      "Elegant aesthetics",
    ],
  },

  {
    id: 7,
    slug: "cherry-spiral-triple-vase",
    title: "Cherry Spiral Triple Vase",
    category: "Vases",
    price: 69,
    oldPrice: 99,
    rating: 4.7,
    reviews: 91,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/Vases/Vase4.png",
    gallery: [
      "/images/Vases/Vase4.png",
      "/images/Vases/Vase4.1.png",
      "/images/Vases/Vase4.2.png",
      "/images/Vases/Vase4.3.png",
    ],
    description:
      "S-shaped vase with 3 openings, hand-painted cherries, strawberries and hearts. Playful design.",
    features: [
      "Luxury metallic finish",
      "Elegant handcrafted design",
      "Premium quality",
      "Modern decor piece",
    ],
  },

  {
    id: 8,
    slug: "dancing-couple-figurine",
    title: "Dancing Couple Figurine",
    category: "Showpieces",
    price: 179,
    oldPrice: 249,
    rating: 4.9,
    reviews: 171,
    stock: true,
    inStock: true,
    width: "",
    height: "",
    image: "/images/showpieces/showpiece4.png",
    gallery: [
      "/images/showpieces/showpiece4.png",
      "/images/showpieces/showpiece4.1.png",
      "/images/showpieces/showpiece4.2.png",
    ],
    description:
      "Red and black abstract ceramic dancing couple in passionate tango pose. Romantic decor.",
    features: [
      "Premium wall artwork",
      "Luxury finish",
      "Easy installation",
      "Modern design",
    ],
  },
];