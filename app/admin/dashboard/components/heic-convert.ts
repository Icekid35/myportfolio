// heic-convert.ts
// Utility to convert HEIC images to webp or jpg in the browser
import heic2any from "heic2any";

export async function convertHeicToWebpOrJpg(file: File): Promise<Blob> {
  // Try webp first, fallback to jpg
  try {
    return (await heic2any({ blob: file, toType: "image/webp" })) as Blob;
  } catch (err) {
    // fallback to jpg
    return (await heic2any({ blob: file, toType: "image/jpeg" })) as Blob;
  }
}
