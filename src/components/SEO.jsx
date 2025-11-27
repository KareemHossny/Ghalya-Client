import React, { useEffect } from 'react';

const SEO = ({ 
  title = 'غاليه - أجمل الإسدالات الحريمي',
  description = 'اكتشفوا أجمل تشكيلة الإسدالات الحريمي من غاليه. جودة عالية، أسعار مناسبة، توصيل سريع',
  keywords = 'إسدالات حريمي, ملابس نسائية, موضة, تسوق أونلاين, غاليه',
  canonical = '',
  ogImage = 'https://ghalya.vercel.app/logo.png',
  ogUrl = 'https://ghalya.vercel.app',
  structuredData = null
}) => {
  useEffect(() => {
    // تحديث title
    document.title = title;

    // تحديث أو إضافة meta tags
    const updateMetaTag = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // تحديث description
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', ogImage);
    updatePropertyTag('og:url', ogUrl);
    updatePropertyTag('og:type', 'website');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Canonical URL
    if (canonical) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = 'canonical';
        document.head.appendChild(linkTag);
      }
      linkTag.href = canonical;
    }

    // Structured Data
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Google Site Verification
    let googleVerifyTag = document.querySelector('meta[name="google-site-verification"]');
    if (!googleVerifyTag) {
      googleVerifyTag = document.createElement('meta');
      googleVerifyTag.name = 'google-site-verification';
      googleVerifyTag.content = 'T1U5Tr0Uu43q4_bKa2IFMMYTKgKxsu2J3UrsiTUx7Pg';
      document.head.appendChild(googleVerifyTag);
    }

  }, [title, description, keywords, canonical, ogImage, ogUrl, structuredData]);

  return null; 
};

export default SEO;