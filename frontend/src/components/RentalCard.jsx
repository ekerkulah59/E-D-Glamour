import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const RentalCard = ({ rental, index = 0 }) => {
  const shortDesc = rental.short_description ?? rental.shortDescription;
  const hasPrice = rental.price_per_day != null;
  const priceNote = rental.price_note;
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...rental, type: 'rental' }, 1);
    toast.success(`${rental.name} added to cart`, {
      description: 'View your cart to checkout.',
      action: { label: 'View Cart', onClick: () => (window.location.href = '/cart') },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-testid={`rental-card-${rental.id}`}
    >
      <Link to={`/rentals/${rental.id}`}>
        <div className="card-hover bg-white rounded-xl overflow-hidden border border-border/50">
          {/* Image */}
          <div className="image-zoom aspect-square relative">
            <img
              src={rental.images?.[0]}
              alt={`${rental.name} rental in Dover, Delaware`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {rental.quantity_available != null && rental.quantity_available < 10 && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                {rental.quantity_available} left
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {rental.name}
            </h3>
            <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-1">
              {shortDesc}
            </p>
            <div className="flex items-center justify-between mb-3">
              <div>
                {hasPrice ? (
                  <>
                    <span className="font-body text-lg font-semibold text-foreground">
                      {formatPrice(rental.price_per_day)}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">/day</span>
                  </>
                ) : priceNote ? (
                  <span className="font-body text-sm font-medium text-foreground">{priceNote}</span>
                ) : (
                  <span className="font-body text-sm font-medium text-primary">Get quote</span>
                )}
              </div>
              {rental.is_available != null && (
                rental.is_available ? (
                  <span className="font-body text-xs text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="font-body text-xs text-red-500 font-medium">Out of Stock</span>
                )
              )}
            </div>
            {rental.is_available !== false && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs"
                data-testid={`add-to-cart-${rental.id}`}
              >
                <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
              </Button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RentalCard;
