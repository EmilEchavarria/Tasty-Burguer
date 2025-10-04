import Image from "next/image";

// Componentes de íconos SVG
const Utensils = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3z" />
  </svg>
);

const MapPin = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Phone = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Clock = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Mail = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10 py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-[#e74c3c] to-[#f39c12] rounded-2xl flex items-center justify-center">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-[#e74c3c] to-[#f39c12] bg-clip-text text-transparent">
                  TastyBurger
                </div>
                <div className="text-sm text-gray-400">Sabores únicos desde 2023</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-8 text-lg leading-relaxed">
              La experiencia gastronómica más extraordinaria en hamburguesas gourmet. 
              Sabores únicos que conquistarán tus sentidos y tu Instagram.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { name: 'Instagram', color: 'from-pink-500 to-orange-500' },
                { name: 'Facebook', color: 'from-blue-600 to-blue-400' },
                { name: 'TikTok', color: 'from-black to-red-600' }
              ].map((social) => (
                <button key={social.name} className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <span className="text-white text-sm font-bold">{social.name[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', href: '#hero' },
                { name: 'Menú Completo', href: '/menu' },
                { name: 'Sobre Nosotros', href: '/about' },
                { name: 'Contacto', href: '/contact' },
                { name: 'Reservas', href: '/reservations' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-[#e74c3c] transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Información</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#e74c3c] flex-shrink-0 mt-1" />
                <div>
                  <div>Av. Principal 123</div>
                  <div>Centro Comercial Plaza</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#e74c3c]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-[#e74c3c]" />
                <span>Lun-Dom: 11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#e74c3c]" />
                <span>info@tastyburger.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Ofertas Especiales</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Tu email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#e74c3c]"
                />
                <button className="bg-gradient-to-r from-[#e74c3c] to-[#f39c12] text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform duration-300">
                  ✓
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 TastyBurger. Todos los derechos reservados. Hecho con ❤️ para los amantes de las hamburguesas.
            </p>
            <div className="flex flex-wrap gap-6 text-sm items-center">
              <a href="#" className="text-gray-400 hover:text-[#e74c3c] transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e74c3c] transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-[#e74c3c] transition-colors duration-300">
                Política de Cookies
              </a>
              {/* Tu logo con link a portafolio */}
              


<a 
  href="https://emilechavarria.vercel.app" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center"
>
  <Image 
    src="/images/logo.png" 
    alt="Desarrollado por Emil Echavarría" 
    width={120} 
    height={120} 
    className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
  />
</a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
