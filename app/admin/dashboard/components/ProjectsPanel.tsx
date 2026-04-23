"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { uploadAsset } from "./upload-utils";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  modalImage: string;
  link?: string | null;
  code?: string | null;
  stack: string[];
  order: number;
  featured: boolean;
};

const emptyForm: Omit<Project, "id"> = {
  title: "",
  category: "",
  description: "",
  image: "",
  modalImage: "",
  link: "",
  code: "",
  stack: [],
  order: 0,
  featured: false,
};

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border border-white/5 rounded-xl animate-pulse">
      <div className="w-16 h-12 bg-white/10 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-48 bg-white/10 rounded" />
        <div className="h-3 w-24 bg-white/10 rounded" />
      </div>
    </div>
  );
}

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [gifUploading, setGifUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [stackInput, setStackInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setStackInput("");
    setFormOpen(true);
  }

  function openEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      modalImage: p.modalImage,
      link: p.link || "",
      code: p.code || "",
      stack: p.stack,
      order: p.order,
      featured: p.featured,
    });
    setStackInput(p.stack.join(", "));
    setFormOpen(true);
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "modalImage",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (field === "image") setImageUploading(true);
    else setGifUploading(true);

    try {
      const url = await uploadAsset(file, "projects");
      setForm((prev) => ({ ...prev, [field]: url }));
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Asset upload failed.",
      );
    } finally {
      if (field === "image") setImageUploading(false);
      else setGifUploading(false);
      e.target.value = "";
    }
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      stack: stackInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editingId) {
      await fetch(`/api/projects/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    setFormOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setDeleting(id);
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-xl">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">No projects yet</p>
          <p className="text-gray-600 text-xs mt-1">
            Click &quot;Add Project&quot; to create your first one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-16 h-12 relative flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {p.title}
                </p>
                <p className="text-xs text-gray-500">
                  {p.category} • {p.stack.slice(0, 3).join(", ")}
                  {p.stack.length > 3 ? ` +${p.stack.length - 3}` : ""}
                </p>
              </div>
              {p.featured && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full flex-shrink-0">
                  Featured
                </span>
              )}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Edit"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deleting === p.id}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  {deleting === p.id ? (
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <h2 className="text-sm font-semibold">
                {editingId ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {uploadError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {uploadError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Category *
                  </label>
                  <input
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                    placeholder="e.g. Ecommerce"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 resize-none"
                  placeholder="Project description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Thumbnail Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "image")}
                    className="hidden"
                    id="img-upload"
                  />
                  <label
                    htmlFor="img-upload"
                    className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 border-dashed rounded-lg px-3 py-3 text-xs text-gray-400 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    {imageUploading
                      ? "Uploading..."
                      : form.image
                        ? "✓ Uploaded"
                        : "Upload image"}
                  </label>
                  {form.image && (
                    <input
                      value={form.image}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, image: e.target.value }))
                      }
                      className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none"
                      placeholder="Or paste URL"
                    />
                  )}
                  {!form.image && (
                    <input
                      value={form.image}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, image: e.target.value }))
                      }
                      className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none"
                      placeholder="Or paste URL"
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Preview GIF/Image
                  </label>
                  <input
                    type="file"
                    accept="image/*,image/gif"
                    onChange={(e) => handleImageUpload(e, "modalImage")}
                    className="hidden"
                    id="gif-upload"
                  />
                  <label
                    htmlFor="gif-upload"
                    className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 border-dashed rounded-lg px-3 py-3 text-xs text-gray-400 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    {gifUploading
                      ? "Uploading..."
                      : form.modalImage
                        ? "✓ Uploaded"
                        : "Upload GIF/image"}
                  </label>
                  <input
                    value={form.modalImage}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, modalImage: e.target.value }))
                    }
                    className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none"
                    placeholder="Or paste URL"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Technologies (comma-separated)
                </label>
                <input
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                  placeholder="Next.js, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Live URL
                  </label>
                  <input
                    value={form.link || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, link: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Code URL
                  </label>
                  <input
                    value={form.code || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, code: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, featured: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-white"
                    />
                    <span className="text-sm text-gray-300">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5">
              <button
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.category}
                className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
