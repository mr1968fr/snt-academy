'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Le Cloud n'existe pas", content: "Internet est ultra-physique. 99% du trafic mondial passe par des câbles sous-marins en fibre optique. Si tu envoies un Snap aux USA, l'info traverse l'océan à la vitesse de la lumière sous 4000m d'eau.", icon: "🔌", color: "border-blue-500" },
  { title: "2. Adresse IP & DNS", content: "Chaque machine a une adresse unique : l'adresse IP. Le DNS est l'annuaire qui traduit 'google.fr' en adresse IP chiffrée. C'est le répertoire de ton téléphone, mais pour la planète entière.", icon: "🆔", color: "border-indigo-500", hasLab: true },
  { title: "3. Le Routage", content: "Tes données sont découpées en PAQUETS. Ils ne prennent pas tous le même chemin : des ROUTEURS choisissent la route la plus rapide en temps réel. C'est ce qui rend Internet indestructible. Autre idée puissante : le PAIR-À-PAIR (P2P), où chaque utilisateur est à la fois client ET serveur — plus de centre unique, chacun partage.", icon: "🛣️", color: "border-orange-500" },
  { title: "4. Protocoles TCP/IP", content: "TCP vérifie que tous les paquets sont bien arrivés et les remet dans l'ordre. IP s'occupe de l'adressage. C'est le langage universel qui permet à toutes les machines du monde de se comprendre.", icon: "🌐", color: "border-green-500" },
  { title: "5. Labo : Tracé de route", content: "Grâce à la commande 'traceroute', on peut voir tous les routeurs par lesquels passe une donnée. C'est comme suivre un colis Amazon à chaque entrepôt !", icon: "📍", color: "border-red-500", hasLab2: true },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Géopolitique des câbles", desc: "Pourquoi les câbles sous-marins sont-ils devenus des cibles militaires prioritaires ?", difficulty: "Avancé" },
      { topic: "Internet et Écologie", desc: "Le coût environnemental caché de tes e-mails et du streaming vidéo 4K.", difficulty: "Débutant" },
      { topic: "La neutralité du Net", desc: "Pourquoi tous les paquets doivent-ils être traités de la même façon ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Où circulent la majorité des données mondiales ?", options: ["Par satellite", "Par câbles sous-marins", "Par les ondes WiFi"], correct: 1, explanation: "Les câbles transportent 99% du trafic." },
  { q: "Que signifie DNS ?", options: ["Data Network System", "Domain Name System", "Digital Node Service"], correct: 1, explanation: "C'est l'annuaire du Web." },
  { q: "Un paquet IP contient :", options: ["Juste la donnée", "La donnée + adresse départ/arrivée", "Le mot de passe"], correct: 1, explanation: "Il faut une adresse pour que le routeur sache où l'envoyer." },
  { q: "Dans le pair-à-pair (P2P), chaque utilisateur est :", options: ["Uniquement client", "À la fois client et serveur", "Uniquement serveur"], correct: 1, explanation: "Chacun télécharge ET partage : pas de serveur central, la charge se répartit entre tous." },
  { q: "Si un paquet est perdu en route, TCP :", options: ["Le redemande et remet tout dans l'ordre", "L'oublie : la page sera abîmée", "Envoie automatiquement tout en double"], correct: 0, explanation: "TCP numérote les paquets, détecte les manquants et les redemande." },
];

export default function InternetChapter() {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 1 : Internet</div>
        <div className="text-blue-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>
            <div className={`p-8 bg-white rounded-[2rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-5xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">{LESSON_STEPS[step].title}</h2>
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6">{LESSON_STEPS[step].content}</p>
              )}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center italic">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 LAB : Le répertoire DNS</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold">Lequel est le NOM DE DOMAINE ?</p>
                  <div className="flex gap-2 justify-center">
                    {['8.8.8.8', 'google.fr'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'google.fr') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'google.fr' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 mt-4 text-center italic">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left">🧪 LAB : Routage</h4>
                  <p className="text-xs text-red-700 mb-4 font-bold italic">Si le routeur principal tombe en panne, que font les paquets ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Ils s\'arrêtent', 'Ils changent de route'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Ils changent de route') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Ils changent de route' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(30,64,175)]">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}
        {mode === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black mb-8 italic tracking-tighter text-center italic">"{QUIZ_QUESTIONS[quizIdx].q}"</h2>
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4 shadow-sm">
                <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
              </div>
            )}
          </div>
        )}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600">
              <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase italic">Connecté !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest">Maître du Réseau</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}