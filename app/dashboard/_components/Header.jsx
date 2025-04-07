"use client";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [controlNavbar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    
    // Prevent body scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About us" },
   
    { href: "/how-it-works", label: "How it works" },
    { href: "/dashboard", label: "Dashboard" },
    
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center 
          p-4 sm:p-5 
          bg-[#0a192f]/90 backdrop-blur-md 
          border-b border-blue-900/20
          z-50 
          transition-all duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
        style={{
          background: 'linear-gradient(to right, rgba(10, 25, 47, 0.95), rgba(17, 34, 64, 0.95))'
        }}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          aria-label="AI Home"
          onClick={closeMobileMenu}
        >
          
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 sm:text-2xl">S3 AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav 
          className="hidden gap-4 md:flex lg:gap-6"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              path={path}
              href={item.href}
              label={item.label}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        {/* Desktop Authentication */}
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button 
                className="px-4 py-2 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a192f]"
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }} 
            />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-blue-300 transition-colors focus:outline-none hover:text-blue-400"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-0 z-40 pt-16 overflow-hidden md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          style={{
            background: 'linear-gradient(130deg, #0a192f 0%, #112240 100%)'
          }}
        >
          <div className="h-full pb-16 overflow-y-auto">
            <nav className="p-6 space-y-6">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  path={path}
                  href={item.href}
                  label={item.label}
                  mobile
                  onClick={closeMobileMenu}
                />
              ))}

              {/* Mobile Authentication */}
              <div className="pt-6 border-t border-blue-900/30">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button 
                      className="w-full px-4 py-2 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a192f]"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton 
                      afterSignOutUrl="/" 
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-12 h-12 mx-auto",
                        },
                      }} 
                    />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ path, href, label, mobile, onClick }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`
        block 
        transition-all duration-300 ease-in-out 
        cursor-pointer 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
        ${mobile
          ? "w-full text-lg py-3 text-center"
          : "px-3 py-2 hover:bg-blue-900/30 hover:text-blue-300"
        }
        ${path === href
          ? mobile 
            ? "text-blue-300 font-bold bg-blue-900/40"
            : "text-blue-300 font-bold bg-blue-900/30"
          : mobile
            ? "text-gray-300 hover:text-blue-300"
            : "text-gray-300 hover:text-blue-300"
        }
      `}
    >
      {label}
    </Link>
  );
}

export default Header;