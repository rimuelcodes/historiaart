import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, Send, CheckCircle2 } from 'lucide-react';
import { Artwork } from '../types';

interface AcquireModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const AcquireModal: React.FC<AcquireModalProps> = ({ artwork, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collectorType, setCollectorType] = useState('private');
  const [preferredSanctuary, setPreferredSanctuary] = useState('gh-mall-greenhills');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="acquire-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#181818] border border-[#2E2E2E] rounded-sm text-white shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#282828] pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#B3936E] uppercase mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Strictly Confidential Advisory</span>
            </div>
            <h3 id="acquire-modal-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
              Inquire to Acquire
            </h3>
            <p className="text-xs font-mono text-[#7E766D] mt-1">
              Private Curatorial Treaty • Institutional Collector Desk
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7E766D] hover:text-white transition-colors"
            aria-label="Close Acquisition Modal"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#B3936E] mx-auto animate-bounce" />
            <h4 className="font-serif text-2xl text-white">Curatorial Dossier Transmitted</h4>
            <p className="text-xs font-mono text-[#A29D94] max-w-md mx-auto leading-relaxed">
              Your inquiry regarding{' '}
              <span className="text-[#B3936E] font-medium">
                {artwork ? artwork.title : 'Historia Masterworks'}
              </span>{' '}
              has been encrypted and routed directly to the Chief Curatorial Directorate. A senior advisor will contact you within 4 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-[#8C7355] text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:bg-[#B3936E] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pre-populated Selected Artwork Banner */}
            {artwork && (
              <div className="bg-[#121212] border border-[#282828] p-4 rounded-sm flex items-center gap-4">
                <div className="w-16 h-16 bg-black shrink-0 overflow-hidden rounded-sm border border-[#333]">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono tracking-widest text-[#B3936E] uppercase block">
                    Catalog ID: {artwork.catalogId}
                  </span>
                  <h4 className="font-serif text-base text-white truncate font-normal">
                    {artwork.title}
                  </h4>
                  <div className="text-xs font-mono text-[#7E766D] flex items-center justify-between mt-0.5">
                    <span>{artwork.artist}</span>
                    <span className="text-[#B3936E] font-medium">{artwork.valuationPHP}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Collector Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Full Name / Foundation Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Don Enrique Zóbel Trust"
                  className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] px-3.5 py-2.5 text-xs text-white rounded-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Confidential Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="curator@foundation.org"
                  className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] px-3.5 py-2.5 text-xs text-white rounded-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Direct Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+63 917 000 0000"
                  className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] px-3.5 py-2.5 text-xs text-white rounded-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Collector Classification
                </label>
                <select
                  value={collectorType}
                  onChange={(e) => setCollectorType(e.target.value)}
                  className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] px-3 py-2.5 text-xs text-white rounded-sm outline-none transition-colors"
                >
                  <option value="private">Private Collector</option>
                  <option value="institutional">Museum / Institutional Trust</option>
                  <option value="family-office">Family Office / Heritage Estate</option>
                  <option value="art-advisor">Accredited Art Advisory</option>
                </select>
              </div>
            </div>

            {/* Preferred Sanctuary for Private Viewing */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                Preferred Wing for Physical Viewing
              </label>
              <select
                value={preferredSanctuary}
                onChange={(e) => setPreferredSanctuary(e.target.value)}
                className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] px-3 py-2.5 text-xs text-white rounded-sm outline-none transition-colors"
              >
                <option value="gh-mall-greenhills">GH Mall Greenhills Sanctuary (Luxury Concourse)</option>
                <option value="sm-megamall-art-center">SM Megamall Pavilion (4th Level Art Walk)</option>
                <option value="ortigas-east-pavilion">Ortigas East Pavilion (Sculpture Garden)</option>
                <option value="katipunan-vault">Katipunan Archival Vault (Private Conservation)</option>
              </select>
            </div>

            {/* Special Curatorial Instructions */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-[#7E766D] uppercase block">
                Curatorial Inquiries & Provenance Request
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Request physical condition report, microscopic pigment analysis, or private treaty terms..."
                className="w-full bg-[#121212] border border-[#2C2C2C] focus:border-[#8C7355] p-3 text-xs text-white rounded-sm outline-none transition-colors resize-none"
              />
            </div>

            {/* Institutional Guarantee */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-[#7E766D] bg-[#121212] p-3 rounded-sm border border-[#242424]">
              <ShieldCheck className="w-4 h-4 text-[#B3936E] shrink-0" />
              <span>
                All transactions protected by non-disclosure protocols and certified by Historia Art Gallery's lifetime authenticity deed.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#8C7355] hover:bg-[#B3936E] text-white text-xs font-mono tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#8C7355]/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Curatorial Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
