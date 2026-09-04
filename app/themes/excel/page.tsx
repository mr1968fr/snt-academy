'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// --- TYPES & STRUCTURES ---

type ModeSession = '20min' | '1h' | '1h30';
type Detail = { h: string; p: string };
type Project = {
  topic: string;
  desc: string;
  livrable: string;
  difficulty: string;
  duration: string;
};
type Step = {
  number: string;
  title: string;
  subtitle: string;
  content?: string;
  intro?: string;
  icon: string;
  competence?: string;
  details?: Detail[];
  hasLab?: boolean;
  hasLab2?: boolean;
  isProject?: boolean;
  projects?: Project[];
  deep?: { label: string; text: string }[];
};
type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

// --- CONSTANTES PÉDAGOGIQUES ---

const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "Grille et Adresses",
    subtitle: "La carte des données",
    icon: "📍",
    competence: "Structurer l'information",
    content: "Un tableur est une grille composée de colonnes (lettres) et de lignes (chiffres). L'intersection est une CELLULE.",
    details: [
      { h: "L'Adresse", p: "Chaque cellule a un nom unique, comme B4 (colonne B, ligne 4)." },
      { h: "La Plage", p: "Un groupe de cellules se note avec deux points. Exemple : A1:C10 désigne tout le rectangle entre A1 et C10." },
      { h: "Le Type", p: "Une cellule peut contenir du texte, un nombre, ou une formule." }
    ],
    deep: [
      { label: "Astuce Pix", text: "Pour figer une cellule dans une formule, on utilise le symbole $. Exemple : $A$1." }
    ]
  },
  {
    number: '02',
    title: "La Formule Magique",
    subtitle: "Le signe égal (=)",
    icon: "🟰",
    hasLab: true, // Lab Calcul
    competence: "Calculer avec des formules",
    content: "Pour qu'un tableur calcule, il faut commencer par '='. C'est l'instruction qui dit à l'ordinateur : 'Travaille !'.",
    details: [
      { h: "Opérateurs", p: "+ (addition), - (soustraction), * (multiplication), / (division)." },
      { h: "Calcul Dynamique", p: "Si tu tapes =A1+A2, le résultat change automatiquement si tu modifies les chiffres en A1 ou A2." },
      { h: "Priorités", p: "Comme en maths, les parenthèses permettent de choisir quel calcul faire en premier." }
    ]
  },
  {
    number: '03',
    title: "Fonctions & Filtres",
    subtitle: "Automatiser l'analyse",
    icon: "🧮",
    competence: "Traiter des données en masse",
    content: "Les fonctions évitent de faire les calculs à la main. Elles peuvent traiter des milliers de lignes en une seconde.",
    details: [
      { h: "SOMME & MOYENNE", p: "Les classiques pour totaliser ou calculer un score moyen sur une plage de données." },
      { h: "Le Tri", p: "Classer des noms par ordre alphabétique ou des prix du plus petit au plus grand." },
      { h: "Le Filtre", p: "Afficher uniquement les lignes qui répondent à un critère (ex: tous les élèves de 2nde A)." }
    ]
  },
  {
    number: '04',
    title: "Logique : La fonction SI",
    subtitle: "L'ordinateur décide",
    icon: "🤖",
    hasLab2: true, // Lab Logique
    competence: "Algorithmique appliquée",
    content: "Un tableur peut prendre des décisions simples grâce aux tests logiques. C'est la base de l'informatique.",
    details: [
      { h: "Syntaxe", p: "=SI(Test ; Valeur_si_vrai ; Valeur_si_faux)." },
      { h: "Exemple", p: "=SI(B2>=10 ; 'Admis' ; 'Refusé'). Le tableur vérifie la note et écrit le résultat." },
      { h: "Utilité", p: "Très utilisé pour le traitement automatisé de formulaires ou de factures." }
    ]
  },
  {
    number: '05',
    title: "Visualisation",
    subtitle: "Donner du sens aux chiffres",
    icon: "📊",
    competence: "Représenter des données",
    content: "Un tableau de 1000 lignes est illisible. Un graphique permet de comprendre la tendance en un coup d'œil.",
    details: [
      { h: "Histogramme", p: "Idéal pour comparer des quantités (bâtons)." },
      { h: "Secteurs", p: "Le fameux 'camembert', parfait pour montrer des parts de marché ou des pourcentages." },
      { h: "Lignes", p: "Pour montrer l'évolution d'une valeur dans le temps (ex: température)." }
    ]
  },
  {
    number: '06',
    title: "Big Data & Société",
    subtitle: "Les enjeux du stockage",
    icon: "🌐",
    competence: "Impact sociétal des données",
    content: "Le traitement massif des données (Big Data) change le monde, mais pose des questions de vie privée.",
    details: [
      { h: "Collecte", p: "Chaque clic, achat ou déplacement génère une ligne dans un tableur géant chez les géants du web." },
      { h: "Erreurs célèbres", p: "Une simple erreur de copier-coller dans Excel a déjà causé des pertes de milliards de dollars en finance." },
      { h: "RGPD", p: "Le règlement qui nous protège : tu as le droit de savoir quelles données sont stockées sur toi." }
    ]
  },
  {
    number: 'MISSION',
    title: "Projet Tableur",
    subtitle: "Missions SNT",
    icon: "🚀",
    isProject: true,
    intro: "Choisissez un terrain d'application pour vos compétences en gestion de données.",
    projects: [
      {
        topic: "Budget Voyage",
        desc: "Crée un simulateur de budget pour une sortie scolaire incluant transport, repas et visites.",
        livrable: "Tableau de calcul + Formule SOMME.",
        difficulty: "Débutant",
        duration: "15 min"
      },
      {
        topic: "Analyse Big Data",
        desc: "Enquête sur la faille 'Excel' qui a impacté les résultats du COVID-19 au Royaume-Uni.",
        livrable: "Fiche explicative sur la limite des lignes.",
        difficulty: "Expert Pix",
        duration: "20 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Par quoi commence TOUJOURS une formule ?",
    options: ["+", "@", "="],
    correct: 2,
    explanation: "Le signe '=' indique au logiciel qu'il doit interpréter le texte comme un calcul."
  },
  {
    q: "Que représente l'adresse $B$3 ?",
    options: ["Une cellule relative", "Une cellule figée (absolue)", "Une erreur"],
    correct: 1,
    explanation: "Les $ servent à bloquer la référence lors d'une recopie de formule."
  },
  {
    q: "Quelle fonction calcule la somme d'une plage ?",
    options: ["=TOTAL()", "=CALCUL()", "=SOMME()"],
    correct: 2,
    explanation: "La fonction SOMME additionne toutes les valeurs de la plage sélectionnée."
  },
  {
    q: "Un tableur permet de transformer des données en :",
    options: ["Vidéos", "Graphiques", "Musique"],
    correct: 1,
    explanation: "La visualisation (graphiques) est un rôle majeur du tableur."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Repérer', desc: 'Cellules & Plages' },
  { id: '02', label: 'Calculer', desc: 'Formules & Fonctions' },
  { id: '03', label: 'Analyser', desc: 'Filtres & tris' },
  { id: '04', label: 'Illustrer', desc: 'Graphiques' },
];

const COMPETENCES = [
  { key: 'addr', label: 'Structure', desc: 'Savoir adresser et organiser des données.' },
  { key: 'calc', label: 'Calcul', desc: 'Maîtriser les formules et fonctions automatiques.' },
  { key: 'visu', label: 'Visualisation', desc: 'Choisir le bon graphique pour un exposé.' },
  { key: 'soc', label: 'Big Data', desc: 'Comprendre les enjeux des bases de données massives.' },
];

// --- COMPOSANT PRINCIPAL ---

export default function ExcelChapter() {
  const [modeSession, setModeSession] = useState<ModeSession>('20min');
  const [view, setView] = useState<'home' | 'cours' | 'quiz' | 'resultat' | 'teacher'>('home');
  const [stepIdx, setStepIdx] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [labPoints, setLabPoints] = useState(0);
  const [lab1Ans, setLab1Ans] = useState<string | null>(null);
  const [lab2Ans, setLab2Ans] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Sauvegarde locale
  useEffect(() => {
    const saved = localStorage.getItem('snt_xp_excel');
    if (saved) setLabPoints(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_excel', labPoints.toString());
  }, [labPoints]);

  const totalXP = (score * QUIZ_POINTS) + labPoints;
  const currentStep = LESSON_STEPS[stepIdx];
  const progression = ((stepIdx + 1) / LESSON_STEPS.length) * 100;
  const totalSteps = LESSON_STEPS.length;

  const exportBilan = () => {
    setIsExporting(true);
    const text = `BILAN SNT - TABLEUR\nScore: ${score}/${QUIZ_QUESTIONS.length}\nXP: ${totalXP}\nNiveau: Expert Données`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snt_excel_bilan.txt`;
    a.click();
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleQuiz = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
  };

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-slate-900 font-sans selection:bg-emerald-200 pb-20">
      
      {/* NAV STYLE PIX */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/themes" className="font-black text-emerald-600 hover:text-black transition uppercase tracking-tighter shrink-0">
            ← SNT Academy
          </Link>
          
          <div className="flex gap-1 bg-slate-100 p-1 border-2 border-black hidden md:flex">
            {(['20min', '1h', '1h30'] as ModeSession[]).map(m => (
              <button key={m} onClick={() => setModeSession(m)}
                className={`px-3 py-1 text-[10px] font-black uppercase transition ${modeSession === m ? 'bg-emerald-500 text-white shadow-[2px_2px_0_#000]' : 'text-slate-500 hover:text-black'}`}>
                {m}
              </button>
            ))}
          </div>

          <button onClick={() => setView('teacher')} className="text-[10px] font-black text-slate-400 hover:text-black hidden sm:block">MODE PROF</button>

          <div className="font-black text-sm bg-emerald-100 border-2 border-black px-4 py-1 shadow-[3px_3px_0_#000] shrink-0">
            XP : {totalXP}
          </div>
        </div>
      </nav>

      {/* VUE ACCUEIL ENRICHIE */}
      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-6 shadow-[4px_4px_0_#000]">
              Thème 05 • Données Structurées
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-mono italic">
              TABLEUR &<br /><span className="text-emerald-500">CALCUL.</span>
            </h1>
            
            <div className="flex items-center gap-3 mb-10">
              <span className="h-0.5 w-10 bg-emerald-500"></span>
              <p className="text-[10px] text-emerald-900 leading-relaxed font-black uppercase tracking-widest">
                Parcours PIX : Traitement de données
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-xl text-slate-700 leading-relaxed font-bold">
                  Maîtriser les adresses de cellules, automatiser les calculs par fonctions et visualiser l&apos;information pour décider.
                </p>
                <div className="mt-8">
                  <button onClick={() => setView('cours')} className="px-10 py-5 bg-emerald-500 text-black border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    Lancer le module ⚡
                  </button>
                </div>
              </div>

              {/* REMARQUE A : Objectifs du module */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000]">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                  Objectifs du module
                </div>
                <ul className="text-sm font-bold text-slate-700 space-y-2">
                  <li>• Adressage relatif et absolu ($A$1).</li>
                  <li>• Syntaxe des formules (=) et opérateurs.</li>
                  <li>• Fonctions SOMME, MOYENNE et SI.</li>
                  <li>• Enjeux sociétaux du Big Data.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-28">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-12 text-slate-400 italic">Maîtrise du traitement de données</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DEMARCHE.map(d => (
                <div key={d.id} className="bg-white p-8 border-4 border-black shadow-[6px_6px_0_#000] group hover:bg-emerald-50 transition-all">
                  <div className="text-3xl font-black font-mono text-slate-200 group-hover:text-emerald-200 mb-4">{d.id}</div>
                  <div className="font-black text-xl leading-tight mb-2 uppercase">{d.label}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VUE COURS */}
      {view === 'cours' && (
        <main className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
          
          <div className="mb-16 flex justify-between items-end">
             <div className="flex gap-2">
                {LESSON_STEPS.map((_, i) => (
                  <div key={i} className={`w-8 h-8 border-4 border-black shadow-[3px_3px_0_#000] ${i <= stepIdx ? 'bg-emerald-500' : 'bg-white'}`} />
                ))}
             </div>
             <div className="font-black font-mono text-xl">{(progression).toFixed(0)}%</div>
          </div>

          <div className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0_#000]">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-4xl shadow-[4px_4px_0_#10B981] shrink-0">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-1 italic">{currentStep.competence}</h2>
                <h1 className="text-3xl md:text-5xl font-black font-mono tracking-tighter leading-none uppercase">{currentStep.title}</h1>
              </div>
            </div>

            {currentStep.isProject ? (
              <div className="space-y-8">
                {currentStep.projects?.map((p, i) => (
                  <div key={i} className="p-8 border-4 border-black bg-slate-50 shadow-[6px_6px_0_#000]">
                    <h4 className="font-black text-2xl uppercase tracking-tighter mb-4">{p.topic}</h4>
                    <p className="text-slate-600 text-base mb-6 font-bold">{p.desc}</p>
                    <div className="text-[10px] font-black text-emerald-600 uppercase italic border-t-2 border-slate-200 pt-6">Livrable : {p.livrable}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-bold mb-12 border-l-8 border-emerald-500 pl-8 py-2">
                  {currentStep.content}
                </p>
                
                <button onClick={() => setOpenDetail(!openDetail)} 
                  className="w-full py-5 px-6 bg-slate-100 border-4 border-black font-black uppercase text-[10px] tracking-widest hover:bg-emerald-100 transition-colors mb-10 flex justify-between items-center">
                  <span>{openDetail ? '− Moins d\'infos' : '+ Approfondir (Technique SNT)'}</span>
                  <span>{openDetail ? '▲' : '▼'}</span>
                </button>

                {openDetail && (
                  <div className="p-8 border-x-4 border-b-4 border-black bg-white space-y-10 mb-10">
                    {currentStep.details?.map((d, i) => (
                      <div key={i} className="grid md:grid-cols-4 gap-4">
                        <div className="text-[9px] font-black uppercase text-emerald-500 pt-1 tracking-widest leading-tight border-r-2 border-emerald-100 md:pr-4">{d.h}</div>
                        <div className="md:col-span-3 text-slate-700 text-base leading-relaxed font-bold">{d.p}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LAB Calcul */}
                {currentStep.hasLab && (
                  <div className="mt-12 bg-emerald-50 border-4 border-black p-8 shadow-[6px_6px_0_#000]">
                    <div className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest">
                      Compétence : Syntaxe des formules
                    </div>
                    <h4 className="text-emerald-900 font-black text-xs mb-6 uppercase tracking-[0.2em]">🧪 Challenge Calcul</h4>
                    <p className="text-lg font-bold mb-6 italic text-emerald-800 leading-tight">Comment écrit-on 10 + 10 pour qu&apos;Excel le calcule ?</p>
                    <div className="flex flex-wrap gap-4">
                      {['10+10', '=10+10'].map(v => (
                        <button key={v} onClick={() => { if(!lab1Ans){ setLab1Ans(v); if(v==='=10+10') setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all ${lab1Ans === v ? (v==='=10+10' ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white hover:bg-emerald-200 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* LAB Logique */}
                {currentStep.hasLab2 && (
                  <div className="mt-12 bg-emerald-900 border-4 border-black p-8 shadow-[6px_6px_0_#000] text-white">
                    <div className="text-[10px] font-black uppercase text-emerald-400 mb-4 tracking-widest">
                      Compétence : Algorithme SI
                    </div>
                    <h4 className="text-emerald-200 font-black text-xs mb-6 uppercase tracking-[0.2em]">🕵️ Défi Logique</h4>
                    <p className="text-lg font-bold mb-6 italic leading-tight">Quelle formule affiche &quot;OK&quot; si A1 est supérieur à 10 ?</p>
                    <div className="flex flex-col gap-3">
                      {['=SI(A1>10 ; "OK" ; "NON")', '=SI(A1=10 ; "OK")'].map(v => (
                        <button key={v} onClick={() => { if(!lab2Ans){ setLab2Ans(v); if(v.includes('; "NON"')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-6 py-4 border-4 border-black font-black text-xs uppercase text-left transition-all ${lab2Ans === v ? (v.includes('; "NON"') ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-emerald-900 hover:bg-emerald-200'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-between items-center px-4">
            <button onClick={() => { setStepIdx(s => Math.max(0, s - 1)); setOpenDetail(false); }} className="font-black text-xs uppercase text-slate-400 hover:text-black tracking-widest disabled:opacity-0" disabled={stepIdx === 0}>← Précédent</button>
            <button onClick={() => { if(stepIdx < totalSteps - 1) { setStepIdx(s => s + 1); setOpenDetail(false); } else setView('quiz'); }} className="px-10 py-5 bg-emerald-500 text-black border-4 border-black font-black uppercase text-base shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              {stepIdx === totalSteps - 1 ? "Défi Quiz Final ⚡️" : "Suivant →"}
            </button>
          </div>
        </main>
      )}

      {/* QUIZ */}
      {view === 'quiz' && (
        <main className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white border-4 border-black p-10 md:p-16 shadow-[12px_12px_0_#000]">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-12 uppercase italic border-b-8 border-emerald-500 inline-block">Certification Données</h2>
            <h3 className="text-2xl md:text-3xl font-black text-center mb-12 uppercase tracking-tighter leading-tight">{QUIZ_QUESTIONS[quizIdx].q}</h3>
            
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                const isCorrect = i === QUIZ_QUESTIONS[quizIdx].correct;
                let btnClass = "p-6 border-4 border-black font-black text-left uppercase text-base transition-all ";
                if (selectedAns === null) btnClass += "bg-white hover:bg-emerald-50 shadow-[6px_6px_0_#000]";
                else if (isCorrect) btnClass += "bg-green-400 text-black shadow-[3px_3px_0_#000]";
                else if (selectedAns === i) btnClass += "bg-red-400 text-black shadow-[3px_3px_0_#000]";
                else btnClass += "opacity-30";
                return (
                  <button key={i} onClick={() => handleQuiz(i)} className={btnClass} disabled={selectedAns !== null}>{opt}</button>
                );
              })}
            </div>

            {selectedAns !== null && (
              <div className="mt-12 p-8 bg-slate-50 border-4 border-black shadow-[6px_6px_0_#000]">
                <p className="text-base mb-8 font-bold leading-relaxed">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={() => { if(quizIdx < QUIZ_QUESTIONS.length - 1) { setQuizIdx(q=>q+1); setSelectedAns(null); } else setView('resultat'); }} 
                  className="w-full py-5 bg-black text-white font-black uppercase text-lg shadow-[6px_6px_0_#000]">
                  {quizIdx === QUIZ_QUESTIONS.length - 1 ? 'Bilan Final' : 'Suivant'}
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* RÉSULTAT */}
      {view === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in duration-1000">
          <div className="text-9xl mb-12 animate-bounce">📊</div>
          <h1 className="text-6xl md:text-8xl font-black font-mono mb-4 italic uppercase tracking-tighter leading-none">Data Analyst !</h1>
          
          <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[16px_16px_0_#000] mb-20 text-left">
            <div className="grid md:grid-cols-2 gap-12 border-b-4 border-slate-100 pb-12 mb-12">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Score Quiz</div>
                <div className="text-7xl font-black text-slate-900 font-mono">{score} / {QUIZ_QUESTIONS.length}</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">XP Progression</div>
                <div className="text-7xl font-black text-emerald-600 font-mono tracking-tighter">{totalXP}</div>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 border-b-2 border-emerald-500 inline-block pb-2">Bilan de Compétences Pix / SNT</div>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPETENCES.map(c => (
                <div key={c.key} className="p-6 bg-slate-50 border-2 border-black shadow-[4px_4px_0_#000]">
                  <div className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-tighter">{c.label}</div>
                  <div className="font-bold text-sm leading-tight text-slate-700">{c.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap gap-4 justify-center">
              <button onClick={exportBilan} className="px-8 py-4 bg-black text-white border-4 border-black font-black uppercase text-base shadow-[6px_6px_0_#000] hover:bg-emerald-600 transition flex items-center gap-3">
                {isExporting ? 'Exportation...' : '💾 Télécharger mon Bilan'}
              </button>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <button onClick={() => window.location.reload()} className="px-10 py-5 border-4 border-black font-black uppercase bg-white shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Recommencer</button>
            <Link href="/themes" className="px-10 py-5 bg-emerald-500 text-black border-4 border-black font-black uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Terminer</Link>
          </div>
        </main>
      )}

      {/* MODE PROF */}
      {view === 'teacher' && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-slate-900 text-white p-12 border-4 border-black shadow-[12px_12px_0_#000]">
              <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b-4 border-emerald-500 pb-4 inline-block">Guide Pédagogique (Tableur)</h1>
              
              <div className="space-y-12 font-bold">
                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Cibles PIX</h2>
                  <p className="text-slate-300">Compétence 1.3 : Traiter des données.</p>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Réponses du Quiz</h2>
                  <div className="space-y-2 text-xs">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={i} className="bg-slate-800 p-3 border-l-4 border-emerald-500">
                         {q.q} → {q.options[q.correct]}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Note Session</h2>
                  <p className="text-slate-300 text-sm">
                    Le mode 1h30 doit impérativement inclure la mission de calcul de budget voyage pour valider les acquis de la fonction SOMME.
                  </p>
                </section>
              </div>

              <button onClick={() => setView('home')} className="mt-16 px-8 py-4 bg-emerald-500 text-black font-black uppercase border-2 border-black shadow-[4px_4px_0_#FFF]">Fermer</button>
           </div>
        </main>
      )}

    </div>
  );
}
