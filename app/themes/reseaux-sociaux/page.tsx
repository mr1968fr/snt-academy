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

/* ---------- Labs ---------- */
const LAB_XP = 150;
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
    title: "1. L'Expérience du Petit Monde",
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
    title: '2. Les Graphes : Le langage des réseaux',
    icon: '📐',
    color: 'border-blue-500',
    hasLab: true,
    content:
      "Pour étudier un réseau, on utilise les Graphes. Un compte = un SOMMET. Une relation = une ARÊTE. Si le lien ne marche que dans un sens (ex: tu suis une star), c'est un graphe ORIENTÉ.",
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
    title: '3. Labo : Calculer une Distance',
    icon: '🔬',
    color: 'border-indigo-500',
    hasLab2: true,
    content:
      "La 'Distance' entre deux sommets, c'est le nombre minimum d'arêtes pour les relier. L'écartement d'un sommet est sa distance maximale vers les autres. Le centre du graphe est le sommet avec l'écartement le plus petit.",
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
    title: '4. Ton Identité Numérique',
    icon: '🔍',
    color: 'border-pink-500',
    content:
      "Il y a ce que tu montres (profil) et ce que tu laisses sans le vouloir (cookies, temps de vue, géolocalisation). Tout cela forme ton Identité Numérique. Ton e-réputation, c'est ce que Google dit de toi.",
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
    title: '5. Bulle de Filtres & Algorithmes',
    icon: '🧼',
    color: 'border-yellow-500',
    content:
      "L'algorithme veut que tu restes sur l'appli. Il te montre donc uniquement ce que tu aimes déjà. C'est la 'Bulle de filtres'. Elle t'empêche de voir des avis différents et peut favoriser les Fake News.",
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
    title: '6. Cyberviolence : Ce que dit la Loi',
    icon: '⚖️',
    color: 'border-red-500',
    content:
      'Le cyberharcèlement (insultes répétées, menaces, revenge porn) est puni par le Code Pénal, même sous pseudo. Le respect s’applique aussi derrière un écran. Le numéro à retenir : 3018.',
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
    title: '🎯 Mission en classe',
    icon: '🚀',
    color: 'border-purple-600',
    isProject: true,
    intro:
      'Choisis UNE mission — 15 à 20 min, seul ou en binôme. À la fin, tu montres ton livrable au professeur.',
    projects: [
      {
        topic: "L'Économie de l'attention",
        desc: 'Comment TikTok et Instagram font-ils pour nous garder connectés le plus longtemps possible ?',
        livrable:
          '3 techniques repérées (scroll infini, notifications, algo…) + 1 impact sur le temps d’écran. Oral 2 min.',
        difficulty: 'Intermédiaire',
        duration: '15 min',
      },
      {
        topic: 'Fake News & Élections',
        desc: 'Comment les réseaux sociaux sont devenus des outils d’influence politique majeure ?',
        livrable:
          '1 exemple documenté + 2 mécanismes (viralité, micro-ciblage…) + 1 contre-mesure citoyenne.',
        difficulty: 'Avancé',
        duration: '20 min',
      },
      {
        topic: "L'influenceur : Un vrai métier ?",
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
    q: "Dans un graphe, que représente un 'Sommet' ?",
    options: ['Une relation', 'Un utilisateur', 'Une publicité'],
    correct: 1,
    explanation: 'Le sommet est le point qui représente un compte ou un individu.',
  },
  {
    q: "Qu'est-ce que le 'Diamètre' d'un graphe ?",
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
    q: "L'expérience de milgram (1967) portait sur :",
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
    q: "C'est quoi une 'Bulle de Filtres' ?",
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

export default function ReseauxSociauxChapter() {
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
  const totalXP = score * 100 + bonusXP;
  const rank =
    score === QUIZ_QUESTIONS.length
      ? 'Architecte du Réseau'
      : score >= 3
      ? 'Analyste Social'
      : 'Apprenti Connecté';
  const isLong = modeSession === '1h' || modeSession === '1h30';

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
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
            Réseaux sociaux
          </h1>
          <p className="text-slate-500 font-medium">
            Graphes, identité, bulles… et responsabilité.
          </p>
          <div className="inline-flex gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black">
              6 étapes + mission
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-black">
              {modeSession}
            </span>
          </div>
        </div>

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

                {current.hasLab && (
                  <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center">
                    <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">
                      🧪 LAB : Sommet ou Arête ?
                    </h4>
                    <p className="text-xs text-blue-700 mb-4 font-bold">
                      « Le trait qui relie deux amis »
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

                {current.hasLab2 && (
                  <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 mt-4 text-center">
                    <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-widest">
                      🧪 LAB : Distance Mini
                    </h4>
                    <svg
                      viewBox="0 0 200 100"
                      className="bg-white rounded-xl mb-4 p-2 border border-indigo-100 mx-auto max-w-[220px]"
                    >
                      <circle cx="30" cy="50" r="6" fill="#3b82f6" />
                      <line x1="36" y1="50" x2="94" y2="50" stroke="#0f172a" strokeWidth="2" />
                      <circle cx="100" cy="50" r="6" fill="#3b82f6" />
                      <line x1="106" y1="50" x2="164" y2="50" stroke="#0f172a" strokeWidth="2" />
                      <circle cx="170" cy="50" r="6" fill="#3b82f6" />
                    </svg>
                    <p className="text-xs text-indigo-700 mb-4 font-bold">
                      Distance entre le 1er et le 3ème sommet ?
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
                            'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                          )}`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    {lab2Answer !== null && (
                      <p className="text-xs text-indigo-800 font-medium mt-4">
                        {lab2Answer === LAB2_CORRECT
                          ? `✅ +${LAB_XP} XP — `
                          : '❌ '}
                        {LAB2_FEEDBACK}
                      </p>
                    )}
                  </div>
                )}

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
                'Cœur du cours + labs + quiz. Idéal révision / classe inversée.'}
              {modeSession === '1h' &&
                'Cours détaillé + labs + débats. Idéal salle info.'}
              {modeSession === '1h30' &&
                'Tout + missions avec livrable + recherches. Idéal projet de chapitre.'}
            </div>
          </div>
        )}

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

        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-10 md:p-12 rounded-[3rem] shadow-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase italic">
                Maître !
              </h2>
              <div className="text-7xl md:text-9xl font-black my-6 leading-none">
                {totalXP}
                <span className="text-3xl text-white/40 ml-2">XP</span>
              </div>
              <div className="text-sm font-bold text-white/80 mb-2">
                {score} / {QUIZ_QUESTIONS.length} au quiz
                {bonusXP > 0 && (
                  <span className="block mt-1 text-white/70">
                    + {bonusXP} XP labs (Graphe & Distance)
                  </span>
                )}
              </div>
              <div className="inline-block px-6 py-3 bg-white/20 rounded-full font-black uppercase tracking-widest text-sm backdrop-blur mt-4">
                {rank}
              </div>
              <p className="mt-8 text-base md:text-lg font-black bg-white/15 rounded-2xl px-5 py-3 inline-block backdrop-blur">
                👀 Montre cet écran à ton professeur
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour le professeur</h4>
                <p className="text-sm text-slate-500 font-medium">
                  XP (quiz + labs) + livrable des missions = preuve de travail en salle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour l’élève</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Feedback immédiat. On peut refaire le chapitre sans pression de note.
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2">Pour la suite</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Adapter avec le mode 20 min / 1 h / 1 h 30 selon la séance.
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