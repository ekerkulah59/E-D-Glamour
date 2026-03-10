// Static data for the E&D Glamour Marketing event rental website
// All data is hardcoded — no backend or database required.

// ─── CONTACT (from official doc) ─────────────────────────────────────────────

export const contact = {
  phone: '3027470611',
  phoneFormatted: '(302) 747-0611',
  email: 'hello@edglamourmarketing.com',
  address: { line1: 'Wilmington, DE', line2: '' },
};

// ─── PACKAGES (three-tier structure from official doc) ────────────────────────

export const packages = [
  {
    id: 'pkg-tier-1',
    name: 'Tier 1',
    guestRange: 'Up to 50 guests',
    priceRange: [1500, 2500],
    priceLabel: '$1,500 – $2,500',
    targetDescription: 'Smaller events or couples/hosts who want help with the day itself',
    inclusions: [
      'Initial discovery call and basic planning outline',
      'Up to 2 pre-event meetings or calls',
      'Creation of a master timeline and floor plan',
      'Table cloth, center pieces and (1) backdrop, plate chargers',
      'Easel stand and picture',
      'On-site coordination for the day of the event (limited staffing)',
    ],
    order: 1,
  },
  {
    id: 'pkg-tier-2',
    name: 'Tier 2',
    guestRange: 'Up to 100 guests',
    priceRange: [3000, 5000],
    priceLabel: '$3,000 – $5,000',
    targetDescription: 'Events needing more structure and vendor coordination',
    inclusions: [
      'Everything in Tier 1',
      'Chiavari chairs, throne chair',
      '8 planning meetings or calls',
      'Detailed budget tracking and updates',
      'Design concept and décor guidance',
      'Picture poster of client',
      'Floor plan and run-of-show development',
      'Day-of coordination (1–2 staff) plus venue/vendor coordination leading up to the event',
    ],
    order: 2,
  },
  {
    id: 'pkg-tier-3',
    name: 'Tier 3',
    guestRange: 'Up to 200 guests',
    priceRange: [5500, 15000],
    priceLabel: '$5,500 – $15,000',
    targetDescription: 'Larger or more complex events needing end-to-end management',
    inclusions: [
      'Everything from Tier 1 & 2',
      'Photo booth and 3 customer poster boards',
      'Plates, napkins, and silverware (price varies by type)',
      'Unlimited planning meetings/calls',
      'Comprehensive budget management with ongoing approvals',
      'Design development from concept to execution (themes, décor, branding)',
      'Site visits, production coordination, and floor plan finalization',
      'Rehearsal coordination (if applicable) and day-of management (full on-site team)',
      'Enhanced post-event reporting and ongoing client support',
    ],
    order: 3,
  },
];

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
        '/wedding.webp',
        '/weding.webp',
        '/web.jpg',
        '/webbbinh.jpg',
        '/wedding-tent-rentals.jpg'
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
      '/gallary-birthday.jpeg',
      '/gallary-54.jpeg',
      '/gallary-454.jpeg',
      
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
      '/baby-1.jpg',
      '/baby-shower2.webp',
      '/baby2.jpg',
      
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
     
      
      "/gallary-2024-r.jpeg",
      "/gallary-2024.jpeg",
      "/gallary000.jpeg",
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

export const categories = [
  'Tents',
  'Tables & Chairs',
  'Photo Booth',
  // 'Decor',
  // 'Catering Equipment',
  // 'Linens',
];

export const inventory = [
  // Tents
  {
    id: 'tent-001',
    name: 'Frame Tent - 20x30',
    category: 'Tents',
    shortDescription: 'Large 20x30 frame tent for outdoor events up to 150 guests.',
    description: '20x30 frame tent for weddings, corporate events, and gatherings. No center poles.',
    images: ['/tent.png', '/tent.png'],
  },
 

  // Tables & Chairs
  {
    id: 'chair-001',
    name: 'Chiavari Chair - Gold',
    category: 'Tables & Chairs',
    shortDescription: 'Elegant gold Chiavari chairs for weddings and formal events.',
    description: 'Gold Chiavari chairs for weddings, galas, and upscale events. $6.50/chair with customer pickup and drop-off; $6.75/chair plus $50 for planner delivery and pickup.',
    images: ['/EventsProductPictures/TablesChairsBars/chair/gold_chiavari_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/Chiavari_Chair_Gold.jpg'],
    price_note: 'From $6.50/chair (pickup) or $6.75/chair + $50 delivery',
  },
  {
    id: 'chair-002',
    name: 'Chiavari Chair - White',
    category: 'Tables & Chairs',
    shortDescription: 'Classic white Chiavari chairs for timeless elegance.',
    description: 'White Chiavari chairs for any event. Clean and versatile. $6.50/chair with customer pickup and drop-off; $6.75/chair plus $50 for planner delivery and pickup.',
    images: ['/EventsProductPictures/TablesChairsBars/Kids_White_Chiavari_Chair.jpg'],
    price_note: 'From $6.50/chair (pickup) or $6.75/chair + $50 delivery',
  },
  {
    id: 'chair-003',
    name: 'Chiavari Chair - Pink',
    category: 'Tables & Chairs',
    shortDescription: 'Elegant pink Chiavari chairs for weddings and formal events.',
    description: 'Pink Chiavari chairs for weddings, galas, and upscale events. $6.50/chair with customer pickup and drop-off; $6.75/chair plus $50 for planner delivery and pickup.',
    images: ['/pink-chover-chair.jpeg'],
    price_note: 'From $6.50/chair (pickup) or $6.75/chair + $50 delivery',
  },

  {
    id: 'table-001',
    name: 'Round Table',
    category: 'Tables & Chairs',
    shortDescription: 'Large 60-inch round tables seating up to 10 guests.',
    description: '60-inch round tables for banquets. Seats 8–10 guests.',
    images: ['/white-round.webp', '/white-round-table.webp'],
  },

  // {
  //   id: 'table-003',
  //   name: 'Rectangular Banquet Table',
  //   category: 'Tables & Chairs',
  //   shortDescription: 'Long 8-foot rectangular tables for buffet and head tables.',
  //   description: '8-foot banquet tables for buffets and head tables.',
  //   images: ['/EventsProductPictures/TablesChairsBars/tables/8ft_rectangular_table_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/tables/6ft_rectangular_table_rental-300x300.jpg'],
  // },

  {
    id: 'chair-011',
    name: 'White Folding Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Classic white folding chairs for events and gatherings.',
    description: 'Durable white folding chairs ideal for ceremonies, receptions, and outdoor events.',
    images: ['/EventsProductPictures/TablesChairsBars/chair/white_folding_chair_rental-300x300.jpg', '/EventsProductPictures/TablesChairsBars/chair/whitepaddedresinchair-300x300.jpg'],
  },

  {
    id: 'chair-013',
    name: 'Plastic Folding Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Lightweight white plastic folding chairs for events and gatherings.',
    description: 'Durable white plastic folding chairs with dark metal frames. Compact when folded for easy storage and transport.',
    images: ['/plastic-folding.jpg', '/plastic-white-chair.jpg'],
  },
  {
    id: 'chair-03',
    name: 'The Crown Empress Throne',
    category: 'Tables & Chairs',
    shortDescription: 'Regal throne chair for weddings, quinceañeras, and royal-themed events.',
    description: 'A stunning statement throne that adds grandeur to your special day. Perfect for bridal portraits, sweet sixteen, quinceañeras, and royal-themed celebrations. $125 with customer pickup/drop-off; $130 plus $50 for planner delivery and pickup.',
    images: ['/throne-chiard.jpeg', '/throne-chiard.jpeg'],
    price_note: '$125 (pickup) or $130 + $50 delivery',
  },
  {
    id: 'chair-015',
    name: 'Kid Throne Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Child-sized throne chair for birthdays, photo ops, and royal-themed parties.',
    description: 'A smaller throne chair designed for kids. Perfect for birthday parties, quinceañeras, princess themes, and photo opportunities. $50 with customer pickup/drop-off; $60 for planner delivery and pickup.',
    images: ['/kids-throne-chair.jpeg', '/kids-throne-chair.jpeg'],
    price_note: '$50 (pickup) or $60 with delivery',
  },
  {
    id: 'chair-kids-chiavari',
    name: 'Kids Chiavari Chair',
    category: 'Tables & Chairs',
    shortDescription: 'Child-sized Chiavari chairs for kids tables and photo ops.',
    description: 'Kids Chiavari chairs for children\'s tables and themed events. $2.50/chair with customer pickup and drop-off; $3.00/chair for planner delivery and pickup.',
    images: ['/EventsProductPictures/TablesChairsBars/Kids_White_Chiavari_Chair.jpg'],
    price_note: 'From $2.50/chair (pickup) or $3.00/chair with delivery',
  },
  {
    id: 'table-007',
    name: 'White Folding Table',
    category: 'Tables & Chairs',
    shortDescription: 'Versatile white folding tables for any event setup.',
    description: 'White folding tables for buffets, displays, registration, and seating.',
    images: ['/whit-folding-table.jpg', '/white-table-round.png', '/table.png'],
  },

  // Catering Equipment
 

  

  // Photo Booth
  {
    id: 'photo-book-360',
    name: '360 Photo Booth',
    category: 'Photo Booth',
    shortDescription: '360-degree photo booth for viral slow-motion videos.',
    description: '360-degree photo booth creating social-ready slow-motion clips. Perfect for weddings, corporate events, and parties. $125 per hour. Additional backdrops available (negotiable).',
    images: ['/360-ph.jpeg'],
    price_note: '$125/hour',
  },
  {
    id: 'photo-book-digital',
    name: 'Digital Photo Booth',
    category: 'Photo Booth',
    shortDescription: 'Digital Photo Booth for viral slow-motion videos.',
    description: 'Digital Photo Booth creating social-ready slow-motion clips. Perfect for weddings, corporate events, and parties. Guests love the shareable viral content.',
    images: ['/photoboot1.jpeg'],
  }
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
// All images and videos from the public folder; videos are muted by default in the UI.

export const gallery = [
  // Images (public root)
  
  { id: "gal-gallary-54", url: "/gallary-54.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  
  { id: "gal-gallary-11", url: "/gallary-11.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-gallary-64", url: "/gallary-64.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-photoboot1", url: "/photoboot1.jpeg", title: "Photo Booth", category: "birthday", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-gallary-birthday", url: "/gallary-birthday.jpeg", title: "Birthday Gallery", category: "birthday", event_type: "Birthday", is_featured: true, type: "image" },
  { id: "gal-gallary-454", url: "/gallary-454.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-gallary-33", url: "/gallary-33.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-gallary-343", url: "/gallary-343.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  
  //{ id: "gal-throne-chair", url: "/throne-chair.jpeg", title: "Throne Chair", category: "corporate", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-360-ph", url: "/360-ph.jpeg", title: "360 Photo", category: "corporate", event_type: "Event", is_featured: false, type: "image" },
  
  { id: "gal-gallary-bithday-e", url: "/gallary-bithday-e.jpeg", title: "Birthday Event", category: "birthday", event_type: "Birthday", is_featured: false, type: "image" },
  { id: "gal-gallary-2024", url: "/gallary-2024.jpeg", title: "Gallery 2024", category: "wedding", event_type: "Event", is_featured: true, type: "image" },
  { id: "gal-gallary-2024-r", url: "/gallary-2024-r.jpeg", title: "Gallery 2024", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
 // { id: "gal-throne-chiard", url: "/throne-chiard.jpeg", title: "Throne Chair", category: "corporate", event_type: "Event", is_featured: false, type: "image" },
  { id: "gal-gallary000", url: "/gallary000.jpeg", title: "Gallery", category: "wedding", event_type: "Event", is_featured: false, type: "image" },
  // Images (EventsProductPictures subfolders)
  
  // Videos (public root) — displayed muted by default in the gallery
  { id: "gal-v-photoboot", url: "/photoboot-v1.mp4", title: "Photo Booth", category: "birthday", event_type: "Video", is_featured: true, type: "video" },
  { id: "gal-v1", url: "/gallary-v1.mp4", title: "Gallery Video", category: "wedding", event_type: "Video", is_featured: false, type: "video" },
  { id: "gal-v2", url: "/gallary-v2.mp4", title: "Gallery Video", category: "wedding", event_type: "Video", is_featured: false, type: "video" },
  { id: "gal-v3", url: "/gallary-v3.mp4", title: "Gallery Video", category: "wedding", event_type: "Video", is_featured: false, type: "video" },
  { id: "gal-v4", url: "/gallary-v4.mp4", title: "Gallery Video", category: "wedding", event_type: "Video", is_featured: false, type: "video" },
  { id: "gal-v5", url: "/gallary-v5.mp4", title: "Gallery Video", category: "wedding", event_type: "Video", is_featured: false, type: "video" },
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
      "Absolutely! We specialize in custom designs tailored to your vision. During our discovery call, we'll discuss colors, themes, and specific elements you'd like to incorporate. Design development from concept to execution is included in our higher-tier packages.",
    category: "services",
    order: 3,
  },
  {
    id: "faq-4",
    question: "What is your rental policy?",
    answer:
      "Rentals include pickup and drop-off options: customer pickup/drop-off at a lower rate, or planner delivery and pickup for an additional fee (e.g. $50 for chair deliveries). A security deposit may be required; minimum rental period is typically 1 day. Contact us for exact terms.",
    category: "rentals",
    order: 4,
  },
  {
    id: "faq-5",
    question: "Do you travel for destination events?",
    answer:
      "Yes, we travel for destination weddings and events! Final prices depend on factors like guest count, venue complexity, travel, number of event days, and staff requirements. Contact us with your location for a custom quote.",
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
      "Fill out our contact form with details about your event, or call us at (302) 747-0611. We'll respond within 24-48 hours with a customized quote. All prices are ballpark estimates and can be refined during a discovery call based on your location, date, and exact scope.",
    category: "booking",
    order: 7,
  },
  {
    id: "faq-8",
    question: "What are your payment terms?",
    answer:
      "Retainer: 10–50% is due at contract signing to secure your date and begin planning. Final payment: 50–100% is due 7–14 days before the event (or as specified in your contract). Cancellations: the retainer is typically non-refundable; any partial refunds are based on milestones. Contact us for your specific contract terms.",
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
