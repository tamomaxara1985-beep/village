import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about staying at HOTEL_NAME — bookings, policies, amenities, and more.",
};

const faqs = [
  {
    q: "What time is check-in and check-out?",
    a: "Check-in is from 15:00. Check-out is by 11:00. Early check-in and late check-out may be available on request, subject to availability. Please contact us in advance.",
  },
  {
    q: "Is breakfast included in the room rate?",
    a: "Continental breakfast is included in most room rates. A full à la carte breakfast is available at our garden restaurant at an additional cost. Please check your booking confirmation for details.",
  },
  {
    q: "Do you allow pets?",
    a: "We welcome well-behaved dogs in select cottages. Please notify us when booking and let us know the breed and size of your pet. A small additional fee applies.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Bookings cancelled more than 48 hours before check-in are fully refunded. Cancellations within 48 hours are subject to a one-night fee. No-shows are charged the full booking amount.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, we have complimentary private parking on-site for all guests. Please let us know your arrival time so we can ensure your space is ready.",
  },
  {
    q: "Do you have Wi-Fi?",
    a: "Yes, high-speed Wi-Fi is available throughout the property at no extra charge. You will receive the network details at check-in.",
  },
  {
    q: "Can you accommodate dietary requirements?",
    a: "Absolutely. Our kitchen is happy to cater to vegetarian, vegan, gluten-free, and most allergy requirements with advance notice. Please inform us when booking or prior to arrival.",
  },
  {
    q: "Is the restaurant open to non-guests?",
    a: "Yes, our garden restaurant welcomes outside visitors by reservation. Please contact us to book a table.",
  },
  {
    q: "Can I arrange airport transfers?",
    a: "Yes, we can arrange private transfers to and from the nearest airport. Please contact us at least 48 hours before your arrival with your flight details.",
  },
  {
    q: "Are the cottages suitable for children?",
    a: "We welcome families warmly. The Garden and Terrace Cottages are ideal for couples or small families. The Premium Villa Cottage comfortably accommodates two adults and two children. Please note the property has some unfenced garden areas — parental supervision is advised.",
  },
  {
    q: "Do you offer special packages or promotions?",
    a: "Yes, we occasionally offer seasonal packages including romantic retreats, extended-stay discounts, and culinary weekends. Check our website or contact us directly for current offers.",
  },
  {
    q: "Is there a minimum stay requirement?",
    a: "During peak season (June–September) we require a minimum stay of 3 nights. During the rest of the year, a 1-night minimum applies.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-warm-50">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          Got Questions?
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Everything you need to know about your stay at HOTEL_NAME. If your
          question isn&apos;t here, please get in touch — we&apos;re always happy to help.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white border border-warm-200 rounded-xl px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-heading text-lg font-semibold text-brown-900 hover:text-terracotta-500 hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-brown-700 leading-relaxed text-sm pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-warm-100 text-center px-4">
        <h2 className="font-heading text-3xl font-semibold text-brown-900 mb-3">
          Still have a question?
        </h2>
        <p className="text-brown-700 mb-7 max-w-md mx-auto">
          Our team is happy to help. Reach out and we&apos;ll get back to you within
          24 hours.
        </p>
        <Link href="/contact">
          <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 rounded-full px-8">
            Contact Us
          </Button>
        </Link>
      </section>
    </div>
  );
}
