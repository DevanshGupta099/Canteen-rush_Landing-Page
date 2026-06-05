/* app.js - QueueLess Landing Page Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before it fully rolls in
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 2. MOBILE MENU HANDLER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // ==========================================
  // 3. LIVE QUEUE SIMULATOR
  // ==========================================
  // Canteens data
  const canteens = [
    {
      id: 'central',
      name: 'Central Campus Food Court',
      status: 'Busy',
      wait: 18,
      queue: 15,
      trend: 'increasing',
      color: 'amber'
    },
    {
      id: 'block4',
      name: 'Block IV Cafeteria',
      status: 'Crowded',
      wait: 28,
      queue: 24,
      trend: 'stable',
      color: 'red'
    },
    {
      id: 'gourmet',
      name: 'Gourmet Express (Block II)',
      status: 'Available',
      wait: 4,
      queue: 3,
      trend: 'decreasing',
      color: 'emerald'
    },
    {
      id: 'ivy',
      name: 'Ivy Hall (Faculty/PG)',
      status: 'Available',
      wait: 7,
      queue: 5,
      trend: 'stable',
      color: 'emerald'
    }
  ];

  // DOM Elements for Canteens
  const canteenListContainer = document.getElementById('canteen-list');

  // Render canteens
  function renderCanteens() {
    if (!canteenListContainer) return;
    canteenListContainer.innerHTML = '';

    canteens.forEach(canteen => {
      let badgeColor = '';
      let trendIcon = '';

      if (canteen.status === 'Available') {
        badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      } else if (canteen.status === 'Busy') {
        badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
      } else {
        badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
      }

      if (canteen.trend === 'increasing') {
        trendIcon = `<span class="flex items-center text-rose-500 text-xs font-semibold">
          <svg class="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          Rising
        </span>`;
      } else if (canteen.trend === 'decreasing') {
        trendIcon = `<span class="flex items-center text-emerald-500 text-xs font-semibold">
          <svg class="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path></svg>
          Clearing
        </span>`;
      } else {
        trendIcon = `<span class="flex items-center text-slate-400 text-xs font-semibold">
          <svg class="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"></path></svg>
          Steady
        </span>`;
      }

      const card = document.createElement('div');
      card.className = `p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 shine-hover relative overflow-hidden`;
      card.id = `canteen-card-${canteen.id}`;
      card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
          <div>
            <h4 class="font-bold text-slate-800 text-base font-heading">${canteen.name}</h4>
            <div class="flex items-center space-x-2 mt-1">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${badgeColor}">
                <span class="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></span>
                ${canteen.status}
              </span>
              ${trendIcon}
            </div>
          </div>
          <div class="text-right">
            <span class="block text-2xl font-extrabold text-slate-900 font-heading">${canteen.wait} <span class="text-xs font-medium text-slate-400">mins</span></span>
            <span class="text-xs text-slate-400">Est. wait time</span>
          </div>
        </div>

        <div class="space-y-2.5 mt-4">
          <div>
            <div class="flex justify-between text-xs text-slate-500 mb-1">
              <span>Queue Length</span>
              <span class="font-semibold text-slate-700">${canteen.queue} orders ahead</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div class="bg-christBlue-DEFAULT rounded-full h-1.5 transition-all duration-500" style="width: ${Math.min((canteen.queue / 30) * 100, 100)}%"></div>
            </div>
          </div>
        </div>
      `;

      canteenListContainer.appendChild(card);
    });
  }

  // Simulate dynamic changes in canteen queue length and wait times
  function simulateLiveActivity() {
    canteens.forEach(canteen => {
      // Small fluctuation
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      canteen.queue = Math.max(1, canteen.queue + change);
      
      // Calculate wait time: approx 1.2 mins per order
      canteen.wait = Math.round(canteen.queue * 1.2);

      // Re-evaluate status
      if (canteen.queue < 6) {
        canteen.status = 'Available';
        canteen.trend = Math.random() > 0.5 ? 'stable' : 'decreasing';
      } else if (canteen.queue < 18) {
        canteen.status = 'Busy';
        canteen.trend = Math.random() > 0.4 ? (Math.random() > 0.5 ? 'increasing' : 'decreasing') : 'stable';
      } else {
        canteen.status = 'Crowded';
        canteen.trend = Math.random() > 0.6 ? 'stable' : 'increasing';
      }
    });

    renderCanteens();

    // Pulse effects on random cards to visually confirm updates
    const randomIdx = Math.floor(Math.random() * canteens.length);
    const updatedCard = document.getElementById(`canteen-card-${canteens[randomIdx].id}`);
    if (updatedCard) {
      updatedCard.classList.add('ring-2', 'ring-christAmber-light', 'ring-opacity-40');
      setTimeout(() => {
        updatedCard.classList.remove('ring-2', 'ring-christAmber-light', 'ring-opacity-40');
      }, 800);
    }
  }

  // Initial render & set interval
  renderCanteens();
  setInterval(simulateLiveActivity, 6000); // Update canteens every 6 seconds

  // ==========================================
  // 4. INTERACTIVE PRE-ORDER DEMO SIMULATOR
  // ==========================================
  const menuItems = [
    { id: 1, name: 'Christite Paneer Burger', price: '₹95', category: 'Fast Food', rating: 4.8 },
    { id: 2, name: 'Spicy Paneer Kathi Roll', price: '₹80', category: 'Snacks', rating: 4.6 },
    { id: 3, name: 'Classic Cold Coffee', price: '₹65', category: 'Beverages', rating: 4.9 },
    { id: 4, name: 'Samosa Chat (Double)', price: '₹50', category: 'Chaats', rating: 4.5 }
  ];

  const demoItemsContainer = document.getElementById('demo-menu-items');
  const demoOrderFlow = document.getElementById('demo-order-flow');
  const startDemoBtn = document.getElementById('start-demo-btn');
  const resetDemoBtn = document.getElementById('reset-demo-btn');
  
  // Steps elements
  const stepProgressBar = document.getElementById('step-progress-bar');
  const stepDots = [
    document.getElementById('step-dot-1'),
    document.getElementById('step-dot-2'),
    document.getElementById('step-dot-3')
  ];
  const stepTitles = [
    document.getElementById('step-title-1'),
    document.getElementById('step-title-2'),
    document.getElementById('step-title-3')
  ];

  // Simulator Screen contents
  const simScreenStart = document.getElementById('sim-screen-start');
  const simScreenLoading = document.getElementById('sim-screen-loading');
  const simScreenPreparing = document.getElementById('sim-screen-preparing');
  const simScreenReady = document.getElementById('sim-screen-ready');

  // Order Details inside simulator
  const simSelectedFood = document.getElementById('sim-selected-food');
  const simSelectedPrice = document.getElementById('sim-selected-price');
  const simReadyFood = document.getElementById('sim-ready-food');
  
  let selectedFoodItem = menuItems[0];
  let simulationTimeoutId = null;

  // Render demo food items
  function renderDemoMenu() {
    if (!demoItemsContainer) return;
    demoItemsContainer.innerHTML = '';
    
    menuItems.forEach(item => {
      const itemEl = document.createElement('div');
      const isSelected = selectedFoodItem.id === item.id;
      itemEl.className = `p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex justify-between items-center ${
        isSelected 
        ? 'border-christBlue-DEFAULT bg-blue-50/50 shadow-sm' 
        : 'border-slate-100 bg-white hover:border-slate-300'
      }`;
      itemEl.innerHTML = `
        <div>
          <div class="flex items-center space-x-1">
            <span class="text-slate-800 font-semibold text-sm font-heading">${item.name}</span>
            <span class="text-xs text-slate-400">(${item.category})</span>
          </div>
          <div class="flex items-center space-x-2 mt-0.5">
            <span class="text-sm font-bold text-christBlue-DEFAULT">${item.price}</span>
            <span class="text-xs text-amber-500 flex items-center">
              <svg class="w-3 h-3 fill-current mr-0.5" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              ${item.rating}
            </span>
          </div>
        </div>
        <div class="w-5 h-5 rounded-full border flex items-center justify-center ${
          isSelected 
          ? 'border-christBlue-DEFAULT bg-christBlue-DEFAULT text-white' 
          : 'border-slate-300'
        }">
          ${isSelected ? '<svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>' : ''}
        </div>
      `;

      itemEl.addEventListener('click', () => {
        // Only allow selecting if simulation isn't running
        if (simScreenStart.classList.contains('hidden')) return;
        selectedFoodItem = item;
        simSelectedFood.innerText = item.name;
        simSelectedPrice.innerText = item.price;
        renderDemoMenu();
      });

      demoItemsContainer.appendChild(itemEl);
    });
  }

  // Pre-load default values in simulator screen
  if (simSelectedFood && simSelectedPrice) {
    simSelectedFood.innerText = selectedFoodItem.name;
    simSelectedPrice.innerText = selectedFoodItem.price;
  }
  renderDemoMenu();

  // Reset ordering simulation
  function resetSimulation() {
    if (simulationTimeoutId) clearTimeout(simulationTimeoutId);
    
    // Reset stepper
    if (stepProgressBar) stepProgressBar.style.width = '0%';
    stepDots.forEach((dot, index) => {
      if (dot) {
        dot.classList.remove('active', 'completed', 'bg-christAmber-DEFAULT', 'bg-emerald-500', 'bg-slate-300');
        if (index === 0) {
          dot.classList.add('active');
        } else {
          dot.classList.add('bg-slate-300');
        }
      }
    });
    
    stepTitles.forEach((title, index) => {
      if (title) {
        title.classList.remove('text-slate-900', 'font-bold', 'text-slate-400');
        if (index === 0) {
          title.classList.add('text-slate-900', 'font-bold');
        } else {
          title.classList.add('text-slate-400');
        }
      }
    });

    // Reset screens
    if (simScreenStart) simScreenStart.classList.remove('hidden');
    if (simScreenLoading) simScreenLoading.classList.add('hidden');
    if (simScreenPreparing) simScreenPreparing.classList.add('hidden');
    if (simScreenReady) simScreenReady.classList.add('hidden');
    
    if (startDemoBtn) startDemoBtn.disabled = false;
    if (startDemoBtn) startDemoBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    if (resetDemoBtn) resetDemoBtn.classList.add('hidden');
  }

  // Run ordering simulation step-by-step
  function runSimulation() {
    if (!startDemoBtn || startDemoBtn.disabled) return;
    
    startDemoBtn.disabled = true;
    startDemoBtn.classList.add('opacity-50', 'cursor-not-allowed');
    if (resetDemoBtn) resetDemoBtn.classList.remove('hidden');

    // --- STEP 1: PROCESSING & VERIFICATION ---
    simScreenStart.classList.add('hidden');
    simScreenLoading.classList.remove('hidden');

    // Progress Bar to 50%
    if (simulationTimeoutId) clearTimeout(simulationTimeoutId);
    
    simulationTimeoutId = setTimeout(() => {
      // Update Step 1 dot to completed
      stepDots[0].classList.remove('active');
      stepDots[0].classList.add('completed', 'bg-emerald-500');
      
      // Update Step 2 dot to active
      stepDots[1].classList.remove('bg-slate-300');
      stepDots[1].classList.add('active');
      
      stepTitles[0].classList.remove('text-slate-900', 'font-bold');
      stepTitles[0].classList.add('text-slate-400');
      stepTitles[1].classList.add('text-slate-900', 'font-bold');
      stepTitles[1].classList.remove('text-slate-400');

      if (stepProgressBar) stepProgressBar.style.width = '50%';

      // Switch screen to Step 2 details (Preparing)
      simScreenLoading.classList.add('hidden');
      simScreenPreparing.classList.remove('hidden');

      // Setup simulated countdown for preparation
      let secondsLeft = 5;
      const countdownEl = document.getElementById('sim-prep-timer');
      if (countdownEl) countdownEl.innerText = `${secondsLeft}s`;

      const countdownInterval = setInterval(() => {
        secondsLeft--;
        if (countdownEl) countdownEl.innerText = `${secondsLeft}s`;
        if (secondsLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      // --- STEP 2: PREPARING IN KITCHEN ---
      simulationTimeoutId = setTimeout(() => {
        clearInterval(countdownInterval);
        
        // Update Step 2 dot to completed
        stepDots[1].classList.remove('active');
        stepDots[1].classList.add('completed', 'bg-emerald-500');
        
        // Update Step 3 dot to active
        stepDots[2].classList.remove('bg-slate-300');
        stepDots[2].classList.add('active');
        
        stepTitles[1].classList.remove('text-slate-900', 'font-bold');
        stepTitles[1].classList.add('text-slate-400');
        stepTitles[2].classList.add('text-slate-900', 'font-bold');
        stepTitles[2].classList.remove('text-slate-400');

        if (stepProgressBar) stepProgressBar.style.width = '100%';

        // Switch screen to Step 3 details (Ready)
        simScreenPreparing.classList.add('hidden');
        simScreenReady.classList.remove('hidden');
        if (simReadyFood) simReadyFood.innerText = selectedFoodItem.name;

        // Finish Step 3 dot style
        setTimeout(() => {
          stepDots[2].classList.remove('active');
          stepDots[2].classList.add('completed', 'bg-emerald-500');
        }, 1000);

      }, 5000); // 5s kitchen time

    }, 2500); // 2.5s payment & queue validation time
  }

  if (startDemoBtn) startDemoBtn.addEventListener('click', runSimulation);
  if (resetDemoBtn) resetDemoBtn.addEventListener('click', resetSimulation);

  // ==========================================
  // 5. ACCORDION (FAQ SECTION)
  // ==========================================
  const faqButtons = document.querySelectorAll('.faq-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const icon = btn.querySelector('.faq-icon');
      
      // Close other FAQs
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          const otherParent = otherBtn.parentElement;
          const otherAnswer = otherParent.querySelector('.faq-answer');
          const otherIcon = otherBtn.querySelector('.faq-icon');
          if (otherAnswer && !otherAnswer.classList.contains('hidden')) {
            otherAnswer.classList.add('hidden');
            otherParent.classList.remove('border-christBlue-DEFAULT/40', 'bg-blue-50/10');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      // Toggle current FAQ
      if (answer) {
        const isOpen = !answer.classList.contains('hidden');
        answer.classList.toggle('hidden');
        parent.classList.toggle('border-christBlue-DEFAULT/40');
        parent.classList.toggle('bg-blue-50/10');
        
        if (icon) {
          icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      }
    });
  });
});
