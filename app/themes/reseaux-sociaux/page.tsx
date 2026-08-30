'use client'; // Obligatoire pour rendre le quiz interactif

import { useState } from 'react';
import Link from 'next/link';

export default function ReseauxSociaux() {
  const [currentStep, setCurrentStep] = useState('cours'); // 'cours' ou 'quiz'
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { q: "Qu'est-ce que l'identité numérique ?", a: "Toutes les traces que tu laisses en ligne", options: ["Seulement ta photo", "Toutes les traces que tu laisses en ligne", "Ton mot de passe"] },
    { q: "Pourquoi les réseaux sont-ils gratuits ?", a: "Ils vendent ton attention et tes données", options: ["Parce qu'ils sont gentils", "Ils vendent ton attention et tes données", "L'État paie pour nous"] },
    { q: "La cyberviolence est punie par la loi ?", a: "Oui, c'est dans le Code pénal", options: ["Non, c'est juste internet", "Oui, c'est dans le Code pénal", "Seulement si c'est sur TikTok"] }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* Barre de lecture fixe en haut */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center z-50">
        <Link href="/themes" className="text-sm font-bold text-blue-600">← Retour aux thèmes</Link>
        <div className="text-xs font-mono bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest text-slate-500">
          Thème 3 : Réseaux Sociaux
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-12">
        {currentStep === 'cours' ? (
          <article className="prose prose-slate">
            <h1 className="text-4xl font-black mb-8 leading-tight">
              T'es le produit <br/>
              <span className="text-blue-600">(même si c'est gratuit)</span>
            </h1>

            <div className="space-y-8 text-lg leading-relaxed">
              <p className="font-bold text-slate-500 italic">
                Salut. On va parler de ce que tu utilises tous les jours : Insta, TikTok, Snap... 
                On va voir ce qui se cache vraiment derrière. Pas de blabla, on va droit au but. 🚀
              </p>

              <section className="bg-slate-50 p-6 rounded-3xl border-l-4 border-blue-500">
                <h2 className="text-xl font-bold mb-4">1. Ton identité numérique</h2>
                <p>Chaque like, chaque recherche, chaque story laisse une trace. C'est ton <b>e-réputation</b>. Un jour, un recruteur googlisera ton nom. Qu'est-ce qu'il verra ?</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Pourquoi c'est gratuit ?</h2>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-900 font-bold mb-4 text-center">
                  "Si c'est gratuit, c'est que tu es le produit."
                </div>
                <p>Les réseaux vendent ton attention à des annonceurs. Plus tu scrolles, plus ils gagnent.</p>
              </section>

              <section className="bg-red-50 p-6 rounded-3xl border-l-4 border-red-500">
                <h2 className="text-xl font-bold mb-4">3. Cyberviolence</h2>
                <p>Harcèlement, menaces, diffusion de photos... La loi est claire (Article 222-33-2-2). Ce n'est jamais "juste une blague".</p>
              </section>

              <div className="bg-blue-600 text-white p-8 rounded-3xl text-center">
                <h3 className="text-2xl font-bold mb-4">Prêt pour le quiz ?</h3>
                <p className="mb-6">Voyons si tu as bien suivi. Un badge est à la clé ! 🏆</p>
                <button 
                  onClick={() => setCurrentStep('quiz')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-black hover:scale-105 transition-transform"
                >
                  LANCER LE QUIZ
                </button>
              </div>
            </div>
          </article>
        ) : (
          <div className="py-12">
            {!showResult ? (
              <div className="space-y-12 text-center">
                <h2 className="text-3xl font-black">Question Time ! ⚡️</h2>
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-3xl">
                    <p className="text-xl font-bold mb-4">{q.q}</p>
                    <div className="grid gap-3">
                      {q.options.map((opt) => (
                        <button 
                          key={opt}
                          onClick={() => handleAnswer(opt === q.a)}
                          className="p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-500 active:bg-blue-50 transition-all text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowResult(true)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold"
                >
                  Voir mon score
                </button>
              </div>
            ) : (
              <div className="text-center py-20 bg-blue-50 rounded-3xl">
                <h2 className="text-5xl mb-4">🎉</h2>
                <h3 className="text-3xl font-black mb-2">Ton score : {score} / {questions.length}</h3>
                <p className="text-slate-600 mb-8">
                  {score === questions.length ? "Expert ! Tu as débloqué le badge Maître des Réseaux 🏆" : "Pas mal ! Relis encore un peu pour le 100%."}
                </p>
                <Link href="/themes" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
                  Retour aux thèmes
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}