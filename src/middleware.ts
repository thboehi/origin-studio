// Middleware pour gérer la redirection et le routage de l'application
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des locales supportées
const locales = ['fr', 'en', 'de'];

// Fonction pour obtenir la locale préférée
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }
  }
  return 'fr'; // Locale par défaut
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Exclure les fichiers statiques (images, etc.)
  if (pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|json|JPG|PNG|JPEG|GIF|WEBP|SVG)$/i)) {
    return;
  }
  
  // Exclure le dossier uploads
  if (pathname.startsWith('/uploads')) {
    return;
  }
  
  // Si on est à la racine, on redirige vers le français
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  // Vérifie si le chemin commence déjà par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Si c'est une page 404, on essaie de deviner la locale depuis le referer ou les headers
  if (pathname === '/404') {
    const referer = request.headers.get('referer');
    let locale = 'fr';
    
    if (referer) {
      const refererLocale = referer.match(/\/(fr|en)(?=\/|$)/)?.[1];
      if (refererLocale && locales.includes(refererLocale)) {
        locale = refererLocale;
      }
    } else {
      locale = getLocale(request);
    }
    
    return NextResponse.redirect(new URL(`/${locale}/404`, request.url));
  }

  // Redirige vers la locale préférée
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|icon.svg|img|fonts).*)',
  ],
};