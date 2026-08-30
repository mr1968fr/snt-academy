import Link from 'next/link';

export default function Themes() {
  const themes = [
    {
      id: "internet",
      title: "Internet",
      description: "Comment les données voyagent vraiment à travers le monde.",
      icon: "🌐",
      color: "bg-blue-500"
    },
    {
      id: "web",
      title: "Le Web",
      description: "Pages, liens, moteurs de recherche... Comprends comment le Web fonctionne vraiment.",
      icon: "🕸️",
      color: "bg-indigo-500"
    },
    {
      id: "reseaux-sociaux",
      title: "Les Réseaux Sociaux",
      description: "Identité numérique, e-réputation et algorithmes. T'es le produit ?",
      icon: "📱",
      color: "bg-pink-500"
    },
    {
      id: "donnees",
      title: "Données Structurées",
      description: "Apprends à faire parler les données et à comprendre ce qu'on fait des tiennes.",
      icon: "📊",
      color: "bg-green-500"
    },
    {
      id: "localisation",
      title: "Localisation & Cartographie",
      description: "Comment ton téléphone sait où tu es (et ce qu'il en fait) ?",
      icon: "📍",
      color: "bg-red-500"
    },
    {
      id: "objetsconnectes",
      title: "Objets Connectés",
      description: "Ce qui se passe vraiment dans les objets intelligents du quotidien.",
      icon: "⌚",
      color: "bg-orange-500"
    },
    {
      id: "photo-numerique",
      title: "Photographie Numérique",
      description: "Pixels, couleurs, filtres... ce qu'une photo contient vraiment.",
      icon: "📷",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 font-bold hover:underline mb-4 inline-block tracking-tight text-sm">
            ← RETOUR À L'ACCUEIL
          </Link>
          <h1 className="text-4xl font-black mb-2 tracking-tighter text-slate-900">Les 7 thèmes du programme</h1>
          <p className="text-slate-500 font-medium italic">Choisis un thème pour commencer ton aventure numérique.</p>
        </div>

        {/* Grille des thèmes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Link 
                href={`/themes/${theme.id}`} 
                key={theme.id} 
                className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:shadow-2xl transition-all group flex flex-col items-start text-left"
            >
              <div className={`w-16 h-16 ${theme.color} text-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                {theme.icon}
              </div>
              <h3 className="text-xl font-black mb-3 text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                {theme.title}
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
                {theme.description}
              </p>
              <span className="mt-auto px-5 py-2 bg-slate-50 text-blue-600 text-xs font-black uppercase rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all tracking-widest">
                Commencer →
              </span>
            </Link>
          ))}

          {/* Bloc Programmation Python */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white border border-slate-800 shadow-xl md:col-span-2 lg:col-span-1 flex flex-col items-start">
            <div className="w-16 h-16 bg-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg">
              🐍
            </div>
            <h3 className="text-xl font-black mb-3 tracking-tight">Programmation Python</h3>
            <p className="text-slate-400 text-sm mb-6 font-medium leading-relaxed">
              Les bases indispensables : variables, boucles, fonctions.
            </p>
            <button className="mt-auto px-6 py-3 bg-yellow-500 text-slate-900 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors">
              Bientôt disponible
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}