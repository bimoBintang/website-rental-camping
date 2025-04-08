"use client"

import { motion } from "motion/react";

export default function CtaSection() {
    return (
        <section className="py-20 bg-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Siap Untuk Petualangan Berikutnya?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl mb-8"
            >
              Dapatkan peralatan kemping terbaik untuk pengalaman outdoor yang tak terlupakan
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>  window.open("https://wa.me/6281210347782?text=Hi,%20saya%20tertarik%20dengan%20layanan%20anda!", "_blank")}
              className="bg-white text-emerald-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all"
            >
              Pesan Sekarang
            </motion.button>
          </div>
        </div>
      </section>
    )
}