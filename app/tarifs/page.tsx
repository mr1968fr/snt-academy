import Link from 'next/link';

const AVANTAGES_LANCEMENT = [
  'Les 7 thèmes officiels SNT, séances clé en main en 3 durées : 20 min · 1 h · 1 h 30',
  'Quiz type Pix + expériences intégrées — aucune préparation nécessaire',
  '8 modules bonus : Python, Word, Excel, Canva, e-mail, smartphone, réseaux, fake news',
  'Espace prof multi-classes en option (jusqu\u2019à 6 classes de 40 élèves)',
  'Import CSV Pronote, suivi des thèmes, export tableaux — à configurer seulement si tu en as envie',
];

export default function Tarifs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/" className="text-blue-600 font-bold">← Accueil</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Accès</div>
        <Link href="/themes" className="text-blue-600 font-bold">Thèmes →</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest mb-4">🎁 Offert aux collègues</div>
          <h1 className="text-4xl font-black tracking-tight mb-3">Gratuit. Pour toujours. Sans chichi.</h1>
          <p className="text-lg text-slate-600 font-medium">
            SNT Academy est un site de collègue, fait pour des collègues débordés — et conçu pour le rester.
            Aucun compte, aucune carte bancaire, aucune inscription : tu ouvres un thème, tu projètes, et la séance s&apos;anime toute seule.
          </p>
        </header>

        <div className="bg-white p-8 rounded-[2rem] border-2 border-green-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-6 right-[-30px] rotate-45 bg-green-600 text-white text-xs font-black px-10 py-1">0 €</div>
          <h2 className="text-2xl font-black tracking-tight mb-1">Élèves &amp; enseignants</h2>
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-5xl font-black text-green-600">Gratuit</span>
            <span className="text-sm text-slate-400 font-bold">vraiment, y compris plus tard</span>
          </div>
          <ul className="space-y-3 mb-6">
            {AVANTAGES_LANCEMENT.map(a => (
              <li key={a} className="flex gap-3 text-sm text-slate-600 font-medium">
                <span className="text-green-600 font-black">✓</span> {a}
              </li>
            ))}
          </ul>
          <Link href="/themes" className="block text-center py-4 bg-green-600 text-white rounded-2xl font-black shadow-[0_6px_0_rgb(5,150,105)] hover:bg-green-700 transition-all">
            COMMENCER MAINTENANT →
          </Link>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-1">Fais tourner à un collègue</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">La meilleure pub : la salle des profs</p>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            Tu connais un enseignant de SNT submergé par les préparations ? Glisse-lui l&apos;adresse de la
            plateforme : elle fonctionne sans rien configurer. Et si quelque chose pêche, ou qu&apos;une idée
            te trotte dans la tête, écris-moi — c&apos;est toi qui améliores la plateforme.
          </p>
          <a href="mailto:mathschamplain@gmail.com?subject=SNT%20Academy%20%E2%80%94%20retour%20de%20coll%C3%A8gue" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all">
            ✉️ Écrire un mot au collègue d&apos;en face
          </a>
        </div>

        <div className="p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-100 text-center">
          <p className="text-sm text-blue-900 font-bold leading-relaxed">
            🌱 Aucune offre payante n&apos;est prévue : SNT Academy reste un cadeau entre
            profs. Plus il y a d&apos;utilisateurs derrière toi, plus le site s&apos;enrichit —
            nouveaux thèmes, corrections, idées pédagogiques.
          </p>
        </div>

        <footer className="text-center text-sm text-slate-400 font-bold pb-6">
          SNT Academy — créée par un enseignant de SNT, alignée sur le programme officiel et la certification Pix.
        </footer>
      </div>
    </div>
  );
}
