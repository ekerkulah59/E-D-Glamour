import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, Plus, Minus, ShoppingCart, Send, Loader2, CheckCircle, ArrowLeft, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { contactApi } from '../lib/api';
import { formatPrice } from '../lib/utils';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_date: z.string().optional(),
  guest_count: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday Party' },
  { value: 'baby_shower', label: 'Baby Shower' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'other', label: 'Other' },
];

const typeLabel = (type) => {
  if (type === 'service') return 'Service';
  if (type === 'package') return 'Package';
  return 'Rental';
};

const CartPage = () => {
  const { items, removeItem, updateQty, clearCart, cartCount, cartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      event_type: '',
      event_date: '',
      guest_count: '',
      message: '',
    },
  });

  const eventType = watch('event_type');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const cartItems = items.map((i) => ({
        name: i.item.name,
        quantity: i.quantity,
        price: i.item.price_per_day,
        type: i.item.type || 'rental',
        category: i.item.category,
      }));

      await contactApi.submitQuote({ ...data, cart_items: cartItems });

      setSubmitted(true);
      clearCart();
      reset();
      toast.success('Quote request submitted!', {
        description: "We'll get back to you within 24-48 hours.",
      });
    } catch (err) {
      toast.error('Could not send your request', {
        description: err.message || 'Please try again or contact us by phone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center px-6"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Quote Request Sent!</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you! We received your quote request and will contact you within 24-48 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                Browse Services
              </Button>
            </Link>
            <Link to="/rentals">
              <Button variant="outline" className="rounded-full px-8">
                Browse Rentals
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center px-6"
        >
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">Your cart is empty</h1>
          <p className="font-body text-muted-foreground mb-8">
            Browse our services, packages, or rentals and add items to get a quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/services">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
                Browse Services
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="outline" className="rounded-full px-6">
                View Packages
              </Button>
            </Link>
            <Link to="/rentals">
              <Button variant="outline" className="rounded-full px-6">
                Browse Rentals
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const hasKnownTotal = cartTotal > 0;

  return (
    <div className="min-h-screen pt-24" data-testid="cart-page">
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/services" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-2">Your Cart</h1>
            <p className="font-body text-muted-foreground">{cartCount} item{cartCount !== 1 ? 's' : ''} — fill out the form below to request a quote.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="font-heading text-xl font-bold text-foreground">Selected Items</h2>

              {items.map(({ item, quantity }) => (
                <div key={item.id} className="bg-white rounded-xl border border-border p-4 flex gap-4" data-testid={`cart-item-${item.id}`}>
                  {item.images?.[0] ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-foreground mb-1 truncate">{item.name}</h3>
                    <p className="font-body text-xs text-muted-foreground mb-1">{typeLabel(item.type)}{item.category && item.type !== 'package' ? ` · ${item.category}` : ''}</p>
                    {item.price_per_day != null ? (
                      <p className="font-body text-sm font-semibold text-primary mb-2">
                        {formatPrice(item.price_per_day)}{item.type === 'rental' && <span className="text-xs font-normal text-muted-foreground">/day</span>}
                      </p>
                    ) : item.priceLabel ? (
                      <p className="font-body text-sm font-semibold text-primary mb-2">{item.priceLabel}</p>
                    ) : null}
                    <div className="flex items-center justify-between">
                      {item.type !== 'package' ? (
                        <div className="flex items-center border border-border rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, quantity - 1)}
                            className="px-2 py-1 hover:bg-muted transition-colors"
                            data-testid={`cart-qty-decrease-${item.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 font-body text-sm font-semibold min-w-[2rem] text-center">{quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, quantity + 1)}
                            className="px-2 py-1 hover:bg-muted transition-colors"
                            data-testid={`cart-qty-increase-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="font-body text-xs text-muted-foreground">Qty: 1</span>
                      )}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        data-testid={`cart-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Summary */}
              <div className="bg-muted rounded-xl p-5 space-y-3">
                <h3 className="font-heading text-base font-semibold text-foreground">Order Summary</h3>
                {items.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground truncate mr-2">{item.name} × {quantity}</span>
                    <span className="font-medium flex-shrink-0">
                      {item.price_per_day != null
                        ? formatPrice(item.price_per_day * quantity) + (item.type === 'rental' ? '/day' : '')
                        : item.priceLabel || 'Quote required'}
                    </span>
                  </div>
                ))}
                {hasKnownTotal && (
                  <div className="flex justify-between font-heading font-bold text-foreground pt-2 border-t border-border">
                    <span>Estimated Total</span>
                    <span className="text-primary">{formatPrice(cartTotal)}</span>
                  </div>
                )}
                <p className="font-body text-xs text-muted-foreground">
                  * Final pricing depends on your event scope and availability. We'll confirm your quote within 24-48 hours.
                </p>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-border">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Request a Quote</h2>
                <p className="font-body text-muted-foreground mb-8">
                  Tell us about your event and we'll send you a custom quote for your selected items.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="cart-checkout-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-body text-sm">Full Name *</Label>
                      <Input id="name" {...register('name')} placeholder="Your full name" className="input-focus" />
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-body text-sm">Email *</Label>
                      <Input id="email" type="email" {...register('email')} placeholder="your@email.com" className="input-focus" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-body text-sm">Phone *</Label>
                      <Input id="phone" {...register('phone')} placeholder="(123) 456-7890" className="input-focus" />
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Event Type *</Label>
                      <Select value={eventType} onValueChange={(value) => setValue('event_type', value)}>
                        <SelectTrigger><SelectValue placeholder="Select event type" /></SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.event_type && <p className="text-xs text-red-500">{errors.event_type.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="event_date" className="font-body text-sm">Event Date</Label>
                      <Input id="event_date" type="date" {...register('event_date')} className="input-focus" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guest_count" className="font-body text-sm">Expected Guests</Label>
                      <Input id="guest_count" type="number" {...register('guest_count')} placeholder="Approximate number" className="input-focus" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-body text-sm">Additional Notes *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Share details about your event, any specific requirements, or questions about the items..."
                      rows={5}
                      className="input-focus resize-none"
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
                    data-testid="cart-submit-btn"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Request...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Submit Quote Request ({cartCount} item{cartCount !== 1 ? 's' : ''})</>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
