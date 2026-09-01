import Link from 'next/link';

const AVANTAGES_LANCEMENT = [
  'Les 7 thèmes officiels SNT, cours complet + quiz type Pix',
  '8 modules bonus : Python, Word, Excel, Canva, e-mail, smartphone, réseaux, fake news',
  'Espace prof multi-classes (jusqu\u2019à 6 classes de 40 élèves)',
  'Import CSV Pronote, suivi des thèmes, export tableaux',
  'Guide enseignant et nouveaux thèmes en continu',
];

export default function Tarifs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/" className="text-blue-600 font-bold">← Accueil</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Accès &amp; tarifs</div>
        <Link href="/themes" className="text-blue-600 font-bold">Thèmes →</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-black text-xs uppercase tracking-widest mb-4">Phase de lancement</div>
          <h1 className="text-4xl font-black tracking-tight mb-3">Accès libre, pour tout le monde.</h1>
          <p className="text-lg text-slate-600 font-medium">
            Pendant toute la phase de lancement, SNT Academy est gratuite et sans limitation :
            aucun compte, aucune carte bancaire, aucune inscription.
          </p>
        </header>

        <div className="bg-white p-8 rounded-[2rem] border-2 border-green-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-6 right-[-30px] rotate-45 bg-green-600 text-white text-xs font-black px-10 py-1">0 €</div>
          <h2 className="text-2xl font-black tracking-tight mb-1">Élèves &amp; enseignants</h2>
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-5xl font-black text-green-600">Gratuit</span>
            <span className="text-sm text-slate-400 font-bold">pendant le lancement</span>
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
          <h2 className="text-2xl font-black tracking-tight mb-1">Établissements</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">À partir de la rentrée 2027</p>
          <p className="text-slate-600 font-medium leading-relaxed mb-6">
            Déploiement pour tous les enseignants de SNT du lycée, facturation établissement
            (bon de commande ou mandat), support dédié et sensibilisation à la certification Pix.
          </p>
          <a href="mathschamplain@?gmail.com?subject=Offre%20%C3%A9tablissement" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all">
            Demander une présentation
          </a>
        </div>

        <div className="p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-100 text-center">
          <p className="text-sm text-blue-900 font-bold leading-relaxed">
            🎁 Les enseignants qui utilisent la plateforme pendant le lancement
            garderont un <span className="font-black">tarif préférentiel à vie</span> sur les futures offres.
            Tes retours construisent la plateforme : c&apos;est eux qui paient ton accès.
          </p>
        </div>

        <footer className="text-center text-sm text-slate-400 font-bold pb-6">
          SNT Academy — créée par un enseignant de SNT, alignée sur le programme officiel et la certification Pix.
        </footer>
      </div>
    </div>
  );
}
