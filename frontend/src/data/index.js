// Static data for the E&D Glamour Marketing event rental website
// All data is hardcoded — no backend or database required.

// ─── SERVICES ────────────────────────────────────────────────────────────────

export const services = [
  {
    id: "svc-wedding-decor",
    name: "Wedding Décor",
    category: "wedding",
    description:
      "Transform your special day into a breathtaking celebration with our comprehensive wedding décor services. From elegant floral arrangements to stunning table settings, we create magical atmospheres that reflect your unique love story. Our team works closely with you to understand your vision, whether it's a romantic garden wedding, a glamorous ballroom affair, or a rustic barn celebration.",
    short_description:
      "Elegant and romantic wedding decorations tailored to your dream day.",
    images: [
      "https://images.unsplash.com/photo-1768777270907-235286662f98?w=800",
      "https://images.unsplash.com/photo-1761110840708-9d6814876068?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    ],
    starting_price: 2500,
    price_note: "Starting from $2,500 - Custom quotes available",
    features: [
      "Floral Arrangements",
      "Table Settings",
      "Backdrop Design",
      "Aisle Decoration",
      "Centerpieces",
      "Lighting Design",
    ],
    is_available: true,
  },
  {
    id: "svc-corporate-events",
    name: "Corporate Event Décor",
    category: "corporate",
    description:
      "Elevate your corporate events with professional décor that impresses clients and motivates teams. We specialize in creating sophisticated environments for conferences, product launches, galas, and team celebrations. Our designs incorporate your brand identity while maintaining an elegant, professional atmosphere.",
    short_description:
      "Professional décor solutions for impactful corporate events.",
    images: [
      "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?w=800",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    ],
    starting_price: 1500,
    price_note: "Starting from $1,500 - Volume discounts available",
    features: [
      "Brand Integration",
      "Stage Design",
      "Networking Lounge Setup",
      "Award Ceremony Décor",
      "Exhibition Displays",
      "Digital Signage Integration",
    ],
    is_available: true,
  },
  {
    id: "svc-birthday-parties",
    name: "Birthday Party Décor",
    category: "birthday",
    description:
      "Make every birthday unforgettable with our creative party decorations. From whimsical children's parties to elegant milestone celebrations, we bring your vision to life with custom themes, balloon artistry, and stunning backdrops. Our team creates Instagram-worthy setups that make memories last forever.",
    short_description: "Fun and creative birthday decorations for all ages.",
    images: [
      "https://images.unsplash.com/photo-1758870041148-31d28fdf34d9?w=800",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    ],
    starting_price: 500,
    price_note: "Packages starting from $500",
    features: [
      "Theme Development",
      "Balloon Arrangements",
      "Photo Backdrops",
      "Table Décor",
      "Cake Display",
      "Party Favors Setup",
    ],
    is_available: true,
  },
  {
    id: "svc-baby-showers",
    name: "Baby Shower Décor",
    category: "baby_shower",
    description:
      "Welcome the little one in style with our charming baby shower decorations. We create sweet and memorable celebrations with gender-reveal setups, nursery-inspired themes, and delicate color palettes that delight guests and honor parents-to-be.",
    short_description: "Sweet and memorable baby shower decorations.",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800",
    ],
    starting_price: 400,
    price_note: "Starting from $400",
    features: [
      "Gender Reveal Setups",
      "Custom Backdrops",
      "Dessert Table Styling",
      "Balloon Garlands",
      "Welcome Signs",
      "Gift Table Décor",
    ],
    is_available: true,
  },
  {
    id: "svc-anniversaries",
    name: "Anniversary Celebration Décor",
    category: "anniversary",
    description:
      "Celebrate years of love with elegant anniversary decorations. Whether it's a intimate dinner for two or a grand celebration with family and friends, we create romantic settings that honor your journey together.",
    short_description:
      "Romantic anniversary decorations to celebrate your love story.",
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
    ],
    starting_price: 600,
    price_note: "Starting from $600",
    features: [
      "Romantic Lighting",
      "Floral Centerpieces",
      "Memory Displays",
      "Custom Backdrops",
      "Candlelight Settings",
      "Photo Booth Setup",
    ],
    is_available: true,
  },
  {
    id: "svc-graduations",
    name: "Graduation Party Décor",
    category: "graduation",
    description:
      "Congratulate your graduate with festive decorations that celebrate their achievement. From high school to doctorate, we create celebratory environments with school colors, achievement displays, and photo-worthy moments.",
    short_description: "Celebratory decorations for graduation milestones.",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800",
    ],
    starting_price: 450,
    price_note: "Starting from $450",
    features: [
      "School Colors Theme",
      "Achievement Displays",
      "Photo Backdrops",
      "Balloon Arrangements",
      "Centerpieces",
      "Memory Timeline",
    ],
    is_available: true,
  },
];

// ─── RENTALS ─────────────────────────────────────────────────────────────────

export const rentals = [
  {
    id: "rent-chiavari-gold",
    name: "Chiavari Chairs - Gold",
    category: "chairs",
    description:
      "Elegant gold Chiavari chairs perfect for weddings, galas, and upscale events. These classic chairs feature a timeless design with comfortable cushioned seats available in various colors.",
    short_description: "Classic gold Chiavari chairs for elegant events.",
    images: [
      "https://images.unsplash.com/photo-1680169256615-19edb85cb7db?w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
    ],
    price_per_day: 8.5,
    price_per_week: 45.0,
    specifications: {
      material: "Resin",
      color: "Gold",
      weight_capacity: "400 lbs",
      cushion_colors: ["White", "Ivory", "Black", "Navy"],
    },
    quantity_available: 200,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-crossback-chairs",
    name: "Cross-Back Farm Chairs",
    category: "chairs",
    description:
      "Rustic cross-back wooden chairs perfect for farmhouse and vineyard weddings. These sturdy chairs add a touch of natural elegance to any outdoor or barn event.",
    short_description: "Rustic wooden cross-back chairs for farm-style events.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    ],
    price_per_day: 10.0,
    price_per_week: 55.0,
    specifications: {
      material: "Beechwood",
      color: "Natural Wood",
      weight_capacity: "350 lbs",
      style: "Rustic",
    },
    quantity_available: 150,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-banquet-tables",
    name: "Rectangular Banquet Tables",
    category: "tables",
    description:
      "Classic 8-foot rectangular banquet tables ideal for seated dinners and buffet setups. Sturdy construction with foldable legs for easy setup and transport.",
    short_description: "8-foot banquet tables for seated dinners.",
    images: [
      "https://images.unsplash.com/photo-1603920354140-cab69c15e672?w=800",
    ],
    price_per_day: 15.0,
    price_per_week: 80.0,
    specifications: {
      dimensions: '96" x 30"',
      seats: "8-10 guests",
      material: "Plastic/Wood top",
      foldable: true,
    },
    quantity_available: 50,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-round-tables",
    name: "Round Tables - 60 inch",
    category: "tables",
    description:
      "60-inch round tables perfect for wedding receptions and gala events. Seats 8-10 guests comfortably and pairs beautifully with floor-length linens.",
    short_description: "60-inch round tables seating 8-10 guests.",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    ],
    price_per_day: 18.0,
    price_per_week: 95.0,
    specifications: {
      diameter: "60 inches",
      seats: "8-10 guests",
      height: "30 inches",
      foldable: true,
    },
    quantity_available: 40,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-classic-photo-booth",
    name: "Classic Photo Booth",
    category: "photo_booths",
    description:
      "Our classic enclosed photo booth creates memorable moments with high-quality prints, custom backdrops, and a vast selection of props. Includes attendant, unlimited prints, and digital gallery.",
    short_description: "Classic enclosed photo booth with props and prints.",
    images: [
      "https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800",
    ],
    price_per_day: 350.0,
    price_per_week: null,
    specifications: {
      type: "Enclosed booth",
      prints: "Unlimited 4x6",
      props: "Included",
      attendant: "Included",
      digital_gallery: "Yes",
    },
    quantity_available: 3,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-360-video-booth",
    name: "360 Video Booth",
    category: "photo_booths",
    description:
      "Create viral-worthy content with our 360-degree video booth. Guests step onto the platform while the camera rotates around them, creating stunning slow-motion videos perfect for social media.",
    short_description: "360-degree video booth for viral content creation.",
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    ],
    price_per_day: 500.0,
    price_per_week: null,
    specifications: {
      platform_size: "39 inches",
      video_length: "10-15 seconds",
      sharing: "Instant social media",
      attendant: "Included",
    },
    quantity_available: 2,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-chafing-dish",
    name: "Chafing Dish Set",
    category: "catering_equipment",
    description:
      "Professional-grade stainless steel chafing dishes for buffet service. Set includes water pan, food pan, lid, and fuel holders. Perfect for keeping food warm during events.",
    short_description: "Stainless steel chafing dishes for buffet service.",
    images: [
      "https://images.unsplash.com/photo-1768725847223-8407142e653a?w=800",
    ],
    price_per_day: 25.0,
    price_per_week: 120.0,
    specifications: {
      material: "Stainless Steel",
      capacity: "8 quarts",
      includes: ["Water pan", "Food pan", "Lid", "Frame", "Fuel holders"],
    },
    quantity_available: 30,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-beverage-dispenser",
    name: "Beverage Dispenser Tower",
    category: "catering_equipment",
    description:
      "Elegant glass beverage dispensers stacked on a decorative tower. Perfect for lemonade stations, water service, or signature cocktails at your event.",
    short_description: "Decorative glass beverage dispenser tower.",
    images: [
      "https://images.unsplash.com/photo-1527761939622-933c72f6f4e3?w=800",
    ],
    price_per_day: 45.0,
    price_per_week: 200.0,
    specifications: {
      dispensers: "3 tier",
      capacity: "2 gallons each",
      material: "Glass with metal stand",
      spigot: "Stainless steel",
    },
    quantity_available: 10,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-satin-tablecloth",
    name: "Satin Tablecloths",
    category: "linens",
    description:
      "Luxurious satin tablecloths available in a wide range of colors. These elegant linens add a touch of sophistication to any table setting, perfect for weddings, galas, and upscale events.",
    short_description: "Elegant satin tablecloths in multiple colors.",
    images: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
    ],
    price_per_day: 12.0,
    price_per_week: 60.0,
    specifications: {
      material: "Premium Satin",
      sizes: ["90x132", "120 Round", "90x156"],
      colors: ["White", "Ivory", "Gold", "Navy", "Burgundy", "Blush"],
      care: "Dry clean only",
    },
    quantity_available: 100,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-string-lights",
    name: "Edison String Lights",
    category: "lighting",
    description:
      "Warm Edison-style string lights perfect for creating a romantic ambiance at outdoor and indoor events. Each strand features vintage-style bulbs that cast a beautiful warm glow.",
    short_description: "Vintage Edison string lights for warm ambiance.",
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
    ],
    price_per_day: 35.0,
    price_per_week: 175.0,
    specifications: {
      length: "100 feet per strand",
      bulb_type: "Edison LED",
      color_temperature: "2700K warm white",
      indoor_outdoor: "Both",
      dimmable: true,
    },
    quantity_available: 20,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-uplighting",
    name: "LED Uplighting Package",
    category: "lighting",
    description:
      "Transform any venue with our wireless LED uplighting package. Fully customizable colors to match your event theme, these lights create dramatic effects on walls, columns, and architectural features.",
    short_description: "Wireless LED uplighting in customizable colors.",
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    ],
    price_per_day: 20.0,
    price_per_week: 100.0,
    specifications: {
      type: "Wireless LED",
      colors: "16 million (RGB)",
      battery_life: "12+ hours",
      units_per_package: 10,
      remote_controlled: true,
    },
    quantity_available: 50,
    min_rental_days: 1,
    is_available: true,
  },
  {
    id: "rent-lace-runner",
    name: "Lace Table Runners",
    category: "linens",
    description:
      "Delicate lace table runners that add a vintage, romantic touch to your event tables. Available in ivory and white, these runners pair beautifully with any tablecloth.",
    short_description: "Vintage lace table runners in ivory and white.",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    ],
    price_per_day: 5.0,
    price_per_week: 25.0,
    specifications: {
      material: "Premium Lace",
      dimensions: '14" x 108"',
      colors: ["Ivory", "White"],
      style: "Vintage Floral Pattern",
    },
    quantity_available: 80,
    min_rental_days: 1,
    is_available: true,
  },
];

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

export const testimonials = [
  {
    id: "test-1",
    client_name: "Sarah & Michael Thompson",
    event_type: "Wedding",
    rating: 5,
    review:
      "E&D Glamour Marketing transformed our wedding into a fairytale! The attention to detail was extraordinary - from the stunning floral arrangements to the elegant table settings. Our guests couldn't stop complimenting the décor. Worth every penny!",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
    is_featured: true,
  },
  {
    id: "test-2",
    client_name: "Jennifer Martinez",
    event_type: "Corporate Gala",
    rating: 5,
    review:
      "We've worked with many event decorators, but E&D Glamour Marketing stands out. They understood our brand perfectly and created an impressive atmosphere for our annual gala. Professional, creative, and reliable.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    is_featured: true,
  },
  {
    id: "test-3",
    client_name: "The Anderson Family",
    event_type: "50th Birthday",
    rating: 5,
    review:
      "My mother's 50th birthday party was absolutely magical thanks to E&D Glamour Marketing. The balloon arrangements and photo backdrop were Instagram-worthy. They made the planning process so easy!",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
    is_featured: true,
  },
  {
    id: "test-4",
    client_name: "Emily Chen",
    event_type: "Baby Shower",
    rating: 5,
    review:
      "The most beautiful baby shower setup I've ever seen! The team was incredibly creative and brought my vision to life perfectly. Every detail was thoughtful and elegant.",
    image: null,
    is_featured: false,
  },
  {
    id: "test-5",
    client_name: "Robert & Linda Davis",
    event_type: "Anniversary",
    rating: 5,
    review:
      "For our 25th anniversary, we wanted something special. E&D Glamour Marketing delivered beyond our expectations. The romantic ambiance they created was perfect for celebrating our love story.",
    image: null,
    is_featured: false,
  },
];

// ─── GALLERY ─────────────────────────────────────────────────────────────────

export const gallery = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1768777270907-235286662f98?w=800",
    title: "Elegant Wedding Reception",
    category: "wedding",
    event_type: "Wedding",
    is_featured: true,
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    title: "Romantic Garden Wedding",
    category: "wedding",
    event_type: "Wedding",
    is_featured: true,
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?w=800",
    title: "Corporate Atrium Event",
    category: "corporate",
    event_type: "Corporate",
    is_featured: true,
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1758870041148-31d28fdf34d9?w=800",
    title: "Birthday Balloon Display",
    category: "birthday",
    event_type: "Birthday",
    is_featured: true,
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    title: "Gala Table Setting",
    category: "corporate",
    event_type: "Gala",
    is_featured: false,
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
    title: "Sweet Baby Shower",
    category: "baby_shower",
    event_type: "Baby Shower",
    is_featured: false,
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqs = [
  {
    id: "faq-1",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 4-6 weeks in advance for most events, and 3-6 months for weddings. However, we do our best to accommodate last-minute requests when possible.",
    category: "booking",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Do you offer setup and takedown services?",
    answer:
      "Yes! All our décor packages include professional setup and takedown. Our team arrives early to ensure everything is perfect before your guests arrive, and we handle all cleanup after your event.",
    category: "services",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Can I customize the décor to match my theme?",
    answer:
      "Absolutely! We specialize in custom designs tailored to your vision. During our consultation, we'll discuss colors, themes, and specific elements you'd like to incorporate.",
    category: "services",
    order: 3,
  },
  {
    id: "faq-4",
    question: "What is your rental policy?",
    answer:
      "Rentals include delivery and pickup within our service area. A security deposit is required at booking, which is refunded upon return of items in good condition. Minimum rental period is typically 1 day.",
    category: "rentals",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Do you travel for destination events?",
    answer:
      "Yes, we travel for destination weddings and events! Travel fees apply based on distance. Contact us with your location for a custom quote.",
    category: "booking",
    order: 5,
  },
  {
    id: "faq-6",
    question: "What happens if rental items are damaged?",
    answer:
      "Minor wear and tear is expected and covered. For significant damage, repair or replacement costs will be deducted from your security deposit. We recommend reviewing items upon delivery.",
    category: "rentals",
    order: 6,
  },
  {
    id: "faq-7",
    question: "How do I get a quote?",
    answer:
      "Simply fill out our contact form with details about your event, and we'll respond within 24-48 hours with a customized quote. You can also call us directly for immediate assistance.",
    category: "booking",
    order: 7,
  },
  {
    id: "faq-8",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfers, and checks. A 50% deposit is required to secure your booking, with the balance due one week before your event.",
    category: "payment",
    order: 8,
  },
];

// ─── BLOG POSTS ──────────────────────────────────────────────────────────────

export const blogPosts = [
  {
    id: "blog-1",
    title: "10 Wedding Décor Trends for 2025",
    slug: "wedding-decor-trends-2025",
    excerpt:
      "Discover the hottest wedding decoration trends that are making waves this year, from sustainable florals to bold color palettes.",
    content: `<h2>Embrace the Future of Wedding Design</h2>
<p>As we step into 2025, wedding décor continues to evolve with exciting new trends that blend timeless elegance with modern sensibilities. Here are the top trends we're seeing:</p>

<h3>1. Sustainable & Dried Florals</h3>
<p>Eco-conscious couples are opting for dried flowers, pampas grass, and locally-sourced seasonal blooms. These arrangements are not only beautiful but also environmentally responsible.</p>

<h3>2. Bold Color Palettes</h3>
<p>Move over neutrals! Couples are embracing rich jewel tones, unexpected color combinations, and statement-making hues that reflect their personalities.</p>

<h3>3. Intimate Micro-Weddings</h3>
<p>Smaller guest lists mean bigger budgets for décor. Couples are investing in luxurious details and personalized touches that create unforgettable experiences.</p>

<h3>4. Mixed Metal Accents</h3>
<p>Gold, silver, copper, and rose gold are being combined for a sophisticated, eclectic look that adds warmth and dimension to any venue.</p>

<h3>5. Living Installations</h3>
<p>From hanging gardens to moss walls, living plant installations are creating Instagram-worthy moments while bringing nature indoors.</p>

<p>Ready to incorporate these trends into your wedding? Contact us for a consultation!</p>`,
    cover_image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    author: "Emma Rodriguez",
    tags: ["wedding", "trends", "décor"],
    is_published: true,
    created_at: "2025-01-15T10:00:00Z",
  },
  {
    id: "blog-2",
    title: "How to Choose the Perfect Photo Booth for Your Event",
    slug: "choosing-perfect-photo-booth",
    excerpt:
      "A complete guide to selecting the right photo booth style for your corporate event, wedding, or party.",
    content: `<h2>Making Memories That Last</h2>
<p>Photo booths have become a must-have at modern events. But with so many options available, how do you choose the right one?</p>

<h3>Classic Enclosed Booths</h3>
<p>Perfect for those who want privacy while striking poses. Great for corporate events and weddings where guests might be camera-shy.</p>

<h3>Open-Air Photo Booths</h3>
<p>Ideal for large groups and interactive experiences. The open design allows for more creativity and larger group shots.</p>

<h3>360 Video Booths</h3>
<p>The latest trend in event entertainment! These create shareable slow-motion videos that guests love posting on social media.</p>

<h3>Mirror Booths</h3>
<p>Combining a full-length mirror with touch-screen technology, these booths add a touch of glamour while providing an interactive experience.</p>

<h3>Key Questions to Ask</h3>
<ul>
<li>How many guests will be attending?</li>
<li>What's the vibe of your event?</li>
<li>Do you want prints, digital copies, or both?</li>
<li>What's your budget?</li>
</ul>

<p>Contact us to discuss which photo booth option is perfect for your event!</p>`,
    cover_image:
      "https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800",
    author: "Marcus Chen",
    tags: ["photo booth", "events", "entertainment"],
    is_published: true,
    created_at: "2025-02-01T10:00:00Z",
  },
  {
    id: "blog-3",
    title: "Corporate Event Planning: Creating Memorable Brand Experiences",
    slug: "corporate-event-planning-guide",
    excerpt:
      "Expert tips on designing corporate events that reinforce your brand identity and leave lasting impressions.",
    content: `<h2>Beyond the Basics</h2>
<p>Corporate events are more than meetings—they're opportunities to strengthen your brand, motivate teams, and impress clients.</p>

<h3>Brand Integration Done Right</h3>
<p>Subtle is key. Instead of plastering logos everywhere, incorporate brand colors through florals, linens, and lighting. Let your brand identity flow naturally through the design.</p>

<h3>Creating Experience Zones</h3>
<p>Design distinct areas within your event: networking lounges, interactive displays, and quiet conversation spaces. Each zone should serve a purpose while maintaining cohesive design.</p>

<h3>Technology Integration</h3>
<p>Digital signage, interactive screens, and app-based engagement can enhance your event without overwhelming the design aesthetic.</p>

<h3>Sustainable Choices</h3>
<p>More companies are prioritizing eco-friendly events. Consider reusable décor, digital alternatives to printed materials, and sustainable catering options.</p>

<p>Let's create an unforgettable corporate experience together!</p>`,
    cover_image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    author: "Sarah Williams",
    tags: ["corporate", "branding", "events"],
    is_published: true,
    created_at: "2025-02-20T10:00:00Z",
  },
];

// ─── TIME SLOTS (for booking page) ───────────────────────────────────────────

export const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: true },
  { time: "06:00 PM", available: true },
  { time: "07:00 PM", available: true },
  { time: "08:00 PM", available: true },
];
