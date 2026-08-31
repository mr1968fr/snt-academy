'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Un objet clair et court", content: "Le sujet de ton mail est la première chose que le prof voit. Écris « DM de math – Exercice 3 » plutôt que « Bonjour monsieur ». Tu gagnes du temps et tu montres que tu es organisé.", icon: "🎯", color: "border-orange-500" },
  { title: "2. Le corps du message", content: "Commence par une formule de politesse adaptée : « Bonjour Monsieur » ou « Madame ». Écris des phrases courtes. Termine toujours par « Cordialement » pour un prof, « Merci » pour un ami.", icon: "✍️", color: "border-amber-500", hasLab: true },
  { title: "3. Les pièces jointes", content: "Pour envoyer un fichier, clique sur « Joindre » (le trombone 🖇️). Vérifie toujours le nom du fichier (ex: `Dupont_Exposé_SNT.pdf`) et le poids. Ne dépasse jamais 10 Mo en général.", icon: "📎", color: "border-orange-400" },
  { title: "4. Le phishing, le piège du prof", content: "Un mail qui te demande ton mot de passe ou qui t’annonce que ton compte sera bloqué ? C’est sûrement une arnaque. Vérifie l’adresse de l’expéditeur : `support@discord-app.com` peut être faux.", icon: "🕵️", color: "border-rose-500", hasLab2: true },
  { title: "5. Répondre à un mail", content: "Quand tu réponds, garde le fil de la conversation : ne crée pas un nouveau mail à chaque fois. Utilise « Répondre » pour que la discussion reste regroupée dans la boîte de ton destinataire.", icon: "🔁", color: "border-orange-200" },
  { title: "🎤 Mission : Communication", isProject: true, projects: [
      { topic: "Rédige un mail de demande de stage", desc: "Un mail de 5 lignes à un professionnel pour demander un stage d’observation.", difficulty: "Débutant" },
      { topic: "Analyse d’un phishing", desc: "Trouve 3 indices qui prouvent qu’un mail est une tentative d’arnaque.", difficulty: "Intermédiaire" }
    ], icon: "📨", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Que faut-il mettre dans l'objet d'un mail professionnel ?", options: ["Rien, c'est facultatif", "Un résumé clair du message (ex: DM maths)", "Le nom de ton animal de compagnie"], correct: 1, explanation: "Un objet clair permet au destinataire de comprendre le but du mail en un coup d'œil." },
  { q: "Un mail de ton banquier te demande ton mot de passe, que fais-tu ?", options: ["Tu réponds vite pour ne pas bloquer ton compte", "Tu cliques sur le lien", "Tu supprimes et tu le signales à ton prof"], correct: 2, explanation: "Un organisme sérieux ne te demandera JAMAIS ton mot de passe par mail. C'est du phishing." },
  { q: "Pour répondre à un mail de ton prof, tu utilises ?", options: ["Répondre (pour garder la conversation)", "Créer un nouveau mail", "Tu n'as pas besoin de répondre"], correct: 0, explanation: "Répondre garde tout dans la même discussion, plus simple pour ton prof." }
];

export default function EmailChapter() {
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
        <Link href="/themes" className="text-orange-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">E-mails & Communication</div>
        <div className="text-orange-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
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
                <div className="bg-orange-50 p-6 rounded-3xl border-2 border-orange-100 mt-4 text-center">
                  <h4 className="text-orange-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Politesse</h4>
                  <p className="text-xs text-orange-700 mb-4 font-bold">Quelle formule pour terminer un mail à ton professeur ?</p>
                  <div className="flex gap-2 justify-center">
                    {['A+', 'Cordialement'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Cordialement') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Cordialement' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-orange-600 border border-orange-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-100 mt-4 text-center">
                  <h4 className="text-rose-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Arnaque</h4>
                  <p className="text-xs text-rose-700 mb-4 font-bold">Un mail inconnu demande ton mot de passe, tu fais quoi ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Je réponds', 'Je supprime et signale'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Je supprime et signale') setBonusXP(200); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Je supprime et signale' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-rose-600 border border-rose-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-orange-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(194,65,12)] active:shadow-none active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8 text-orange-700">Défi Communication ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-orange-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {isLocked && (
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border-l-4 border-orange-500 text-sm">
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
            <div className="text-8xl">📧</div>
            <h2 className="text-4xl font-black">Pro du Mail !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Points gagnés</p>
              <div className="text-6xl font-black text-orange-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-orange-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}