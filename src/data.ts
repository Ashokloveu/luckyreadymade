import { Product } from './types';

export const products: Product[] = [
  // --- MEN'S CLOTHING ---
  {
    id: 'm1',
    name: 'Premium Denim Casual Jacket',
    price: 2499,
    originalPrice: 3999,
    category: 'men',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600',
    tags: ['Best Seller', 'New Arrival'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Levi\'s',
    description: 'A classic, rugged denim jacket designed with heavy-duty cotton and premium buttons. Ideal for cool evenings and effortless casual styling.'
  },
  {
    id: 'm2',
    name: 'Classic Checkered Flannel Shirt',
    price: 1499,
    originalPrice: 1999,
    category: 'men',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=600',
    tags: ['Trending'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Jockey',
    description: 'Soft brushed cotton flannel shirt featuring double chest pockets. Comfortable, warm, and highly versatile.'
  },
  {
    id: 'm3',
    name: 'Slim-Fit Stretch Chino Trousers',
    price: 1899,
    originalPrice: 2799,
    category: 'men',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    tags: ['Comfort Fit'],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    brand: 'Levi\'s',
    description: 'Tapered stretch chinos crafted for comfort and daily wear. Goes perfectly with both formal shirts and relaxed tees.'
  },
  {
    id: 'm4',
    name: 'Classic White Pique Polo',
    price: 999,
    originalPrice: 1499,
    category: 'men',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
    tags: ['Summer Special'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Jockey',
    description: 'Breathable combed cotton pique knit polo shirt with signature collar tipping and rib-knit cuffs.'
  },

  // --- WOMEN'S CLOTHING ---
  {
    id: 'w1',
    name: 'A-Line Coral Pink Midi Dress',
    price: 2199,
    originalPrice: 3299,
    category: 'women',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    tags: ['Elegant', 'Featured'],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    brand: 'Supreme',
    description: 'An elegant, fluid A-line midi dress in soft pink with a tailored waistline and gentle ruffles. Perfect for celebrations and daytime outings.'
  },
  {
    id: 'w2',
    name: 'Comfy Lavender Pastel Hoodie',
    price: 1799,
    originalPrice: 2499,
    category: 'women',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?auto=format&fit=crop&q=80&w=600',
    tags: ['Cozy Wear', 'Popular'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Supreme',
    description: 'Soft fleece hoodie in an attractive lavender pastel hue, complete with deep kangaroo pockets and a cozy drawstring hood.'
  },
  {
    id: 'w3',
    name: 'Chic Linen Casual Tops (Set of 2)',
    price: 1299,
    originalPrice: 1999,
    category: 'women',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    tags: ['Summer Vibe'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Jockey',
    description: 'Lightweight linen blend tops featuring elegant cap sleeves and comfortable flowy cuts. Easy to wash and style.'
  },

  // --- KIDS' CLOTHING ---
  {
    id: 'k1',
    name: 'Summer Tee & Denim Shorts Set',
    price: 1199,
    originalPrice: 1799,
    category: 'kids',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
    tags: ['Cute Set'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    inStock: true,
    brand: 'Kelme',
    description: 'A adorable set comprising of a 100% organic cotton striped t-shirt and breathable elastic-waist denim shorts.'
  },
  {
    id: 'k2',
    name: 'Floral Print Ruffled Play Dress',
    price: 899,
    originalPrice: 1399,
    category: 'kids',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600',
    tags: ['Soft Touch'],
    sizes: ['3-4Y', '5-6Y', '7-8Y'],
    inStock: true,
    brand: 'Kelme',
    description: 'Whimsical floral dress with ruffled shoulder straps and elastic backing for play-ready flexibility and all-day comfort.'
  },

  // --- SHOES ---
  {
    id: 's1',
    name: 'Retro White Street Classic Sneakers',
    price: 3499,
    originalPrice: 5499,
    category: 'shoes',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    tags: ['Top Seller', 'Must Have'],
    sizes: ['7', '8', '9', '10'],
    inStock: true,
    brand: 'Adidas',
    description: 'Timeless silhouette featuring contrasting black triple-stripes and a vulcanized rubber sole for lasting durability and style.'
  },
  {
    id: 's2',
    name: 'Elite Pro Air Running Shoes',
    price: 4299,
    originalPrice: 5999,
    category: 'shoes',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    tags: ['High Performance'],
    sizes: ['8', '9', '10', '11'],
    inStock: true,
    brand: 'Nike',
    description: 'Engineered mesh upper for breathability paired with advanced air-cushioning tech to safeguard your joints on the track.'
  },
  {
    id: 's3',
    name: 'Urban Street Skate Canvas Shoes',
    price: 1999,
    originalPrice: 2999,
    category: 'shoes',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600',
    tags: ['Everyday Wear'],
    sizes: ['6', '7', '8', '9', '10'],
    inStock: true,
    brand: 'Puma',
    description: 'Lightweight canvas build with retro lace-ups and anti-skid honeycomb sole pattern. A perfect companion for casual outfits.'
  },

  // --- ACCESSORIES ---
  {
    id: 'a1',
    name: 'Full-Grain Double Ring Leather Belt',
    price: 1199,
    originalPrice: 1799,
    category: 'accessories',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    tags: ['Genuine Leather'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Levi\'s',
    description: 'Classic belt featuring thick vegetable-tanned leather and a heavy-duty double metal ring buckle that ages beautifully over time.'
  },
  {
    id: 'a2',
    name: 'Polarized Golden Aviator Sunglasses',
    price: 1499,
    originalPrice: 2499,
    category: 'accessories',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    tags: ['UV Protection'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Supreme',
    description: 'Premium stainless steel wireframes featuring highly-protective polarized lenses that offer true color perception and UV block.'
  },

  // --- BAGS ---
  {
    id: 'b1',
    name: 'Vanguard Navy Blue Travel Backpack',
    price: 2299,
    originalPrice: 3499,
    category: 'bags',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    tags: ['Water Resistant', 'Spacious'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Fila',
    description: 'Ergonomic multi-pocket backpack with padded laptop sleeve and dense foam straps to reduce shoulder stress during travel.'
  },
  {
    id: 'b2',
    name: 'Compact Vegan Leather Crossbody',
    price: 1899,
    originalPrice: 2899,
    category: 'bags',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    tags: ['Trendy Bag'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Supreme',
    description: 'A sleek, structured handbag with fine stitchwork, metal clasps, and a versatile adjustable chain strap.'
  },

  // --- SPORTS ---
  {
    id: 'sp1',
    name: 'Classic Swoosh Fit Athletic Cap',
    price: 799,
    originalPrice: 1199,
    category: 'sports',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600',
    tags: ['Dry Fit', 'Lightweight'],
    sizes: ['Adjustable'],
    inStock: true,
    brand: 'Nike',
    description: 'Sweat-wicking athletic cap with ventilated side panels, adjustable strap, and pre-curved visor for supreme glare control.'
  },
  {
    id: 'sp2',
    name: 'Rugged Gym Training Workout Gloves',
    price: 699,
    originalPrice: 999,
    category: 'sports',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    tags: ['Power Grip'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Kelme',
    description: 'Padded leather palms and breathable mesh backs ensure a reliable grip and prevent blisters during heavy weight lifting.'
  }
];

export const brandLogos = [
  { name: 'adidas', logo: 'Adidas', text: 'adidas' },
  { name: 'nike', logo: 'Nike', text: 'NIKE' },
  { name: 'puma', logo: 'Puma', text: 'PUMA' },
  { name: 'reebok', logo: 'Reebok', text: 'Reebok' },
  { name: 'fila', logo: 'Fila', text: 'FILA' },
  { name: 'supreme', logo: 'Supreme', text: 'Supreme' },
  { name: 'jockey', logo: 'Jockey', text: 'JOCKEY' },
  { name: 'levis', logo: 'Levis', text: 'LEVI\'S' },
  { name: 'lvd', logo: 'Lvd', text: 'LVD' },
  { name: 'kelme', logo: 'Kelme', text: 'KELME' }
];

export const categoryCards = [
  { id: 'men', title: 'Men', subtitle: 'Clothing', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400' },
  { id: 'women', title: 'Women', subtitle: 'Clothing', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400' },
  { id: 'kids', title: 'Kids', subtitle: 'Clothing', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=400' },
  { id: 'shoes', title: 'Shoes', subtitle: 'Collection', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400' },
  { id: 'accessories', title: 'Accessories', subtitle: 'Collection', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400' },
  { id: 'bags', title: 'Bags', subtitle: 'Collection', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400' },
  { id: 'sports', title: 'Sports', subtitle: 'Collection', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=400' }
];

export const heroSlides = [
  {
    id: 1,
    tagline: 'NEW SEASON. NEW YOU.',
    title: 'CHOOSE YOUR STYLE',
    cursive: 'Best Fashion. Best You.',
    features: [
      { text: 'Top Quality Products', icon: 'award' },
      { text: 'Latest Fashion', icon: 'hanger' },
      { text: 'Affordable Prices', icon: 'tag' }
    ],
    bgColor: 'from-[#e9f3fb] via-[#f5f9fc] to-[#daebf8]',
    images: {
      male: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      female: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      shoes: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=500'
    }
  },
  {
    id: 2,
    tagline: 'STEP IN COMFORT & STYLE',
    title: 'FOOTWEAR EXTRAVAGANZA',
    cursive: 'Walk with Confidence.',
    features: [
      { text: 'Authentic Brands Only', icon: 'shield-check' },
      { text: 'Cushioned Comfort Sole', icon: 'smile' },
      { text: 'Lightweight Design', icon: 'wind' }
    ],
    bgColor: 'from-[#f5e6e8] via-[#faf0f1] to-[#e8ccd7]',
    images: {
      male: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      female: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
      shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500'
    }
  },
  {
    id: 3,
    tagline: 'EXCLUSIVE DISCOUNTS ACTIVE',
    title: 'BEST BRANDS, LOWEST PRICE',
    cursive: 'Smart Savings. High Quality.',
    features: [
      { text: 'Up to 40% Off Items', icon: 'percent' },
      { text: 'Nepalese Best Sellers', icon: 'star' },
      { text: 'Free Local Pickup', icon: 'truck' }
    ],
    bgColor: 'from-[#e1f5fe] via-[#f0f4c3] to-[#e8f5e9]',
    images: {
      male: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600',
      female: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600',
      shoes: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=500'
    }
  },
  {
    id: 4,
    tagline: 'BRINGING QUALITY HOME',
    title: 'FOR THE WHOLE FAMILY',
    cursive: 'Experience Nepalese Chic.',
    features: [
      { text: 'Festive Sale up to 40% Off', icon: 'percent' },
      { text: 'Latest Fashion & Footwear', icon: 'hanger' },
      { text: 'Premium Store in Bardibas', icon: 'award' }
    ],
    bgColor: 'from-[#e8f0fe] via-[#f1f5f9] to-[#e2e8f0]',
    images: {
      male: '/src/assets/images/lucky_hero_slide_1_1782940586139.jpg',
      female: '/src/assets/images/lucky_hero_slide_1_1782940586139.jpg',
      shoes: '/src/assets/images/lucky_hero_slide_1_1782940586139.jpg'
    },
    isFullImage: true,
    fullImageUrl: '/src/assets/images/lucky_hero_slide_1_1782940586139.jpg'
  },
  {
    id: 5,
    tagline: 'LUCKY READYMADE & SHOE CENTER',
    title: 'WALK WITH CONFIDENCE',
    cursive: 'A Complete Family Fashion Hub.',
    features: [
      { text: 'Code: NEPAL40 Active', icon: 'tag' },
      { text: 'Top Class Comfort Shoes', icon: 'smile' },
      { text: 'Free Local Home Delivery', icon: 'truck' }
    ],
    bgColor: 'from-[#fdf6e2] via-[#fafaf9] to-[#f5f5f4]',
    images: {
      male: '/src/assets/images/lucky_hero_slide_2_1782940600379.jpg',
      female: '/src/assets/images/lucky_hero_slide_2_1782940600379.jpg',
      shoes: '/src/assets/images/lucky_hero_slide_2_1782940600379.jpg'
    },
    isFullImage: true,
    fullImageUrl: '/src/assets/images/lucky_hero_slide_2_1782940600379.jpg'
  }
];
