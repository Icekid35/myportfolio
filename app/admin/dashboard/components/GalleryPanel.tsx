"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { readErrorMessage, uploadAsset } from "./upload-utils";

type GalleryImage = {
  id: string;
  original: string;
  thumbnail: string;
  caption?: string | null;
  order: number;
};

function SkeletonCard() {
  return (
    <div className="bg-white/5 rounded-xl aspect-square animate-pulse border border-white/5" />
  );
}

export default function GalleryPanel() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
    name: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editOrder, setEditOrder] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/gallery");
    if (res.ok) setImages(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress({
          current: i + 1,
          total: files.length,
          name: file.name,
        });

        let url = "";
        try {
          url = await uploadAsset(file, "gallery");
        } catch (err) {
          console.error("Upload failed for", file.name, err);
          throw err;
        }

        if (!url || typeof url !== "string") {
          throw new Error("Upload did not return a valid image URL.");
        }

        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            original: url,
            thumbnail: url,
            order: images.length + i,
          }),
        });

        if (!response.ok) {
          throw new Error(await readErrorMessage(response));
        }
      }

      await load();
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Image upload failed.",
      );
      console.error("Gallery upload error:", error);
    } finally {
      setUploadProgress(null);
      e.target.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this image?")) return;
    setDeleting(id);
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  async function saveEdit(id: string) {
    const img = images.find((i) => i.id === id)!;
    await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...img, caption: editCaption, order: editOrder }),
    });
    setEditingId(null);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </p>
        <label className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50">
          {uploadProgress ? (
            <>
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
              {uploadProgress.current}/{uploadProgress.total}
            </>
          ) : (
            <>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Add Images
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={!!uploadProgress}
          />
        </label>
      </div>

      {/* Upload progress bar */}
      {uploadProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span className="truncate max-w-[70%]">
              Uploading: {uploadProgress.name}
            </span>
            <span>
              {uploadProgress.current} of {uploadProgress.total}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-300"
              style={{
                width: `${(uploadProgress.current / uploadProgress.total) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {uploadError}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border border-white/5 rounded-xl border-dashed">
          <svg
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-3 text-gray-600"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              d="M4 16l4-4 4 4 3-3 5 5"
            />
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <p className="text-gray-400 text-sm">No images yet</p>
          <p className="text-gray-600 text-xs mt-1">
            Upload your profile photos to display in the gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/5"
            >
              <div className="aspect-square relative">
                <Image
                  src={img.original}
                  alt={img.caption || "Gallery"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                <button
                  onClick={() => {
                    setEditingId(img.id);
                    setEditCaption(img.caption || "");
                    setEditOrder(img.order);
                  }}
                  className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  disabled={deleting === img.id}
                  className="w-full py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs rounded-lg transition-colors"
                >
                  {deleting === img.id ? "Removing..." : "Remove"}
                </button>
              </div>
              {img.caption && (
                <div className="px-2 py-1.5">
                  <p className="text-xs text-gray-400 truncate">
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-xs p-5 space-y-4">
            <h2 className="text-sm font-semibold">Edit Image</h2>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Caption
              </label>
              <input
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none"
                placeholder="Add a caption..."
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Sort Order
              </label>
              <input
                type="number"
                value={editOrder}
                onChange={(e) => setEditOrder(parseInt(e.target.value) || 0)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingId(null)}
                className="flex-1 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => saveEdit(editingId)}
                className="flex-1 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
