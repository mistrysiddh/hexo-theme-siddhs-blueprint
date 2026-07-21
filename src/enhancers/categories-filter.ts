export function initCategoriesFilter(root: ParentNode) {
  const grid = root.querySelector<HTMLElement>("#bp-categories-grid");
  const input = root.querySelector<HTMLInputElement>("#bp-categories-filter");
  const sortSelect = root.querySelector<HTMLSelectElement>("#bp-categories-sort");
  const empty = root.querySelector<HTMLElement>("#bp-categories-empty");
  if (!grid || !input || !sortSelect) return;
  if (grid.dataset.bound === "true") return;
  grid.dataset.bound = "true";

  const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-category-card]"));

  function apply() {
    const q = input!.value.trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach((card) => {
      const match = !q || (card.dataset.name ?? "").includes(q);
      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    empty?.classList.toggle("hidden", visibleCount > 0);

    const sortBy = sortSelect!.value;
    const sorted = [...cards].sort((a, b) => {
      if (sortBy === "az") return (a.dataset.label ?? "").localeCompare(b.dataset.label ?? "");
      const ca = Number(a.dataset.count ?? 0);
      const cb = Number(b.dataset.count ?? 0);
      return sortBy === "posts-asc" ? ca - cb : cb - ca;
    });
    sorted.forEach((card) => grid!.appendChild(card));
  }

  input.addEventListener("input", apply);
  sortSelect.addEventListener("change", apply);
}
