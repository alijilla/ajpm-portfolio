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
  {tabname:"about", tabhref:"#about", style:"hover:text-secondary-foreground"},
  {tabname:"experience",tabhref:"#experience", style:"hover:text-secondary-foreground"},
  {tabname:"project", tabhref:"#project", style:"hover:text-secondary-foreground"},
  {tabname:"contact", tabhref:"#contact", style:"hover:text-muted-foreground text-foreground font-extrabold underline"},
  ]
  return (
    <div>
      <nav id="navbar" className="hidden md:block shadow-md outline outline-black/3 rounded-md m-auto p-8">
        
        
          <ul className="flex flex-row items-center place-content-between gap-4 align-item ">
         <p className="font-bold lowercase">{name}</p>
          <div className="flex flex-row text-gray-600  gap-4 md:gap-8">
          {navlist.map((item, index) => (
            <li key={index} className="">
              <a href={item.tabhref} className={item.style}>{item.tabname}</a>
          </li>
          ))}
          </div>
        </ul>
       
        
      </nav>

      <div className="md:hidden flex flex-row justify-between items-center shadow-md outline outline-black/3 rounded-md m-auto p-8">
        <p className="font-bold lowercase">{name}</p>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            
          >
            <Bars3Icon className="h-5 w-5 inline mr-2" />
          </SheetTrigger>
          <SheetContent side="top" className="flex items-center justify-center">
          <ul>
          {navlist.map((item, index) => (
            <li key={index} className="">
              <a onClick={() => {setIsOpen(false);}} href={item.tabhref} className={item.style}>{item.tabname}</a>
          </li>
          ))}
          </ul>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navbar;