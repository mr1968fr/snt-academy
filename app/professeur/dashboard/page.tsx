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
const MAX_CLASSES = 6;
const STORAGE_KEY = 'snt-classes-v1';
const OLD_KEY = 'snt-classe-v1';

type Eleve = { id: number; name: string; xp: number; notes: string; done: string[] };
type Classe = { id: number; name: string; students: Eleve[] };

export default function ProfDashboard() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [activeId, setActiveId] = useState<number>(0);
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
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data.classes) && data.classes.length) {
          setClasses(data.classes);
          setActiveId(data.activeId ?? data.classes[0].id);
        }
      } else {
        // migration depuis la version mono-classe
        const old = localStorage.getItem(OLD_KEY);
        if (old) {
          const students = JSON.parse(old);
          if (Array.isArray(students) && students.length) {
            const c: Classe = { id: Date.now(), name: 'Ma classe', students };
            setClasses([c]); setActiveId(c.id);
          }
        }
      }
    } catch { /* données illisibles : on repart de zéro */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify({ classes, activeId }));
  }, [classes, activeId, loaded]);

  const flash = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 4500); };
  const active = classes.find(c => c.id === activeId);

  const patchActive = (fn: (c: Classe) => Classe) =>
    setClasses(prev => prev.map(c => (c.id === activeId ? fn(c) : c)));

  const addClasse = () => {
    if (classes.length >= MAX_CLASSES) { flash(`Limite de ${MAX_CLASSES} classes atteinte.`); return; }
    const letter = String.fromCharCode(65 + classes.length); // A, B, C…
    const c: Classe = { id: Date.now(), name: `2nde ${letter}`, students: [] };
    setClasses(prev => [...prev, c]); setActiveId(c.id);
    flash('Classe créée — importe ta liste.');
  };

  const renameClasse = () => {
    if (!active) return;
    const n = window.prompt('Nom de la classe :', active.name);
    if (n && n.trim()) patchActive(c => ({ ...c, name: n.trim() }));
  };

  const removeClasse = () => {
    if (!active) return;
    if (!window.confirm(`Supprimer la classe « ${active.name} » et son suivi ?`)) return;
    setClasses(prev => {
      const next = prev.filter(c => c.id !== activeId);
      if (next.length) setActiveId(next[0].id);
      return next;
    });
  };

  const parseNames = (text: string): string[] => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const out: string[] = [];
    lines.forEach((line, i) => {
      if (i === 0 && /nom|prénom|prenom|élève|eleve|classe/i.test(line) && /[,;\t]/.test(line)) return;
      const fields = line.split(/[,;\t]/).map(f => f.trim()).filter(Boolean);
      if (fields.length >= 2) out.push(`${fields[1]} ${fields[0]}`);
      else if (fields.length === 1) out.push(fields[0]);
    });
    return out;
  };

  const addNames = (raw: string[]) => {
    if (!active) return { added: 0, skipped: 0 };
    const existing = new Set(active.students.map(s => s.name.toLowerCase()));
    let added = 0, skipped = 0;
    const next = [...active.students];
    for (const line of raw) {
      const clean = line.replace(/\s+/g, ' ').trim();
      if (!clean) continue;
      if (next.length >= MAX_ELEVES) { skipped++; continue; }
      if (existing.has(clean.toLowerCase())) { skipped++; continue; }
      existing.add(clean.toLowerCase());
      next.push({ id: Date.now() + added, name: clean, xp: 0, notes: '', done: [] });
      added++;
    }
    if (added) patchActive(c => ({ ...c, students: next }));
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
    patchActive(c => ({ ...c, students: c.students.map(s => (s.id === id ? { ...s, ...patch } : s)) }));

  const toggle = (id: number, code: string) =>
    patchActive(c => ({ ...c, students: c.students.map(s => (s.id === id
      ? { ...s, done: s.done.includes(code) ? s.done.filter(x => x !== code) : [...s.done, code] }
      : s)) }));

  const remove = (id: number) =>
    patchActive(c => ({ ...c, students: c.students.filter(s => s.id !== id) }));

  const download = (filename: string, rows: string[][]) => {
    const csv = '\uFEFF' + rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const exportActive = () => {
    if (!active || !active.students.length) return;
    const head = ['Nom', 'XP', 'Thèmes validés', 'Détail des thèmes', 'Notes'];
    const rows = active.students.map(s => [s.name, String(s.xp), `${s.done.length}/15`, s.done.join(' '), s.notes]);
    download(`snt-${active.name.replace(/\s+/g, '-').toLowerCase()}.csv`, [head, ...rows]);
    flash('CSV de la classe téléchargé ✓');
  };

  const exportAll = () => {
    const head = ['Classe', 'Nom', 'XP', 'Thèmes validés', 'Détail des thèmes', 'Notes'];
    const rows = classes.flatMap(c => c.students.map(s => [c.name, s.name, String(s.xp), `${s.done.length}/15`, s.done.join(' '), s.notes]));
    if (!rows.length) return;
    download('snt-toutes-mes-classes.csv', [head, ...rows]);
    flash('CSV global téléchargé ✓');
  };

  const students = active?.students ?? [];
  const totalXp = students.reduce((a, s) => a + s.xp, 0);
  const avgXp = students.length ? Math.round(totalXp / students.length) : 0;
  const totalDone = students.reduce((a, s) => a + s.done.length, 0);
  const allEleves = classes.reduce((a, c) => a + c.students.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex-col p-6 hidden md:flex">
        <div className="text-xl font-black mb-10 text-blue-400">SNT ACADEMY</div>
        <nav className="space-y-4 flex-grow">
          <div className="flex items-center gap-3 text-blue-400 w-full font-bold">👥 Mes classes ({classes.length})</div>
          <Link href="/themes" className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full font-bold">🗺️ Thèmes</Link>
          <Link href="/professeur/guide" className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full font-bold">📘 Guide</Link>
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
          <h1 className="text-3xl font-black tracking-tight">Mes classes</h1>
          <span className="px-4 py-2 rounded-xl font-black text-sm bg-blue-100 text-blue-700">{allEleves} élèves au total</span>
        </div>
        <p className="text-sm text-slate-500 font-medium mb-6">
          Jusqu&apos;à {MAX_CLASSES} classes de {MAX_ELEVES} élèves : une par onglet. Importe tes listes (saisie, collage ou CSV Pronote), coche les thèmes validés, exporte quand tu veux.
        </p>

        {/* ONGLETS DE CLASSES */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {classes.map(c => (
            <button key={c.id} onClick={() => setActiveId(c.id)}
              className={`px-4 py-2 rounded-2xl font-black text-sm transition-all ${c.id === activeId ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-400'}`}>
              {c.name} <span className={c.id === activeId ? 'text-blue-400' : 'text-slate-300'}>({c.students.length})</span>
            </button>
          ))}
          <button onClick={addClasse} title="Ajouter une classe" className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700">+</button>
          {active && classes.length > 0 && (
            <>
              <button onClick={renameClasse} title="Renommer la classe active" className="px-3 py-2 rounded-2xl bg-white border-2 border-slate-200 text-slate-400 hover:text-slate-700 font-black text-sm">✎</button>
              <button onClick={removeClasse} title="Supprimer la classe active" className="px-3 py-2 rounded-2xl bg-white border-2 border-red-100 text-red-400 hover:text-red-600 font-black text-sm">🗑</button>
            </>
          )}
        </div>

        {classes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-black mb-2">Aucune classe pour l&apos;instant</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Crée ta première classe, puis importe ta liste d&apos;élèves.</p>
            <button onClick={addClasse} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black">+ Créer une classe</button>
          </div>
        ) : active && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 shadow-sm">
                <div className="text-3xl font-black">{students.length}<span className="text-sm text-slate-300"> / {MAX_ELEVES}</span></div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400">{active.name}</div>
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
              <input ref={nameRef} value={nameInput} onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addOne(); }}
                placeholder="Nom de l&apos;élève…"
                className="flex-1 min-w-[220px] px-5 py-3 rounded-2xl border-2 border-slate-200 font-bold focus:border-blue-400 outline-none" />
              <button onClick={addOne} className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700">+ Ajouter</button>
              <button onClick={() => setPasteOpen(!pasteOpen)} className="px-5 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black hover:border-blue-400">📋 Coller une liste</button>
              <button onClick={() => fileRef.current?.click()} className="px-5 py-3 bg-white border-2 border-slate-200 rounded-2xl font-black hover:border-blue-400">📄 Importer un CSV</button>
              <input ref={fileRef} type="file" accept=".csv,.txt" onChange={onFile} className="hidden" />
            </div>

            {pasteOpen && (
              <div className="mb-6 p-5 bg-white rounded-3xl border-2 border-blue-100">
                <textarea value={pasteText} onChange={e => setPasteText(e.target.value)} rows={5}
                  placeholder={"Un élève par ligne…\nOu du CSV : Nom;Prénom (l'en-tête est ignoré)\nEx :\nDupont;Emma\nMartin;Lucas"}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 font-mono text-sm outline-none focus:border-blue-400" />
                <button onClick={addPasted} className="mt-3 px-5 py-3 bg-slate-900 text-white rounded-2xl font-black">Ajouter à « {active.name} »</button>
              </div>
            )}

            {message && <div className="mb-4 px-5 py-3 bg-green-50 text-green-800 rounded-2xl font-bold text-sm border-2 border-green-100">{message}</div>}

            {students.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="text-4xl mb-3">📥</div>
                <h3 className="text-lg font-black mb-2">« {active.name} » est vide</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">Saisis tes élèves, colle ta liste, ou importe un CSV (format Pronote : Nom;Prénom).</p>
                <button onClick={() => nameRef.current?.focus()} className="px-5 py-3 bg-blue-600 text-white rounded-2xl font-black">✍️ Saisir des noms</button>
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

            <div className="flex flex-wrap gap-3 items-center mt-6">
              <button onClick={exportActive} disabled={!students.length} className="px-5 py-3 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 disabled:opacity-40">⬇️ Exporter « {active.name} »</button>
              <button onClick={exportAll} disabled={!allEleves} className="px-5 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-black disabled:opacity-40">⬇️ Tout exporter</button>
              <span className="text-xs text-slate-400 font-bold">Bleu = thèmes officiels · Gris = bonus · Les données restent dans ce navigateur : exporte pour les conserver.</span>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
