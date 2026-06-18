const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>QueueLess | Express Pre-Ordering</title>
  
  <!-- CDNs -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              orange: '#FF6B00',
              green: '#8CC63F',
              slate: '#333333',
              dark: '#2B2B2B',
              cream: '#FFFDF9'
            }
          },
          fontFamily: {
            display: ['Lilita One', 'cursive'],
            body: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    /* Custom utility classes */
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, h4, h5, h6, .font-display { font-family: 'Lilita One', cursive; letter-spacing: 0.05em; }
    
    .wavy-bottom {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }
    
    .wavy-bottom svg {
      display: block;
      width: calc(100% + 1.3px);
      height: 40px;
    }
  </style>
</head>
<body class="bg-brand-cream text-brand-slate antialiased">

  <!-- ==========================================
       HEADER COMPONENT
       ========================================== -->
  <header class="sticky top-0 bg-white shadow-md z-50 flex justify-between items-center px-6 py-4">
    <!-- Logo -->
    <a href="#" class="flex items-center space-x-2">
      <div class="w-10 h-10 bg-brand-orange text-white rounded-lg flex items-center justify-center font-display text-2xl shadow-lg">Q</div>
      <span class="font-display text-2xl text-brand-slate tracking-wide">Queue<span class="text-brand-orange">Less</span></span>
    </a>

    <!-- Navigation -->
    <nav>
      <ul class="hidden lg:flex space-x-8 text-sm font-bold tracking-wider text-brand-slate">
        <li><a href="#" class="hover:text-brand-orange transition">HOME</a></li>
        <li class="relative group">
          <a href="#promo-cards" class="hover:text-brand-orange transition flex items-center">
            FEATURES <i data-lucide="chevron-down" class="w-4 h-4 ml-1"></i>
          </a>
          <!-- Dropdown Logic -->
          <div class="hidden group-hover:block absolute top-full left-0 mt-2 w-48 bg-brand-orange text-white rounded shadow-xl overflow-hidden">
            <a href="#happy-hour" class="block px-4 py-3 hover:bg-white hover:text-brand-orange transition">Live Tracking</a>
            <a href="#taste-carousel" class="block px-4 py-3 hover:bg-white hover:text-brand-orange transition">UPI Payments</a>
          </div>
        </li>
        <li><a href="#taste-carousel" class="hover:text-brand-orange transition">MENU</a></li>
        <li><a href="#reserve" class="hover:text-brand-orange transition">DEMO</a></li>
      </ul>
    </nav>

    <!-- Right Action Container -->
    <div class="flex items-center space-x-6">
      <div class="relative cursor-pointer hover:text-brand-orange transition">
        <i data-lucide="shopping-bag" class="w-6 h-6"></i>
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">2</span>
      </div>
      <button class="hidden md:block bg-brand-green text-white px-6 py-2.5 rounded font-display tracking-widest text-lg hover:bg-opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-brand-green/30">
        ORDER NOW
      </button>
      <!-- Mobile Menu Button -->
      <button id="burger-menu-btn" class="lg:hidden text-brand-slate">
        <i data-lucide="menu" class="w-8 h-8"></i>
      </button>
    </div>
  </header>

  <!-- Mobile Nav Drawer -->
  <div id="mobile-nav-drawer" class="hidden fixed inset-0 z-40 bg-white pt-24 px-6">
    <ul class="space-y-6 text-2xl font-display text-center">
      <li><a href="#" class="text-brand-slate hover:text-brand-orange">HOME</a></li>
      <li><a href="#promo-cards" class="text-brand-slate hover:text-brand-orange">FEATURES</a></li>
      <li><a href="#taste-carousel" class="text-brand-slate hover:text-brand-orange">MENU</a></li>
      <li><a href="#reserve" class="text-brand-slate hover:text-brand-orange">DEMO</a></li>
    </ul>
  </div>

  <!-- ==========================================
       HERO SECTION
       ========================================== -->
  <section id="hero" class="relative h-[85vh] bg-cover bg-center flex flex-col items-center justify-center text-center text-white" style="background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000');">
    <!-- Overlay -->
    <div class="absolute inset-0 z-0 bg-black/60"></div>
    
    <!-- Content -->
    <div class="relative z-10 px-4 max-w-4xl">
      <p class="italic font-bold text-2xl text-brand-orange mb-2">Ready to reclaim your lunch break?</p>
      <h1 class="text-6xl md:text-8xl font-display uppercase my-4 drop-shadow-xl text-white">SKIP THE LINE!</h1>
      <p class="text-xl md:text-2xl text-gray-200 mb-8 font-medium">Order from Central Campus Kitchen directly to the express lane. Hot food, zero waiting.</p>
      <button class="bg-brand-green text-white px-10 py-4 rounded-full font-display text-2xl tracking-wider transition hover:scale-105 hover:bg-white hover:text-brand-green shadow-2xl">
        EXPLORE MENU
      </button>
    </div>

    <!-- Wavy Bottom Border SVG -->
    <div class="wavy-bottom text-brand-cream">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,110.15,190,85.64,233.15,67.75,277.6,56.57,321.39,56.44Z"></path>
      </svg>
    </div>
  </section>

  <!-- ==========================================
       PROMOTIONAL CARDS (FEATURES)
       ========================================== -->
  <section id="promo-cards" class="py-24 bg-brand-cream text-center">
    <!-- Title -->
    <h2 class="text-4xl text-brand-orange font-display mb-2">Hola Christites!</h2>
    <h3 class="text-5xl md:text-6xl font-display text-brand-slate uppercase mb-16">DITCH THE WAIT!</h3>

    <!-- Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-8 shadow-xl border-t-8 border-brand-green transition-transform duration-300 hover:scale-105 group">
        <div class="w-20 h-20 bg-brand-cream rounded-full mx-auto flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
          <i data-lucide="clock" class="w-10 h-10 text-brand-green group-hover:text-white"></i>
        </div>
        <h4 class="text-2xl font-display text-brand-slate mb-3 uppercase">Live Tracking</h4>
        <p class="text-gray-600 font-medium">Watch real-time queue lengths at Ivy Hall before you even leave your classroom.</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-8 shadow-xl border-t-8 border-brand-orange transition-transform duration-300 hover:scale-105 group">
        <div class="w-20 h-20 bg-brand-cream rounded-full mx-auto flex items-center justify-center mb-6 group-hover:bg-brand-green transition-colors">
          <i data-lucide="smartphone-nfc" class="w-10 h-10 text-brand-orange group-hover:text-white"></i>
        </div>
        <h4 class="text-2xl font-display text-brand-slate mb-3 uppercase">Instant UPI</h4>
        <p class="text-gray-600 font-medium">Skip the cash counter completely. Pay securely using GPay, Paytm, or PhonePe instantly.</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-8 shadow-xl border-t-8 border-brand-slate transition-transform duration-300 hover:scale-105 group">
        <div class="w-20 h-20 bg-brand-cream rounded-full mx-auto flex items-center justify-center mb-6 group-hover:bg-brand-slate transition-colors">
          <i data-lucide="flame" class="w-10 h-10 text-brand-slate group-hover:text-white"></i>
        </div>
        <h4 class="text-2xl font-display text-brand-slate mb-3 uppercase">Express Pickup</h4>
        <p class="text-gray-600 font-medium">Your food is prepped while you walk. Grab it hot from the dedicated express lane.</p>
      </div>

    </div>
  </section>

  <!-- ==========================================
       SPLIT FEATURE BANNER (HAPPY HOUR)
       ========================================== -->
  <section id="happy-hour" class="grid grid-cols-1 md:grid-cols-2 items-center bg-white overflow-hidden">
    <!-- Left Column (Image) -->
    <div class="relative h-[400px] md:h-[600px] bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=1000');">
      <!-- Orange Price/Stat Sticker -->
      <div class="absolute top-8 right-8 md:top-12 md:right-12 w-32 h-32 rounded-full bg-brand-orange shadow-2xl flex flex-col justify-center items-center text-white font-display border-4 border-white animate-pulse z-10 rotate-12">
        <span class="text-4xl leading-none">22</span>
        <span class="text-sm tracking-wider uppercase">Min Saved</span>
      </div>
    </div>

    <!-- Right Column (Text) -->
    <div class="p-12 md:p-24 bg-brand-slate text-white h-full flex flex-col justify-center">
      <h2 class="text-5xl md:text-7xl font-display text-brand-green mb-6 uppercase">Let's Grab A Bite!</h2>
      <p class="text-xl text-gray-300 mb-10 leading-relaxed font-medium">Why waste half your break in the basement canteen queue? Pre-order your snacks, get an exact prep time, and walk straight to the counter. It's like having a VIP pass to the cafeteria.</p>
      <div class="flex flex-wrap gap-4">
        <button class="bg-brand-orange text-white px-8 py-3 rounded-full font-display text-xl tracking-wider hover:bg-white hover:text-brand-orange transition-colors">
          SEE HOW IT WORKS
        </button>
      </div>
    </div>
  </section>

  <!-- ==========================================
       PARALLAX SECTION
       ========================================== -->
  <section id="parallax" class="relative bg-fixed bg-cover bg-center py-40 text-white overflow-hidden" style="background-image: url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=2000');">
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/50"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-6 flex justify-end">
      <!-- Large circular badge -->
      <div class="w-64 h-64 md:w-80 md:h-80 rounded-full bg-brand-green/90 backdrop-blur-sm border-8 border-white/20 flex flex-col justify-center items-center text-center p-8 shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
        <h3 class="text-4xl md:text-5xl font-display uppercase mb-2">Christ Exclusive</h3>
        <p class="text-sm md:text-base font-bold uppercase tracking-widest text-brand-dark">Built by students, for students.</p>
      </div>
    </div>

    <!-- Wavy Bottom Border -->
    <div class="wavy-bottom text-white">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,110.15,190,85.64,233.15,67.75,277.6,56.57,321.39,56.44Z"></path>
      </svg>
    </div>
  </section>

  <!-- ==========================================
       FOOD CAROUSEL (SWIPER)
       ========================================== -->
  <section id="taste-carousel" class="py-24 bg-white relative">
    <div class="text-center mb-16">
      <h2 class="text-3xl text-brand-green font-display mb-2">Campus Favorites</h2>
      <h3 class="text-6xl font-display text-brand-slate uppercase">MENU HIGHLIGHTS</h3>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative">
      <div class="swiper-container mySwiper pb-16">
        <div class="swiper-wrapper">
          
          <!-- Slide 1 -->
          <div class="swiper-slide text-center flex flex-col items-center group cursor-pointer">
            <div class="overflow-hidden rounded-full border-8 border-brand-green mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <img class="w-48 h-48 md:w-64 md:h-64 object-cover" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500" alt="Burger" />
            </div>
            <h3 class="text-3xl font-display text-brand-slate group-hover:text-brand-orange transition-colors">ARTISANAL BURGER</h3>
            <p class="text-brand-orange font-bold text-xl mt-2 mb-3">₹95</p>
            <p class="text-sm text-gray-500 max-w-xs font-medium">Double patty with extra cheese, prepped hot from the grill.</p>
          </div>

          <!-- Slide 2 -->
          <div class="swiper-slide text-center flex flex-col items-center group cursor-pointer">
            <div class="overflow-hidden rounded-full border-8 border-brand-orange mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <img class="w-48 h-48 md:w-64 md:h-64 object-cover" src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500" alt="Coffee" />
            </div>
            <h3 class="text-3xl font-display text-brand-slate group-hover:text-brand-green transition-colors">COLD BREW</h3>
            <p class="text-brand-green font-bold text-xl mt-2 mb-3">₹60</p>
            <p class="text-sm text-gray-500 max-w-xs font-medium">Refresh yourself instantly between back-to-back lectures.</p>
          </div>

          <!-- Slide 3 -->
          <div class="swiper-slide text-center flex flex-col items-center group cursor-pointer">
            <div class="overflow-hidden rounded-full border-8 border-brand-slate mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <img class="w-48 h-48 md:w-64 md:h-64 object-cover" src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=500" alt="Biryani" />
            </div>
            <h3 class="text-3xl font-display text-brand-slate group-hover:text-brand-orange transition-colors">LUCKNOWI BIRYANI</h3>
            <p class="text-brand-orange font-bold text-xl mt-2 mb-3">₹150</p>
            <p class="text-sm text-gray-500 max-w-xs font-medium">The Friday special, secured before it sells out.</p>
          </div>

          <!-- Slide 4 -->
          <div class="swiper-slide text-center flex flex-col items-center group cursor-pointer">
            <div class="overflow-hidden rounded-full border-8 border-brand-green mb-6 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <img class="w-48 h-48 md:w-64 md:h-64 object-cover" src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=500" alt="Dosa" />
            </div>
            <h3 class="text-3xl font-display text-brand-slate group-hover:text-brand-orange transition-colors">MASALA DOSA</h3>
            <p class="text-brand-orange font-bold text-xl mt-2 mb-3">₹45</p>
            <p class="text-sm text-gray-500 max-w-xs font-medium">Crispy, hot, and ready in 3 minutes.</p>
          </div>

        </div>
        <!-- Add Navigation -->
        <div class="swiper-button-next text-brand-orange font-bold"></div>
        <div class="swiper-button-prev text-brand-orange font-bold"></div>
      </div>
    </div>
  </section>

  <!-- ==========================================
       DARK THEME MENU
       ========================================== -->
  <section id="dark-menu" class="bg-brand-dark py-24 text-white relative">
    <div class="max-w-4xl mx-auto px-6 relative z-10">
      
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-display text-white uppercase tracking-wide">Live Menu Updates</h2>
        <div class="w-24 h-2 bg-brand-orange mx-auto mt-6"></div>
      </div>

      <div class="grid grid-cols-1 gap-6">
        
        <!-- Menu Item Row -->
        <div class="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=150" class="w-20 h-20 rounded-xl object-cover border-2 border-brand-orange group-hover:border-brand-green transition-colors">
          <div class="ml-6 flex-1">
            <h4 class="text-2xl font-display uppercase tracking-wide">Cheese Burger</h4>
            <p class="text-sm text-gray-400 mt-1">Available at Main Food Court</p>
          </div>
          <div class="text-3xl font-display text-brand-green">₹95</div>
        </div>

        <!-- Menu Item Row -->
        <div class="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=150" class="w-20 h-20 rounded-xl object-cover border-2 border-brand-orange group-hover:border-brand-green transition-colors">
          <div class="ml-6 flex-1">
            <h4 class="text-2xl font-display uppercase tracking-wide">Chicken Biryani</h4>
            <p class="text-sm text-gray-400 mt-1">Available at Block IV Canteen</p>
          </div>
          <div class="text-3xl font-display text-brand-green">₹150</div>
        </div>

        <!-- Menu Item Row -->
        <div class="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=150" class="w-20 h-20 rounded-xl object-cover border-2 border-brand-orange group-hover:border-brand-green transition-colors">
          <div class="ml-6 flex-1">
            <h4 class="text-2xl font-display uppercase tracking-wide">Iced Mocha</h4>
            <p class="text-sm text-gray-400 mt-1">Available at Ivy Hall</p>
          </div>
          <div class="text-3xl font-display text-brand-green">₹75</div>
        </div>

      </div>

      <div class="text-center mt-12">
        <button class="bg-transparent border-4 border-brand-orange text-brand-orange px-8 py-3 rounded-full font-display text-xl tracking-wider hover:bg-brand-orange hover:text-white transition-colors">
          VIEW FULL MENU
        </button>
      </div>

    </div>

    <!-- Wavy Bottom Border -->
    <div class="wavy-bottom text-brand-slate">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,110.15,190,85.64,233.15,67.75,277.6,56.57,321.39,56.44Z"></path>
      </svg>
    </div>
  </section>

  <!-- ==========================================
       TEAM GRID / CAMPUS LIFE
       ========================================== -->
  <section class="bg-brand-slate py-16">
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-0">
      <img src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400" class="w-full h-48 md:h-64 object-cover filter hover:brightness-110 transition cursor-pointer">
      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" class="w-full h-48 md:h-64 object-cover filter hover:brightness-110 transition cursor-pointer">
      <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=400" class="w-full h-48 md:h-64 object-cover filter hover:brightness-110 transition cursor-pointer hidden md:block">
      <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400" class="w-full h-48 md:h-64 object-cover filter hover:brightness-110 transition cursor-pointer">
      <div class="bg-brand-orange w-full h-48 md:h-64 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-brand-green transition-colors">
        <i data-lucide="instagram" class="w-12 h-12 mb-2"></i>
        <span class="font-display tracking-widest text-xl">@QUEUELESS</span>
      </div>
    </div>
  </section>

  <!-- ==========================================
       RESERVATION / PRE-ORDER FORM UI
       ========================================== -->
  <section id="reserve" class="relative bg-cover bg-center py-32 text-white" style="background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-brand-slate/90 backdrop-blur-sm"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <h2 class="text-5xl md:text-7xl font-display text-brand-green mb-12 uppercase">Simulate An Order</h2>
      
      <form class="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-md">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <!-- Select Campus -->
          <div class="flex flex-col space-y-2">
            <label class="font-bold text-brand-orange uppercase text-sm tracking-widest">Campus</label>
            <select class="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:bg-white focus:text-brand-slate outline-none font-medium appearance-none">
              <option value="" disabled selected>Select Campus</option>
              <option class="text-brand-slate">Central Campus</option>
              <option class="text-brand-slate">BGR Campus</option>
            </select>
          </div>

          <!-- Select Item -->
          <div class="flex flex-col space-y-2">
            <label class="font-bold text-brand-orange uppercase text-sm tracking-widest">Item</label>
            <select class="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:bg-white focus:text-brand-slate outline-none font-medium appearance-none">
              <option value="" disabled selected>Select Dish</option>
              <option class="text-brand-slate">Cheese Burger</option>
              <option class="text-brand-slate">Cold Brew</option>
            </select>
          </div>

          <!-- Select Time -->
          <div class="flex flex-col space-y-2">
            <label class="font-bold text-brand-orange uppercase text-sm tracking-widest">Pickup Time</label>
            <input type="time" class="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:bg-white focus:text-brand-slate outline-none font-medium">
          </div>

          <!-- Phone -->
          <div class="flex flex-col space-y-2">
            <label class="font-bold text-brand-orange uppercase text-sm tracking-widest">Phone</label>
            <input type="tel" placeholder="+91" class="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:bg-white focus:text-brand-slate outline-none font-medium placeholder-white/50">
          </div>

        </div>

        <!-- Checkbox Row -->
        <div class="mt-8 flex items-center justify-center space-x-3">
          <input type="checkbox" id="terms" class="w-5 h-5 accent-brand-green rounded cursor-pointer">
          <label for="terms" class="text-sm font-medium text-gray-300">I agree to the QueueLess campus pre-order terms and conditions.</label>
        </div>

        <!-- Submit -->
        <div class="mt-10">
          <button type="submit" class="bg-brand-green text-white px-12 py-4 rounded-full font-display text-2xl tracking-widest uppercase hover:scale-105 hover:bg-brand-orange transition-all shadow-xl shadow-brand-green/20">
            SIMULATE NOW
          </button>
        </div>
      </form>
    </div>
  </section>

  <!-- ==========================================
       FOOTER
       ========================================== -->
  <footer class="bg-[#1C1C1C] text-gray-400 py-16 text-center border-t border-gray-800">
    <div class="max-w-4xl mx-auto px-6">
      
      <!-- Brand -->
      <div class="flex justify-center items-center space-x-2 mb-8">
        <div class="w-12 h-12 bg-brand-orange text-white rounded-lg flex items-center justify-center font-display text-3xl shadow-lg">Q</div>
        <span class="font-display text-4xl text-white tracking-wide">Queue<span class="text-brand-orange">Less</span></span>
      </div>

      <!-- Links -->
      <div class="flex flex-wrap justify-center gap-8 font-bold tracking-widest text-sm mb-10 text-gray-300">
        <a href="#" class="hover:text-brand-green transition">ABOUT US</a>
        <a href="#" class="hover:text-brand-green transition">LOCATIONS</a>
        <a href="#" class="hover:text-brand-green transition">CAREERS</a>
        <a href="#" class="hover:text-brand-green transition">CONTACT</a>
      </div>

      <!-- Social -->
      <div class="flex justify-center space-x-6 mb-10">
        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition">
          <i data-lucide="facebook" class="w-5 h-5"></i>
        </a>
        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition">
          <i data-lucide="twitter" class="w-5 h-5"></i>
        </a>
        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-white transition">
          <i data-lucide="instagram" class="w-5 h-5"></i>
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-sm font-medium text-gray-600">
        &copy; 2026 QueueLess Web Systems. Built for Christ University.<br>
        Inspired by Gustavo Mexican Grill Layout.
      </p>

    </div>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;

fs.writeFileSync('build_index.js', `const fs = require('fs');
const htmlContent = ${JSON.stringify(htmlContent)};
fs.writeFileSync('index.html', htmlContent);
console.log('Successfully wrote index.html');`);
