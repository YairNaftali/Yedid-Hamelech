
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shiurim from './pages/Shiurim';
import Podcast from './pages/Podcast';
import Application from './pages/Application';
import Contact from './pages/Contact';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shiurim', path: '/shiurim' },
    { name: 'Podcast', path: '/podcast' },
    { name: 'Apply', path: '/apply' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-3 border-b border-[#E8DFD6]' : 'bg-white py-4 border-b border-[#E8DFD6]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`transition-all duration-300 ${scrolled ? 'w-12 h-12' : 'w-14 h-14'} flex items-center justify-center`}>
              <img 
                src="/images/logo.png" 
                alt="Yeshivas Yedid Hamelech Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className={`block font-semibold tracking-wide serif leading-tight transition-all duration-300 ${scrolled ? 'text-lg text-[#2C3E50]' : 'text-xl text-[#2C3E50]'}`}>Yeshivas Yedid Hamelech</span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-[#C9963F] font-medium">Jerusalem, Israel</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`menu-link text-[11px] uppercase tracking-[0.2em] font-medium transition-all relative group ${
                  location.pathname === link.path ? 'text-[#1a5f7a]' : 'text-[#0F1729] hover:text-[#1a5f7a]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[#1a5f7a] transform transition-transform duration-300 origin-center ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            <Link to="/contact" className="bg-[#1a5f7a] hover:bg-[#2a7a9d] text-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-all rounded-sm shadow-sm hover:shadow-md">
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#0F1729] hover:text-[#1a5f7a] transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 overflow-hidden shadow-lg ${
        isOpen ? 'max-h-96 border-t border-[#eaeaea]' : 'max-h-0'
      }`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-[#0F1729] text-xs uppercase tracking-wider font-medium hover:text-[#1a5f7a] hover:bg-[#f8f9fa] px-3 py-2 rounded transition-all"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#1a5f7a] text-white py-3 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#2a7a9d] transition-all"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#0F1729] text-white pt-24 pb-12 border-t border-[#1a2f3f]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
               <img src="/images/logo.png" alt="Yeshivas Yedid Hamelech Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="serif text-xl font-semibold tracking-wide">Yeshivas Yedid Hamelech</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a5f7a]">Jerusalem, Israel</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Providing a premier Torah environment for serious third-year bochrim in the heart of Jerusalem's Emek Refaim. Focusing on depth of learning, character refinement, and spiritual growth.
          </p>
        </div>
        
        <div>
          <h4 className="text-[#1a5f7a] text-xs font-semibold uppercase tracking-[0.2em] mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/shiurim" className="hover:text-white transition-colors">Shiurim Library</Link></li>
            <li><Link to="/podcast" className="hover:text-white transition-colors">Podcast</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">Application</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#1a5f7a] text-xs font-semibold uppercase tracking-[0.2em] mb-6">Connect</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-5 text-center">📍</span> Emek Refaim, Jerusalem
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 text-center">📧</span> yedidhamelech@gmail.com
            </li>
            <li className="flex gap-4 pt-2">
              <a href="https://youtube.com" className="w-8 h-8 rounded-full bg-[#1a2f3f] flex items-center justify-center hover:bg-red-600 transition-colors">YT</a>
              <a href="https://spotify.com" className="w-8 h-8 rounded-full bg-[#1a2f3f] flex items-center justify-center hover:bg-green-600 transition-colors">SP</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-[#1a2f3f] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
        <p>&copy; {new Date().getFullYear()} Yeshivas Yedid Hamelech. Built with excellence.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const GIVEBUTTER_URL = "https://givebutter.com/embed/c/hUvEmO?goalBar=false&gba_gb.element.id=LWe81p";

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#fcfaf5]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shiurim" element={<Shiurim />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Floating Donation Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <a href={GIVEBUTTER_URL} target="_blank" rel="noopener noreferrer" className="bg-[#1a5f7a] text-white p-5 rounded-full shadow-2xl font-semibold flex items-center gap-2 hover:scale-105 hover:bg-[#2a7a9d] transition-all duration-300 group">
             <span className="hidden sm:inline text-xs uppercase tracking-wider">Support Us</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </a>
        </div>
      </div>
    </Router>
  );
};

export default App;
