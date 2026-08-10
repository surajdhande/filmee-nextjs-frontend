"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Film, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown 
} from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you as soon as possible.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const contactMethods = [
    {
      title: "General Support",
      desc: "Questions about your account or platform features",
      detail: "support@filmconnect.com",
      sub: "Response time: 24 hours",
      icon: MessageCircle
    },
    {
      title: "Investment Inquiries",
      desc: "Questions about investment opportunities",
      detail: "+1 (555) 123-4567",
      sub: "Response time: Same day",
      icon: Phone
    },
    {
      title: "Business Development",
      desc: "Partnership and business opportunities",
      detail: "business@filmconnect.com",
      sub: "Response time: 48 hours",
      icon: Mail
    }
  ];

  const offices = [
    {
      city: "Los Angeles",
      address: "1234 Hollywood Blvd, Suite 500\nLos Angeles, CA 90028",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri 9AM-6PM PST"
    },
    {
      city: "New York",
      address: "567 Broadway, Floor 12\nNew York, NY 10012",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      city: "London",
      address: "89 Wardour Street\nLondon W1D 6QH, UK",
      phone: "+44 20 7123 4567",
      hours: "Mon-Fri 9AM-5PM GMT"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white pb-24">
      
      {/* Custom Sticky Header */}
      <header className="fixed top-0 left-0 z-[999] w-full border-b border-zinc-900 bg-black/95 backdrop-blur-md">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-16">
          
          {/* Left Actions */}
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-black tracking-wider uppercase"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">BACK</span>
            </button>
            
            {/* Divider */}
            <div className="hidden sm:block h-6 w-px bg-zinc-800 mx-4 sm:mx-6" />
            
            {/* FilmConnect branding */}
            <div className="flex items-center gap-2">
              <Film size={18} className="text-red-500 sm:w-[20px] sm:h-[20px]" />
              <span className="text-red-500 font-extrabold text-xs sm:text-sm sm:text-base tracking-widest uppercase">
                FILMCONNECT
              </span>
            </div>
          </div>

          {/* Right Action */}
          <Link href="/signup">
            <button className="rounded-full bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 text-[10px] sm:px-6 sm:py-2.5 sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] uppercase tracking-wider">
              Get Started
            </button>
          </Link>
          
        </div>
      </header>

      {/* Main Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-16 pt-28 sm:pt-36">
        
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 pt-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-4">
            Get in <span className="text-red-500">Touch</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about FilmConnect? We&apos;re here to help you succeed in your filmmaking journey.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white text-center mb-8 sm:mb-12 tracking-wide">
            Contact Methods
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={i}
                  className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col hover:border-zinc-700/80 hover:bg-[#121215]/60 transition-all duration-300 shadow-md min-h-[170px] sm:min-h-[190px] relative group"
                >
                  <div className="p-2.5 bg-red-950/10 rounded-xl w-fit mb-4">
                    <IconComponent size={20} className="text-red-500 sm:w-[24px] sm:h-[24px]" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug tracking-wide group-hover:text-red-400 transition-colors">
                    {method.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {method.desc}
                  </p>
                  
                  <div className="mt-auto flex flex-col gap-1">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      {method.detail}
                    </span>
                    <span className="text-zinc-500 text-[11px] sm:text-xs font-semibold">
                      {method.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Send us a Message */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white text-center mb-2 tracking-wide">
            Send us a Message
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm text-center mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
            Fill out the form below and we&apos;ll get back to you as soon as possible
          </p>

          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-[#0b0c10]/30 p-4 sm:p-10 backdrop-blur-sm shadow-md flex flex-col gap-4 sm:gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John" 
                  required
                  className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-2.5 sm:py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/80 transition-colors text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe" 
                  required
                  className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-2.5 sm:py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/80 transition-colors text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                required
                className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-2.5 sm:py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/80 transition-colors text-xs sm:text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Subject</label>
              <div className="relative">
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-3.5 px-4 text-white appearance-none focus:outline-none focus:border-red-500/80 transition-colors text-xs sm:text-sm cursor-pointer pr-10"
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="General Support">General Support</option>
                  <option value="Investment Inquiries">Investment Inquiries</option>
                  <option value="Business Development">Business Development</option>
                  <option value="Feedback">Feedback</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..." 
                rows={5}
                required
                className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/80 transition-colors text-xs sm:text-sm resize-none leading-relaxed"
              />
            </div>

            <button 
              type="submit" 
              className="mt-2 w-full flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] uppercase tracking-wider active:scale-[0.99]"
            >
              <MessageCircle size={16} />
              SEND MESSAGE
            </button>
          </form>
        </div>

        {/* Our Offices */}
        <div id="our-offices" className="mb-16 sm:mb-24 scroll-mt-24">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white text-center mb-8 sm:mb-12 tracking-wide">
            Our Offices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {offices.map((office, i) => (
              <div
                key={i}
                className="bg-[#0b0c10]/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col hover:border-zinc-700/80 hover:bg-[#121215]/60 transition-all duration-300 shadow-md"
              >
                <div className="p-2.5 bg-red-950/10 rounded-xl w-fit mb-4">
                  <MapPin size={20} className="text-red-500 sm:w-[24px] sm:h-[24px]" />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-wide">
                  {office.city}
                </h3>
                
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line mb-6">
                  {office.address}
                </p>
                
                <div className="mt-auto flex flex-col gap-3 border-t border-zinc-900 pt-4">
                  <div className="flex items-center gap-2.5 text-zinc-300">
                    <Phone size={14} className="text-red-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-400">
                    <Clock size={14} className="text-red-500 flex-shrink-0" />
                    <span className="text-xs">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Need Quick Answers? Section */}
        <div className="border-t border-zinc-900 pt-16 text-center">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-3 tracking-wide">
            Need Quick Answers?
          </h2>
          <p className="text-zinc-400 text-xs sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Check out our help center for frequently asked questions and detailed guides
          </p>
          
          <Link href="/help">
            <button className="rounded-full border border-red-650 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 uppercase tracking-wider">
              VISIT HELP CENTER
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}
