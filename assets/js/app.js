/* ---------------------------------------------------------------
   LNPC Sanctuary AV Guide — router and renderers.

   Plain browser JavaScript, no build step and no dependencies. All
   the words live in content.js; this file only decides how they get
   put on screen.

   Routing is hash based (#/operator) so the site works on GitHub
   Pages from any sub-path, and works just as well opened straight
   off a USB stick or from a local folder.
   --------------------------------------------------------------- */

(function () {
  'use strict';

  var main    = document.getElementById('main');
  var titleEl = document.getElementById('topbar-title');
  var backEl  = document.getElementById('back-link');
  var helpEl  = document.getElementById('help-link');

  /* -------------------------------------------------------------
     Appearance: Auto / Light / Dark

     "Auto" means follow the phone, which is what most people want and
     what the site did before this control existed. Light and Dark are
     an explicit override, remembered between visits.

     The initial choice is applied by a small inline script in the head
     of index.html so there is no flash of the wrong theme; this code
     handles the buttons and keeps them in step.
     ------------------------------------------------------------- */

  var THEME_KEY    = 'lnpc.theme';
  var THEME_COLORS = { light: '#ffffff', dark: '#1e2226' };

  function savedTheme() {
    try {
      var v = window.localStorage.getItem(THEME_KEY);
      return (v === 'light' || v === 'dark') ? v : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  /* What the reader is actually looking at right now, which for "auto"
     depends on the phone rather than on anything we stored. */
  function effectiveTheme(mode) {
    if (mode !== 'auto') { return mode; }
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(mode) {
    var root = document.documentElement;

    if (mode === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }

    /* Keep the phone's browser chrome matching the page. */
    var meta = document.getElementById('theme-color');
    if (meta) { meta.setAttribute('content', THEME_COLORS[effectiveTheme(mode)]); }

    var buttons = document.querySelectorAll('[data-theme-set]');
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.setAttribute('aria-pressed',
        btn.getAttribute('data-theme-set') === mode ? 'true' : 'false');
    });
  }

  function initTheme() {
    var control = document.getElementById('theme-control');
    if (control) {
      control.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('[data-theme-set]') : null;
        if (!btn) { return; }

        var mode = btn.getAttribute('data-theme-set');
        try { window.localStorage.setItem(THEME_KEY, mode); } catch (err) { /* no-op */ }
        applyTheme(mode);
      });
    }

    /* On Auto, follow the phone if it changes theme while the page is open. */
    if (window.matchMedia) {
      var query = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        if (savedTheme() === 'auto') { applyTheme('auto'); }
      };
      if (query.addEventListener) { query.addEventListener('change', onChange); }
      else if (query.addListener) { query.addListener(onChange); }
    }

    applyTheme(savedTheme());
  }

  /* -------------------------------------------------------------
     Text formatting: **bold**, *italic*, `code`, [label](target)
     Content is authored by us, not typed by visitors, so it is
     treated as trusted. Avoid raw < and > in content.js.
     ------------------------------------------------------------- */

  function fmt(s) {
    return String(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      /* Non-greedy, and deliberately allows asterisks inside, so that
         **bold with an *italic* inside** works. A stricter pattern
         silently leaves the ** on screen as literal text. */
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  /* -------------------------------------------------------------
     Block rendering
     ------------------------------------------------------------- */

  var CALLOUT_LABELS = {
    note: 'Good to know',
    warn: 'Heads up',
    stop: 'Please don’t',
    open: 'Still being confirmed'
  };

  function callout(b) {
    var label = b.label || CALLOUT_LABELS[b.t];
    return '<div class="callout callout-' + b.t + '">' +
             '<span class="callout-label">' + label + '</span>' +
             '<p>' + fmt(b.x) + '</p>' +
           '</div>';
  }

  function supportBlock() {
    var s = LNPC.support;
    return '<div class="support">' +
             '<h2>' + s.name + '</h2>' +
             '<p>Main office line, answered around the clock — holidays included.</p>' +
             '<a class="btn-call" href="tel:' + s.tel + '">📞 Call ' + s.phone + '</a>' +
             '<a class="btn-mail" href="mailto:' + s.email + '">✉️ ' + s.email + '</a>' +
           '</div>';
  }

  function block(b) {
    switch (b.t) {
      case 'p':
        return '<p>' + fmt(b.x) + '</p>';

      case 'h':
        return '<h3>' + fmt(b.x) + '</h3>';

      case 'ul':
      case 'ol':
        return '<' + b.t + '>' + b.x.map(function (i) {
          return '<li>' + fmt(i) + '</li>';
        }).join('') + '</' + b.t + '>';

      case 'rows':
        return '<div class="rows">' + b.x.map(function (r) {
          return '<div class="row">' +
                   '<span class="row-k">' + fmt(r[0]) + '</span>' +
                   '<span class="row-v"><strong>' + fmt(r[1]) + '</strong></span>' +
                 '</div>';
        }).join('') + '</div>';

      case 'note':
      case 'warn':
      case 'stop':
      case 'open':
        return callout(b);

      case 'jump':
        return '<a class="jump" href="' + b.to + '">' +
                 '<span class="jump-icon" aria-hidden="true">' + (b.icon || '') + '</span>' +
                 '<span>' + fmt(b.x) + '</span>' +
               '</a>';

      case 'support':
        return supportBlock();

      default:
        return '';
    }
  }

  function blocks(list) {
    return (list || []).map(block).join('');
  }

  function pageHead(title, lede) {
    return '<div class="page-head">' +
             '<h1>' + fmt(title) + '</h1>' +
             (lede ? '<p class="lede">' + fmt(lede) + '</p>' : '') +
           '</div>';
  }

  /* -------------------------------------------------------------
     Check-off state for the step lists.

     Stored per route in localStorage, and thrown away after twelve
     hours so that next Sunday starts with a clean list rather than
     last Sunday's checkmarks.
     ------------------------------------------------------------- */

  var STORE_KEY = 'lnpc.progress.v1';
  var MAX_AGE   = 12 * 60 * 60 * 1000;

  function readStore() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) { return {}; }
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object') { return {}; }
      if (!data.ts || (Date.now() - data.ts) > MAX_AGE) { return {}; }
      return data.done || {};
    } catch (e) {
      return {};
    }
  }

  function writeStore(done) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify({
        ts: Date.now(),
        done: done
      }));
    } catch (e) {
      /* private browsing, full disk — checkmarks just won't persist */
    }
  }

  function isDone(routeKey, stepId) {
    var done = readStore();
    return !!(done[routeKey] && done[routeKey][stepId]);
  }

  function setDone(routeKey, stepId, value) {
    var done = readStore();
    if (!done[routeKey]) { done[routeKey] = {}; }
    if (value) { done[routeKey][stepId] = 1; } else { delete done[routeKey][stepId]; }
    writeStore(done);
  }

  function clearDone(routeKey) {
    var done = readStore();
    delete done[routeKey];
    writeStore(done);
  }

  /* -------------------------------------------------------------
     Step lists
     ------------------------------------------------------------- */

  function stepList(steps, routeKey) {
    var html = '<div class="steps-tools">' +
                 '<span>Tap a step to check it off</span>' +
                 '<button type="button" class="btn-quiet" data-clear="' + routeKey + '">Clear all</button>' +
               '</div>';

    html += '<ol class="steps" data-steps-route="' + routeKey + '">';
    steps.forEach(function (step, i) {
      var done = isDone(routeKey, step.id);
      html += '<li class="step' + (done ? ' is-done' : '') + '" data-step="' + step.id + '">' +
                '<button type="button" class="step-head" aria-pressed="' + (done ? 'true' : 'false') + '">' +
                  '<span class="step-num"><span class="step-num-text">' + (i + 1) + '</span></span>' +
                  '<span class="step-title">' + fmt(step.title) + '</span>' +
                  '<span class="step-check">' + (done ? 'Done' : '') + '</span>' +
                '</button>' +
                '<div class="step-body">' + blocks(step.body) + '</div>' +
              '</li>';
    });
    html += '</ol>';
    return html;
  }

  /* Static (non-interactive) version, used on the full reference page */
  function stepListPlain(steps) {
    return steps.map(function (step, i) {
      return '<div class="card">' +
               '<h3>' + (i + 1) + '. ' + fmt(step.title) + '</h3>' +
               blocks(step.body) +
             '</div>';
    }).join('');
  }

  /* -------------------------------------------------------------
     Pages
     ------------------------------------------------------------- */

  function renderHome() {
    var h = LNPC.home;
    var brand = h.logo
      ? '<h1 class="brand">' +
          '<img src="' + h.logo.src + '" width="' + h.logo.w + '" height="' + h.logo.h + '"' +
               ' alt="' + h.heading + '">' +
        '</h1>'
      : '<h1>' + h.heading + '</h1>';

    var html = '<div class="home-hello">' +
                 brand +
                 '<p class="lede">' + h.sub + '</p>' +
                 '<p>' + fmt(h.intro) + '</p>' +
               '</div>';

    html += '<nav class="tiles" aria-label="What do you need to do?">';
    h.tiles.forEach(function (t) {
      html += '<a class="tile ' + (t.cls || '') + '" href="' + t.to + '">' +
                '<span class="tile-icon" aria-hidden="true">' + t.icon + '</span>' +
                '<span class="tile-text">' +
                  '<span class="tile-title">' + t.title + '</span>' +
                  '<span class="tile-sub">' + t.sub + '</span>' +
                '</span>' +
                '<span class="tile-chev" aria-hidden="true">›</span>' +
              '</a>';
    });
    html += '</nav>';

    return { title: 'Sanctuary AV Guide', html: html, home: true };
  }

  function renderOperator() {
    var p = LNPC.operator;
    return {
      title: p.title,
      html: pageHead(p.title, p.lede) + stepList(p.steps, 'operator') + blocks(p.after)
    };
  }

  function renderMusician() {
    var p = LNPC.musician;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body) };
  }

  function renderListening() {
    var p = LNPC.listening;
    var html = pageHead(p.title, p.lede);

    html += '<div class="fork">';
    p.fork.forEach(function (f) {
      html += '<a class="fork-card" href="' + f.to + '">' +
                '<span class="fork-tag">' + f.tag + '</span>' +
                '<span class="fork-title">' + f.title + '</span>' +
                '<span class="fork-sub">' + f.sub + '</span>' +
              '</a>';
    });
    html += '</div>';

    return { title: p.title, html: html + blocks(p.body) };
  }

  function renderListeningDevice() {
    var p = LNPC.listeningDevice;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body), back: '#/listening' };
  }

  function renderListeningReceiver() {
    var p = LNPC.listeningReceiver;
    return {
      title: p.title,
      html: pageHead(p.title, p.lede) + stepList(p.steps, 'receiver') + blocks(p.after),
      back: '#/listening'
    };
  }

  function renderMixer() {
    var p = LNPC.mixer;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body) };
  }

  function renderWireless() {
    var p = LNPC.wireless;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body) };
  }

  function renderHelp(targetId) {
    var p = LNPC.help;
    var html = pageHead(p.title, p.lede);

    html += '<a class="jump" href="#/support">' +
              '<span class="jump-icon" aria-hidden="true">📞</span>' +
              '<span>Call Audio Logic Systems</span>' +
            '</a>';

    p.symptoms.forEach(function (s) {
      var open = (s.id === targetId);
      html += '<details class="symptom' + (open ? ' is-target' : '') + '" id="s-' + s.id + '"' +
                      (open ? ' open' : '') + '>' +
                '<summary>' + fmt(s.q) + '</summary>' +
                '<div class="symptom-body">' + blocks(s.body) + '</div>' +
              '</details>';
    });

    html += supportBlock();

    return { title: p.title, html: html, scrollTo: targetId ? 's-' + targetId : null };
  }

  function renderSupport() {
    var p = LNPC.supportPage;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body) };
  }

  function renderOpenItems() {
    var p = LNPC.openItems;
    return { title: p.title, html: pageHead(p.title, p.lede) + blocks(p.body) };
  }

  /* The full reference stitches together the same content the
     persona pages use, so it can never drift out of sync. */
  function referenceSection(key) {
    switch (key) {
      /* The lede is skipped here — it talks about tapping steps to
         check them off, and the reference version is read-only. */
      case 'operator':
        return stepListPlain(LNPC.operator.steps);

      case 'listening':
        return blocks(LNPC.listening.body) +
               '<h3>Path A — your own Auracast hearing aids or earbuds</h3>' +
               blocks(LNPC.listeningDevice.body) +
               '<h3>Path B — borrowing a receiver</h3>' +
               stepListPlain(LNPC.listeningReceiver.steps);

      case 'help':
        return LNPC.help.symptoms.map(function (s) {
          return '<div class="card"><h3>' + fmt(s.q) + '</h3>' + blocks(s.body) + '</div>';
        }).join('');

      default:
        return blocks(LNPC[key].body);
    }
  }

  function renderReference() {
    var p = LNPC.reference;
    var html = pageHead(p.title, p.lede);

    html += '<ul class="toc">';
    p.sections.forEach(function (s) {
      html += '<li><a href="#/reference#' + s.id + '">' + s.heading + '</a></li>';
    });
    html += '</ul>';

    p.sections.forEach(function (s) {
      html += '<section class="ref-section" id="' + s.id + '">' +
                '<h2>' + s.heading + '</h2>' +
                referenceSection(s.from) +
                '<a class="backtotop" href="#/reference">↑ Back to the top</a>' +
              '</section>';
    });

    return { title: p.title, html: html };
  }

  function renderNotFound() {
    return {
      title: 'Not found',
      html: pageHead('That page has moved', 'Nothing’s broken — this address just doesn’t exist any more.') +
            '<a class="jump" href="#/"><span class="jump-icon" aria-hidden="true">🏠</span><span>Back to the start</span></a>'
    };
  }

  /* -------------------------------------------------------------
     Routing
     ------------------------------------------------------------- */

  function route(path) {
    var parts = path.split('/').filter(Boolean);

    switch (parts[0]) {
      case undefined:    return renderHome();
      case 'operator':   return renderOperator();
      case 'musician':   return renderMusician();
      case 'listening':
        if (parts[1] === 'my-device') { return renderListeningDevice(); }
        if (parts[1] === 'receiver')  { return renderListeningReceiver(); }
        return renderListening();
      case 'mixer':      return renderMixer();
      case 'wireless':   return renderWireless();
      case 'help':       return renderHelp(parts[1]);
      case 'support':    return renderSupport();
      case 'open-items': return renderOpenItems();
      case 'reference':  return renderReference();
      default:           return renderNotFound();
    }
  }

  function currentPath() {
    var hash = window.location.hash || '#/';
    /* strip a trailing #anchor used for in-page jumps on the reference page */
    var path = hash.replace(/^#\/?/, '');
    var anchorAt = path.indexOf('#');
    var anchor = null;
    if (anchorAt > -1) {
      anchor = path.slice(anchorAt + 1);
      path = path.slice(0, anchorAt);
    }
    return { path: path, anchor: anchor };
  }

  var lastRender = null;   /* null, not '', so the first paint always happens */

  function render() {
    var loc  = currentPath();
    var page = route(loc.path);

    /* Re-rendering the same page would throw away open accordions
       and scroll position, so only rebuild when the route changes. */
    var signature = loc.path;
    if (signature !== lastRender || page.scrollTo) {
      main.innerHTML = page.html;
      lastRender = signature;

      if (!loc.anchor && !page.scrollTo) {
        window.scrollTo(0, 0);
      }
    }

    titleEl.textContent = page.title.replace(/\*\*/g, '');

    if (page.home) {
      backEl.hidden = true;
      helpEl.hidden = true;
    } else {
      backEl.hidden = false;
      backEl.href = page.back || '#/';
      helpEl.hidden = (loc.path.indexOf('help') === 0);
    }

    /* deep link into a troubleshooting entry */
    if (page.scrollTo) {
      var target = document.getElementById(page.scrollTo);
      if (target) { target.scrollIntoView({ block: 'start' }); }
    }

    /* in-page anchor on the reference page */
    if (loc.anchor) {
      var anchorEl = document.getElementById(loc.anchor);
      if (anchorEl) { anchorEl.scrollIntoView({ block: 'start' }); }
    }

    main.focus({ preventScroll: true });
  }

  /* -------------------------------------------------------------
     Interaction
     ------------------------------------------------------------- */

  main.addEventListener('click', function (e) {
    var head = e.target.closest ? e.target.closest('.step-head') : null;
    if (head) {
      var li       = head.parentNode;
      var stepId   = li.getAttribute('data-step');
      var routeKey = li.parentNode.getAttribute('data-steps-route');
      var nowDone  = !li.classList.contains('is-done');

      li.classList.toggle('is-done', nowDone);
      head.setAttribute('aria-pressed', nowDone ? 'true' : 'false');
      head.querySelector('.step-check').textContent = nowDone ? 'Done' : '';
      setDone(routeKey, stepId, nowDone);
      return;
    }

    var clear = e.target.closest ? e.target.closest('[data-clear]') : null;
    if (clear) {
      clearDone(clear.getAttribute('data-clear'));
      main.querySelectorAll('.step.is-done').forEach(function (li) {
        li.classList.remove('is-done');
        li.querySelector('.step-head').setAttribute('aria-pressed', 'false');
        li.querySelector('.step-check').textContent = '';
      });
    }
  });

  window.addEventListener('hashchange', render);
  initTheme();
  render();
})();
