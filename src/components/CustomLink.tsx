'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const CustomLink = ({ href, label }: { href: string, label: string }) => {
    const pathname = usePathname();
    const normalizedPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');

    const isActive = normalizedPath === (href === '/' ? '' : href);

  return (
    <Link href={href} className={`relative text-gray-200 ${isActive ? 'text-blue-500' : ''}`}>
        <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors rounded-full hover:bg-neutral-800/60 ${
          isActive ? "bg-neutral-800/60" : ""
        } justify-start px-8 py-3`}
      >
      {label}
    </div>
    </Link>
  )
}

export default CustomLink;