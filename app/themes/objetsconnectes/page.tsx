'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. L'Informatique Embarquée", content: "C'est un ordinateur caché dans un objet (frigo, voiture, montre). Il est dédié à une seule tâche et doit être ultra-fiable.", icon: "📟", color: "border-gray-500" },
  { title: "2. Capteurs vs Actionneurs", content: "Le capteur 'voit' (température, bouton). L'actionneur 'agit' (allumer, chauffer, rouler). Le programme fait le lien entre les deux.", icon: "🔌", color: "border-orange-500", hasLab: true },
  { title: "3. La carte programmable", content: "Au cœur de beaucoup d'objets connectés : le microcontrôleur (Arduino, micro:bit) — un mini-ordinateur sur une seule puce, avec processeur, mémoire et entrées/sorties. On le branche en USB et on le programme… en Python ! Capteur → programme → actionneur : toute l'électronique intelligente tient dans cette chaîne.", icon: "🔧", color: "border-lime-500" },
  { title: "4. L'Interface (IHM)", content: "Interface Homme-Machine. C'est l'écran, les boutons ou la voix qui te permettent de commander l'objet.", icon: "🖱️", color: "border-blue-500" },
  { title: "5. Le Temps Réel", content: "Dans une voiture, freiner doit prendre 2 millisecondes, pas 2 secondes. Le temps réel est une contrainte de sécurité vitale.", icon: "⚠️", color: "border-red-500", hasLab2: true },
  { title: "6. La sécurité IoT", content: "Si ton frigo est connecté mais mal protégé, un hacker peut s'en servir pour entrer dans ton réseau WiFi personnel.", icon: "🛡️", color: "border-indigo-500" },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "La Domotique", desc: "La maison intelligente : confort ultime ou surveillance permanente ?", difficulty: "Débutant" },
      { topic: "Piratage médical", desc: "Peut-on hacker un pacemaker ou une pompe à insuline connectée ?", difficulty: "Avancé" },
      { topic: "Agriculture 2.0", desc: "Comment les capteurs permettent-ils d'économiser l'eau ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Qu'est-ce qu'un actionneur ?", options: ["Un thermomètre", "Un moteur", "Un écran tactile"], correct: 1, explanation: "Un actionneur produit une action physique." },
  { q: "Que signifie IHM ?", options: ["Interface Homme-Machine", "Internet Haut Massive", "Informatique Hybride"], correct: 0, explanation: "C'est le moyen de discuter avec la machine." },
  { q: "Un système embarqué est :", options: ["Polyvalent", "Dédié à une tâche précise", "Toujours très lourd"], correct: 1, explanation: "Il est optimisé pour une seule fonction." },
  { q: "Un microcontrôleur (Arduino, micro:bit), c'est :", options: ["Un mini-ordinateur sur une puce : processeur, mémoire, entrées/sorties", "Un simple capteur de température", "Une antenne Wi-Fi renforcée"], correct: 0, explanation: "Tout tient sur une puce : c'est le cerveau programmable des objets connectés." },
  { q: "« Allumer une LED quand il fait froid » nécessite :", options: ["Un capteur de température, un programme et un actionneur (la LED)", "Juste une LED branchée", "Une connexion Internet obligatoire"], correct: 0, explanation: "Capteur → programme → actionneur : la chaîne de base de tout objet connecté." },
];

export default function IoTChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const nextStep = () => { if (step < LESSON_STEPS.length - 1) setStep(step + 1); else setMode('quiz'); };
  const handleAnswer = (idx: number) => { if (isLocked) return; setSelectedAnswer(idx); setIsLocked(true); if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(score + 1); };
  const nextQuestion = () => { if (quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(quizIdx + 1); setSelectedAnswer(null); setIsLocked(false); } else setMode('resultat'); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 6 : Objets Connectés</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2.5rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight text-left">{LESSON_STEPS[step].title}</h2>
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl group text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6 text-left">{LESSON_STEPS[step].content}</p>
              )}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100 mt-4 text-center italic">
                  <h4 className="text-orange-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left">🧪 LAB : Capteur ou Actionneur ?</h4>
                  <p className="text-xs text-orange-700 mb-4 font-bold italic">« Un détecteur de mouvement »</p>
                  <div className="flex gap-2 justify-center">
                    {['Capteur', 'Actionneur'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Capteur') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Capteur' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-orange-600 border border-orange-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center italic">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left tracking-widest">🧪 LAB : Temps Réel</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold italic italic">Un airbag doit se déclencher :</p>
                  <div className="flex gap-2 justify-center">
                    {['En 10ms', 'En 10 secondes'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'En 10ms') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'En 10ms' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}
        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-8 italic tracking-tighter text-center">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800 shadow-md' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4 shadow-sm text-left">
                <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
              </div>
            )}
          </div>
        )}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500 text-left">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600 text-center">
              <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase text-center">Connecté !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest text-center">Ingénieur IoT</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}