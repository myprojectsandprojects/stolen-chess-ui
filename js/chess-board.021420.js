function ichess_get_base_obj(t) {
    var e = t,
        i = document;
    return i.getElementById ? i.getElementById(e) : i.all ? i.all[e] : null
}

function ichess_get_dist(t, e, i, s) {
    return Math.sqrt((t - i) * (t - i) + (e - s) * (e - s))
}

function ichess_find_obj(t) {
    for (var e = t; e;) {
        if (e.ichess && e.ichess.id) return e.ichess;
        e = e.parentNode
    }
    return null
}

function ichess_handler_mouseover(t, e) {
    if (t && t.style) {
        var i = ichess_find_obj(t);
        i && (e != i.current_move ? t.style.cursor = "pointer" : t.style.cursor = "default", i.update_move_cell(e, 1))
    }
}

function ichess_handler_mouseout(t, e) {
    var i = ichess_find_obj(t);
    i && i.update_move_cell(e, 0)
}

function ichess_handler_click_move(t, e) {
    var i = ichess_find_obj(t);
    i && i.click_move(e)
}

function ichess_call_handler(t, e) {
    var i = ichess_find_obj(t);
    return !!i && ("function" == typeof i[e] && (i[e](t), !0))
}

function get_delayed_image_load_handler(t, e) {
    var i = t,
        s = e;
    return function() {
        i.src = s
    }
}

function handler_on_image_abort() {
    if (event) {
        var t = event.srcElement;
        if (t && t.src && !t.b_reloaded_on_abort) return t.b_reloaded_on_abort = 1, setTimeout(get_delayed_image_load_handler(t, t.src), 10), !1
    }
}

function handler_absorb_event(t) {
    return gk_stop_event(t || window.event), !1
}

function ichess_create(t, e, s) {
    this.version = t, this.id = e, this.static_prefix = s && "string" == typeof s ? s : "", this.min_graphics_size = -1, this.max_graphics_size = -1;
    var o = {};
    typeof s == typeof o && ((o = s).static_prefix && (this.static_prefix = o.static_prefix), o.min_gfx_size && (this.min_graphics_size = o.min_gfx_size), o.max_gfx_size && (this.max_graphics_size = o.max_gfx_size)), this.chess_set_img = null, this.chess_set_img_small = null, this.canmove_img = null, this.board = null, this.board_cell_size = 40, this.captive_cell_size = 20, this.b_flip = 0, this.max_captives = 16, this.g_board = new Array(64), this.g_captives_w = new Array(this.max_captives), this.g_captives_b = new Array(this.max_captives), this.bitboard = [], this.current_move = 0, this.max_move = 0, this.initial_move = 0, this.refresh_cells = [], this.moves = [], this.moves_list = [], this.cur_captive_w = 0, this.cur_captive_b = 0, this.sel_x = -1, this.sel_y = -1, this.sel_pc = 0, this.cur_to_move = "w", this.mouse_move = 0, this.color_bsq = "#888899", this.color_wsq = "#FFFFFF", this.color_bdb = "#009900", this.bdbg_img = 0, this.bdbg_tile = 0, this.b_reload_on_style_change = 0, this.graphics_style = 1, this.graphics_size = 4, this.callback_record_move = null, this.callback_click_move = null, this.callback_validate_move = null, this.callback_mouse_click = null, this.callback_update_move = null, this.callback_reset_board = null, this.callback_setup_board_elements = null, this.callback_update_moves_list = null, this.callback_get_buttons_below_board = null, this.callback_add_buttons_below_board = null, this.callback_get_links_below_board = null, this.en_passant_x = -1, this.en_passant_y = -1, this.king_w = [], this.king_b = [], this.b_checkmate = 0, this.b_in_check = 0, this.b_pinned = 0, this.b_legal_moves = 1, this.b_force_legal_moves = 1, this.b_short_notation = 1, this.b_force_short_notation = 1, this.b_show_legal_moves = 1, this.b_force_movelist_text = 0, this.b_movelist_text = 0, this.b_movelist_fig = 0, this.b_show_shadow = 1, this.b_highlight_mouseover = 0, this.n_highlight_last_move = 2, this.b_allow_new_moves = 1, this.orig_max_move = 0, this.orig_moves = [], this.all_promos = "qrbn", this.start_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -", this.start_move_offset = 0, this.game_info = "", this.b_show_captures = 1, this.b_show_moves = 1, this.b_full_page = 0, this.b_integrated = 0, this.b_board_only = 0, this.b_below_board_wide = 0, this.b_update_moves_list_on_flip = 0, this.b_freestyle = 0, this.promo_move_coords = null, this.snapshot_bitboard = [], this.movers = [], this.mover_timer = null, this.animation_speed = 4, this.canmoves = [], this.force_animation_time = 0, this.board_frame_size = 320, this.free_mover = null, this.free_mover_x = 0, this.free_mover_y = 0, this.b_printable_mode = 0, this.red_move_num = -1, this.first_user_move = -1, this.mover_divs = [], this.piece2code = {
        k: 1,
        q: 2,
        r: 3,
        n: 4,
        b: 5,
        p: 6
    }, this.code2piece = {
        1: "k",
        2: "q",
        3: "r",
        4: "n",
        5: "b",
        6: "p"
    }, this.code2pieceU = {
        1: "K",
        2: "Q",
        3: "R",
        4: "N",
        5: "B",
        6: "P"
    }, this.color2code = {
        w: 16,
        b: 0
    }, this.b_allow_any_fen = 0, this.mouseover_cell = null, this.menu_delim = "undefined" == typeof gk_menu_delim ? ' <span style="color: #888888;">&bull;</span> ' : gk_menu_delim, this.media = "function" == typeof get_media ? get_media() : gk_media, this.get_chrome_version = function() {
        var t = navigator.userAgent.match(/chrome\/(\d+)/i) || [],
            e = parseInt(t[1], 10);
        return !e || isNaN(e) ? 0 : e
    }, this.chrome_ver = this.get_chrome_version(), this.b_broken_scroll = 43 <= this.chrome_ver ? 1 : 0, this.init_position = function(t, e, i) {
        var s = this.start_plyr();
        this.start_fen = t, this.b_allow_any_fen = i ? 1 : 0, e && this.start_plyr() != s && this.flip()
    }, this.start_plyr = function() {
        return this.start_fen.match(/ w /) ? "w" : "b"
    }, this.init_moves_and_promos = function(t, e) {
        if (!e) e = 5;
        for (this.orig_max_move = Math.floor(t.length / e), this.orig_moves = [], i = 0; i < this.orig_max_move; i++) {
            var s = "-",
                o = t.substr(i * e, 4);
            4 < e && (!(s = t.substr(i * e + 4, 1).toLowerCase()) || this.all_promos.indexOf(s) < 0) && (s = "-"), this.orig_moves.push(o + s)
        }
    }, this.init_header = function(t) {
        this.game_info = t
    }, this.init_options = function(t, e, i, s, o, _) {
        this.b_show_captures = e ? 1 : 0, this.b_show_moves = i ? 1 : 0, this.b_full_page = s ? 1 : 0, this.b_integrated = o ? 1 : 0, this.b_board_only = _ ? 1 : 0
    }, this.init_colors = function(t, e, i, s) {}, this.get_obj = function(t) {
        t = t ? this.id + "-" + t : this.id;
        var e = document;
        return e.getElementById ? e.getElementById(t) : e.all ? e.all[t] : null
    }, this.bd_colors = ["888899", "FFFFFF", "009900", 0, 0, "696992", "d2d2df", "595969", 0, 0, "476bb2", "c8d3e8", "4b5976", 0, 0, "669999", "d2e1e1", "5e7373", 0, 0, "6ea155", "d4e3cc", "5b6f51", 0, 0, "6e886e", "d4dcd4", "5b655b", 0, 0, "be6c6c", "ecd3d3", "826161", 0, 0, "956c95", "e0d3e0", "716171", 0, 0, "664c7f", "d2cad9", "50465a", 0, 0, "b2997f", "e8e1d9", "83796f", 0, 0, "715746", "d5cdc8", "50463f", 0, 0, "c86c2f", "efd3c1", "7f5a41", 0, 0, "9F6E5B", "FBD19E", "805849", 1, 0, "8A5451", "EFC88E", "94504B", 2, 0, "88664F", "F9CD9A", "8F6447", 3, 0, "97664E", "E0B597", "7D5541", 4, 0, "76837A", "E8ECE7", "55615A", 5, 1, "73778D", "D9D1D3", "4F5469", 6, 1, "BC936E", "DECFBA", "99785A", 7, 1, "827C74", "DCD7CF", "69645C", 8, 1, "8C7C6F", "C2BAB4", "73665B", 9, 1, "888899", "FFFFFF", "009000"], this.init_board_color = function(t) {
        (t *= 5) < 0 && (t = 0), t > this.bd_colors.length - 5 && (t = this.bd_colors.length - 5), this.color_bsq = "#" + this.bd_colors[t], this.color_wsq = "#" + this.bd_colors[t + 1], this.color_bdb = "#" + this.bd_colors[t + 2], this.bdbg_img = this.bd_colors[t + 3], this.bdbg_tile = this.bd_colors[t + 4];
        var e = this.get_obj("board_decor_inner");
        e && (e.style.background = this.color_bdb)
    }, this.init_graphics_gk = function(t) {
        var e = 1,
            i = 40;
        0 == t ? (e = 2, i = 40) : 1 == t ? (e = 3, i = 40) : 2 == t ? (e = 1, i = 40) : 3 == t && (e = 1, i = 60), this.init_graphics_set(e, i)
    }, this.init_graphics_set = function(t, e) {
        t < 1 && (t = 1), 10 < t && (t = 10), e = (e = Math.floor(e / 10)) <= 2 ? 2 : e <= 3 ? 3 : e <= 4 ? 4 : e <= 5 ? 5 : e <= 6 ? 6 : 8, this.graphics_style = t, this.graphics_size = e, this.init_graphics()
    }, this.get_graphics_size = function() {
        return 0 < this.max_graphics_size && this.graphics_size > this.max_graphics_size ? this.max_graphics_size : 0 < this.min_graphics_size && this.graphics_size < this.min_graphics_size ? this.min_graphics_size : this.graphics_size
    }, this.reset_graphics = function() {
        this.chess_set_img = null, this.chess_set_img_small = null;
        var t = this.free_mover;
        t && t.parentNode && t.parentNode.removeChild(t), this.free_mover = null, this.mover_divs = []
    }, this.init_graphics = function(t, e) {
        if (!t) t = this.static_prefix + "/img/chess" + this.graphics_style + this.get_graphics_size() + ".png";
        if (!e) e = 10 * this.get_graphics_size();
        this.chess_set_img = new Image(3 * e, 6 * e), this.chess_set_img.src = t;
        var i = this.chess_set_img.style;
        i.position = "absolute", i.border = "0", i.visibility = "hidden", i.display = "block", this.board_cell_size = e;
        var s = Math.floor(e / 2),
            o = new Image(3 * s, 6 * s);
        (this.chess_set_img_small = o).src = t, (i = o.style).width = 3 * s + "px", i.height = 6 * s + "px", i.position = "absolute", i.border = "0", i.visibility = "hidden", i.display = "block", this.captive_cell_size = s
    }, this.disable_drag_events = function(t) {
        gk_event_callback(t, "mousedown", function(t) {
            return !1
        }), gk_event_callback(t, "dragstart", handler_absorb_event), gk_event_callback(t, "selectstart", handler_absorb_event)
    }, this.get_chess_set_img = function() {
        this.chess_set_img || this.init_graphics();
        var t = this.chess_set_img.cloneNode(!0);
        return this.disable_drag_events(t), t
    }, this.get_chess_set_img_small = function() {
        this.chess_set_img_small || this.init_graphics();
        var t = this.chess_set_img_small.cloneNode(!0);
        return this.disable_drag_events(t), t
    }, this.get_moves = function() {
        for (var t = "", e = 0; e < this.moves.length; e++) {
            t += this.moves[e].substr(0, 4) + this.validate_promo(this.moves[e].substr(4, 1))
        }
        return t
    }, this.get_moves_count = function() {
        return this.moves ? this.moves.length : 0
    }, this.validate_promo = function(t) {
        return t && "-" != t ? this.all_promos.indexOf(t) < 0 ? "-" : t : "-"
    }, this.get_handler_on_resize = function() {
        var t = this;
        return function() {
            return t.on_resize()
        }
    }, this.on_resize = function() {
        return this.update_dims(), this.update_moves_scroll(), !0
    }, gk_event_callback(window, "resize", this.get_handler_on_resize()), this.option_legal_moves = function() {
        return this.b_force_legal_moves ? 1 : this.b_legal_moves
    }, this.option_short_notation = function() {
        return this.b_force_short_notation ? 1 : this.b_short_notation
    }, this.go = function(t, e) {
        this.b_flip = t, this.initial_move = e, this.generate_all();
        var i = this;
        setTimeout(function() {
            i.update_moves_scroll()
        }, 1);
        var s = new this.create_mover(this, 0, 0, 0, 0, 0);
        s && s.destroy()
    }, this.set_styles = function(t) {
        var e = this.id + "-css",
            i = gk_get_el(e);
        i && i.parentNode.removeChild(i);
        var s = document.createElement("style");
        s.type = "text/css", s.id = e, s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t)), document.getElementsByTagName("head")[0].appendChild(s)
    }, this.generate_all = function(t) {
        if (document.body) {
            var e = document.createElement("div");
            e.style.border = "2px solid #888", e.style.width = "2px", e.style.height = "2px", e.style.padding = "0", e.style.margin = "0", document.body.appendChild(e), 0 < e.offsetWidth && e.offsetWidth < 6 && 1, document.body.removeChild(e)
        }
        var i = this.id + "-",
            s = 10 + Math.floor(this.board_cell_size / 3),
            o = 60 + Math.floor(this.board_cell_size / 2),
            _ = 1 + Math.floor((this.board_cell_size - 10) / 20),
            r = 1 + Math.floor(.4 * _),
            h = 20 + Math.floor(this.board_cell_size / 4),
            a = this.board_cell_size,
            l = this.captive_cell_size,
            n = [null, null, "#0000ff", "#00cc00", "#ffee00", "#ff00ee", "#9B30FF"];
        n = (n = n[this.n_highlight_last_move]) ? "border: 2px solid " + n : "border: 0";
        var c = "-webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;";
        this.set_styles("." + i + "piece { width: " + a + "px; height: " + a + "px; position: absolute; overflow: hidden; " + c + "}\n." + i + "piece IMG { position: absolute; " + c + "}\n." + i + "cap_piece { width: " + l + "px; height: " + l + "px; position: absolute; overflow: hidden; padding: 0; }\n." + i + "cap_piece IMG { position: absolute; }\n." + i + "promo_piece { width: " + a + "px; height: " + a + "px; position: relative; padding: 0; border: 1px solid #000; background-color: #9999aa; }\n." + i + "piece .selected { position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: transparent; " + n + "; }\n." + i + "piece .selected.wrn { border: 2px solid #ff0000; }\n." + i + "piece .selected.dim { border: 2px solid #6633ff; }\n." + i + "piece .selected.wrn:not(.oldbrowser) { border: 0; }\n." + i + "piece .selected.dim:not(.oldbrowser) { border: 0; }\n.square_w." + i + 'cellhlt::before { content: ""; position: absolute; top: 3px; bottom: 3px; left: 3px; right: 3px; background: transparent; border-radius: ' + Math.floor(this.board_cell_size / 4) + "px; box-shadow: 0px 0px 3px 1px #00aa22, inset 0px 0px 3px 1px #00aa22; -webkit-animation: animation_fade_in 0.1s ease 1; animation: animation_fade_in 0.1s ease 1; }\n.square_b." + i + 'cellhlt::before { content: ""; position: absolute; top: 3px; bottom: 3px; left: 3px; right: 3px; background: transparent; border-radius: ' + Math.floor(this.board_cell_size / 4) + "px; box-shadow: 0px 0px 3px 1px #00dd33, inset 0px 0px 3px 1px #00dd33; -webkit-animation: animation_fade_in 0.1s ease 1; animation: animation_fade_in 0.1s ease 1; }\n#" + i + "captives_w,#" + i + "captives_b { position: relative; padding: 0; }\n#" + i + "board_decor { margin: 0; border-top: " + _ + "px solid #ddd; border-left: " + _ + "px solid #ddd; border-bottom: " + _ + "px solid #999; border-right: " + _ + "px solid #999; padding: 0; }\n#" + i + "board_decor_inner { border-top: " + r + "px solid #999; border-left: " + r + "px solid #999; border-bottom: " + r + "px solid #ddd; border-right: " + r + "px solid #ddd; padding: " + _ + "px; background-color: " + this.color_bdb + "; }\n." + i + "vlbl TD { color: #888888; width: " + s + "px; text-align: center !important; font-size: " + o + "%; }\n." + i + "hlbl TD { color: #888888; height: " + s + "px; text-align: center !important; font-size: " + o + "%; }\n@keyframes animation_shake_x { from { margin-left: -2px; } 50% { margin-left: 2px; } to { margin-left: -2px; } }\n@keyframes animation_shake_y { from { margin-top: -2px; } 50% { margin-top: 2px; } to { margin-top: -2px; } }\n.shake_anim { animation: animation_shake_x 0.11s linear infinite, animation_shake_y 0.13s linear infinite; }\n@-webkit-keyframes animation_shake_x { from { margin-left: -2px; } 50% { margin-left: 2px; } to { margin-left: -2px; } }\n@-webkit-keyframes animation_shake_y { from { margin-top: -2px; } 50% { margin-top: 2px; } to { margin-top: -2px; } }\n.shake_anim { -webkit-animation: animation_shake_x 0.11s linear infinite, animation_shake_y 0.13s linear infinite; }\n#" + i + "score { width: " + h + "px; text-align: center; }\n");
        var d = [];
        d.push('<div style="overflow: hidden; white-space: nowrap; padding: 2px;" id="' + i + 'header">' + this.game_info + "</div>");
        var m = 8 * this.board_cell_size;
        this.board_frame_size = m + s + 2 * (2 * _ + r), d.push('<table class=row><tr><td style="vertical-align: top;"><table class=row style="width: ' + this.board_frame_size + 'px;"><tr><td><div id="' + i + 'vlbls"></div></td><td><div id="' + i + 'board_decor"><div id="' + i + 'board_decor_inner"><div><div id="' + i + 'acboard" style="width: ' + m + "px; height: " + m + "px; position: relative; padding: 0; " + c + '"></div></div></div></div></td></tr><tr><td id="' + i + 'my-side-color"></td><td><div id="' + i + 'hlbls"></div></td></tr></table>');
        var v = "";
        this.b_show_captures && (v += '<div id="' + i + 'show_captives" class=clearfix><div style="float: left;"><div class=subframe_flat style="padding: 5px; border: 0;"><table class=row><tr><td><div id="' + i + 'score"></div></td><td><div id="' + i + "captives_" + (this.b_flip ? "w" : "b") + '"></div><div id="' + i + "captives_" + (this.b_flip ? "b" : "w") + '"></div></td></tr></table></div></div></div>'), v += '<div style="visibility: hidden; display: none; width: ' + this.board_frame_size + 'px;" id="' + i + 'below-board"></div>', this.b_below_board_wide || d.push(v), d.push('</td><td style="padding-left: 4px; vertical-align: top; text-align: center; min-width: 190px;" id="' + i + 'right_pane">'), this.b_board_only || d.push('<div id="' + i + 'move_status" style="width: 120px;">-</div><div id="' + i + 'moves"></div><div id="' + i + 'check_status" style="text-align: center;">-</div>'), this.b_below_board_wide && d.push("</td></tr><tr><td colspan=2>" + v), d.push("</td></tr></table>"), this.b_board_only || (d.push('<div id="' + i + 'bottom-area" style="text-align: center; white-space: nowrap;"><div style="padding: 2px;">'), "function" == typeof this.callback_get_buttons_below_board ? d.push(this.callback_get_buttons_below_board()) : d.push('<input type="button" onClick="ichess_call_handler(this,\'goto_first_move\');" value=" &lt;&lt; " class=big> <input type="button" onClick="ichess_call_handler(this,\'prevmove\');" value="   &lt;   " class=big> <input type="button" onClick="ichess_call_handler(this,\'nextmove\');" value="   &gt;   " class=big> <input type="button" onClick="ichess_call_handler(this,\'goto_last_move\');" value=" &gt;&gt; " class=big>'), "function" == typeof this.callback_add_buttons_below_board && d.push(this.callback_add_buttons_below_board()), d.push('</div><div id="' + i + 'footer" style="padding: 1px;">'), "function" == typeof this.callback_get_links_below_board ? d.push(this.callback_get_links_below_board()) : d.push('<a href="javascript:void(0);" onClick="ichess_call_handler(this,\'reset_all\')" title="reset to the original position on the board">Reset</a>' + this.menu_delim + '<a href="javascript:void(0);" onClick="ichess_call_handler(this,\'flip\')" title="flip the board, as if playing the opposite side">Flip</a>' + this.menu_delim + '<a href="javascript:void(0);" onClick="ichess_call_handler(this,\'show_printable\')" title="printable version of this page">Print</a>' + this.menu_delim + '<a href="javascript:void(0);" onClick="ichess_call_handler(this,\'show_fen\')" title="get the FEN notation for the current position on the board">FEN</a>' + this.menu_delim + '<a href="javascript:void(0);" onClick="ichess_call_handler(this,\'show_options\')" title="change options">Options&hellip;</a>'), d.push('</div><div style="white-space: normal; padding: 1px;" id="' + i + 'help">&nbsp;</div></div>'));
        var b = this.get_obj();
        b && (this.b_full_page || this.b_integrated || (b.style.padding = "3px"), b.innerHTML = d.join("")), this.init_board(), "function" == typeof this.callback_setup_board_elements && this.callback_setup_board_elements(), this.update_labels(), this.reset_board(t), this.redraw_all()
    }, this.get_free_mover = function(t) {
        if (!this.free_mover) {
            if (t) return null;
            var e = document.createElement("div");
            e.className = this.id + "-piece", this.disable_drag_events(e), document.body.appendChild(e), e.appendChild(this.get_chess_set_img()), e.style.visibility = "hidden", e.style.display = "none", this.free_mover = e
        }
        return this.free_mover
    }, this.encode_pos = function(t, e) {
        return String.fromCharCode(97 + t) + (e + 1)
    }, this.decode_pos = function(t) {
        return [t.charCodeAt(0) - 97, t.charCodeAt(1) - 49]
    }, this.decode_fen = function(t, e) {
        var i = 0,
            s = 0,
            o = 0,
            _ = 7;
        for (this.bitboard.splice(0, this.bitboard.length), this.king_w = [], this.king_b = []; s < t.length;) {
            var r = t.charAt(s);
            if ("/" == r) {
                for (; o < 8;) this.bitboard[o + 8 * _] = 0, o++;
                if (--_ < (o = 0)) break
            } else if (0 <= "12345678".indexOf(r))
                for (i = parseInt(r); 0 < i && !(8 <= o && --_ < (o = 0));) this.bitboard[o + 8 * _] = 0, o++, i--;
            else {
                var h = 0,
                    a = this.piece2code[r];
                if (!a) {
                    if (r = r.toLowerCase(), !(a = this.piece2code[r])) break;
                    h = 16
                }
                var l = 6 == a && (h && 1 == _ || !h && 6 == _) ? 1 : 0;
                if (8 <= o && --_ < (o = 0)) break;
                if (1 == a)(h ? this.king_w : this.king_b).length ? l = h = a = 0 : h ? this.king_w = [o, _] : this.king_b = [o, _];
                this.bitboard[o + 8 * _] = a | h | (l ? 32 : 0), o++
            }
            s++
        }
        for (; 0 <= _;) {
            for (; o < 8;) this.bitboard[o + 8 * _] = 0, o++;
            o = 0, _--
        }
        if (!e) {
            this.king_w.length || (this.bitboard[4] = 17, this.king_w = [4, 0]), this.king_b.length || (this.bitboard[60] = 1, this.king_b = [4, 7]);
            for (var n = 0; n < 8; n++) {
                var c = 15 & this.bitboard[n];
                6 == c && (this.bitboard[n] = 0), 6 == (c = 15 & this.bitboard[n + 56]) && (this.bitboard[n + 56] = 0)
            }
        }
        for (var d = "w"; s < t.length;) {
            if (" " != (v = t.charAt(s++)) && "\t" != v) {
                d = "b" == v ? "b" : "w";
                break
            }
        }
        for (var m = 0; s < t.length;) {
            if (" " != (v = t.charAt(s++)) && "\t" != v) m = 1, "Q" == v ? (17 == this.bitboard[4] && (this.bitboard[4] |= 32), 19 == this.bitboard[0] && (this.bitboard[0] |= 32)) : "K" == v ? (17 == this.bitboard[4] && (this.bitboard[4] |= 32), 19 == this.bitboard[7] && (this.bitboard[7] |= 32)) : "q" == v ? (1 == this.bitboard[60] && (this.bitboard[60] |= 32), 3 == this.bitboard[56] && (this.bitboard[56] |= 32)) : "k" == v && (1 == this.bitboard[60] && (this.bitboard[60] |= 32), 3 == this.bitboard[63] && (this.bitboard[63] |= 32));
            else if (m) break
        }
        for (this.en_passant_x = -1, this.en_passant_y = -1; s < t.length;) {
            var v;
            if (" " != (v = t.charAt(s++)) && "\t" != v) {
                if (s < t.length) {
                    var b = t.charAt(s++),
                        p = this.decode_pos(v + b);
                    if (0 <= p[0] && p[0] < 8 && (2 == p[1] || 5 == p[1])) {
                        var u = p[0] + 8 * p[1];
                        this.bitboard[u] || (this.en_passant_x = p[0], this.en_passant_y = p[1])
                    }
                }
                break
            }
        }
        return d
    }, this.encode_fen = function(t) {
        t = t || this.cur_to_move;
        for (var e = "", i = this.en_passant_x < 0 ? "-" : this.encode_pos(this.en_passant_x, this.en_passant_y), s = 0; s <= 7; s++) {
            0 < s && (e += "/");
            for (var o = 7 - s, _ = 0, r = 0; r <= 7; r++) {
                var h = this.bitboard[r + 8 * o];
                if (h) {
                    var a = 15 & h;
                    _ && (e += _, _ = 0), e += 16 & h ? this.code2pieceU[a] : this.code2piece[a]
                } else _++
            }
            0 < _ && (e += _)
        }
        var l = "";
        return 49 == this.bitboard[4] && (51 == this.bitboard[7] && (l += "K"), 51 == this.bitboard[0] && (l += "Q")), 33 == this.bitboard[60] && (35 == this.bitboard[63] && (l += "k"), 35 == this.bitboard[56] && (l += "q")), "" == l && (l = "-"), e + " " + t + " " + l + " " + i
    }, this.get_width = function() {
        var t = this.board_cell_size;
        return 9 * t + (30 + (this.b_show_moves ? 180 : 0) + 2 * t)
    }, this.get_height = function() {
        var t = this.board_cell_size;
        return 9 * t + (160 + (this.b_show_captures ? 60 : 0) + t)
    }, this.update_dims = function() {
        if (!this.b_integrated) {
            var t = this.get_obj();
            if (t) {
                var e = this.get_obj("footer");
                if (e) {
                    var i = this.b_full_page ? gk_doc_width() - 10 : this.get_width(),
                        s = this.b_full_page ? gk_doc_height() - 10 : this.get_height();
                    this.b_full_page || (s = gk_get_absolute_pos_top(e) + e.offsetHeight - gk_get_absolute_pos_top(t) + 10), (!i || i < 100) && (i = 100), (!s || s < 100) && (s = 100), t.style.width = i + "px", t.style.height = s + "px";
                    var o = this.get_obj("header");
                    o && (o.style.width = i - 8 + "px")
                }
            }
        }
    }, this.set_square_background = function(t, e, i) {
        var s = e + i & 1;
        set_css_class(t, "square_w", s), set_css_class(t, "square_b", !s);
        var o = s ? this.color_wsq : this.color_bsq;
        if (this.bdbg_img) {
            var _ = Math.floor((this.bdbg_tile ? 2.5 : 1.5) * this.board_cell_size),
                r = new prnd(43 * e + 3 * i),
                h = r.rnd(_),
                a = r.rnd(_),
                l = s ? "w" : "b";
            t.style.background = o + " url(" + this.static_prefix + "/img/chess-bg" + l + this.bdbg_img + this.get_graphics_size() + ".jpg) repeat -" + h + "px -" + a + "px"
        } else t.style.background = o;
        if ("m" != this.media) {
            var n = 1 + Math.floor(this.board_cell_size / 20);
            s || (bst = "inset 0 0 " + n + "px rgba(0,0,0,0.5)", t.style.webkitBoxShadow = bst, t.style.boxShadow = bst)
        }
    }, this.on_touch_stop = function(t) {
        return this.clear_mouseover_cell(), this.abort_mouse_move(1), gk_stop_event(t || window.event), !1
    }, this.init_board = function() {
        var t = this.get_obj("acboard");
        (this.board = t).innerHTML = "", t.style.width = 8 * this.board_cell_size + "px", t.style.height = 8 * this.board_cell_size + "px";
        var e = this;
        gk_event_callback(t, "mousedown", function(t) {
            return e.on_mouse_down(t || window.event)
        }), gk_event_callback(t, "touchstart", function(t) {
            return e.on_mouse_down(t || window.event, 1)
        }), gk_event_callback(t, "touchend", function(t) {
            return e.on_mouse_drag_stop(t || window.event, 1)
        }), gk_event_callback(t, "touchmove", function(t) {
            return e.on_mouse_drag(t || window.event, 1)
        }), gk_event_callback(t, "touchcancel", function(t) {
            return e.on_touch_stop(t || window.event)
        }), gk_event_callback(t, "touchleave", function(t) {
            return e.on_touch_stop(t || window.event)
        });
        var i = t.parentNode;
        i.removeChild(t);
        for (var s = 0; s < 8; s++)
            for (var o = 0; o < 8; o++) {
                (l = document.createElement("div")).className = this.id + "-piece";
                var _ = (this.b_flip ? 7 - s : s) * this.board_cell_size,
                    r = (this.b_flip ? o : 7 - o) * this.board_cell_size;
                l.style.left = _ + "px", l.style.top = r + "px", l.style.zIndex = 0, this.set_square_background(l, s, o), l.appendChild(this.get_chess_set_img()), this.g_board[s + 8 * o] = l, t.appendChild(l)
            }
        i.appendChild(t);
        for (var h = 0; h < 2; h++) {
            var a = this.get_obj(0 == h ? "captives_w" : "captives_b");
            if (a) {
                a.innerHTML = "", a.style.width = this.max_captives * this.captive_cell_size + "px", a.style.height = this.captive_cell_size + "px";
                for (s = 0; s < this.max_captives; s++) {
                    var l;
                    (l = document.createElement("div")).className = this.id + "-cap_piece", l.style.left = s * this.captive_cell_size + "px", l.style.top = "0", l.appendChild(this.get_chess_set_img_small()), 0 == h ? this.g_captives_w[s] = l : this.g_captives_b[s] = l, a.appendChild(l), this.update_captive_image(l, 0)
                }
            }
        }
    }, this.reset_board = function(t) {
        t || (this.max_move = this.orig_max_move, this.moves = this.orig_moves.slice(), this.first_user_move = -1), (_ = this.get_obj("show_captives")) && (_.style.visibility = this.b_show_captures ? "visible" : "hidden", _.style.display = this.b_show_captures ? "" : "none"), (_ = this.get_obj("moves")) && (_.style.visibility = this.b_show_moves ? "visible" : "hidden", _.style.display = this.b_show_moves ? "block" : "none"), this.update_dims(), this.goto_move(this.max_move, 1), 0 <= this.initial_move && this.goto_move(this.initial_move), this.scroll_to(this.get_obj("mv1"), 1), "function" == typeof this.callback_reset_board && this.callback_reset_board()
    }, this.redraw_elem = function(t) {
        if (t) {
            var e = t.style.display;
            t.style.display = "none", t.style.display = e
        }
    }, this.update_labels = function() {
        var t = this.get_obj("hlbls");
        if (t) {
            for (var e = '<table border=0 cellspacing=0 cellpadding=0 class="' + this.id + '-hlbl"><tr><td width=5></td>', i = 0; i < 8; i++) e += "<td width=" + this.board_cell_size + ">" + String.fromCharCode(97 + (this.b_flip ? 7 - i : i)) + "</td>";
            e += "</tr></table>", t.innerHTML = e
        }
        if (t = this.get_obj("vlbls")) {
            e = '<table border=0 cellspacing=0 cellpadding=0 class="' + this.id + '-vlbl"><tr height=5><td></td></tr>';
            for (var s = 0; s < 8; s++) e += "<tr><td height=" + this.board_cell_size + ">" + String.fromCharCode(49 + (this.b_flip ? s : 7 - s)) + "</td></tr>";
            e += "</table>", t.innerHTML = e
        }
        if (t = this.get_obj("my-side-color")) {
            var o = "player_white",
                _ = "White",
                r = "W";
            this.b_flip && (o = "player_black", _ = "Black", r = "B"), t.innerHTML = "<div class=" + o + ' style="cursor: help; padding: 1px;" onMouseOver="pb_show(event,\'You are playing as ' + _ + "');\">" + r + "</div>"
        }
    }, this.click_move = function(t) {
        "function" == typeof this.callback_click_move ? this.callback_click_move(t) : this.anim_move(t)
    }, this.goto_first_move = function() {
        if (!this.b_printable_mode && !this.promo_move_coords) {
            var t = [0, this.first_user_move];
            null != this.initial_move && (this.initial_move < this.first_user_move || this.first_user_move < 0) && t.push(this.initial_move), t.sort(function(t, e) {
                return t - e
            });
            for (var e = 0, i = 0; i < t.length; i++) {
                var s = t[i];
                if (!(s < 0)) {
                    if (s >= this.current_move) break;
                    e = s
                }
            }
            this.anim_move(e)
        }
    }, this.goto_last_move = function() {
        if (!this.b_printable_mode && !this.promo_move_coords) {
            var t = [this.first_user_move, this.max_move];
            null != this.initial_move && (this.initial_move < this.first_user_move || this.first_user_move < 0) && t.push(this.initial_move), t.sort(function(t, e) {
                return e - t
            });
            for (var e = this.max_move, i = 0; i < t.length; i++) {
                var s = t[i];
                if (!(s < 0)) {
                    if (s <= this.current_move) break;
                    e = s
                }
            }
            this.anim_move(e)
        }
    }, this.anim_move = function(t) {
        var e = this.current_move > t ? 1 : 0;
        this.board_snapshot(), this.goto_move(t, 0), this.board_snapshot_diff(e), this.redraw_all()
    }, this.goto_move = function(t, e, i) {
        this.abort_mouse_move(0, 1), i || (this.cur_to_move = this.decode_fen(this.start_fen, this.b_allow_any_fen));
        var s, o, _, r, h, a, l = "w" == this.cur_to_move ? 16 : 0,
            n = this.current_move;
        this.current_move = t, this.current_move < 0 && (this.current_move = 0), this.current_move > this.max_move && (this.current_move = this.max_move), this.update_move_cell(n), e && !i && (this.moves_list = []), i || (this.cur_captive_w = 0, this.cur_captive_b = 0), this.b_in_check = 0, this.b_checkmate = 0;
        for (var c = i ? this.current_move - 1 : 0; c < this.current_move; c++) {
            h = this.moves[c], a = this.validate_promo(h.substr(4, 1)), s = h.charCodeAt(0) - 97, o = h.charCodeAt(1) - 49, _ = h.charCodeAt(2) - 97, r = h.charCodeAt(3) - 49;
            var d = this.chess_make_move(s, o, _, r, a);
            if (this.record_captive(d[0]), l = l ? 0 : 16, e) {
                var m = c + 1 == this.current_move,
                    v = d[1];
                if (!this.option_short_notation()) v = h.substr(0, 2) + "-" + h.substr(2, 2);
                this.b_in_check = 0, this.chess_in_check(l) && (this.b_in_check = 1, m && this.chess_checkmate(l) && (this.b_checkmate = 1), v += this.b_checkmate ? "#" : "+"), this.moves_list.push(v)
            }
        }
        this.cur_to_move = l ? "w" : "b", this.update_to_move(), e || (this.b_in_check = this.chess_in_check(l), this.b_checkmate = this.chess_checkmate(l));
        var b, p = this.get_obj("check_status");
        p && (this.b_checkmate ? b = '<img class=img-i src="/img/i/crown.png">CHECKMATE' : this.b_in_check && (b = '<img class=img-i src="/img/i/crown-silver.png">CHECK'), b = b ? "<em class=wrn>" + b + "</em>" : "&nbsp;", p.innerHTML = b);
        e && this.update_moves_list()
    }, this.abort_mouse_move = function(t, e) {
        0 <= this.sel_x && 0 <= this.sel_y && this.sel_x < 8 && this.sel_y < 8 && (t && (this.movers.push(new this.create_mover_free(this, this.free_mover_x - gk_get_absolute_pos_left(this.board), this.free_mover_y - gk_get_absolute_pos_top(this.board), this.sel_x, this.sel_y, this.sel_pc)), this.start_movers()), this.bitboard[this.sel_x + 8 * this.sel_y] = this.sel_pc, e || this.update_cell_image(this.sel_x, this.sel_y, 0)), this.end_mouse_move(e)
    }, this.end_mouse_move = function(t) {
        if (this.reset_canmoves(), this.sel_x = -1, this.sel_y = -1, this.sel_pc = 0, !t) {
            var e = this.get_free_mover(1);
            e && (e.style.visibility = "hidden", e.style.display = "none")
        }
        this.mouse_move = 0
    }, this.update_move_cell = function(t, e) {
        if (this.b_show_moves) {
            var i = this.get_obj("mv" + t);
            if (i) {
                var s = "";
                t == this.current_move ? s = "hlt_text" : e && (s = "hlt_text_mo"), set_css_class(i, "hlt_text", "hlt_text" == s), set_css_class(i, "hlt_text_mo", "hlt_text_mo" == s), (this.b_movelist_text || this.b_force_movelist_text) && (i.style.fontWeight = t == this.current_move ? "bold" : "normal")
            }
        }
    }, this.move_to_text = function(t) {
        return this.b_movelist_fig ? "<span class=fig-all>" + t + "</span>" : t
    }, this.get_movelist_text = function() {
        var t = this.start_plyr(),
            e = this.moves_list.slice();
        "w" != t && e.unshift("...");
        for (var i = [], s = 0; s < e.length; s++) {
            var o = this.move_to_text(e[s]),
                _ = this.start_move_offset + s / 2 + 1;
            i.push((1 & s ? "" : _ + ". ") + o)
        }
        return i.join(" ")
    }, this.update_moves_list = function() {
        if (this.b_show_moves) {
            var t = this.get_obj("moves");
            if (t) {
                var e = t.style,
                    i = 8 * this.board_cell_size - 8;
                e.maxHeight = i + "px", e.overflowY = "auto", e.overflowX = "hidden";
                var s = this.id + "-",
                    o = this.start_plyr(),
                    _ = "w" == o ? 1 : 0,
                    r = this.moves_list.slice();
                if ("w" != o && r.unshift("..."), this.b_movelist_text || this.b_force_movelist_text) {
                    for (var h = [], a = 0; a < r.length; a++) {
                        var l = this.move_to_text(r[a]),
                            n = this.start_move_offset + a / 2 + 1,
                            c = a + _;
                        h.push((1 & a ? "" : "<em class=sml>" + n + ".</em>&nbsp;") + '<span id="' + s + "mv" + c + '" onMouseOver="ichess_handler_mouseover(this,' + c + ')" onMouseOut="ichess_handler_mouseout(this,' + c + ')" onClick="ichess_handler_click_move(this,' + c + ')">' + l + "</span>")
                    }
                    t.innerHTML = '<div id="' + s + 'moves_list" style="line-height: 18px;">' + h.join("<wbr> ") + "</div>"
                } else {
                    var d = [];
                    for (a = 0; a < r.length; a++) {
                        l = this.move_to_text(r[a]), n = this.start_move_offset + a / 2 + 1, c = a + _;
                        d.push("<tr><th>" + n + '.</th><td id="' + s + "mv" + c + '" onMouseOver="ichess_handler_mouseover(this,' + c + ')" onMouseOut="ichess_handler_mouseout(this,' + c + ')" onClick="ichess_handler_click_move(this,' + c + ')">' + l + "</td>"), c++, l = "", ++a < r.length && (l = this.move_to_text(r[a])), d.push('<td id="' + s + "mv" + c + '" onMouseOver="ichess_handler_mouseover(this,' + c + ')" onMouseOut="ichess_handler_mouseout(this,' + c + ')" onClick="ichess_handler_click_move(this,' + c + ')">' + l + "</td></tr>")
                    }
                    t.innerHTML = '<table id="' + s + 'moves_list" class=dtable style="margin: 4px auto;">' + d.join("") + "</table>"
                }
                "function" == typeof this.callback_update_moves_list && this.callback_update_moves_list(), this.update_current_move()
            }
        }
    }, this.update_moves_scroll = function() {
        var t = this.current_move;
        t < 1 && (t = 1), this.scroll_to(this.get_obj("mv" + t), 1)
    }, this.update_scrollbar = function() {}, this.update_moves_list_printable = function() {
        var t = this.get_obj("moves");
        t && (t.innerHTML = "", t.style.display = "none", t.style.visibility = "hidden");
        var e = "";
        for (i = 0; i < this.moves_list.length; i++) {
            if (i == this.current_move - 1 && (e += "<b>"), i % 2 == 0) e += this.start_move_offset + i / 2 + 1 + ".&nbsp;";
            e += this.moves_list[i] + " ", i == this.current_move - 1 && (e += "</b>")
        }
        var s = document.createElement("div");
        s.id = "moves_printable", s.style.padding = "5px", t.parentNode.insertBefore(s, t), s.innerHTML = e
    }, this.update_to_move = function() {
        var t = this.get_obj("move_status");
        t && (this.b_freestyle ? t.innerHTML = "(" + (this.b_flip ? "black" : "white") + " to move)" : this.b_checkmate ? t.innerHTML = "&nbsp;" : t.innerHTML = "(" + ("w" == this.cur_to_move ? "white" : "black") + " to move)")
    }, this.chess_make_move = function(t, e, i, s, o, _) {
        var r = o ? this.piece2code[o.toLowerCase()] : 0;
        r || (r = 0);
        var h = this.bitboard[t + 8 * e],
            a = 16 & h,
            l = 15 & h,
            n = 32 & h,
            c = a | l,
            d = 6 == l ? "" : this.code2pieceU[l],
            m = 0,
            v = "",
            b = this.bitboard[i + 8 * s];
        if (r && 6 == l && (a && 7 == s || !a && 0 == s) ? (c = a | r, v = "=" + o.toUpperCase()) : this.en_passant_x != i || this.en_passant_y != s || 6 != l || t + 1 != i && t - 1 != i || (6 == (15 & (m = this.bitboard[i + 8 * e])) ? (this.bitboard[i + 8 * e] = 0, v = " e.p.") : m = 0), this.en_passant_y = 6 != l || !n || t != i || e + 2 != s && e - 2 != s ? this.en_passant_x = -1 : (this.en_passant_x = i, (e + s) / 2), m || (m = b), !_) {
            var p = "";
            if (6 == l) m && (p = String.fromCharCode(97 + t));
            else {
                var u = this.chess_find_ambiguity(t, e, i, s, h);
                null != u && (p = 0 == u || 1 == u ? String.fromCharCode(97 + t) : 2 == u ? String(e + 1) : String.fromCharCode(97 + t) + (e + 1))
            }
            var f = "";
            m && (f = "x"), d += p + f + (String.fromCharCode(97 + i) + (s + 1)) + v
        }
        if (this.bitboard[t + 8 * e] = 0, this.bitboard[i + 8 * s] = c, 1 == l && (a ? this.king_w = [i, s] : this.king_b = [i, s]), 1 == l && n && e == s && (0 == s && a || 7 == s && !a) && (t + 2 == i ? (this.bitboard[t + 1 + 8 * s] = -33 & this.bitboard[7 + 8 * s], this.bitboard[7 + 8 * s] = 0, d = "O-O") : t - 2 == i && (this.bitboard[t - 1 + 8 * s] = -33 & this.bitboard[0 + 8 * s], this.bitboard[0 + 8 * s] = 0, d = "O-O-O")), !_) return [m, d]
    }, this.chess_find_ambiguity = function(t, e, i, s, o) {
        o &= 31;
        for (var _ = void 0, r = 0; r < 8; r++)
            for (var h = 0; h < 8; h++) {
                if (r != t || h != e)
                    if (r != i || h != s)
                        if ((31 & this.bitboard[r + 8 * h]) == o && this.chess_valid_move(r, h, i, s) && !this.chess_collision(r, h, i, s) && (null == _ && (_ = 0), r == t && (_ |= 2), h == e && (_ |= 1), 3 == _)) return _
            }
        return _
    }, this.record_captive = function(t) {
        if (this.b_show_captures && 15 & t) {
            var e;
            if (16 & t) {
                if (this.cur_captive_w >= this.max_captives) return;
                e = this.g_captives_w[this.cur_captive_w], this.cur_captive_w++
            } else {
                if (this.cur_captive_b >= this.max_captives) return;
                e = this.g_captives_b[this.cur_captive_b], this.cur_captive_b++
            }
            this.update_captive_image(e, t)
        }
    }, this.chess_in_check = function(t) {
        var e = t ? this.king_w : this.king_b;
        if (!e || e.length < 2) return 0;
        for (var i = -1; i <= 1; i++)
            for (var s = -1; s <= 1; s++) {
                var o = e[0],
                    _ = e[1];
                if (0 != s || 0 != i)
                    for (; o += s, !((_ += i) < 0 || 7 < _ || o < 0 || 7 < o);) {
                        if (h = this.bitboard[o + 8 * _]) {
                            if (16 & h ^ t && this.chess_valid_move(o, _, e[0], e[1])) return 1;
                            break
                        }
                    }
            }
        for (i = -1; i <= 1; i += 2)
            for (s = -1; s <= 1; s += 2)
                for (var r = 2; r <= 3; r++) {
                    var h;
                    o = e[0] + s * (4 - r), _ = e[1] + i * (r - 1);
                    if (!(o < 0 || 7 < o || _ < 0 || 7 < _))
                        if (16 & (h = this.bitboard[o + 8 * _]) ^ t && 4 == (15 & h)) return 1
                }
        return 0
    }, this.chess_valid_move = function(t, e, i, s) {
        var o = i - t,
            _ = s - e,
            r = this.bitboard[t + 8 * e],
            h = 32 & r,
            a = 15 & r,
            l = 16 & r;
        if (1 == a && h && 2 == Math.abs(o) && 0 == _) return this.chess_castling(t, e, o, _, l);
        if (1 == a) return 1 == this.chess_biggest(o, _);
        if (2 == a) return 0 != o && 0 == _ ? 1 : 0 == o && 0 != _ ? 1 : o == _ || o == -_ ? 1 : 0;
        if (5 == a) return o == _ || o == -_;
        if (4 == a) return 2 == Math.abs(o) && 1 == Math.abs(_) ? 1 : 1 == Math.abs(o) && 2 == Math.abs(_) ? 1 : 0;
        if (3 == a) return 0 != o && 0 == _ ? 1 : 0 == o && 0 != _ ? 1 : 0;
        if (6 != a) return 0;
        if (l && _ <= 0) return 0;
        if (!l && 0 <= _) return 0;
        var n = this.bitboard[i + 8 * s];
        if (6 == a && h && 0 == o && 2 == Math.abs(_)) return n ? 0 : 1;
        if (1 != this.chess_biggest(o, _)) return 0;
        if (0 == o) return n ? 0 : 1;
        if (n) return 1;
        var c = this.bitboard[i + 8 * e];
        return this.en_passant_x == i && this.en_passant_y == s && c && 16 & c ^ l ? 1 : 0
    }, this.chess_collision = function(t, e, i, s) {
        var o = i - t;
        0 < o ? o = 1 : o < 0 && (o = -1);
        var _ = s - e;
        0 < _ ? _ = 1 : _ < 0 && (_ = -1);
        var r = this.bitboard[t + 8 * e],
            h = 16 & r,
            a = 0;
        if (4 == (r &= 15)) t = i, e = s;
        else
            for (t += o, e += _;
                (t != i || e != s) && !(t < 0 || 7 < t || e < 0 || 7 < e);) {
                if (this.bitboard[t + 8 * e]) {
                    a = 1;
                    break
                }
                t += o, e += _
            }
        if (!a) {
            var l = this.bitboard[t + 8 * e];
            !l || 16 & l ^ h || (a = 1)
        }
        return a
    }, this.chess_castling = function(t, e, i, s, o) {
        if (0 != s) return 0;
        var _ = i < 0 ? 0 : 7;
        i = 0 < _ ? 1 : -1;
        var r = this.bitboard[_ + 8 * e];
        if (35 != (47 & r)) return 0;
        if (16 & r ^ o) return 0;
        for (var h = t + i; h != _; h += i)
            if (this.bitboard[h + 8 * e]) return 0;
        if (this.chess_in_check(o)) return 0;
        var a = t + 8 * e,
            l = this.bitboard[a];
        if (33 != (47 & l)) return 0;
        this.bitboard[a + i] = 31 & l, this.bitboard[a] = 0, o ? this.king_w = [t + i, e] : this.king_b = [t + i, e];
        var n = this.chess_in_check(o);
        return this.bitboard[a + i] = 0, this.bitboard[a] = l, o ? this.king_w = [t, e] : this.king_b = [t, e], !n
    }, this.chess_save_state = function() {
        return {
            ep_x: this.en_passant_x,
            ep_y: this.en_passant_y,
            board: this.bitboard.slice(),
            king_w: this.king_w.slice(),
            king_b: this.king_b.slice()
        }
    }, this.chess_restore_state = function(t) {
        this.en_passant_x = t.ep_x, this.en_passant_y = t.ep_y, this.bitboard = t.board.slice(), this.king_w = t.king_w.slice(), this.king_b = t.king_b.slice()
    }, this.chess_can_move = function(t, e, i, s, o) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) return 0;
        if (i < 0 || 7 < i || s < 0 || 7 < s) return 0;
        if (t == i && e == s) return 0;
        var _ = this.bitboard[t + 8 * e];
        if (!_) return 0;
        if (16 & _ ^ o) return 0;
        if (!this.chess_valid_move(t, e, i, s)) return 0;
        if (this.chess_collision(t, e, i, s)) return 0;
        var r = this.chess_save_state();
        this.chess_make_move(t, e, i, s, "q", 1);
        var h = this.chess_in_check(o);
        return h && (this.b_pinned = 1), this.chess_restore_state(r), !h
    }, this.chess_checkmate_move_coords = function(t) {
        var e = this.chess_decode_move(t);
        return this.chess_checkmate_move(e[0], e[1], e[2], e[3])
    }, this.chess_checkmate_move = function(t, e, i, s, o) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) return 0;
        if (i < 0 || 7 < i || s < 0 || 7 < s) return 0;
        if (t == i && e == s) return 0;
        var _ = 16 & this.bitboard[t + 8 * e];
        if (!this.chess_valid_move(t, e, i, s)) return 0;
        if (this.chess_collision(t, e, i, s)) return 0;
        var r = this.chess_save_state();
        this.chess_make_move(t, e, i, s, o || "q", 1);
        var h = 0;
        return this.chess_in_check(_) || (h = this.chess_checkmate(_ ? 0 : 16)), this.chess_restore_state(r), h
    }, this.chess_move_notation = function(t, e, i, s, o) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) return "";
        if (i < 0 || 7 < i || s < 0 || 7 < s) return "";
        if (t == i && e == s) return "";
        var _ = this.encode_pos(t, e),
            r = this.encode_pos(i, s),
            h = 16 & this.bitboard[t + 8 * e];
        h = h ? 0 : 16;
        var a = this.chess_save_state(),
            l = this.chess_make_move(t, e, i, s, o),
            n = this.chess_in_check(h);
        this.chess_restore_state(a);
        var c = this.option_short_notation() ? l[1] : _ + "-" + r;
        return n && (c += "+"), c
    }, this.chess_checkmate_in_one = function(t) {
        for (var e = 0; e < 8; e++)
            for (var i = 0; i < 8; i++) {
                var s = this.bitboard[e + 8 * i];
                if (s && !(16 & s ^ t))
                    for (var o = this.chess_moves_available(e, i), _ = 0; _ < o.length; _++) {
                        var r = o[_][0],
                            h = o[_][1];
                        if (this.is_pawn_promo_move(e, i, r, h)) {
                            if (this.chess_checkmate_move(e, i, r, h, "q")) return this.chess_encode_move(e, i, r, h, "q");
                            if (this.chess_checkmate_move(e, i, r, h, "r")) return this.chess_encode_move(e, i, r, h, "r");
                            if (this.chess_checkmate_move(e, i, r, h, "n")) return this.chess_encode_move(e, i, r, h, "n");
                            if (this.chess_checkmate_move(e, i, r, h, "b")) return this.chess_encode_move(e, i, r, h, "b")
                        } else if (this.chess_checkmate_move(e, i, r, h)) return this.chess_encode_move(e, i, r, h)
                    }
            }
        return ""
    }, this.chess_biggest = function(t, e) {
        return t = Math.abs(t), (e = Math.abs(e)) < t ? t : e
    }, this.chess_smallest = function(t, e) {
        return (t = Math.abs(t)) < (e = Math.abs(e)) ? t : e
    }, this.chess_moves_available = function(t, e, i) {
        var s = this.bitboard[t + 8 * e],
            o = 16 & s,
            _ = [];
        if (4 == (15 & s))
            for (var r = -1; r <= 1; r += 2)
                for (var h = -1; h <= 1; h += 2)
                    for (var a = 2; a <= 3; a++) {
                        var l = t + h * (4 - a),
                            n = e + r * (a - 1);
                        if (this.chess_can_move(t, e, l, n, o)) {
                            if (i) return 1;
                            _.push([l, n])
                        }
                    } else
                        for (r = -1; r <= 1; r++)
                            for (h = -1; h <= 1; h++)
                                if (0 != h || 0 != r)
                                    for (l = t + h, n = e + r; 0 <= l && l < 8 && 0 <= n && n < 8 && this.chess_valid_move(t, e, l, n) && !this.chess_collision(t, e, l, n);) {
                                        var c = this.chess_save_state();
                                        this.chess_make_move(t, e, l, n, "q", 1);
                                        var d = this.chess_in_check(o);
                                        if (d && (this.b_pinned = 1), this.chess_restore_state(c), !d) {
                                            if (i) return 1;
                                            _.push([l, n])
                                        }
                                        l += h, n += r
                                    }
        return i ? 0 : _
    }, this.match_absolute_pos = function(t) {
        var e = this.get_obj();
        e && (t.style.top = gk_get_absolute_pos_top(e) + "px", t.style.left = gk_get_absolute_pos_left(e) + "px", t.style.height = e.offsetHeight + "px", t.style.width = e.offsetWidth + "px")
    }, this.center_absolute_pos = function(t) {
        var e = this.board || this.get_obj();
        e && (t.style.top = gk_get_absolute_pos_top(e) + Math.round((e.offsetHeight - t.offsetHeight) / 2) + "px", t.style.left = gk_get_absolute_pos_left(e) + Math.round((e.offsetWidth - t.offsetWidth) / 2) + "px")
    }, this.redraw_all = function(t) {
        this.abort_mouse_move(0), this.refresh_cells = [];
        for (var e = 0; e < 8; e++)
            for (var i = 0; i < 8; i++) this.update_cell_image(e, i, 0);
        if (t || this.highlight_last_move(), this.b_show_captures) {
            for (e = this.cur_captive_w; e < this.max_captives; e++) this.update_captive_image(this.g_captives_w[e], 0);
            for (e = this.cur_captive_b; e < this.max_captives; e++) this.update_captive_image(this.g_captives_b[e], 0)
        }
        this.update_current_move(), this.update_score(), this.update_mouseover_cell(), "function" == typeof this.callback_update_move && this.callback_update_move()
    }, this.hilite_move = function(t) {
        if (t) {
            this.hilited_move = t;
            e = this.chess_decode_move(t);
            this.update_cell_image(e[0], e[1], 2), this.update_cell_image(e[2], e[3], 2)
        } else if (this.hilited_move) {
            var e = this.chess_decode_move(this.hilited_move);
            this.update_cell_image(e[0], e[1]), this.update_cell_image(e[2], e[3]), this.hilited_move = void 0
        }
    }, this.update_cell_cursor = function(t, e) {
        var i = this.g_board[t + 8 * e];
        if (i) {
            var s = "default";
            this.b_allow_new_moves && this.chess_can_start_move(t, e) && (s = "pointer"), i.style.cursor = s
        }
    }, this.update_mouseover_cell = function() {
        if (this.mouseover_cell) {
            var t = this.mouseover_cell.x,
                e = this.mouseover_cell.y,
                i = this.g_board[t + 8 * e];
            if (i) {
                this.update_cell_cursor(t, e);
                var s = 0;
                s = this.b_highlight_mouseover ? this.sel_pc ? this.chess_can_move(this.sel_x, this.sel_y, t, e, 16 & this.sel_pc) : this.b_allow_new_moves && this.chess_can_start_move(t, e) ? 1 : 0 : 0, set_css_class(i, this.id + "-cellhlt", s)
            }
        }
    }, this.clear_mouseover_cell = function() {
        this.mouseover_cell && this.assign_mouseover_cell(this.mouseover_cell.x, this.mouseover_cell.y, 1)
    }, this.assign_mouseover_cell = function(t, e, i) {
        if (this.mouseover_cell) {
            if (!i && this.mouseover_cell.x == t && this.mouseover_cell.y == e) return;
            var s = this.g_board[this.mouseover_cell.x + 8 * this.mouseover_cell.y];
            s && set_css_class(s, this.id + "-cellhlt", 0)
        }
        i ? this.mouseover_cell && this.mouseover_cell.x == t && this.mouseover_cell.y == e && (this.mouseover_cell = null) : this.mouseover_cell = t < 0 || 7 < t || e < 0 || 7 < e ? null : {
            x: t,
            y: e
        }, this.update_mouseover_cell()
    }, this.on_cell_mouse_over = function(t, e) {
        this.assign_mouseover_cell(t, e, 0)
    }, this.on_cell_mouse_out = function(t, e) {
        this.assign_mouseover_cell(t, e, 1)
    }, this.update_cell_image = function(t, e, i) {
        var s = i;
        if (!(t < 0 || e < 0)) {
            if (null == s)
                if (0 <= this.sel_x && 0 <= this.sel_y) s = this.sel_x == t && this.sel_y == e ? 1 : 0;
                else if (0 < this.current_move) {
                var o = this.chess_decode_move(this.chess_get_last_move());
                (o[0] == t && o[1] == e || o[2] == t && o[3] == e) && (s = 1)
            }
            var _ = this.g_board[t + 8 * e];
            if (this.update_tile_image(_, t, e, s, 0), !_._gk_callbacks) {
                _._gk_callbacks = 1;
                var r = this;
                gk_event_callback(_, "mouseover", function() {
                    r.on_cell_mouse_over(t, e)
                }), gk_event_callback(_, "mouseout", function() {
                    r.on_cell_mouse_out(t, e)
                })
            }
        }
    }, this.update_tile_image = function(t, e, i, s, o, _, r) {
        var h = e + 8 * i,
            a = null != _ ? _ : this.bitboard[h],
            l = 15 & a,
            n = 16 & a;
        1 == s && this.current_move == this.red_move_num && (s = 3);
        var c = this.board_cell_size,
            d = 0,
            m = 1;
        0 < l && l <= 6 ? d = (l - 1) * c : m = 0;
        var v = 0;
        m && (v = r ? 3 : this.b_show_shadow ? 1 : 0);
        var b = (31 & a) + (s ? "s" + s : "-") + "sh" + v;
        if (t.cur_code != b) {
            t.cur_code = b, this.show_tile_shadow(t, v, 2 * c, d);
            var p = 0;
            n || (p += c), this.update_tile_selected(t, s, e + i & 1 ? 1 : 0);
            var u = t.firstChild;
            u.style.visibility = m ? (u.style.MozTransform = "translateZ(0)", u.style.left = -1 * p + "px", u.style.top = -1 * d + "px", "visible") : "hidden"
        }
    }, this.update_tile_selected = function(t, e, i) {
        var s, o = "",
            _ = i ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.6)";
        2 == e ? (o = "dim", _ = i ? "#0066cc" : "#0099ff") : 3 == e && (o = "wrn", _ = i ? "#cc2200" : "#ff4422");
        var r = t.getElementsByTagName("div");
        if (r)
            for (var h = 0; h < r.length && (s = r[h], !has_css_class(s, "selected")); h++) s = null;
        if (s && (s.style.display = "none"), e) {
            if (s || ((s = document.createElement("div")).style.display = "none", t.appendChild(s)), o || 1 == this.n_highlight_last_move) {
                var a = 40 <= this.board_cell_size ? 2 : 1,
                    l = "inset 0 0 " + (2 + Math.floor(this.board_cell_size / 10)) + "px " + a + "px " + _;
                s.style.webkitBoxShadow = l, s.style.boxShadow = l
            } else s.style.webkitBoxShadow = "", s.style.boxShadow = "";
            s.className = "selected " + o + " fade_in_fast", s.style.display = "block"
        }
    }, this.show_tile_shadow = function(t, e, i, s) {
        var o = t.ichess_tile_shadow;
        if (e <= 0) {
            if (!o) return;
            return o.style.visibility = "hidden", void(o.style.display = "none")
        }
        o || ((o = document.createElement("div")).className = this.id + "-piece", o.style.background = "transparent", o.style.zIndex = -3, o.appendChild(this.get_chess_set_img()), t.appendChild(o), t.ichess_tile_shadow = o), 3 < e && (e = 3);
        var _ = Math.floor(e * this.board_cell_size / 60),
            r = _ + 1;
        o.style.left = r + "px", o.style.top = _ + "px";
        var h = o.firstChild.style;
        h.left = -1 * i + "px", h.top = -1 * s + "px", h.visibility = "visible", o.style.display = "", o.style.visibility = "visible"
    }, this.update_piece_image = function(t, e, i) {
        var s = 15 & e,
            o = 16 & e,
            _ = this.board_cell_size,
            r = (31 & e) + "-" + (i ? "s" : "-");
        if (t.cur_code != r) {
            t.cur_code = r;
            var h = 1,
                a = 0;
            0 < s && s <= 6 ? a = (s - 1) * _ : h = 0;
            var l = 0;
            this.show_tile_shadow(t, i ? 3 : 0, l + 2 * _, a), o || (l += _);
            var n = t.firstChild;
            n && (n.style.visibility = h ? (n.style.left = -1 * l + "px", n.style.top = -1 * a + "px", "visible") : "hidden")
        }
    }, this.update_captive_image = function(t, e) {
        var i = 15 & e,
            s = 16 & e,
            o = this.captive_cell_size,
            _ = 1,
            r = 0;
        0 < i && i <= 6 ? r = (i - 1) * o : _ = 0;
        var h = 0;
        s || (h += o);
        var a = t.firstChild;
        set_css_class(a, "fade_in_fast", _), a.style.visibility = _ ? (a.style.left = -1 * h + "px", a.style.top = -1 * r + "px", "visible") : "hidden"
    }, this.init_piece_image = function(t, e) {
        var i = document.createElement("div");
        i.className = this.id + "-piece", i.style.left = "0", i.style.top = "0", i.style.cursor = "pointer", i.appendChild(this.get_chess_set_img()), t.appendChild(i), this.update_piece_image(i, e)
    }, this.chess_can_start_move = function(t, e) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) return 0;
        var i = this.bitboard[t + 8 * e];
        return i ? this.b_freestyle ? 1 : 16 & i ^ ("w" == this.cur_to_move ? 16 : 0) ? 0 : 1 : 0
    }, this.update_refresh_cells = function() {
        for (; 0 < this.refresh_cells.length;) {
            var t = this.refresh_cells.pop();
            this.update_cell_image(t[0], t[1])
        }
    }, this.show_canmoves_xy = function(t, e, i) {
        i || this.reset_canmoves(), this.b_pinned = 0;
        for (var s = this.chess_moves_available(t, e), o = 0; o < s.length; o++) {
            var _ = s[o];
            this.canmoves.push(new this.create_canmove(this, _[0], _[1]))
        }
        if ((this.b_pinned || this.b_in_check) && 0 == s.length) {
            var r = "w" == this.cur_to_move ? 1 : 0,
                h = this.get_piece_color(t, e);
            h == r && this.shake_king(h, 1)
        }
    }, this.shake_king = function(t, e) {
        if (void 0 !== t) {
            var i = t ? this.king_w : this.king_b;
            if (i && i.length) {
                var s = this.g_board[i[0] + 8 * i[1]];
                s && s.firstChild && set_css_class(s.firstChild, "shake_anim", e ? 1 : 0)
            }
        }
    }, this.shake_piece = function(t, e) {
        if (!(t < 0 || 7 < t || e < 0 || 7 < e)) {
            var i = this.g_board[t + 8 * e];
            i && i.firstChild && (i = i.firstChild, set_css_class(i, "shake_anim", 1), setTimeout(function() {
                set_css_class(i, "shake_anim", 0)
            }, 500))
        }
    }, this.get_piece = function(t, e) {
        return t < 0 || 7 < t || e < 0 || 7 < e ? 0 : 15 & this.bitboard[t + 8 * e]
    }, this.get_piece_color = function(t, e) {
        if (!(t < 0 || 7 < t || e < 0 || 7 < e)) {
            var i = this.bitboard[t + 8 * e];
            if (15 & i) return 16 & i ? 1 : 0
        }
    }, this.get_click_cell_coords = function(t, e) {
        var i = t.clientX,
            s = t.clientY;
        if (e) {
            var o = t.changedTouches;
            if (o && o.length) {
                var _ = o[0];
                i = Math.floor(_.clientX), s = Math.floor(_.clientY)
            }
        }
        var r = this.board.getBoundingClientRect();
        return i = Math.floor((i - r.left) / this.board_cell_size), s = Math.floor((s - r.top) / this.board_cell_size), isNaN(i) || isNaN(s) ? [-1, -1] : [this.b_flip ? 7 - i : i, this.b_flip ? s : 7 - s]
    }, this.mouse_drag_time = 0, this.mouse_drag_travel = 0, this.mouse_drag_x = 0, this.mouse_drag_y = 0, this.mouse_drag_capture = null, this.mouse_report_click = !1, this.on_mouse_down = function(t, e) {
        if (this.b_printable_mode) return !1;
        if (this.mouse_drag_time = get_time(), e) {
            var i = this.get_touch_xy(t);
            if (!i || !i.length) return !1;
            this.mouse_drag_x = i[0], this.mouse_drag_y = i[1], this.clear_mouseover_cell(), t.target && (gk_event_callback(t.target, "mousedown", handler_absorb_event), t.target.parentNode && gk_event_callback(t.target.parentNode, "mousedown", handler_absorb_event))
        } else this.mouse_drag_x = gk_mouse_x(t), this.mouse_drag_y = gk_mouse_y(t);
        this.mouse_drag_travel = 0;
        var s = this.screen_to_cell_x(this.mouse_drag_x),
            o = this.screen_to_cell_y(this.mouse_drag_y);
        if (this.b_broken_scroll) {
            var _ = this.get_click_cell_coords(t, e);
            _ && (s = _[0], o = _[1])
        }
        var r = !0;
        if (!e || this.mouse_drag_capture || this.get_piece(s, o) || (r = !1), this.mouse_report_click = !1, "function" == typeof this.callback_mouse_click)
            if (r) {
                var h = this.callback_mouse_click(s, o);
                if (void 0 !== h && h) return gk_stop_event(t), !1
            } else this.mouse_report_click = !0;
        var a = !e;
        return this.mouse_drag_capture ? (this.mouse_drag_capture.release_mouse_capture(), this.mouse_drag_capture = null, this.mouse_move_complete(s, o), a = !0) : (this.mouse_drag_start(s, o) || this.shake_piece(s, o), this.get_piece(s, o) && (a = !0)), this.update_mouseover_cell(), a && gk_stop_event(t), !1
    }, this.mouse_drag_in_piece = function(t, e, i) {
        this.mouse_drag_x = t, this.mouse_drag_y = e, this.abort_mouse_move(0), this.mouse_drag_time = get_time(), this.mouse_drag_mover_init(8, 8, i), this.sel_x = 8, this.sel_y = 8, this.sel_pc = i
    }, this.get_touch_xy = function(t) {
        var e = t.changedTouches;
        if (!e || !e.length) return [];
        var i = e[0];
        return [Math.floor(i.pageX), Math.floor(i.pageY)]
    }, this.on_mouse_drag = function(t, e) {
        var i, s;
        if (e) {
            var o = this.get_touch_xy(t);
            if (!o || !o.length) return !1;
            i = o[0], s = o[1]
        } else i = gk_mouse_x(t), s = gk_mouse_y(t);
        var _ = (this.mouse_drag_x - i) * (this.mouse_drag_x - i) + (this.mouse_drag_y - s) * (this.mouse_drag_y - s);
        if (_ > this.mouse_drag_travel && (this.mouse_drag_travel = _), !this.mouse_drag_capture) return !1;
        this.display_pc_mover(i, s);
        var r = this.screen_to_cell_x(i),
            h = this.screen_to_cell_y(s);
        return this.assign_mouseover_cell(r, h, 0), gk_stop_event(t), !1
    }, this.on_mouse_drag_stop = function(t, e) {
        var i = get_time() - this.mouse_drag_time;
        if (this.mouse_drag_time = 0, e && this.mouse_report_click && i < 1e3 && this.mouse_drag_travel < 400 && "function" == typeof this.callback_mouse_click) {
            var s = this.screen_to_cell_x(this.mouse_drag_x),
                o = this.screen_to_cell_y(this.mouse_drag_y);
            this.callback_mouse_click(s, o)
        }
        if (this.mouse_report_click = !1, !this.mouse_drag_capture) return !1;
        var _, r, h = e ? 900 : 100,
            a = e ? 1600 : 400,
            l = (e ? 5e3 : 600) < i ? 1 : 0;
        if (this.mouse_drag_travel > a && (l = 1), e) {
            var n = this.get_touch_xy(t);
            if (!n || !n.length) return !1;
            _ = n[0], r = n[1], this.clear_mouseover_cell()
        } else _ = gk_mouse_x(t), r = gk_mouse_y(t);
        l || 0 <= this.sel_x && 0 <= this.sel_y && (this.sel_x != s || this.sel_y != o) && h < (this.mouse_drag_x - _) * (this.mouse_drag_x - _) + (this.mouse_drag_y - r) * (this.mouse_drag_y - r) && (l = 1);
        if (l) {
            s = this.screen_to_cell_x(_), o = this.screen_to_cell_y(r);
            if (this.b_broken_scroll) {
                var c = this.get_click_cell_coords(t, e);
                c && (s = c[0], o = c[1])
            }
            this.mouse_drag_capture.release_mouse_capture(), this.mouse_drag_capture = null, this.mouse_move_complete(s, o)
        }
        return this.update_mouseover_cell(), gk_stop_event(t), !1
    }, this.mouse_drag_start = function(t, e) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) return this.abort_mouse_move(1), !1;
        if (this.b_show_legal_moves && !this.b_freestyle && this.show_canmoves_xy(t, e), this.b_allow_new_moves && this.chess_can_start_move(t, e)) {
            var i = this.bitboard[t + 8 * e];
            return !!this.mouse_drag_mover_init(t, e) && (this.sel_x = t, this.sel_y = e, this.sel_pc = i, this.bitboard[this.sel_x + 8 * this.sel_y] = 0, this.update_cell_image(this.sel_x, this.sel_y, this.b_freestyle ? 0 : 1), this.bitboard[this.sel_x + 8 * this.sel_y] = i, !0)
        }
        return !1
    }, this.mouse_drag_mover_init = function(t, e, i) {
        this.update_refresh_cells();
        var s = this.get_free_mover();
        if (!s) return !1;
        this.mouse_move = 1, i ? this.update_piece_image(s, i, 1) : this.update_tile_image(s, t, e, 0, 1, void 0, 1), s.style.background = "transparent", s.style.zIndex = 40, this.display_pc_mover(this.mouse_drag_x, this.mouse_drag_y), s.style.visibility = "visible", s.style.display = "";
        var o = this;
        return this.disable_drag_events(s), s.onmouseup = function(t) {
            return o.on_mouse_drag_stop(t || window.event)
        }, s.onmousemove = function(t) {
            return o.on_mouse_drag(t || window.event)
        }, this.mouse_drag_capture = new gk_create_mouse_capture(s), !(this.mouse_drag_capture.b_autorelease = 0)
    }, this.mouse_move_complete = function(t, e) {
        if (t < 0 || 7 < t || e < 0 || 7 < e) this.b_freestyle && this.sel_pc && 1 != (15 & this.sel_pc) ? (0 <= this.sel_x && 0 <= this.sel_y && this.sel_x < 8 && this.sel_y < 8 && (this.bitboard[this.sel_x + 8 * this.sel_y] = 0), this.end_mouse_move()) : this.abort_mouse_move(1);
        else {
            var i = 1;
            this.option_legal_moves() && !this.b_freestyle && (i = this.chess_can_move(this.sel_x, this.sel_y, t, e, "w" == this.cur_to_move ? 16 : 0));
            var s = this.is_pawn_promo(this.sel_pc, e) ? 1 : 0;
            if (!s && i && "function" == typeof this.callback_validate_move && (i = this.callback_validate_move(this.sel_x, this.sel_y, t, e)), !i || this.sel_x == t && this.sel_y == e) this.abort_mouse_move(1);
            else if (this.b_freestyle) {
                if (1 == (15 & this.bitboard[t + 8 * e])) return void this.abort_mouse_move(0);
                var o = 15 & this.sel_pc;
                if (6 == o && (0 == e || 7 == e)) return void this.abort_mouse_move(0);
                var _ = 16 & this.sel_pc;
                this.sel_pc = _ | o, 6 == o && (1 == e && _ || 6 == e && !_) && (this.sel_pc |= 32), 0 <= this.sel_x && 0 <= this.sel_y && this.sel_x < 8 && this.sel_y < 8 && (this.bitboard[this.sel_x + 8 * this.sel_y] = 0), this.bitboard[t + 8 * e] = this.sel_pc, 1 == o && (_ ? this.king_w = [t, e] : this.king_b = [t, e]), this.update_cell_image(t, e, 0), this.end_mouse_move()
            } else s ? this.show_promo_screen(16 & this.sel_pc, this.sel_x, this.sel_y, t, e) : this.record_move(this.sel_x, this.sel_y, t, e), this.end_mouse_move()
        }
    }, this.submit_move = function(t) {
        var e = this.chess_decode_move(t),
            i = this.bitboard[e[2] + 8 * e[3]];
        this.record_move(e[0], e[1], e[2], e[3], e[4]), this.movers.push(new this.create_mover(this, e[0], e[1], e[2], e[3], i)), this.start_movers()
    }, this.is_pawn_promo = function(t, e) {
        if (6 != (15 & t)) return 0;
        var i = 16 & t;
        return i && 7 == e ? 1 : i || 0 != e ? 0 : 1
    }, this.is_pawn_promo_move = function(t, e, i, s) {
        return this.is_pawn_promo(this.bitboard[t + 8 * e], s)
    }, this.is_pawn_promo_move_coords = function(t) {
        var e = this.chess_decode_move(t);
        return this.is_pawn_promo_move(e[0], e[1], e[2], e[3])
    }, this.display_pc_mover = function(t, e) {
        var i = this.get_free_mover();
        i && (t = Math.floor(t - this.board_cell_size / 2), e = Math.floor(e - this.board_cell_size / 2), this.free_mover_x = t, this.free_mover_y = e, i.style.left = t + "px", i.style.top = e + "px")
    }, this.screen_to_cell_x = function(t) {
        var e = gk_get_absolute_pos_left(this.board);
        return t = Math.floor((t - e) / this.board_cell_size), this.b_flip ? 7 - t : t
    }, this.screen_to_cell_y = function(t) {
        var e = gk_get_absolute_pos_top(this.board);
        return t = Math.floor((t - e) / this.board_cell_size), this.b_flip ? t : 7 - t
    }, this.nextmove = function() {
        this.b_printable_mode || this.promo_move_coords || this.anim_move(this.current_move + 1)
    }, this.prevmove = function() {
        this.b_printable_mode || this.promo_move_coords || this.anim_move(this.current_move - 1)
    }, this.update_current_move = function() {
        this.b_show_moves && (this.update_move_cell(this.current_move), this.update_moves_scroll())
    }, this.flip_normal = function() {
        "w" == this.start_plyr() ? this.b_flip && this.flip() : this.b_flip || this.flip()
    }, this.flip = function() {
        this.b_flip = !this.b_flip;
        for (var t = 0; t < 8; t++)
            for (var e = 0; e < 8; e++) {
                var i = this.g_board[t + 8 * e].style;
                i.left = (this.b_flip ? 7 - t : t) * this.board_cell_size + "px", i.top = (this.b_flip ? e : 7 - e) * this.board_cell_size + "px"
            }
        if (this.b_show_captures) {
            var s = this.get_obj("captives_w"),
                o = this.get_obj("captives_b");
            this.b_flip ? (s.parentNode.removeChild(s), o.parentNode.insertBefore(s, o)) : (o.parentNode.removeChild(o), s.parentNode.insertBefore(o, s))
        }
        this.update_labels(), this.b_update_moves_list_on_flip && this.update_moves_list(), this.redraw_all()
    }, this.highlight_last_move = function() {
        if (this.update_refresh_cells(), !(this.current_move <= 0)) {
            var t = this.chess_decode_move(this.chess_get_last_move());
            this.update_cell_image(t[0], t[1], 1), this.update_cell_image(t[2], t[3], 1), this.refresh_cells.push([t[0], t[1]]), this.refresh_cells.push([t[2], t[3]])
        }
    }, this.get_material_score = function() {
        for (var t = [0, 0, 9, 5, 3, 3, 1], e = 0, i = 0; i < 64; i++) {
            var s = this.bitboard[i];
            if (s) {
                var o = t[15 & s];
                o && (16 & s || (o = -o), e += o)
            }
        }
        return e
    }, this.update_score = function() {
        if (this.b_show_captures) {
            var t = this.get_material_score();
            this.b_flip && (t = -t), 0 < t && (t = "+" + t);
            var e = this.get_obj("score");
            e && (e.innerHTML = t)
        }
    }, this.scroll_to = function(t, e) {
        if (t) {
            var i = this.get_obj("moves");
            if (i) {
                var s = t.offsetTop,
                    o = s;
                if (e) {
                    var _ = s + t.offsetHeight,
                        r = i.scrollTop,
                        h = r + i.clientHeight;
                    if (s < r) o = s;
                    else {
                        if (!(h < _)) return;
                        o = r + (_ - h) + 2
                    }
                }
                i.scrollTop = o
            }
        }
    }, this.undo_last_move = function(t) {
        t || (t = 1), this.board_snapshot();
        for (var e = 0; e < t; e++) {
            if (this.max_move <= 0) return;
            this.truncate_moves(this.max_move - 1)
        }
        this.goto_move(this.max_move, 1), this.board_snapshot_diff(1), this.redraw_all()
    }, this.truncate_moves = function(t) {
        var e = this.max_move;
        return this.current_move > t && (this.current_move = t), this.moves.length > t && this.moves.splice(t, this.moves.length - t), this.max_move = this.moves.length, e > this.max_move ? 1 : 0
    }, this.truncate_after_move = function(t) {
        if (null == t) t = this.current_move;
        t >= this.max_move || (t < 0 && (t = 0), this.board_snapshot(), this.truncate_moves(t), this.goto_move(this.max_move, 1), this.board_snapshot_diff(1), this.redraw_all(t))
    }, this.record_move = function(t, e, i, s, o) {
        var _ = this.encode_pos(t, e),
            r = this.encode_pos(i, s),
            h = this.truncate_moves(this.current_move);
        o = this.validate_promo(o);
        this.moves.push(_ + r + o), this.max_move = this.moves.length, (this.first_user_move < 0 || this.first_user_move > this.current_move) && (this.first_user_move = this.current_move), this.goto_move(this.max_move, 1, !h), "function" == typeof this.callback_record_move && this.callback_record_move(), this.redraw_all()
    }, this.chess_checkmate = function(t) {
        if (!this.chess_in_check(t)) return 0;
        for (var e = 0; e < 8; e++)
            for (var i = 0; i < 8; i++) {
                var s = this.bitboard[e + 8 * i];
                if (s && (!(16 & s ^ t) && this.chess_moves_available(e, i, 1))) return 0
            }
        return 1
    }, this.chess_stalemate = function(t) {
        if (this.chess_in_check(t)) return 0;
        for (var e = 0; e < 8; e++)
            for (var i = 0; i < 8; i++) {
                var s = this.bitboard[e + 8 * i];
                if (s && (!(16 & s ^ t) && this.chess_moves_available(e, i, 1))) return 0
            }
        return 1
    }, this.reset_all = function(t, e) {
        "number" == typeof t && (this.initial_move = t), e || this.board_snapshot(), this.abort_mouse_move(0), this.update_move_cell(this.current_move), this.reset_board(), e || this.board_snapshot_diff(1), this.redraw_all(), this.update_to_move()
    }, this.board_snapshot = function() {
        this.force_animation_time || !(this.animation_speed < 1 || 7 <= this.animation_speed) ? this.snapshot_bitboard = this.bitboard.slice() : this.snapshot_bitboard = void 0
    }, this.board_snapshot_diff = function(t) {
        if (this.reset_movers(), this.force_animation_time || !(this.animation_speed < 1 || 7 <= this.animation_speed)) {
            if (null != this.snapshot_bitboard) {
                for (var e = [], i = 0, s = 0; s < 8 && i < 20; s++)
                    for (var o = 0; o < 8 && i < 20; o++) {
                        var _ = s + 8 * o,
                            r = 31 & this.bitboard[_];
                        if (r) {
                            var h = 31 & this.snapshot_bitboard[_];
                            if (r != h) {
                                for (var a = 999, l = -1, n = -1, c = 0; c < 8; c++)
                                    for (var d = 0; d < 8; d++) {
                                        var m = c + 8 * d;
                                        if (!e[m]) {
                                            var v = (s - c) * (s - c) + (o - d) * (o - d);
                                            a < v || r == (h = 31 & this.snapshot_bitboard[m]) && (31 & this.bitboard[m]) != h && (a = v, l = c, n = d)
                                        }
                                    }
                                if (!(l < 0 || n < 0)) {
                                    e[l + 8 * n] = 1;
                                    var b = this.snapshot_bitboard[_];
                                    t ? b = 0 : (16 & b) == (16 & r) && (b = 0), this.movers.push(new this.create_mover(this, l, n, s, o, b)), i++
                                }
                            }
                        }
                    }
                this.snapshot_bitboard = void 0, 0 < i && this.start_movers()
            }
        } else this.snapshot_bitboard = void 0
    }, this.position_on_board = function(t, e, i, s) {
        s = s ? (this.board_cell_size - s) / 2 : 0, e = (this.b_flip ? 7 - e : e) * this.board_cell_size + s, i = (this.b_flip ? i : 7 - i) * this.board_cell_size + s, t.style.left = Math.floor(e) + "px", t.style.top = Math.floor(i) + "px"
    }, this.create_mover = function(t, e, i, s, o, _) {
        this.ichess = t, this.update = function() {
            var t = (get_time() - this.start_time) / this.total_time;
            if (t < 0 && (t = 0), 1 < t) this.done = 1;
            else {
                var e = this.from_x + t * (this.to_x - this.from_x),
                    i = this.from_y + t * (this.to_y - this.from_y);
                this.ichess.position_on_board(this.div, e, i)
            }
        }, this.destroy = function() {
            this.target_div && (this.target_div.ichess_free_mover_done = 1, this.board.removeChild(this.target_div), this.target_div = null), this.div && (this.div.ichess_free_mover_done = 1, this.board.removeChild(this.div), this.div = null)
        }, this.from_x = e, this.from_y = i, this.to_x = s, this.to_y = o, this.total_time = this.ichess.get_animation_speed_time() * Math.sqrt(ichess_get_dist(e, i, s, o)), this.total_time < 1 && (this.total_time = 1), this.start_time = get_time(), this.done = 0, this.board = this.ichess.board;
        var r = t.allocate_mover_div(s, o, 1, void 0, 20);
        this.div = r, this.update(), r.style.visibility = "visible", r = t.allocate_mover_div(s, o, 0, _, 10), (this.target_div = r).style.visibility = "visible"
    }, this.create_mover_free = function(t, e, i, s, o, _) {
        this.ichess = t, this.update = function() {
            var t = (get_time() - this.start_time) / this.total_time;
            if (t < 0 && (t = 0), 1 < t) this.done = 1;
            else {
                t = Math.sqrt(t);
                var e = this.from_x + t * (this.to_x - this.from_x),
                    i = this.from_y + t * (this.to_y - this.from_y);
                isNaN(e) && (e = 0), isNaN(i) && (i = 0), this.div.style.left = Math.floor(e) + "px", this.div.style.top = Math.floor(i) + "px"
            }
        }, this.destroy = function() {
            this.target_div && (this.target_div.ichess_free_mover_done = 1, this.board.removeChild(this.target_div), this.target_div = null), this.div && (this.div.ichess_free_mover_done = 1, this.board.removeChild(this.div), this.div = null)
        }, this.from_x = e, this.from_y = i, this.to_x = (t.b_flip ? 7 - s : s) * t.board_cell_size, this.to_y = (t.b_flip ? o : 7 - o) * t.board_cell_size, this.total_time = Math.min(300, 20 * Math.sqrt(ichess_get_dist(this.from_x, this.from_y, this.to_x, this.to_y))), this.total_time < 1 && (this.total_time = 1), this.start_time = get_time(), this.done = 0, this.board = this.ichess.board;
        var r = t.allocate_mover_div(0, 0, 1, _, 20);
        this.div = r, this.update(), r.style.visibility = "visible", r = t.allocate_mover_div(s, o, 0, "--", 10), (this.target_div = r).style.visibility = "visible"
    }, this.allocate_mover_div = function(t, e, i, s, o) {
        this.mover_divs || (this.mover_divs = []);
        for (var _ = null, r = 0; r < this.mover_divs.length && !(_ = this.mover_divs[r]).ichess_free_mover_done; r++) _ = null;
        return _ || ((_ = document.createElement("div")).className = this.id + "-piece", _.appendChild(this.get_chess_set_img()), this.mover_divs.length < 100 && this.mover_divs.push(_)), _.style.visibility = "hidden", _.ichess_free_mover_done = 0, _.style.zIndex = o, this.board.appendChild(_), this.update_tile_image(_, t, e, 0, i, s), i ? _.style.background = "transparent" : this.set_square_background(_, t, e), this.position_on_board(_, t, e), _.style.visibility = "visible", _
    }, this.reset_movers = function() {
        for (var t = 0; t < this.movers.length; t++) this.movers[t].destroy();
        this.movers = []
    }, this.create_canmove = function(t, e, i) {
        if (this.ichess = t, this.destroy = function() {
                this.board.removeChild(this.div)
            }, this.x = e, this.y = i, !this.ichess.canmove_img) {
            this.ichess.canmove_img = new Image(8, 8), this.ichess.canmove_img.src = this.ichess.static_prefix + "/img/canmove.png";
            var s = this.ichess.canmove_img.style;
            s.width = "8px", s.height = "8px", s.padding = "0", s.margin = "0", s.display = "block"
        }
        this.board = this.ichess.board;
        var o = document.createElement("div");
        o.className = "fade_in_fast", o.style.visibility = "hidden", o.style.background = "transparent", o.style.zIndex = 15, o.appendChild(this.ichess.canmove_img.cloneNode(!0)), o.style.position = "absolute", this.div = o, this.ichess.position_on_board(o, e, i, 8), this.board.appendChild(o), o.style.visibility = "visible"
    }, this.reset_canmoves = function() {
        for (var t = 0; t < this.canmoves.length; t++) this.canmoves[t].destroy();
        this.canmoves = [], this.shake_king(0, 0), this.shake_king(1, 0)
    }, this.update_movers = function() {
        clearTimeout(this.mover_timer), this.mover_timer = null;
        for (var t = [], e = 0; e < this.movers.length; e++) {
            var i = this.movers[e];
            i.update(), i.done ? i.destroy() : t.push(i)
        }
        if (this.movers = t, 0 < this.movers.length) {
            var s = this;
            this.mover_timer = setTimeout(function() {
                s.update_movers()
            }, 3)
        }
    }, this.start_movers = function() {
        if (!this.mover_timer) {
            var t = this;
            this.mover_timer = setTimeout(function() {
                t.update_movers()
            }, 3)
        }
    }, this.movers_active = function() {
        return this.mover_timer ? this.movers.length <= 0 ? 0 : 1 : 0
    }, this.start_new_mover = function(t, e, i, s) {
        this.movers.push(new this.create_mover(this, t, e, i, s, this.bitboard[t + 8 * e])), this.start_movers()
    }, this.update_options_cookie = function() {
        gk_glop[1] = this.b_legal_moves ? 1 : 0, gk_glop[2] = this.b_short_notation ? 0 : 1, gk_glop[3] = this.animation_speed, gk_glop[4] = this.b_show_legal_moves ? 1 : 0, gk_glop[8] = this.b_movelist_text ? 1 : 0, gk_glop[9] = this.graphics_style - 1, gk_glop[10] = this.graphics_size - 1, gk_glop[18] = this.b_movelist_fig ? 1 : 0, gk_glop[22] = this.b_show_shadow ? 1 : 0, gk_glop[23] = this.b_highlight_mouseover ? 1 : 0, gk_glop[24] = this.n_highlight_last_move, save_global_options()
    }, this.get_animation_speed_time = function() {
        return 0 < this.force_animation_time ? this.force_animation_time : (this.animation_speed < 1 && (this.animation_speed = 4), 7 < this.animation_speed && (this.animation_speed = 7), (8 - this.animation_speed) * (8 - this.animation_speed) * 11)
    }, this.update_board_preview = function() {
        var t = this.get_obj("frm_board_preview");
        if (t) {
            var e = this.id + "-",
                i = gui_get_selected_option_value(e + "frm_board_size", 4);
            i < 3 && (i = 3), 5 < i && (i = 5);
            var s = 10 * i,
                o = t.style;
            o.position = "relative", o.width = 3 * s + "px", o.height = 2 * s + "px";
            var _ = gui_get_selected_option_value(e + "frm_board_color", 0);
            _ *= 5;
            var r = "#" + this.bd_colors[_],
                h = "#" + this.bd_colors[_ + 1],
                a = "#" + this.bd_colors[_ + 2],
                l = this.bd_colors[_ + 3],
                n = this.bd_colors[_ + 4];
            o.border = "2px solid " + a;
            var c = gui_get_selected_option_value(e + "frm_board_style", 1),
                d = new Image(3 * s, 6 * s);
            d.src = this.static_prefix + "/img/chess" + c + i + ".png", (o = d.style).position = "absolute", o.border = "0", o.width = 3 * s + "px", o.height = 6 * s + "px";
            for (var m = new prnd(1), v = Math.floor((n ? 2.5 : 1.5) * s), b = t.getElementsByTagName("DIV"), p = 0; p < b.length; p++) {
                var u = b[p];
                (o = u.style).width = s + "px", o.height = s + "px", o.position = "absolute", o.overflow = "hidden", o.left = p % 3 * s + "px", o.top = Math.floor(p / 3) * s + "px";
                var f = 1 & p ? "b" : "w";
                if (l) {
                    var g = m.rnd(v),
                        y = m.rnd(v);
                    u.style.background = "url(" + this.static_prefix + "/img/chess-bg" + f + l + i + ".jpg) repeat -" + g + "px -" + y + "px"
                } else o.background = "w" == f ? h : r;
                var x = d.cloneNode(!0);
                u.firstChild ? u.replaceChild(x, u.firstChild) : u.appendChild(x), (o = x.style).left = (1 - Math.floor(p / 3)) * s * -1 + "px", o.top = (5 - p) * s * -1 + "px"
            }
        }
    }, this.show_options = function(t) {
        load_global_options();
        var e = this.id + "-",
            i = " onChange=\"ichess_call_handler(this,'update_board_preview');\" ",
            s = gui_generate_select(e + "frm_board_size", ["Tiny", 2, "Small", 3, "Medium", 4, "Intermediate", 5, "Large", 6, "Very Large", 8], this.graphics_size, i + (0 < this.min_graphics_size || 0 < this.max_graphics_size ? " disabled " : "")),
            o = gui_generate_select(e + "frm_board_style", ["GameKnot", 1, "3D", 2, "Merida", 3, "Modern", 4, "Alpha", 5, "Leipzig", 6, "Cases", 7, "Condal", 8, "Maya", 9, "Wooden", 10], this.graphics_style, i),
            _ = gui_generate_select(e + "frm_board_color", ["Classic", 0, "Storm blue", 1, "Ocean blue", 2, "Sea foam", 3, "Emerald green", 4, "Moss green", 5, "Brick red", 6, "Amethyst", 7, "Grape", 8, "Sand", 9, "Pumpkin", 11, "TX: Cedar", 12, "TX: Redwood", 13, "TX: Walnut", 14, "TX: Elm", 15, "TX: Green Marble", 16, "TX: Blue Marble", 17, "TX: Tan Marble", 18, "TX: Granite", 19, "TX: Rusted Metal", 20], gk_get_glop(17, 0), i),
            r = gui_generate_select(e + "frm_highlight_last_move", ["None / Off", 0, "Sunken (3D)", 1, "Blue", 2, "Green", 3, "Yellow", 4, "Pink", 5, "Purple", 6], this.n_highlight_last_move),
            h = '<table style="margin: 2px;"><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_legal_moves" VALUE="1" DISABLED><label for="' + e + 'frm_legal_moves">- Allow legal moves only</label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_show_legal" VALUE="1"><label for="' + e + 'frm_show_legal">- Show available moves hint &rarr; <img src="' + this.static_prefix + '/img/canmove.png" style="width: 8px; height: 8px; margin: 2px 0; border: 0; vertical-align: middle;"></label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_movelist_table" VALUE="1"><label for="' + e + 'frm_movelist_table">- Display the list of moves as a table</label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_short_notation" VALUE="1" DISABLED><label for="' + e + 'frm_short_notation">- Short algebraic notation &rarr; 5. Rc8 Qxc8</label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_movelist_fig" VALUE="1"><label for="' + e + 'frm_movelist_fig">- Pictograms for chess pieces &rarr; <span class=fig-all>R N K Q</span></label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_show_shadow" VALUE="1"><label for="' + e + 'frm_show_shadow">- Raised chess pieces, with shadows</label></td></tr><tr><td><INPUT TYPE="checkbox" id="' + e + 'frm_highlight_mouseover" VALUE="1"><label for="' + e + 'frm_highlight_mouseover">- Highlight selected square &rarr;&nbsp;&nbsp;<span style="display: inline-block; position: relative; width: 18px; height: 18px; margin: -4px;" class="square_w ' + e + 'cellhlt"></span></label></td></tr><tr><td style="padding-left: 20px;"><label for="' + e + 'frm_highlight_last_move">Highlight last move:</label> ' + r + '</td></tr><tr><td style="white-space: nowrap; padding-left: 20px;"><label for="anim_speed">Movement/animation speed:</label><br>(slow) <INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed1" VALUE="1"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed2" VALUE="2"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed3" VALUE="3"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed4" VALUE="4"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed5" VALUE="5"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed6" VALUE="6"><INPUT TYPE="radio" name="anim_speed" id="' + e + 'frm_anim_speed7" VALUE="7"> (fast)</td></tr><tr><td><table style="margin-top: 8px;"><tr><td style="text-align: right;"><label for="' + e + 'frm_board_size">Board size:</label> ' + s + '</td><td rowspan=3 style="padding-left: 4px;"><div id="' + e + 'frm_board_preview" style="box-shadow: 2px 2px 5px rgba(0,0,0,0.5);"><div></div><div></div><div></div><div></div><div></div><div></div></div></td></tr><tr><td style="text-align: right;"><label for="' + e + 'frm_board_style">Chess set:</label> ' + o + '</td></tr><tr><td style="text-align: right;"><label for="' + e + 'frm_board_color">Board:</label> ' + _ + '</td></tr></table></td></tr><tr><td style="text-align: center; padding: 6px;"><INPUT TYPE="button" VALUE=" Save " onClick="ichess_call_handler(this,\'submit_options\');"> <INPUT TYPE="button" VALUE="Cancel" onClick="ichess_call_handler(this,\'cancel_options\');"></td></tr></table><style>#browser-warn:not(.oldbrowser) { display: none; }</style><div class=pp id="browser-warn" style="white-space: normal; max-width: 400px;"><img class=img-i src="/img/i/exclamation.png">It appears your web browser does not support all required features, so some of the options above might not work correctly. Please upgrade your browser.</div>',
            a = (gui_pop_form(h, t, {
                dir: 0,
                align: 1,
                header: "Chess board settings:"
            }).ichess = this).get_obj("frm_legal_moves");
        a && (a.checked = this.option_legal_moves() ? 1 : 0, a.disabled = this.b_force_legal_moves ? 1 : 0), (a = this.get_obj("frm_short_notation")) && (a.checked = this.option_short_notation() ? 1 : 0, a.disabled = this.b_force_short_notation ? 1 : 0);
        for (var l = 0; l < 10; l++)(a = this.get_obj("frm_anim_speed" + l)) && (a.checked = this.animation_speed == a.value ? 1 : 0);
        (a = this.get_obj("frm_show_legal")) && (a.checked = this.b_show_legal_moves ? 1 : 0), (a = this.get_obj("frm_movelist_table")) && (a.checked = this.b_movelist_text ? 0 : 1, a.disabled = this.b_force_movelist_text ? 1 : 0), (a = this.get_obj("frm_movelist_fig")) && (a.checked = this.b_movelist_fig ? 1 : 0), (a = this.get_obj("frm_show_shadow")) && (a.checked = this.b_show_shadow ? 1 : 0), (a = this.get_obj("frm_highlight_mouseover")) && (a.checked = this.b_highlight_mouseover ? 1 : 0), this.update_board_preview()
    }, this.submit_options = function() {
        var t = this.get_obj("frm_legal_moves");
        t && !this.b_force_legal_moves && (this.b_legal_moves = t.checked ? 1 : 0), (t = this.get_obj("frm_short_notation")) && !this.b_force_short_notation && (this.b_short_notation = t.checked ? 1 : 0);
        for (var e = 0; e < 10; e++)
            if ((t = this.get_obj("frm_anim_speed" + e)) && t.checked) {
                this.animation_speed = to_int(t.value);
                break
            }(t = this.get_obj("frm_show_legal")) && (this.b_show_legal_moves = t.checked ? 1 : 0), (t = this.get_obj("frm_movelist_table")) && (this.b_movelist_text = t.checked ? 0 : 1), (t = this.get_obj("frm_movelist_fig")) && (this.b_movelist_fig = t.checked ? 1 : 0), (t = this.get_obj("frm_show_shadow")) && (this.b_show_shadow = t.checked ? 1 : 0), (t = this.get_obj("frm_highlight_mouseover")) && (this.b_highlight_mouseover = t.checked ? 1 : 0);
        var i = this.id + "-",
            s = 0,
            o = gui_get_selected_option_value(i + "frm_highlight_last_move", 1);
        o < 0 && (o = 0), 6 < o && (o = 6), o != this.n_highlight_last_move && (s = 1, this.n_highlight_last_move = o);
        var _ = gui_get_selected_option_value(i + "frm_board_color", 0);
        if (gk_get_glop(17, 0) != _) {
            gk_glop[17] = _, this.init_board_color(_);
            for (var r = 0; r < 8; r++)
                for (var h = 0; h < 8; h++) {
                    var a = this.g_board[r + 8 * h];
                    this.set_square_background(a, r, h)
                }
        }
        var l = gui_get_selected_option_value(i + "frm_board_style", 1),
            n = gui_get_selected_option_value(i + "frm_board_size", 4);
        l == this.graphics_style && n == this.graphics_size || (this.reset_graphics(), this.init_graphics_set(l, 10 * n), s = 1), s && (this.b_reload_on_style_change ? (this.update_options_cookie(), location.reload()) : this.generate_all(1)), this.update_options_cookie(), this.cancel_options(), this.refresh_board()
    }, this.cancel_options = function() {
        gui_pop_form_remove()
    }, this.show_fen = function(t) {
        var e = gk_html_safe(this.encode_fen());
        gui_pop_form('<table class=dialog><tr><td style="text-align: center;"><textarea name="fen" readonly style="width: 450px; height: 35px;" onClick="select();">' + e + '</textarea></td></tr><tr><td style="text-align: center;"><INPUT TYPE="button" VALUE=" OK " onClick="gui_pop_form_remove();"></td></tr></table>', t, {
            dir: 0,
            align: 1,
            header: "FEN notation for the current position on the board:"
        })
    }, this.show_promo_screen = function(t, e, i, s, o) {
        this.promo_move_coords = {
            x1: e,
            y1: i,
            x2: s,
            y2: o
        };
        var _, r = this.id + "-";
        gui_show_fullpage_form('<table class=dialog style="margin: 10px;"><tr><td colspan=2><em>Promote pawn to:</em><div class=divider></div></td></tr><tr><td><div id="' + r + 'promo_2" class="' + r + 'promo_piece"></div></td><td>&larr; Queen</td></tr><tr><td><div id="' + r + 'promo_3" class="' + r + 'promo_piece"></div></td><td>&larr; Rook</td></tr><tr><td><div id="' + r + 'promo_4" class="' + r + 'promo_piece"></div></td><td>&larr; Knight</td></tr><tr><td><div id="' + r + 'promo_5" class="' + r + 'promo_piece"></div></td><td>&larr; Bishop</td></tr></table>');
        for (var h = 2; h <= 5; h++) {
            var a = this.get_obj("promo_" + h);
            a && (a.firstChild ? _ = a.firstChild : ((_ = document.createElement("div")).className = this.id + "-piece", _.style.left = "0", _.style.top = "0", _.style.cursor = "pointer", _.style.zIndex = "0", _.appendChild(this.get_chess_set_img()), a.appendChild(_), gk_event_callback(a, "touch", this.get_promo_handler(h)), gk_event_callback(a, "click", this.get_promo_handler(h))), this.update_piece_image(_, t | h, 1))
        }
    }, this.get_promo_handler = function(t) {
        var e = this;
        return function() {
            return e.submit_promo_screen(t), !1
        }
    }, this.submit_promo_screen = function(t) {
        gui_hide_fullpage_form();
        var e = this.code2piece[15 & t],
            i = 1;
        "function" == typeof this.callback_validate_move && (i = this.callback_validate_move(this.promo_move_coords.x1, this.promo_move_coords.y1, this.promo_move_coords.x2, this.promo_move_coords.y2, e)), i ? this.record_move(this.promo_move_coords.x1, this.promo_move_coords.y1, this.promo_move_coords.x2, this.promo_move_coords.y2, e) : this.update_cell_image(this.promo_move_coords.x1, this.promo_move_coords.y1, 0), this.promo_move_coords = null
    }, this.show_printable = function() {
        this.abort_mouse_move(0);
        var t = this.get_obj("bottom-area");
        if (t) {
            t.style.display = "none", t.style.visibility = "hidden";
            var e = document.createElement("div");
            e.id = "menu_bottom_printable", e.style.padding = "5px", t.parentNode.insertBefore(e, t), e.innerHTML = '<div style="text-align: center; padding: 20px;"><input type="button" value=" Print " onClick="window.print();"> <input type="button" value="Cancel" onClick="ichess_call_handler(this,\'hide_printable\');"></div>', this.b_printable_mode = 1, this.update_moves_list_printable();
            for (var i = 0; i < 8; i++)
                for (var s = 0; s < 8; s++) {
                    var o = this.g_board[i + 8 * s];
                    o.style.visibility = "hidden", o.firstChild.style.visibility = "hidden", o.cur_code = ""
                }
            if (t = this.get_obj("acboard")) {
                var _ = 8 * this.board_cell_size,
                    r = new Image(_, _);
                gk_event_callback(r, "abort", handler_on_image_abort), r.id = "img-printable-board";
                var h = this.encode_fen(),
                    a = this.chess_get_last_move().substr(0, 4);
                r.src = "/chess-diagram-img.pl?f=" + escape(h) + "&fb=" + (this.b_flip ? 1 : 0) + "&lm=" + a + "&t=" + to_int(this.graphics_style) + "&s=" + to_int(this.graphics_size);
                var l = r.style;
                l.width = _ + "px", l.height = _ + "px", l.position = "absolute", l.padding = "0", l.left = "0", l.top = "0", l.border = "1px solid black", l.margin = "-1px", t.appendChild(r)
            }(t = document.body).className += " printable"
        }
    }, this.hide_printable = function() {
        this.b_printable_mode = 0;
        var t = gk_get_el("menu_bottom_printable");
        t && t.parentNode.removeChild(t), (t = gk_get_el("moves_printable")) && t.parentNode.removeChild(t), (t = gk_get_el("img-printable-board")) && t.parentNode.removeChild(t);
        for (var e = 0; e < 8; e++)
            for (var i = 0; i < 8; i++) {
                this.g_board[e + 8 * i].style.visibility = "visible"
            }(t = document.body).className = String(t.className).replace(/\bprintable\b/, ""), (t = this.get_obj("bottom-area")) && (t.style.display = "", t.style.visibility = "visible"), (t = this.get_obj("moves")) && (t.style.display = "", t.style.visibility = "visible"), this.update_moves_list(), this.redraw_all()
    }, this.refresh_board = function() {
        var t = this.current_move;
        this.goto_move(this.max_move, 1), t != this.max_move && this.goto_move(t), this.redraw_all()
    }, this.chess_get_last_move = function() {
        return this.current_move < 1 ? "" : this.moves[this.current_move - 1]
    }, this.chess_get_move = function(t) {
        return this.moves[t]
    }, this.chess_get_last_move_notation = function() {
        return this.current_move < 1 ? "" : this.moves_list[this.current_move - 1]
    }, this.chess_encode_move = function(t, e, i, s, o) {
        return this.encode_pos(t, e) + this.encode_pos(i, s) + (o || "-")
    }, this.chess_decode_move = function(t) {
        var e = t.length;
        return [0 < e ? t.charCodeAt(0) - 97 : -1, 1 < e ? t.charCodeAt(1) - 49 : -1, 2 < e ? t.charCodeAt(2) - 97 : -1, 3 < e ? t.charCodeAt(3) - 49 : -1, 4 < e ? t.substr(4, 1) : "-"]
    };
    var _ = this.get_obj();
    _ && (_.ichess = this), this.b_legal_moves = gk_get_glop(1, 1), this.b_short_notation = !gk_get_glop(2, 0), this.animation_speed = gk_get_glop(3, 4), this.b_show_legal_moves = gk_get_glop(4, 1), this.b_movelist_text = gk_get_glop(8, 0), this.init_graphics_set(gk_get_glop(9, 0) + 1, 10 * (gk_get_glop(10, 5) + 1)), this.init_board_color(gk_get_glop(17, 0)), this.b_movelist_fig = gk_get_glop(18, 0), this.b_show_shadow = gk_get_glop(22, 1), this.b_highlight_mouseover = gk_get_glop(23, 0), this.n_highlight_last_move = gk_get_glop(24, 2)
}