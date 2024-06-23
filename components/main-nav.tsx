"use client";

import { siteConfig } from "@/config/site";
import Logo from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image src={Logo} alt="logo" className="h-6 w-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
    </nav>
  );
}
