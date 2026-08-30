'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. C'est quoi une donnée ?",
    content: "Une donnée, c'est une information brute (un nom, un âge, une température). Quand on les organise pour qu'une machine puisse les traiter, on parle de données STRUCTURÉES. La base de tout, c'est le fichier CSV.",
    icon: "📄",
    color: "border-blue-500"
  },
  {
    title: "2. Le format CSV",
    content: "CSV signifie 'Comma Separated Values' (valeurs séparées par des virgules). C'est un fichier texte tout simple. La première ligne contient les DESCRIPTEURS (les étiquettes) et les lignes suivantes sont les OBJETS (les données).",
    icon: "📝",
    color: "border-green-500",
    hasLab: true
  },
  {
    title: "3. Trier et Filtrer",
    content: "Avec des milliers de données, on ne peut rien lire à l'œil nu. On utilise des algorithmes pour TRIER (par ordre alphabétique ou numérique) ou FILTRER (ne garder que les données qui nous intéressent).",
    icon: "🧹",
    color: "border-amber-500"
  },
  {
    title: "4. Métadonnées : les données cachées",
    content: "Une photo n'est pas juste une image. Elle contient des métadonnées (EXIF) : l'heure, le lieu GPS, le modèle du téléphone... Ces données sur les données sont cruciales pour l'organisation... et la vie privée.",
    icon: "🔍",
    color: "border-indigo-500"
  },
  {
    title: "5. Le Cloud et le stockage",
    content: "Tes données ne flottent pas dans un nuage. Elles sont stockées dans des DATACENTERS géants. Cela pose deux problèmes : la sécurité (qui peut y accéder ?) et l'écologie (ces centres consomment énormément d'électricité).",
    icon: "☁️",
    color: "border-sky-500",
    hasLab2: true
  },
  {
    title: "6. RGPD : La Loi te protège",
    content: "Le RGPD est une loi européenne qui oblige les entreprises à protéger tes données personnelles. Tu as le droit de savoir ce qu'elles collectent et de demander la suppression de tes infos.",
    icon: "⚖️",
    color: "border-red-500"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Que signifie l'acronyme CSV ?",
    options: ["Calcul Simple de Valeurs", "Comma Separated Values", "Code de Sécurité Variable"],
    correct: 1,
    explanation: "Ce sont des données séparées par des virgules (ou points-virgules)."
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
    explanation: "C'est une info qui décrit le fichier (ex: la date de création d'un doc)."
  },
  {
    q: "Où sont physiquement stockées les données du 'Cloud' ?",
    options: ["Dans l'espace", "Dans des Datacenters", "Elles n'existent pas physiquement"],
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const nextStep = () => {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
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
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-lg transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-2xl font-black mb-4 tracking-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">{LESSON_STEPS[step].content}</p>

              {LESSON_STEPS[step].hasLab && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mt-4 text-center">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-wider">🛠️ Lab : Lis le CSV</h4>
                  <div className="bg-white p-3 rounded-xl font-mono text-xs mb-4">
                    Nom, Age, Sport<br/>
                    Dupont, 15, Judo<br/>
                    Durand, 16, Foot
                  </div>
                  <p className="text-sm text-indigo-800 mb-3">Quel est le <span className="font-bold">descripteur</span> du sport ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Judo', 'Sport', 'Durand'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Sport') setBonusXP(100); }} className={`px-4 py-2 rounded-lg font-bold ${lab1Answer === val ? (val === 'Sport' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8 italic tracking-tighter">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
                    <div className="grid gap-3">
                        {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                            <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-5 rounded-2xl border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800 shadow-md' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
                        ))}
                    </div>
                    {isLocked && (
                        <div className="mt-6 p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 animate-in slide-in-from-bottom-4">
                            <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                            <button onClick={nextQuestion} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {mode === 'resultat' && (
            <div className="text-center space-y-8">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border-b-[12px] border-blue-600">
                    <div className="text-6xl font-black mb-4">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <div className="text-[10px] font-black uppercase text-blue-400 mb-2">Rang atteint</div>
                        <div className="text-2xl font-black italic uppercase tracking-tighter tracking-widest">Maître de la Table</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}