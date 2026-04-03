import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import QuoteForm from '../components/QuoteForm';
import SEO from '../components/SEO';

const ContactItem = ({ icon: Icon, title, line1, line2 }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
        {title}
      </h3>
      <p className="font-body text-sm text-muted-foreground">{line1}</p>
      {line2 ? <p className="font-body text-sm text-muted-foreground">{line2}</p> : null}
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24" data-testid="contact-page">
      <SEO
        title="Contact E&amp;D Glamour Marketing | Event Planner Dover DE | (302) 281-2137"
        description="Contact E&amp;D Glamour Marketing for event décor and party rental quotes in Dover, Delaware. Call (302) 281-2137 or email us. Serving all of DE, MD, PA &amp; NJ."
        canonical="/contact"
      />
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Contact Us
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's Create Something Beautiful
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              Ready to start planning your event? Fill out the form below and we'll 
              get back to you within 24-48 hours with a custom quote.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="font-body text-muted-foreground mb-8">
                  Have questions about our services or rentals? We're here to help 
                  you create the perfect event.
                </p>
              </div>

              <ContactItem
                icon={MapPin}
                title="Visit Us"
                line1="Dover, DE"
                line2=""
              />
              <ContactItem 
                icon={Phone}
                title="Call Us"
                line1="(302) 281-2137"
                line2="Mon-Fri: 9am - 6pm"
              />
              <ContactItem 
                icon={Mail}
                title="Email Us"
                line1="eanddglamourmarketing.24@gmail.com"
                line2=""
              />
              <ContactItem 
                icon={Clock}
                title="Business Hours"
                line1="Monday - Friday: 9am - 6pm"
                line2="Saturday: 10am - 4pm"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Request a Quote
                </h2>
                <p className="font-body text-muted-foreground mb-8">
                  Tell us about your event and we'll create a custom package for you.
                </p>
                <QuoteForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="font-heading text-xl font-semibold text-foreground">
              Dover, DE
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
