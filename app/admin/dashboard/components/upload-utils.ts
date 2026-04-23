import { convertHeicToWebpOrJpg } from "./heic-convert";

export async function readErrorMessage(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      const payload = await response.json();
      if (typeof payload?.error === "string" && payload.error.trim()) {
        return payload.error;
      }
    } catch {
      return "The server returned invalid JSON.";
    }
  }

  const text = await response.text();
  return (
    text.trim() || "The upload failed before the server returned a response."
  );
}

export async function uploadAsset(file: File, folder: string): Promise<string> {
  let uploadFile = file;
  // Convert HEIC to webp or jpg before upload
  if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
    const converted = await convertHeicToWebpOrJpg(file);
    // Create a new File object for upload
    uploadFile = new File([converted], file.name.replace(/\.heic$/i, ".webp"), {
      type: converted.type || "image/webp",
    });
  }

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("The server did not return JSON for the upload request.");
  }

  const payload = await response.json();
  if (typeof payload?.url !== "string" || !payload.url) {
    throw new Error("The upload finished without a file URL.");
  }

  return payload.url;
}
