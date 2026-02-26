import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { contactApi } from '../lib/api';
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
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_date: z.string().optional(),
  guest_count: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const QuoteForm = ({ serviceId = null, rentalId = null, prefillEventType = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      event_type: prefillEventType,
      event_date: '',
      guest_count: '',
      message: '',
    },
  });

  const eventType = watch('event_type');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        guest_count: data.guest_count ? parseInt(data.guest_count) : null,
        service_id: serviceId,
        rental_id: rentalId,
      };
      
      await contactApi.submitQuote(payload);
      toast.success('Quote request submitted!', {
        description: "We'll get back to you within 24-48 hours.",
      });
      reset();
    } catch (error) {
      toast.error('Failed to submit', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'baby_shower', label: 'Baby Shower' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="quote-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="font-body text-sm">Full Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your full name"
            className="input-focus"
            data-testid="quote-form-name"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-body text-sm">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your@email.com"
            className="input-focus"
            data-testid="quote-form-email"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-body text-sm">Phone *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="(123) 456-7890"
            className="input-focus"
            data-testid="quote-form-phone"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <Label className="font-body text-sm">Event Type *</Label>
          <Select 
            value={eventType} 
            onValueChange={(value) => setValue('event_type', value)}
          >
            <SelectTrigger data-testid="quote-form-event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.event_type && (
            <p className="text-xs text-red-500">{errors.event_type.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Event Date */}
        <div className="space-y-2">
          <Label htmlFor="event_date" className="font-body text-sm">Event Date</Label>
          <Input
            id="event_date"
            type="date"
            {...register('event_date')}
            className="input-focus"
            data-testid="quote-form-date"
          />
        </div>

        {/* Guest Count */}
        <div className="space-y-2">
          <Label htmlFor="guest_count" className="font-body text-sm">Expected Guests</Label>
          <Input
            id="guest_count"
            type="number"
            {...register('guest_count')}
            placeholder="Approximate number"
            className="input-focus"
            data-testid="quote-form-guests"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-body text-sm">Tell us about your event *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Share details about your vision, specific needs, or any questions..."
          rows={5}
          className="input-focus resize-none"
          data-testid="quote-form-message"
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6"
        data-testid="quote-form-submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Request Quote
          </>
        )}
      </Button>
    </form>
  );
};

export default QuoteForm;
