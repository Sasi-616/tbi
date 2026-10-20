/**
 * VFSTR TBI COUNCIL · TECHNOLOGY BUSINESS INCUBATOR (VIGNAN TBI)
 * Supported by DST, Govt. of India | NIDHI i-TBI Council Vadlamudi, Guntur
 * Interactive UI Engine & Web Application Architecture
 */

document.addEventListener('DOMContentLoaded', () => {

  // 0. Initialize Lucide Icons
  const initLucide = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
  initLucide();

  // 1. Site Preloader Fadeout
  const preloader = document.getElementById('sitePreloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 350);
    });
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1200);
  }

  // Quick Text Announcement Ticker Cycler
  const quickTickerEl = document.getElementById('quickTextTicker');
  if (quickTickerEl) {
    const announcements = [
      'Applications Open: DST NIDHI PRAYAS Grants (Up to ₹10 Lakhs) & EIR Stipends (Cohort 2026)',
      'State-of-the-Art Labs: Supercritical CO2, Biotech Diagnostics & IoT Makerspace at VFSTR',
      '40+ DeepTech Startups Scaled with Dedicated University Research Labs & Seed Funding',
      'Visit Us: 2nd Floor, Nagarjuna Bhavan, Vadlamudi, Guntur · Call +91 85008 97550'
    ];
    let announcementIndex = 0;
    setInterval(() => {
      announcementIndex = (announcementIndex + 1) % announcements.length;
      quickTickerEl.style.transition = 'opacity 0.3s ease';
      quickTickerEl.style.opacity = '0';
      setTimeout(() => {
        quickTickerEl.textContent = announcements[announcementIndex];
        quickTickerEl.style.opacity = '1';
      }, 300);
    }, 4500);
  }
  // 2. Sticky Navigation & Header Transitions
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Active Link Highlighter in Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html') || (linkHref && linkHref.includes(currentPath) && currentPath !== '')) {
      link.classList.add('active');
    }
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('translate-x-full');
    });
  }

  if (closeDrawer && mobileDrawer) {
    closeDrawer.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
    });
  }

  // 4. Floating Action Dock & Scroll Progress Ring
  const scrollProgressBtn = document.getElementById('scrollProgressBtn');
  const progressRingCircle = document.querySelector('.progress-ring-circle');

  if (scrollProgressBtn) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

      if (scrollTop > 280) {
        scrollProgressBtn.classList.add('visible');
      } else {
        scrollProgressBtn.classList.remove('visible');
      }

      if (progressRingCircle) {
        const circumference = 138;
        const offset = circumference - (scrollPercent * circumference);
        progressRingCircle.style.strokeDashoffset = offset;
      }
    }, { passive: true });

    scrollProgressBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Speed-Dial Floating Menu
  const speedDialTrigger = document.getElementById('speedDialTrigger');
  const speedDialContainer = document.getElementById('speedDialContainer');
  if (speedDialTrigger && speedDialContainer) {
    speedDialTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      speedDialContainer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!speedDialContainer.contains(e.target)) {
        speedDialContainer.classList.remove('open');
      }
    });
  }

  // 5. Animated Number Counters
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
          const duration = 1800;
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const easeOut = progress * (2 - progress);
            const currentVal = target * easeOut;

            el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            }
          };

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // 6. Universal Modal Management
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      initLucide();
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = trigger.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // 7. Toast Notification System
  window.showToast = (message, type = 'info') => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconName = 'info';
    let borderColor = '#FF6F00';
    if (type === 'success') {
      iconName = 'check-circle-2';
      borderColor = '#10B981';
    } else if (type === 'error') {
      iconName = 'alert-triangle';
      borderColor = '#EF4444';
    }

    toast.style.borderLeftColor = borderColor;
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 shrink-0" style="color: ${borderColor}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    initLucide();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // 8. Live Startup & Application Milestone Tracker
  const startupDatabase = {
    'VTBI-AGRI-2024': {
      id: 'VTBI-AGRI-2024',
      name: 'Smart Chilli Crop Sorter & Moisture Predictor',
      founder: 'K. Ramesh & Team (Agri-Tech)',
      cohort: 'DST NIDHI Cohort 2024',
      stage: 'Seed Fund Deployed & Field Pilot Testing',
      stageIndex: 3,
      labAllocated: 'Agri-Biotech & Sensor Testing Facility (Nagarjuna Bhavan)',
      mentor: 'Prof. D. Vijaya Ramu & Regional Agriculture Board',
      grantApproved: '₹10,00,000 (DST NIDHI PRAYAS)',
      lastUpdate: 'Field trials completed in Guntur mirchi market. 12 commercial pilots active.',
      milestones: [
        { title: 'Technical Screening', date: 'March 14, 2024', status: 'completed' },
        { title: 'IdeaIgnite Prototype Validation', date: 'May 02, 2024', status: 'completed' },
        { title: 'Nagarjuna Bhavan Lab Allocation', date: 'June 18, 2024', status: 'completed' },
        { title: 'DST Seed Committee Review', date: 'August 10, 2024', status: 'completed' },
        { title: 'Commercial Pilot & Scale-Up', date: 'October 2024', status: 'active' }
      ]
    },
    'VTBI-BIO-1082': {
      id: 'VTBI-BIO-1082',
      name: 'Shubhakruth Medical Genetics Pvt. Ltd. (SMGPL)',
      founder: 'Dr. Naga Simhadri Allu & Team',
      cohort: 'Health-Tech Incubation 2022',
      stage: 'Graduated / Scaling Diagnostics & Reagents B2B',
      stageIndex: 4,
      labAllocated: 'Biotechnology CoE & Molecular Diagnostics Cleanroom',
      mentor: 'VFSTR TBI Council Mentorship Panel',
      grantApproved: 'DST Seed Support & Private Co-investment',
      lastUpdate: 'Incorporated April 2022. Serving 500+ hospital partners across Andhra Pradesh with clinical NGS and indigenous biochemistry reagents.',
      milestones: [
        { title: 'Incubation Intake', date: 'April 2022', status: 'completed' },
        { title: 'Genomics Wet-Lab Setup', date: 'September 2022', status: 'completed' },
        { title: 'DST NIDHI Grant Matching', date: 'January 2023', status: 'completed' },
        { title: 'Reagents & Kits Certification', date: 'November 2023', status: 'completed' },
        { title: 'Pan-India Hospital Network Scale', date: '2024-Present', status: 'completed' }
      ]
    },
    'VTBI-NRG-3045': {
      id: 'VTBI-NRG-3045',
      name: 'Hybrid Bio-Solar Cold Storage for Perishables',
      founder: 'P. Venkat & Team (CleanTech)',
      cohort: 'Clean Energy Track 2024',
      stage: 'Lab Prototyping & Patent Filing',
      stageIndex: 2,
      labAllocated: 'Centre of Excellence in Renewable Energy & Hybrid Systems',
      mentor: 'Prof. B. Nageswara Rao (Co-Investigator DST NIDHI)',
      grantApproved: '₹5,00,000 (Ignition Prototyping Grant)',
      lastUpdate: 'Thermal efficiency tests completed at 3.5 kW solar-biomass hybrid unit.',
      milestones: [
        { title: 'Initial Screening', date: 'June 01, 2024', status: 'completed' },
        { title: 'IdeaIgnite Pitch Cleared', date: 'July 15, 2024', status: 'completed' },
        { title: 'Energy CoE Bench Allocation', date: 'August 22, 2024', status: 'active' },
        { title: 'Seed Fund Review', date: 'Pending', status: 'pending' },
        { title: 'Field Pilot Deployment', date: 'Pending', status: 'pending' }
      ]
    },
    'VTBI-WST-5012': {
      id: 'VTBI-WST-5012',
      name: 'Agro-Residue Bio-Char & Circular Carbon Materials',
      founder: 'M. Sridevi & Team',
      cohort: 'Circular Economy Track 2023',
      stage: 'Incubation & Commercial Pilot',
      stageIndex: 3,
      labAllocated: 'Waste Valorization & Chemical Engineering Facility',
      mentor: 'Industry Partner Efftronics & VFSTR Chemistry Faculty',
      grantApproved: '₹7,50,000 Seed Grant',
      lastUpdate: 'Supply agreement signed for 50 tonnes of soil amendment char.',
      milestones: [
        { title: 'Screening & Onboarding', date: 'November 2023', status: 'completed' },
        { title: 'Chemical Characterization', date: 'February 2024', status: 'completed' },
        { title: 'Pilot Pyrolysis Run', date: 'May 2024', status: 'completed' },
        { title: 'Seed Grant Deployed', date: 'July 2024', status: 'completed' },
        { title: 'Commercial Offtake Agreements', date: 'Ongoing', status: 'active' }
      ]
    },
    'VTBI-DEEP-7788': {
      id: 'VTBI-DEEP-7788',
      name: 'Edge AI Drone Vision for Cotton Pest Detection',
      founder: 'A. Harsha & B. Teja (Student Founders)',
      cohort: 'DeepTech Innovation Sprint 2024',
      stage: 'Pre-Incubation & MVP Prototyping',
      stageIndex: 1,
      labAllocated: 'IoT & Embedded Systems Prototype Lab',
      mentor: 'T-Hub & AP Innovation Society Ecosystem Mentor',
      grantApproved: '₹3,00,000 (Student Pre-Incubation Grant)',
      lastUpdate: 'Dataset of 45,000 leaf images trained with 94.2% mAP accuracy.',
      milestones: [
        { title: 'Campus Hackathon Selection', date: 'August 2024', status: 'completed' },
        { title: 'Pre-Incubation Agreement', date: 'September 2024', status: 'completed' },
        { title: 'IoT Lab Hardware Testing', date: 'October 2024', status: 'active' },
        { title: 'Field Validation', date: 'Upcoming', status: 'pending' },
        { title: 'Full Incubation Onboarding', date: 'Upcoming', status: 'pending' }
      ]
    }
  };



  // 9. Interactive Incubation Journey Stepper Tabs
  const journeyStages = [
    {
      num: '01',
      title: 'Call for Applications & Technical Screening',
      subtitle: 'Open to Students, Faculty, Alumni & Regional Innovators',
      desc: 'Submit your concept deck covering problem statement, target users, market sizing, and technology domain. Our technical committee reviews technical feasibility, novelty, and alignment with the four thrust sectors: Agritech, Biotech, Clean Energy, and Waste Valorization.',
      deliverables: ['Problem-Solution Fit Evaluation', 'Intellectual Property Screening', 'Initial Mentor Feedback Note', 'Fast-Track WhatsApp Routing'],
      duration: '7 to 10 Working Days'
    },
    {
      num: '02',
      title: 'IdeaIgnite & Pre-Incubation Bootcamp',
      subtitle: 'From Raw Concept to Validated Proof-of-Concept (PoC)',
      desc: 'Selected candidates join our structured Pre-Incubation program. Access prototyping equipment, lab workstations at Nagarjuna Bhavan, and weekly sprints with seasoned entrepreneurs to develop a functional minimum viable product (MVP). Over 93+ campus teams have graduated through this phase.',
      deliverables: ['Hands-on Faculty & Industry Mentorship', 'Rapid Prototyping Lab Access', 'Pre-Seed Ignition Grants up to ₹3L', 'Customer Discovery Sprints'],
      duration: '3 to 6 Months'
    },
    {
      num: '03',
      title: 'Full Incubation & CoE Infrastructure Access',
      subtitle: 'Official Onboarding with Dedicated Labs & IP Support',
      desc: 'Enter formal incubation as a registered entity. Access 10,000+ sq.ft. of world-class facilities: Biotechnology Cleanrooms, Centre of Excellence in Renewable Energy, Embedded IoT Lab, and Food Quality Testing Suites. Complete support for company incorporation, GST, and patent filing.',
      deliverables: ['Dedicated Lab Benches & Equipment', 'Section 8 Council Incubation Agreement', 'Comprehensive IP & Patent Drafting Support', 'Subsidized Co-Working & Cloud Credits'],
      duration: '18 to 24 Months'
    },
    {
      num: '04',
      title: 'Seed Fund Deployment & DST NIDHI Grants',
      subtitle: 'Catalytic Funding from ₹10 Lakhs to ₹50 Lakhs',
      desc: 'Eligible startups pitch before the DST NIDHI Investment Committee. Vignan TBI deploys seed support through DST NIDHI PRAYAS (prototyping grant up to ₹10L), NIDHI EIR (entrepreneur-in-residence monthly fellowship), and Seed Support System equity/debt tranches.',
      deliverables: ['₹60 Lakhs+ Seed Funds Already Deployed', 'DST NIDHI Committee Direct Review', 'Tranche-Based Milestone Disbursements', 'Financial & Compliance Auditing Support'],
      duration: 'Disbursed Across Milestones'
    },
    {
      num: '05',
      title: 'Commercialization, Enterprise Pilots & Market Scale',
      subtitle: 'Connecting with Industry, Buyers, and Venture Capital',
      desc: 'Transform into high-growth commercial enterprises. Leverage Vignan TBI’s strategic partnerships with T-Hub, APSSDC, AP Innovation Society, Efftronics, and regional agricultural bodies to secure purchase orders, enterprise pilots, and follow-on Series A venture investments.',
      deliverables: ['Direct Connections to 50+ Corporate Partners', 'Investor Pitch Days (StartUp Spark)', 'Trade Fair & Demonstration Showcase', 'National Incubation Network Alumni Access'],
      duration: 'Ongoing Scaling Partnership'
    }
  ];

  const journeyCards = document.querySelectorAll('.specimen-step-card');
  const journeyDisplayContainer = document.getElementById('journeyDetailDisplay');

  const renderJourneyDetail = (index) => {
    const stage = journeyStages[index];
    if (!stage || !journeyDisplayContainer) return;

    journeyDisplayContainer.innerHTML = `
      <div class="p-8 lg:p-10 bg-white rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
        <div class="absolute top-0 right-0 w-36 h-36 bg-orange-100/40 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span class="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-orange-100 text-brand-orange mb-2">Stage ${stage.num}</span>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">${stage.title}</h3>
            <p class="text-sm font-semibold text-brand-orange mt-1">${stage.subtitle}</p>
          </div>
          <div class="text-right">
            <span class="text-xs text-gray-400 block font-medium">Typical Duration</span>
            <span class="text-sm font-extrabold text-gray-800">${stage.duration}</span>
          </div>
        </div>
        <p class="text-gray-600 text-base leading-relaxed mt-6">${stage.desc}</p>
        <div class="mt-8 pt-6 border-t border-gray-100">
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Key Stage Deliverables & Milestones</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            ${stage.deliverables.map(deliv => `
              <div class="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></i>
                <span class="text-xs sm:text-sm font-semibold text-gray-800">${deliv}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <button data-open-modal="modal-apply-incubation" class="px-6 py-3 bg-brand-orange hover:bg-brand-accent text-white font-bold text-sm rounded-xl transition duration-200 shadow-lg shadow-orange-500/25 flex items-center gap-2">
            <span>Apply for Stage ${stage.num}</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
          <a href="programs.html" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition flex items-center gap-2">
            <span>View All Programs</span>
          </a>
        </div>
      </div>
    `;
    initLucide();
  };

  if (journeyCards.length > 0) {
    journeyCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        journeyCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        renderJourneyDetail(idx);
      });
    });
    // Initial render
    renderJourneyDetail(0);
  }

  // 10. Interactive FAQs Accordion & Category Filter
  const faqCards = document.querySelectorAll('.faq-card');
  const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
  const faqSearchInput = document.getElementById('faqSearchInput');

  faqCards.forEach(card => {
    const header = card.querySelector('.faq-card-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        faqCards.forEach(c => c.classList.remove('open'));
        if (!isOpen) card.classList.add('open');
      });
    }
  });

  const filterFaqs = () => {
    const activeCat = document.querySelector('.faq-cat-btn.active')?.getAttribute('data-cat') || 'all';
    const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : '';

    faqCards.forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const text = card.textContent.toLowerCase();
      const matchesCat = (activeCat === 'all' || cat === activeCat);
      const matchesQuery = (query === '' || text.includes(query));

      if (matchesCat && matchesQuery) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (faqCatBtns.length > 0) {
    faqCatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        faqCatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterFaqs();
      });
    });
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', filterFaqs);
  }

  // 11. Grant & Seed Funding Calculator
  const calcStage = document.getElementById('calcStage');
  const calcSector = document.getElementById('calcSector');
  const calcOutputGrant = document.getElementById('calcOutputGrant');
  const calcOutputScheme = document.getElementById('calcOutputScheme');
  const calcOutputLab = document.getElementById('calcOutputLab');

  const updateCalculator = () => {
    if (!calcStage || !calcSector || !calcOutputGrant) return;
    const stage = calcStage.value;
    const sector = calcSector.value;

    let grant = '₹3,00,000 - ₹5,00,000';
    let scheme = 'IdeaIgnite Prototype Grant';
    let lab = 'Makerspace & Prototyping Workstations';

    if (stage === 'idea') {
      grant = '₹2,50,000 - ₹4,00,000';
      scheme = 'Pre-Incubation Ignition Grant';
      lab = 'Faculty Mentor Desk & Prototyping Lab';
    } else if (stage === 'prototype') {
      grant = '₹5,00,000 - ₹10,00,000';
      scheme = 'DST NIDHI PRAYAS Prototyping Support';
      lab = 'Sector-Specific Specialized Lab (Nagarjuna Bhavan)';
    } else if (stage === 'mvp') {
      grant = '₹10,00,000 - ₹25,00,000';
      scheme = 'DST NIDHI Seed Support System (SSS)';
      lab = 'Full Incubation Suite & CoE Testing Access';
    } else if (stage === 'scale') {
      grant = '₹25,00,000 - ₹50,00,000';
      scheme = 'Vignan TBI Growth & Investor Co-Investment';
      lab = 'Commercial Pilot Facility & High-Throughput Testbed';
    }

    if (sector === 'agri') {
      lab += ' · Soil & Food Quality Testing Suite';
    } else if (sector === 'bio') {
      lab += ' · Molecular Biology & Diagnostic Cleanroom';
    } else if (sector === 'energy') {
      lab += ' · Solar PV & Biomass Hybrid Test Facility';
    } else if (sector === 'waste') {
      lab += ' · Chemical Analysis & Pyrolysis Testbed';
    }

    if (calcOutputGrant) calcOutputGrant.textContent = grant;
    if (calcOutputScheme) calcOutputScheme.textContent = scheme;
    if (calcOutputLab) calcOutputLab.textContent = lab;
  };

  if (calcStage && calcSector) {
    calcStage.addEventListener('change', updateCalculator);
    calcSector.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // 12. Form Submissions & WhatsApp Notifications
  const handleIncubationForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="founder_name"]')?.value || 'Founder';
    const email = form.querySelector('[name="email"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const startup = form.querySelector('[name="startup_name"]')?.value || 'New Venture';
    const sector = form.querySelector('[name="sector"]')?.value || 'Agritech';
    const summary = form.querySelector('[name="summary"]')?.value || '';

    window.showToast(`Application submitted successfully for ${startup}! Redirecting to incubation desk...`, 'success');

    // Build WhatsApp message
    const waText = encodeURIComponent(
      `Hello Vignan TBI Council!\n\nI have submitted an Incubation Application.\n\nFounder: ${name}\nStartup: ${startup}\nSector: ${sector}\nPhone: ${phone}\nEmail: ${email}\nBrief: ${summary}\n\nPlease review my application at Vadlamudi campus.`
    );

    setTimeout(() => {
      const waUrl = `https://wa.me/918500897550?text=${waText}`;
      window.open(waUrl, '_blank');
      const modal = form.closest('.modal-overlay');
      if (modal) closeModal(modal);
      form.reset();
    }, 1500);
  };

  const appForm = document.getElementById('incubationApplicationForm');
  if (appForm) {
    appForm.addEventListener('submit', handleIncubationForm);
  }

  const tourForm = document.getElementById('bookTourForm');
  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Campus & Lab visit request recorded! Our incubation desk will confirm your appointment.', 'success');
      const modal = tourForm.closest('.modal-overlay');
      if (modal) closeModal(modal);
      tourForm.reset();
    });
  }

  // 12. Animated Number Counters (Ecosystem Metrics Roll-Up)
  const initCounters = () => {
    const counterElements = document.querySelectorAll('.stat-number, [data-counter-target]');
    if (!counterElements.length) return;

    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-counter-target'));
      if (isNaN(target)) return;
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease-out curve
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = (target * easeProgress).toFixed(decimals);
        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => observer.observe(el));
  };
  initCounters();

  // 13. Synchronized Hero Image & Text Slider
  const initHeroSlider = () => {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;

    const bgSlides = slider.querySelectorAll('.hero-slide-bg');
    const textSlides = slider.querySelectorAll('.hero-text-slide');
    const dots = slider.querySelectorAll('.hero-slider-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const counterEl = document.getElementById('heroSlideCounter');

    if (!bgSlides.length || !textSlides.length) return;

    let currentIndex = 0;
    const totalSlides = bgSlides.length;
    let autoInterval = null;

    const showSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;

      // Update background images
      bgSlides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update text slides
      textSlides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.style.display = 'block';
          slide.classList.remove('hidden');
          requestAnimationFrame(() => {
            slide.classList.add('active');
          });
        } else {
          slide.style.display = 'none';
          slide.classList.remove('active');
          slide.classList.add('hidden');
        }
      });

      // Update dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active', 'w-8', 'bg-brand-orange');
          dot.classList.remove('w-2.5', 'bg-white/40');
        } else {
          dot.classList.remove('active', 'w-8', 'bg-brand-orange');
          dot.classList.add('w-2.5', 'bg-white/40');
        }
      });

      // Update slide counter
      if (counterEl) {
        counterEl.textContent = `0${currentIndex + 1} / 0${totalSlides}`;
      }

      // Re-init icons inside newly displayed slide
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    const startAutoPlay = () => {
      stopAutoPlay();
      autoInterval = setInterval(nextSlide, 5500);
    };

    const stopAutoPlay = () => {
      if (autoInterval) clearInterval(autoInterval);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-slide-target') || '0', 10);
        showSlide(targetIdx);
        startAutoPlay();
      });
    });

    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    showSlide(0);
    startAutoPlay();
  };
  initHeroSlider();

});
