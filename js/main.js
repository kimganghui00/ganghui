document.addEventListener("DOMContentLoaded", function () {
  // Header Scroll Effect
  const header = document.querySelector("#header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("on", window.scrollY > 0);
  });

  // SVG Animation
  document.querySelectorAll(".svg-main path").forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.setProperty("--length", length);
    path.style.setProperty("--duration", `${length}ms`);
    path.style.setProperty("--delay", `${i * 60}ms`);
  });

  // Swiper Slide
  new Swiper(".web-slide", {
    pagination: { el: ".swiper-pagination" },
  });

  // GNB (Global Navigation Bar)
  const menuItems = document.querySelectorAll(".menu");
  const sections = document.querySelectorAll("section");

  function changeActiveMenuItem() {
    let index = sections.length;
    while (--index && window.scrollY + 200 < sections[index].offsetTop) {}

    menuItems.forEach((item) => item.classList.remove("active"));
    if (index >= 0) menuItems[index].classList.add("active");
  }

  changeActiveMenuItem();
  window.addEventListener("scroll", changeActiveMenuItem);

  menuItems.forEach((item) =>
    item.addEventListener("click", () => {
      const target = document.getElementById(item.getAttribute("data-target"));
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    })
  );

  // Image Gallery Modal
  const images = document.querySelectorAll(".gallery-item img");
  const modal = document.getElementById("imageModal");
  const modalContainer = document.querySelector(".modal-container");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let imgIndex = 0;

  modal.removeAttribute("hidden"); // 모달이 DOM에서 정상적으로 추가되도록 설정

  function openModal(index) {
    imgIndex = index;
    modalImg.src = images[imgIndex].src;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    modalContainer.scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  images.forEach((img, i) =>
    img.addEventListener("click", () => openModal(i))
  );

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function changeImage(direction) {
    imgIndex = (imgIndex + direction + images.length) % images.length;
    modalImg.src = images[imgIndex].src;
    modalContainer.scrollTop = 0;
  }

  prevBtn.addEventListener("click", () => changeImage(-1));
  nextBtn.addEventListener("click", () => changeImage(1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
  });
});