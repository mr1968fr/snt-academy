'use client';

import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import Link from 'next/link';

const THEMES = [
  { code: 'Int', label: 'Internet', officiel: true },
  { code: 'Web', label: 'Le Web', officiel: true },
  { code: 'RS', label: 'Réseaux sociaux', officiel: true },
  { code: 'Don', label: 'Données structurées', officiel: true },
  { code: 'Loc', label: 'Localisation', officiel: true },
  { code: 'Obj', label: 'Objets connectés', officiel: true },
  { code: 'Pho', label: 'Photo numérique', officiel: true },
  { code: 'Pyt', label: 'Python', officiel: false },
  { code: 'Wor', label: 'Word', officiel: false },
  { code: 'Exc', label: 'Excel', officiel: false },
  { code: 'Can', label: 'Canva', officiel: false },
  { code: 'Mai', label: 'E-mail', officiel: false },
  { code: 'Sma', label: 'Smartphone', officiel: false },
  { code: 'Ré', label: 'Réseau', officiel: false },
  { code: 'FN', label: 'Fake News', officiel: false },
];
const MAX_ELEVES = 40;
const STORAGE_KEY = 'snt-classe-v1';

type Eleve = { id: number; name: string; xp: number; notes: string; done: string[] };

export default function ProfDashboard() {
  const [students, setStudents] = useState<Eleve[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStudents(JSON.parse(raw));
    } catch { /* données illisibles : on repart de zéro */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students, loaded]);

  const flash = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 4500); };

  // Transforme du texte (saisie collée ou CSV) en liste de noms propres
  const parseNames = (text: string): string[] => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const out: string[] = [];
    lines.forEach((line, i) => {
      if (i === 0 && /nom|prénom|prenom|élève|eleve|classe/i.test(line) && /[,;\t]/.test(line)) return; // en-tête ignoré
      const fields = line.split(/[,;\t]/).map(f => f.trim()).filter(Boolean);
      if (fields.length >= 2) out.push(`${fields[1]} ${fields[0]}`); // convention Nom;Prénom
      else if (fields.length === 1) out.push(fields[0]);
    });
    return out;
  };

  const addNames = (raw: string[]) => {
    const existing = new Set(students.map(s => s.name.toLowerCase()));
    let added = 0, skipped = 0;
    const next = [...students];
    for (const line of raw) {
      const clean = line.replace(/\s+/g, ' ').trim();
      if (!clean) continue;
      if (next.length >= MAX_ELEVES) { skipped++; continue; }
      if (existing.has(clean.toLowerCase())) { skipped++; continue; }
      existing.add(clean.toLowerCase());
      next.push({ id: Date.now() + added, name: clean, xp: 0, notes: '', done: [] });
      added++;
    }
    if (added) setStudents(next);
    return { added, skipped };
  };

  const addOne = () => {
    if (!nameInput.trim()) return;
    const r = addNames([nameInput]);
    if (r.added) { setNameInput(''); flash('Élève ajouté ✓'); }
    else flash('Impossible : doublon, ou limite de 40 élèves atteinte.');
  };

  const addPasted = () => {
    const r = addNames(parseNames(pasteText));
    if (r.added) { setPasteText(''); setPasteOpen(false); }
    flash(`${r.added} élève(s) ajouté(s)${r.skipped ? ` — ${r.skipped} ignoré(s) : doublons ou limite 40` : ''}`);
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = addNames(parseNames(String(reader.result || '')));
      flash(`${r.added} élève(s) importé(s)${r.skipped ? ` — ${r.skipped} ignoré(s) : doublons ou limite 40` : ''}`);
    };
    reader.readAsText(f);
    e.target.value = '';
  };

  const update = (id: number, patch: Partial<Eleve>) =>
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)));

  const toggle = (id: number, code: string) =>
    setStudents(prev => prev.map(s => (s.id === id
      ? { ...s, done: s.done.includes(code) ? s.done.filter(c => c !== code) : [...s.done, code] }
      : s)));

  const remove = (id: number) => setStudents(prev => prev.filter(s => s.id !== id));

  const exportCsv = () => {
    if (!students.length) return;
    const head = ['Nom', 'XP', 'Thèmes validés', 'Détail des thèmes', 'Notes'];
    const rows = students.map(s => [s.name, String(s.xp), `${s.done.length}/15`, s.done.join(' '), s.notes]);
    const csv = '\uFEFF' + [head, ...rows].map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'ma-classe-snt.csv'; a.click();
    URL.revokeObjectURL(url);
    flash('Fichier ma-classe-snt.csv téléchargé ✓');
  };

  const totalXp = students.reduce((a, s) => a + s.xp, 0);
  const avgXp = students.length ? Math.round(totalXp / students.length) : 0;
  const totalDone = students.reduce((a, s) => a + s.done.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex-col p-6 hidden md:flex">
        <div className="text-xl font-black mb-10 text-blue-400">SNT ACADEMY</div>
        <nav className="space-y-4 flex-grow">
          <div className="flex items-center gap-3 text-blue-400 w-full font-bold">👥 Ma classe</div>
          <Link href="/themes" className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full font-bold">🗺️ Thèmes</Link>
          <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full font-bold">🏠 Retour au site</Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-800 text-xs text-slate-500 font-bold leading-relaxed">
          Données stockées uniquement dans ce navigateur. Aucun serveur, aucun compte élève.
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 md:p-10 max-w-6xl">
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="font-black text-blue-600">SNT ACADEMY</div>
          <Link href="/themes" className="text-sm font-bold text-slate-500">Thèmes →</Link>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-3xl font-black tracking-tight">Ma classe</h1>
          <span className={`px-4 py-2 rounded-xl font-black text-sm ${students.length >= MAX_ELEVES ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {students.length} / {MAX_ELEVES} élèves
          </span>
        </div>
        <p className="text-sm text-slate-500 font-medium mb-8">
          1) Importe ta liste (saisie, collage ou CSV) — 2) coche les thèmes validés, note l&apos;XP annoncé — 3) exporte le tableau. Le suivi est saisi par toi : les élèves n&apos;ont pas de compte.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm">
            <div className="text-3xl font-black">{students.length}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">Élèves</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm">
            <div className="text-3xl font-black text-blue-600">{totalXp}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">XP cumulés</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm">
            <div className="text-3xl font-black text-indigo-600">{avgXp}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">XP moyens</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm">
            <div className="text-3xl font-black text-green-600">{totalDone}</div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">Thèmes validés</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-4">
          <input
            ref={nameRef}
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addOne(); }}
            placeholder="Nom de l&apos;élève…"
            className="flex-1 min-w-[220px] px-5 py-3 rounded-2xl border-2 border-slate-200 font-bold focus:border-blue-400 outline-none"
          />
          <button onClick={addOne} className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700">+ Ajouter</button>
          <button onClick={() => setPasteOpen(!pasteOpen)} className="px-5 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black hover:border-blue-400">📋 Coller une liste</button>
          <button onClick={() => fileRef.current?.click()} className="px-5 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black hover:border-blue-400">📄 Importer un CSV</button>
          <input ref={fileRef} type="file" accept=".csv,.txt" onChange={onFile} className="hidden" />
        </div>

        {pasteOpen && (
          <div className="mb-6 p-5 bg-white rounded-3xl border-2 border-blue-100">
            <textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              rows={5}
              placeholder={"Un élève par ligne…\nOu du CSV : Nom;Prénom (l'en-tête est ignoré)\nEx :\nDupont;Emma\nMartin;Lucas"}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 font-mono text-sm outline-none focus:border-blue-400"
            />
            <button onClick={addPasted} className="mt-3 px-5 py-3 bg-slate-900 text-white rounded-2xl font-black">Ajouter ces élèves</button>
          </div>
        )}

        {message && <div className="mb-4 px-5 py-3 bg-green-50 text-green-800 rounded-2xl font-bold text-sm border-2 border-green-100">{message}</div>}

        {students.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-black mb-2">Aucun élève pour l&apos;instant</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Saisis tes élèves un par un, colle ta liste,<br />ou importe un CSV (format Pronote : Nom;Prénom).</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => nameRef.current?.focus()} className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-black">✍️ Saisir des noms</button>
              <button onClick={() => fileRef.current?.click()} className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-black">📄 Importer un CSV</button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border-2 border-slate-100 bg-white shadow-sm">
            <table className="min-w-max text-sm">
              <thead>
                <tr className="text-left">
                  <th className="sticky left-0 bg-white px-4 py-3 font-black uppercase text-xs tracking-widest text-slate-400 border-r">Élève</th>
                  <th className="px-2 py-3 font-black uppercase text-xs tracking-widest text-slate-400">XP</th>
                  {THEMES.map(t => (
                    <th key={t.code} title={t.label} className={`px-2 py-3 font-black text-xs ${t.officiel ? 'text-blue-600' : 'text-slate-300'}`}>{t.code}</th>
                  ))}
                  <th className="px-2 py-3 font-black uppercase text-xs tracking-widest text-slate-400">Notes</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="sticky left-0 bg-white px-4 py-2 font-bold whitespace-nowrap border-r">{s.name}</td>
                    <td className="px-2 py-2">
                      <input type="number" value={s.xp} onChange={e => update(s.id, { xp: isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10) })} className="w-16 px-2 py-1 rounded-lg border-2 border-slate-200 font-bold outline-none focus:border-blue-400" />
                    </td>
                    {THEMES.map(t => {
                      const on = s.done.includes(t.code);
                      return (
                        <td key={t.code} className="px-1 py-2 text-center">
                          <button onClick={() => toggle(s.id, t.code)} title={`${t.label} — ${on ? 'validé' : 'à faire'}`} className={`w-7 h-7 rounded-lg transition-all ${on ? 'bg-green-500 text-white' : 'bg-slate-100 hover:bg-slate-300'}`}>{on ? '✓' : ''}</button>
                        </td>
                      );
                    })}
                    <td className="px-2 py-2">
                      <input value={s.notes} onChange={e => update(s.id, { notes: e.target.value })} placeholder="…" className="w-28 px-2 py-1 rounded-lg border-2 border-slate-200 outline-none focus:border-blue-400" />
                    </td>
                    <td className="px-2 py-2">
                      <button onClick={() => remove(s.id)} title="Retirer de la liste" className="text-slate-300 hover:text-red-500 font-black px-2">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {students.length > 0 && (
          <div className="flex flex-wrap gap-3 items-center mt-6">
            <button onClick={exportCsv} className="px-5 py-3 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700">⬇️ Exporter en CSV</button>
            <button onClick={() => { if (window.confirm('Vider toute la liste de classe ?')) setStudents([]); }} className="px-5 py-3 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-black hover:border-red-400">Tout effacer</button>
            <span className="text-xs text-slate-400 font-bold">Bleu = thèmes officiels · Gris = bonus · Les données restent dans ce navigateur : exporte pour les conserver.</span>
          </div>
        )}
      </main>
    </div>
  );
}
