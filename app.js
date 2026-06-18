// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Initialize AOS (Animate On Scroll)
AOS.init({
  once: true,
  offset: 50,
  duration: 600,
  easing: 'ease-out-cubic',
});

// 3. Initialize Swiper Carousel
const swiper = new Swiper('.menu-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// 4. Mobile Nav Drawer Toggle
const burgerBtn = document.getElementById('burger-btn');
const mobileNav = document.getElementById('mobile-nav');
if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

// 5. Dynamic Time-of-Day Greeting
const heroGreeting = document.getElementById('hero-greeting');
if (heroGreeting) {
  const currentHour = new Date().getHours();
  if (currentHour < 11) {
    heroGreeting.innerText = "Breaktime is at 11:00 AM. Pre-order now.";
  } else if (currentHour >= 11 && currentHour < 15) {
    heroGreeting.innerText = "Lunch rush is peaking. Skip the line.";
  } else {
    heroGreeting.innerText = "Evening snacks available. Order now.";
  }
}

// 6. Skeleton Loader Simulation
window.addEventListener('load', () => {
  setTimeout(() => {
    const skeletons = document.querySelectorAll('.skeleton-overlay');
    const images = document.querySelectorAll('.onload-reveal');
    
    skeletons.forEach(s => s.classList.add('hidden'));
    images.forEach(img => {
      img.classList.remove('opacity-0');
      img.classList.add('opacity-100');
    });
  }, 1500); // Simulate 1.5s network delay
});

// 7. Dietary Filter Pills Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset active styles
    filterBtns.forEach(b => {
      b.classList.remove('bg-brand-blue', 'text-white', 'border-brand-blue');
      b.classList.add('bg-white/5', 'text-slate-300', 'border-white/10');
    });
    // Set active
    btn.classList.remove('bg-white/5', 'text-slate-300', 'border-white/10');
    btn.classList.add('bg-brand-blue', 'text-white', 'border-brand-blue');

    const filter = btn.getAttribute('data-filter');

    menuItems.forEach(item => {
      if (!filter) {
        // "All Items" clicked
        item.style.display = 'flex';
      } else {
        const categories = item.getAttribute('data-category');
        if (categories && categories.includes(filter)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});

// 8. Sticky View Cart FAB Logic
const stickyCart = document.getElementById('sticky-cart-fab');
const heroSection = document.getElementById('hero');

if (stickyCart && heroSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Scrolled past hero
        stickyCart.classList.remove('translate-y-24', 'opacity-0');
        stickyCart.classList.add('translate-y-0', 'opacity-100');
      } else {
        // Hero is visible
        stickyCart.classList.add('translate-y-24', 'opacity-0');
        stickyCart.classList.remove('translate-y-0', 'opacity-100');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);
}

// 9. Social Proof "Live Feed" Simulation
const liveFeedContainer = document.getElementById('live-feed-container');
const names = ["Rahul", "Nisha", "Karan", "Priya", "Amit", "Sneha"];
const items = ["Hakka Noodles", "Butter Chicken Combo", "Kathi Roll", "Cold Coffee", "Aloo Tikki Burger"];
const canteens = ["Gourmet Express", "Main Food Court", "Block IV"];

function createToast() {
  if (!liveFeedContainer) return;
  
  const name = names[Math.floor(Math.random() * names.length)];
  const item = items[Math.floor(Math.random() * items.length)];
  const canteen = canteens[Math.floor(Math.random() * canteens.length)];

  const toast = document.createElement('div');
  toast.className = 'bg-white border-l-8 border-brand-green p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center space-x-4 toast-enter z-20 transform hover:-translate-y-1 transition-transform relative overflow-hidden w-full max-w-2xl mx-auto';
  toast.innerHTML = `
    <!-- Decor element -->
    <div class="absolute -right-4 -top-4 w-16 h-16 bg-brand-green/10 rounded-full"></div>
    <div class="w-12 h-12 bg-slate-100 rounded-full overflow-hidden shrink-0 border-2 border-brand-green shadow-sm relative z-10">
      <img src="https://i.pravatar.cc/100?u=${name}" class="w-full h-full object-cover">
    </div>
    <div class="flex-1 relative z-10">
      <p class="text-[10px] text-brand-blue font-bold uppercase tracking-widest mb-0.5 flex items-center"><i data-lucide="clock" class="w-3 h-3 mr-1"></i> Just Ordered</p>
      <p class="text-sm text-brand-dark font-medium leading-tight">
        <span class="font-display text-lg tracking-wide">${name}</span> got <span class="font-bold text-brand-green">${item}</span> from ${canteen}.
      </p>
    </div>
  `;

  liveFeedContainer.appendChild(toast);
  lucide.createIcons({ root: toast });

  // Keep max 3 toasts
  if (liveFeedContainer.children.length > 3) {
    const firstChild = liveFeedContainer.firstElementChild;
    firstChild.classList.remove('toast-enter');
    firstChild.classList.add('toast-exit');
    setTimeout(() => {
      if (firstChild.parentElement) firstChild.remove();
    }, 500);
  }
}

// Start live feed simulation
if (liveFeedContainer) {
  setTimeout(() => {
    createToast();
    setInterval(createToast, 3500); // new toast every 3.5 seconds
  }, 1000);
}
