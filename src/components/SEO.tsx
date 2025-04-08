"use client"

import Head from 'next/head';
import { useRouter } from 'next/router';
import { SEOData } from '../types/seo';
import React from 'react';

interface SEOProps {
  seoData: SEOData;
}

const SEO: React.FC<SEOProps> = ({ seoData }) => {
  const router = useRouter();
  const canonical = seoData.canonical || `https://campgear.id${router.asPath}`;

  return (
    <Head>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.openGraph.title} />
      <meta property="og:description" content={seoData.openGraph.description} />
      <meta property="og:url" content={seoData.openGraph.url} />
      <meta property="og:type" content={seoData.openGraph.type} />
      <meta property="og:site_name" content={seoData.openGraph.site_name} />
      
      {seoData.openGraph.images.map((image, index) => (
        <React.Fragment key={`og-image-${index}`}>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
          <meta property="og:image:alt" content={image.alt} />
        </React.Fragment>
      ))}
      
      {/* Twitter */}
      {seoData.twitter && (
        <>
          <meta name="twitter:card" content={seoData.twitter.cardType} />
          <meta name="twitter:site" content={seoData.twitter.handle} />
        </>
      )}
      
      {/* Additional Meta Tags */}
      {seoData.additionalMetaTags.map((tag, index) => (
        <meta key={`meta-${index}`} name={tag.name} content={tag.content} />
      ))}
      
      {/* Additional Link Tags */}
      {seoData.additionalLinkTags?.map((tag, index) => (
        <link key={`link-${index}`} rel={tag.rel} href={tag.href} />
      ))}
    </Head>
  );
};

export default SEO;