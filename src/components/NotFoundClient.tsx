"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { NotFoundTranslations } from "@/types/translations";

interface NotFoundClientProps {
  notFound: NotFoundTranslations;
  locale: 'fr' | 'en' | 'de';
}

export default function NotFoundClient({ notFound, locale }: NotFoundClientProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-8xl md:text-9xl font-bold text-white mb-6"
        >
          404
        </motion.h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {notFound.title}
        </h2>
        <p className="text-lg text-neutral-400 mb-12 leading-relaxed">
          {notFound.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}`}>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-neutral-200 font-semibold px-8"
            >
              {notFound.homeButton}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-8"
            >
              {notFound.aboutButton}
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
