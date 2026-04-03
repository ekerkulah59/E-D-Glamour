import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10">
    <h2 className="font-heading text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border">
      {title}
    </h2>
    <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

const SubSection = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{title}</h3>
    <div className="space-y-3 font-body text-muted-foreground leading-relaxed">
      {children}
    </div>
  </div>
);

const TermsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const lastUpdated = 'April 3, 2026';

  return (
    <div className="min-h-screen pt-24" data-testid="terms-page">
      <SEO
        title="Terms and Conditions | Event Planning &amp; Rental Agreement"
        description="Review E&amp;D Glamour Marketing's Terms and Conditions covering our event planning agreement, rental terms, payment policies, cancellation rules, and liability limitations in Dover, Delaware."
        canonical="/terms"
      />

      {/* Page Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            Please read these terms carefully before booking any service or rental with E&amp;D Glamour Marketing.
          </p>
          <p className="font-body text-sm text-muted-foreground mt-4">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">

          {/* Intro */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
            <p className="font-body text-muted-foreground leading-relaxed">
              These Terms and Conditions ("Agreement") govern the use of services and rentals provided
              by <strong>E&amp;D Glamour Marketing</strong>, located in Dover, Delaware ("Company,"
              "we," "us," or "our"). By booking a service, making a payment, or signing a contract
              with E&amp;D Glamour Marketing, you ("Client," "you," or "your") agree to be bound
              by these terms in their entirety. This agreement constitutes a binding event planning
              agreement between both parties.
            </p>
          </div>

          <Section id="services" title="1. Services Description">
            <p>
              E&amp;D Glamour Marketing provides professional event planning, event décor, party
              rental equipment, and photobooth services — including 360 photo booth rentals — in
              Dover, Delaware and surrounding areas including Maryland, Pennsylvania, and New Jersey.
            </p>
            <p>Our core services include, but are not limited to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Full-service event planning and day-of coordination</li>
              <li>Wedding, birthday, baby shower, graduation, and corporate event décor</li>
              <li>Party rental equipment: tables, chairs, tents, backdrops, and accessories</li>
              <li>360 photo booth and digital photo booth rentals</li>
              <li>Custom design, timeline creation, and vendor coordination</li>
            </ul>
            <p>
              The specific scope of services for your event will be outlined in a separate service
              proposal or contract provided to you prior to booking confirmation.
            </p>
          </Section>

          <Section id="booking-payment" title="2. Booking and Payment Terms">
            <SubSection title="2.1 How to Book">
              <p>
                All bookings must be initiated through our website contact form, by phone at
                (302) 281-2137, or by email at eanddglamourmarketing.24@gmail.com. A booking is
                not confirmed until a signed service agreement and deposit have been received.
              </p>
            </SubSection>

            <SubSection title="2.2 Retainer / Deposit">
              <p>
                A non-refundable retainer of <strong>10% to 50%</strong> of the total estimated
                service cost is required at the time of contract signing to secure your event date
                and begin planning. This retainer compensates the Company for holding your date and
                for administrative and preparatory work performed on your behalf.
              </p>
              <p>
                For equipment and photobooth rental agreements, a deposit amount will be specified
                at the time of your rental quote.
              </p>
            </SubSection>

            <SubSection title="2.3 Final Payment">
              <p>
                The remaining balance is due <strong>7 to 14 days before the event date</strong>,
                unless otherwise specified in your individual service contract. Failure to submit
                final payment by the agreed deadline may result in cancellation of services without
                a refund of the retainer.
              </p>
            </SubSection>

            <SubSection title="2.4 Accepted Payment Methods">
              <p>
                We accept payments via cash, check, bank transfer, and other methods as agreed upon
                in your service contract. All prices are in U.S. Dollars (USD).
              </p>
            </SubSection>

            <SubSection title="2.5 Price Estimates">
              <p>
                All quoted prices are estimates based on the information provided at the time of
                inquiry. Final pricing may vary based on confirmed guest count, venue requirements,
                travel distance, staffing needs, and the final scope of services. You will receive
                a finalized invoice before your final payment is due.
              </p>
            </SubSection>
          </Section>

          <Section id="cancellation" title="3. Cancellation and Rescheduling Policy">
            <SubSection title="3.1 Cancellation by the Client">
              <p>
                If you need to cancel your event, you must notify E&amp;D Glamour Marketing in
                writing via email to eanddglamourmarketing.24@gmail.com as soon as possible.
                The following cancellation schedule applies:
              </p>
              <div className="mt-3 rounded-lg overflow-hidden border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Notice Period</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Refund on Payments Made</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">90+ days before the event</td>
                      <td className="px-4 py-3">Retainer is forfeited; remaining balance refunded</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3">31–89 days before the event</td>
                      <td className="px-4 py-3">50% of total contract value forfeited</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">8–30 days before the event</td>
                      <td className="px-4 py-3">75% of total contract value forfeited</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3">7 days or fewer before the event</td>
                      <td className="px-4 py-3">No refund; 100% of contract value forfeited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SubSection>

            <SubSection title="3.2 Rescheduling">
              <p>
                You may request to reschedule your event date subject to availability. Rescheduling
                requests must be submitted in writing at least <strong>30 days before the original
                event date</strong>. One complimentary reschedule is permitted; subsequent
                rescheduling requests may incur an administrative fee of up to $150.
              </p>
              <p>
                If rescheduling results in a different pricing structure (e.g., due to seasonal
                rates or staffing costs), the new pricing will apply and a revised contract will
                be issued.
              </p>
            </SubSection>

            <SubSection title="3.3 Cancellation by E&amp;D Glamour Marketing">
              <p>
                In the rare event that E&amp;D Glamour Marketing must cancel due to unforeseen
                circumstances beyond our control, we will provide as much advance notice as
                possible and issue a full refund of all payments made. Our liability is limited
                to the refund of monies paid and does not extend to additional damages or expenses.
              </p>
            </SubSection>
          </Section>

          <Section id="client-responsibilities" title="4. Client Responsibilities">
            <p>By booking our services, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Provide accurate, complete, and timely information regarding your event including
                guest count, venue details, event date/time, and any special requirements.
              </li>
              <li>
                Obtain all necessary permits, licenses, or venue approvals required for your
                event. E&amp;D Glamour Marketing is not responsible for permit-related issues
                that prevent services from being rendered.
              </li>
              <li>
                Ensure that the venue is accessible to our team at the agreed setup time and
                that there is adequate space, power supply (as required), and parking.
              </li>
              <li>
                Communicate any changes to the event scope, guest count, or setup requirements
                at least 14 days in advance where possible.
              </li>
              <li>
                Designate a point-of-contact who is reachable on the day of the event.
              </li>
              <li>
                Ensure the safety of E&amp;D Glamour Marketing staff and equipment while on the
                event premises.
              </li>
            </ul>
          </Section>

          <Section id="rental-terms" title="5. Equipment Rental Terms">
            <p>
              The following terms apply to all party rental and photobooth rental agreements,
              including our 360 photo booth rental services.
            </p>

            <SubSection title="5.1 Rental Period">
              <p>
                The rental period begins at the agreed delivery or pickup time and ends at the
                agreed return time as specified in your rental agreement. The minimum rental
                period is one (1) event day unless otherwise agreed in writing.
              </p>
            </SubSection>

            <SubSection title="5.2 Delivery and Pickup">
              <p>
                Clients may choose between self-pickup/drop-off or planner-managed delivery
                and pickup. Delivery fees will be clearly outlined in your rental quote. If our
                team is scheduled for pickup at a specific time, a late return fee may apply.
              </p>
            </SubSection>

            <SubSection title="5.3 Security Deposit">
              <p>
                A refundable security deposit may be required for certain rental items. The
                security deposit will be returned within 5–7 business days after the rental
                period ends, provided all equipment is returned in the same condition as delivered.
              </p>
            </SubSection>

            <SubSection title="5.4 Damage and Loss">
              <p>
                The Client is responsible for all rented equipment from the time of delivery
                or pickup until its return to E&amp;D Glamour Marketing. Normal wear and tear
                is expected and will not be charged. However, the Client will be responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Damage beyond normal wear and tear</li>
                <li>Stains, burns, or structural damage to rented items</li>
                <li>Theft or loss of any rental equipment</li>
                <li>Damage caused by weather, misuse, or negligence</li>
              </ul>
              <p className="mt-2">
                Repair or replacement costs will be deducted from the security deposit. If
                costs exceed the deposit, the Client will be invoiced for the remaining balance.
              </p>
            </SubSection>

            <SubSection title="5.5 Late Returns">
              <p>
                Rental equipment must be returned by the agreed date and time. Late returns
                will incur a fee equal to 25% of the daily rental rate per additional day
                unless prior arrangements have been made in writing.
              </p>
            </SubSection>

            <SubSection title="5.6 Photo Booth Rental Specifics">
              <p>
                Our 360 photo booth and digital photobooth rental services are priced at $125
                per hour unless otherwise quoted. The photobooth requires a flat, stable surface,
                an electrical outlet within 25 feet, and a minimum 10×10 foot space. The Client
                is responsible for ensuring these conditions are met at the venue.
              </p>
            </SubSection>
          </Section>

          <Section id="liability" title="6. Limitation of Liability">
            <p>
              E&amp;D Glamour Marketing's total liability to the Client for any claim arising
              from services rendered shall not exceed the total amount paid by the Client under
              the applicable service agreement.
            </p>
            <p>
              We are not liable for any indirect, incidental, consequential, or punitive damages
              including, but not limited to, loss of enjoyment, emotional distress, or loss of
              business opportunity.
            </p>
            <p>
              E&amp;D Glamour Marketing is not responsible for delays, disruptions, or failure
              to perform services caused by circumstances outside our reasonable control,
              including but not limited to: vendor failures, venue issues, power outages,
              equipment failure by third parties, acts of government, or natural disasters.
            </p>
            <p>
              We do not guarantee specific aesthetic outcomes or results. While we strive to
              execute your event vision as closely as possible, minor variations from design
              concepts due to material availability or on-site conditions do not constitute
              a breach of this agreement.
            </p>
          </Section>

          <Section id="indemnification" title="7. Indemnification">
            <p>
              The Client agrees to indemnify, defend, and hold harmless E&amp;D Glamour
              Marketing, its owners, employees, contractors, and agents from and against any
              and all claims, damages, losses, costs, and expenses (including reasonable
              attorney's fees) arising out of or in connection with:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>The Client's use of our services or rental equipment</li>
              <li>Any breach of these Terms and Conditions by the Client</li>
              <li>Any injury, property damage, or loss occurring at the event</li>
              <li>Misrepresentation or inaccurate information provided by the Client</li>
              <li>Failure to obtain required permits or venue approvals</li>
            </ul>
          </Section>

          <Section id="force-majeure" title="8. Force Majeure">
            <p>
              Neither party shall be held liable for failure to perform any obligation under
              this agreement if such failure is caused by events beyond their reasonable
              control ("Force Majeure Events"), including but not limited to: natural disasters,
              extreme weather conditions, pandemics, government orders or restrictions, acts
              of war or terrorism, fire, or widespread power outages.
            </p>
            <p>
              In the event of a Force Majeure Event, E&amp;D Glamour Marketing will make
              reasonable efforts to reschedule services at a mutually agreeable date. If
              rescheduling is not possible, a partial or full refund may be issued at our
              discretion based on costs already incurred.
            </p>
          </Section>

          <Section id="intellectual-property" title="9. Photography and Media">
            <p>
              E&amp;D Glamour Marketing reserves the right to photograph or record our work
              at your event for use in our portfolio, website, and social media channels.
              If you prefer that no images of your event be shared publicly, please notify
              us in writing before your event date. We will respect your privacy preferences.
            </p>
          </Section>

          <Section id="modifications" title="10. Changes to Services">
            <p>
              Any changes to the agreed scope of services must be requested in writing and
              are subject to availability and additional charges. Changes to the guest count,
              décor scope, or rental quantities confirmed within 14 days of the event may not
              be accommodated and will not reduce the contracted price.
            </p>
          </Section>

          <Section id="governing-law" title="11. Governing Law and Dispute Resolution">
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with
              the laws of the <strong>State of Delaware, United States of America</strong>,
              without regard to its conflict of law provisions.
            </p>
            <p>
              In the event of a dispute, both parties agree to first attempt resolution through
              good-faith negotiation. If a resolution cannot be reached within 30 days, the
              parties agree to submit the dispute to mediation in Kent County, Delaware, before
              pursuing any other legal remedy.
            </p>
            <p>
              Any legal proceedings arising from this agreement shall be filed exclusively in
              the courts located in Dover, Delaware.
            </p>
          </Section>

          <Section id="entire-agreement" title="12. Entire Agreement and Modifications">
            <p>
              These Terms and Conditions, together with any signed service contract or rental
              agreement, constitute the entire agreement between E&amp;D Glamour Marketing and
              the Client and supersede all prior discussions, representations, or agreements.
            </p>
            <p>
              E&amp;D Glamour Marketing reserves the right to update these Terms and Conditions
              at any time. The version in effect at the time of your booking will govern your
              agreement. Updates will be posted on our website at
              www.edglamourmarketing.com/terms.
            </p>
          </Section>

          {/* Contact Box */}
          <div className="bg-muted rounded-xl p-6 mt-10">
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">Questions About These Terms?</h2>
            <p className="font-body text-muted-foreground mb-4">
              If you have any questions about this agreement or our event rental terms,
              please contact us before booking.
            </p>
            <div className="space-y-1 font-body text-sm text-muted-foreground">
              <p><strong className="text-foreground">E&amp;D Glamour Marketing</strong></p>
              <p>Dover, Delaware, USA</p>
              <p>Phone: <a href="tel:+13022812137" className="text-primary hover:underline">(302) 281-2137</a></p>
              <p>Email: <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline">eanddglamourmarketing.24@gmail.com</a></p>
            </div>
            <div className="mt-4 flex gap-4 flex-wrap">
              <Link to="/privacy" className="font-body text-sm text-primary hover:underline">Privacy Policy →</Link>
              <Link to="/refund-policy" className="font-body text-sm text-primary hover:underline">Refund &amp; Cancellation Policy →</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TermsPage;
