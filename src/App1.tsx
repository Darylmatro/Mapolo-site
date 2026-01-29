import { useMemo, useState } from "react";
import {
  Award,
  Building2,
  Hammer,
  HardHat,
  Home as HomeIcon,
  Layout,
  MapPin,
  Mail,
  Paintbrush,
  PenTool,
  ShieldCheck,
  Wrench,
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
      "Réhabilitation intérieure / extérieure avec coordination tous corps d'état et finitions haut de gamme.",
    icon: Paintbrush,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Toiture & couverture",
    description:
      "Charpente, tuiles, zinc, étanchéité et isolations thermiques conformes RE2020.",
    icon: HomeIcon,
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
      "Bureau d'études intégré, maquettes BIM, dimensionnement structurel et chiffrage précis.",
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
    description: "Transformation d'un hangar industriel en espaces tertiaires.",
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

const HomePage = () => (
  <section className="relative overflow-hidden">
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
      <motion.div
        className="mx-auto mt-10 max-w-4xl px-6 text-center space-y-8"
        {...fadeIn()}
      >
        <h1 className="font-heading text-4xl md:text-6xl">
          Construction, Travaux Publics & expertise sur-mesure.
        </h1>
        <p className="text-lg text-slate-200">
          Mapolo sécurise vos chantiers, pilote les équipes terrain et vous
          livre des espaces durables, prêts à vivre.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
        <NavLink
              to="/devis"
              className="inline-flex items-center gap-2 rounded-full border border-brand.accent/60 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide text-white transition hover:bg-brand.accent hover:text-brand.blue"
            >
              <Mail className="h-4 w-4" />
              Demander un devis
            </NavLink>
        </div>
      </motion.div>
    </div>
  </section>
);

const ServicesPage = () => (
  <section className="mx-auto max-w-7xl px-6 space-y-12 pt-6">
    <SectionTitle
      eyebrow="Nos services"
      title="Un pôle BTP complet, de l'étude au SAV."
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
  );
};

const GaleriePage = () => (
  <section className="mx-auto max-w-7xl space-y-12 px-6 pt-6">
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
);

const AProposPage = () => (
  <section className="mx-auto max-w-7xl space-y-12 px-6 pt-6">
    <SectionTitle
      eyebrow="À propos"
      title="Une équipe BTP engagée et certifiée."
      subtitle="Depuis 2008, Mapolo accompagne les maîtres d'ouvrage privés et publics en France."
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
    // Prestations
    prestations: [
      { designation: "", quantite: "", prixUnitaire: "", total: "" },
    ],
    fraisDeplacement: "150",
    tvaTaux: "20",
  });

  const calculateTotal = () => {
    const prestationsTotal = formData.prestations.reduce((sum, p) => {
      const qty = parseFloat(p.quantite) || 0;
      const prix = parseFloat(p.prixUnitaire) || 0;
      return sum + qty * prix;
    }, 0);
    const frais = parseFloat(formData.fraisDeplacement) || 0;
    const totalHT = prestationsTotal + frais;
    const tva = (totalHT * parseFloat(formData.tvaTaux)) / 100;
    return { totalHT, tva, totalTTC: totalHT + tva };
  };

  const addPrestation = () => {
    setFormData({
      ...formData,
      prestations: [
        ...formData.prestations,
        { designation: "", quantite: "", prixUnitaire: "", total: "" },
      ],
    });
  };

  const updatePrestation = (index: number, field: string, value: string) => {
    const updated = [...formData.prestations];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "quantite" || field === "prixUnitaire") {
      const qty = parseFloat(updated[index].quantite) || 0;
      const prix = parseFloat(updated[index].prixUnitaire) || 0;
      updated[index].total = (qty * prix).toFixed(2);
    }
    setFormData({ ...formData, prestations: updated });
  };

  const removePrestation = (index: number) => {
    setFormData({
      ...formData,
      prestations: formData.prestations.filter((_, i) => i !== index),
    });
  };

  const totals = calculateTotal();

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

          {/* Détail des prestations */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-2xl text-brand.accent">
                Détail des Prestations
              </h3>
              <button
                type="button"
                onClick={addPrestation}
                className="rounded-full bg-brand.accent px-4 py-2 text-sm font-semibold text-brand.blue transition hover:bg-brand.accent/90"
              >
                + Ajouter une prestation
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-3 text-left text-sm font-semibold text-slate-300">
                      Désignation
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-slate-300">
                      Quantité
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-slate-300">
                      Prix unitaire HT (€)
                    </th>
                    <th className="p-3 text-right text-sm font-semibold text-slate-300">
                      Total HT (€)
                    </th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.prestations.map((prestation, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-3">
                        <input
                          type="text"
                          value={prestation.designation}
                          onChange={(e) =>
                            updatePrestation(
                              index,
                              "designation",
                              e.target.value
                            )
                          }
                          placeholder="Ex: Maçonnerie (fondations, murs porteurs)"
                          className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step="0.01"
                          value={prestation.quantite}
                          onChange={(e) =>
                            updatePrestation(index, "quantite", e.target.value)
                          }
                          placeholder="0"
                          className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-right text-sm text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step="0.01"
                          value={prestation.prixUnitaire}
                          onChange={(e) =>
                            updatePrestation(
                              index,
                              "prixUnitaire",
                              e.target.value
                            )
                          }
                          placeholder="0.00"
                          className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-right text-sm text-white placeholder:text-slate-400 focus:border-brand.accent focus:outline-none"
                        />
                      </td>
                      <td className="p-3 text-right text-sm font-semibold">
                        {prestation.total || "0.00"} €
                      </td>
                      <td className="p-3">
                        {formData.prestations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePrestation(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10">
                    <td className="p-3 font-semibold">Frais de déplacement</td>
                    <td className="p-3 text-right">Forfait</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={formData.fraisDeplacement}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fraisDeplacement: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-right text-sm text-white focus:border-brand.accent focus:outline-none"
                      />
                    </td>
                    <td className="p-3 text-right font-semibold">
                      {formData.fraisDeplacement} €
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totaux */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            <div className="ml-auto max-w-md space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-slate-300">TOTAL HT</span>
                <span className="font-semibold">
                  {totals.totalHT.toFixed(2)} €
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-slate-300">
                    TVA (%)
                  </label>
                  <select
                    value={formData.tvaTaux}
                    onChange={(e) =>
                      setFormData({ ...formData, tvaTaux: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-brand.accent focus:outline-none"
                  >
                    <option value="10">10% (Rénovation)</option>
                    <option value="20">20% (Standard BTP)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm text-slate-300">
                    Montant TVA
                  </label>
                  <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-right font-semibold">
                    {totals.tva.toFixed(2)} €
                  </div>
                </div>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-xl font-bold text-brand.accent">
                <span>TOTAL TTC</span>
                <span>{totals.totalTTC.toFixed(2)} €</span>
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
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Nos services", to: "/services" },
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
                <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-slate-300">
                  Construction Batiments Travaux Publics
                </p>
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

            
          </nav>
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
            © {new Date().getFullYear()} Mapolo BTP — Construction, rénovation
            & expertise.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App1;
