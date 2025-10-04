"use client";

import React from "react";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header Section */}
      <div className="relative pt-20 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-400/20"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-8 px-8 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-400 font-semibold text-lg">Contacto</span>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Contáctanos
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para servirte. Múltiples formas de comunicarte con nosotros
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Contact Methods Grid - Perfectly Balanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Phone, 
                title: 'Teléfono', 
                info: '(809) 123-4567',
                subinfo: 'Llamadas directas',
                action: 'Llamar',
                link: 'tel:8091234567',
                color: 'text-green-400',
                bgColor: 'bg-green-500/10',
                borderColor: 'border-green-500/20',
                hoverBg: 'hover:bg-green-500/20'
              },
              { 
                icon: MessageCircle, 
                title: 'WhatsApp', 
                info: '+1 (809) 123-4567',
                subinfo: 'Chat instantáneo',
                action: 'Chatear',
                link: 'https://wa.me/18091234567',
                color: 'text-green-500',
                bgColor: 'bg-green-400/10',
                borderColor: 'border-green-400/20',
                hoverBg: 'hover:bg-green-400/20'
              },
              { 
                icon: Mail, 
                title: 'Email', 
                info: 'emilechavarria2005@gmail.com',
                subinfo: 'Correo electrónico',
                action: 'Escribir',
                link: 'mailto:emilechavarria2005@gmail.com',
                color: 'text-blue-400',
                bgColor: 'bg-blue-500/10',
                borderColor: 'border-blue-500/20',
                hoverBg: 'hover:bg-blue-500/20'
              },
              { 
                icon: MapPin, 
                title: 'Ubicación', 
                info: 'Centro de Azua',
                subinfo: 'República Dominicana',
                action: 'Ver Mapa',
                link: 'https://www.google.com/maps/dir//Tasty+Burger,+Azua,+Dominican+Republic',
                color: 'text-red-400',
                bgColor: 'bg-red-500/10',
                borderColor: 'border-red-500/20',
                hoverBg: 'hover:bg-red-500/20'
              }
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group bg-white/5 backdrop-blur-xl border ${item.borderColor} rounded-2xl p-6 ${item.hoverBg} hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl h-full flex flex-col`}
              >
                <div className={`w-14 h-14 ${item.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/90 font-medium mb-1 text-sm">{item.info}</p>
                <p className="text-gray-400 text-xs mb-4 flex-grow">{item.subinfo}</p>
                <div className={`inline-flex items-center gap-2 ${item.color} font-medium text-sm group-hover:gap-3 transition-all`}>
                  {item.action} 
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Main Content - Balanced Layout */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Map Section - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden h-full">
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold text-white">Nuestra Ubicación</h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium text-sm">Abierto</span>
                    </div>
                  </div>
                  <p className="text-gray-400">Centro de Azua, República Dominicana</p>
                </div>
                
                <div className="relative w-full h-96">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.1532942301066!2d-70.73016135816702!3d18.455864340195173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ebaa3006d5d82d3%3A0xa954c5fbfcee27c8!2sTasty%20Burger!5e0!3m2!1ses!2sdo!4v1757399974236!5m2!1ses!2sdo"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tasty Burger - Azua, República Dominicana"
                  ></iframe>
                </div>
                
                <div className="p-6 bg-white/5 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <a 
                      href="https://www.google.com/maps/dir//Tasty+Burger,+Azua,+Dominican+Republic/@18.455864340195173,-70.73016135816702,17z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white py-3 px-4 rounded-xl font-medium text-center hover:bg-orange-600 transition-colors duration-300"
                    >
                      Direcciones
                    </a>
                    <button className="bg-white/10 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 border border-white/20 transition-colors duration-300">
                      Compartir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Business Hours */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Horarios</h3>
                    <p className="text-gray-400 text-sm">Horarios de atención</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { day: 'Lunes - Jueves', hours: '11:00 AM - 11:00 PM', isToday: false },
                    { day: 'Viernes - Sábado', hours: '11:00 AM - 12:00 AM', isToday: false },
                    { day: 'Domingo', hours: '12:00 PM - 10:00 PM', isToday: true },
                    { day: 'Delivery', hours: 'Hasta 30 min antes', isSpecial: true }
                  ].map((schedule, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-xl border ${
                      schedule.isToday ? 'bg-green-500/10 border-green-500/20' :
                      schedule.isSpecial ? 'bg-orange-500/10 border-orange-500/20' :
                      'bg-white/5 border-white/10'
                    }`}>
                      <span className="text-white font-medium text-sm">{schedule.day}</span>
                      <span className={`font-medium text-sm ${
                        schedule.isToday ? 'text-green-400' :
                        schedule.isSpecial ? 'text-orange-400' : 'text-gray-300'
                      }`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <a 
                    href="tel:8091234567"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Ordenar por Teléfono
                  </a>
                  <a 
                    href="https://wa.me/18091234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chatear en WhatsApp
                  </a>
                  <a 
                    href="mailto:emilechavarria2005@gmail.com"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;