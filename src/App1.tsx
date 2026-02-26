import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  Hammer,
  HardHat,
  Layout,
  MapPin,
  Mail,
  Menu,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

const heroMedia =
  "https://cdn.coverr.co/videos/coverr-construction-workers-on-a-building-site-9448/1080p.mp4";

const services = [
  {
    title: "Assainissement",
    description:
      "Réseaux d'eaux pluviales et usées, fossés septiques, stations de relevage et drainage pour voiries et plateformes.",
    icon: Wrench,
    image: "/img/assainir.jpg",
  },
  {
    title: "Terrassement",
    description:
      "Décapage, nivellement, remblaiement et compactage pour fondations, voiries, parkings et plateformes logistiques.",
    icon: Hammer,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Revêtement en chaussée béton",
    description:
      "Routes, parkings et aires de circulation en béton armé ou bitumeux, finitions de qualité et durabilité optimale.",
    icon: HardHat,
    image: "/img/beton.jpg",
  },
];

const projectCategories = ["Tous", "Immeubles", "Rénovations"];

const projects = [
  {
    title: "GDIZ BENIN",
    location: "Cotonou",
    category: "Immeubles",
    mediaType: "photo",
    media: "/img/Sipi.webp",
    description:
      "Le bâtiment principal s'étend sur trois étages plus une toiture terrasse au 4eme niveau avec une emprise au sol de 650m².",
  },
  {
    title: "Cour constitutionnelle",
    location: "Cotonou",
    category: "Rénovations",
    mediaType: "photo",
    media: "/img/ccour.webp",
    description:
      "Traveaux de rénovation des immeubles abritant les bureaux de la Cour constitutionnelle. Un bâtiment R+3 de haut standing à construire et trois bâtiment R+1 à R+2 dont un de type colonial à rénové.",
  },
  {
    title: "Caisse Nationale de Sécurité Sociale (CNSS) ",
    location: "Cotonou",
    category: "Immeubles",
    mediaType: "photo",
    media: "/img/Cnss.webp",
    description:
      "-	La construction d'un immeuble à grande hauteur réparti sur neuf (9) niveaux (sous-sol, rez-de-chaussée et 7 étages) couvrant une superficie totale de planchers de 5081,62 m²;(gros œuvre-revêtement-plomberie sanitaire-peinture R+7 avec sous-sol).",
  },
  {
    title: "Panorama",
    location: "Lomé",
    category: "Immeubles",
    mediaType: "photo",
    media: "/img/panorama.webp",
    description:
      "Travaux de construction d'un Immeuble R+9 avec sous-sol à Lomé au Togo. Le projet est constitué d'une impressionnante composition du béton et est situé à proximité de la mer non loin du grand marché Assigamè dans la ville de Lomé.",
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
  "/img/Sipi.webp",
  "/img/ccour.webp",
  "/img/Cnss.webp",
  "/img/panorama.webp",
  "/img/ccour2.jpg",
  "/img/ketou.png",
  "/img/ecole.jpg",
  "/img/ketou2.png",
  "/img/ecole2.png",
];

const fadeIn = (delay = 0.1, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay },
});

/** Animation immédiate au chargement (sans attente du scroll) */
const fadeInOnMount = (delay = 0.1, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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

const HomePage = () => {
  const stats = [
    { value: "15+", label: "Années d'expérience" },
    { value: "200+", label: "Projets réalisés" },
    { value: "50+", label: "Experts qualifiés" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen flex flex-col">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
        >
          <source src={heroMedia} type="video/mp4" />
        </video>
        <div className="relative bg-gradient-to-b from-brand.navy/80 via-brand.blue/90 to-brand.blue flex-1 flex flex-col justify-center">
          <motion.div
            className="mx-auto max-w-5xl px-6 text-center space-y-4 md:space-y-6"
            {...fadeIn()}
          >
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            ></motion.div>
            <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl">
              MAPOLO SA
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Bâtiment & Travaux Publics — Construisons ensemble l'avenir de
              l'Afrique
            </p>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
              Expertise reconnue en construction, rénovation et travaux routiers
              au Bénin, Togo et dans la sous-région
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-3 md:gap-4 pt-4"
              {...fadeIn(0.2)}
            >
              <NavLink
                to="/realisations"
                className="rounded-full bg-brand.accent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-brand.blue transition hover:bg-brand.accent/90 hover:scale-105"
              >
                Voir nos réalisations
              </NavLink>
              <NavLink
                to="/devis"
                className="rounded-full border-2 border-brand.accent px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white transition hover:bg-brand.accent hover:text-brand.blue hover:scale-105"
              >
                Demander un devis
              </NavLink>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-brand.navy py-6 md:py-8 border-y border-white/10">
          <motion.div className="mx-auto max-w-6xl px-6" {...fadeIn(0.3)}>
            <div className="grid gap-4 md:gap-6 md:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-heading text-3xl md:text-5xl text-brand.accent">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-slate-300 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ServicesPage = () => (
  <section className="mx-auto max-w-7xl px-6 space-y-12 pt-6">
    <SectionTitle eyebrow="" title="Services" />
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
);

const RealisationsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-7xl space-y-12 px-6 pt-6">
      <SectionTitle
        eyebrow=""
        title="Des chantiers livrés avec photos immersives."
        subtitle="Activez le filtre pour naviguer entre nos immeubles construits et nos rénovations complètes."
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
  );
};

const GaleriePage = () => (
  <section className="mx-auto max-w-7xl space-y-12 px-6 pt-6">
    <SectionTitle
      eyebrow=""
      title="Photos nettes & prêtes pour vos comités."
      subtitle=""
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
);

const AProposPage = () => (
  <section className="mx-auto max-w-7xl space-y-12 px-6 pt-6">
    <SectionTitle
      eyebrow=""
      title="MAPOLO SA, une équipe BTP engagée et certifiée."
      subtitle="Depuis 2008, Mapolo accompagne les maîtres d'ouvrage privés et publics au Bénin."
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
);

const DevisPage = () => {
  const [formData, setFormData] = useState({
    // Informations client
    clientNom: "",
    clientAdresse: "",
    clientTel: "",
    clientEmail: "",
    // Objet du devis
    objetDevis: "",
    lieuExecution: "",
    dateDebut: "",
    delaiExecution: "",
  });

  return (
    <section className="mx-auto max-w-7xl px-6 pt-6 pb-12">
      <motion.div className="space-y-8" {...fadeInOnMount()}>
        <SectionTitle
          title="Devis"
          subtitle="Remplissez ce formulaire pour recevoir votre devis personnalisé sous 24h."
        />

        <form
          className="space-y-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur"
          onSubmit={(e) => {
            e.preventDefault();
            // Ici vous pouvez ajouter la logique d'envoi
            alert("Devis envoyé avec succès !");
          }}
        >
          {/* En-tête du devis */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <h3 className="font-heading text-2xl text-brand.accent">
              En-tête du Devis
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Numéro de devis
                </label>
                <input
                  type="text"
                  placeholder="DEVIS-2024-001"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Date d'émission
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Durée de validité (jours)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
              />
            </div>
          </div>

          {/* Informations client */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <h3 className="font-heading text-2xl text-brand.accent">
              Informations Client
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Nom/Prénom/Raison sociale *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientNom}
                  onChange={(e) =>
                    setFormData({ ...formData, clientNom: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Adresse complète *
              </label>
              <input
                type="text"
                required
                value={formData.clientAdresse}
                onChange={(e) =>
                  setFormData({ ...formData, clientAdresse: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.clientTel}
                onChange={(e) =>
                  setFormData({ ...formData, clientTel: e.target.value })
                }
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
              />
            </div>
          </div>

          {/* Objet du devis */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <h3 className="font-heading text-2xl text-brand.accent">
              Objet du Devis
            </h3>
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Description des travaux *
              </label>
              <textarea
                required
                rows={3}
                value={formData.objetDevis}
                onChange={(e) =>
                  setFormData({ ...formData, objetDevis: e.target.value })
                }
                placeholder="Ex: Construction/rénovation/extension de bâtiment R+1 à Boulogne-Billancourt"
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Lieu d'exécution *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lieuExecution}
                  onChange={(e) =>
                    setFormData({ ...formData, lieuExecution: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Date prévisionnelle de début
                </label>
                <input
                  type="date"
                  value={formData.dateDebut}
                  onChange={(e) =>
                    setFormData({ ...formData, dateDebut: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Délai d'exécution
                </label>
                <input
                  type="text"
                  value={formData.delaiExecution}
                  onChange={(e) =>
                    setFormData({ ...formData, delaiExecution: e.target.value })
                  }
                  placeholder="Ex: 3 mois"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full rounded-full bg-brand.accent px-8 py-4 text-lg font-semibold text-brand.blue transition hover:bg-brand.accent/90"
            >
              <Mail className="mr-2 inline h-5 w-5" />
              Envoyer la demande de devis
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

const ContactPage = () => (
  <section className="mx-auto max-w-7xl px-6 pt-6 pb-12">
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
        <NavLink
          to="/devis"
          className="inline-flex items-center gap-2 text-sm text-brand.accent hover:underline"
        >
          <Mail className="h-4 w-4" />
          Demander un devis détaillé
        </NavLink>
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
        </div>
      </motion.div>
    </div>
  </section>
);

function App1() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Réalisations", to: "/realisations" },
    { label: "Galerie", to: "/galerie" },
    { label: "À propos", to: "/apropos" },
    { label: "Devis", to: "/devis" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand.blue text-white flex flex-col">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand.navy/80 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Building2 className="text-brand.accent" />
              </div>
              <div>
                <p className="font-heading text-base md:text-lg">Mapolo SA</p>
              </div>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }: { isActive: boolean }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-brand.accent"
                        : "text-slate-100 hover:text-brand.accent"
                    }`
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Bouton hamburger (mobile) */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white hover:border-brand.accent hover:text-brand.accent focus:outline-none focus:ring-2 focus:ring-brand.accent md:hidden"
              aria-label={isMobileNavOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setIsMobileNavOpen((open) => !open)}
            >
              {isMobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>
          {/* Menu mobile */}
          {isMobileNavOpen && (
            <div className="border-t border-white/10 bg-brand.navy/95 px-6 pb-4 pt-2 md:hidden">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Navigation
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-1.5 text-white hover:border-brand.accent hover:text-brand.accent focus:outline-none focus:ring-2 focus:ring-brand.accent"
                  aria-label="Fermer le menu"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }: { isActive: boolean }) =>
                      `block rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand.accent text-brand.blue"
                          : "text-slate-100 hover:bg-white/5 hover:text-brand.accent"
                      }`
                    }
                    end={item.to === "/"}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 bg-brand.blue pt-24 pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/realisations" element={<RealisationsPage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="/apropos" element={<AProposPage />} />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="border-t border-white/10 bg-brand.navy py-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} Mapolo BTP — Construction, rénovation &
            expertise.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App1;
