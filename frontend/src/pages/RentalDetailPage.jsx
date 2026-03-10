import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Package, Info } from 'lucide-react';
import { rentalsApi } from '../lib/api';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import QuoteForm from '../components/QuoteForm';

const ImageThumbnail = ({ img, index, isActive, onClick }) => (
  <button onClick={() => onClick(index)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${isActive ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`} data-testid={`rental-thumbnail-${index}`}>
    <img src={img} alt="" className="w-full h-full object-cover" />
  </button>
);

const SpecRow = ({ label, value }) => (
  <tr className="border-b border-border last:border-b-0">
    <td className="px-4 py-3 font-body text-sm font-medium capitalize">{label.replace(/_/g, ' ')}</td>
    <td className="px-4 py-3 font-body text-sm text-muted-foreground">{Array.isArray(value) ? value.join(', ') : String(value)}</td>
  </tr>
);

const RentalDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  const rental = rentalsApi.getById(id).data;

  if (!rental) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h1 className="font-heading text-2xl mb-4">Item not found</h1>
        <Link to="/rentals"><Button className="rounded-full">Back to Rentals</Button></Link>
      </div>
    );
  }

  const categoryLabel = rental.category;
  const specKeys = rental.specifications ? Object.keys(rental.specifications) : [];

  return (
    <div className="min-h-screen pt-24" data-testid="rental-detail-page">
      <div className="container-custom py-4">
        <Link to="/rentals" className="font-body text-sm text-muted-foreground hover:text-foreground flex items-center gap-2" data-testid="back-to-rentals">
          <ArrowLeft size={16} /> Back to Rentals
        </Link>
      </div>

      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 lg:sticky lg:top-32 lg:self-start">
              <div className="aspect-square rounded-xl overflow-hidden bg-white">
                <img src={rental.images?.[activeImage] ?? rental.images?.[0]} alt={rental.name} className="w-full h-full object-cover" data-testid="rental-main-image" />
              </div>
              {rental.images?.length > 1 && (
                <div className="flex gap-3">
                  <ImageThumbnail img={rental.images[0]} index={0} isActive={activeImage === 0} onClick={setActiveImage} />
                  {rental.images[1] && <ImageThumbnail img={rental.images[1]} index={1} isActive={activeImage === 1} onClick={setActiveImage} />}
                  {rental.images[2] && <ImageThumbnail img={rental.images[2]} index={2} isActive={activeImage === 2} onClick={setActiveImage} />}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">{categoryLabel}</Badge>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="rental-title">{rental.name}</h1>
                <p className="font-body text-muted-foreground leading-relaxed">{rental.description}</p>
              </div>

              {(rental.price_per_day != null || rental.price_per_week != null || rental.price_note) && (
                <div className="p-6 bg-muted rounded-xl">
                  {rental.price_note && !rental.price_per_day && !rental.price_per_week ? (
                    <div>
                      <p className="font-body text-sm text-muted-foreground mb-1">Pricing</p>
                      <p className="font-heading text-xl font-bold text-foreground" data-testid="rental-price-note">{rental.price_note}</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        {rental.price_per_day != null && (
                          <div>
                            <p className="font-body text-sm text-muted-foreground mb-1">Daily Rate</p>
                            <p className="font-heading text-3xl font-bold text-foreground" data-testid="rental-price-daily">{formatPrice(rental.price_per_day)}</p>
                          </div>
                        )}
                        {rental.price_per_week != null && (
                          <div>
                            <p className="font-body text-sm text-muted-foreground mb-1">Weekly Rate</p>
                            <p className="font-heading text-2xl font-bold text-primary" data-testid="rental-price-weekly">{formatPrice(rental.price_per_week)}</p>
                          </div>
                        )}
                      </div>
                      {rental.price_note && (
                        <p className="font-body text-sm text-muted-foreground mt-3">{rental.price_note}</p>
                      )}
                      {rental.min_rental_days != null && (
                        <p className="font-body text-xs text-muted-foreground mt-3">Minimum rental: {rental.min_rental_days} day{rental.min_rental_days > 1 ? 's' : ''}</p>
                      )}
                    </>
                  )}
                </div>
              )}

              {rental.quantity_available != null && (
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-primary" />
                    <div>
                      <p className="font-body text-sm font-medium">{rental.quantity_available} units available</p>
                      <p className="font-body text-xs text-muted-foreground">{rental.is_available ? 'Ready for rental' : 'Currently unavailable'}</p>
                    </div>
                  </div>
                  <Badge className={rental.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {rental.is_available ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              )}

              {specKeys.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Info size={18} /> Specifications</h3>
                  <div className="bg-white rounded-xl border border-border overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {specKeys.map((key) => (
                          <SpecRow key={key} label={key} value={rental.specifications[key]} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Link to="/contact" className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6" data-testid="reserve-now-btn">
                    <Calendar className="mr-2 h-4 w-4" /> Reserve Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted" data-testid="rental-quote-form-section">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">Request a Rental Quote</h2>
              <p className="font-body text-muted-foreground">Tell us about your event and how many units you need.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <QuoteForm rentalId={rental.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalDetailPage;
