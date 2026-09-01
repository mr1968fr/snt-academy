'use client';
import Link from 'next/link';

const ETAPES = [
  { n: '1', titre: 'Importe ta classe', texte: "Dans l'Espace Prof : saisis tes élèves, colle ta liste, ou importe ton CSV Pronote (Nom;Prénom). Jusqu'à 40 élèves, 2 minutes chrono." },
  { n: '2', titre: 'Envoie le lien aux élèves', texte: 'Aucune inscription, aucun mot de passe : ils ouvrent le site sur téléphone ou en salle info et choisissent le thème du jour.' },
  { n: '3', titre: 'Coche et exporte', texte: "En fin de séance, chaque élève te dit son score. Tu coches le thème validé, tu notes l'XP — et tu exportes le tableau en CSV quand tu veux." },
];

const USAGES = [
  { icon: '💻', titre: 'Séance en salle info', texte: "Découverte d'un thème : le panneau « Lire le cours » pour les notions, le quiz pour valider en fin d'heure. Compte 15 à 20 minutes." },
  { icon: '🏠', titre: 'Classe inversée', texte: 'Le thème à la maison, le quiz vérifie que ça a été fait. Le lendemain, tu commences par les points tombés au quiz.' },
  { icon: '🎯', titre: 'Préparation Pix', texte: "Quiz au format de l'épreuve, pièges classiques (range(3), guillemets, priorités), calculs type certification. Révision ciblée avant la session." },
];

const OFFICIELS = ['Internet', 'Le Web', 'Réseaux sociaux', 'Données structurées', 'Localisation', 'Objets connectés', 'Photo numérique'];
const BONUS = ['Initiation Python', 'Word', 'Excel', 'Canva', 'E-mail', 'Smartphone', 'Réseaux & Wi-Fi', 'Fake News'];

const FAQ = [
  { q: "Les élèves ont-ils besoin d'un compte ?", r: "Non. Aucune inscription, aucun e-mail : le site s'ouvre et fonctionne directement. Côté prof, la liste de classe reste dans ton navigateur." },
  { q: 'Est-ce conforme au programme ?', r: 'Oui : les 7 thèmes officiels suivent le programme de SNT (BO 2019), chacun avec cours structuré, exemples, vocabulaire et quiz. Les modules compétences et Python sont des bonus.' },
  { q: 'Ça marche sur téléphone ?', r: "Oui, c'est même pensé pour : accroches courtes, panneaux de cours dépliables, quiz au doigt. Parfait pour 5 minutes de fin d'heure ou des révisions dans le bus." },
  { q: 'Où sont stockées les données ?', r: "Nulle part sur un serveur. Le suivi de classe vit uniquement dans le navigateur de l'enseignant (export CSV pour sauvegarder). Aucune donnée personnelle élève n'est collectée." },
  { q: 'Quel usage pour la certification Pix ?', r: "Révisions ciblées : chaque quiz reprend le format et les pièges types de l'épreuve. Le thème Python couvre l'épreuve « Programmer », SQL et les données structurées sont dans le thème Données." },
];

export default function GuideProf() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/professeur/dashboard" className="text-blue-600 font-bold">← Espace Prof</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Guide enseignant</div>
        <Link href="/themes" className="text-blue-600 font-bold">Thèmes →</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <header>
          <h1 className="text-4xl font-black tracking-tight mb-3">Utiliser SNT Academy avec sa classe</h1>
          <p className="text-lg text-slate-600 font-medium">De l'import de ta liste au tableau final : 3 étapes, aucune inscription pour les élèves, rien à installer.</p>
        </header>

        <section className="grid gap-4">
          {ETAPES.map(e => (
            <div key={e.n} className="flex gap-5 bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
              <div className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg">{e.n}</div>
              <div>
                <h3 className="font-black text-lg mb-1">{e.titre}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.texte}</p>
              </div>
            </div>
          ))}
          <Link href="/professeur/dashboard" className="text-center py-4 bg-blue-600 text-white rounded-2xl font-black shadow-[0_6px_0_rgb(30,64,175)] hover:bg-blue-700 transition-all">
            OUVRIR L'ESPACE PROF →
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-5">Les 3 usages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {USAGES.map(u => (
              <div key={u.titre} className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{u.icon}</div>
                <h3 className="font-black mb-2">{u.titre}</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{u.texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-4">Ce que contient la plateforme</h2>
          <p className="text-sm font-black uppercase tracking-widest text-blue-600 mb-3">Les 7 thèmes officiels</p>
          <p className="text-slate-600 font-medium leading-relaxed mb-5">{OFFICIELS.join(' · ')}</p>
          <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Bonus compétences</p>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">{BONUS.join(' · ')}</p>
          <p className="text-sm text-slate-500 font-medium">Durée d'un thème : 15 à 20 minutes (cours + quiz). Chaque étape propose une accroche courte et un panneau « Lire le cours » : définition, exemple, à retenir, vocabulaire.</p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-5">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQ.map(f => (
              <details key={f.q} className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm group">
                <summary className="px-6 py-4 font-black cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-blue-600 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-slate-600 font-medium leading-relaxed">{f.r}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="text-center text-sm text-slate-400 font-bold pb-6">
          SNT Academy — créée par un enseignant de SNT, alignée sur le programme officiel et la certification Pix.
        </footer>
      </div>
    </div>
  );
}
