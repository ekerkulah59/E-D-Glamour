# E&D Glamour Marketing - Product Requirements Document

## Original Problem Statement
Build a service-based business website for an event decoration company. The site must include service categories and rental product categories. Each category should list individual services or products, and each item should link to a dedicated detail page with full information (description, images, specifications, pricing or request-a-quote, and availability). Core services include event décor for various occasions, and rentals include chairs, tables, photo booths, and food catering equipment.

## User Preferences
- **Business Name**: E&D Glamour Marketing
- **Design Style**: Modern & Minimalist (clean lines, neutral tones)
- **Color Theme**: Light theme (clean, airy)
- **Contact System**: Simple contact form + Online Booking System
- **Additional Features**: Testimonials, Photo Gallery, FAQ, Blog, Email Notifications

## Architecture
- **Frontend**: React with Tailwind CSS, Shadcn/UI components, Framer Motion
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **Email Service**: Resend (configured, needs API key to activate)
- **Styling**: Organic & Earthy theme (Sage Green #8DA399, Gold Accent #D4AF37)
- **Typography**: Playfair Display (headings), Manrope (body)

## User Personas
1. **Event Planners** - Professional planners seeking décor services and rentals
2. **Couples** - Planning weddings and anniversaries
3. **Corporate Clients** - Organizing corporate events and galas
4. **Party Hosts** - Planning birthdays, baby showers, graduations

## Core Requirements (Static)
- Service categories listing (6 categories)
- Rental product categories (6 categories)  
- Individual detail pages with full information
- Quote request functionality
- Online booking with calendar
- Email notifications
- Responsive design
- Professional aesthetic

## What's Been Implemented

### Phase 1 (Initial MVP):
- ✅ Homepage with hero, stats, featured services, testimonials, CTA
- ✅ Services page with category filtering
- ✅ Service detail page with images, pricing, features, quote form
- ✅ Rentals page with category filtering
- ✅ Rental detail page with specs, availability, quote form
- ✅ Gallery page with image filtering
- ✅ Testimonials page
- ✅ FAQ page with accordion
- ✅ Blog page with tag filtering
- ✅ Blog detail page
- ✅ About page with team and company info
- ✅ Contact page with quote form

### Phase 2 (Current Update):
- ✅ Brand updated to "E&D Glamour Marketing"
- ✅ Online Booking System with Calendar (/book)
  - Date picker with available/unavailable dates
  - Time slot selection (12 slots per day)
  - Services and rentals selection
  - Guest count, venue, budget fields
  - Confirmation number generation
- ✅ Email Notification System (Resend)
  - Quote submission notifications to admin
  - Booking confirmation emails to customers
  - Booking notification emails to admin
  - HTML-formatted professional emails

### Backend APIs:
- ✅ Services CRUD (/api/services)
- ✅ Rentals CRUD (/api/rentals)
- ✅ Testimonials (/api/testimonials)
- ✅ Gallery (/api/gallery)
- ✅ FAQ (/api/faq)
- ✅ Blog (/api/blog)
- ✅ Contact/Quote submission (/api/contact)
- ✅ Bookings CRUD (/api/bookings)
- ✅ Availability check (/api/availability)
- ✅ Booked dates (/api/booked-dates)
- ✅ Email status (/api/email-status)

## Email Configuration (To Activate)
Add these to `/app/backend/.env`:
```
RESEND_API_KEY=re_your_api_key_here
SENDER_EMAIL=your-verified-email@domain.com
NOTIFICATION_EMAIL=admin@edglamour.com
```
Get API key at: https://resend.com (100 emails/day free)

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Core service and rental listings
- [x] Detail pages with full information
- [x] Quote request form
- [x] Basic navigation and routing
- [x] Online booking with calendar
- [x] Email notifications (code ready)

### P1 (High Priority) - COMPLETED
- [x] Testimonials section
- [x] Gallery/Portfolio
- [x] FAQ page
- [x] Blog section
- [x] About page
- [x] Contact page
- [x] Booking confirmation system

### P2 (Nice to Have) - Future
- [ ] Admin dashboard for managing content
- [ ] User authentication for saved bookings
- [ ] Google Calendar sync for real-time availability
- [ ] Payment integration (deposit collection)
- [ ] SMS notifications via Twilio
- [ ] Image upload functionality

## Next Tasks
1. Get Resend API key and configure email notifications
2. Add admin panel for content management
3. Implement payment collection for deposits
4. Add Google Calendar integration for availability sync
5. Build SMS notification system
