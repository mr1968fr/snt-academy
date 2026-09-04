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
  icon?: string;
  color?: string;
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

const LAB1_OPTIONS = ['Sommet', 'Arête'];
const LAB1_CORRECT = 'Arête';
const LAB1_FEEDBACK =
  'Le trait qui relie deux amis = une relation = une arête. Le sommet, c’est le compte / la personne.';

const LAB2_OPTIONS = ['1', '2', '3'];
const LAB2_CORRECT = '2';
const LAB2_FEEDBACK =
  'Trois sommets en ligne : 2 arêtes entre le 1er et le 3e → distance = 2.';

/* ---------- Cours ---------- */
const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "L'expérience du Petit Monde",
    subtitle: 'De Milgram aux réseaux sociaux',
    icon: '🌍',
    color: 'border-amber-500',
    content:
      "En 1967, Stanley Milgram a montré que deux inconnus étaient reliés par seulement 6 intermédiaires. Aujourd'hui, avec les réseaux sociaux, ce chiffre est tombé à 3,5 ! C'est ce qu'on appelle le phénomène du 'Petit Monde'.",
    details: [
      {
        h: 'Définition',
        p: "L'expérience de Milgram (1967) : deux personnes au hasard sont reliées par une chaîne d'environ 6 intermédiaires — le « monde petit ». Les réseaux numériques l'ont vérifié à l'échelle : sur les grands réseaux, la distance moyenne tombe à 3 ou 4.",
      },
      {
        h: 'Exemple',
        p: "Un message passé de proche en proche atteint une personne inconnue à l'autre bout du monde en quelques relais seulement.",
      },
      {
        h: 'À retenir',
        p: "Le monde est petit grâce aux « ponts » : ces personnes qui relient des communautés différentes.",
      },
      { h: 'Vocabulaire', p: 'degré de séparation, relais, pont.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Un monde « plus petit » grâce aux réseaux : plus de solidarité… ou plus de rumeurs qui voyagent vite ?',
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Estimer ta « distance » avec une personnalité publique via des amis communs (combien de relais ?).',
      },
    ],
  },
  {
    number: '02',
    title: 'Les graphes : le langage des réseaux',
    subtitle: 'Sommet, arête, voisin, distance',
    icon: '📐',
    color: 'border-blue-500',
    hasLab: true,
    content:
      "Pour étudier un réseau, on utilise les graphes. Un compte = un SOMMET. Une relation = une ARÊTE. Si le lien ne marche que dans un sens (ex: tu suis une star), c'est un graphe ORIENTÉ.",
    details: [
      {
        h: 'Définition',
        p: 'Un réseau se modélise par un graphe : des sommets (les personnes) reliés par des arêtes (les relations). Ce modèle permet de calculer distances, influences et communautés.',
      },
      {
        h: 'Exemple',
        p: "En dessinant « qui suit qui », les influenceurs apparaissent : ce sont les sommets reliés au plus grand nombre.",
      },
      {
        h: 'À retenir',
        p: 'Le graphe est LE langage des réseaux : réseaux sociaux, web, cartes de métro — tout se dessine en sommets et arêtes.',
      },
      { h: 'Vocabulaire', p: 'sommet, arête, voisin, distance.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Graphe orienté (follow) vs non orienté (amis) : quel modèle pour Instagram ? Pour WhatsApp ?',
      },
      {
        label: 'Exposé (1h30)',
        text: 'Dessiner le graphe de 6 élèves de la classe (amis déclarés) et identifier le sommet le plus connecté.',
      },
    ],
  },
  {
    number: '03',
    title: 'Calculer une distance',
    subtitle: 'Plus court chemin et diamètre',
    icon: '🔬',
    color: 'border-indigo-500',
    hasLab2: true,
    content:
      "La 'distance' entre deux sommets, c'est le nombre minimum d'arêtes pour les relier. L'écartement d'un sommet est sa distance maximale vers les autres. Le centre du graphe est le sommet avec l'écartement le plus petit.",
    details: [
      {
        h: 'Définition',
        p: "La distance entre deux sommets d'un graphe est le nombre d'arêtes du plus court chemin qui les relie.",
      },
      {
        h: 'Exemple',
        p: 'Toi → un ami → une célébrité qu’il suit : distance 2. Avec un parfait inconnu, on trouve souvent 4 à 6.',
      },
      {
        h: 'À faire maintenant',
        p: "Essaie d'estimer ta distance avec une célébrité en cherchant tes amis communs : combien de relais ?",
      },
      {
        h: 'À retenir',
        p: 'Ces distances se calculent automatiquement, même sur des réseaux à des milliards de sommets.',
      },
      { h: 'Vocabulaire', p: 'plus court chemin, distance, degré.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Pourquoi les plateformes calculent-elles ces distances ? (recommandations d’amis, publicité…)',
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Définir diamètre d’un graphe et l’illustrer sur un mini-graphe de 5 sommets.',
      },
    ],
  },
  {
    number: '04',
    title: 'Ton identité numérique',
    subtitle: 'Trace active, trace passive, e‑réputation',
    icon: '🔍',
    color: 'border-pink-500',
    content:
      "Il y a ce que tu montres (profil) et ce que tu laisses sans le vouloir (cookies, temps de vue, géolocalisation). Tout cela forme ton identité numérique. Ton e‑réputation, c'est ce que Google dit de toi.",
    details: [
      {
        h: 'Définition',
        p: "Tout ce qui est associé à ton nom en ligne : profils, publications, photos, commentaires. Elle a deux faces : la trace active (ce que tu publies) et la trace passive (ce que les autres publient sur toi).",
      },
      {
        h: 'Exemple',
        p: 'Un recruteur tape ton nom dans un moteur : la première page de résultats EST ton identité numérique à ses yeux.',
      },
      {
        h: 'À faire maintenant',
        p: 'Cherche ton propre nom dans un moteur de recherche et observe la première page de résultats : c’est ce que le monde voit.',
      },
      {
        h: 'À retenir',
        p: "Sur Internet, « effacer » ne veut pas dire disparaître : captures d'écran et copies existent toujours.",
      },
      { h: 'Vocabulaire', p: 'e-réputation, trace active, trace passive.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Faut-il avoir le droit à l’oubli dès 15 ans sur les contenus publiés par d’autres ?',
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Faire une recherche « soi-même » (ou un pseudo) et noter 3 traces actives / passives trouvées.',
      },
    ],
  },
  {
    number: '05',
    title: 'Bulle de filtres & algorithmes',
    subtitle: "Ton fil n'est pas LE fil",
    icon: '🧼',
    color: 'border-yellow-500',
    content:
      "L'algorithme veut que tu restes sur l'appli. Il te montre donc uniquement ce que tu aimes déjà. C'est la 'bulle de filtres'. Elle t'empêche de voir des avis différents et peut favoriser les fake news.",
    details: [
      {
        h: 'Définition',
        p: 'Les réseaux trient ce qu’ils te montrent selon tes clics passés : ton fil devient une version du monde qui te ressemble et te conforte. C’est la bulle de filtres.',
      },
      {
        h: 'Exemple',
        p: 'Deux personnes voient deux fils d’actualité totalement différents sur le même événement, chacun alimenté par ses propres goûts.',
      },
      {
        h: 'À retenir',
        p: 'Ce que tu vois n’est pas LE fil, c’est TON fil : un algorithme a choisi pour toi. Diversifier ses sources est la parade.',
      },
      { h: 'Vocabulaire', p: 'algorithme de recommandation, bulle de filtres, engagement.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'L’algorithme « te connaît » : confort ou manipulation de l’attention ?',
      },
      {
        label: 'Exposé (1h30)',
        text: 'Comparer 2 comptes sur le même sujet : ce que chacun voit en 24 h (captures anonymisées).',
      },
    ],
  },
  {
    number: '06',
    title: 'Cyberviolence : ce que dit la loi',
    subtitle: 'Harcèlement, menaces, signalement',
    icon: '⚖️',
    color: 'border-red-500',
    content:
      'Le cyberharcèlement (insultes répétées, menaces, revenge porn) est puni par le Code pénal, même sous pseudo. Le respect s’applique aussi derrière un écran. Le numéro à retenir : 3018.',
    details: [
      {
        h: 'Définition',
        p: 'Harcèlement en ligne, menaces, diffusion d’images intimes sans accord, usurpation d’identité : tous sont des délits punis par la loi, avec des peines aggravées quand ils visent un mineur.',
      },
      {
        h: 'Exemple',
        p: 'Le cyberharcèlement « en meute » est spécifiquement puni : participer à une vague de messages hostiles est un délit, même « pour rire ».',
      },
      {
        h: 'À retenir',
        p: 'La bonne réaction : capturer les preuves (captures d’écran), ne pas répondre, parler à un adulte de confiance et signaler — le 3018 est le numéro dédié. Et vérifie régulièrement tes paramètres de confidentialité.',
      },
      {
        h: 'Vocabulaire',
        p: 'cyberharcèlement, preuve, signalement, paramètres de confidentialité.',
      },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Faut-il systématiquement appeler les parents / l’école dès le premier message hostile ?',
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Noter 3 réflexes (preuves, signalement, 3018) et où trouver de l’aide en ligne (sites officiels).',
      },
    ],
  },
  {
    number: 'MISSION',
    title: 'Mission en classe',
    subtitle: 'Mettre les notions en pratique',
    icon: '🚀',
    color: 'border-purple-600',
    isProject: true,
    intro:
      'Choisis UNE mission — 15 à 20 min, seul ou en binôme. À la fin, tu montres ton livrable au professeur.',
    projects: [
      {
        topic: "L'économie de l'attention",
        desc: 'Comment TikTok et Instagram font-ils pour nous garder connectés le plus longtemps possible ?',
        livrable:
          '3 techniques repérées (scroll infini, notifications, algo…) + 1 impact sur le temps d’écran. Oral 2 min.',
        difficulty: 'Intermédiaire',
        duration: '15 min',
      },
      {
        topic: 'Fake news & élections',
        desc: 'Comment les réseaux sociaux sont devenus des outils d’influence politique majeure ?',
        livrable:
          '1 exemple documenté + 2 mécanismes (viralité, micro-ciblage…) + 1 contre-mesure citoyenne.',
        difficulty: 'Avancé',
        duration: '20 min',
      },
      {
        topic: "L'influenceur : un vrai métier ?",
        desc: 'Revenus, responsabilités et impact sur les jeunes : enquête sur un nouveau business.',
        externalUrl: 'https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/influenceurs',
        externalLabel: 'DGCCRF — influenceurs',
        livrable:
          'Définition + 2 obligations légales (publicité, transparence) + 1 risque pour le public jeune.',
        difficulty: 'Débutant',
        duration: '15 min',
      },
    ],
    exposes: [
      'Petit monde et « ponts » : qui relie vraiment les communautés en ligne ?',
      '3018 et signalement : que faire concrètement face au cyberharcèlement ?',
    ],
    deep: [
      {
        label: 'Pour le prof (1h30)',
        text: 'Attribuer 1 mission par binôme. Vérifier le livrable. Rappeler le 3018 sans dramatiser. Option : mini-graphe au tableau (6 sommets) pour ancrer distance / arête.',
      },
    ],
  },
];

/* ---------- Quiz ---------- */
const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Dans un graphe, que représente un 'sommet' ?",
    options: ['Une relation', 'Un utilisateur', 'Une publicité'],
    correct: 1,
    explanation: 'Le sommet est le point qui représente un compte ou un individu.',
  },
  {
    q: "Qu'est-ce que le 'diamètre' d'un graphe ?",
    options: [
      "Le nombre d'abonnés",
      'La distance maximale entre deux sommets',
      'La taille du logo',
    ],
    correct: 1,
    explanation:
      'C’est la plus longue des distances minimales entre deux sommets du réseau.',
  },
  {
    q: "L'expérience de Milgram (1967) portait sur :",
    options: [
      'La dépendance aux écrans',
      'Les 6 degrés de séparation',
      'La qualité du WiFi',
    ],
    correct: 1,
    explanation:
      'Il a illustré que nous sommes reliés par une courte chaîne de connaissances.',
  },
  {
    q: "C'est quoi une 'bulle de filtres' ?",
    options: [
      'Une protection antivirus',
      'Le fait de ne voir que des contenus qui confirment nos opinions',
      'Un filtre photo',
    ],
    correct: 1,
    explanation: 'L’algorithme enferme dans ce que l’on connaît / aime déjà.',
  },
  {
    q: 'La cyberviolence est punie par la loi :',
    options: [
      'Seulement pour les adultes',
      'Même si on utilise un pseudonyme',
      'Uniquement sur Facebook',
    ],
    correct: 1,
    explanation: 'L’anonymat relatif n’empêche pas les poursuites pénales.',
  },
];

const COMPETENCES = [
  { key: 'graphe', label: 'Graphe', desc: 'Modéliser un réseau en sommets et arêtes' },
  { key: 'distance', label: 'Distance', desc: 'Calculer un plus court chemin' },
  { key: 'identite', label: 'Identité', desc: 'Distinguer trace active / passive' },
  { key: 'bulle', label: 'Bulle de filtres', desc: 'Comprendre les recommandations' },
  { key: 'loi', label: 'Loi', desc: 'Connaître les réflexes face au cyberharcèlement' },
];

export default function ReseauxSociauxChapter() {
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
    if (answer === null) return 'bg-white border-slate-300 hover:border-blue-400';
    if (val === correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (val === answer) return 'bg-red-50 border-red-400 text-red-800';
    return 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
  };

  const optionClass = (i: number) => {
    if (!isLocked) return 'bg-white border-slate-200 hover:border-blue-500';
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
            <div className="text-sm font-black tracking-tight">RÉSEAUX SOCIAUX</div>
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
              RÉSEAUX<br />SOCIAUX
            </h1>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Graphes, identité, bulles… et responsabilité.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Comment les réseaux se modélisent, comment ils nous voient, et comment
              rester acteur de sa vie numérique.
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
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Modéliser
              </div>
              <h3 className="font-black text-xl mb-3">Graphes et distances</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sommets, arêtes, plus courts chemins.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Comprendre
              </div>
              <h3 className="font-black text-xl mb-3">Identité et bulles</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Traces, e‑réputation, algorithmes.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Agir
              </div>
              <h3 className="font-black text-xl mb-3">Loi et cyberviolence</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Réflexes, signalement, 3018.
              </p>
            </div>
          </section>

          <section className="mt-16 border border-amber-200 bg-amber-50/80 rounded-2xl p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3">
              Pour le professeur — outil de pilotage
            </div>
            <p className="text-sm text-amber-950 leading-relaxed max-w-3xl">
              Le <strong>score de progression</strong> indique l’avancement. En parcours{' '}
              <strong>1 h 30</strong>, le livrable de la mission valide la recherche et
              l’esprit critique.
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
              Votre parcours
            </div>
            <h2 className="text-3xl font-black mt-2 mb-10">
              6 étapes pour comprendre les réseaux sociaux
            </h2>
            <div className="space-y-3">
              {LESSON_STEPS.slice(0, 6).map((item) => (
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
                            <div
                              key={i}
                              className="border-l-2 border-cyan-300 pl-6"
                            >
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
                  <h3 className="font-black text-xl mb-3">Sommet ou arête ?</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    « Le trait qui relie deux amis »
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
                  <h3 className="font-black text-xl mb-3">Distance minimale</h3>
                  <div className="bg-white rounded-xl p-4 border border-indigo-100 mb-4">
                    <svg viewBox="0 0 200 60" className="w-full max-w-[260px]">
                      <circle cx="30" cy="30" r="6" fill="#3b82f6" />
                      <line x1="36" y1="30" x2="94" y2="30" stroke="#0f172a" strokeWidth="2" />
                      <circle cx="100" cy="30" r="6" fill="#3b82f6" />
                      <line x1="106" y1="30" x2="164" y2="30" stroke="#0f172a" strokeWidth="2" />
                      <circle cx="170" cy="30" r="6" fill="#3b82f6" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    Distance entre le 1er et le 3e sommet ?
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