//COPYRIGHT YEAR

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//STICKY NAVIGATION

if (document.querySelector(".section-natelier")) {
  const sectionHeroEl = document.querySelector(".section-natelier");
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (ent.isIntersecting === false) {
        document.body.classList.add("sticky");
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove("sticky");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    },
  );
  obs.observe(sectionHeroEl);
}

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    // Add show-menu class to nav menu
    nav.classList.toggle("show-menu");

    // Add show-icon to show and hide the menu icon
    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");

// POP UP
const openBtn = document.getElementById("pop-up-button-open");
const openBtn2 = document.getElementById("pop-up-button-open2");
const closeBtn = document.getElementById("pop-up-button-ok");
const popUp = document.getElementById("pop-up");
const overlay = document.getElementById("overlay");

openBtn.addEventListener("click", () => {
  popUp.classList.add("open");
  overlay.classList.add("active");
});

openBtn2?.addEventListener("click", () => {
  popUp.classList.add("open");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popUp.classList.remove("open");
  overlay.classList.remove("active");
});
