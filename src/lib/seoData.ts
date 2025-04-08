import { SEOData } from '../types/seo';

// Common SEO data across all pages
export const defaultSEO: SEOData = {
  title: 'CampGear - Penyewaan & Penjualan Peralatan Camping Terbaik',
  description: 'Sewa atau beli peralatan camping berkualitas tinggi untuk petualangan alam terbuka Anda. Tenda, sleeping bag, kompor portable, dan perlengkapan camping lainnya dengan harga terjangkau.',
  openGraph: {
    title: 'CampGear - Penyewaan & Penjualan Peralatan Camping',
    description: 'Sewa atau beli peralatan camping berkualitas tinggi untuk petualangan alam terbuka Anda.',
    url: 'https://campgear.id',
    type: 'website',
    images: [
      {
        url: 'https://campgear.id/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CampGear - Peralatan Camping Terbaik',
      },
    ],
    site_name: 'CampGear Indonesia',
  },
  twitter: {
    cardType: 'summary_large_image',
    handle: '@campgearid',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'sewa tenda, jual sleeping bag, peralatan camping, perlengkapan outdoor, rental camping, tenda dome, kompor portable, tas carrier, headlamp camping',
    },
    {
      name: 'geo.region',
      content: 'ID',
    },
    {
      name: 'geo.placename',
      content: 'Indonesia',
    },
  ],
};


// Page-specific SEO data
export const pageSEOData: Record<string, SEOData> = {
    home: {
      ...defaultSEO,
    },
    rental: {
      ...defaultSEO,
      title: 'Sewa Peralatan Camping | CampGear Indonesia',
      description: 'Sewa berbagai peralatan camping berkualitas dengan harga terjangkau. Tenda, sleeping bag, kompor camping, lampu, dan perlengkapan lainnya tersedia untuk petualangan Anda.',
      openGraph: {
        ...defaultSEO.openGraph,
        title: 'Sewa Peralatan Camping | CampGear Indonesia',
        description: 'Sewa berbagai peralatan camping berkualitas dengan harga terjangkau.',
        url: 'https://campgear.id/rental',
        images: [
          {
            url: 'https://campgear.id/images/rental-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Penyewaan Peralatan Camping CampGear',
          },
        ],
      },
      additionalMetaTags: [
        ...defaultSEO.additionalMetaTags,
        {
          name: 'keywords',
          content: 'sewa tenda, sewa sleeping bag, rental peralatan camping, sewa kompor camping, sewa carrier, paket sewa camping',
        },
      ],
    },
    shop: {
      ...defaultSEO,
      title: 'Beli Peralatan Camping | CampGear Indonesia',
      description: 'Jual berbagai peralatan camping berkualitas tinggi untuk kebutuhan outdoor dan petualangan alam. Temukan tenda, sleeping bag, matras, dan perlengkapan camping lainnya.',
      openGraph: {
        ...defaultSEO.openGraph,
        title: 'Beli Peralatan Camping | CampGear Indonesia',
        description: 'Jual berbagai peralatan camping berkualitas tinggi untuk kebutuhan outdoor dan petualangan alam.',
        url: 'https://campgear.id/shop',
        images: [
          {
            url: 'https://campgear.id/images/shop-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Toko Peralatan Camping CampGear',
          },
        ],
      },
      additionalMetaTags: [
        ...defaultSEO.additionalMetaTags,
        {
          name: 'keywords',
          content: 'jual tenda, beli sleeping bag, toko peralatan camping, perlengkapan hiking, beli kompor camping, tenda dome, matras camping',
        },
      ],
    },
    tent: {
      ...defaultSEO,
      title: 'Tenda Camping - Sewa & Jual | CampGear Indonesia',
      description: 'Sewa atau beli berbagai jenis tenda camping berkualitas tinggi. Tersedia tenda dome, tunnel, ultralight, dan family tent untuk kebutuhan camping Anda.',
      openGraph: {
        ...defaultSEO.openGraph,
        title: 'Tenda Camping - Sewa & Jual | CampGear Indonesia',
        description: 'Sewa atau beli berbagai jenis tenda camping berkualitas tinggi.',
        url: 'https://campgear.id/products/tent',
        images: [
          {
            url: 'https://campgear.id/images/tent-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Tenda Camping CampGear',
          },
        ],
      },
      additionalMetaTags: [
        ...defaultSEO.additionalMetaTags,
        {
          name: 'keywords',
          content: 'tenda camping, tenda dome, tenda tunnel, tenda ultralight, family tent, tenda gunung, sewa tenda, jual tenda',
        },
      ],
    },
    sleepingBag: {
      ...defaultSEO,
      title: 'Sleeping Bag - Sewa & Jual | CampGear Indonesia',
      description: 'Sewa atau beli sleeping bag untuk camping, pendakian, dan aktivitas outdoor lainnya. Tersedia berbagai jenis dan merk sleeping bag terbaik dengan harga terjangkau.',
      openGraph: {
        ...defaultSEO.openGraph,
        title: 'Sleeping Bag - Sewa & Jual | CampGear Indonesia',
        description: 'Sewa atau beli sleeping bag untuk camping, pendakian, dan aktivitas outdoor lainnya.',
        url: 'https://campgear.id/products/sleeping-bag',
        images: [
          {
            url: 'https://campgear.id/images/sleeping-bag-og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Sleeping Bag CampGear',
          },
        ],
      },
      additionalMetaTags: [
        ...defaultSEO.additionalMetaTags,
        {
          name: 'keywords',
          content: 'sleeping bag, kantong tidur camping, sleeping bag ultralight, sleeping bag mummy, rectangular sleeping bag, sewa sleeping bag, jual sleeping bag',
        },
      ],
    },
  };