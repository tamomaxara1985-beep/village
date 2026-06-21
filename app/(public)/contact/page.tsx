import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HOTEL_NAME for reservations, inquiries, or special requests.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "HOTEL_ADDRESS, HOTEL_CITY, HOTEL_COUNTRY",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "HOTEL_PHONE",
  },
  {
    icon: Mail,
    label: "Email",
    value: "HOTEL_EMAIL",
  },
  {
    icon: Clock,
    label: "Reception Hours",
    value: "Daily 08:00 – 21:00",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-warm-50">
      {/* Page Header */}
      <section className="py-20 bg-warm-100 text-center px-4">
        <p className="text-terracotta-500 text-sm font-medium tracking-widest uppercase mb-3">
          We&apos;d Love to Hear From You
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl font-semibold text-brown-900 mb-4">
          Contact Us
        </h1>
        <p className="text-brown-700 max-w-xl mx-auto leading-relaxed">
          Whether you have a question, a special request, or just want to say
          hello — our team is here for you.
        </p>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-xl border border-warm-200 p-8">
            <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-6">
              Send a Message
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-brown-700 text-sm mb-1.5 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-brown-700 text-sm mb-1.5 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-brown-700 text-sm mb-1.5 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-brown-700 text-sm mb-1.5 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Booking inquiry, special request, etc."
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-brown-700 text-sm mb-1.5 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="border-warm-200 bg-warm-50 focus:border-terracotta-400 resize-none"
                />
              </div>

              <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-warm-50 py-5 text-base font-medium rounded-lg">
                Send Message
              </Button>

              <p className="text-xs text-center text-brown-500">
                We typically respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-brown-900 mb-6">
              Find Us
            </h2>
            <ul className="space-y-6 mb-10">
              {contactDetails.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-terracotta-500/10 text-terracotta-500 mt-0.5">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-brown-500 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-brown-800 font-medium">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map placeholder */}
            <div
              className="h-56 rounded-xl overflow-hidden border border-warm-200 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #c8d8c0 0%, #a8c0a0 100%)",
              }}
            >
              <p className="text-brown-700 text-sm">
                Interactive map will appear here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
