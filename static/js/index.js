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

const lazyVideos = Array.from(document.querySelectorAll("video.lazy-video"));

function loadLazyVideo(video) {
  if (!video.dataset.src || video.currentSrc) {
    return;
  }

  video.src = video.dataset.src;
  video.load();
}

lazyVideos.forEach(video => {
  video.addEventListener("pointerdown", () => {
    loadLazyVideo(video);
  });

  video.addEventListener("click", () => {
    loadLazyVideo(video);
    video.play().catch(() => undefined);
  });

  video.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      loadLazyVideo(video);
      video.play().catch(() => undefined);
    }
  });
});

const videos = Array.from(document.querySelectorAll("video")).filter(video => !video.classList.contains("lazy-video"));

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

  videos.forEach(video => observer.observe(video));
}
