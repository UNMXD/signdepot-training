// Simple step checkboxes: saves progress on this device, updates the counter.
// Each .steps block (one Part of a lesson, or one whole page) gets its own
// counter, progress bar, and "done" line. Saved checks are stored by their
// page-wide index, so adding a Part later does not scramble earlier Parts.
(function () {
  var allBoxes = document.querySelectorAll('.stepcheck');
  if (!allBoxes.length) return;
  var key = 'sd-steps:' + location.pathname;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
  var es = (document.documentElement.lang || 'en').indexOf('es') === 0;

  var groups = [];
  document.querySelectorAll('.steps').forEach(function (stepsEl) {
    var boxes = Array.prototype.slice.call(stepsEl.querySelectorAll('.stepcheck'));
    if (!boxes.length) return;
    var wrap = null, n = stepsEl.previousElementSibling;
    while (n) { if (n.classList && n.classList.contains('progresswrap')) { wrap = n; break; } n = n.previousElementSibling; }
    var doneEl = null; n = stepsEl.nextElementSibling;
    while (n) { if (n.classList && n.classList.contains('alldone')) { doneEl = n; break; } n = n.nextElementSibling; }
    groups.push({ boxes: boxes, wrap: wrap, doneEl: doneEl });
  });

  function update() {
    allBoxes.forEach(function (b, i) { saved[i] = b.checked; });
    try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {}
    groups.forEach(function (g) {
      var done = 0;
      g.boxes.forEach(function (b) {
        var card = b.closest('.step');
        if (b.checked) { done++; if (card) card.classList.add('done'); }
        else if (card) card.classList.remove('done');
      });
      if (g.wrap) {
        var t = g.wrap.querySelector('.progresstext');
        if (t) t.textContent = es ? (done + ' de ' + g.boxes.length + ' pasos listos')
                                  : (done + ' of ' + g.boxes.length + ' steps done');
        var bar = g.wrap.querySelector('.progress .bar');
        if (bar) bar.style.width = (g.boxes.length ? Math.round(done / g.boxes.length * 100) : 0) + '%';
      }
      if (g.doneEl) g.doneEl.hidden = done !== g.boxes.length;
    });
  }
  allBoxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener('change', update); });
  update();
})();
