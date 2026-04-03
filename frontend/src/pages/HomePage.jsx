import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Calendar, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import PackagesSection from '../components/PackagesSection';
import { servicesApi, testimonialsApi } from '../lib/api';
import SEO from '../components/SEO';

const HERO_VIDEOS = [
  { src: '/gallary-v1.mp4', alt: 'E&D Glamour event highlights' },
  { src: '/gallary-v2.mp4', alt: 'E&D Glamour event moments' },
  { src: '/gallary-v4.mp4', alt: 'E&D Glamour event moments' },
];

const HomePage = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  const services = servicesApi.getAll().data.slice(0, 4);
  const testimonials = testimonialsApi.getAll(true).data.slice(0, 3);

  // Hero carousel auto-advance (10 seconds per video)
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_VIDEOS.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  // const stats = [
  //   { icon: Calendar, value: '500+', label: 'Events Decorated' },
  //   { icon: Users, value: '2000+', label: 'Happy Clients' },
  //   { icon: Award, value: '10+', label: 'Years Experience' },
  //   { icon: Sparkles, value: '50+', label: 'Rental Items' },
  // ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <SEO
        title="Event Planner &amp; 360 Photo Booth Rental Dover DE"
        description=" Event planning and decoration services in Dover, Delaware. Serving weddings, birthdays &amp; corporate events across DE, MD, PA, NJ. Call (302) 281-2137."
        canonical="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
        {/* Background Video Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <video
                src={HERO_VIDEOS[heroIndex].src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label={HERO_VIDEOS[heroIndex].alt}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Carousel controls */}
        {/* <button
          type="button"
          onClick={() => setHeroIndex((i) => (i - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={() => setHeroIndex((i) => (i + 1) % HERO_VIDEOS.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-8 w-8" />
        </button> */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_VIDEOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setHeroIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom w-full pt-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-accent text-sm md:text-base uppercase tracking-widest mb-4"
            >
              E&D Glamour Marketing
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Creating Unforgettable
              <span className="block text-accent">Moments</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-white/80 text-base md:text-lg mb-8 leading-relaxed"
            >
              We craft unforgettable events across weddings, corporate gatherings, social soirées,
              and graduations. Transform your vision into reality with our premium event décor
              and extensive rental collection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base"
                  data-testid="hero-explore-services-btn"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-foreground rounded-full px-8 py-6 text-base"
                  data-testid="hero-get-quote-btn"
                >
                  Get a Quote
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-muted" data-testid="stats-section">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <p className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Services */}
      <section className="section-padding" data-testid="featured-services-section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-body text-primary text-sm uppercase tracking-widest mb-2"
              >
                Our Services
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-heading text-3xl md:text-4xl font-bold text-foreground"
              >
                Our Event Décor Services in Delaware
              </motion.h2>
            </div>
            <Link
              to="/services"
              className="font-body text-primary hover:text-primary/80 flex items-center gap-2 mt-4 md:mt-0"
              data-testid="view-all-services-link"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-muted" data-testid="about-preview-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest">
                About Us
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                About E&amp;D Glamour Marketing — Dover, DE
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                E&amp;D Glamour Marketing has been transforming ordinary spaces into extraordinary
                experiences since 2021. Based in Dover, Delaware, our team of creative professionals
                brings passion and precision to every project, ensuring your special moments
                are as unique as your story.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                From weddings to corporate galas, social soirées to graduations, baby showers to
                birthday celebrations, we serve all of Delaware, Maryland, Pennsylvania, and
                New Jersey with comprehensive décor services and an extensive rental inventory.
              </p>
              <Link to="/about">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                  data-testid="learn-more-about-btn"
                >
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/gallary-2024-r.jpeg"
                alt="Wedding décor setup by E&D Glamour Marketing in Dover, Delaware"
                className="rounded-lg w-full h-64 object-cover"
                loading="lazy"
              />
              <img
                src="/gallary-birthday.jpeg"
                alt="Birthday party decoration by E&D Glamour Marketing, Dover DE"
                className="rounded-lg w-full h-64 object-cover mt-8"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <PackagesSection limit={3} />

      {/* Testimonials */}
      <section className="section-padding" data-testid="testimonials-section">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-primary text-sm uppercase tracking-widest mb-2"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground"
            >
              What Our Delaware Clients Say
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/testimonials"
              className="font-body text-primary hover:text-primary/80 flex items-center justify-center gap-2"
              data-testid="view-all-testimonials-link"
            >
              Read All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Plan Your Event in Delaware?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-white/80 text-lg mb-8"
            >
              Let's discuss your vision and bring it to life. Serving Dover, Wilmington, Newark, and all of Delaware.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
                  data-testid="cta-get-quote-btn"
                >
                  Get a Free Quote
                </Button>
              </Link>
              <Link to="/packages">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base"
                  data-testid="cta-packages-btn"
                >
                  View Packages
                </Button>
              </Link>
              <Link to="/rentals">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base"
                  data-testid="cta-browse-rentals-btn"
                >
                  Browse Rentals
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
