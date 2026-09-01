import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans text-left">
      {/* BARRE DE NAVIGATION */}
      <nav className="flex items-center justify-between px-6 py-5 bg-white border-b">
        <div className="text-xl font-black text-blue-600 tracking-tighter">SNT ACADEMY</div>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="/themes" className="hover:text-blue-600 transition">Thèmes</Link>
          <Link href="/tarifs" className="hover:text-blue-600 transition">Tarifs</Link>
          <Link
            href="/professeur/dashboard"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black transition shadow-sm"
          >
            Espace Prof
          </Link>
        </div>
      </nav>

      {/* HEADER / HERO */}
      <header className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-left">
          SNT, enfin <span className="text-blue-600 italic">clair</span> et{' '}
          <span className="text-indigo-600 italic">motivant</span>.
        </h1>
        <p className="text-lg text-slate-600 mb-10 font-medium text-left">
          Des chapitres courts, un ton qui parle aux élèves de seconde, un quiz à la fin
          de chaque thème, et un suivi simple pour les professeurs.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/commencer"
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition shadow-[0_5px_0_rgb(30,64,175)] active:translate-y-1"
          >
            Je suis élève — Commencer
          </Link>
          <Link
            href="/professeur/dashboard"
            className="px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl font-black hover:bg-slate-100 transition shadow-sm"
          >
            Je suis professeur — Espace classe
          </Link>
        </div>
      </header>

      {/* SECTION ARGUMENTAIRE */}
      <section className="bg-white border-y py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-6 tracking-tight">Fini le cours qu&apos;on subit.</h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium text-left">
            Les élèves de seconde décrochent souvent face à des cours trop scolaires.
            Ici, on va droit au but, avec des exemples tirés de leur quotidien et un quiz
            qui valide vraiment les notions du programme officiel.
          </p>
        </div>
      </section>

      {/* SECTION GRILLE DES THÈMES SNT */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black text-center mb-12 tracking-tight uppercase tracking-widest text-slate-400 text-sm">Les 7 thèmes du programme</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Internet', slug: 'internet' },
            { name: 'Le Web', slug: 'web' },
            { name: 'Les réseaux sociaux', slug: 'reseaux-sociaux' },
            { name: 'Les données structurées', slug: 'donnees' },
            { name: 'Localisation et cartographie', slug: 'localisation' },
            { name: 'Objets connectés', slug: 'objetsconnectes' },
            { name: 'Photographie numérique', slug: 'photo-numerique' },
          ].map((theme) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group flex flex-col"
            >
              <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors tracking-tight text-left">
                {theme.name}
              </h3>
              <p className="text-sm text-slate-500 text-left font-medium leading-relaxed">
                Un chapitre court, des exemples concrets, un quiz interactif à la fin.
              </p>
              <div className="mt-6 text-blue-600 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Commencer →
              </div>
            </Link>
          ))}
        </div>

        {/* SECTION BONUS : SAVOIR-FAIRE MINIMUM */}
        <h2 className="text-3xl font-black text-center mb-12 mt-24 tracking-tight uppercase tracking-widest text-slate-400 text-sm">
          Bonus : Tes outils de survie numérique
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* WORD */}
          <Link href="/themes/word" className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100 hover:border-blue-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-blue-600">Traitement de texte</h3>
            <p className="text-sm text-slate-500 font-medium">Styles, sommaire automatique et mise en page pro sur Word.</p>
          </Link>

          {/* EXCEL */}
          <Link href="/themes/excel" className="p-8 bg-green-50 rounded-3xl border-2 border-green-100 hover:border-green-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-green-600">Tableur & Données</h3>
            <p className="text-sm text-slate-500 font-medium">Maîtrise les formules, les fonctions et les graphiques Excel.</p>
          </Link>

          {/* CANVA */}
          <Link href="/themes/canva" className="p-8 bg-cyan-50 rounded-3xl border-2 border-cyan-100 hover:border-cyan-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-cyan-600">Design & Visuels</h3>
            <p className="text-sm text-slate-500 font-medium">Crée des présentations et des affiches qui claquent avec Canva.</p>
          </Link>

          {/* EMAIL */}
          <Link href="/themes/email" className="p-8 bg-orange-50 rounded-3xl border-2 border-orange-100 hover:border-orange-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-orange-600">E-mails & Pro</h3>
            <p className="text-sm text-slate-500 font-medium">Apprends à écrire à un prof et à éviter le phishing (arnaques).</p>
          </Link>

          {/* SMARTPHONE */}
          <Link href="/themes/smartphone" className="p-8 bg-pink-50 rounded-3xl border-2 border-pink-100 hover:border-pink-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-pink-600">Ton Smartphone</h3>
            <p className="text-sm text-slate-500 font-medium">Sécurité, stockage et vie privée : deviens le boss de ton tel.</p>
          </Link>

          {/* RESEAU */}
          <Link href="/themes/reseau" className="p-8 bg-indigo-50 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 transition-all group shadow-sm">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-black mb-2 group-hover:text-indigo-600">Réseau & Wi-Fi</h3>
            <p className="text-sm text-slate-500 font-medium">Comprendre ta box, ton adresse IP et ton débit internet.</p>
          </Link>
          {/* PYTHON — bannière pleine largeur, même style que Fake News.
   À coller AUX DEUX ENDROITS :
   1) app/page.tsx      → juste avant la ligne  {/* FAKE NEWS (Sur toute la largeur…
   2) app/themes/page.tsx → juste avant la ligne  {/* FAKE NEWS (Sur toute la largeur… */}

          <Link href="/themes/python" className="p-8 bg-emerald-50 rounded-3xl border-2 border-emerald-100 hover:border-emerald-400 transition-all group shadow-sm flex flex-col lg:col-span-3">
            <div className="flex items-center gap-6">
              <div className="text-4xl">🐍</div>
              <div>
                <h3 className="text-xl font-black mb-1 group-hover:text-emerald-600 transition-colors">Initiation Python</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Variables, conditions, boucles et fonctions : tes premières lignes de code, prêtes pour l&apos;épreuve « Programmer » de Pix.</p>
              </div>
            </div>
          </Link>
          {/* FAKE NEWS (Sur une ligne seule ou centrée si besoin) */}
          <Link href="/themes/fake-news" className="p-8 bg-red-50 rounded-3xl border-2 border-red-100 hover:border-red-400 transition-all group shadow-sm lg:col-span-3">
            <div className="flex items-center gap-6">
              <div className="text-4xl">🔍</div>
              <div>
                <h3 className="text-xl font-black mb-1 group-hover:text-red-600">Vérifier l&apos;information (Fake News)</h3>
                <p className="text-sm text-slate-500 font-medium">Recherche d&apos;image inversée et techniques pour débusquer les mensonges du web.</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-20">
          <Link
            href="/themes"
            className="inline-block px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-black transition shadow-xl"
          >
            DÉCOUVRIR TOUS LES THÈMES
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm border-t font-bold tracking-widest uppercase">
        © SNT ACADEMY — La plateforme pensée par un prof.
      </footer>
    </div>
  );
}