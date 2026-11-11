import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Lock, RefreshCw } from 'lucide-react';

export type PolicyTab = 'terms' | 'privacy' | 'refund' | 'faq';

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialTab = 'faq',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[160] bg-gallery-obsidian/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#F6F4F0] text-gallery-obsidian shadow-2xl border border-[#DCD8D0] rounded-sm flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Header */}
        <div className="h-16 shrink-0 px-6 sm:px-8 border-b border-[#DCD8D0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-gallery-bronze" />
            <span className="font-serif text-lg tracking-widest uppercase text-gallery-obsidian font-normal">
              Historia Institutional Governance & Advisory
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#DCD8D0] flex items-center justify-center hover:border-gallery-bronze hover:text-gallery-bronze transition-colors focus:outline-none"
            aria-label="Close Governance Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-[#DCD8D0] bg-[#EDE9E1]/40 flex gap-2 overflow-x-auto text-xs font-mono tracking-widest uppercase">
          {[
            { id: 'faq', label: 'Collector FAQs', icon: HelpCircle },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'refund', label: 'Consignment & Refund', icon: RefreshCw },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PolicyTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gallery-obsidian text-white border-gallery-obsidian shadow-sm'
                    : 'bg-white/80 text-gallery-muted hover:text-gallery-obsidian border-[#DCD8D0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-gallery-bronze" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-light leading-relaxed custom-scrollbar">
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-light text-gallery-obsidian">
                Frequently Asked Curatorial Questions
              </h3>
              <div className="space-y-4 divide-y divide-[#DCD8D0]">
                <div className="pt-3 first:pt-0 space-y-1">
                  <h4 className="font-mono text-xs font-semibold text-gallery-obsidian uppercase tracking-wider">
                    How is artwork authenticity and provenance certified?
                  </h4>
                  <p className="text-gallery-muted text-xs leading-relaxed">
                    Every artwork in the Historia repository undergoes multi-tier physical inspection, pigment analysis, and archival provenance verification adhering to Republic Act 10066 standards. Each accession is accompanied by a registered Certificate of Authenticity signed by recognized senior appraisers and estate trusts.
                  </p>
                </div>

                <div className="pt-3 space-y-1">
                  <h4 className="font-mono text-xs font-semibold text-gallery-obsidian uppercase tracking-wider">
                    Can private viewings be arranged outside public gallery hours?
                  </h4>
                  <p className="text-gallery-muted text-xs leading-relaxed">
                    Yes. Historia operates confidential viewing salons at our Greenhills and White Plains Katipunan sanctuaries for accredited collectors, family offices, and institutional acquisitions. Viewings may be scheduled 7 days a week via our Directorate Desk.
                  </p>
                </div>

                <div className="pt-3 space-y-1">
                  <h4 className="font-mono text-xs font-semibold text-gallery-obsidian uppercase tracking-wider">
                    What are the international shipping and crate conservation protocols?
                  </h4>
                  <p className="text-gallery-muted text-xs leading-relaxed">
                    Artworks are crated within hermetic museum-standard plywood crates lined with archival polyethylene foam, accompanied by desiccant microclimate packets and shock sensors. We partner with specialized art transit couriers for seamless bonded customs clearance worldwide.
                  </p>
                </div>

                <div className="pt-3 space-y-1">
                  <h4 className="font-mono text-xs font-semibold text-gallery-obsidian uppercase tracking-wider">
                    Does Historia accept artworks for secondary market consignment?
                  </h4>
                  <p className="text-gallery-muted text-xs leading-relaxed">
                    Yes. We actively facilitate private treaty consignments for canonical Philippine masters (Luna, Amorsolo, Manansala, Joya, Zóbel, Orlina, BenCab). Submissions are treated with complete discretion.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-light text-gallery-obsidian">
                Terms & Conditions of Acquisition
              </h3>
              <p className="text-xs text-gallery-muted">
                Last updated: January 2026 • Governing Law: Republic of the Philippines
              </p>
              <div className="space-y-3 text-xs text-gallery-obsidian/85 leading-relaxed">
                <p>
                  <strong>1. Nature of Transactions:</strong> Historia Fine Art Gallery Inc. acts as an institutional gallery and authorized private sales agent. All transactions are conducted under formal invoices specifying buyer verification, certified accession IDs, and escrow settlement protocols.
                </p>
                <p>
                  <strong>2. National Cultural Heritage Compliance:</strong> Certain historical masterworks designated as Important Cultural Property under Republic Act 10066 may be subject to legal export restrictions requiring National Museum of the Philippines clearance prior to international transit.
                </p>
                <p>
                  <strong>3. Title & Risk of Loss:</strong> Full title transfers to the collector upon cleared payment in full. Risk of loss passes upon delivery or physical handoff to the buyer’s authorized insured carrier.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-light text-gallery-obsidian">
                Collector Privacy Protocol & Data Security
              </h3>
              <p className="text-xs text-gallery-muted">
                Adhering to Republic Act 10173 (Philippine Data Privacy Act of 2012)
              </p>
              <div className="space-y-3 text-xs text-gallery-obsidian/85 leading-relaxed">
                <p>
                  Historia Art Gallery maintains strict institutional confidentiality regarding our collectors, benefactors, and private acquisitions. We will never sell, lease, or publicly disclose client identities, holdings, or treaty valuations.
                </p>
                <p>
                  All digital records and inquiries are encrypted end-to-end. Curatorial consultation notes are archived in hermetic, air-gapped repositories accessible solely by authorized directors.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-light text-gallery-obsidian">
                Condition Guarantee, Consignment & Refund Policy
              </h3>
              <div className="space-y-3 text-xs text-gallery-obsidian/85 leading-relaxed">
                <p>
                  <strong>Authenticity Guarantee:</strong> In the extraordinary event that an accessioned artwork is proven non-authentic by an accredited consensus panel of certified scholars and recognized catalogue raisonné authors within five (5) years of acquisition, Historia provides a 100% full refund of the purchase price.
                </p>
                <p>
                  <strong>Condition Reports & Inspection Period:</strong> Buyers are granted a seven (7) day post-receipt inspection period to review condition against our formal condition report prepared prior to delivery.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-14 shrink-0 px-6 sm:px-8 border-t border-[#DCD8D0] flex items-center justify-between text-[11px] font-mono text-gallery-muted bg-white">
          <span>Historia Legal & Governance • Manila</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gallery-obsidian text-white text-[10px] tracking-widest uppercase rounded-sm hover:bg-gallery-bronze transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
