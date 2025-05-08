"use client"

import { MessageSquareCodeIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function FooterFiveColsLogoSubFooter() {
    const params = useParams();
    const locale = params.locales as string;
    return (
      <footer className="w-full text-neutral-400">
        {/* Main footer */}
        <div className="pt-16 pb-12 text-sm border-t border-neutral-800 bg-neutral-950">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col justify-between lg:flex-row gap-12">
              {/* Logo and description */}
              <div className="flex-1 max-w-md">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquareCodeIcon className="w-10 h-10 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2" />
                  <h1 className="text-2xl text-white font-bold">Logo</h1>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
              </div>

              {/* Navigation links */}
              <div className="flex flex-wrap justify-between gap-8 lg:gap-12">
                <nav className="min-w-[160px]" aria-labelledby="footer-product-5-logo">
                  <h3 className="mb-6 text-base font-semibold text-neutral-200" id="footer-product-5-logo">
                    Services
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Customers
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Why us?
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Pricing
                      </a>
                    </li>
                  </ul>
                </nav>

                <nav className="min-w-[160px]" aria-labelledby="footer-about-5-logo">
                  <h3 className="mb-6 text-base font-semibold text-neutral-200" id="footer-about-5-logo">
                    About us
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Leadership
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Blog
                      </a>
                    </li>
                  </ul>
                </nav>

                <nav className="min-w-[160px]" aria-labelledby="footer-get-in-touch-5-logo">
                  <h3 className="mb-6 text-base font-bold text-neutral-200" id="footer-get-in-touch-5-logo">
                    Contact
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Support
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                        Partners
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="py-4 text-sm border-t border-neutral-800 bg-neutral-950">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                © {new Date().getFullYear()} Brand. {locale === 'en' ? 'All rights reserved' : 'Tous droits réservés'}
              </div>
              <nav aria-labelledby="subfooter-links-3-sub">
                <h3 className="sr-only" id="subfooter-links-3-sub">Get in touch</h3>
                <ul className="flex items-center gap-4">
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      T&C
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" className="transition-colors duration-300 hover:text-neutral-50 focus:text-neutral-50">
                      Cookies
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    )
  }