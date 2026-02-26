from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from enum import Enum

# Try to import resend, but don't fail if not configured
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '')

if RESEND_API_KEY and RESEND_AVAILABLE:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class ServiceCategory(str, Enum):
    WEDDING = "wedding"
    CORPORATE = "corporate"
    BIRTHDAY = "birthday"
    BABY_SHOWER = "baby_shower"
    ANNIVERSARY = "anniversary"
    GRADUATION = "graduation"

class RentalCategory(str, Enum):
    CHAIRS = "chairs"
    TABLES = "tables"
    PHOTO_BOOTHS = "photo_booths"
    CATERING_EQUIPMENT = "catering_equipment"
    LINENS = "linens"
    LIGHTING = "lighting"

class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

# Models
class ServiceItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: ServiceCategory
    description: str
    short_description: str
    images: List[str]
    starting_price: Optional[float] = None
    price_note: str = "Contact for quote"
    features: List[str]
    is_available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ServiceItemCreate(BaseModel):
    name: str
    category: ServiceCategory
    description: str
    short_description: str
    images: List[str]
    starting_price: Optional[float] = None
    price_note: str = "Contact for quote"
    features: List[str]
    is_available: bool = True

class RentalItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: RentalCategory
    description: str
    short_description: str
    images: List[str]
    price_per_day: float
    price_per_week: Optional[float] = None
    specifications: dict
    quantity_available: int
    min_rental_days: int = 1
    is_available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RentalItemCreate(BaseModel):
    name: str
    category: RentalCategory
    description: str
    short_description: str
    images: List[str]
    price_per_day: float
    price_per_week: Optional[float] = None
    specifications: dict
    quantity_available: int
    min_rental_days: int = 1
    is_available: bool = True

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    event_type: str
    rating: int = Field(ge=1, le=5)
    review: str
    image: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    client_name: str
    event_type: str
    rating: int = Field(ge=1, le=5)
    review: str
    image: Optional[str] = None
    is_featured: bool = False

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    title: str
    category: str
    event_type: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImageCreate(BaseModel):
    url: str
    title: str
    category: str
    event_type: Optional[str] = None
    is_featured: bool = False

class FAQItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    category: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class FAQItemCreate(BaseModel):
    question: str
    answer: str
    category: str
    order: int = 0

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: str
    author: str
    tags: List[str]
    is_published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: str
    author: str
    tags: List[str]
    is_published: bool = True

class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: Optional[str] = None
    guest_count: Optional[int] = None
    message: str
    service_id: Optional[str] = None
    rental_id: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: Optional[str] = None
    guest_count: Optional[int] = None
    message: str
    service_id: Optional[str] = None
    rental_id: Optional[str] = None

# Booking Models
class TimeSlot(BaseModel):
    time: str
    available: bool = True

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: str
    event_time: str
    guest_count: Optional[int] = None
    venue_address: Optional[str] = None
    services_needed: List[str] = []
    rentals_needed: List[str] = []
    special_requests: Optional[str] = None
    estimated_budget: Optional[str] = None
    status: BookingStatus = BookingStatus.PENDING
    confirmation_number: str = Field(default_factory=lambda: f"EDG-{uuid.uuid4().hex[:8].upper()}")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: str
    event_time: str
    guest_count: Optional[int] = None
    venue_address: Optional[str] = None
    services_needed: List[str] = []
    rentals_needed: List[str] = []
    special_requests: Optional[str] = None
    estimated_budget: Optional[str] = None

class AvailabilityCheck(BaseModel):
    date: str

class AvailabilityResponse(BaseModel):
    date: str
    available: bool
    time_slots: List[TimeSlot]
    booked_count: int

# Helper to convert datetime to ISO string
def serialize_doc(doc):
    if 'created_at' in doc and isinstance(doc['created_at'], datetime):
        doc['created_at'] = doc['created_at'].isoformat()
    return doc

# Email Helper Functions
async def send_email_notification(to_email: str, subject: str, html_content: str):
    """Send email notification using Resend"""
    if not RESEND_API_KEY or not RESEND_AVAILABLE:
        logging.info(f"Email not configured. Would send to {to_email}: {subject}")
        return {"status": "skipped", "message": "Email not configured"}
    
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [to_email],
            "subject": subject,
            "html": html_content
        }
        email = await asyncio.to_thread(resend.Emails.send, params)
        logging.info(f"Email sent to {to_email}")
        return {"status": "sent", "email_id": email.get("id")}
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return {"status": "failed", "error": str(e)}

def generate_quote_email_html(quote: QuoteRequest) -> str:
    """Generate HTML email for quote notification"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #8DA399; color: white; padding: 30px; text-align: center; }}
            .header h1 {{ margin: 0; font-size: 24px; }}
            .content {{ padding: 30px; background: #FAFAF9; }}
            .detail-row {{ padding: 10px 0; border-bottom: 1px solid #E2E2DF; }}
            .label {{ font-weight: 600; color: #64748B; font-size: 12px; text-transform: uppercase; }}
            .value {{ font-size: 16px; margin-top: 5px; }}
            .message-box {{ background: white; padding: 15px; border-radius: 8px; margin-top: 15px; }}
            .footer {{ text-align: center; padding: 20px; color: #64748B; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Quote Request</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">E&D Glamour Marketing</p>
            </div>
            <div class="content">
                <div class="detail-row">
                    <div class="label">Client Name</div>
                    <div class="value">{quote.name}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Email</div>
                    <div class="value">{quote.email}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Phone</div>
                    <div class="value">{quote.phone}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Event Type</div>
                    <div class="value">{quote.event_type.replace('_', ' ').title()}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Event Date</div>
                    <div class="value">{quote.event_date or 'Not specified'}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Guest Count</div>
                    <div class="value">{quote.guest_count or 'Not specified'}</div>
                </div>
                <div class="message-box">
                    <div class="label">Message</div>
                    <div class="value" style="margin-top: 10px;">{quote.message}</div>
                </div>
            </div>
            <div class="footer">
                <p>This quote was submitted on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
            </div>
        </div>
    </body>
    </html>
    """

def generate_booking_confirmation_html(booking: Booking) -> str:
    """Generate HTML email for booking confirmation"""
    services_list = ', '.join(booking.services_needed) if booking.services_needed else 'None selected'
    rentals_list = ', '.join(booking.rentals_needed) if booking.rentals_needed else 'None selected'
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #8DA399 0%, #6B8A7A 100%); color: white; padding: 40px 30px; text-align: center; }}
            .header h1 {{ margin: 0; font-size: 28px; }}
            .confirmation-number {{ background: rgba(255,255,255,0.2); display: inline-block; padding: 10px 20px; border-radius: 8px; margin-top: 15px; font-size: 18px; letter-spacing: 2px; }}
            .content {{ padding: 30px; background: #FAFAF9; }}
            .section-title {{ color: #8DA399; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-weight: 600; }}
            .detail-row {{ padding: 12px 0; border-bottom: 1px solid #E2E2DF; display: flex; justify-content: space-between; }}
            .label {{ color: #64748B; }}
            .value {{ font-weight: 500; }}
            .highlight-box {{ background: #D4AF37; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }}
            .footer {{ text-align: center; padding: 30px; color: #64748B; font-size: 12px; background: #F0F0EB; }}
            .btn {{ display: inline-block; background: #8DA399; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin-top: 10px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmed!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">E&D Glamour Marketing</p>
                <div class="confirmation-number">{booking.confirmation_number}</div>
            </div>
            <div class="content">
                <p>Dear {booking.name},</p>
                <p>Thank you for booking with E&D Glamour Marketing! We're excited to help make your event unforgettable.</p>
                
                <div style="margin-top: 30px;">
                    <div class="section-title">Event Details</div>
                    <div class="detail-row">
                        <span class="label">Event Type</span>
                        <span class="value">{booking.event_type.replace('_', ' ').title()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Date</span>
                        <span class="value">{booking.event_date}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Time</span>
                        <span class="value">{booking.event_time}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Guest Count</span>
                        <span class="value">{booking.guest_count or 'TBD'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Venue</span>
                        <span class="value">{booking.venue_address or 'TBD'}</span>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <div class="section-title">Services & Rentals</div>
                    <div class="detail-row">
                        <span class="label">Services</span>
                        <span class="value">{services_list}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Rentals</span>
                        <span class="value">{rentals_list}</span>
                    </div>
                </div>
                
                <div class="highlight-box">
                    <p style="margin: 0; font-size: 14px;">Our team will contact you within 24 hours to discuss details and provide a custom quote.</p>
                </div>
            </div>
            <div class="footer">
                <p><strong>E&D Glamour Marketing</strong></p>
                <p>123 Event Lane, Suite 100 • Los Angeles, CA 90001</p>
                <p>(123) 456-7890 • hello@edglamour.com</p>
            </div>
        </div>
    </body>
    </html>
    """

def generate_booking_notification_html(booking: Booking) -> str:
    """Generate HTML email for admin notification of new booking"""
    services_list = ', '.join(booking.services_needed) if booking.services_needed else 'None'
    rentals_list = ', '.join(booking.rentals_needed) if booking.rentals_needed else 'None'
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1A1A1A; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: #D4AF37; color: white; padding: 30px; text-align: center; }}
            .header h1 {{ margin: 0; font-size: 24px; }}
            .content {{ padding: 30px; background: #FAFAF9; }}
            .detail-row {{ padding: 10px 0; border-bottom: 1px solid #E2E2DF; }}
            .label {{ font-weight: 600; color: #64748B; font-size: 12px; text-transform: uppercase; }}
            .value {{ font-size: 16px; margin-top: 5px; }}
            .urgent {{ background: #FEF3C7; border: 1px solid #D4AF37; padding: 15px; border-radius: 8px; margin-bottom: 20px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 New Booking Received!</h1>
                <p style="margin: 10px 0 0 0;">Confirmation: {booking.confirmation_number}</p>
            </div>
            <div class="content">
                <div class="urgent">
                    <strong>Action Required:</strong> Please contact the client within 24 hours to confirm details.
                </div>
                
                <div class="detail-row">
                    <div class="label">Client Name</div>
                    <div class="value">{booking.name}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Email</div>
                    <div class="value">{booking.email}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Phone</div>
                    <div class="value">{booking.phone}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Event Type</div>
                    <div class="value">{booking.event_type.replace('_', ' ').title()}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Date & Time</div>
                    <div class="value">{booking.event_date} at {booking.event_time}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Guest Count</div>
                    <div class="value">{booking.guest_count or 'Not specified'}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Venue</div>
                    <div class="value">{booking.venue_address or 'Not specified'}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Services Requested</div>
                    <div class="value">{services_list}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Rentals Requested</div>
                    <div class="value">{rentals_list}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Budget Range</div>
                    <div class="value">{booking.estimated_budget or 'Not specified'}</div>
                </div>
                <div class="detail-row">
                    <div class="label">Special Requests</div>
                    <div class="value">{booking.special_requests or 'None'}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "E&D Glamour Marketing API"}

# Services endpoints
@api_router.get("/services", response_model=List[ServiceItem])
async def get_services(category: Optional[ServiceCategory] = None):
    query = {}
    if category:
        query["category"] = category
    services = await db.services.find(query, {"_id": 0}).to_list(100)
    for s in services:
        if isinstance(s.get('created_at'), str):
            s['created_at'] = datetime.fromisoformat(s['created_at'])
    return services

@api_router.get("/services/{service_id}", response_model=ServiceItem)
async def get_service(service_id: str):
    service = await db.services.find_one({"id": service_id}, {"_id": 0})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    if isinstance(service.get('created_at'), str):
        service['created_at'] = datetime.fromisoformat(service['created_at'])
    return service

@api_router.post("/services", response_model=ServiceItem)
async def create_service(input: ServiceItemCreate):
    service = ServiceItem(**input.model_dump())
    doc = service.model_dump()
    doc = serialize_doc(doc)
    await db.services.insert_one(doc)
    return service

# Rentals endpoints
@api_router.get("/rentals", response_model=List[RentalItem])
async def get_rentals(category: Optional[RentalCategory] = None):
    query = {}
    if category:
        query["category"] = category
    rentals = await db.rentals.find(query, {"_id": 0}).to_list(100)
    for r in rentals:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rentals

@api_router.get("/rentals/{rental_id}", response_model=RentalItem)
async def get_rental(rental_id: str):
    rental = await db.rentals.find_one({"id": rental_id}, {"_id": 0})
    if not rental:
        raise HTTPException(status_code=404, detail="Rental item not found")
    if isinstance(rental.get('created_at'), str):
        rental['created_at'] = datetime.fromisoformat(rental['created_at'])
    return rental

@api_router.post("/rentals", response_model=RentalItem)
async def create_rental(input: RentalItemCreate):
    rental = RentalItem(**input.model_dump())
    doc = rental.model_dump()
    doc = serialize_doc(doc)
    await db.rentals.insert_one(doc)
    return rental

# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(featured_only: bool = False):
    query = {"is_featured": True} if featured_only else {}
    testimonials = await db.testimonials.find(query, {"_id": 0}).to_list(50)
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial = Testimonial(**input.model_dump())
    doc = testimonial.model_dump()
    doc = serialize_doc(doc)
    await db.testimonials.insert_one(doc)
    return testimonial

# Gallery endpoints
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery(category: Optional[str] = None, featured_only: bool = False):
    query = {}
    if category:
        query["category"] = category
    if featured_only:
        query["is_featured"] = True
    gallery = await db.gallery.find(query, {"_id": 0}).to_list(100)
    for g in gallery:
        if isinstance(g.get('created_at'), str):
            g['created_at'] = datetime.fromisoformat(g['created_at'])
    return gallery

@api_router.post("/gallery", response_model=GalleryImage)
async def create_gallery_image(input: GalleryImageCreate):
    image = GalleryImage(**input.model_dump())
    doc = image.model_dump()
    doc = serialize_doc(doc)
    await db.gallery.insert_one(doc)
    return image

# FAQ endpoints
@api_router.get("/faq", response_model=List[FAQItem])
async def get_faq(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    faq = await db.faq.find(query, {"_id": 0}).sort("order", 1).to_list(50)
    for f in faq:
        if isinstance(f.get('created_at'), str):
            f['created_at'] = datetime.fromisoformat(f['created_at'])
    return faq

@api_router.post("/faq", response_model=FAQItem)
async def create_faq(input: FAQItemCreate):
    faq = FAQItem(**input.model_dump())
    doc = faq.model_dump()
    doc = serialize_doc(doc)
    await db.faq.insert_one(doc)
    return faq

# Blog endpoints
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(tag: Optional[str] = None):
    query = {"is_published": True}
    if tag:
        query["tags"] = tag
    posts = await db.blog.find(query, {"_id": 0}).sort("created_at", -1).to_list(50)
    for p in posts:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog.find_one({"slug": slug, "is_published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    post = BlogPost(**input.model_dump())
    doc = post.model_dump()
    doc = serialize_doc(doc)
    await db.blog.insert_one(doc)
    return post

# Contact/Quote Request endpoint with email notification
@api_router.post("/contact", response_model=QuoteRequest)
async def submit_quote_request(input: QuoteRequestCreate):
    quote = QuoteRequest(**input.model_dump())
    doc = quote.model_dump()
    doc = serialize_doc(doc)
    await db.quote_requests.insert_one(doc)
    
    # Send email notification to admin
    if NOTIFICATION_EMAIL:
        await send_email_notification(
            NOTIFICATION_EMAIL,
            f"New Quote Request from {quote.name} - {quote.event_type.replace('_', ' ').title()}",
            generate_quote_email_html(quote)
        )
    
    return quote

@api_router.get("/quote-requests", response_model=List[QuoteRequest])
async def get_quote_requests():
    requests = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for r in requests:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return requests

# Booking endpoints
@api_router.post("/bookings", response_model=Booking)
async def create_booking(input: BookingCreate):
    booking = Booking(**input.model_dump())
    doc = booking.model_dump()
    doc = serialize_doc(doc)
    await db.bookings.insert_one(doc)
    
    # Send confirmation email to customer
    await send_email_notification(
        booking.email,
        f"Booking Confirmed - {booking.confirmation_number} | E&D Glamour Marketing",
        generate_booking_confirmation_html(booking)
    )
    
    # Send notification email to admin
    if NOTIFICATION_EMAIL:
        await send_email_notification(
            NOTIFICATION_EMAIL,
            f"🎉 New Booking: {booking.name} - {booking.event_date}",
            generate_booking_notification_html(booking)
        )
    
    return booking

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(status: Optional[BookingStatus] = None):
    query = {}
    if status:
        query["status"] = status
    bookings = await db.bookings.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    for b in bookings:
        if isinstance(b.get('created_at'), str):
            b['created_at'] = datetime.fromisoformat(b['created_at'])
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if isinstance(booking.get('created_at'), str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return booking

@api_router.get("/bookings/confirmation/{confirmation_number}", response_model=Booking)
async def get_booking_by_confirmation(confirmation_number: str):
    booking = await db.bookings.find_one({"confirmation_number": confirmation_number}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if isinstance(booking.get('created_at'), str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return booking

@api_router.patch("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: BookingStatus):
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Status updated", "status": status}

# Availability check endpoint
@api_router.post("/availability", response_model=AvailabilityResponse)
async def check_availability(input: AvailabilityCheck):
    # Get bookings for the specified date
    bookings_on_date = await db.bookings.count_documents({
        "event_date": input.date,
        "status": {"$ne": "cancelled"}
    })
    
    # Define time slots
    all_time_slots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
        "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
    ]
    
    # Get booked time slots
    booked_times = await db.bookings.distinct("event_time", {
        "event_date": input.date,
        "status": {"$ne": "cancelled"}
    })
    
    time_slots = [
        TimeSlot(time=slot, available=slot not in booked_times)
        for slot in all_time_slots
    ]
    
    # Maximum 3 bookings per day
    is_available = bookings_on_date < 3
    
    return AvailabilityResponse(
        date=input.date,
        available=is_available,
        time_slots=time_slots,
        booked_count=bookings_on_date
    )

@api_router.get("/booked-dates")
async def get_booked_dates():
    """Get all dates that are fully booked (3+ bookings)"""
    pipeline = [
        {"$match": {"status": {"$ne": "cancelled"}}},
        {"$group": {"_id": "$event_date", "count": {"$sum": 1}}},
        {"$match": {"count": {"$gte": 3}}},
        {"$project": {"date": "$_id", "_id": 0}}
    ]
    result = await db.bookings.aggregate(pipeline).to_list(100)
    return [r["date"] for r in result]

# Email configuration status
@api_router.get("/email-status")
async def get_email_status():
    return {
        "configured": bool(RESEND_API_KEY),
        "sender_email": SENDER_EMAIL if RESEND_API_KEY else None,
        "notification_email": NOTIFICATION_EMAIL if NOTIFICATION_EMAIL else None
    }

# Seed data endpoint
@api_router.post("/seed")
async def seed_database():
    # Check if already seeded
    existing = await db.services.count_documents({})
    if existing > 0:
        return {"message": "Database already seeded"}
    
    # Seed Services
    services_data = [
        {
            "name": "Wedding Décor",
            "category": "wedding",
            "description": "Transform your special day into a breathtaking celebration with our comprehensive wedding décor services. From elegant floral arrangements to stunning table settings, we create magical atmospheres that reflect your unique love story. Our team works closely with you to understand your vision, whether it's a romantic garden wedding, a glamorous ballroom affair, or a rustic barn celebration.",
            "short_description": "Elegant and romantic wedding decorations tailored to your dream day.",
            "images": [
                "https://images.unsplash.com/photo-1768777270907-235286662f98?w=800",
                "https://images.unsplash.com/photo-1761110840708-9d6814876068?w=800",
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
            ],
            "starting_price": 2500,
            "price_note": "Starting from $2,500 - Custom quotes available",
            "features": ["Floral Arrangements", "Table Settings", "Backdrop Design", "Aisle Decoration", "Centerpieces", "Lighting Design"],
            "is_available": True
        },
        {
            "name": "Corporate Event Décor",
            "category": "corporate",
            "description": "Elevate your corporate events with professional décor that impresses clients and motivates teams. We specialize in creating sophisticated environments for conferences, product launches, galas, and team celebrations. Our designs incorporate your brand identity while maintaining an elegant, professional atmosphere.",
            "short_description": "Professional décor solutions for impactful corporate events.",
            "images": [
                "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?w=800",
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
            ],
            "starting_price": 1500,
            "price_note": "Starting from $1,500 - Volume discounts available",
            "features": ["Brand Integration", "Stage Design", "Networking Lounge Setup", "Award Ceremony Décor", "Exhibition Displays", "Digital Signage Integration"],
            "is_available": True
        },
        {
            "name": "Birthday Party Décor",
            "category": "birthday",
            "description": "Make every birthday unforgettable with our creative party decorations. From whimsical children's parties to elegant milestone celebrations, we bring your vision to life with custom themes, balloon artistry, and stunning backdrops. Our team creates Instagram-worthy setups that make memories last forever.",
            "short_description": "Fun and creative birthday decorations for all ages.",
            "images": [
                "https://images.unsplash.com/photo-1758870041148-31d28fdf34d9?w=800",
                "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800"
            ],
            "starting_price": 500,
            "price_note": "Packages starting from $500",
            "features": ["Theme Development", "Balloon Arrangements", "Photo Backdrops", "Table Décor", "Cake Display", "Party Favors Setup"],
            "is_available": True
        },
        {
            "name": "Baby Shower Décor",
            "category": "baby_shower",
            "description": "Welcome the little one in style with our charming baby shower decorations. We create sweet and memorable celebrations with gender-reveal setups, nursery-inspired themes, and delicate color palettes that delight guests and honor parents-to-be.",
            "short_description": "Sweet and memorable baby shower decorations.",
            "images": [
                "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
                "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800"
            ],
            "starting_price": 400,
            "price_note": "Starting from $400",
            "features": ["Gender Reveal Setups", "Custom Backdrops", "Dessert Table Styling", "Balloon Garlands", "Welcome Signs", "Gift Table Décor"],
            "is_available": True
        },
        {
            "name": "Anniversary Celebration Décor",
            "category": "anniversary",
            "description": "Celebrate years of love with elegant anniversary decorations. Whether it's a intimate dinner for two or a grand celebration with family and friends, we create romantic settings that honor your journey together.",
            "short_description": "Romantic anniversary decorations to celebrate your love story.",
            "images": [
                "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800",
                "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800"
            ],
            "starting_price": 600,
            "price_note": "Starting from $600",
            "features": ["Romantic Lighting", "Floral Centerpieces", "Memory Displays", "Custom Backdrops", "Candlelight Settings", "Photo Booth Setup"],
            "is_available": True
        },
        {
            "name": "Graduation Party Décor",
            "category": "graduation",
            "description": "Congratulate your graduate with festive decorations that celebrate their achievement. From high school to doctorate, we create celebratory environments with school colors, achievement displays, and photo-worthy moments.",
            "short_description": "Celebratory decorations for graduation milestones.",
            "images": [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
                "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800"
            ],
            "starting_price": 450,
            "price_note": "Starting from $450",
            "features": ["School Colors Theme", "Achievement Displays", "Photo Backdrops", "Balloon Arrangements", "Centerpieces", "Memory Timeline"],
            "is_available": True
        }
    ]
    
    for s in services_data:
        service = ServiceItem(**s)
        doc = service.model_dump()
        doc = serialize_doc(doc)
        await db.services.insert_one(doc)
    
    # Seed Rentals
    rentals_data = [
        {
            "name": "Chiavari Chairs - Gold",
            "category": "chairs",
            "description": "Elegant gold Chiavari chairs perfect for weddings, galas, and upscale events. These classic chairs feature a timeless design with comfortable cushioned seats available in various colors.",
            "short_description": "Classic gold Chiavari chairs for elegant events.",
            "images": [
                "https://images.unsplash.com/photo-1680169256615-19edb85cb7db?w=800",
                "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800"
            ],
            "price_per_day": 8.50,
            "price_per_week": 45.00,
            "specifications": {"material": "Resin", "color": "Gold", "weight_capacity": "400 lbs", "cushion_colors": ["White", "Ivory", "Black", "Navy"]},
            "quantity_available": 200,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Cross-Back Farm Chairs",
            "category": "chairs",
            "description": "Rustic cross-back wooden chairs perfect for farmhouse and vineyard weddings. These sturdy chairs add a touch of natural elegance to any outdoor or barn event.",
            "short_description": "Rustic wooden cross-back chairs for farm-style events.",
            "images": [
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
            ],
            "price_per_day": 10.00,
            "price_per_week": 55.00,
            "specifications": {"material": "Beechwood", "color": "Natural Wood", "weight_capacity": "350 lbs", "style": "Rustic"},
            "quantity_available": 150,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Rectangular Banquet Tables",
            "category": "tables",
            "description": "Classic 8-foot rectangular banquet tables ideal for seated dinners and buffet setups. Sturdy construction with foldable legs for easy setup and transport.",
            "short_description": "8-foot banquet tables for seated dinners.",
            "images": [
                "https://images.unsplash.com/photo-1603920354140-cab69c15e672?w=800"
            ],
            "price_per_day": 15.00,
            "price_per_week": 80.00,
            "specifications": {"dimensions": "96\" x 30\"", "seats": "8-10 guests", "material": "Plastic/Wood top", "foldable": True},
            "quantity_available": 50,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Round Tables - 60 inch",
            "category": "tables",
            "description": "60-inch round tables perfect for wedding receptions and gala events. Seats 8-10 guests comfortably and pairs beautifully with floor-length linens.",
            "short_description": "60-inch round tables seating 8-10 guests.",
            "images": [
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
            ],
            "price_per_day": 18.00,
            "price_per_week": 95.00,
            "specifications": {"diameter": "60 inches", "seats": "8-10 guests", "height": "30 inches", "foldable": True},
            "quantity_available": 40,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Classic Photo Booth",
            "category": "photo_booths",
            "description": "Our classic enclosed photo booth creates memorable moments with high-quality prints, custom backdrops, and a vast selection of props. Includes attendant, unlimited prints, and digital gallery.",
            "short_description": "Classic enclosed photo booth with props and prints.",
            "images": [
                "https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800"
            ],
            "price_per_day": 350.00,
            "price_per_week": None,
            "specifications": {"type": "Enclosed booth", "prints": "Unlimited 4x6", "props": "Included", "attendant": "Included", "digital_gallery": "Yes"},
            "quantity_available": 3,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "360 Video Booth",
            "category": "photo_booths",
            "description": "Create viral-worthy content with our 360-degree video booth. Guests step onto the platform while the camera rotates around them, creating stunning slow-motion videos perfect for social media.",
            "short_description": "360-degree video booth for viral content creation.",
            "images": [
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"
            ],
            "price_per_day": 500.00,
            "price_per_week": None,
            "specifications": {"platform_size": "39 inches", "video_length": "10-15 seconds", "sharing": "Instant social media", "attendant": "Included"},
            "quantity_available": 2,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Chafing Dish Set",
            "category": "catering_equipment",
            "description": "Professional-grade stainless steel chafing dishes for buffet service. Set includes water pan, food pan, lid, and fuel holders. Perfect for keeping food warm during events.",
            "short_description": "Stainless steel chafing dishes for buffet service.",
            "images": [
                "https://images.unsplash.com/photo-1768725847223-8407142e653a?w=800"
            ],
            "price_per_day": 25.00,
            "price_per_week": 120.00,
            "specifications": {"material": "Stainless Steel", "capacity": "8 quarts", "includes": ["Water pan", "Food pan", "Lid", "Frame", "Fuel holders"]},
            "quantity_available": 30,
            "min_rental_days": 1,
            "is_available": True
        },
        {
            "name": "Beverage Dispenser Tower",
            "category": "catering_equipment",
            "description": "Elegant glass beverage dispensers stacked on a decorative tower. Perfect for lemonade stations, water service, or signature cocktails at your event.",
            "short_description": "Decorative glass beverage dispenser tower.",
            "images": [
                "https://images.unsplash.com/photo-1527761939622-933c72f6f4e3?w=800"
            ],
            "price_per_day": 45.00,
            "price_per_week": 200.00,
            "specifications": {"dispensers": "3 tier", "capacity": "2 gallons each", "material": "Glass with metal stand", "spigot": "Stainless steel"},
            "quantity_available": 10,
            "min_rental_days": 1,
            "is_available": True
        }
    ]
    
    for r in rentals_data:
        rental = RentalItem(**r)
        doc = rental.model_dump()
        doc = serialize_doc(doc)
        await db.rentals.insert_one(doc)
    
    # Seed Testimonials
    testimonials_data = [
        {
            "client_name": "Sarah & Michael Thompson",
            "event_type": "Wedding",
            "rating": 5,
            "review": "E&D Glamour Marketing transformed our wedding into a fairytale! The attention to detail was extraordinary - from the stunning floral arrangements to the elegant table settings. Our guests couldn't stop complimenting the décor. Worth every penny!",
            "image": "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
            "is_featured": True
        },
        {
            "client_name": "Jennifer Martinez",
            "event_type": "Corporate Gala",
            "rating": 5,
            "review": "We've worked with many event decorators, but E&D Glamour Marketing stands out. They understood our brand perfectly and created an impressive atmosphere for our annual gala. Professional, creative, and reliable.",
            "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            "is_featured": True
        },
        {
            "client_name": "The Anderson Family",
            "event_type": "50th Birthday",
            "rating": 5,
            "review": "My mother's 50th birthday party was absolutely magical thanks to E&D Glamour Marketing. The balloon arrangements and photo backdrop were Instagram-worthy. They made the planning process so easy!",
            "image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
            "is_featured": True
        },
        {
            "client_name": "Emily Chen",
            "event_type": "Baby Shower",
            "rating": 5,
            "review": "The most beautiful baby shower setup I've ever seen! The team was incredibly creative and brought my vision to life perfectly. Every detail was thoughtful and elegant.",
            "is_featured": False
        },
        {
            "client_name": "Robert & Linda Davis",
            "event_type": "Anniversary",
            "rating": 5,
            "review": "For our 25th anniversary, we wanted something special. E&D Glamour Marketing delivered beyond our expectations. The romantic ambiance they created was perfect for celebrating our love story.",
            "is_featured": False
        }
    ]
    
    for t in testimonials_data:
        testimonial = Testimonial(**t)
        doc = testimonial.model_dump()
        doc = serialize_doc(doc)
        await db.testimonials.insert_one(doc)
    
    # Seed Gallery
    gallery_data = [
        {"url": "https://images.unsplash.com/photo-1768777270907-235286662f98?w=800", "title": "Elegant Wedding Reception", "category": "wedding", "event_type": "Wedding", "is_featured": True},
        {"url": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", "title": "Romantic Garden Wedding", "category": "wedding", "event_type": "Wedding", "is_featured": True},
        {"url": "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?w=800", "title": "Corporate Atrium Event", "category": "corporate", "event_type": "Corporate", "is_featured": True},
        {"url": "https://images.unsplash.com/photo-1758870041148-31d28fdf34d9?w=800", "title": "Birthday Balloon Display", "category": "birthday", "event_type": "Birthday", "is_featured": True},
        {"url": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800", "title": "Gala Table Setting", "category": "corporate", "event_type": "Gala", "is_featured": False},
        {"url": "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800", "title": "Sweet Baby Shower", "category": "baby_shower", "event_type": "Baby Shower", "is_featured": False}
    ]
    
    for g in gallery_data:
        image = GalleryImage(**g)
        doc = image.model_dump()
        doc = serialize_doc(doc)
        await db.gallery.insert_one(doc)
    
    # Seed FAQ
    faq_data = [
        {"question": "How far in advance should I book?", "answer": "We recommend booking at least 4-6 weeks in advance for most events, and 3-6 months for weddings. However, we do our best to accommodate last-minute requests when possible.", "category": "booking", "order": 1},
        {"question": "Do you offer setup and takedown services?", "answer": "Yes! All our décor packages include professional setup and takedown. Our team arrives early to ensure everything is perfect before your guests arrive, and we handle all cleanup after your event.", "category": "services", "order": 2},
        {"question": "Can I customize the décor to match my theme?", "answer": "Absolutely! We specialize in custom designs tailored to your vision. During our consultation, we'll discuss colors, themes, and specific elements you'd like to incorporate.", "category": "services", "order": 3},
        {"question": "What is your rental policy?", "answer": "Rentals include delivery and pickup within our service area. A security deposit is required at booking, which is refunded upon return of items in good condition. Minimum rental period is typically 1 day.", "category": "rentals", "order": 4},
        {"question": "Do you travel for destination events?", "answer": "Yes, we travel for destination weddings and events! Travel fees apply based on distance. Contact us with your location for a custom quote.", "category": "booking", "order": 5},
        {"question": "What happens if rental items are damaged?", "answer": "Minor wear and tear is expected and covered. For significant damage, repair or replacement costs will be deducted from your security deposit. We recommend reviewing items upon delivery.", "category": "rentals", "order": 6},
        {"question": "How do I get a quote?", "answer": "Simply fill out our contact form with details about your event, and we'll respond within 24-48 hours with a customized quote. You can also call us directly for immediate assistance.", "category": "booking", "order": 7},
        {"question": "What payment methods do you accept?", "answer": "We accept all major credit cards, bank transfers, and checks. A 50% deposit is required to secure your booking, with the balance due one week before your event.", "category": "payment", "order": 8}
    ]
    
    for f in faq_data:
        faq = FAQItem(**f)
        doc = faq.model_dump()
        doc = serialize_doc(doc)
        await db.faq.insert_one(doc)
    
    # Seed Blog
    blog_data = [
        {
            "title": "10 Wedding Décor Trends for 2025",
            "slug": "wedding-decor-trends-2025",
            "excerpt": "Discover the hottest wedding decoration trends that are making waves this year, from sustainable florals to bold color palettes.",
            "content": """<h2>Embrace the Future of Wedding Design</h2>
<p>As we step into 2025, wedding décor continues to evolve with exciting new trends that blend timeless elegance with modern sensibilities. Here are the top trends we're seeing:</p>

<h3>1. Sustainable & Dried Florals</h3>
<p>Eco-conscious couples are opting for dried flowers, pampas grass, and locally-sourced seasonal blooms. These arrangements are not only beautiful but also environmentally responsible.</p>

<h3>2. Bold Color Palettes</h3>
<p>Move over neutrals! Couples are embracing rich jewel tones, unexpected color combinations, and statement-making hues that reflect their personalities.</p>

<h3>3. Intimate Micro-Weddings</h3>
<p>Smaller guest lists mean bigger budgets for décor. Couples are investing in luxurious details and personalized touches that create unforgettable experiences.</p>

<h3>4. Mixed Metal Accents</h3>
<p>Gold, silver, copper, and rose gold are being combined for a sophisticated, eclectic look that adds warmth and dimension to any venue.</p>

<h3>5. Living Installations</h3>
<p>From hanging gardens to moss walls, living plant installations are creating Instagram-worthy moments while bringing nature indoors.</p>

<p>Ready to incorporate these trends into your wedding? Contact us for a consultation!</p>""",
            "cover_image": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
            "author": "Emma Rodriguez",
            "tags": ["wedding", "trends", "décor"],
            "is_published": True
        },
        {
            "title": "How to Choose the Perfect Photo Booth for Your Event",
            "slug": "choosing-perfect-photo-booth",
            "excerpt": "A complete guide to selecting the right photo booth style for your corporate event, wedding, or party.",
            "content": """<h2>Making Memories That Last</h2>
<p>Photo booths have become a must-have at modern events. But with so many options available, how do you choose the right one?</p>

<h3>Classic Enclosed Booths</h3>
<p>Perfect for those who want privacy while striking poses. Great for corporate events and weddings where guests might be camera-shy.</p>

<h3>Open-Air Photo Booths</h3>
<p>Ideal for large groups and interactive experiences. The open design allows for more creativity and larger group shots.</p>

<h3>360 Video Booths</h3>
<p>The latest trend in event entertainment! These create shareable slow-motion videos that guests love posting on social media.</p>

<h3>Mirror Booths</h3>
<p>Combining a full-length mirror with touch-screen technology, these booths add a touch of glamour while providing an interactive experience.</p>

<h3>Key Questions to Ask</h3>
<ul>
<li>How many guests will be attending?</li>
<li>What's the vibe of your event?</li>
<li>Do you want prints, digital copies, or both?</li>
<li>What's your budget?</li>
</ul>

<p>Contact us to discuss which photo booth option is perfect for your event!</p>""",
            "cover_image": "https://images.unsplash.com/photo-1766086893043-d38b06175015?w=800",
            "author": "Marcus Chen",
            "tags": ["photo booth", "events", "entertainment"],
            "is_published": True
        },
        {
            "title": "Corporate Event Planning: Creating Memorable Brand Experiences",
            "slug": "corporate-event-planning-guide",
            "excerpt": "Expert tips on designing corporate events that reinforce your brand identity and leave lasting impressions.",
            "content": """<h2>Beyond the Basics</h2>
<p>Corporate events are more than meetings—they're opportunities to strengthen your brand, motivate teams, and impress clients.</p>

<h3>Brand Integration Done Right</h3>
<p>Subtle is key. Instead of plastering logos everywhere, incorporate brand colors through florals, linens, and lighting. Let your brand identity flow naturally through the design.</p>

<h3>Creating Experience Zones</h3>
<p>Design distinct areas within your event: networking lounges, interactive displays, and quiet conversation spaces. Each zone should serve a purpose while maintaining cohesive design.</p>

<h3>Technology Integration</h3>
<p>Digital signage, interactive screens, and app-based engagement can enhance your event without overwhelming the design aesthetic.</p>

<h3>Sustainable Choices</h3>
<p>More companies are prioritizing eco-friendly events. Consider reusable décor, digital alternatives to printed materials, and sustainable catering options.</p>

<p>Let's create an unforgettable corporate experience together!</p>""",
            "cover_image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
            "author": "Sarah Williams",
            "tags": ["corporate", "branding", "events"],
            "is_published": True
        }
    ]
    
    for b in blog_data:
        post = BlogPost(**b)
        doc = post.model_dump()
        doc = serialize_doc(doc)
        await db.blog.insert_one(doc)
    
    return {"message": "Database seeded successfully"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
