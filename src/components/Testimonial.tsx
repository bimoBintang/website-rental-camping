// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// interface Testimonial {
//   id: number;
//   name: string;
//   text: string;
//   role: string;
//   avatar: string;
// }

// interface TestimonialProps {
//   testimonials: Testimonial[];
// }

// const Testimonial = ({ testimonials }: TestimonialProps) => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {testimonials.map((testimonial, index) => (
//           <motion.div
//             key={testimonial.id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="bg-white p-6 rounded-xl shadow-lg"
//           >
//             <div className="flex items-center mb-4">
//               <div className="relative w-12 h-12 mr-4">
//                 <Image
//                   src={testimonial.avatar || "/images/placeholder-avatar.jpg"}
//                   alt={testimonial.name}
//                   fill
//                   className="rounded-full object-cover"
//                 />
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
//                 <p className="text-gray-600 text-sm">{testimonial.role}</p>
//               </div>
//             </div>
//             <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
//             <div className="flex text-emerald-500">
//               {[...Array(5)].map((_, i) => (
//                 <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonial;
