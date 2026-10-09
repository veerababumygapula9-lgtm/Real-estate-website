// Frontend-demo helper only. Real authentication must be handled by a secure backend.
export async function hashPassword(password) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure browser cryptography is unavailable. Use localhost or HTTPS.");
  }

  const bytes = new TextEncoder().encode(password);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
