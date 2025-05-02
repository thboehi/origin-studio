// Middleware pour gérer la redirection et le routage de l'application
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des locales supportées
const locales = ['fr', 'en'];

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
  
  // Si on est à la racine, on redirige vers le français
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  // Vérifie si le chemin commence déjà par une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirige vers la locale préférée
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|img|fonts).*)',
  ],
};