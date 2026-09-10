/* Vora landing — page behaviour (spec §5). No dependencies. Loaded with `defer` before the scene module. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var loader = document.getElementById('loader');
  var header = document.querySelector('.top');
  var heroFoot = document.querySelector('.hero-foot');
  var heroFootInner = document.querySelector('.hf-inner') as HTMLElement | null;
  var coords = document.getElementById('coords');
  var GLYPHS = '0123456789ABCDEF';
  var loaderDone = false;
  var revealsStarted = false;
  var glitchReady = false;

  /* 1. Loader — hides on the scene's first frame, on scene failure, or at 2.5 s, whichever is first. */
  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    if (loader) {
      loader.classList.add('is-done');
      if (reduced) loader.classList.add('is-hidden');
      else setTimeout(function () { loader!.classList.add('is-hidden'); }, 1000);
    }
    enter();
    startReveals();
  }
  document.addEventListener('vora:scene', finishLoader);
  if (root.dataset.scene || reduced) finishLoader();
  else setTimeout(finishLoader, 2500);

  /* 2. Entrance of the header and hero footer, 150 ms apart. */
  function enter() {
    var items = document.querySelectorAll<HTMLElement>('[data-enter]');
    for (var i = 0; i < items.length; i++) {
      items[i].style.setProperty('--i', String(i));
      items[i].classList.add('is-in');
    }
  }

  /* 3. Reveals on scroll: masked words and fade-ups, staggered among siblings. */
  function startReveals() {
    if (revealsStarted) return;
    revealsStarted = true;
    setTimeout(function () { glitchReady = true; }, 2600);

    var targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    var i, j;
    for (i = 0; i < targets.length; i++) {
      var el = targets[i];
      var idx = 0;
      var sib = el.previousElementSibling;
      while (sib) { if (sib.hasAttribute('data-reveal')) idx++; sib = sib.previousElementSibling; }
      el.style.setProperty('--i', String(idx));
      var words = el.querySelectorAll<HTMLElement>('.mask-word');
      for (j = 0; j < words.length; j++) words[j].style.setProperty('--i', String(j));
    }
    /* The hero staggers across all of its masked lines and words, like the template. */
    var heroWords = document.querySelectorAll<HTMLElement>('.hero .mask-word');
    for (j = 0; j < heroWords.length; j++) heroWords[j].style.setProperty('--i', String(j));

    if (reduced || !('IntersectionObserver' in window)) {
      for (i = 0; i < targets.length; i++) { targets[i].classList.add('is-in'); targets[i].classList.add('is-open'); decode(targets[i]); }
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (!entries[k].isIntersecting) continue;
        entries[k].target.classList.add('is-in');
        decode(entries[k].target as HTMLElement);
        open(entries[k].target);
        io.unobserve(entries[k].target);
      }
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
    for (i = 0; i < targets.length; i++) io.observe(targets[i]);
  }

  /* Masks stay on only while the words rise (1.4 s + stagger); afterwards focus rings must not be clipped. */
  function open(el: Element) {
    setTimeout(function () { el.classList.add('is-open'); }, 2400);
  }

  /* 4. Decode-in: hex glyphs resolve into the real text, left to right (chrom.ar pattern). */
  function decode(container: HTMLElement) {
    if (reduced) return;
    var nodes = container.querySelectorAll('[data-decode]');
    var base = (parseInt(container.style.getPropertyValue('--i'), 10) || 0) * 250;
    for (var n = 0; n < nodes.length; n++) animateDecode(nodes[n], base + n * 120);
  }
  function animateDecode(node: Element, delay: number) {
    if (node.getAttribute('data-decoded')) return;
    node.setAttribute('data-decoded', '1');
    var text = node.textContent!;
    var real = document.createElement('span');
    real.className = 'decode-real';
    real.textContent = text;
    var mirror = document.createElement('span');
    mirror.className = 'decode-mirror';
    mirror.setAttribute('aria-hidden', 'true');
    node.textContent = '';
    node.appendChild(real);
    node.appendChild(mirror);
    node.classList.add('is-animating');
    var start: number | null = null;
    var duration = 1000;
    function tick(now: number) {
      if (start === null) start = now;
      var t = Math.min(1, Math.max(0, (now - start - delay) / duration));
      var resolved = Math.floor(t * text.length);
      var out = text.slice(0, resolved);
      for (var i = resolved; i < text.length; i++) {
        out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      mirror.textContent = out;
      if (t < 1) { requestAnimationFrame(tick); return; }
      node.classList.remove('is-animating');
      mirror.textContent = '';
    }
    requestAnimationFrame(tick);
  }

  /* 5. Telemetry readout from the pointer position. */
  if (coords && fine) {
    document.addEventListener('pointermove', function (e) {
      coords!.textContent = (e.clientX / window.innerWidth).toFixed(2) + '.' + (e.clientY / window.innerHeight).toFixed(2) + '.00';
    }, { passive: true });
  }

  /* 6. Glitch on fast pointer movement — headline words only, once the reveal has finished. */
  if (fine && !reduced) {
    var glitchTargets = document.querySelectorAll<HTMLElement>('[data-glitch]');
    var lastX = 0, lastY = 0, lastT = 0;
    document.addEventListener('pointermove', function (e) {
      var now = performance.now();
      var dt = now - lastT;
      if (dt <= 40) return;
      if (lastT && glitchReady) {
        var dx = e.clientX - lastX, dy = e.clientY - lastY;
        if (Math.sqrt(dx * dx + dy * dy) / dt > 2) {
          for (var g = 0; g < glitchTargets.length; g++) glitch(glitchTargets[g]);
        }
      }
      lastX = e.clientX; lastY = e.clientY; lastT = now;
    }, { passive: true });
  }
  function glitch(el: HTMLElement) {
    if (el.getAttribute('data-glitching')) return;
    el.setAttribute('data-glitching', '1');
    el.style.transition = 'none'; /* the reveal transition would tween each 50 ms jitter over 1.4 s */
    var cycles = 0;
    function step() {
      cycles++;
      if (cycles > 8) {
        el.style.transform = '';
        el.style.textShadow = '';
        setTimeout(function () { el.style.transition = ''; el.removeAttribute('data-glitching'); }, 200);
        return;
      }
      var on = cycles % 2 === 1;
      el.style.transform = on ? 'translate(' + ((Math.random() - 0.5) * 4).toFixed(1) + 'px,' + ((Math.random() - 0.5) * 2).toFixed(1) + 'px)' : '';
      el.style.textShadow = on ? '2px 0 rgba(255,255,255,.4), -2px 0 rgba(100,100,100,.4)' : '';
      setTimeout(step, 50);
    }
    step();
  }

  /* 7. Header background and hero-footer fade, tied to scroll. */
  var scrollQueued = false;
  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(function () {
      scrollQueued = false;
      var y = window.scrollY || window.pageYOffset || 0;
      if (header) header.classList.toggle('is-scrolled', y > 40);
      if (heroFoot && heroFootInner) {
        var o = 1 - Math.min(1, y / (0.6 * window.innerHeight));
        heroFootInner!.style.opacity = o.toFixed(3);
        heroFoot.classList.toggle('is-gone', o <= 0.001);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 8. Language toggle remembers the choice for the redirect script. */
  var langLinks = document.querySelectorAll('a[data-lang]');
  for (var l = 0; l < langLinks.length; l++) {
    langLinks[l].addEventListener('click', function (e) {
      try { localStorage.setItem('vora-lang', (e.currentTarget as HTMLElement).getAttribute('data-lang')!); } catch (_) { /* storage unavailable */ }
    });
  }
}());
