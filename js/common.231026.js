var gk_menu_delim = " <span class=dim>&bull;</span> ",
    gk_media = "f",
    gk_pop_window_target_w = void 0,
    gk_pop_window_target_h = void 0,
    gk_pop_window_dx = 0,
    gk_pop_window_dy = 0,
    gk_icon_good = '<img class=img-i src="/img/i/tick-circle.png" style="margin: -4px 4px 0 0;">',
    gk_icon_error = '<img class=img-i src="/img/i/minus-circle.png" style="margin: -4px 4px 0 0;">',
    gk_icon_chat_w = '<img class=img-i src="/img/i/balloon-white.png" style="margin: -6px 4px 0 -2px;">',
    gk_icon_chat_y = '<img class=img-i src="/img/i/balloon.png" style="margin: -6px 4px 0 -2px;">',
    gk_b_window_loaded = 0;

function isIE() {
    return !!document.all
}

function static_prefix() {
    return ""
}

function static_domain() {
    return "gameknot.com"
}

function gk_get_el(e) {
    var t = document;
    return t.getElementById ? t.getElementById(e) : t.all ? t.all[e] : null
}

function gk_event_callback(e, t, o) {
    e && (e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent && e.attachEvent("on" + t, o))
}
void 0 === Array.prototype.copy && (Array.prototype.copy = function() {
    for (var e = [], t = 0; t < this.length; t++) e[t] = this[t];
    return e
});
var gk_data_store = [];

function gk_data_storage(e) {
    try {
        return e ? window.sessionStorage || gk_data_store : window.localStorage || gk_data_store
    } catch (e) {}
    return gk_data_store
}

function gk_storage_set(e, t, o) {
    var i = gk_data_storage(o);
    try {
        i[e] = t
    } catch (e) {}
}

function gk_storage_get(e, t) {
    var o = gk_data_storage(t);
    try {
        return o[e]
    } catch (e) {}
}

function gk_storage_delete(e, t) {
    var o = gk_data_storage(t);
    try {
        delete o[e]
    } catch (e) {}
}

function get_style_from_css_link(e) {
    var t = document.getElementsByTagName("link");
    if (!t) return e;
    for (var o = "", i = 0; i < t.length; i++) {
        var n = t[i];
        if (n.href && (n.rel && "stylesheet" == String(n.rel).toLowerCase())) {
            var _ = String(n.href).toLowerCase(),
                o = o || _,
                n = _.indexOf("/main");
            if (0 < n ? n += 5 : 0 < (n = _.indexOf("/mobile")) && (n += 7), !(n < 1)) {
                n = parseInt(_.charAt(n), 10);
                if (!(isNaN(n) || n < 0 || 2 < n)) return n
            }
        }
    }
    return gk_log_error("Failed to get style from css link: " + o), e
}
try {
    var gko1 = cc_get("GKO"),
        gko2 = localStorage.getItem("GKO");
    gko2 && !gko1 ? cc_set("GKO", gko2, 999) : localStorage.setItem("GKO", gko1)
} catch (e) {}
var gk_glop = [],
    gk_glop_save_time = 0;

function load_global_options(e) {
    var t, o, i = e || cc_get("GKO"),
        n = get_media();
    if ("" == i) "https" != location.protocol.toLowerCase() && (t = [0, 2, 4, 6], o = [0, 9, 12, 14, 15, 17, 18], gk_glop[9] = t[Math.floor(Math.random() * t.length)], gk_glop[17] = o[Math.floor(Math.random() * o.length)], gk_glop[19] = "fb" == n ? 0 : get_style_from_css_link(0), gk_glop[18] = 1, gk_glop[22] = 1, gk_glop[23] = 1, gk_glop[24] = 1, save_global_options(gk_glop[0] = 1));
    else if (e || "0" != i.charAt(10)) {
        i = String(i);
        for (var _ = 0; _ < i.length; _++) {
            var a = i.charCodeAt(_);
            a < 58 ? a -= 48 : a < 91 ? a += -29 : a < 123 ? a += -87 : a = void 0, a < 0 && (a = 0), gk_glop[_] = a
        }
        null == gk_glop[19] && (gk_glop[19] = 2, save_global_options(1))
    } else {
        cc_forceExpire("GKO");
        try {
            localStorage.removeItem("GKO")
        } catch (e) {}
    }
}

function save_global_options(e) {
    for (var t = [], o = 0; o < gk_glop.length && !(100 < o); o++) {
        var i = (i = gk_glop[o]) < 0 ? "0" : i < 10 ? String(i) : i < 36 ? String.fromCharCode(i - 10 + 97) : i < 62 ? String.fromCharCode(i - 10 - 26 + 65) : "~";
        t[o] = i
    }
    cc_set("GKO", t = t.join(""), 999);
    try {
        localStorage.setItem("GKO", t)
    } catch (e) {}
    e || "" == cc_get("ESID") || gk_glop_save_time < get_time() + 1e3 && (gk_glop_save_time = get_time(), (e = []).push("opt=gop"), e.push("o=" + t), gk_request_remote_data("/settings-post.pl", 0, 0, e.join("&")))
}

function gk_get_glop(e, t) {
    return void 0 === gk_glop[e] ? t : gk_glop[e]
}

function gk_set_bits(e, t, o) {
    return e & ~t | (o ? t : 0)
}

function is_mobile() {
    try {
        return /Android|iPhone|Mobile/i.test(navigator.userAgent)
    } catch (e) {}
    return 0
}

function gk_open_window(e, t, o, i) {
    i = i || "_blank";
    var n, _, a, r = "";
    is_mobile() || ((a = gk_get_saved_window_position(e)) && (void 0 !== a[0] && (n = a[0]), void 0 !== a[1] && (_ = a[1]), a[2] && (t = a[2]), a[3] && (o = a[3])), (t < 200 || isNaN(t)) && (t = 200), (o < 200 || isNaN(o)) && (o = 200), isNaN(n) && (n = Math.floor((window.screen.width - t) / 2)), isNaN(_) && (_ = Math.floor((window.screen.height - o) / 2)), n < 0 && (n = 0), _ < 0 && (_ = 0), n + t > window.screen.availWidth && (n = window.screen.availWidth - t), _ + o > window.screen.availHeight && (_ = window.screen.availHeight - o), n < 0 && (n = 0), _ < 0 && (_ = 0), r = "left=" + (window.gk_pop_window_x = n) + ",top=" + (window.gk_pop_window_y = _) + ",width=" + t + ",height=" + o + ",resizable=1,toolbar=0,location=0,directories=0,status=1,scrollbars=1,menubar=0");
    var s = window.open(e, i, r);
    if (s) {
        try {
            s.gk_pop_window = 1
        } catch (e) {}
        s.focus()
    } else alert("Pop-up windows appear to be blocked on your computer. Unable to proceed...\nPlease allow pop-ups for GameKnot.com if you wish to use this feature");
    return s
}

function popw(e, t, o, i) {
    gk_open_window(e, t, o, i)
}

function popl(e, t, o) {
    gk_open_window("/analyze-live-board.pl?bd=" + e + (t ? "&fb=1" : "") + (o ? "&mv=" + o : "") + "&rnd=" + Math.random(), 800, 800)
}

function popa(e, t, o) {
    gk_open_window("/analyze-board.pl?bd=" + e + (t ? "&fb=1" : "") + (o ? "&mv=" + o : "") + "&rnd=" + Math.random(), 800, 800)
}

function get_media() {
    var e = String(location.hostname);
    return 0 == e.indexOf("m.") ? "m" : 0 == e.indexOf("fb.") ? "fb" : "f"
}

function cc_get(e) {
    var t = document.cookie;
    if (t.length <= 0) return "";
    var o = e.toUpperCase() + "=",
        e = t.toUpperCase().indexOf(o);
    if (-1 == e) return "";
    e += o.length;
    o = t.indexOf(";", e);
    return -1 == o && (o = t.length), t.substring(e, o)
}

function cc_getDomain() {
    var e = String(location.hostname);
    return /^\d+\.\d+\.\d+\.\d+$/.test(e) ? "" : "." + (e = (e = e.replace(/^.*\.([^\.]+\.[^\.]+)$/, "$1")) || "gameknot.com")
}

function cc_forceExpire(e) {
    var t = new Date;
    t.setTime(t.getTime() - 864e5);
    for (var o = t.toGMTString(), i = 3, n = (n = cc_getDomain()) || ".gameknot.com"; 0 < i;) document.cookie = e + "=0; path=/; expires=" + o, document.cookie = e + "=0; domain=" + n + "; expires=" + o, document.cookie = e + "=0; path=/; domain=" + n + "; expires=" + o, document.cookie = e + "=0; expires=" + o, i--
}

function cc_set(e, t, o) {
    cc_forceExpire(e);
    var i = "";
    o && ((n = new Date).setTime(n.getTime() + 24 * o * 3600 * 1e3), i = " expires=" + n.toGMTString() + ";");
    var n = (n = cc_getDomain()) && " domain=" + n + ";";
    document.cookie = e + "=" + t + "; path=/;" + n + i
}

function cc_erase(e) {
    cc_set(e, "none", -1e3)
}

function gk_html_safe(e) {
    return e ? e = (e = (e = (e = String(e)).replace(/\"/g, "&quot;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;") : ""
}

function get_time() {
    return (new Date).getTime()
}

function to_int(e) {
    e = parseInt(e, 10);
    return !e || isNaN(e) ? 0 : e
}

function gk_get_absolute_pos_top(e, t) {
    if (!t && void 0 !== e.getBoundingClientRect) {
        var o = e.getBoundingClientRect();
        return Math.floor(o.top + gk_scroll_y() - (document.documentElement.clientTop || 0)) || 0
    }
    for (var i = e.offsetTop, n = e.offsetParent; n && (i += n.offsetTop, (n = n.offsetParent) != t););
    return i
}

function gk_get_absolute_pos_left(e, t) {
    if (!t && void 0 !== e.getBoundingClientRect) {
        var o = e.getBoundingClientRect();
        return Math.floor(o.left + gk_scroll_x() - (document.documentElement.clientLeft || 0)) || 0
    }
    for (var i = e.offsetLeft, n = e.offsetParent; n && (i += n.offsetLeft, (n = n.offsetParent) != t););
    return i
}

function gk_is_fixed(e) {
    for (; e;) {
        if ("fixed" == gk_get_style(e, "position")) return 1;
        e = e.offsetParent
    }
    return 0
}

function gk_get_http() {
    var t = null;
    try {
        t = new XMLHttpRequest
    } catch (e) {
        t = null
    }
    if (t) return t;
    try {
        t = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (e) {
        t = null
    }
    if (t) return t;
    try {
        t = new ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {
        t = null
    }
    return t || void 0
}

function new_rate_limit_zone(e, t) {
    return {
        zone: [],
        N: e,
        S: 1e3 * t
    }
}

function rate_limit(e) {
    if (e && e.zone && e.N) {
        for (var t = get_time(), o = t - e.S; 0 < e.zone.length && e.zone[0] < o;) e.zone.shift();
        return !(e.zone.length < e.N) || (e.zone.push(t), !1)
    }
}
load_global_options();
var gk_data_log_zone = new_rate_limit_zone(10, 10);

function gk_log_data(e) {
    var t;
    rate_limit(gk_data_log_zone) || (t = gk_get_http()) && (e = e + "\n\n", e += "url: " + document.location + "\n", document.referrer && (e += "referer: " + document.referrer + "\n"), 3e4 < (e += "Call stack:\n" + gk_get_call_stack()).length && (e = e.substring(0, 3e4)), t.open("POST", "/log-data.pl", !0), t.onreadystatechange = function() {}, t.send(e))
}

function gk_log_error(e) {
    var t, o;
    rate_limit(gk_data_log_zone) || (t = gk_get_http()) && (o = "url: " + document.location + "\n", document.referrer && (o += "referer: " + document.referrer + "\n"), o += "ERROR: " + e + "\n", 3e4 < (o += "Call stack:\n" + gk_get_call_stack()).length && (o = o.substring(0, 3e4)), t.open("POST", "/log_error.pl", !0), t.onreadystatechange = function() {}, t.send(o))
}

function gk_mouse_x(e) {
    return e.pageX || (e.clientX ? e.clientX + gk_scroll_x() : 0)
}

function gk_mouse_y(e) {
    return e.pageY || (e.clientY ? e.clientY + gk_scroll_y() : 0)
}

function gk_scroll_anchor() {
    var e = "gk-absolute-scroll-anchor",
        t = document.getElementById(e);
    return t || ((t = document.createElement("div")).setAttribute("id", e), t.setAttribute("style", "position: absolute; left: 0; top: 0; width: 1px; height: 1px; visibility: hidden; pointer-events: none;"), document.body.insertBefore(t, document.body.firstChild)), t.getBoundingClientRect()
}

function gk_scroll_x() {
    try {
        return -gk_scroll_anchor().left
    } catch (e) {}
    return window.pageXOffset || document.documentElement.scrollLeft || 0
}

function gk_scroll_y() {
    try {
        return -gk_scroll_anchor().top
    } catch (e) {}
    return window.pageYOffset || document.documentElement.scrollTop || 0
}

function gk_viewport_frame() {
    var e = "gk-absolute-viewport-frame",
        t = document.getElementById(e);
    return t || ((t = document.createElement("div")).setAttribute("id", e), t.setAttribute("style", "position: fixed; left: 0; top: 0; width: 100%; height: 100%; visibility: hidden; pointer-events: none;"), document.body.insertBefore(t, document.body.firstChild)), t.getBoundingClientRect()
}

function gk_viewport_width() {
    try {
        return Math.floor(gk_viewport_frame().width)
    } catch (e) {}
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800
}

function gk_viewport_height() {
    try {
        return Math.floor(gk_viewport_frame().height)
    } catch (e) {}
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 600
}

function gk_get_style(e, t) {
    return e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? window.getComputedStyle(e, null)[t] : ""
}

function gk_doc_width() {
    return gk_viewport_width()
}

function gk_doc_height() {
    return gk_viewport_height()
}

function pb_hide() {
    gk_popup_bubble_hide()
}

function pb_show(e, t, o) {
    o = o || 300;
    var i = gk_mouse_x(e = e || window.event) + 15,
        n = gk_mouse_y(e) + 3,
        _ = null;
    e.srcElement ? _ = e.srcElement : e.target && (_ = e.target), _ && (_._old_onmouseout || (_._old_onmouseout = _.onmouseout), _.onmouseout = function(e) {
        var t = _;
        gk_popup_bubble_hide(), "function" == typeof t._old_onmouseout && (t.onmouseout = t._old_onmouseout, t._old_onmouseout = null, t.onmouseout(e))
    }), gk_popup_bubble_display(t, i, n, o)
}

function gk_popup_bubble_hide() {
    var e = gk_get_el("temp_popup_bubble");
    e && e.parentNode && e.parentNode.removeChild(e)
}

function gk_popup_bubble_display(txt, x, y, max_width) {
    gk_popup_bubble_hide();
    var vp = {
            width: gk_viewport_width(),
            height: gk_viewport_height()
        },
        o = document.createElement("div");
    o.id = "temp_popup_bubble";
    var os = o.style;
    os.left = x + "px", os.top = y + "px", os.visibility = "hidden", os.opacity = "0", o.innerHTML = txt, document.body.insertBefore(o, document.body.firstChild), o.offsetWidth > max_width && (os.width = max_width + "px"), os.maxWidth = max_width + "px";
    var js_start = txt.indexOf("\x3c!-- gkjscript: "),
        js_end;
    0 <= js_start && (js_start += 16, js_end = txt.indexOf(" --\x3e", js_start), 0 <= js_end && eval(txt.substring(js_start, js_end))), gk_fit_on_screen(o, vp), os.opacity = "1", os.visibility = "visible", o.onmousemove = gk_popup_bubble_hide
}

function gk_fit_on_screen(e, t) {
    t = t || {
        width: gk_viewport_width(),
        height: gk_viewport_height()
    };
    if (void 0 !== e.getBoundingClientRect) {
        var o = e.getBoundingClientRect();
        if (0 <= o.top && 0 <= o.left && o.bottom <= t.height && o.right <= t.width) return;
        var i = o.left,
            n = o.top;
        return o.right > t.width && (i = t.width - o.width), o.bottom > t.height && (n = t.height - o.height), i < 0 && (i = 0), n < 0 && (n = 0), e.style.left = i + gk_scroll_x() + "px", void(e.style.top = n + gk_scroll_y() + "px")
    }
    var _ = gk_scroll_x() + t.width,
        a = gk_scroll_y() + t.height,
        r = gk_get_absolute_pos_left(e),
        s = gk_get_absolute_pos_top(e),
        o = r,
        i = s,
        n = e.offsetWidth,
        t = e.offsetHeight;
    _ <= r + n + 4 && (r = _ - n - 6), a <= s + t + 4 && (s = a - t - 6), r < 1 && (r = 1), s < 1 && (s = 1), o != r && (e.style.left = r + "px"), i != s && (e.style.top = s + "px")
}
var gk_ministats_uid = void 0,
    gk_ministats_x = 0,
    gk_ministats_y = 0,
    gk_ministats_timer = 0,
    gk_ministats_cache = [];

function gk_ministats_cancel() {
    gk_ministats_timer && (clearTimeout(gk_ministats_timer), gk_ministats_timer = 0), gk_ministats_uid = void 0, gk_popup_bubble_hide()
}

function gk_mnst(e, t) {
    e = e || window.event, gk_ministats_x = gk_mouse_x(e) + 15, gk_ministats_y = gk_mouse_y(e) + 3;
    var o = null;
    e.srcElement ? o = e.srcElement : e.target && (o = e.target), o && (o.onmouseout = gk_ministats_cancel), gk_ministats_cancel();
    o = gk_ministats_cache[t];
    o && 0 < o.length ? gk_popup_bubble_display(o, gk_ministats_x, gk_ministats_y, 300) : (gk_ministats_uid = t, gk_ministats_timer = setTimeout(gk_ministats_display, 200))
}

function gk_ministats_display() {
    gk_ministats_uid && (gk_popup_bubble_display("Loading stats for player " + gk_ministats_uid + " &hellip;", gk_ministats_x, gk_ministats_y, 300), gk_request_remote_data("/mini-stats.pl?u=" + gk_ministats_uid + "&rnd=" + Math.random(), gk_ministats_uid, gk_ministats_data_callback))
}

function gk_ministats_data_callback(e, t) {
    e && (gk_ministats_cache[e] = t), gk_ministats_uid && e == gk_ministats_uid && gk_popup_bubble_display(t, gk_ministats_x, gk_ministats_y, 300)
}
var gk_popboard_bd = 0,
    gk_popboard_flip = 0,
    gk_popboard_x = 0,
    gk_popboard_y = 0,
    gk_popboard_timer = 0,
    gk_popboard_cache = [];

function gk_popboard_cancel() {
    gk_popboard_timer && (clearTimeout(gk_popboard_timer), gk_popboard_timer = 0), gk_popboard_bd = 0, gk_popup_bubble_hide()
}

function gk_popbd(e, t, o) {
    e = e || window.event, "function" != typeof draw_chess_diagram && load_js("/js/chess-diagram.022621.js"), gk_popboard_x = gk_mouse_x(e) + 15, gk_popboard_y = gk_mouse_y(e) + 3;
    var i = null;
    e.srcElement ? i = e.srcElement : e.target && (i = e.target), i && (i.onmouseout = gk_popboard_cancel), gk_popboard_cancel(), gk_popboard_bd = t, gk_popboard_flip = o = o ? 1 : 0, gk_popboard_timer = setTimeout(gk_popboard_display, 300)
}

function gk_popboard_display() {
    var e, t;
    gk_popboard_bd && (gk_popup_bubble_display('<div id="gk_popboard_info"></div><div id="gk_popboard">Loading...</div>', gk_popboard_x, gk_popboard_y, 999), e = gk_popboard_bd + "-" + (gk_popboard_flip = gk_popboard_flip ? 1 : 0), (t = gk_popboard_cache[e]) && 0 < t.length ? gk_popboard_render(t) : gk_request_remote_data("/mini-board.pl?bd=" + gk_popboard_bd + "&fb=" + gk_popboard_flip + "&rnd=" + Math.random(), e, gk_popboard_data_callback))
}

function gk_popboard_data_callback(e, t) {
    e && (gk_popboard_cache[e] = t), gk_popboard_bd && e == gk_popboard_bd + "-" + (gk_popboard_flip = gk_popboard_flip ? 1 : 0) && gk_popboard_render(t)
}

function gk_popboard_render(e) {
    var t = e.split(/\n/),
        o = gk_get_el("gk_popboard_info");
    o && t[1] && (o.innerHTML = t[1]);
    e = gk_get_el("temp_popup_bubble");
    e && set_css_class(e, "dim", 1);
    e = gk_get_el("gk_popboard");
    e && (draw_chess_diagram(e, t[0]), o && (o.style.width = e.offsetWidth + 4 + "px"))
}

function gk_pop_fen(e, t, o) {
    var i = gk_mouse_x(e = e || window.event) + 15,
        n = gk_mouse_y(e) + 3;
    gk_popup_bubble_hide();
    var _ = null;
    e.srcElement ? _ = e.srcElement : e.target && (_ = e.target), _ && (_.onmouseout = gk_popup_bubble_hide), o = o ? '<div id="gk_popboard_info">' + o + "</div>" : "";
    _ = 0;
    "function" != typeof draw_chess_diagram && (_ = load_js("/js/chess-diagram.022621.js")), gk_popup_bubble_display(o + '<div id="gk_popboard_fen">Loading...</div>', i, n, 999), _ ? setTimeout(function() {
        gk_pop_fen_render(t)
    }, 100) : gk_pop_fen_render(t)
}

function gk_pop_fen_render(e) {
    var t, o = gk_get_el("gk_popboard_fen");
    o && ((t = gk_get_el("temp_popup_bubble")) && set_css_class(t, "dim", 1), draw_chess_diagram(o, e), (e = gk_get_el("gk_popboard_info")) && (e.style.width = o.offsetWidth + 4 + "px"))
}

function gk_create_remote_data_request(e, t, o, i) {
    this.remote_data_callback = function() {
        if (this.xhttp && 4 == this.xhttp.readyState) {
            var e = "";
            try {
                e = this.xhttp.responseText
            } catch (e) {}
            var t = this.callback_func;
            "function" == typeof t && t(this.id, e)
        }
    }, this.get_remote_data_callback_handler = function() {
        var e = this;
        return function() {
            e.remote_data_callback()
        }
    }, this.id = t, this.callback_func = o, this.xhttp = gk_get_http(), this.xhttp ? i ? (this.xhttp.open("POST", e, !0), this.xhttp.onreadystatechange = this.get_remote_data_callback_handler(), this.xhttp.send(i)) : (this.xhttp.open("GET", e, !0), this.xhttp.onreadystatechange = this.get_remote_data_callback_handler(), this.xhttp.send(null)) : "function" == typeof o && o(so.id, "FATAL ERROR: Error initializing XMLHttpRequest object!")
}

function gk_request_remote_data(e, t, o, i) {
    if ("function" != typeof o) {
        var n = gk_get_http();
        if (!n) return "Error initializing XMLHttpRequest object!";
        if (i) {
            n.open("POST", e, !1), n.onreadystatechange = function() {};
            try {
                n.send(i)
            } catch (e) {
                return "ERROR communicating with the server (xhttp.post)"
            }
        } else {
            n.open("GET", e, !1), n.onreadystatechange = function() {};
            try {
                n.send(null)
            } catch (e) {
                return "ERROR communicating with the server (xhttp.get)"
            }
        }
        var _ = "";
        try {
            _ = n.responseText
        } catch (e) {}
        return _
    }
    new gk_create_remote_data_request(e, t, o, i)
}

function gk_limit_len(e, t) {
    return !!e && (void 0 !== e.value && (e.value.length <= t || (e.value = e.value.substr(0, t - 1), !1)))
}

function debug_log(e) {
    var t = gk_get_el("gk-debug-info");
    t || ((t = document.createElement("div")).id = "gk-debug-info", t.className = "sml", t.style.height = "600px", t.style.overflow = "auto", document.body.appendChild(t)), t.innerHTML += String(e).replace(/\n/g, "<br>") + "<br>"
}

function fix_alpha(e, t) {
    e && (e.src = t)
}

function gk_get_call_stack() {
    var e = "";
    if (void 0 === gk_get_call_stack.caller) return "";
    for (var t = gk_get_call_stack.caller, o = 0; t && o++ < 10;) {
        var i = String(t).split("\n")[0];
        if (120 < i.length && (i = i.substring(0, 120)), e += "\t" + i + "\n", void 0 === t.caller) break;
        if (!(t = t.caller)) break
    }
    return e
}

function load_js(e) {
    var t = document.getElementsByTagName("script");
    if (t)
        for (var o = 0; o < t.length; o++) {
            var i = t[o].src;
            if (i == e) return 0;
            if (extract_url_path(i) == extract_url_path(e)) return 0
        }
    var n = document.createElement("script");
    return n.type = "text/javascript", n.src = e, document.body.insertBefore(n, document.body.firstChild), 1
}

function gk_window_screen_x() {
    return void 0 !== window.screenLeft ? window.screenLeft : void 0 !== window.screenX ? window.screenX : 0
}

function gk_window_screen_y() {
    return void 0 !== window.screenTop ? window.screenTop : void 0 !== window.screenY ? window.screenY : 0
}

function gk_save_window_position() {
    var e, t = gk_window_screen_x(),
        o = gk_window_screen_y();
    window.opener && ((e = []).push(t - gk_pop_window_dx), e.push(o - gk_pop_window_dy), gk_pop_window_target_w && gk_pop_window_target_h && (e.push(gk_pop_window_target_w), e.push(gk_pop_window_target_h)), gk_storage_set("window-position" + location.pathname, e.join("|")))
}

function gk_get_saved_window_position(e) {
    e = e || location.pathname, e = gk_storage_get("window-position" + (e = (e = (e = e.replace(/^.*?\/\/+/, "")).replace(/^.*?\//, "/")).replace(/\?.*$/, "")));
    if (e) return [to_int((e = e.split("|"))[0]), to_int(e[1]), to_int(e[2]), to_int(e[3])]
}

function gk_window_inner_size() {
    return void 0 !== window.innerHeight ? [window.innerWidth, window.innerHeight] : [(document.body || document.documentElement).clientWidth, (document.body || document.documentElement).clientHeight]
}

function gk_window_outer_size() {
    return void 0 !== window.outerHeight ? [window.outerWidth, window.outerHeight] : [(document.body || document.documentElement).offsetWidth, (document.body || document.documentElement).offsetHeight]
}
var gk_b_resize_on_load = 0,
    gui_fullpage_bg, gui_fullpage_fm;

function window_resize(e, t) {
    var o;
    gk_pop_window_target_w = e, gk_pop_window_target_h = t, gk_b_resize_on_load = 0, gk_b_window_loaded ? e == (o = gk_window_inner_size())[0] && t == o[1] || window.resizeBy(e - o[0], t - o[1]) : gk_b_resize_on_load = 1
}

function scroll_to_bottom(e) {
    e = gk_get_el(e);
    e && (e.scrollTop = e.scrollHeight - e.clientHeight)
}

function set_origurl() {
    var e = location.pathname + location.search;
    return cc_set("ORIGURL", encodeURIComponent(e)), !0
}

function pre_round_frame(e, t) {
    return t = t || "padding: 6px 10px; border: 0px;", 0 < e && (t += "width:" + e + "px;"), '<div class=subframe><table><tr><td style="' + t + '">'
}

function post_round_frame() {
    return "</td></tr></table></div>"
}
var b_obsolete_reported = 0,
    gui_pop_message_div, gui_pop_message_timer, gui_pop_message_modal_until, gui_pop_menu_div, gui_pop_menu_timer, gui_pop_form_div;

function gui_show_fullpage_form(e, t, o) {
    gui_hide_fullpage_form(), gui_pop_menu_remove(), gui_pop_form_remove(), b_obsolete_reported || !t && !o || (gk_log_error("Obsolete parameters set for function: gui_show_fullpage_form(), _u1=" + t + ", _u2=" + o), b_obsolete_reported = 1);
    t = document.createElement("div");
    t.className = "fullpage-form", t.innerHTML = "&nbsp;";
    o = t.style;
    o.position = "fixed", o.left = "0", o.top = "0", o.width = "100%", o.height = "100%", document.body.insertBefore(t, document.body.firstChild), gui_fullpage_bg = t;
    o = document.createElement("div"), t = o.style;
    t.position = "absolute", t.background = "transparent", t.zIndex = "60", t.display = "block", t.margin = "10px", t.visibility = "hidden", o.innerHTML = pre_round_frame() + e + post_round_frame(), document.body.insertBefore(o, document.body.firstChild);
    e = document.createElement("div");
    return e.style = "position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: transparent; display: flex; flex-flow: column nowrap; justify-content: center; align-items: center;", document.body.insertBefore(e, document.body.firstChild), e.appendChild(o), o = e, t.visibility = "visible", gui_fullpage_fm = o
}

function gui_hide_fullpage_form() {
    var e;
    gui_fullpage_bg && (gui_fullpage_bg.style.display = "none", (e = gui_fullpage_bg.parentNode) && e.removeChild(gui_fullpage_bg), gui_fullpage_bg = null), gui_fullpage_fm && (gui_fullpage_fm.innerHTML = "", gui_fullpage_fm.style.display = "none", (e = gui_fullpage_fm.parentNode) && e.removeChild(gui_fullpage_fm), gui_fullpage_fm = null)
}

function gui_match_fullpage_size(e, t, o, i) {
    o = o || 0;
    o = gk_viewport_width() - o;
    !isNaN(o) && 100 < o && (t.style.width = o + "px"), i = i || 0;
    i = gk_viewport_height() - i;
    !isNaN(i) && 100 < i && (t.style.height = i + "px")
}

function gui_pop_message(e, t, o, i, n) {
    if (void 0 === o && (o = 3e3), void 0 === i && (i = 500), !t)
        if (document.body) t = document.body;
        else {
            if (!document.documentElement) return;
            t = document.documentElement
        } gui_pop_message_remove();
    var _ = {
            width: gk_viewport_width(),
            height: gk_viewport_height()
        },
        a = gk_get_absolute_pos_left(t),
        r = gk_get_absolute_pos_top(t),
        s = document.createElement("div");
    (gui_pop_message_div = s).className = "pop_message";
    var d = s.style;
    return d.left = a + "px", d.top = r + "px", d.visibility = "hidden", s.innerHTML = e, document.body.insertBefore(s, document.body.firstChild), 5 == n ? (a = a + 1 + t.offsetWidth, r += Math.floor((t.offsetHeight - s.offsetHeight) / 2)) : 4 == n ? (a = a + t.offsetWidth - s.offsetWidth, r += t.offsetHeight) : 3 == n ? a -= s.offsetWidth : 2 == n ? (a += Math.floor((t.offsetWidth - s.offsetWidth) / 2), r += t.offsetHeight) : 1 == n ? r -= s.offsetHeight : (a += Math.floor((t.offsetWidth - s.offsetWidth) / 2), r += Math.floor((t.offsetHeight - s.offsetHeight) / 2)), d.left = a + "px", d.top = r + "px", gk_fit_on_screen(d, _), d.visibility = "visible", set_css_class(s, "fade_in_fast", 1), gui_pop_message_modal_until = 0 < i ? get_time() + i : 0, gk_event_callback(s, "mousemove", gui_pop_message_on_mousemove), gui_pop_message_timer = setTimeout(gui_pop_message_remove, o), d
}

function gui_pop_message_on_mousemove() {
    if (gui_pop_message_modal_until) {
        var e = gui_pop_message_modal_until - get_time();
        if (0 < e) return gui_pop_message_timer && clearTimeout(gui_pop_message_timer), void(gui_pop_message_timer = setTimeout(gui_pop_message_remove, e))
    }
    gui_pop_message_remove()
}

function gui_pop_message_remove() {
    gui_pop_message_timer && (clearTimeout(gui_pop_message_timer), gui_pop_message_timer = 0), gui_pop_message_modal_until = 0, gui_pop_message_div && (gui_pop_message_div.parentNode.removeChild(gui_pop_message_div), gui_pop_message_div = null)
}

function gui_display_shadow(e, t) {}

function gui_copy_appearance(e, t) {}

function gk_stop_event(e) {
    e.cancelBubble = !0, e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault()
}

function gk_create_mouse_capture(e) {
    this.b_capture = 0, this.parent = e, this.b_autorelease = 1, this.handler_stop_event = function(e) {
        return gk_stop_event(e), !1
    }, this.mouse_move_event = function(e) {
        if (this.b_capture) return "function" == typeof this.parent.onmousemove && this.parent.onmousemove(e), gk_stop_event(e), !1
    }, this.get_handler_move_event = function() {
        var t = this;
        return function(e) {
            return t.mouse_move_event(e)
        }
    }, this.handler_move_event = this.get_handler_move_event(), this.mouse_release_event = function(e) {
        if (this.b_capture) return this.b_autorelease && this.release_mouse_capture(), "function" == typeof this.parent.onmouseup && this.parent.onmouseup(e), gk_stop_event(e), !1
    }, this.get_handler_release_event = function() {
        var t = this;
        return function(e) {
            return t.mouse_release_event(e)
        }
    }, this.handler_release_event = this.get_handler_release_event(), this.set_mouse_capture = function() {
        this.b_capture = 1, void 0 !== this.parent.setCapture && this.parent.setCapture(), void 0 !== document.addEventListener && (document.addEventListener("mousemove", this.handler_move_event, !0), document.addEventListener("mouseover", this.handler_stop_event, !0), document.addEventListener("mouseout", this.handler_stop_event, !0), document.addEventListener("mouseenter", this.handler_stop_event, !0), document.addEventListener("mouseleave", this.handler_stop_event, !0), document.addEventListener("mouseup", this.handler_release_event, !0))
    }, this.release_mouse_capture = function() {
        this.b_capture && (void(this.b_capture = 0) !== this.parent.releaseCapture && this.parent.releaseCapture(), void 0 !== document.addEventListener && (document.removeEventListener("mousemove", this.handler_move_event, !0), document.removeEventListener("mouseover", this.handler_stop_event, !0), document.removeEventListener("mouseout", this.handler_stop_event, !0), document.removeEventListener("mouseenter", this.handler_stop_event, !0), document.removeEventListener("mouseleave", this.handler_stop_event, !0), document.removeEventListener("mouseup", this.handler_release_event, !0)))
    }, this.set_mouse_capture()
}

function on_div_drag_start(e, t, o) {
    if (e = e || window.event, !t._drag_frame) {
        for (var i, n = t.offsetParent; n;) {
            if ("absolute" == gk_get_style(n, "position")) {
                i = n;
                break
            }
            n = n.offsetParent
        }
        if (i) {
            1 == o && (n = get_resizable_el(i)) && (n.gk_drag_start_w = to_int(gk_get_style(n, "width")), n.gk_drag_start_w || (n.gk_drag_start_w = n.offsetWidth), n.gk_drag_start_h = to_int(gk_get_style(n, "height")), n.gk_drag_start_h || (n.gk_drag_start_h = n.offsetHeight)), has_css_class(i, "popform") && reorder_pop_objects(i), t._drag_frame = i, t._drag_action = o, t._dragged = 0, t._drag_frame_x = to_int(gk_get_style(i, "left")), t._drag_frame_y = to_int(gk_get_style(i, "top"));
            o = gk_get_touch_xy(e);
            o && o.length ? (t._drag_mouse_x = o[0], t._drag_mouse_y = o[1]) : (t._drag_mouse_x = gk_mouse_x(e), t._drag_mouse_y = gk_mouse_y(e)), t._old_on_mouse_up = t.onmouseup, t._old_on_mouse_move = t.onmousemove;
            var _ = t;
            return t.onmouseup = function(e) {
                return on_div_drag_stop(e, _)
            }, t.onmousemove = function(e) {
                return on_div_drag(e, _)
            }, gk_event_callback(t, "touchmove", function(e) {
                return on_div_drag(e, _)
            }), gk_event_callback(t, "touchend", function(e) {
                return on_div_drag_stop(e, _)
            }), gk_event_callback(t, "touchcancel", function(e) {
                return on_div_drag_stop(e, _)
            }), gk_event_callback(t, "touchleave", function(e) {
                return on_div_drag_stop(e, _)
            }), t._mouse_capture = new gk_create_mouse_capture(t), gk_stop_event(e), !1
        }
    }
}

function on_div_drag_stop(e, t) {
    if (e = e || window.event, t && t._drag_frame) {
        t.onmouseup = t._old_on_mouse_up, t.onmousemove = t._old_on_mouse_move;
        var o = t._drag_frame;
        return t._drag_frame = null, t._mouse_capture.release_mouse_capture(), t._dragged && (1 == t._drag_action ? "function" == typeof o.gk_on_resize_stop && o.gk_on_resize_stop() : "function" == typeof o.gk_on_drag_stop && o.gk_on_drag_stop()), gk_stop_event(e), !1
    }
}

function on_div_drag(e, t) {
    if (e = e || window.event, t && t._drag_frame) {
        var o, i, n = gk_get_touch_xy(e),
            _ = n && n.length ? (o = n[0], n[1]) : (o = gk_mouse_x(e), gk_mouse_y(e));
        return o -= t._drag_mouse_x, _ -= t._drag_mouse_y, (t._dragged = 1) == t._drag_action ? (n = get_resizable_el(t._drag_frame)) && ((i = n.style).width = Math.max(n.gk_drag_start_w + o, 42) + "px", i.height = Math.max(n.gk_drag_start_h + _, 42) + "px", i.maxWidth = "", i.maxHeight = "") : ((i = t._drag_frame.style).left = t._drag_frame_x + o + "px", i.top = t._drag_frame_y + _ + "px"), gk_stop_event(e), !1
    }
}

function gui_pop_menu(e, t, o, i) {
    var n = 0,
        _ = !0,
        a = {};
    typeof o == typeof a && (o = (a = o).dir, i = a.align, n = a.show_immediately ? 1 : 0, a.b_onclick_return_false && (_ = !1)), gui_pop_menu_div && (n = 1);
    var r = adler32(e);
    if (!gui_pop_menu_div || gui_pop_menu_div.gk_content_crc != r) {
        var s = gk_get_absolute_pos_left(t),
            d = gk_get_absolute_pos_top(t),
            p = t.offsetHeight,
            l = t.offsetWidth,
            c = document.createElement("div");
        c.onmouseover = gui_pop_menu_reset_remove, c.onmouseout = gui_pop_menu_remove_delayed, c.onclick = function() {
            return gui_pop_menu_div == c && (gui_pop_menu_reset_remove(), gui_pop_menu_timer = setTimeout(gui_pop_menu_remove, 10)), _
        };
        var g = a.header && 0 < a.header.length ? 1 : 0;
        c.className = "popmenu_outline";
        t = c.style;
        return t.zIndex = "80", t.padding = g ? "0px" : "9px", t.left = "0", t.top = "0", t.visibility = "hidden", c.innerHTML = g ? "<div class=hdr><em class=med>" + a.header + '</em></div><div style="padding: 9px; white-space: nowrap;">' + e + "</div>" : e, insert_pop_obj(c), 1 == o ? d += p : 2 == o ? s += l : 3 == o ? s -= c.offsetWidth : 4 == o ? d += Math.floor((p - c.offsetHeight) / 2) : d -= c.offsetHeight, 1 == i ? s += Math.floor((l - c.offsetWidth) / 2) : 2 == i && (s += l - c.offsetWidth), c._gui_pop_x = s, c._gui_pop_y = d, c.b_shown = 0, gui_pop_menu_remove(), (gui_pop_menu_div = c).gk_content_crc = r, n ? gui_pop_menu_show() : setTimeout(gui_pop_menu_show, 250), gui_pop_menu_div
    }
    gui_pop_menu_reset_remove()
}

function gui_pop_menu_show() {
    var e, t = gui_pop_menu_div;
    t && (t.b_shown = 1, (e = t.style).left = to_int(t._gui_pop_x) + "px", e.top = to_int(t._gui_pop_y) + "px", gk_fit_on_screen(t), t.className = "popmenu", e.visibility = "visible")
}

function gui_pop_menu_reset_remove() {
    gui_pop_menu_timer && (clearTimeout(gui_pop_menu_timer), gui_pop_menu_timer = 0)
}

function gui_pop_menu_remove_delayed() {
    gui_pop_menu_reset_remove(), gui_pop_menu_div && (gui_pop_menu_div.b_shown ? gui_pop_menu_timer = setTimeout(gui_pop_menu_remove, 500) : gui_pop_menu_remove())
}

function gui_pop_menu_remove() {
    gui_pop_menu_reset_remove(), gui_pop_menu_div && (gui_pop_menu_div.parentNode && gui_pop_menu_div.parentNode.removeChild(gui_pop_menu_div), gui_pop_menu_div = null)
}

function gui_pop_form(e, t, o) {
    var i = o.dir,
        n = o.align,
        _ = gk_get_absolute_pos_left(t),
        a = gk_get_absolute_pos_top(t),
        r = t.offsetHeight,
        s = t.offsetWidth,
        d = {
            width: gk_viewport_width(),
            height: gk_viewport_height()
        },
        p = document.createElement("div");
    "number" == typeof o.set_x && (_ = o.set_x), "number" == typeof o.set_y && (a = o.set_y), p.className = "popform";
    var l = p.style;
    l.zIndex = "70", l.padding = "0px", l.left = _ + "px", l.top = a + "px", p.onmousedown = function() {
        return reorder_pop_objects(p), !0
    };
    var c = "gui_pop_form_remove();";
    o.on_close_js && (c = o.on_close_js);
    t = '<div style="float: right; margin-top: -2px;" class="sml span-q" onMouseOver="pb_show(event,decode_str(\'' + (t = encode_str('<div class=pp>You can move this window by dragging it with your mouse by the title bar (at the top).</div><div class=pp>To close this window, click on <em>&times;</em> in the upper right corner.</div><div class=pp>To resize (when possible) &mdash; drag <img src="/img/resize-corner-icon.png" class=imgs style="margin: 0 2px; width: 11px; height: 11px;"> icon in the bottom right corner with your mouse.</div>')) + "'));\">&nbsp;</div>";
    return p.innerHTML = '<div style="cursor: move; white-space: nowrap;" class=hdr onMouseDown="on_div_drag_start(event,this);" onTouchStart="on_div_drag_start(event,this);"><div style="float: right; font-size: 150%; margin: -2px -2px 0 4px;"><a href="javascript:void(0)" onTouchStart="' + c + ' return false;" onClick="' + c + ' return false;" title="Close">&times;</a></div>' + t + "<em class=med>" + o.header + '</em></div><div style="padding: 8px; white-space: nowrap;" id="pop_form_body">' + e + "</div>", insert_pop_obj(p), 1 == i ? a += r : 2 == i ? _ += s : 3 == i ? _ -= p.offsetWidth : 4 == i ? a += Math.floor((r - p.offsetHeight) / 2) : a -= p.offsetHeight, 1 == n ? _ += Math.floor((s - p.offsetWidth) / 2) : 2 == n && (_ += s - p.offsetWidth), "number" == typeof o.set_x && (_ = o.set_x), "number" == typeof o.set_y && (a = o.set_y), l.left = Math.max(_, 0) + "px", l.top = Math.max(a, 0) + "px", p.b_shown = 0, gui_pop_form_remove(), gui_pop_form_div = p, "number" != typeof o.set_x && "number" != typeof o.set_y && setTimeout(function() {
        gk_fit_on_screen(p, d)
    }, 1), p
}

function gui_pop_form_remove() {
    gui_pop_form_div && (gui_pop_form_div.parentNode && gui_pop_form_div.parentNode.removeChild(gui_pop_form_div), gui_pop_form_div = null)
}

function gui_pop_form_update_header(e, t) {
    (t = t || gui_pop_form_div) && (!t.firstChild || (t = t.firstChild.getElementsByTagName("em")) && t.length && (t[0].innerHTML = e))
}

function gui_detach_pop_form() {
    var e = gui_pop_form_div;
    return gui_pop_form_div = null, e
}

function insert_pop_obj(e) {
    for (var t = document.body.firstChild; t && (has_css_class(t, "popform") || has_css_class(t, "popmenu"));) t = t.nextSibling;
    t ? document.body.insertBefore(e, t) : document.body.appendChild(e), reorder_pop_objects(e)
}

function reorder_pop_objects(e) {
    for (var t = [], o = document.body.firstChild; o;) o.style && (o.gk_zi = to_int(o.style.zIndex), o != e && has_css_class(o, "popform") && 70 <= o.gk_zi && o.gk_zi < 80 && t.push(o)), o = o.nextSibling;
    t.sort(function(e, t) {
        return e.gk_zi > t.gk_zi ? 1 : e.gk_zi < t.gk_zi ? -1 : 0
    });
    for (var i = 70, n = 0; n < t.length; n++) t[n].style.zIndex = i, i++;
    e.style.zIndex = i
}

function call_handler_tab(e, t, o, i, n, _) {
    e = gk_get_el("tabs-" + e);
    return !!e && (!!e.tabs_object && ("function" == typeof e.tabs_object[t] && (e.tabs_object[t](o, i, n, _), !0)))
}

function create_tabs(e, t) {
    this.main_div = document.createElement("div"), this.name = e, this.main_div.id = "tabs-" + e, (this.main_div.tabs_object = this).cur_tab = 0, this.main_style = "", this.b_detachable = 0, this.detachable_cookie = "";
    var a = this.main_div.style;
    a.textAlign = "left", a.padding = "2px", t && (a.width = t + "px"), this.tabs = [], this.set_detachable = function(e) {
        "m" != gk_media && (this.b_detachable = 1, this.detachable_cookie = e)
    }, this.replace_div = function(e, t, o) {
        this.data_w = t.offsetWidth, this.data_h = t.offsetHeight, t.style.margin = "0px";
        var i = document.createElement("div"),
            n = t.parentNode;
        n.insertBefore(this.main_div, t), n.removeChild(t), i.appendChild(t);
        i = {
            title: e,
            div: i,
            b_replaced: 1
        };
        return void 0 === o ? o = this.tabs.push(i) - 1 : this.tabs[o] = i, o
    }, this.replace_content = function(e, t, o) {
        for (var i = document.createElement("div");;) {
            var n = t.firstChild;
            if (!n) break;
            t.removeChild(n), i.appendChild(n)
        }
        e = {
            title: e,
            div: i,
            b_replaced: 0
        };
        return void 0 === o ? o = this.tabs.push(e) - 1 : this.tabs[o] = e, t.appendChild(this.main_div), o
    }, this.add_new_tab = function(e, t, o) {
        var i = document.createElement("div");
        i.innerHTML = t;
        i = {
            title: e,
            div: i,
            b_replaced: 0
        };
        return void 0 === o ? o = this.tabs.push(i) - 1 : this.tabs[o] = i, o
    }, this.render = function(e) {
        for (var t = 0; t < this.tabs.length; t++)(_ = this.tabs[t]) && _.div && !_.b_hidden && _.div.parentNode && _.div.parentNode.removeChild(_.div);
        var o = [];
        o.push('<table class=row style="margin: 0;' + this.main_style + '"><tr>'), o.push('<td><table class=norm style="width: 100%; border-collapse: separate; border-spacing: 0;"><tr>');
        for (t = 0; t < this.tabs.length; t++)(_ = this.tabs[t]) && _.div && !_.b_hidden && o.push('<td id="tab-' + this.name + "-" + t + '" style="white-space: nowrap;">&nbsp;</td>');
        o.push('<td class="tab_empty">&nbsp;</td></tr></table></td></tr><tr><td id="data-' + this.name + '" class="tab_body"></td></tr></table>'), this.main_div.innerHTML = o.join("");
        var i = gk_get_el("data-" + this.name);
        if (i) {
            var n = document.createElement("div");
            i.appendChild(n), (a = n.style).padding = "2px", this.data_w && (a.width = (this.data_w + 4).toString() + "px"), this.data_h && (a.height = (this.data_h + 4).toString() + "px");
            for (var _, t = 0; t < this.tabs.length; t++)(_ = this.tabs[t]) && _.div && !_.b_hidden && (_.div.style.display = "none", n.appendChild(_.div));
            e || this.show_tab(this.cur_tab)
        }
    }, this.tab_clicked = function(e) {
        e < 0 || e >= this.tabs.length || this.show_tab(e)
    }, this.show_tab = function(e) {
        e >= this.tabs.length && (e = this.tabs.length - 1), e < 0 && (e = 0);
        var t, o = this.tabs[e];
        if (!o || o.b_hidden) {
            e = -1;
            for (var i = 0; i < this.tabs.length; i++)
                if (this.tabs[i] && !this.tabs[i].b_hidden) {
                    e = i;
                    break
                } if (e < 0) return
        }
        this.cur_tab = e;
        for (i = 0; i < this.tabs.length; i++)(o = this.tabs[i]) && o.div && !o.b_hidden && (i == e ? (t = o).div.parentNode && (o.div.parentNode.style.overflow = o.b_replaced ? "hidden" : "auto") : o.div.style.display = "none", this.update_tab_header(i));
        t && (t.div.style.display = "", "function" == typeof t.callback_tab_active && setTimeout(t.callback_tab_active, 10))
    }, this.get_tab = function(e) {
        return this.tabs[e]
    }, this.disable_tab = function(e) {
        var t = this.tabs[e];
        t && !t.b_disabled && (t.b_disabled = 1, this.hide_tab(e, 1))
    }, this.hide_tab = function(e, t) {
        e = this.tabs[e];
        e && (e.b_hidden = t ? 1 : 0, t && e.div && (e.div.style.display = "none", e.div.parentNode && e.div.parentNode.removeChild(e.div)))
    }, this.update_tab_header = function(e, t) {
        var o = this.tabs[e];
        o && (void 0 !== t && (o.title = t), o.detached_div && gui_pop_form_update_header(o.title, o.detached_div), o.b_hidden || (b_active = this.cur_tab == e ? 1 : 0, (t = gk_get_el("tab-" + this.name + "-" + e)) && (t.className = b_active ? "tab_active" : "tab_inactive", o = o.title, b_active ? this.b_detachable && (o += ' <a href="javascript:void(0)" onClick="call_handler_tab(\'' + this.name + "','detach_tab'," + e + '); return false;" onMouseOver="pb_show(event,decode_str(\'Click here to detach this tab into a separate window, that can be positioned anywhere on the page\'))"><img class=img-i src="/img/i/application-export.png" style="margin: -4px 0 -2px 6px;"></a>') : o = '<a href="javascript:void(0)" onClick="call_handler_tab(\'' + this.name + "','tab_clicked'," + e + '); return false;">' + o + "</a>", t.innerHTML = o, RoundCornersTop(t))))
    }, this.detach_tab = function(e, t) {
        var o, i, n, _, a;
        "m" == gk_media || (o = this.get_tab(e)) && (o.b_detached = 1, o.b_disabled || (gk_popup_bubble_hide(), this.hide_tab(e, 1), this.render(t), o.div.parentNode && o.div.parentNode.removeChild(o.div), a = {
            dir: 0,
            align: 2,
            header: o.title + "&nbsp;",
            on_close_js: "call_handler_tab('" + this.name + "','reattach_tab'," + e + ");"
        }, void 0 !== o.detach_x && void 0 !== o.detach_y && (n = i = 0, "function" != typeof this.get_origin_xy || (_ = this.get_origin_xy()) && 2 <= _.length && (i = _[0], n = _[1]), a.set_x = i + o.detach_x, a.set_y = n + o.detach_y, a.align = 0, a.dir = 0), gui_pop_form('<div id="detached_tab_temp">???</div>', this.main_div, a), o.detached_div && o.detached_div.parentNode && (o.detached_div.parentNode.removeChild(o.detached_div), o.detached_div = null), o.detached_div = gui_detach_pop_form(), (a = gk_get_el("detached_tab_temp")) && a.parentNode.replaceChild(o.div, a), o.div.style.display = "", (a = o.detached_div).gk_on_drag_stop = this.handler_save_state(o), a.gk_on_resize_stop = this.handler_save_state(o), this.restore_detached_size(e), t || this.handler_save_state(o)(), (e = a.childNodes[1]) && ((t = document.createElement("img")).src = "/img/resize-corner-icon.png", (a = t.style).position = "absolute", a.width = "11px", a.height = "11px", a.right = "1px", a.bottom = "1px", a.marginLeft = "-10px", a.display = "block", a.cursor = "se-resize", e.appendChild(t), gk_event_callback(t, "mousedown", function(e) {
            on_div_drag_start(e, this, 1)
        }), gk_event_callback(t, "touchstart", function(e) {
            on_div_drag_start(e, this, 1)
        })), "function" == typeof o.callback_on_detach && o.callback_on_detach(o, 1)))
    }, this.handler_save_state = function(i) {
        var n = this;
        return function() {
            var e = 0,
                t = 0;
            "function" != typeof n.get_origin_xy || (o = n.get_origin_xy()) && 2 <= o.length && (e = o[0], t = o[1]);
            var o = i.detached_div;
            o && (i.detach_x = gk_get_absolute_pos_left(o) - e, i.detach_y = gk_get_absolute_pos_top(o) - t, (o = get_resizable_el(o)) && (i.resizable_w = o.offsetWidth, i.resizable_h = o.offsetHeight), n.save_detachable_state())
        }
    }, this.reattach_tab = function(e) {
        var t = this.get_tab(e);
        t && (t.b_detached = 0, t.b_disabled || (this.hide_tab(e, 0), this.cur_tab = e, this.render(), t.detached_div && (t.detached_div.parentNode && t.detached_div.parentNode.removeChild(t.detached_div), t.detached_div = null), this.save_detachable_state(), "function" == typeof t.callback_on_detach && t.callback_on_detach(t, 0), "function" == typeof t.callback_tab_active && setTimeout(t.callback_tab_active, 10)))
    }, this.save_detachable_state = function() {
        if ("m" != gk_media && this.b_detachable && this.detachable_cookie) {
            var e = [];
            e.push(2);
            for (var t = 0; t < this.tabs.length; t++) {
                var o, i, n = this.tabs[t];
                n && ((o = []).push(t), o.push(n.b_detached ? 1 : 0), i = void 0 === n.detach_x || void 0 === n.detach_y ? 0 : 1, o.push(i), i && (o.push(n.detach_x), o.push(n.detach_y)), i = void 0 === n.resizable_w || void 0 === n.resizable_h ? 0 : 1, o.push(i), i && (o.push(n.resizable_w), o.push(n.resizable_h)), e.push(o.join("&")))
            }
            var _ = e.join("|");
            "function" == typeof this.detachable_cookie ? this.detachable_cookie(_, 1) : cc_set(this.detachable_cookie, _, 999)
        }
    }, this.restore_detachable_state = function() {
        if ("m" != gk_media && this.b_detachable && this.detachable_cookie)
            for (var e = gk_viewport_width() + 1e3, t = gk_viewport_height() + 1e3, o = "function" == typeof this.detachable_cookie ? this.detachable_cookie() : cc_get(this.detachable_cookie), i = o.split("|"), n = to_int(i[0]), _ = 1; _ < i.length; _++) {
                var a, r = i[_].split("&"),
                    s = 0,
                    d = to_int(r[s++]),
                    p = (p = this.tabs[d]) || {};
                1 == n ? (to_int(r[s++]), (a = to_int(r[s++])) && (p.detach_x = Math.max(-e, Math.min(to_int(r[s++]), e)), p.detach_y = Math.max(-t, Math.min(to_int(r[s++]), t)), to_int(r[s++]) && (p.resizable_w = Math.max(42, Math.min(to_int(r[s++]), e)), p.resizable_h = Math.max(42, Math.min(to_int(r[s++]), t))), this.detach_tab(d, 1))) : 2 == n && (a = to_int(r[s++]), to_int(r[s++]) && (p.detach_x = Math.max(-e, Math.min(to_int(r[s++]), e)), p.detach_y = Math.max(-t, Math.min(to_int(r[s++]), t))), to_int(r[s++]) && (p.resizable_w = Math.max(42, Math.min(to_int(r[s++]), e)), p.resizable_h = Math.max(42, Math.min(to_int(r[s++]), t))), a && this.detach_tab(d, 1))
            }
    }, this.restore_detached_size = function(e) {
        var t = this.get_tab(e);
        !t || (e = t.detached_div) && (void 0 === t.resizable_w || void 0 === t.resizable_h || (e = get_resizable_el(e)) && ((e = e.style).maxWidth = "", e.maxHeight = "", e.padding = "0", e.width = t.resizable_w + "px", e.height = t.resizable_h + "px"))
    }, this.destroy_all = function() {
        for (var e = 0; e < this.tabs.length; e++) {
            var t = this.tabs[e];
            t && (t.div && (t.div.parentNode && t.div.parentNode.removeChild(t.div), t.div = null), t.detached_div && (t.detached_div.parentNode && t.detached_div.parentNode.removeChild(t.detached_div), t.detached_div = null))
        }
    }, this.handler_window_on_resize = function() {
        var _ = this;
        return function() {
            for (var e = 0; e < _.tabs.length; e++) {
                var t, o, i, n = _.tabs[e];
                n && !n.b_disabled && n.detached_div && (o = t = 0, "function" != typeof _.get_origin_xy || (i = _.get_origin_xy()) && 2 <= i.length && (t = i[0], o = i[1]), (i = n.detached_div.style).left = Math.max(t + n.detach_x, 0) + "px", i.top = Math.max(o + n.detach_y, 0) + "px")
            }
        }
    }, gk_event_callback(window, "resize", this.handler_window_on_resize())
}

function get_resizable_el(e) {
    for (var t = e.getElementsByTagName("*"), o = 0; o < t.length; o++) {
        var i = t[o];
        if (has_css_class(i, "resizable")) return i
    }
    return null
}

function gui_get_selected_option_value(e, t) {
    var o = gk_get_el(e);
    if (!o) return t;
    if (!o.options) return t;
    e = o.selectedIndex;
    return e < 0 || e >= o.options.length ? t : to_int(o.options[e].value)
}

function gui_set_selected_option(e, t) {
    var o = gk_get_el(e);
    if (!o) return 0;
    if (!o.options) return 0;
    for (var i = 0; i < o.options.length; i++) {
        var n = o.options[i];
        if (n.value >= t) return n.selected = 1
    }
    return 0
}

function gui_generate_select(e, t, o, i) {
    for (var n = '<SELECT id="' + e + '" ' + (i || "class=ftx") + ">\n", _ = 0; _ < t.length; _ += 2) {
        var a = t[_],
            r = t[_ + 1];
        n += '<OPTION VALUE="' + r + '"' + (r == o ? " SELECTED" : "") + ">" + a + "\n"
    }
    return n += "</SELECT>\n"
}

function extract_url_path(e) {
    return e.replace(/^https?:\/\/[^\/]+/i, "")
}

function decode_str(t) {
    var o;
    try {
        o = decodeURIComponent(t)
    } catch (e) {
        o = unescape(t)
    }
    return o
}

function encode_str(e) {
    return e = encodeURIComponent(e)
}

function has_css_class(e, t) {
    e = String(e.className), t = new RegExp("\\b" + t + "\\b");
    return 0 <= e.search(t)
}

function set_css_class(e, t, o) {
    var i = String(e.className),
        n = new RegExp("\\b" + t + "\\b");
    o ? 0 <= i.search(n) || (e.className += " " + t) : e.className = i.replace(n, "")
}

function prnd(e) {
    this.rnd = function(e) {
        return this.iterate(), Math.floor(this.seed / 65536) % e
    }, this.iterate = function() {
        this.seed = 1103515245 * this.seed + 12345 & 2147483647
    }, this.seed = void 0 === e ? get_time() : e
}
var gk_sound_fx = 1;

function sound_player(e, t, o) {
    this.volume = t || 50, this.url = e, this.div_name = "sound-" + String(this.url).replace(/\W+/g, "-"), this.error = "", this.b_can_play = 0, this.b_play_on_load = 0, this.play_timer = null, this.callback_can_play = o, this.set_volume = function(e) {
        this.volume = e || 50
    }, this.play = function(e) {
        if (window.focus(), this.play_timer && (clearTimeout(this.play_timer), this.play_timer = null), gk_sound_fx) {
            var t = this.get_sound_elem();
            if (t) {
                if (2 <= t.readyState) this.b_can_play = 1;
                else try {
                    t.load()
                } catch (e) {}
                if (e || this.b_can_play) {
                    try {
                        t.pause()
                    } catch (e) {}
                    try {
                        t.volume = this.volume / 100
                    } catch (e) {}
                    try {
                        t.currentTime = 0
                    } catch (e) {}
                    t.play()
                } else {
                    this.b_play_on_load = 1;
                    var o = this;
                    this.play_timer = setTimeout(function() {
                        o.process_play_log()
                    }, 1e3)
                }
            }
        }
    }, this.get_sound_elem = function(e) {
        if (gk_sound_fx) {
            var t;
            if (!e && (t = gk_get_el(this.div_name))) return t;
            this.b_can_play = 0, this.error = "";
            try {
                t = document.createElement("audio")
            } catch (e) {}
            if (t && t.canPlayType) {
                t.id = this.div_name, t.volume = this.volume / 100, t.preload = "auto";
                var o = this;
                gk_event_callback(t, "canplay", function() {
                    o.on_can_play()
                }), gk_event_callback(t, "canplaythrough", function() {
                    o.on_can_play()
                });
                var i, n = this.url.replace(/\.\w{2,4}$/, ".m4a"),
                    _ = this.url.replace(/\.\w{2,4}$/, ".mp3"),
                    a = this.url.replace(/\.\w{2,4}$/, ".wav");
                try {
                    (i = document.createElement("source")).type = "audio/mp4", i.src = n, t.appendChild(i)
                } catch (e) {}
                try {
                    (i = document.createElement("source")).type = "audio/mpeg", i.src = _, t.appendChild(i)
                } catch (e) {}
                try {
                    (i = document.createElement("source")).type = "audio/wav", i.src = a, t.appendChild(i)
                } catch (e) {}
                document.body.appendChild(t);
                try {
                    t.load()
                } catch (e) {}
                return t
            }
            this.error = "Audio support required. Please upgrade your web browser to the latest version."
        }
    }, this.process_play_log = function() {
        this.play_timer && (clearTimeout(this.play_timer), this.play_timer = null), this.b_play_on_load && (this.b_play_on_load = 0, this.play(1))
    }, this.on_can_play = function() {
        this.process_play_log(), this.b_can_play = 1, "function" == typeof this.callback_can_play && this.callback_can_play(), this.callback_can_play = null
    }, this.get_sound_elem(1)
}
var Base64 = {
    key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        for (var t, o, i, n, _, a, r = "", s = 0; s < e.length;) i = (a = e.charCodeAt(s++)) >> 2, n = (3 & a) << 4 | (t = e.charCodeAt(s++)) >> 4, _ = (15 & t) << 2 | (o = e.charCodeAt(s++)) >> 6, a = 63 & o, isNaN(t) ? _ = a = 64 : isNaN(o) && (a = 64), r += this.key.charAt(i) + this.key.charAt(n) + this.key.charAt(_) + this.key.charAt(a);
        return r
    },
    decode: function(e) {
        var t, o, i, n, _, a = "",
            r = 0;
        for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); r < e.length;) t = this.key.indexOf(e.charAt(r++)) << 2 | (i = this.key.indexOf(e.charAt(r++))) >> 4, o = (15 & i) << 4 | (n = this.key.indexOf(e.charAt(r++))) >> 2, i = (3 & n) << 6 | (_ = this.key.indexOf(e.charAt(r++))), a += String.fromCharCode(t), 64 != n && (a += String.fromCharCode(o)), 64 != _ && (a += String.fromCharCode(i));
        return a
    }
};

function do_RoundCorners() {}

function RoundCornersTop(e) {}

function RoundCornersBottom(e) {}

function RoundCornerTL(e) {}

function RoundCornerTR(e) {}

function RoundCornersAll() {}

function RoundCornersAllTables(e) {}

function gk_setup_page_gui() {
    var e = document.getElementsByTagName("html")[0];
    e && (e.style.position = "", e.removeAttribute("style"));
    e = document.getElementsByTagName("body")[0];
    e && (e.style.position = "")
}

function gk_process_msg_codes(e) {
    e = " " + String(e) + " ";
    for (var t = ["(.?)\\:\\-?\\)", "(\\W)\\;\\-?\\)", "(.?)\\:\\-?\\|", "(.?)\\:\\-?\\(", "(.?)\\:\\-?D(?!\\w)", "(.?)\\:\\-?[oO](?!\\w)", "(\\s)B\\-?\\)", "(.?)\\:\\-?\\@", "(.?)\\:\\-?[sS](?!\\w)", "(.?)\\:\\-?[pP](?!\\w)"], o = 1; o <= t.length; o++) {
        var i = new RegExp(t[o - 1], "g");
        e = e.replace(i, "$1<span class=smly" + o + ">&nbsp;</span>")
    }
    return (e = (e = (e = (e = e.replace(/([^\?\&])\bid=([\w\-]+)\b/g, '$1<a href="/stats.pl?$2" target="_blank" onMouseOver="gk_mnst(event,\'$2\')">$2</a>')).replace(/([^\?\&])\b(bd|gm)=(\d+)\b/g, '$1<a href="javascript:popa($3,0)"><img src="/img/new-win.png" class=img-nw onMouseOver="gk_popbd(event,$3,0);">game</a>')).replace(/([^\?\&])\bpz=(\d+)\b/g, '$1<a href="javascript:popw(\'/chess-puzzle.pl?pz=$2\',700,680)"><img src="/img/new-win.png" class=img-nw onMouseOver="gk_popbd(event,\'pz$2\',0);">puzzle #$2</a>')).replace(/([^\?\&])\btc=(\d+)\b/g, '$1<a href="javascript:popw(\'/tactics-board.pl?bd=$2\',700,680)"><img src="/img/new-win.png" class=img-nw onMouseOver="gk_popbd(event,\'tc$2\',0);">tactics #$2</a>')).substr(1, e.length - 2)
}

function gk_render_meter(e, t, o, i, n, _, a) {
    e = gk_get_el(e);
    if (e) {
        (_ = _ || 2) < 1 && (_ = 1), o < 1 && (o = 1), t < 0 && (t = 0), o < t && (t = o), n < 5 && (n = 5), i < 20 && (i = 20);
        var r = n - 4;
        r < 2 && (r = 2);
        var s = Math.round((i - _) / o - _);
        s < 2 && (s = 2), i = (s + _) * o + _, e.style.minWidth = i + 3 + "px";
        var d = document.createElement("DIV");
        d.className = "meterbar clearfix", d.style.padding = "0 " + _ + "px 0 0", d.style.margin = "0";
        for (var p = 0; p < o; p++) {
            var l = document.createElement("DIV"),
                c = l.style;
            c.height = r + "px", c.width = s + "px", c.margin = _ + "px 0 " + _ + "px " + _ + "px", t <= p ? l.className = "empty" : a && (c.background = a), d.appendChild(l)
        }
        e.appendChild(d)
    }
}

function create_progress_bar(e, t) {
    this.frame = gk_get_el(e), this.frame && (this.progress = 0, this.max_width = t || 200, this.start_width = 10, this.max_width < this.start_width && (this.max_width = this.start_width), this.frame.className = "progress_bar", this.frame.innerHTML = '<span class="animate_stripes"></span>', this.frame.style.width = this.max_width + "px", this.set_progress = function(e, t) {
        t = 0 < t ? e / t : 0;
        t > this.progress && (this.progress = t), 1 < this.progress && (this.progress = 1);
        t = this.start_width + Math.round(this.progress * (this.max_width - this.start_width));
        this.frame.firstChild.style.width = t + "px"
    }, this.restart = function() {
        this.progress = 0, this.set_progress(0, 1)
    }, this.restart(0, 1))
}

function adler32(e) {
    for (var t = e.length, o = 1, i = 0, n = -1; 0 < t;) {
        var _ = t < 1024 ? t : 1024;
        for (t -= _; 0 <= _--;) i += o = o + e.charCodeAt(n++) & 255;
        o %= 4096, i %= 4096
    }
    return o << 16 | i
}

function is_touch_screen() {
    return !!("ontouchstart" in window || navigator.msMaxTouchPoints)
}

function gk_get_touch_xy(e) {
    e = e.changedTouches;
    if (!e || !e.length) return [];
    e = e[0];
    return [Math.floor(e.pageX), Math.floor(e.pageY)]
}

function gk_enter_to_tab(e, t) {
    var o = t;
    gk_event_callback(e, "keypress", function(e) {
        if (13 === (e.keyCode || e.which)) return o.focus(), e.preventDefault(), !1
    })
}

function gk_form_enter_to_tab(e, t) {
    for (var o = e.getElementsByTagName("input"), i = 0; i < o.length;) {
        e = o[i];
        if (i++, !t || "" == t || !e.name || e.name != t) {
            for (; i < o.length; i++)
                if ("hidden" != String(o[i].type).toLowerCase()) break;
            if (gk_enter_to_tab(e, o[i]), "submit" == String(o[i].type).toLowerCase()) break
        }
    }
}

function encode_z_moves(e) {
    for (var t = void 0, o = [t, 0, t, 1, t, 2, t, t, t, 3, t, t, t, t, t, 4, t, t, t, 5, t, 6, t, 7, t], i = {
            113: 0,
            114: 1,
            98: 2,
            110: 3
        }, n = [1, 2, 3, t, t, t, 4, 5, 6], _ = "", a = 0; a < e.length; a += 5) {
        var r = e.charCodeAt(a) - 97,
            s = e.charCodeAt(a + 1) - 49,
            d = e.charCodeAt(a + 2) - 97,
            p = e.charCodeAt(a + 3) - 49,
            l = e.charCodeAt(a + 4),
            c = 7 & r | (7 & s) << 3;
        57 < (c += 48) && (90 < (c += 8) && (c += 7), 126 < c && (c = 126)), c = String.fromCharCode(c);
        d = d - r, r = p - s, p = 0, s = 0;
        void 0 !== (l = i[l]) ? (s = 4 | l, void 0 === (p = n[1 + d + 3 * (1 + r)]) && (p = 2)) : 0 == r ? (s = 0, p = (8 + d) % 8) : 0 == d ? (s = 1, p = (8 + r) % 8) : d == r ? (s = 2, p = (8 + d) % 8) : -d == r ? (s = 3, p = (8 + d) % 8) : void(p = 0) === (s = o[2 + d + 5 * (2 + r)]) && (s = 0, p = 1);
        p = 7 & s | (7 & p) << 3;
        57 < (p += 48) && (90 < (p += 8) && (p += 7), 126 < p && (p = 126)), _ += c + (p = String.fromCharCode(p))
    }
    return _
}

function decode_z_moves(e) {
    for (var t = [-1, 1, -2, 2, -2, 2, -1, 1], o = [-2, -2, -1, -1, 1, 1, 2, 2], i = ["q", "r", "b", "n"], n = [0, -1, 0, 1, -1, 0, 1, 0], _ = [0, -1, -1, -1, 1, 1, 1, 0], a = "", r = 0; r < e.length; r += 2) {
        var s = e.charCodeAt(r),
            d = e.charCodeAt(r + 1);
        9 < (s -= 48) && 34 < (s -= 8) && (s -= 7), 9 < (d -= 48) && 34 < (d -= 8) && (d -= 7);
        var p = 7 & s,
            l = s >> 3 & 7,
            c = 7 & d,
            g = d >> 3 & 7,
            u = 0,
            s = 0,
            d = "-";
        0 == g ? (u = t[c], s = o[c]) : 0 == c ? u = g : 1 == c ? s = g : 2 == c ? s = u = g : 3 == c ? s = 8 - (u = g) : 4 & c && (d = i[3 & c], u = n[g], s = _[g]);
        u = (p + u) % 8, s = (l + s) % 8;
        a += String.fromCharCode(97 + p, 49 + l, 97 + u, 49 + s) + d
    }
    return a
}

function gk_on_window_load(e) {
    if (!gk_b_window_loaded && (gk_b_window_loaded = 1, !is_mobile())) {
        try {
            window.opener && void 0 !== window.opener.gk_pop_window_x && void 0 !== window.opener.gk_pop_window_y && (gk_pop_window_dx = gk_window_screen_x() - window.opener.gk_pop_window_x, gk_pop_window_dy = gk_window_screen_y() - window.opener.gk_pop_window_y, gk_event_callback(window, "beforeunload", gk_save_window_position))
        } catch (e) {}
        gk_b_resize_on_load && window_resize(gk_pop_window_target_w, gk_pop_window_target_h)
    }
}
gk_event_callback(document, "DOMContentLoaded", gk_setup_page_gui), gk_event_callback(window, "load", gk_on_window_load), gk_event_callback(window, "pageshow", gk_on_window_load), gk_media = get_media();
try {
    var esid2 = localStorage.getItem("ESID"),
        esid1;
    esid2 && (esid1 = cc_get("ESID"), esid1 && esid2 != esid1 && localStorage.removeItem("ESID"))
} catch (e) {}