'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Web ≠ Internet", content: "Internet est le réseau de câbles. Le Web est un service qui tourne dessus, comme le Mail ou le FTP. Le Web n'est né qu'en 1989 !", icon: "🌐", color: "border-blue-500", details: [{"h": "Définition", "p": "Internet est le réseau des réseaux : l'infrastructure mondiale, née dans les années 1970 autour de TCP/IP. Le Web n'est qu'UN service d'Internet : des pages reliées par des liens, transportées par HTTP. D'autres services existent : e-mail, visioconférence, jeux en ligne, pair-à-pair."}, {"h": "Exemple", "p": "Tu peux envoyer un e-mail ou visiochater SANS utiliser le Web : ces services circulent sur Internet sans être le Web."}, {"h": "À retenir", "p": "L'erreur classique : confondre les deux. Retiens l'image : le Web vit SUR Internet, comme la poste roule sur les routes."}, {"h": "Vocabulaire", "p": "réseau, service, HTTP, lien hypertexte."}] },
  { title: "2. Le CERN & Tim Berners-Lee", content: "Le Web a été inventé à Genève pour aider les scientifiques à partager des documents via des liens HYPERTEXTE. C'est la naissance du HTML.", icon: "📜", color: "border-amber-500", details: [{"h": "Définition", "p": "Le Web est inventé en 1989 au CERN (Genève) par Tim Berners-Lee, avec trois briques : HTML pour écrire les pages, HTTP pour les transporter, URL pour les adresser. L'ensemble est offert au domaine public en 1993."}, {"h": "Exemple", "p": "Le tout premier site web (info.cern.ch) expliquait simplement... ce qu'est le Web."}, {"h": "À retenir", "p": "Personne ne possède le Web : ni entreprise, ni État. C'est son principe fondateur."}, {"h": "Vocabulaire", "p": "HTML, HTTP, URL, domaine public."}] },
  { title: "3. Client-Serveur", content: "Ton navigateur est le CLIENT. Il demande une page au SERVEUR. C'est une discussion permanente en langage HTTP.", icon: "🔄", color: "border-indigo-500", hasLab: true, details: [{"h": "Définition", "p": "L'architecture du Web : le client (ton navigateur) envoie une requête, le serveur répond en envoyant la page. C'est TOUJOURS le client qui initie l'échange."}, {"h": "Exemple", "p": "Taper une URL, c'est envoyer une requête HTTP GET ; le serveur renvoie le fichier HTML et ton navigateur l'affiche."}, {"h": "À retenir", "p": "Ton navigateur est un client, pas un serveur : il ne répond jamais aux requêtes du monde entier."}, {"h": "Vocabulaire", "p": "requête, réponse, navigateur, hébergeur."}] },
  { title: "4. L'URL décortiquée", content: "HTTPS (protocole) + NOM DE DOMAINE + CHEMIN. Chaque page du monde a une adresse unique.", icon: "🔗", color: "border-green-500", hasLab2: true, details: [{"h": "Définition", "p": "Une URL se lit en 3 morceaux : protocole (https://) + nom de domaine (le serveur) + chemin (la ressource précise demandée)."}, {"h": "Exemple", "p": "Comme une adresse postale : le protocole est le mode de transport, le domaine est la ville, le chemin est la rue et le numéro."}, {"h": "À retenir", "p": "Le S de HTTPS signifie chiffré : personne ne peut lire tes données en route. Ne tape jamais de mot de passe sur un site en http simple."}, {"h": "Vocabulaire", "p": "URL, protocole, nom de domaine, chemin, chiffrement."}] },
  { title: "5. Moteurs de recherche : l'index et le vote", content: "Google ne fouille pas le web en direct : des robots (les crawlers) le parcourent en permanence pour construire un INDEX, une bibliothèque géante déjà triée. Ta recherche interroge cet index. Et le classement (PageRank) compte les liens comme des votes : plus une page est citée, plus elle remonte. C'est le référencement naturel — une page vers laquelle aucun lien ne pointe est invisible.", icon: "🧭", color: "border-cyan-500", details: [{"h": "Définition", "p": "Un moteur ne fouille pas le web en direct : des robots (crawlers) le parcourent en suivant les liens et construisent un index géant. Ta requête interroge cet index ; le classement (PageRank) compte les liens comme des votes."}, {"h": "Exemple", "p": "Une page citée par 500 sites apparaît devant une page plus ancienne mais ignorée de tous : la popularité prime."}, {"h": "À faire maintenant", "p": "Cherche « seconde SNT » sur deux moteurs différents et compare les 5 premiers résultats : pourquoi ne sont-ils pas identiques ?"}, {"h": "À retenir", "p": "Moteur de recherche ≠ navigateur ≠ page d'accueil : trois choses souvent confondues. Le référencement naturel est gratuit ; les places publicitaires, elles, se paient."}, {"h": "Vocabulaire", "p": "crawler, index, PageRank, référencement."}] },
  { title: "6. Cookies & Tracking", content: "Les cookies sont des petits fichiers déposés par les sites pour se souvenir de toi. Pratique pour rester connecté, mais dangereux pour ta vie privée.", icon: "🍪", color: "border-orange-500", details: [{"h": "Définition", "p": "Un cookie est un petit fichier qu'un site dépose dans ton navigateur pour se souvenir de toi : garder ta session, ton panier... ou te suivre de site en site à des fins publicitaires."}, {"h": "Exemple", "p": "Un article regardé un soir réapparaît en publicité partout le lendemain : un cookie tiers t'a reconnu."}, {"h": "À retenir", "p": "Depuis le RGPD, ton consentement est obligatoire, et refuser les cookies tiers est toujours possible."}, {"h": "Vocabulaire", "p": "cookie, cookie tiers, traceur, consentement."}] },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Le Deep Web & Dark Web", desc: "Fantasmes vs Réalité : qu'est-ce qui se cache vraiment dans les zones non-indexées ?", difficulty: "Avancé" },
      { topic: "L'histoire des navigateurs", desc: "De Netscape à Chrome : pourquoi certains ont gagné la guerre du Web ?", difficulty: "Débutant" },
      { topic: "Accessibilité numérique", desc: "Comment le Web s'adapte-t-il aux personnes malvoyantes ou handicapées ?", difficulty: "Intermédiaire" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Qui a inventé le Web ?", options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs"], correct: 1, explanation: "C'est Tim Berners-Lee au CERN en 1989." },
  { q: "Que signifie le 'S' dans HTTPS ?", options: ["Simple", "Secure", "Speed"], correct: 1, explanation: "Le protocole est sécurisé (chiffré)." },
  { q: "Lequel est un navigateur ?", options: ["Google", "Firefox", "Instagram"], correct: 1, explanation: "Firefox permet d'afficher les pages Web." },
  { q: "Quand tu lances une recherche, Google fouille…", options: ["Tout le web en direct", "Son index, construit à l'avance par des robots", "Uniquement les sites payants"], correct: 1, explanation: "Des crawlers parcourent le web en continu et remplissent un index géant : la recherche se fait dans cette bibliothèque déjà triée." },
  { q: "Comment une page remonte-t-elle dans les résultats ?", options: ["Elle paie Google", "Elle reçoit beaucoup de liens pointant vers elle (des « votes »)", "Elle est la plus ancienne"], correct: 1, explanation: "C'est l'idée du PageRank : chaque lien est un vote. C'est le référencement naturel, non payant." },
];

export default function WebChapter() {
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
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Thème 2 : Le Web</div>
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
                <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 mt-4 text-center italic">
                  <h4 className="text-blue-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left">🧪 LAB : Client ou Serveur ?</h4>
                  <p className="text-xs text-blue-700 mb-4 font-bold italic">« Ton navigateur demande une page »</p>
                  <div className="flex gap-2 justify-center">
                    {['Client', 'Serveur'].map(val => (
                      <button key={val} onClick={() => { setLab1Answer(val); if(val === 'Client') setBonusXP(150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab1Answer === val ? (val === 'Client' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-blue-600 border border-blue-200'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              )}
              {LESSON_STEPS[step].hasLab2 && (
                <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100 mt-4 text-center italic">
                  <h4 className="text-green-900 font-black text-sm mb-4 uppercase tracking-widest italic text-left">🧪 LAB : L'adresse URL</h4>
                  <p className="text-xs text-green-700 mb-4 font-bold italic">« www.google.fr » est :</p>
                  <div className="flex gap-2 justify-center">
                    {['Un protocole', 'Un nom de domaine'].map(val => (
                      <button key={val} onClick={() => { setLab2Answer(val); if(val === 'Un nom de domaine') setBonusXP(prev => prev + 150); }} className={`px-4 py-2 rounded-xl font-bold transition-all ${lab2Answer === val ? (val === 'Un nom de domaine' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white text-green-600 border border-green-200'}`}>{val}</button>
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
              <h2 className="text-4xl font-black text-blue-600 italic tracking-tighter uppercase italic text-center">Explorateur !</h2>
              <div className="text-6xl font-black my-8">{score * 100 + bonusXP} <span className="text-2xl text-slate-400">XP</span></div>
              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <div className="text-2xl font-black italic uppercase leading-none italic tracking-widest text-center">Navigateur de Confiance</div>
              </div>
            </div>
            <Link href="/themes" className="block w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-black transition-all">RETOUR AU CATALOGUE</Link>
          </div>
        )}
      </div>
    </div>
  );
}