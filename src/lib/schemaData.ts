// export const organizationSchema = {
//     name: 'CampGear Indonesia',
//     url: 'https://campgear.id',
//     logo: 'https://campgear.id/images/logo.png',
//     contactPoint: {
//       '@type': 'ContactPoint',
//       telephone: '+6281234567890',
//       contactType: 'customer service',
//       areaServed: 'ID',
//       availableLanguage: ['Indonesian', 'English'],
//     },
//     sameAs: [
//       'https://www.facebook.com/campgearid',
//       'https://www.instagram.com/campgearid',
//       'https://twitter.com/campgearid',
//     ],
//   };
  
//   export const localBusinessSchema = {
//     name: 'CampGear Indonesia',
//     image: 'https://campgear.id/images/store.jpg',
//     '@id': 'https://campgear.id',
//     url: 'https://campgear.id',
//     telephone: '+6281234567890',
//     priceRange: '$$',
//     address: {
//       '@type': 'PostalAddress',
//       streetAddress: 'Jl. Outdoor No. 123',
//       addressLocality: 'Jakarta',
//       postalCode: '12345',
//       addressCountry: 'ID',
//     },
//     geo: {
//       '@type': 'GeoCoordinates',
//       latitude: -6.2087634,
//       longitude: 106.845599,
//     },
//     openingHoursSpecification: [
//       {
//         '@type': 'OpeningHoursSpecification',
//         dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//         opens: '09:00',
//         closes: '18:00',
//       },
//       {
//         '@type': 'OpeningHoursSpecification',
//         dayOfWeek: ['Saturday'],
//         opens: '09:00',
//         closes: '15:00',
//       },
//     ],
// };



// export const generateProductSchema = (product: any) => {
//     return {
//       name: product.name,
//       image: product.images[0].src,
//       description: product.description,
//       sku: product.sku,
//       mpn: product.mpn,
//       brand: {
//         '@type': 'Brand',
//         name: product.brand,
//       },
//       offers: {
//         '@type': 'AggregateOffer',
//         priceCurrency: 'IDR',
//         lowPrice: product.rental ? product.rentalPrice : product.sellPrice,
//         highPrice: product.sellPrice,
//         offerCount: product.rental && product.forSale ? 2 : 1,
//         offers: [
//           ...(product.rental ? [{
//             '@type': 'Offer',
//             itemCondition: 'https://schema.org/UsedCondition',
//             availability: product.rentalAvailability ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
//             price: product.rentalPrice,
//             priceCurrency: 'IDR',
//             priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
//             url: `https://campgear.id/rental/${product.slug}`,
//             seller: {
//               '@type': 'Organization',
//               name: 'CampGear Indonesia',
//             },
//             leaseLength: {
//               '@type': 'QuantitativeValue',
//               minValue: 1,
//               maxValue: 30,
//               unitCode: 'DAY',
//             },
//             description: `Sewa ${product.name} mulai dari Rp${product.rentalPrice}/hari`,
//           }] : []),
//           ...(product.forSale ? [{
//             '@type': 'Offer',
//             itemCondition: product.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
//             availability: product.sellAvailability ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
//             price: product.sellPrice,
//             priceCurrency: 'IDR',
//             priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
//             url: `https://campgear.id/shop/${product.slug}`,
//             seller: {
//               '@type': 'Organization',
//               name: 'CampGear Indonesia',
//             },
//             description: `Beli ${product.name} dengan harga Rp${product.sellPrice}`,
//           }] : []),
//         ],
//       },
//       aggregateRating: product.reviews && product.reviews.length > 0 ? {
//         '@type': 'AggregateRating',
//         ratingValue: product.averageRating.toFixed(1),
//         reviewCount: product.reviews.length,
//       } : undefined,
//       review: product.reviews && product.reviews.length > 0 ? 
//         product.reviews.map((review: any) => ({
//           '@type': 'Review',
//           reviewRating: {
//             '@type': 'Rating',
//             ratingValue: review.rating,
//             bestRating: 5,
//           },
//           author: {
//             '@type': 'Person',
//             name: review.author,
//           },
//           datePublished: review.date,
//           reviewBody: review.content,
//         })) : undefined,
//       category: product.categories.join(', '),
//       material: product.materials ? product.materials.join(', ') : undefined,
//       weight: product.weight ? {
//         '@type': 'QuantitativeValue',
//         value: product.weight.value,
//         unitCode: product.weight.unit,
//       } : undefined,
//       height: product.dimensions ? {
//         '@type': 'QuantitativeValue',
//         value: product.dimensions.height,
//         unitCode: 'CMT',
//       } : undefined,
//       width: product.dimensions ? {
//         '@type': 'QuantitativeValue',
//         value: product.dimensions.width,
//         unitCode: 'CMT',
//       } : undefined,
//       depth: product.dimensions ? {
//         '@type': 'QuantitativeValue',
//         value: product.dimensions.depth,
//         unitCode: 'CMT',
//       } : undefined,
//       additionalProperty: [
//         ...(product.waterproof ? [{
//           '@type': 'PropertyValue',
//           name: 'Waterproof',
//           value: `${product.waterproof} mm`,
//         }] : []),
//         ...(product.capacity ? [{
//           '@type': 'PropertyValue',
//           name: 'Capacity',
//           value: `${product.capacity} L`,
//         }] : []),
//         ...(product.color ? [{
//           '@type': 'PropertyValue',
//           name: 'Color',
//           value: product.color,
//         }] : []),
//         ...(product.features ? product.features.map((feature: string) => ({
//           '@type': 'PropertyValue',
//           name: 'Feature',
//           value: feature,
//         })) : []),
//       ],
//     };
//   };
  
//   // Example item list schema for category pages
//   export const generateItemListSchema = (products: any[], category: string) => {
//     return {
//       '@type': 'ItemList',
//       name: `${category} - CampGear Indonesia`,
//       description: `Daftar peralatan camping kategori ${category} untuk sewa dan jual`,
//       numberOfItems: products.length,
//       itemListElement: products.map((product, index) => ({
//         '@type': 'ListItem',
//         position: index + 1,
//         item: {
//           '@type': 'Product',
//           name: product.name,
//           url: product.rental && !product.forSale 
//             ? `https://campgear.id/rental/${product.slug}`
//             : `https://campgear.id/shop/${product.slug}`,
//           image: product.images[0].src,
//           description: product.shortDescription,
//           offers: {
//             '@type': 'AggregateOffer',
//             priceCurrency: 'IDR',
//             lowPrice: product.rental ? product.rentalPrice : product.sellPrice,
//             highPrice: product.sellPrice,
//             offerCount: product.rental && product.forSale ? 2 : 1,
//           },
//         },
//       })),
//     };
//   };