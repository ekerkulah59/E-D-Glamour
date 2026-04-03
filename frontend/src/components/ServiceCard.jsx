import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const ServiceCard = ({ service, index = 0 }) => {
  const { addItem, items } = useCart();

  const inCart = items.some((i) => i.item.id === service.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartItem = {
      id: service.id,
      name: service.name,
      type: 'service',
      category: service.category,
      price_per_day: service.starting_price || null,
      priceLabel: service.price_note || null,
      images: service.images || [],
    };
    addItem(cartItem, 1);
    toast.success(`${service.name} added to cart`, {
      description: 'Go to your cart to request a quote.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-testid={`service-card-${service.id}`}
    >
      <div className="card-hover bg-white rounded-xl overflow-hidden">
        {/* Image */}
        <Link to={`/services/${service.id}`}>
          <div className="image-zoom aspect-[4/3] relative">
            <img
              src={service.images[0]}
              alt={`${service.name} by E&D Glamour Marketing, Dover Delaware`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <Link to={`/services/${service.id}`}>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
              {service.short_description}
            </p>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <Link to={`/services/${service.id}`} className="font-body text-sm text-foreground/60 group-hover:text-primary group-hover:translate-x-1 transition-all">
              View Details →
            </Link>
            <Button
              size="sm"
              variant={inCart ? 'outline' : 'default'}
              className={`rounded-full gap-1.5 flex-shrink-0 ${inCart ? 'border-primary text-primary' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
              onClick={handleAddToCart}
              data-testid={`service-add-to-cart-${service.id}`}
            >
              {inCart ? (
                <><Check className="w-3.5 h-3.5" /> Added</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
