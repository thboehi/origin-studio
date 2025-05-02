import Image from 'next/image'
import { getDictionary } from '@/lib/i18n/get-dictionnary'
import { LanguageSwitcher } from './LanguageSwitcher'
import CustomLink from './CustomLink'
import { Button } from './ui/button'
import { MobileNavbar } from './Mobile-Navbar';

export const Navbar = async ({ params }: { params: { locales: 'fr' | 'en' } }) => {
  const { locales } = await Promise.resolve(params);
  const dictionary = await getDictionary(locales);

  return (
    <div className=" flex justify-between items-center py-4 px-4 xl:px-16 bg-zinc-950">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <h1 className="text-2xl text-white font-bold">Logo</h1>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden xl:flex items-center gap-4">
        <CustomLink href="/" label={dictionary.home} />
        <CustomLink href='/prestations' label={dictionary.prestations} />
        <CustomLink href="/about" label={dictionary.about} />
        <CustomLink href="/projects" label={dictionary.projects} />
        <CustomLink href="/contact" label="Contact" />
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button variant="secondary" className="bg-white text-white">
          <span className="text-sm  font-medium">
            {dictionary['contact-us']}
          </span>
        </Button>
        {/* Mobile Drawer Trigger */}
        <MobileNavbar dictionary={dictionary} />
      </div>
    </div>
  )
}

