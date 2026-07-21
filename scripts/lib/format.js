"use strict";

// Shared deterministic-hash formatting helpers — used by both the EJS
// helpers (scripts/helpers.js) and the OG image generator
// (scripts/og-generator.js), so drawing numbers/revision codes stay
// identical between what's rendered in the page and what's baked into the
// generated social card.

function hashSeed(seed) {
  let hash = 0;
  const str = String(seed || "");
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function drawingNumber(seed) {
  const num = hashSeed(seed) % 99999;
  return "DWG-" + String(num).padStart(5, "0");
}

function revisionCode(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idx = (d.getMonth() + d.getFullYear()) % letters.length;
  return "REV-" + letters[idx];
}

module.exports = { hashSeed, drawingNumber, revisionCode };
