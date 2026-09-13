/*
 * The tracker (930-analytics 009). Served by the game's own server as
 * /hq/track.js with the key substituted, so it is one script tag and no
 * build step. Plain ES2020, under 150 lines, and it never throws: an
 * exception inside a firefight is worth more than any number here.
 *
 *   window.cf_track(name, props)      -- record one thing that happened
 *   window.cf_track.feedback(fields)  -- a rating; resolves true if it landed
 *   window.cf_track.error(fields)     -- a crash; resolves nothing, ever
 *
 * Calls made before this file arrives queue on `window.cf_track.q` (the
 * game's wrapper installs that array) and are flushed on load.
 *
 * Visitor id: the game's own `cf.mp.id`, minted here if absent, so a later
 * multiplayer hello registers the same id (Q3). Session id: a run of
 * activity with no gap over thirty minutes, kept in sessionStorage.
 */
(function () {
  'use strict';
  var KEY = 'd5278e7559b40bf4aef4888521efd227031354e33a161ada';
  var ENDPOINT = '/hq/api/track';
  var FEEDBACK_ENDPOINT = '/hq/api/feedback';
  var ERROR_ENDPOINT = '/hq/api/error';
  var ID_KEY = 'cf.mp.id';
  var SESSION_KEY = 'cf.hq.s';
  var GAP_MS = 30 * 60 * 1000;
  var HEARTBEAT_MS = 60 * 1000;

  function read(store, k) { try { return store.getItem(k); } catch (e) { return null; } }
  function write(store, k, v) { try { store.setItem(k, v); } catch (e) { /* private mode */ } }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var s = ''; for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
    return s;
  }

  var visitor = read(localStorage, ID_KEY);
  if (!visitor) { visitor = uuid(); write(localStorage, ID_KEY, visitor); }

  /*
   * The session: the id in sessionStorage with the time it was last seen.
   * Inside the gap it is extended; past it a real event opens a new one
   * and a heartbeat (`renew` false) opens nothing and returns null, so a
   * tab left open overnight does not start a session at 03:00.
   */
  function sessionId(renew) {
    var now = Date.now();
    var raw = read(sessionStorage, SESSION_KEY);
    var parts = raw ? raw.split('|') : [];
    var live = parts.length === 2 && now - Number(parts[1]) < GAP_MS;
    if (!live && !renew) return null;
    var id = live ? parts[0] : uuid();
    write(sessionStorage, SESSION_KEY, id + '|' + now);
    return id;
  }

  var utm = {};
  try {
    var qs = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { var v = qs.get(k); if (v) utm[k] = v.slice(0, 80); });
  } catch (e) { /* no query string */ }

  function touch() {
    var mode = document.documentElement.getAttribute('data-input');
    if (mode === 'touch') return true;
    if (mode === 'pointer') return false;
    try { return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0; } catch (e) { return null; }
  }

  function payload(name, props, sid) {
    var body = {
      key: KEY, v: 1, k: visitor, s: sid, e: name,
      path: location.pathname, ref: document.referrer || null,
      lang: navigator.language || null, touch: touch(),
      vw: window.innerWidth, vh: window.innerHeight,
      at: new Date().toISOString(), props: props || null
    };
    for (var k in utm) body[k] = utm[k];
    return JSON.stringify(body);
  }

  function post(json, last) {
    try {
      // The last event of a page has no time for a response. A text/plain
      // beacon avoids a preflight and is the only thing that reliably leaves.
      if (last && navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([json], { type: 'text/plain' }))) return;
      fetch(ENDPOINT, { method: 'POST', body: json, headers: { 'content-type': 'text/plain' }, keepalive: true }).catch(function () {});
    } catch (e) { /* offline, blocked, or a browser without fetch: silence */ }
  }

  /*
   * A rating (940-dispatch). The one call here that is allowed to have an
   * opinion about whether it arrived: the screen says thank you on the
   * promise resolving, so a player who typed a sentence into a void is told
   * so rather than thanked for it. Everything else about it -- the visitor,
   * the session, the page, the key -- is the ordinary envelope, because it
   * is the ordinary visitor saying one more thing.
   */
  function feedback(fields, props) {
    try {
      var sid = sessionId(true);
      if (!sid) return Promise.resolve(false);
      var body = JSON.parse(payload('feedback_submitted', props || null, sid));
      body.fb = fields;
      return fetch(FEEDBACK_ENDPOINT, {
        method: 'POST', body: JSON.stringify(body),
        headers: { 'content-type': 'text/plain' }, keepalive: true
      }).then(function (r) { return r.ok; }).catch(function () { return false; });
    } catch (e) { return Promise.resolve(false); }
  }

  /*
   * A crash. Unlike `feedback` it resolves nothing and tells nobody: the
   * player is already having a bad moment and a failed report must not make
   * a second one. Unlike `track` it goes to its own endpoint, because a
   * stack does not fit in an event's `props` and grouping it is the server's
   * job.
   *
   * `sessionId(false)`: a crash never *opens* a session. A tab left open
   * overnight that throws at 03:00 is not a visit, and counting it as one
   * would put a session in the funnel that no person was present for.
   */
  function error(fields) {
    try {
      var sid = sessionId(false);
      if (!sid) return;
      var body = JSON.parse(payload('error', fields.props || null, sid));
      body.err = fields;
      fetch(ERROR_ENDPOINT, {
        method: 'POST', body: JSON.stringify(body),
        headers: { 'content-type': 'text/plain' }, keepalive: true
      }).catch(function () {});
    } catch (e) { /* never */ }
  }

  function track(name, props, last) {
    try {
      var sid = sessionId(name !== 'heartbeat');
      if (sid) post(payload(name, props, sid), last);
    } catch (e) { /* never */ }
  }

  var queued = (window.cf_track && window.cf_track.q) || [];
  window.cf_track = track;
  window.cf_track.q = null;
  window.cf_track.visitor = visitor;
  window.cf_track.feedback = feedback;
  window.cf_track.error = error;

  track('page_view');
  for (var i = 0; i < queued.length; i++) track(queued[i][0], queued[i][1]);

  var beat = null;
  function startBeat() { if (!beat) beat = window.setInterval(function () { if (!document.hidden) track('heartbeat'); }, HEARTBEAT_MS); }
  startBeat();

  var hidden = false;
  function hide() { if (hidden) return; hidden = true; track('page_hide', null, true); }
  window.addEventListener('pagehide', hide);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) hide(); else { hidden = false; }
  });
})();
