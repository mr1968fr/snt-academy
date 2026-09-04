'use client';

import { useState } from 'react';
import Link from 'next/link';

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

const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LAB1_OPTIONS = ['Hémisphère Nord', 'Hémisphère Sud'];
const LAB1_CORRECT = 'Hémisphère Nord';
const LAB1_FEEDBACK =
  'Latitude positive (48° N) = hémisphère Nord. L’équateur est à 0°, le pôle Nord à 90° N.';

const LAB2_OPTIONS = ['Route A', 'Route B'];
const LAB2_CORRECT = 'Route B';
const LAB2_FEEDBACK =
  'Le plus court en kilomètres n’est pas toujours le plus rapide : les algorithmes optimisent souvent le temps (ou un coût), pas seulement la distance.';

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: 'Des satellites au téléphone',
    subtitle: 'GPS, Galileo et signaux radio',
    content:
      'Les systèmes de positionnement (GPS, Galileo…) reposent sur des constellations de satellites qui émettent en continu leur position et l’heure. Le téléphone reçoit ces signaux et calcule où il se trouve.',
    details: [
      {
        h: 'Comprendre',
        p: 'Le récepteur n’« appelle » pas les satellites comme un téléphone : il capte des signaux radio, à la manière d’une radio.',
      },
      {
        h: 'Exemple',
        p: 'En extérieur, un smartphone peut capter plusieurs satellites à la fois ; le croisement de leurs signaux permet de se situer.',
      },
      {
        h: 'À retenir',
        p: 'En GPS pur, le téléphone reçoit sans émettre vers les satellites. Ce sont ensuite les applications qui peuvent envoyer ta position — et à qui.',
      },
      { h: 'Vocabulaire', p: 'satellite • récepteur • GPS • Galileo' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi dépendre uniquement du GPS américain est-il un enjeu stratégique pour un pays ?',
      },
      {
        label: 'Investigation',
        text: 'Comparer GPS, Galileo, Glonass et BeiDou : pays, rôle, précision annoncée (tableau simple).',
      },
    ],
  },
  {
    number: '02',
    title: 'La trilatération',
    subtitle: 'Mesurer des distances dans l’espace',
    content:
      'Pour une position 3D précise, le récepteur s’appuie en pratique sur plusieurs satellites. Chaque signal donne une distance ; le croisement de ces distances localise le récepteur.',
    details: [
      {
        h: 'Comprendre',
        p: 'Chaque satellite permet d’estimer une distance. Trois mesures situent en théorie un point ; une quatrième corrige notamment l’imprécision de l’horloge du récepteur.',
      },
      {
        h: 'Exemple',
        p: 'Comme trois amis indiquant « je suis à 2 km, 3 km et 5 km de toi » : tu peux en déduire ta position.',
      },
      {
        h: 'À retenir',
        p: 'On parle de trilatération (distances), pas de triangulation au sens strict.',
      },
      { h: 'Vocabulaire', p: 'trilatération • distance • précision' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi le GPS est-il souvent moins précis en centre-ville entre les immeubles ?',
      },
      {
        label: 'Exposé',
        text: 'Schéma simple de trilatération : trois cercles et une explication en trois minutes.',
      },
    ],
  },
  {
    number: '03',
    title: 'Latitude et longitude',
    subtitle: 'Le système de coordonnées mondial',
    hasLab: true,
    content:
      'Deux nombres suffisent pour désigner presque tout point de la Terre : la latitude (nord/sud) et la longitude (est/ouest).',
    details: [
      {
        h: 'Comprendre',
        p: 'Latitude : position par rapport à l’équateur. Longitude : position par rapport au méridien de Greenwich.',
      },
      {
        h: 'Exemple',
        p: 'Paris est environ à 48,85° N et 2,35° E. Un très petit écart en degrés correspond déjà à plusieurs mètres au sol.',
      },
      {
        h: 'À retenir',
        p: 'Latitude et longitude forment le langage commun des cartes et des applications de navigation.',
      },
      { h: 'Vocabulaire', p: 'latitude • longitude • équateur • méridien' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi le méridien de Greenwich est-il devenu la référence mondiale ?',
      },
      {
        label: 'Investigation',
        text: 'Trouver les coordonnées de ton lycée et les coller dans une carte (OSM ou autre).',
      },
    ],
  },
  {
    number: '04',
    title: 'Couches d’information',
    subtitle: 'Cartes numériques et SIG',
    content:
      'Une carte numérique superpose des couches : routes, transports, relief, incidents… On affiche celles qui servent l’usage du moment.',
    details: [
      {
        h: 'Comprendre',
        p: 'Fond de carte + couches thématiques. C’est le principe des systèmes d’information géographique (SIG).',
      },
      {
        h: 'Exemple',
        p: 'Couche vélo + couche travaux : l’itinéraire évite certaines perturbations.',
      },
      {
        h: 'À retenir',
        p: 'OpenStreetMap illustre une cartographie collaborative et libre, distincte des services purement commerciaux.',
      },
      { h: 'Vocabulaire', p: 'couche • fond de carte • SIG • OSM' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'OpenStreetMap vs Google Maps : quels avantages d’une carte collaborative libre ?',
      },
      {
        label: 'Investigation',
        text: 'Sur openstreetmap.org, activer ou désactiver des calques et noter trois différences avec un service commercial.',
      },
    ],
  },
  {
    number: '05',
    title: 'Itinéraires et algorithmes',
    subtitle: 'Plus court chemin dans un graphe',
    hasLab2: true,
    content:
      'Pour proposer un itinéraire, les applications modélisent le réseau routier comme un graphe et cherchent un chemin optimal selon un critère (temps, distance, etc.).',
    details: [
      {
        h: 'Comprendre',
        p: 'Dijkstra et ses variantes calculent un plus court chemin dans un graphe pondéré (poids = temps, distance, coût…).',
      },
      {
        h: 'Exemple',
        p: 'Une route plus longue en kilomètres mais fluide peut être préférée à une route courte congestionnée.',
      },
      {
        h: 'À retenir',
        p: '« Optimal » dépend du critère choisi : ce n’est pas toujours la distance minimale.',
      },
      { h: 'Vocabulaire', p: 'graphe • poids • plus court chemin • Dijkstra' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Faut-il optimiser le temps, la distance, le CO₂ ou le confort ? Qui décide ?',
      },
      {
        label: 'Exposé',
        text: 'Expliquer un plus court chemin sur un mini-graphe dessiné (cinq nœuds).',
      },
    ],
  },
  {
    number: '06',
    title: 'Géolocalisation et vie privée',
    subtitle: 'Permissions et tracking',
    content:
      'La position est une donnée sensible. Une application qui suit en permanence peut reconstruire domicile, école et habitudes.',
    details: [
      {
        h: 'Comprendre',
        p: 'Les déplacements intéressent applications, publicité, parfois assurances. Les permissions du système d’exploitation contrôlent l’accès.',
      },
      {
        h: 'Exemple',
        p: 'Une appli météo n’a en général besoin de la position que pendant l’utilisation, pas « toujours ».',
      },
      {
        h: 'À faire',
        p: 'Dans les réglages du téléphone, lister les applis ayant accès à la position et restreindre si besoin.',
      },
      {
        h: 'À retenir',
        p: 'Chaque accès à la localisation doit avoir une raison claire. Sinon, on limite ou on coupe.',
      },
      { h: 'Vocabulaire', p: 'tracking • autorisation • données de déplacement' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Partager sa position en continu avec la famille : sécurité ou surveillance ?',
      },
      {
        label: 'Investigation',
        text: 'Compter combien d’applis ont l’accès « toujours » et proposer trois changements de réglage.',
      },
    ],
  },
  {
    number: 'MISSION',
    title: 'Investigation finale',
    subtitle: 'Mettre les notions en pratique',
    isProject: true,
    intro:
      'Choisissez une mission. Travaillez seul ou en binôme. Produisez un livrable clair à présenter.',
    projects: [
      {
        topic: 'Galileo et souveraineté',
        desc: 'Pourquoi l’Europe a-t-elle développé son propre système de navigation par satellite ?',
        externalUrl: 'https://www.esa.int/Applications/Satellite_navigation/Galileo',
        externalLabel: 'ESA — Galileo',
        livrable:
          'Trois raisons stratégiques ou techniques + une phrase sur les conséquences d’une dépendance exclusive à un système étranger.',
        difficulty: 'Exploration',
        duration: '15 min',
      },
      {
        topic: 'Éthique et véhicule autonome',
        desc: 'En cas d’accident inévitable, comment un algorithme peut-il hiérarchiser des priorités ?',
        livrable:
          'Deux arguments pour prioriser les passagers, deux pour les usagers vulnérables, position personnelle en deux phrases. Oral 2 min.',
        difficulty: 'Investigation',
        duration: '20 min',
      },
      {
        topic: 'GPS et sport',
        desc: 'Comment la géolocalisation a transformé l’entraînement et le suivi des performances ?',
        livrable:
          'Trois métriques utiles (allure, dénivelé, trace…) + un risque pour la vie privée des sportifs.',
        difficulty: 'Découverte',
        duration: '15 min',
      },
    ],
    exposes: [
      'OpenStreetMap : comment se construit une carte collaborative ?',
      'Tracking publicitaire : comment la position peut financer des services « gratuits ».',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: 'Répartir les missions. Vérifier le livrable. En 1 h 30, la mission prime. Option : rappel des réglages de localisation sur téléphone.',
      },
    ],
  },
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: 'Combien de satellites sont en pratique nécessaires pour une position 3D précise ?',
    options: ['1 satellite', '2 satellites', '4 satellites'],
    correct: 2,
    explanation:
      'Plusieurs mesures de distance sont nécessaires ; une quatrième aide notamment à corriger l’horloge du récepteur.',
  },
  {
    q: 'Quelle est la référence 0 de la latitude ?',
    options: ['Le méridien de Greenwich', "L'équateur", 'Le pôle Nord'],
    correct: 1,
    explanation: "L'équateur sépare les hémisphères nord et sud.",
  },
  {
    q: 'La trilatération permet de…',
    options: [
      'Mesurer uniquement la vitesse',
      'Estimer une position à partir de distances',
      'Désigner un type de satellite',
    ],
    correct: 1,
    explanation: 'C’est le principe géométrique utilisé par les systèmes de positionnement.',
  },
  {
    q: 'Quel projet de carte est collaboratif et libre ?',
    options: ['Google Maps uniquement', 'Apple Maps uniquement', 'OpenStreetMap (OSM)'],
    correct: 2,
    explanation: 'OSM est une cartographie libre et collaborative.',
  },
  {
    q: 'Quel est un risque majeur du tracking GPS permanent ?',
    options: [
      'Il rend les photos floues',
      'Il peut révéler habitudes et lieux de vie',
      'Il empêche d’utiliser le Wi-Fi',
    ],
    correct: 1,
    explanation: 'La position continue expose domicile, trajets, fréquentations…',
  },
];

const COMPETENCES = [
  { key: 'sat', label: 'Positionnement', desc: 'Comprendre le rôle des satellites et du récepteur' },
  { key: 'coord', label: 'Coordonnées', desc: 'Utiliser latitude et longitude' },
  { key: 'carte', label: 'Cartes', desc: 'Comprendre couches d’information et itinéraires' },
  { key: 'vie', label: 'Vie privée', desc: 'Identifier les enjeux du tracking de position' },
];

export default function LocalisationChapter() {
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
    if (answer === null) return 'bg-white border-slate-300 hover:border-cyan-500 hover:bg-cyan-50';
    if (val === correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (val === answer) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
  };

  const optionClass = (i: number) => {
    if (!isLocked) return 'bg-white border-slate-200 hover:border-cyan-500 hover:bg-cyan-50';
    if (i === question.correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (i === selectedAnswer) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-white opacity-40';
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans selection:bg-cyan-200">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link href="/themes" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition shrink-0">
            ← Tous les thèmes
          </Link>
          <div className="hidden md:block text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-600">
              Sciences numériques et technologie
            </div>
            <div className="text-sm font-black tracking-tight">EXPLORER LE NUMÉRIQUE</div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {(mode === 'cours' || mode === 'quiz' || mode === 'resultat') && (
              <div className="hidden sm:flex flex-col items-end leading-none">
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Progression</span>
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
                    modeSession === m ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {mode === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Parcours SNT
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-8">
              LOCALISATION
            </h1>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Satellites, cartes, algorithmes… et vie privée.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Comment un téléphone sait-il où il se trouve ? Comment calcule-t-on un itinéraire ?
              Quelles données de position restons-nous maîtres de partager ?
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={startCourse}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg"
              >
                Commencer l&apos;exploration →
              </button>
              <div className="px-6 py-4 border border-slate-200 rounded-xl bg-white text-sm text-slate-500">
                Durée sélectionnée : <strong className="text-slate-900">{modeSession}</strong>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-5 mt-24">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Situer</div>
              <h3 className="font-black text-xl mb-3">Satellites et coordonnées</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Comprendre GPS, Galileo, latitude et longitude.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Naviguer</div>
              <h3 className="font-black text-xl mb-3">Cartes et itinéraires</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Couches d’information et calcul de chemins.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Protéger</div>
              <h3 className="font-black text-xl mb-3">Permissions de position</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Limiter le tracking et lire les autorisations.
              </p>
            </div>
          </section>

          <section className="mt-16 border border-amber-200 bg-amber-50/80 rounded-2xl p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3">
              Pour le professeur — outil de pilotage
            </div>
            <p className="text-sm text-amber-950 leading-relaxed max-w-3xl">
              Le <strong>score de progression</strong> indique l’avancement (expériences + quiz).
              En parcours <strong>1 h 30</strong>, le livrable de la mission valide la recherche et
              l’argumentation.
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Votre parcours</div>
            <h2 className="text-3xl font-black mt-2 mb-10">6 étapes pour comprendre la localisation</h2>
            <div className="space-y-3">
              {LESSON_STEPS.slice(0, 6).map((item) => (
                <div key={item.number} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-6">
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
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 mb-5">{current.subtitle}</div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">{current.title}</h1>
          </header>

          <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-8 md:p-12">
              {current.isProject ? (
                <div>
                  <div className="border-l-4 border-cyan-500 pl-5 mb-10">
                    <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-2">Votre objectif</div>
                    <p className="text-lg text-slate-600 leading-relaxed">{current.intro}</p>
                  </div>
                  {modeSession === '1h30' && (
                    <p className="text-sm text-slate-500 mb-8 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
                      En 1 h 30, la mission et son <strong>livrable</strong> sont le cœur de la séance.
                    </p>
                  )}
                  <div className="grid gap-5">
                    {current.projects?.map((proj, i) => (
                      <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-cyan-400 transition">
                        <div className="flex flex-wrap justify-between gap-4 mb-4">
                          <h3 className="font-black text-xl">{proj.topic}</h3>
                          <div className="text-xs font-bold text-slate-400">
                            {proj.duration} · {proj.difficulty}
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{proj.desc}</p>
                        {proj.externalUrl && (
                          <a
                            href={proj.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-sm font-bold text-cyan-700 hover:underline"
                          >
                            {proj.externalLabel} →
                          </a>
                        )}
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
                  {isLong && current.deep?.find((d) => d.label.includes('professeur')) && (
                    <div className="mt-8 border border-amber-200 bg-amber-50 rounded-2xl p-6">
                      <div className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">
                        Note professeur — mode {modeSession}
                      </div>
                      <p className="text-sm text-amber-950 leading-relaxed">
                        {current.deep.find((d) => d.label.includes('professeur'))?.text}
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

              {current.hasLab && (
                <section className="mt-10 bg-cyan-50 border border-cyan-100 rounded-2xl p-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-cyan-700 mb-3">
                    Expérience rapide
                  </div>
                  <h3 className="font-black text-xl mb-3">Lire une latitude</h3>
                  <p className="text-sm text-slate-600 mb-6">Position : 48° Nord. Où se situe-t-on ?</p>
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
                <section className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl p-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-orange-700 mb-3">
                    Expérience rapide
                  </div>
                  <h3 className="font-black text-xl mb-3">Choisir un itinéraire</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Route A : 10 km (bouchons). Route B : 15 km (fluide). Quelle route un calcul
                    « plus rapide » privilégie-t-il en général ?
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
              {modeSession === '20min' && 'Essentiel : notions fondamentales et expériences courtes.'}
              {modeSession === '1h' && 'Exploration : détails et questions d’approfondissement.'}
              {modeSession === '1h30' && 'Investigation : parcours complet + mission et livrable.'}
            </p>
          </div>
        </main>
      )}

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
                  className={`p-5 rounded-xl border text-left font-medium transition ${optionClass(i)}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-8 border-t border-slate-100 pt-8">
                <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-3">Explication</div>
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

      {mode === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20">
          <section className="bg-white border border-slate-200 rounded-3xl p-10 md:p-16 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 mb-6">Parcours terminé</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Bilan de compétences</h1>
            <p className="text-slate-500 mb-10 max-w-xl leading-relaxed">
              Synthèse des notions travaillées. Le score indique l’avancement ; les compétences
              structurent le parcours.
            </p>
            <div className="flex flex-wrap items-end gap-8 mb-12 pb-10 border-b border-slate-100">
              <div>
                <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Questionnaire</div>
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
                  <div className="text-xs uppercase tracking-widest font-bold text-cyan-600 mb-3">{c.label}</div>
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