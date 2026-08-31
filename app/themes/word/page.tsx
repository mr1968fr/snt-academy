'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. La structure d'abord", content: "L'erreur classique : mettre en gras et agrandir la police à la main. Pour un document pro, on utilise les STYLES (Titre 1, Titre 2, Corps de texte). Cela permet à l'ordinateur de comprendre la hiérarchie de ton travail.", icon: "🏗️", color: "border-blue-500" },
  { title: "2. Le Sommaire Automatique", content: "Si tu as bien utilisé les styles, Word peut générer ta table des matières en 1 clic. Plus besoin de taper les numéros de page à la main : si tu ajoutes du texte, le sommaire se met à jour tout seul !", icon: "📖", color: "border-indigo-500", hasLab: true },
  { title: "3. Les Sauts de Page", content: "N'appuie jamais 15 fois sur 'Entrée' pour passer à la page suivante. Utilise 'Saut de page' (Ctrl + Entrée). Ainsi, même si tu ajoutes du texte au-dessus, ton nouveau chapitre restera bien calé en haut de sa page.", icon: "📑", color: "border-blue-400" },
  { title: "4. Habillage d'image", content: "Par défaut, une image bloque le texte. En changeant l'habillage (ex: 'Carré' ou 'Devant le texte'), tu peux la déplacer librement où tu veux sur la page sans tout décaler.", icon: "🖼️", color: "border-cyan-500" },
  { title: "5. Raccourcis d'efficacité", content: "Gagne un temps fou avec les basiques : Ctrl+C (copier), Ctrl+V (coller), Ctrl+Z (annuler l'erreur) et Ctrl+S (sauvegarder tout le temps !).", icon: "⌨️", color: "border-slate-700" },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "L'évolution de l'écriture", desc: "De la plume à Word : comment les outils ont changé notre façon de penser et d'écrire ?", difficulty: "Débutant" },
      { topic: "Le format PDF", desc: "Pourquoi est-il devenu le standard mondial pour partager des documents ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Quelle méthode permet de créer un sommaire automatique ?", options: ["Recopier les titres à la main", "Utiliser les Styles (Titre 1, 2...)", "Souligner tous les titres"], correct: 1, explanation: "Les styles permettent à Word d'identifier les chapitres." },
  { q: "Quel raccourci permet de passer à la page suivante proprement ?", options: ["Espace", "Ctrl + Entrée", "Entrée 20 fois"], correct: 1, explanation: "Le saut de page garantit une mise en page stable." },
  { q: "Que fait le raccourci Ctrl + Z ?", options: ["Il ferme Word", "Il annule la dernière action", "Il enregistre le fichier"], correct: 1, explanation: "C'est l'outil indispensable pour corriger une erreur immédiate." }
];

export default function WordChapter() {
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
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Initiation Word</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl transition-all border-2 ${LESSON_STEPS[step].color}`}>
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
                <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Organisation</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold">Lequel permet de générer un sommaire automatiquement ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Les Couleurs', 'Les Styles'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Les Styles') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Les Styles' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)] active:shadow-none active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8">Défi Rapide ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-blue-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {isLocked && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500 text-sm">
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
            <div className="text-8xl">🏆</div>
            <h2 className="text-4xl font-black">Module Terminé !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Ton Score</p>
              <div className="text-6xl font-black text-blue-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}