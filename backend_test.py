import requests
import sys
from datetime import datetime
import json

class EventDecorAPITester:
    def __init__(self, base_url="https://event-decor-hub-7.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, params=params, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    elif isinstance(response_data, dict):
                        print(f"   Response: Dict with keys: {list(response_data.keys())[:5]}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if success and response.text else {}

        except Exception as e:
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_seed_database(self):
        """Test database seeding"""
        return self.run_test("Seed Database", "POST", "seed", 200)

    def test_services_endpoints(self):
        """Test all services endpoints"""
        print("\n📋 Testing Services Endpoints...")
        
        # Get all services
        success, services = self.run_test("Get All Services", "GET", "services", 200)
        if not success:
            return False
            
        # Test category filtering
        categories = ["wedding", "corporate", "birthday", "baby_shower", "anniversary", "graduation"]
        for category in categories:
            self.run_test(f"Get Services - {category}", "GET", "services", 200, params={"category": category})
        
        # Test individual service if services exist
        if services and len(services) > 0:
            service_id = services[0].get('id')
            if service_id:
                self.run_test("Get Individual Service", "GET", f"services/{service_id}", 200)
        
        return True

    def test_rentals_endpoints(self):
        """Test all rentals endpoints"""
        print("\n🪑 Testing Rentals Endpoints...")
        
        # Get all rentals
        success, rentals = self.run_test("Get All Rentals", "GET", "rentals", 200)
        if not success:
            return False
            
        # Test category filtering
        categories = ["chairs", "tables", "photo_booths", "catering_equipment", "linens", "lighting"]
        for category in categories:
            self.run_test(f"Get Rentals - {category}", "GET", "rentals", 200, params={"category": category})
        
        # Test individual rental if rentals exist
        if rentals and len(rentals) > 0:
            rental_id = rentals[0].get('id')
            if rental_id:
                self.run_test("Get Individual Rental", "GET", f"rentals/{rental_id}", 200)
        
        return True

    def test_testimonials_endpoints(self):
        """Test testimonials endpoints"""
        print("\n⭐ Testing Testimonials Endpoints...")
        
        # Get all testimonials
        self.run_test("Get All Testimonials", "GET", "testimonials", 200)
        
        # Get featured testimonials only
        self.run_test("Get Featured Testimonials", "GET", "testimonials", 200, params={"featured_only": "true"})
        
        return True

    def test_gallery_endpoints(self):
        """Test gallery endpoints"""
        print("\n🖼️ Testing Gallery Endpoints...")
        
        # Get all gallery images
        self.run_test("Get All Gallery Images", "GET", "gallery", 200)
        
        # Test category filtering
        categories = ["wedding", "corporate", "birthday", "baby_shower"]
        for category in categories:
            self.run_test(f"Get Gallery - {category}", "GET", "gallery", 200, params={"category": category})
        
        # Get featured images only
        self.run_test("Get Featured Gallery Images", "GET", "gallery", 200, params={"featured_only": "true"})
        
        return True

    def test_faq_endpoints(self):
        """Test FAQ endpoints"""
        print("\n❓ Testing FAQ Endpoints...")
        
        # Get all FAQ items
        self.run_test("Get All FAQ Items", "GET", "faq", 200)
        
        # Test category filtering
        categories = ["booking", "services", "rentals", "payment"]
        for category in categories:
            self.run_test(f"Get FAQ - {category}", "GET", "faq", 200, params={"category": category})
        
        return True

    def test_blog_endpoints(self):
        """Test blog endpoints"""
        print("\n📝 Testing Blog Endpoints...")
        
        # Get all blog posts
        success, posts = self.run_test("Get All Blog Posts", "GET", "blog", 200)
        if not success:
            return False
            
        # Test tag filtering
        tags = ["wedding", "trends", "décor", "events", "corporate"]
        for tag in tags:
            self.run_test(f"Get Blog Posts - {tag}", "GET", "blog", 200, params={"tag": tag})
        
        # Test individual blog post if posts exist
        if posts and len(posts) > 0:
            post_slug = posts[0].get('slug')
            if post_slug:
                self.run_test("Get Individual Blog Post", "GET", f"blog/{post_slug}", 200)
        
        return True

    def test_contact_endpoints(self):
        """Test contact/quote endpoints"""
        print("\n📞 Testing Contact Endpoints...")
        
        # Test quote submission
        quote_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "event_type": "wedding",
            "event_date": "2025-06-15",
            "guest_count": 100,
            "message": "This is a test quote request for automated testing."
        }
        
        success, response = self.run_test("Submit Quote Request", "POST", "contact", 200, data=quote_data)
        
        # Test getting quote requests
        self.run_test("Get Quote Requests", "GET", "quote-requests", 200)
        
        return success

    def test_booking_endpoints(self):
        """Test booking system endpoints"""
        print("\n📅 Testing Booking Endpoints...")
        
        # Test availability check
        availability_data = {
            "date": "2025-08-15"
        }
        success, availability = self.run_test("Check Availability", "POST", "availability", 200, data=availability_data)
        
        # Test getting booked dates
        self.run_test("Get Booked Dates", "GET", "booked-dates", 200)
        
        # Test booking creation
        booking_data = {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "event_type": "wedding",
            "event_date": "2025-08-15",
            "event_time": "02:00 PM",
            "guest_count": 150,
            "venue_address": "123 Wedding Venue St, Los Angeles, CA",
            "services_needed": ["Wedding Décor", "Corporate Event Décor"],
            "rentals_needed": ["Chiavari Chairs - Gold", "Round Tables - 60 inch"],
            "special_requests": "Need extra floral arrangements",
            "estimated_budget": "5000_10000"
        }
        
        booking_success, booking_response = self.run_test("Create Booking", "POST", "bookings", 200, data=booking_data)
        
        # Test getting all bookings
        self.run_test("Get All Bookings", "GET", "bookings", 200)
        
        # Test getting bookings by status
        self.run_test("Get Pending Bookings", "GET", "bookings", 200, params={"status": "pending"})
        
        # Test individual booking retrieval if booking was created
        if booking_success and booking_response:
            booking_id = booking_response.get('id')
            confirmation_number = booking_response.get('confirmation_number')
            
            if booking_id:
                self.run_test("Get Individual Booking", "GET", f"bookings/{booking_id}", 200)
            
            if confirmation_number:
                self.run_test("Get Booking by Confirmation", "GET", f"bookings/confirmation/{confirmation_number}", 200)
                
                # Test status update - send status as query parameter
                self.run_test("Update Booking Status", "PATCH", f"bookings/{booking_id}/status", 200, params={"status": "confirmed"})
        
        return success

    def test_email_status(self):
        """Test email configuration status"""
        print("\n📧 Testing Email Status...")
        return self.run_test("Get Email Status", "GET", "email-status", 200)

def main():
    print("🎉 Event Décor Hub API Testing Suite")
    print("=" * 50)
    
    # Setup
    tester = EventDecorAPITester()
    
    # Test sequence
    print("\n🚀 Starting API Tests...")
    
    # 1. Test root endpoint
    tester.test_root_endpoint()
    
    # 2. Seed database
    tester.test_seed_database()
    
    # 3. Test all endpoints
    tester.test_services_endpoints()
    tester.test_rentals_endpoints()
    tester.test_testimonials_endpoints()
    tester.test_gallery_endpoints()
    tester.test_faq_endpoints()
    tester.test_blog_endpoints()
    tester.test_contact_endpoints()
    tester.test_booking_endpoints()
    tester.test_email_status()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests ({len(tester.failed_tests)}):")
        for i, test in enumerate(tester.failed_tests, 1):
            print(f"{i}. {test['name']}")
            if 'expected' in test:
                print(f"   Expected: {test['expected']}, Got: {test['actual']}")
                print(f"   Response: {test['response']}")
            if 'error' in test:
                print(f"   Error: {test['error']}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n✨ Success Rate: {success_rate:.1f}%")
    
    return 0 if success_rate >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())