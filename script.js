// ── Floating Petals ──
const petalEmojis = ['🍃', '🌿', '✦', '·', '🍵'];
const container = document.getElementById('petals');

function createPetal() {
  const p = document.createElement('div');
  p.classList.add('petal');
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  p.style.left = Math.random() * 100 + 'vw';
  const dur = 7 + Math.random() * 10;
  const delay = Math.random() * 6;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = delay + 's';
  p.style.fontSize = (10 + Math.random() * 14) + 'px';
  p.style.opacity = 0;
  container.appendChild(p);
  setTimeout(() => p.remove(), (dur + delay) * 1000);
}

// Spawn petals
setInterval(createPetal, 700);
for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 200);

// ── Scroll Reveal ──
const revealTargets = [
  document.querySelector('.letter-paper'),
  document.querySelector('.closing-content'),
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => { if (el) observer.observe(el); });

// ── Parallax Hero ──
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const scrollY = window.scrollY;
  if (hero) {
    hero.style.backgroundPositionY = scrollY * 0.4 + 'px';
  }
  const glow = document.querySelector('.hero-glow');
  if (glow && scrollY < window.innerHeight) {
    glow.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }
});

// ── Wax Seal delay ──
const seal = document.querySelector('.wax-seal');
if (seal) {
  seal.style.animationDelay = '1.2s';
}

// ── Music Player ──
const musicAudio = document.getElementById('musicAudio');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const musicIcon = document.getElementById('musicIcon');
const musicCard = document.getElementById('musicCard');
const musicFill = document.getElementById('musicFill');
const musicCurrent = document.getElementById('musicCurrent');
const musicTotal = document.getElementById('musicTotal');

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

if (musicAudio && musicPlayBtn) {
  musicPlayBtn.addEventListener('click', () => {
    if (musicAudio.paused) {
      musicAudio.play().catch(() => { });
      musicIcon.textContent = '⏸';
      musicCard.classList.add('playing');
    } else {
      musicAudio.pause();
      musicIcon.textContent = '▶';
      musicCard.classList.remove('playing');
    }
  });

  musicAudio.addEventListener('timeupdate', () => {
    if (musicAudio.duration) {
      const pct = (musicAudio.currentTime / musicAudio.duration) * 100;
      musicFill.style.width = pct + '%';
      musicCurrent.textContent = formatTime(musicAudio.currentTime);
    }
  });

  musicAudio.addEventListener('loadedmetadata', () => {
    musicTotal.textContent = formatTime(musicAudio.duration);
  });

  musicAudio.addEventListener('ended', () => {
    musicIcon.textContent = '▶';
    musicCard.classList.remove('playing');
    musicFill.style.width = '0%';
    musicCurrent.textContent = '0:00';
  });
}

// ── Voice Message ──
const voiceAudio = document.getElementById('voiceAudio');
const voicePlayBtn = document.getElementById('voicePlayBtn');
const voiceIcon = document.getElementById('voiceIcon');
const voiceBubble = document.getElementById('voiceBubble');
const voiceDur = document.getElementById('voiceDuration');

if (voiceAudio && voicePlayBtn) {
  voicePlayBtn.addEventListener('click', () => {
    if (voiceAudio.paused) {
      voiceAudio.play().catch(() => { });
      voiceIcon.textContent = '⏸';
      voiceBubble.classList.add('playing');
    } else {
      voiceAudio.pause();
      voiceIcon.textContent = '▶';
      voiceBubble.classList.remove('playing');
    }
  });

  voiceAudio.addEventListener('timeupdate', () => {
    voiceDur.textContent = formatTime(voiceAudio.currentTime);
  });

  voiceAudio.addEventListener('ended', () => {
    voiceIcon.textContent = '▶';
    voiceBubble.classList.remove('playing');
    voiceDur.textContent = '0:00';
  });
}

// ── Passcode Logic ──
const correctPasscode = "sethseth07"; // <--- CHANGE THIS TO YOUR SECRET PASSWORD
const overlay = document.getElementById('passcode-overlay');
const passInput = document.getElementById('passcodeInput');
const passBtn = document.getElementById('passcodeBtn');
const passError = document.getElementById('passcodeError');
const passContainer = document.querySelector('.passcode-container');

if (overlay && passInput && passBtn) {
  // Lock body initially
  document.body.classList.add('locked');

  function checkPasscode() {
    const value = passInput.value.trim().toLowerCase();
    if (value === correctPasscode.toLowerCase()) {
      // Correct!
      overlay.classList.add('hidden');
      document.body.classList.remove('locked');
      passError.classList.remove('show');

      setTimeout(() => {
        overlay.style.display = 'none';
      }, 800);
    } else {
      // Incorrect!
      passError.classList.add('show');
      passContainer.classList.add('shake');
      setTimeout(() => {
        passContainer.classList.remove('shake');
      }, 400);
      passInput.value = '';
      passInput.focus();
    }
  }

  passBtn.addEventListener('click', checkPasscode);
  passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkPasscode();
    }
  });
}
