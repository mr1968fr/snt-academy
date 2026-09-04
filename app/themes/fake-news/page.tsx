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
  content: string;
  icon: string;
  competence?: string;
  details?: Detail[];
  hasLab?: boolean;
  hasLab2?: boolean;
  isProject?: boolean;
  intro?: string;
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
    title: "Économie de l'Attention",
    subtitle: "Pourquoi l'infox se propage",
    icon: "🎣",
    competence: "Évaluation de l'information (Pix 1.2)",
    content: "Une fausse nouvelle se propage 6 fois plus vite qu'une vraie information. Les algorithmes privilégient l'engagement (réactions, colère, peur) plutôt que la vérité.",
    details: [
      { h: "Piège à clics (Clickbait)", p: "Des titres racoleurs conçus pour déclencher une émotion forte et faire cliquer sans lire l'article. INCROYABLE, CHOQUANT, ILS NOUS CACHENT TOUT..." },
      { h: "Fermes à contenus", p: "Des sites créent de fausses informations uniquement pour générer des affichages publicitaires et gagner de l'argent. Pendant le COVID, des dizaines de sites vendaient des remèdes miracles." },
      { h: "Biais de confirmation", p: "Notre cerveau a tendance à croire immédiatement une information qui confirme ce qu'il pense déjà. L'émotion éteint l'esprit critique." },
      { h: "Réflexe n°1", p: "Si un titre te met en colère instantanément... STOP. C'est peut-être exactement l'effet recherché." }
    ],
    deep: [
      { label: "Étude MIT (2018)", text: "Sur Twitter, les fausses informations se diffusent plus loin, plus vite et plus profondément que les vraies — surtout en politique." },
      { label: "Enjeu SNT", text: "Les bulles de filtres créées par les réseaux sociaux nous enferment dans des contenus similaires, renforçant les fausses croyances." }
    ]
  },
  {
    number: '02',
    title: "Anatomie d'une URL & Source",
    subtitle: "Qui parle et d'où ?",
    icon: "🔍",
    hasLab: true,
    competence: "Mener une recherche d'information",
    content: "L'adresse d'un site web (URL) et sa page 'À propos' sont les premières pistes pour débusquer une usurpation d'identité ou un faux média.",
    details: [
      { h: "Usurpation de domaine", p: "Attention aux fautes subtiles : lemonde.fr.co ou lefigaro-news.net ne sont pas les vrais journaux. Les arnaqueurs copient logos et charte graphique." },
      { h: "Qui sommes-nous ?", p: "Un site d'information sérieux présente une rédaction identifiée, un directeur de publication et des mentions légales. Pas de page 'À propos' ? Signal d'alerte majeur." },
      { h: "Agences de presse", p: "Des agences mondiales (AFP, Reuters, AP) vérifient les faits sur le terrain avant de diffuser les dépêches aux médias." },
      { h: "L'auteur & la date", p: "L'article est-il signé ? Peut-on retrouver ce journaliste ailleurs ? Une vraie info recyclée hors contexte devient une fake news." }
    ],
    deep: [
      { label: "Technique SIFT", text: "Stop / Investigate the source / Find better coverage / Trace to the original : la méthode en 4 temps des fact-checkers professionnels." },
      { label: "Actualité DSA", text: "Depuis le règlement européen DSA (2024), les grandes plateformes doivent mieux identifier les sources et signaler les contenus trompeurs." }
    ]
  },
  {
    number: '03',
    title: "Image inversée & OSINT",
    subtitle: "Tracer l'origine d'une photo",
    icon: "🖼️",
    competence: "Utiliser des outils de recherche avancée",
    content: "Une photo authentique est souvent détournée de son contexte original (autre date, autre lieu) pour créer une fausse rumeur. L'image hors contexte est la fake news la plus répandue.",
    details: [
      { h: "Recherche inversée", p: "Google Lens, TinEye ou Yandex permettent d'importer une photo pour retrouver sa toute première publication sur le Web. C'est l'outil n°1 du fact-checker." },
      { h: "Le détournement", p: "Exemples réels : une photo de manifestation en Espagne présentée comme une manif en France ; une vidéo de jeu vidéo (Arma 3) présentée comme des images de guerre." },
      { h: "Indices visuels (OSINT)", p: "Observer les plaques d'immatriculation, les panneaux de rue, la météo ou la position du soleil pour vérifier le lieu. Panneaux dans une autre langue, végétation incohérente avec la date annoncée." },
      { h: "Métadonnées EXIF", p: "Les fichiers originaux contiennent l'heure, la date et parfois les coordonnées GPS exactes de la prise de vue." }
    ],
    deep: [
      { label: "Outil pro", text: "InVID/WeVerify : extension utilisée par les journalistes pour analyser les vidéos image par image et vérifier leurs métadonnées." },
      { label: "Cas d'école", text: "En 2023-2024, de fausses images des conflits en Ukraine et au Proche-Orient ont circulé massivement, vues des dizaines de millions de fois avant démenti." }
    ]
  },
  {
    number: '04',
    title: "IA Générative & Deepfakes",
    subtitle: "Quand le virtuel imite le réel",
    icon: "🤖",
    hasLab2: true,
    competence: "Protéger et analyser les contenus synthétiques",
    content: "Les modèles d'IA (Midjourney, Sora, ChatGPT, ElevenLabs) génèrent aujourd'hui des textes, voix et vidéos ultra-réalistes en quelques secondes. Voir ne suffit plus pour croire.",
    details: [
      { h: "Artéfacts visuels", p: "Inspectez les détails fins : arrière-plans flous, incohérences d'ombres, mains déformées (6 doigts), textes illisibles dans l'image, dents fusionnées, reflets incohérents dans les yeux." },
      { h: "Clonage vocal & Deepfake", p: "Quelques secondes d'échantillon sonore suffisent à une IA pour imiter la voix d'une personnalité politique ou d'un proche. Des arnaques ont coûté 25 millions de dollars (Hong Kong 2024)." },
      { h: "Standard C2PA", p: "Un filigrane numérique cryptographique intégré dans les fichiers pour prouver si une image a été générée par une IA. OpenAI (Sora) et Google (Veo) l'utilisent désormais." },
      { h: "Le 'liar's dividend'", p: "Piège inversé : comme tout peut être truqué, certains accusent de 'deepfake' des vidéos... réelles qui les dérangent. Douter de tout est aussi dangereux que croire tout." }
    ],
    deep: [
      { label: "Actualité 2024-2025", text: "Les modèles IA ajoutent des filigranes invisibles (C2PA) pour tracer l'origine des contenus. La loi française punit la diffusion de deepfakes non signalés." }
    ]
  },
  {
    number: '05',
    title: "Bulles de filtres & Algorithmes",
    subtitle: "Pourquoi tu vois ce que tu vois",
    icon: "🫧",
    competence: "Comprendre la recommandation algorithmique",
    content: "Ton fil TikTok, YouTube ou Instagram n'est pas le monde : c'est une sélection faite par un algorithme qui veut te garder le plus longtemps possible. Un fait n'est validé que s'il est confirmé par plusieurs sources indépendantes.",
    details: [
      { h: "La bulle de filtres", p: "L'algorithme te montre ce qui te plaît déjà. Résultat : tu ne vois presque jamais d'opinions contraires, ce qui renforce tes certitudes et fausses croyances." },
      { h: "L'engagement avant tout", p: "Les contenus qui provoquent des réactions (même négatives) sont favorisés. La polémique rapporte plus que la nuance. Les algorithmes mettent en avant l'émotion forte." },
      { h: "Fermes à trolls", p: "Des comptes automatisés (bots) ou coordonnés amplifient artificiellement certains sujets pour créer une illusion de popularité (#trending)." },
      { h: "Sortir de sa bulle", p: "Suivre des médias variés, comparer les traitements d'un même événement, utiliser des agrégateurs d'actualité pluralistes." }
    ],
    deep: [
      { label: "Enjeu démocratique", text: "En janvier 2025, Meta a remplacé le fact-checking par des 'Community Notes'. Le débat sur la modération des plateformes est plus vif que jamais." },
      { label: "À discuter", text: "Qui doit décider de ce qui est vrai en ligne ? Les plateformes, les États, les journalistes, les utilisateurs ?" }
    ]
  },
  {
    number: '06',
    title: "La Méthode Fact-Checking",
    subtitle: "Cross-check & Recoupement",
    icon: "🗞️",
    competence: "Vérifier la fiabilité des sources",
    content: "Une vraie information est confirmée par plusieurs sources indépendantes et fiables. Si un seul site inconnu en parle, c'est un signal d'alarme majeur.",
    details: [
      { h: "Recouper l'info", p: "Si une annonce spectaculaire n'apparaît sur AUCUN média reconnu (AFP, Reuters, Franceinfo, Le Monde), c'est très probablement une infox." },
      { h: "Cellules de vérification", p: "AFP Factuel, Les Décodeurs (Le Monde), CheckNews (Libération), Snopes : des journalistes dont le métier est de vérifier les rumeurs virales." },
      { h: "Remonter la chaîne", p: "Ne pas se fier à un post TikTok ou X : chercher le document original, le rapport officiel ou la vidéo brute. Qui a publié l'info en premier ?" },
      { h: "Le droit de douter", p: "Ne pas savoir est une réponse acceptable. Mieux vaut attendre 24h qu'une info se confirme que propager une intox." }
    ],
    deep: [
      { label: "Règle d'or", text: "Une affirmation extraordinaire exige des preuves extraordinaires." },
      { label: "EMI", text: "L'Éducation aux Médias et à l'Information fait partie du parcours citoyen : ces réflexes te serviront toute ta vie." }
    ]
  },
  {
    number: 'MISSION',
    title: "Enquête Fact-Checking",
    subtitle: "Projet Pratique",
    icon: "🚀",
    isProject: true,
    intro: "Choisissez une enquête d'investigation numérique pour valider vos compétences de fact-checker. À toi de jouer : mène une vraie enquête comme un journaliste de l'AFP.",
    projects: [
      {
        topic: "Enquête OSINT Image",
        desc: "Une photo virale prétend montrer un événement historique récent. Utilisez la recherche inversée pour trouver la vraie date et le lieu d'origine.",
        livrable: "Rapport de vérification (Lien d'origine + 2 preuves).",
        difficulty: "Intermédiaire",
        duration: "15 min"
      },
      {
        topic: "Audit Deepfake IA",
        desc: "Analysez une vidéo ou image générée par IA. Listez 4 indices techniques (artéfacts, ombres, textures) prouvant le trucage. Testez un détecteur en ligne.",
        livrable: "Fiche de détection Deepfake + grille d'analyse visuelle.",
        difficulty: "Pix Expert",
        duration: "20 min"
      },
      {
        topic: "Anatomie d'une intox",
        desc: "Choisissez une fake news démontée par l'AFP Factuel ou Les Décodeurs : retracez son parcours (origine, amplification, démenti). Étudiez l'absence de sources et le modèle économique.",
        livrable: "Frise chronologique de propagation en 5 étapes + grille de crédibilité.",
        difficulty: "Exploration",
        duration: "20 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Pourquoi les fausses nouvelles se propagent-elles plus vite sur les réseaux ?",
    options: ["Elles sont relues par des profs", "Elles déclenchent des émotions fortes (colère, peur)", "Elles sont plus courtes"],
    correct: 1,
    explanation: "Les algorithmes mettent en avant les contenus qui suscitent de l'engagement rapide, souvent lié aux émotions. La colère, la peur et l'indignation éteignent l'esprit critique et accélèrent le partage."
  },
  {
    q: "Quel outil permet de savoir si une photo a été publiée il y a 3 ans sous un autre contexte ?",
    options: ["Un filtre Instagram", "La recherche d'image inversée (Google Lens / TinEye)", "Un antivirus"],
    correct: 1,
    explanation: "La recherche inversée scrute le web pour retrouver les occurrences passées d'un fichier visuel : date, lieu, contexte réel. C'est l'outil n°1 du fact-checker."
  },
  {
    q: "Un site s'appelle 'lemonde-actu.net' avec le logo du Monde. Que devez-vous penser ?",
    options: ["C'est le site officiel", "C'est probablement une imitation frauduleuse", "C'est la version gratuite"],
    correct: 1,
    explanation: "Vérifiez toujours l'URL exacte : les sites d'intox imitent les médias reconnus pour voler leur crédibilité. lemonde.fr est le seul site officiel."
  },
  {
    q: "Qu'est-ce qu'un artéfact visuel dans une image IA ?",
    options: ["Un virus informatique", "Un défaut incohérent (mains à 6 doigts, texte illisible, ombres fausses)", "Une bonne résolution"],
    correct: 1,
    explanation: "Les modèles d'IA générative commettent encore des erreurs anatomiques ou physiques qu'un œil attentif peut détecter : mains déformées, reflets incohérents, textes illisibles."
  },
  {
    q: "Une information incroyable n'est reprise par AUCUN média reconnu. Que devez-vous faire ?",
    options: ["La partager immédiatement sur WhatsApp", "Attendre une confirmation par des sources recoupées", "Créer une vidéo TikTok"],
    correct: 1,
    explanation: "Le recoupement par des sources journalistiques indépendantes est la clé de la fiabilité. Ne pas savoir est acceptable : mieux vaut attendre 24h que propager une intox."
  },
  {
    q: "Ton fil TikTok ne montre que des opinions que tu aimes déjà. C'est :",
    options: ["Un hasard total", "L'effet de la bulle de filtres algorithmique", "La preuve que tout le monde pense comme toi"],
    correct: 1,
    explanation: "L'algorithme maximise ton temps d'écran en te montrant ce qui te plaît : ta vision du monde s'en trouve déformée. Tu ne vois presque jamais d'opinions contraires."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Stop', desc: 'Émotion = pause' },
  { id: '02', label: 'Source', desc: 'Qui & URL' },
  { id: '03', label: 'Analyser', desc: 'OSINT & IA' },
  { id: '04', label: 'Recouper', desc: 'Fact-checkers' },
];

const COMPETENCES = [
  { key: 'eval', label: 'Évaluation Info', desc: 'Évaluer la fiabilité des sources et des contenus numériques (Pix 1.2).' },
  { key: 'osint', label: 'Outils Recherche', desc: 'Utiliser la recherche d\'image inversée et analyser les métadonnées OSINT.' },
  { key: 'ia', label: 'Détection IA', desc: 'Identifier les contenus synthétiques (deepfakes) et leurs artéfacts visuels.' },
  { key: 'algo', label: 'Algorithmes', desc: 'Comprendre bulles de filtres, recommandations et mécanismes de viralité.' },
];

// --- COMPOSANT PRINCIPAL ---

export default function FakeNewsChapter() {
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

  // Sauvegarde locale de l'XP
  useEffect(() => {
    const savedXP = localStorage.getItem('snt_xp_fakenews');
    if (savedXP) setLabPoints(parseInt(savedXP));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_fakenews', labPoints.toString());
  }, [labPoints]);

  const totalXP = (score * QUIZ_POINTS) + labPoints;
  const currentStep = LESSON_STEPS[stepIdx];
  const totalSteps = LESSON_STEPS.length;
  const progression = ((stepIdx + 1) / totalSteps) * 100;

  const startCourse = () => {
    setView('cours');
    setStepIdx(0);
    setScore(0);
    setQuizIdx(0);
    setSelectedAns(null);
    setOpenDetail(false);
  };

  // Fonction d'exportation du bilan
  const exportBilan = () => {
    setIsExporting(true);
    const text = `
=================================================
       SNT ACADEMY : FACT-CHECKING & INFOX       
=================================================
Session choisie   : ${modeSession}
Score Questionnaire : ${score} / ${QUIZ_QUESTIONS.length}
Points XP (Labs)   : ${labPoints}
Total XP Accumulé  : ${totalXP}

COMPÉTENCES PIX VALIDÉES :
- Évaluation de l'information (1.2)
- Recherche inversée et analyse OSINT
- Détection des contenus synthétiques / Deepfakes IA
- Bulles de filtres et algorithmes de recommandation
- Recoupement et fact-checking professionnel

Document généré le : ${new Date().toLocaleDateString('fr-FR')}
=================================================
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bilan_snt_factchecking_${new Date().toLocaleDateString('fr-FR')}.txt`;
    a.click();
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleQuiz = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(q => q + 1);
      setSelectedAns(null);
    } else {
      setView('resultat');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-rose-200 pb-20">
      
      {/* NAVIGATION PIX V2 */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/themes" className="font-black text-rose-600 hover:text-black transition uppercase tracking-tighter shrink-0">
            ← SNT Academy
          </Link>
          
          <div className="flex gap-1 bg-slate-100 p-1 border-2 border-black hidden md:flex">
            {(['20min', '1h', '1h30'] as ModeSession[]).map(m => (
              <button
                key={m}
                onClick={() => setModeSession(m)}
                className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${
                  modeSession === m ? 'bg-rose-500 text-white shadow-[2px_2px_0_#000]' : 'text-slate-500 hover:text-black'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button onClick={() => setView('teacher')} className="text-[10px] font-black text-slate-400 hover:text-black hidden sm:block">MODE PROF</button>

          <div className="font-black text-sm bg-rose-100 border-2 border-black px-4 py-1 shadow-[3px_3px_0_#000] shrink-0">
            XP : {totalXP}
          </div>
        </div>
      </nav>

      {/* ACCUEIL DÉTAILLÉ */}
      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-6 shadow-[4px_4px_0_#000]">
              Thème SNT • Web & Information
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-mono italic">
              VERIFIER<br /><span className="text-rose-600">L&apos;INFO.</span>
            </h1>
            
            {/* Lien SNT / Pix */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-0.5 w-10 bg-rose-500"></span>
              <p className="text-xs text-rose-900 leading-relaxed font-black uppercase tracking-widest">
                Parcours PIX : Évaluation de l&apos;Information & Fact-Checking
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-xl text-slate-700 leading-relaxed font-bold">
                  Déjouer les pièges à clics, maîtriser la recherche d&apos;image inversée et repérer les truquages générés par IA. À l&apos;ère des deepfakes, apprends les réflexes des fact-checkers professionnels.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={startCourse} className="px-10 py-5 bg-rose-500 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-all">
                    Démarrer l&apos;enquête ⚡
                  </button>
                </div>
              </div>

              {/* Objectifs du module */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000]">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                  Objectifs du module
                </div>
                <ul className="text-sm font-bold text-slate-700 space-y-2">
                  <li>• Comprendre les rouages de la viralité (bulles de filtres).</li>
                  <li>• Analyser la crédibilité d&apos;une source et d&apos;une URL.</li>
                  <li>• Effectuer des recherches d&apos;images inversées (OSINT).</li>
                  <li>• Détecter les artéfacts créés par les IA génératives.</li>
                  <li>• Recouper l&apos;info comme un fact-checker de l&apos;AFP.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TA DÉMARCHE */}
          <div className="mt-28">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-12 text-slate-400">La méthode du fact-checker</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DEMARCHE.map(d => (
                <div key={d.id} className="bg-white p-8 border-4 border-black shadow-[6px_6px_0_#000] group hover:bg-rose-50 transition-all">
                  <div className="text-3xl font-black font-mono text-slate-200 group-hover:text-rose-200 mb-4">{d.id}</div>
                  <div className="font-black text-xl leading-tight mb-2 uppercase">{d.label}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTE PROFESSEUR */}
          <div className="mt-20 bg-rose-100 border-4 border-black p-8 shadow-[8px_8px_0_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🔍</div>
            <div className="text-xs font-black uppercase tracking-widest text-rose-800 mb-4 border-b-2 border-rose-200 pb-2 inline-block">Note de Pilotage Pédagogique</div>
            <p className="text-sm text-rose-900 leading-relaxed font-bold max-w-4xl">
              Ce module vise la compétence PIX <span className="font-black">1.2 Évaluer l&apos;information</span> dans le cadre du thème SNT « Le Web & Les Réseaux Sociaux ». 
              Le mode <span className="underline">{modeSession}</span> permet d&apos;adapter la séance entre sensibilisation rapide (20 min) et ateliers d&apos;investigation numérique guidée (1h30). 
              {modeSession === '20min' && " Focus sur les 3 réflexes vitaux : stop, source, recoupement."}
              {modeSession === '1h' && " Parcours complet avec approfondissements sur l'IA et les algorithmes."}
              {modeSession === '1h30' && " La mission d'enquête réelle (recherche inversée) est le cœur de la séance."}
            </p>
          </div>

          {/* SOMMAIRE */}
          <div className="mt-24">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Sommaire du parcours</div>
            <div className="space-y-4">
              {LESSON_STEPS.slice(0, 6).map((s) => (
                <div key={s.number} className="flex items-center gap-6 p-4 bg-white border-2 border-slate-200 hover:border-black transition-colors shadow-sm">
                  <span className="font-mono font-black text-2xl text-slate-200">{s.number}</span>
                  <div>
                    <div className="font-black uppercase text-sm">{s.title}</div>
                    <div className="text-xs text-slate-500 font-bold">{s.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ÉCRAN DE COURS DÉTAILLÉ */}
      {view === 'cours' && (
        <main className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* BARRE DE PROGRESSION PIXEL */}
          <div className="mb-16">
            <div className="flex justify-between items-end mb-4">
              <div className="flex gap-2">
                {LESSON_STEPS.map((_, i) => (
                  <div key={i} className={`w-8 h-8 border-4 border-black shadow-[3px_3px_0_#000] transition-all ${i <= stepIdx ? 'bg-rose-500' : 'bg-white'}`} />
                ))}
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-black uppercase text-slate-400">Avancement</div>
                 <div className="font-black font-mono text-xl leading-none">{(progression).toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {/* CARTE DE CONTENU PRINCIPALE */}
          <div className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0_#000] relative">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-4xl shadow-[4px_4px_0_#E11D48]">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-rose-600 font-black text-[10px] uppercase tracking-[0.4em] mb-1">{currentStep.competence}</h2>
                <h1 className="text-4xl md:text-6xl font-black font-mono mb-0 tracking-tighter leading-none uppercase">{currentStep.title}</h1>
              </div>
            </div>

            {currentStep.isProject ? (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-black text-white p-6 border-4 border-black font-black text-xs uppercase tracking-[2px] text-center leading-relaxed">
                  Mission Fact-Checking • Mode {modeSession}
                </div>
                <p className="text-lg font-bold text-slate-600 italic border-l-8 border-rose-500 pl-6">
                  {currentStep.intro}
                </p>
                <div className="grid gap-6">
                  {currentStep.projects?.map((p, i) => (
                    <div key={i} className="p-8 border-4 border-black bg-slate-50 shadow-[6px_6px_0_#000] hover:bg-white hover:-translate-y-1 transition-all">
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <h4 className="font-black text-2xl leading-none uppercase tracking-tighter">{p.topic}</h4>
                        <span className="text-[10px] font-black bg-rose-500 text-white border-2 border-black px-3 py-1 uppercase shrink-0">{p.difficulty}</span>
                      </div>
                      <p className="text-slate-600 text-base mb-6 leading-relaxed font-bold">{p.desc}</p>
                      <div className="text-xs font-black text-rose-600 uppercase tracking-tighter italic border-t-2 border-slate-200 pt-6 flex items-center gap-2">
                        <span className="text-black not-italic">Livrable attendu :</span> {p.livrable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-bold mb-12 border-l-8 border-rose-500 pl-8 py-2">
                  {currentStep.content}
                </p>
                
                {/* ACCORDÉON DE DÉTAILS */}
                <div className="mb-10">
                  <button 
                    onClick={() => setOpenDetail(!openDetail)} 
                    className="w-full flex justify-between items-center py-5 px-6 bg-slate-100 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-rose-100 transition-colors"
                  >
                    <span>{openDetail ? '− Cacher les méthodes d\'enquête' : '+ Approfondir (Méthodologie & Technique)'}</span>
                    <span className="text-xl">{openDetail ? '▲' : '▼'}</span>
                  </button>

                  {openDetail && (
                    <div className="p-8 border-x-4 border-b-4 border-black bg-white space-y-10 animate-in slide-in-from-top-4">
                      {currentStep.details?.map((d, i) => (
                        <div key={i} className="grid md:grid-cols-4 gap-6">
                          <div className="text-[10px] font-black uppercase text-rose-600 pt-1 tracking-widest leading-tight border-r-2 border-rose-100 md:pr-4">{d.h}</div>
                          <div className="md:col-span-3 text-slate-700 text-base leading-relaxed font-bold">{d.p}</div>
                        </div>
                      ))}
                      {currentStep.deep && (
                        <div className="mt-8 pt-8 border-t-2 border-slate-100">
                           <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Éclairage SNT / Expert</div>
                           {currentStep.deep.map((dp, i) => (
                             <div key={i} className="mb-4 text-sm font-bold italic text-slate-500">
                               <span className="text-rose-600 uppercase mr-2">{dp.label} :</span> {dp.text}
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MINI-LABS INTERACTIFS */}
                {currentStep.hasLab && (
                  <div className="mt-12 bg-rose-50 border-4 border-black p-8 shadow-[6px_6px_0_#000] relative">
                    <div className="absolute -top-4 -left-4 bg-rose-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-rose-600 mb-2 tracking-widest">
                      Compétence : Adopter le réflexe &quot;Stop&quot;
                    </div>
                    <h4 className="text-rose-900 font-black text-xs mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                      🧪 Challenge Réflexe Source
                    </h4>
                    <p className="text-lg font-bold mb-6 italic text-rose-950 leading-tight">Une image virale montre un événement incroyable. Quel est votre premier réflexe ?</p>
                    <div className="flex flex-wrap gap-4">
                      {['Partager tout de suite', 'Lancer une recherche inversée'].map(v => (
                        <button key={v} onClick={() => { if(!lab1Ans){ setLab1Ans(v); if(v==='Lancer une recherche inversée') setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all ${lab1Ans === v ? (v==='Lancer une recherche inversée' ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white hover:bg-rose-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab1Ans === 'Partager tout de suite' && (
                      <p className="mt-4 text-sm font-bold text-rose-700 italic">⚠️ Partager immédiatement, c&apos;est devenir relais d&apos;une éventuelle intox. La vérification d&apos;abord !</p>
                    )}
                  </div>
                )}

                {currentStep.hasLab2 && (
                  <div className="mt-12 bg-slate-900 border-4 border-black p-8 shadow-[6px_6px_0_#000] text-white relative">
                    <div className="absolute -top-4 -left-4 bg-rose-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest">
                      Compétence : Détecter les truquages IA
                    </div>
                    <h4 className="text-rose-300 font-black text-xs mb-6 uppercase tracking-[0.2em]">🕵️ Alerte Deepfake IA</h4>
                    <p className="text-lg font-bold mb-6 italic leading-tight">Une vidéo de politique semble tenir des propos stupéfiants. Que vérifiez-vous en priorité ?</p>
                    <div className="flex flex-col gap-3">
                      {['La netteté des yeux et la synchronisation labiale', 'Le nombre de likes sous la vidéo'].map(v => (
                        <button key={v} onClick={() => { if(!lab2Ans){ setLab2Ans(v); if(v.startsWith('La netteté')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all text-left ${lab2Ans === v ? (v.startsWith('La netteté') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white text-slate-900 hover:bg-rose-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab2Ans === 'Le nombre de likes sous la vidéo' && (
                      <p className="mt-4 text-sm font-bold text-rose-300 italic">⚠️ En 2025, les yeux ne suffisent plus : les deepfakes imitent visages et voix. Seul le recoupement et l&apos;analyse technique protègent.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NAVIGATION BAS DE PAGE */}
          <div className="mt-16 flex justify-between items-center px-4">
            <button 
              onClick={() => { setStepIdx(s => Math.max(0, s - 1)); setOpenDetail(false); }} 
              className="font-black text-xs uppercase text-slate-400 hover:text-black tracking-widest disabled:opacity-0" 
              disabled={stepIdx === 0}
            >
              ← Précédent
            </button>
            <button 
              onClick={() => { if(stepIdx < totalSteps - 1) { setStepIdx(s => s + 1); setOpenDetail(false); } else setView('quiz'); }} 
              className="px-10 py-5 bg-rose-600 text-white border-4 border-black font-black uppercase text-base shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {stepIdx === totalSteps - 1 ? "Démarrer le Test Final ⚡️" : "Étape suivante →"}
            </button>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block border-2 border-black px-4 py-2 bg-white text-[10px] font-black uppercase shadow-[2px_2px_0_#000]">
              Parcours {modeSession} • Étape {stepIdx + 1}/{totalSteps}
            </div>
          </div>
        </main>
      )}

      {/* QUIZ DÉTAILLÉ */}
      {view === 'quiz' && (
        <main className="max-w-3xl mx-auto px-6 py-20 animate-in zoom-in-95 duration-500">
          <div className="bg-white border-4 border-black p-10 md:p-16 shadow-[12px_12px_0_#000]">
            <div className="text-center mb-12">
               <div className="text-rose-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Certification Pix</div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic border-b-8 border-rose-600 inline-block pb-2">Test d&apos;Évaluation</h2>
            </div>

            <div className="mb-10 text-center font-black text-slate-400 text-xs uppercase tracking-widest italic">
               Question {quizIdx + 1} sur {QUIZ_QUESTIONS.length}
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-center mb-12 uppercase tracking-tighter leading-tight">{QUIZ_QUESTIONS[quizIdx].q}</h3>
            
            <div className="grid gap-4">
              {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                const isCorrect = i === QUIZ_QUESTIONS[quizIdx].correct;
                const isSelected = selectedAns === i;
                let btnClass = "p-6 border-4 border-black font-black text-left uppercase text-base transition-all ";
                
                if (selectedAns === null) btnClass += "bg-white hover:bg-rose-50 shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1";
                else if (isCorrect) btnClass += "bg-green-400 text-black shadow-[3px_3px_0_#000]";
                else if (isSelected) btnClass += "bg-red-400 text-black shadow-[3px_3px_0_#000]";
                else btnClass += "opacity-30 border-slate-200 shadow-none";

                return (
                  <button key={i} onClick={() => handleQuiz(i)} className={btnClass} disabled={selectedAns !== null}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedAns !== null && (
              <div className="mt-12 p-8 bg-slate-50 border-4 border-black shadow-[6px_6px_0_#000] animate-in slide-in-from-bottom-4">
                <div className="text-[10px] font-black uppercase text-rose-600 mb-4 tracking-widest italic underline">Explication Fact-Checking :</div>
                <p className="text-base mb-8 font-bold leading-relaxed">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuiz} className="w-full py-5 bg-black text-white font-black uppercase text-lg shadow-[6px_6px_0_#000] hover:bg-rose-600 transition-colors">
                  {quizIdx === QUIZ_QUESTIONS.length - 1 ? 'Voir le Bilan Final' : 'Question Suivante →'}
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* BILAN DE COMPÉTENCES FINAL */}
      {view === 'resultat' && (
        <main className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in duration-1000">
          <div className="text-9xl mb-12 animate-bounce">🏆</div>
          <h1 className="text-6xl md:text-8xl font-black font-mono mb-6 italic uppercase tracking-tighter leading-none">Fact-Checker !</h1>
          <p className="text-slate-500 mb-16 font-black uppercase text-xs tracking-[0.4em] max-w-xl mx-auto">Compétences d&apos;évaluation de l&apos;information validées en mode {modeSession}.</p>
          
          <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[16px_16px_0_#000] mb-20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 font-black">PIX</div>
            
            <div className="grid md:grid-cols-2 gap-12 border-b-4 border-slate-100 pb-12 mb-12">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Score Théorique (Quiz)</div>
                <div className="text-7xl font-black text-slate-900 font-mono">{score} <span className="text-2xl text-slate-300">/ {QUIZ_QUESTIONS.length}</span></div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Progression Totale (XP)</div>
                <div className="text-7xl font-black text-rose-600 font-mono tracking-tighter">{totalXP}</div>
                <div className="text-[10px] font-black text-slate-400 mt-2">Bonus XP Labs : {labPoints} pts</div>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 underline decoration-rose-500 decoration-4 underline-offset-8">Bilan de Compétences Pix / SNT</div>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPETENCES.map(c => (
                <div key={c.key} className="p-6 bg-slate-50 border-2 border-black shadow-[4px_4px_0_#000]">
                  <div className="text-[10px] font-black uppercase text-rose-600 mb-2 tracking-tighter">{c.label}</div>
                  <div className="font-bold text-sm leading-tight text-slate-700">{c.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-block border-2 border-black px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0_#E11D48]">Certifié SNT Academy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={exportBilan} className="px-12 py-6 bg-black text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:bg-rose-600 transition flex items-center justify-center gap-3">
              {isExporting ? 'Exportation...' : '💾 Télécharger mon Bilan'}
            </button>
            <button onClick={() => window.location.reload()} className="px-12 py-6 border-4 border-black rounded-none font-black text-xl uppercase bg-white hover:bg-slate-100 shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Recommencer
            </button>
            <Link href="/themes" className="px-12 py-6 bg-rose-600 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Menu Principal
            </Link>
          </div>
        </main>
      )}

      {/* MODE PROFESSEUR */}
      {view === 'teacher' && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-slate-900 text-white p-12 border-4 border-black shadow-[12px_12px_0_#000] rounded-none">
              <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b-4 border-rose-500 pb-4 inline-block">Guide Pédagogique (Fact-Checking)</h1>
              
              <div className="space-y-12">
                <section>
                  <h2 className="text-rose-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Cibles PIX / EMI travaillées</h2>
                  <p className="text-slate-300 font-bold leading-relaxed mb-4">
                    Ce module couvre la compétence <span className="text-rose-400">1.2 (Évaluer l&apos;information)</span> et aborde les enjeux d&apos;IA générative du thème SNT Web / Réseaux Sociaux. 
                    Il articule EMI (éducation aux médias), esprit critique et citoyenneté numérique.
                  </p>
                </section>

                <section>
                  <h2 className="text-rose-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Réponses du Quiz</h2>
                  <div className="space-y-4">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={i} className="bg-slate-800 p-4 border-l-4 border-rose-500">
                         <div className="font-bold text-slate-100">{q.q}</div>
                         <div className="text-xs text-rose-400 uppercase font-black mt-2">→ Réponse : {q.options[q.correct]}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-rose-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Suggestions d&apos;Activités en Classe</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2">
                    <li>Atelier OSINT en direct : analyser une image virale avec Google Lens au vidéoprojecteur.</li>
                    <li>Débat : Meta a abandonné le fact-checking pour les Community Notes (2025) — bonne ou mauvaise idée ?</li>
                    <li>Analyse de deepfakes sonores ou vidéos (comparaison vidéo originale / vidéo modifiée).</li>
                    <li>Comparer le traitement d&apos;un même événement par 3 médias de lignes éditoriales différentes.</li>
                    <li>Tester ensemble un générateur d&apos;images IA, puis chercher ses indices de fabrication.</li>
                    <li>Lien avec l&apos;Histoire : la propagande d&apos;hier vs la désinformation d&apos;aujourd&apos;hui.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-rose-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Ressources fiables</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li>AFP Factuel (factuel.afp.com) — vérifications d&apos;infos virales.</li>
                    <li>Les Décodeurs (Le Monde) et CheckNews (Libération).</li>
                    <li>InVID / WeVerify — analyse de vidéos pour journalistes.</li>
                    <li>Google Lens / TinEye / Yandex — recherche d&apos;image inversée.</li>
                  </ul>
                </section>
              </div>

              <button onClick={() => setView('home')} className="mt-16 px-8 py-4 bg-rose-600 text-white font-black uppercase border-2 border-black">Fermer la vue prof</button>
           </div>
        </main>
      )}

    </div>
  );
}