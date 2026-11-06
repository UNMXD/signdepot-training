// Cursor color trail (trial, Nov 6): soft brand-color dots follow the mouse
// and fade out. Desktop mouse only; respects reduced-motion settings.
(function () {
  if (!window.matchMedia) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var COLORS = ['#F45501', '#0A1D93', '#FF8A50', '#5B74E8'];
  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var dots = [];
  var lastX = null, lastY = null, colorIdx = 0, running = false;

  function spawn(x, y) {
    if (dots.length > 140) dots.shift();
    dots.push({
      x: x, y: y,
      r: 3 + Math.random() * 3.5,
      life: 1,
      decay: 0.022 + Math.random() * 0.012,
      drift: (Math.random() - 0.5) * 0.4,
      color: COLORS[colorIdx++ % COLORS.length]
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots = dots.filter(function (d) { return d.life > 0; });
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      d.life -= d.decay;
      d.y -= 0.35;
      d.x += d.drift;
      ctx.globalAlpha = Math.max(d.life, 0) * 0.85;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(d.x, d.y, Math.max(d.r * d.life, 0.4), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (dots.length) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  document.addEventListener('mousemove', function (e) {
    var x = e.clientX, y = e.clientY;
    if (lastX !== null) {
      var dx = x - lastX, dy = y - lastY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var steps = Math.min(Math.floor(dist / 7), 12);
      for (var i = 1; i <= steps; i++) {
        spawn(lastX + (dx * i) / (steps + 1), lastY + (dy * i) / (steps + 1));
      }
    }
    spawn(x, y);
    lastX = x; lastY = y;
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });

  document.addEventListener('mouseleave', function () { lastX = lastY = null; });
})();
