// "use client"

// // components/SchemaData.tsx
// import React from 'react';
// import Head from 'next/head';

// interface SchemaOrgProps {
//   type: 'Organization' | 'Product' | 'LocalBusiness' | 'ItemList';
//   data: any;
// }

// const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, data }) => {
//   const schemaData = {
//     '@context': 'https://schema.org',
//     '@type': type,
//     ...data,
//   };

//   return (
//     <Head>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
//       />
//     </Head>
//   );
// };

// export default SchemaOrg;