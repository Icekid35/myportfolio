"use client";
import { useEffect, useState, useCallback } from "react";

type Technology = {
  id: string;
  name: string;
  iconKey: string;
  category: string;
  order: number;
};

const categories = [
  "Core Languages & Frameworks",
  "Backend & Databases",
  "Styling & UI",
  "DevOps & Deployment",
  "Version Control & Collaboration",
  "Testing & Automation",
  "CMS & Design",
  "AI & Data Science",
  "Other",
];

const emptyForm: Omit<Technology, "id"> = {
  name: "",
  iconKey: "",
  category: "Other",
  order: 0,
};

export default function TechnologiesPanel() {
  const [techs, setTechs] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Technology, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/technologies");
    if (res.ok) setTechs(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function openEdit(t: Technology) {
    setEditingId(t.id);
    setForm({
      name: t.name,
      iconKey: t.iconKey,
      category: t.category,
      order: t.order,
    });
    setFormOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    if (editingId) {
      await fetch(`/api/technologies/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setFormOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this technology?")) return;
    setDeleting(id);
    await fetch(`/api/technologies/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  const filtered = techs.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped = categories.reduce<Record<string, Technology[]>>(
    (acc, cat) => {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    },
    {},
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search technologies..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
        />
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
          Add
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : techs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-white/5 rounded-xl">
          <p className="text-gray-400 text-sm">No technologies yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                {cat}
              </p>
              <div className="space-y-1.5">
                {items.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <div>
                      <span className="text-sm text-white">{t.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({t.iconKey})
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(t)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={deleting === t.id}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                {editingId ? "Edit Technology" : "New Technology"}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Name *</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                placeholder="e.g. TypeScript"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Icon Key (react-icons name)
              </label>
              <input
                value={form.iconKey}
                onChange={(e) =>
                  setForm((f) => ({ ...f, iconKey: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                placeholder="e.g. SiTypescript"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Sort Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    order: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setFormOpen(false)}
                className="flex-1 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="flex-1 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
