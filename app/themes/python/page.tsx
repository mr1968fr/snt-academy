'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Premiers pas avec print()", content: "Donne un ordre à la machine : print(\"Bonjour tout le monde\") affiche ton message. Le # commence un commentaire (une note pour les humains, invisible pour Python). Règle d'or : l'ordinateur fait exactement ce que tu écris, ni plus ni moins — une virgule ou une parenthèse manquante et il te répond avec un message d'erreur. Apprends à lire ces messages : ils disent WHERE ça cloche.", icon: "🐍", color: "border-yellow-500" },
  { title: "2. Les variables : des boîtes étiquetées", content: "age = 16 range 16 dans une boîte nommée age. Les types essentiels : str (texte, avec guillemets : \"17\"), int (entier : 17), float (décimal : 17.5). Attention au piège : \"17\" + \"2\" donne \"172\" (coller du texte) alors que 17 + 2 donne 19 (calculer). Une variable peut être mise à jour : total = total + 1 signifie « ajoute 1 à ce qu'il y a déjà ».", icon: "📦", color: "border-amber-500", hasLab: true },
  { title: "3. Les conditions : si… alors…", content: "if note >= 10: print(\"Validé\") else: print(\"À retravailler\"). Les comparaisons : == (égal, avec deux signes !), <, >, <=, >=. Le elif enchaîne les cas. Et surtout : l'indentation (4 espaces en début de ligne) fait partie du langage — c'est elle qui dit quelles lignes dépendent du if. Exemple concret : vérifier qu'un mot de passe fait au moins 8 caractères.", icon: "🔀", color: "border-orange-500" },
  { title: "4. Les boucles : répéter sans se fatiguer", content: "for i in range(100): répète 100 fois un bloc — écrire 100 lignes devient inutile. Piège classique : range(3) compte 0, 1, 2 (trois tours, de 0 à n-1). La boucle while répète tant qu'une condition est vraie : parfait pour « redemander le mot de passe tant qu'il est faux ». Les boucles sont le moteur des programmes qui traitent des données : moyenne de 10 notes, lecture des capteurs d'un objet connecté…", icon: "🔁", color: "border-lime-500", hasLab2: true },
  { title: "5. Les fonctions : écrire une fois, utiliser partout", content: "def double(x): return x * 2 crée ta propre commande : double(8) renvoie 16. def nomme la fonction, le paramètre x est l'entrée, return renvoie le résultat. Les fonctions évitent de copier-coller du code : on écrit, on teste une fois, on réutilise. Exemple fil rouge : une fonction qui convertit un nombre binaire (1011) en décimal, en parcourant les bits avec une boucle et en multipliant par 2 à chaque étape.", icon: "🧩", color: "border-emerald-500" },
  { title: "🎤 Mission : Coder pour Pix", isProject: true, projects: [
      { topic: "Calculatrice de moyenne", desc: "Range des notes dans une liste, parcours-la avec une boucle for et affiche la moyenne — le réflexe de tout traitement de données.", difficulty: "Débutant" },
      { topic: "Convertisseur binaire", desc: "Écris une fonction qui transforme 1011 en 11 : boucle sur les bits, multiplication par 2 à chaque étape. Le pont vers le thème Données.", difficulty: "Intermédiaire" },
      { topic: "Détecteur de mot de passe faible", desc: "Une fonction qui refuse un mot de passe de moins de 8 caractères ou sans aucun chiffre : boucle sur une chaîne + conditions.", difficulty: "Avancé" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Que fait print(2 + 3 * 4) ?", options: ["14", "20", "234"], correct: 0, explanation: "La multiplication est prioritaire : 3*4 = 12, puis 2+12 = 14. Python respecte les priorités mathématiques." },
  { q: "Combien de fois s'affiche « Bonjour » avec for i in range(3): ?", options: ["3 fois", "2 fois", "4 fois"], correct: 0, explanation: "range(3) génère 0, 1, 2 — trois tours, en partant de 0. C'est le piège le plus classique !" },
  { q: "Quel est le type de \"17\" (avec guillemets) ?", options: ["Un texte (str)", "Un nombre entier (int)", "Un nombre décimal (float)"], correct: 0, explanation: "Les guillemets font tout : \"17\" est une chaîne de caractères. \"17\" + \"2\" donnerait \"172\", pas 19." },
  { q: "def double(x): return x * 2 — que renvoie double(8) ?", options: ["16", "8", "82"], correct: 0, explanation: "La fonction reçoit 8 dans le paramètre x, calcule x*2 et return renvoie 16." },
  { q: "À quoi sert elif ?", options: ["Tester une autre condition si la précédente est fausse", "Répéter un bloc plusieurs fois", "Arrêter le programme"], correct: 0, explanation: "if / elif / else enchaînent les cas : on teste elif seulement si le if (et les elif précédents) étaient faux." }
];

export default function PythonChapter() {
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
        <Link href="/themes" className="text-emerald-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Initiation Python</div>
        <div className="text-emerald-600 font-black">XP: {score * 100 + bonusXP}</div>
      </nav>
      <div className="max-w-xl mx-auto px-6 py-8">
        {mode === 'cours' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${((step + 1) / LESSON_STEPS.length) * 100}%` }}></div>
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
                <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 mt-4 text-center">
                  <h4 className="text-emerald-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : Prédis la sortie</h4>
                  <div className="bg-slate-900 text-emerald-400 font-mono text-sm text-left p-4 rounded-2xl mb-4">
                    <div>a = 5</div>
                    <div>a = a + 2</div>
                    <div>print(a)</div>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['5', '7', '52'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if (val === '7') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === '7' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-emerald-700 border border-emerald-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-100 mt-4 text-center">
                  <h4 className="text-emerald-900 font-black text-sm mb-4 uppercase tracking-widest italic">🧪 MISSION : La bonne boucle</h4>
                  <p className="text-xs text-emerald-700 mb-4 font-bold">Tu veux répéter une action exactement 7 fois. Quelle écriture choisis-tu ?</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['for i in range(7):', 'while i in range(7):', 'repeat 7:'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if (val === 'for i in range(7):') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${lab2Answer === val ? (val === 'for i in range(7):' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-emerald-700 border border-emerald-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={nextStep} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-[0_8px_0_rgb(5,150,105)] transition-all">
              {step === LESSON_STEPS.length - 1 ? "QUIZ ⚡️" : "SUIVANT →"}
            </button>
          </div>
        )}
        {mode === 'quiz' && (
          <div className="space-y-6">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${((quizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
            </div>
            <div className="p-8 bg-white rounded-[2rem] border-b-[10px] border-emerald-600 border-2 shadow-xl">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}</div>
              <h2 className="text-2xl font-black mb-6 tracking-tight">{QUIZ_QUESTIONS[quizIdx].q}</h2>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={isLocked}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold border-2 transition-all ${
                      selectedAnswer === null
                        ? 'bg-white border-slate-200 hover:border-emerald-400'
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
                  <button onClick={nextQuiz} className="mt-4 w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-[0_6px_0_rgb(5,150,105)]">
                    {quizIdx === QUIZ_QUESTIONS.length - 1 ? 'RÉSULTAT 🏁' : 'SUIVANT →'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {mode === 'resultat' && (
          <div className="p-8 bg-white rounded-[2rem] border-b-[10px] border-emerald-600 border-2 shadow-xl text-center space-y-6">
            <div className="text-6xl">{score === QUIZ_QUESTIONS.length ? '🏆' : score >= QUIZ_QUESTIONS.length - 1 ? '🎉' : '📚'}</div>
            <h2 className="text-3xl font-black">Score : {score} / {QUIZ_QUESTIONS.length}</h2>
            <div className="text-2xl font-black text-emerald-600">XP gagnés : {score * 100 + bonusXP}</div>
            <p className="text-slate-600 font-bold">
              {score === QUIZ_QUESTIONS.length
                ? 'Sans faute ! Tu es prêt pour l&apos;épreuve « Programmer » de Pix !'
                : score >= QUIZ_QUESTIONS.length - 1
                  ? 'Très bien ! Encore un petit effort pour le sans-faute Pix.'
                  : 'Rejoue le cours : prédis les sorties de code pour t&apos;entraîner.'}
            </p>
            <div className="flex gap-3">
              <button onClick={replay} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black">🔄 Rejouer</button>
              <Link href="/themes" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black inline-flex items-center justify-center">🗺️ Thèmes</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
