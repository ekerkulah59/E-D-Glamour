import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Check } from 'lucide-react';
import { Button } from './ui/button';

const PackageCard = ({ pkg, index = 0, featured = false }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
      data-testid={`package-card-${pkg.id}`}
    >
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Users size={20} />
          <span className="font-body text-sm font-medium">{pkg.guestRange}</span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          {pkg.name}
        </h3>
        <p className="font-body text-lg font-semibold text-primary mb-4">
          {pkg.priceLabel}
        </p>
        <p className="font-body text-sm text-muted-foreground mb-6">
          {pkg.targetDescription}
        </p>
        <ul className="space-y-3 flex-1">
          {pkg.inclusions.slice(0, featured ? 3 : undefined).map((item, i) => (
            <li key={i} className="flex gap-3 font-body text-sm text-foreground">
              <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
          {featured && pkg.inclusions.length > 3 && (
            <li className="font-body text-sm text-muted-foreground">
              +{pkg.inclusions.length - 3} more inclusions
            </li>
          )}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <Link to="/contact">
          <Button
            variant={featured && index === 1 ? 'default' : 'outline'}
            className="w-full rounded-full"
          >
            Get a Quote
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

export default PackageCard;
