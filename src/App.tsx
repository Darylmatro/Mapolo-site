import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  Hammer,
  HardHat,
  Home,
  Layout,
  MapPin,
  MessageCircle,
  Paintbrush,
  PenTool,
  PhoneCall,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const heroMedia =
  "https://cdn.coverr.co/videos/coverr-construction-workers-on-a-building-site-9448/1080p.mp4";

const services = [
  {
    title: "Maçonnerie & structures",
    description:
      "Fondations, dalles, murs porteurs et ouvrages béton armé réalisés par nos équipes internes.",
    icon: Hammer,
    image:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Rénovation globale",
    description:
      "Réhabilitation intérieure / extérieure avec coordination tous corps d’état et finitions haut de gamme.",
    icon: Paintbrush,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Toiture & couverture",
    description:
      "Charpente, tuiles, zinc, étanchéité et isolations thermiques conformes RE2020.",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Gros œuvre / Second œuvre",
    description:
      "Gestion complète du chantier, pilotage des sous-traitants et contrôle qualité digitalisé.",
    icon: HardHat,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Études & plans",
    description:
      "Bureau d’études intégré, maquettes BIM, dimensionnement structurel et chiffrage précis.",
    icon: PenTool,
    image:
      "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Maintenance & SAV",
    description:
      "Interventions rapides post-livraison, diagnostics structurels et mises aux normes.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
  },
];

const projectCategories = ["Tous", "Maisons", "Immeubles", "Rénovations"];

const projects = [
  {
    title: "Villa Horizon",
    location: "Bordeaux",
    category: "Maisons",
    mediaType: "photo",
    media:
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1600&q=80",
    description: "Maison contemporaine 320 m², ossature béton + bardage bois.",
  },
  {
    title: "Résidence Lys",
    location: "Lille",
    category: "Immeubles",
    mediaType: "photo",
    media:
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=1600&q=80",
    description: "Immeuble R+7 certifié HQE, 58 logements.",
  },
  {
    title: "Hangar Atlas",
    location: "Paris",
    category: "Rénovations",
    mediaType: "video",
    media:
      "https://cdn.coverr.co/videos/coverr-two-architects-on-a-building-site-4810/1080p.mp4",
    description: "Transformation d’un hangar industriel en espaces tertiaires.",
  },
  {
    title: "Campus Arborescence",
    location: "Nantes",
    category: "Immeubles",
    mediaType: "photo",
    media:
      "https://images.unsplash.com/photo-1505819426091-8697acb6d1e0?auto=format&fit=crop&w=1600&q=80",
    description: "Bureaux hybrides, patios végétalisés, livraison 2024.",
  },
];

const values = [
  {
    title: "Exigence chantier",
    description: "Charte qualité, contrôles hebdomadaires et reporting client.",
  },
  {
    title: "Sécurité prioritaire",
    description: "Plan de prévention digital, EPI connectés, audits inopinés.",
  },
  {
    title: "Engagement durable",
    description: "Tri 7 flux, matériaux bas carbone, suivi carbone chantier.",
  },
];

const certifications = [
  { label: "Qualibat 2112", icon: ShieldCheck },
  { label: "RGE rénovation", icon: Award },
  { label: "ISO 9001", icon: Layout },
];

const teamPhotos = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
];

const galleryAssets = [
  "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
];

const fadeIn = (delay = 0.1, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay },
});

const SectionTitle = ({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) => (
  <div className="text-center space-y-4">
    {eyebrow && (
      <p className="text-xs uppercase tracking-[0.5em] text-brand.accent">
        {eyebrow}
      </p>
    )}
    <h2 className="font-heading text-3xl text-white md:text-5xl">{title}</h2>
    {subtitle && <p className="text-lg text-slate-300">{subtitle}</p>}
  </div>
);

function App() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-brand.blue text-white">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
        >
          <source src={heroMedia} type="video/mp4" />
        </video>
        <div className="relative bg-gradient-to-b from-brand.navy/90 via-brand.blue/95 to-brand.blue py-20">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Building2 className="text-brand.accent" />
              </div>
              <div>
                <p className="font-heading text-lg">Mapolo SA</p>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-300">
                  Construction & rénovation
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:border-brand.accent hover:text-brand.accent"
            >
              Demander un devis
            </a>
          </nav>

          <motion.section
            className="mx-auto mt-16 max-w-4xl px-6 text-center space-y-8"
            {...fadeIn()}
          >
            <h1 className="font-heading text-4xl md:text-6xl">
              Construction, rénovation & expertise sur-mesure.
            </h1>
            <p className="text-lg text-slate-200">
              Du gros œuvre aux finitions, Mapolo sécurise vos chantiers, pilote
              les équipes terrain et vous livre des espaces durables, prêts à
              vivre.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#realisations"
                className="rounded-full border border-white/40 px-8 py-3 font-semibold text-white transition hover:border-brand.accent hover:text-brand.accent"
              >
                Voir nos réalisations
              </a>
            </div>
          </motion.section>
        </div>
      </header>

      <main className="space-y-24 bg-brand.blue py-20">
        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-7xl px-6 space-y-12">
          <SectionTitle
            eyebrow="Nos services"
            title="Un pôle BTP complet, de l’étude au SAV."
            subtitle="Chaque prestation combine expertise terrain, photos nettes et rapports précis pour rassurer vos clients."
          />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
                  {...fadeIn(index * 0.05)}
                >
                  <div className="relative h-52">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Icon className="absolute left-5 top-5 h-10 w-10 rounded-2xl bg-black/40 p-2 text-brand.accent" />
                  </div>
                  <div className="space-y-3 p-6">
                    <h3 className="font-heading text-2xl">{service.title}</h3>
                    <p className="text-slate-200">{service.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section
          id="realisations"
          className="mx-auto max-w-7xl space-y-12 px-6"
        >
          <SectionTitle
            eyebrow="Réalisations"
            title="Des chantiers livrés avec photos 4K & vidéos immersives."
            subtitle="Activez le filtre pour naviguer entre nos maisons, immeubles ou rénovations complètes."
          />
          <div className="flex flex-wrap justify-center gap-3">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-brand.accent text-brand.blue"
                    : "border border-white/20 text-white hover:border-brand.accent/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                {...fadeIn(index * 0.07)}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  {project.mediaType === "video" ? (
                    <video
                      src={project.media}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <PhotoProvider>
                      <PhotoView src={project.media}>
                        <img
                          src={project.media}
                          alt={project.title}
                          className="h-full w-full cursor-zoom-in object-cover transition duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-brand.accent">
                        {project.category}
                      </p>
                      <h3 className="font-heading text-2xl">{project.title}</h3>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-brand.accent" />
                      {project.location}
                    </span>
                  </div>
                  <p className="text-slate-300">{project.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="mx-auto max-w-7xl space-y-12 px-6">
          <SectionTitle
            eyebrow="Galerie"
            title="Photos nettes & prêtes pour vos comités."
            subtitle="Lightbox intégrée grâce à react-photo-view pour zoomer sans perte."
          />
          <PhotoProvider>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryAssets.map((asset, index) => (
                <motion.div
                  key={asset + index}
                  className="group relative overflow-hidden rounded-3xl border border-white/5"
                  {...fadeIn(index * 0.03)}
                >
                  <PhotoView src={asset}>
                    <img
                      src={asset}
                      alt="Projet Mapolo"
                      className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </PhotoView>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </PhotoProvider>
        </section>

        {/* ABOUT */}
        <section id="apropos" className="mx-auto max-w-7xl space-y-12 px-6">
          <SectionTitle
            eyebrow="À propos"
            title="Une équipe BTP engagée et certifiée."
            subtitle="Depuis 2008, Mapolo accompagne les maîtres d’ouvrage privés et publics en France."
          />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div className="space-y-8" {...fadeIn(0.1, 16)}>
              <div className="grid gap-6 md:grid-cols-3">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <h3 className="font-heading text-xl">{value.title}</h3>
                    <p className="text-slate-300">{value.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {certifications.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <span
                      key={cert.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white"
                    >
                      <Icon className="h-4 w-4 text-brand.accent" />
                      {cert.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
            <motion.div className="grid gap-4" {...fadeIn(0.2, 16)}>
              {teamPhotos.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`Équipe Mapolo ${index + 1}`}
                  className="h-40 w-full rounded-3xl object-cover"
                  loading="lazy"
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-2">
            <motion.div className="space-y-6" {...fadeIn()}>
              <SectionTitle
                eyebrow="Contact"
                title="Parlons de votre chantier."
                subtitle="Réponse sous 24h, visite terrain possible dès J+3."
              />
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Nom & prénom"
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email professionnel"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="Décrivez votre projet, vos délais et vos attentes."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand.accent px-6 py-3 font-semibold text-brand.blue transition hover:bg-brand.accent/90"
                >
                  Envoyer ma demande
                </button>
              </form>
            </motion.div>
            <motion.div className="space-y-5" {...fadeIn(0.1)}>
              <div className="h-72 overflow-hidden rounded-3xl">
                <iframe
                  title="Mapolo localisation"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999585028044!2d2.29229261567497!3d48.85837307928733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdf8df1dd31%3A0x42b0f3720c0bdf!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1614799947957!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="rounded-3xl border border-white/10 bg-brand.navy/60 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-brand.accent">
                  Coordonnées
                </p>
                <h3 className="font-heading text-2xl">+33 1 84 80 24 30</h3>
                <p className="text-slate-300">hello@mapolo-btp.com</p>
                <div className="mt-3 flex flex-col gap-1 text-sm text-slate-300">
                  <span>54 rue des Artisans, 75011 Paris</span>
                  <span>Horaires : 07h00 - 20h00 / astreinte 24/7</span>
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
                  <PhoneCall className="h-5 w-5 text-brand.accent" />
                  Hotline chantiers disponible en 2 sonneries.
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-brand.navy py-8 text-center text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()} Mapolo BTP — Construction, rénovation &
          expertise.
        </p>
      </footer>
    </div>
  );
}

export default App;
