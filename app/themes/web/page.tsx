'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Web ≠ Internet", content: "Internet est le réseau de câbles. Le Web est un service qui tourne dessus, comme le Mail ou le FTP. Le Web n'est né qu'en 1989 !", icon: "🌐", color: "border-blue-500" },
  { title: "2. Le CERN & Tim Berners-Lee", content: "Le Web a été inventé à Genève pour aider les scientifiques à partager des documents via des liens HYPERTEXTE. C'est la naissance du HTML.", icon: "📜", color: "border-amber-500" },
  { title: "3. Client-Serveur", content: "Ton navigateur est le CLIENT. Il demande une page au SERVEUR. C'est une discussion permanente en langage HTTP.", icon: "🔄", color: "border-indigo-500", hasLab: true },
  { title: "4. L'URL décortiquée", content: "HTTPS (protocole) + NOM DE DOMAINE + CHEMIN. Chaque page du monde a une adresse unique.", icon: "🔗", color: "border-green-500", hasLab2: true },
  { title: "5. Cookies & Tracking", content: "Les cookies sont des petits fichiers déposés par les sites pour se souvenir de toi. Pratique pour rester connecté, mais dangereux pour ta vie privée.", icon: "🍪", color: "border-orange-500" },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Le Deep Web & Dark Web", desc: "Fantasmes vs Réalité : qu'est-ce qui se cache vraiment dans les zones non-indexées ?", difficulty: "Avancé" },
      { topic: "L'histoire des navigateurs", desc: "De Netscape à Chrome : pourquoi certains ont gagné la guerre du Web ?", difficulty: "Débutant" },
      { topic: "Accessibilité numérique", desc: "Comment le Web s'adapte-t-il aux personnes malvoyantes ou handicapées ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  {
    q: "Quelle est la bonne distinction entre Internet et Web ?",
    options: ["Ils signifient exactement la même chose", "Internet est le réseau, le Web est un service qui l'utilise", "Le Web est le réseau, Internet est un navigateur"],
    correct: 1,
    explanation: "Internet est l'infrastructure mondiale. Le Web est l'une des applications fonctionnant grâce à Internet."
  },
  {
    q: "Qui est à l'origine du World Wide Web ?",
    options: ["Bill Gates", "Tim Berners-Lee", "Mark Zuckerberg"],
    correct: 1,
    explanation: "Tim Berners-Lee a proposé le Web au CERN en 1989 pour faciliter le partage d'informations."
  },
  {
    q: "Dans le modèle client-serveur, qui envoie la demande pour afficher une page ?",
    options: ["Le serveur", "Le routeur", "Le client (navigateur)"],
    correct: 2,
    explanation: "C'est ton navigateur qui fait la requête. Le serveur se contente de répondre à cette demande."
  },
  {
    q: "Que permet le DNS dans le fonctionnement du Web ?",
    options: ["De traduire un nom de domaine (ex: google.fr) en adresse IP", "D'accélérer ton WiFi", "De compresser les images"],
    correct: 0,
    explanation: "Sans DNS, il faudrait taper l'adresse IP à la place du nom de domaine à chaque fois."
  },
  {
    q: "Pourquoi privilégier un site en HTTPS plutôt qu'en HTTP ?",
    options: ["Il charge plus vite", "Les données échangées sont chiffrées et plus sécurisées", "Il consomme moins de données"],
    correct: 1,
    explanation: "Le 'S' signifie Secure. Il protège notamment les mots de passe et les données personnelles."
  }
];

export default function WebChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  
  // Lab 1 : Client/Serveur
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  
  // Lab 2 : Découpage URL
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
    } else {
      setMode('resultat');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* HEADER */}
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 2 : Le Web</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Progression</span>
              <span className="text-xs font-black text-blue-600">{Math.round(((step + 1) / LESSON_STEPS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>

            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-lg transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-2xl font-black mb-4 tracking-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">
                {LESSON_STEPS[step].content}
              </p>

              {/* MINI-LAB 1 : Client / Serveur */}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mt-4">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-wider">🛠️ Mini-Lab : Client ou Serveur ?</h4>
                  <p className="text-sm text-indigo-800 mb-4">Pour chaque situation, indique qui agit.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-xl border border-indigo-100">
                      <p className="text-sm font-bold mb-2">« Ton navigateur affiche la page Wikipédia »</p>
                      <div className="flex gap-2">
                        {['Client', 'Serveur'].map(val => (
                          <button 
                            key={val}
                            onClick={() => {
                              setLab1Answer(val);
                              if(val === 'Client') setBonusXP(prev => prev === 0 ? 100 : prev);
                            }}
                            className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${lab1Answer === val ? (val === 'Client' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-50 text-indigo-600 border border-indigo-100'}`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      {lab1Answer === 'Client' && <p className="text-[10px] text-green-600 font-black mt-2 uppercase tracking-widest">Exact ! Le navigateur est le client. +100 XP</p>}
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-indigo-100">
                      <p className="text-sm font-bold mb-2">« L'ordinateur de Wikipédia envoie les fichiers HTML »</p>
                      <div className="flex gap-2">
                        {['Client', 'Serveur'].map(val => (
                          <button 
                            key={val}
                            onClick={() => {
                              if(val === 'Serveur') setBonusXP(prev => prev < 200 ? 200 : prev);
                              setLab1Answer('Serveur2');
                            }}
                            className={`px-3 py-1.5 text-sm rounded-lg font-bold transition-all ${lab1Answer === 'Serveur2' ? (val === 'Serveur' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-50 text-indigo-600 border border-indigo-100'}`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                      {lab1Answer === 'Serveur2' && <p className="text-[10px] text-green-600 font-black mt-2 uppercase tracking-widest">Exact ! C'est le serveur qui répond. +100 XP</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* MINI-LAB 2 : Découpage URL */}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mt-4">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-wider">🛠️ Mini-Lab : Décomposer une URL</h4>
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 mb-4 font-mono text-sm break-all text-center">
                    https://www.education.gouv.fr/snt/seconde
                  </div>
                  <p className="text-sm text-indigo-800 mb-3">Quel élément correspond au <span className="font-bold">chemin</span> ?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['https://', 'www.education.gouv.fr', '/snt/seconde'].map(val => (
                      <button 
                        key={val}
                        onClick={() => {
                          setLab2Answer(val);
                          if(val === '/snt/seconde') setBonusXP(prev => prev < 300 ? 300 : prev);
                        }}
                        className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-bold transition-all ${lab2Answer === val ? (val === '/snt/seconde' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-100'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {lab2Answer === '/snt/seconde' && <p className="text-[10px] text-green-600 font-black mt-2 text-center uppercase tracking-widest">Bravo ! +100 XP</p>}
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 shadow-[0_8px_0_rgb(30,64,175)] hover:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "PASSER AU QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* MODE QUIZ */}
        {mode === 'quiz' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <h2 className="text-2xl font-black mt-6 tracking-tight">{QUIZ_QUESTIONS[quizIdx].q}</h2>
            </div>

            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                let statusClass = "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50";
                if (isLocked) {
                  if (i === QUIZ_QUESTIONS[quizIdx].correct) statusClass = "bg-green-100 border-green-500 text-green-800 scale-[1.02] shadow-md";
                  else if (i === selectedAnswer) statusClass = "bg-red-100 border-red-500 text-red-800 opacity-60";
                  else statusClass = "bg-white border-slate-100 opacity-40";
                }
                return (
                  <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all duration-300 ${statusClass}`}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {isLocked && (
              <div className="bg-white p-6 rounded-[2rem] border-2 border-indigo-100 shadow-lg animate-in slide-in-from-bottom-8 duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{selectedAnswer === QUIZ_QUESTIONS[quizIdx].correct ? '✅' : '❌'}</span>
                  <span className="font-black text-indigo-600 uppercase text-xs tracking-widest">Explication</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-5">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700">
                  {quizIdx === QUIZ_QUESTIONS.length - 1 ? "VOIR MON RÉSULTAT" : "QUESTION SUIVANTE"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE RÉSULTAT */}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-b-[12px] border-blue-600">
              <div className="text-7xl mb-6">🚀</div>
              <h2 className="text-4xl font-black mb-2 tracking-tighter">Mission réussie !</h2>
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-8">Tu connais les fondements du Web</p>
              
              <div className="flex justify-center gap-5 my-8">
                <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100">
                  <div className="text-2xl font-black text-blue-600">{score}/{QUIZ_QUESTIONS.length}</div>
                  <div className="text-[10px] uppercase text-slate-400 font-black tracking-[0.2em] mt-1">Bonnes réponses</div>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100">
                  <div className="text-2xl font-black text-indigo-600">+{score * 100 + bonusXP}</div>
                  <div className="text-[10px] uppercase text-slate-400 font-black tracking-[0.2em] mt-1">Total XP</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white relative overflow-hidden shadow-xl">
                <div className="relative z-10 text-blue-200 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Badge Débloqué</div>
                <div className="relative z-10 text-2xl font-black tracking-tight uppercase">Explorateur du Web</div>
                <div className="absolute -right-5 -bottom-5 text-8xl opacity-20 rotate-12">🧭</div>
              </div>
            </div>

            <Link href="/themes" className="block w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-xl">
              RETOUR AUX THÈMES
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}