"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  text: string;
  author?: string;
  company?: string;
  index: number;
}

export default function TestimonialCard({ text, author, company, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="p-8 bg-neutral-900/30 border border-neutral-800 rounded-4xl hover:border-neutral-700 transition-colors duration-300"
    >
      <p className="text-neutral-300 italic leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </p>
      {author && (
        <div className="text-sm">
          <p className="text-white font-medium">{author}</p>
          {company && <p className="text-neutral-500">{company}</p>}
        </div>
      )}
    </motion.div>
  );
}
