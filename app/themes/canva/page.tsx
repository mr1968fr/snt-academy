'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ---------- Types ---------- */
type ModeSession = '20min' | '1h' | '1h30';
type Detail = { h: string; p: string };
type Project = {
  topic: string;
  desc: string;
  livrable: string;
  difficulty: string;
  duration: string;
  externalUrl?: string;
  externalLabel?: string;
};
type Step = {
  number?: string;
  title: string;
  subtitle?: string;
  content?: string;
  details?: Detail[];
  hasLab?: boolean;
  hasLab2?: boolean;
  isProject?: boolean;
  intro?: string;
  projects?: Project[];
  exposes?: string[];
  deep?: { label: string; text: string }[];
};
type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

/* ---------- Points & Labs ---------- */
const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LAB1_OPTIONS = ['Le mettre en petit', 'Le mettre en gras et grand'];
const LAB1_CORRECT = 'Le mettre en gras et grand';
const LAB1_FEEDBACK =
  'La hiérarchie visuelle repose sur la taille et le contraste : le titre doit dominer.';

const LAB2_OPTIONS = ['1 couleur', '3 couleurs', '7 couleurs'];
const LAB2_CORRECT = '3 couleurs';
const LAB2_FEEDBACK =
  'Une couleur principale, une secondaire et une d’accent suffisent pour un design lisible.';

/* ---------- Cours ---------- */
const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: 'Canva en SNT',
    subtitle: 'Un outil pour créer des visuels',
    content:
      "Canva est un outil en ligne qui permet de créer rapidement des visuels : affiches, posts, infographies, diaporamas. En SNT, il sert à produire des supports clairs pour présenter des projets, expliquer des notions ou communiquer autour d'un événement.",
    details: [
      {
        h: 'Définition',
        p: 'Canva propose des modèles (templates) prêts à l’emploi : mises en page, polices et couleurs sont déjà organisées.',
      },
      {
        h: 'Exemple',
        p: 'Pour un club informatique, tu peux créer une affiche d’événement en partant d’un modèle “Affiche” et en adaptant les textes et couleurs.',
      },
      {
        h: 'À retenir',
        p: "Canva ne remplace pas le fond : c'est un outil pour mieux communiquer des idées déjà construites.",
      },
      { h: 'Vocabulaire', p: 'modèle, template, visuel, communication.' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'En quoi créer un visuel avec Canva est-il différent d’un simple copier-coller d’images trouvées en ligne ?',
      },
      {
        label: 'Investigation',
        text: 'Lister 3 situations en SNT où un visuel Canva peut aider : projet, exposé, communication d’un événement.',
      },
    ],
  },
  {
    number: '02',
    title: 'Hiérarchie visuelle',
    subtitle: 'Guider l’œil avec taille et contraste',
    hasLab: true,
    content:
      "Dans un visuel, on doit voir le plus important en premier. Utilise la TAILLE et le CONTRASTE. Ton titre doit être énorme, tes infos secondaires plus petites. Si tout est gros, rien n'est important !",
    details: [
      {
        h: 'Définition',
        p: 'La hiérarchie visuelle organise les éléments pour guider l’œil : ce qui est grand, contrasté ou bien placé attire l’attention en premier.',
      },
      {
        h: 'Exemple',
        p: 'Sur une affiche SNT : titre géant (“Club code”), sous-titre moyen (“Tous les mardis”), détails petits (lieu, contact).',
      },
      {
        h: 'À retenir',
        p: 'Avant d’exporter, recule et regarde : qu’est-ce que tu vois en premier ? Si ce n’est pas l’essentiel, simplifie.',
      },
      { h: 'Vocabulaire', p: 'hiérarchie, contraste, accent.' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi certaines affiches “chargées” fonctionnent-elles quand même (festivals, soirées) ?',
      },
      {
        label: 'Exposé',
        text: 'Comparer deux affiches (une lisible, une brouillonne) et expliquer laquelle communique le mieux et pourquoi.',
      },
    ],
  },
  {
    number: '03',
    title: 'Éléments et cadres',
    subtitle: 'Illustrer avec formes et icônes',
    content:
      "Pour que tes photos soient jolies, utilise les 'Cadres' (Frames). Fais glisser une image dans un rond ou une forme spéciale. Utilise les 'Éléments' pour ajouter des icônes simples qui illustrent tes propos.",
    details: [
      {
        h: 'Définition',
        p: 'Un cadre (frame) est une forme dans laquelle tu peux glisser une image : rond, vague, téléphone, etc. Les éléments sont des formes, lignes et icônes pour enrichir le design.',
      },
      {
        h: 'Exemple',
        p: 'Pour une story Instagram du club SNT, tu places ta photo dans un cadre téléphone, puis tu ajoutes des icônes “like”, “message”, “partage”.',
      },
      {
        h: 'À retenir',
        p: 'Cadres + éléments = visuels plus dynamiques sans compétences en dessin.',
      },
      { h: 'Vocabulaire', p: 'cadre, frame, élément, icône.' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Quand les éléments décoratifs aident-ils la compréhension ? Quand la surchargent-ils ?',
      },
      {
        label: 'Investigation',
        text: 'Créer une infographie verticale en utilisant au moins 2 cadres et 5 éléments différents pour expliquer une notion SNT.',
      },
    ],
  },
  {
    number: '04',
    title: 'La règle des 3 couleurs',
    subtitle: 'Une palette simple et cohérente',
    hasLab2: true,
    content:
      "Trop de couleurs tue le design. Choisis une couleur principale, une couleur secondaire et une couleur d'accent (souvent pour les boutons ou les titres). Canva te propose des palettes qui vont bien ensemble automatiquement.",
    details: [
      {
        h: 'Définition',
        p: 'Une palette limitée aide la lisibilité et l’identité visuelle : une couleur dominante, une secondaire, une d’accent pour attirer l’œil.',
      },
      {
        h: 'Exemple',
        p: 'Bleu principal, gris secondaire, orange en accent pour les boutons et les mots-clés.',
      },
      {
        h: 'À retenir',
        p: 'Moins de couleurs, plus d’impact. Utilise les palettes proposées par Canva pour rester cohérent.',
      },
      { h: 'Vocabulaire', p: 'palette, couleur principale, accent.' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Faut-il toujours respecter la règle des 3 couleurs ? Quels styles ou contextes peuvent justifier plus de couleurs ?',
      },
      {
        label: 'Investigation',
        text: 'Créer 3 versions d’un même post avec 3 palettes différentes et demander à 3 camarades laquelle ils préfèrent et pourquoi.',
      },
    ],
  },
  {
    number: '05',
    title: 'Exporter et partager',
    subtitle: 'Adapter le format à l’usage',
    content:
      "Une affiche ? Export en 'PDF pour impression'. Un post Insta ? Export en 'PNG'. Une présentation ? Utilise le mode 'Présenter' directement dans le navigateur pour épater ton prof.",
    details: [
      {
        h: 'Définition',
        p: "Chaque usage a son format : PDF pour l'impression (qualité, textes nets), PNG pour le web (images nettes, fond transparent possible), présentation en mode “Présenter”.",
      },
      {
        h: 'Exemple',
        p: 'Pour un dossier imprimé, tu choisis “PDF pour impression”. Pour un post Instagram, “PNG” en 1080×1080.',
      },
      {
        h: 'À retenir',
        p: 'Un bon design peut être ruiné par un mauvais export : adapte toujours le format à l’usage.',
      },
      { h: 'Vocabulaire', p: 'export, PDF, PNG, résolution.' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi un PDF est-il souvent préférable à un JPG pour imprimer un document avec du texte ?',
      },
      {
        label: 'Investigation',
        text: 'Exporter un même projet en 3 formats (PDF, PNG, JPG) et lister les usages pertinents pour chacun.',
      },
    ],
  },
  {
    number: 'MISSION',
    title: 'Mission : créer un visuel SNT',
    subtitle: 'Appliquer les bonnes pratiques',
    isProject: true,
    intro:
      'Choisis UNE mission — 15 à 20 min, seul ou en binôme. À la fin, tu montres ton livrable au professeur.',
    projects: [
      {
        topic: "Affiche d'événement SNT",
        desc: 'Crée une affiche pour le club informatique du lycée en utilisant seulement 2 polices différentes.',
        livrable:
          'Affiche exportée en PDF + capture d’écran du modèle Canva utilisé. Oral 1 min : expliquer les choix (modèle, hiérarchie, couleurs).',
        difficulty: 'Débutant',
        duration: '15 min',
      },
      {
        topic: 'Infographie SNT',
        desc: 'Résume le fonctionnement d’Internet en une seule image verticale claire.',
        livrable:
          'Infographie en PNG (format story) + liste des éléments utilisés (cadres, icônes, palette).',
        difficulty: 'Intermédiaire',
        duration: '20 min',
      },
      {
        topic: 'Post Instagram “Astuce SNT”',
        desc: 'Crée un post carré qui donne une seule astuce SNT (exemple : “Comment sécuriser son mot de passe”).',
        livrable:
          'Post en PNG + 3 lignes expliquant l’astuce et comment tu as appliqué hiérarchie et règle des 3 couleurs.',
        difficulty: 'Débutant',
        duration: '15 min',
      },
    ],
    exposes: [
      'Présenter 3 modèles Canva préférés et expliquer dans quels cas les utiliser en SNT.',
      'Montrer avant / après d’un visuel amélioré grâce à la hiérarchie et à une palette limitée.',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: 'Faire une mini-exposition des visuels (projection ou mur virtuel). Insister sur la justification des choix (modèle, hiérarchie, couleurs, export) et faire le lien avec PIX (création de contenus).',
      },
    ],
  },
];

/* ---------- Quiz ---------- */
const QUIZ_QUESTIONS: Question[] = [
  {
    q: 'En SNT, Canva est surtout utile pour :',
    options: [
      'Écrire du code Python',
      'Créer des visuels de communication',
      'Configurer un réseau',
    ],
    correct: 1,
    explanation:
      'Canva sert à produire affiches, infographies, posts, diaporamas, pas à coder ou configurer.',
  },
  {
    q: "Qu'est-ce que la hiérarchie visuelle ?",
    options: [
      'Mettre toutes les photos à la même taille',
      'Mettre les informations importantes plus en avant (taille, couleur)',
      'Ranger ses fichiers par date',
    ],
    correct: 1,
    explanation: 'Elle permet de guider l’œil du lecteur vers l’essentiel.',
  },
  {
    q: 'Quel format choisir pour imprimer une affiche en haute qualité ?',
    options: ['JPG', 'GIF', 'PDF pour impression'],
    correct: 2,
    explanation: 'Le PDF conserve la qualité des textes et des images pour l’imprimante.',
  },
  {
    q: 'La règle des 3 couleurs recommande :',
    options: ['1 couleur', '3 couleurs', '7 couleurs'],
    correct: 1,
    explanation:
      'Une couleur principale, une secondaire et une d’accent suffisent pour un design lisible.',
  },
  {
    q: 'Le domaine PIX principalement mobilisé ici est :',
    options: [
      'Données personnelles et sécurité',
      'Création de contenus',
      'Programmation et algorithmes',
    ],
    correct: 1,
    explanation:
      'Tu crées des visuels numériques pour communiquer : c’est bien “Création de contenus”.',
  },
];

const COMPETENCES = [
  { key: 'canva', label: 'Canva', desc: 'Utiliser Canva comme outil de création de visuels' },
  { key: 'hierarchie', label: 'Hiérarchie', desc: 'Organiser titres et infos par taille et contraste' },
  { key: 'elements', label: 'Éléments', desc: 'Utiliser cadres, formes et icônes' },
  { key: 'couleurs', label: 'Couleurs', desc: 'Appliquer une palette limitée et cohérente' },
  { key: 'pix', label: 'PIX', desc: 'Mobiliser le domaine “Création de contenus”' },
];

export default function CanvaChapter() {
  const [modeSession, setModeSession] = useState<ModeSession>('20min');
  const [mode, setMode] = useState<'home' | 'cours' | 'quiz' | 'resultat'>('home');
  const [step, setStep] = useState(0);
  const [openLesson, setOpenLesson] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [labPoints, setLabPoints] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);

  const current = LESSON_STEPS[step];
  const question = QUIZ_QUESTIONS[quizIdx];
  const isLastStep = step === LESSON_STEPS.length - 1;
  const isLastQuestion = quizIdx === QUIZ_QUESTIONS.length - 1;
  const isLong = modeSession === '1h' || modeSession === '1h30';
  const progressionScore = score * QUIZ_POINTS + labPoints;

  const changeSessionMode = (m: ModeSession) => {
    setModeSession(m);
    setMode('home');
    setStep(0);
    setOpenLesson(false);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setScore(0);
    setLabPoints(0);
    setLab1Answer(null);
    setLab2Answer(null);
  };

  const startCourse = () => {
    setMode('cours');
    setStep(0);
    setOpenLesson(false);
  };

  const nextStep = () => {
    setOpenLesson(false);
    if (isLastStep) setMode('quiz');
    else setStep((s) => s + 1);
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setOpenLesson(false);
    }
  };

  const answerLab1 = (val: string) => {
    if (lab1Answer !== null) return;
    setLab1Answer(val);
    if (val === LAB1_CORRECT) setLabPoints((p) => p + LAB_POINTS);
  };

  const answerLab2 = (val: string) => {
    if (lab2Answer !== null) return;
    setLab2Answer(val);
    if (val === LAB2_CORRECT) setLabPoints((p) => p + LAB_POINTS);
  };

  const handleAnswer = (idx: number) => {
    if (isLocked) return;
    setSelectedAnswer(idx);
    setIsLocked(true);
    if (idx === question.correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setMode('resultat');
      return;
    }
    setQuizIdx((q) => q + 1);
    setSelectedAnswer(null);
    setIsLocked(false);
  };

  const restart = () => {
    setMode('home');
    setStep(0);
    setOpenLesson(false);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setScore(0);
    setLabPoints(0);
    setLab1Answer(null);
    setLab2Answer(null);
  };

  const labClass = (val: string, answer: string | null, correct: string) => {
    if (answer === null) return 'bg-white border-slate-300 hover:border-cyan-400';
    if (val === correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (val === answer) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
  };

  const optionClass = (i: number) => {
    if (!isLocked) return 'bg-white border-slate-200 hover:border-cyan-500';
    if (i === question.correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (i === selectedAnswer) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-white opacity-40';
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans selection:bg-cyan-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link
            href="/themes"
            className="text-sm font-bold text-slate-500 hover:text-slate-900 transition shrink-0"
          >
            ← Tous les thèmes
          </Link>
          <div className="hidden md:block text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-600">
              Sciences numériques et technologie
            </div>
            <div className="text-sm font-black tracking-tight">CANVA & VISUELS</div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {(mode === 'cours' || mode === 'quiz' || mode === 'resultat') && (
              <div className="hidden sm:flex flex-col items-end leading-none">
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">
                  Progression
                </span>
                <span className="text-sm font-black text-slate-800 tabular-nums">
                  {progressionScore}
                  <span className="text-slate-400 font-bold text-xs ml-0.5">pts</span>
                </span>
              </div>
            )}
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {(['20min', '1h', '1h30'] as ModeSession[]).map((m) => (
                <button
                  key={m}
                  onClick={() => changeSessionMode(m)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    modeSession === m
                      ? 'bg-slate-900 text-white shadow'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Page d'accueil */}
      {mode === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Parcours SNT
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8">
              CANVA<br />& VISUELS
            </h1>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Créer des visuels clairs pour tes projets SNT.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Canva comme outil de création d’affiches, d’infographies et de posts,
              en lien avec le domaine PIX “Création de contenus”.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={startCourse}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg"
              >
                Commencer l’exploration →
              </button>
              <div className="px-6 py-4 border border-slate-200 rounded-xl bg-white text-sm text-slate-500">
                Durée sélectionnée : <strong className="text-slate-900">{modeSession}</strong>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-5 mt-24">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Découvrir
              </div>
              <h3 className="font-black text-xl mb-3">Canva en SNT</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Un outil pour communiquer autour de tes projets.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Concevoir
              </div>
              <h3 className="font-black text-xl mb-3">Hiérarchie et couleurs</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Rendre tes visuels lisibles et percutants.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Publier
              </div>
              <h3 className="font-black text-xl mb-3">Export et partage</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Adapter le format à l’usage : impression, web, présentation.
              </p>
            </div>
          </section>

          <section className="mt-16 border border-amber-200 bg-amber-50/80 rounded-2xl p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3">
              Pour le professeur — outil de pilotage
            </div>
            <p className="text-sm text-amber-950 leading-relaxed max-w-3xl">
              Le <strong>score de progression</strong> indique l’avancement. En parcours{' '}
              <strong>1 h 30</strong>, les missions avec livrable valident la capacité à
              produire un visuel numérique (lien avec PIX).
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
              Votre parcours
            </div>
            <h2 className="text-3xl font-black mt-2 mb-10">
              5 étapes pour créer des visuels en SNT
            </h2>
            <div className="space-y-3">
              {LESSON_STEPS.slice(0, 5).map((item) => (
                <div
                  key={item.number}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-6"
                >
                  <div className="text-3xl font-black text-slate-200">{item.number}</div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* Cours */}
      {mode === 'cours' && (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-10">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              <span>Parcours {current.number}</span>
              <span>
                {step + 1} / {LESSON_STEPS.length}
              </span>
            </div>
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <header className="mb-12">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 mb-5">
              {current.subtitle}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              {current.title}
            </h1>
          </header>

          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-8 md:p-12">
              {current.isProject ? (
                <div>
                  <div className="border-l-4 border-cyan-500 pl-5 mb-10">
                    <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-2">
                      Votre objectif
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed">{current.intro}</p>
                  </div>
                  {modeSession === '1h30' && (
                    <p className="text-sm text-slate-500 mb-8 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                      En 1 h 30, la mission et son <strong>livrable</strong> sont le cœur de
                      la séance.
                    </p>
                  )}
                  <div className="grid gap-5">
                    {current.projects?.map((proj, i) => (
                      <div
                        key={i}
                        className="border border-slate-200 rounded-2xl p-6 hover:border-cyan-400 transition"
                      >
                        <div className="flex flex-wrap justify-between gap-4 mb-4">
                          <h3 className="font-black text-xl">{proj.topic}</h3>
                          <div className="text-xs font-bold text-slate-400">
                            {proj.duration} · {proj.difficulty}
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                          {proj.externalUrl ? (
                            <>
                              Ouvre{' '}
                              <a
                                href={proj.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-700 font-bold underline underline-offset-2 hover:text-cyan-900"
                              >
                                {proj.externalLabel ?? proj.externalUrl}
                              </a>
                              . {proj.desc}
                            </>
                          ) : (
                            proj.desc
                          )}
                        </p>
                        <div className="mt-6 pt-5 border-t border-slate-100">
                          <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
                            Livrable attendu
                          </div>
                          <p className="text-sm text-slate-600">{proj.livrable}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {current.exposes && (
                    <div className="mt-10 bg-slate-50 rounded-2xl p-6">
                      <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-4">
                        Pour poursuivre à la maison
                      </div>
                      <ul className="space-y-3 text-sm text-slate-600">
                        {current.exposes.map((e, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="text-cyan-600">→</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {isLong && current.deep?.find((d) => d.label.includes('prof')) && (
                    <div className="mt-8 border border-amber-200 bg-amber-50 rounded-2xl p-6">
                      <div className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">
                        Note professeur — mode {modeSession}
                      </div>
                      <p className="text-sm text-amber-950 leading-relaxed">
                        {current.deep.find((d) => d.label.includes('prof'))?.text}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <section className="mb-10">
                    <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-4">
                      L&apos;idée essentielle
                    </div>
                    <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
                      {current.content}
                    </p>
                  </section>
                  {current.details && (
                    <section>
                      <button
                        onClick={() => setOpenLesson(!openLesson)}
                        className="w-full flex justify-between items-center border border-slate-200 rounded-xl px-6 py-5 hover:border-cyan-400 transition"
                      >
                        <span className="font-bold">Approfondir la notion</span>
                        <span className="text-slate-400">{openLesson ? '−' : '+'}</span>
                      </button>
                      {openLesson && (
                        <div className="mt-6 space-y-8">
                          {current.details.map((detail, i) => (
                            <div key={i} className="border-l-2 border-cyan-300 pl-6">
                              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-3">
                                {detail.h}
                              </div>
                              <p className="text-slate-600 leading-relaxed">{detail.p}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  )}
                </>
              )}

              {/* Labs */}
              {current.hasLab && (
                <section className="mt-10 bg-cyan-50 border border-cyan-100 rounded-2xl p-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-cyan-700 mb-3">
                    Expérience rapide
                  </div>
                  <h3 className="font-black text-xl mb-3">Hiérarchie visuelle</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Comment attirer l’œil sur le titre principal ?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {LAB1_OPTIONS.map((val) => (
                      <button
                        key={val}
                        disabled={lab1Answer !== null}
                        onClick={() => answerLab1(val)}
                        className={`px-5 py-3 rounded-lg border font-bold transition ${labClass(
                          val,
                          lab1Answer,
                          LAB1_CORRECT
                        )}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {lab1Answer !== null && (
                    <p className="mt-5 text-sm text-slate-700">
                      <strong>
                        {lab1Answer === LAB1_CORRECT
                          ? `Notion validée (+${LAB_POINTS} pts). `
                          : 'Pas exactement. '}
                      </strong>
                      {LAB1_FEEDBACK}
                    </p>
                  )}
                </section>
              )}

              {current.hasLab2 && (
                <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-indigo-700 mb-3">
                    Expérience rapide
                  </div>
                  <h3 className="font-black text-xl mb-3">Règle des 3 couleurs</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Combien de couleurs principales recommande-t-on pour un design lisible ?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {LAB2_OPTIONS.map((val) => (
                      <button
                        key={val}
                        disabled={lab2Answer !== null}
                        onClick={() => answerLab2(val)}
                        className={`px-5 py-3 rounded-lg border font-bold transition ${labClass(
                          val,
                          lab2Answer,
                          LAB2_CORRECT
                        )}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {lab2Answer !== null && (
                    <p className="mt-5 text-sm text-slate-700">
                      <strong>
                        {lab2Answer === LAB2_CORRECT
                          ? `Notion validée (+${LAB_POINTS} pts). `
                          : 'Pas exactement. '}
                      </strong>
                      {LAB2_FEEDBACK}
                    </p>
                  )}
                </section>
              )}

              {!current.isProject && isLong && current.deep && (
                <section className="mt-10 border-t border-slate-100 pt-10">
                  <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-6">
                    Pour aller plus loin
                  </div>
                  <div className="grid gap-4">
                    {current.deep.map((ext, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-6">
                        <h4 className="font-bold mb-2">{ext.label}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{ext.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="border-t border-slate-100 p-6 md:p-8 flex justify-between gap-4">
              <button
                onClick={previousStep}
                disabled={step === 0}
                className="px-5 py-3 text-sm font-bold text-slate-500 disabled:opacity-20"
              >
                ← Précédent
              </button>
              <button
                onClick={nextStep}
                className="px-7 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-cyan-700 transition"
              >
                {isLastStep ? 'Vérifier mes acquis →' : 'Continuer →'}
              </button>
            </div>
          </article>

          <div className="mt-8 border border-slate-200 rounded-xl bg-white p-5">
            <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
              Parcours sélectionné
            </div>
            <p className="text-sm text-slate-600">
              {modeSession === '20min' &&
                'Essentiel : notions fondamentales et expériences courtes.'}
              {modeSession === '1h' &&
                'Exploration : détails et questions d’approfondissement.'}
              {modeSession === '1h30' &&
                'Investigation : parcours complet + mission et livrable.'}
            </p>
          </div>
        </main>
      )}

      {/* Quiz */}
      {mode === 'quiz' && (
        <main className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 mb-4">
              Vérification des acquis
            </div>
            <h1 className="text-4xl md:text-5xl font-black">Ce que vous avez retenu</h1>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-10">
              <span>Question {quizIdx + 1}</span>
              <span>{QUIZ_QUESTIONS.length} questions</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-10">{question.q}</h2>
            <div className="grid gap-3">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 rounded-xl border text-left font-medium transition ${optionClass(
                    i
                  )}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-3">
                  Explication
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">{question.explanation}</p>
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-cyan-700 transition"
                >
                  {isLastQuestion ? 'Voir mon bilan →' : 'Question suivante →'}
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Résultat */}
      {mode === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20">
          <section className="bg-white border border-slate-200 rounded-3xl p-10 md:p-16 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 mb-6">
              Parcours terminé
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Bilan de compétences</h1>
            <p className="text-slate-500 mb-10 max-w-xl leading-relaxed">
              Synthèse des notions travaillées. Le score indique l’avancement ; les compétences
              structurent le parcours.
            </p>
            <div className="flex flex-wrap items-end gap-8 mb-12 pb-10 border-b border-slate-100">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
                  Questionnaire
                </div>
                <div className="text-5xl font-black text-slate-900">
                  {score}
                  <span className="text-2xl text-slate-300">/{QUIZ_QUESTIONS.length}</span>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
                  Score de progression
                </div>
                <div className="text-3xl font-black text-slate-800 tabular-nums">
                  {progressionScore} <span className="text-base font-bold text-slate-400">pts</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {score * QUIZ_POINTS} (quiz) + {labPoints} (expériences)
                </p>
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-5">
              Compétences du parcours
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {COMPETENCES.map((c) => (
                <div key={c.key} className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                  <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-3">
                    {c.label}
                  </div>
                  <div className="font-bold text-slate-900">{c.desc}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
              Montrez cet écran à votre professeur
            </p>
            <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap gap-4">
              <button
                onClick={restart}
                className="px-6 py-3 border border-slate-300 rounded-lg font-bold hover:border-slate-900 transition"
              >
                Revoir le parcours
              </button>
              <Link
                href="/themes"
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-cyan-700 transition"
              >
                Explorer un autre thème →
              </Link>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}