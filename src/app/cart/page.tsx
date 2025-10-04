"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from '@/components/Header'; // Adjust the path as needed
import menuData from '@/data/menu.json';

// SVG Icon Components
const TrashIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18" />
  </svg>
);

const CartIcon = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  description?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Tu número de WhatsApp (incluye código de país, ej: 18291234567 para RD)
  const WHATSAPP_NUMBER = '18291234567'; // ¡CAMBIAR POR TU NÚMERO REAL!

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Map items to include image and description from menuData
      const groupedItems = cart.reduce((acc: CartItem[], item: { name: string; price: string }) => {
        const existingItem = acc.find(i => i.name === item.name && i.price === item.price);
        // Find the item in menuData to get image and description
        const menuItem = menuData.categories
          .flatMap(category => category.items)
          .find(menuItem => menuItem.name === item.name && menuItem.price === item.price);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          acc.push({
            id: menuItem?.id || item.name,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: menuItem?.image || '/images/placeholder.jpg',
            description: menuItem?.description || 'No description available',
          });
        }
        return acc;
      }, []);
      setCartItems(groupedItems);
    };

    updateCart();
    window.addEventListener('storage', updateCart);

    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  const removeFromCart = (index: number) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemToRemove = cartItems[index];
    // Find the first item that matches name and price
    const itemIndex = cart.findIndex(
      (item: { name: string; price: string }) => item.name === itemToRemove.name && item.price === itemToRemove.price
    );
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(index);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemToUpdate = cartItems[index];
    // Rebuild the cart with the correct number of instances
    const newCart = [];
    let instancesToKeep = newQuantity;

    for (const item of cart) {
      if (item.name === itemToUpdate.name && item.price === itemToUpdate.price && instancesToKeep > 0) {
        newCart.push(item);
        instancesToKeep--;
      } else if (item.name !== itemToUpdate.name || item.price !== itemToUpdate.price) {
        newCart.push(item);
      }
    }

    // Add additional instances if increasing quantity
    if (newQuantity > itemToUpdate.quantity) {
      const additionalInstances = newQuantity - itemToUpdate.quantity;
      for (let i = 0; i < additionalInstances; i++) {
        newCart.push({ name: itemToUpdate.name, price: itemToUpdate.price });
      }
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;
        return total + price;
      }, 0)
      .toFixed(2);
  };

  const clearCart = () => {
    localStorage.setItem('cart', '[]');
    window.dispatchEvent(new Event('storage'));
  };

  // Función para generar el enlace de WhatsApp con el mensaje del pedido
  const getWhatsAppLink = () => {
    if (cartItems.length === 0) return '';

    const itemsList = cartItems.map(item => `${item.name} (x${item.quantity}) - ${item.price}`).join('\n');
    const total = calculateTotal();
    const message = `¡Hola! Quiero hacer un pedido:\n\n${itemsList}\n\nTotal: RD$${total}\n\nDetalles de entrega: [agrega aquí tu dirección si quieres]. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="py-20 bg-[#10110c]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Tu
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Carrito
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Revisa tus selecciones y prepárate para disfrutar de una experiencia gastronómica única
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <CartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-400 mb-8">Tu carrito está vacío</p>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 touch-manipulation"
                >
                  Explorar Menú
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Lista de ítems */}
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-start gap-6 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="w-24 h-24 bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-orange-400 font-medium">{item.price} x {item.quantity}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500/40 transition-all duration-300 touch-manipulation"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500/40 transition-all duration-300 touch-manipulation"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <TrashIcon className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Resumen del carrito */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Total</h3>
                    <p className="text-xl font-bold text-orange-400">RD${calculateTotal()}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={clearCart}
                      className="bg-transparent border-2 border-red-500 text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 touch-manipulation"
                    >
                      Vaciar Carrito
                    </button>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg hover:shadow-orange-500/30 transform hover:scale-105 transition-all duration-300 touch-manipulation"
                    >
                      Proceder al Pago vía WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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

export default Cart;