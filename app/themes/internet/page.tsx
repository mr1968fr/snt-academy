'use client';

import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  {
    title: "1. Ce n'est pas un nuage !",
    content: "Le 'Cloud' est un mensonge marketing. Internet est ultra physique. 99% du trafic mondial passe par des câbles sous-marins en fibre optique de la taille d'un tuyau d'arrosage. Si tu regardes une vidéo stockée aux USA, l'information traverse l'océan à la vitesse de la lumière sous 4000m d'eau.",
    icon: "🔌",
    color: "border-blue-500"
  },
  {
    title: "2. Adresse IP : Ta plaque d'immatriculation",
    content: "Pour communiquer, chaque machine a besoin d'une adresse unique : l'adresse IP (ex: 192.168.1.1). C'est grâce à elle qu'un serveur sait exactement à quel téléphone renvoyer une photo. Sans IP, les données seraient perdues dans le réseau.",
    icon: "🆔",
    color: "border-indigo-500"
  },
  {
    title: "3. Labo : Le DNS, l'annuaire du Web",
    content: "Retenir des suites de chiffres comme 142.250.179.78 est impossible pour un humain. Le DNS (Domain Name System) est un serveur qui traduit les noms (google.fr) en adresses IP. C'est le répertoire de ton téléphone, mais pour la planète entière.",
    icon: "📖",
    color: "border-green-500",
    hasLab: true
  },
  {
    title: "4. Découpage en Paquets",
    content: "Un fichier (photo, vidéo) est trop gros pour voyager d'un coup. Le protocole TCP le découpe en milliers de petits 'PAQUETS'. Chaque paquet contient une partie du message, l'adresse de départ et celle d'arrivée. Ils voyagent séparément et sont recollés à la fin.",
    icon: "📦",
    color: "border-orange-500"
  },
  {
    title: "5. Labo : Le Routage (Le GPS des données)",
    content: "Tes paquets ne prennent pas tous le même chemin. Ils passent par des ROUTEURS qui choisissent la route la plus rapide. Si un câble casse, le routeur change de chemin instantanément. C'est ce qui rend Internet indestructible.",
    icon: "🛣️",
    color: "border-red-500",
    hasLab2: true
  },
  {
    title: "6. Indépendance du réseau",
    content: "La force d'Internet est son universalité. Peu importe que tu sois en WiFi, en 4G ou en fibre, ou que tu utilises un iPhone ou un PC : les protocoles (IP, TCP) sont les mêmes pour tout le monde. C'est un langage universel.",
    icon: "🌐",
    color: "border-slate-800"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Quelle technologie transporte 99% du trafic internet mondial ?",
    options: ["Les Satellites", "Les câbles sous-marins", "La 5G"],
    correct: 1,
    explanation: "Contrairement aux idées reçues, les câbles sous-marins sont beaucoup plus rapides et fiables que les satellites."
  },
  {
    q: "À quoi sert le serveur DNS ?",
    options: ["À stocker tes e-mails", "À traduire un nom de domaine en adresse IP", "À protéger contre les virus"],
    correct: 1,
    explanation: "Le DNS évite d'avoir à retenir les adresses IP chiffrées des sites web."
  },
  {
    q: "Qu'est-ce qu'un 'paquet' sur Internet ?",
    options: ["Un morceau de fichier avec son adresse", "Une boîte pour envoyer un PC", "Un virus caché"],
    correct: 0,
    explanation: "TCP découpe les fichiers en paquets pour qu'ils circulent plus facilement sur le réseau."
  },
  {
    q: "Quel appareil choisit le meilleur chemin pour les données ?",
    options: ["Le Moniteur", "Le Routeur", "Le Clavier"],
    correct: 1,
    explanation: "Le routeur est le 'cerveau' du réseau qui dirige les paquets vers la destination la plus rapide."
  },
  {
    q: "Le protocole IP permet de :",
    options: ["Identifier chaque appareil sur le réseau", "Regarder des vidéos en HD", "Charger son téléphone"],
    correct: 0,
    explanation: "IP signifie 'Internet Protocol'. Il attribue une adresse unique à chaque machine connectée."
  }
];

export default function InternetChapterV4() {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 1 : Internet</div>
        <div className="text-blue-600 font-black tracking-tighter italic">XP: {score * 100 + bonusXP}</div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
              <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
            </div>

            <div className={`p-8 bg-white rounded-[2.5rem] border-b-[10px] shadow-xl transition-all ${LESSON_STEPS[step].color}`}>
              <div className="text-6xl mb-6">{LESSON_STEPS[step].icon}</div>
              <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">{LESSON_STEPS[step].title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6">{LESSON_STEPS[step].content}</p>

              {/* LAB DNS */}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mt-4 text-center">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Le répertoire DNS</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold italic">"Un serveur DNS te dit que Google est à l'adresse 142.250.179.78. Laquelle de ces infos est le NOM DE DOMAINE ?"</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['142.250.179.78', 'google.fr', 'IP'].map(val => (
                      <button 
                        key={val}
                        onClick={() => {
                            setLab1Answer(val);
                            if(val === 'google.fr') setBonusXP(prev => prev < 150 ? 150 : prev);
                        }}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'google.fr' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {lab1Answer === 'google.fr' && <p className="text-[10px] text-green-600 font-black mt-3 uppercase tracking-tighter animate-pulse">Correct ! +150 XP Bonus</p>}
                </div>
              )}

              {/* LAB ROUTAGE */}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-100 mt-4 text-center">
                  <h4 className="text-red-900 font-black text-sm mb-4 uppercase tracking-widest">🧪 LAB : Mission Routage</h4>
                  
                  {/* Petit Graphe de Routage en SVG */}
                  <svg viewBox="0 0 200 80" className="w-full h-24 mb-4 bg-white rounded-xl border border-red-100">
                    <circle cx="20" cy="40" r="5" fill="#ef4444" /> <text x="10" y="30" fontSize="8">Moi</text>
                    <line x1="25" y1="40" x2="60" y2="20" stroke="#fecaca" strokeWidth="2" />
                    <line x1="25" y1="40" x2="60" y2="60" stroke="#fecaca" strokeWidth="2" />
                    <circle cx="65" cy="20" r="5" fill="#ef4444" /> <text x="60" y="12" fontSize="8">R1 (Saturé)</text>
                    <circle cx="65" cy="60" r="5" fill="#ef4444" /> <text x="60" y="75" fontSize="8">R2 (Libre)</text>
                    <line x1="70" y1="20" x2="150" y2="40" stroke="#fecaca" strokeWidth="2" />
                    <line x1="70" y1="60" x2="150" y2="40" stroke="#fecaca" strokeWidth="2" />
                    <circle cx="155" cy="40" r="5" fill="#ef4444" /> <text x="150" y="30" fontSize="8">Serveur</text>
                  </svg>
                  
                  <p className="text-xs text-red-700 font-bold mb-3 italic">Le routeur R1 est surchargé. Quel chemin doit prendre ton paquet ?</p>
                  <div className="flex gap-2 justify-center">
                    {['Par R1', 'Par R2'].map(val => (
                      <button 
                        key={val}
                        onClick={() => {
                            setLab2Answer(val);
                            if(val === 'Par R2') setBonusXP(prev => prev < 300 ? 300 : prev);
                        }}
                        className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Par R2' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-red-600 border border-red-200'}`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  {lab2Answer === 'Par R2' && <p className="text-[10px] text-green-600 font-black mt-3 uppercase tracking-tighter">Parfait ! Les routeurs évitent les bouchons. +150 XP</p>}
                </div>
              )}
            </div>

            <button onClick={nextStep} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 shadow-[0_8px_0_rgb(30,64,175)] active:translate-y-1 transition-all">
              {step === LESSON_STEPS.length - 1 ? "PASSER AU DÉFI ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}

        {/* QUIZ (Modèle V4) */}
        {mode === 'quiz' && (
          <div className="space-y-8 animate-in zoom-in duration-300">
            <div className="text-center">
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}</span>
              <h2 className="text-2xl font-black mt-6 tracking-tighter">{QUIZ_QUESTIONS[quizIdx].q}</h2>
            </div>
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                let status = "bg-white border-slate-200 hover:border-indigo-400";
                if (isLocked) {
                  if (i === QUIZ_QUESTIONS[quizIdx].correct) status = "bg-green-100 border-green-500 text-green-800 scale-[1.02] shadow-md";
                  else if (i === selectedAnswer) status = "bg-red-100 border-red-500 text-red-800 opacity-60";
                  else status = "bg-white border-slate-100 opacity-40";
                }
                return (
                  <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-3xl border-2 text-left font-bold text-lg transition-all ${status}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {isLocked && (
              <div className="bg-white p-8 rounded-[2rem] border-2 border-indigo-100 shadow-xl animate-in slide-in-from-bottom-8">
                <p className="text-slate-600 font-medium leading-relaxed mb-6"><span className="font-black text-indigo-600 uppercase text-xs mr-2 tracking-widest italic">Le débrief'</span>{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={() => { if(quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(quizIdx + 1); setSelectedAnswer(null); setIsLocked(false); } else setMode('resultat'); }} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg">
                    {quizIdx === QUIZ_QUESTIONS.length - 1 ? "VOIR MON SCORE" : "CONTINUER"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* RÉSULTAT */}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600">
              <div className="text-8xl mb-6">🛰️</div>
              <h2 className="text-5xl font-black mb-2 tracking-tighter italic text-blue-600">ONLINE !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 uppercase tracking-[0.2em] ml-2">XP</span></div>
              <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 text-blue-200 font-black uppercase text-[10px] tracking-[0.3em] mb-3">Nouveau Grade</div>
                <div className="relative z-10 text-3xl font-black tracking-tight uppercase leading-none">Commandant du Réseau</div>
                <div className="absolute -right-6 -bottom-6 text-9xl opacity-20 rotate-12">🔌</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}