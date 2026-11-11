import { Artist } from '../types';

export const ARTISTS_DATA: Artist[] = [
  // Canonical Masters
  {
    id: 'juan-luna',
    name: 'Juan Luna y Novicio',
    dates: '1857–1899',
    movement: 'Academic Realism & Dramatic Chiaroscuro',
    bio: 'First internationally celebrated Filipino master painter. Gold Medalist at the 1884 Madrid Exposición Nacional de Bellas Artes for Spoliarium. Master of complex historical compositions, Parisian bohemian scenes, and anatomical drama.',
    notableWork: 'The Academic Conclave & The Parisian Life',
    catalogCount: 14,
    imagePreview: '/assets/artworks/hero-chiaroscuro.png',
    rosterType: 'canonical'
  },
  {
    id: 'fernando-amorsolo',
    name: 'Fernando Amorsolo y Cuenca',
    dates: '1892–1972',
    movement: 'Philippine Luminism & Pastoral Impressionism',
    bio: 'The Philippines’ inaugural National Artist in Visual Arts. Globally celebrated for backlighting (“contra-luz”) technique, capturing tropical golden hour warmth, idyllic rural landscapes, and graceful figurative tondos.',
    notableWork: 'The Golden Hour Gathering (Tondo) & Harvest Scene',
    catalogCount: 22,
    imagePreview: '/assets/artworks/tondo-golden-hour.png',
    rosterType: 'canonical'
  },
  {
    id: 'guillermo-tolentino',
    name: 'Guillermo Tolentino',
    dates: '1890–1976',
    movement: 'Classical Monumentalism & Neoclassical Bronze',
    bio: 'National Artist for Sculpture and father of Philippine classical sculpture. Trained at the Royal Academy of Fine Arts in Rome. Renowned for bronze casting mastery balancing heroic anatomy with spiritual purity.',
    notableWork: 'The Oblation & Bonifacio Monument Studies',
    catalogCount: 8,
    imagePreview: '/assets/artworks/tolentino-bronze-sculpture.jpg',
    rosterType: 'canonical'
  },
  {
    id: 'benedicto-cabrera',
    name: 'Benedicto Cabrera (BenCab)',
    dates: 'b. 1942',
    movement: 'Contemporary Figuration & Neo-Realism',
    bio: 'National Artist for Visual Arts. Iconic chronicler of Philippine identity through seminal Sabel series, Larawan nostalgia cycles, and masterfully balanced acrylic and archival printmaking.',
    notableWork: 'Variations of Sabel in Flight',
    catalogCount: 11,
    imagePreview: '/assets/artworks/luna-academic-assembly.jpg',
    rosterType: 'canonical'
  },
  {
    id: 'ramon-orlina',
    name: 'Ramon Orlina',
    dates: 'b. 1944',
    movement: 'Pioneering Optical Glass Sculpture',
    bio: 'Internationally acclaimed Filipino sculptor renowned for carving residual blocks of emerald, amber, and cobalt optical glass. Developed proprietary cold-carving and polishing techniques without heat.',
    notableWork: 'Prismatic Solitude & Resplendent Wing',
    catalogCount: 9,
    imagePreview: '/assets/artworks/tolentino-bronze-sculpture.jpg',
    rosterType: 'canonical'
  },
  {
    id: 'romulo-olazo',
    name: 'Romulo Olazo',
    dates: '1934–2015',
    movement: 'Lyrical Abstract Expressionism & Diaphanous Layers',
    bio: 'Master of transparency and gossamer light. Renowned for monumental Diaphanous series using serigraphy and layered oil glazes to achieve ethereal, floating geometric planes.',
    notableWork: 'Diaphanous Series #418',
    catalogCount: 7,
    imagePreview: '/assets/artworks/monet-vangogh-nocturne.jpg',
    rosterType: 'canonical'
  },

  // Contemporary Roster (Historia Art Live Gallery Artists)
  {
    id: 'eman-santos',
    name: 'Eman Santos',
    dates: 'Contemporary Roster',
    movement: 'Metaphorical Bronze & Narrative Figuration',
    bio: 'Renowned contemporary sculptor known for intricate figurative bronze compositions exploring spirituality, philosophical equilibrium, and ancestral memory. Frequent headliner at Manila art fairs.',
    notableWork: 'Equilibrium of the Seeker',
    catalogCount: 6,
    imagePreview: '/assets/artworks/tolentino-bronze-sculpture.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'windsor-magnaye',
    name: 'Windsor Magnaye',
    dates: 'Contemporary Roster',
    movement: 'Textural Expressionism & Spatial Abstraction',
    bio: 'Master of dynamic architectural impasto. Explores geological and urban decay with heavy mineral pigments, cold wax glazes, and raw linen exposures.',
    notableWork: 'Stratigraphy in Rust & Ocher',
    catalogCount: 8,
    imagePreview: '/assets/artworks/hero-chiaroscuro.png',
    rosterType: 'contemporary'
  },
  {
    id: 'marko-bello',
    name: 'Marko Bello',
    dates: 'Contemporary Roster',
    movement: 'Digital-Physical Chromatic Synthesis',
    bio: 'Pioneering contemporary multimedia artist synthesizing high-fidelity digital renders with hand-applied gold leaf and archival giclée proofs. Featured in Historia’s Elevating Brilliance showcase.',
    notableWork: 'Luminance Synthesis',
    catalogCount: 5,
    imagePreview: '/assets/artworks/monet-vangogh-nocturne.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'art-arreglado',
    name: 'Art Arreglado',
    dates: 'Contemporary Roster',
    movement: 'Figurative Surrealism & Pastoral Dreamscapes',
    bio: 'Contemporary painter celebrated for surrealist reimagining of everyday rural Philippine life. His vibrant palettes blend warm nostalgia with contemplative emotional intimacy.',
    notableWork: 'Whispers Beneath the Mango Canopy',
    catalogCount: 7,
    imagePreview: '/assets/artworks/amorsolo-planting-rice.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'mari-zhar-carvill',
    name: 'Mari Zhar Carvill',
    dates: 'Contemporary Roster',
    movement: 'Organic Gesturalism & Botanical Abstraction',
    bio: 'Known for meditative explorations of Philippine flora and maritime coral structures. Her canvases feature delicate translucent washes and rhythmic calligraphic strokes.',
    notableWork: 'Subterranean Flora in Indigo',
    catalogCount: 4,
    imagePreview: '/assets/artworks/luna-parisian-life.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'nilo-badajos',
    name: 'Nilo Badajos',
    dates: 'Contemporary Roster',
    movement: 'Precision Realism & Social Observation',
    bio: 'Hyper-detailed realist painter whose luminous brushwork captures the dignity of working-class Filipinos, traditional trade crafts, and time-worn ancestral heirlooms.',
    notableWork: 'The Artisan’s Twilight',
    catalogCount: 6,
    imagePreview: '/assets/artworks/juan-luna-studio-portrait.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'darwin-pena',
    name: 'Darwin Peña',
    dates: 'Contemporary Roster',
    movement: 'Lyrical Geometric Abstraction',
    bio: 'Contemporary abstract painter exploring color harmony, rhythmic grid patterns, and urban memory through layered acrylic glazes and tactile impasto lines.',
    notableWork: 'Resonance in Alabaster and Gold',
    catalogCount: 5,
    imagePreview: '/assets/artworks/luna-academic-assembly.jpg',
    rosterType: 'contemporary'
  },
  {
    id: 'sofia-martinez',
    name: 'Sofia Martinez',
    dates: 'Contemporary Roster',
    movement: 'Contemporary Sculptural Ceramics & Cold Bronze',
    bio: 'Pioneering ceramicist and sculptor blending traditional terracotta firing with patinated bronze filigree, investigating feminine archetypes and ancestral vessel forms.',
    notableWork: 'Vessel of the Horizon',
    catalogCount: 4,
    imagePreview: '/assets/artworks/tolentino-bronze-sculpture.jpg',
    rosterType: 'contemporary'
  }
];
