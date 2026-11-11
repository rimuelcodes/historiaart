import React from 'react';
import { Compass, MapPin, Clock, Phone, Award, Sparkles, Building2 } from 'lucide-react';
import { SANCTUARIES_DATA } from '../data/sanctuaries';

interface AboutSpacesPageProps {
  onOpenPanorama: () => void;
  onOpenAcquire: () => void;
}

export const AboutSpacesPage: React.FC<AboutSpacesPageProps> = ({
  onOpenPanorama,
  onOpenAcquire,
}) => {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn select-none space-y-20">
      {/* Editorial Header */}
      <div className="border-b border-[#DCD8D0] pb-8">
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-2">
          <Building2 className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Institutional Heritage • Est. 2015</span>
        </div>
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-gallery-obsidian tracking-tight leading-tight">
            Curatorial Guardianship & Manila Sanctuaries
          </h1>
          <p className="text-gallery-muted text-xs sm:text-sm font-light mt-4 leading-relaxed">
            Founded in 2015, Historia Art Gallery operates as a premier institutional bridge uniting canonical Philippine fine art, contemporary mastery, and international connoisseurship across Metro Manila.
          </p>
        </div>
      </div>

      {/* Institutional Manifesto Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gallery-bronze font-semibold">
              The Curatorial Mandate
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-gallery-obsidian leading-snug">
              Preserving National Heritage, Cultivating Contemporary Genius
            </h2>
            <p className="text-xs sm:text-sm font-light text-gallery-obsidian/85 leading-relaxed">
              Historia was established with an uncompromising mission: to safeguard and champion the masterworks that define the Filipino cultural identity. From the academic triumphs of Juan Luna and Félix Resurrección Hidalgo in 19th-century Europe to the radiant pastoral luminism of Fernando Amorsolo, our repository serves as a sanctuary of scholarly attribution and verified provenance.
            </p>
            <p className="text-xs sm:text-sm font-light text-gallery-obsidian/85 leading-relaxed">
              Simultaneously, we maintain an active contemporary roster of forty leading painters and sculptors, offering private collectors, corporate foundations, and museums direct access to original Philippine visual culture.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DCD8D0] text-xs font-mono">
            <div>
              <span className="text-2xl font-serif text-gallery-obsidian block">2015</span>
              <span className="text-[10px] text-gallery-muted tracking-widest uppercase">Founded in Manila</span>
            </div>
            <div>
              <span className="text-2xl font-serif text-gallery-obsidian block">40+</span>
              <span className="text-[10px] text-gallery-muted tracking-widest uppercase">Represented Artists</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative rounded-sm overflow-hidden border border-[#DCD8D0] shadow-lg group">
          <img
            src="/assets/artworks/hero-chiaroscuro.png"
            alt="Historia Curatorial Gallery Wall"
            className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="text-[9px] font-mono tracking-widest uppercase text-gallery-bronze">
              Conservation Standards
            </span>
            <h3 className="font-serif text-xl font-light">
              Hermetic Microclimate Stabilization
            </h3>
            <p className="text-xs text-[#DCD8D0] font-light mt-1">
              Strict 21°C ambient temperature and 50% relative humidity regulation protecting canvases and sculptures against tropical hygroscopic stress.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Photogrammetry Interactive Banner */}
      <div className="relative rounded-sm overflow-hidden border border-[#DCD8D0] bg-[#121212] p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gallery-bronze uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spatial Digital Twin Tour</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-light">
            Step Inside the Grand Salon in 3D
          </h3>
          <p className="text-xs sm:text-sm font-light text-[#DCD8D0] leading-relaxed">
            Immerse yourself in our architectural exhibition spaces. Inspect calibrated 4000K track illuminance, anti-seismic hanging systems, and monumental gilded plinths in a full-screen interactive 3D panorama.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenPanorama}
              className="px-6 py-3 bg-white text-gallery-obsidian hover:bg-gallery-bronze hover:text-white transition-colors text-xs font-mono tracking-widest uppercase rounded-sm inline-flex items-center gap-2"
              data-cursor-text="EXPLORE 3D"
            >
              <Compass className="w-4 h-4 text-gallery-bronze" />
              <span>Launch Full-Screen 3D Walkthrough</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Real Metro Manila Sanctuaries */}
      <div className="space-y-8">
        <div className="border-b border-[#DCD8D0] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-gallery-bronze mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Physical Presence</span>
            </div>
            <h3 className="font-serif text-3xl font-light text-gallery-obsidian">
              Three Metro Manila Locations
            </h3>
          </div>
          <span className="text-xs font-mono text-gallery-muted tracking-widest uppercase">
            Greenhills • Tiendesitas • Katipunan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SANCTUARIES_DATA.map((sanctuary, index) => (
            <div
              key={sanctuary.id}
              className="border-t-2 border-[#DCD8D0] pt-6 flex flex-col justify-between group hover:border-gallery-bronze transition-colors space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                  <span className="text-gallery-muted">Location 0{index + 1}</span>
                  <span className="text-gallery-bronze font-semibold">{sanctuary.status}</span>
                </div>

                <h4 className="font-serif text-2xl font-light text-gallery-obsidian group-hover:text-gallery-bronze transition-colors">
                  {sanctuary.name}
                </h4>

                <span className="text-xs font-mono text-gallery-bronze block">
                  {sanctuary.type}
                </span>

                <p className="text-xs text-gallery-muted font-light leading-relaxed">
                  {sanctuary.address}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCD8D0]/60 space-y-2 text-xs font-mono text-gallery-muted">
                <div className="flex items-center gap-2 text-gallery-obsidian">
                  <Clock className="w-3.5 h-3.5 text-gallery-bronze shrink-0" />
                  <span className="text-[11px]">{sanctuary.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-gallery-bronze shrink-0" />
                  <span className="text-[11px]">Curator: {sanctuary.curator}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gallery-bronze shrink-0" />
                  <span className="text-[11px]">{sanctuary.phone}</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onOpenAcquire}
                    className="w-full py-2 bg-[#EDE9E1] hover:bg-gallery-bronze hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase rounded-sm text-gallery-obsidian"
                    data-cursor-text="VISIT"
                  >
                    Schedule Curatorial Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
