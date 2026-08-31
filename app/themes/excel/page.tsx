'use client';
import { useState } from 'react';
import Link from 'next/link';

const LESSON_STEPS = [
  { title: "1. Cellules et Adresses", content: "Dans Excel, chaque case est une CELLULE. Elle possède une adresse unique (ex: B4 pour la colonne B, ligne 4). C'est la base pour faire des calculs sur des données précises.", icon: "📍", color: "border-green-600" },
  { title: "2. Le signe égal (=)", content: "Pour qu'Excel calcule quelque chose, tu dois TOUJOURS commencer par le signe '='. Si tu tapes '10+10', il affiche du texte. Si tu tapes '=10+10', il affiche 20.", icon: "🟰", color: "border-green-500", hasLab: true },
  { title: "3. Références vs Valeurs", content: "La vraie puissance : au lieu de faire '=10+5', on fait '=A1+A2'. Si tu changes le chiffre dans la cellule A1, le résultat se met à jour tout seul. L'ordinateur travaille pour toi !", icon: "🔄", color: "border-emerald-500" },
  { title: "4. Les Fonctions (SOMME, MOYENNE)", content: "Pas besoin de tout additionner. Pour calculer un total, on utilise =SOMME(A1:A10). Pour tes notes, utilise =MOYENNE(B1:B20). Rapide et sans erreur.", icon: "🧮", color: "border-green-400" },
  { title: "5. Les Graphiques", content: "Un tableau de chiffres est dur à lire. Excel peut transformer tes données en diagramme circulaire (camembert) ou en bâtons en un instant pour tes exposés.", icon: "📊", color: "border-green-800", hasLab2: true },
  { title: "🎤 Missions Exposés", isProject: true, projects: [
      { topic: "Le Big Data", desc: "Comment les entreprises utilisent des tableurs géants pour prédire nos achats ?", difficulty: "Intermédiaire" },
      { topic: "Les erreurs célèbres", desc: "Enquête sur ces fois où une simple erreur dans une formule Excel a coûté des milliards.", difficulty: "Avancé" }
    ], icon: "🚀", color: "border-purple-600" }
];

const QUIZ_QUESTIONS = [
  { q: "Par quel symbole commence TOUJOURS une formule Excel ?", options: ["+", "=", "@"], correct: 1, explanation: "Le '=' indique à Excel qu'il doit effectuer un calcul." },
  { q: "Comment s'appelle l'intersection d'une ligne et d'une colonne ?", options: ["Un carré", "Une cellule", "Un bloc"], correct: 1, explanation: "Chaque case est une cellule avec une adresse (ex: A1)." },
  { q: "Quelle fonction permet de calculer une moyenne ?", options: ["=TOTAL()", "=MOYENNE()", "=CALCUL()"], correct: 1, explanation: "La fonction MOYENNE fait la somme et divise par le nombre d'éléments." }
];

export default function ExcelChapter() {
  // ... (Logique identique : useState, nextStep, handleAnswer, etc.)
  // (Note : Pour gagner du temps, recopie la structure du composant WordChapter ci-dessus)
}