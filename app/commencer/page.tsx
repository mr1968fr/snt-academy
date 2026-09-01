import Link from 'next/link';

const PARCOURS = [
  { icon: '🚀', titre: 'Première fois ?', sous: 'Commence par Internet', cible: '/themes/internet',
    texte: "Le chapitre d'entrée idéal : 6 étapes, un panneau « Lire le cours » à chaque étape, et ton premier quiz en 15 minutes. Tu verras tout de suite comment la plateforme fonctionne.",
    badge: '≈ 15 min', couleur: 'bg-blue-50 border-blue-100 hover:border-blue-400', accent: 'text-blue-600' },
  { icon: '📚', titre: 'Je révise un thème', sous: 'Tous les thèmes', cible: '/themes',
    texte: 'Les 7 thèmes officiels de SNT + les modules bonus (Python, tableur, e-mail, fake news…). Choisis ton thème, révise, valide avec le quiz de fin.',
    badge: '15-20 min / thème', couleur: 'bg-emerald-50 border-emerald-100 hover:border-emerald-400', accent: 'text-emerald-600' },
  { icon: '🎯', titre: 'Je prépare Pix', sous: 'L\u2019épreuve « Programmer »', cible: '/themes/python',
    texte: "La certification Pix compte une épreuve « Programmer » : le thème Python t'y prépare pas à pas (variables, boucles, fonctions), avec des quiz au format exact de l'épreuve et ses pièges classiques.",
    badge: 'Prépa certif', couleur: 'bg-purple-50 border-purple-100 hover:border-purple-400', accent: 'text-purple-600' },
];

const ETAPES = [
  { n: '1', t: 'Choisis un thème', d: 'Aucun compte, aucune inscription : le site souvre et fonctionne.' },
  { n: '2', t: 'Lis le cours', d: 'Une accroche courte, puis le panneau « Lire le cours » : définition, exemple, à retenir, vocabulaire.' },
  { n: '3', t: 'Réussis le quiz', d: '5 questions au format Pix, des XP à la clé — et le score final pour te situer.' },
];

export default function Commencer() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Link href="/" className="text-blue-600 font-bold">← Accueil</Link>
        <div className="font-black text-xs uppercase tracking-widest text-slate-400">Parcours élève</div>
        <Link href="/themes" className="text-blue-600 font-bold">Thèmes →</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Par où commencer ?</h1>
          <p className="text-lg text-slate-600 font-medium">
            Trois façons d&apos;utiliser SNT Academy selon ton moment : découvrir, réviser, ou préparer la certification.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-5">
          {PARCOURS.map(p => (
            <Link key={p.titre} href={p.cible} className={`p-7 rounded-[2rem] border-2 ${p.couleur} transition-all group flex flex-col shadow-sm`}>
              <div className="text-4xl mb-4">{p.icon}</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{p.titre}</div>
              <h2 className={`text-xl font-black mb-3 group-hover:${p.accent} transition-colors`}>{p.sous}</h2>
              <p className="text-sm text-slate-600 font-medium leading-relaxed flex-1">{p.texte}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full text-slate-500">{p.badge}</span>
                <span className={`font-black ${p.accent} group-hover:translate-x-1 transition-transform`}>→</span>
              </div>
            </Link>
          ))}
        </section>

        <section className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight mb-6">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ETAPES.map(e => (
              <div key={e.n} className="flex gap-4">
                <div className="w-9 h-9 shrink-0 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">{e.n}</div>
                <div>
                  <h3 className="font-black mb-1">{e.t}</h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-100 text-center">
          <p className="text-sm text-blue-900 font-bold leading-relaxed">
            📱 Tout fonctionne sur téléphone, ordinateur et Chromebook — sans rien installer.
            Le site est gratuit : aucun compte, aucune donnée collectée.
          </p>
        </div>

        <footer className="text-center text-sm text-slate-400 font-bold pb-6">
          SNT Academy — créée par un enseignant de SNT, alignée sur le programme officiel et la certification Pix.
        </footer>
      </div>
    </div>
  );
}
