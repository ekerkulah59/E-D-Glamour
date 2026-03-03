import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our hearts into every event, treating your celebration as if it were our own.',
    },
    {
      icon: Sparkles,
      title: 'Creativity',
      description: 'We push boundaries to create unique, memorable experiences that stand out.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with you to understand and bring your vision to life.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in quality, service, and attention to detail.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Michael Chen',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
  ];

  return (
    <div className="min-h-screen pt-24" data-testid="about-page">
      {/* Hero */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
                About Us
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Creating Moments That Last a Lifetime
              </h1>
              <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
                E&D Glamour Marketing was founded in 2015 with a simple mission: to transform 
                ordinary spaces into extraordinary experiences. What started as a small 
                team with big dreams has grown into a full-service event decoration company 
                trusted by thousands of clients.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                We believe that every event tells a story, and we're here to help you tell 
                yours beautifully. From intimate gatherings to grand celebrations, we bring 
                the same level of passion and precision to every project.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
                alt="Event decoration"
                className="rounded-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl">
                <p className="font-heading text-4xl font-bold">3+</p>
                <p className="font-body text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Our Values
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"
                alt="Corporate event"
                className="rounded-xl h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
                alt="Birthday party"
                className="rounded-xl h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
                alt="Gala event"
                className="rounded-xl h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600"
                alt="Baby shower"
                className="rounded-xl h-48 object-cover mt-8"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                From Humble Beginnings to Industry Leaders
              </h2>
              <div className="space-y-4 font-body text-muted-foreground">
                <p>
                  Our journey began in a small garage with just a handful of linens and 
                  a passion for creating beautiful spaces. Founder Sarah Mitchell, a former 
                  interior designer, saw a gap in the market for high-quality, personalized 
                  event décor services.
                </p>
                <p>
                  Today, we operate a 10,000 sq ft warehouse filled with premium rental 
                  inventory and employ a team of 25 talented professionals. We've decorated 
                  over 500 events and continue to grow, but our commitment to personalized 
                  service remains unchanged.
                </p>
                <p>
                  Every event, regardless of size, receives our full attention and creative 
                  energy. Because at E&D Glamour Marketing, your celebration is our canvas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
     

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Let's create something beautiful for your next celebration.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold"
              data-testid="about-cta-btn"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
