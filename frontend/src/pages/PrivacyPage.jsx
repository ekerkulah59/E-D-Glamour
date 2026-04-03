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

const PrivacyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const lastUpdated = 'April 3, 2026';

  return (
    <div className="min-h-screen pt-24" data-testid="privacy-page">
      <SEO
        title="Privacy Policy | E&amp;D Glamour Marketing"
        description="Learn how E&amp;D Glamour Marketing collects, uses, and protects your personal information. Our Privacy Policy covers data collection, cookies, and your rights as a user."
        canonical="/privacy"
      />

      {/* Page Header */}
      <section className="section-padding bg-muted">
        <div className="container-custom max-w-4xl">
          <p className="font-body text-primary text-sm uppercase tracking-widest mb-2">Legal</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            Your privacy matters to us. This policy explains how we collect, use, and protect
            your personal information.
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
              E&amp;D Glamour Marketing ("we," "us," or "our") is committed to protecting your
              privacy. This Privacy Policy describes how we collect, use, share, and safeguard
              personal information you provide when you visit our website at
              <strong> www.edglamourmarketing.com</strong>, contact us for a quote, or use any
              of our event planning, party rental, or photobooth rental services. By using our
              website or services, you agree to the practices described in this policy.
            </p>
          </div>

          <Section id="data-collected" title="1. Information We Collect">
            <p>
              We collect two categories of information: information you provide directly to us,
              and information collected automatically when you use our website.
            </p>

            <SubSection title="1.1 Information You Provide Directly">
              <p>When you fill out a contact form, request a quote, make a booking, or communicate
              with us, we may collect:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Full name</strong></li>
                <li><strong>Email address</strong></li>
                <li><strong>Phone number</strong></li>
                <li><strong>Event details</strong> (event type, date, location, guest count)</li>
                <li><strong>Billing and mailing address</strong></li>
                <li><strong>Payment information</strong> (processed securely through our payment
                  provider; we do not store full card numbers on our servers)</li>
                <li><strong>Communications</strong> — emails, messages, or notes exchanged
                  during your booking process</li>
                <li><strong>Photos or media</strong> you share with us to help us execute
                  your event vision</li>
              </ul>
            </SubSection>

            <SubSection title="1.2 Information Collected Automatically">
              <p>
                When you visit our website, certain technical information is collected
                automatically through cookies, web beacons, and analytics tools:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>IP address</strong> and approximate geographic location</li>
                <li><strong>Browser type</strong> and version</li>
                <li><strong>Device type</strong> (desktop, mobile, tablet)</li>
                <li><strong>Pages visited</strong>, time spent on each page, and navigation path</li>
                <li><strong>Referring URL</strong> (the website that brought you to ours)</li>
                <li><strong>Session and interaction data</strong> collected via analytics
                  tools such as PostHog</li>
              </ul>
            </SubSection>
          </Section>

          <Section id="how-we-collect" title="2. How We Collect Your Information">

            <SubSection title="2.1 Website Contact and Quote Forms">
              <p>
                When you submit a contact form or request a quote on our website, the
                information you enter is transmitted directly to our team. We use this
                information solely to respond to your inquiry and provide our services.
              </p>
            </SubSection>

            <SubSection title="2.2 Direct Communications">
              <p>
                If you contact us via email, phone, or social media (Instagram, Facebook),
                we retain records of those communications to ensure continuity and quality
                of service throughout your event planning process.
              </p>
            </SubSection>

            <SubSection title="2.3 Cookies and Tracking Technologies">
              <p>
                Our website uses cookies — small text files stored on your browser — to
                improve your browsing experience and analyze how visitors use our site.
                We use the following types of cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website to function
                  properly. These cannot be disabled without affecting site functionality.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Used to understand how visitors interact
                  with our website. We use PostHog for session analytics to improve our
                  website experience.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences
                  during your visit.
                </li>
              </ul>
              <p className="mt-3">
                You can control cookie preferences through your browser settings. Disabling
                certain cookies may affect website functionality. For more information, visit
                your browser's help documentation.
              </p>
            </SubSection>

            <SubSection title="2.4 Social Media">
              <p>
                If you interact with us through our Instagram
                (@glamour__decormarketing) or Facebook pages, the respective platforms
                may collect data according to their own privacy policies. We encourage you
                to review Meta's privacy policy for information on how they handle your data.
              </p>
            </SubSection>
          </Section>

          <Section id="how-we-use" title="3. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Service Delivery:</strong> To plan, coordinate, and execute your event
                according to your specifications.
              </li>
              <li>
                <strong>Communication:</strong> To respond to inquiries, provide quotes,
                send booking confirmations, and keep you informed throughout the event
                planning process.
              </li>
              <li>
                <strong>Invoicing and Payments:</strong> To process payments, issue invoices,
                and manage your account balance.
              </li>
              <li>
                <strong>Service Improvement:</strong> To analyze how our services are used and
                identify ways to enhance your experience.
              </li>
              <li>
                <strong>Marketing Communications:</strong> With your consent, to send you
                updates about our services, seasonal promotions, or event planning tips.
                You may opt out of marketing emails at any time.
              </li>
              <li>
                <strong>Legal Compliance:</strong> To comply with applicable laws, respond
                to legal requests, or enforce our Terms and Conditions.
              </li>
              <li>
                <strong>Website Analytics:</strong> To monitor website traffic, understand
                user behavior, and improve our website performance.
              </li>
            </ul>
          </Section>

          <Section id="data-sharing" title="4. How We Share Your Information">
            <p>
              E&amp;D Glamour Marketing does not sell, rent, or trade your personal
              information to third parties for their marketing purposes.
            </p>
            <p>We may share your information in the following limited circumstances:</p>

            <SubSection title="4.1 Service Providers">
              <p>
                We work with trusted third-party vendors who assist us in operating our
                business, such as email communication tools, payment processors, and
                website analytics providers. These vendors are contractually obligated to
                handle your data securely and only for the purposes we specify.
              </p>
            </SubSection>

            <SubSection title="4.2 Event Vendors">
              <p>
                In some cases, and only with your knowledge, we may share relevant event
                details (such as date, location, and contact name) with third-party vendors
                (e.g., florists, venues, photographers) as part of coordinating your event.
              </p>
            </SubSection>

            <SubSection title="4.3 Legal Requirements">
              <p>
                We may disclose your information if required to do so by law, court order,
                or government authority, or to protect the rights, safety, or property of
                E&amp;D Glamour Marketing, our clients, or the public.
              </p>
            </SubSection>

            <SubSection title="4.4 Business Transfers">
              <p>
                In the event of a business merger, acquisition, or sale of assets, your
                personal information may be transferred as part of that transaction. We will
                notify you via email or website notice if such a change occurs.
              </p>
            </SubSection>
          </Section>

          <Section id="data-security" title="5. Data Protection and Security">
            <p>
              We take the security of your personal information seriously. We implement
              reasonable administrative, technical, and physical safeguards to protect
              your data from unauthorized access, disclosure, alteration, or destruction.
            </p>
            <p>
              These measures include secure email communications, access controls, and
              careful vendor selection for payment processing. However, no method of
              transmission over the internet or electronic storage is 100% secure. While
              we strive to protect your information, we cannot guarantee absolute security.
            </p>
            <p>
              We do not store full credit card numbers or payment card data on our own servers.
              Payment processing is handled by secure third-party payment processors.
            </p>
          </Section>

          <Section id="data-retention" title="6. Data Retention">
            <p>
              We retain your personal information for as long as necessary to provide services,
              comply with legal obligations, resolve disputes, and enforce our agreements.
              For active clients, we retain records for the duration of the service relationship
              and for a reasonable period afterward for accounting and legal purposes.
            </p>
            <p>
              Inquiry information from potential clients who do not book a service is retained
              for up to 12 months, after which it is deleted or anonymized.
            </p>
          </Section>

          <Section id="user-rights" title="7. Your Rights and Choices">
            <p>
              Depending on your location and applicable law, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold
                about you.
              </li>
              <li>
                <strong>Correction:</strong> Ask us to update or correct inaccurate or
                incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> Request that we delete your personal data, subject
                to legal or contractual obligations.
              </li>
              <li>
                <strong>Opt-Out of Marketing:</strong> Unsubscribe from marketing communications
                at any time by replying "unsubscribe" to any email or contacting us directly.
              </li>
              <li>
                <strong>Data Portability:</strong> Request a portable copy of your personal
                data in a commonly used format.
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at
              <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline ml-1">
                eanddglamourmarketing.24@gmail.com
              </a>.
              We will respond to your request within 30 days.
            </p>
          </Section>

          <Section id="cookies-policy" title="8. Cookies Policy">
            <p>
              When you first visit our website, you may be presented with a cookie notice.
              By continuing to use our website, you consent to our use of cookies as described
              in this policy.
            </p>
            <p>
              <strong>Managing Cookies:</strong> Most web browsers automatically accept cookies.
              You can modify your browser settings to decline cookies if you prefer. To learn
              how to manage cookies in your browser, visit:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
              <li>Firefox: Options &gt; Privacy &amp; Security</li>
              <li>Safari: Preferences &gt; Privacy</li>
              <li>Edge: Settings &gt; Privacy, Search, and Services</li>
            </ul>
            <p className="mt-3">
              Please note that disabling cookies may affect the functionality of certain
              features on our website.
            </p>
          </Section>

          <Section id="third-party-links" title="9. Third-Party Links">
            <p>
              Our website may contain links to third-party websites such as our social media
              profiles (Instagram, Facebook). We are not responsible for the privacy practices
              of those websites and encourage you to review their privacy policies. This
              Privacy Policy applies only to information collected through our own website
              and services.
            </p>
          </Section>

          <Section id="childrens-privacy" title="10. Children's Privacy">
            <p>
              Our services and website are not directed to children under the age of 13.
              We do not knowingly collect personal information from children under 13. If
              you believe that a child has provided us with personal information, please
              contact us and we will promptly delete it.
            </p>
          </Section>

          <Section id="changes" title="11. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in
              our practices, technology, or legal requirements. When we make changes, we
              will update the "Last Updated" date at the top of this page. We encourage
              you to review this policy periodically.
            </p>
            <p>
              Continued use of our website or services after any changes constitutes your
              acceptance of the updated Privacy Policy.
            </p>
          </Section>

          {/* Contact Box */}
          <div className="bg-muted rounded-xl p-6 mt-10">
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">Privacy Questions?</h2>
            <p className="font-body text-muted-foreground mb-4">
              If you have any questions, concerns, or requests regarding your personal
              information or this Privacy Policy, please contact us:
            </p>
            <div className="space-y-1 font-body text-sm text-muted-foreground">
              <p><strong className="text-foreground">E&amp;D Glamour Marketing</strong></p>
              <p>Dover, Delaware, USA</p>
              <p>Phone: <a href="tel:+13022812137" className="text-primary hover:underline">(302) 281-2137</a></p>
              <p>Email: <a href="mailto:eanddglamourmarketing.24@gmail.com" className="text-primary hover:underline">eanddglamourmarketing.24@gmail.com</a></p>
            </div>
            <div className="mt-4 flex gap-4 flex-wrap">
              <Link to="/terms" className="font-body text-sm text-primary hover:underline">Terms &amp; Conditions →</Link>
              <Link to="/refund-policy" className="font-body text-sm text-primary hover:underline">Refund &amp; Cancellation Policy →</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
