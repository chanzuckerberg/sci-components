import { deflateSync, inflateSync } from "fflate";

/**
 * Source code is carried in the playground URL's fragment rather than sent to a
 * server, so a shared link is self-contained and the docs site stays static.
 *
 * The encoding is raw deflate in base64url: deflate because JSX repeats itself
 * enough to compress to roughly a third of its length, and base64url because
 * `+` and `/` would need escaping in a URL. This is the same wire format the
 * Astryx playground uses, so links are interchangeable between the two.
 */
export function compressCode(code: string): string {
  const deflated = deflateSync(new TextEncoder().encode(code), { level: 9 });
  return bytesToBase64Url(deflated);
}

/** Inverse of {@link compressCode}. `null` when the string is not a payload. */
export function decompressCode(compressed: string): string | null {
  try {
    return new TextDecoder().decode(inflateSync(base64UrlToBytes(compressed)));
  } catch {
    return null;
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}
