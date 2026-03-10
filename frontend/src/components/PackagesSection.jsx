import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { packagesApi } from '../lib/api';
import PackageCard from './PackageCard';

const PackagesSection = ({ limit = 3 } = {}) => {
  const packagesList = packagesApi.getAll().data;
  const displayPackages = limit ? packagesList.slice(0, limit) : packagesList;
  const isPreview = limit > 0 && displayPackages.length < packagesList.length;

  return (
    <section className="section-padding bg-muted" data-testid="packages-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-primary text-sm uppercase tracking-widest mb-2"
            >
              Event Packages
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground"
            >
              Three Tiers, One Standard of Excellence
            </motion.h2>
          </div>
          {isPreview && (
            <Link
              to="/packages"
              className="font-body text-primary hover:text-primary/80 flex items-center gap-2 mt-4 md:mt-0"
              data-testid="view-all-packages-link"
            >
              View All Packages <ArrowRight size={18} />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayPackages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              featured={isPreview}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
