'use client';

import { useState } from 'react';
import Link from 'next/link';

// --- DONNÉES DU COURS ---
const LESSON_STEPS = [
  {
    title: "1. Ton Identité Numérique",
    content: "Chaque like, chaque story et même tes recherches Google forment ton identité numérique. C'est ton 'moi' sur Internet. Attention : ton e-réputation peut te suivre toute ta vie, même pour ton futur job !",
    icon: "👤",
    color: "border-blue-500"
  },
  {
    title: "2. Le Modèle Économique",
    content: "Pourquoi TikTok ou Insta sont gratuits ? Parce que TU es le produit. Les réseaux vendent ton temps de cerveau et tes données à des publicitaires pour te montrer exactement ce qui va te faire cliquer.",
    icon: "💰",
    color: "border-yellow-500"
  },
  {
    title: "3. Le Petit Monde",
    content: "Savais-tu que tu es relié à n'importe qui sur Terre par seulement 6 personnes ? Sur les réseaux, ce chiffre tombe à 3 ou 4. C'est ce qu'on appelle la théorie du 'Petit Monde'. Tout va très vite !",
    icon: "🌍",
    color: "border-green-500"
  },
  {
    title: "4. Cyberviolence & Loi",
    content: "Le harcèlement en ligne n'est pas une blague, c'est un délit. La loi française punit sévèrement la cyberviolence. Si tu es témoin ou victime, le numéro à retenir est le 3018.",
    icon: "⚖️",
    color: "border-red-500"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Qu'est-ce que l'e-réputation ?",
    options: ["Le nombre de tes abonnés", "L'image que les gens ont de toi en ligne", "Ton mot de passe"],
    correct: 1,
    explanation: "C'est la trace globale que tu laisses et comment elle est perçue par les autres (profs, employeurs...)."
  },
  {
    q: "Si un service est gratuit, c'est souvent parce que :",
    options: ["L'État paie tout", "Tu es le produit (tes données)", "C'est fait par des bénévoles"],
    correct: 1,
    explanation: "Tes données personnelles et ton attention sont revendues aux annonceurs."
  },
  {
    q: "Sur les réseaux, combien de personnes nous séparent d'un inconnu ?",
    options: ["Environ 3 ou 4", "Plus de 100", "Seulement 1"],
    correct: 0,
    explanation: "C'est l'expérience du Petit Monde : les réseaux sociaux réduisent la distance entre les humains."
  }
];

export default function ReseauxSociauxV2() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // --- LOGIQUE COURS ---
  const nextStep = () => {
    if (step < LESSON_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setMode('quiz');
    }
  };

  // --- LOGIQUE QUIZ ---
  const handleAnswer = (idx: number) => {
    if (isLocked) return;
    setSelectedAnswer(idx);
    setIsLocked(true);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(quizIdx + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
    } else {
      setMode('resultat');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER */}
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="bg-slate-100 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          Réseaux Sociaux
        </div>
        <div className="text-blue-600 font-black">XP: {score * 50}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-12">
        
        {/* --- MODE COURS --- */}
        {mode === 'cours' && (
          <div className="space-y-8">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500" 
                style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}
              ></div>
            </div>

            <div className={`p-8 bg-white rounded-3xl border-b-8 shadow-sm transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-2xl font-black mb-4">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed italic">
                "{LESSON_STEPS[step].content}"
              </p>
            </div>

            <button 
              onClick={nextStep}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
            >
              {step === LESSON_STEPS.length - 1 ? "PASSER AU QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* --- MODE QUIZ --- */}
        {mode === 'quiz' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <h2 className="text-2xl font-black mt-4">{QUIZ_QUESTIONS[quizIdx].q}</h2>
            </div>

            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                let bgColor = "bg-white border-slate-200";
                if (isLocked) {
                  if (i === QUIZ_QUESTIONS[quizIdx].correct) bgColor = "bg-green-100 border-green-500 text-green-800";
                  else if (i === selectedAnswer) bgColor = "bg-red-100 border-red-500 text-red-800 opacity-50";
                  else bgColor = "bg-white border-slate-100 opacity-50";
                }
                return (
                  <button
                    key={i}
                    disabled={isLocked}
                    onClick={() => handleAnswer(i)}
                    className={`p-5 rounded-2xl border-2 text-left font-bold transition-all ${bgColor} ${!isLocked && 'hover:border-indigo-400'}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {isLocked && (
              <div className="bg-white p-6 rounded-3xl border-2 border-indigo-50 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                <p className="text-slate-600 text-sm mb-4">
                  <span className="font-bold text-indigo-600 uppercase tracking-tighter mr-2">Le savais-tu ?</span>
                  {QUIZ_QUESTIONS[quizIdx].explanation}
                </p>
                <button 
                  onClick={nextQuestion}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- MODE RÉSULTAT --- */}
        {mode === 'resultat' && (
          <div className="text-center space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-blue-600">
              <div className="text-7xl mb-6">🏆</div>
              <h2 className="text-4xl font-black mb-2">Bravo !</h2>
              <p className="text-slate-500 mb-6 font-bold">Tu as terminé le chapitre.</p>
              
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border">
                  <div className="text-2xl font-black text-blue-600">{score}/{QUIZ_QUESTIONS.length}</div>
                  <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Score</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border">
                  <div className="text-2xl font-black text-indigo-600">+{score * 50}</div>
                  <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Points XP</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 relative overflow-hidden group">
                <div className="relative z-10 text-blue-800 font-bold uppercase text-xs tracking-[0.2em] mb-2">Badge Débloqué</div>
                <div className="relative z-10 text-2xl font-black text-blue-900 uppercase">Expert Social Media</div>
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 grayscale group-hover:grayscale-0 transition-all">📱</div>
              </div>
            </div>

            <Link 
              href="/themes"
              className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all"
            >
              RETOUR AUX THÈMES
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}