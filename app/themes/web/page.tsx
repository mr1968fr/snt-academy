'use client';

import { useState } from 'react';
import Link from 'next/link';

/* =========================================================
TYPES
========================================================= */

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

/* =========================================================
LABS — points liés à un effort cognitif
========================================================= */

const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LAB1_OPTIONS = ['Client', 'Serveur'];
const LAB1_CORRECT = 'Client';
const LAB1_FEEDBACK =
  'Ton navigateur demande une page : c’est le client. Le serveur stocke et renvoie la page.';

const LAB2_OPTIONS = ['Un protocole', 'Un nom de domaine'];
const LAB2_CORRECT = 'Un nom de domaine';
const LAB2_FEEDBACK =
  'www.google.fr est un nom de domaine. Le protocole serait https:// (ou http://).';

/* =========================================================
CONTENU
========================================================= */

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: 'Web ≠ Internet',
    subtitle: 'Deux notions souvent confondues',
    content:
      "Internet est le réseau de câbles et de protocoles. Le Web est un service qui tourne dessus, comme le courrier électronique. Le Web n'est né qu'en 1989.",
    details: [
      {
        h: 'Comprendre',
        p: "Internet est le réseau des réseaux, autour de TCP/IP. Le Web n'est qu'un service : des pages reliées par des liens, transportées par HTTP. D'autres services existent : e-mail, visioconférence, jeux en ligne, pair-à-pair.",
      },
      {
        h: 'Exemple',
        p: "Tu peux envoyer un e-mail ou visiochater sans utiliser le Web : ces services circulent sur Internet sans être le Web.",
      },
      {
        h: 'À retenir',
        p: "Le Web vit sur Internet, comme la poste roule sur les routes. Confondre les deux est l'erreur classique.",
      },
      {
        h: 'Vocabulaire',
        p: 'réseau • service • HTTP • lien hypertexte',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi tant de gens disent « Internet » en parlant seulement du Web ? Quelles conséquences pour la compréhension du numérique ?',
      },
      {
        label: 'Investigation',
        text: "Lister quatre services d'Internet qui ne sont pas le Web (mail, FTP, streaming, DNS…).",
      },
    ],
  },
  {
    number: '02',
    title: 'Le CERN et Tim Berners-Lee',
    subtitle: 'Naissance du Web',
    content:
      'Le Web a été inventé à Genève pour aider les scientifiques à partager des documents via des liens hypertexte. C’est la naissance du HTML, d’HTTP et des URL.',
    details: [
      {
        h: 'Comprendre',
        p: 'En 1989, au CERN, Tim Berners-Lee propose trois briques : HTML pour écrire les pages, HTTP pour les transporter, URL pour les adresser. L’ensemble est offert au domaine public en 1993.',
      },
      {
        h: 'Exemple',
        p: 'Le premier site web (info.cern.ch) expliquait simplement… ce qu’est le Web.',
      },
      {
        h: 'À retenir',
        p: 'Personne ne possède le Web : ni entreprise, ni État. C’est un principe fondateur.',
      },
      {
        h: 'Vocabulaire',
        p: 'HTML • HTTP • URL • domaine public',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Et si le Web avait été breveté et vendu ? Internet serait-il le même aujourd’hui ?',
      },
      {
        label: 'Investigation',
        text: 'Visiter info.cern.ch et noter trois informations historiques sur la première page web.',
      },
    ],
  },
  {
    number: '03',
    title: 'Client et serveur',
    subtitle: 'L’architecture du Web',
    hasLab: true,
    content:
      'Ton navigateur est le client. Il demande une page au serveur. L’échange se fait en langage HTTP.',
    details: [
      {
        h: 'Comprendre',
        p: 'Le client (navigateur) envoie une requête ; le serveur répond en envoyant la page. C’est toujours le client qui initie l’échange.',
      },
      {
        h: 'Exemple',
        p: 'Taper une URL, c’est envoyer une requête HTTP GET ; le serveur renvoie le fichier HTML et le navigateur l’affiche.',
      },
      {
        h: 'À retenir',
        p: 'Ton navigateur est un client, pas un serveur : il ne répond pas aux requêtes du monde entier.',
      },
      {
        h: 'Vocabulaire',
        p: 'requête • réponse • navigateur • hébergeur',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Peut-on être client et serveur en même temps ? (pair-à-pair, hébergement local)',
      },
      {
        label: 'Exposé',
        text: 'Schéma client ↔ serveur avec une requête GET et une réponse HTML en quatre étapes.',
      },
    ],
  },
  {
    number: '04',
    title: 'L’URL décortiquée',
    subtitle: 'Protocole, domaine, chemin',
    hasLab2: true,
    content:
      'HTTPS (protocole) + nom de domaine + chemin. Chaque page du monde a une adresse unique.',
    details: [
      {
        h: 'Comprendre',
        p: 'Une URL se lit en trois morceaux : protocole (https://), nom de domaine (le serveur), chemin (la ressource demandée).',
      },
      {
        h: 'Exemple',
        p: 'Comme une adresse postale : le protocole est le mode de transport, le domaine la ville, le chemin la rue et le numéro.',
      },
      {
        h: 'À retenir',
        p: 'Le S de HTTPS signifie chiffré. Ne jamais saisir de mot de passe sur un site en http simple.',
      },
      {
        h: 'Vocabulaire',
        p: 'URL • protocole • nom de domaine • chemin • chiffrement',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi certains sites restent en HTTP ? Quels risques pour l’utilisateur ?',
      },
      {
        label: 'Investigation',
        text: 'Découper trois URL réelles en protocole / domaine / chemin et les présenter en tableau.',
      },
    ],
  },
  {
    number: '05',
    title: 'Moteurs de recherche',
    subtitle: 'Index, crawlers et PageRank',
    content:
      'Un moteur ne fouille pas le web en direct : des robots construisent un index. Le classement compte souvent les liens comme des votes.',
    details: [
      {
        h: 'Comprendre',
        p: 'Des crawlers parcourent le web en suivant les liens et construisent un index. Ta requête interroge cet index ; le classement (ex. PageRank) valorise les pages citées par d’autres.',
      },
      {
        h: 'Exemple',
        p: 'Une page citée par de nombreux sites peut apparaître devant une page plus ancienne mais peu relinkée.',
      },
      {
        h: 'À faire',
        p: 'Chercher la même requête sur deux moteurs et comparer les cinq premiers résultats.',
      },
      {
        h: 'À retenir',
        p: 'Moteur ≠ navigateur ≠ page d’accueil. Le référencement naturel est distinct de la publicité payante.',
      },
      {
        h: 'Vocabulaire',
        p: 'crawler • index • PageRank • référencement',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Le PageRank favorise-t-il les gros sites déjà connus au détriment des nouveaux ?',
      },
      {
        label: 'Investigation',
        text: 'Comparer Google, DuckDuckGo et Qwant sur une même requête : trois différences de résultats.',
      },
    ],
  },
  {
    number: '06',
    title: 'Cookies et tracking',
    subtitle: 'Mémoire du navigateur et vie privée',
    content:
      'Les cookies permettent à un site de se souvenir de toi. Utile pour une session ou un panier ; problématique quand ils servent au suivi publicitaire.',
    details: [
      {
        h: 'Comprendre',
        p: 'Un cookie est un petit fichier déposé dans le navigateur : session, préférences… ou suivi de site en site (cookies tiers).',
      },
      {
        h: 'Exemple',
        p: 'Un produit regardé un soir peut réapparaître en publicité le lendemain : un traceur t’a reconnu.',
      },
      {
        h: 'À retenir',
        p: 'Depuis le RGPD, le consentement est obligatoire. Refuser les cookies non essentiels reste possible.',
      },
      {
        h: 'Vocabulaire',
        p: 'cookie • cookie tiers • traceur • consentement',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Le design des bannières « Accepter tout » est-il vraiment neutre ?',
      },
      {
        label: 'Exposé',
        text: 'Montrer dans les réglages du navigateur où se gèrent les cookies et proposer trois bons réglages pour un lycéen.',
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
        topic: 'Deep Web et Dark Web',
        desc: 'Fantasmes et réalité : que contient réellement le web non indexé ?',
        livrable:
          'Définition Deep Web vs Dark Web (deux phrases chacune) + deux usages légitimes + un risque. Restitution orale 2 min.',
        difficulty: 'Investigation',
        duration: '20 min',
      },
      {
        topic: 'Histoire des navigateurs',
        desc: 'De Netscape à Chrome : pourquoi certains ont gagné la « guerre des navigateurs » ?',
        externalUrl: 'https://home.cern/science/computing/birth-web',
        externalLabel: 'CERN — Birth of the Web',
        livrable: 'Frise de quatre dates clés + une raison du succès d’un navigateur majeur.',
        difficulty: 'Découverte',
        duration: '15 min',
      },
      {
        topic: 'Accessibilité numérique',
        desc: 'Comment le Web s’adapte-t-il aux personnes malvoyantes ou en situation de handicap ?',
        livrable:
          'Trois bonnes pratiques (texte alternatif, contrastes, navigation clavier…) + un outil de test simple.',
        difficulty: 'Exploration',
        duration: '15 min',
      },
    ],
    exposes: [
      'HTTPS partout : pourquoi le cadenas est devenu la norme.',
      'Moteur ≠ navigateur : démystifier la confusion la plus fréquente en SNT.',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: 'Répartir les missions. Vérifier le livrable. En 1 h 30, la mission prime : le score de progression reste un indicateur d’avancement, pas l’objectif de la séance. Option : comparer deux moteurs en direct.',
      },
    ],
  },
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: 'Qui a inventé le Web ?',
    options: ['Bill Gates', 'Tim Berners-Lee', 'Steve Jobs'],
    correct: 1,
    explanation: 'Tim Berners-Lee au CERN en 1989.',
  },
  {
    q: "Que signifie le « S » dans HTTPS ?",
    options: ['Simple', 'Secure', 'Speed'],
    correct: 1,
    explanation: 'Secure : le protocole est sécurisé (chiffré).',
  },
  {
    q: 'Lequel est un navigateur ?',
    options: ['Google', 'Firefox', 'Instagram'],
    correct: 1,
    explanation: 'Firefox affiche les pages web. Google est un moteur de recherche.',
  },
  {
    q: 'Quand tu lances une recherche, un moteur fouille…',
    options: [
      'Tout le web en direct',
      'Son index, construit à l’avance par des robots',
      'Uniquement les sites payants',
    ],
    correct: 1,
    explanation: 'Les crawlers construisent un index ; la recherche interroge cette bibliothèque.',
  },
  {
    q: 'Comment une page peut-elle remonter dans les résultats naturels ?',
    options: [
      'Uniquement en payant le moteur',
      'En recevant beaucoup de liens pointant vers elle',
      'Parce qu’elle est la plus ancienne',
    ],
    correct: 1,
    explanation: 'Idée du PageRank : chaque lien compte comme un « vote ».',
  },
];

const COMPETENCES = [
  {
    key: 'web-net',
    label: 'Concepts',
    desc: 'Distinguer Web et Internet',
  },
  {
    key: 'archi',
    label: 'Architecture',
    desc: 'Comprendre le modèle client-serveur',
  },
  {
    key: 'url',
    label: 'Adressage',
    desc: 'Lire une URL (protocole, domaine, chemin)',
  },
  {
    key: 'moteur',
    label: 'Recherche',
    desc: 'Comprendre index, crawlers et référencement',
  },
];

export default function WebChapter() {
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
            <div className="text-sm font-black tracking-tight">EXPLORER LE NUMÉRIQUE</div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {(mode === 'cours' || mode === 'quiz' || mode === 'resultat') && (
              <div
                className="hidden sm:flex flex-col items-end leading-none"
                title="Score de progression : expériences + questionnaire"
              >
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

      {mode === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Parcours SNT
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
              LE WEB
            </h1>

            <div className="w-20 h-1 bg-cyan-500 mb-8" />

            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Le Web n’est pas Internet. C’est un service né en 1989 pour relier des documents
              entre eux.
            </p>

            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Pages, URL, navigateurs, moteurs de recherche, cookies : comprendre ce qui se
              passe entre ton écran et un serveur distant.
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
                Distinguer
              </div>
              <h3 className="font-black text-xl mb-3">Web et Internet</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Clarifier une confusion fréquente et situer le Web parmi les services du
                réseau.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Comprendre
              </div>
              <h3 className="font-black text-xl mb-3">Client, serveur, URL</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Suivre le trajet d’une requête jusqu’à l’affichage d’une page.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Questionner
              </div>
              <h3 className="font-black text-xl mb-3">Moteurs et cookies</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Index, ranking et traces : ce que le Web retient de nous.
              </p>
            </div>
          </section>

          <section className="mt-16 border border-amber-200 bg-amber-50/80 rounded-2xl p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3">
              Pour le professeur — outil de pilotage
            </div>
            <p className="text-sm text-amber-950 leading-relaxed max-w-3xl">
              Le <strong>score de progression</strong> (en haut de page) permet de vérifier
              d&apos;un coup d&apos;œil l&apos;avancement : expériences validées +
              questionnaire. En parcours <strong>1 h 30</strong>, la mission finale et le
              livrable restent le cœur de l&apos;évaluation des compétences de recherche.
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
              Votre parcours
            </div>
            <h2 className="text-3xl font-black mt-2 mb-10">6 étapes pour comprendre le Web</h2>
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
                      En parcours 1 h 30, cette mission et son <strong>livrable</strong> sont
                      le moment central. Le score de progression confirme le parcours des
                      notions ; la qualité du livrable valide la recherche.
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

                  {isLong &&
                    current.deep?.find((d) => d.label.includes('professeur')) && (
                      <div className="mt-8 border border-amber-200 bg-amber-50 rounded-2xl p-6">
                        <div className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">
                          Note professeur — mode {modeSession}
                        </div>
                        <p className="text-sm text-amber-950 leading-relaxed">
                          {
                            current.deep.find((d) => d.label.includes('professeur'))
                              ?.text
                          }
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
                  <h3 className="font-black text-xl mb-3">Client ou serveur ?</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    « Ton navigateur demande une page » — quel rôle joue-t-il ?
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
                <section className="mt-10 bg-orange-50 border border-orange-100 rounded-2xl p-7">
                  <div className="text-xs uppercase tracking-widest font-bold text-orange-700 mb-3">
                    Expérience rapide
                  </div>
                  <h3 className="font-black text-xl mb-3">Lire une URL</h3>
                  <p className="text-sm text-slate-600 mb-6">« www.google.fr » est :</p>
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
                'Essentiel : idées fondamentales et expériences courtes.'}
              {modeSession === '1h' &&
                'Exploration : notions détaillées et questions d’approfondissement.'}
              {modeSession === '1h30' &&
                'Investigation : parcours complet, puis mission finale et livrable.'}
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
            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-10">
              {question.q}
            </h2>
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

      {mode === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20">
          <section className="bg-white border border-slate-200 rounded-3xl p-10 md:p-16 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 mb-6">
              Parcours terminé
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Bilan de compétences</h1>
            <p className="text-slate-500 mb-10 max-w-xl leading-relaxed">
              Synthèse des notions travaillées. Le score de progression indique l’avancement ;
              les compétences structurent ce qui a été abordé.
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
                  {progressionScore}{' '}
                  <span className="text-base font-bold text-slate-400">pts</span>
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

            <div className="mt-6 text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto text-center">
              Pour le professeur : le score indique l’avancement ; le livrable de la mission
              (1 h / 1 h 30) valide la recherche et l’esprit critique.
            </div>

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