/* =========================================
   TravelEase — auth.js
   Sign In / Sign Up Logic
   ========================================= */

// ===== TAB SWITCHING =====
function showLogin() {
  document.getElementById('tab-login').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');
  document.getElementById('tab-indicator').classList.remove('right');
  showForm('login-form');
  clearErrors();
}

function showSignup() {
  document.getElementById('tab-signup').classList.add('active');
  document.getElementById('tab-login').classList.remove('active');
  document.getElementById('tab-indicator').classList.add('right');
  showForm('signup-form');
  clearErrors();
}

function showForgot() {
  showForm('forgot-form');
}

function showForm(id) {
  ['login-form', 'signup-form', 'forgot-form', 'success-panel'].forEach(f => {
    const el = document.getElementById(f);
    if (el) el.style.display = f === id ? 'block' : 'none';
  });
}

// ===== TOGGLE PASSWORD =====
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

// ===== PASSWORD STRENGTH =====
function checkStrength() {
  const pw = document.getElementById('su-password').value;
  const fill = document.getElementById('pw-fill');
  const label = document.getElementById('pw-label');

  let strength = 0;
  if (pw.length >= 8) strength++;
  if (/[A-Z]/.test(pw)) strength++;
  if (/[0-9]/.test(pw)) strength++;
  if (/[^A-Za-z0-9]/.test(pw)) strength++;

  const levels = [
    { w: '0%',   color: 'transparent', text: '' },
    { w: '25%',  color: '#e05252',     text: 'Weak',      textColor: '#e05252' },
    { w: '55%',  color: '#e09a52',     text: 'Fair',      textColor: '#e09a52' },
    { w: '78%',  color: '#c9a84c',     text: 'Good',      textColor: '#c9a84c' },
    { w: '100%', color: '#0a7e8c',     text: 'Strong',    textColor: '#0a7e8c' },
  ];

  const lv = levels[pw.length === 0 ? 0 : strength] || levels[1];
  fill.style.width = pw.length === 0 ? '0%' : lv.w;
  fill.style.background = lv.color;
  label.textContent = lv.text;
  label.style.color = lv.textColor || 'transparent';
}

// ===== VALIDATION HELPERS =====
function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== LOGIN HANDLER =====
function handleLogin() {
  clearErrors();
  const email = document.getElementById('login-email').value.trim();
  const pw    = document.getElementById('login-password').value;
  let valid = true;

  if (!email) {
    setError('login-email-err', 'Email is required.'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('login-email-err', 'Enter a valid email address.'); valid = false;
  }

  if (!pw) {
    setError('login-pw-err', 'Password is required.'); valid = false;
  } else if (pw.length < 6) {
    setError('login-pw-err', 'Password must be at least 6 characters.'); valid = false;
  }

  if (!valid) return;

  // Simulate login
  const btn = document.querySelector('#login-form .btn-primary');
  setLoading(btn, true);

  setTimeout(() => {
    setLoading(btn, false);
    showForm('success-panel');
    showToast('Welcome back! Redirecting you to Palawan…');
  }, 1400);
}

// ===== SIGNUP HANDLER =====
function handleSignup() {
  clearErrors();
  const fname   = document.getElementById('su-firstname').value.trim();
  const lname   = document.getElementById('su-lastname').value.trim();
  const email   = document.getElementById('su-email').value.trim();
  const pw      = document.getElementById('su-password').value;
  const confirm = document.getElementById('su-confirm').value;
  let valid = true;

  if (!fname) { setError('su-fname-err', 'First name is required.'); valid = false; }
  if (!lname) { setError('su-lname-err', 'Last name is required.'); valid = false; }

  if (!email) {
    setError('su-email-err', 'Email is required.'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('su-email-err', 'Enter a valid email address.'); valid = false;
  }

  if (!pw) {
    setError('su-pw-err', 'Password is required.'); valid = false;
  } else if (pw.length < 8) {
    setError('su-pw-err', 'Password must be at least 8 characters.'); valid = false;
  }

  if (!confirm) {
    setError('su-conf-err', 'Please confirm your password.'); valid = false;
  } else if (pw !== confirm) {
    setError('su-conf-err', 'Passwords do not match.'); valid = false;
  }

  if (!valid) return;

  const btn = document.querySelector('#signup-form .btn-primary');
  setLoading(btn, true);

  setTimeout(() => {
    setLoading(btn, false);
    showForm('success-panel');
    showToast(`Welcome, ${fname}! Your account has been created.`);
  }, 1600);
}

// ===== FORGOT PASSWORD HANDLER =====
function handleForgot() {
  clearErrors();
  const email = document.getElementById('forgot-email').value.trim();

  if (!email) {
    setError('forgot-err', 'Email is required.'); return;
  }
  if (!isValidEmail(email)) {
    setError('forgot-err', 'Enter a valid email address.'); return;
  }

  const btn = document.querySelector('#forgot-form .btn-primary');
  setLoading(btn, true);

  setTimeout(() => {
    setLoading(btn, false);
    document.getElementById('forgot-success').style.display = 'block';
    showToast('Reset link sent! Check your inbox.');
  }, 1200);
}


// ===== LOADING STATE =====
function setLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span><span>Please wait…</span>';
    btn.style.opacity = '0.7';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    btn.style.opacity = '';
    btn.disabled = false;
  }
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Keyboard: Enter on inputs triggers submit
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const form = document.getElementById('login-form');
    const su   = document.getElementById('signup-form');
    const fg   = document.getElementById('forgot-form');
    if (form && form.style.display !== 'none') handleLogin();
    else if (su && su.style.display !== 'none') handleSignup();
    else if (fg && fg.style.display !== 'none') handleForgot();
  });
});
