const filters = document.querySelectorAll(".filter");
const atlasItems = document.querySelectorAll(".atlas article");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === button));
    atlasItems.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.hidden = !shouldShow;
    });
  });
});

const animatedItems = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedItems.forEach((item) => observer.observe(item));
} else {
  animatedItems.forEach((item) => item.classList.add("visible"));
}
