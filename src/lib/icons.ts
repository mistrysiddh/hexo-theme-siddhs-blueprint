// Custom line-art icon set in the Blueprint drafting style. This is the
// browser/ESM twin of scripts/lib/icons.js (kept as a separate file rather
// than a shared import because Hexo's Node scripts are CommonJS and Vite's
// production Rollup build doesn't reliably interop plain same-project CJS
// files) — keep both files' ICONS map in sync if you add an icon.

export const ICONS: Record<string, string> = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-3.5 1.5L9 15l3.5-1.5L15 9z"/>',
  "terminal-square": '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M7 9l3 3-3 3M13 15h4"/>',
  box: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
  waypoints: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l5 8h5"/>',
  "shield-half": '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/><path d="M12 3v18"/>',
  "brain-circuit": '<circle cx="12" cy="12" r="8"/><path d="M12 6v3M12 15v3M6 12h3M15 12h3"/>',
  cog: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
  "server-cog": '<rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><circle cx="17" cy="7" r="1"/><circle cx="17" cy="17" r="1"/>',
  braces:
    '<path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3"/>',
  "hard-drive": '<rect x="3" y="7" width="18" height="10" rx="1"/><path d="M3 13h18M7 15h.01M11 15h2"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="1"/><rect x="3" y="10" width="2" height="4"/><rect x="19" y="10" width="2" height="4"/><rect x="10" y="3" width="4" height="2"/><rect x="10" y="19" width="4" height="2"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="M20 20l-5.5-5.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>',
  download: '<path d="M12 3v13M7 11l5 5 5-5M4 21h16"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6l9 7 9-7"/>',
  "chevron-left": '<path d="M15 5l-7 7 7 7"/>',
  "chevron-right": '<path d="M9 5l7 7-7 7"/>',
  "arrow-right": '<path d="M4 12h16M14 6l6 6-6 6"/>',
  "arrow-up-right": '<path d="M6 18L18 6M8 6h10v10"/>',
  hash: '<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  github: '<rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="15.5" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor" stroke="none">GH</text>',
  linkedin: '<rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="15.5" font-size="8" font-family="monospace" text-anchor="middle" fill="currentColor" stroke="none">in</text>',
  twitter: '<rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="16" font-size="10" font-family="monospace" text-anchor="middle" fill="currentColor" stroke="none">X</text>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="15.5" font-size="7" font-family="monospace" text-anchor="middle" fill="currentColor" stroke="none">IG</text>',
  youtube: '<rect x="2" y="2" width="20" height="20" rx="2"/><text x="12" y="15.5" font-size="7" font-family="monospace" text-anchor="middle" fill="currentColor" stroke="none">YT</text>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  "alert-triangle": '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 17h.01"/>',
  lightbulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11c.6.5 1 1.2 1 2h4c0-.8.4-1.5 1-2a6 6 0 0 0-3-11z"/>',
  siren: '<path d="M12 3a6 6 0 0 1 6 6v6H6V9a6 6 0 0 1 6-6z"/><path d="M3 21h18M12 3V1"/>',
  "git-commit-vertical": '<circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6"/>',
  send: '<path d="M4 4l16 8-16 8 4-8-4-8z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  heart: '<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>',
  "refresh-cw": '<path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="M8 13l-2 8 6-3 6 3-2-8"/>',
  "graduation-cap": '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
  briefcase: '<rect x="2" y="7" width="20" height="13" rx="1"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  "folder-git-2": '<path d="M3 5h6l2 2h10v12H3V5z"/><circle cx="10" cy="14" r="1.5"/><circle cx="16" cy="12" r="1.5"/><path d="M10 12.5V10a2 2 0 0 1 2-2h2"/>',
  "badge-check":
    '<path d="M12 2l2.5 2 3-.7 1 3 3 1-.7 3 2 2.5-2 2.5.7 3-3 1-1 3-3-.7L12 22l-2.5-2-3 .7-1-3-3-1 .7-3-2-2.5 2-2.5-.7-3 3-1 1-3 3 .7L12 2z"/><path d="M9 12l2 2 4-4"/>',
  radio: '<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13"/>',
  "message-circle": '<path d="M21 12a9 9 0 1 1-4-7.5L21 4l-1 4.5A9 9 0 0 1 21 12z"/>',
  "check-circle-2": '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  "x-circle": '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15V4a1 1 0 0 1 1-1h11"/>',
  check: '<path d="M5 12l5 5L20 6"/>',
  "zoom-in": '<circle cx="10" cy="10" r="7"/><path d="M10 7v6M7 10h6M20 20l-5-5"/>',
};

export function iconSvg(name: string, size = 18): string {
  const body = ICONS[name] || ICONS.box;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
