"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import menuData from '@/data/menu.json';

// SVG Icons
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const Star = ({ className, filled }: { className?: string, filled: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Flame = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  badge?: string;
  category: string;
  ingredients?: string[];
  allergens?: string[];
  calories: number;
  prepTime: string;
}

// Función para agregar al carrito
const addToCart = (item: { name: string; price: string }) => {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
  toast.success(
    <div className="flex items-center gap-2">
      <CartIcon className="w-5 h-5 text-orange-400" />
      <span>¡{item.name} añadido al carrito!</span>
    </div>,
    {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid #f97316',
        borderRadius: '8px',
        padding: '12px',
      },
      duration: 3000,
      position: 'top-right',
    }
  );
};

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Extract price from string (RD$425.00 -> 425)
  const extractPrice = (priceString: string): number => {
    const match = priceString.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  };

  // Filter items based on search and filters
  const filteredCategories = useMemo(() => {
    return menuData.categories.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === "all" || category.id === selectedCategory;
        
        const itemPrice = extractPrice(item.price);
        const matchesPriceRange = priceRange === "all" || 
          (priceRange === "low" && itemPrice < 300) ||
          (priceRange === "medium" && itemPrice >= 300 && itemPrice < 500) ||
          (priceRange === "high" && itemPrice >= 500);

        return matchesSearch && matchesCategory && matchesPriceRange;
      })
    })).filter(category => category.items.length > 0);
  }, [searchTerm, selectedCategory, priceRange]);

  const categories = [
    { id: "all", name: "Todo", count: menuData.categories.reduce((acc, cat) => acc + cat.items.length, 0) },
    ...menuData.categories.map(cat => ({ 
      id: cat.id, 
      name: cat.name, 
      count: cat.items.length 
    }))
  ];

  const MenuItemCard = ({ item }: { item: MenuItem }) => (
    <div className="group bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105 transition-all duration-500">
      <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
        <Image 
          src={item.image} 
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {item.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {item.badge}
          </div>
        )}

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(item);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 text-orange-400" 
                filled={i < Math.floor(item.rating)}
              />
            ))}
            <span className="text-white text-sm ml-1">({item.rating})</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Nombre y Precio en fila separada */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 flex-1">
            {item.name}
          </h3>
          <div className="text-xl font-bold text-orange-400 ml-4 flex-shrink-0">
            {item.price}
          </div>
        </div>

        {/* Descripción ocupando todo el ancho */}
        <div className="w-full">
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Información nutricional */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{item.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <span>{item.calories} cal</span>
          </div>
        </div>

        <button 
          onClick={() => addToCart({ name: item.name, price: item.price })}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-300 touch-manipulation"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );

  const ItemModal = ({ item, onClose }: { item: MenuItem; onClose: () => void }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 300); // Match the transition duration
    };

    useEffect(() => {
      return () => {
        setIsClosing(false); // Reset on unmount
      };
    }, []);

    return (
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <div 
          className={`bg-[#1a1a1a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-in-out ${
            isClosing ? '-translate-y-5 opacity-0' : 'translate-y-0 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-96 rounded-t-2xl overflow-hidden">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            {item.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                {item.badge}
              </div>
            )}
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">{item.name}</h2>
                <p className="text-gray-400 mt-2">{item.description}</p>
              </div>
              <div className="text-3xl font-bold text-orange-400">{item.price}</div>
            </div>

            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Ingredientes</h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.allergens && item.allergens.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Alérgenos</h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, index) => (
                    <span key={index} className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 text-sm rounded-full">
                      ⚠️ {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => {
                addToCart({ name: item.name, price: item.price });
                handleClose();
              }}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-300 touch-manipulation"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-1000 to-black text-white">
      <Toaster />
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-orange-950/30 via-orange-900/20 to-transparent relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-300/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-orange-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-orange-400/15 to-transparent blur-3xl"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-orange-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-2 h-2 bg-orange-300/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-orange-500/20 rounded-full animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-gray-100 via-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
                Nuestro
              </span>
              <span className="block bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">
                Menú
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestras creaciones gastronómicas, elaboradas con ingredientes 
              <span className="text-orange-300 font-semibold"> premium </span> 
              y técnicas gourmet de vanguardia
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-5xl mx-auto mb-20 space-y-8">
            {/* Enhanced Search Bar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/15 to-orange-400/15 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 group-hover:text-orange-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Buscar hamburguesas, bebidas, postres..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/40 rounded-3xl text-white text-lg placeholder-gray-500 focus:border-orange-400/50 focus:outline-none focus:bg-gray-900/70 transition-all duration-300 shadow-lg"
                />
              </div>
            </div>

            {/* Enhanced Filter Toggle Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="group flex items-center gap-3 px-8 py-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-2xl text-gray-300 hover:bg-gray-800/60 hover:border-orange-400/30 hover:text-white transition-all duration-300 shadow-lg hover:scale-[1.02]"
              >
                <Filter className="w-6 h-6 group-hover:text-orange-400 transition-colors duration-300" />
                <span className="font-semibold text-lg">Filtros Avanzados</span>
                <div className={`w-2 h-2 bg-orange-400 rounded-full transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0'}`}></div>
              </button>
            </div>

            {/* Enhanced Filters */}
            {showFilters && (
              <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 rounded-3xl p-8 space-y-8 shadow-xl animate-in slide-in-from-top duration-300">
                {/* Category Filter */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-white">Categorías</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`group relative px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                            : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-800/80 hover:border-orange-400/30 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg">{category.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id 
                              ? 'bg-white/20' 
                              : 'bg-orange-400/15 text-orange-400'
                          }`}>
                            {category.count} items
                          </span>
                        </div>
                        {selectedCategory === category.id && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-2xl blur"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Price Range Filter */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-white">Rango de Precio</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { id: "all", name: "Todos", range: "Todos los precios", icon: "🍽️" },
                      { id: "low", name: "Económico", range: "< RD$300", icon: "💰" },
                      { id: "medium", name: "Medio", range: "RD$300 - RD$500", icon: "⭐" },
                      { id: "high", name: "Premium", range: "> RD$500", icon: "👑" }
                    ].map(price => (
                      <button
                        key={price.id}
                        onClick={() => setPriceRange(price.id)}
                        className={`group relative px-6 py-6 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                          priceRange === price.id
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                            : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-800/80 hover:border-orange-400/30 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="text-2xl">{price.icon}</div>
                          <span className="text-lg font-bold">{price.name}</span>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            priceRange === price.id 
                              ? 'bg-white/20' 
                              : 'bg-orange-400/15 text-orange-400'
                          }`}>
                            {price.range}
                          </span>
                        </div>
                        {priceRange === price.id && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-400/20 rounded-2xl blur"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">No se encontraron resultados</h3>
              <p className="text-gray-400">Intenta con otros términos de búsqueda o filtros</p>
            </div>
          ) : (
            <div className="space-y-20">
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-white mb-4">
                      {category.name}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {category.items.map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {/* Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Menu;