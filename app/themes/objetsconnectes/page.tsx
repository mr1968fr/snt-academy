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

const LAB1_OPTIONS = ['Capteur', 'Actionneur'];
const LAB1_CORRECT = 'Capteur';
const LAB1_FEEDBACK =
  'Un détecteur de mouvement mesure le monde → c’est un capteur. Un actionneur agit (moteur, LED, sirène…).';

const LAB2_OPTIONS = ['En quelques millisecondes', 'En une dizaine de secondes'];
const LAB2_CORRECT = 'En quelques millisecondes';
const LAB2_FEEDBACK =
  'Un système critique comme l’airbag doit réagir dans un délai très court. Quelques secondes trop tard, et la protection n’a plus d’effet.';

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "L'informatique embarquée",
    subtitle: 'Un ordinateur dédié à une tâche',
    content:
      "Un système embarqué est un ordinateur intégré dans un objet (voiture, montre, électroménager). Il est souvent dédié à une mission précise et doit rester fiable sous contrainte.",
    details: [
      {
        h: 'Comprendre',
        p: 'Processeur, mémoire et programme sont intégrés dans l’objet. Peu d’énergie, peu de mémoire, mais une exigence élevée de fiabilité.',
      },
      {
        h: 'Exemple',
        p: 'Une voiture moderne embarque de nombreux calculateurs : moteur, freinage, éclairage, infodivertissement…',
      },
      {
        h: 'À retenir',
        p: 'Embarqué = spécialisé et contraint, pas un ordinateur généraliste polyvalent.',
      },
      { h: 'Vocabulaire', p: 'embarqué • calculateur • microprocesseur' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Faut-il tout connecter dans une voiture au risque d’augmenter la complexité et les failles de sécurité ?',
      },
      {
        label: 'Investigation',
        text: 'Lister cinq objets du quotidien contenant un système embarqué et indiquer leur tâche principale.',
      },
    ],
  },
  {
    number: '02',
    title: 'Capteurs et actionneurs',
    subtitle: 'Capter → décider → agir',
    hasLab: true,
    content:
      'Le capteur mesure le monde. L’actionneur agit sur le monde. Le programme fait le lien entre les deux.',
    details: [
      {
        h: 'Comprendre',
        p: 'Capteur : température, lumière, mouvement, appui… Actionneur : moteur, LED, résistance chauffante, vanne…',
      },
      {
        h: 'Exemple',
        p: 'Thermostat : capteur de température → comparaison à la consigne → allumage ou arrêt de la chaudière.',
      },
      {
        h: 'À retenir',
        p: 'Chaîne de base de nombreux objets connectés : capter, décider, agir, en boucle.',
      },
      { h: 'Vocabulaire', p: 'capteur • actionneur • consigne • boucle' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Un smartphone : capteurs ou actionneurs ? Donner un exemple de chaque.',
      },
      {
        label: 'Exposé',
        text: 'Schéma d’un objet simple (lampe connectée) : capteur → programme → actionneur.',
      },
    ],
  },
  {
    number: '03',
    title: 'La carte programmable',
    subtitle: 'Microcontrôleur, prototypage, Python',
    content:
      'Au cœur de nombreux prototypes : le microcontrôleur (Arduino, micro:bit) — processeur, mémoire et entrées/sorties sur une puce, souvent programmable en Python ou en langage proche.',
    details: [
      {
        h: 'Comprendre',
        p: 'On branche en USB, on écrit un programme, on relie capteurs et actionneurs sur les broches.',
      },
      {
        h: 'Exemple',
        p: 'Sur une micro:bit, capteurs de lumière ou de mouvement intégrés : quelques lignes suffisent pour un premier objet qui réagit.',
      },
      {
        h: 'À retenir',
        p: 'Le prototypage permet de passer de l’idée à un objet réel, pas seulement à une simulation.',
      },
      { h: 'Vocabulaire', p: 'microcontrôleur • entrée/sortie • broche • prototype' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Pourquoi prototyper au lycée plutôt que seulement simuler ?',
      },
      {
        label: 'Investigation',
        text: 'Sur microbit.org ou arduino.cc, trouver un projet débutant et résumer capteurs + action en cinq lignes.',
      },
    ],
  },
  {
    number: '04',
    title: "L'interface homme-machine",
    subtitle: 'Commander et comprendre l’objet',
    content:
      "L'IHM regroupe boutons, écrans, sons, applications mobiles : tout ce qui relie l'humain à la machine dans les deux sens.",
    details: [
      {
        h: 'Comprendre',
        p: 'Une bonne interface rend l’objet utilisable ; une mauvaise le rend inutile malgré une technique solide.',
      },
      {
        h: 'Exemple',
        p: 'Thermostat à molette ou à écran tactile : même fonction, usages et accessibilités différents.',
      },
      {
        h: 'À retenir',
        p: 'Concevoir, c’est aussi penser à celui qui utilise — y compris en situation de handicap.',
      },
      { h: 'Vocabulaire', p: 'IHM • ergonomie • retour d’information' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Commande vocale vs boutons physiques : accessibilité, confidentialité, fiabilité.',
      },
      {
        label: 'Exposé',
        text: 'Comparer deux interfaces du même type d’objet (montre connectée vs montre mécanique).',
      },
    ],
  },
  {
    number: '05',
    title: 'Le temps réel',
    subtitle: 'Réagir dans un délai garanti',
    hasLab2: true,
    content:
      'Dans certains systèmes, réagir « assez vite en moyenne » ne suffit pas : il faut garantir un délai maximal. C’est la contrainte de temps réel.',
    details: [
      {
        h: 'Comprendre',
        p: 'Un système temps réel doit produire sa réponse avant une échéance fixée. Au-delà, le résultat peut être inutilisable ou dangereux.',
      },
      {
        h: 'Exemple',
        p: 'Freinage assisté, airbag, pilotage : des délais de l’ordre de la milliseconde, pas de la seconde.',
      },
      {
        h: 'À retenir',
        p: 'Une application lente agace ; un système critique lent peut mettre en danger.',
      },
      { h: 'Vocabulaire', p: 'temps réel • latence • contrainte temporelle • criticité' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Un jeu vidéo « temps réel » et un freinage ABS : même expression, même enjeu ?',
      },
      {
        label: 'Investigation',
        text: 'Trouver un exemple de système critique et le délai maximal acceptable annoncé.',
      },
    ],
  },
  {
    number: '06',
    title: 'Sécurité des objets connectés',
    subtitle: 'Failles, mots de passe, mises à jour',
    content:
      'Chaque objet connecté peut devenir une porte d’entrée sur un réseau personnel ou professionnel s’il est mal configuré ou non mis à jour.',
    details: [
      {
        h: 'Comprendre',
        p: 'Mots de passe d’usine, mises à jour absentes, données non chiffrées : causes fréquentes d’incidents.',
      },
      {
        h: 'Exemple',
        p: 'Des caméras ou box mal sécurisées ont déjà été regroupées en botnets pour lancer des attaques massives.',
      },
      {
        h: 'À retenir',
        p: 'Changer les identifiants par défaut et installer les mises à jour réduit une grande partie du risque.',
      },
      { h: 'Vocabulaire', p: 'botnet • mise à jour • mot de passe par défaut • chiffrement' },
    ],
    deep: [
      {
        label: 'Question pour aller plus loin',
        text: 'Faut-il imposer des mises à jour de sécurité garanties plusieurs années pour vendre un objet connecté ?',
      },
      {
        label: 'Investigation',
        text: 'Sur un objet connecté accessible : mot de passe par défaut ? mises à jour ? données envoyées où ?',
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
        topic: 'Domotique',
        desc: 'Maison intelligente : confort réel ou surveillance permanente ?',
        livrable:
          'Deux arguments confort, deux arguments risque vie privée, position personnelle en deux phrases. Oral 2 min.',
        difficulty: 'Découverte',
        duration: '15 min',
      },
      {
        topic: 'Objets médicaux connectés',
        desc: 'Quels risques de sécurité autour d’appareils de santé connectés ?',
        livrable:
          'Un scénario de risque documenté ou réaliste + deux mesures de protection + un dilemme éthique.',
        difficulty: 'Investigation',
        duration: '20 min',
      },
      {
        topic: 'Agriculture et capteurs',
        desc: 'Comment les capteurs peuvent-ils aider à économiser l’eau ?',
        livrable:
          'Schéma simple : un capteur + un actionneur + une décision du programme + un ordre de grandeur d’intérêt.',
        difficulty: 'Exploration',
        duration: '15 min',
      },
    ],
    exposes: [
      'Botnets d’objets connectés : comment des équipements du quotidien ont servi d’armes réseau.',
      'Micro:bit / Arduino au lycée : du prototype à un usage pédagogique.',
    ],
    deep: [
      {
        label: 'Pour le professeur',
        text: 'Répartir les missions. Vérifier le livrable. Rappeler la chaîne capteur → programme → actionneur. Option démo micro:bit si matériel disponible. En 1 h 30, la mission prime sur le score.',
      },
    ],
  },
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Qu'est-ce qu'un actionneur ?",
    options: ['Un thermomètre', 'Un moteur (par exemple)', 'Uniquement un écran tactile'],
    correct: 1,
    explanation: 'Un actionneur produit une action physique (moteur, LED, chaudière…).',
  },
  {
    q: 'Que signifie IHM ?',
    options: ['Interface Homme-Machine', 'Internet Haut Massive', 'Informatique Hybride'],
    correct: 0,
    explanation: 'Ensemble des moyens d’échanger avec la machine.',
  },
  {
    q: 'Un système embarqué est en général :',
    options: ['Polyvalent comme un PC', 'Dédié à une tâche précise', 'Toujours très volumineux'],
    correct: 1,
    explanation: 'Il est optimisé pour une fonction, souvent sous contraintes fortes.',
  },
  {
    q: 'Un microcontrôleur, c’est surtout :',
    options: [
      'Un mini-ordinateur sur une puce (processeur, mémoire, entrées/sorties)',
      'Un simple capteur de température',
      'Une antenne Wi-Fi uniquement',
    ],
    correct: 0,
    explanation: 'C’est le « cerveau » programmable de nombreux objets.',
  },
  {
    q: '« Allumer une LED quand il fait froid » nécessite :',
    options: [
      'Un capteur, un programme et un actionneur',
      'Juste une LED branchée sans logique',
      'Obligatoirement une connexion Internet',
    ],
    correct: 0,
    explanation: 'Chaîne de base : capter → décider → agir.',
  },
];

const COMPETENCES = [
  { key: 'emb', label: 'Embarqué', desc: 'Caractériser un système informatique embarqué' },
  { key: 'chaine', label: 'Chaîne', desc: 'Relier capteur, programme et actionneur' },
  { key: 'tr', label: 'Temps réel', desc: 'Comprendre l’enjeu d’un délai garanti' },
  { key: 'sec', label: 'Sécurité', desc: 'Identifier les risques des objets connectés' },
];

export default function IoTChapter() {
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
              OBJETS<br />CONNECTÉS
            </h1>
            <div className="w-20 h-1 bg-cyan-500 mb-8" />
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-700">
              Embarqué, capteurs, temps réel… et sécurité.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mt-8 max-w-2xl">
              De la voiture à la montre, des objets pensent et agissent. Comprendre la chaîne
              capteur → programme → actionneur, et les risques d’un monde trop connecté.
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
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Comprendre</div>
              <h3 className="font-black text-xl mb-3">Systèmes embarqués</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Ordinateurs cachés, dédiés, sous contraintes.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Manipuler</div>
              <h3 className="font-black text-xl mb-3">Capteurs et actionneurs</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                La boucle qui fait « intelligents » les objets.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">Sécuriser</div>
              <h3 className="font-black text-xl mb-3">Risques IoT</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Mots de passe, mises à jour, surface d’attaque.
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
              l’argumentation.
            </p>
          </section>

          <section className="mt-24">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">Votre parcours</div>
            <h2 className="text-3xl font-black mt-2 mb-10">6 étapes pour comprendre les objets connectés</h2>
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
                  <h3 className="font-black text-xl mb-3">Capteur ou actionneur ?</h3>
                  <p className="text-sm text-slate-600 mb-6">« Un détecteur de mouvement »</p>
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
                  <h3 className="font-black text-xl mb-3">Contrainte de temps réel</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Un airbag doit en principe se déclencher :
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