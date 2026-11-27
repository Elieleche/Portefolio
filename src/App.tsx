import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  HeartHandshake,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Sun,
  Terminal,
  X,
} from 'lucide-react';

type ProjectCategory = 'Tous' | 'Web Fullstack' | 'IA & Data' | 'Bas Niveau / C++';

interface ProjectItem {
  id: string;
  title: string;
  context: string;
  category: Exclude<ProjectCategory, 'Tous'>;
  description: string;
  highlights: string[];
  architectureSummary: string;
  stack: string[];
  featured?: boolean;
}

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  type: 'tech' | 'operational';
}

interface EducationItem {
  period: string;
  school: string;
  degree: string;
  details: string;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; note?: string }[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'dashboard-web-modulaire',
    title: 'Dashboard Web Modulaire',
    context: 'Projet Epitech',
    category: 'Web Fullstack',
    featured: true,
    description:
      'Application fullstack conteneurisée (Docker Compose) agrégeant en temps réel 4 services tiers (Open-Meteo, GitHub, CoinGecko, Spotify) via 8 widgets configurables.',
    highlights: [
      'Authentification sécurisée par JWT et hachage bcrypt',
      'Intégration OAuth 2.0 complète pour le lecteur Spotify',
      'Proxy backend de normalisation des APIs tierces',
      'Documentation technique interactive OpenAPI / Swagger',
    ],
    architectureSummary:
      "Architecture découplée orchestrée sous Docker Compose avec frontend React/TypeScript, API Node.js agissant comme passerelle de normalisation et persistance PostgreSQL gérée via Prisma.",
    stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker'],
  },
  {
    id: 'sensai-assistant-local',
    title: 'SENSAI — Assistant IA Local',
    context: 'Projet Epitech',
    category: 'IA & Data',
    description:
      'Assistant IA en ligne de commande 100 % local exploitant directement l’API Ollama sans framework LLM, bâti sur une architecture Microkernel à plugins découplés.',
    highlights: [
      'Communication directe avec Ollama (zéro framework LLM tiers)',
      'Noyau Microkernel extensible par chargement de plugins découplés',
      'MetricsPlugin avec persistance haute concurrence SQLite en mode WAL',
      'FormsPlugin avec génération et validation locale par schémas JSON',
    ],
    architectureSummary:
      'Conception modulaire centrée sur la souveraineté des données et la faible latence : le cœur coordonne le cycle de vie des requêtes tandis que chaque capacité métier réside dans un plugin isolé.',
    stack: ['Python 3.12', 'Ollama', 'SQLite', 'Architecture Microkernel'],
  },
  {
    id: 'faceit-tracker-cs2',
    title: 'FACEIT Tracker & Lineups CS2',
    context: 'Projet Perso',
    category: 'Web Fullstack',
    description:
      'Application web et bot Discord permettant d’analyser les statistiques avancées des joueurs FACEIT et de consulter des cartes interactives de lineups.',
    highlights: [
      'Cartes interactives avec repères cliquables vers timecodes vidéo',
      'Synchronisation des métriques de match via l’API FACEIT officielle',
      'Génération automatisée de graphiques de progression avec Matplotlib',
      'Commandes Discord.py dédiées à la consultation rapide en partie',
    ],
    architectureSummary:
      'Double interface Web et Discord partageant une couche de collecte Python pour l’analyse statistique et l’indexation spatiale des utilitaires par carte.',
    stack: ['React/Web', 'Python', 'Discord.py', 'Faceit API', 'Matplotlib'],
  },
  {
    id: 'fittrack',
    title: 'FitTrack',
    context: 'Projet Perso',
    category: 'Web Fullstack',
    description:
      'Application fullstack de suivi d’entraînements (musculation et cardio) avec séances personnalisables par jour, historisation des performances et tableau de bord d’évolution.',
    highlights: [
      'Planification de séances personnalisables jour par jour',
      'Historisation structurée des séries, charges et séances cardio',
      'Tableau de bord croisant statistiques physiques et ressenti',
    ],
    architectureSummary:
      'Modélisation relationnelle normalisée des exercices, séances et métriques de progression permettant un suivi longitudinal clair et rapide à saisir.',
    stack: ['Fullstack Web', 'Base de données relationnelle'],
  },
  {
    id: 'zappy',
    title: 'Zappy',
    context: 'Projet Epitech · Équipe de 7',
    category: 'Bas Niveau / C++',
    description:
      'Jeu réseau multijoueur temps réel composé d’un serveur TCP non-bloquant en C, d’une IA autonome en Python asyncio et d’une interface isométrique en C++/SFML.',
    highlights: [
      'Serveur TCP non-bloquant multiplexé (select/poll) en C pur',
      'Clients IA autonomes et collaboratifs pilotés en Python asyncio',
      'Moteur d’affichage isométrique temps réel en C++17 / SFML',
    ],
    architectureSummary:
      'Trois binaires hétérogènes synchronisés par un protocole texte TCP strict, nécessitant une gestion rigoureuse des buffers circulaires et des fréquences de simulation.',
    stack: ['C', 'C++17', 'SFML', 'Python', 'Réseau TCP'],
  },
  {
    id: 'raytracer',
    title: 'Raytracer',
    context: 'Projet Epitech · Équipe de 4',
    category: 'Bas Niveau / C++',
    description:
      'Moteur de rendu 3D multithreadé développé en C++17 appliquant les design patterns Factory, Strategy et Composite pour modéliser scènes, lumières et matériaux.',
    highlights: [
      'Parallélisation du lancer de rayons par tuiles (multithreading C++17)',
      'Graphe de scène hiérarchique structuré avec le pattern Composite',
      'Extensibilité des primitives et matériaux via Factory & Strategy',
    ],
    architectureSummary:
      'Architecture orientée objet modulaire séparant le parsing de scène, le calcul d’intersection mathématique et le pipeline de rendu multithreadé.',
    stack: ['C++17', 'SFML', 'Multithreading'],
  },
  {
    id: 'arcade',
    title: 'Arcade',
    context: 'Projet Epitech · Équipe de 3',
    category: 'Bas Niveau / C++',
    description:
      'Plateforme de jeux rétro à chargement dynamique de bibliothèques partagées (.so via dlopen/dlsym) avec 3 moteurs graphiques interchangeables à chaud.',
    highlights: [
      'Chargement dynamique à l’exécution via dlopen / dlsym sous Linux',
      'Basculement à chaud entre ncurses, SDL2 et SFML sans redémarrer',
      'Interfaces abstraites communes (IGraphic / IGame) totalement découplées',
    ],
    architectureSummary:
      'Noyau agnostique du moteur graphique et du jeu exécuté, garantissant l’interopérabilité binaire entre modules compilés séparément en bibliothèques partagées.',
    stack: ['C++', 'ncurses', 'SDL2', 'SFML'],
  },
  {
    id: 'codname',
    title: 'CODNAME',
    context: 'Tournoi Epitech 2026 · Solo',
    category: 'IA & Data',
    description:
      'Challenge de sécurité IA axé sur le Red Teaming et l’injection de prompts sur le modèle granite3.1-moe afin d’évaluer et contourner les garde-fous de réponse.',
    highlights: [
      'Analyse des vecteurs d’injection de prompts directs et indirects',
      'Évaluation des comportements limites sur granite3.1-moe',
      'Méthodologie itérative de contournement et durcissement de contexte',
    ],
    architectureSummary:
      'Approche systématique de Red Teaming LLM visant à identifier les failles d’alignement contextuel et à documenter les stratégies de mitigation.',
    stack: ['LLM Security', 'Prompt Engineering', 'Red Teaming'],
  },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Oct. 2026 – Fév. 2027',
    role: 'Stagiaire Développeur Fullstack',
    company: 'Groupe JVS (Mairistem)',
    location: 'Saint-Martin-sur-le-Pré',
    description:
      'Développement fullstack, formation et pratique approfondie en PHP et Laravel sur des solutions web métiers.',
    type: 'tech',
  },
  {
    period: 'Juil. – Déc. 2024',
    role: 'Stagiaire Développeur Fullstack',
    company: 'SNCF (DGSI Voyageurs)',
    description:
      'Développement front-end Angular et back-end AWS sur deux projets en lien direct avec les chefs de projet (conception, dev, tests, déploiement) et accompagnement d’un nouveau stagiaire.',
    type: 'tech',
  },
  {
    period: 'Sept. – Déc. 2025',
    role: 'Agent Polyvalent',
    company: 'La Poste / Carrefour',
    description:
      'Préparation de commandes, livraison client et appui opérationnel au sein de l’équipe d’après-midi.',
    type: 'operational',
  },
  {
    period: '2022 – 2023',
    role: 'Agent Logistique',
    company: 'L2G, C-LOG, Geodis',
    description:
      'Préparation et emballage de commandes, travail en équipe de nuit et express, adaptation rapide à des rythmes soutenus.',
    type: 'operational',
  },
];

const EDUCATION: EducationItem[] = [
  {
    period: '2024 – 2029',
    school: 'Epitech',
    degree: 'Programme Grande École (3ème année)',
    details: 'Pédagogie par projets, C, C++, Rust, Web Fullstack, DevOps.',
  },
  {
    period: '2021',
    school: 'Lycée Pierre Bayen (51)',
    degree: 'Baccalauréat Général + Abibac',
    details: 'Double diplôme franco-allemand, spécialités Mathématiques, Physique-Chimie, SVT.',
  },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces réactives & typées',
    icon: Layers,
    items: [
      { name: 'React' },
      { name: 'Angular' },
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Flutter' },
      { name: 'Tailwind CSS' },
      { name: 'HTML5 / CSS3' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Systèmes',
    subtitle: 'APIs scalables & bas niveau',
    icon: Terminal,
    items: [
      { name: 'Node.js' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'Python' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'Rust' },
    ],
  },
  {
    id: 'devops',
    title: 'Bases de données & Cloud/DevOps',
    subtitle: 'Persistance, conteneurs & livraison',
    icon: Database,
    items: [
      { name: 'PostgreSQL' },
      { name: 'Prisma' },
      { name: 'MongoDB' },
      { name: 'SQLite' },
      { name: 'Redis' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Git' },
      { name: 'CI/CD (GitHub Actions)' },
    ],
  },
  {
    id: 'languages-soft',
    title: 'Langues & Atouts',
    subtitle: 'Communication internationale & savoir-être',
    icon: Globe,
    items: [
      { name: 'Français', note: 'Natif' },
      { name: 'Anglais', note: 'B2 · 815 TOEIC' },
      { name: 'Allemand', note: 'B2+ · Abibac' },
      { name: 'Leadership & Encadrement', note: 'SGDF' },
      { name: 'Rigoureux' },
      { name: 'Autonome' },
      { name: 'Esprit d’équipe' },
      { name: 'Curieux' },
    ],
  },
];

const FILTER_TABS: ProjectCategory[] = [
  'Tous',
  'Web Fullstack',
  'IA & Data',
  'Bas Niveau / C++',
];

const NAV_LINKS = [
  { label: 'Parcours', href: '#parcours' },
  { label: 'Engagements', href: '#engagements' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Tous');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');

  // Synchronize Tailwind dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Close project modal on Escape key and lock background scroll when open
  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  const filteredProjects =
    selectedCategory === 'Tous'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2400);
    } catch {
      // Fallback for restricted clipboard contexts
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2400);
    }
  };

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Merci de renseigner votre nom, votre adresse email et votre message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormError('Merci de saisir une adresse email valide.');
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormError(
        "Le service d'envoi EmailJS n'est pas encore configuré. Vous pouvez m'écrire directement à eliechardin.dev@gmail.com."
      );
      return;
    }

    setFormError(null);
    setFormStatus('submitting');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: trimmedName,
          from_email: trimmedEmail,
          reply_to: trimmedEmail,
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setFormStatus('sent');
    } catch {
      setFormStatus('idle');
      setFormError(
        "Une erreur est survenue lors de l'envoi. Vous pouvez réessayer ou m'écrire directement à eliechardin.dev@gmail.com."
      );
    }
  };

  const resetContactForm = () => {
    setFormState({ name: '', email: '', message: '' });
    setFormError(null);
    setFormStatus('idle');
  };

  const mailtoHref = `mailto:eliechardin.dev@gmail.com?subject=${encodeURIComponent(
    `Prise de contact — ${formState.name || 'Recrutement / Stage'}`
  )}&body=${encodeURIComponent(
    `${formState.message}\n\n---\nDe : ${formState.name} (${formState.email})`
  )}`;

  return (
    <div
      id="top"
      className="min-h-screen bg-[#FAFAFA] text-[#111827] transition-colors duration-200 dark:bg-[#0B0D11] dark:text-[#F3F4F6]"
    >
      {/* Sticky Minimal Navbar (3-zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 h-16 border-b border-[#E5E7EB] bg-[#FAFAFA]/90 backdrop-blur-md transition-colors duration-200 dark:border-[#222630] dark:bg-[#0B0D11]/90">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#top"
            className="shrink-0 whitespace-nowrap text-base font-bold tracking-tight text-[#111827] transition-colors duration-200 hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] dark:text-[#F9FAFB] dark:hover:text-[#60A5FA]"
          >
            Elie Chardin
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-7 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 whitespace-nowrap text-sm font-medium text-[#4B5563] underline-offset-4 transition-colors duration-200 hover:text-[#111827] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Theme Switch & Primary Action */}
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] transition-all duration-200 hover:border-[#D1D5DB] hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#13161C] dark:text-[#9CA3AF] dark:hover:border-[#374151] dark:hover:text-[#F3F4F6]"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href={`${import.meta.env.BASE_URL}CV-Elie-Chardin.pdf`}
              download="CV-Elie-Chardin.pdf"
              className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#111827] px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1F2937] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] sm:inline-flex dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger mon CV</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] lg:hidden dark:border-[#222630] dark:bg-[#13161C] dark:text-[#F3F4F6]"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[#E5E7EB] bg-[#FFFFFF] px-4 py-4 shadow-sm lg:hidden dark:border-[#222630] dark:bg-[#13161C]">
            <nav aria-label="Navigation mobile" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#111827] transition-colors duration-200 hover:bg-[#FAFAFA] dark:text-[#F3F4F6] dark:hover:bg-[#1A1E26]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`${import.meta.env.BASE_URL}CV-Elie-Chardin.pdf`}
                download="CV-Elie-Chardin.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1D4ED8] sm:hidden"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger mon CV</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Hero Left Column */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-7">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#15803D] dark:text-[#4ADE80]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Disponible pour un stage de 6 mois (Temps plein)</span>
                </div>

                <h1 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] dark:text-[#F9FAFB]">
                  Elie Chardin — Développeur Web Fullstack
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-[#4B5563] sm:text-lg dark:text-[#9CA3AF]">
                  Étudiant en 3ème année à Epitech (Promo 2029). Je conçois des applications web
                  robustes, des architectures back-end scalables et des outils performants, du
                  cahier des charges au déploiement.
                </p>

                <div className="flex items-start gap-2.5 text-sm text-[#4B5563] dark:text-[#9CA3AF]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                  <span>Paris · Lyon · Reims · Châlons-en-Champagne</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projets"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>Voir mes projets</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-5 py-2.5 text-sm font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#13161C] dark:text-[#F3F4F6] dark:hover:border-[#374151] dark:hover:bg-[#1A1E26]"
                >
                  <span>Me contacter</span>
                </a>

                <div className="flex items-center gap-2 pl-1">
                  <a
                    href="https://github.com/Elieleche"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub d'Elie Chardin"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] transition-all duration-200 hover:border-[#D1D5DB] hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#13161C] dark:text-[#9CA3AF] dark:hover:border-[#374151] dark:hover:text-[#F3F4F6]"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/elie-chardin"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn d'Elie Chardin"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] transition-all duration-200 hover:border-[#D1D5DB] hover:text-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#13161C] dark:text-[#9CA3AF] dark:hover:border-[#374151] dark:hover:text-[#60A5FA]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Editorial Engineering Snapshot Bento Card */}
            <aside className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 dark:border-[#222630] dark:bg-[#13161C]">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
                  <div>
                    <h2 className="text-sm font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Repères clés
                    </h2>
                    <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                      Profil ingénierie & terrain
                    </p>
                  </div>
                  <Code2 className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                </div>

                <dl className="divide-y divide-[#E5E7EB] text-sm dark:divide-[#222630]">
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Formation</dt>
                    <dd className="text-right font-medium text-[#111827] dark:text-[#F3F4F6]">
                      Epitech · Promo <span className="font-mono tabular-nums">2029</span>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Expériences tech</dt>
                    <dd className="text-right font-medium text-[#111827] dark:text-[#F3F4F6]">
                      Groupe JVS · SNCF DGSI
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Web & API</dt>
                    <dd className="text-right font-mono text-xs text-[#111827] dark:text-[#E5E7EB]">
                      React · Angular · Node · Laravel
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Systèmes & Cloud</dt>
                    <dd className="text-right font-mono text-xs text-[#111827] dark:text-[#E5E7EB]">
                      C/C++ · Rust · Docker · AWS
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Langues</dt>
                    <dd className="text-right font-medium text-[#111827] dark:text-[#F3F4F6]">
                      Anglais <span className="font-mono tabular-nums text-xs">815</span> TOEIC ·
                      Abibac
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-3.5">
                    <dt className="text-[#4B5563] dark:text-[#9CA3AF]">Engagement</dt>
                    <dd className="text-right font-medium text-[#111827] dark:text-[#F3F4F6]">
                      Chef Scout SGDF (11–15 ans)
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        {/* SECTION PARCOURS, EXPÉRIENCES & ENGAGEMENTS */}
        <section
          id="parcours"
          className="scroll-mt-24 border-t border-[#E5E7EB] py-14 sm:py-16 dark:border-[#222630]"
        >
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl dark:text-[#F9FAFB]">
                Parcours, Expériences &amp; Engagements
              </h2>
              <p className="mt-1.5 text-sm text-[#4B5563] sm:text-base dark:text-[#9CA3AF]">
                Expériences en génie logiciel, rigueur opérationnelle et responsabilités associatives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Bloc 1 — Expériences Professionnelles */}
            <article className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 lg:col-span-7 dark:border-[#222630] dark:bg-[#13161C]">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F3F4F6]">
                    Expériences Professionnelles
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                    Tech &amp; Opérationnel
                  </p>
                </div>
                <Briefcase className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" />
              </div>

              <div className="divide-y divide-[#E5E7EB] dark:divide-[#222630]">
                {EXPERIENCES.map((exp) => (
                  <div key={`${exp.period}-${exp.company}`} className="py-5 first:pt-5 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-xs font-medium tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                        {exp.period}
                      </span>
                      <span className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                        {exp.type === 'tech' ? 'Développement logiciel' : 'Opérationnel & logistique'}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-base font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      {exp.role} — {exp.company}
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Right column: Bloc 2 (Formation) & Bloc 3 (Vie Associative & Bénévolat) */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Bloc 2 — Formation */}
              <article className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 dark:border-[#222630] dark:bg-[#13161C]">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Formation
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                      Cursus académique
                    </p>
                  </div>
                  <GraduationCap className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" />
                </div>

                <div className="divide-y divide-[#E5E7EB] dark:divide-[#222630]">
                  {EDUCATION.map((edu) => (
                    <div key={edu.school} className="py-4 first:pt-5 last:pb-0">
                      <div className="font-mono text-xs font-medium tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                        {edu.period}
                      </div>
                      <h4 className="mt-1 text-base font-semibold text-[#111827] dark:text-[#F3F4F6]">
                        {edu.school} — {edu.degree}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Bloc 3 — Vie Associative & Bénévolat */}
              <article
                id="engagements"
                className="scroll-mt-24 flex-1 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 dark:border-[#222630] dark:bg-[#13161C]"
              >
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Vie Associative &amp; Bénévolat
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                      Encadrement, solidarité &amp; communauté cloud
                    </p>
                  </div>
                  <HeartHandshake className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" />
                </div>

                <div className="divide-y divide-[#E5E7EB] dark:divide-[#222630]">
                  <div className="py-5 first:pt-5">
                    <div className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                      Tranche bleue : Scouts &amp; Guides, 11–15 ans
                    </div>
                    <h4 className="mt-1 text-base font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Chef Scout — Scouts et Guides de France (SGDF)
                    </h4>
                    <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      <li>
                        Encadrement, animation et accompagnement éducatif d’un groupe de jeunes de
                        11 à 15 ans tout au long de l’année et lors de camps d’été.
                      </li>
                      <li>
                        Gestion de projet en équipe d’animation (maîtrise) : planification
                        logistique, gestion de budget, sécurité et pédagogie par le projet.
                      </li>
                      <li>
                        Organisation et participation à des actions solidaires et citoyennes
                        ponctuelles en partenariat avec des associations locales (notamment
                        collectes et tri pour la{' '}
                        <strong className="font-semibold text-[#111827] dark:text-[#F3F4F6]">
                          Banque Alimentaire
                        </strong>
                        ).
                      </li>
                    </ul>
                  </div>

                  <div className="pt-5">
                    <div className="font-mono text-xs font-medium tabular-nums text-[#2563EB] dark:text-[#60A5FA]">
                      Juin 2026
                    </div>
                    <h4 className="mt-1 text-base font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Bénévole — AWS Summer School
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      Participation bénévole à une semaine de formation intensive organisée par
                      Amazon Web Services (Cloud &amp; Infrastructure as Code).
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION PROJETS */}
        <section
          id="projets"
          className="scroll-mt-24 border-t border-[#E5E7EB] py-14 sm:py-16 dark:border-[#222630]"
        >
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl dark:text-[#F9FAFB]">
                Projets sélectionnés
              </h2>
              <p className="mt-1.5 text-sm text-[#4B5563] sm:text-base dark:text-[#9CA3AF]">
                Applications web fullstack, outillage IA local et ingénierie bas niveau C/C++.
              </p>
            </div>

            {/* Interactive Category Filter Control */}
            <div
              role="group"
              aria-label="Filtrer les projets par catégorie"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] p-1 dark:border-[#222630] dark:bg-[#13161C]"
            >
              {FILTER_TABS.map((category) => {
                const isActive = selectedCategory === category;
                const count =
                  category === 'Tous'
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isActive}
                    className={`inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2563EB] ${
                      isActive
                        ? 'bg-[#FFFFFF] text-[#111827] shadow-xs dark:bg-[#2563EB] dark:text-white'
                        : 'text-[#4B5563] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        isActive
                          ? 'text-[#2563EB] dark:text-blue-100'
                          : 'text-[#6B7280] dark:text-[#6B7280]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bento Projects Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isWide = selectedCategory === 'Tous' && project.featured;

              return (
                <article
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-all duration-200 hover:border-[#2563EB]/60 dark:border-[#222630] dark:bg-[#13161C] dark:hover:border-[#3B82F6]/60 ${
                    isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div>
                    {/* Quiet unboxed metadata line */}
                    <div className="flex items-center justify-between gap-3 text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                      <span>
                        {project.context} · {project.category}
                      </span>
                      <Cpu className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-colors duration-200 group-hover:text-[#2563EB] dark:text-[#6B7280] dark:group-hover:text-[#60A5FA]" />
                    </div>

                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-[#111827] sm:text-xl dark:text-[#F9FAFB]">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      {project.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-[#E5E7EB] pt-4 text-xs leading-relaxed text-[#4B5563] dark:border-[#222630] dark:text-[#9CA3AF]">
                      {project.highlights.slice(0, isWide ? 4 : 3).map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#2563EB] dark:bg-[#60A5FA]"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-[#E5E7EB] pt-4 dark:border-[#222630]">
                    <div className="font-mono text-xs leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      {project.stack.join(' · ')}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex min-h-[40px] w-fit items-center gap-1.5 text-sm font-medium text-[#2563EB] transition-colors duration-200 hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:text-[#60A5FA] dark:hover:text-[#93C5FD]"
                    >
                      <span>Voir les détails</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION COMPÉTENCES */}
        <section
          id="competences"
          className="scroll-mt-24 border-t border-[#E5E7EB] py-14 sm:py-16 dark:border-[#222630]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl dark:text-[#F9FAFB]">
              Compétences techniques &amp; transversales
            </h2>
            <p className="mt-1.5 text-sm text-[#4B5563] sm:text-base dark:text-[#9CA3AF]">
              Maîtrise du développement web fullstack, de l’infrastructure conteneurisée et des
              langages systèmes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SKILL_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <article
                  key={category.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 dark:border-[#222630] dark:bg-[#13161C]"
                >
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
                    <div>
                      <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F3F4F6]">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                        {category.subtitle}
                      </p>
                    </div>
                    <Icon className="h-5 w-5 text-[#2563EB] dark:text-[#60A5FA]" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-baseline justify-between gap-2 border-b border-[#F3F4F6] pb-2 text-sm last:border-b-0 dark:border-[#1E222B]"
                      >
                        <span className="font-medium text-[#111827] dark:text-[#F3F4F6]">
                          {item.name}
                        </span>
                        {item.note && (
                          <span className="font-mono text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                            {item.note}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-[#E5E7EB] py-14 sm:py-16 dark:border-[#222630]"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl dark:text-[#F9FAFB]">
              Me contacter
            </h2>
            <p className="mt-1.5 text-sm text-[#4B5563] sm:text-base dark:text-[#9CA3AF]">
              Ouvert aux échanges pour un stage de 6 mois à temps plein sur Paris, Lyon, Reims ou
              Châlons-en-Champagne.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Direct contact info card */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 lg:col-span-5 dark:border-[#222630] dark:bg-[#13161C]">
              <div>
                <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F3F4F6]">
                  Coordonnées directes
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                  Copiez mon adresse email ou mon numéro en un clic, ou retrouvez mes dépôts et mon
                  parcours en ligne.
                </p>

                <div className="mt-6 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB] dark:divide-[#222630] dark:border-[#222630]">
                  {/* Email */}
                  <div className="flex items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <div className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">Email</div>
                      <a
                        href="mailto:eliechardin.dev@gmail.com"
                        className="mt-0.5 block truncate font-mono text-sm font-medium text-[#111827] hover:text-[#2563EB] dark:text-[#F3F4F6] dark:hover:text-[#60A5FA]"
                      >
                        eliechardin.dev@gmail.com
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('eliechardin.dev@gmail.com', 'email')}
                      aria-label="Copier l'adresse email"
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1.5 text-xs font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:hover:border-[#374151]"
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#15803D] dark:text-[#4ADE80]" />
                          <span>Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <div className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">Téléphone</div>
                      <a
                        href="tel:+33766558919"
                        className="mt-0.5 block font-mono text-sm font-medium tabular-nums text-[#111827] hover:text-[#2563EB] dark:text-[#F3F4F6] dark:hover:text-[#60A5FA]"
                      >
                        07 66 55 89 19
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('07 66 55 89 19', 'phone')}
                      aria-label="Copier le numéro de téléphone"
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-1.5 text-xs font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:hover:border-[#374151]"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#15803D] dark:text-[#4ADE80]" />
                          <span>Copié</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/Elieleche"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:hover:border-[#374151]"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#4B5563] dark:text-[#9CA3AF]" />
                </a>
                <a
                  href="https://linkedin.com/in/elie-chardin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2 text-sm font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:hover:border-[#374151]"
                >
                  <Linkedin className="h-4 w-4 text-[#2563EB] dark:text-[#60A5FA]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#4B5563] dark:text-[#9CA3AF]" />
                </a>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 transition-colors duration-200 sm:p-8 lg:col-span-7 dark:border-[#222630] dark:bg-[#13161C]">
              {formStatus === 'sent' ? (
                <div className="flex h-full flex-col justify-between gap-6 py-4">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#15803D] dark:text-[#4ADE80]">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Message envoyé</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#111827] dark:text-[#F3F4F6]">
                      Merci {formState.name}, votre message a bien été envoyé.
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                      Je vous répondrai rapidement à{' '}
                      <span className="font-mono text-[#111827] dark:text-[#F3F4F6]">
                        {formState.email}
                      </span>
                      . Vous pouvez également envoyer un autre message si besoin.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={resetContactForm}
                      className="inline-flex min-h-[44px] items-center rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1D4ED8]"
                    >
                      Envoyer un nouveau message
                    </button>
                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#111827] transition-all duration-200 hover:border-[#D1D5DB] dark:border-[#222630] dark:text-[#F3F4F6] dark:hover:border-[#374151]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Ouvrir dans mon client mail</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#111827] dark:text-[#F3F4F6]"
                      >
                        Nom
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Camille Martin"
                        className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] transition-colors duration-200 focus:border-[#2563EB] focus:outline-none dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:placeholder-[#6B7280] dark:focus:border-[#60A5FA]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#111827] dark:text-[#F3F4F6]"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="camille@entreprise.fr"
                        className="mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] transition-colors duration-200 focus:border-[#2563EB] focus:outline-none dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:placeholder-[#6B7280] dark:focus:border-[#60A5FA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#111827] dark:text-[#F3F4F6]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Bonjour Elie, nous souhaitons échanger au sujet d'un stage de 6 mois..."
                      className="mt-1.5 w-full resize-y rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3.5 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] transition-colors duration-200 focus:border-[#2563EB] focus:outline-none dark:border-[#222630] dark:bg-[#0B0D11] dark:text-[#F3F4F6] dark:placeholder-[#6B7280] dark:focus:border-[#60A5FA]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <span className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                      Réponse rapide par email ou téléphone.
                    </span>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {formStatus === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] py-8 transition-colors duration-200 dark:border-[#222630] dark:bg-[#0B0D11]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-[#4B5563] sm:flex-row sm:items-center sm:px-6 lg:px-8 dark:text-[#9CA3AF]">
          <div>
            © {new Date().getFullYear()} Elie Chardin · Développeur Web Fullstack — Epitech Promo{' '}
            <span className="font-mono tabular-nums">2029</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:eliechardin.dev@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-[#111827] dark:hover:text-[#F3F4F6]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>eliechardin.dev@gmail.com</span>
            </a>
            <a
              href="tel:+33766558919"
              className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-[#111827] dark:hover:text-[#F3F4F6]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>07 66 55 89 19</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 shadow-xl transition-all duration-200 sm:p-8 dark:border-[#222630] dark:bg-[#13161C]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] pb-4 dark:border-[#222630]">
              <div>
                <div className="text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                  {activeProject.context} · {activeProject.category}
                </div>
                <h3
                  id="modal-project-title"
                  className="mt-1 text-xl font-bold tracking-tight text-[#111827] sm:text-2xl dark:text-[#F9FAFB]"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Fermer la fenêtre de détails"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] transition-colors duration-200 hover:border-[#D1D5DB] hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-[#222630] dark:text-[#9CA3AF] dark:hover:border-[#374151] dark:hover:text-[#F3F4F6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              <div>
                <h4 className="text-xs font-semibold tracking-wide text-[#4B5563] dark:text-[#9CA3AF]">
                  Présentation
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#111827] sm:text-base dark:text-[#E5E7EB]">
                  {activeProject.description}
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-5 dark:border-[#222630]">
                <h4 className="text-xs font-semibold tracking-wide text-[#4B5563] dark:text-[#9CA3AF]">
                  Architecture &amp; approche technique
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4B5563] dark:text-[#9CA3AF]">
                  {activeProject.architectureSummary}
                </p>
              </div>

              <div className="border-t border-[#E5E7EB] pt-5 dark:border-[#222630]">
                <h4 className="text-xs font-semibold tracking-wide text-[#4B5563] dark:text-[#9CA3AF]">
                  Points techniques clés
                </h4>
                <ul className="mt-2.5 space-y-2 text-sm text-[#111827] dark:text-[#E5E7EB]">
                  {activeProject.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#E5E7EB] pt-5 dark:border-[#222630]">
                <h4 className="text-xs font-semibold tracking-wide text-[#4B5563] dark:text-[#9CA3AF]">
                  Technologies mobilisées
                </h4>
                <p className="mt-2 font-mono text-xs leading-relaxed text-[#111827] dark:text-[#E5E7EB]">
                  {activeProject.stack.join(' · ')}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E5E7EB] pt-4 dark:border-[#222630]">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="inline-flex min-h-[40px] items-center rounded-lg bg-[#111827] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1F2937] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
