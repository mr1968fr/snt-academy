'use client';

import { useState } from 'react';
import Link from 'next/link';

// --- DONNÉES DE DÉMO (Simulation de la base de données) ---
const MOCK_STUDENTS = [
  { id: 1, name: "Lucas Bernard", lastActive: "Il y a 2h", progress: 85, xp: 1250, status: "En avance" },
  { id: 2, name: "Emma Petit", lastActive: "Hier", progress: 40, xp: 600, status: "Normal" },
  { id: 3, name: "Thomas Roux", lastActive: "Il y a 5 min", progress: 95, xp: 1450, status: "Excellent" },
  { id: 4, name: "Chloé Durand", lastActive: "3 jours", progress: 10, xp: 150, status: "En retard" },
  { id: 5, name: "Inès Garcia", lastActive: "Il y a 1h", progress: 60, xp: 850, status: "Normal" },
];

export default function ProfDashboard() {
  const [activeTab, setActiveTab] = useState('progression');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden md:flex">
        <div className="text-xl font-black mb-10 text-blue-400">SNT ACADEMY</div>
        
        <nav className="space-y-4 flex-grow">
          <button className="flex items-center gap-3 text-blue-400 w-full font-bold">
            📊 Tableau de bord
          </button>
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full">
            👥 Mes Classes (2)
          </button>
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full">
            📝 Quiz Perso
          </button>
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full">
            📂 Documents
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <Link href="/" className="text-sm text-slate-500 hover:text-white">Se déconnecter</Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow p-8">
        
        {/* TOP BAR */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Classe : 2nde Générale B</h1>
            <p className="text-slate-500 font-medium">24 élèves inscrits • Année 2024-2025</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition">
            + Inviter des élèves
          </button>
        </header>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="text-slate-400 font-bold text-xs uppercase mb-2">Progression Moyenne</div>
            <div className="text-4xl font-black text-blue-600">58%</div>
            <div className="mt-2 text-green-500 text-sm font-bold">+12% cette semaine</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="text-slate-400 font-bold text-xs uppercase mb-2">XP Total Classe</div>
            <div className="text-4xl font-black text-indigo-600">12 450</div>
            <div className="mt-2 text-slate-400 text-sm">Sur 7 thèmes</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="text-slate-400 font-bold text-xs uppercase mb-2">Activité</div>
            <div className="text-4xl font-black text-orange-500">18 / 24</div>
            <div className="mt-2 text-slate-400 text-sm">élèves connectés aujourd'hui</div>
          </div>
        </div>

        {/* LISTE ÉLÈVES */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h2 className="font-black text-xl text-slate-800 tracking-tight">Suivi des élèves</h2>
            <button className="text-sm font-bold text-blue-600 hover:underline underline-offset-4">Exporter en CSV (Pronote)</button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
                <th className="p-6">Nom de l'élève</th>
                <th className="p-6">Dernière activité</th>
                <th className="p-6">Progression</th>
                <th className="p-6">Points XP</th>
                <th className="p-6">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_STUDENTS.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6 font-bold text-slate-700">{student.name}</td>
                  <td className="p-6 text-slate-500 text-sm">{student.lastActive}</td>
                  <td className="p-6">
                    <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                  </td>
                  <td className="p-6 font-mono font-bold text-indigo-600">{student.xp}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                      student.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                      student.status === 'En retard' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}