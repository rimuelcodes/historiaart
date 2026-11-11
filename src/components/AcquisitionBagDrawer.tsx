import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Artwork } from '../types';

interface AcquisitionBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bagItems: Artwork[];
  onRemoveItem: (artworkId: string) => void;
  onClearBag: () => void;
  onOpenArtwork: (artwork: Artwork) => void;
}

export const AcquisitionBagDrawer: React.FC<AcquisitionBagDrawerProps> = ({
  isOpen,
  onClose,
  bagItems,
  onRemoveItem,
  onClearBag,
  onOpenArtwork,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [settlementMethod, setSettlementMethod] = useState<'wire' | 'card' | 'ewallet' | 'invoice'>('wire');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalValuation = bagItems.reduce((acc, item) => acc + item.valuationNumeric, 0);
  const formattedTotal = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(totalValuation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && bagItems.length > 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] bg-gallery-obsidian/75 backdrop-blur-sm flex justify-end animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-title"
    >
      <div
        className="w-full max-w-xl h-full bg-[#F6F4F0] text-gallery-obsidian shadow-2xl flex flex-col justify-between border-l border-[#DCD8D0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Drawer Header */}
        <div className="h-20 shrink-0 px-6 sm:px-8 border-b border-[#DCD8D0] flex items-center justify-between bg-[#F6F4F0]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-gallery-bronze stroke-[1.5]" />
            <div>
              <h3 id="bag-title" className="font-serif text-lg tracking-[0.16em] uppercase text-gallery-obsidian font-normal">
                Acquisition Portfolio Bag
              </h3>
              <span className="text-[10px] font-mono tracking-widest text-gallery-muted uppercase block">
                {bagItems.length} {bagItems.length === 1 ? 'Work Accessioned' : 'Works Accessioned'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#DCD8D0] flex items-center justify-center hover:border-gallery-bronze hover:text-gallery-bronze transition-colors focus:outline-none"
            aria-label="Close Bag Drawer"
            data-cursor-text="CLOSE"
          >
            <X className="w-4 h-4 stroke-[1.25]" />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 custom-scrollbar">
          {bagItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border border-[#DCD8D0] flex items-center justify-center mx-auto text-gallery-muted">
                <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
              </div>
              <h4 className="font-serif text-xl font-light text-gallery-obsidian">
                Portfolio Bag is Empty
              </h4>
              <p className="text-xs text-gallery-muted font-light max-w-sm mx-auto leading-relaxed">
                Add masterworks or contemporary pieces to your portfolio bag to request a consolidated provenance dossier and private acquisition pricing.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors rounded-sm"
              >
                Browse Masterworks
              </button>
            </div>
          ) : isSubmitted ? (
            <div className="py-16 text-center space-y-4 bg-white/70 border border-gallery-bronze/40 p-8 rounded-sm animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-gallery-bronze mx-auto stroke-[1.25]" />
              <h4 className="font-serif text-2xl font-normal text-gallery-obsidian">
                Acquisition Dossier Dispatched
              </h4>
              <p className="text-xs text-gallery-muted font-light leading-relaxed max-w-md mx-auto">
                Thank you, <span className="font-medium text-gallery-obsidian">{name}</span>. A private curatorial director has been assigned to your accession inquiry. The full condition reports, provenance certificates, and settlement instructions via <span className="font-mono text-gallery-bronze uppercase font-medium">{settlementMethod === 'wire' ? 'Bank Wire / BPI' : settlementMethod === 'card' ? 'Credit Card' : settlementMethod === 'ewallet' ? 'GCash / Maya' : 'Curatorial Invoice'}</span> will be delivered to <span className="font-medium text-gallery-obsidian">{email}</span> within 24 hours.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClearBag();
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-gallery-bronze text-white text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronzedark transition-colors rounded-sm"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Artworks List */}
              <div className="space-y-4 divide-y divide-[#DCD8D0]/60">
                {bagItems.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center justify-between group">
                    <div
                      className="flex gap-4 items-center cursor-pointer flex-1"
                      onClick={() => {
                        onClose();
                        onOpenArtwork(item);
                      }}
                      data-cursor-text="INSPECT"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#121212] rounded-sm overflow-hidden shrink-0 border border-[#DCD8D0]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono tracking-widest text-gallery-bronze uppercase block">
                          {item.catalogId}
                        </span>
                        <h5 className="font-serif text-sm sm:text-base font-light text-gallery-obsidian group-hover:text-gallery-bronze transition-colors line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-gallery-muted font-light">
                          {item.artist} ({item.year})
                        </p>
                        <span className="text-xs font-mono font-medium text-gallery-obsidian block pt-1">
                          {item.valuationPHP}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-gallery-muted hover:text-red-700 transition-colors focus:outline-none"
                      title="Remove from Portfolio"
                      data-cursor-text="REMOVE"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.25]" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Valuation Summary Bar */}
              <div className="p-4 bg-white/80 border border-[#DCD8D0] rounded-sm flex items-center justify-between text-xs font-mono">
                <span className="text-gallery-muted tracking-widest uppercase">
                  Consolidated Estimated Value
                </span>
                <span className="text-sm font-semibold text-gallery-bronze">
                  {formattedTotal}
                </span>
              </div>

              {/* Provenance Assurance Banner */}
              <div className="flex items-center gap-2.5 text-[10px] font-mono text-gallery-muted p-3 bg-[#EDE9E1]/50 border-l-2 border-gallery-bronze">
                <ShieldCheck className="w-4 h-4 text-gallery-bronze shrink-0 stroke-[1.25]" />
                <span>
                  All acquisitions include authenticated provenance certificate, Republic Act 10066 archival registration, and museum conservation crate.
                </span>
              </div>

              {/* Consolidated Acquisition Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="text-xs font-mono tracking-widest text-gallery-bronze uppercase">
                  Collector Dispatch Credentials
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / Benefactor *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#DCD8D0] px-3.5 py-2 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#DCD8D0] px-3.5 py-2 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Official Collector Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#DCD8D0] px-3.5 py-2 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono"
                />

                {/* Preferred Settlement Protocol */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-gallery-muted block">
                    Preferred Settlement Protocol
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      { id: 'wire', label: 'Bank Wire / BPI', sub: 'Institutional Escrow' },
                      { id: 'card', label: 'Credit Card', sub: 'Visa / MC / Amex' },
                      { id: 'ewallet', label: 'GCash / Maya', sub: 'Instant Digital' },
                      { id: 'invoice', label: 'Private Invoice', sub: 'Direct Treaty' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSettlementMethod(m.id as any)}
                        className={`p-2 text-left border rounded-sm transition-all ${
                          settlementMethod === m.id
                            ? 'border-gallery-bronze bg-[#8C7355]/10 text-gallery-obsidian font-medium ring-1 ring-gallery-bronze/40'
                            : 'border-[#DCD8D0] bg-white text-gallery-muted hover:border-gallery-bronze/50'
                        }`}
                      >
                        <span className="block text-[11px] leading-tight text-gallery-obsidian">{m.label}</span>
                        <span className="block text-[9px] text-gallery-muted uppercase tracking-wider">{m.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Optional: Acquisition notes, framing requests, or private viewing venue preference"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#DCD8D0] p-3 text-xs rounded-sm outline-none focus:border-gallery-bronze font-mono resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
                  data-cursor-text="DISPATCH"
                >
                  <span>Submit Consolidated Acquisition Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
                </button>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="h-14 shrink-0 px-6 sm:px-8 border-t border-[#DCD8D0] flex items-center justify-between text-[10px] font-mono text-gallery-muted bg-[#EDE9E1]/30">
          <span>Historia Advisory Desk • Manila</span>
          {bagItems.length > 0 && !isSubmitted && (
            <button
              onClick={onClearBag}
              className="hover:text-gallery-obsidian transition-colors underline"
            >
              Clear Bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
