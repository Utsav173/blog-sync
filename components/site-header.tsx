import { MainNav } from './main-nav';
import { ModeToggle } from './mode-toggle';
// import { Icons } from "./icons";
// import { siteConfig } from "@/config/site";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { buttonVariants } from "./ui/button";
// import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
