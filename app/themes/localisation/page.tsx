'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. Le ciel t'écoute",
    content: "Le système GPS (USA) ou Galileo (Europe) utilise une constellation de satellites qui envoient leur position et l'heure exacte en permanence. Ton téléphone ne discute pas avec eux, il capte juste leur signal comme une radio.",
    icon: "🛰️",
    color: "border-blue-500"
  },
  {
    title: "2. La Trilatération",
    content: "Pour connaître ta position, ton récepteur doit capter au moins 4 satellites. En calculant le temps que met le signal pour arriver, il déduit ta position au mètre près. C'est de la géométrie pure dans l'espace !",
    icon: "📐",
    color: "border-indigo-500"
  },
  {
    title: "3. Latitude et Longitude",
    content: "On se repère avec deux coordonnées : la LATITUDE (Nord/Sud par rapport à l'Équateur) et la LONGITUDE (Est/Ouest par rapport au méridien de Greenwich). C'est le langage universel des marins et des pilotes.",
    icon: "🗺️",
    color: "border-green-500",
    hasLab: true
  },
  {
    title: "4. Couches d'information",
    content: "Une carte numérique (comme Google Maps ou OSM) superpose des COUCHES. Une couche pour le relief, une pour les routes, une pour les bouchons. On peut les activer ou les masquer selon nos besoins.",
    icon: "📍",
    color: "border-orange-500"
  },
  {
    title: "5. L'algorithme de Dijkstra",
    content: "Pour calculer ton itinéraire, ton téléphone utilise des algorithmes de graphes. Il cherche le chemin le plus court entre deux points. Dijkstra est le plus célèbre pour trouver la route la plus rapide.",
    icon: "🏎️",
    color: "border-red-500",
    hasLab2: true
  },
  {
    title: "6. Vie privée : Le tracking",
    content: "La géolocalisation est une donnée sensible. Si une appli te suit H24, elle connaît ton domicile, ton école et tes amis. Il faut toujours vérifier quelles applications ont le droit d'accéder à ta position.",
    icon: "🔒",
    color: "border-slate-800"
  },
  {
    title: "🎤 Missions Exposés",
    isProject: true,
    projects: [
      { topic: "Galileo vs GPS", desc: "Pourquoi l'Europe a-t-elle créé son propre système de satellites plutôt que d'utiliser celui des USA ?", difficulty: "Intermédiaire" },
      { topic: "L'éthique de la voiture autonome", desc: "En cas d'accident inévitable, comment l'algorithme doit-il choisir qui sauver ?", difficulty: "Avancé" },
      { topic: "Géolocalisation et Sport", desc: "Comment les montres connectées et le GPS ont transformé l'entraînement des athlètes ?", difficulty: "Débutant" }
    ],
    icon: "🚀",
    color: "border-purple-600"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Combien de satellites faut-il pour une position 3D précise ?",
    options: ["1 satellite", "2 satellites", "4 satellites"],
    correct: 2,
    explanation: "Il en faut 3 pour la position et un 4ème pour la synchronisation temporelle."
  },
  {
    q: "Quelle est la coordonnée 0 de la latitude ?",
    options: ["Le méridien de Greenwich", "L'Équateur", "Le Pôle Nord"],
    correct: 1,
    explanation: "L'Équateur sépare la Terre en deux hémisphères (Nord et Sud)."
  },
  {
    q: "Que signifie le terme 'Trilatération' ?",
    options: ["Un calcul de vitesse", "Une méthode pour trouver une position via 3 distances", "Un type de satellite"],
    correct: 1,
    explanation: "C'est la méthode géométrique utilisée par le GPS."
  },
  {
    q: "Quel format de carte est collaboratif et libre ?",
    options: ["Google Maps", "Apple Maps", "OpenStreetMap (OSM)"],
    correct: 2,
    explanation: "OSM est le 'Wikipédia' de la cartographie numérique."
  },
  {
    q: "Quel est le risque principal du tracking GPS ?",
    options: ["Il décharge la batterie", "Il permet de connaître tes habitudes de vie privées", "Il rend les photos floues"],
    correct: 1,
    explanation: "La géolocalisation permanente est une intrusion majeure dans la vie privée."
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
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 5 : Localisation</div>
        <div className="text-blue-600 font-black tracking-tighter">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>

            <div className={`p-8 bg-white rounded-[2.5rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-6xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight leading-tight">{LESSON_STEPS[step].title}</h2>
              
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold mb-4 italic">Choisis ton sujet de recherche :</p>
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-[2rem] hover:border-purple-400 transition-all group cursor-default">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">
                  {LESSON_STEPS[step].content}
                </p>
              )}

              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center italic font-medium">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 MISSION : Latitude</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold">Position : 48° Nord. Où te situes-tu ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Hémisphère Nord', 'Hémisphère Sud'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Hémisphère Nord') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Hémisphère Nord' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center italic font-medium">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 MISSION : Dijkstra</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold italic">Route A : 10km (bouchons) / Route B : 15km (vide)</p>
                  <div className="flex gap-2 justify-center">
                    {['Route A', 'Route B'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Route B') setBonusXP(prev => prev < 300 ? 300 : prev); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Route B' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                  {lab2Answer === 'Route B' && <p className="text-[10px] text-green-600 font-black mt-3 uppercase tracking-widest italic">Bravo ! Le plus court n'est pas toujours le plus rapide. +150 XP</p>}
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)] hover:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "PASSER AU DÉFI QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* --- QUIZ & RÉSULTATS (Format V4 Standard) --- */}
        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8 tracking-tighter italic">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
                    <div className="grid gap-4">
                        {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                            <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800 shadow-md' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
                        ))}
                    </div>
                    {isLocked && (
                        <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4 shadow-sm">
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
                    <div className="text-8xl mb-6">📍</div>
                    <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase">Localisé !</h2>
                    <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                        <div className="text-[10px] font-black uppercase text-blue-400 mb-2">Grade atteint</div>
                        <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest">Guide Suprême</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}