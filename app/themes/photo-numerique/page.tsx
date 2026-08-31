'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Le Photosite", content: "Le capteur de ton tel est une grille de millions de photosites. Ils captent la lumière et la transforment en électricité, puis en chiffres.", icon: "📸", color: "border-purple-500", details: [{"h": "Définition", "p": "Le capteur est une grille de photosites : chacun compte les photons reçus et les convertit en valeur électrique. Plus un photosite est grand, mieux il capte la lumière."}, {"h": "Exemple", "p": "Un capteur de 12 mégapixels à gros photosites fait souvent de meilleures photos de nuit qu'un capteur de 48 mégapixels minuscules."}, {"h": "À retenir", "p": "Dès la prise de vue, la lumière devient des nombres : la photo est déjà de l'information numérique."}, {"h": "Vocabulaire", "p": "capteur, photosite, pixel, exposition."}] },
  { title: "2. Le Pixel", content: "Picture Element. C'est le plus petit carré de couleur de ton image. Plus il y en a, plus l'image est nette : c'est la DÉFINITION (largeur × hauteur, ex. 4032 × 3024 pour un smartphone). Le POIDS se calcule aussi : nombre de pixels × 3 octets (RVB) — d'où l'utilité de la compression.", icon: "⬛", color: "border-blue-500", hasLab: true, details: [{"h": "Définition", "p": "Le pixel est le plus petit point de l'image. La définition est le nombre de pixels : largeur × hauteur (ex. 4032 × 3024 ≈ 12 mégapixels)."}, {"h": "Exemple", "p": "Le poids se calcule : 2 millions de pixels × 3 octets (RVB) ≈ 6 Mo — d'où l'utilité de la compression JPEG."}, {"h": "À faire maintenant", "p": "Affiche les informations d'une photo de ton téléphone et retrouve sa définition."}, {"h": "À retenir", "p": "Définition (nombre de pixels), résolution (densité) et poids (octets) : trois mots souvent mélangés, trois choses différentes."}, {"h": "Vocabulaire", "p": "définition, résolution, poids, compression."}] },
  { title: "3. La couleur RVB", content: "Rouge + Vert + Bleu. En mélangeant ces 3 couleurs de 0 à 255, on crée 16 millions de nuances sur ton écran.", icon: "🌈", color: "border-pink-500", details: [{"h": "Définition", "p": "Chaque pixel porte trois nombres — rouge, vert, bleu — de 0 à 255 : plus de 16 millions de combinaisons possibles."}, {"h": "Exemple", "p": "(255,0,0) est un rouge pur, (0,0,0) un noir, (255,255,255) un blanc. Le mélange est additif : on ajoute de la lumière, contrairement à la peinture."}, {"h": "À retenir", "p": "Une image n'est qu'un tableau de nombres : c'est pour cela qu'un ordinateur sait la manipuler."}, {"h": "Vocabulaire", "p": "RVB, canal, octet, synthèse additive."}] },
  { title: "4. Métadonnées EXIF", content: "Une photo contient ton GPS, l'heure, et le modèle de ton tel. Utile pour trier, mais dangereux pour ta vie privée.", icon: "🔍", color: "border-indigo-500", hasLab2: true, details: [{"h": "Définition", "p": "Des données cachées dans le fichier photo : modèle d'appareil, réglages, date et heure, et parfois les coordonnées GPS de la prise de vue."}, {"h": "Exemple", "p": "Une photo publiée telle quelle peut révéler où elle a été prise : c'est pourquoi les grands réseaux effacent l'EXIF au téléversement."}, {"h": "À faire maintenant", "p": "Sur ton téléphone, affiche les détails d'une photo : retrouve l'appareil, la date, et vérifie si le lieu y figure."}, {"h": "À retenir", "p": "L'EXIF se lit — et se supprime avant de publier."}, {"h": "Vocabulaire", "p": "EXIF, métadonnée, géolocalisation."}] },
  { title: "5. Retouche et IA", content: "Aujourd'hui, l'IA 'invente' des pixels pour améliorer tes photos de nuit ou supprimer des objets. La photo n'est plus une preuve du réel.", icon: "✨", color: "border-amber-500", details: [{"h": "Définition", "p": "Les logiciels transforment les pixels : corriger la lumière, supprimer un détail, ou générer de toutes pièces une scène qui n'existe pas grâce à l'IA."}, {"h": "Exemple", "p": "Les filtres « beauté » retouchent chaque portrait en direct ; des IA fabriquent des visages parfaitement crédibles... et totalement faux."}, {"h": "À retenir", "p": "Voir n'est plus croire : croiser les sources avant de partager — le pont direct avec le thème Fake News."}, {"h": "Vocabulaire", "p": "retouche, deepfake, image générée, vérification."}] },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Les Deepfakes", desc: "Comment l'IA peut créer des vidéos truquées impossibles à distinguer du vrai ?", difficulty: "Avancé" },
      { topic: "Droit à l'image", desc: "Quelles sont les règles pour publier la photo de quelqu'un ?", difficulty: "Débutant" },
      { topic: "Reconnaissance faciale", desc: "Sécurité ou fin de l'anonymat ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Qu'est-ce qu'un pixel ?", options: ["Une lentille", "Un petit carré de couleur", "Une batterie"], correct: 1, explanation: "C'est l'élément de base d'une image." },
  { q: "Que signifie RVB ?", options: ["Rouge Vert Bleu", "Rayon Vidéo Basique", "Réseau Virtuel"], correct: 0, explanation: "Ce sont les 3 couleurs de base des écrans." },
  { q: "Les données EXIF sont :", options: ["Des virus", "Des métadonnées de la photo", "Des filtres"], correct: 1, explanation: "Elles contiennent les infos techniques et GPS." },
  { q: "La définition d'une image, c'est :", options: ["Le nombre de pixels (largeur × hauteur)", "Sa taille affichée à l'écran en cm", "Le nom de son fichier"], correct: 0, explanation: "1920 × 1080 : une définition d'environ 2 millions de pixels." },
  { q: "Une image de 2000 × 1000 pixels en RVB (3 octets par pixel) pèse environ :", options: ["6 Mo", "2 Mo", "600 Ko"], correct: 0, explanation: "2 000 000 pixels × 3 octets = 6 millions d'octets ≈ 6 Mo — sans compression." },
];

export default function PhotoChapter() {
  const [mode, setMode] = useState<'cours' | 'quiz' | 'resultat'>('cours');
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lab1Answer, setLab1Answer] = useState<string | null>(null);
  const [lab2Answer, setLab2Answer] = useState<string | null>(null);
  const [openLesson, setOpenLesson] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const nextStep = () => { setOpenLesson(false); if (step < LESSON_STEPS.length - 1) setStep(step + 1); else setMode('quiz'); };
  const handleAnswer = (idx: number) => { if (isLocked) return; setSelectedAnswer(idx); setIsLocked(true); if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(score + 1); };
  const nextQuestion = () => { if (quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(quizIdx + 1); setSelectedAnswer(null); setIsLocked(false); } else setMode('resultat'); };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/themes" className="text-blue-600 font-bold">← Quitter</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400 text-left">Photo Numérique</div>
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
              <h2 className="text-3xl font-black mb-6 tracking-tight text-left italic tracking-tighter uppercase">{LESSON_STEPS[step].title}</h2>
              {LESSON_STEPS[step].isProject ? (
                <div className="space-y-4">
                  {LESSON_STEPS[step].projects?.map((proj, i) => (
                    <div key={i} className="bg-slate-50 border-2 border-purple-100 p-5 rounded-3xl group text-left">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-purple-600 uppercase text-xs tracking-tight">{proj.topic}</h4>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md font-black">{proj.difficulty}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-slate-600 font-medium leading-relaxed mb-6 text-left">{LESSON_STEPS[step].content}</p>
              )}
              {LESSON_STEPS[step].details && (
                <div className="mb-2 mt-[-12px]">
                  <button onClick={() => setOpenLesson(!openLesson)} className="w-full py-3 rounded-2xl border-2 border-blue-200 bg-blue-50 text-blue-700 font-black text-sm uppercase tracking-widest hover:bg-blue-100 transition-all">
                    {openLesson ? '▲ Refermer le cours' : '📖 Lire le cours'}
                  </button>
                  {openLesson && (
                    <div className="mt-3 p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 space-y-4">
                      {LESSON_STEPS[step].details!.map((b, i) => (
                        <div key={i}>
                          <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{b.h}</div>
                          <p className="text-sm text-slate-600 leading-relaxed font-medium">{b.p}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {LESSON_STEPS[step].hasLab && (
                <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100 mt-4 text-center italic">
                  <h4 className="text-purple-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left tracking-widest">🧪 LAB : Pixel Power</h4>
                  <p className="text-xs text-purple-700 mb-4 font-bold italic italic">Si je multiplie les pixels par 2 :</p>
                  <div className="flex gap-2 justify-center">
                    {['L\'image est plus nette', 'La batterie se charge'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'L\'image est plus nette') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'L\'image est plus nette' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-purple-600 border border-purple-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 mt-4 text-center italic">
                  <h4 className="text-indigo-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left tracking-widest">🧪 LAB : Données GPS</h4>
                  <p className="text-xs text-indigo-700 mb-4 font-bold italic italic">Une métadonnée peut révéler :</p>
                  <div className="flex gap-2 justify-center">
                    {['Ton lieu exact', 'Ta couleur préférée'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Ton lieu exact') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Ton lieu exact' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-indigo-600 border border-indigo-200'}`}>{val}</button>
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
                <button key={i} disabled={isLocked} onClick={() => handleAnswer(i)} className={`p-6 rounded-[2rem] border-2 font-bold text-left transition-all ${isLocked ? (i === QUIZ_QUESTIONS[quizIdx].correct ? 'bg-green-100 border-green-500 text-green-800 shadow-md' : 'bg-white opacity-40') : 'bg-white border-slate-200 hover:border-blue-500'}`}>{opt}</button>
              ))}
            </div>
            {isLocked && (
              <div className="mt-6 p-6 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 animate-in slide-in-from-bottom-4 shadow-sm text-left">
                <p className="text-sm text-indigo-900 font-medium mb-4">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">Continuer</button>
              </div>
            )}
          </div>
        )}
        {mode === 'resultat' && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500 text-left">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-blue-600 text-center">
              <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase text-center italic tracking-widest">Développé !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400 font-black">XP</span></div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest text-center">Maître du Pixel</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}