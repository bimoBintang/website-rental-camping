"use client";

import { motion } from "framer-motion"; // Perbaikan pada import

export default function WorkSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Cara Kerja Layanan Kami
                    </h2>
                    <div className="w-16 h-1 bg-emerald-600 mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8"> 
                    {[
                        { step: 1, title: "Pilih Produk", text: "Pilih peralatan dalam kondisi baik dan proses penyewaan sangat mudah!" },
                        { step: 2, title: "Pilih Tanggal", text: "Pilih tanggal pengambilan dan pengembalian untuk opsi sewa" },
                        { step: 3, title: "Lakukan Pembayaran", text: "Pilih metode pembayaran yang nyaman dan aman untuk Anda" },
                        { step: 4, title: "Terima Peralatan", text: "Dapatkan peralatan kemping tepat waktu dengan layanan kami" }
                    ].map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="text-center p-6 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center"
                        >
                            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
