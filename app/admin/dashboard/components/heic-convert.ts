// heic-convert.ts
// Utility to convert HEIC images to webp or jpg in the browser

async function convertHeicToWebpOrJpeg(file: File): Promise<Blob> {
  // Try webp first, fallback to jpg
  const heic2any = (await import("heic2any")).default;
  try {
    return (await heic2any({ blob: file, toType: "image/webp" })) as Blob;
  } catch (err) {
    // fallback to jpg
    return (await heic2any({ blob: file, toType: "image/jpeg" })) as Blob;
  }
}
