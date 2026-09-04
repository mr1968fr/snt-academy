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
    title: "Structure & Styles : La Base Pro",
    subtitle: "Hiérarchie visuelle et automatisation",
    icon: "🏗️",
    competence: "Structurer un document long (Pix 3.1)",
    content: "L'erreur classique : mettre en gras et agrandir la police à la main. Pour un document professionnel (rapport, mémoire, thèse), on utilise les STYLES (Titre 1, Titre 2, Corps de texte). Cela permet à l'ordinateur de comprendre la hiérarchie de ton travail.",
    details: [
      { h: "Pourquoi les styles ?", p: "Un style (Titre 1, Titre 2, Normal) est un ensemble de règles de mise en forme (police, taille, couleur, espacement) appliqué en 1 clic. Modifier le style = tout le document se met à jour automatiquement. Gain de temps colossal." },
      { h: "Hiérarchie logique", p: "Titre 1 = grands chapitres (I, II, III). Titre 2 = sous-parties (A, B, C). Titre 3 = détails. Corps de texte = paragraphes. Word comprend cette structure pour générer le sommaire, numéroter, naviguer." },
      { h: "Personnaliser un style", p: "Clic droit sur 'Titre 1' > Modifier : change police (Calibri → Times), taille (18 → 16), couleur, espacement. Tous les Titre 1 du document changent instantanément. C'est la puissance des styles." },
      { h: "Navigation avancée", p: "Le volet Navigation (Ctrl+F > Titres) affiche l'arborescence de ton document. Tu peux cliquer sur un chapitre pour y sauter directement. Indispensable pour les docs de 50+ pages (mémoires, rapports de stage)." }
    ],
    deep: [
      { label: "Norme professionnelle", text: "En entreprise, université ou administration, l'usage des styles est OBLIGATOIRE. Un rapport sans styles est considéré comme amateur. C'est une compétence Pix 3.1 (Développer des documents textuels)." },
      { label: "Collaboration", text: "Dans Google Docs ou Word 365 en ligne, les styles permettent aux co-auteurs de maintenir une cohérence visuelle. Chacun écrit dans son style, pas de conflits de mise en forme." }
    ]
  },
  {
    number: '02',
    title: "Table des Matières Automatique",
    subtitle: "Générer et mettre à jour un sommaire en 1 clic",
    icon: "📖",
    hasLab: true,
    competence: "Générer une table des matières (Pix)",
    content: "Si tu as bien utilisé les styles (Titre 1, Titre 2...), Word peut générer ta table des matières en 1 clic. Plus besoin de taper les numéros de page à la main : si tu ajoutes du texte, le sommaire se met à jour tout seul !",
    details: [
      { h: "Insérer une table", p: "Onglet Références > Table des matières > Automatique 1 (ou 2). Word scanne tous les Titre 1, 2, 3 et crée le sommaire avec pagination automatique. Magie !" },
      { h: "Mise à jour", p: "Tu as ajouté un chapitre ? Clic droit sur la table > Mettre à jour les champs > Mettre à jour toute la table. Les nouveaux titres et pages apparaissent instantanément." },
      { h: "Personnalisation", p: "Références > Table des matières > Table personnalisée : choisis le nombre de niveaux (1-9), le formatage (classique, moderne, élégant), avec ou sans numéros de page, points de suite ou non." },
      { h: "Liens hypertextes", p: "Par défaut, les entrées de la table sont cliquables (Ctrl+clic) : tu sautes directement au chapitre concerné. Pratique pour naviguer dans un PDF de 100 pages." }
    ],
    deep: [
      { label: "LaTeX vs Word", text: "Dans le monde académique, certains préfèrent LaTeX (langage de composition) pour sa précision typographique. Mais Word 365 avec styles bien utilisés donne des résultats professionnels équivalents." },
      { label: "Accessibilité", text: "Une table des matières structurée permet aux lecteurs d'écran (malvoyants) de naviguer efficacement. C'est un critère d'accessibilité numérique RGAA (Référentiel Général d'Amélioration de l'Accessibilité)." }
    ]
  },
  {
    number: '03',
    title: "Sauts de Section & Pagination",
    subtitle: "Maîtriser les ruptures de mise en page",
    icon: "📑",
    competence: "Gérer les sauts et la pagination complexe",
    content: "N'appuie JAMAIS 15 fois sur 'Entrée' pour passer à la page suivante. Utilise 'Saut de page' (Ctrl + Entrée). Ainsi, même si tu ajoutes du texte au-dessus, ton nouveau chapitre restera bien calé en haut de sa page.",
    details: [
      { h: "Saut de page simple", p: "Ctrl+Entrée insère un saut de page. Le texte suivant commence automatiquement en haut de la page suivante, quoi qu'il arrive au contenu précédent. Fini les décalages en cascade." },
      { h: "Saut de section", p: "Plus puissant : permet de changer l'orientation (portrait/paysage), les en-têtes, les pieds de page ou la numérotation dans une même partie du document. Mise en page > Sauts > Page suivante." },
      { h: "Numérotation différenciée", p: "Grâce aux sections : page de garde SANS numéro, introduction en chiffres romains (i, ii, iii), corps en chiffres arabes (1, 2, 3). Technique utilisée dans les mémoires universitaires." },
      { h: "En-têtes et pieds de page", p: "Double-clic en haut/bas de page pour éditer. 'Lier à la section précédente' (décocher) permet d'avoir des en-têtes différents par chapitre (ex : nom du chapitre en en-tête)." }
    ],
    deep: [
      { label: "Mode brouillon", text: "Affichage > Brouillon : les sauts sont visualisés par des lignes en pointillés. Facilite le diagnostic quand la mise en page part en vrille." },
      { label: "Impression recto-verso", p: "L'option 'Commencer sur page impaire' (saut de section) garantit que chaque chapitre démarre sur la page de droite lors d'une impression reliée (standard livre)." }
    ]
  },
  {
    number: '04',
    title: "Images & Habillage : Intégration Visuelle",
    subtitle: "Positionner et ancrer les éléments graphiques",
    icon: "🖼️",
    hasLab2: true,
    competence: "Intégrer des médias dans un document (Pix 3.2)",
    content: "Par défaut, une image bloque le texte (mode 'Aligné sur le texte'). En changeant l'habillage (Carré, Rapproché, Devant le texte), tu peux la déplacer librement où tu veux sur la page sans tout décaler.",
    details: [
      { h: "Types d'habillage", p: "Aligné (défaut) : image dans le flux texte. Carré : texte entoure un rectangle. Rapproché : texte épouse les contours. Devant/Derrière : superposition libre. Au travers : texte passe à travers (rare)." },
      { h: "Ancrage", p: "Une image est ancrée à un paragraphe (petite ancre visible en mode brouillon). Si le paragraphe bouge (ajout de texte avant), l'image suit. Options d'habillage > Position > Ancrer au paragraphe/à la page." },
      { h: "Légendes automatiques", p: "Clic droit > Insérer une légende : Word numérote automatiquement (Figure 1, Figure 2...). Références > Insérer une table des illustrations génère ensuite la liste de toutes les images avec pages." },
      { h: "Compression d'images", p: "Fichier > Compresser les images : réduit la taille du .docx (important pour l'envoi par mail). Options : 220 ppi (impression), 150 ppi (écran), 96 ppi (web). Peut diviser la taille par 10." }
    ],
    deep: [
      { label: "Formats d'image", text: "PNG : qualité maximale, fond transparent possible. JPG : photos, plus léger. SVG : vectoriel (logos), redimensionnable sans perte. GIF : animations (éviter en doc pro, trop lourd)." },
      { label: "Accessibilité", text: "Toujours ajouter un Texte de remplacement (clic droit > Modifier le texte de remplacement) : description pour les malvoyants utilisant un lecteur d'écran. Norme RGAA obligatoire dans l'administration." }
    ]
  },
  {
    number: '05',
    title: "Collaboration & Révision",
    subtitle: "Travailler à plusieurs sur un document",
    icon: "👥",
    competence: "Collaborer en ligne (Pix 2.3)",
    content: "Word 365 (en ligne) permet de travailler à plusieurs simultanément sur le même document, comme Google Docs. Les modifications s'affichent en temps réel, avec suivi des révisions et commentaires.",
    details: [
      { h: "Mode Suivi des modifications", p: "Révision > Suivi des modifications : chaque ajout/suppression est visible en couleur (bleu, rouge...). Le relecteur voit EXACTEMENT ce qui a changé. Indispensable pour les allers-retours prof-élève ou manager-stagiaire." },
      { h: "Accepter/Refuser", p: "Le responsable final passe en revue chaque modif : Accepter (devient définitif), Refuser (revient à l'original). Révision > Accepter/Refuser les modifications. Permet de valider/corriger les suggestions." },
      { h: "Commentaires", p: "Sélectionne un mot > Révision > Nouveau commentaire : bulle jaune en marge pour poser une question, suggérer une reformulation, demander une source. Le destinataire peut répondre (fil de discussion)." },
      { h: "Co-édition temps réel", p: "Word 365 (SharePoint, OneDrive) : jusqu'à 100 personnes simultanément. Tu vois le curseur des autres en couleur. Enregistrement automatique dans le cloud toutes les 5 secondes." }
    ],
    deep: [
      { label: "Google Docs vs Word 365", text: "Google Docs : gratuit, ultra-simple, excellente collab temps réel. Word 365 : plus puissant (styles avancés, bibliographie, équations LaTeX), nécessite abonnement Microsoft 365 (étudiant : 2€/mois)." },
      { label: "Versions", text: "Fichier > Historique des versions (OneDrive) : restaure une version d'il y a 3 jours si tu as tout cassé. Auto-sauvegarde toutes les 10 min. Équivalent du 'Ctrl+Z' à l'échelle du fichier entier." }
    ]
  },
  {
    number: '06',
    title: "Raccourcis & Productivité 2025",
    subtitle: "Les essentiels pour gagner du temps",
    icon: "⌨️",
    competence: "Optimiser son flux de travail numérique",
    content: "Gagne un temps fou avec les raccourcis clavier essentiels. Les professionnels tapent 40% plus vite que les débutants grâce à eux. Voici le top 15 indispensable pour Word 2024-2025.",
    details: [
      { h: "Base universelle", p: "Ctrl+C (copier), Ctrl+X (couper), Ctrl+V (coller), Ctrl+Z (annuler), Ctrl+Y (rétablir), Ctrl+S (enregistrer). Ces 6 raccourcis fonctionnent dans 99% des logiciels (Word, Excel, navigateur, Photoshop...)." },
      { h: "Mise en forme rapide", p: "Ctrl+B (gras/Bold), Ctrl+I (italique), Ctrl+U (souligné), Ctrl+Maj+K (petites majuscules), Ctrl+D (police), Ctrl+L/E/R/J (aligner gauche/centrer/droite/justifier)." },
      { h: "Navigation", p: "Ctrl+F (rechercher), Ctrl+H (remplacer), Ctrl+G (atteindre page X), Ctrl+Début/Fin (début/fin du document), Ctrl+← / → (mot par mot), Ctrl+Maj+← / → (sélectionner mot par mot)." },
      { h: "Productivité avancée", p: "F7 (orthographe), Maj+F3 (changer casse : MAJUSCULES/minuscules/Capitale), Alt+Maj+D (insérer date), Ctrl+Entrée (saut de page), Ctrl+K (insérer lien hypertexte)." }
    ],
    deep: [
      { label: "IA intégrée (2024)", text: "Word 365 intègre Copilot (IA Microsoft) : 'Résume ce document', 'Reformule en ton formel', 'Génère une intro'. Disponible avec abonnement Microsoft 365 Copilot (30€/mois entreprise, gratuit pour certains étudiants)." },
      { label: "Dictée vocale", text: "Windows : Win+H active la dictée. macOS : Fn Fn. Précision ~95% en 2024. Idéal pour rédiger rapidement (brain dump), puis relecture/correction. Gagne 30% de temps sur longs rapports." }
    ]
  },
  {
    number: 'MISSION',
    title: "Mission Document Professionnel",
    subtitle: "Projets pratiques de rédaction structurée",
    icon: "🚀",
    isProject: true,
    intro: "À toi de jouer : applique les techniques pro pour créer un document long, structuré et automatisé. Choisis une mission adaptée à ton niveau.",
    projects: [
      {
        topic: "Rapport de stage niveau Seconde",
        desc: "Crée un rapport de 5 pages minimum : page de garde, sommaire automatique, 3 chapitres (Titre 1), sous-parties (Titre 2), 2 images avec légende, numérotation de page (sauf page de garde). Utilise exclusivement les styles.",
        livrable: "Fichier .docx avec styles, sommaire auto, images ancrées.",
        difficulty: "Débutant",
        duration: "30 min"
      },
      {
        topic: "Dossier collaboratif (Google Docs/Word 365)",
        desc: "À 2-3 élèves : rédigez un exposé de 8 pages sur un sujet SNT (IA, réseaux sociaux, cybersécurité). Activez le suivi des modifications, utilisez les commentaires pour débattre, créez une bibliographie (5 sources min). Exportez en PDF final.",
        livrable: "PDF avec historique visible des contributions de chacun.",
        difficulty: "Intermédiaire",
        duration: "45 min"
      },
      {
        topic: "Mémoire académique simulé (niveau Expert)",
        desc: "Document de 15 pages : intro en chiffres romains (i, ii), corps en chiffres arabes (1, 2...), 5 chapitres Titre 1, 3 niveaux de sous-titres (Titre 2, 3), table des matières + table des illustrations, en-têtes personnalisés par chapitre, sauts de section, bibliographie.",
        livrable: "Document complexe respectant les normes universitaires.",
        difficulty: "Pix Expert",
        duration: "60 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "Quelle méthode permet de créer un sommaire automatique dans Word ?",
    options: [
      "Recopier tous les titres à la main avec les numéros de page",
      "Utiliser les Styles (Titre 1, Titre 2, Titre 3...)",
      "Souligner tous les titres en gras"
    ],
    correct: 1,
    explanation: "Seuls les styles (Titre 1, 2, 3...) permettent à Word d'identifier la structure du document et de générer automatiquement la table des matières. Mise à jour en 1 clic si tu modifies le contenu."
  },
  {
    q: "Quel raccourci permet de passer à la page suivante proprement (sans décalage) ?",
    options: ["Appuyer 20 fois sur Entrée", "Ctrl + Entrée (Saut de page)", "Espace"],
    correct: 1,
    explanation: "Ctrl+Entrée insère un saut de page : le texte suivant commence automatiquement en haut de la page suivante, même si tu ajoutes du contenu avant. Les 20 'Entrée' créent des lignes vides qui se décalent à chaque modif."
  },
  {
    q: "Que fait le raccourci Ctrl + Z ?",
    options: [
      "Il ferme Word immédiatement",
      "Il annule la dernière action (Undo)",
      "Il enregistre le fichier"
    ],
    correct: 1,
    explanation: "Ctrl+Z annule la dernière action. C'est l'outil de survie pour corriger une erreur immédiate (suppression accidentelle, mauvaise mise en forme...). Ctrl+Y rétablit (Redo)."
  },
  {
    q: "Comment déplacer librement une image sans décaler tout le texte ?",
    options: [
      "Laisser le mode par défaut 'Aligné sur le texte'",
      "Changer l'habillage en 'Carré' ou 'Devant le texte'",
      "Supprimer l'image et la réinsérer"
    ],
    correct: 1,
    explanation: "Par défaut (Aligné), l'image est dans le flux texte et bloque tout. Les modes Carré, Rapproché ou Devant permettent de la positionner librement. Clic droit > Habillage du texte."
  },
  {
    q: "Quel mode permet de voir les modifications faites par un relecteur ?",
    options: [
      "Mode Lecture",
      "Suivi des modifications (Révision)",
      "Mode Plan"
    ],
    correct: 1,
    explanation: "Révision > Suivi des modifications affiche tous les ajouts (en couleur) et suppressions (barrées). Le responsable peut ensuite Accepter ou Refuser chaque modif. Indispensable pour la relecture collaborative."
  },
  {
    q: "Que se passe-t-il si tu modifies un Style (ex : Titre 1) ?",
    options: [
      "Seul le titre sélectionné change",
      "TOUS les Titre 1 du document se mettent à jour automatiquement",
      "Le fichier se corrompt"
    ],
    correct: 1,
    explanation: "La puissance des styles : modifier le style Titre 1 (police, taille, couleur) change instantanément TOUS les titres de niveau 1 du document. Cohérence garantie en 1 clic."
  },
  {
    q: "Quel outil Microsoft 365 (2024) utilise l'IA pour résumer ou réécrire un texte ?",
    options: ["WordArt", "Copilot", "ClipArt"],
    correct: 1,
    explanation: "Copilot (IA intégrée à Word 365 depuis 2023) peut résumer, reformuler, traduire ou générer du texte. Nécessite un abonnement Microsoft 365 Copilot (gratuit pour certains établissements étudiants)."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Structurer', desc: 'Styles & hiérarchie' },
  { id: '02', label: 'Automatiser', desc: 'Sommaire & pagination' },
  { id: '03', label: 'Intégrer', desc: 'Images & médias' },
  { id: '04', label: 'Collaborer', desc: 'Révision & partage' },
];

const COMPETENCES = [
  { key: 'struct', label: 'Structure de document', desc: 'Utiliser styles, titres hiérarchisés, sauts de section pour documents longs (Pix 3.1).' },
  { key: 'auto', label: 'Automatisation', desc: 'Générer tables des matières, légendes, numérotation, bibliographie automatiquement.' },
  { key: 'media', label: 'Intégration média', desc: 'Ancrer images, gérer habillage, compresser, ajouter légendes accessibles (Pix 3.2).' },
  { key: 'collab', label: 'Collaboration', desc: 'Suivi des modifications, commentaires, co-édition temps réel (Word 365/Google Docs) (Pix 2.3).' },
];

// --- COMPOSANT PRINCIPAL ---

export default function WordChapter() {
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
    const savedXP = localStorage.getItem('snt_xp_word');
    if (savedXP) setLabPoints(parseInt(savedXP));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_word', labPoints.toString());
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
       SNT ACADEMY : MAÎTRISE WORD 2025       
=================================================
Session choisie   : ${modeSession}
Score Questionnaire : ${score} / ${QUIZ_QUESTIONS.length}
Points XP (Labs)   : ${labPoints}
Total XP Accumulé  : ${totalXP}

COMPÉTENCES PIX VALIDÉES :
- Structuration de documents longs (styles, hiérarchie) - Pix 3.1
- Automatisation (sommaires, légendes, numérotation) - Pix 3.1
- Intégration média (images, habillage, accessibilité) - Pix 3.2
- Collaboration (révision, commentaires, co-édition) - Pix 2.3

Document généré le : ${new Date().toLocaleDateString('fr-FR')}
=================================================
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bilan_snt_word_${new Date().toLocaleDateString('fr-FR')}.txt`;
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
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-blue-200 pb-20">
      
      {/* NAVIGATION PIX V2 */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/themes" className="font-black text-blue-600 hover:text-black transition uppercase tracking-tighter shrink-0">
            ← SNT Academy
          </Link>
          
          <div className="flex gap-1 bg-slate-100 p-1 border-2 border-black hidden md:flex">
            {(['20min', '1h', '1h30'] as ModeSession[]).map(m => (
              <button
                key={m}
                onClick={() => setModeSession(m)}
                className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${
                  modeSession === m ? 'bg-blue-500 text-white shadow-[2px_2px_0_#000]' : 'text-slate-500 hover:text-black'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button onClick={() => setView('teacher')} className="text-[10px] font-black text-slate-400 hover:text-black hidden sm:block">MODE PROF</button>

          <div className="font-black text-sm bg-blue-100 border-2 border-black px-4 py-1 shadow-[3px_3px_0_#000] shrink-0">
            XP : {totalXP}
          </div>
        </div>
      </nav>

      {/* ACCUEIL DÉTAILLÉ */}
      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-6 shadow-[4px_4px_0_#000]">
              Thème SNT • Traitement de Texte Professionnel
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-mono italic">
              WORD<br /><span className="text-blue-600">PRO.</span>
            </h1>
            
            {/* Lien SNT / Pix */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-0.5 w-10 bg-blue-500"></span>
              <p className="text-xs text-blue-900 leading-relaxed font-black uppercase tracking-widest">
                Parcours PIX : Création de Contenu • Documents Textuels
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-xl text-slate-700 leading-relaxed font-bold">
                  Maîtrise Word comme un pro : styles automatiques, sommaires générés en 1 clic, collaboration temps réel et raccourcis qui te font gagner des heures. Deviens autonome sur les rapports, mémoires et documents longs.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={startCourse} className="px-10 py-5 bg-blue-500 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-all">
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
                  <li>• Structurer un document long avec styles hiérarchisés.</li>
                  <li>• Générer tables des matières et légendes automatiques.</li>
                  <li>• Maîtriser sauts de page/section et pagination complexe.</li>
                  <li>• Intégrer images avec habillage et accessibilité.</li>
                  <li>• Collaborer avec suivi des modifications (Word 365).</li>
                  <li>• Utiliser les raccourcis clavier pour gagner du temps.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TA DÉMARCHE */}
          <div className="mt-28">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-12 text-slate-400">Ta démarche de rédaction pro</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DEMARCHE.map(d => (
                <div key={d.id} className="bg-white p-8 border-4 border-black shadow-[6px_6px_0_#000] group hover:bg-blue-50 transition-all">
                  <div className="text-3xl font-black font-mono text-slate-200 group-hover:text-blue-200 mb-4">{d.id}</div>
                  <div className="font-black text-xl leading-tight mb-2 uppercase">{d.label}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTE PROFESSEUR */}
          <div className="mt-20 bg-blue-100 border-4 border-black p-8 shadow-[8px_8px_0_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📝</div>
            <div className="text-xs font-black uppercase tracking-widest text-blue-800 mb-4 border-b-2 border-blue-200 pb-2 inline-block">Note de Pilotage Pédagogique</div>
            <p className="text-sm text-blue-900 leading-relaxed font-bold max-w-4xl">
              Ce module couvre les compétences <span className="font-black">Pix 3.1 (Développer des documents textuels)</span>, <span className="font-black">3.2 (multimédias)</span> et <span className="font-black">2.3 (Collaborer)</span>. 
              Le mode <span className="underline">{modeSession}</span> permet d&apos;adapter entre sensibilisation (20 min : styles, sommaire, sauts de page) et ateliers pratiques (1h30 : rapport complet avec révision collaborative).
              {modeSession === '20min' && " Focus sur les 3 essentiels : styles, sommaire auto, sauts de page."}
              {modeSession === '1h' && " Parcours complet avec approfondissements (sections, en-têtes, images, raccourcis)."}
              {modeSession === '1h30' && " Les missions de création de documents longs (rapport, mémoire) sont le cœur de la séance."}
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
                  <div key={i} className={`w-8 h-8 border-4 border-black shadow-[3px_3px_0_#000] transition-all ${i <= stepIdx ? 'bg-blue-500' : 'bg-white'}`} />
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
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-4xl shadow-[4px_4px_0_#3B82F6]">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-1">{currentStep.competence}</h2>
                <h1 className="text-4xl md:text-6xl font-black font-mono mb-0 tracking-tighter leading-none uppercase">{currentStep.title}</h1>
              </div>
            </div>

            {currentStep.isProject ? (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-black text-white p-6 border-4 border-black font-black text-xs uppercase tracking-[2px] text-center leading-relaxed">
                  Mission Document Pro • Mode {modeSession}
                </div>
                <p className="text-lg font-bold text-slate-600 italic border-l-8 border-blue-500 pl-6">
                  {currentStep.intro}
                </p>
                <div className="grid gap-6">
                  {currentStep.projects?.map((p, i) => (
                    <div key={i} className="p-8 border-4 border-black bg-slate-50 shadow-[6px_6px_0_#000] hover:bg-white hover:-translate-y-1 transition-all">
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <h4 className="font-black text-2xl leading-none uppercase tracking-tighter">{p.topic}</h4>
                        <span className="text-[10px] font-black bg-blue-500 text-white border-2 border-black px-3 py-1 uppercase shrink-0">{p.difficulty}</span>
                      </div>
                      <p className="text-slate-600 text-base mb-6 leading-relaxed font-bold">{p.desc}</p>
                      <div className="text-xs font-black text-blue-600 uppercase tracking-tighter italic border-t-2 border-slate-200 pt-6 flex items-center gap-2">
                        <span className="text-black not-italic">Livrable attendu :</span> {p.livrable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-bold mb-12 border-l-8 border-blue-500 pl-8 py-2">
                  {currentStep.content}
                </p>
                
                {/* ACCORDÉON DE DÉTAILS */}
                <div className="mb-10">
                  <button 
                    onClick={() => setOpenDetail(!openDetail)} 
                    className="w-full flex justify-between items-center py-5 px-6 bg-slate-100 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-blue-100 transition-colors"
                  >
                    <span>{openDetail ? '− Cacher les détails techniques' : '+ Approfondir (Technique Word 2025)'}</span>
                    <span className="text-xl">{openDetail ? '▲' : '▼'}</span>
                  </button>

                  {openDetail && (
                    <div className="p-8 border-x-4 border-b-4 border-black bg-white space-y-10 animate-in slide-in-from-top-4">
                      {currentStep.details?.map((d, i) => (
                        <div key={i} className="grid md:grid-cols-4 gap-6">
                          <div className="text-[10px] font-black uppercase text-blue-600 pt-1 tracking-widest leading-tight border-r-2 border-blue-100 md:pr-4">{d.h}</div>
                          <div className="md:col-span-3 text-slate-700 text-base leading-relaxed font-bold">{d.p}</div>
                        </div>
                      ))}
                      {currentStep.deep && (
                        <div className="mt-8 pt-8 border-t-2 border-slate-100">
                           <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Éclairage SNT / Expert 2025</div>
                           {currentStep.deep.map((dp, i) => (
                             <div key={i} className="mb-4 text-sm font-bold italic text-slate-500">
                               <span className="text-blue-600 uppercase mr-2">{dp.label} :</span> {dp.text}
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MINI-LABS INTERACTIFS */}
                {currentStep.hasLab && (
                  <div className="mt-12 bg-blue-50 border-4 border-black p-8 shadow-[6px_6px_0_#000] relative">
                    <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest">
                      Compétence : Générer un sommaire automatique
                    </div>
                    <h4 className="text-blue-900 font-black text-xs mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                      🧪 Challenge Table des Matières
                    </h4>
                    <p className="text-lg font-bold mb-6 italic text-blue-950 leading-tight">Lequel permet de générer un sommaire automatiquement dans Word ?</p>
                    <div className="flex flex-wrap gap-4">
                      {['Mettre en gras à la main', 'Utiliser les Styles (Titre 1, 2, 3)'].map(v => (
                        <button key={v} onClick={() => { if(!lab1Ans){ setLab1Ans(v); if(v.startsWith('Utiliser')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all ${lab1Ans === v ? (v.startsWith('Utiliser') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white hover:bg-blue-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab1Ans === 'Mettre en gras à la main' && (
                      <p className="mt-4 text-sm font-bold text-blue-700 italic">⚠️ Le gras manuel ne permet PAS de créer un sommaire automatique. Seuls les Styles (Titre 1, 2, 3) structurent le document pour Word.</p>
                    )}
                  </div>
                )}

                {currentStep.hasLab2 && (
                  <div className="mt-12 bg-slate-900 border-4 border-black p-8 shadow-[6px_6px_0_#000] text-white relative">
                    <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-blue-400 mb-2 tracking-widest">
                      Compétence : Gérer l&apos;habillage d&apos;images
                    </div>
                    <h4 className="text-blue-300 font-black text-xs mb-6 uppercase tracking-[0.2em]">🖼️ Situation : Rapport avec images</h4>
                    <p className="text-lg font-bold mb-6 italic leading-tight">Tu insères une image. Le texte disparaît et tout se décale. Que faire ?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        'Supprimer l\'image, c\'est trop compliqué',
                        'Changer l\'habillage en \'Carré\' ou \'Devant le texte\''
                      ].map(v => (
                        <button key={v} onClick={() => { if(!lab2Ans){ setLab2Ans(v); if(v.startsWith('Changer')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all text-left ${lab2Ans === v ? (v.startsWith('Changer') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white text-slate-900 hover:bg-blue-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab2Ans === 'Supprimer l\'image, c\'est trop compliqué' && (
                      <p className="mt-4 text-sm font-bold text-blue-300 italic">⚠️ L&apos;habillage contrôle comment le texte interagit avec l&apos;image. Mode par défaut (Aligné) = blocage. Carré/Devant = liberté de positionnement !</p>
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
              className="px-10 py-5 bg-blue-600 text-white border-4 border-black font-black uppercase text-base shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
               <div className="text-blue-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Certification Pix Word</div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic border-b-8 border-blue-600 inline-block pb-2">Test Maîtrise Word</h2>
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
                
                if (selectedAns === null) btnClass += "bg-white hover:bg-blue-50 shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1";
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
                <div className="text-[10px] font-black uppercase text-blue-600 mb-4 tracking-widest italic underline">Explication Technique :</div>
                <p className="text-base mb-8 font-bold leading-relaxed">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuiz} className="w-full py-5 bg-black text-white font-black uppercase text-lg shadow-[6px_6px_0_#000] hover:bg-blue-600 transition-colors">
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
          <h1 className="text-6xl md:text-8xl font-black font-mono mb-6 italic uppercase tracking-tighter leading-none">Expert Word !</h1>
          <p className="text-slate-500 mb-16 font-black uppercase text-xs tracking-[0.4em] max-w-xl mx-auto">Compétences de traitement de texte validées en mode {modeSession}.</p>
          
          <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[16px_16px_0_#000] mb-20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 font-black">PIX</div>
            
            <div className="grid md:grid-cols-2 gap-12 border-b-4 border-slate-100 pb-12 mb-12">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Score Théorique (Quiz)</div>
                <div className="text-7xl font-black text-slate-900 font-mono">{score} <span className="text-2xl text-slate-300">/ {QUIZ_QUESTIONS.length}</span></div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Progression Totale (XP)</div>
                <div className="text-7xl font-black text-blue-600 font-mono tracking-tighter">{totalXP}</div>
                <div className="text-[10px] font-black text-slate-400 mt-2">Bonus XP Labs : {labPoints} pts</div>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 underline decoration-blue-500 decoration-4 underline-offset-8">Bilan de Compétences Pix / SNT</div>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPETENCES.map(c => (
                <div key={c.key} className="p-6 bg-slate-50 border-2 border-black shadow-[4px_4px_0_#000]">
                  <div className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-tighter">{c.label}</div>
                  <div className="font-bold text-sm leading-tight text-slate-700">{c.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-block border-2 border-black px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0_#3B82F6]">Certifié SNT Academy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={exportBilan} className="px-12 py-6 bg-black text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:bg-blue-600 transition flex items-center justify-center gap-3">
              {isExporting ? 'Exportation...' : '💾 Télécharger mon Bilan'}
            </button>
            <button onClick={() => window.location.reload()} className="px-12 py-6 border-4 border-black rounded-none font-black text-xl uppercase bg-white hover:bg-slate-100 shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Recommencer
            </button>
            <Link href="/themes" className="px-12 py-6 bg-blue-600 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Menu Principal
            </Link>
          </div>
        </main>
      )}

      {/* MODE PROFESSEUR */}
      {view === 'teacher' && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-slate-900 text-white p-12 border-4 border-black shadow-[12px_12px_0_#000] rounded-none">
              <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b-4 border-blue-500 pb-4 inline-block">Guide Pédagogique (Word Pro)</h1>
              
              <div className="space-y-12">
                <section>
                  <h2 className="text-blue-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Cibles PIX / SNT travaillées</h2>
                  <p className="text-slate-300 font-bold leading-relaxed mb-4">
                    Ce module couvre les compétences <span className="text-blue-400">Pix 3.1 (Développer des documents textuels)</span>, <span className="text-blue-400">3.2 (Développer des documents multimédias)</span> et <span className="text-blue-400">2.3 (Collaborer)</span>. 
                    Focus sur la structuration professionnelle de documents longs, l&apos;automatisation (sommaires, légendes) et la collaboration temps réel (Word 365/Google Docs).
                  </p>
                </section>

                <section>
                  <h2 className="text-blue-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Réponses du Quiz</h2>
                  <div className="space-y-4">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={i} className="bg-slate-800 p-4 border-l-4 border-blue-500">
                         <div className="font-bold text-slate-100">{q.q}</div>
                         <div className="text-xs text-blue-400 uppercase font-black mt-2">→ Réponse : {q.options[q.correct]}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-blue-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Suggestions d&apos;Activités en Classe</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2">
                    <li>Atelier styles : créer un document test, appliquer Titre 1/2/3, générer le sommaire en direct au vidéoprojecteur.</li>
                    <li>TP rapport de stage : structure imposée (5 pages min, 3 chapitres, 2 images, sommaire auto). Évaluation sur respect des styles.</li>
                    <li>Débat : Word vs Google Docs vs LaTeX — avantages et limites de chaque outil selon l&apos;usage (pro, académique, collaboratif).</li>
                    <li>Collaboration en temps réel : par binôme sur Word 365, activer suivi des modifications, échanger des commentaires, valider les modifs.</li>
                    <li>Challenge raccourcis : chronomètre 5 tâches de mise en forme (gras, centrer, saut de page, rechercher, enregistrer) — clavier uniquement.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-blue-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Ressources complémentaires</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li>Word 365 (Microsoft) — abonnement étudiant 2€/mois, gratuit pour certains établissements.</li>
                    <li>Google Docs (gratuit) — alternative collaborative simple, moins puissant en styles complexes.</li>
                    <li>LibreOffice Writer (gratuit, open source) — équivalent Word, fonctionne hors ligne.</li>
                    <li>Support Microsoft — support.microsoft.com/fr-fr/word : tutoriels officiels vidéo.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-blue-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Nouveautés Word 2024-2025</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li><span className="text-blue-400">Copilot (IA Microsoft)</span> : résumé auto, reformulation, génération de texte (abonnement Copilot requis).</li>
                    <li><span className="text-blue-400">Dictée vocale améliorée</span> : précision 95%, ponctuation automatique (Win+H ou Fn Fn sur Mac).</li>
                    <li><span className="text-blue-400">Collaboration temps réel</span> : jusqu&apos;à 100 utilisateurs simultanés sur un même document (SharePoint/OneDrive).</li>
                    <li><span className="text-blue-400">Accessibilité</span> : vérificateur d&apos;accessibilité intégré (texte alternatif images, contraste couleurs, titres structurés).</li>
                  </ul>
                </section>
              </div>

              <button onClick={() => setView('home')} className="mt-16 px-8 py-4 bg-blue-600 text-white font-black uppercase border-2 border-black">Fermer la vue prof</button>
           </div>
        </main>
      )}

    </div>
  );
}