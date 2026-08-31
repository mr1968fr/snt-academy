'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Le piège à clics (Clickbait)", content: "Les Fake News sont conçues pour provoquer une émotion forte (peur, colère, surprise). Si un titre te fait bondir, méfie-toi : c'est peut-être un piège pour que tu partages sans réfléchir.", icon: "🪤", color: "border-red-500" },
  { title: "2. Vérifier la source", content: "Qui a écrit ça ? Un site connu comme Le Monde ou une page inconnue appelée 'Info-Verite-Absolue.net' ? Regarde l'URL et cherche la rubrique 'Qui sommes-nous' sur le site.", icon: "🔍", color: "border-orange-500", hasLab: true },
  { title: "3. La recherche d'image inversée", content: "Une photo de guerre ou de catastrophe peut être ancienne et venir d'un autre pays. Utilise Google Images ou TinEye pour voir quand la photo est apparue pour la première fois sur le web.", icon: "🖼️", color: "border-red-400" },
  { title: "4. Les Deepfakes et l'IA", content: "Aujourd'hui, on peut faire dire n'importe quoi à n'importe qui en vidéo grâce à l'IA. Regarde les détails : les yeux qui ne clignent pas, les cheveux bizarres ou la peau trop lisse sont des indices de trucage.", icon: "🤖", color: "border-rose-500" },
  { title: "5. Recouper l'information", content: "Une info est rarement seule. Si une nouvelle incroyable est vraie, elle sera reprise par plusieurs médias sérieux. Si un seul site en parle, c'est probablement faux.", icon: "🗞️", color: "border-red-600", hasLab2: true },
  { title: "🎤 Mission : Fact-Checker", isProject: true, projects: [
      { topic: "Chasse aux Fake News", desc: "Trouve un exemple de Fake News qui a circulé récemment et explique pourquoi les gens y ont cru.", difficulty: "Débutant" },
      { topic: "Débusquer le trucage", desc: "Prends une image virale et utilise la recherche inversée pour trouver sa véritable origine.", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Qu'est-ce qu'une Fake News cherche à provoquer en priorité ?", options: ["Une émotion forte", "Une réflexion calme", "L'envie de lire un livre"], correct: 0, explanation: "Les Fake News jouent sur nos émotions pour se propager plus vite." },
  { q: "Comment vérifier l'origine d'une photo suspecte ?", options: ["En demandant à ses amis", "En faisant une recherche d'image inversée", "En l'imprimant"], correct: 1, explanation: "La recherche inversée permet de retrouver la première publication d'une photo." },
  { q: "Une info incroyable n'est présente que sur un seul blog inconnu. Que fais-tu ?", options: ["Je la partage sur TikTok", "J'attends qu'elle soit confirmée par d'autres médias sérieux", "Je la crois immédiatement"], correct: 1, explanation: "La confirmation par plusieurs sources indépendantes est la base du journalisme." }
];

export default function FakeNewsChapter() {
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
  const nextQuiz = () => { if (quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(quizIdx + 1); setSelectedAnswer(null); setIsLocked(false); } else { setMode('resultat'); } };
  const replay = () => { setMode('cours'); setStep(0); setQuizIdx(0); setScore(0); setBonusXP(0); setLab1Answer(null); setLab2Answer(null); setSelectedAnswer(null); setIsLocked(false); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-red-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Vérifier l&apos;info</div>
        <div className="text-red-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
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
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Réflexe</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold">Tu vois une info révoltante, quel est ton premier réflexe ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Partager direct', 'Chercher la source'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if (val === 'Chercher la source') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Chercher la source' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Recoupement</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold">Trois sites parlent de la même info : deux sérieux, un inconnu. Que fais-tu ?</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['Je partage direct', 'Je compare les sources', 'Je supprime tout'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if (val === 'Je compare les sources') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Je compare les sources' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(153,27,27)] transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}
        {mode === 'quiz' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border-b-[10px] border-red-600 border-2 shadow-xl">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}</div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">{QUIZ_QUESTIONS[quizIdx].q}</h2>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={isLocked}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold border-2 transition-all ${
                      selectedAnswer === null
                        ? 'bg-white border-slate-200 hover:border-red-400'
                        : i === QUIZ_QUESTIONS[quizIdx].correct
                          ? 'bg-green-500 text-white border-green-500'
                          : i === selectedAnswer
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white border-slate-200 opacity-50'
                    }`}>{opt}</button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className="mt-6 p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
                  <p className="text-sm text-slate-600 font-bold">💡 {QUIZ_QUESTIONS[quizIdx].explanation}</p>
                  <button onClick={nextQuiz} className="mt-4 w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_rgb(153,27,27)]">
                    {quizIdx === QUIZ_QUESTIONS.length - 1 ? 'RÉSULTAT 🏁' : 'SUIVANT →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {mode === 'resultat' && (
          <div className="p-8 bg-white rounded-[2rem] border-b-[10px] border-red-600 border-2 shadow-xl text-center space-y-6">
            <div className="text-6xl">{score === QUIZ_QUESTIONS.length ? '🏆' : score >= QUIZ_QUESTIONS.length - 1 ? '🎉' : '📚'}</div>
            <h2 className="text-3xl font-black">Score : {score} / {QUIZ_QUESTIONS.length}</h2>
            <div className="text-2xl font-black text-red-600">XP gagnés : {score * 100 + bonusXP}</div>
            <p className="text-slate-600 font-bold">
              {score === QUIZ_QUESTIONS.length
                ? 'Sans faute ! Tu es un vrai fact-checker.'
                : score >= QUIZ_QUESTIONS.length - 1
                  ? 'Très bien ! Encore un petit effort pour le sans-faute.'
                  : 'Rejoue le cours pour devenir un as de la vérification.'}
            </p>
            <div className="flex gap-3">
              <button onClick={replay} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black">🔄 Rejouer</button>
              <Link href="/themes" className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black inline-flex items-center justify-center">🗺️ Thèmes</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
