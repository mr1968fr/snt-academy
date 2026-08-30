'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. L'Expérience du Petit Monde",
    content: "En 1967, Stanley Milgram a montré que deux inconnus aux USA étaient reliés par seulement 6 intermédiaires. Aujourd'hui, avec Facebook et Instagram, ce chiffre est tombé à 3,5 ! C'est ce qu'on appelle le phénomène du 'Petit Monde'.",
    icon: "🌍",
    color: "border-amber-500"
  },
  {
    title: "2. Les Graphes : Le langage des réseaux",
    content: "Pour étudier un réseau, on utilise les Graphes. Un compte = un SOMMET. Une relation = une ARÊTE. Si le lien ne marche que dans un sens (ex: tu suis une star), c'est un graphe ORIENTÉ.",
    icon: "📐",
    color: "border-blue-500"
  },
  {
    title: "3. Labo : Calculer une Distance",
    content: "La 'Distance' entre deux sommets, c'est le nombre minimum d'arêtes pour les relier. Regarde le graphe ci-dessous et essaie de trouver le chemin le plus court !",
    icon: "🔬",
    color: "border-indigo-500",
    hasLab: true // Active le mini-exercice
  },
  {
    title: "4. Diamètre et Centre",
    content: "Le DIAMÈTRE est la distance la plus longue entre deux points du réseau. L'ÉCARTEMENT d'un sommet est sa distance maximale vers les autres. Le sommet avec l'écartement le plus petit est le CENTRE du réseau.",
    icon: "🎯",
    color: "border-green-500"
  },
  {
    title: "5. La Bulle de Filtres",
    content: "L'algorithme de recommandation t'enferme dans ce que tu aimes déjà. C'est la 'Bulle de filtres'. Elle limite ta curiosité et peut favoriser la propagation de Fake News car tu ne vois plus d'avis contraires.",
    icon: "🧼",
    color: "border-yellow-500"
  },
  {
    title: "6. Cyberviolence & Anonymat",
    content: "L'anonymat sur les réseaux est relatif : la police peut retrouver ton adresse IP. Le cyberharcèlement est puni de 2 ans de prison et 30 000€ d'amende. Le respect s'applique aussi derrière un écran.",
    icon: "⚖️",
    color: "border-red-500"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Dans un graphe, qu'est-ce qu'une arête ?",
    options: ["Un utilisateur", "Le lien entre deux utilisateurs", "Une photo postée"],
    correct: 1,
    explanation: "L'arête est le trait qui relie deux points (sommets) dans un graphe."
  },
  {
    q: "Si A suit B, mais B ne suit pas A, le graphe est :",
    options: ["Désordonné", "Symétrique", "Orienté"],
    correct: 2,
    explanation: "Un graphe est orienté quand les relations ont un sens précis (flèches)."
  },
  {
    q: "Comment appelle-t-on la distance maximale dans un graphe ?",
    options: ["Le Rayon", "Le Diamètre", "La Circonférence"],
    correct: 1,
    explanation: "Le diamètre représente l'éloignement maximal entre deux membres du réseau."
  }
];

export default function ReseauxSociauxV4() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [labAnswer, setLabAnswer] = useState<string | null>(null);
  
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* HEADER */}
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Réseaux Sociaux</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        
        {mode === 'cours' && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>

            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-lg transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-2xl font-black mb-4 tracking-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
                {LESSON_STEPS[step].content}
              </p>

              {/* MINI-LAB OPTIONNEL */}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mt-4">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-wider">🛠️ Mission : Trouve la distance</h4>
                  
                  {/* SVG GRAPH */}
                  <svg viewBox="0 0 200 100" className="w-full h-32 mb-4 bg-white rounded-xl border border-indigo-100">
                    <line x1="40" y1="50" x2="100" y2="20" stroke="#818cf8" strokeWidth="2" />
                    <line x1="100" y1="20" x2="160" y2="50" stroke="#818cf8" strokeWidth="2" />
                    <line x1="40" y1="50" x2="100" y2="80" stroke="#818cf8" strokeWidth="2" />
                    <line x1="100" y1="80" x2="160" y2="50" stroke="#818cf8" strokeWidth="2" />
                    
                    <circle cx="40" cy="50" r="8" fill="#4f46e5" /> <text x="35" y="40" fontSize="10" fontWeight="bold">Léa</text>
                    <circle cx="100" cy="20" r="8" fill="#4f46e5" /> <text x="90" y="12" fontSize="10" fontWeight="bold">Marc</text>
                    <circle cx="100" cy="80" r="8" fill="#4f46e5" /> <text x="90" y="95" fontSize="10" fontWeight="bold">Tom</text>
                    <circle cx="160" cy="50" r="8" fill="#4f46e5" /> <text x="150" y="40" fontSize="10" fontWeight="bold">Yanis</text>
                  </svg>

                  <p className="text-xs text-indigo-700 font-bold mb-3 italic text-center">Quelle est la distance entre Léa et Yanis ?</p>
                  
                  <div className="flex gap-2 justify-center">
                    {['1', '2', '4'].map(val => (
                      <button 
                        key={val}
                        onClick={() => {
                            setLabAnswer(val);
                            if(val === '2') setBonusXP(150);
                        }}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${labAnswer === val ? (val === '2' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {labAnswer === '2' && <p className="text-[10px] text-green-600 font-black mt-2 text-center uppercase tracking-widest animate-bounce">Bravo ! +150 XP Bonus</p>}
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-xl hover:bg-blue-700 shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "DÉFI FINAL ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* QUIZ & RESULTATS (Conservés de V3) */}
        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8">{QUIZ_QUESTIONS[quizIdx].q}</h2>
                    <div className="grid gap-3">
                        {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                            <button
                                key={i}
                                disabled={isLocked}
                                onClick={() => handleAnswer(i)}
                                className={`p-5 rounded-2xl border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white opacity-50') : 'bg-white border-slate-200 hover:border-blue-500'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    {isLocked && (
                        <div className="mt-6 p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 animate-in slide-in-from-bottom-4">
                            <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                            <button 
                                onClick={() => { setQuizIdx(quizIdx + 1); setIsLocked(false); if(quizIdx === QUIZ_QUESTIONS.length - 1) setMode('resultat'); }}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold"
                            >
                                Continuer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {mode === 'resultat' && (
            <div className="text-center space-y-8">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border-b-[12px] border-blue-600">
                    <h2 className="text-5xl font-black mb-2 tracking-tighter italic text-blue-600 underline">GÉANT !</h2>
                    <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-8">Score Final</p>
                    <div className="text-6xl font-black mb-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <div className="text-[10px] font-black uppercase text-blue-400 mb-2">Rang atteint</div>
                        <div className="text-2xl font-black italic uppercase tracking-tighter">Architecte du Réseau</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}