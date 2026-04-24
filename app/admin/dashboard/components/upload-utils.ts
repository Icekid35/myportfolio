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
  // Only run HEIC conversion in the browser
  if (
    typeof window !== "undefined" &&
    (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic"))
  ) {
    const heic2any = (await import("heic2any")).default;
    let converted;
    let outType = "image/webp";
    let outExt = ".webp";
    try {
      converted = await heic2any({ blob: file, toType: "image/webp" });
      // heic2any may return an array of Blobs
      if (Array.isArray(converted)) converted = converted[0];
      if (converted && converted.type) outType = converted.type;
    } catch (err) {
      converted = await heic2any({ blob: file, toType: "image/jpeg" });
      if (Array.isArray(converted)) converted = converted[0];
      outType = "image/jpeg";
      outExt = ".jpg";
    }
    uploadFile = new File([converted], file.name.replace(/\.heic$/i, outExt), {
      type: outType,
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
