import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import RentalCard from '../components/RentalCard';
import { rentalsApi } from '../lib/api';
import { rentalCategoryLabels } from '../lib/utils';
import { Button } from '../components/ui/button';

const RentalsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const rentalsList = rentalsApi.getAll(activeCategory || undefined).data;

  const categories = [
    { value: '', label: 'All Items' },
    ...Object.entries(rentalCategoryLabels).map(([value, label]) => ({ value, label })),
  ];

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen pt-24" data-testid="rentals-page">
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Rental Catalog</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Event Rentals</h1>
            <p className="font-body text-muted-foreground text-lg">
              Browse our premium collection of chairs, tables, photo booths, and catering
              equipment for your next event.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2" data-testid="rental-category-filters">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={activeCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${activeCategory === cat.value ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-primary/10'}`}
                  onClick={() => handleCategoryChange(cat.value)}
                  data-testid={`rental-filter-${cat.value || 'all'}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {rentalsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-body text-muted-foreground">No items found in this category.</p>
              <Button variant="link" onClick={() => handleCategoryChange('')} className="mt-2 text-primary">View all items</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentalsList.map((rental, index) => (
                <RentalCard key={rental.id} rental={rental} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Delivery Included</h3>
              <p className="font-body text-sm text-muted-foreground">Free delivery and pickup within 25 miles</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Setup Available</h3>
              <p className="font-body text-sm text-muted-foreground">Professional setup and takedown services</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Bulk Discounts</h3>
              <p className="font-body text-sm text-muted-foreground">Special pricing for large orders</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Need help choosing the right items?</h2>
          <p className="font-body text-muted-foreground mb-6">Our team can help you select the perfect rentals for your event.</p>
          <Link to="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8" data-testid="rentals-contact-btn">Get Expert Advice</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RentalsPage;
