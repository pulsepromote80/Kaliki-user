export function encryptData(data: string): string {
  // Simple base64 encoding for now - in production, use proper encryption
  return btoa(data);
}

export function decryptData(encrypted: string): string {
  try {
    return atob(encrypted);
  } catch {
    return "";
  }
}
