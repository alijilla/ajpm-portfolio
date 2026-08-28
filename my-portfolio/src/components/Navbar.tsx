"use client";
import { useState } from "react";
import { Bars3Icon, } from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  name: string;
}

function Navbar({ name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navlist = [
  {tabname:"about", tabhref:"#about"},
  {tabname:"experience", tabhref:"#experience"},
  {tabname:"projects", tabhref:"#projects"},
  {tabname:"contact", tabhref:"#contact"},
  ]
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      {/* Desktop nav */}
      <nav id="navbar" className="hidden md:flex items-center justify-between max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <span className="font-bold lowercase">{name}</span>
        <ul className="flex flex-row gap-6 text-sm text-muted-foreground">
          {navlist.map((item) => (
            <li key={item.tabname}>
              <a
                href={item.tabhref}
                className="hover:text-foreground transition-colors duration-200"
              >
                {item.tabname}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden flex flex-row justify-between items-center max-w-5xl mx-auto px-4 py-4">
        <span className="font-bold lowercase">{name}</span>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger aria-label="Open navigation menu">
            <Bars3Icon className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="top" className="flex items-center justify-center py-8">
            <ul className="flex flex-col gap-6 text-center text-lg">
              {navlist.map((item) => (
                <li key={item.tabname}>
                  <a
                    onClick={() => { setIsOpen(false); }}
                    href={item.tabhref}
                    className="hover:text-foreground transition-colors duration-200"
                  >
                    {item.tabname}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;