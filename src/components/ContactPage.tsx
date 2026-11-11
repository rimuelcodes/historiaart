import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'paintings' | 'sculptures' | 'digital' | 'jewelry' | 'general'>('paintings');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn select-none">
      {/* Editorial Header */}
      <div className="border-b border-[#DCD8D0] pb-8 mb-12">
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Curatorial Advisory & Private Treaty</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-light text-gallery-obsidian tracking-tight">
          Contact Directorate
        </h1>
        <p className="text-gallery-muted text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed">
          Inquire regarding artwork availability, consign canonical masterworks, or schedule a confidential private salon viewing with Historia’s senior appraisers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Official Contact Desk & Manila Spaces */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 bg-[#EDE9E1]/40 border border-[#DCD8D0] rounded-sm space-y-6">
            <h3 className="font-serif text-2xl font-light text-gallery-obsidian">
              Directorate Desk
            </h3>
            <p className="text-xs sm:text-sm font-light text-gallery-muted leading-relaxed">
              Our curatorial staff responds to formal acquisitions, condition report requests, and museum loans within 24 operational hours.
            </p>

            <div className="space-y-4 pt-2 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gallery-bronze shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gallery-muted tracking-widest uppercase block">Official Inquiries</span>
                  <a href="mailto:historiaartopc@gmail.com" className="text-gallery-obsidian font-medium hover:text-gallery-bronze transition-colors">
                    historiaartopc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gallery-bronze shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gallery-muted tracking-widest uppercase block">Direct Hotlines & WhatsApp</span>
                  <span className="text-gallery-obsidian block font-medium">0967-100-0468</span>
                  <span className="text-gallery-obsidian block font-medium">0995-245-5840</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gallery-bronze shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gallery-muted tracking-widest uppercase block">Flagship Gallery</span>
                  <span className="text-gallery-obsidian block">3F, GH Mall Greenhills, San Juan City</span>
                  <span className="text-gallery-muted block text-[11px]">Level 1, Bldg. A, Tiendesitas Mall, Pasig City</span>
                  <span className="text-gallery-muted block text-[11px]">Unit 103, White Plains Katipunan, Quezon City</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCD8D0] flex items-center gap-2 text-[10px] font-mono text-gallery-muted">
              <ShieldCheck className="w-4 h-4 text-gallery-bronze stroke-[1.25]" />
              <span>Full Provenance Guarantee & Republic Act 10066 Protection</span>
            </div>
          </div>

          {/* Social Channels */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted block">
              Official Media Channels
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { name: 'Facebook', url: 'https://facebook.com/historiaartgallery' },
                { name: 'Instagram', url: 'https://instagram.com/historiaartgallery' },
                { name: 'TikTok', url: 'https://tiktok.com/@historiaart' },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/historia-art' },
              ].map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-white border border-[#DCD8D0] hover:border-gallery-bronze hover:text-gallery-bronze transition-colors rounded-sm uppercase tracking-wider text-[11px]"
                  data-cursor-text={channel.name.toUpperCase()}
                >
                  {channel.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Consultation Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#DCD8D0] rounded-sm shadow-sm">
          {submitted ? (
            <div className="py-16 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-gallery-bronze mx-auto stroke-[1.25]" />
              <h3 className="font-serif text-3xl font-light text-gallery-obsidian">
                Inquiry Dispatched to Senior Curator
              </h3>
              <p className="text-xs sm:text-sm font-light text-gallery-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-medium text-gallery-obsidian">{name}</span>. Your private dossier inquiry regarding <span className="font-mono text-gallery-bronze">{category.toUpperCase()}</span> has been forwarded to our directorate desk. Expect a confidential response within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="mt-6 px-6 py-2.5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors rounded-sm"
              >
                Send Additional Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gallery-bronze font-semibold">
                  Curatorial Commission & Inquiries
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-gallery-obsidian">
                  Ready to Start Your Next Artwork?
                </h3>
                <p className="text-xs font-light text-gallery-muted">
                  Commission bespoke fine art, inquire about listed acquisitions, or arrange private museum consignments. All communications remain strictly confidential under collector privacy protocols.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Collector / Institution"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F6F4F0] border border-[#DCD8D0] px-3.5 py-2.5 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+63 9XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F6F4F0] border border-[#DCD8D0] px-3.5 py-2.5 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="collector@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F6F4F0] border border-[#DCD8D0] px-3.5 py-2.5 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted">
                  Primary Artwork Category Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { label: 'Painting', value: 'paintings' },
                    { label: 'Sculpture', value: 'sculptures' },
                    { label: 'Digital Art', value: 'digital' },
                    { label: 'Jewelry', value: 'jewelry' },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value as any)}
                      className={`py-2 px-2 text-center border rounded-sm transition-all text-[11px] ${
                        category === cat.value
                          ? 'bg-gallery-bronze text-white border-gallery-bronze'
                          : 'bg-[#F6F4F0] text-gallery-muted border-[#DCD8D0] hover:text-gallery-obsidian'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted">
                  Inquiry Details / Specific Artworks *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail desired artist, accession number, appraisal request, or private appointment scheduling..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F6F4F0] border border-[#DCD8D0] p-3 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
                data-cursor-text="SEND"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.25]" />
                <span>Submit Private Curatorial Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
