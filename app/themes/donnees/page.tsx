'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. C'est quoi une donnée ?",
    content: "Une donnée, c'est une information brute (un nom, un âge, une température). Quand on les organise pour qu'une machine puisse les traiter, on parle de données STRUCTURÉES. La base de tout, c'est le fichier CSV.",
    icon: "📄",
    color: "border-blue-500",
    details: [{"h": "Définition", "p": "Une donnée est une valeur brute : nombre, texte, photo, mesure de capteur. Elle devient une information quand on l'interprète, puis une connaissance quand on l'analyse à grande échelle."}, {"h": "Exemple", "p": "« 16 » est une donnée. « Léa a 16 ans » est une information. « La moyenne d'âge de la classe est 15,8 ans » est une connaissance."}, {"h": "À retenir", "p": "Une donnée hors contexte ne veut rien dire : c'est le traitement qui lui donne son sens."}, {"h": "Vocabulaire", "p": "donnée, information, traitement, collecte."}]
  },
  {
    title: "2. Le format CSV",
    content: "CSV signifie 'Comma Separated Values' (valeurs séparées par des virgules). C'est un fichier texte tout simple. La première ligne contient les DESCRIPTEURS (les étiquettes) et les lignes suivantes sont les OBJETS (les données).",
    icon: "📝",
    color: "border-green-500",
    hasLab: true,
    details: [{"h": "Définition", "p": "Comma Separated Values : un tableau enregistré en texte brut — une ligne par enregistrement, les valeurs séparées par des virgules (ou points-virgules en France). Tout tableur sait l'ouvrir."}, {"h": "Exemple", "p": "Nom,Age puis Dupont,15 : la première ligne est le descripteur, la suivante un enregistrement."}, {"h": "À faire maintenant", "p": "Ouvre un fichier CSV avec un éditeur de texte, puis avec un tableur : même contenu, deux lectures différentes."}, {"h": "À retenir", "p": "Le CSV est le format d'échange universel : léger, ouvert, lisible partout."}, {"h": "Vocabulaire", "p": "descripteur, enregistrement, séparateur."}]
  },
  {
    title: "3. Trier et Filtrer",
    content: "Avec des milliers de données, on ne peut rien lire à l'œil nu. On utilise des algorithmes pour TRIER (par ordre alphabétique ou numérique) ou FILTRER (ne garder que les données qui nous intéressent).",
    icon: "🧹",
    color: "border-amber-500",
    details: [{"h": "Définition", "p": "Trier = réorganiser les lignes selon un critère (alphabétique, croissant...). Filtrer = ne garder que les lignes qui vérifient une condition."}, {"h": "Exemple", "p": "Sur 500 élèves : filtrer « classe = 2nde A » (une trentaine de lignes), puis trier par moyenne décroissante : le podium en deux clics."}, {"h": "À retenir", "p": "Le tableur fait en une seconde ce qu'un humain fait en une heure : c'est l'argument central du traitement de données."}, {"h": "Vocabulaire", "p": "critère, condition, tri croissant / décroissant."}]
  },
  {
    title: "4. SQL : interroger une base",
    content: "Le CSV atteint vite ses limites. Les pros rangent les données dans une base relationnelle : des tables reliées entre elles par des clés, interrogées avec SQL. Exemple : SELECT nom FROM eleves WHERE moyenne >= 15. C'est LE langage des données — testé par Pix, et tu le retrouveras dans toutes les études d'informatique.",
    icon: "🗄️",
    color: "border-emerald-500",
    hasLab2: true,
    details: [{"h": "Définition", "p": "SQL (Structured Query Language) interroge une base relationnelle : des tables dont les lignes sont des enregistrements et les colonnes des attributs, reliées entre elles par des clés."}, {"h": "Exemple", "p": "SELECT nom FROM eleves WHERE moyenne >= 15 renvoie uniquement la colonne nom des enregistrements qui vérifient la condition."}, {"h": "À retenir", "p": "SELECT (quelles colonnes) + FROM (quelle table) + WHERE (quelle condition) : la trame de presque toutes les requêtes — et un grand classique de Pix."}, {"h": "Vocabulaire", "p": "table, attribut, enregistrement, requête, clé."}]
  },
  {
    title: "5. Métadonnées : les données cachées",
    content: "Une photo n'est pas juste une image. Elle contient des métadonnées (EXIF) : l'heure, le lieu GPS, le modèle du téléphone... Ces données sur les données sont cruciales pour l'organisation... et la vie privée.",
    icon: "🔍",
    color: "border-indigo-500",
    details: [{"h": "Définition", "p": "Des données sur les données : date, auteur, lieu, format, appareil. Elles décrivent un document sans en être le contenu."}, {"h": "Exemple", "p": "Une photo contient l'heure et le GPS de la prise de vue : l'image est la donnée, l'EXIF est la métadonnée."}, {"h": "À retenir", "p": "Les métadonnées sont précieuses (retrouver un document) et dangereuses (localiser quelqu'un sans le savoir)."}, {"h": "Vocabulaire", "p": "métadonnée, EXIF, géolocalisation."}]
  },
  {
    title: "6. Le Cloud et le stockage",
    content: "Tes données ne flottent pas dans un nuage. Elles sont stockées dans des DATACENTERS géants. Cela pose deux problèmes : la sécurité (qui peut y accéder ?) et l'écologie (ces centres consomment énormément d'électricité).",
    icon: "☁️",
    color: "border-sky-500",
    details: [{"h": "Définition", "p": "Stocker à distance sur les serveurs d'un fournisseur, accessibles par Internet, avec synchronisation automatique entre appareils et partage."}, {"h": "Exemple", "p": "La photo prise sur ton téléphone apparaît toute seule sur ton ordinateur : les deux appareils consultent la même copie distante."}, {"h": "À retenir", "p": "« Dans le cloud » veut dire « sur l'ordinateur de quelqu'un d'autre » : regarde qui héberge et dans quel pays avant d'y confier tes données."}, {"h": "Vocabulaire", "p": "cloud, synchronisation, hébergeur, datacenter."}]
  },
  {
    title: "7. RGPD : La Loi te protège",
    content: "Le RGPD est une loi européenne qui oblige les entreprises à protéger tes données personnelles. Tu as le droit de savoir ce qu'elles collectent et de demander la suppression de tes infos.",
    icon: "⚖️",
    color: "border-red-500",
    details: [{"h": "Définition", "p": "Le règlement général sur la protection des données (Europe, 2018) encadre les données personnelles : finalité déclarée, durée de conservation limitée, consentement, droit d'accès et droit à l'effacement."}, {"h": "Exemple", "p": "Un site doit t'expliquer quoi, pourquoi et combien de temps — et te permettre de faire supprimer tes données."}, {"h": "À retenir", "p": "Tes données t'appartiennent. Les entreprises qui trichent risquent des amendes pouvant atteindre plusieurs pour cent de leur chiffre d'affaires mondial."}, {"h": "Vocabulaire", "p": "donnée personnelle, consentement, droit à l'effacement."}]
  },
  {
    title: "🎤 Missions Exposés",
    isProject: true,
    projects: [
      { topic: "Open Data & Smart Cities", desc: "Comment les données publiques améliorent-elles la gestion des villes (trafic, déchets) ?", difficulty: "Intermédiaire" },
      { topic: "Le Big Data en médecine", desc: "Peut-on prédire les maladies grâce aux algorithmes et aux données ?", difficulty: "Avancé" },
      { topic: "Protection de la vie privée", desc: "Comment vérifier ce que Google ou Meta savent sur toi et comment agir ?", difficulty: "Débutant" }
    ],
    icon: "🚀",
    color: "border-purple-600"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Que signifie l'acronyme CSV ?",
    options: ["Calcul Simple de Valeurs", "Comma Separated Values", "Code de Sécurité Variable"],
    correct: 1,
    explanation: "Ce sont des données séparées par des virgules."
  },
  {
    q: "Dans un tableau, comment appelle-t-on l'en-tête d'une colonne ?",
    options: ["Un objet", "Un descripteur", "Une valeur"],
    correct: 1,
    explanation: "Le descripteur définit la nature de la donnée (ex: Nom, Âge...)."
  },
  {
    q: "Qu'est-ce qu'une métadonnée ?",
    options: ["Une donnée très lourde", "Une donnée sur une autre donnée", "Une donnée fausse"],
    correct: 1,
    explanation: "C'est une info qui décrit le fichier (ex: GPS d'une photo)."
  },
  {
    q: "Où sont physiquement stockées les données du 'Cloud' ?",
    options: ["Dans l'espace", "Dans des Datacenters", "Sur ton disque dur"],
    correct: 1,
    explanation: "Ce sont des entrepôts remplis de serveurs informatiques."
  },
  {
    q: "Quel règlement protège tes données en Europe ?",
    options: ["Le CNRS", "Le RGPD", "Le HTML"],
    correct: 1,
    explanation: "Le Règlement Général sur la Protection des Données (RGPD)."
  }
];

export default function DonneesChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const nextStep = () => { setOpenLesson(false);
    if (step < LESSON_STEPS.length - 1) setStep(step + 1);
    else setMode('quiz');
  };

  const handleAnswer = (idx: number) => {
    if (isLocked) return;
    setSelectedAnswer(idx);
    setIsLocked(true);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
        setQuizIdx(quizIdx + 1);
        setSelectedAnswer(null);
        setIsLocked(false);
    } else setMode('resultat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 4 : Données</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            
            <div className={`p-8 bg-white rounded-[2.5rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">{LESSON_STEPS[step].title}</h2>
              
              {/* AFFICHAGE CONDITIONNEL : PROJETS OU COURS */}
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold mb-4 italic">Choisis ton sujet d'exposé :</p>
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl hover:border-purple-400 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
                  {LESSON_STEPS[step].content}
                </p>
              )}

              {/* MINI LAB CSV (Conservé) */}
              {LESSON_STEPS[step].details && (
                <div className="mb-2 mt-[-12px]">
                  <button onClick={() => setOpenLesson(!openLesson)} className="w-full py-3 rounded-2xl border-2 border-blue-200 bg-blue-50 text-blue-700 font-black text-sm uppercase tracking-widest hover:bg-blue-100 transition-all">
                    {openLesson ? '▲ Refermer le cours' : '📖 Lire le cours'}
                  </button>
                  {openLesson && (
                    <div className="mt-3 p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 space-y-4">
                      {LESSON_STEPS[step].details!.map((b, i) => (
                        <div key={i}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{b.h}</div>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">{b.p}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 mt-4 text-center">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-wider italic text-left">🧪 Lab : Descripteur</h4>
                  <div className="bg-white p-3 rounded-xl font-mono text-xs mb-4 text-left">
                    Nom, Age, Sport<br/>
                    Dupont, 15, Judo
                  </div>
                  <div className="flex gap-2 justify-center">
                    {['Judo', 'Sport'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Sport') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Sport' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 mt-4 text-center">
                  <h4 className="text-emerald-900 font-black text-sm mb-4 uppercase tracking-wider italic text-left">🧪 Lab : Prédis la requête</h4>
                  <div className="bg-white p-3 rounded-xl font-mono text-xs mb-4 text-left">
                    SELECT nom FROM eleves<br/>
                    WHERE classe = &apos;2ndeA&apos;;
                  </div>
                  <p className="text-xs text-emerald-700 mb-4 font-bold italic">Que renvoie cette requête ?</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['Les noms de tous les élèves', 'Les noms des élèves de 2ndeA', 'La liste des classes'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Les noms des élèves de 2ndeA') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Les noms des élèves de 2ndeA' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-emerald-600 border border-emerald-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)] hover:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "DÉFI QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* --- QUIZ & RÉSULTATS (Format V4) --- */}
        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8 tracking-tighter italic">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
                    <div className="grid gap-4">
                        {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                            <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
                        ))}
                    </div>
                    {isLocked && (
                        <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4">
                            <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                            <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {mode === 'resultat' && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[12px] border-blue-600">
                    <div className="text-7xl mb-6">📊</div>
                    <h2 className="text-4xl font-black text-blue-600 italic">Analyste Expert !</h2>
                    <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <div className="text-[10px] font-black uppercase text-blue-400 mb-2">Badge débloqué</div>
                        <div className="text-2xl font-black tracking-tight uppercase tracking-widest leading-none italic">Maître de la Table</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}