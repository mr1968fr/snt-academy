import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="flex items-center justify-between px-6 py-5 bg-white border-b">
        <div className="text-xl font-black text-blue-600">SNT ACADEMY</div>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="/themes" className="hover:text-blue-600">Thèmes</Link>
          <Link href="/tarifs" className="hover:text-blue-600">Tarifs</Link>
          <Link
            href="/professeur/dashboard"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black"
          >
            Espace Prof
          </Link>
        </div>
      </nav>

      <header className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
          SNT, enfin <span className="text-blue-600">clair</span> et{' '}
          <span className="text-indigo-600">motivant</span>.
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          Des chapitres courts, un ton qui parle aux élèves de seconde, un quiz à la fin
          de chaque thème, et un suivi simple pour les professeurs.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/themes"
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition"
          >
            Je suis élève — Commencer
          </Link>
          <Link
            href="/professeur/dashboard"
            className="px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl font-black hover:bg-slate-100 transition"
          >
            Je suis professeur — Voir la démo
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-400 italic">
          Créé par un enseignant de SNT, pour les professeurs et les élèves de SNT.
        </p>
      </header>

      <section className="bg-white border-y py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-6">Fini le cours qu&apos;on subit.</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Les élèves de seconde décrochent souvent face à des cours trop scolaires.
            Ici, on va droit au but, avec des exemples tirés de leur quotidien et un quiz
            qui valide vraiment les notions du programme officiel.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-12">Les 7 thèmes du programme</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Internet',
            'Le Web',
            'Les réseaux sociaux',
            'Les données structurées',
            'Localisation et cartographie',
            'Objets connectés',
            'Photographie numérique',
          ].map((theme) => (
            <div
              key={theme}
              className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
            >
              <h3 className="text-lg font-black mb-2">{theme}</h3>
              <p className="text-sm text-slate-500">
                Un chapitre court, des exemples concrets, un quiz à la fin.
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/themes"
            className="inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition"
          >
            Découvrir les thèmes
          </Link>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-400 text-sm border-t">
        SNT Academy — La plateforme pensée par un prof.
      </footer>
    </div>
  );
}