"use client";

import { motion } from "framer-motion";

interface TeamMemberMiniProps {
  name: string;
  role: string;
  description: string;
  index: number;
}

export default function TeamMemberMini({ name, role, description, index }: TeamMemberMiniProps) {
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
      className="flex flex-col gap-3 p-6 bg-neutral-900/50 border border-neutral-800 rounded-4xl hover:border-neutral-700 transition-colors duration-300"
    >
      <div>
        <h3 className="text-lg font-bold text-white">
          {name}
        </h3>
        <p className="text-neutral-400 text-xs leading-relaxed">
          {role}
        </p>
      </div>
      <p className="text-neutral-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
