// "use client"

// import { motion } from "motion/react";
// import Testimonial from "./Testimonial";



// export default function TestimonialSection() {
//     const testimonials = [
//         {
//           id: 1,
//           name: "Budi Santoso",
//           text: "Saya sangat puas dengan layanan sewa peralatan kemping ini. Semua peralatan dalam kondisi baik dan proses penyewaan sangat mudah!",
//           role: "Pendaki Gunung",
//           avatar: "/images/avatar1.jpg"
//         },
//         {
//           id: 2,
//           name: "Dewi Lestari",
//           text: "Peralatan berkualitas tinggi dengan harga sewa yang terjangkau. Sangat direkomendasikan untuk pemula yang ingin mencoba kemping!",
//           role: "Traveler",
//           avatar: "/images/avatar2.jpg"
//         },
//         {
//           id: 3,
//           name: "Rizki Pratama",
//           text: "Sudah berkali-kali menyewa di sini dan tidak pernah mengecewakan. Stafnya juga sangat membantu memberikan tips kemping.",
//           role: "Backpacker",
//           avatar: "/images/avatar3.jpg"
//         }
//       ];
//     return (
//         <section className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Apa Kata Pelanggan Kami
//             </h2>
//             <div className="w-16 h-1 bg-emerald-600 mx-auto"></div>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial) => (
//               <Testimonial key={testimonial.id} testimonials={[testimonial]} />
//             ))}
//           </div>
//         </div>
//       </section>
//     )
// }