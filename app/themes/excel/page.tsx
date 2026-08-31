'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Cellules et Adresses", content: "Dans Excel, chaque case est une CELLULE. Elle possède une adresse unique (ex: B4 pour la colonne B, ligne 4). C'est la base pour faire des calculs sur des données précises.", icon: "📍", color: "border-green-600" },
  { title: "2. Le signe égal (=)", content: "Pour qu'Excel calcule quelque chose, tu dois TOUJOURS commencer par le signe '='. Si tu tapes '10+10', il affiche du texte. Si tu tapes '=10+10', il affiche 20.", icon: "🟰", color: "border-green-500", hasLab: true },
  { title: "3. Références vs Valeurs", content: "La vraie puissance : au lieu de faire '=10+5', on fait '=A1+A2'. Si tu changes le chiffre dans la cellule A1, le résultat se met à jour tout seul. L'ordinateur travaille pour toi !", icon: "🔄", color: "border-emerald-500" },
  { title: "4. Les Fonctions (SOMME, MOYENNE)", content: "Pas besoin de tout additionner. Pour calculer un total, on utilise =SOMME(A1:A10). Pour tes notes, utilise =MOYENNE(B1:B20). Rapide et sans erreur.", icon: "🧮", color: "border-green-400" },
  { title: "5. Les Graphiques", content: "Un tableau de chiffres est dur à lire. Excel peut transformer tes données en diagramme circulaire (camembert) ou en bâtons en un instant pour tes exposés.", icon: "📊", color: "border-green-800" },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Le Big Data", desc: "Comment les entreprises utilisent des tableurs géants pour prédire nos achats ?", difficulty: "Intermédiaire" },
      { topic: "Les erreurs célèbres", desc: "Enquête sur ces fois où une simple erreur dans une formule Excel a coûté des milliards.", difficulty: "Avancé" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Par quel symbole commence TOUJOURS une formule Excel ?", options: ["+", "=", "@"], correct: 1, explanation: "Le '=' indique à Excel qu'il doit effectuer un calcul." },
  { q: "Comment s'appelle l'intersection d'une ligne et d'une colonne ?", options: ["Un carré", "Une cellule", "Un bloc"], correct: 1, explanation: "Chaque case est une cellule avec une adresse (ex: A1)." },
  { q: "Quelle fonction permet de calculer une moyenne ?", options: ["=TOTAL()", "=MOYENNE()", "=CALCUL()"], correct: 1, explanation: "La fonction MOYENNE fait la somme et divise par le nombre d'éléments." }
];

export default function ExcelChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const nextStep = () => { if (step < LESSON_STEPS.length - 1) setStep(step + 1); else setMode('quiz'); };
  
  const handleAnswer = (idx: number) => { 
    if (isLocked) return; 
    setSelectedAnswer(idx); 
    setIsLocked(true); 
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(score + 1); 
  };

  const nextQuiz = () => {
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(quizIdx + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
    } else {
      setMode('resultat');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-green-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Initiation Excel</div>
        <div className="text-green-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl border-2 transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">{LESSON_STEPS[step].title}</h2>
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl group">
                      <h4 className="font-black text-purple-600 uppercase text-xs mb-1">{proj.topic}</h4>
                      <p className="text-sm text-slate-600">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 leading-relaxed mb-6">{LESSON_STEPS[step].content}</p>
              )}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100 mt-4 text-center">
                  <h4 className="text-green-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Calcul</h4>
                  <p className="text-xs text-green-700 mb-4 font-bold">Comment écrit-on 10 + 10 pour qu'Excel le calcule ?</p>
                  <div className="flex gap-2 justify-center">
                    {['10+10', '=10+10'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === '=10+10') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === '=10+10' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-green-600 border border-green-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-green-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(22,101,52)] active:shadow-none active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8 text-green-700">Défi Données ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-green-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {isLocked && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-green-500 text-sm">
                  {QUIZ_QUESTIONS[quizIdx].explanation}
                </div>
              )}
            </div>
            {isLocked && (
              <button onClick={nextQuiz} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl">
                {quizIdx === QUIZ_QUESTIONS.length - 1 ? "VOIR LE RÉSULTAT" : "CONTINUER"}
              </button>
            )}
          </div>
        )}

        {mode === 'resultat' && (
          <div className="text-center space-y-8 py-12">
            <div className="text-8xl">📊</div>
            <h2 className="text-4xl font-black">Expert Excel !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Points gagnés</p>
              <div className="text-6xl font-black text-green-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-green-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}