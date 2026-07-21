"use strict";

// Renders a blueprint-styled 1200x630 social share card per post, using
// satori (JSX-like tree -> SVG) + resvg (SVG -> PNG). Text is set in
// KaTeX's bundled SansSerif font — already an MIT/SIL-licensed dependency
// of this theme, so no extra font asset needs to be fetched or shipped.

const fs = require("fs");
const path = require("path");
const satori = require("satori").default;
const { Resvg } = require("@resvg/resvg-js");

const KATEX_DIR = path.dirname(require.resolve("katex/package.json"));

let fontsCache = null;
function loadFonts() {
  if (fontsCache) return fontsCache;
  const regular = fs.readFileSync(path.join(KATEX_DIR, "dist/fonts/KaTeX_SansSerif-Regular.ttf"));
  const bold = fs.readFileSync(path.join(KATEX_DIR, "dist/fonts/KaTeX_SansSerif-Bold.ttf"));
  fontsCache = [
    { name: "Sans", data: regular, weight: 400, style: "normal" },
    { name: "Sans", data: bold, weight: 700, style: "normal" },
  ];
  return fontsCache;
}

function truncate(str, max) {
  if (!str || str.length <= max) return str || "";
  return str.slice(0, max - 1).trimEnd() + "…";
}

const CORNER_SIZE = 28;
const CORNER_POSITIONS = [
  { top: "24px", left: "24px", borderTop: true, borderLeft: true },
  { top: "24px", right: "24px", borderTop: true, borderRight: true },
  { bottom: "24px", left: "24px", borderBottom: true, borderLeft: true },
  { bottom: "24px", right: "24px", borderBottom: true, borderRight: true },
];

function cornerMark(pos) {
  const style = {
    display: "flex",
    position: "absolute",
    width: CORNER_SIZE + "px",
    height: CORNER_SIZE + "px",
  };
  if (pos.top) style.top = pos.top;
  if (pos.bottom) style.bottom = pos.bottom;
  if (pos.left) style.left = pos.left;
  if (pos.right) style.right = pos.right;
  if (pos.borderTop) style.borderTop = "2px solid rgba(94,223,255,0.6)";
  if (pos.borderBottom) style.borderBottom = "2px solid rgba(94,223,255,0.6)";
  if (pos.borderLeft) style.borderLeft = "2px solid rgba(94,223,255,0.6)";
  if (pos.borderRight) style.borderRight = "2px solid rgba(94,223,255,0.6)";
  return { type: "div", props: { style } };
}

async function renderOgImage({ title, moduleLabel, drawingNumber, author, dateDisplay, brand }) {
  const fonts = loadFonts();
  const safeTitle = truncate(title, 110);

  const tree = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0A2540",
        padding: "56px 64px",
        fontFamily: "Sans",
        position: "relative",
      },
      children: [
        ...CORNER_POSITIONS.map(cornerMark),
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    border: "2px solid rgba(94,223,255,0.5)",
                    color: "#5EDFFF",
                    fontSize: 22,
                    fontWeight: 700,
                    padding: "10px 18px",
                    letterSpacing: 2,
                  },
                  children: moduleLabel,
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", color: "#8A94A6", fontSize: 20, letterSpacing: 2 },
                  children: drawingNumber,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              color: "#FFFFFF",
              fontSize: safeTitle.length > 60 ? 52 : 64,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: "1030px",
            },
            children: safeTitle,
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid rgba(94,223,255,0.25)",
              paddingTop: "28px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", color: "#BFC7D5", fontSize: 22 },
                  children: author + "  /  " + dateDisplay,
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", color: "#5EDFFF", fontSize: 24, fontWeight: 700, letterSpacing: 1 },
                  children: brand,
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(tree, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}

module.exports = { renderOgImage };
