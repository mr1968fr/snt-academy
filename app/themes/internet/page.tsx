'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. Le Cloud n'existe pas",
    content: "Internet est ultra-physique. 99% du trafic mondial passe par des câbles sous-marins en fibre optique. Si tu envoies un Snap aux USA, l'info traverse l'océan à la vitesse de la lumière sous 4000m d'eau.",
    icon: "🔌",
    color: "border-blue-500"
  },
  {
    title: "2. Adresse IP & DNS",
    content: "Chaque machine a une adresse unique : l'adresse IP. Le DNS est l'annuaire qui traduit 'google.fr' en adresse IP chiffrée. C'est le répertoire de ton téléphone, mais pour la planète entière.",
    icon: "🆔",
    color: "border-indigo-500",
    hasLab: true
  },
  {
    title: "3. Le Routage",
    content: "Tes données sont découpées en PAQUETS. Ils ne prennent pas tous le même chemin : des ROUTEURS choisissent la route la plus rapide en temps réel. C'est ce qui rend Internet indestructible.",
    icon: "🛣️",
    color: "border-orange-500"
  },
  {
    title: "4. Protocoles TCP/IP",
    content: "TCP vérifie que tous les paquets sont bien arrivés et les remet dans l'ordre. IP s'occupe de l'adressage. C'est le langage universel qui permet à toutes les machines du monde de se comprendre.",
    icon: "🌐",
    color: "border-green-500"
  },
  {
    title: "5. Labo : Tracé de route",
    content: "Grâce à la commande 'traceroute', on peut voir tous les routeurs par lesquels passe une donnée. C'est comme suivre un colis Amazon à chaque entrepôt !",
    icon: "📍",
    color: "border-red-500",
    hasLab2: true
  },
  {
    title: "🎤 Missions Exposés",
    isProject: true,
    projects: [
      { topic: "Géopolitique des câbles", desc: "Pourquoi les câbles sous-marins sont-ils devenus des cibles militaires prioritaires ?", difficulty: "Avancé" },
      { topic: "Internet et Écologie", desc: "Le coût environnemental caché de tes e-mails et du streaming vidéo 4K.", difficulty: "Débutant" },
      { topic: "La neutralité du Net", desc: "Pourquoi tous les paquets doivent-ils être traités de la même façon par les opérateurs ?", difficulty: "Intermédiaire" }
    ],
    icon: "🚀",
    color: "border-purple-600"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Lequel de ces composants est un CAPTEUR ?",
    options: ["Une ampoule", "Un détecteur de présence", "Un moteur électrique"],
    correct: 1,
    explanation: "Le détecteur de présence capte une information de l'environnement."
  },
  {
    q: "Que fait un ACTIONNEUR ?",
    options: ["Il mesure la température", "Il transforme un signal en action physique", "Il stocke des photos"],
    correct: 1,
    explanation: "Un actionneur agit sur le monde réel (ex: ouvrir une porte)."
  },
  {
    q: "Que signifie IHM ?",
    options: ["Informatique à Haute Mobilité", "Interface Homme-Machine", "Instruction Hybride Moderne"],
    correct: 1,
    explanation: "C'est l'interface qui permet à l'humain d'interagir avec la machine."
  },
  {
    q: "Une contrainte 'Temps Réel' signifie que :",
    options: ["Le système doit répondre dans un délai maximum garanti", "Le système affiche l'heure exacte", "Le système fonctionne sans électricité"],
    correct: 0,
    explanation: "La rapidité de réponse est cruciale pour la sécurité (ex: airbags)."
  },
  {
    q: "Quel est le risque majeur des objets connectés ?",
    options: ["Ils pèsent trop lourd", "Ils peuvent être piratés s'ils sont mal protégés", "Ils ne fonctionnent que le jour"],
    correct: 1,
    explanation: "La cybersécurité est le grand défi de l'IoT."
  }
];

export default function IoTChapter() {
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
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Objets Connectés</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">{LESSON_STEPS[step].content}</p>

              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mt-4 text-center italic font-medium">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Le cerveau de la machine</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold">Complète le programme du ventilateur :</p>
                  <div className="bg-white p-3 rounded-xl font-mono text-xs mb-4 text-left border">
                    SI temperature &gt; 25 : <br/>
                    &nbsp;&nbsp;[?] VENTILO<br/>
                    SINON : <br/>
                    &nbsp;&nbsp;ETEINDRE VENTILO
                  </div>
                  <div className="flex gap-2 justify-center">
                    {['ALLUMER', 'CASSER', 'CHARGER'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'ALLUMER') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'ALLUMER' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 mt-4 text-center italic font-medium">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Urgence Temps Réel</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold">Un obstacle est détecté par la voiture autonome !</p>
                  <div className="flex gap-4 justify-center items-center py-4 bg-white rounded-xl mb-4">
                    <div className="animate-ping w-8 h-8 bg-red-500 rounded-full"></div>
                    <span className="font-black text-red-600">!! OBSTACLE !!</span>
                  </div>
                  <button onClick={() => { setLab2Answer('FREINER'); setBonusXP(prev => prev < 300 ? 300 : prev); }} className={`w-full py-4 rounded-xl font-black text-white transition-all ${lab2Answer === 'FREINER' ? 'bg-green-500' : 'bg-red-600 animate-pulse'}`}>CLIQUE POUR FREINER !</button>
                  {lab2Answer === 'FREINER' && <p className="text-[10px] text-green-600 font-black mt-3 uppercase tracking-widest italic">Réaction en 5ms. Système sécurisé ! +150 XP</p>}
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* QUIZ & RESULTATS (Format Standard V4) */}
        {mode === 'quiz' && (
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black mb-8 italic tracking-tighter italic">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
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
                    <h2 className="text-5xl font-black mb-2 tracking-tighter italic text-blue-600 uppercase">Connecté !</h2>
                    <div className="text-6xl font-black my-8 italic">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 text-blue-200 font-black uppercase text-[10px] tracking-[0.3em] mb-2 uppercase font-black">Grade débloqué</div>
                        <div className="relative z-10 text-2xl font-black tracking-tight uppercase leading-none">Ingénieur IoT</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}