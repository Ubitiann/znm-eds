// Page definitions for the ZNM replica. Text comes from zayednationalmuseum.ae.
// `node tools/generate-content.mjs` turns this into AEM documents in /content.
export const SITE = 'Zayed National Museum';
export const MEDIA = 'https://api.zayednationalmuseum.ae/-/media/project/';

export const crumbLabels = {
  '/en/visit': 'Plan your visit',
  '/en/explore': 'Explore',
  '/en/experiences': 'Experiences',
  '/en/learn': 'Our programmes',
  '/en/research': 'Research',
  '/en/get-involved': 'Get involved',
  '/en/event-calender': 'Events, Exhibitions and Tours',
};

const c = (...paths) => ({ cards: paths });

export const pages = [
  {
    path: '/en/index',
    h1: 'Celebrating the rich history, culture and stories of the United Arab Emirates',
    img: 'znm-r3/visit/exterior-image.jpg',
    intro: ['To further enrich your experience, book your events, exhibitions and tours prior to your museum visit.'],
    cardsTitle: 'Discover the museum',
    home: true,
    ...c('/en/visit', '/en/explore', '/en/experiences', '/en/learn', '/en/research', '/en/get-involved', '/en/about'),
  },
  {
    path: '/en/visit',
    h1: 'Your visit to Zayed National Museum',
    img: 'znm-r3/final-asset/dscf4836.jpg',
    intro: [
      'Zayed National Museum tells the story of the United Arab Emirates and its Founding Father, the late Sheikh Zayed bin Sultan Al Nahyan. Explore ancient and modern history in six permanent galleries, and wander the outdoor gallery of Al Masar Garden.',
      'Book your entry tickets to explore the rich history and culture of the United Arab Emirates.',
    ],
    ...c('/en/visit/dine-and-shops', '/en/visit/school-visit', '/en/visit/accessibility'),
  },
  {
    path: '/en/visit/dine-and-shops',
    h1: 'Dining and Al Nagwa Boutique',
    img: 'znm-r3/final-asset/kne-id-fdr-gf-0008-perspective-view--7.jpg',
    intro: ['Zayed National Museum features five on site dining options designed to enhance your visit. Enjoy authentic Emirati flavours at Erth Restaurant, light meals at Al Ghaf Cafe or quick refreshments from one of our three Garden Cafes located in Al Masar Garden.'],
    ...c('/en/visit', '/en/visit/school-visit', '/en/visit/accessibility'),
  },
  {
    path: '/en/visit/school-visit',
    h1: 'School visits at Zayed National Museum',
    img: 'znm-r3/new-prod/school-visitm.jpg',
    intro: ['At Zayed National Museum, we are committed to inspiring young minds through discovery and learning. Specially designed student tours offer engaging, age-appropriate experiences that bring the story of the United Arab Emirates to life.'],
    ...c('/en/learn/school-programmes', '/en/visit', '/en/visit/accessibility'),
  },
  {
    path: '/en/visit/accessibility',
    h1: 'Accessibility',
    img: 'znm-r3/visit/visit-access-(1).jpg',
    intro: ['Zayed National Museum is committed to creating an inclusive and welcoming environment for all. As the national museum of the United Arab Emirates, we offer accessible facilities and services to ensure that every visitor feels supported and valued.'],
    ...c('/en/learn/access-programmes', '/en/visit', '/en/visit/school-visit'),
  },
  {
    path: '/en/explore',
    h1: 'Preview our galleries and collection',
    img: 'znm-r2/explore/galleries/1x1/to-our-roots-v2-1x1.png',
    intro: ['The museum takes visitors on a journey through the dynamic history of the UAE, its people and its Founding Father, the late Sheikh Zayed bin Sultan Al Nahyan through six permanent galleries, one temporary exhibition space and one outdoor gallery.'],
    ...c('/en/explore/galleries', '/en/explore/collection', '/en/explore/donate'),
  },
  {
    path: '/en/explore/galleries',
    h1: 'Our Galleries',
    img: 'znm-r3/final-asset/hero-image-for-gallery-page---first-image--(1).jpg',
    intro: ['From the UAE’s diverse landscapes to the ancestral wisdom that continues to inform the Emirati identity of today, Zayed National Museum recreates the past in the present day. The museum features six permanent galleries, one temporary exhibition space and one outdoor gallery.'],
    ...c('/en/explore/collection', '/en/explore/donate', '/en/explore'),
  },
  {
    path: '/en/explore/collection',
    h1: 'Our Collection',
    img: 'znm-r2/explore/galleries/9x16/through-our-connections-v2-9x16.png',
    intro: ['Behind every object is a story.'],
    ...c('/en/explore/galleries', '/en/explore/donate', '/en/explore'),
  },
  {
    path: '/en/explore/donate',
    h1: 'Donate an object',
    img: 'znm-r2/explore/donate/9x16/banner-v2-9x16.png',
    intro: ['Are you passionate about preserving the UAE’s cultural heritage? Do you have an important object or artwork? Donating an object to the Zayed National Museum collection is a great way to contribute to our national story and ensure the item is preserved for the future.'],
    ...c('/en/explore/collection', '/en/explore/galleries', '/en/explore'),
  },
  {
    path: '/en/experiences',
    h1: 'Experiences',
    intro: ['To further enrich your experience, book your events, exhibitions and tours prior to your museum visit.'],
    ...c('/en/event-calender', '/en/visit', '/en/explore'),
  },
  {
    path: '/en/event-calender',
    h1: 'Events, Exhibitions and Tours',
    intro: ['Should you prefer a more exclusive experience, our private tours can be reserved directly by calling +971 600 565 566.'],
    ...c('/en/experiences', '/en/learn/public-programmes', '/en/visit'),
  },
  {
    path: '/en/learn',
    h1: 'Our programmes',
    img: 'znm-r3/learn/dsc01477-(1).jpg',
    intro: [
      'The Founding Father, the late Sheikh Zayed bin Sultan Al Nahyan was a passionate advocate of education. He believed learning from the past was fundamental to making the best of the present and future.',
      'Our programmes are created to inspire learners of all ages.',
    ],
    ...c('/en/learn/public-programmes', '/en/learn/school-programmes', '/en/learn/access-programmes'),
  },
  {
    path: '/en/learn/public-programmes',
    h1: 'Museum tours, workshops, and public events',
    img: 'znm-r3/final-asset/dbst-znm-1405.jpg',
    intro: ['At Zayed National Museum, our programmes are designed to bring families, friends, individuals and the community together through meaningful cultural experiences. They provide opportunities to connect, spark curiosity and celebrate the rich history and culture of the United Arab Emirates.'],
    ...c('/en/learn/school-programmes', '/en/learn/access-programmes', '/en/learn'),
  },
  {
    path: '/en/learn/school-programmes',
    h1: 'Inspiring young learners',
    img: 'znm-r3/learn/school-programme/school-program-hero-banner.jpg',
    intro: ['Our on-site learning programmes offer students and teachers a unique opportunity to explore the museum’s inspiring exhibitions and interactive learning spaces.'],
    ...c('/en/visit/school-visit', '/en/learn/public-programmes', '/en/learn/access-programmes'),
  },
  {
    path: '/en/learn/access-programmes',
    h1: 'Access programmes designed for everyone',
    img: 'znm-r3/learn/access-programme/access-program-hero-banner.jpg',
    intro: ['Zayed National Museum is designed to be welcoming and accessible to everyone, regardless of age, background, or access needs. Our programmes aim to remove barriers and create meaningful experiences for all visitors.'],
    ...c('/en/visit/accessibility', '/en/learn/public-programmes', '/en/learn/school-programmes'),
  },
  {
    path: '/en/research',
    h1: 'Research at Zayed National Museum',
    img: 'znm-r2/research/16x9/banner-v2-frei_08532-16x9.png',
    intro: ['Zayed National Museum is a world-class research institution, beginning with its Magan Boat project in partnership with Zayed University and New York University Abu Dhabi.'],
    ...c('/en/research/research-fund', '/en/learn', '/en/about'),
  },
  {
    path: '/en/research/research-fund',
    h1: 'Zayed National Museum Research Fund',
    img: 'znm-r3/new-prod/research-fund.jpg',
    intro: [
      'Building on its mission to preserve and showcase the legacy of the late Sheikh Zayed bin Sultan Al Nahyan’s life and achievements, as well as the culture and history of the United Arab Emirates, the Museum’s Research Fund supports qualified researchers and scholars.',
      'Launched in 2023, grants from the AED 1 million fund are awarded by a panel of experts based on criteria including research methodology, experience, outcomes and relevance to the museum’s mandate.',
    ],
    ...c('/en/research', '/en/learn', '/en/about'),
  },
  {
    path: '/en/get-involved',
    h1: 'Get involved',
    img: 'znm-r3/new-prod/mob-en.jpg',
    intro: ['Zayed National Museum invites you to be part of its story through a range of meaningful opportunities. Support the museum through partnership opportunities. Volunteer your time and skills with us, and if you are seeking a career explore opportunities with us.'],
    ...c('/en/get-involved/membership', '/en/get-involved/partnership', '/en/get-involved/patrons-programme', '/en/volunteer', '/en/join-our-team'),
  },
  {
    path: '/en/get-involved/membership',
    h1: 'Become a member',
    img: 'znm-r3/get-involved/750-x-1000.jpg',
    intro: ['Join Zayed National Museum’s membership programme and connect more deeply with the history and culture of the United Arab Emirates. Members enjoy unlimited access to the museum’s galleries and special exhibitions, priority booking and discounts on public programmes and learning activities.'],
    ...c('/en/get-involved/partnership', '/en/get-involved/patrons-programme', '/en/get-involved'),
  },
  {
    path: '/en/get-involved/partnership',
    h1: 'Become a partner',
    img: 'znm-r3/new-prod/partnershipm.jpg',
    intro: ['Zayed National Museum invites corporations, institutions and individuals to collaborate in building a lasting cultural legacy.'],
    form: {
      title: 'Partnership enquiry',
      fields: [['Organisation', 'text'], ['Contact name', 'text'], ['Email address', 'email'], ['Message', 'textarea']],
    },
    ...c('/en/get-involved/membership', '/en/get-involved/patrons-programme', '/en/get-involved'),
  },
  {
    path: '/en/get-involved/patrons-programme',
    h1: 'Patrons Programme',
    img: 'znm-r3/get-involved/335x335_falcon.png',
    intro: ['Zayed National Museum’s Patrons Programme brings together dedicated philanthropists, cultural advocates and influential community figures who believe in the museum’s mission to celebrate the heritage of the United Arab Emirates and advance its cultural future.'],
    ...c('/en/get-involved/membership', '/en/get-involved/partnership', '/en/get-involved'),
  },
  {
    path: '/en/volunteer',
    h1: 'Volunteer',
    img: 'znm-r2/volunteer/9x16/banner-9x16.png',
    intro: ['Zayed National Museum welcomes volunteers aged 16 and above from all backgrounds who share our enthusiasm for history and heritage. Our volunteers support almost every aspect of the visitor experience, assisting with research and helping deliver educational and public programmes, workshops and exhibitions.'],
    form: {
      title: 'Sign up today to be a Zayed National Museum volunteer',
      fields: [['First name', 'text'], ['Last name', 'text'], ['Email address', 'email'], ['Mobile number', 'tel'], ['Tell us why you would like to volunteer', 'textarea']],
    },
    ...c('/en/join-our-team', '/en/get-involved/membership', '/en/get-involved'),
  },
  {
    path: '/en/join-our-team',
    h1: 'Join our team',
    img: 'znm-r3/new-prod/znm2190-1-2.jpg',
    intro: ['Zayed National Museum is part of the Department of Culture and Tourism - Abu Dhabi, whose mission is to create a diverse ecosystem that preserves, promotes and embodies the emirate’s heritage. We are looking for the best and brightest talents to join our team.'],
    ...c('/en/volunteer', '/en/get-involved', '/en/about'),
  },
];
