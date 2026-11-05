// Simple step checkboxes: saves progress on this device, updates the counter.
(function () {
  var boxes = document.querySelectorAll('.stepcheck');
  if (!boxes.length) return;
  var key = 'sd-steps:' + location.pathname;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) {}
  var es = (document.documentElement.lang || 'en').indexOf('es') === 0;
  function update() {
    var done = 0;
    boxes.forEach(function (b, i) {
      var card = b.closest('.step');
      if (b.checked) { done++; if (card) card.classList.add('done'); }
      else if (card) card.classList.remove('done');
      saved[i] = b.checked;
    });
    try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {}
    var t = document.querySelector('.progresstext');
    if (t) t.textContent = es ? (done + ' de ' + boxes.length + ' pasos listos')
                               : (done + ' of ' + boxes.length + ' steps done');
    var bar = document.querySelector('.progress .bar');
    if (bar) bar.style.width = (boxes.length ? Math.round(done / boxes.length * 100) : 0) + '%';
    var ad = document.querySelector('.alldone');
    if (ad) ad.hidden = done !== boxes.length;
  }
  boxes.forEach(function (b, i) { b.checked = !!saved[i]; b.addEventListener('change', update); });
  update();
})();
