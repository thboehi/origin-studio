'use client'

import Image from 'next/image'
import { getDictionary } from '@/lib/i18n/get-dictionnary'
import { LanguageSwitcher } from './LanguageSwitcher'
import CustomLink from './CustomLink'
import { Button } from './ui/button'
import { MobileNavbar } from './Mobile-Navbar'
import { useEffect, useState } from 'react'
import { MessageSquareCodeIcon, MessageSquareIcon } from 'lucide-react'

export const Navbar = ({ params }: { params: { locales: 'fr' | 'en' } }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(params.locales)
      setDictionary(dict)
    }
    loadDictionary()
  }, [params.locales])

  if (!dictionary) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-4 xl:px-16 transition-colors duration-300 ${
      isScrolled ? 'bg-black' : 'bg-black/70'
    }`}>
      <div className="flex items-center justify-center gap-4">
        <MessageSquareCodeIcon className="w-10 h-10 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2" />
        <h1 className="text-2xl text-white font-bold">Logo</h1>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden xl:flex items-center gap-4">
        <CustomLink href="/" label={dictionary.nav.home} />
        <CustomLink href='/prestations' label={dictionary.nav.prestations} />
        <CustomLink href="/about" label={dictionary.nav.about} />
        <CustomLink href="/projects" label={dictionary.nav.projects} />
        <CustomLink href="/contact" label={dictionary.nav.contact} />
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button variant="secondary" className="bg-white text-white">
          <span className="text-sm  font-medium">
            {dictionary.nav.contactUs}
          </span>
        </Button>
        {/* Mobile Drawer Trigger */}
        <MobileNavbar dictionary={dictionary} />
      </div>
    </div>
  )
}

