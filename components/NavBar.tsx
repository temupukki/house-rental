"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
};
const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Property",
    href: "/property",
  },
  {
    label: "About us",
    href: "/about",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
];
export default function NavBar() {
  return (
    <div className="bg-white">
      <nav className="flex gap-140 pl-30 pt-3">
        <Link href="/">
          <motion.img
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            src="/logo.png"
            alt=" logo"
            className="w-27 h-23"
          />
        </Link>

        <div
          className={`text-black font-medium flex justify-center gap-8 pt-9 text-xl ${exo2.className}`}
        >
          {navItems.map((items) => (
            <motion.div
              key={items.href}
              whileHover={{ scale: 1.13 }}
              whileTap={{ scale: 0.99 }}
            >
              <Link href={items.href}>{items.label}</Link>
            </motion.div>
          ))}
        </div>
      </nav>
    </div>
  );
}
