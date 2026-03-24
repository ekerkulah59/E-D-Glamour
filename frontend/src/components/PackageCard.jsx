import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Check, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const PackageCard = ({ pkg, index = 0, featured = false }) => {
  const { addItem, items } = useCart();

  const inCart = items.some((i) => i.item.id === pkg.id);

  const handleAddToCart = () => {
    const cartItem = {
      id: pkg.id,
      name: pkg.name,
      type: 'package',
      category: 'package',
      price_per_day: pkg.priceRange?.[0] || null,
      priceLabel: pkg.priceLabel,
      images: [],
    };
    addItem(cartItem, 1);
    toast.success(`${pkg.name} added to cart`, {
      description: 'Go to your cart to request a quote.',
    });
  };

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
      <div className="p-6 pt-0 flex flex-col gap-2">
        <Button
          onClick={handleAddToCart}
          variant={inCart ? 'outline' : (featured && index === 1 ? 'default' : 'default')}
          className={`w-full rounded-full gap-2 ${
            inCart
              ? 'border-green-600 text-green-600 hover:bg-green-50'
              : featured && index === 1
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          data-testid={`package-add-to-cart-${pkg.id}`}
        >
          <ShoppingCart size={16} />
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
        <Link to="/contact">
          <Button variant="outline" className="w-full rounded-full text-sm">
            Request a Custom Quote
          </Button>
        </Link>
      </div>
    </motion.article>
  );
};

export default PackageCard;
