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

// TESTIMONIALS SCROLL BUTTONS
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialsPrev = document.querySelector('.testimonial-control--prev');
const testimonialsNext = document.querySelector('.testimonial-control--next');

if (testimonialsTrack && testimonialsPrev && testimonialsNext) {
  const testimonialCards = testimonialsTrack.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;
  const testimonialCount = testimonialCards.length;

  const getScrollStep = () => {
    const style = window.getComputedStyle(testimonialsTrack);
    const gap = parseFloat(style.gap) || 24;
    return testimonialCards[0].offsetWidth + gap;
  };

  const scrollToTestimonial = (index) => {
    const step = getScrollStep();
    testimonialsTrack.scrollTo({ left: index * step, behavior: 'smooth' });
  };

  const testimonialDotsContainer = document.querySelector('.testimonial-dots');
  const testimonialDots = [];

  const updateActiveDot = () => {
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentTestimonial);
    });
  };

  const renderDots = () => {
    if (!testimonialDotsContainer) return;
    testimonialDotsContainer.innerHTML = '';
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        scrollToTestimonial(currentTestimonial);
        updateActiveDot();
        resetTestimonialsAutoScroll();
      });
      testimonialDotsContainer.appendChild(dot);
      testimonialDots.push(dot);
    });
  };

  const syncDotsToScroll = () => {
    const step = getScrollStep();
    const nearestIndex = Math.round(testimonialsTrack.scrollLeft / step);
    if (nearestIndex !== currentTestimonial && nearestIndex >= 0 && nearestIndex < testimonialCount) {
      currentTestimonial = nearestIndex;
      updateActiveDot();
    }
  };

  let scrollTicking = false;
  testimonialsTrack.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        syncDotsToScroll();
        scrollTicking = false;
      });
    }
  });

  const showPrev = () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
    scrollToTestimonial(currentTestimonial);
    updateActiveDot();
  };

  const showNext = () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    scrollToTestimonial(currentTestimonial);
    updateActiveDot();
  };

  testimonialsPrev.addEventListener('click', () => {
    showPrev();
    resetTestimonialsAutoScroll();
  });

  testimonialsNext.addEventListener('click', () => {
    showNext();
    resetTestimonialsAutoScroll();
  });

  renderDots();
  updateActiveDot();

  let testimonialsTimer = setInterval(() => {
    showNext();
  }, 5000);

  const resetTestimonialsAutoScroll = () => {
    clearInterval(testimonialsTimer);
    testimonialsTimer = setInterval(() => {
      showNext();
    }, 5000);
  };
}

// DROPDOWN ON MOBILE DEIVCES

const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    
    // jeśli kliknięto w link w dropdown → NIE blokuj
    if (e.target.closest('.dropdown__menu a')) {
      return; // pozwól przejść do strony
    }

    // klik tylko w toggle (Behandlinger)
    const trigger = e.target.closest('.nav__link');
    if (!trigger) return;

    e.preventDefault();

    // zamknij inne
    dropdownItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    // toggle
    item.classList.toggle('active');
  });
});