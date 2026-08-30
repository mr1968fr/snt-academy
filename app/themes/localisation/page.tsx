'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. Comment ton tel sait où tu es ?",
    content: "Ton smartphone ne 'discute' pas avec les satellites, il les ÉCOUTE. Le système GPS (USA) ou Galileo (Europe) utilise une constellation de satellites qui envoient leur position et l'heure exacte en permanence.",
    icon: "🛰️",
    color: "border-blue-500"
  },
  {
    title: "2. La Trilatération",
    content: "Pour connaître ta position exacte, ton récepteur doit capter le signal d'au moins 4 satellites. En calculant le temps que met le signal pour arriver, il déduit sa distance par rapport à chaque satellite. Le croisement des sphères donne ta position au mètre près !",
    icon: "📐",
    color: "border-indigo-500"
  },
  {
    title: "3. Labo : Latitude et Longitude",
    content: "Sur Terre, on se repère avec deux coordonnées : la LATITUDE (Nord/Sud par rapport à l'Équateur) et la LONGITUDE (Est/Ouest par rapport au méridien de Greenwich).",
    icon: "🗺️",
    color: "border-green-500",
    hasLab: true
  },
  {
    title: "4. Les cartes numériques",
    content: "Contrairement aux cartes papier, une carte numérique est composée de COUCHES (Layer). On peut superposer les routes, les bâtiments, le relief et le trafic en temps réel. Le format le plus connu est OpenStreetMap (OSM).",
    icon: "📍",
    color: "border-orange-500"
  },
  {
    title: "5. Labo : Calcul d'itinéraire",
    content: "Pour te guider, les algorithmes (comme celui de Dijkstra) calculent le chemin le plus court dans un graphe où les carrefours sont des sommets et les rues des arêtes. Ils prennent en compte le sens unique et les bouchons !",
    icon: "🏎️",
    color: "border-red-500",
    hasLab2: true
  },
  {
    title: "6. Ta vie privée en jeu",
    content: "La géolocalisation est une donnée ultra-sensible. Si une appli connaît ta position H24, elle connaît tes habitudes, tes amis et ton lieu de travail. Vérifie toujours les autorisations dans tes réglages !",
    icon: "🔒",
    color: "border-slate-800"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Combien de satellites minimum faut-il pour une position précise ?",
    options: ["1 seul", "2 satellites", "4 satellites"],
    correct: 2,
    explanation: "Il en faut 3 pour la position 2D et un 4ème pour l'altitude et la synchronisation temporelle."
  },
  {
    q: "Quel est le nom du système de positionnement européen ?",
    options: ["GPS", "Galileo", "Glonass"],
    correct: 1,
    explanation: "Galileo est le système européen, plus précis et civil que le GPS américain."
  },
  {
    q: "La ligne imaginaire qui sépare le Nord du Sud s'appelle :",
    options: ["Le Méridien", "L'Équateur", "Le Tropique"],
    correct: 1,
    explanation: "L'Équateur est la ligne de latitude 0°."
  },
  {
    q: "Qu'est-ce qu'une couche (layer) sur une carte numérique ?",
    options: ["Une protection d'écran", "Un niveau d'information spécifique (ex: routes)", "Une couleur de fond"],
    correct: 1,
    explanation: "Les cartes numériques superposent différentes couches de données."
  },
  {
    q: "Quel algorithme est célèbre pour le calcul d'itinéraire ?",
    options: ["Dijkstra", "Instagram", "Python"],
    correct: 0,
    explanation: "L'algorithme de Dijkstra trouve le chemin le plus court dans un graphe."
  }
];

export default function LocalisationChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Localisation & Mobilité</div>
        <div className="text-blue-600 font-black italic">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2.5rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">{LESSON_STEPS[step].content}</p>

              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mt-4 text-center">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest text-left italic">🧪 MISSION : Cible le Nord</h4>
                  <div className="bg-white p-4 rounded-xl border border-blue-100 font-mono text-sm mb-4">
                    Position : 48.8584° N, 2.2945° E
                  </div>
                  <p className="text-xs text-blue-700 mb-4 font-bold">Cette coordonnée est-elle au Nord ou au Sud de l'Équateur ?</p>
                  <div className="flex gap-2 justify-center">
                    {['NORD', 'SUD'].map(val => (
                      <button 
                        key={val} 
                        onClick={() => { setLab1Answer(val); if(val === 'NORD') setBonusXP(150); }}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'NORD' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 mt-4 text-center">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 MISSION : Chemin le plus court</h4>
                  <svg viewBox="0 0 200 100" className="bg-white rounded-xl mb-4 p-2">
                    <circle cx="20" cy="50" r="5" fill="blue"/> <text x="15" y="40" fontSize="8">A</text>
                    <line x1="25" y1="50" x2="100" y2="20" stroke="red" strokeWidth="2" strokeDasharray="4"/> <text x="60" y="30" fontSize="8" fill="red">10 min</text>
                    <line x1="25" y1="50" x2="100" y2="80" stroke="green" strokeWidth="2"/> <text x="60" y="75" fontSize="8" fill="green">4 min</text>
                    <circle cx="100" cy="20" r="5" fill="slate"/>
                    <circle cx="100" cy="80" r="5" fill="slate"/>
                    <line x1="105" y1="20" x2="175" y2="50" stroke="red" strokeWidth="2" strokeDasharray="4"/>
                    <line x1="105" y1="80" x2="175" y2="50" stroke="green" strokeWidth="2"/>
                    <circle cx="180" cy="50" r="5" fill="blue"/> <text x="175" y="40" fontSize="8">B</text>
                  </svg>
                  <p className="text-xs font-bold text-red-800 mb-4 italic">Quel chemin choisir pour aller de A vers B ?</p>
                  <div className="flex gap-2 justify-center">
                    {['ROUGE', 'VERT'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'VERT') setBonusXP(prev => prev < 300 ? 300 : prev); }} className={`px-6 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'VERT' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 shadow-[0_8px_0_rgb(30,64,175)] active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ FINAL ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* QUIZ & RESULTATS (Format Standard V4) */}
        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8 italic tracking-tighter">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
                    <div className="grid gap-3">
                        {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                            <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[1.5rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800 shadow-md' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
                        ))}
                    </div>
                    {isLocked && (
                        <div className="mt-6 p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 animate-in slide-in-from-bottom-4">
                            <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                            <button onClick={() => { if(quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(quizIdx + 1); setSelectedAnswer(null); setIsLocked(false); } else setMode('resultat'); }} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {mode === 'resultat' && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600">
                    <div className="text-7xl mb-6">🛰️</div>
                    <h2 className="text-4xl font-black mb-2 tracking-tighter italic text-blue-600 uppercase">Géolocalisé !</h2>
                    <div className="text-6xl font-black my-8 italic">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
                    <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 text-blue-200 font-black uppercase text-[10px] tracking-[0.3em] mb-3 uppercase font-black">Grade débloqué</div>
                        <div className="relative z-10 text-2xl font-black tracking-tight uppercase leading-none">Cartographe Expert</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}