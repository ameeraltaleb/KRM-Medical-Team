import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Phone, ShieldPlus, Search, Menu, X as CloseIcon, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function PublicLayout() {
  const { siteSettings } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', to: '/' },
    { name: 'من نحن', to: '#about' },
    { name: 'خدماتنا', to: '#services' },
    { name: 'باقات الرعاية', to: '#packages' },
    { name: 'عملاؤنا', to: '#testimonials' },
    { name: 'المدونة', to: '#blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white relative">
      {/* Clean Navbar */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                {siteSettings.logoUrl ? (
                  <img src={siteSettings.logoUrl} alt="KRM Medical Team Logo" className="h-8 sm:h-10" />
                ) : (
                  <div className="flex items-center gap-1 sm:gap-2 text-primary font-bold text-2xl sm:text-3xl tracking-tighter">
                    <ShieldPlus className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={2.5} />
                    <span>KRM</span>
                  </div>
                )}
                <span className="text-secondary font-bold hidden md:block tracking-wide mt-1">
                  MEDICAL
                </span>
              </Link>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                link.to.startsWith('#') ? (
                  <a key={idx} href={link.to} className="text-secondary hover:text-primary transition-colors font-bold text-sm xl:text-base">
                    {link.name}
                  </a>
                ) : (
                  <Link key={idx} to={link.to} className="text-primary font-bold transition-colors text-sm xl:text-base">
                    {link.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="text-secondary hover:text-primary transition-colors hidden sm:block p-2" aria-label="بحث">
                 <Search className="w-5 h-5" />
              </button>
              
              <a 
                href={`https://wa.me/${siteSettings.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary hover:bg-primary-dark transition-all text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-primary/20 text-xs sm:text-sm"
              >
                <span>تواصل معنا</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden text-secondary hover:text-primary p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden z-40 animate-in slide-in-from-top-2">
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link, idx) => (
                link.to.startsWith('#') ? (
                  <a 
                    key={idx} 
                    href={link.to} 
                    className="text-secondary hover:text-primary font-bold text-lg py-2 border-b border-gray-50 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={idx} 
                    to={link.to} 
                    className="text-primary font-bold text-lg py-2 border-b border-gray-50 last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Clean Footer */}
      <footer className="bg-secondary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-3xl tracking-tighter mb-4">
               <ShieldPlus className="w-8 h-8 text-primary" />
               <span>KRM</span>
            </div>
             <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
               فريق طبي متخصص يصل إليك أينما كنت في تركيا، لتقديم رعاية صحية آمنة ومريحة داخل منزلك أو مقر إقامتك.
             </p>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">
                 <Twitter className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">
                 <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-white">
                 <Facebook className="w-5 h-5" />
               </a>
             </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">روابط هامة</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><a href="#services" className="hover:text-primary transition-colors">خدماتنا الطبية</a></li>
              <li><a href="#packages" className="hover:text-primary transition-colors">الباقات</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">آراء العملاء</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">تواصل معنا</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="dir-ltr text-right font-sans">{siteSettings.whatsappNumber}+</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <span>إسطنبول، تركيا</span>
              </li>
              <li className="mt-4">
                 <Link to="/admin" className="text-xs border border-gray-600 rounded-full px-3 py-1 hover:border-primary hover:text-primary transition-colors inline-block">
                    دخول الإدارة
                 </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} KRM Medical Team
        </div>
      </footer>
    </div>
  );
}
