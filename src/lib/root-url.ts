declare global {
  interface Window {
    __BP_ROOT__?: string;
  }
}

// Prefixes a site-relative path with Hexo's configured `root` (usually "/",
// but can differ for subpath deployments e.g. GitHub Project Pages).
export function rootUrl(path: string): string {
  const root = (window.__BP_ROOT__ || "/").replace(/\/$/, "");
  return root + path;
}

export {};
