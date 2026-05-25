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

function loadLazyVideo(video) {
  if (!video.dataset.src || video.src) {
    return;
  }
  video.src = video.dataset.src;
  video.load();
}

if ("IntersectionObserver" in window) {
  const loadObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          loadLazyVideo(entry.target);
          loadObserver.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "400px" }
  );

  document.querySelectorAll("video.lazy-video").forEach(video => {
    loadObserver.observe(video);
  });

  const playObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (!video.src && video.dataset.src) {
            loadLazyVideo(video);
          }
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll("video").forEach(video => {
    playObserver.observe(video);
  });
}
