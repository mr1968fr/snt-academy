'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Ne pars jamais de zéro", content: "La règle d'or sur Canva : utilise les MODÈLES (Templates). Pourquoi s'embêter avec une page blanche quand des pros ont déjà créé des mises en page parfaites ? Il te suffit de changer le texte et les couleurs.", icon: "📄", color: "border-cyan-500" },
  { title: "2. La Hiérarchie visuelle", content: "Dans un visuel, on doit voir le plus important en premier. Utilise la TAILLE et le CONTRASTE. Ton titre doit être énorme, tes infos secondaires plus petites. Si tout est gros, rien n'est important !", icon: "⚖️", color: "border-purple-500", hasLab: true },
  { title: "3. Les Éléments et Cadres", content: "Pour que tes photos soient jolies, utilise les 'Cadres' (Frames). Fais glisser une image dans un rond ou une forme spéciale. Utilise les 'Éléments' pour ajouter des icônes simples qui illustrent tes propos.", icon: "🖼️", color: "border-blue-400" },
  { title: "4. La règle des 3 couleurs", content: "Trop de couleurs tue le design. Choisis une couleur principale, une couleur secondaire et une couleur d'accent (souvent pour les boutons ou les titres). Canva te propose des palettes qui vont bien ensemble automatiquement.", icon: "🎨", color: "border-cyan-400", hasLab2: true },
  { title: "5. Exporter au bon format", content: "Une affiche ? Export en 'PDF pour impression'. Un post Insta ? Export en 'PNG'. Une présentation ? Utilise le mode 'Présenter' directement dans le navigateur pour épater ton prof.", icon: "📤", color: "border-indigo-600" },
  { title: "🎤 Mission : Création", isProject: true, projects: [
      { topic: "Affiche d'événement", desc: "Crée une affiche pour le club informatique du lycée en utilisant seulement 2 polices différentes.", difficulty: "Débutant" },
      { topic: "Infographie SNT", desc: "Résume le fonctionnement d'Internet en une seule image verticale claire.", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Quelle est la meilleure façon de commencer un projet sur Canva ?", options: ["Partir d'une page blanche", "Utiliser un modèle (template)", "Dessiner à la main levée"], correct: 1, explanation: "Les modèles permettent de gagner un temps fou et d'avoir un design pro immédiatement." },
  { q: "Qu'est-ce que la hiérarchie visuelle ?", options: ["Mettre toutes les photos à la même taille", "Mettre les informations importantes plus en avant (taille, couleur)", "Ranger ses fichiers par date"], correct: 1, explanation: "Elle permet de guider l'œil du lecteur vers l'essentiel." },
  { q: "Quel format choisir pour imprimer une affiche en haute qualité ?", options: ["JPG", "GIF", "PDF pour impression"], correct: 2, explanation: "Le PDF conserve la qualité des textes et des images pour l'imprimante." }
];

export default function CanvaChapter() {
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
        <Link href="/themes" className="text-cyan-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Design & Visuels (Canva)</div>
        <div className="text-cyan-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl border-2 transition-all ${LESSON_STEPS[step].color}`}>
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
                <div className="bg-cyan-50 p-6 rounded-3xl border-2 border-cyan-100 mt-4 text-center">
                  <h4 className="text-cyan-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Impact</h4>
                  <p className="text-xs text-cyan-700 mb-4 font-bold">Comment attirer l'oeil sur le titre principal ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Le mettre en petit', 'Le mettre en gras et grand'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Le mettre en gras et grand') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Le mettre en gras et grand' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-cyan-600 border border-cyan-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-cyan-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(8,145,178)] active:shadow-none active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8 text-cyan-700">Défi Design ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-cyan-100 border-cyan-500 text-cyan-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-cyan-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {isLocked && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-cyan-500 text-sm">
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
            <div className="text-8xl">🎨</div>
            <h2 className="text-4xl font-black">Designer Certifié !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Points gagnés</p>
              <div className="text-6xl font-black text-cyan-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-cyan-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}