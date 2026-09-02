'use client';

import { useState } from 'react';
import Link from 'next/link';

/* =========================================================
TYPES
========================================================= */

type ModeSession = '20min' | '1h' | '1h30';

type Detail = {
  h: string;
  p: string;
};

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
  deep?: {
    label: string;
    text: string;
  }[];
};

type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

/* =========================================================
LABORATOIRES — points liés à un effort cognitif (pas du pure jeu)
========================================================= */

const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LAB1_OPTIONS = ['8.8.8.8', 'google.fr'];
const LAB1_CORRECT = 'google.fr';
const LAB1_FEEDBACK =
  "google.fr est un nom de domaine. 8.8.8.8 est une adresse IP : celle d'un serveur DNS.";

const LAB2_OPTIONS = ["Ils s'arrêtent", 'Ils changent de route'];
const LAB2_CORRECT = 'Ils changent de route';
const LAB2_FEEDBACK =
  "Les routeurs peuvent calculer une autre route. C'est l'une des raisons pour lesquelles Internet peut continuer à fonctionner malgré certaines pannes.";

/* =========================================================
CONTENU DU PARCOURS
========================================================= */

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "Le Cloud n'existe pas",
    subtitle: "L'infrastructure physique d'Internet",
    content:
      "Internet n'est pas un nuage. Derrière chaque message, chaque vidéo et chaque photo se trouve une infrastructure physique gigantesque : câbles, fibres optiques, serveurs et datacenters.",
    details: [
      {
        h: 'Comprendre',
        p: "Internet est l'interconnexion de millions de réseaux à l'échelle mondiale. Son infrastructure repose principalement sur des fibres optiques, dont de nombreux câbles sous-marins qui relient les continents.",
      },
      {
        h: 'Observer',
        p: "Lorsqu'une donnée doit traverser l'Atlantique, elle peut circuler dans un câble posé au fond de l'océan. Ces câbles constituent l'une des infrastructures essentielles de la société numérique.",
      },
      {
        h: 'À retenir',
        p: "Le terme « Cloud » peut donner l'impression que les données sont immatérielles. En réalité, elles sont stockées et traitées dans des machines bien réelles, regroupées dans des datacenters.",
      },
      {
        h: 'Vocabulaire',
        p: 'fibre optique • câble sous-marin • datacenter • débit',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Où sont réellement stockées vos données ? Dans quels pays ? Qui possède les grandes infrastructures qui permettent à Internet de fonctionner ?',
      },
      {
        label: 'Investigation',
        text: 'Ouvrez une carte des câbles sous-marins et identifiez les infrastructures permettant de relier la France aux États-Unis.',
      },
    ],
  },
  {
    number: '02',
    title: 'Identifier une machine',
    subtitle: 'Adresse IP et système DNS',
    hasLab: true,
    content:
      "Pour communiquer, les machines doivent pouvoir s'identifier. L'adresse IP joue ce rôle. Le DNS permet ensuite de traduire les noms que nous utilisons en adresses compréhensibles par les machines.",
    details: [
      {
        h: 'Comprendre',
        p: "Chaque machine connectée à Internet possède une adresse IP. Cette adresse permet de l'identifier sur le réseau.",
      },
      {
        h: 'Le rôle du DNS',
        p: "Le DNS, Domain Name System, fonctionne comme un annuaire. Il associe un nom de domaine compréhensible par l'utilisateur à une adresse IP utilisable par les machines.",
      },
      {
        h: 'Exemple',
        p: "Lorsque vous tapez www.google.fr, votre ordinateur interroge un serveur DNS afin d'obtenir l'adresse IP correspondant à ce nom.",
      },
      {
        h: 'À retenir',
        p: "L'utilisateur retient des noms comme google.fr. Les machines, elles, communiquent grâce aux adresses IP.",
      },
      {
        h: 'Vocabulaire',
        p: 'adresse IP • nom de domaine • DNS • résolution • IPv4 • IPv6',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: "Pourquoi le nombre d'adresses IPv4 disponibles est-il limité ? Pourquoi Internet doit-il progressivement utiliser IPv6 ?",
      },
      {
        label: 'Investigation',
        text: "Recherchez combien d'adresses différentes IPv6 permet théoriquement de créer et expliquez pourquoi ce nombre est extrêmement supérieur à celui d'IPv4.",
      },
    ],
  },
  {
    number: '03',
    title: "Faire circuler l'information",
    subtitle: 'Paquets, routeurs et pair-à-pair',
    content:
      "Les informations qui circulent sur Internet sont découpées en paquets. Ces paquets traversent différents routeurs qui choisissent les chemins disponibles pour atteindre leur destination.",
    details: [
      {
        h: 'Comprendre',
        p: "Un message n'est généralement pas envoyé d'un seul bloc. Il est découpé en petits paquets capables de circuler indépendamment sur le réseau.",
      },
      {
        h: 'Le rôle des routeurs',
        p: "Les routeurs analysent les informations nécessaires à l'acheminement et choisissent une route permettant aux paquets de poursuivre leur trajet.",
      },
      {
        h: 'Exemple',
        p: "Une photographie peut être découpée en un grand nombre de paquets. Ces paquets peuvent emprunter différents chemins avant d'être reconstitués à destination.",
      },
      {
        h: 'À retenir',
        p: "L'organisation en réseau permet d'éviter qu'une panne locale bloque nécessairement l'ensemble des communications.",
      },
      {
        h: 'Le pair-à-pair',
        p: 'Dans un réseau pair-à-pair, chaque participant peut jouer simultanément le rôle de client et de serveur.',
      },
      {
        h: 'Vocabulaire',
        p: 'paquet • routeur • routage • commutation de paquets • pair-à-pair',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: "Un réseau pair-à-pair présente-t-il davantage d'avantages ou de risques qu'une organisation reposant sur un serveur central ?",
      },
      {
        label: 'Exposé',
        text: 'Préparez une courte présentation expliquant comment le pair-à-pair modifie la répartition des données et des responsabilités entre utilisateurs.',
      },
    ],
  },
  {
    number: '04',
    title: 'Les règles de communication',
    subtitle: 'Comprendre les protocoles TCP/IP',
    content:
      'Pour que des machines très différentes puissent communiquer, elles doivent respecter des règles communes : les protocoles. TCP et IP constituent une partie essentielle de ces règles.',
    details: [
      {
        h: 'Comprendre',
        p: 'Un protocole définit un ensemble de règles permettant à des machines de communiquer.',
      },
      {
        h: 'IP',
        p: "Le protocole IP participe à l'adressage et à l'acheminement des paquets sur le réseau.",
      },
      {
        h: 'TCP',
        p: "TCP permet notamment de vérifier que les données nécessaires sont bien arrivées et de gérer leur ordre.",
      },
      {
        h: 'Une analogie',
        p: "Imaginez un livre dont les pages seraient envoyées séparément. TCP aide à vérifier qu'elles sont toutes présentes et à les remettre dans le bon ordre.",
      },
      {
        h: 'À retenir',
        p: 'Les protocoles permettent à des machines de marques et de systèmes différents de communiquer entre elles.',
      },
      {
        h: 'Vocabulaire',
        p: 'protocole • TCP • IP • paquet • accusé de réception',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: "Pourquoi est-il important que les protocoles fondamentaux d'Internet soient communs à l'ensemble des réseaux ?",
      },
      {
        label: 'Investigation',
        text: "Comparez le fonctionnement de TCP à celui d'un envoi postal avec accusé de réception.",
      },
    ],
  },
  {
    number: '05',
    title: 'Observer Internet en action',
    subtitle: "Tracer le trajet d'une information",
    hasLab2: true,
    content:
      "Il est possible d'observer une partie du trajet suivi par les paquets grâce à des outils comme traceroute ou tracert.",
    details: [
      {
        h: "L'outil",
        p: "La commande traceroute, appelée tracert sous Windows, permet d'afficher une succession de routeurs traversés lors de la communication avec une destination.",
      },
      {
        h: 'Expérience',
        p: 'Sur Mac ou Linux, ouvrez le Terminal et utilisez : traceroute www.google.fr. Sous Windows, utilisez la commande tracert.',
      },
      {
        h: 'Observer',
        p: "Chaque ligne correspond généralement à une étape du trajet. On peut notamment observer le nombre de sauts et le temps nécessaire pour atteindre différents équipements.",
      },
      {
        h: 'À retenir',
        p: "La route suivie par les données n'est pas nécessairement fixe. Elle peut évoluer selon l'état du réseau.",
      },
      {
        h: 'Vocabulaire',
        p: 'traceroute • saut • latence • routeur',
      },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: "Que peut-il se passer lorsqu'une infrastructure importante du réseau devient indisponible ? Pourquoi les routes alternatives peuvent-elles être plus longues ?",
      },
      {
        label: 'Investigation',
        text: 'Réalisez plusieurs traceroute vers différentes destinations et comparez le nombre de sauts et les temps observés.',
      },
    ],
  },
  {
    number: 'MISSION',
    title: 'Investigation finale',
    subtitle: 'Mettre vos connaissances en pratique',
    isProject: true,
    intro:
      'Choisissez une mission. Travaillez seul ou en binôme. Votre objectif : produire un résultat clair que vous pourrez présenter.',
    projects: [
      {
        topic: 'Les câbles sous-marins',
        desc: 'Identifiez une infrastructure reliant la France à un autre continent.',
        externalUrl: 'https://www.submarinecablemap.com',
        externalLabel: 'Explorer la carte mondiale des câbles',
        livrable:
          "Nom du câble, longueur, date de mise en service, territoires reliés et analyse des conséquences possibles d'une coupure.",
        difficulty: 'Découverte',
        duration: '15 min',
      },
      {
        topic: 'Suivre une route',
        desc: 'Comparez le trajet vers une destination proche et vers une destination située dans une autre région du monde.',
        livrable:
          'Nombre de sauts, temps maximum observé, éléments géographiques identifiables et explication de vos observations.',
        difficulty: 'Exploration',
        duration: '15 min',
      },
      {
        topic: 'La neutralité du Net',
        desc: "Un fournisseur d'accès doit-il pouvoir privilégier certains services ou ralentir certains contenus ?",
        livrable:
          'Deux arguments en faveur, deux arguments contre et une courte restitution orale.',
        difficulty: 'Investigation',
        duration: '20 min',
      },
    ],
    exposes: [
      'Pourquoi les câbles sous-marins constituent-ils un enjeu géopolitique majeur ?',
      "Quel est l'impact environnemental des infrastructures numériques ?",
      'Internet appartient-il réellement à tout le monde ?',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: "Répartir les missions entre les groupes. Prévoir une courte phase de recherche suivie d'une restitution. Le livrable permet de vérifier que les élèves ont réellement exploité les notions du parcours. En 1h30, la mission finale prime : le score de progression reste un indicateur d'avancement, pas l'objectif de la séance.",
      },
    ],
  },
];

/* =========================================================
QUIZ
========================================================= */

const QUIZ_QUESTIONS: Question[] = [
  {
    q: 'Par quelle infrastructure passe principalement le trafic Internet entre les continents ?',
    options: [
      'Par des câbles sous-marins',
      'Principalement par satellite',
      'Par les réseaux Wi-Fi',
    ],
    correct: 0,
    explanation:
      'Les câbles sous-marins en fibre optique constituent une infrastructure essentielle des communications intercontinentales.',
  },
  {
    q: 'Que signifie DNS ?',
    options: ['Data Network System', 'Domain Name System', 'Digital Node Service'],
    correct: 1,
    explanation:
      "Le DNS est le système qui permet notamment d'associer un nom de domaine à une adresse IP.",
  },
  {
    q: "Quel est le rôle principal d'une adresse IP ?",
    options: [
      "Décorer l'interface d'un site web",
      'Identifier une machine sur un réseau',
      'Remplacer un câble réseau',
    ],
    correct: 1,
    explanation: "Une adresse IP permet d'identifier une machine connectée à un réseau.",
  },
  {
    q: 'Quel est le rôle des routeurs ?',
    options: [
      'Acheminer les paquets sur le réseau',
      'Créer les sites web',
      'Fabriquer les ordinateurs',
    ],
    correct: 0,
    explanation:
      "Les routeurs participent à l'acheminement des paquets entre différents réseaux.",
  },
  {
    q: 'Quel protocole permet notamment de gérer la bonne réception des données ?',
    options: ['TCP', 'HTML', 'JPEG'],
    correct: 0,
    explanation:
      'TCP participe au contrôle de la transmission et à la gestion des données reçues.',
  },
];

/* Compétences validées (écran final = certificat, pas un « grade jeu ») */
const COMPETENCES = [
  {
    key: 'infra',
    label: 'Infrastructure',
    desc: "Comprendre le caractère physique d'Internet",
  },
  {
    key: 'ip',
    label: 'Adressage',
    desc: 'Identifier le rôle des adresses IP et du DNS',
  },
  {
    key: 'routage',
    label: 'Routage',
    desc: 'Comprendre le déplacement des paquets',
  },
  {
    key: 'proto',
    label: 'Protocoles',
    desc: 'Comprendre pourquoi les machines peuvent communiquer',
  },
];

/* =========================================================
COMPOSANT PRINCIPAL
========================================================= */

export default function InternetChapter() {
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

  /** Score de progression = quiz + labs (effort cognitif validé) */
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
    if (answer === null) {
      return 'bg-white border-slate-300 hover:border-cyan-500 hover:bg-cyan-50';
    }
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
      {/* NAV — score discret = outil de pilotage pour le prof */}
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
            {/* Indicateur d'avancement (lisible en passant dans les rangs) */}
            {(mode === 'cours' || mode === 'quiz' || mode === 'resultat') && (
              <div
                className="hidden sm:flex flex-col items-end leading-none"
                title="Score de progression : labs + questionnaire. Indicateur d'avancement pour le professeur."
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

      {/* ===================================================
          ACCUEIL
          =================================================== */}
      {mode === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Parcours SNT
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
              INTERNET
            </h1>

            <div className="w-20 h-1 bg-cyan-500 mb-8" />

            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Que se passe-t-il réellement lorsque vous envoyez un message à l&apos;autre bout du
              monde ?
            </p>

            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              Vos données ne disparaissent pas dans un nuage. Elles circulent à travers des
              machines, des câbles, des routeurs et des infrastructures réparties sur toute la
              planète.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={startCourse}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg"
              >
                Commencer l&apos;exploration →
              </button>

              <div className="px-6 py-4 border border-slate-200 rounded-xl bg-white text-sm text-slate-500">
                Durée sélectionnée :{' '}
                <strong className="text-slate-900">{modeSession}</strong>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-5 mt-24">
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Comprendre
              </div>
              <h3 className="font-black text-xl mb-3">Comment Internet fonctionne</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Découvrir les infrastructures physiques qui permettent aux données de circuler.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Observer
              </div>
              <h3 className="font-black text-xl mb-3">Suivre une information</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Comprendre comment les machines trouvent leur destination et choisissent leur
                route.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">
                Manipuler
              </div>
              <h3 className="font-black text-xl mb-3">Expérimenter</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Utiliser de véritables outils pour observer le fonctionnement du réseau.
              </p>
            </div>
          </section>

          {/* Encadré prof : institutionnaliser la progression (pas « un jeu ») */}
          <section className="mt-16 border border-amber-200 bg-amber-50/80 rounded-2xl p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3">
              Pour le professeur — outil de pilotage
            </div>
            <p className="text-sm text-amber-950 leading-relaxed max-w-3xl">
              Le <strong>score de progression</strong> (affiché discrètement en haut de page)
              permet de vérifier d&apos;un coup d&apos;œil l&apos;avancement de chaque élève en
              salle informatique : expériences validées + questionnaire. En parcours{' '}
              <strong>1 h 30</strong>, la mission finale et le livrable restent le cœur de
              l&apos;évaluation des compétences de recherche et d&apos;esprit critique.
            </p>
          </section>

          <section className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                  Votre parcours
                </div>
                <h2 className="text-3xl font-black mt-2">
                  5 étapes pour comprendre Internet
                </h2>
              </div>
            </div>

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

      {/* ===================================================
          COURS
          =================================================== */}
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
                style={{
                  width: `${((step + 1) / LESSON_STEPS.length) * 100}%`,
                }}
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
                      En parcours 1 h 30, cette mission et son <strong>livrable</strong> sont le
                      moment central de la séance. Le score de progression confirme que les
                      notions ont été parcourues ; la qualité du livrable valide la recherche et
                      l&apos;argumentation.
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
                  <h3 className="font-black text-xl mb-3">Identifier un nom de domaine</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Parmi les deux propositions suivantes, laquelle correspond à un nom de
                    domaine ?
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
                  <h3 className="font-black text-xl mb-3">Comprendre le routage</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Si un équipement important du réseau devient indisponible, que peut-il
                    arriver aux paquets ?
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
                'Essentiel : découverte des idées fondamentales et activités courtes.'}
              {modeSession === '1h' &&
                'Exploration : notions détaillées, expériences et questions pour approfondir.'}
              {modeSession === '1h30' &&
                'Investigation : parcours complet, puis mission finale et livrable (cœur de la séance).'}
            </p>
          </div>
        </main>
      )}

      {/* ===================================================
          QUIZ
          =================================================== */}
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

      {/* ===================================================
          RESULTAT — certificat de compétences (pas un grade jeu)
          =================================================== */}
      {mode === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20">
          <section className="bg-white border border-slate-200 rounded-3xl p-10 md:p-16 shadow-sm">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 mb-6">
              Parcours terminé
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">Bilan de compétences</h1>
            <p className="text-slate-500 mb-10 max-w-xl leading-relaxed">
              Ce bilan synthétise les notions travaillées. Le score de progression sert
              d&apos;indicateur d&apos;avancement ; les compétences ci-dessous structurent ce
              qui a été abordé dans le parcours.
            </p>

            {/* Score discret, pas un trophée géant */}
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
                <div
                  key={c.key}
                  className="border border-slate-200 rounded-xl p-6 bg-slate-50/50"
                >
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
              Pour le professeur : le score de progression indique l&apos;avancement en séance ;
              le livrable de la mission (parcours 1 h / 1 h 30) valide la recherche et
              l&apos;esprit critique.
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