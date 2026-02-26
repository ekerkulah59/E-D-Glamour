import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../lib/utils';

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-testid={`service-card-${service.id}`}
    >
      <Link to={`/services/${service.id}`}>
        <div className="card-hover bg-white rounded-xl overflow-hidden">
          {/* Image */}
          <div className="image-zoom aspect-[4/3] relative">
            <img
              src={service.images[0]}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
              {service.short_description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-medium text-primary">
                {service.starting_price 
                  ? `From ${formatPrice(service.starting_price)}`
                  : service.price_note
                }
              </span>
              <span className="font-body text-sm text-foreground/60 group-hover:text-primary group-hover:translate-x-1 transition-all">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
