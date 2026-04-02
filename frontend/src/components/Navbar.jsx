import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', dropdown: true },
    { name: 'Packages', path: '/packages', dropdown: true },
    { name: 'Rentals', path: '/rentals', dropdown: true },
    { name: 'Book Now', path: '/book' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      data-testid="navbar"
    >
      <nav 
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3.5 rounded-none transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg' 
            : 'bg-white/60 backdrop-blur-sm'
        }`}
      >
        {/* Three-column layout: logo | centered nav | cart + CTA */}
        <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 w-full">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl font-semibold text-foreground justify-self-start min-w-0 truncate"
            data-testid="navbar-logo"
          >
            E&D Glamour Marketing
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-xs font-semibold uppercase tracking-wide transition-colors link-underline inline-flex items-center gap-1 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-self-end gap-3 sm:gap-4">
            <Link to="/cart" className="relative p-2.5" aria-label={`Cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? 's' : ''}` : ''}`} data-testid="nav-cart-btn">
              <ShoppingCart className="w-6 h-6 text-foreground/80 hover:text-foreground transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/contact">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 sm:px-6 text-xs font-semibold uppercase tracking-wide"
                data-testid="nav-get-quote-btn"
              >
                Get a Quote
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden justify-self-end p-2 text-foreground row-start-1 col-start-2"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 pt-4 border-t border-border"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-body text-base font-medium py-2 ${
                      isActive(link.path) 
                        ? 'text-primary' 
                        : 'text-foreground/80'
                    }`}
                    data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/cart" className="flex items-center gap-2 font-body text-base font-medium py-2 text-foreground/80" data-testid="mobile-nav-cart">
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cartCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-1.5">{cartCount}</span>}
                </Link>
                <Link to="/contact" className="mt-2">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    data-testid="mobile-get-quote-btn"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
