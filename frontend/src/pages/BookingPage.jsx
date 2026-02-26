import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { servicesApi, rentalsApi } from '../lib/api';
import { timeSlots as defaultTimeSlots } from '../data';

const TimeSlotButton = ({ slot, selected, onClick }) => (
  <button
    type="button"
    disabled={!slot.available}
    onClick={() => onClick(slot.time)}
    className={`p-3 rounded-lg text-sm font-medium transition-all ${
      selected === slot.time
        ? 'bg-primary text-white'
        : slot.available
        ? 'bg-muted hover:bg-primary/10 text-foreground'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }`}
  >
    {slot.time}
  </button>
);

const ServiceTag = ({ name, selected, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
      selected ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-primary/10'
    }`}
  >
    {name}
  </button>
);

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRentals, setSelectedRentals] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_time: '',
    guest_count: '',
    venue_address: '',
    special_requests: '',
    estimated_budget: '',
  });

  const [errors, setErrors] = useState({});

  // Load data from static files
  const allServices = servicesApi.getAll().data;
  const allRentals = rentalsApi.getAll().data;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, event_time: '' }));
    setShowTimeSlots(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleService = (name) => {
    setSelectedServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const toggleRental = (name) => {
    setSelectedRentals(prev =>
      prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name is required';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone is required';
    if (!formData.event_type) newErrors.event_type = 'Event type is required';
    if (!selectedDate) newErrors.date = 'Please select a date';
    if (!formData.event_time) newErrors.time = 'Please select a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate a short delay for UX, then confirm
    setTimeout(() => {
      const confirmationNumber = `ED-${Date.now().toString(36).toUpperCase()}`;
      setBookingConfirmed({
        confirmation_number: confirmationNumber,
        event_type: formData.event_type,
        event_date: selectedDate.toISOString().split('T')[0],
        event_time: formData.event_time,
        email: formData.email,
      });
      toast.success('Booking Confirmed!', {
        description: `Your confirmation number is ${confirmationNumber}`,
      });
      setIsSubmitting(false);
    }, 800);
  };

  const resetForm = () => {
    setBookingConfirmed(null);
    setFormData({
      name: '', email: '', phone: '', event_type: '', event_time: '',
      guest_count: '', venue_address: '', special_requests: '', estimated_budget: '',
    });
    setSelectedDate(null);
    setShowTimeSlots(false);
    setSelectedServices([]);
    setSelectedRentals([]);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen pt-24" data-testid="booking-confirmed">
        <div className="container-custom section-padding">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
            <p className="font-body text-muted-foreground mb-6">Thank you for booking with E&D Glamour Marketing. We're excited to help make your event unforgettable!</p>

            <div className="bg-muted rounded-xl p-6 mb-8">
              <p className="font-body text-sm text-muted-foreground mb-2">Your Confirmation Number</p>
              <p className="font-heading text-2xl font-bold text-primary tracking-wider">{bookingConfirmed.confirmation_number}</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border text-left space-y-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">Booking Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-xs text-muted-foreground">Event Type</p>
                  <p className="font-body font-medium">{bookingConfirmed.event_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-body font-medium">{bookingConfirmed.event_date} at {bookingConfirmed.event_time}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl">
              <p className="font-body text-sm text-muted-foreground">
                Our team will contact you at <strong>{bookingConfirmed.email}</strong> within 24 hours to discuss details and provide a custom quote.
              </p>
            </div>

            <Button onClick={resetForm} className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">Book Another Event</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  const serviceNames = allServices.slice(0, 6).map(s => s.name);
  const rentalNames = allRentals.slice(0, 6).map(r => r.name);

  return (
    <div className="min-h-screen pt-24" data-testid="booking-page">
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Book Your Event</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Schedule Your Consultation</h1>
            <p className="font-body text-muted-foreground text-lg">Select your preferred date and time, and we'll confirm your booking within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-white rounded-2xl p-6 border border-border mb-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Select Date
                  </h3>
                  <CalendarComponent mode="single" selected={selectedDate} onSelect={handleDateSelect} disabled={isDateDisabled} className="rounded-md border w-full" data-testid="booking-calendar" />
                  {errors.date && <p className="text-xs text-red-500 mt-2">{errors.date}</p>}
                </div>

                {showTimeSlots && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-border">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Select Time
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {defaultTimeSlots.slice(0, 12).map((slot, idx) => (
                        <TimeSlotButton key={`slot-${idx}`} slot={slot} selected={formData.event_time} onClick={(time) => handleInputChange('event_time', time)} />
                      ))}
                    </div>
                    {errors.time && <p className="text-xs text-red-500 mt-2">{errors.time}</p>}
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Your Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-body text-sm">Full Name *</Label>
                        <Input value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Your name" className="input-focus" data-testid="booking-name" />
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body text-sm">Phone *</Label>
                        <Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="(123) 456-7890" className="input-focus" data-testid="booking-phone" />
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Email *</Label>
                      <Input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="your@email.com" className="input-focus" data-testid="booking-email" />
                      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-body text-sm">Event Type *</Label>
                        <Select value={formData.event_type} onValueChange={(v) => handleInputChange('event_type', v)}>
                          <SelectTrigger data-testid="booking-event-type"><SelectValue placeholder="Select type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="baby_shower">Baby Shower</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="graduation">Graduation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.event_type && <p className="text-xs text-red-500">{errors.event_type}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="font-body text-sm">Guest Count</Label>
                        <Input type="number" value={formData.guest_count} onChange={(e) => handleInputChange('guest_count', e.target.value)} placeholder="Approx. guests" className="input-focus" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Venue Address</Label>
                      <Input value={formData.venue_address} onChange={(e) => handleInputChange('venue_address', e.target.value)} placeholder="Event location address" className="input-focus" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Estimated Budget</Label>
                      <Select value={formData.estimated_budget} onValueChange={(v) => handleInputChange('estimated_budget', v)}>
                        <SelectTrigger><SelectValue placeholder="Select budget range" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_500">Under $500</SelectItem>
                          <SelectItem value="500_1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000_2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500_5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000_10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="over_10000">Over $10,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Services Interested In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceNames.map((name, idx) => (
                      <ServiceTag key={`svc-${idx}`} name={name} selected={selectedServices.includes(name)} onClick={toggleService} />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Rentals Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {rentalNames.map((name, idx) => (
                      <ServiceTag key={`rent-${idx}`} name={name} selected={selectedRentals.includes(name)} onClick={toggleRental} />
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Special Requests</h3>
                  <Textarea value={formData.special_requests} onChange={(e) => handleInputChange('special_requests', e.target.value)} placeholder="Any special requirements, themes, or additional details..." rows={4} className="input-focus resize-none" />
                </div>

                <Button type="submit" disabled={isSubmitting || !selectedDate || !formData.event_time} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 text-lg" data-testid="booking-submit">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</span>
                  ) : (
                    <span className="flex items-center justify-center"><CheckCircle className="mr-2 h-5 w-5" /> Confirm Booking</span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
