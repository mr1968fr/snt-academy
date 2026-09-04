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
    title: "La Box : Cœur du Réseau Local",
    subtitle: "Ton entrée sur Internet",
    icon: "📦",
    competence: "Comprendre l'architecture réseau domestique",
    content: "La box (routeur/modem) fait le pont entre le monde extérieur (Internet) et ton réseau domestique. Elle transforme le signal qui arrive (fibre optique, ADSL, 4G/5G) en Wi-Fi ou Ethernet pour tes appareils.",
    details: [
      { h: "Rôle de la box", p: "Elle gère la circulation des données entre Internet et tous tes appareils (ordinateur, smartphone, console, imprimante). C'est le chef d'orchestre du réseau local." },
      { h: "Types de connexion", p: "Fibre optique (jusqu'à 1 Gb/s ou plus), ADSL (jusqu'à 20 Mb/s), 4G/5G fixe (via antenne relais). La fibre utilise la lumière pour transmettre les données à très haute vitesse." },
      { h: "Ports Ethernet", p: "Les prises jaunes ou bleues à l'arrière de la box permettent une connexion câblée plus stable et rapide que le Wi-Fi. Idéal pour le gaming ou le télétravail." },
      { h: "Indicateurs lumineux", p: "Les LEDs sur la box t'indiquent l'état : connexion Internet active (vert fixe), Wi-Fi activé, synchronisation en cours (clignotant), erreur (rouge)." }
    ],
    deep: [
      { label: "NAT (Network Address Translation)", text: "La box masque les adresses IP privées de tes appareils derrière une seule IP publique visible sur Internet. C'est une première couche de sécurité." },
      { label: "Débit théorique vs réel", text: "Un abonnement 'fibre 1 Gb/s' est une vitesse maximale partagée. En pratique, le débit dépend de ton équipement, du Wi-Fi, du nombre d'utilisateurs simultanés." }
    ]
  },
  {
    number: '02',
    title: "Adresse IP & Masque de Sous-Réseau",
    subtitle: "L'identité numérique de tes appareils",
    icon: "📍",
    hasLab: true,
    competence: "Identifier et analyser les adresses réseau (Pix)",
    content: "Chaque appareil connecté a une adresse IP unique sur le réseau local (ex : 192.168.1.15). C'est comme ton adresse postale : pour que le serveur de YouTube t'envoie une vidéo, il doit savoir exactement à quelle 'adresse' envoyer les paquets de données.",
    details: [
      { h: "IP locale (privée)", p: "Format : 192.168.x.x ou 10.0.x.x. Ces adresses ne sont valables que dans ton réseau domestique. Deux maisons peuvent avoir un appareil avec la même IP privée sans conflit." },
      { h: "IP publique", p: "C'est l'adresse visible sur Internet, attribuée par ton Fournisseur d'Accès Internet (FAI). Elle change souvent (IP dynamique) sauf si tu paies pour une IP fixe." },
      { h: "Masque de sous-réseau", p: "Exemple : 255.255.255.0. Il indique quelle partie de l'IP identifie le réseau (192.168.1) et quelle partie identifie l'appareil (.15). Permet de segmenter les réseaux." },
      { h: "Passerelle par défaut", p: "Généralement l'IP de ta box (192.168.1.1). C'est la 'porte de sortie' vers Internet pour tous tes appareils." }
    ],
    deep: [
      { label: "IPv4 vs IPv6", text: "IPv4 utilise 4 milliards d'adresses (bientôt saturé). IPv6 en offre 340 sextillions (un chiffre avec 36 zéros) pour anticiper la croissance des objets connectés." },
      { label: "DHCP", text: "Protocole qui attribue automatiquement une IP à chaque appareil qui se connecte à ton réseau. Sinon, il faudrait configurer manuellement chaque smartphone, tablette, PC..." }
    ]
  },
  {
    number: '03',
    title: "Wi-Fi : Bandes & Canaux",
    subtitle: "2.4 GHz vs 5 GHz",
    icon: "📶",
    competence: "Optimiser la connexion sans fil",
    content: "Le Wi-Fi utilise des ondes radio pour transmettre les données sans câble. Deux bandes de fréquences coexistent : 2.4 GHz (portée longue, débit modéré) et 5 GHz (portée courte, débit élevé).",
    details: [
      { h: "2.4 GHz : portée maximale", p: "Traverse mieux les murs et les obstacles. Idéal pour les objets connectés éloignés (domotique, enceintes). Mais : seulement 3 canaux non-chevauchants (1, 6, 11), donc saturé en zone dense (immeuble)." },
      { h: "5 GHz : débit maximal", p: "Jusqu'à 1300 Mb/s théoriques (norme Wi-Fi 5/ac). Parfait pour le streaming 4K, le gaming ou les visioconférences. Faiblesse : s'arrête dès qu'il y a un mur épais ou un étage." },
      { h: "Wi-Fi 6 (802.11ax)", p: "Norme récente (depuis 2019) qui améliore l'efficacité en zone dense (plusieurs appareils connectés). Gère mieux la latence pour les jeux en ligne. Nécessite box et appareil compatibles." },
      { h: "Interférences", p: "Micro-ondes, baby-phones et voisins sur le même canal saturent le 2.4 GHz. Solution : changer de canal Wi-Fi dans l'interface de ta box ou utiliser le 5 GHz." }
    ],
    deep: [
      { label: "SSID", text: "Service Set Identifier : le nom de ton réseau Wi-Fi. Tu peux le masquer (réseau caché) mais ce n'est pas une vraie sécurité : les outils de scan le détectent quand même." },
      { label: "Roaming Wi-Fi", text: "Si tu as plusieurs bornes Wi-Fi chez toi (répéteur, mesh), ton smartphone bascule automatiquement vers la borne la plus proche. Le mesh (maillage) offre une couverture homogène." }
    ]
  },
  {
    number: '04',
    title: "Partage de Connexion Mobile",
    subtitle: "Ton smartphone devient une box",
    icon: "📲",
    hasLab2: true,
    competence: "Utiliser un point d'accès mobile",
    content: "Ton smartphone peut devenir une mini box ! En activant le 'Point d'accès mobile' (ou 'Hotspot'), ton téléphone utilise sa connexion 4G/5G pour créer un réseau Wi-Fi auquel ton ordinateur ou tablette peut se connecter.",
    details: [
      { h: "Activer le partage", p: "Sur Android : Paramètres > Connexions > Point d'accès mobile. Sur iPhone : Réglages > Partage de connexion. Définis un mot de passe WPA2 pour sécuriser ton hotspot." },
      { h: "Débit 4G vs 5G", p: "En 4G, attends-toi à 20-50 Mb/s en pratique (100 Mb/s max théorique). La 5G peut atteindre 300-500 Mb/s en ville, voire 1 Gb/s en conditions optimales (antenne proche, peu d'utilisateurs)." },
      { h: "Consommation de data", p: "Attention : un film Netflix HD consomme ~3 Go/h. Une visio Zoom ~1.5 Go/h. Vérifie ton forfait mobile pour éviter le hors-forfait (facture salée)." },
      { h: "USB tethering", p: "Alternative au Wi-Fi : branche ton téléphone en USB et active 'Modem USB'. Connexion plus stable, consomme moins de batterie que le hotspot Wi-Fi." }
    ],
    deep: [
      { label: "Cas d'usage", text: "Dépannage si ta box est en panne, connexion en mobilité (train, parc), contournement de restrictions réseau (attention aux règles de ton école/entreprise)." },
      { label: "Latence 4G/5G", text: "La latence (ping) mobile est plus élevée qu'en fibre : 30-50 ms en 4G, 15-25 ms en 5G (vs 5-10 ms en fibre). Jouable pour la plupart des usages, sauf jeux compétitifs ultra-réactifs." }
    ]
  },
  {
    number: '05',
    title: "Sécurité : WPA3 & Wi-Fi Publics",
    subtitle: "Protéger ton réseau et tes données",
    icon: "🛡️",
    competence: "Sécuriser un réseau sans fil",
    content: "Ne laisse JAMAIS ton Wi-Fi sans mot de passe. Le protocole WPA2 (ou mieux : WPA3) crypte tes données pour que personne d'autre sur le réseau ne puisse les lire. Sur un Wi-Fi public (gare, café), évite absolument de te connecter à ta banque.",
    details: [
      { h: "WPA2 vs WPA3", p: "WPA2 (depuis 2004) est le standard actuel, mais vulnérable aux attaques par dictionnaire si ton mot de passe est faible. WPA3 (2018) protège mieux contre le bruteforce et crypte même les réseaux ouverts." },
      { h: "Mot de passe fort", p: "Minimum 12 caractères, mélange de lettres/chiffres/symboles. Évite '123456' ou 'motdepasse'. Un pirate peut casser un mot de passe simple en quelques minutes avec Kali Linux." },
      { h: "Danger des Wi-Fi publics", p: "Sur un réseau ouvert, un attaquant peut intercepter tes données (attaque 'Man in the Middle'). Il voit les sites que tu visites, peut voler tes identifiants si le site n'est pas en HTTPS." },
      { h: "VPN (Virtual Private Network)", p: "Crée un tunnel crypté entre ton appareil et Internet, même sur Wi-Fi public. Tes données sont illisibles pour les espions du réseau. Attention : choisis un VPN de confiance (pas gratuit = revente de tes données)." }
    ],
    deep: [
      { label: "Filtrage MAC", text: "Tu peux autoriser uniquement certaines adresses MAC (identifiant matériel unique) à se connecter. Utile mais contournable : un pirate peut usurper une adresse MAC autorisée." },
      { label: "DMZ", text: "Zone Démilitarisée : placer un appareil en dehors du pare-feu de la box. À éviter sauf usage expert (serveur de jeu), car expose l'appareil aux attaques extérieures." }
    ]
  },
  {
    number: '06',
    title: "Débit, Ping & Qualité de Service",
    subtitle: "Mesurer et optimiser ta connexion",
    icon: "⚡",
    competence: "Diagnostiquer les performances réseau",
    content: "Le débit (vitesse de téléchargement/upload) et le ping (latence) déterminent la qualité de ton expérience en ligne. Un bon ping est critique pour les jeux en temps réel ; un bon débit l'est pour le streaming et les téléchargements.",
    details: [
      { h: "Débit descendant (download)", p: "Vitesse à laquelle tu reçois des données (regarder Netflix, télécharger un fichier). Mesuré en Mb/s (mégabits par seconde). 1 Mo (mégaoctet) = 8 Mb." },
      { h: "Débit montant (upload)", p: "Vitesse d'envoi (envoyer une vidéo sur YouTube, partager un fichier). Souvent plus faible que le download en ADSL (asymétrique), équilibré en fibre." },
      { h: "Ping (latence)", p: "Temps d'aller-retour d'un paquet de données (mesuré en ms). < 20 ms : excellent (fibre). 20-50 ms : bon (4G). > 100 ms : jeux en ligne difficiles (lag visible)." },
      { h: "Outils de test", p: "Speedtest by Ookla, Fast.com (Netflix), nPerf. Teste à différents moments de la journée : le débit baisse aux heures de pointe (19h-22h) car le réseau du quartier est saturé." }
    ],
    deep: [
      { label: "QoS (Quality of Service)", text: "Fonction de la box pour prioriser certains usages (jeux, visio) sur d'autres (téléchargements). Utile en foyer multi-utilisateurs pour éviter que Netflix monopolise toute la bande passante." },
      { label: "Bufferbloat", text: "Phénomène où le ping explose quand quelqu'un télécharge massivement. Solutions : activer le QoS, passer en Ethernet, limiter les débits des applis gourmandes." }
    ]
  },
  {
    number: 'MISSION',
    title: "Mission Administrateur Réseau",
    subtitle: "Diagnostics & Optimisations",
    icon: "🚀",
    isProject: true,
    intro: "À toi de jouer : mène des tests et optimisations comme un vrai technicien réseau.",
    projects: [
      {
        topic: "Audit de débit",
        desc: "Utilise Speedtest pour comparer ta vitesse en Wi-Fi 2.4 GHz, 5 GHz et Ethernet. Explique les différences observées et identifie le mode optimal pour chaque usage (jeu, streaming, navigation).",
        livrable: "Tableau comparatif des débits + recommandations d'usage.",
        difficulty: "Débutant",
        duration: "15 min"
      },
      {
        topic: "Le mystère du Ping",
        desc: "Mesure ton ping en fibre, 4G et Wi-Fi public. Explique pourquoi un ping élevé (> 100 ms) rend les jeux en ligne injouables (phénomène de lag). Quelles solutions pour réduire le ping ?",
        livrable: "Analyse technique du ping + 3 solutions d'optimisation.",
        difficulty: "Intermédiaire",
        duration: "20 min"
      },
      {
        topic: "Sécuriser son réseau",
        desc: "Accède à l'interface de ta box (généralement 192.168.1.1). Vérifie : protocole Wi-Fi (WPA2 ou WPA3 ?), force du mot de passe, appareils connectés inconnus. Change le SSID par défaut et active le filtrage MAC si disponible.",
        livrable: "Checklist de sécurité réseau + captures d'écran anonymisées.",
        difficulty: "Pix Expert",
        duration: "25 min"
      }
    ]
  }
];

const QUIZ_QUESTIONS: Question[] = [
  {
    q: "À quoi sert principalement une adresse IP sur un réseau local ?",
    options: [
      "À calculer la vitesse de connexion",
      "À identifier de manière unique un appareil sur le réseau",
      "À recharger la batterie de l'appareil"
    ],
    correct: 1,
    explanation: "L'adresse IP est l'identifiant unique qui permet aux paquets de données d'arriver au bon appareil. Sans IP, impossible de router les données correctement."
  },
  {
    q: "Quelle fréquence Wi-Fi offre le meilleur débit mais traverse mal les murs ?",
    options: ["2.4 GHz", "5 GHz", "Bluetooth"],
    correct: 1,
    explanation: "Le 5 GHz offre jusqu'à 1300 Mb/s (Wi-Fi 5) mais a une portée courte et est bloqué par les obstacles. Le 2.4 GHz traverse mieux mais plafonne à 300 Mb/s."
  },
  {
    q: "Pourquoi le Wi-Fi public (gare, café) est-il risqué pour la banque en ligne ?",
    options: [
      "Il coûte cher",
      "Les données peuvent être interceptées par d'autres utilisateurs du réseau",
      "Il décharge le téléphone"
    ],
    correct: 1,
    explanation: "Sur un réseau ouvert, un attaquant peut effectuer une attaque 'Man in the Middle' pour intercepter tes identifiants. Toujours utiliser un VPN ou la 4G pour les opérations sensibles."
  },
  {
    q: "Quelle est la différence entre IP privée et IP publique ?",
    options: [
      "L'IP privée est visible sur Internet, l'IP publique est locale",
      "L'IP privée est utilisée dans ton réseau local, l'IP publique te représente sur Internet",
      "Aucune différence, ce sont des synonymes"
    ],
    correct: 1,
    explanation: "Ton réseau local utilise des IP privées (192.168.x.x). Ta box utilise une seule IP publique (fournie par le FAI) pour communiquer avec Internet via le NAT."
  },
  {
    q: "Qu'est-ce que le ping (latence) mesure exactement ?",
    options: [
      "La vitesse de téléchargement en Mb/s",
      "Le temps d'aller-retour d'un paquet de données en millisecondes",
      "Le nombre d'appareils connectés"
    ],
    correct: 1,
    explanation: "Le ping mesure le délai de réponse réseau. Un ping faible (< 20 ms) est crucial pour les jeux en ligne et la visioconférence. Un ping élevé provoque du lag."
  },
  {
    q: "Quel protocole de sécurité Wi-Fi est le plus récent et le plus sûr ?",
    options: ["WEP", "WPA2", "WPA3"],
    correct: 2,
    explanation: "WPA3 (2018) améliore la résistance aux attaques par dictionnaire et protège mieux les réseaux ouverts. WEP (1999) est obsolète et crackable en quelques minutes."
  }
];

const DEMARCHE = [
  { id: '01', label: 'Identifier', desc: 'Box, IP, appareils' },
  { id: '02', label: 'Mesurer', desc: 'Débit & Ping' },
  { id: '03', label: 'Optimiser', desc: '5GHz, Ethernet' },
  { id: '04', label: 'Sécuriser', desc: 'WPA3 & VPN' },
];

const COMPETENCES = [
  { key: 'archi', label: 'Architecture réseau', desc: 'Comprendre le rôle de la box, du routeur, de l\'adresse IP et du DHCP.' },
  { key: 'wifi', label: 'Wi-Fi & Fréquences', desc: 'Distinguer 2.4 GHz / 5 GHz, gérer les canaux et les interférences.' },
  { key: 'secu', label: 'Sécurité réseau', desc: 'Configurer WPA2/WPA3, reconnaître les dangers des Wi-Fi publics.' },
  { key: 'diag', label: 'Diagnostic réseau', desc: 'Mesurer débit et ping, identifier les goulets d\'étranglement (Pix).' },
];

// --- COMPOSANT PRINCIPAL ---

export default function ReseauChapter() {
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
    const savedXP = localStorage.getItem('snt_xp_reseau');
    if (savedXP) setLabPoints(parseInt(savedXP));
  }, []);

  useEffect(() => {
    localStorage.setItem('snt_xp_reseau', labPoints.toString());
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
       SNT ACADEMY : RÉSEAUX & WI-FI       
=================================================
Session choisie   : ${modeSession}
Score Questionnaire : ${score} / ${QUIZ_QUESTIONS.length}
Points XP (Labs)   : ${labPoints}
Total XP Accumulé  : ${totalXP}

COMPÉTENCES PIX VALIDÉES :
- Architecture réseau domestique (box, IP, DHCP)
- Wi-Fi : bandes de fréquences 2.4/5 GHz
- Sécurité : WPA2/WPA3, dangers Wi-Fi publics
- Diagnostic : mesure débit/ping, optimisation

Document généré le : ${new Date().toLocaleDateString('fr-FR')}
=================================================
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bilan_snt_reseau_${new Date().toLocaleDateString('fr-FR')}.txt`;
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
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-indigo-200 pb-20">
      
      {/* NAVIGATION PIX V2 */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/themes" className="font-black text-indigo-600 hover:text-black transition uppercase tracking-tighter shrink-0">
            ← SNT Academy
          </Link>
          
          <div className="flex gap-1 bg-slate-100 p-1 border-2 border-black hidden md:flex">
            {(['20min', '1h', '1h30'] as ModeSession[]).map(m => (
              <button
                key={m}
                onClick={() => setModeSession(m)}
                className={`px-3 py-1 text-[10px] font-black uppercase transition-all ${
                  modeSession === m ? 'bg-indigo-500 text-white shadow-[2px_2px_0_#000]' : 'text-slate-500 hover:text-black'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button onClick={() => setView('teacher')} className="text-[10px] font-black text-slate-400 hover:text-black hidden sm:block">MODE PROF</button>

          <div className="font-black text-sm bg-indigo-100 border-2 border-black px-4 py-1 shadow-[3px_3px_0_#000] shrink-0">
            XP : {totalXP}
          </div>
        </div>
      </nav>

      {/* ACCUEIL DÉTAILLÉ */}
      {view === 'home' && (
        <main className="max-w-6xl mx-auto px-6 py-20 animate-in fade-in duration-700">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-6 shadow-[4px_4px_0_#000]">
              Thème SNT • Réseaux & Internet
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 font-mono italic">
              TON<br /><span className="text-indigo-600">RÉSEAU.</span>
            </h1>
            
            {/* Lien SNT / Pix */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-0.5 w-10 bg-indigo-500"></span>
              <p className="text-xs text-indigo-900 leading-relaxed font-black uppercase tracking-widest">
                Parcours PIX : Communication & Collaboration • Réseaux
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <p className="text-xl text-slate-700 leading-relaxed font-bold">
                  Comprends comment fonctionne ta box, ton Wi-Fi et ton adresse IP. Deviens autonome pour diagnostiquer un problème de connexion et sécuriser ton réseau domestique.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button onClick={startCourse} className="px-10 py-5 bg-indigo-500 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#000] transition-all">
                    Lancer le cours ⚡
                  </button>
                </div>
              </div>

              {/* Objectifs du module */}
              <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000]">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">
                  Objectifs du module
                </div>
                <ul className="text-sm font-bold text-slate-700 space-y-2">
                  <li>• Comprendre le rôle de la box et du routeur.</li>
                  <li>• Identifier une adresse IP locale et publique.</li>
                  <li>• Choisir entre Wi-Fi 2.4 GHz et 5 GHz selon l&apos;usage.</li>
                  <li>• Sécuriser son réseau avec WPA2/WPA3.</li>
                  <li>• Mesurer débit et ping pour diagnostiquer un problème.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* TA DÉMARCHE */}
          <div className="mt-28">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-center mb-12 text-slate-400">Ta démarche réseau</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DEMARCHE.map(d => (
                <div key={d.id} className="bg-white p-8 border-4 border-black shadow-[6px_6px_0_#000] group hover:bg-indigo-50 transition-all">
                  <div className="text-3xl font-black font-mono text-slate-200 group-hover:text-indigo-200 mb-4">{d.id}</div>
                  <div className="font-black text-xl leading-tight mb-2 uppercase">{d.label}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* NOTE PROFESSEUR */}
          <div className="mt-20 bg-indigo-100 border-4 border-black p-8 shadow-[8px_8px_0_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">📡</div>
            <div className="text-xs font-black uppercase tracking-widest text-indigo-800 mb-4 border-b-2 border-indigo-200 pb-2 inline-block">Note de Pilotage Pédagogique</div>
            <p className="text-sm text-indigo-900 leading-relaxed font-bold max-w-4xl">
              Ce module vise les compétences <span className="font-black">SNT Réseaux</span> et <span className="font-black">Pix Domaine 2 (Communication)</span>. 
              Le mode <span className="underline">{modeSession}</span> permet d&apos;adapter la séance entre sensibilisation rapide (20 min : box, IP, Wi-Fi) et ateliers techniques (1h30 : accès interface box, filtrage MAC, QoS).
              {modeSession === '20min' && " Focus sur les concepts clés : box, IP, 2.4/5 GHz, sécurité WPA2."}
              {modeSession === '1h' && " Parcours complet avec approfondissements (DHCP, NAT, ping)."}
              {modeSession === '1h30' && " La mission d'audit réseau (Speedtest, sécurisation) est le cœur de la séance."}
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
                  <div key={i} className={`w-8 h-8 border-4 border-black shadow-[3px_3px_0_#000] transition-all ${i <= stepIdx ? 'bg-indigo-500' : 'bg-white'}`} />
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
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-4xl shadow-[4px_4px_0_#6366F1]">
                {currentStep.icon}
              </div>
              <div>
                <h2 className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-1">{currentStep.competence}</h2>
                <h1 className="text-4xl md:text-6xl font-black font-mono mb-0 tracking-tighter leading-none uppercase">{currentStep.title}</h1>
              </div>
            </div>

            {currentStep.isProject ? (
              <div className="space-y-8 animate-in fade-in">
                <div className="bg-black text-white p-6 border-4 border-black font-black text-xs uppercase tracking-[2px] text-center leading-relaxed">
                  Mission Réseau • Mode {modeSession}
                </div>
                <p className="text-lg font-bold text-slate-600 italic border-l-8 border-indigo-500 pl-6">
                  {currentStep.intro}
                </p>
                <div className="grid gap-6">
                  {currentStep.projects?.map((p, i) => (
                    <div key={i} className="p-8 border-4 border-black bg-slate-50 shadow-[6px_6px_0_#000] hover:bg-white hover:-translate-y-1 transition-all">
                      <div className="flex justify-between items-start mb-6 gap-4">
                        <h4 className="font-black text-2xl leading-none uppercase tracking-tighter">{p.topic}</h4>
                        <span className="text-[10px] font-black bg-indigo-500 text-white border-2 border-black px-3 py-1 uppercase shrink-0">{p.difficulty}</span>
                      </div>
                      <p className="text-slate-600 text-base mb-6 leading-relaxed font-bold">{p.desc}</p>
                      <div className="text-xs font-black text-indigo-600 uppercase tracking-tighter italic border-t-2 border-slate-200 pt-6 flex items-center gap-2">
                        <span className="text-black not-italic">Livrable attendu :</span> {p.livrable}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-bold mb-12 border-l-8 border-indigo-500 pl-8 py-2">
                  {currentStep.content}
                </p>
                
                {/* ACCORDÉON DE DÉTAILS */}
                <div className="mb-10">
                  <button 
                    onClick={() => setOpenDetail(!openDetail)} 
                    className="w-full flex justify-between items-center py-5 px-6 bg-slate-100 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-indigo-100 transition-colors"
                  >
                    <span>{openDetail ? '− Cacher les détails techniques' : '+ Approfondir (Technique & Configuration)'}</span>
                    <span className="text-xl">{openDetail ? '▲' : '▼'}</span>
                  </button>

                  {openDetail && (
                    <div className="p-8 border-x-4 border-b-4 border-black bg-white space-y-10 animate-in slide-in-from-top-4">
                      {currentStep.details?.map((d, i) => (
                        <div key={i} className="grid md:grid-cols-4 gap-6">
                          <div className="text-[10px] font-black uppercase text-indigo-600 pt-1 tracking-widest leading-tight border-r-2 border-indigo-100 md:pr-4">{d.h}</div>
                          <div className="md:col-span-3 text-slate-700 text-base leading-relaxed font-bold">{d.p}</div>
                        </div>
                      ))}
                      {currentStep.deep && (
                        <div className="mt-8 pt-8 border-t-2 border-slate-100">
                           <div className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Éclairage SNT / Expert</div>
                           {currentStep.deep.map((dp, i) => (
                             <div key={i} className="mb-4 text-sm font-bold italic text-slate-500">
                               <span className="text-indigo-600 uppercase mr-2">{dp.label} :</span> {dp.text}
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MINI-LABS INTERACTIFS */}
                {currentStep.hasLab && (
                  <div className="mt-12 bg-indigo-50 border-4 border-black p-8 shadow-[6px_6px_0_#000] relative">
                    <div className="absolute -top-4 -left-4 bg-indigo-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-indigo-600 mb-2 tracking-widest">
                      Compétence : Identifier une adresse IP locale
                    </div>
                    <h4 className="text-indigo-900 font-black text-xs mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                      🧪 Challenge Identification Réseau
                    </h4>
                    <p className="text-lg font-bold mb-6 italic text-indigo-950 leading-tight">Laquelle de ces adresses est une IP locale valide ?</p>
                    <div className="flex flex-wrap gap-4">
                      {['192.168.1.1', 'abc.xyz.1.1', '8.8.8.8'].map(v => (
                        <button key={v} onClick={() => { if(!lab1Ans){ setLab1Ans(v); if(v==='192.168.1.1') setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all ${lab1Ans === v ? (v==='192.168.1.1' ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white hover:bg-indigo-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab1Ans && lab1Ans !== '192.168.1.1' && (
                      <p className="mt-4 text-sm font-bold text-indigo-700 italic">
                        {lab1Ans === 'abc.xyz.1.1' && "⚠️ Une IP contient uniquement des chiffres (0-255), pas de lettres !"}
                        {lab1Ans === '8.8.8.8' && "⚠️ 8.8.8.8 est une IP publique (DNS Google), pas une IP locale privée."}
                      </p>
                    )}
                  </div>
                )}

                {currentStep.hasLab2 && (
                  <div className="mt-12 bg-slate-900 border-4 border-black p-8 shadow-[6px_6px_0_#000] text-white relative">
                    <div className="absolute -top-4 -left-4 bg-indigo-600 text-white p-2 border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0_#000]">XP Lab</div>
                    <div className="text-[10px] font-black uppercase text-indigo-400 mb-2 tracking-widest">
                      Compétence : Utiliser un point d&apos;accès mobile
                    </div>
                    <h4 className="text-indigo-300 font-black text-xs mb-6 uppercase tracking-[0.2em]">📲 Situation : Dépannage connexion</h4>
                    <p className="text-lg font-bold mb-6 italic leading-tight">Ta box est en panne. Quelle est la meilleure solution temporaire pour connecter ton ordinateur à Internet ?</p>
                    <div className="flex flex-col gap-3">
                      {[
                        'Attendre le technicien sans rien faire',
                        'Activer le partage de connexion 4G/5G de ton smartphone'
                      ].map(v => (
                        <button key={v} onClick={() => { if(!lab2Ans){ setLab2Ans(v); if(v.startsWith('Activer')) setLabPoints(p=>p+LAB_POINTS); }}}
                          className={`px-8 py-4 border-4 border-black font-black text-sm uppercase transition-all text-left ${lab2Ans === v ? (v.startsWith('Activer') ? 'bg-green-500 text-white shadow-[4px_4px_0_#000]' : 'bg-red-500 text-white shadow-[4px_4px_0_#000]') : 'bg-white text-slate-900 hover:bg-indigo-200 hover:-translate-y-1 shadow-[4px_4px_0_#000]'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                    {lab2Ans === 'Attendre le technicien sans rien faire' && (
                      <p className="mt-4 text-sm font-bold text-indigo-300 italic">⚠️ En cas d&apos;urgence (télétravail, cours en ligne), le partage de connexion mobile est une solution immédiate. Pense à ton forfait data !</p>
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
              className="px-10 py-5 bg-indigo-600 text-white border-4 border-black font-black uppercase text-base shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
               <div className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.4em] mb-4">Certification Pix</div>
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic border-b-8 border-indigo-600 inline-block pb-2">Test Réseau</h2>
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
                
                if (selectedAns === null) btnClass += "bg-white hover:bg-indigo-50 shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1";
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
                <div className="text-[10px] font-black uppercase text-indigo-600 mb-4 tracking-widest italic underline">Explication Technique :</div>
                <p className="text-base mb-8 font-bold leading-relaxed">{QUIZ_QUESTIONS[quizIdx].explanation}</p>
                <button onClick={nextQuiz} className="w-full py-5 bg-black text-white font-black uppercase text-lg shadow-[6px_6px_0_#000] hover:bg-indigo-600 transition-colors">
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
          <div className="text-9xl mb-12 animate-bounce">🌐</div>
          <h1 className="text-6xl md:text-8xl font-black font-mono mb-6 italic uppercase tracking-tighter leading-none">Expert Réseau !</h1>
          <p className="text-slate-500 mb-16 font-black uppercase text-xs tracking-[0.4em] max-w-xl mx-auto">Compétences réseau validées en mode {modeSession}.</p>
          
          <div className="bg-white border-4 border-black p-12 md:p-20 shadow-[16px_16px_0_#000] mb-20 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 font-black">PIX</div>
            
            <div className="grid md:grid-cols-2 gap-12 border-b-4 border-slate-100 pb-12 mb-12">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Score Théorique (Quiz)</div>
                <div className="text-7xl font-black text-slate-900 font-mono">{score} <span className="text-2xl text-slate-300">/ {QUIZ_QUESTIONS.length}</span></div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Progression Totale (XP)</div>
                <div className="text-7xl font-black text-indigo-600 font-mono tracking-tighter">{totalXP}</div>
                <div className="text-[10px] font-black text-slate-400 mt-2">Bonus XP Labs : {labPoints} pts</div>
              </div>
            </div>

            <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 underline decoration-indigo-500 decoration-4 underline-offset-8">Bilan de Compétences Pix / SNT</div>
            <div className="grid sm:grid-cols-2 gap-6">
              {COMPETENCES.map(c => (
                <div key={c.key} className="p-6 bg-slate-50 border-2 border-black shadow-[4px_4px_0_#000]">
                  <div className="text-[10px] font-black uppercase text-indigo-600 mb-2 tracking-tighter">{c.label}</div>
                  <div className="font-bold text-sm leading-tight text-slate-700">{c.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="inline-block border-2 border-black px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-[4px_4px_0_#6366F1]">Certifié SNT Academy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={exportBilan} className="px-12 py-6 bg-black text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:bg-indigo-600 transition flex items-center justify-center gap-3">
              {isExporting ? 'Exportation...' : '💾 Télécharger mon Bilan'}
            </button>
            <button onClick={() => window.location.reload()} className="px-12 py-6 border-4 border-black rounded-none font-black text-xl uppercase bg-white hover:bg-slate-100 shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Recommencer
            </button>
            <Link href="/themes" className="px-12 py-6 bg-indigo-600 text-white border-4 border-black font-black text-xl uppercase shadow-[8px_8px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Menu Principal
            </Link>
          </div>
        </main>
      )}

      {/* MODE PROFESSEUR */}
      {view === 'teacher' && (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-slate-900 text-white p-12 border-4 border-black shadow-[12px_12px_0_#000] rounded-none">
              <h1 className="text-4xl font-black uppercase mb-12 tracking-tighter border-b-4 border-indigo-500 pb-4 inline-block">Guide Pédagogique (Réseaux)</h1>
              
              <div className="space-y-12">
                <section>
                  <h2 className="text-indigo-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Cibles PIX / SNT travaillées</h2>
                  <p className="text-slate-300 font-bold leading-relaxed mb-4">
                    Ce module couvre le thème <span className="text-indigo-400">SNT Internet & Réseaux</span> et la compétence <span className="text-indigo-400">Pix 2.1 (Interagir)</span> : 
                    comprendre l&apos;architecture réseau, identifier une adresse IP, sécuriser une connexion Wi-Fi, diagnostiquer un problème de débit.
                  </p>
                </section>

                <section>
                  <h2 className="text-indigo-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Réponses du Quiz</h2>
                  <div className="space-y-4">
                    {QUIZ_QUESTIONS.map((q, i) => (
                      <div key={i} className="bg-slate-800 p-4 border-l-4 border-indigo-500">
                         <div className="font-bold text-slate-100">{q.q}</div>
                         <div className="text-xs text-indigo-400 uppercase font-black mt-2">→ Réponse : {q.options[q.correct]}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-indigo-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Suggestions d&apos;Activités en Classe</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2">
                    <li>Atelier Speedtest : mesurer le débit de la salle en Ethernet vs Wi-Fi, analyser les écarts.</li>
                    <li>Accès à l&apos;interface de la box (192.168.1.1) : identifier les appareils connectés, changer le SSID.</li>
                    <li>Débat : faut-il interdire le Wi-Fi public non sécurisé dans les lieux publics ?</li>
                    <li>TP sécurité : activer le filtrage MAC, tester la robustesse d&apos;un mot de passe Wi-Fi avec un générateur.</li>
                    <li>Comparaison 2.4 GHz / 5 GHz avec une app de scan Wi-Fi (WiFi Analyzer).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-indigo-500 font-black uppercase text-sm mb-4 tracking-[0.2em]">Ressources complémentaires</h2>
                  <ul className="list-disc pl-5 font-bold text-slate-300 space-y-2 text-sm">
                    <li>Speedtest by Ookla (speedtest.net) — test de débit.</li>
                    <li>Fast.com (Netflix) — mesure rapide du download.</li>
                    <li>WiFi Analyzer (Android) — visualiser les canaux saturés.</li>
                    <li>Documentation box (Livebox, Freebox, SFR Box) — accès interface admin.</li>
                  </ul>
                </section>
              </div>

              <button onClick={() => setView('home')} className="mt-16 px-8 py-4 bg-indigo-600 text-white font-black uppercase border-2 border-black">Fermer la vue prof</button>
           </div>
        </main>
      )}

    </div>
  );
}
