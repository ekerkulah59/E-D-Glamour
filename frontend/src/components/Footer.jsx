import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white" data-testid="footer">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-semibold">E&D Glamour Marketing</h3>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Creating unforgettable moments through exceptional event décor and premium rentals. 
              Your vision, our expertise.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/glamour__decormarketing?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors"
                data-testid="social-instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61551575504517"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors"
                data-testid="social-facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-accent transition-colors"
                data-testid="social-twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Services', path: '/services' },
                { name: 'Packages', path: '/packages' },
                { name: 'Rentals', path: '/rentals' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Blog', path: '/blog' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              {[
                { name: 'Wedding Décor', path: '/services?category=wedding' },
                { name: 'Corporate Events', path: '/services?category=corporate' },
                { name: 'Birthday Parties', path: '/services?category=birthday' },
                { name: 'Baby Showers', path: '/services?category=baby_shower' },
                { name: 'Anniversaries', path: '/services?category=anniversary' },
                { name: 'Graduations', path: '/services?category=graduation' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-white/70">
                  Dover, DE
                </span>
              </li>
              <li>
                <a
                  href="tel:+13022812137"
                  className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-white transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone size={18} className="text-accent flex-shrink-0" />
                  (302) 281-2137
                </a>
              </li>
              <li>
                <a
                  href="mailto:eanddglamourmarketing.24@gmail.com"
                  className="flex items-center gap-3 font-body text-sm text-white/70 hover:text-white transition-colors"
                  data-testid="footer-email"
                >
                  <Mail size={18} className="text-accent flex-shrink-0" />
                  eanddglamourmarketing.24@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/50">
            © {currentYear} E&D Glamour Marketing. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/faq" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/terms" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="font-body text-sm text-white/50 hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
