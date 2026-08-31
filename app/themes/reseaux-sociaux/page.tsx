'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. L'Expérience du Petit Monde",
    content: "En 1967, Stanley Milgram a montré que deux inconnus étaient reliés par seulement 6 intermédiaires. Aujourd'hui, avec les réseaux sociaux, ce chiffre est tombé à 3,5 ! C'est ce qu'on appelle le phénomène du 'Petit Monde'.",
    icon: "🌍",
    color: "border-amber-500"
  },
  {
    title: "2. Les Graphes : Le langage des réseaux",
    content: "Pour étudier un réseau, on utilise les Graphes. Un compte = un SOMMET. Une relation = une ARÊTE. Si le lien ne marche que dans un sens (ex: tu suis une star), c'est un graphe ORIENTÉ.",
    icon: "📐",
    color: "border-blue-500",
    hasLab: true // Labo sur les sommets/arêtes
  },
  {
    title: "3. Labo : Calculer une Distance",
    content: "La 'Distance' entre deux sommets, c'est le nombre minimum d'arêtes pour les relier. L'écartement d'un sommet est sa distance maximale vers les autres. Le centre du graphe est le sommet avec l'écartement le plus petit.",
    icon: "🔬",
    color: "border-indigo-500",
    hasLab2: true // Labo sur le calcul de distance
  },
  {
    title: "4. Ton Identité Numérique",
    content: "Il y a ce que tu montres (profil) et ce que tu laisses sans le vouloir (cookies, temps de vue, géolocalisation). Tout cela forme ton Identité Numérique. Ton e-réputation, c'est ce que Google dit de toi.",
    icon: "🔍",
    color: "border-pink-500"
  },
  {
    title: "5. Bulle de Filtres & Algorithmes",
    content: "L'algorithme veut que tu restes sur l'appli. Il te montre donc uniquement ce que tu aimes déjà. C'est la 'Bulle de filtres'. Elle t'empêche de voir des avis différents et peut favoriser les Fake News.",
    icon: "🧼",
    color: "border-yellow-500"
  },
  {
    title: "6. Cyberviolence : Ce que dit la Loi",
    content: "Le cyberharcèlement (insultes répétées, menaces, revenge porn) est puni par le Code Pénal, même sous pseudo. Le respect s'applique aussi derrière un écran. Le numéro à retenir : 3018.",
    icon: "⚖️",
    color: "border-red-500"
  },
  {
    title: "🎤 Missions Exposés",
    isProject: true,
    projects: [
      { topic: "L'Économie de l'attention", desc: "Comment TikTok et Instagram font-ils pour nous garder connectés le plus longtemps possible ?", difficulty: "Intermédiaire" },
      { topic: "Fake News & Élections", desc: "Comment les réseaux sociaux sont devenus des outils d'influence politique majeure ?", difficulty: "Avancé" },
      { topic: "L'influenceur : Un vrai métier ?", desc: "Revenus, responsabilités et impact sur les jeunes : enquête sur un nouveau business.", difficulty: "Débutant" }
    ],
    icon: "🚀",
    color: "border-purple-600"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Dans un graphe, que représente un 'Sommet' ?",
    options: ["Une relation", "Un utilisateur", "Une publicité"],
    correct: 1,
    explanation: "Le sommet est le point qui représente un compte ou un individu."
  },
  {
    q: "Qu'est-ce que le 'Diamètre' d'un graphe ?",
    options: ["Le nombre d'abonnés", "La distance maximale entre deux sommets", "La taille du logo"],
    correct: 1,
    explanation: "C'est la plus longue distance nécessaire pour relier deux personnes dans le réseau."
  },
  {
    q: "L'expérience de Milgram (1967) portait sur :",
    options: ["La dépendance aux écrans", "Les 6 degrés de séparation", "La qualité du WiFi"],
    correct: 1,
    explanation: "Il a prouvé que nous sommes tous reliés par une courte chaîne de connaissances."
  },
  {
    q: "C'est quoi une 'Bulle de Filtres' ?",
    options: ["Une protection antivirus", "Le fait de ne voir que des contenus qui confirment nos opinions", "Un filtre photo"],
    correct: 1,
    explanation: "L'algorithme nous enferme dans ce que nous connaissons déjà."
  },
  {
    q: "La cyberviolence est punie par la loi :",
    options: ["Seulement pour les adultes", "Même si on utilise un pseudonyme", "Uniquement sur Facebook"],
    correct: 1,
    explanation: "L'anonymat relatif n'empêche pas les poursuites pénales."
  }
];

export default function ReseauxSociauxV4() {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans text-left">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Réseaux Sociaux</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>

            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-6xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight text-left italic tracking-tighter uppercase">{LESSON_STEPS[step].title}</h2>
              
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  <p className="text-slate-500 font-bold mb-4 italic">Choisis ton sujet d'exposé :</p>
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl group text-left">
                      <div className="flex justify-between items-start mb-2 text-left">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6 text-left font-bold">{LESSON_STEPS[step].content}</p>
              )}

              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center italic">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left tracking-widest">🧪 LAB : Sommet ou Arête ?</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold italic">« Le trait qui relie deux amis »</p>
                  <div className="flex gap-2 justify-center">
                    {['Sommet', 'Arête'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Arête') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Arête' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 mt-4 text-center italic">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left tracking-widest">🧪 LAB : Distance Mini</h4>
                  <svg viewBox="0 0 200 100" className="bg-white rounded-xl mb-4 p-2 border">
                    <circle cx="30" cy="50" r="6" fill="blue"/>
                    <line x1="36" y1="50" x2="94" y2="50" stroke="black"/>
                    <circle cx="100" cy="50" r="6" fill="blue"/>
                    <line x1="106" y1="50" x2="164" y2="50" stroke="black"/>
                    <circle cx="170" cy="50" r="6" fill="blue"/>
                  </svg>
                  <p className="text-xs text-indigo-700 mb-4 font-bold italic">Distance entre le 1er et le 3ème sommet ?</p>
                  <div className="flex gap-2 justify-center">
                    {['1', '2', '3'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === '2') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === '2' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)] hover:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "PASSER AU QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6 text-left">
            <h2 className="text-2xl font-black mb-8 italic tracking-tighter text-center">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
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
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600 text-center">
              <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase text-center italic tracking-widest">Maître !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest text-center">Architecte du Réseau</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}