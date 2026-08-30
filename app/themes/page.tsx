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
      id: "objets-connectés",
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
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Retour à l'accueil</Link>
          <h1 className="text-4xl font-bold mb-2">Les 7 thèmes du programme</h1>
          <p className="text-slate-600 italic">Choisis un thème pour commencer ton aventure numérique.</p>
        </div>

        {/* Grille des thèmes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div key={theme.id} className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl transition-all group cursor-pointer">
              <div className={`w-14 h-14 ${theme.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {theme.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{theme.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {theme.description}
              </p>
              <Link 
                href={`/themes/${theme.id}`}
                className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all"
              >
                Commencer le chapitre <span>→</span>
              </Link>
            </div>
          ))}

          {/* Bloc Programmation Python */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 hover:shadow-xl transition-all md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🐍
            </div>
            <h3 className="text-xl font-bold mb-2">Programmation Python</h3>
            <p className="text-slate-400 text-sm mb-6">
              Les bases indispensables : variables, boucles, fonctions.
            </p>
            <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
              Voir les bases
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}