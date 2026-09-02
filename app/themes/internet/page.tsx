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
  /** Lien externe optionnel (ex. Submarine Cable Map) */
  externalUrl?: string;
  externalLabel?: string;
};
type Step = {
  title: string;
  icon: string;
  color: string;
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

/* ---------- Labs (interactifs + XP) ---------- */
const LAB_XP = 150;
const LAB1_OPTIONS = ['8.8.8.8', 'google.fr'];
const LAB1_CORRECT = 'google.fr';
const LAB1_FEEDBACK =
  "google.fr est un nom de domaine ; 8.8.8.8 est une adresse IP (celle d'un serveur DNS de Google).";
const LAB2_OPTIONS = ["Ils s'arrêtent", 'Ils changent de route'];
const LAB2_CORRECT = 'Ils changent de route';
const LAB2_FEEDBACK =
  "Les routeurs recalculent une autre route en temps réel : c'est ce qui rend Internet résistant aux pannes.";

/* ---------- Cours ---------- */
const LESSON_STEPS: Step[] = [
  {
    title: "1. Le Cloud n'existe pas",
    icon: '🔌',
    color: 'border-blue-500',
    content:
      "Internet est ultra-physique. 99 % du trafic intercontinental passe par des câbles sous-marins en fibre optique. Si tu envoies un Snap aux USA, l'info traverse l'océan à la vitesse de la lumière sous 4 000 m d'eau.",
    details: [
      {
        h: 'Définition',
        p: "Internet est l'interconnexion de millions de réseaux à l'échelle planétaire. Son support principal : la fibre optique, dont des câbles sous-marins posés au fond des océans — plus de 500 câbles, pour environ 1,4 million de km de fibre.",
      },
      {
        h: 'Exemple',
        p: "La photo envoyée à un service hébergé aux États-Unis traverse l'Atlantique dans un câble de quelques centimètres d'épaisseur, par plus de 4 000 m de profondeur, en quelques millisecondes.",
      },
      {
        h: 'À retenir',
        p: "Le « nuage » est un argument marketing : tes données vivent dans des machines bien réelles, rangées dans des entrepôts climatisés appelés datacenters.",
      },
      { h: 'Vocabulaire', p: 'fibre optique, datacenter, débit.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: "Le 'Cloud' est un argument marketing. Où sont vraiment tes données ? Dans quels pays ? Qui possède ces câbles ?",
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Ouvre la carte des câbles sous-marins et identifie 3 pays par lesquels passe un message France-USA.',
      },
    ],
  },
  {
    title: '2. Adresse IP & DNS',
    icon: '🆔',
    color: 'border-indigo-500',
    hasLab: true,
    content:
      "Chaque machine a une adresse unique : l'adresse IP. Le DNS est l'annuaire qui traduit « google.fr » en une suite de chiffres : l'adresse IP. C'est le répertoire de ton téléphone, mais pour la planète entière.",
    details: [
      {
        h: 'Définition',
        p: "Chaque machine connectée possède une adresse IP : son identifiant sur le réseau (ex. 172.217.18.195 en IPv4). Le DNS (Domain Name System) est l'annuaire mondial qui traduit un nom de domaine en adresse IP.",
      },
      {
        h: 'Exemple',
        p: "Tu tapes www.google.fr : ta machine demande à un serveur DNS « quelle est l'IP de ce nom ? », reçoit la réponse en quelques millisecondes, et seulement ensuite contacte le serveur Google.",
      },
      {
        h: 'À retenir',
        p: "Sans DNS, il faudrait mémoriser des suites de chiffres. Et face à la pénurie d'adresses IPv4, l'IPv6 (adresses bien plus longues) prend peu à peu le relais.",
      },
      { h: 'Vocabulaire', p: 'adresse IP, nom de domaine, résolution, IPv4 / IPv6.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: "Pourquoi la pénurie d'IPv4 impose l'IPv6 ? Pourquoi certains pays veulent contrôler leur DNS national ?",
      },
      {
        label: 'Recherche élève (1h30)',
        text: "Trouver le nombre d'adresses IPv6 possibles et expliquer en 3 lignes pourquoi c'est 'infini'.",
      },
    ],
  },
  {
    title: '3. Le Routage & le P2P',
    icon: '🛣️',
    color: 'border-orange-500',
    content:
      "Tes données sont découpées en PAQUETS. Ils ne prennent pas tous le même chemin : des ROUTEURS choisissent la route la plus rapide en temps réel. C'est ce qui rend Internet indestructible. Autre idée puissante : le PAIR-À-PAIR (P2P), où chaque utilisateur est à la fois client ET serveur — plus de centre unique, chacun partage.",
    details: [
      {
        h: 'Définition',
        p: "La commutation de paquets : ton message est découpé en paquets indépendants ; chaque paquet porte l'adresse de destination ; des routeurs choisissent la meilleure route disponible à chaque instant.",
      },
      {
        h: 'Exemple',
        p: "Une photo de 2 Mo part en environ 2 000 paquets, qui peuvent emprunter des routes différentes et arriver dans le désordre — le protocole TCP les remet dans l'ordre à l'arrivée.",
      },
      {
        h: 'À retenir',
        p: "C'est ce qui rend Internet résistant : si un routeur tombe, les paquets passent par un autre chemin. Et avec le pair-à-pair (P2P), chaque utilisateur est à la fois client et serveur : il n'y a plus de centre unique.",
      },
      { h: 'Vocabulaire', p: 'paquet, routeur, commutation de paquets, pair.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Le P2P supprime le centre unique : avantage (pas d’intermédiaire) ou risque (contenus illégaux plus difficiles à bloquer) ?',
      },
      {
        label: 'Exposé (1h30)',
        text: "Préparer une présentation 10 min : 'Comment le P2P change la notion de propriété des données ?'",
      },
    ],
  },
  {
    title: '4. Protocoles TCP/IP',
    icon: '🌐',
    color: 'border-green-500',
    content:
      "TCP vérifie que tous les paquets sont bien arrivés et les remet dans l'ordre. IP s'occupe de l'adressage. C'est le langage universel qui permet à toutes les machines du monde de se comprendre.",
    details: [
      {
        h: 'Définition',
        p: "Un protocole est un langage commun aux machines. IP s'occupe de l'adressage et de l'acheminement ; TCP garantit que tous les paquets arrivent et les remet dans le bon ordre.",
      },
      {
        h: 'Exemple',
        p: "Comme envoyer un livre en découpant les pages : TCP numérote chaque page, vérifie à l'arrivée qu'elles y sont toutes et redemande celles qui manquent.",
      },
      {
        h: 'À retenir',
        p: "TCP/IP est le langage universel d'Internet : deux machines quelconques peuvent communiquer, quelle que soit leur marque ou leur système d'exploitation.",
      },
      { h: 'Vocabulaire', p: 'protocole, TCP, IP, accusé de réception.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: "Pourquoi TCP/IP est-il 'neutre' ? Peut-il servir à censurer ou au contraire à contourner la censure ?",
      },
      {
        label: 'Recherche élève (1h30)',
        text: 'Comparer TCP/IP avec le protocole postal (lettre recommandée avec AR) : 3 points communs, 3 différences.',
      },
    ],
  },
  {
    title: '5. Labo : Tracé de route',
    icon: '📍',
    color: 'border-red-500',
    hasLab2: true,
    content:
      "Grâce à la commande « traceroute », on peut voir tous les routeurs par lesquels passe une donnée. C'est comme suivre un colis Amazon à chaque entrepôt !",
    details: [
      {
        h: 'Définition',
        p: 'traceroute (tracert sur Windows) est une commande qui affiche la liste des routeurs traversés par tes paquets, avec la durée de chaque saut.',
      },
      {
        h: 'À faire maintenant',
        p: "Sur Mac : ouvre le Terminal et tape traceroute www.google.fr (sur Windows : cmd puis tracert www.google.fr). Compte les sauts : tu verras d'abord ta box, puis le réseau de ton opérateur, puis les grands axes internationaux. Si le Terminal est bloqué au lycée, demande au prof l'adresse d'un traceroute en ligne : le résultat se lit pareil.",
      },
      {
        h: 'À retenir',
        p: "La route n'est jamais fixe : refais la commande demain, la liste des routeurs aura changé.",
      },
      { h: 'Vocabulaire', p: 'saut, latence, routeur.' },
    ],
    deep: [
      {
        label: 'Pour débattre (1h+)',
        text: 'Si un câble sous-marin est coupé, le routeur doit-il attendre ou changer de route ? Quel est le coût d’un détour ?',
      },
      {
        label: 'Exposé (1h30)',
        text: 'Cartographier la route de ton message : dessiner le chemin du terminal jusqu’à Google, avec les pays traversés.',
      },
    ],
  },
  {
    title: '🎯 Mission en classe',
    icon: '🚀',
    color: 'border-purple-600',
    isProject: true,
    intro:
      'Choisis UNE mission — 15 à 20 min, seul ou en binôme. À la fin, tu montres ton livrable au professeur.',
    projects: [
      {
        topic: 'La carte des câbles',
        desc: 'Trouve un câble qui part de France vers un autre continent (indice : regarde ce qui part de Vendée, de Bretagne ou de Marseille).',
        externalUrl: 'https://www.submarinecablemap.com',
        externalLabel: 'submarinecablemap.com',
        livrable:
          "Nom du câble, longueur, année de mise en service, pays reliés — et une phrase : que se passe-t-il s'il est coupé ?",
        difficulty: 'Débutant',
        duration: '15 min',
      },
      {
        topic: "Ta route jusqu'au Japon",
        desc: "Dans le Terminal (ou un traceroute en ligne si le lycée le bloque — le professeur donne l'adresse), trace la route vers www.google.fr, puis vers un site japonais : www.nhk.or.jp.",
        livrable:
          'Pour chaque route : nombre de sauts, plus grand temps affiché (en ms), pays reconnus dans les noms des routeurs. Une phrase : pourquoi le Japon est-il plus long ?',
        difficulty: 'Intermédiaire',
        duration: '15 min',
      },
      {
        topic: 'Débat : la neutralité du Net',
        desc: 'Ton opérateur a-t-il le droit de ralentir Netflix pour pousser son propre service vidéo ? Prépare les deux camps.',
        livrable:
          '2 arguments pour, 2 arguments contre, restitution orale de 2 min. Bonus : ce que dit la loi européenne depuis 2015.',
        difficulty: 'Avancé',
        duration: '20 min',
      },
    ],
    exposes: [
      'Géopolitique des câbles : pourquoi sont-ils devenus des cibles militaires prioritaires ?',
      'Internet et écologie : le coût environnemental caché de tes e-mails et du streaming 4K.',
    ],
    deep: [
      {
        label: 'Pour le prof (1h30)',
        text: 'Attribuer 1 sujet par groupe de 3. Préparation 20 min, présentation 5 min. Utiliser le site comme base, pas comme fin. Vérifier le livrable de chaque élève.',
      },
    ],
  },
];

/* ---------- Quiz ---------- */
const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Par où passe l'essentiel du trafic Internet entre les continents ?",
    options: ['Par câbles sous-marins', 'Par satellite', 'Par les ondes WiFi'],
    correct: 0,
    explanation:
      'Environ 99 % du trafic intercontinental passe par des câbles sous-marins en fibre optique. Le satellite reste marginal.',
  },
  {
    q: 'Que signifie DNS ?',
    options: ['Data Network System', 'Domain Name System', 'Digital Node Service'],
    correct: 1,
    explanation: "C'est l'annuaire d'Internet : il traduit un nom de domaine (google.fr) en adresse IP.",
  },
  {
    q: 'Un paquet IP contient :',
    options: ['Juste la donnée', 'Le mot de passe', "La donnée + adresses de départ et d'arrivée"],
    correct: 2,
    explanation: "Il faut une adresse pour que le routeur sache où l'envoyer.",
  },
  {
    q: 'Dans le pair-à-pair (P2P), chaque utilisateur est :',
    options: ['Uniquement client', 'À la fois client et serveur', 'Uniquement serveur'],
    correct: 1,
    explanation: 'Chacun télécharge ET partage : pas de serveur central, la charge se répartit entre tous.',
  },
  {
    q: 'Si un paquet est perdu en route, TCP :',
    options: ["Le redemande et remet tout dans l'ordre", "L'oublie : la page sera abîmée", 'Envoie automatiquement tout en double'],
    correct: 0,
    explanation: 'TCP numérote les paquets, détecte les manquants et les redemande.',
  },
];

export default function InternetChapter() {
  const [modeSession, setModeSession] = useState<ModeSession>('20min');
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [openLesson, setOpenLesson] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);

  const current = LESSON_STEPS[step];
  const question = QUIZ_QUESTIONS[quizIdx];
  const isLastStep = step === LESSON_STEPS.length - 1;
  const isLastQuestion = quizIdx === QUIZ_QUESTIONS.length - 1;

  /** XP global = quiz (100 pts / bonne réponse) + labs interactifs */
  const totalXP = score * 100 + bonusXP;

  const rank =
    score === QUIZ_QUESTIONS.length
      ? 'Maître du Réseau'
      : score >= 3
      ? 'Technicien Réseau'
      : 'Apprenti Réseau';
  const isLong = modeSession === '1h' || modeSession === '1h30';

  /** Changer de durée = réinitialiser la séance pour s'adapter au format */
  const changeSessionMode = (m: ModeSession) => {
    setModeSession(m);
    setMode('cours');
    setStep(0);
    setOpenLesson(false);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setScore(0);
    setBonusXP(0);
    setLab1Answer(null);
    setLab2Answer(null);
  };

  const nextStep = () => {
    setOpenLesson(false);
    if (isLastStep) setMode('quiz');
    else setStep((s) => s + 1);
  };

  const answerLab1 = (val: string) => {
    if (lab1Answer !== null) return;
    setLab1Answer(val);
    if (val === LAB1_CORRECT) setBonusXP((prev) => prev + LAB_XP);
  };
  const answerLab2 = (val: string) => {
    if (lab2Answer !== null) return;
    setLab2Answer(val);
    if (val === LAB2_CORRECT) setBonusXP((prev) => prev + LAB_XP);
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
    setMode('cours');
    setStep(0);
    setOpenLesson(false);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setIsLocked(false);
    setScore(0);
    setBonusXP(0);
    setLab1Answer(null);
    setLab2Answer(null);
  };

  const labClass = (val: string, answer: string | null, correct: string, idle: string) => {
    if (answer === null) return idle;
    if (val === correct) return 'bg-green-500 text-white';
    if (val === answer) return 'bg-red-500 text-white';
    return 'bg-white text-slate-400 border border-slate-200 opacity-60';
  };

  const optionClass = (i: number) => {
    if (!isLocked) return 'bg-white border-slate-200 hover:border-blue-500';
    if (i === question.correct) return 'bg-green-100 border-green-500 text-green-800';
    if (i === selectedAnswer) return 'bg-red-100 border-red-400 text-red-800';
    return 'bg-white opacity-40';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-900 pb-20 font-sans selection:bg-blue-200">
      {/* NAV sticky + sélecteur de durée (très visuel) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 py-3 flex items-center justify-between shadow-sm">
        <Link href="/themes" className="text-blue-600 font-black text-sm hover:underline">
          ← Thèmes
        </Link>

        <div className="flex gap-1 bg-slate-100 rounded-full p-1 shadow-inner">
          {(['20min', '1h', '1h30'] as ModeSession[]).map((m) => (
            <button
              key={m}
              onClick={() => changeSessionMode(m)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                modeSession === m
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="font-black text-xs text-blue-600 tracking-widest tabular-nums">
          XP: {totalXP}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            Internet
          </h1>
          <p className="text-slate-500 font-medium">
            Le réseau physique, invisible mais bien réel.
          </p>
          <div className="inline-flex gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black">
              5 étapes + mission
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-black">
              {modeSession}
            </span>
          </div>
        </div>

        {/* ================= COURS ================= */}
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}
              />
            </div>

            <article
              className={`relative bg-white rounded-[2.5rem] border-[6px] shadow-2xl overflow-hidden transition-all ${current.color}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="text-9xl font-black select-none">{current.icon}</span>
              </div>

              <div className="p-8 md:p-10 relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-none">
                  {current.title}
                </h2>

                {current.isProject ? (
                  <div className="space-y-4">
                    {current.intro && (
                      <p className="text-sm text-slate-600 font-medium">{current.intro}</p>
                    )}

                    {current.projects?.map((proj, i) => (
                      <div
                        key={i}
                        className="bg-purple-50 border-2 border-purple-100 p-5 rounded-3xl"
                      >
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">
                            {proj.topic}
                          </h4>
                          <span className="shrink-0 text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">
                            {proj.duration} · {proj.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {proj.externalUrl ? (
                            <>
                              Ouvre{' '}
                              <a
                                href={proj.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-700 font-black underline underline-offset-2 hover:text-purple-900"
                              >
                                {proj.externalLabel ?? proj.externalUrl}
                              </a>
                              . {proj.desc}
                            </>
                          ) : (
                            proj.desc
                          )}
                        </p>

                        {/* Livrable = argument massue pour le prof */}
                        <p className="text-xs text-purple-900 font-bold mt-3 bg-purple-100/80 rounded-xl px-3 py-2">
                          📝 Livrable : {proj.livrable}
                        </p>
                      </div>
                    ))}

                    {current.exposes && (
                      <div className="pt-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                          🎤 Pour un exposé (à la maison)
                        </div>
                        <ul className="text-xs text-slate-500 font-medium list-disc pl-4 space-y-1">
                          {current.exposes.map((e, i) => (
                            <li key={i}>{e}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Note prof — ambre, visible uniquement en 1h / 1h30 */}
                    {isLong &&
                      current.deep?.find((d) => d.label.includes('prof')) && (
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 mt-4 shadow-sm">
                          <h4 className="text-amber-800 font-black text-sm uppercase mb-2 flex items-center gap-2">
                            🧑‍🏫 Note professeur — Mode {modeSession}
                          </h4>
                          <p className="text-sm text-amber-950 font-medium leading-relaxed">
                            {
                              current.deep.find((d) => d.label.includes('prof'))
                                ?.text
                            }
                          </p>
                        </div>
                      )}
                  </div>
                ) : (
                  <p className="text-xl text-slate-600 font-medium leading-relaxed mb-6">
                    {current.content}
                  </p>
                )}

                {current.details && (
                  <div className="mb-4">
                    <button
                      onClick={() => setOpenLesson(!openLesson)}
                      className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-[0_4px_0_rgb(30,41,59)]"
                    >
                      <span>📖</span>
                      {openLesson
                        ? 'Refermer le cours détaillé'
                        : 'Ouvrir le cours (définitions + vocabulaire)'}
                    </button>
                    {openLesson && (
                      <div className="mt-4 bg-slate-50 rounded-3xl p-6 md:p-8 border-2 border-slate-100 space-y-6 animate-in slide-in-from-top-2 duration-300">
                        {current.details.map((b, i) => (
                          <div key={i} className="relative pl-5 border-l-2 border-blue-200">
                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">
                              {b.h}
                            </h4>
                            <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">
                              {b.p}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* LAB 1 DNS */}
                {current.hasLab && (
                  <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center">
                    <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">
                      🧪 LAB : Le répertoire DNS
                    </h4>
                    <p className="text-xs text-blue-700 mb-4 font-bold">
                      Lequel est le NOM DE DOMAINE ?
                    </p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {LAB1_OPTIONS.map((val) => (
                        <button
                          key={val}
                          disabled={lab1Answer !== null}
                          onClick={() => answerLab1(val)}
                          className={`px-4 py-2 rounded-xl font-bold transition-all ${labClass(
                            val,
                            lab1Answer,
                            LAB1_CORRECT,
                            'bg-white text-blue-600 border border-blue-200 hover:bg-blue-100'
                          )}`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    {lab1Answer !== null && (
                      <p className="text-xs text-blue-800 font-medium mt-4">
                        {lab1Answer === LAB1_CORRECT
                          ? `✅ +${LAB_XP} XP — `
                          : '❌ '}
                        {LAB1_FEEDBACK}
                      </p>
                    )}
                  </div>
                )}

                {/* LAB 2 Routage */}
                {current.hasLab2 && (
                  <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center">
                    <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest">
                      🧪 LAB : Routage
                    </h4>
                    <p className="text-xs text-red-700 mb-4 font-bold">
                      Si le routeur principal tombe en panne, que font les paquets ?
                    </p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {LAB2_OPTIONS.map((val) => (
                        <button
                          key={val}
                          disabled={lab2Answer !== null}
                          onClick={() => answerLab2(val)}
                          className={`px-4 py-2 rounded-xl font-bold transition-all ${labClass(
                            val,
                            lab2Answer,
                            LAB2_CORRECT,
                            'bg-white text-red-600 border border-red-200 hover:bg-red-100'
                          )}`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    {lab2Answer !== null && (
                      <p className="text-xs text-red-800 font-medium mt-4">
                        {lab2Answer === LAB2_CORRECT
                          ? `✅ +${LAB_XP} XP — `
                          : '❌ '}
                        {LAB2_FEEDBACK}
                      </p>
                    )}
                  </div>
                )}

                {/* Extensions 1h / 1h30 */}
                {!current.isProject && isLong && current.deep && (
                  <div className="mt-6 space-y-3">
                    {current.deep
                      .filter(
                        (d) =>
                          d.label.includes('débat') ||
                          d.label.includes('Recherche') ||
                          d.label.includes('Exposé')
                      )
                      .map((ext, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-3xl border-2 border-amber-200"
                        >
                          <h4 className="font-black text-amber-700 text-sm mb-2 uppercase tracking-wide">
                            💬 Extension {modeSession}
                          </h4>
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {ext.text}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800">
                <button
                  onClick={nextStep}
                  className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(226,232,240)] hover:translate-y-1 transition-all active:translate-y-2"
                >
                  {isLastStep ? 'PASSER AU QUIZ ⚡' : 'ÉTAPE SUIVANTE →'}
                </button>
              </div>
            </article>

            <div className="bg-white/60 backdrop-blur rounded-3xl p-6 border border-slate-200/60 text-sm text-slate-500 font-medium">
              <strong className="text-slate-800">Mode actuel : {modeSession}</strong> —{' '}
              {modeSession === '20min' &&
                'Cœur du cours + labs interactifs + quiz rapide. Idéal pour révision ou classe inversée.'}
              {modeSession === '1h' &&
                'Cours détaillé + labs + débats guidés. Idéal pour découverte en salle info.'}
              {modeSession === '1h30' &&
                'Tout ce qui précède + missions + recherches élèves. Idéal pour projet de fin de chapitre.'}
            </div>
          </div>
        )}

        {/* ================= QUIZ ================= */}
        {mode === 'quiz' && (
          <div className="bg-white rounded-[2.5rem] border-[6px] border-indigo-200 shadow-2xl p-8 md:p-12 space-y-8">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">
              Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-center tracking-tight italic">
              « {question.q} »
            </h2>
            <div className="grid gap-4">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={isLocked}
                  onClick={() => handleAnswer(i)}
                  className={`p-5 md:p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${optionClass(
                    i
                  )}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4 shadow-sm">
                <p className="text-sm text-indigo-900 font-medium mb-4">
                  {question.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
                >
                  {isLastQuestion ? 'Voir mon résultat' : 'Continuer'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= RÉSULTAT ================= */}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-10 md:p-12 rounded-[3rem] shadow-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase italic">
                Connecté !
              </h2>
              <div className="text-7xl md:text-9xl font-black my-6 leading-none">
                {totalXP}
                <span className="text-3xl text-white/40 ml-2">XP</span>
              </div>
              <div className="text-sm font-bold text-white/80 mb-2">
                {score} / {QUIZ_QUESTIONS.length} au quiz
                {bonusXP > 0 && (
                  <span className="block mt-1 text-white/70">
                    + {bonusXP} XP labs (DNS & Routage)
                  </span>
                )}
              </div>
              <div className="inline-block px-6 py-3 bg-white/20 rounded-full font-black uppercase tracking-widest text-sm backdrop-blur mt-4">
                {rank}
              </div>

              {/* Preuve de réussite — Graal salle info */}
              <p className="mt-8 text-base md:text-lg font-black bg-white/15 rounded-2xl px-5 py-3 inline-block backdrop-blur">
                👀 Montre cet écran à ton professeur
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour le professeur</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Le total XP (quiz + labs) et le livrable des missions montrent ce qui est acquis.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour l’élève</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Pas de note. Feedback immédiat + XP. On peut refaire le chapitre.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour la suite</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Adapter avec le guide professeur selon le format 20 min / 1 h / 1 h 30.
                </p>
              </div>
            </div>

            <button
              onClick={restart}
              className="block w-full py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-[2rem] font-black text-lg hover:border-blue-500 transition-all"
            >
              🔁 Refaire le chapitre
            </button>
            <Link
              href="/themes"
              className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all"
            >
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}