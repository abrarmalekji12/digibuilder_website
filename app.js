"use strict";

const services=[
  ["strategy","01","Strategy & Growth Consulting","Know your roots. Grow with purpose.","We uncover your business DNA, legacy and customer connections before shaping brand positioning, marketing strategy and a practical growth plan.",["Business DNA discovery","Brand positioning","Growth roadmaps","Marketing strategy"]],
  ["brand","02","Branding & Creative","Build a brand people can feel and remember.","Identity design built on business roots, clear positioning, emotional storytelling and creative that feels consistent wherever customers meet your brand.",["Brand identity","Logo & design systems","Ad creatives","Campaign direction"]],
  ["web","03","Websites & E-commerce","Your brand deserves a better digital home.","Business-led websites and e-commerce experiences that bring your story to life through thoughtful UX, responsive design, fast development and SEO foundations.",["Website design","Landing pages","E-commerce","Conversion optimisation"]],
  ["social","04","Social Media, Reels & Video","Tell stories people want to watch.","Audience-led social media marketing with meaningful content ideas, reel and video shoots, thoughtful editing and a practical publishing rhythm.",["Social media marketing","Reel & video shoots","Video editing","Content creation"]],
  ["seo","05","SEO, Advertising & Performance","Be found when it matters.","Technical and local SEO, customer search intent, purposeful Google and Meta advertising, useful landing pages and measurement tied to business goals.",["Technical & local SEO","Google Ads","Meta advertising","Performance reporting"]],
  ["ai","06","AI Automation & Workflows","Save time without losing judgement.","We map business workflows first, then prototype useful AI assistants and human-supervised automation for repetitive work.",["AI assistants","Workflow automation","Lead handling","Team enablement"]]
];

const serviceDetails={
  "strategy": [
    "Every business has a story worth understanding before a marketing plan is written.",
    "We explore the business DNA, legacy, customer emotions and market context before choosing the right growth direction.",
    "The next step is a practical roadmap that connects brand positioning, content, marketing channels and meaningful measurement."
  ],
  "brand": [
    "A good brand does more than look polished. It helps people recognise you, understand you and remember why they chose you.",
    "We shape the identity around the business: visual direction, messaging, social creatives and the little details that tie everything together.",
    "The result is a usable creative foundation for websites, reels, ads, print and everyday marketing."
  ],
  "web": [
    "Your website should answer questions quickly and make taking the next step feel obvious, whether someone visits on a phone or laptop.",
    "We design and build mobile-friendly websites, service pages, landing pages and e-commerce experiences with speed, accessibility and search in mind.",
    "We focus on clear offers, smooth navigation and calls to action that respect the visitor's time."
  ],
  "social": [
    "Posting more is not the same as connecting better. Strong social media starts with knowing your audience and telling stories they care about.",
    "From content planning and social media management to reel concepts, on-location video shoots and professional editing, we connect ideas with execution.",
    "We balance attention-grabbing creative with a consistent voice and a publishing rhythm you can maintain."
  ],
  "seo": [
    "Being visible matters most when the people finding you are already looking for what you offer.",
    "We work across on-page SEO, technical SEO, local search, Google Ads, Meta advertising and conversion-focused landing pages.",
    "You get clear reporting, useful experiments and a strategy shaped by real evidence, not vague ranking promises."
  ],
  "ai": [
    "If your team repeats the same admin steps every day, there may be a smarter way to work.",
    "We map the process first, then prototype AI-assisted workflows for enquiries, reporting, content operations and routine handoffs.",
    "You stay in control with documented workflows, sensible safeguards and a clear path for your team to use them."
  ]
};

const serviceMap=Object.fromEntries(services.map(service=>[service[0],service]));
const projects=[
  {
    "name": "Sharp Immigration",
    "regions": "Canada, India, Nigeria",
    "logo": "/project-logos/sharp-immigration.webp"
  },
  {
    "name": "Saathi4u",
    "regions": "Canada, India, USA",
    "logo": "/project-logos/saathi4u.webp"
  },
  {
    "name": "Meghreji Home Decor",
    "logo": "/project-logos/meghreji-home-decor.webp"
  },
  {
    "name": "Unique LED Light",
    "category": "E-Commerce Business",
    "logo": "/project-logos/unique-led-light.webp"
  },
  {
    "name": "Simun Bake & Cake (Simun Tea)",
    "logo": "/project-logos/simun-bake-cake.webp"
  },
  {
    "name": "Gulbarg Garden Restaurant & Party Plot",
    "logo": "/project-logos/gulbarg-garden.webp"
  },
  {
    "name": "Palate Restaurant",
    "logo": "/project-logos/palate-restaurant.webp"
  },
  {
    "name": "House of Recut",
    "logo": "/project-logos/recut.webp"
  },
  {
    "name": "Cubixkraft",
    "logo": "/project-logos/cubixcraft.webp"
  },
  {
    "name": "Crabby Hunt",
    "category": "E-Commerce Business",
    "logo": "/project-logos/crabby-hunt.webp"
  },
  {
    "name": "NDS Life Coaching",
    "logo": "/project-logos/nds-life-coaching.webp"
  },
  {
    "name": "Sharp Travel",
    "regions": "Canada, India",
    "logo": "/project-logos/sharp-travel.webp"
  },
  {
    "name": "Mahenoor Foods",
    "logo": "/project-logos/mahenoor-foods.webp"
  },
  {
    "name": "Zapnut",
    "logo": "/project-logos/zapnut.webp"
  },
  {
    "name": "Raj Shah Photography",
    "logo": "/project-logos/raj-shah-photography.webp"
  },
  {
    "name": "Pink Nail Art",
    "pinkWordmark": true
  },
  {
    "name": "Dental Spot",
    "regions": "USA",
    "logo": "/project-logos/dental-spot.webp"
  },
  {
    "name": "District Dentistry",
    "regions": "USA",
    "logo": "/project-logos/distric-dentistry.webp"
  },
  {
    "name": "Sydney Premium Taxi Service",
    "regions": "Australia",
    "logo": "/project-logos/sydney-premium-taxi.webp"
  },
  {
    "name": "SKA Moto Bike",
    "regions": "UK",
    "logo": "/project-logos/ska-moto-bike.webp"
  },
  {
    "name": "Flutter Pilot",
    "logo": "/project-logos/flutter-pilot.webp"
  },
  {
    "name": "Scholar Career Academy",
    "logo": "/project-logos/scholar-career-academy.webp"
  }
];
const caseStudies=[
  {
    "slug": "sharp-immigration",
    "name": "Sharp Immigration",
    "industry": "Immigration consulting",
    "region": "Canada, India & Nigeria",
    "period": "2022–present",
    "headline": "Rebuilding digital trust and scaling immigration enquiries",
    "about": "Sharp Immigration helps students, families and professionals explore international immigration and study options across Canada, India and Nigeria.",
    "challenge": "Restricted Meta advertising access and a banned page challenged the brand's ability to reach relevant audiences across three markets.",
    "approach": "We supported recovery of advertising access, developed informative content and aligned campaigns with students, parents and entrepreneurs. Campaign direction was reviewed every 15 days using performance feedback.",
    "scope": [
      "Branding and creative",
      "Social media management",
      "Reels and video production",
      "AI content",
      "Meta and Google Ads",
      "SEO, blogs and landing pages",
      "Lead generation"
    ],
    "impact": "The project reported over seven million organic views, including one reel exceeding six million views, and over 900 monthly leads during the reported campaign period.",
    "metrics": [
      [
        "7M+",
        "Organic views"
      ],
      [
        "900+",
        "Reported monthly leads"
      ],
      [
        "6M+",
        "Featured reel views"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/sharpimmigration/"
      ],
      [
        "Website",
        "https://www.siis.ca/"
      ],
      [
        "Featured reel",
        "https://www.instagram.com/reel/DBf-WNHtqX5/"
      ]
    ],
    "services": [
      "social",
      "seo",
      "web",
      "brand",
      "strategy",
      "ai"
    ]
  },
  {
    "slug": "saathi4u",
    "name": "Saathi4u",
    "industry": "Matchmaking & technology",
    "region": "India, Canada & USA",
    "period": "2024–present",
    "headline": "Launching an AI-powered matchmaking brand",
    "about": "Saathi4u is an AI-based matchmaking platform focused on NRI audiences and people seeking meaningful relationships across India and North America.",
    "challenge": "From the initial idea, the business needed a brand identity, digital platform and launch strategy that could earn trust in an established category.",
    "approach": "We supported the brand from its early concept through website and app launch. Content and advertising focused on relevance, privacy-conscious communication and awareness among prospective members.",
    "scope": [
      "Strategy and consulting",
      "Brand identity",
      "Website and landing pages",
      "Social media and reels",
      "AI content",
      "Meta and Google Ads",
      "App marketing and lead generation"
    ],
    "impact": "The platform reported over 10,000 registrations within its first year, with viral visibility in Gujarat and Canada.",
    "metrics": [
      [
        "10K+",
        "Registrations in first year"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/saathi4u/"
      ],
      [
        "Website",
        "https://www.saathi4u.com/"
      ]
    ],
    "services": [
      "strategy",
      "brand",
      "web",
      "social",
      "seo"
    ]
  },
  {
    "slug": "meghreji-home-decor",
    "name": "Meghreji Home Decor",
    "industry": "Architecture & home decor",
    "region": "Gujarat, India",
    "period": "2022–present",
    "headline": "Making natural cladding a recognisable regional brand",
    "about": "Meghreji Home Decor supplies and installs natural cladding and interior and exterior elevation materials for homes and buildings.",
    "challenge": "The established business wanted to introduce expanded offerings and refresh its brand for architects, engineers, builders and homeowners.",
    "approach": "Showroom reels, product photography, installation progress and real building transformations demonstrated materials in context. Before-and-after storytelling made their benefits easier to understand.",
    "scope": [
      "Brand strategy",
      "Graphic design",
      "Social media management",
      "Product photography",
      "Reels and video production",
      "Content planning"
    ],
    "impact": "Content gained viral local visibility in Modasa and Gujarat. The business reported projects across Gujarat, supported by growing recognition for its natural cladding offerings.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/meghreji_home_decor/"
      ]
    ],
    "services": [
      "strategy",
      "brand",
      "social"
    ]
  },
  {
    "slug": "unique-led-light",
    "name": "Unique LED Light",
    "industry": "Automotive & e-commerce",
    "region": "India",
    "period": "2026",
    "headline": "Building a new automotive e-commerce brand",
    "about": "Unique LED Light is an e-commerce business focused on car LED lighting products.",
    "challenge": "As a new brand, it needed a professional storefront, product visibility and an online sales strategy.",
    "approach": "We developed a Shopify storefront, organised product presentation and combined social media support with Meta advertising focused on online purchases. The goal was a clear journey from product discovery to checkout.",
    "scope": [
      "Business strategy",
      "Shopify development",
      "E-commerce management",
      "Social media management",
      "Meta Ads"
    ],
    "impact": "The project established a digital storefront and performance marketing foundation for online sales.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/uniqueledlight/"
      ],
      [
        "Website",
        "https://theuniqueledlight.com/"
      ]
    ],
    "services": [
      "web",
      "social",
      "seo",
      "strategy"
    ]
  },
  {
    "slug": "simun-bake-cake",
    "name": "Simun Bake & Cake (Simun Tea)",
    "industry": "Bakery & FMCG",
    "region": "Modasa, Gujarat, India",
    "period": "2025–present",
    "headline": "Taking a local bakery to a nationwide marketplace",
    "about": "Simun Bake & Cake is a premium bakery in Modasa, offering cookies, toast, rusk and a newer tea offering under Simun Tea.",
    "challenge": "The business needed to launch its FMCG products digitally and generate sales without an established Amazon history. Diwali gift hampers offered a separate regional opportunity.",
    "approach": "We supported Amazon listings and organic marketplace visibility, alongside food photography, reels and a festive gifting campaign. Meta advertising helped generate gift hamper enquiries.",
    "scope": [
      "Business consulting",
      "Amazon catalogue and launch",
      "Food and product photography",
      "Reels",
      "Festive campaigns",
      "Meta lead generation"
    ],
    "impact": "The brand reported 30+ organic Amazon orders in its first month without Amazon PPC. The Diwali campaign gained visibility in Modasa and generated sales and enquiries across Gujarat.",
    "metrics": [
      [
        "30+",
        "Organic Amazon orders in first month"
      ],
      [
        "No PPC",
        "Amazon launch"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/simunbakery/"
      ]
    ],
    "services": [
      "web",
      "social",
      "seo",
      "strategy"
    ]
  },
  {
    "slug": "gulbarg-garden",
    "name": "Gulbarg Garden Restaurant & Party Plot",
    "industry": "Hospitality & events",
    "region": "Modasa, Gujarat, India",
    "period": "2026",
    "headline": "Turning a new restaurant into a talked-about destination",
    "about": "Gulbarg offers garden dining, gazebo seating, food and a party venue in Modasa.",
    "challenge": "As a new restaurant, it needed to communicate what made its atmosphere and food distinctive and encourage visits and event bookings.",
    "approach": "Cinematic drone footage, creative transitions, customer review reels and new platter promotions brought the dining experience to life. Scripts, editing and social management supported a consistent content approach.",
    "scope": [
      "Social media management",
      "Content planning and scripts",
      "Drone and restaurant videography",
      "Reel editing",
      "Menu design"
    ],
    "impact": "The restaurant reported 65,000+ views on one reel, 1,500+ new followers in a month, fully occupied weekends and advance bookings for new platters, alongside party plot bookings.",
    "metrics": [
      [
        "65K+",
        "Views on one reel"
      ],
      [
        "1,500+",
        "Followers gained in one month"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/gulbarg_restaurant_party_plot/"
      ]
    ],
    "services": [
      "social",
      "brand"
    ]
  },
  {
    "slug": "palate-restaurant",
    "name": "Palate Restaurant",
    "industry": "Hospitality & food",
    "region": "Gujarat, India",
    "period": "",
    "headline": "Bringing the dining experience to life",
    "about": "Palate Restaurant offers a dining experience centred on food and hospitality.",
    "challenge": "The restaurant wanted a stronger digital presence and engaging communication for local food lovers.",
    "approach": "We applied an experience-led approach, using food and ambience visuals, reels and creative editing to communicate the brand's personality.",
    "scope": [
      "Social media content",
      "Reel production and editing",
      "Food and ambience storytelling"
    ],
    "impact": "The work focused on local visibility and encouraging potential guests to discover the restaurant.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/palaterestaurantkolikhad/"
      ]
    ],
    "services": [
      "social",
      "brand"
    ]
  },
  {
    "slug": "house-of-recut",
    "name": "House of Recut",
    "industry": "Sustainable fashion",
    "region": "Vadodara, Gujarat, India",
    "period": "2026",
    "headline": "Preserving generations of memories through AI storytelling",
    "about": "House of Recut reimagines treasured family garments, including grandparents' wedding and traditional attire, into outfits for meaningful modern occasions.",
    "challenge": "The new concept needed original premium AI video narratives with visual consistency across each reel.",
    "approach": "We combined prompt engineering, AI fashion models, product visuals and creative direction to express the emotional value of heritage garments. Each reel explored a different story rather than repeating a single promotional formula.",
    "scope": [
      "Social media management",
      "AI fashion models",
      "AI product photography",
      "AI video and reels",
      "Content planning and copywriting"
    ],
    "impact": "The distinctive concept and consistent advertising-style visuals attracted attention in Vadodara and Gujarat's fashion community.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/houseofrecut/"
      ]
    ],
    "services": [
      "ai",
      "social",
      "brand"
    ]
  },
  {
    "slug": "cubixkraft",
    "name": "Cubixkraft",
    "industry": "AI automation & SaaS",
    "region": "",
    "period": "",
    "headline": "Humanising technology through founder-led AI content",
    "about": "Cubixkraft is an AI automation and software company.",
    "challenge": "Its technology needed clear, relatable communication and consistent video content that could showcase software capabilities.",
    "approach": "We developed consistent founder-character AI videos, AI voice production, edited reels and SaaS product showcases. The approach made technical features easier to communicate in short-form formats.",
    "scope": [
      "Social media management",
      "Reel editing",
      "AI founder avatar videos",
      "AI voice production",
      "SaaS software showcases"
    ],
    "impact": "The project established a repeatable creative approach for founder-led communication and software product demonstrations.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/cubixkraft/"
      ]
    ],
    "services": [
      "ai",
      "social"
    ]
  },
  {
    "slug": "crabby-hunt",
    "name": "Crabby Hunt",
    "industry": "Leather products & e-commerce",
    "region": "India",
    "period": "2025–2026",
    "headline": "Scaling a leather brand across four sales channels",
    "about": "Crabby Hunt sells leather products through its Shopify store and Indian marketplaces.",
    "challenge": "After around eighteen months in business, the brand faced limited visibility and low daily sales.",
    "approach": "Customer feedback, product research, improved catalogue content, marketplace SEO and influencer collaborations supported discovery and customer confidence. We worked on product and seller ratings across channels.",
    "scope": [
      "Shopify development",
      "Marketplace management",
      "Product research and listings",
      "Product photography",
      "Social media and reels",
      "Influencer collaborations",
      "Conversion optimisation"
    ],
    "impact": "Reported Flipkart orders grew from around five per day to over 100, with similar growth reported on the website. Myntra was launched and reached over 30 daily orders; Amazon also saw progress.",
    "metrics": [
      [
        "5 to 100+",
        "Daily Flipkart orders"
      ],
      [
        "30+",
        "Daily Myntra orders after launch"
      ],
      [
        "4",
        "Sales channels"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/crabbyhunt/"
      ],
      [
        "Website",
        "https://www.crabbyhunt.com/"
      ]
    ],
    "services": [
      "web",
      "seo",
      "social",
      "strategy"
    ]
  },
  {
    "slug": "nds-life-coaching",
    "name": "NDS Life Coaching",
    "industry": "Life coaching & wellness",
    "region": "",
    "period": "2024–2025",
    "headline": "Building trust before generating enquiries",
    "about": "NDS Life Coaching, led by Nisha Shah, provides guidance for personal challenges and life decisions.",
    "challenge": "As a new coaching business, it needed visibility and trust with people considering a personal service.",
    "approach": "Informative reels, thoughtful scripts and personal branding communicated the coach's approach. A dedicated landing page and targeted Meta campaigns created a path from discovery to enquiry.",
    "scope": [
      "Personal branding",
      "Business strategy",
      "Social media",
      "Scriptwriting and video production",
      "Meta Ads",
      "Landing page and lead generation"
    ],
    "impact": "The campaigns reported low-cost qualified leads, some of which converted into coaching clients.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/nishashah_lifecoach/"
      ]
    ],
    "services": [
      "brand",
      "social",
      "seo",
      "web",
      "strategy"
    ]
  },
  {
    "slug": "sharp-travel",
    "name": "Sharp Travel",
    "industry": "Travel & tourism",
    "region": "Canada & India",
    "period": "",
    "headline": "Connecting travellers with their next destination",
    "about": "Sharp Travel is a Canadian-based travel company with an office in India, offering travel packages to customers in both markets.",
    "challenge": "The business wanted to reach prospective travellers and generate relevant package enquiries across Canada and India.",
    "approach": "Travel-focused social content and promotional graphics were combined with Meta and Google advertising to reach audiences interested in travel packages.",
    "scope": [
      "Social media content",
      "Promotional creatives",
      "Meta Ads",
      "Google Ads",
      "International lead generation"
    ],
    "impact": "The campaigns generated travel package enquiries from both markets.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/travel_sharp/"
      ]
    ],
    "services": [
      "social",
      "seo"
    ]
  },
  {
    "slug": "mahenoor-foods",
    "name": "Mahenoor Foods",
    "industry": "Food manufacturing & FMCG",
    "region": "Gujarat, India",
    "period": "",
    "headline": "Bringing a legacy manufacturer into the digital market",
    "about": "Mahenoor Foods is a food business established in 2008 that has begun building a digital presence.",
    "challenge": "The objective was to translate years of business experience into a modern identity and attract dealer and distributor attention in Gujarat.",
    "approach": "Premium manufacturing reels combined production visuals with emotional storytelling to communicate the brand's legacy and business credibility.",
    "scope": [
      "Digital launch strategy",
      "Manufacturing reel production",
      "Creative direction",
      "Premium editing",
      "Dealer and distributor-focused communication"
    ],
    "impact": "The new digital content reported over 50,000 reach in seven days. Dealer and distributor enquiries were a campaign objective.",
    "metrics": [
      [
        "50K+",
        "Reach in seven days"
      ],
      [
        "2008",
        "Business established"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/mahenoorfoods/"
      ]
    ],
    "services": [
      "social",
      "brand",
      "strategy"
    ]
  },
  {
    "slug": "zapnut",
    "name": "Zapnut",
    "industry": "Business rebranding & revival",
    "region": "Modasa, Gujarat, India",
    "period": "",
    "headline": "Reviving an established business through owner-led storytelling",
    "about": "Zapnut has a business legacy dating back to 2002 and is refreshing its brand for a new digital audience.",
    "challenge": "The established business needed renewed relevance and a stronger regional identity.",
    "approach": "Owner-led reels put personality and business experience at the centre of the story. Premium shoots, attention-grabbing concepts and professional editing helped present the business in a fresh way.",
    "scope": [
      "Rebranding",
      "Owner-led creative direction",
      "Social media reels",
      "Video shooting and editing",
      "Regional awareness"
    ],
    "impact": "The content reported over 100,000 reach and 200 new followers, with viral visibility in Modasa and nearby areas.",
    "metrics": [
      [
        "100K+",
        "Reported reach"
      ],
      [
        "200+",
        "New followers"
      ],
      [
        "2002",
        "Business legacy since"
      ]
    ],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/zapnuttt/"
      ]
    ],
    "services": [
      "brand",
      "social"
    ]
  },
  {
    "slug": "raj-shah-photography",
    "name": "Raj Shah Photography",
    "industry": "Photography & events",
    "region": "Mumbai, India",
    "period": "",
    "headline": "Turning creative talent into a discoverable photography brand",
    "about": "Raj Shah Photography is a new Mumbai-based studio offering wedding and event photography.",
    "challenge": "The studio needed a professional portfolio and digital visibility to attract potential clients.",
    "approach": "We combined social media content and graphics with a portfolio website that showcased the studio's work and supported photography enquiries.",
    "scope": [
      "Social media management",
      "Content and graphics",
      "Portfolio website development",
      "Wedding and event lead generation"
    ],
    "impact": "The collaboration established a professional digital presence and generated wedding and event photography enquiries.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/rajshahphotography/"
      ]
    ],
    "services": [
      "web",
      "social",
      "brand"
    ]
  },
  {
    "slug": "pink-nail-art",
    "name": "Pink Nail Art",
    "industry": "Beauty & personal care",
    "region": "Ahmedabad, Gujarat, India",
    "period": "",
    "headline": "Building local visibility through beauty-focused content",
    "about": "Pink Nail Art is a nail art studio in Ahmedabad.",
    "challenge": "The studio wanted stronger local awareness and customer enquiries for its promotional offers.",
    "approach": "Customer review reels, showroom content, creative editing and offer-focused advertising showcased the studio and its services.",
    "scope": [
      "Customer review reel editing",
      "Showroom reels",
      "Promotional content",
      "Enquiry-focused advertising"
    ],
    "impact": "The offer campaigns gained viral visibility in Ahmedabad and supported customer enquiries.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/pink_nails_studioo/"
      ]
    ],
    "services": [
      "social",
      "seo"
    ]
  },
  {
    "slug": "dental-spot",
    "name": "Dental Spot",
    "industry": "Dental healthcare",
    "region": "Mooresville, North Carolina, USA",
    "period": "",
    "headline": "Connecting dental care with patients through search advertising",
    "about": "The Dental Spot is a dental practice in Mooresville, North Carolina.",
    "challenge": "The practice wanted engaging digital communication and appointment-focused advertising in a competitive healthcare market.",
    "approach": "We combined creative social posters and content planning with Google Ads campaigns aimed at people searching for relevant dental services.",
    "scope": [
      "Social media content",
      "Creative graphic design",
      "Content planning",
      "Google Ads management",
      "Appointment-focused marketing"
    ],
    "impact": "The campaign reported strong appointment booking results. Exact booking totals were not provided.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/thedentalspotnc/"
      ],
      [
        "Website",
        "https://thedentalspotnc.com/"
      ]
    ],
    "services": [
      "social",
      "seo"
    ]
  },
  {
    "slug": "district-dentistry",
    "name": "District Dentistry",
    "industry": "Dental healthcare",
    "region": "Charlotte, North Carolina, USA",
    "period": "",
    "headline": "Supporting patient acquisition through creative and search marketing",
    "about": "District Dentistry is a dental practice in Charlotte, North Carolina.",
    "challenge": "The practice sought greater digital visibility and relevant appointment enquiries.",
    "approach": "We provided social content, visually engaging posters and Google Ads to support communication and connect with people searching for dental care.",
    "scope": [
      "Creative posters",
      "Social media content",
      "Content planning",
      "Google Ads",
      "Patient acquisition"
    ],
    "impact": "The collaboration supported appointment-focused digital marketing and patient acquisition.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/districtdentistry/"
      ],
      [
        "Website",
        "https://districtdentistryclt.com/"
      ]
    ],
    "services": [
      "social",
      "seo"
    ]
  },
  {
    "slug": "sydney-premium-taxi",
    "name": "Sydney Premium Taxi Service",
    "industry": "Transportation",
    "region": "Sydney, Australia",
    "period": "",
    "headline": "Generating taxi enquiries on a focused advertising budget",
    "about": "Sydney Premium Taxi Service provides taxi services across Sydney.",
    "challenge": "The business wanted to generate more customer enquiries with a limited advertising budget.",
    "approach": "We managed Google Ads focused on local, high-intent searches and enquiry generation rather than visibility alone.",
    "scope": [
      "Google Ads management",
      "Local search advertising",
      "Keyword targeting",
      "Budget optimisation",
      "Lead generation"
    ],
    "impact": "The campaign reported over ten leads per day. The revenue and ad budget require currency and reporting-period confirmation.",
    "metrics": [
      [
        "10+",
        "Reported daily leads"
      ]
    ],
    "links": [],
    "services": [
      "seo"
    ]
  },
  {
    "slug": "ska-moto-bike",
    "name": "SKA Moto Bike",
    "industry": "Motorcycle rental",
    "region": "London, United Kingdom",
    "period": "",
    "headline": "Accelerating motorcycle rental enquiries in London",
    "about": "SKA Moto Bike is a motorcycle rental business serving customers in London.",
    "challenge": "The company wanted stronger digital visibility and relevant rental enquiries.",
    "approach": "We combined Google Ads with social media management, a structured content calendar and visually striking graphics to communicate rental services.",
    "scope": [
      "Social media management",
      "Content calendar",
      "Creative graphics",
      "Google Ads",
      "Local lead generation"
    ],
    "impact": "The work generated rental enquiries from London.",
    "metrics": [],
    "links": [
      [
        "Website",
        "https://skamotors.com/"
      ]
    ],
    "services": [
      "social",
      "seo"
    ]
  },
  {
    "slug": "flutter-pilot",
    "name": "Flutter Pilot",
    "industry": "AI app development & SaaS",
    "region": "",
    "period": "",
    "headline": "Making AI-powered app development easier to understand",
    "about": "Flutter Pilot is an AI app-building platform with a visual studio for generating, editing and exporting Flutter applications.",
    "challenge": "The platform needed to explain its capabilities clearly and attract users organically.",
    "approach": "AI-generated promotional videos and SaaS product showcases demonstrated practical app-building use cases, including working with prompts, designs and business data.",
    "scope": [
      "Organic app marketing",
      "AI promotional videos",
      "SaaS product showcases",
      "Product storytelling",
      "Organic user acquisition"
    ],
    "impact": "The project reported more than 10,000 organic app downloads.",
    "metrics": [
      [
        "10K+",
        "Reported organic app downloads"
      ]
    ],
    "links": [
      [
        "Website",
        "https://flutterpilot.com/"
      ],
      [
        "Flutter Pilot Studio",
        "https://studio.flutterpilot.com/"
      ]
    ],
    "services": [
      "ai",
      "social"
    ]
  },
  {
    "slug": "scholar-career-academy",
    "name": "Scholar Career Academy",
    "industry": "NEET & JEE education",
    "region": "Ahmedabad, Gujarat, India",
    "period": "",
    "headline": "Connecting students with academic opportunities",
    "about": "Scholar Career Academy is an Ahmedabad-based coaching institute for NEET and JEE aspirants.",
    "challenge": "The academy wanted stronger local visibility and student registrations, including for its Talent Hunt examination.",
    "approach": "Institute reels, teacher-led videos, academic programme coverage and graphic design highlighted the learning environment and exam opportunities.",
    "scope": [
      "Institute reels",
      "Teacher videos",
      "Creative graphics",
      "Talent Hunt promotion",
      "Programme coverage",
      "Student registration campaigns"
    ],
    "impact": "The content gained viral visibility in Ahmedabad and Gujarat, supporting student registrations and awareness of the Talent Hunt exam.",
    "metrics": [],
    "links": [
      [
        "Instagram",
        "https://www.instagram.com/sca_ahmedabad/"
      ]
    ],
    "services": [
      "social",
      "brand"
    ]
  }
];
const projectBySlug=Object.fromEntries(caseStudies.map((study,index)=>[study.slug,{study,project:projects[index],index}]));
const casePath=study=>'/work/'+study.slug+'/';
const app=document.getElementById('app');
let towerCleanup=null;
let navigationBound=false;
let projectJourneyCleanup=null;

function shell(eyebrow,title,copy,body=''){
  return `<section class="section reveal"><div class="wrap"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${copy?`<p class="lead">${copy}</p>`:''}${body}</div></section>`;
}

function card(service){
  return `<a class="card" href="/service/${service[0]}/"><span class="num">${service[1]} / 06</span><h3>${service[2]}</h3><p>${service[3]}</p><div class="tags">${service[5].slice(0,2).map(item=>`<span class="tag">${item}</span>`).join('')}</div></a>`;
}

function projectIdentity(project){
  // Each project displays its own optimized, high-resolution logo asset.
  if(project.logo){
    return `<img class="project-logo" src="${project.logo}" alt="${project.name} logo" loading="lazy" decoding="async">`;
  }
  // Pink Nails' uploaded artwork was a photo held by hands. Use a clean,
  // selectable hand-free text wordmark until an approved isolated logo arrives.
  if(project.pinkWordmark){
    return `<span class="project-pink-wordmark"><span aria-hidden="true">✦</span><strong>PINK NAILS</strong><small>ART STUDIO</small></span>`;
  }
  return `<span class="project-wordmark">${project.name}</span>`;
}

function projectCard(project,index,anchor=false){
  const study=caseStudies[index];
  return `<a class="card project-card"${anchor?` id="project-${study.slug}"`: ''} href="${casePath(study)}" aria-label="Read ${caseEscape(study.name)} case study">
    <span class="num">PROJECT / ${String(index+1).padStart(2,'0')}</span>
    <div class="project-logo-slot" data-project-logo-slot>${projectIdentity(project)}</div>
    <h3 class="case-card-name">${caseEscape(study.name)}</h3>
    <p class="project-category">${caseEscape(project.category||study.industry)}</p>
    ${study.region?`<p class="project-regions">${caseEscape(study.region)}</p>`:''}
    <span class="case-card-link">Read case study <span aria-hidden="true">↗</span></span>
  </a>`;
}

function caseEscape(value){
  return String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function casePage(key){
  const entry=projectBySlug[key];
  if(!entry)return work();
  const {study:s,project,index}=entry;
  const esc=caseEscape;
  const related=caseStudies.map((other,i)=>({other,i,score:other.services.filter(x=>s.services.includes(x)).length})).filter(x=>x.i!==index).sort((a,b)=>b.score-a.score||a.i-b.i).slice(0,3);
  return `<article class="section case-study"><div class="wrap">
    <nav class="case-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/work/">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(s.name)}</span></nav>
    <div class="case-hero"><div><div class="eyebrow">Case study / ${String(index+1).padStart(2,'0')}</div><h1>${esc(s.name)}</h1><p class="case-headline">${esc(s.headline)}</p><p class="muted">${esc([s.industry,s.region,s.period].filter(Boolean).join(' · '))}</p></div><div class="panel case-logo">${projectIdentity(project)}</div></div>
    ${s.metrics.length?`<section class="case-metrics" aria-label="Reported project results">${s.metrics.map(m=>`<div class="panel"><strong>${esc(m[0])}</strong><p>${esc(m[1])}</p></div>`).join('')}</section>`:''}
    <div class="case-layout"><div class="case-copy">
      <section><div class="kicker">01 / Context</div><h2>About the business</h2><p>${esc(s.about)}</p></section>
      <section><div class="kicker">02 / Objective</div><h2>The challenge</h2><p>${esc(s.challenge)}</p></section>
      <section><div class="kicker">03 / Approach</div><h2>Our strategy</h2><p>${esc(s.approach)}</p></section>
      <section><div class="kicker">04 / Impact</div><h2>Results and impact</h2><p>${esc(s.impact)}</p><p class="case-note">Results are reported by DigiBuilder and do not guarantee future performance.</p></section>
    </div><aside class="case-side"><div class="panel"><h2>Scope of work</h2><ul>${s.scope.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      ${s.links.length?`<div class="panel"><h2>Explore the client</h2><div class="case-external">${s.links.map(([label,url])=>`<a class="button secondary" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span><span class="case-sr"> (opens in a new tab)</span></a>`).join('')}</div></div>`:''}
      <div class="panel"><h2>Related services</h2><ul>${s.services.map(slug=>{const service=services.find(x=>x[0]===slug);return service?`<li><a class="accent-link" href="/service/${slug}/">${esc(service[2])}</a></li>`:''}).join('')}</ul></div>
    </aside></div>
    <section class="panel case-cta"><div><div class="eyebrow">Your next project</div><h2>Let's build a story worth sharing.</h2><p class="muted">Tell us about your business and the growth you want to achieve.</p></div><a class="button primary" href="/contact/">Start your project</a></section>
    <section class="case-related"><div class="section-head"><div><div class="eyebrow">More work</div><h2>Related case studies</h2></div><a class="accent-link" href="/work/">View all projects</a></div><div class="cards project-grid">${related.map(({i})=>projectCard(projects[i],i)).join('')}</div></section>
  </div></article>`;
}

function projectShowcase(){
  return `<section class="project-journey" id="project-journey" aria-labelledby="project-journey-title">
    <div class="project-sticky">
      <div class="wrap project-journey-heading">
        <div>
          <div class="eyebrow">Explore our projects</div>
          <h2 id="project-journey-title">Different names. <span class="gradient">Distinct stories.</span></h2>
        </div>
        <p>Scroll down to explore our project portfolio as the cards move across the screen. Select a project to explore its case study on our Work page.</p>
      </div>
      <div class="project-stage" id="project-stage" aria-label="Project cards">
        <div class="project-track" role="group" tabindex="0" aria-label="DigiBuilder project portfolio">
          ${projects.map((project,index)=>`<a class="project-slide" href="/work/#project-${caseStudies[index].slug}" data-project-index="${index}" aria-label="Find ${caseEscape(project.name)} on the Work page">
            <div class="project-slide-top"><span>PROJECT / ${String(index+1).padStart(2,'0')}</span><span class="project-slide-symbol" aria-hidden="true">✳</span></div>
            <div class="project-slide-brand" data-project-logo-slot>${projectIdentity(project)}</div>
            <div class="project-slide-bottom">
              ${project.category?`<span class="project-slide-regions project-slide-category">${project.category}</span>`:project.regions?`<span class="project-slide-regions">(${project.regions})</span>`:'<span class="project-slide-caption">DigiBuilder portfolio</span>'}
              <span class="project-slide-index">View project ↗</span>
            </div>
          </a>`).join('')}
        </div>
      </div>
      <div class="wrap project-journey-footer">
        <span><strong id="project-journey-count" aria-label="Current project">01 / ${String(projects.length).padStart(2,'0')}</strong><span class="project-scroll-hint"> Scroll vertically to move horizontally</span></span>
        <a class="project-all-link" href="/work/">View all projects <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>`;
}

function building(){
  return `<section class="tower-journey" id="tower-journey" aria-labelledby="tower-title">
    <h2 id="tower-title" class="case-sr">Explore DigiBuilder’s six capabilities</h2>
    <div class="tower-stage" id="tower-stage" data-floor="01">
      <div class="tower-atmosphere" aria-hidden="true"><div class="city-glow"></div><div class="city-grid"></div></div>
      <div class="tower-heading" aria-hidden="true"><span>The DigiBuilder tower</span><span>Six capability levels · one connected system</span></div>

      <div class="tower-viewport" id="tower-viewport">
        <div class="tower-webgl" id="tower-webgl" aria-hidden="true"></div>
        <div class="tower-fallback" id="tower-fallback" aria-hidden="true">
          <div class="tower-fallback-building">${services.map(()=>'<i></i>').join('')}</div>
        </div>
        <div class="tower-label-layer" id="tower-label-layer">
          ${services.map((service,index)=>`<article class="tower-floor-label ${index===0?'active':''}" data-index="${index}" ${index===0?'':'aria-hidden="true"'}>
            <span class="tower-label-number">${service[1]}</span>
            <div class="tower-label-copy"><h3>${service[2]}</h3><p>${service[3]}</p></div>
          </article>`).join('')}
        </div>
      </div>

      <nav class="tower-tracker" id="floor-nav" aria-label="Capability floors">
        <div class="tracker-rail" aria-hidden="true"><i id="journey-progress"></i><b id="journey-marker"></b></div>
        ${services.map((service,index)=>`<button type="button" data-index="${index}" class="${index===0?'active':''}" aria-label="Go to floor ${service[1]}: ${service[2]}" ${index===0?'aria-current="step"':''}><span>${service[1]}</span></button>`).join('')}
      </nav>

      <div class="journey-ui">
        <div class="journey-hint"><strong id="tower-state">01 / 06</strong><span>Scroll through the building</span></div>
        <div class="scroll-cue" aria-hidden="true">Explore <b>↓</b></div>
      </div>
    </div>
  </section>`;
}

function home(){
  return `<section class="hero"><div class="wrap hero-content">
    <div class="eyebrow">Digital marketing, built around your business</div>
    <h1>Ideas that look <span class="gradient">good.</span> Growth that makes sense.</h1>
    <p class="lead">DigiBuilder brings branding, digital marketing, social media reels, websites, advertising and AI automation into one thoughtful growth partner.</p>
    <div class="actions"><a class="button primary" href="/contact/">Let's talk about your project</a><a class="button secondary" href="/services/">Explore our services</a></div>
    <div class="meta"><span><b>●</b> Based in Gujarat, India</span><span><b>●</b> Working across time zones</span></div>
  </div></section>
  ${building()}
  <section class="section"><div class="wrap section-head"><div><div class="eyebrow">What we can help with</div><h2>One team. Six ways to grow.</h2></div><p>From a sharper brand to the content, website and campaigns behind it, we help you choose the right next move.</p></div><div class="wrap cards">${services.map(card).join('')}</div></section>
  ${projectShowcase()}
  <section class="section markets-section"><div class="wrap split"><div><div class="eyebrow">Local insight. Remote collaboration.</div><h2>Built in Gujarat. Open to the world.</h2><p class="muted">Looking for a digital marketing agency in Modasa or elsewhere in Gujarat? We're here to talk. We also work remotely with businesses considering projects in Sydney, Brampton and London. We do not claim to have an office in every city.</p></div><div class="panel"><div class="kicker">What matters to us</div><h3>Less noise, more useful work.</h3><p>Honest conversations, creative thinking and practical delivery. Whether it's a brand refresh, a reel shoot, a better website or an automation idea, we start with the problem you're trying to solve.</p><a class="button secondary" href="/about/">Meet DigiBuilder</a></div></div></section>
  <section class="band"><div class="wrap split"><div><div class="eyebrow">Let's make your next move count</div><div class="quote">Tell us what's on your mind. We'll help you find a sensible place to start.</div></div><a class="button primary" href="/contact/">Start a conversation</a></div></section>`;
}

function about(){
  return shell(
    'About DigiBuilder',
    'Creative thinking, practical follow-through.',
    'We are a digital marketing and branding team rooted in Gujarat, India. We bring strategy, design, content, advertising, websites and AI automation together so growing businesses do not have to connect every piece themselves.',
    `<div class="split content-gap"><div class="panel"><div class="kicker">How we think</div><h2>First understand the business. Then build the marketing.</h2><p class="muted">Every business has a different story, budget and audience. We ask questions, look at what is already working and recommend the next useful move instead of selling services you may not need.</p></div><div><div class="steps"><div class="step"><div><h3>Listen and learn</h3><p>We understand your customers, goals, challenges and where opportunities might be hiding.</p></div></div><div class="step"><div><h3>Create with purpose</h3><p>From a visual identity to a campaign or video, each decision has a reason behind it.</p></div></div><div class="step"><div><h3>Improve together</h3><p>We review the work, make changes with real feedback and keep communication straightforward.</p></div></div></div></div></div><div class="panel content-gap"><div class="kicker">Where we work</div><p>Our roots are in Modasa, Gujarat. We welcome enquiries from across India, and we can collaborate remotely with teams in markets including Sydney, Brampton and London. Project requirements, availability and local production needs are discussed before we agree on a scope.</p></div>`
  );
}

function servicesPage(){
  return shell(
    'Digital marketing services',
    'The right mix makes the difference.',
    'Need a brand people remember, better social media content, an advertising campaign or an easier way to handle enquiries? Start with what matters to your business. We can help with one focused project or connect several services.',
    `<div class="cards content-gap">${services.map(card).join('')}</div><section class="panel case-cta content-gap"><div><div class="eyebrow">Build your growth strategy</div><h2>Ready to turn your business goals into a growth strategy?</h2><p class="muted">From branding and creative content to websites, advertising and AI, let’s find the right mix of services for your business.</p></div><a href="/contact/" class="button primary">Book a consultation</a></section>`
  );
}

/* Long-form service narratives share one layout but keep distinct content. */
const detailedServicePages={
  "web":{
  "eyebrow": "Website design, development and e-commerce experiences",
  "title": "A website that feels like <span class=\"gradient\">your brand.</span> And works for your customers.",
  "lead": "A beautiful website is not enough if people cannot understand your business or find the next step. At DigiBuilder, we begin with your story, the customers you want to serve and what they need to believe before they take action. Then we turn that clarity into a website that looks distinctive, works smoothly and is built to grow.",
  "note": "From a service website or focused landing page to an online store, we connect brand identity, thoughtful UX, mobile performance, SEO foundations and real business objectives.",
  "pillars": [
    "Business and audience discovery",
    "UX and conversion design",
    "Fast, accessible development",
    "SEO and continuous improvement"
  ],
  "chapters": [
    {
      "step": "Discover",
      "slug": "business",
      "title": "First, we understand what your website needs to achieve.",
      "paragraphs": [
        "Before we open a design file or choose a technology, we want to understand your business DNA. How did the brand start? What has earned customer trust? Which services or products matter most? What questions do people ask before they decide to call, visit, book or buy? A website should carry the answers that make your business different, rather than look like the same template everyone else is using.",
        "We look at your existing website if you have one, listen to your team, understand how enquiries arrive and learn what you want visitors to do. We consider your audience's devices, languages, location and priorities. A restaurant, an immigration service and a home decor business have very different customer journeys. Their websites should reflect that reality, not follow an identical formula."
      ],
      "takeaway": "A clear website brief with audience priorities, business goals and the pages that genuinely matter."
    },
    {
      "step": "Structure",
      "slug": "journey",
      "title": "We design a customer journey that feels natural.",
      "paragraphs": [
        "A visitor should not have to work hard to understand who you are, what you offer or why they can trust you. We plan the information architecture around their questions: what they need to know first, where proof or helpful detail belongs and what step feels right when they are ready to enquire. That means clear navigation, meaningful page headings, readable copy and contact actions that are easy to find.",
        "We bring your brand's emotion and personality into that journey. A premium creative business may need space for visual storytelling, while a local service provider may need a simple explanation of services, locations and how to contact the team. Good UX and conversion-focused website design do not mean pushing people with pop-ups. They mean reducing friction and making the useful next step obvious."
      ],
      "takeaway": "A thoughtful site structure, page-by-page messaging and a user experience built around real decisions."
    },
    {
      "step": "Design",
      "slug": "identity",
      "title": "We turn your brand identity into a digital experience.",
      "paragraphs": [
        "Colours and typography matter, but so do the little interactions that make a website feel considered. We create a visual direction that respects your brand legacy, gives your content room to breathe and presents your business confidently. The design should feel like you, whether someone is browsing a portfolio, reading about a service or looking through products on a phone.",
        "We consider responsive layouts from the start, not as a desktop design squeezed into a smaller screen later. Buttons need comfortable touch targets. Text must stay readable. Images should support the story without slowing everything down. Thoughtful motion can add character when it has a purpose, while accessibility and reduced-motion preferences ensure people can still use the experience comfortably."
      ],
      "takeaway": "Responsive website design with distinctive creative direction, accessible interactions and clear calls to action."
    },
    {
      "step": "Build",
      "slug": "development",
      "title": "We build for speed, search visibility and everyday use.",
      "paragraphs": [
        "The best website is the one your customers can open, understand and use. We choose an appropriate approach for the agreed scope and focus on clean code, maintainability and fast loading. That can mean a lightweight business website, a campaign landing page or an e-commerce experience. We do not recommend complicated technology just because it sounds impressive.",
        "Search engine optimisation begins with the fundamentals: useful page content, descriptive titles, logical headings, readable URLs, sensible internal links and indexable pages. We also consider mobile usability, image optimisation, page performance and structured data where it genuinely helps. For businesses serving Modasa, Gujarat or a wider market, location and service information should be accurate rather than stuffed with repeated keywords."
      ],
      "takeaway": "A practical website foundation that supports customers, search crawlers and future updates without unnecessary complexity."
    },
    {
      "step": "Launch and learn",
      "slug": "launch",
      "title": "We launch carefully and improve what matters.",
      "paragraphs": [
        "A website is not complete when the last button is designed. We check important journeys across screen sizes, review accessibility basics, confirm that forms and contact links work and make sure the agreed pages communicate the right information. We can help plan the handover so your team understands how to maintain the site and what to review when your business changes.",
        "After launch, we look at feedback and the signals available to the business. Are visitors finding the right services? Do enquiries include the details your team needs? Are people able to browse comfortably on mobile? We use those observations to recommend focused improvements. No website can guarantee first-place search rankings or a fixed number of sales, but a clearer experience gives your growth efforts a stronger place to land."
      ],
      "takeaway": "A tested launch, usable handover and a realistic improvement plan connected to your business goals.",
      "related": "Build the bigger picture with <a href=\"/service/strategy/\">growth strategy</a>, <a href=\"/service/brand/\">brand identity</a> and <a href=\"/service/seo/\">SEO and performance marketing</a>."
    }
  ],
  "finish": {
    "eyebrow": "A website with a purpose",
    "title": "Your website should not just look impressive. It should help people choose you.",
    "copy": "When a website understands the business behind it and the people in front of it, every page has a reason to exist. We bring strategy, creativity and practical engineering together to build digital experiences that respect your identity and help customers take the next step with confidence.",
    "cta": "Discuss your website project"
  }
},
  "ai":{
  "eyebrow": "AI automation, assistants and business workflows",
  "title": "Make the work <span class=\"gradient\">simpler.</span> Keep the human thinking.",
  "lead": "AI should fit your business, not force your people into a new process they never asked for. Before suggesting an assistant or automation, we learn how the work happens, where time is being lost and which decisions still need a person.",
  "note": "DigiBuilder explores practical, human-supervised AI workflows that reduce repetitive effort while respecting context, privacy and the way your team actually operates.",
  "pillars": [
    "Workflow discovery",
    "Useful AI use cases",
    "Careful prototypes",
    "Human oversight"
  ],
  "chapters": [
    {
      "step": "Understand",
      "slug": "workflow",
      "title": "First, we understand how your business runs.",
      "paragraphs": [
        "The useful questions come before the tools. How does an enquiry arrive? Who responds? What information gets copied between systems? Which approvals slow down a task? What happens when someone is unavailable? We listen to the people doing the work and map the process as it really happens, including the exceptions that are easy to miss in a polished flowchart.",
        "Sometimes a team does not need AI at all. A clearer form, a better shared document or a simple rule-based automation may solve the problem more reliably. We look for the smallest useful improvement rather than adding technology for its own sake. Your team should understand the problem before anyone tries to automate it."
      ],
      "takeaway": "A practical workflow map showing recurring friction, manual effort and opportunities worth exploring."
    },
    {
      "step": "Prioritise",
      "slug": "opportunities",
      "title": "We choose AI use cases that have a real purpose.",
      "paragraphs": [
        "An assistant can be helpful for drafting, summarising, sorting information or helping staff find answers. Automation can support lead routing, status updates, content operations or repeatable handoffs. But each idea needs a clear benefit, an owner and a way to check whether it is helping.",
        "We weigh potential time savings against setup effort, data sensitivity, error risk and how often the task changes. We also ask what happens when the tool produces an uncertain answer or cannot complete the job. The priority is not to automate as many tasks as possible. It is to free people to spend more attention on customers, quality and decisions that matter."
      ],
      "takeaway": "A ranked set of useful automation opportunities with realistic trade-offs and a human owner."
    },
    {
      "step": "Prototype",
      "slug": "experiments",
      "title": "We test a focused solution before changing everything.",
      "paragraphs": [
        "Rather than promising a complicated AI system on day one, we start with a narrow, testable workflow. It could be an internal assistant that helps draft enquiry replies, a process that organises incoming requests or a small automation that keeps a team informed. We agree what the prototype should do, what it must never do and how a person can review its output.",
        "We use representative examples to test normal situations and awkward edge cases. If the tool invents information, misclassifies a request or gets stuck, that is valuable feedback. A good pilot helps us decide what to improve, what to keep manual and whether the idea deserves further investment."
      ],
      "takeaway": "A useful proof of concept with clearer boundaries, review steps and evidence of what works."
    },
    {
      "step": "Connect responsibly",
      "slug": "safeguards",
      "title": "We keep people, permissions and data in the loop.",
      "paragraphs": [
        "Business workflows often touch customer messages, documents, payments or internal decisions. That means access controls, consent, provider terms and information handling deserve attention from the beginning. We discuss what data is actually needed, which tools may receive it and where sensitive work should remain with an authorised person.",
        "Where the agreed tools support it, we can explore connections between forms, team software, reporting workflows and AI assistants. We build in checkpoints for approval, error handling and a manual fallback. Automation should never quietly become the only way to complete a business-critical task, and your team should know how to pause or correct it."
      ],
      "takeaway": "A human-supervised workflow with transparent responsibilities and sensible safeguards."
    },
    {
      "step": "Enable",
      "slug": "adoption",
      "title": "We make the workflow usable, measurable and maintainable.",
      "paragraphs": [
        "An automation that only its creator understands does not create lasting value. We document how it works, train the people who will use it and identify who should review its performance. Depending on the project, we can establish simple ways to check time saved, accuracy, handoff quality or how many steps a team no longer repeats.",
        "Over time, tools, permissions and business requirements change. We plan for that reality by keeping the solution understandable and reviewing what needs adjustment. The objective is not to replace judgement. It is to give your team room to do more thoughtful work while everyday operations become a little easier to manage."
      ],
      "takeaway": "Clear handover, team confidence and a sensible plan for maintaining and improving the automation.",
      "related": "Automation works best when connected to <a href=\"/service/strategy/\">business priorities</a>, <a href=\"/service/web/\">website journeys</a> and <a href=\"/service/social/\">content workflows</a>."
    }
  ],
  "finish": {
    "eyebrow": "Technology in service of people",
    "title": "Less repetitive work. More room for the work only your team can do.",
    "copy": "We want AI to feel useful, understandable and under control. If your business has a repetitive process that causes delays or takes attention away from customers, we can start by understanding it together and decide whether automation is really the answer.",
    "cta": "Explore an AI workflow"
  }
},
  "seo":{
  "eyebrow": "Search visibility, Google Ads and performance marketing",
  "title": "Get found by the <span class=\"gradient\">right people.</span> Give them a reason to choose you.",
  "lead": "More traffic is not always better growth. We want to understand what your customers are searching for, what they need when they arrive and which channels can help your business earn their attention. Organic SEO and paid advertising work best when both begin with a clear business goal.",
  "note": "DigiBuilder connects search intent, trustworthy website experiences, useful creative and measured campaigns rather than chasing rankings or clicks in isolation.",
  "pillars": [
    "Search intent",
    "Technical and local SEO",
    "Google and Meta Ads",
    "Meaningful measurement"
  ],
  "chapters": [
    {
      "step": "Diagnose",
      "slug": "search",
      "title": "We start by understanding demand, not just keywords.",
      "paragraphs": [
        "Every useful search begins with a real need. Someone may be looking for a nearby service, comparing providers, researching a purchase or trying to solve a problem. We first ask which of these moments matter to your business and what an ideal customer needs to know before getting in touch or buying.",
        "We review the website, search visibility, competitors and the questions your customers ask. That includes checking which pages explain your services well, where visitors may get confused and where a better answer could earn attention. Keyword research helps us understand language and intent, but it should never turn your website into a collection of awkward repeated phrases."
      ],
      "takeaway": "A search strategy grounded in customer intent, relevant topics and actual business priorities."
    },
    {
      "step": "Build",
      "slug": "foundations",
      "title": "We make your website easier to discover and use.",
      "paragraphs": [
        "Search engine optimisation starts with a website that people and crawlers can understand. We look at crawlability, indexing signals, page structure, headings, internal links, titles, descriptions, structured data where appropriate, mobile usability and loading performance. These are foundations, not shortcuts to a guaranteed first position.",
        "We then improve the pages that matter: clear service information, helpful content, natural calls to action and a logical path through the site. Technical SEO and good writing should support each other. A page can be well optimised but still fail customers if it never answers their questions, just as great writing can remain unseen when a site is difficult to navigate."
      ],
      "takeaway": "Cleaner technical SEO and more helpful, accessible, conversion-focused web pages."
    },
    {
      "step": "Connect locally",
      "slug": "local",
      "title": "We help nearby customers understand where you fit.",
      "paragraphs": [
        "For businesses serving a real geographic area, local SEO is about being useful and accurate. We consider location-specific search intent, clear contact details, relevant service information, local content and a Google Business Profile when the business is eligible and genuinely serves that area.",
        "For example, a business in Modasa or elsewhere in Gujarat should be easy for local customers to understand and contact. If you also serve clients remotely, the site should explain that honestly rather than inventing office addresses in new cities. Consistency across your website and real business listings matters more than stuffing city names into every paragraph."
      ],
      "takeaway": "Credible local discovery that reflects where and how your business actually serves customers."
    },
    {
      "step": "Accelerate",
      "slug": "campaigns",
      "title": "We build advertisements around a clear next action.",
      "paragraphs": [
        "Paid advertising can help test an offer, introduce a new product or reach people while longer-term SEO work develops. But an ad is only valuable when the audience, message, landing page and budget make sense together. We look at what you want people to do after they click and whether the experience gives them enough confidence to act.",
        "Depending on the scope, we can plan Google Ads search campaigns, Meta advertising, audience segmentation, creative tests and landing-page improvements. We discuss budgets and expectations clearly, and distinguish media spend from the work needed to build and manage campaigns. No responsible agency can guarantee a specific number of leads, sales or top search positions."
      ],
      "takeaway": "A more deliberate performance marketing plan aligned with relevant audiences, offers and conversions."
    },
    {
      "step": "Learn",
      "slug": "measurement",
      "title": "We improve the parts that matter to your business.",
      "paragraphs": [
        "Rankings, impressions and clicks can be useful signals, but they are only part of the picture. We also think about qualified enquiries, calls, form submissions, useful website engagement and the quality of conversations that follow. Measurement should be appropriate to the business, respectful of users and clear about its limitations.",
        "We review what the available evidence shows, identify friction points and prioritise experiments. That might mean clarifying a landing-page message, testing different creative, improving a service page or shifting budget away from a weak audience. The goal is to make decisions with more confidence as we learn, not to produce reports that sound impressive but change nothing."
      ],
      "takeaway": "SEO and advertising decisions guided by practical reporting, genuine demand and continuous improvement.",
      "related": "Search and performance work best alongside <a href=\"/service/strategy/\">business strategy</a>, <a href=\"/service/web/\">better websites</a> and <a href=\"/service/brand/\">clear brand messaging</a>."
    }
  ],
  "finish": {
    "eyebrow": "Discoverability with purpose",
    "title": "Visibility matters. What happens after someone finds you matters more.",
    "copy": "We help businesses connect useful search visibility, honest advertising and a better digital experience. From local SEO in Gujarat to focused campaigns for a wider audience, every recommendation should lead back to the customer and the real objective behind the spend.",
    "cta": "Discuss your search and growth goals"
  }
},
  "social":{
  "eyebrow": "Social media marketing, reels and video content",
  "title": "Make content people <span class=\"gradient\">want to spend time with.</span>",
  "lead": "A busy content calendar is not the same as a meaningful social presence. We start with the people you want to reach, the stories your brand can honestly tell and the moments worth showing. Then we shape ideas for reels, videos, visuals and conversations that feel like your business.",
  "note": "DigiBuilder connects content strategy with creative production, so your social media has a purpose beyond posting just to stay visible.",
  "pillars": [
    "Audience insights",
    "Content direction",
    "Reel shoots and editing",
    "Consistent publishing"
  ],
  "chapters": [
    {
      "step": "Listen",
      "slug": "audience",
      "title": "We learn what your audience actually cares about.",
      "paragraphs": [
        "Before suggesting trending audio or filming the first reel, we look at your business and your audience. What do customers ask before making a decision? What do they enjoy learning, seeing or sharing? What parts of your day-to-day work would help someone understand the care behind your products or services?",
        "We review your current social presence, the content that has resonated, the questions people ask and the platforms where your audience is likely to spend time. A restaurant, home decor brand, professional service and local retailer should not follow the same content formula. Their customers, buying journeys and reasons for trust are different."
      ],
      "takeaway": "An audience-led social media direction connected to real customer interests, not generic trends."
    },
    {
      "step": "Plan",
      "slug": "pillars",
      "title": "We turn your business story into content people can follow.",
      "paragraphs": [
        "The best ideas usually come from something real: a person, a process, a product detail, a customer question or a meaningful transformation. We turn those insights into content pillars that your brand can own. These might include helpful explanations, behind-the-scenes moments, founder stories, product demonstrations, community conversations and timely campaigns.",
        "From there we shape a practical content calendar, deciding which messages work as Instagram reels, carousels, photography, short-form videos or longer explanations. We think about hooks, captions, calls to action and how one story can work in several formats without feeling repeated. The goal is a rhythm your business can sustain."
      ],
      "takeaway": "Clear content pillars, campaign ideas and a realistic calendar that supports your wider brand strategy."
    },
    {
      "step": "Create",
      "slug": "production",
      "title": "We bring the ideas to life through reels, shoots and edits.",
      "paragraphs": [
        "A strong video does not need to feel like a television advertisement. Sometimes a thoughtful close-up, a confident explanation or a genuine moment with your team says more than an elaborate production. We plan scenes around the story: what should viewers notice first, what should they understand and what feeling should stay with them?",
        "Depending on the agreed project, we can develop reel concepts, shot lists, on-location video shoots, product or service footage, photography direction, editing, captions, motion graphics and sound choices. We also consider vertical framing, mobile readability and the opening seconds that help people decide whether to keep watching."
      ],
      "takeaway": "Social-first video and creative content built to communicate something meaningful, not merely fill a feed."
    },
    {
      "step": "Connect",
      "slug": "community",
      "title": "We help your brand show up consistently and naturally.",
      "paragraphs": [
        "Publishing is only part of social media marketing. People notice how often a brand responds, how useful the information is and whether the personality in its posts matches the real experience. We focus on a voice that feels consistent without becoming mechanical, and content that gives people a reason to return.",
        "That can mean planning posts around launches, festivals, customer questions or everyday business moments, while building sensible workflows for approvals and community responses. We can also connect organic content with focused advertising when it suits the objective. The platform should serve the business rather than dictate its entire identity."
      ],
      "takeaway": "A more coherent social media presence, with clear messaging and an achievable publishing process."
    },
    {
      "step": "Improve",
      "slug": "learning",
      "title": "We use the response to make the next idea stronger.",
      "paragraphs": [
        "Not every reel will reach thousands of people, and not every post is meant to sell. Some content helps people discover you, some builds familiarity and some answers the question that leads to an enquiry. We look at performance in context, including watch time, saves, useful comments, profile activity, enquiries and what your team hears directly from customers.",
        "We use those signals to refine content topics, video openings, creative formats and publishing priorities. The aim is steady improvement and a stronger relationship with the people who matter, rather than chasing a viral moment that has little connection to your business goals."
      ],
      "takeaway": "A learning-led content process that balances creativity, audience connection and business objectives.",
      "related": "Give your content a stronger foundation through <a href=\"/service/brand/\">brand identity</a>, <a href=\"/service/strategy/\">growth strategy</a> and <a href=\"/service/seo/\">paid media and search visibility</a>."
    }
  ],
  "finish": {
    "eyebrow": "Content with a human point of view",
    "title": "Your business already has stories worth telling. Let's tell them well.",
    "copy": "We want people to notice more than a polished edit. We want them to recognise the people, values and attention behind your work. Whether you need a thoughtful reel shoot, a content plan or ongoing social media support, the story should always feel like yours.",
    "cta": "Plan your next content project"
  }
},
  "brand":{
  "eyebrow": "Brand identity, positioning and creative design",
  "title": "Your brand deserves to be <span class=\"gradient\">recognised and remembered.</span>",
  "lead": "A logo is only the beginning. A meaningful brand carries your story, values and promises into every interaction. At DigiBuilder, we learn what makes your business different before deciding how it should look, sound and make people feel.",
  "note": "Whether you are creating something new or refreshing a business with years of history, we build identity from what is real, not from a trend that will disappear next season.",
  "pillars": [
    "Business DNA",
    "Brand positioning",
    "Visual identity",
    "Connected storytelling"
  ],
  "chapters": [
    {
      "step": "Discover",
      "slug": "roots",
      "title": "We begin with the story behind your business.",
      "paragraphs": [
        "Before colours, fonts or a logo concept, we ask why your business exists. Was it started to carry forward a family legacy, solve a problem that no one else was addressing or give customers a better kind of experience? We want to know the decisions and beliefs that shaped the business, because the most recognisable brands rarely begin with decoration.",
        "We listen to the founder, look at the products and services, review what customers already say and examine how your brand currently appears across signs, packaging, websites and social media. We also talk about what you want to preserve as you grow. This discovery helps separate the parts of your identity that are truly yours from the parts that may be holding you back."
      ],
      "takeaway": "A brand foundation rooted in your purpose, history and the experience customers should remember."
    },
    {
      "step": "Position",
      "slug": "promise",
      "title": "We find the promise that makes you worth choosing.",
      "paragraphs": [
        "Good branding does not try to appeal to everyone. It helps the right people understand why a business matters to them. We explore your customers' needs, the alternatives they consider and the words they use when they describe a great experience. Then we work toward a clear point of difference that your team can actually deliver.",
        "This is where brand strategy becomes human. We connect your values with your audience's motivations, define a useful personality and shape a tone of voice that fits the business. A heritage brand may need to feel warm and trusted. An emerging business might need to communicate confidence and fresh thinking. Neither should sound like a copy of its competitors."
      ],
      "takeaway": "Brand positioning, messaging and a distinct voice that feel believable to your audience."
    },
    {
      "step": "Design",
      "slug": "identity",
      "title": "We give that meaning a visual identity.",
      "paragraphs": [
        "Design should make the strategy visible. From the logo and typography to colour, imagery, graphic elements and layout, we work toward a consistent visual language that people can recognise in a moment. Each choice should have a reason, whether it makes the brand more legible, more expressive or easier to use across different formats.",
        "A brand is experienced on tiny phone screens, storefronts, product packaging, presentation decks, reels and advertisements. We consider those real-world touchpoints while building the identity, not as an afterthought. The aim is not simply a beautiful mock-up. It is a usable system that looks considered wherever the business appears."
      ],
      "takeaway": "Thoughtful brand identity and creative direction designed for everyday use, online and offline."
    },
    {
      "step": "Express",
      "slug": "touchpoints",
      "title": "We bring the brand into every customer touchpoint.",
      "paragraphs": [
        "A brand feels stronger when the same character comes through in everything it does. We think about how the message carries from a website headline to a social media post, a video, an advertisement, an email or the experience someone has while asking a question. Consistency matters, but it should never make your business sound robotic.",
        "We can connect brand storytelling with social content, campaigns and digital experiences, helping the team create work that feels like it belongs together. This is especially valuable when different people are responsible for design, sales, customer service and marketing. They should all be able to tell the same story in their own natural way."
      ],
      "takeaway": "Connected storytelling, creative assets and guidelines that help your brand show up as one brand."
    },
    {
      "step": "Evolve",
      "slug": "growth",
      "title": "We help your identity grow without losing its roots.",
      "paragraphs": [
        "A brand launch is a beginning, not the finish line. We plan how the identity will be introduced, what assets the team needs first and how to keep things consistent when new products, locations or campaigns arrive. Depending on the engagement, that may include launch creative, usage guidelines, templates or a practical handover for your team.",
        "As customers respond, we look at what is clear, what causes confusion and where the brand can become more useful. Recognition and trust are built over many experiences, not by promising instant results from a design refresh. Our job is to give you a foundation that can grow with the business while still feeling unmistakably yours."
      ],
      "takeaway": "A lasting creative foundation with realistic next steps for launch, consistency and brand growth.",
      "related": "A strong identity becomes even more valuable with <a href=\"/service/strategy/\">business strategy</a>, <a href=\"/service/social/\">social storytelling</a> and a <a href=\"/service/web/\">conversion-minded website</a>."
    }
  ],
  "finish": {
    "eyebrow": "More than attractive design",
    "title": "Let people recognise your business before they even read the name.",
    "copy": "We want your brand to feel familiar, credible and full of character. Something your team is proud to represent and your customers are happy to return to. That begins by respecting what you have built, then giving it a clear identity for what comes next.",
    "cta": "Talk about your brand"
  }
},
};

function detailedServicePage(key){
  const page=detailedServicePages[key];
  const firstId=key+'-approach';
  const chapters=page.chapters.map((chapter,index)=>{
    const headingId=key+'-'+chapter.slug;
    return `<section class="section service-story-chapter" ${index===0?`id="${firstId}"`:''} aria-labelledby="${headingId}">
      <div class="wrap service-story-chapter-layout">
        <div class="service-story-chapter-heading">
          <div class="eyebrow">${String(index+1).padStart(2,'0')} / ${chapter.step}</div>
          <h2 id="${headingId}">${chapter.title}</h2>
        </div>
        <div class="service-story-chapter-copy">
          ${chapter.paragraphs.map(paragraph=>`<p>${paragraph}</p>`).join('')}
          <p class="service-story-takeaway"><strong>What this creates:</strong> ${chapter.takeaway}</p>
          ${chapter.related?`<p class="service-story-related">${chapter.related}</p>`:''}
        </div>
      </div>
    </section>`;
  }).join('');
  const finishId=key+'-finish';
  return `<section class="section service-story-intro" aria-labelledby="${key}-title">
    <div class="wrap">
      <div class="eyebrow">${page.eyebrow}</div>
      <h1 id="${key}-title">${page.title}</h1>
      <p class="lead">${page.lead}</p>
      <p class="service-story-intro-note">${page.note}</p>
      <div class="actions"><a class="button primary" href="/contact/">${page.finish.cta}</a><a class="button secondary" href="#${firstId}">Explore our approach</a></div>
      <div class="service-story-essentials" aria-label="Our key priorities">${page.pillars.map(pillar=>`<span>${pillar}</span>`).join('')}</div>
    </div>
  </section>
  ${chapters}
  <section class="section service-story-finish" aria-labelledby="${finishId}">
    <div class="wrap">
      <div class="eyebrow">${page.finish.eyebrow}</div>
      <h2 id="${finishId}">${page.finish.title}</h2>
      <p>${page.finish.copy}</p>
      <div class="actions"><a class="button primary" href="/contact/">${page.finish.cta}</a><a class="button secondary" href="/services/">Explore all services</a></div>
      <p class="service-story-location">DigiBuilder is based in Modasa, Gujarat and works remotely with teams across India and internationally.</p>
    </div>
  </section>`;
}

function strategyPage(){
  return `<section class="section service-story-intro" aria-labelledby="strategy-title">
    <div class="wrap">
      <div class="eyebrow">Brand strategy and growth consulting</div>
      <h1 id="strategy-title">Growth strategy starts with <span class="gradient">your business DNA.</span></h1>
      <p class="lead">Before we talk about advertisements, social media or marketing budgets, we want to understand what makes your business yours. Where did it begin? What has it stood for? Why do customers choose you, trust you and come back? At DigiBuilder, these answers come before the strategy.</p>
      <p class="service-story-intro-note">We connect your roots, your customers and your ambition to create a brand people can genuinely relate to, supported by a clear plan for sustainable business growth.</p>
      <div class="actions"><a class="button primary" href="/contact/">Let's talk about your business</a><a class="button secondary" href="#our-approach">Explore our approach</a></div>
      <div class="service-story-essentials" aria-label="Our strategic priorities"><span>Business understanding</span><span>Human connection</span><span>Brand clarity</span><span>Growth planning</span></div>
    </div>
  </section>

  <section class="section service-story-chapter" id="our-approach" aria-labelledby="strategy-dna">
    <div class="wrap service-story-chapter-layout">
      <div class="service-story-chapter-heading"><div class="eyebrow">01 / Discover</div><h2 id="strategy-dna">First, we understand the DNA of your business.</h2></div>
      <div class="service-story-chapter-copy">
        <p>A business is more than a product, a logo or a service list. It is built from the founder's vision, the decisions that shaped it, the promises made to customers and the problems it set out to solve. Those details often explain why people care about a brand more than any advertising slogan could.</p>
        <p>We begin with conversations, not assumptions. We listen to your story, understand your strengths and challenges, look at how your business currently reaches customers, and ask what kind of future you want to create. We explore your products, service experience, existing marketing, customer feedback and the opportunities you may not have had time to notice.</p>
        <p class="service-story-takeaway"><strong>Our starting point:</strong> a clearer picture of what should stay true to your business and what needs to change for it to grow.</p>
      </div>
    </div>
  </section>

  <section class="section service-story-chapter" aria-labelledby="strategy-legacy">
    <div class="wrap service-story-chapter-layout">
      <div class="service-story-chapter-heading"><div class="eyebrow">02 / Connect</div><h2 id="strategy-legacy">We turn your legacy into a connection people can feel.</h2></div>
      <div class="service-story-chapter-copy">
        <p>Every brand carries something meaningful. It might be years of craftsmanship, a family tradition, a local reputation, the courage of a first-generation founder or a simple belief in treating customers better. That legacy should not disappear when a business goes digital. It can become the strongest part of its story.</p>
        <p>We look for the human truth behind your brand: the values you live by, the experience you want people to remember and the emotions that bring them back. Then we help shape a brand narrative, tone of voice and positioning that feel natural to you and relevant to your audience. The goal is not to manufacture emotion. It is to make the real connection easier to recognise.</p>
        <p class="service-story-takeaway"><strong>Our focus:</strong> brand storytelling and emotional positioning that build recognition, trust and a reason to choose you.</p>
      </div>
    </div>
  </section>

  <section class="section service-story-chapter" aria-labelledby="strategy-audience">
    <div class="wrap service-story-chapter-layout">
      <div class="service-story-chapter-heading"><div class="eyebrow">03 / Understand</div><h2 id="strategy-audience">We study the people your brand needs to reach.</h2></div>
      <div class="service-story-chapter-copy">
        <p>The right marketing strategy starts with the people on the other side of the screen. What do they want to achieve? What do they worry about? Which questions do they ask before buying, visiting or making an enquiry? Where do they discover businesses like yours, and what helps them decide whom to trust?</p>
        <p>We use available customer insights, competitor research, search intent and your business context to find useful patterns. That could mean understanding local discovery in Modasa or Gujarat, reviewing how customers respond to content, or exploring how a remote audience may have different needs. We do not treat every platform or audience as equally important.</p>
        <p class="service-story-takeaway"><strong>What this shapes:</strong> audience priorities, customer journeys, key messages and opportunities for more relevant marketing.</p>
      </div>
    </div>
  </section>

  <section class="section service-story-chapter" aria-labelledby="strategy-direction">
    <div class="wrap service-story-chapter-layout">
      <div class="service-story-chapter-heading"><div class="eyebrow">04 / Build</div><h2 id="strategy-direction">Only then do we build the strategy.</h2></div>
      <div class="service-story-chapter-copy">
        <p>Once we understand your business and the people it serves, we turn insight into direction. We clarify how your brand should be positioned, what you want to be known for, which offers deserve attention and what a meaningful next step looks like for your customers.</p>
        <p>The plan may bring together branding, website experience, search engine optimisation, local SEO, social media marketing, content creation, video storytelling or performance advertising. But it is not about doing everything. It is about choosing the right mix, in the right order, for your goals and resources. Every recommendation should have a purpose and a reason behind it.</p>
        <p class="service-story-takeaway"><strong>What you can work toward:</strong> a focused brand and digital marketing strategy with clear priorities rather than disconnected campaigns.</p>
        <p class="service-story-related">Explore the connected capabilities: <a href="/service/brand/">branding and creative</a>, <a href="/service/social/">social media and video</a>, and <a href="/service/seo/">SEO and performance marketing</a>.</p>
      </div>
    </div>
  </section>

  <section class="section service-story-chapter" aria-labelledby="strategy-plan">
    <div class="wrap service-story-chapter-layout">
      <div class="service-story-chapter-heading"><div class="eyebrow">05 / Grow</div><h2 id="strategy-plan">A strong idea needs a practical growth plan.</h2></div>
      <div class="service-story-chapter-copy">
        <p>A strategy has value only when people know how to act on it. We break the direction into manageable steps, with suggested timelines, ownership, creative requirements, channel priorities and a realistic view of budget and capacity. Depending on your needs, that may mean a focused 90-day roadmap, a launch plan or a longer-term brand growth framework.</p>
        <p>We also decide what to learn as we go. Instead of chasing likes or making empty ranking promises, we consider meaningful signals such as qualified enquiries, website engagement, customer response, conversion opportunities and brand consistency. The plan should be flexible enough to improve when real feedback arrives, while staying connected to the purpose that started it all.</p>
        <p class="service-story-takeaway"><strong>Our aim:</strong> thoughtful execution, honest measurement and a stronger relationship between your brand and the people it wants to serve.</p>
      </div>
    </div>
  </section>

  <section class="section service-story-finish" aria-labelledby="strategy-finish-title">
    <div class="wrap">
      <div class="eyebrow">More than another marketing plan</div>
      <h2 id="strategy-finish-title">We don't want your business to just be seen. We want it to be understood.</h2>
      <p>For us, growth is not only about reaching more people. It is about helping the right people recognise your value, remember your story and feel confident choosing you. Whether you're building a new venture or carrying forward a legacy business, your next chapter should feel like a natural continuation of who you are.</p>
      <div class="actions"><a class="button primary" href="/contact/">Start your strategy conversation</a><a class="button secondary" href="/services/">See all our services</a></div>
      <p class="service-story-location">DigiBuilder is based in Modasa, Gujarat and works with businesses across India and remotely with international teams.</p>
    </div>
  </section>`;
}

function servicePage(key){
  if(key==='strategy')return strategyPage();
  if(detailedServicePages[key])return detailedServicePage(key);
  const service=serviceMap[key];
  const detail=serviceDetails[key];
  return shell(
    'What we do / '+service[1],
    service[2],
    detail[0],
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">How we can help</div><p>${detail[1]}</p><div class="tags">${service[5].map(item=>`<span class="tag">${item}</span>`).join('')}</div></div></div><div><div class="kicker">The outcome</div><h2>Work that earns its place.</h2><p class="muted">${detail[2]}</p><a class="button primary" href="/contact/">Discuss this service</a></div></div><div class="section-head section-followup"><div><div class="eyebrow">Your questions</div><h2>How do we get started?</h2></div></div><div class="faq"><details><summary>Can we begin with a small project?</summary><p>Yes. We can start with an audit, a shoot, a landing page or another clearly defined first step, depending on what you need.</p></details><details><summary>Can DigiBuilder work with our existing team?</summary><p>Absolutely. We can support your in-house marketers, designers or developers and agree who owns each part of the work.</p></details><details><summary>Will you share a clear scope?</summary><p>Yes. Before work starts, we'll talk through deliverables, responsibilities, timelines and fees.</p></details></div>`
  );
}

function work(){
  return shell(
    'Our work',
    'The names behind the projects.',
    'Explore 22 client case studies across branding, social media, e-commerce, AI creative production and performance marketing.',
    `<div class="actions"><a class="button primary" href="/portfolio/">Explore linked portfolio</a></div><div class="cards project-grid content-gap">${projects.map((project,index)=>projectCard(project,index,true)).join('')}</div><section class="panel case-cta content-gap"><div><div class="eyebrow">Your brand could be next</div><h2>Let’s build your next success story.</h2><p class="muted">Have a business idea, a brand to grow or a new market to reach? Let’s talk about how DigiBuilder can help you move forward.</p></div><a class="button primary" href="/contact/">Start your project</a></section>`
  );
}

function contact(){
  return shell(
    'Contact',
    'Tell us what you are working on.',
    'Need a clearer brand, stronger social content, a new website or better-performing ads? Share the idea, the challenge and your timeline. We will reply with a practical next step.',
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">Prefer a direct hello?</div><h2>Your idea deserves a real conversation.</h2><p class="muted">Email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> or message <a href="https://wa.me/917016348927" target="_blank" rel="noopener" class="accent-link">WhatsApp +91 70163 48927</a>.</p><p class="muted">Based in Gujarat, we welcome enquiries from Modasa and beyond. Remote projects are discussed around your time zone and the work involved.</p></div></div><div class="panel"><form class="form" id="contact-form" action="https://formspree.io/f/maenabzy" method="POST"><input type="hidden" name="_subject" value="New DigiBuilder consultation enquiry"><div class="row"><label>Name *<input required name="name" autocomplete="name"></label><label>Email *<input required type="email" name="email" autocomplete="email"></label></div><div class="row"><label>Phone (optional)<input name="phone" type="tel"></label><label>Service<select name="service"><option>Not sure yet</option>${services.map(service=>`<option>${service[2]}</option>`).join('')}</select></label></div><label>Project context<textarea required name="project" placeholder="What are you building or trying to improve?"></textarea></label><div class="notice">Sending this form shares your enquiry with Formspree so DigiBuilder can reply. See our <a href="/privacy/" class="accent-link">privacy policy</a>, or use WhatsApp if you prefer.</div><div class="actions"><button class="button primary" type="submit">Send enquiry</button><button class="button secondary" type="button" id="wa">Message on WhatsApp</button></div><p id="form-status" class="muted" aria-live="polite"></p></form></div></div>`
  );
}

function legal(kind){
  if(kind==='privacy'){
    return shell(
      'Privacy policy',
      'Your enquiry is your information.',
      'Last updated: 26 October 2026. This policy explains how DigiBuilder handles the information you choose to share when you contact us.',
      `<div class="legal content-gap">
        <h2>1. Information we receive</h2>
        <p>When you send an enquiry through our website, the form asks for your name, email address, project context and the service you are interested in. Your phone number is optional. If you contact us by email or WhatsApp, we also receive the information included in that conversation.</p>
        <h2>2. Why we use it</h2>
        <p>We use your details to read your enquiry, reply to you, understand the project, prepare a proposal if requested and keep a record of our business conversation. We do not sell the contact information you submit.</p>
        <h2>3. Forms and service providers</h2>
        <p>Our contact form is processed by <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener" class="accent-link">Formspree</a>. Direct messages use your email provider or <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener" class="accent-link">WhatsApp</a>. Our site is published using GitHub Pages, and the optional 3D experience may load a JavaScript library from jsDelivr. These providers may process technical information under their own privacy policies.</p>
        <h2>4. Cookies, analytics and technical data</h2>
        <p>At the time of this update, DigiBuilder has not installed advertising pixels or visitor analytics scripts on this website. The site itself does not ask you to create an account. Hosting, CDN and messaging providers may maintain server logs or use their own technical storage. We will update this policy if our practices change.</p>
        <h2>5. Who can access the details</h2>
        <p>Enquiries are used by DigiBuilder to respond and manage work. We use relevant service providers to deliver the form, hosting and communication functions described above. We may disclose information when required by applicable law.</p>
        <h2>6. How long information is kept</h2>
        <p>We keep conversations and project information for as long as reasonably needed to respond, manage an enquiry or engagement, maintain records and meet applicable obligations. We do not promise a fixed deletion timeline because the purpose and legal requirements can vary.</p>
        <h2>7. Your choices and requests</h2>
        <p>You can ask to access, correct or delete personal information you've shared with us, subject to any legal or legitimate record-keeping requirements. Email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> and describe your request. We may need to confirm that it relates to your information.</p>
        <h2>8. Visitors outside India</h2>
        <p>We work remotely with international enquiries. Depending on the providers involved, information may be processed or stored in other countries under their respective arrangements.</p>
        <h2>9. Changes and contact</h2>
        <p>We may revise this page if our website tools or business practices change. The latest version will appear here with an updated date. For questions about this policy, contact <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a>.</p>
      </div>`
    );
  }
  return shell(
    'Website terms',
    'Clear expectations make better work.',
    'Last updated: 26 October 2026. These terms describe use of the DigiBuilder website. Any paid project is governed by the written proposal or agreement accepted by both sides.',
    `<div class="legal content-gap">
      <h2>1. Using this website</h2>
      <p>You are welcome to explore our services, work and contact details. Please do not misuse the site, attempt unauthorised access or use its content in ways that infringe someone else's rights.</p>
      <h2>2. Website information</h2>
      <p>We aim to describe our services accurately, but the website provides general information. It is not a binding offer, a fixed price list or a guarantee of particular marketing results. Availability, deliverables and estimates depend on your brief.</p>
      <h2>3. Starting a project</h2>
      <p>Before we begin paid work, we discuss the brief and agree a written scope that can include deliverables, timelines, payment milestones, review rounds, approvals and responsibilities. A website enquiry or introductory conversation does not, by itself, create a paid engagement.</p>
      <h2>4. Feedback, changes and timelines</h2>
      <p>Projects work best when materials, access and approvals arrive on time. If the scope changes after an agreement, we will discuss the effect on fees and timing before moving ahead with the added work.</p>
      <h2>5. Materials and ownership</h2>
      <p>Please share only brand assets, images, music, copy and other material you have permission to use. Ownership and permitted use of any work we create are governed by the agreed project terms; third-party fonts, stock assets and software may have their own licences.</p>
      <h2>6. Third-party tools and advertising</h2>
      <p>Services may involve platforms such as Google, Meta, website hosts and AI tools. Their fees, account rules, availability and policies are separate from ours unless the agreed scope says otherwise. Advertising or search performance can change due to factors outside any agency's control.</p>
      <h2>7. Project results and examples</h2>
      <p>Every business and campaign is different. We do not guarantee rankings, reach, leads or sales from the website descriptions alone. Project names shown in our portfolio do not imply a particular service or result unless we describe it on that project.</p>
      <h2>8. External websites</h2>
      <p>Links to third-party websites are offered for convenience. Their content, policies and services are managed by those providers.</p>
      <h2>9. Questions and updates</h2>
      <p>We may update these website terms to reflect changes to our services or online presence. For questions about an engagement or this page, write to <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a>. A separately signed agreement takes precedence for the specific work it covers.</p>
    </div>`
  );
}

function prepareWhatsApp(){
  const form=document.getElementById('contact-form');
  if(!form?.reportValidity())return;

  const data=new FormData(form);
  const name=data.get('name');
  const email=data.get('email');
  const phone=data.get('phone')||'Not provided';
  const service=data.get('service');
  const project=data.get('project');
  const text=`Hello Digibuilder,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject context:\n${project}`;

  location.href=`https://wa.me/917016348927?text=${encodeURIComponent(text)}`;
}

async function submitContact(event){
  event.preventDefault();

  const form=event.currentTarget;
  if(!form.reportValidity())return;

  const status=document.getElementById('form-status');
  const submitButton=form.querySelector('button[type="submit"]');
  const originalLabel=submitButton?.textContent;

  if(status)status.textContent='Sending your enquiry…';
  if(submitButton){
    submitButton.disabled=true;
    submitButton.textContent='Sending…';
  }

  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{Accept:'application/json'}
    });

    if(response.ok){
      form.reset();
      if(status)status.textContent='Thanks! Your enquiry has been sent. We’ll get back to you soon.';
      return;
    }

    let message='Sorry, your enquiry could not be sent. Please try again or use WhatsApp.';
    try{
      const data=await response.json();
      if(Array.isArray(data?.errors)&&data.errors.length){
        message=data.errors.map(error=>error.message).filter(Boolean).join(' ')||message;
      }
    }catch(_error){
      // Keep the friendly fallback message when Formspree does not return JSON.
    }
    if(status)status.textContent=message;
  }catch(_error){
    if(status)status.textContent='Sorry, your enquiry could not be sent. Please check your connection or use WhatsApp.';
  }finally{
    if(submitButton){
      submitButton.disabled=false;
      submitButton.textContent=originalLabel||'Send enquiry';
    }
  }
}

function setMenuOpen(open){
  const menu=document.getElementById('menu');
  const nav=document.getElementById('nav');
  if(!menu||!nav)return;
  nav.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  menu.textContent=open?'✕':'☰';
}

function bind(){
  const menu=document.getElementById('menu');
  const nav=document.getElementById('nav');

  // Header persists across page changes: register its listeners only once.
  if(!navigationBound&&menu&&nav){
    navigationBound=true;
    menu.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open')));
    nav.addEventListener('click',event=>{
      if(event.target.closest('a'))setMenuOpen(false);
    });
    document.addEventListener('pointerdown',event=>{
      if(nav.classList.contains('open')&&!nav.contains(event.target)&&!menu.contains(event.target)){
        setMenuOpen(false);
      }
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&nav.classList.contains('open')){
        setMenuOpen(false);
        menu.focus();
      }
    });
    window.addEventListener('resize',()=>{
      if(!window.matchMedia('(max-width:900px), (pointer:coarse) and (max-width:1100px)').matches){
        setMenuOpen(false);
      }
    },{passive:true});
  }

  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',submitContact);
    document.getElementById('wa')?.addEventListener('click',prepareWhatsApp);
  }
}

const routePaths={
  home:'/',about:'/about/',services:'/services/',work:'/work/',contact:'/contact/',
  privacy:'/privacy/',terms:'/terms/'
};
function legacyHashTarget(){
  const match=location.hash.match(/^#\/(about|services|work|contact|privacy|terms|service\/[^/]+)\/?$/);
  if(!match)return null;
  return match[1].startsWith('service/')?'/'+match[1]+'/':routePaths[match[1]];
}

/* Scroll down to move the project stack sideways, with no scroll interception. */
function initProjectJourney(){
  const journey=document.getElementById('project-journey');
  if(!journey||typeof window.requestAnimationFrame!=='function')return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cards=[...journey.querySelectorAll('.project-slide')];
  const indicator=document.getElementById('project-journey-count');
  if(cards.length<2||!indicator)return;

  let frameId=0;
  let current=0;
  let target=0;
  let journeyTop=0;
  let scrollRange=1;
  let horizontalStep=180;
  let lastIndex=-1;
  let disposed=false;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const schedule=()=>{
    if(!frameId&&!disposed&&!document.hidden)frameId=window.requestAnimationFrame(paint);
  };

  const paint=()=>{
    frameId=0;
    if(disposed)return;
    const bounds=journey.getBoundingClientRect();
    if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;

    current+=((target-current)*.15);
    if(Math.abs(current-target)<.002)current=target;

    cards.forEach((card,index)=>{
      const offset=index-current;
      const distance=Math.abs(offset);
      const visible=distance<4.1;
      if(!visible){
        if(card.style.visibility!=='hidden'){
          card.style.visibility='hidden';
          card.style.opacity='0';
        }
        return;
      }
      const spread=clamp(offset,-4,4);
      const z=-Math.min(distance,4)*62;
      const x=offset*horizontalStep;
      const y=Math.min(distance,3)*5;
      const angle=-spread*7.5;
      const scale=1-Math.min(distance,3)*.07;
      card.style.visibility='visible';
      card.style.opacity=String(clamp((4.1-distance)*.85,0,1));
      card.style.zIndex=String(100-Math.round(distance*12));
      card.style.transform=`translate3d(calc(-50% + ${x.toFixed(1)}px),calc(-50% + ${y.toFixed(1)}px),${z.toFixed(1)}px) rotateY(${angle.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
    });

    const index=clamp(Math.round(current),0,cards.length-1);
    if(index!==lastIndex){
      lastIndex=index;
      indicator.textContent=`${String(index+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
      indicator.setAttribute('aria-label',`Project ${index+1} of ${cards.length}`);
    }
    if(Math.abs(current-target)>.002)schedule();
  };

  const scroll=()=>{
    target=clamp((window.scrollY-journeyTop)/scrollRange,0,1)*(cards.length-1);
    schedule();
  };

  const measure=()=>{
    const small=window.innerWidth<=600;
    horizontalStep=small?clamp(window.innerWidth*.51,148,210):clamp(window.innerWidth*.25,210,305);
    const scrollPerProject=small?clamp(window.innerHeight*.35,170,270):clamp(window.innerHeight*.42,215,355);
    const verticalTravel=Math.round((cards.length-1)*scrollPerProject);
    journey.style.setProperty('--project-scroll-height',`${Math.round(window.innerHeight+verticalTravel)}px`);
    journeyTop=journey.getBoundingClientRect().top+window.scrollY;
    scrollRange=Math.max(1,journey.offsetHeight-window.innerHeight);
    target=clamp((window.scrollY-journeyTop)/scrollRange,0,1)*(cards.length-1);
    current=target;
    schedule();
  };

  journey.classList.add('is-animated');
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  document.addEventListener('visibilitychange',scroll);
  measure();

  projectJourneyCleanup=()=>{
    disposed=true;
    if(frameId)window.cancelAnimationFrame(frameId);
    window.removeEventListener('scroll',scroll);
    window.removeEventListener('resize',measure);
    document.removeEventListener('visibilitychange',scroll);
    journey.classList.remove('is-animated');
    journey.style.removeProperty('--project-scroll-height');
    cards.forEach(card=>{
      card.style.transform='';
      card.style.opacity='';
      card.style.zIndex='';
      card.style.visibility='';
    });
  };
}

function render(){
  projectJourneyCleanup?.();
  projectJourneyCleanup=null;
  const legacy=legacyHashTarget();
  if(legacy && typeof location.replace==='function'){
    location.replace(legacy);
    return;
  }

  // Pre-rendered pages already contain their SEO-readable content.
  // Only attach the menu and contact form interactions in the browser.
  if(app.dataset?.prerendered==='true'){
    const view=location.pathname.split('/').filter(Boolean)[0]||'home';
    document.querySelectorAll('.links a').forEach(link=>{
      const href=link.getAttribute('href');
      link.classList.toggle('active',href===routePaths[view]||(view==='service'&&href==='/services/'));
    });
    bind();
    initProjectJourney();
    return;
  }

  towerCleanup?.();
  towerCleanup=null;
  const parts=location.hash.startsWith('#/')?location.hash.slice(2).split('/'):[];
  const path=location.pathname.split('/').filter(Boolean);
  const view=parts[0]||path[0]||'home';
  const key=parts[1]||path[1];
  const output=view==='home'?home():view==='about'?about():view==='services'?servicesPage():view==='service'&&serviceMap[key]?servicePage(key):view==='work'?(key?casePage(key):work()):view==='contact'?contact():view==='privacy'?legal('privacy'):view==='terms'?legal('terms'):home();
  app.innerHTML=output;
  setMenuOpen(false);
  bind();
  initProjectJourney();
  window.scrollTo(0,0);
}

function initAmbientPointer(){
  // Subtle easing with more visible travel on pointer-equipped desktops.
  // Touch devices and reduced-motion users keep the ambient field static.
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const root=document.documentElement;
  let targetX=0,targetY=0,x=0,y=0,frame=0;
  const step=()=>{
    frame=0;
    x+=(targetX-x)*.075;
    y+=(targetY-y)*.075;
    root.style.setProperty('--ambient-x',x.toFixed(2)+'px');
    root.style.setProperty('--ambient-y',y.toFixed(2)+'px');
    if(Math.abs(targetX-x)>.1||Math.abs(targetY-y)>.1)frame=requestAnimationFrame(step);
  };
  window.addEventListener('pointermove',event=>{
    // Maximum displacement: about 36px from center, without abrupt snapping.
    targetX=((event.clientX/window.innerWidth)-.5)*72;
    targetY=((event.clientY/window.innerHeight)-.5)*72;
    if(!frame && !document.hidden)frame=requestAnimationFrame(step);
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0}
  });
}

document.getElementById('year').textContent=new Date().getFullYear();
initAmbientPointer();
window.addEventListener('hashchange',render);
render();
