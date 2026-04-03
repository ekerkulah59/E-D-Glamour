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

const AlertBox = ({ type = 'info', children }) => {
  const styles = {
    info: 'bg-primary/5 border-primary/20 text-muted-foreground',
    warning: 'bg-accent/10 border-accent/30 text-muted-foreground',
    success: 'bg-green-50 border-green-200 text-green-900',
  };
  return (
    <div className={`border rounded-xl p-5 my-4 ${styles[type]}`}>
      <p className="font-body text-sm leading-relaxed">{children}</p>
    </div>
  );
};

const RefundPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const lastUpdated = 'April 3, 2026';

  return (
    <div className="min-h-screen pt-24" data-testid="refund-page">
      <SEO
        title="Refund &amp; Cancellation Policy | Event &amp; Photobooth Rentals"
        description="E&amp;D Glamour Marketing's Refund and Cancellation Policy. Understand our deposit rules, cancellation timeframes, rescheduling terms, and refund processing for event planning and photobooth rental services in Dover, Delaware."
        canonical="/refund-policy"
      />

      {/* Page Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            We understand that plans change. Here's everything you need to know about
            cancellations, rescheduling, and refunds for our event planning, party rental,
            and photobooth rental services.
          </p>
          <p className="font-body text-sm text-muted-foreground mt-4">
            <strong>Last Updated:</strong> {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">

          {/* Quick Reference */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
            <h2 className="font-heading text-lg font-bold text-foreground mb-3">Quick Reference Summary</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="font-heading text-xl font-bold text-primary mb-1">Non-Refundable</p>
                <p className="font-body text-xs text-muted-foreground">Retainer / Deposit (secures your date)</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="font-heading text-xl font-bold text-primary mb-1">30+ Days</p>
                <p className="font-body text-xs text-muted-foreground">Complimentary rescheduling window</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="font-heading text-xl font-bold text-primary mb-1">7–10 Business Days</p>
                <p className="font-body text-xs text-muted-foreground">Refund processing time (when eligible)</p>
              </div>
            </div>
          </div>

          <Section id="overview" title="1. Policy Overview">
            <p>
              This Refund &amp; Cancellation Policy applies to all services and rentals provided
              by <strong>E&amp;D Glamour Marketing</strong>, including event planning packages,
              equipment rentals (tables, chairs, tents, backdrops), and photobooth rental
              services including our 360 photo booth. This policy forms part of our overall
              event planning agreement and should be read alongside our
              <Link to="/terms" className="text-primary hover:underline mx-1">Terms and Conditions</Link>.
            </p>
            <p>
              Because we dedicate significant time, resources, and planning to each event from
              the moment a booking is confirmed, our cancellation policy is designed to protect
              both our clients and our business from loss.
            </p>
          </Section>

          <Section id="deposit" title="2. Deposit and Retainer Policy">
            <SubSection title="2.1 Non-Refundable Retainer">
              <p>
                All bookings require a <strong>non-refundable retainer</strong> (also referred
                to as a deposit) of <strong>10% to 50%</strong> of the total estimated contract
                value, payable at the time of contract signing.
              </p>
              <AlertBox type="warning">
                <strong>Important:</strong> The retainer is non-refundable under all circumstances
                once paid. This fee compensates E&amp;D Glamour Marketing for holding your event
                date, declining other bookings for that date, and for all preparatory work
                including planning calls, design consultation, and administrative tasks begun
                on your behalf.
              </AlertBox>
            </SubSection>

            <SubSection title="2.2 Rental Deposit">
              <p>
                For equipment and photobooth rentals, a <strong>security deposit</strong> may
                be required separately from the rental fee. This deposit is refundable upon
                return of equipment in satisfactory condition. See Section 6 for details on
                deposit deductions for damage or late returns.
              </p>
            </SubSection>

            <SubSection title="2.3 Securing Your Date">
              <p>
                Your event date is not reserved until the signed agreement and retainer payment
                are both received. We cannot guarantee availability for any date without a
                completed booking. Verbal commitments or email exchanges alone do not constitute
                a confirmed reservation.
              </p>
            </SubSection>
          </Section>

          <Section id="cancellation-timeframes" title="3. Cancellation Policy and Timeframes">
            <p>
              If you need to cancel your event or rental, please notify E&amp;D Glamour
              Marketing in writing as soon as possible by emailing
              <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline ml-1">
                eanddglamourmarketing.24@gmail.com
              </a>.
              The cancellation date is defined as the date we receive your written notice.
            </p>

            <SubSection title="3.1 Event Planning Services — Cancellation Schedule">
              <div className="rounded-lg overflow-hidden border border-border mt-3">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Notice Given Before Event
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Amount Forfeited
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Amount Refunded
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-medium">90+ days</td>
                      <td className="px-4 py-3 text-amber-700">Retainer only</td>
                      <td className="px-4 py-3 text-green-700">Remaining balance refunded</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3 font-medium">31–89 days</td>
                      <td className="px-4 py-3 text-amber-700">50% of total contract value</td>
                      <td className="px-4 py-3 text-green-700">50% refunded if paid in full</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-medium">8–30 days</td>
                      <td className="px-4 py-3 text-red-700">75% of total contract value</td>
                      <td className="px-4 py-3 text-green-700">25% refunded if paid in full</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3 font-medium">7 days or fewer</td>
                      <td className="px-4 py-3 text-red-700">100% — no refund issued</td>
                      <td className="px-4 py-3 text-muted-foreground">$0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SubSection>

            <SubSection title="3.2 Equipment and Photobooth Rental — Cancellation Schedule">
              <p>
                The following cancellation policy applies to standalone party rental equipment
                and photobooth rental bookings, including 360 photo booth reservations:
              </p>
              <div className="rounded-lg overflow-hidden border border-border mt-3">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Notice Given Before Rental Date
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">
                        Refund Eligibility
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-medium">14+ days</td>
                      <td className="px-4 py-3 text-green-700">Full refund minus deposit</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3 font-medium">7–13 days</td>
                      <td className="px-4 py-3 text-amber-700">50% refund of rental fee</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-medium">Less than 7 days</td>
                      <td className="px-4 py-3 text-red-700">No refund issued</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SubSection>
          </Section>

          <Section id="rescheduling" title="4. Rescheduling Policy">
            <SubSection title="4.1 Rescheduling Requests">
              <p>
                We understand that unexpected circumstances may require a change in your event
                date. Rescheduling requests must be submitted in writing via email at least
                <strong> 30 days before the original event date</strong>.
              </p>
              <p>
                Rescheduling is subject to availability. We will make every reasonable effort to
                accommodate your new date. If your preferred new date is not available, we will
                work with you to find the closest available alternative.
              </p>
            </SubSection>

            <SubSection title="4.2 Complimentary Reschedule">
              <p>
                Each booking is entitled to <strong>one (1) complimentary reschedule</strong>,
                provided the request is submitted at least 30 days in advance and the new date
                is available. The original retainer will transfer to the new date.
              </p>
            </SubSection>

            <SubSection title="4.3 Additional Rescheduling">
              <p>
                Subsequent rescheduling requests (after the first complimentary change) will
                incur an <strong>administrative rescheduling fee of up to $150</strong>. If
                the new event date falls in a different pricing period (e.g., peak season),
                any price differences will apply and a revised invoice will be issued.
              </p>
            </SubSection>

            <SubSection title="4.4 Late Rescheduling Requests">
              <p>
                Rescheduling requests made within 30 days of the original event date will be
                treated as cancellations under the cancellation schedule in Section 3, and a
                new booking retainer will be required for the rescheduled date.
              </p>
            </SubSection>
          </Section>

          <Section id="no-show" title="5. No-Show Policy">
            <AlertBox type="warning">
              <strong>No refunds are issued for no-shows.</strong> If a client fails to be
              present at the scheduled event without prior notice, or if we are unable to
              access the event venue at the agreed setup time due to reasons within the
              client's control, the full contract value will be forfeited and no refund will
              be issued.
            </AlertBox>
            <p>
              If our team arrives at the agreed time and location and cannot access the venue
              or reach the client's designated contact person within 30 minutes, we reserve
              the right to consider the booking a no-show and vacate the premises. All
              payments made will be forfeited.
            </p>
          </Section>

          <Section id="rental-damage" title="6. Rental Equipment — Deposit Deductions">
            <p>
              The security deposit collected for rental equipment will be refunded in full
              provided that:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>All items are returned by the agreed date and time</li>
              <li>All items are returned in the same condition as delivered</li>
              <li>No items are missing, lost, or stolen</li>
            </ul>
            <p className="mt-3">
              The following deductions may be applied to the security deposit:
            </p>
            <div className="rounded-lg overflow-hidden border border-border mt-3">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Issue</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Deduction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Minor damage (scuffs, small stains)</td>
                    <td className="px-4 py-3">Actual repair cost</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="px-4 py-3">Significant damage (structural, burns)</td>
                    <td className="px-4 py-3">Repair or replacement cost</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">Lost or stolen items</td>
                    <td className="px-4 py-3">Full replacement cost</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="px-4 py-3">Late return (per day beyond agreed time)</td>
                    <td className="px-4 py-3">25% of daily rental rate per day</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              If damage or loss costs exceed the security deposit amount, the client will
              be invoiced for the remaining balance, which is due within 10 business days.
            </p>
          </Section>

          <Section id="weather-emergency" title="7. Weather and Emergency Conditions">
            <SubSection title="7.1 Inclement Weather">
              <p>
                Outdoor events are subject to weather conditions. E&amp;D Glamour Marketing
                does not automatically offer refunds or cancellations due to rain, wind, or
                other weather conditions unless the conditions are severe enough to pose a
                genuine safety risk.
              </p>
              <p>
                We strongly recommend planning for weather contingencies (such as tent rentals)
                and purchasing event insurance. If weather threatens your event, contact us as
                early as possible to discuss options.
              </p>
            </SubSection>

            <SubSection title="7.2 Emergency or Force Majeure Events">
              <p>
                In cases of genuine emergencies or force majeure events — such as a declared
                state of emergency, natural disaster, pandemic-related government restriction,
                or other unforeseeable event beyond either party's control — we will work with
                you in good faith to reschedule your event at no additional charge where possible.
              </p>
              <p>
                If rescheduling is not possible and services have not yet been partially rendered,
                a partial refund (excluding costs already incurred by E&amp;D Glamour Marketing)
                may be issued at our discretion. We are not liable for any losses beyond the
                amount paid to us.
              </p>
            </SubSection>

            <SubSection title="7.3 Event Insurance Recommendation">
              <AlertBox type="info">
                We strongly recommend that clients obtain event insurance to protect against
                unforeseen cancellations, weather disruptions, or other circumstances beyond
                your control. E&amp;D Glamour Marketing does not provide event insurance and
                is not responsible for losses that could have been covered by insurance.
              </AlertBox>
            </SubSection>
          </Section>

          <Section id="refund-process" title="8. Refund Processing">
            <SubSection title="8.1 How Refunds Are Issued">
              <p>
                Eligible refunds will be processed using the same payment method used for the
                original transaction where possible. If the original payment method is no longer
                available, we will issue a refund by check or bank transfer.
              </p>
            </SubSection>

            <SubSection title="8.2 Refund Processing Timeline">
              <p>
                Once a refund is approved and confirmed in writing by E&amp;D Glamour Marketing,
                please allow the following timeframes:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Check or bank transfer:</strong> 7–10 business days</li>
                <li><strong>Credit/debit card reversal:</strong> 5–10 business days
                  (may vary by card issuer)</li>
              </ul>
              <p className="mt-3">
                If you have not received your refund within 14 business days of confirmation,
                please contact us at
                <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline ml-1">
                  eanddglamourmarketing.24@gmail.com
                </a>.
              </p>
            </SubSection>

            <SubSection title="8.3 Requesting a Refund">
              <p>
                To request a refund, email us at eanddglamourmarketing.24@gmail.com with:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your full name and event date</li>
                <li>The reason for your cancellation or refund request</li>
                <li>Your preferred refund method</li>
              </ul>
              <p className="mt-3">
                We will review your request and respond within 3–5 business days.
              </p>
            </SubSection>
          </Section>

          <Section id="partial-services" title="9. Partially Rendered Services">
            <p>
              If a client cancels after services have been partially delivered (for example,
              after planning meetings have been held, décor has been procured, or venue
              coordination has begun), refunds will be calculated based on the proportion
              of services not yet rendered at the time of cancellation, minus the non-refundable
              retainer and any costs already incurred.
            </p>
            <p>
              The Company will provide an itemized breakdown of work completed and costs
              incurred to support any refund calculation.
            </p>
          </Section>

          <Section id="disputes" title="10. Disputes and Disagreements">
            <p>
              We believe in resolving issues fairly and professionally. If you are dissatisfied
              with any aspect of our service, please contact us first at
              <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline ml-1">
                eanddglamourmarketing.24@gmail.com
              </a>{' '}
              or by calling (302) 281-2137 so we have the opportunity to address your concerns.
            </p>
            <p>
              Chargebacks initiated without first contacting E&amp;D Glamour Marketing will be
              contested, and we reserve the right to recover any associated fees in line with
              our Terms and Conditions. This policy is governed by the laws of the
              State of Delaware, USA.
            </p>
          </Section>

          {/* Contact Box */}
          <div className="bg-muted rounded-xl p-6 mt-10">
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">
              Questions About Cancellations or Refunds?
            </h2>
            <p className="font-body text-muted-foreground mb-4">
              We're here to help. Contact us before cancelling — we may be able to reschedule
              or find a solution that works for everyone.
            </p>
            <div className="space-y-1 font-body text-sm text-muted-foreground">
              <p><strong className="text-foreground">E&amp;D Glamour Marketing</strong></p>
              <p>Dover, Delaware, USA</p>
              <p>Phone: <a href="tel:+13022812137" className="text-primary hover:underline">(302) 281-2137</a></p>
              <p>Email: <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline">eanddglamourmarketing.24@gmail.com</a></p>
            </div>
            <div className="mt-4 flex gap-4 flex-wrap">
              <Link to="/terms" className="font-body text-sm text-primary hover:underline">Terms &amp; Conditions →</Link>
              <Link to="/privacy" className="font-body text-sm text-primary hover:underline">Privacy Policy →</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default RefundPage;
