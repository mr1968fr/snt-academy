'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
    { title: "1. Le Photosite", content: "Le capteur de ton tel est une grille de millions de photosites. Ils captent la lumière et la transforment en électricité, puis en chiffres.", icon: "📸", color: "border-purple-500" },
    { title: "2. Le Pixel", content: "Picture Element. C'est le plus petit carré de couleur de ton image. Plus il y en a, plus l'image est nette (Résolution).", icon: "⬛", color: "border-blue-500", hasLab: true },
    { title: "3. La couleur RVB", content: "Rouge + Vert + Bleu. En mélangeant ces 3 couleurs de 0 à 255, on crée 16 millions de nuances sur ton écran.", icon: "🌈", color: "border-pink-500" },
    { title: "4. Métadonnées EXIF", content: "Une photo contient ton GPS, l'heure, et le modèle de ton tel. Utile pour trier, mais dangereux pour ta vie privée.", icon: "🔍", color: "border-indigo-500", hasLab2: true },
    { title: "5. Retouche et IA", content: "Aujourd'hui, l'IA 'invente' des pixels pour améliorer tes photos de nuit ou supprimer des objets. La photo n'est plus une preuve du réel.", icon: "✨", color: "border-amber-500" },
    { title: "🎤 Missions Exposés", isProject: true, projects: [
        { topic: "Les Deepfakes", desc: "Comment l'IA peut créer des vidéos truquées impossibles à distinguer du vrai ?", difficulty: "Avancé" },
        { topic: "Droit à l'image", desc: "Quelles sont les règles pour publier la photo de quelqu'un sur les réseaux ?", difficulty: "Débutant" },
        { topic: "Reconnaissance faciale", desc: "Sécurité ou fin de l'anonymat dans l'espace public ?", difficulty: "Intermédiaire" }
      ], icon: "🚀", color: "border-purple-600" }
  ];

const QUIZ_QUESTIONS = [
  {
    q: "Qu'est-ce qu'un photosite ?",
    options: ["Un filtre de couleur", "Un composant qui capte la lumière", "Une application de retouche"],
    correct: 1,
    explanation: "Le photosite est l'élément physique du capteur qui reçoit les photons."
  },
  {
    q: "Que signifie RVB ?",
    options: ["Rouge, Vert, Bleu", "Réseau de Vidéo Basique", "Résolution Variable Binaire"],
    correct: 0,
    explanation: "C'est le modèle de synthèse additive utilisé par nos écrans."
  },
  {
    q: "Quel format d'image utilise la compression avec perte ?",
    options: ["RAW", "PNG", "JPEG"],
    correct: 2,
    explanation: "Le JPEG réduit le poids du fichier en supprimant des détails invisibles à l'œil nu."
  },
  {
    q: "Les métadonnées EXIF d'une photo peuvent contenir :",
    options: ["La météo", "Les coordonnées GPS du lieu de prise de vue", "Le prix du téléphone"],
    correct: 1,
    explanation: "Beaucoup de smartphones intègrent la position GPS dans les fichiers photo par défaut."
  },
  {
    q: "Si j'augmente le nombre de pixels, j'augmente :",
    options: ["Le volume du son", "La résolution de l'image", "La luminosité de la pièce"],
    correct: 1,
    explanation: "Plus de pixels signifie une image plus détaillée (résolution plus haute)."
  }
];

export default function PhotoChapter() {
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
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Photo Numérique</div>
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
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Le poids d'une image</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold italic">Une image de 10 pixels sur 10 pixels contient combien de pixels au total ?</p>
                  <div className="flex gap-2 justify-center">
                    {['20', '100', '1000'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === '100') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === '100' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}

              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-indigo-50 p-6 rounded-2xl border-2 border-indigo-100 mt-4 text-center italic font-medium">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Espionnage Photo</h4>
                  <p className="text-xs text-indigo-800 mb-4 font-bold italic text-left">Fichier : Vacances.jpg <br/> EXIF : ISO 100, F/2.8, GPS: 48.8 N, 2.3 E</p>
                  <p className="text-sm text-indigo-900 font-bold mb-3">Est-ce que cette photo révèle où elle a été prise ?</p>
                  <div className="flex gap-2 justify-center">
                    {['OUI', 'NON'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'OUI') setBonusXP(prev => prev < 300 ? 300 : prev); }} className={`px-6 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'OUI' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "DÉFI FINAL ⚡️" : "SUIVANT →"}
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
                    <h2 className="text-5xl font-black mb-2 tracking-tighter italic text-blue-600 uppercase italic">Développé !</h2>
                    <div className="text-6xl font-black my-8 italic">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
                    <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10 text-blue-200 font-black uppercase text-[10px] tracking-[0.3em] mb-2 uppercase font-black tracking-widest">Grade débloqué</div>
                        <div className="relative z-10 text-2xl font-black tracking-tight uppercase leading-none italic">Maître du Pixel</div>
                    </div>
                </div>
                <Link href="/themes" className="block w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
            </div>
        )}
      </div>
    </div>
  );
}