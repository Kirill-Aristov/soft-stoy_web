// src/shared/lib/api.ts
export function apiUrl(endpoint: string) {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    // dev: Next API (/api/support)
    return endpoint;
  }
  // prod: PHP endpoints (/api/support.php)
  return endpoint.endsWith(".php") ? endpoint : `${endpoint}.php`;
}
