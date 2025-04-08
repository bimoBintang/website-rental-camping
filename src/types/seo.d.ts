export interface SEOData {
    title: string;
    description: string;
    canonical?: string;
    openGraph: {
      title: string;
      description: string;
      url: string;
      type: string;
      images: {
        url: string;
        width: number;
        height: number;
        alt: string;
      }[];
      site_name: string;
    };
    twitter?: {
      cardType: string;
      handle: string;
    };
    additionalMetaTags: {
      name: string;
      content: string;
    }[];
    additionalLinkTags?: {
      rel: string;
      href: string;
    }[];
  }