"use client";
import { useEffect, useState, useCallback } from "react";

type Config = Record<string, string>;

const defaultKeys = [
  { key: "intro_name", label: "Your Name", placeholder: "Habeeb" },
  {
    key: "intro_titles",
    label: "Typewriter Titles (comma-separated)",
    placeholder: "A Full Stack Dev, A React Expert",
  },
  {
    key: "intro_github",
    label: "GitHub URL",
    placeholder: "https://github.com/icekid35",
  },
  {
    key: "intro_instagram",
    label: "Instagram URL",
    placeholder: "https://instagram.com/...",
  },
  {
    key: "about_bio",
    label: "About / Bio",
    placeholder: "I'm a full-stack developer...",
  },
  {
    key: "contact_email",
    label: "Contact Email",
    placeholder: "hello@example.com",
  },
  {
    key: "footer_projects",
    label: "Footer — Projects Count",
    placeholder: "50+",
  },
  {
    key: "footer_clients",
    label: "Footer — Clients Count",
    placeholder: "30+",
  },
  {
    key: "footer_years",
    label: "Footer — Years of Experience",
    placeholder: "5+",
  },
  {
    key: "meta_title",
    label: "Site Meta Title",
    placeholder: "Habeeb | Full Stack Developer",
  },
  {
    key: "meta_description",
    label: "Site Meta Description",
    placeholder: "Portfolio of Habeeb...",
  },
];

export default function ConfigPanel() {
  const [config, setConfig] = useState<Config>({});
  const [local, setLocal] = useState<Config>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/config");
    if (res.ok) {
      const data = await res.json();
      setConfig(data);
      setLocal(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(local),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    load();
  }

  const hasChanges = JSON.stringify(config) !== JSON.stringify(local);

  return (
    <div className="max-w-lg space-y-6">
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1.5 animate-pulse">
              <div className="h-3 w-24 bg-white/10 rounded" />
              <div className="h-10 bg-white/5 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {defaultKeys.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs text-gray-400 mb-1 block">
                {label}
              </label>
              {key === "about_bio" ? (
                <textarea
                  value={local[key] || ""}
                  onChange={(e) =>
                    setLocal((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  rows={4}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 resize-none"
                />
              ) : (
                <input
                  value={local[key] || ""}
                  onChange={(e) =>
                    setLocal((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges || loading}
          className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="text-xs text-green-400">✓ Saved successfully</span>
        )}
        {hasChanges && !saving && (
          <span className="text-xs text-yellow-400">Unsaved changes</span>
        )}
      </div>
    </div>
  );
}
