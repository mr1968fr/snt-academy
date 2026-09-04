'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const LAB_POINTS = 150;
const QUIZ_POINTS = 100;

const LESSON_STEPS: Step[] = [
  {
    number: '01',
    title: "Protocoles & SMTP",
    subtitle: "Le voyage du message",
    icon: "🚀",
    competence: "Comprendre les infrastructures numériques",
    content: "Un mail ne circule pas par magie. Il suit des règles précises appelées protocoles pour passer d'un serveur à un autre.",
    details: [
      { h: "SMTP (Envoi)", p: "Simple Mail Transfer Protocol. C'est le facteur qui dépose ton mail dans la boîte du destinataire." },
      { h: "IMAP (Réception)", p: "Internet Message Access Protocol. Il permet de lire tes mails sur plusieurs appareils en restant synchronisé." }
    ]
  },
  {
    number: '02',
    title: "Anatomie d'un Mail",
    subtitle: "Objet et Netiquette",
    icon: "🎯",
    competence: "Communiquer et collaborer",
    content: "La forme de ton message influence la réponse que tu recevras. Un mail pro suit une structure normée.",
    details: [
      { h: "L'Objet", p: "Doit être explicite : [Classe][Nom][Sujet]." }
    ]
  },
  {
    number: '03',
    title: "Champs CC et CCI",
    subtitle: "Données & Vie Privée",
    icon: "👥",
    hasLab: true,
    competence: "Protéger les données personnelles",
    content: "Le choix du champ de destinataire est un acte de sécurité. Le champ CCI est le bouclier de la vie privée.",
    details: [
      { h: "CCI (Invisible)", p: "Les adresses sont masquées. Obligatoire pour les envois de masse (RGPD)." }
    ]
  },
  {
    number: '04',
    title: "Formats & Impact",
    subtitle: "Éco-numérique & PDF",
    icon: "🌱",
    competence: "Gérer des ressources numériques",
    content: "Chaque mail stocké consomme de l'énergie. L'optimisation des fichiers est un geste écologique.",
    details: [
      { h: "Le PDF", p: "Format universel. Fige la mise en page." }
    ]
  },
  {
    number: '05',
    title: "Sécurité : Phishing",
    subtitle: "Ingénierie Sociale",
    icon: "🕵️",
    hasLab2: true,
    competence: "Identifier les cyber-attaques",
    content: "Le hameçonnage utilise la manipulation psychologique pour voler tes identifiants ENT ou bancaires.",
    details: [
      { h: "L'URL", p: "Survolez les liens avec la souris pour voir l'adresse réelle." }
    ]
  },
  {
    number: 'MISSION',
    title: "Projet Final",
    subtitle: "Expertise Numérique",
    icon: "📨",
    isProject: true,
    intro: "Choisissez un scénario réel pour valider vos compétences.",
    projects: [
      {
        topic: "Audit Phishing",
        desc: "Analyse un mail suspect et liste 3 indices techniques d'arnaque.",
        livrable: "Fiche d'alerte sécurité.",
        difficulty: "Pix Expert",
        duration: "20 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Quel protocole sert à ENVOYER un mail ?",
    options: ["IMAP", "SMTP", "HTTP"],
    correct: 1,
    explanation: "SMTP (Simple Mail Transfer Protocol) est le standard pour l'envoi."
  },
  {
    q: "Quelle fonction utiliser pour cacher les adresses d'un groupe ?",
    options: ["CC", "CCI / BCC", "Destinataire principal"],
    correct: 1,
    explanation: "Le CCI masque les destinataires entre eux."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Infrastructures', desc: 'Protocoles SMTP/IMAP' },
  { id: '02', label: 'Codes Pro', desc: 'Netiquette & Objet' },
  { id: '03', label: 'Protection', desc: 'CC/CCI & RGPD' },
  { id: '04', label: 'Cyber-Défense', desc: 'Anti-Phishing' },
];

const COMPETENCES = [
  { key: 'smtp', label: 'Protocoles', desc: 'Expliquer comment un mail transite sur le réseau.' },
  { key: 'net', label: 'Netiquette', desc: 'Rédiger des messages adaptés.' },
  { key: 'cci', label: 'Vie Privée', desc: 'Maîtriser les champs CC/CCI.' },
  { key: 'phish', label: 'Sécurité', desc: 'Identifier le phishing.' },
];

export default function EmailSNTChapter() {
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

  useEffect(() => {
    const savedXP = localStorage.getItem('snt_xp_comm');
    if (savedXP) setLabPoints(parseInt(savedXP));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_comm', labPoints.toString());
  }, [labPoints]);

  const totalSteps = LESSON_STEPS.length;
  const totalXP = (score * QUIZ_POINTS) + labPoints;
  const currentStep = LESSON_STEPS[stepIdx];
  const progression = ((stepIdx + 1) / totalSteps) * 100;

  const handleQuiz = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans pb-20">
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black p-4 flex justify-between items-center">
        <Link href="/themes" className="font-black text-orange-600 uppercase tracking-tighter">← SNT Academy</Link>
        <div className="font-black text-sm bg-orange-100 border-2 border-black px-4 py-1">XP : {totalXP}</div>
      </nav>

      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">MAIL & <span className="text-orange-500">RESEAUX.</span></h1>
          <button onClick={() => setView('cours')} className="px-10 py-5 bg-orange-500 text-black border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000]">Démarrer ⚡</button>
        </main>
      )}

      {view === 'cours' && (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0_#000]">
            <h2 className="text-orange-600 font-black text-xs uppercase mb-2">{currentStep.subtitle}</h2>
            <h1 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">{currentStep.title}</h1>
            {currentStep.isProject ? (
               <div className="bg-slate-50 p-6 border-4 border-black font-bold">Mission : {currentStep.projects?.[0].topic}</div>
            ) : (
               <p className="text-2xl font-bold mb-8">{currentStep.content}</p>
            )}
            <button onClick={() => { if(stepIdx < totalSteps - 1) setStepIdx(s => s + 1); else setView('quiz'); }} className="mt-8 px-10 py-5 bg-orange-500 text-black border-4 border-black font-black uppercase">Suivant →</button>
          </div>
        </main>
      )}

      {view === 'quiz' && (
        <main className="max-w-2xl mx-auto px-6 py-20">
          <div className="bg-white border-4 border-black p-10 shadow-[12px_12px_0_#000]">
            <h3 className="text-2xl font-black mb-10 text-center">{QUIZ_QUESTIONS[quizIdx].q}</h3>
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => (
                <button key={i} onClick={() => handleQuiz(i)} className="p-6 border-4 border-black font-black text-left uppercase transition-all hover:bg-orange-50">{opt}</button>
              ))}
            </div>
            {selectedAns !== null && (
               <button onClick={() => { if(quizIdx < QUIZ_QUESTIONS.length -1) setQuizIdx(q=>q+1); else setView('resultat'); setSelectedAns(null); }} className="mt-8 w-full py-5 bg-black text-white font-black uppercase">Suivant</button>
            )}
          </div>
        </main>
      )}

      {view === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in">
          <h1 className="text-6xl font-black mb-12 italic uppercase tracking-tighter">Cyber-Expert !</h1>
          <div className="bg-white border-4 border-black p-12 shadow-[16px_16px_0_#000] mb-12">
            <div className="text-7xl font-black text-orange-600">{totalXP} XP</div>
          </div>
          <Link href="/themes" className="inline-block px-12 py-6 bg-orange-500 text-black border-4 border-black font-black text-xl uppercase">Terminer</Link>
        </main>
      )}
    </div>
  );
}
