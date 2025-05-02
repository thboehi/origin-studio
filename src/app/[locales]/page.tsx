import { getDictionary } from "@/lib/i18n/get-dictionnary";
import { HeroSlider } from "@/components/HeroSlider";

export default async function Home({ params }: { params: { locales: 'fr' | 'en' } }) {
  // On attend les paramètres
  const { locales } = await Promise.resolve(params);
  
  // Fonction pour récupérer les traductions en fonction de la locale
  const dictionary = await getDictionary(locales);

  return (
    <div className="flex flex-col items-center h-screen">
      <HeroSlider />
    </div>
  );
}
