"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Exo_2 } from "next/font/google";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Loader2,
  Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

type NavItem = {
  label: string;
  href: string;
  submenu?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Properties",
    href: "/dashboard/properties",
  },
  {
    label: "About",
    href: "/dashboard/#about",
  },
  {
    label: "Contact",
    href: "/dashboard/#contact",
  },
];

const { data: session, error } = await authClient.getSession();

export default function DashNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(session?.user?.name || "User");
  }, []);
  const userNamel = userName.charAt(0);
  const handleSignout = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onRequest: (ctx) => {
          const toastID = toast.loading("Creating out...");
          toast.dismiss(toastID);
        },
        onSuccess: () => {
          setLoading(false);
          route.push("/");
        },
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -inset-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
              <img
                src="/logo.png"
                alt="ValLiving Logo"
                className="relative w-12 h-12 object-contain"
              />
            </motion.div>
            <div>
              <h1 className={`${exo2.className} text-2xl font-bold`}>
                <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Val
                </span>
                <span className="text-gray-900">Living</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Premium Real Estate
              </p>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.submenu && setActiveSubmenu(item.label)
                }
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                      activeSubmenu === item.label
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </motion.div>
                </Link>
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 py-2"
                    >
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                          >
                            {subItem.label}
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/dashboard/post">
              <motion.p
                animate={{ scale: [1, 1.06, 1.0] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                 whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.6 }}
                className={`${exo2.className} text-xl font-meduim mr-7 flex flex-row`}
              >
                <Hotel className="mr-2" />
                Make me host!
              </motion.p>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard/profile">
                <button className="uppercase font-medium text-[18px] bg-amber-950 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 px-6 py-4 rounded-full  ">
                  {userNamel}
                </button>
              </Link>
            </motion.div>
            {/*  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSignout}
                disabled={loading}
                className="bg-primary text-white shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </>
                )}
              </Button>
            </motion.div> */}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.href} className="space-y-1">
                  <Link href={item.href}>
                    <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.submenu && <ChevronDown className="h-4 w-4" />}
                    </div>
                  </Link>

                  {item.submenu && (
                    <div className="ml-8 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.href} href={subItem.href}>
                          <div className="px-4 py-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                            {subItem.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full py-6 flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Button>
                <Button className="w-full py-6 bg-linear-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="h-1 bg-linear-to-r from-blue-500 to-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}
