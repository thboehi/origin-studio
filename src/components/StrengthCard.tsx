"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StrengthCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

export default function StrengthCard({ title, description, icon, index }: StrengthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col items-center text-center gap-4 p-8 bg-neutral-900/30 border border-neutral-800 rounded-4xl hover:border-neutral-700 transition-colors duration-300"
    >
      <div className="text-white w-12 h-12">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
