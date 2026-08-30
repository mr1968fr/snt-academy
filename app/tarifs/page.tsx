import Link from 'next/link';

const PLANS = [
  {
    name: 'Gratuit Élève',
    price: '0 €',
    period: '',
    target: 'Découvrir la plateforme',
    features: ['Accès à 2 thèmes', 'Quiz de base', 'XP et badges de base'],
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Prof Essentiel',
    price: '49 €',
    period: '/ an / classe',
    target: 'Gérer une classe simplement',
    features: [
      'Les 7 thèmes complets',
      'Suivi de progression',
      'Classement de classe',
      'Export CSV des résultats',
    ],
    cta: 'Essai gratuit 14 jours',
    highlight: true,
  },
  {
    name: 'Prof Pro',
    price: '89 €',
    period: '/ an / classe',
    target: 'Personnaliser et piloter',
    features: [
      'Tout Prof Essentiel',
      'Quiz personnalisés',
      'Mode devoir avec date limite',
      'Statistiques avancées',
      'Support prioritaire',
    ],
    cta: 'Essai gratuit 14 jours',
    highlight: false,
  },
  {
    name: 'Établissement',
    price: 'Dès 299 €',
    period: '/ an',
    target: 'Équiper tout le lycée',
    features: [
      'Classes et professeurs illimités',
      'Tableau de bord administrateur',
      'Formation de prise en main',
      'Facture établissement',
    ],
    cta: 'Demander un devis',
    highlight: false,
  },
];

export default function Tarifs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="flex items-center justify-between px-6 py-5 bg-white border-b">
        <Link href="/" className="text-xl font-black text-blue-600">
          SNT ACADEMY
        </Link>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="/themes" className="hover:text-blue-600">
            Thèmes
          </Link>
          <Link
            href="/professeur/dashboard"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black"
          >
            Espace Prof
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Des tarifs simples, pensés pour les profs
          </h1>
          <p className="text-slate-600">
            Créé par un enseignant de SNT, pour répondre aux vrais besoins du terrain.
          </p>
          <p className="mt-4 inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
            Essai gratuit 14 jours — sans carte bancaire
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white p-8 rounded-3xl border-2 flex flex-col h-full relative ${
                plan.highlight
                  ? 'border-blue-600 shadow-xl'
                  : 'border-slate-200'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  Le plus choisi
                </span>
              )}

              <h3 className="text-lg font-black mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{plan.target}</p>

              <div className="mb-6">
                <span className="text-3xl font-black">{plan.price}</span>
                <span className="text-slate-500 text-sm"> {plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-green-500 font-black">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-black transition ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-20 border-t pt-12">
          <h2 className="text-2xl font-black mb-8 text-center">Questions fréquentes</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-black mb-1">Puis-je essayer avant de payer ?</h3>
              <p className="text-slate-600 text-sm">
                Oui. L&apos;essai de 14 jours est complet et ne demande pas de carte bancaire.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-1">Y a-t-il un engagement ?</h3>
              <p className="text-slate-600 text-sm">
                L&apos;abonnement est annuel et peut être résilié avant la date de renouvellement.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-1">Puis-je recevoir une facture ?</h3>
              <p className="text-slate-600 text-sm">
                Oui, une facture est générée immédiatement, y compris pour un paiement établissement.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-1">Combien d&apos;élèves par classe ?</h3>
              <p className="text-slate-600 text-sm">
                Une classe correspond à 40 élèves maximum.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-10 text-center text-slate-400 text-sm border-t">
        SNT Academy — La plateforme pensée par un prof.
      </footer>
    </div>
  );
}