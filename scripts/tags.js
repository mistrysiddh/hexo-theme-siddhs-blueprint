"use strict";

// Custom Hexo tag plugins used in post markdown:
//   {% callout note %} ... {% endcallout %}
//   {% callout warning "Custom Title" %} ... {% endcallout %}
//   {% mermaid %} graph TD; A-->B {% endmermaid %}

const TYPE_GLYPH = { note: "i", tip: "✓", warning: "!", alert: "‼" };
const TYPE_LABEL = { note: "Note", tip: "Tip", warning: "Warning", alert: "Alert" };

hexo.extend.tag.register(
  "callout",
  function (args, content) {
    const type = (args[0] || "note").toLowerCase();
    const title = args[1] || TYPE_LABEL[type] || "Note";
    const glyph = TYPE_GLYPH[type] || "i";
    let html;
    try {
      html = hexo.render.renderSync({ text: content }, { engine: "md" });
    } catch (e) {
      html = "<p>" + content + "</p>";
    }
    return (
      '<div class="bp-callout ' +
      type +
      '"><span class="bp-corner tl"></span><span class="bp-corner br"></span>' +
      '<span class="bp-callout-glyph">' +
      glyph +
      "</span>" +
      '<div class="bp-callout-body"><p class="bp-callout-title">' +
      title +
      "</p>" +
      html +
      "</div></div>"
    );
  },
  { ends: true }
);

hexo.extend.tag.register(
  "mermaid",
  function (args, content) {
    const escaped = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    return (
      '<div class="bp-mermaid" data-chart="' +
      escaped +
      '"><div class="bp-mermaid-label">Diagram</div>' +
      '<div class="bp-mermaid-render"><p class="text-xs text-steel-dim font-mono">Rendering diagram…</p></div></div>'
    );
  },
  { ends: true }
);
