import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Check, Phone } from 'lucide-react';
import { packagesApi } from '../lib/api';
import { Button } from '../components/ui/button';

const PackagesPage = () => {
  const packagesList = packagesApi.getAll().data;

  return (
    <div className="min-h-screen pt-24" data-testid="packages-page">
      {/* Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">
              Event Packages
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Three Tiers, One Standard of Excellence
            </h1>
            <p className="font-body text-muted-foreground text-lg">
              We craft unforgettable events across weddings, corporate gatherings, social soirées,
              and graduations. Our three-tier package structure is designed to fit diverse budgets
              and needs while scaling with the size of your guest list and the complexity of your venue.
              Each tier offers a clear scope, transparent pricing, and a dedicated team to bring your
              vision to life—from concept to curtain call.
            </p>
            <p className="font-body text-sm text-muted-foreground mt-4">
              All prices shown are ballpark estimates and can be refined during a discovery call
              based on your location, date, and exact scope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {packagesList.map((pkg, index) => (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                data-testid={`package-card-${pkg.id}`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Users size={20} />
                    <span className="font-body text-sm font-medium">{pkg.guestRange}</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h2>
                  <p className="font-body text-lg font-semibold text-primary mb-4">
                    {pkg.priceLabel}
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    {pkg.targetDescription}
                  </p>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex gap-3 font-body text-sm text-foreground">
                        <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <Link to="/contact">
                    <Button
                      variant={index === 1 ? 'default' : 'outline'}
                      className="w-full rounded-full"
                    >
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Payment terms */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Payment Terms
            </h2>
            <ul className="font-body text-muted-foreground space-y-2">
              <li><strong className="text-foreground">Retainer:</strong> 10–50% due at contract signing to secure your date and begin planning.</li>
              <li><strong className="text-foreground">Final payment:</strong> 50–100% due 7–14 days before the event (or as specified in your contract).</li>
              <li><strong className="text-foreground">Cancellations:</strong> The retainer is typically non-refundable; any partial refunds are based on milestones.</li>
              <li>Final prices depend on guest count, venue complexity, travel, number of event days, and staff requirements.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to plan your event?
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            Call us at (302) 747-0611 or request a quote and we'll refine pricing for your date and scope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+13027470611">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 gap-2">
                <Phone size={18} /> (302) 747-0611
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" className="rounded-full px-8">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
