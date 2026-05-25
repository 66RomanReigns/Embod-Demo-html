const burger = document.querySelector(".navbar-burger");
const menu = document.getElementById("main-menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll("video").forEach(video => observer.observe(video));
}
