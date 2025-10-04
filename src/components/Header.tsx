// components/Header.tsx - Código completo para el componente Header arreglado con el carrito integrado
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Iconos SVG
const Menu = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    // Establecer el scroll inicial
    setScrollY(window.scrollY);
    setLastScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', updateCartCount);
    };
  }, [lastScrollY]);

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Menú", href: "/menu" },
    { name: "Nosotros", href: "#about" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrollY === 0
          ? "bg-transparent"
          : "bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-[#e74c3c]/30"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/images/icon.png"
                alt="Logo TastyBurger"
                width={48}
                height={48}
                className="rounded-2xl transform group-hover:rotate-12 transition-transform duration-300"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-tr from-[#f39c12] to-[#e74c3c] rounded-full flex items-center justify-center">
                <span className="text-xs text-white">✨</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-black bg-[#f39c12] bg-clip-text text-transparent">
                TastyBurger
              </div>
              <div className="text-xs text-gray-400 -mt-1">@ Sabores Únicos</div>
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-[#f8f9fa] hover:text-[#e74c3c] transition-all duration-300 group font-medium"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e74c3c] to-[#f39c12] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="#reservations"
              className="bg-gradient-to-r from-[#e74c3c] to-[#f39c12] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#e74c3c]/40 transform hover:scale-105 transition-all duration-300"
            >
              Reservar
            </a>
            {/* Icono de carrito en desktop */}
            <Link
              href="/cart"
              className="relative text-[#f8f9fa] hover:text-[#e74c3c] transition-colors duration-300"
            >
              <CartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Botón menú móvil y carrito en mobile */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              href="/cart"
              className="relative text-[#f8f9fa] hover:text-[#e74c3c] transition-colors duration-300"
            >
              <CartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="text-[#f8f9fa] hover:text-[#e74c3c] transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-[#f8f9fa] hover:text-[#e74c3c] transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#reservations"
                className="block w-full bg-gradient-to-r from-[#e74c3c] to-[#f39c12] text-white text-center py-3 rounded-full font-semibold mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Reservar Mesa
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;