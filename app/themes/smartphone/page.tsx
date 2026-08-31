'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Comprendre son stockage", content: "Un téléphone qui rame, c'est souvent un stockage plein. Va dans Réglages > Général > Stockage. Supprime les vidéos inutiles, les applis que tu n'utilises plus et vide le cache des applis (YouTube, WhatsApp...).", icon: "💾", color: "border-pink-500" },
  { title: "2. Les autorisations, c'est vital", content: "Pourquoi une lampe torche a-t-elle besoin d'accéder à tes contacts ? Réponse : elle n'en a pas besoin. Dans Réglages > Confidentialité, vérifie quelles applis ont accès à ta localisation, ton micro et tes photos. Bloques celles qui abusent.", icon: "🔒", color: "border-fuchsia-500", hasLab: true },
  { title: "3. Le verrouillage et l'anti-vol", content: "Active le code PIN, le schéma ou l'empreinte pour que personne ne puisse ouvrir ton téléphone. Active aussi la fonction « Trouver mon iPhone » ou « Localiser mon appareil » pour le retrouver en cas de perte.", icon: "🔐", color: "border-rose-500" },
  { title: "4. La double authentification (2FA)", content: "C'est LA protection ultime pour tes comptes (Instagram, Discord, banque). Active la vérification en deux étapes : même si quelqu'un connaît ton mot de passe, il ne pourra pas se connecter sans le code envoyé sur ton téléphone.", icon: "🛡️", color: "border-pink-400", hasLab2: true },
  { title: "5. Le mode « Ne pas déranger »", content: "Apprends à couper les notifications pendant les cours ou la nuit. Réglages > Concentrations > Ne pas déranger. Ton téléphone devient ton outil, plus ton maître.", icon: "📵", color: "border-pink-200" },
  { title: "🎤 Mission : Numérique Responsable", isProject: true, projects: [
      { topic: "Audit de ton téléphone", desc: "Compte combien d'applications ont accès à ta localisation. En as-tu vraiment besoin ?", difficulty: "Intermédiaire" },
      { topic: "Mettre en place la 2FA", desc: "Protège ton compte principal (mail, robin des bois ?) avec la double authentification.", difficulty: "Avancé" }
    ], icon: "📱", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Pourquoi ranger des photos dans le cloud ?", options: ["Pour les perdre", "Pour libérer de l'espace sur ton téléphone", "Pour qu'elles soient publiques"], correct: 1, explanation: "Le cloud reste en ligne et ne prend pas de place sur ton appareil." },
  { q: "Une appli de lampe torche demande ta localisation, tu fais quoi ?", options: ["J'accepte, c'est bizarre mais ok", "Je refuse, elle n'en a pas besoin", "Je supprime l'appli"], correct: 1, explanation: "Une lampe torche n'a besoin de rien d'autre que de la caméra. Vérifie les permissions." },
  { q: "La double authentification sert à ?", options: ["Ralentir Internet", "Empêcher quelqu'un de se connecter à ton compte même avec ton mot de passe", "À faire des photos plus belles"], correct: 1, explanation: "Le 2FA demande un code supplémentaire au moment de la connexion. Ton compte est blindé !" }
];

export default function SmartphoneChapter() {
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
        <Link href="/themes" className="text-pink-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Maîtrise ton Smartphone</div>
        <div className="text-pink-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-pink-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
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
                <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-100 mt-4 text-center">
                  <h4 className="text-pink-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Autorisations</h4>
                  <p className="text-xs text-pink-700 mb-4 font-bold">Une appli de jeu demande ta localisation, tu acceptes ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Oui', 'Non'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Non') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Non' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-pink-600 border border-pink-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-100 mt-4 text-center">
                  <h4 className="text-rose-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Sécurité</h4>
                  <p className="text-xs text-rose-700 mb-4 font-bold">Qu'est-ce qui protège ton compte même si ton mot de passe est volé ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Le code PIN', 'La double authentification'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'La double authentification') setBonusXP(200); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'La double authentification' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-rose-600 border border-rose-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-pink-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(157,23,77)] active:shadow-none active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8 text-pink-700">Défi Smartphone ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-pink-100 border-pink-500 text-pink-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-pink-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {isLocked && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-pink-500 text-sm">
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
            <div className="text-8xl">📱</div>
            <h2 className="text-4xl font-black">Boss du Téléphone !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Points gagnés</p>
              <div className="text-6xl font-black text-pink-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-pink-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}