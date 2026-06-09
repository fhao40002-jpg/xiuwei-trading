/* ===== 秀威供应链 · 交互脚本 ===== */

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Scroll animation - fade in elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Also animate service cards, flow nodes, stat items
document.querySelectorAll('.service-card, .flow-node, .stat-item, .section-header').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.padding = '0.7rem 4rem';
    navbar.style.background = 'rgba(10,14,20,0.96)';
  } else {
    navbar.style.padding = '1.2rem 4rem';
    navbar.style.background = 'rgba(10,14,20,0.92)';
  }
});

// Active nav link highlighting based on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Form submission - mailto + FormSubmit fallback
function sendInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('inqName').value.trim();
  const company = document.getElementById('inqCompany').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const category = document.getElementById('inqCategory').value;
  const message = document.getElementById('inqMessage').value.trim();

  const subject = encodeURIComponent(`秀威供应链询盘 - ${category} - from ${name}`);
  const body = encodeURIComponent(
    `姓名: ${name}\n公司: ${company}\n邮箱: ${email}\n品类: ${category}\n留言: ${message}\n---\n发送自: 秀威供应链官网`
  );

  // Open email client
  window.location.href = `mailto:fhao40002@gmail.com?subject=${subject}&body=${body}`;

  // Also try to silently POST to FormSubmit as backup
  fetch('https://formsubmit.co/fhao40002@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `姓名=${encodeURIComponent(name)}&公司=${encodeURIComponent(company)}&邮箱=${encodeURIComponent(email)}&品类=${encodeURIComponent(category)}&留言=${encodeURIComponent(message)}&_subject=${subject}&_template=table&_captcha=false`
  }).catch(() => {});

  return false;
}

// Smooth counter animation for stats
function animateCounter(el, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    const current = start + (target - start) * eased;

    if (target === 3) {
      el.textContent = Math.floor(current);
    } else if (target === 15) {
      el.textContent = Math.floor(current) + '+';
    } else if (target === 50) {
      el.textContent = '$' + Math.floor(current) + 'M+';
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Trigger counter animation when stats are visible
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const values = [3, 15, 50];
      nums.forEach((num, i) => {
        // Only animate once
        if (!num.dataset.animated) {
          num.dataset.animated = 'true';
          animateCounter(num, values[i]);
        }
      });
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statObserver.observe(statsSection);

console.log('秀威供应链 · Xiuwei Supply Chain · www.xiuwei-trading.com');
