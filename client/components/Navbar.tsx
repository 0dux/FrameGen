"use client";

import { useAuth } from "@/app/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Cancel01Icon,
  Coins01Icon,
  Home01Icon,
  Logout01Icon,
  Menu01Icon,
  RecordIcon,
  UserIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, logout, credits } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset mobile menu on route change without useEffect
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home01Icon },
    { name: "Generate", href: "/generate", icon: RecordIcon },
    {
      name: isLoggedIn ? "My Generations" : "Features",
      href: isLoggedIn ? "/my-generations" : "/#features",
      icon: UserIcon,
    },
    { name: "Community", href: "/community", icon: UserMultipleIcon },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      setIsMobileMenuOpen(false);
      if (element) {
        const offset = 80; // Adjust for sticky header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
      }
    }
  };
  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300",
          isScrolled
            ? "bg-background/75 backdrop-blur-md border-b border-border shadow-sm py-4"
            : "bg-transparent border-transparent py-6",
        )}
      >
        <div className="w-full max-w-7xl px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href={"/"}
            className="flex-1 flex items-center gap-2 hover:cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full opacity-50" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap">
              Frame Gen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "transition-colors hover:text-foreground relative group",
                  pathname === link.href
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : "navbar-active"}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth & Actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <AnimatedThemeToggler />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary border-none"
                >
                  <HugeiconsIcon icon={Coins01Icon} className="w-3 h-3" />
                  <span className="font-semibold">{credits}</span>
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full p-0 overflow-hidden border border-border"
                    >
                      <div className="bg-primary/10 w-full h-full flex items-center justify-center text-primary font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/my-generations" className="cursor-pointer">
                        <HugeiconsIcon
                          icon={UserIcon}
                          className="mr-2 h-4 w-4"
                        />
                        My Generations
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="sm:hidden">
                      <div className="flex items-center">
                        <HugeiconsIcon
                          icon={Coins01Icon}
                          className="mr-2 h-4 w-4"
                        />
                        Credits: {credits}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={Logout01Icon}
                        className="mr-2 h-4 w-4"
                      />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/auth")}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hidden sm:flex"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/generate")}
                  className="px-6 whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:flex"
                >
                  Get started
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <HugeiconsIcon
                icon={isMobileMenuOpen ? Cancel01Icon : Menu01Icon}
                className="w-6 h-6"
              />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }
            }
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.1 }
                : { type: "spring", damping: 25, stiffness: 200 }
            }
            className="fixed inset-0 z-45 bg-background md:hidden pt-24 px-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { delay: index * 0.1 }
                  }
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary text-muted-foreground",
                    )}
                  >
                    <HugeiconsIcon icon={link.icon} className="w-5 h-5" />
                    <span className="text-lg font-medium">{link.name}</span>
                  </Link>
                </motion.div>
              ))}

              {!isLoggedIn && (
                <motion.div
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }
                  }
                  className="mt-8 flex flex-col gap-3"
                >
                  <Button
                    onClick={() => router.push("/auth")}
                    variant="outline"
                    className="w-full h-12 text-lg rounded-xl"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/generate")}
                    className="w-full h-12 text-lg rounded-xl"
                  >
                    Get started
                  </Button>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
