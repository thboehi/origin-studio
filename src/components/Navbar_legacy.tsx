"use client";

import Image from "next/image";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/button";
import { MobileNavbar } from "./Mobile-Navbar";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dictionary } from "@/types/dictionary";

export const Navbar = ({ params }: { params: { locales: "fr" | "en" | "de" } }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({ 
    opacity: 0, 
    transform: 'translateX(0px)', 
    width: '0px'
  });
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  
  const navItems: { href: string; key: keyof Dictionary["nav"] }[] = [
    { href: "/", key: "home" },
    { href: "/prestations", key: "prestations" },
    { href: "/about", key: "about" },
    { href: "/projects", key: "projects" },
    { href: "/contact", key: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(params.locales);
      setDictionary(dict);
    };
    loadDictionary();
  }, [params.locales]);

  const normalizedPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');
  
  const updateBackgroundPosition = useCallback((element: HTMLElement | null, show: boolean = true) => {
    if (!element || !navRef.current) {
      setBackgroundStyle({ 
        opacity: 0, 
        transform: 'translateX(0px)', 
        width: '0px'
      });
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const offsetX = elementRect.left - navRect.left;
    
    setBackgroundStyle({
      opacity: show ? 1 : 0,
      transform: `translateX(${offsetX}px)`,
      width: `${elementRect.width}px`
    });
  }, []);

  const handleMouseEnter = useCallback((href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    // Annuler le timeout si on survole un nouvel élément
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsHovering(true);
    updateBackgroundPosition(event.currentTarget);
  }, [updateBackgroundPosition]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    
    // Délai de 1 seconde avant de revenir à la position initiale
    timeoutRef.current = setTimeout(() => {
      const activeHref = navItems.find(item => 
        normalizedPath === (item.href === '/' ? '' : item.href)
      )?.href;
      
      const activeElement = navRef.current?.querySelector(`[data-href="${activeHref || '/'}"]`) as HTMLElement;
      if (activeHref && activeElement) {
        updateBackgroundPosition(activeElement);
      } else {
        setBackgroundStyle(prev => ({ 
          ...prev, 
          opacity: 0
        }));
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedPath]);

  useEffect(() => {
    // Positionner le fond sur l'élément actif au chargement
    if (!dictionary) return;
    
    const activeHref = navItems.find(item => 
      normalizedPath === (item.href === '/' ? '' : item.href)
    )?.href;
    
    if (activeHref && navRef.current) {
      const activeElement = navRef.current.querySelector(`[data-href="${activeHref}"]`) as HTMLElement;
      if (activeElement) {
        updateBackgroundPosition(activeElement);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionary, normalizedPath]);

  // Nettoyer le timeout au démontage
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!dictionary) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 xl:px-16 transition-colors duration-300 ${
        isScrolled || isToggleOpen ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-center gap-4">
        <Image src="/img/logo_origin.svg" alt="Logo" width={40} height={40} className="w-10 h-10 md:hidden" />
        <Image src="/img/logo_origin_full.svg" alt="Logo" width={100} height={40} className="hidden w-30 h-auto md:block" />
      </div>

      {/* Desktop navigation */}
      <nav ref={navRef} className="hidden xl:flex items-center gap-4 relative">
        {/* Fond mobile */}
        <div 
          className={`absolute top-0 left-0 h-full rounded-full pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.34,1.36,0.44,1)] ${
            isHovering ? 'bg-white/20' : 'bg-white/10'
          }`}
          style={{
            opacity: backgroundStyle.opacity,
            transform: backgroundStyle.transform,
            width: backgroundStyle.width
          }}
        />
        
        {navItems.map((item) => {
          const isActive = normalizedPath === (item.href === '/' ? '' : item.href);
          const localizedHref = item.href === '/' ? `/${params.locales}` : `/${params.locales}${item.href}`;
          
          return (
            <Link
              key={item.href}
              href={localizedHref}
              data-href={item.href}
              className={`relative z-10 text-gray-200 transition-colors duration-200 ${
                isActive ? 'text-blue-500' : 'hover:text-white'
              }`}
              onMouseEnter={(e) => handleMouseEnter(item.href, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-4 py-2 cursor-pointer">
                {dictionary?.nav?.[item.key]}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button variant="secondary" className="hidden md:flex">
          <span className="text-md font-medium">
            {dictionary.nav.contactUs}
          </span>
        </Button>
        {/* Mobile Drawer Trigger */}
        <MobileNavbar 
          dictionary={dictionary} 
          isToggleOpen={isToggleOpen}
          setIsToggleOpen={setIsToggleOpen}
        />
      </div>
    </div>
  );
};
