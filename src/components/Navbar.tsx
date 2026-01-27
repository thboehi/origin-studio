"use client";

import Image from "next/image";
import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavbar } from "./Mobile-Navbar";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Dictionary } from "@/types/dictionary";

export const Navbar = ({ params }: { params: { locales: "fr" | "en" | "de" } }) => {
  const [showNavbar, setShowNavbar] = useState(true); // Visible au départ
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
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
      const currentScrollY = window.scrollY;
      
      // Détecter si on a scrollé
      setHasScrolled(currentScrollY > 50);
      
      // Si on a scrollé plus de 100px vers le bas depuis le haut
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // On descend, cacher la navbar
        if (showNavbar) {
          setShowNavbar(false);
        }
      } else if (currentScrollY < lastScrollY) {
        // On remonte, afficher la navbar
        if (!showNavbar) {
          setShowNavbar(true);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 700);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Si la souris est dans les 100px du haut
      if (e.clientY < 100 && !showNavbar) {
        setShowNavbar(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showNavbar, lastScrollY]);

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
    <>
      {/* Mobile navbar - always visible at top */}
      <div className={`xl:hidden fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 transition-all duration-300 ${
        isToggleOpen 
          ? 'bg-black' 
          : hasScrolled 
            ? 'bg-black/40 backdrop-blur-xl' 
            : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-4">
          <Image src="/img/logo_origin.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <MobileNavbar 
            dictionary={dictionary} 
            isToggleOpen={isToggleOpen}
            setIsToggleOpen={setIsToggleOpen}
          />
        </div>
      </div>

      {/* Desktop floating pill navbar */}
      <div
        className={`hidden xl:block fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.36,0.44,1)] ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'
        }`}
      >
        <div className={`backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-2xl transition-colors duration-700 ${
          !showNavbar || isAnimating ? 'bg-black' : 'bg-black/40'
        }`}>
          <nav ref={navRef} className="flex items-center gap-2 relative">
            {/* Fond mobile pour hover */}
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
                  className={`relative z-10 text-sm transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  onMouseEnter={(e) => handleMouseEnter(item.href, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-2 cursor-pointer whitespace-nowrap">
                    {dictionary?.nav?.[item.key]}
                  </div>
                </Link>
              );
            })}

            {/* Separator */}
            <div className="h-6 w-px bg-white/20 mx-2" />

            {/* Language Switcher */}
            <div className="relative z-10">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
