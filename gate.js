// Management gate — a light lock for the Management pages.
// This is a speed bump, not real security: the site is public, so anything
// truly sensitive lives in the private Drive folder, never here.
// Once unlocked, the browser remembers it for this session only.
(function () {
  var PW = 'D3P0T';
  var KEY = 'sdMgmtOk';
  var es = (document.documentElement.lang || 'en').toLowerCase().indexOf('es') === 0;
  var T = es ? {
    title: 'Gerencia',
    sub: 'Solo gerentes. Escribe la contraseña para continuar.',
    ph: 'Contraseña',
    btn: 'Abrir',
    err: 'Esa contraseña no es correcta. Inténtalo de nuevo.',
    back: '← Volver a la Biblioteca de Capacitación',
    backHref: 'index.html'
  } : {
    title: 'Management',
    sub: 'Managers only. Enter the password to continue.',
    ph: 'Password',
    btn: 'Unlock',
    err: 'That password is not right. Try again.',
    back: '← Back to the Training Library',
    backHref: 'index.html'
  };

  function unlocked() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function unlock() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
  }

  function showGate(onSuccess) {
    if (document.querySelector('.gate-overlay')) return;
    var ov = document.createElement('div');
    ov.className = 'gate-overlay';
    ov.innerHTML =
      '<div class="gate-card">' +
      '<svg class="gate-lock" viewBox="0 0 24 24" width="54" height="54" aria-hidden="true"><path fill="#0A1D93" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9z"/></svg>' +
      '<h2>' + T.title + '</h2>' +
      '<p>' + T.sub + '</p>' +
      '<form class="gate-form">' +
      '<input class="gate-input" type="password" autocomplete="off" placeholder="' + T.ph + '" aria-label="' + T.ph + '">' +
      '<button class="gate-btn" type="submit">' + T.btn + '</button>' +
      '</form>' +
      '<p class="gate-err" hidden></p>' +
      '<a class="gate-back" href="' + T.backHref + '">' + T.back + '</a>' +
      '</div>';
    document.body.appendChild(ov);
    document.body.classList.add('gate-locked');
    var input = ov.querySelector('.gate-input');
    var err = ov.querySelector('.gate-err');
    input.focus();
    ov.querySelector('.gate-form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (input.value === PW) {
        unlock();
        ov.remove();
        document.body.classList.remove('gate-locked');
        if (onSuccess) onSuccess();
      } else {
        err.textContent = T.err;
        err.hidden = false;
        input.value = '';
        input.focus();
      }
    });
  }

  var onMgmtPage = /(^|\/)management\.html$/.test(window.location.pathname);
  if (onMgmtPage && !unlocked()) {
    showGate(null);
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest ? ev.target.closest('a[href$="management.html"]') : null;
    if (!a || onMgmtPage) return;
    if (unlocked()) return;
    ev.preventDefault();
    var href = a.getAttribute('href');
    showGate(function () { window.location.href = href; });
  });
})();
