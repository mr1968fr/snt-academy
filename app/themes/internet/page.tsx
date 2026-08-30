'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. Ce n'est pas du nuage !",
    content: "On parle souvent du 'Cloud', mais Internet est très physique. Ce sont des millions de kilomètres de câbles sous-marins en fibre optique qui relient les continents. Si tu envoies un Snap à un ami aux USA, l'info passe sous l'océan à la vitesse de la lumière.",
    icon: "🔌",
    color: "border-blue-500"
  },
  {
    title: "2. L'adresse IP",
    content: "Pour que les données arrivent au bon endroit, chaque appareil (ton téléphone, le serveur de TikTok) possède une adresse unique : l'adresse IP. C'est comme l'adresse postale de ta maison, mais pour le réseau.",
    icon: "🏠",
    color: "border-indigo-500"
  },
  {
    title: "3. Le DNS : l'annuaire",
    content: "C'est dur de retenir que Google c'est 142.250.179.78. Alors on a inventé le DNS. C'est un serveur qui traduit 'google.fr' en adresse IP. C'est le répertoire de ton téléphone, mais pour tout le Web.",
    icon: "📖",
    color: "border-green-500"
  },
  {
    title: "4. Les Paquets",
    content: "Une photo ou une vidéo est trop lourde pour être envoyée d'un coup. Internet la découpe en petits morceaux appelés 'paquets'. Ils voyagent séparément et sont reconstitués à l'arrivée. C'est comme envoyer un Lego en pièces détachées par la poste !",
    icon: "📦",
    color: "border-orange-500"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Comment les données traversent-elles majoritairement les océans ?",
    options: ["Par satellite", "Par des câbles sous-marins", "Par les ondes radio"],
    correct: 1,
    explanation: "99% du trafic internet mondial passe par des câbles de fibre optique posés au fond des océans."
  },
  {
    q: "À quoi sert le protocole IP ?",
    options: ["À crypter les messages", "À donner une adresse unique à chaque appareil", "À accélérer la connexion"],
    correct: 1,
    explanation: "L'adresse IP permet d'identifier la source et la destination de chaque paquet de données."
  },
  {
    q: "Quel est le rôle du DNS ?",
    options: ["Stocker tes photos", "Traduire un nom de domaine en adresse IP", "Découper les fichiers en paquets"],
    correct: 1,
    explanation: "Le DNS évite d'avoir à retenir les suites de chiffres des adresses IP."
  }
];

export default function InternetChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="bg-slate-100 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500">
          Thème 1 : Internet
        </div>
        <div className="text-blue-600 font-black">XP: {score * 50}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-12">
        {mode === 'cours' && (
          <div className="space-y-8">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-3xl border-b-8 shadow-sm ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-2xl font-black mb-4">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed italic italic">"{LESSON_STEPS[step].content}"</p>
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-lg">
              {step === LESSON_STEPS.length - 1 ? "PASSER AU QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}</span>
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
                  <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-5 rounded-2xl border-2 text-left font-bold transition-all ${bgColor}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {isLocked && (
              <div className="bg-white p-6 rounded-3xl border-2 border-indigo-50 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                <p className="text-slate-600 text-sm mb-4"><span className="font-bold text-indigo-600 uppercase mr-2 text-xs">Le savais-tu ?</span>{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
              </div>
            )}
          </div>
        )}

        {mode === 'resultat' && (
          <div className="text-center space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border-t-8 border-blue-600">
              <div className="text-7xl mb-6">🛰️</div>
              <h2 className="text-4xl font-black mb-2">Connecté !</h2>
              <p className="text-slate-500 mb-6 font-bold">Tu maîtrises les bases d&apos;Internet.</p>
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border">
                  <div className="text-2xl font-black text-blue-600">{score}/{QUIZ_QUESTIONS.length}</div>
                  <div className="text-xs uppercase text-slate-400 font-bold tracking-widest">Score</div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                <div className="text-blue-800 font-bold uppercase text-xs tracking-[0.2em] mb-2">Badge Débloqué</div>
                <div className="text-2xl font-black text-blue-900 uppercase">Maître du Réseau</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all">RETOUR AUX THÈMES</Link>
          </div>
        )}
      </div>
    </div>
  );
}