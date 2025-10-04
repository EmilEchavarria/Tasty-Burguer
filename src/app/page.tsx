// app/page.tsx - Código completo para la página principal (Home)
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import menuData from '@/data/menu.json';

// SVG Icon Components (mantenlos si son necesarios en Home, o elimínalos si no)
const Clock = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapPin = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Phone = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Users = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197v1a6 6 0 009-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Award = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const Mail = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Interfaces
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  popular?: boolean;
  badge?: string;
  ingredients?: string[];
  allergens?: string[];
  calories: number;
  prepTime: string;
  spiceLevel?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  healthyOption?: boolean;
  natural?: boolean;
  sizes?: string[];
}

interface FloatingElement {
  id: number;
  left: string;
  top: string;
  animationDuration: string;
  animationDelay: string;
}

// Funciones del carrito
const addToCart = (item: { name: string; price: string }) => {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
  alert('¡Ítem añadido al carrito!');
};

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [floatingElements2, setFloatingElements2] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate fixed floating elements positions on client side only
    const elements2 = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${(3 + Math.random() * 2).toFixed(3)}s`,
      animationDelay: `${(i * 0.3).toFixed(1)}s`
    }));

    setFloatingElements2(elements2);
  }, []);

  // Load 3 random burgers from JSON
  useEffect(() => {
    try {
      // Find the burgers category
      const burgerCategory = menuData.categories.find(category => category.id === 'burgers');
      if (!burgerCategory) {
        throw new Error('Burgers category not found');
      }

      // Shuffle and select 3 random items, ensuring all required fields are present
      const shuffledItems = [...burgerCategory.items].sort(() => Math.random() - 0.5);
      const selectedItems = shuffledItems.slice(0, 3).map(item => ({
        ...item,
        ingredients: item.ingredients || [],
        allergens: item.allergens || []
      }));
      setFeaturedItems(selectedItems);
    } catch (error) {
      console.error('Error processing menu data:', error);
      setFeaturedItems([]); // Set empty array if there's an error
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Imagen de fondo para desktop */}
        <div 
          className="absolute inset-0 w-full h-full object-cover hidden lg:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/background.jpg')"
          }}
        ></div>

        {/* Video para móviles y tablets */}
        <video 
          className="absolute inset-0 w-full h-full object-cover block lg:hidden" 
          autoPlay 
          loop 
          muted 
          playsInline 
        >
          <source src="/videos/videocs.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-gray-900/65 to-amber-900/25"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto pt-0">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                TASTY
              </span>
              <span className="block bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent font-bold">
                BURGER
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10 text-base text-amber-200/80 font-light">
              <span>Ingredientes Premium</span>
              <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
              <span>Técnicas Gourmet</span>
              <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
              <span>Sabores Excepcionales</span>
            </div>
            
            <p className="text-lg md:text-xl text-amber-100/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Descubre la excelencia culinaria en cada bocado. Hamburguesas gourmet elaboradas con ingredientes de la más alta calidad y técnicas gastronómicas avanzadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                href="/menu" 
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-full text-base font-medium tracking-wide hover:shadow-xl hover:shadow-amber-600/50 transform hover:scale-105 transition-all duration-500 touch-manipulation"
              >
                Explorar Menú
              </Link>
              <Link 
                href="/cart"
                className="border-2 border-amber-600 text-amber-400 px-10 py-4 rounded-full text-base font-medium tracking-wide hover:bg-amber-600 hover:text-white transform hover:scale-105 transition-all duration-500 touch-manipulation"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Realizar Pedido
                </div>
              </Link>
            </div>
          </div>
          
          <div className="absolute -bottom-[4rem] sm:-bottom-[6rem] left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:flex">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-amber-300/80 font-light">Descubre más</span>
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-20 relative overflow-hidden bg-[#10110c]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            {/*<div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <span className="text-orange-400 font-medium">Especialidades de la Casa</span>
            </div>*/}
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Menú
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Selecto
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Nuestras creaciones gastronómicas más destacadas, elaboradas con técnicas culinarias avanzadas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <div 
                  key={item.id}
                  className={`group relative bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 ${item.popular ? 'ring-2 ring-orange-500/20' : ''}`}
                >
                  {/* Imagen con overlay (solo hover en desktop, en mobile descripción visible debajo) */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay solo para desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-all duration-500 hidden md:flex"></div>
                    
                    {/* Quick Add Button (visible en desktop hover, en mobile siempre accesible) */}
                    <button className="absolute top-3 right-3 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-orange-500/90 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg md:p-2 touch-manipulation">
                      <svg className="w-4 h-4 md:w-3 md:h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Popular badge */}
                    {item.popular && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔥 POP
                      </div>
                    )}
                  </div>

                  {/* Contenido (en mobile, descripción siempre visible y compacta) */}
                  <div className="p-4 sm:p-6 space-y-3">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">({item.rating})</span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {item.vegetarian && (
                        <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          🌱 Vegetariano
                        </span>
                      )}
                      {item.spiceLevel && (
                        <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full border border-red-500/30">
                          🔥 {item.spiceLevel}/5
                        </span>
                      )}
                      <span className="ml-auto text-xs text-gray-400">
                        {item.calories} cal • {item.prepTime}
                      </span>
                    </div>

                    {/* Título y precio */}
                    <div className="flex items-center justify-between">
                      <div>
                        {item.badge && (
                          <span className="text-sm text-orange-400 font-medium block mb-1">{item.badge}</span>
                        )}
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-xl font-bold text-orange-400">{item.price}</div>
                    </div>

                    {/* Descripción en mobile (compacta) */}
                    <p className="text-gray-400 leading-relaxed text-sm line-clamp-2 md:hidden">
                      {item.description}
                    </p>

                    {/* Botón de acción (más grande en mobile para touch) */}
                    <button 
                      onClick={() => addToCart({ name: item.name, price: item.price })}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base touch-manipulation"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                No se encontraron hamburguesas en el menú.
              </p>
            )}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/menu"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-orange-500 text-orange-400 px-8 py-4 rounded-full font-semibold hover:bg-orange-500 hover:text-white transform hover:scale-105 transition-all duration-500 touch-manipulation"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-[url('/images/texture-parchment.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1a1a1a]/90 to-black/80"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 mb-6 px-8 py-3 bg-[#2b2b2b]/50 border border-gold-600/50 rounded-full shadow-sm">
                <span className="text-gold-500 font-serif text-lg font-medium">Nuestra Filosofía</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Excelencia en
                </span>
                <span className="block bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                  Cada Detalle
                </span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Desde 2023, TastyBurger establece nuevos estándares en gastronomía gourmet. Combinamos técnicas culinarias tradicionales con innovación contemporánea para crear experiencias gastronómicas memorables.
              </p>

              <div className="space-y-8 border-t border-b border-gold-600/30 py-8">
                {[
                  { icon: '🥩', text: 'Carne Premium Certificada', desc: 'Selección rigurosa de cortes premium' },
                  { icon: '👨‍🍳', text: 'Chefs Especializados', desc: 'Equipo con formación gastronómica avanzada' },
                  { icon: '🌱', text: 'Ingredientes Selectos', desc: 'Productos frescos de proveedores certificados' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 bg-[#2b2b2b]/70 border border-gold-600/50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-lg font-serif font-semibold text-white group-hover:text-gold-500 transition-colors duration-300 block">{item.text}</span>
                      <span className="text-gray-300 text-sm font-light">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/about"
                  className="bg-transparent border-2 border-gold-600 text-gold-500 px-8 py-4 rounded-full font-serif font-medium hover:bg-gold-600 hover:text-white hover:shadow-lg hover:shadow-gold-600/30 transition-all duration-300 touch-manipulation"
                >
                  Conocer Más
                </Link>
                <button className="bg-transparent border-2 border-gold-600 text-gold-500 px-8 py-4 rounded-full font-serif font-medium hover:bg-gold-600 hover:text-white hover:shadow-lg hover:shadow-gold-600/30 transition-all duration-300 touch-manipulation">
                  Ver Proceso
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-[#2b2b2b]/70 backdrop-blur-md border border-gold-600/30 rounded-xl p-8 shadow-lg hover:shadow-xl hover:shadow-gold-600/20 transition-all duration-500">
                <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gold-600/20">
                  <Image 
                    src="/images/background.jpg" 
                    alt="Proceso culinario gourmet"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-[#2b2b2b]/80 border border-gold-600/50 text-white p-6 rounded-xl shadow-xl transform hover:rotate-3 transition-transform duration-300">
                  <div className="text-center">
                    <Award className="w-8 h-8 mx-auto mb-2 text-gold-500" />
                    <div className="text-sm font-serif font-semibold">Certificación</div>
                    <div className="text-xs text-gray-300">Gourmet 2024</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-[#2b2b2b]/80 border border-gold-600/50 rounded-lg p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2b2b2b]/70 border border-gold-600/50 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <div className="text-white font-serif font-semibold">15K+</div>
                      <div className="text-gray-300 text-sm font-light">Clientes</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gold-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <span className="text-orange-400 font-medium">Nuestro Impacto</span>
            </div>
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Resultados en
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Números
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "15,000+", label: "Clientes Satisfechos", desc: "Experiencias excepcionales" },
              { number: "25,000+", label: "Hamburguesas Servidas", desc: "Calidad garantizada" },
              { number: "4.9", label: "Rating Promedio", desc: "Todas las plataformas" },
              { number: "98%", label: "Satisfacción", desc: "Clientes que regresan" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-110 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-white text-2xl font-bold">{index + 1}</div>
                </div>
                <div className="text-3xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <span className="text-orange-400 font-medium">Contacto</span>
            </div>
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Experiencia
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Gastronómica
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Reserve su mesa y disfrute de la mejor experiencia culinaria en hamburguesas gourmet
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="grid gap-6">
                {[
                  { 
                    icon: MapPin, 
                    title: 'Ubicación', 
                    info: 'Av. Principal 123, Centro Comercial Plaza',
                    subinfo: 'Local 45-46, Segundo Piso',
                    action: 'Ver Ubicación',
                    link: '/contact'
                  },
                  { 
                    icon: Phone, 
                    title: 'Reservaciones', 
                    info: '+1 (555) 123-4567',
                    subinfo: 'Atención personalizada',
                    action: 'Llamar',
                    link: 'tel:+15551234567'
                  },
                  { 
                    icon: Clock, 
                    title: 'Horarios', 
                    info: 'Lunes - Domingo: 11:00 AM - 11:00 PM',
                    subinfo: 'Servicio continuo',
                    action: 'Ver Más',
                    link: '/about'
                  },
                  { 
                    icon: Mail, 
                    title: 'Información', 
                    info: 'info@tastyburger.com',
                    subinfo: 'Consultas y sugerencias',
                    action: 'Enviar',
                    link: 'mailto:info@tastyburger.com'
                  }
                ].map((item, index) => (
                  <div key={index} className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-orange-500/50 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white font-medium mb-1">{item.info}</p>
                        <p className="text-gray-400 text-sm mb-3">{item.subinfo}</p>
                        <Link 
                          href={item.link}
                          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium touch-manipulation"
                        >
                          {item.action} →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full">
                {/* Mapa Interactivo */}
                <div className="relative w-full h-80 rounded-xl mb-6 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-[1px] z-10 pointer-events-none opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
                  
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 to-orange-600/50 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.1532942301066!2d-70.73016135816702!3d18.455864340195173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ebaa3006d5d82d3%3A0xa954c5fbfcee27c8!2sTasty%20Burger!5e0!3m2!1ses!2sdo!4v1757399974236!5m2!1ses!2sdo"
                    className="relative w-full h-full rounded-xl border-0 filter brightness-110 contrast-110 saturate-110 hover:saturate-125 transition-all duration-500"
                    style={{ filter: 'hue-rotate(15deg) brightness(0.9) contrast(1.1)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación del Restaurante Tasty Burger"
                  ></iframe>
                  
                  <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-lg shadow-orange-500/50 animate-pulse"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-gradient-to-br from-white to-gray-200 rounded-full shadow-lg"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Ubicación Premium</h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-orange-400 text-sm font-medium">En Vivo</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400">
                    Ambiente sofisticado en el corazón de la ciudad. 
                    Estacionamiento disponible y acceso preferencial.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Centro Plaza</p>
                        <p className="text-gray-400 text-xs">2do Piso</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">11AM - 11PM</p>
                        <p className="text-gray-400 text-xs">Todos los días</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link 
                      href="/contact"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 group touch-manipulation"
                    >
                      <span className="group-hover:scale-105 inline-block transition-transform duration-200">
                        Ver Detalles
                      </span>
                    </Link>
                    
                    <Link 
                      href="https://www.google.com/maps/dir//Tasty+Burger,+Azua,+Dominican+Republic/@18.455864340195173,-70.73016135816702,17z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 border border-white/20 hover:border-orange-500/50 transform hover:scale-105 transition-all duration-300 group touch-manipulation"
                    >
                      <span className="group-hover:scale-105 inline-block transition-transform duration-200">
                        Cómo Llegar
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservations CTA Section */}
      <section id="reservations" className="py-20 bg-gradient-to-r from-orange-900 to-orange-800 relative overflow-hidden">
        <div className="absolute inset-0">
          {floatingElements2.map((element) => (
            <div
              key={element.id}
              className="absolute w-40 h-40 bg-orange-400/10 rounded-full blur-xl"
              style={{
                left: element.left,
                top: element.top,
                animationName: 'float',
                animationDuration: element.animationDuration,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: element.animationDelay
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-8">
              Reserve Su
              <br />
              Experiencia
            </h2>
            <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">
              Disfrute de la excelencia gastronómica en un ambiente sofisticado 
              y acogedor diseñado para experiencias memorables
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <div className="text-3xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Mesa Reservada</h3>
                <p className="text-orange-100 mb-6">
                  Garantice su lugar en nuestro exclusivo ambiente gastronómico
                </p>
                <Link 
                  href="/reservations"
                  className="block w-full bg-white text-orange-800 py-4 rounded-xl font-bold hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 touch-manipulation"
                >
                  Reservar Mesa
                </Link>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <div className="text-3xl mb-4">🚚</div>
                <h3 className="text-2xl font-bold text-white mb-4">Servicio a Domicilio</h3>
                <p className="text-orange-100 mb-6">
                  La experiencia TastyBurger en la comodidad de su hogar
                </p>
                <Link 
                  href="/cart"
                  className="block w-full bg-white text-orange-800 py-4 rounded-xl font-bold hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 touch-manipulation"
                >
                  Realizar Pedido
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/menu"
                className="bg-white text-orange-800 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-2xl touch-manipulation"
              >
                Ver Menú Completo
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-800 transform hover:scale-105 transition-all duration-300 touch-manipulation"
              >
                Información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        html {
          scroll-behavior: smooth;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;