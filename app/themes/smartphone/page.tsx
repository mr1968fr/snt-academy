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
    title: "IA Générative : La Révolution 2023-2025",
    subtitle: "ChatGPT, Gemini, Claude et les nouveaux modèles",
    icon: "🤖",
    competence: "Comprendre les IA génératives modernes (Pix)",
    content: "Depuis novembre 2022 (ChatGPT), l'IA générative a explosé : création de textes, images, vidéos, code et musique en quelques secondes. En 2025, GPT-4o, Gemini 2.0, Claude 3.5 Sonnet et les modèles open source (Llama 3, Mistral) rivalisent de performances.",
    details: [
      { h: "GPT-4o (OpenAI, 2024)", p: "Version multimodale de ChatGPT : traite simultanément texte, images, audio et vidéo. Génère du code, analyse des PDF, crée des présentations. Limite gratuite : ~40 messages/3h en GPT-4o." },
      { h: "Gemini 2.0 (Google, déc. 2024)", p: "IA intégrée à Google Search, Gmail, Docs. Deep Research : génère des rapports de 10+ pages avec sources vérifiées. Ultra performante en maths et sciences. Version gratuite disponible." },
      { h: "Claude 3.5 Sonnet (Anthropic, 2024)", p: "Spécialisée dans les tâches longues (200 000 tokens = ~500 pages). Excellente pour analyser des documents juridiques, scientifiques ou littéraires. Utilisée par de nombreuses entreprises." },
      { h: "Modèles open source", p: "Llama 3.3 (Meta, déc. 2024) : gratuit, peut tourner sur ton PC. Mistral Large 2 (France) : concurrent européen performant. Avantage : contrôle total, pas de limite d'usage, protection des données." }
    ],
    deep: [
      { label: "Multimodalité 2025", text: "Les nouvelles IA comprennent texte + image + audio + vidéo dans une seule conversation. Tu peux envoyer une photo de ton cours et demander des explications orales." },
      { label: "Raisonnement (o1)", text: "GPT-o1 (déc. 2024) réfléchit avant de répondre : temps de réflexion visible, meilleur en maths/code/logique. Nouvelle génération d'IA qui 'pense' comme un humain." },
      { label: "IA embarquée", text: "Gemini Nano tourne directement sur les smartphones Pixel 9 (2024) sans connexion Internet. L'IA devient locale, rapide et privée." }
    ]
  },
  {
    number: '02',
    title: "Prompts : L'Art de Parler aux IA",
    subtitle: "Du débutant à l'expert",
    icon: "💬",
    hasLab: true,
    competence: "Maîtriser l'ingénierie de prompts",
    content: "Un bon prompt (consigne donnée à l'IA) peut multiplier par 10 la qualité de la réponse. L'ingénierie de prompts est devenue un métier : certaines entreprises payent jusqu'à 300 000 $/an pour des 'Prompt Engineers'.",
    details: [
      { h: "Structure d'un bon prompt", p: "Rôle ('Tu es un prof de physique') + Contexte ('pour un élève de Seconde') + Tâche ('Explique la gravité') + Contraintes ('en 3 paragraphes, avec un exemple quotidien') + Format ('sous forme de dialogue')." },
      { h: "Few-shot learning", p: "Donner 2-3 exemples à l'IA avant la vraie question améliore drastiquement la réponse. Ex : 'Voici 2 résumés de qualité : [exemples]. Maintenant résume ce texte : [...]'." },
      { h: "Chain-of-Thought (CoT)", p: "Demander à l'IA de 'réfléchir étape par étape' améliore la logique. Ex : 'Résous ce problème de maths en détaillant chaque étape de calcul'. Critique pour les problèmes complexes." },
      { h: "Prompt négatif", p: "Dire ce qu'on NE veut PAS. Ex : 'Explique sans jargon technique, sans formules mathématiques, sans être condescendant'. Limite les dérives de l'IA." }
    ],
    deep: [
      { label: "Température & Top-P", text: "Paramètres avancés : température basse (0.2) = réponses factuelles précises. Température élevée (0.9) = créativité, brainstorming. ChatGPT utilise ~0.7 par défaut." },
      { label: "Prompts système", text: "Dans les API (version développeur), tu peux définir un 'system prompt' permanent qui configure le comportement global de l'IA pour toute la conversation." },
      { label: "Anti-hallucination", text: "Ajouter 'Si tu ne sais pas, dis-le clairement au lieu d'inventer' réduit les fausses informations. Les IA ont tendance à inventer pour ne pas décevoir l'utilisateur." }
    ]
  },
  {
    number: '03',
    title: "IA Générative d'Images & Vidéos",
    subtitle: "Midjourney, DALL-E 3, Sora, Runway",
    icon: "🎨",
    competence: "Créer et analyser des contenus visuels IA",
    content: "Les générateurs d'images par IA (text-to-image) créent des visuels photoréalistes ou artistiques en 10 secondes. Les générateurs de vidéo (text-to-video) arrivent en 2024-2025 : Sora (OpenAI), Runway Gen-3, Kling AI (Chine).",
    details: [
      { h: "DALL-E 3 (OpenAI, 2023)", p: "Intégré à ChatGPT Plus. Comprend les prompts complexes ('un chat astronaute lisant un journal sur Mars, style aquarelle japonaise'). Respecte mieux les demandes que DALL-E 2." },
      { h: "Midjourney v6 (2024)", p: "IA d'images payante (10$/mois) sur Discord. Qualité cinématographique : utilisée par des studios pour les storyboards, concepts art, pubs. Meilleure en cohérence visuelle et textes dans l'image." },
      { h: "Sora (OpenAI, fév. 2024)", p: "Génère des vidéos jusqu'à 1 minute en 1080p à partir d'un texte. Cohérence physique impressionnante (mouvements de caméra, lumière). Accès limité fin 2024 (liste d'attente). Révolutionne la prod vidéo." },
      { h: "Runway Gen-3 (2024)", p: "Concurrent direct de Sora. Utilisé par des créateurs YouTube et TikTok. Permet d'animer une image fixe, de prolonger une vidéo, de changer le style (noir et blanc → couleur)." }
    ],
    deep: [
      { label: "Détection deepfakes", text: "Les IA 2025 créent des images/vidéos indétectables à l'œil nu. Outils de détection : Hive Moderation, Reality Defender, Google SynthID (filigrane invisible dans les pixels)." },
      { label: "Droit d'auteur", text: "Débat juridique majeur 2024 : les IA sont entraînées sur des millions d'images protégées (sans autorisation). Procès en cours (Getty Images vs Stability AI, NYT vs OpenAI)." },
      { label: "Loi européenne AI Act", text: "En vigueur août 2024 : obligation d'étiqueter les contenus créés par IA. Les deepfakes non signalés sont interdits. Amendes jusqu'à 7% du CA mondial pour les entreprises." }
    ]
  },
  {
    number: '04',
    title: "IA en Éducation : Revolution 2024-2025",
    subtitle: "ChatGPT, Khanmigo, MagicSchool, Gemini",
    icon: "📚",
    hasLab2: true,
    competence: "Utiliser l'IA comme outil d'apprentissage",
    content: "L'IA transforme l'éducation : tutorat personnalisé 24/7, correction automatique, création de quiz, traduction en temps réel. Mais elle soulève des questions sur la triche, la dépendance et le rôle des profs.",
    details: [
      { h: "ChatGPT Edu (2024)", p: "Version pour universités : accès GPT-4o illimité, données non utilisées pour l'entraînement, interface sécurisée. Des facs comme Harvard ou Sciences Po l'utilisent officiellement." },
      { h: "Khanmigo (Khan Academy)", p: "Tuteur IA personnel : explique les maths étape par étape, pose des questions socratiques ('Et si tu essayais de décomposer ce nombre ?'), aide aux devoirs SANS donner la réponse directement." },
      { h: "MagicSchool AI (2024)", p: "Outil pour profs : génère des plans de cours, des quiz différenciés (niveau facile/moyen/difficile), des grilles d'évaluation. Plus de 2 millions d'enseignants l'utilisent (USA, Europe)." },
      { h: "Gemini dans Google Classroom", p: "Intégration native (2024) : résumé automatique de longs PDF, traduction multilingue des consignes, suggestions d'amélioration de rédaction. Gratuit pour les établissements." }
    ],
    deep: [
      { label: "Détection de triche IA", text: "GPTZero, Turnitin AI Detector : analysent si un texte est écrit par IA. Fiabilité ~85% (2024), mais les faux positifs existent. Débat éthique : faut-il interdire ou former à l'usage responsable ?" },
      { label: "IA = calculatrice 2.0 ?", text: "Dans les années 80, la calculatrice était interdite en cours. Aujourd'hui, elle est autorisée et les exos ont évolué. L'IA suivra-t-elle le même chemin ? Certains profs l'autorisent déjà avec consignes claires." },
      { label: "Compétences futures", text: "Savoir VÉRIFIER une réponse IA devient plus important que savoir la générer. L'esprit critique, la reformulation, la validation des sources : nouvelles compétences clés." }
    ]
  },
  {
    number: '05',
    title: "Limites & Dangers des IA : 2024-2025",
    subtitle: "Hallucinations, biais, désinformation, éthique",
    icon: "⚠️",
    competence: "Adopter un usage critique et responsable",
    content: "Les IA sont des outils puissants mais imparfaits : elles inventent des faits (hallucinations), reproduisent des stéréotypes (biais), consomment énormément d'énergie et posent des questions éthiques majeures.",
    details: [
      { h: "Hallucinations", p: "L'IA invente des informations fausses avec une totale confiance. Ex réel (2024) : un avocat américain a cité 6 jurisprudences inventées par ChatGPT → sanctions du juge. TOUJOURS vérifier les faits, dates, citations." },
      { h: "Biais algorithmiques", p: "Les IA reproduisent les stéréotypes présents dans leurs données d'entraînement. Ex : générer '10 PDG' donnait 90% d'hommes blancs (corrigé en 2024). Les biais de genre, race, âge persistent." },
      { h: "Impact environnemental", p: "Entraîner GPT-4 a consommé autant d'électricité que 1000 foyers américains pendant 1 an. Une requête ChatGPT = 10× l'énergie d'une recherche Google. Les data centers IA explosent la conso mondiale." },
      { h: "Désinformation & deepfakes", p: "En 2024, fausses vidéos de politiciens (élections US, UE), arnaques vocales ('Papa, j'ai besoin d'argent'), revenge porn IA. Les deepfakes sont désormais accessibles à tous (apps mobiles gratuites)." }
    ],
    deep: [
      { label: "IA et emploi", text: "Étude McKinsey (2024) : 30% des tâches professionnelles automatisables d'ici 2030. Métiers menacés : traduction, SAV, code simple, design graphique. Métiers renforcés : prompt engineer, fact-checker, superviseur IA." },
      { label: "Règlementation mondiale", text: "UE : AI Act (2024). USA : décret présidentiel sur l'IA (oct. 2023). Chine : régulation stricte depuis 2023. Débat : faut-il ralentir le développement de l'IA pour mieux la contrôler ?" },
      { label: "Enjeu démocratique", text: "Qui contrôle l'IA contrôle l'information. 4 entreprises (OpenAI, Google, Meta, Anthropic) dominent le marché mondial. L'Europe investit dans des IA souveraines (Mistral, Aleph Alpha)." }
    ]
  },
  {
    number: '06',
    title: "IA Vocale & Assistants 2025",
    subtitle: "ChatGPT Voice, Gemini Live, NotebookLM",
    icon: "🎤",
    competence: "Interagir avec l'IA par la voix",
    content: "Les IA vocales de 2025 tiennent une vraie conversation : ton naturel, interruptions possibles, émotions détectées. ChatGPT Advanced Voice (2024), Gemini Live et NotebookLM Audio Overview révolutionnent l'apprentissage oral.",
    details: [
      { h: "ChatGPT Advanced Voice", p: "Disponible depuis sept. 2024 pour les abonnés Plus. Voix ultra-réalistes (9 choix), réponses en <1 seconde, comprend les hésitations ('euh...'), l'ironie, les accents. Utilisable en conduisant, en cuisinant, en révisant." },
      { h: "Gemini Live (Google)", p: "Lancé oct. 2024, gratuit sur Android. Fonctionne en arrière-plan : tu peux fermer l'app et continuer la conversation. Intégré à Google Maps (navigation parlée améliorée) et Gmail (dicte et reformule tes mails)." },
      { h: "NotebookLM Audio Overview", p: "Génère un PODCAST de 10-20 min à partir de tes documents (cours, PDF, notes). Deux voix IA discutent du contenu comme dans un vrai talk-show éducatif. Révolution pour réviser : tu écoutes ton cours en podcast." },
      { h: "Traduction temps réel", p: "Google Pixel 9 (2024) : traduction vocale instantanée de 49 langues, même hors ligne. Tu parles français, ton interlocuteur entend en japonais avec ta voix clonée. Science-fiction devenue réalité." }
    ],
    deep: [
      { label: "Clonage vocal éthique", text: "ElevenLabs (2024) : clone ta voix en 1 min pour lire tes textes (audiobooks persos). Risques : deepfake vocal, arnaques. ElevenLabs impose une vérification d'identité depuis juin 2024." },
      { label: "IA émotionnelle", text: "Hume AI (2024) : détecte 48 émotions dans la voix (joie, stress, ennui...). Peut adapter son ton : réconfortant si tu es triste, énergique si tu es motivé. Futur du coaching IA ?" },
      { label: "Accessibilité", text: "Les IA vocales transforment l'accès au savoir pour les dyslexiques, malvoyants, personnes à mobilité réduite. L'éducation devient vraiment inclusive." }
    ]
  },
  {
    number: 'MISSION',
    title: "Mission IA Responsable",
    subtitle: "Projets pratiques 2025",
    icon: "🚀",
    isProject: true,
    intro: "À toi de jouer : utilise l'IA de manière créative, critique et éthique. Choisis une mission adaptée à ton niveau.",
    projects: [
      {
        topic: "Fact-check IA : Chasse aux hallucinations",
        desc: "Pose 5 questions factuelles à ChatGPT/Gemini (dates historiques, capitales, formules scientifiques). Vérifie chaque réponse sur Wikipédia ou des sources fiables. Identifie les erreurs (hallucinations). Analyse : pourquoi l'IA s'est trompée ?",
        livrable: "Tableau comparatif : Question / Réponse IA / Vérification / Analyse de l'erreur.",
        difficulty: "Débutant",
        duration: "20 min"
      },
      {
        topic: "Prompt Engineering : Du mauvais au parfait",
        desc: "Choisis une tâche (résumé d'article, explication de concept). Teste 3 prompts : 1) basique ('Résume ce texte'), 2) structuré (avec rôle + contexte + format), 3) expert (few-shot + CoT). Compare la qualité des réponses.",
        livrable: "Document : 3 prompts + 3 réponses + analyse des différences qualitatives.",
        difficulty: "Intermédiaire",
        duration: "25 min"
      },
      {
        topic: "Audit Éthique : Biais dans la génération d'images",
        desc: "Génère 20 portraits avec DALL-E/Midjourney : 'un médecin', 'un ingénieur', 'une secrétaire', 'un juge', etc. Analyse : diversité ethnique ? Équilibre hommes/femmes ? Stéréotypes ? Compare avec les statistiques réelles des professions. Propose des prompts anti-biais.",
        livrable: "Rapport d'audit : captures d'écran + statistiques + recommandations.",
        difficulty: "Pix Expert",
        duration: "35 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Quelle IA peut générer des vidéos jusqu'à 1 minute à partir d'un simple texte (2024) ?",
    options: ["ChatGPT", "Sora (OpenAI)", "Spotify"],
    correct: 1,
    explanation: "Sora, annoncé en février 2024, génère des vidéos haute qualité (jusqu'à 1080p, 1 min) à partir de prompts textuels. Runway Gen-3 et Kling AI sont des concurrents similaires."
  },
  {
    q: "Qu'est-ce qu'une 'hallucination' en IA ?",
    options: [
      "Un bug qui fait planter le serveur",
      "Une information fausse que l'IA invente avec confiance",
      "Une image floue générée par erreur"
    ],
    correct: 1,
    explanation: "Les IA génératives inventent parfois des faits, citations ou références inexistants, présentés comme vrais. TOUJOURS vérifier les informations factuelles données par une IA."
  },
  {
    q: "Quelle technique améliore la logique d'une IA sur un problème complexe ?",
    options: [
      "Écrire en majuscules",
      "Demander de 'réfléchir étape par étape' (Chain-of-Thought)",
      "Utiliser des emojis"
    ],
    correct: 1,
    explanation: "Le Chain-of-Thought (CoT) force l'IA à décomposer son raisonnement. Ex : 'Résous ce problème en détaillant chaque étape'. GPT-o1 (déc. 2024) intègre ce raisonnement en natif."
  },
  {
    q: "Quel est le principal danger des deepfakes vidéo en 2024-2025 ?",
    options: [
      "Ils consomment trop de batterie",
      "Ils permettent la désinformation politique et les arnaques (clonage vocal)",
      "Ils sont trop lents à générer"
    ],
    correct: 1,
    explanation: "Les deepfakes ultra-réalistes (Sora, Runway, apps mobiles) servent à créer de fausses vidéos de politiciens ou à cloner des voix pour des arnaques. L'AI Act européen (2024) impose leur étiquetage."
  },
  {
    q: "Que fait NotebookLM Audio Overview (Google, 2024) ?",
    options: [
      "Génère un podcast éducatif à partir de tes documents",
      "Enregistre tes cours en classe",
      "Traduit des vidéos YouTube"
    ],
    correct: 0,
    explanation: "NotebookLM transforme tes PDF/notes en podcast de 10-20 min avec deux IA qui discutent du contenu. Révolutionnaire pour réviser en audio (voiture, sport, transports)."
  },
  {
    q: "Quelle loi européenne impose l'étiquetage des contenus IA depuis août 2024 ?",
    options: ["RGPD", "AI Act", "DMA"],
    correct: 1,
    explanation: "L'AI Act (Artificial Intelligence Act) est en vigueur depuis août 2024. Il classe les IA par niveau de risque et impose l'étiquetage des deepfakes et contenus générés. Amendes jusqu'à 7% du CA mondial."
  },
  {
    q: "Quel paramètre contrôle la créativité vs précision d'une IA ?",
    options: ["La température", "La vitesse", "Le volume"],
    correct: 0,
    explanation: "La température (0 à 1) : basse (0.2) = réponses factuelles précises. Élevée (0.9) = créativité, brainstorming, risque d'invention. ChatGPT utilise ~0.7 par défaut, GPT-o1 ajuste dynamiquement."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Explorer', desc: 'Tester les IA' },
  { id: '02', label: 'Maîtriser', desc: 'Prompts efficaces' },
  { id: '03', label: 'Vérifier', desc: 'Anti-hallucination' },
  { id: '04', label: 'Critiquer', desc: 'Éthique & biais' },
];

const COMPETENCES = [
  { key: 'gen', label: 'IA Générative', desc: 'Comprendre GPT-4o, Gemini 2.0, Claude, Sora et leurs usages (texte, image, vidéo, code).' },
  { key: 'prompt', label: 'Prompt Engineering', desc: 'Structurer des consignes efficaces : rôle, contexte, tâche, format, few-shot, CoT.' },
  { key: 'crit', label: 'Esprit Critique', desc: 'Détecter hallucinations, biais, deepfakes. Vérifier systématiquement les faits.' },
  { key: 'ethique', label: 'Usage Responsable', desc: 'Connaître les limites, la règlementation (AI Act), l\'impact environnemental et social.' },
];

// --- COMPOSANT PRINCIPAL ---

export default function IAChapter() {
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
    const savedXP = localStorage.getItem('snt_xp_ia');
    if (savedXP) setLabPoints(parseInt(savedXP));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_ia', labPoints.toString());
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
       SNT ACADEMY : IA GÉNÉRATIVE 2025       
=================================================
Session choisie   : ${modeSession}
Score Questionnaire : ${score} / ${QUIZ_QUESTIONS.length}
Points XP (Labs)   : ${labPoints}
Total XP Accumulé  : ${totalXP}

COMPÉTENCES PIX VALIDÉES :
- Maîtrise des IA génératives (GPT-4o, Gemini 2.0, Claude, Sora)
- Prompt engineering avancé (CoT, few-shot, température)
- Détection hallucinations, deepfakes et biais algorithmiques
- Usage éthique et responsable (AI Act, impact environnemental)

Document généré le : ${new Date().toLocaleDateString('fr-FR')}
=================================================
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bilan_snt_ia_${new Date().toLocaleDateString('fr-FR')}.txt`;
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
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-emerald-200 pb-20">
      
      {/* NAVIGATION PIX V2 */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/themes" className="font-black text-emerald-600 hover:text-black transition uppercase tracking-tighter shrink-0">
            ← SNT Academy
          </Link>
          
          <div className="flex gap-1 bg-slate-100 p-1 border-2 border-black hidden md:flex">
            {(['20min', '1h', '1h30'] as ModeSession[]).map(m => (
              <button
                key={m}
                onClick={() => setModeSession(m)}
                className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${
                  modeSession === m ? 'bg-emerald-500 text-white shadow-[2px_2px_0_#000]' : 'text-slate-500 hover:text-black'
                }`}
              >
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

      {/* ACCUEIL DÉTAILLÉ */}
      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-6 shadow-[4px_4px_0_#000]">
              Thème SNT • Intelligence Artificielle 2025
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-mono italic">
              L&apos;IA<br /><span className="text-emerald-600">GÉNÉRATIVE.</span>
            </h1>
            
            {/* Lien SNT / Pix */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-0.5 w-10 bg-emerald-500"></span>
              <p className="text-xs text-emerald-900 leading-relaxed font-black uppercase tracking-widest">
                Parcours PIX : Création de Contenu • Environnement Numérique
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-xl text-slate-700 leading-relaxed font-bold">
                  Maîtrise les IA de 2025 (ChatGPT-4o, Gemini 2.0, Claude, Sora), apprends le prompt engineering, détecte les deepfakes et deviens un utilisateur responsable et critique.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={startCourse} className="px-10 py-5 bg-emerald-500 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-all">
                    Démarrer le cours ⚡
                  </button>
                </div>
              </div>

              {/* Objectifs du module */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000]">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                  Objectifs du module
                </div>
                <ul className="text-sm font-bold text-slate-700 space-y-2">
                  <li>• Comprendre les modèles IA 2024-2025 (texte, image, vidéo, audio).</li>
                  <li>• Maîtriser le prompt engineering (structure, CoT, few-shot).</li>
                  <li>• Détecter hallucinations, biais et deepfakes.</li>
                  <li>• Connaître la règlementation (AI Act) et l&apos;éthique.</li>
                  <li>• Utiliser l&apos;IA comme outil d&apos;apprentissage responsable.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TA DÉMARCHE */}
          <div className="mt-28">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-12 text-slate-400">Ta démarche IA responsable</h2>
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

          {/* NOTE PROFESSEUR */}
          <div className="mt-20 bg-emerald-100 border-4 border-black p-8 shadow-[8px_8px_0_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
            <div className="text-xs font-black uppercase tracking-widest text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2 inline-block">Note de Pilotage Pédagogique</div>
            <p className="text-sm text-emerald-900 leading-relaxed font-bold max-w-4xl">
              Ce module couvre les <span className="font-black">IA génératives 2024-2025</span> (ChatGPT-4o, Gemini 2.0, Claude 3.5, Sora) et les compétences <span className="font-black">Pix 3.2 (Développer des documents multimédias)</span>. 
              Le mode <span className="underline">{modeSession}</span> permet d&apos;adapter entre sensibilisation (20 min : découverte des IA, premiers prompts) et ateliers pratiques (1h30 : prompt engineering, audit biais, détection deepfakes).
              {modeSession === '20min' && " Focus sur les concepts clés : IA générative, prompts de base, hallucinations."}
              {modeSession === '1h' && " Parcours complet avec approfondissements (température, CoT, règlementation AI Act)."}
              {modeSession === '1h30' && " Les missions pratiques (fact-check IA, audit éthique) sont le cœur de la séance."}
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
                  <div key={i} className={`w-8 h-8 border-4 border-black shadow-[3px_3px_0_#000] transition-all ${i <= stepIdx ? 'bg-emerald-500' : 'bg-white'}`} />
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
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-4xl shadow-[4px_4px_0_#10B981]">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] mb-1">{currentStep.competence}</h2>
                <h1 className="text-4xl md:text-6xl font-black font-mono mb-0 tracking-tighter leading-none uppercase">{currentStep.title}</h1>
              </div>
            </div>

            {currentStep.isProject ? (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-black text-white p-6 border-4 border-black font-black text-xs uppercase tracking-[2px] text-center leading-relaxed">
                  Mission IA Responsable • Mode {modeSession}
                </div>
                <p className="text-lg font-bold text-slate-600 italic border-l-8 border-emerald-500 pl-6">
                  {currentStep.intro}
                </p>
                <div className="grid gap-6">
                  {currentStep.projects?.map((p, i) => (
                    <div key={i} className="p-8 border-4 border-black bg-slate-50 shadow-[6px_6px_0_#000] hover:bg-white hover:-translate-y-1 transition-all">
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <h4 className="font-black text-2xl leading-none uppercase tracking-tighter">{p.topic}</h4>
                        <span className="text-[10px] font-black bg-emerald-500 text-white border-2 border-black px-3 py-1 uppercase shrink-0">{p.difficulty}</span>
                      </div>
                      <p className="text-slate-600 text-base mb-6 leading-relaxed font-bold">{p.desc}</p>
                      <div className="text-xs font-black text-emerald-600 uppercase tracking-tighter italic border-t-2 border-slate-200 pt-6 flex items-center gap-2">
                        <span className="text-black not-italic">Livrable attendu :</span> {p.livrable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-bold mb-12 border-l-8 border-emerald-500 pl-8 py-2">
                  {currentStep.content}
                </p>
                
                {/* ACCORDÉON DE DÉTAILS */}
                <div className="mb-10">
                  <button 
                    onClick={() => setOpenDetail(!openDetail)} 
                    className="w-full flex justify-between items-center py-5 px-6 bg-slate-100 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-emerald-100 transition-colors"
                  >
                    <span>{openDetail ? '− Cacher les détails techniques' : '+ Approfondir (IA 2024-2025 & Technique)'}</span>
                    <span className="text-xl">{openDetail ? '▲' : '▼'}</span>
                  </button>

                  {openDetail && (
                    <div className="p-8 border-x-4 border-b-4 border-black bg-white space-y-10 animate-in slide-in-from-top-4">
                      {currentStep.details?.map((d, i) => (
                        <div key={i} className="grid md:grid-cols-4 gap-6">
                          <div className="text-[10px] font-black uppercase text-emerald-600 pt-1 tracking-widest leading-tight border-r-2 border-emerald-100 md:pr-4">{d.h}</div>
                          <div className="md:col-span-3 text-slate-700 text-base leading-relaxed font-bold">{d.p}</div>
                        </div>
                      ))}
                      {currentStep.deep && (
                        <div className="mt-8 pt-8 border-t-2 border-slate-100">
                           <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Éclairage SNT / Expert 2025</div>
                           {currentStep.deep.map((dp, i) => (
                             <div key={i} className="mb-4 text-sm font-bold italic text-slate-500">
                               <span className="text-emerald-600 uppercase mr-2">{dp.label} :</span> {dp.text}
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MINI-LABS INTERACTIFS */}
                {currentStep.hasLab && (
                  <div className="mt-12 bg-emerald-50 border-4 border-black p-8 shadow-[6px_6px_0_#000] relative">
                    <div className="absolute -top-4 -left-4 bg-emerald-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest">
                      Compétence : Structurer un prompt efficace
                    </div>
                    <h4 className="text-emerald-900 font-black text-xs mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                      🧪 Challenge Prompt Engineering
                    </h4>
                    <p className="text-lg font-bold mb-6 italic text-emerald-950 leading-tight">Quel prompt donnera la MEILLEURE réponse pour expliquer la photosynthèse à un élève de Seconde ?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        'Explique la photosynthèse',
                        'Tu es un prof de SVT. Explique la photosynthèse à un élève de Seconde en 3 paragraphes avec un exemple concret.'
                      ].map(v => (
                        <button key={v} onClick={() => { if(!lab1Ans){ setLab1Ans(v); if(v.startsWith('Tu es')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm transition-all text-left ${lab1Ans === v ? (v.startsWith('Tu es') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white hover:bg-emerald-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab1Ans === 'Explique la photosynthèse' && (
                      <p className="mt-4 text-sm font-bold text-emerald-700 italic">⚠️ Trop vague ! Un bon prompt précise : rôle (prof), contexte (niveau Seconde), format (3 paragraphes), contraintes (exemple concret).</p>
                    )}
                  </div>
                )}

                {currentStep.hasLab2 && (
                  <div className="mt-12 bg-slate-900 border-4 border-black p-8 shadow-[6px_6px_0_#000] text-white relative">
                    <div className="absolute -top-4 -left-4 bg-emerald-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-emerald-400 mb-2 tracking-widest">
                      Compétence : Détecter l&apos;usage responsable
                    </div>
                    <h4 className="text-emerald-300 font-black text-xs mb-6 uppercase tracking-[0.2em]">🎓 Situation : Devoir maison</h4>
                    <p className="text-lg font-bold mb-6 italic leading-tight">Ton prof demande une dissertation. Quelle est l&apos;utilisation RESPONSABLE de ChatGPT ?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        'Demander à ChatGPT de rédiger toute la dissert et la rendre telle quelle',
                        'Utiliser ChatGPT pour comprendre le sujet, faire un plan, puis rédiger soi-même avec ses mots'
                      ].map(v => (
                        <button key={v} onClick={() => { if(!lab2Ans){ setLab2Ans(v); if(v.startsWith('Utiliser')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm transition-all text-left ${lab2Ans === v ? (v.startsWith('Utiliser') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white text-slate-900 hover:bg-emerald-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab2Ans === 'Demander à ChatGPT de rédiger toute la dissert et la rendre telle quelle' && (
                      <p className="mt-4 text-sm font-bold text-emerald-300 italic">⚠️ C&apos;est de la triche détectable (GPTZero, Turnitin). L&apos;IA doit être un assistant d&apos;apprentissage, pas un substitut à la réflexion.</p>
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
              className="px-10 py-5 bg-emerald-600 text-white border-4 border-black font-black uppercase text-base shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
               <div className="text-emerald-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Certification Pix IA 2025</div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic border-b-8 border-emerald-600 inline-block pb-2">Test IA Générative</h2>
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
                
                if (selectedAns === null) btnClass += "bg-white hover:bg-emerald-50 shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1";
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
                <div className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest italic underline">Explication Technique :</div>
                <p className="text-base mb-8 font-bold leading-relaxed">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuiz} className="w-full py-5 bg-black text-white font-black uppercase text-lg shadow-[6px_6px_0_#000] hover:bg-emerald-600 transition-colors">
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
          <div className="text-9xl mb-12 animate-bounce">🤖</div>
          <h1 className="text-6xl md:text-8xl font-black font-mono mb-6 italic uppercase tracking-tighter leading-none">Expert IA 2025 !</h1>
          <p className="text-slate-500 mb-16 font-black uppercase text-xs tracking-[0.4em] max-w-xl mx-auto">Compétences IA génératives validées en mode {modeSession}.</p>
          
          <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[16px_16px_0_#000] mb-20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 font-black">PIX</div>
            
            <div className="grid md:grid-cols-2 gap-12 border-b-4 border-slate-100 pb-12 mb-12">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Score Théorique (Quiz)</div>
                <div className="text-7xl font-black text-slate-900 font-mono">{score} <span className="text-2xl text-slate-300">/ {QUIZ_QUESTIONS.length}</span></div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Progression Totale (XP)</div>
                <div className="text-7xl font-black text-emerald-600 font-mono tracking-tighter">{totalXP}</div>
                <div className="text-[10px] font-black text-slate-400 mt-2">Bonus XP Labs : {labPoints} pts</div>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 underline decoration-emerald-500 decoration-4 underline-offset-8">Bilan de Compétences Pix / SNT</div>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPETENCES.map(c => (
                <div key={c.key} className="p-6 bg-slate-50 border-2 border-black shadow-[4px_4px_0_#000]">
                  <div className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-tighter">{c.label}</div>
                  <div className="font-bold text-sm leading-tight text-slate-700">{c.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-block border-2 border-black px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0_#10B981]">Certifié SNT Academy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={exportBilan} className="px-12 py-6 bg-black text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:bg-emerald-600 transition flex items-center justify-center gap-3">
              {isExporting ? 'Exportation...' : '💾 Télécharger mon Bilan'}
            </button>
            <button onClick={() => window.location.reload()} className="px-12 py-6 border-4 border-black rounded-none font-black text-xl uppercase bg-white hover:bg-slate-100 shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Recommencer
            </button>
            <Link href="/themes" className="px-12 py-6 bg-emerald-600 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Menu Principal
            </Link>
          </div>
        </main>
      )}

      {/* MODE PROFESSEUR */}
      {view === 'teacher' && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-slate-900 text-white p-12 border-4 border-black shadow-[12px_12px_0_#000] rounded-none">
              <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b-4 border-emerald-500 pb-4 inline-block">Guide Pédagogique (IA 2025)</h1>
              
              <div className="space-y-12">
                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Cibles PIX / SNT travaillées</h2>
                  <p className="text-slate-300 font-bold leading-relaxed mb-4">
                    Ce module couvre les <span className="text-emerald-400">IA génératives 2024-2025</span> et les compétences <span className="text-emerald-400">Pix 3.2 (Développer des documents multimédias)</span> + <span className="text-emerald-400">2.3 (Collaborer)</span>. 
                    Focus sur ChatGPT-4o, Gemini 2.0, Claude 3.5, Sora, le prompt engineering, la détection de deepfakes et l&apos;usage éthique (AI Act).
                  </p>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Réponses du Quiz</h2>
                  <div className="space-y-4">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={i} className="bg-slate-800 p-4 border-l-4 border-emerald-500">
                         <div className="font-bold text-slate-100">{q.q}</div>
                         <div className="text-xs text-emerald-400 uppercase font-black mt-2">→ Réponse : {q.options[q.correct]}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Suggestions d&apos;Activités en Classe</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2">
                    <li>Atelier prompt engineering : améliorer collectivement un prompt du basique à l&apos;expert (projection écran, vote).</li>
                    <li>Débat : Faut-il interdire ChatGPT à l&apos;école ou apprendre à l&apos;utiliser de manière responsable ?</li>
                    <li>TP fact-checking : poser 10 questions factuelles à ChatGPT, vérifier chaque réponse (traquer les hallucinations).</li>
                    <li>Audit biais : générer 20 portraits de métiers avec DALL-E, analyser diversité et stéréotypes.</li>
                    <li>Comparaison IA : même prompt dans ChatGPT, Gemini et Claude → analyser les différences de réponses.</li>
                    <li>Création responsable : générer une présentation avec NotebookLM puis vérifier chaque affirmation.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Ressources complémentaires 2024-2025</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li>ChatGPT (openai.com) — version gratuite GPT-4o mini, payante GPT-4o (20$/mois).</li>
                    <li>Gemini (gemini.google.com) — gratuit, intégré à Google Workspace.</li>
                    <li>Claude (claude.ai) — gratuit limité, Pro 20$/mois, excellent pour textes longs.</li>
                    <li>NotebookLM (notebooklm.google) — gratuit, génère podcasts à partir de documents.</li>
                    <li>GPTZero (gptzero.me) — détecteur de texte généré par IA (gratuit limité).</li>
                    <li>Hive Moderation (hivemoderation.com) — détection deepfakes images/vidéos.</li>
                    <li>AI Act (législation UE 2024) — eur-lex.europa.eu : texte officiel règlementation IA.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-emerald-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Actualités IA récentes (2024-2025)</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li><span className="text-emerald-400">Déc. 2024</span> : GPT-o1 (raisonnement avancé), Gemini 2.0, Llama 3.3 (Meta).</li>
                    <li><span className="text-emerald-400">Nov. 2024</span> : ChatGPT atteint 300 millions d&apos;utilisateurs actifs/semaine.</li>
                    <li><span className="text-emerald-400">Oct. 2024</span> : Gemini Live (voix naturelle), NotebookLM Audio Overview.</li>
                    <li><span className="text-emerald-400">Août 2024</span> : AI Act européen entre en vigueur.</li>
                    <li><span className="text-emerald-400">Fév. 2024</span> : Sora (OpenAI) révèle la génération vidéo IA 1 min 1080p.</li>
                    <li><span className="text-emerald-400">Sept. 2024</span> : ChatGPT Advanced Voice déployé (voix ultra-réalistes).</li>
                  </ul>
                </section>
              </div>

              <button onClick={() => setView('home')} className="mt-16 px-8 py-4 bg-emerald-600 text-white font-black uppercase border-2 border-black">Fermer la vue prof</button>
           </div>
        </main>
      )}

    </div>
  );
}