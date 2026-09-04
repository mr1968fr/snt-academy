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

const LAB1_OPTIONS = ['Judo', 'Sport'];
const LAB1_CORRECT = 'Sport';
const LAB1_FEEDBACK =
  '« Sport » est le descripteur (en-tête de colonne). « Judo » est une valeur dans un enregistrement.';

const LAB2_OPTIONS = [
  'Les noms de tous les élèves',
  'Les noms des élèves de 2ndeA',
  'La liste des classes',
];
const LAB2_CORRECT = 'Les noms des élèves de 2ndeA';
const LAB2_FEEDBACK =
  "SELECT nom → colonne nom ; WHERE classe = '2ndeA' → uniquement les élèves de cette classe.";

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "C'est quoi une donnée ?",
    subtitle: 'Donnée, information, connaissance',
    content:
      "Une donnée est une information brute (un nom, un âge, une température). Quand on les organise pour qu'une machine puisse les traiter, on parle de données structurées.",
    details: [
      {
        h: 'Comprendre',
        p: "Une donnée est une valeur brute : nombre, texte, photo, mesure. Elle devient information quand on l'interprète, puis connaissance quand on l'analyse à plus grande échelle.",
      },
      {
        h: 'Exemple',
        p: "« 16 » est une donnée. « Léa a 16 ans » est une information. « La moyenne d'âge de la classe est 15,8 ans » est une connaissance.",
      },
      {
        h: 'À retenir',
        p: "Une donnée hors contexte ne veut rien dire : c'est le traitement qui lui donne son sens.",
      },
      { h: 'Vocabulaire', p: 'donnée • information • traitement • collecte' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Une photo Instagram est-elle une « donnée » ? Pour qui, et à quelle fin ?',
      },
      {
        label: 'Investigation',
        text: 'Trouver trois exemples de données brutes dans ton quotidien et les transformer en information puis en connaissance.',
      },
    ],
  },
  {
    number: '02',
    title: 'Le format CSV',
    subtitle: 'Descripteurs et enregistrements',
    hasLab: true,
    content:
      "CSV signifie Comma Separated Values. C'est un fichier texte simple : la première ligne contient souvent les descripteurs, les suivantes les enregistrements.",
    details: [
      {
        h: 'Comprendre',
        p: 'Un tableau enregistré en texte brut — une ligne par enregistrement, valeurs séparées par des virgules (ou points-virgules en France). Tout tableur sait l’ouvrir.',
      },
      {
        h: 'Exemple',
        p: 'Nom,Age puis Dupont,15 : la première ligne est le descripteur, la suivante un enregistrement.',
      },
      {
        h: 'À faire',
        p: 'Ouvrir un fichier CSV avec un éditeur de texte, puis avec un tableur : même contenu, deux lectures.',
      },
      {
        h: 'À retenir',
        p: "Le CSV est un format d'échange léger, ouvert et lisible partout.",
      },
      { h: 'Vocabulaire', p: 'descripteur • enregistrement • séparateur' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi la France utilise souvent le point-virgule plutôt que la virgule dans les CSV ?',
      },
      {
        label: 'Investigation',
        text: 'Télécharger un jeu open data (data.gouv.fr) en CSV et noter le nombre de lignes et de colonnes.',
      },
    ],
  },
  {
    number: '03',
    title: 'Trier et filtrer',
    subtitle: 'Extraire du sens dans un grand volume',
    content:
      "Avec des milliers de lignes, on ne lit plus à l'œil nu. On trie (ordre) ou on filtre (condition) pour ne garder que ce qui nous intéresse.",
    details: [
      {
        h: 'Comprendre',
        p: 'Trier = réorganiser selon un critère. Filtrer = ne garder que les lignes qui vérifient une condition.',
      },
      {
        h: 'Exemple',
        p: "Sur 500 élèves : filtrer « classe = 2nde A », puis trier par moyenne décroissante.",
      },
      {
        h: 'À retenir',
        p: "Le tableur fait en une seconde ce qu'un humain ferait en une heure.",
      },
      { h: 'Vocabulaire', p: 'critère • condition • tri croissant / décroissant' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Filtrer trop tôt peut-il faire disparaître une information importante ?',
      },
      {
        label: 'Exposé',
        text: 'Montrer un tri et un filtre sur un vrai fichier (notes, open data, export ENT).',
      },
    ],
  },
  {
    number: '04',
    title: 'SQL : interroger une base',
    subtitle: 'SELECT, FROM, WHERE',
    hasLab2: true,
    content:
      'Les pros rangent souvent les données dans des bases relationnelles, interrogées avec SQL. Exemple : SELECT nom FROM eleves WHERE moyenne >= 15.',
    details: [
      {
        h: 'Comprendre',
        p: 'SQL interroge des tables : lignes = enregistrements, colonnes = attributs, souvent reliées par des clés.',
      },
      {
        h: 'Exemple',
        p: 'SELECT nom FROM eleves WHERE moyenne >= 15 renvoie la colonne nom des lignes qui vérifient la condition.',
      },
      {
        h: 'À retenir',
        p: 'SELECT + FROM + WHERE : la trame de presque toutes les requêtes simples — et un classique de Pix.',
      },
      { h: 'Vocabulaire', p: 'table • attribut • enregistrement • requête • clé' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi une base relationnelle est-elle plus robuste qu’un seul gros fichier CSV partagé ?',
      },
      {
        label: 'Investigation',
        text: 'Écrire trois requêtes SQL simples sur une table inventée « films » ou « eleves ».',
      },
    ],
  },
  {
    number: '05',
    title: 'Métadonnées',
    subtitle: 'Les données sur les données',
    content:
      "Une photo n'est pas seulement une image : elle peut contenir date, lieu GPS, modèle d'appareil. Utile pour organiser… et sensible pour la vie privée.",
    details: [
      {
        h: 'Comprendre',
        p: 'Métadonnées = données qui décrivent un document sans en être le contenu principal (EXIF pour les photos).',
      },
      {
        h: 'Exemple',
        p: "L'image est la donnée ; l'heure et le GPS de la prise de vue sont des métadonnées.",
      },
      {
        h: 'À retenir',
        p: 'Précieuses pour classer, dangereuses si elles localisent quelqu’un sans son accord.',
      },
      { h: 'Vocabulaire', p: 'métadonnée • EXIF • géolocalisation' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Faut-il effacer les métadonnées avant de publier une photo en ligne ?',
      },
      {
        label: 'Investigation',
        text: 'Repérer trois métadonnées d’une photo et expliquer ce qu’elles révèlent.',
      },
    ],
  },
  {
    number: '06',
    title: 'Cloud et stockage',
    subtitle: 'Des données chez un hébergeur',
    content:
      "« Dans le cloud » signifie en pratique : stockées sur les serveurs d'un fournisseur, accessibles par Internet, souvent synchronisées entre appareils.",
    details: [
      {
        h: 'Comprendre',
        p: 'Stockage distant, synchronisation, partage. Les données vivent dans des datacenters, pas dans un nuage immatériel.',
      },
      {
        h: 'Exemple',
        p: "Une photo prise sur le téléphone apparaît sur l'ordinateur : les deux appareils consultent la même copie distante.",
      },
      {
        h: 'À retenir',
        p: "Regarder qui héberge et dans quel pays avant d'y confier des données sensibles.",
      },
      { h: 'Vocabulaire', p: 'cloud • synchronisation • hébergeur • datacenter' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Cloud souverain vs grands hébergeurs : pourquoi certains États veulent héberger les données sur leur territoire ?',
      },
      {
        label: 'Exposé',
        text: 'Comparer deux services cloud : pays d’hébergement, RGPD, discours écologique.',
      },
    ],
  },
  {
    number: '07',
    title: 'RGPD',
    subtitle: 'La loi protège les données personnelles',
    content:
      "Le RGPD oblige les organisations à protéger tes données personnelles : finalité, durée, consentement, droit d'accès et droit à l'effacement.",
    details: [
      {
        h: 'Comprendre',
        p: 'Règlement européen (2018) sur les données personnelles : transparence, limitation, droits des personnes.',
      },
      {
        h: 'Exemple',
        p: "Un site doit expliquer quoi, pourquoi et combien de temps — et permettre la suppression de tes données.",
      },
      {
        h: 'À retenir',
        p: "Tes données t'appartiennent. Les manquements peuvent entraîner de lourdes sanctions.",
      },
      { h: 'Vocabulaire', p: "donnée personnelle • consentement • droit à l'effacement" },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Le bouton « Accepter tout » des bannières cookies est-il un vrai choix ?',
      },
      {
        label: 'Investigation',
        text: "Sur cnil.fr, trouver comment exercer un droit d'accès ou de suppression auprès d'un grand service en ligne.",
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
        topic: 'Open Data et villes',
        desc: 'Comment les données publiques améliorent-elles la gestion urbaine (trafic, déchets…) ?',
        externalUrl: 'https://www.data.gouv.fr',
        externalLabel: 'data.gouv.fr',
        livrable:
          'Un jeu de données trouvé + trois phrases : utilité, éditeur, filtre que tu appliquerais.',
        difficulty: 'Exploration',
        duration: '15 min',
      },
      {
        topic: 'Big Data en médecine',
        desc: 'Peut-on prédire des risques de santé grâce aux données et aux algorithmes ?',
        livrable:
          'Deux arguments pour, deux contre, un risque éthique. Restitution orale 2 min.',
        difficulty: 'Investigation',
        duration: '20 min',
      },
      {
        topic: 'Vie privée en ligne',
        desc: 'Vérifier ce que de grands services savent de toi et comment agir.',
        externalUrl: 'https://myaccount.google.com/data-and-privacy',
        externalLabel: 'Google — Données et confidentialité',
        livrable:
          'Trois types de données collectées + une action concrète (téléchargement, suppression, paramètre).',
        difficulty: 'Découverte',
        duration: '15 min',
      },
    ],
    exposes: [
      'Open data : qui gagne quand les villes publient leurs données ?',
      'RGPD à 16 ans : quels droits concrets sur les réseaux sociaux ?',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: 'Répartir les missions. Vérifier le livrable. En 1 h 30, la mission prime : le score de progression reste un indicateur d’avancement, pas l’objectif de la séance.',
      },
    ],
  },
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Que signifie l'acronyme CSV ?",
    options: ['Calcul Simple de Valeurs', 'Comma Separated Values', 'Code de Sécurité Variable'],
    correct: 1,
    explanation: 'Comma Separated Values : valeurs séparées par des virgules (ou points-virgules).',
  },
  {
    q: "Dans un tableau, comment appelle-t-on l'en-tête d'une colonne ?",
    options: ['Un objet', 'Un descripteur', 'Une valeur'],
    correct: 1,
    explanation: 'Le descripteur définit la nature de la colonne (Nom, Âge…).',
  },
  {
    q: "Qu'est-ce qu'une métadonnée ?",
    options: ['Une donnée très lourde', 'Une donnée sur une autre donnée', 'Une donnée fausse'],
    correct: 1,
    explanation: 'Information qui décrit le fichier (date, GPS, appareil…).',
  },
  {
    q: "Où sont physiquement stockées les données du « Cloud » ?",
    options: ["Dans l'espace", 'Dans des datacenters', 'Uniquement sur ton disque dur'],
    correct: 1,
    explanation: 'Des serveurs regroupés dans des datacenters.',
  },
  {
    q: 'Quel règlement protège les données personnelles en Europe ?',
    options: ['Le CNRS', 'Le RGPD', 'Le HTML'],
    correct: 1,
    explanation: 'Règlement général sur la protection des données (2018).',
  },
];

const COMPETENCES = [
  { key: 'struct', label: 'Structure', desc: 'Distinguer donnée, information et format CSV' },
  { key: 'trait', label: 'Traitement', desc: 'Comprendre tri, filtre et requêtes SQL simples' },
  { key: 'meta', label: 'Métadonnées', desc: 'Identifier les enjeux des données cachées' },
  { key: 'droit', label: 'Droits', desc: 'Connaître les principes du RGPD et du cloud' },
];

export default function DonneesChapter() {
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
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
              DONNÉES
            </h1>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Collecter, structurer, interroger… et protéger.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Du fichier CSV aux bases SQL, des métadonnées au RGPD : comprendre ce que deviennent
              nos informations une fois numérisées.
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
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Structurer</div>
              <h3 className="font-black text-xl mb-3">CSV et tables</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Descripteurs, enregistrements, formats d’échange.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Interroger</div>
              <h3 className="font-black text-xl mb-3">Tri, filtre, SQL</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Extraire l’information utile dans un grand volume.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Protéger</div>
              <h3 className="font-black text-xl mb-3">Cloud et RGPD</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Hébergement, métadonnées et droits des personnes.
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
              l’esprit critique.
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Votre parcours</div>
            <h2 className="text-3xl font-black mt-2 mb-10">7 étapes pour comprendre les données</h2>
            <div className="space-y-3">
              {LESSON_STEPS.slice(0, 7).map((item) => (
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
                      En 1 h 30, la mission et son <strong>livrable</strong> sont le cœur de la
                      séance. Le score confirme le parcours des notions.
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
                  <h3 className="font-black text-xl mb-3">Repérer un descripteur</h3>
                  <div className="bg-white border border-cyan-100 rounded-lg p-3 font-mono text-xs mb-4 text-left">
                    Nom, Age, Sport
                    <br />
                    Dupont, 15, Judo
                  </div>
                  <p className="text-sm text-slate-600 mb-6">Lequel est le descripteur ?</p>
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
                  <h3 className="font-black text-xl mb-3">Lire une requête SQL</h3>
                  <div className="bg-white border border-orange-100 rounded-lg p-3 font-mono text-xs mb-4 text-left">
                    SELECT nom FROM eleves
                    <br />
                    WHERE classe = &apos;2ndeA&apos;;
                  </div>
                  <p className="text-sm text-slate-600 mb-6">Que renvoie cette requête ?</p>
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
              {modeSession === '1h' && 'Exploration : détails, débats et investigations guidées.'}
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