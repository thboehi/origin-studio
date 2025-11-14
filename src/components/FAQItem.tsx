"use client";

import { motion } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-neutral-950 border border-neutral-800 rounded-4xl p-8 hover:border-neutral-600 transition-colors"
    >
      <h3 className="text-lg font-semibold text-white mb-3">{question}</h3>
      <p className="text-neutral-400 leading-relaxed">{answer}</p>
    </motion.div>
  );
}
