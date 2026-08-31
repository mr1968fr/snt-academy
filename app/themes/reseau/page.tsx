'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. La Box : Ton entrée sur Internet", content: "La box (routeur) fait le pont entre le monde extérieur et chez toi. Elle transforme le signal qui arrive (fibre ou ADSL) en Wi-Fi pour tes appareils. C'est elle qui gère la circulation des données.", icon: "📦", color: "border-indigo-500" },
  { title: "2. L'adresse IP", content: "Chaque appareil a une adresse IP (ex: 192.168.1.15). C'est comme ton adresse postale : pour que le serveur de YouTube t'envoie une vidéo, il doit savoir exactement à quelle 'adresse' envoyer les données.", icon: "📍", color: "border-blue-500", hasLab: true },
  { title: "3. Wi-Fi 2.4GHz vs 5GHz", content: "Le Wi-Fi 2.4GHz traverse mieux les murs mais est plus lent. Le 5GHz est ultra-rapide mais s'arrête dès qu'il y a un obstacle. Si tu joues en ligne, essaie d'être près de la box en 5GHz !", icon: "📶", color: "border-cyan-500" },
  { title: "4. Le Partage de Connexion", content: "Ton smartphone peut devenir une box ! En activant le 'Point d'accès mobile', ton téléphone utilise sa 4G/5G pour créer un mini réseau Wi-Fi auquel ton ordi peut se connecter. Attention à ton forfait data !", icon: "📲", color: "border-indigo-400", hasLab2: true },
  { title: "5. Sécurité : WPA2 et Wi-Fi publics", content: "Ne laisse jamais ton Wi-Fi sans mot de passe. Le protocole WPA2 (ou WPA3) crypte tes données. Sur un Wi-Fi public (gare, café), évite de te connecter à ta banque : quelqu'un d'autre sur le réseau pourrait 'écouter' ce que tu fais.", icon: "🛡️", color: "border-slate-700" },
  { title: "🎤 Mission : Administrateur", isProject: true, projects: [
      { topic: "Tester son débit", desc: "Utilise Speedtest pour comparer ta vitesse en Wi-Fi et en 4G. Pourquoi y a-t-il une différence ?", difficulty: "Débutant" },
      { topic: "Le mystère du Ping", desc: "Explique pourquoi un 'Ping' élevé rend les jeux en ligne injouables.", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "À quoi sert une adresse IP ?", options: ["À calculer la vitesse", "À identifier un appareil sur le réseau", "À recharger la batterie"], correct: 1, explanation: "L'IP est l'identifiant unique qui permet aux données d'arriver au bon endroit." },
  { q: "Quelle fréquence Wi-Fi est la plus rapide mais traverse mal les murs ?", options: ["2.4 GHz", "5 GHz", "Bluetooth"], correct: 1, explanation: "Le 5GHz offre plus de débit mais a une portée plus courte." },
  { q: "Pourquoi le Wi-Fi public est-il risqué ?", options: ["Il coûte cher", "Les données peuvent être interceptées par d'autres utilisateurs", "Il décharge le téléphone"], correct: 1, explanation: "Sur un réseau ouvert, tes données ne sont pas protégées des voisins de réseau." }
];

export default function ReseauChapter() {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-indigo-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Réseaux & Wi-Fi</div>
        <div className="text-indigo-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
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
                <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 mt-4 text-center">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Identification</h4>
                  <p className="text-xs text-indigo-700 mb-4 font-bold">À quoi ressemble une adresse IP locale typique ?</p>
                  <div className="flex gap-2 justify-center">
                    {['192.168.1.1', 'abc.xyz.1.1'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === '192.168.1.1') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === '192.168.1.1' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(67,56,202)] transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}
        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-center mb-8 text-indigo-700">Défi Réseau ⚡️</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-200">
              <p className="text-xl font-bold mb-6">{QUIZ_QUESTIONS[quizIdx].q}</p>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className={`w-full p-4 rounded-2xl text-left font-bold border-2 transition-all ${selectedAnswer === i ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-red-100 border-red-500 text-red-700') : 'border-slate-100 hover:border-indigo-300'}`}>
                    {opt}
                  </button>
                ))}
              </div>
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
            <div className="text-8xl">🌐</div>
            <h2 className="text-4xl font-black">Expert Réseau !</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl inline-block w-full">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2">Points gagnés</p>
              <div className="text-6xl font-black text-indigo-600">{score * 100 + bonusXP} XP</div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl">
              RETOUR AU CATALOGUE
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}