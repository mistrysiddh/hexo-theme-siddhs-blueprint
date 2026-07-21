const BATCH = 6;

export function initTimelineFilter(root: ParentNode) {
  const list = root.querySelector<HTMLElement>("#bp-timeline-list");
  const yearSelect = root.querySelector<HTMLSelectElement>("#bp-timeline-year");
  const categorySelect = root.querySelector<HTMLSelectElement>("#bp-timeline-category");
  const sentinel = root.querySelector<HTMLElement>("#bp-timeline-sentinel");
  const loading = root.querySelector<HTMLElement>("#bp-timeline-loading");
  const emptyMsg = root.querySelector<HTMLElement>("#bp-timeline-empty");
  if (!list || !yearSelect || !categorySelect || !sentinel) return;
  if (list.dataset.bound === "true") return;
  list.dataset.bound = "true";

  const items = Array.from(list.querySelectorAll<HTMLElement>("[data-timeline-item]"));
  const yearMarkers = Array.from(list.querySelectorAll<HTMLElement>("[data-timeline-year-marker]"));
  let revealCount = BATCH;

  function matches(item: HTMLElement) {
    const y = yearSelect!.value;
    const c = categorySelect!.value;
    if (y !== "all" && item.dataset.year !== y) return false;
    if (c !== "all" && item.dataset.category !== c) return false;
    return true;
  }

  function render() {
    const filtered = items.filter(matches);
    let count = 0;
    items.forEach((item) => {
      if (matches(item) && count < revealCount) {
        item.style.display = "";
        count++;
      } else {
        item.style.display = "none";
      }
    });

    yearMarkers.forEach((marker) => {
      const y = marker.dataset.timelineYearMarker;
      const anyVisible = items.some((item) => item.dataset.year === y && item.style.display !== "none");
      marker.style.display = anyVisible ? "" : "none";
    });

    emptyMsg?.classList.toggle("hidden", filtered.length > 0);
    loading?.classList.toggle("hidden", revealCount >= filtered.length);
  }

  render();

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        revealCount += BATCH;
        render();
      }
    },
    { rootMargin: "200px" }
  );
  observer.observe(sentinel);

  yearSelect.addEventListener("change", () => {
    revealCount = BATCH;
    render();
  });
  categorySelect.addEventListener("change", () => {
    revealCount = BATCH;
    render();
  });
}
