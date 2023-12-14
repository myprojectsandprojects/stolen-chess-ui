var bob,
stockfish,
init_ml,
all_moves = [
],
icon_good = '<img class=img-i src="/img/i/tick-circle.png" style="margin: -4px 4px 0 0;">',
icon_error = '<img class=img-i src="/img/i/minus-circle.png" style="margin: -4px 4px 0 0;">',
icon_checkmate = '<img class=img-i src="/img/i/crown.png" style="margin: -4px 4px -2px 0;">',
icon_draw = '<img class=img-i src="/img/i/crown-silver.png" style="margin: -4px 4px -2px 0;">',
cur_mode = 0,
modes = {
  MOVE: 1,
  WAITING: 2,
  REVIEW: 3
},
level = 2,
ce_skill_level = 20,
ce_max_time = 2000,
ce_max_depth = 4,
ce_max_blunder = 0,
max_level = 3,
next_move = {
  depth: 0,
  move: '',
  score: 0,
  best_score: 0
},
movelist = '',
comp_moves = '',
computer_color = 'b',
make_move_wait = 0,
b_engine_loaded = 0;
function init_page(e, o) {
  max_level = o,
  set_level(gk_get_glop(21, 2));
  o = gk_get_el(e);
  if (o) {
    if (
      bob = new ichess_create(14, e),
      (o._bob = bob).b_freestyle = 0,
      bob.b_allow_new_moves = 0,
      bob.init_options(0, 1, 1, 1, 1, 0),
      init_ml && (init_ml = Base64.decode(init_ml),
      bob.init_moves_and_promos(init_ml)),
      bob.callback_record_move = callback_record_move,
      bob.callback_validate_move = callback_validate_move,
      bob.callback_click_move = callback_click_move,
      bob.callback_setup_board_elements = function () {
      var e = bob.get_obj('bottom-area');
      e && (e.style.display = 'none')
    }, bob.go(), set_status('<em class=span-wait>Loading&hellip;</em>'), !window.Worker) return set_status(icon_error + '<em>Your web browser does not support a required feature (Javascript Web Workers)</em><br>Please upgrade your web browser!'),
    void show_error('Your web browser does not support a required feature (Javascript Web Workers). Please upgrade your web browser!');
    var t = 'object' == typeof WebAssembly && WebAssembly.validate(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
    try {
      // stockfish = new Worker('./js/stockfish.wasm.200517.js')
      stockfish = new Worker(t ? '/js/stockfish.wasm.200517.js' : '/js/stockfish.200517.js')
    } catch (e) {
      stockfish_error(e),
      stockfish = new Worker
    }
    return stockfish.addEventListener('error', stockfish_error),
    stockfish.addEventListener('message', stockfish_callback),
    stockfish.postMessage('isready'),
    start_new_game(1),
    bob
  }
}
function set_level(e) {
  e ? (max_level < (level = e) && (level = max_level), setTimeout(function () {
    gui_set_selected_option('level', level)
  }, 100)) : ((level = gui_get_selected_option_value('level', 2)) < 0 && (level = 0), max_level < level && (level = max_level, gui_pop_form('<div style="white-space: normal; max-width: 500px;"><div class=pp>A <a href="/premium.pl">Premium Memebership</a> is required for the higher levels of computer opponent. Please subscribe to a <a href="/premium.pl">Premium Membership</a> to get access to this and many other advanced features on GameKnot.</div><div class=pp style="text-align: center;"><a href="/premium.pl" class="big butn bright">Subscribe to Premium Membership &raquo;</a><br><INPUT TYPE="button" VALUE="Cancel" onClick="gui_pop_form_remove()"></div></div>', bob.board || document.body, {
    dir: 4,
    align: 1,
    header: 'Premium Membership Required:'
  }), setTimeout(function () {
    gui_set_selected_option('level', level)
  }, 100)), gk_glop[21] = level, save_global_options());
  e = [
    4,
    0,
    3000,
    3,
    2,
    2,
    3000,
    3,
    1,
    5,
    4000,
    3,
    0,
    8,
    5000,
    10,
    0,
    12,
    10000,
    20,
    0,
    16,
    20000,
    40,
    0,
    20,
    30000,
    40,
    0,
    20,
    60000,
    40
  ];
  (level < 0 || e.length <= 4 * level) && (report_error('Unexpected level: ' + level), level = 2),
  (ce_max_blunder = 100 * e[4 * level]) < 0 && (ce_max_blunder = 0),
  ce_skill_level = e[4 * level + 1],
  ce_max_time = e[4 * level + 2],
  ce_max_depth = e[4 * level + 3],
  console.log('Skill level: ' + ce_skill_level + ', max blunder: ' + ce_max_blunder + ', max time: ' + ce_max_time + ', max depth: ' + ce_max_depth)
}
function stockfish_error(e) {
  console.error('StockFish ERROR:'),
  console.error(e),
  show_error('Chess Engine failed to load. Your web browser does not support all the required features. Please upgrade your web browser!')
}
function to_int(e) {
  e = parseInt(e, 10);
  return isNaN(e) ? 0 : e
}
function stockfish_callback(e) {
  e = e.data;
  if (e) {
    b_engine_loaded = 1,
    console.log(e);
    var o = e.split(' ');
    if (o && o.length) if ('info' == o[0]) {
      for (var t, s, r = 0, l = 0, m = '', i = 1; i < o.length; i++) 'depth' == o[i] ? r = to_int(o[i + 1]) : 'score' == o[i] ? 'cp' == (t = o[i + 1]) ? l = to_int(o[i + 2]) : 'mate' == t && (l = (l = to_int(o[i + 2])) < 0 ? - 30000 - 100 * l : 30000 - 100 * l) : 'pv' == o[i] && (m = o[i + 1]);
      r > next_move.depth ? (next_move.depth = r, next_move.move = m, next_move.score = l, next_move.best_score = l, s = Math.random(), next_move.max_blunder = Math.floor(s * s * ce_max_blunder)) : l > next_move.best_score - next_move.max_blunder && (next_move.move = m, next_move.score = l)
    } else 'bestmove' == o[0] && 1 < o.length && (s = o[1], 0 < ce_max_blunder && 0 < next_move.depth && next_move.move && (s = next_move.move, console.log('Overriding move: ' + s + ', best score: ' + next_move.best_score + ', score: ' + next_move.score + ', max blunder: ' + next_move.max_blunder)), all_moves.push(s), comp_moves += '>' + s, make_move(s))
  }
}
function callback_record_move() {
  if (cur_mode != modes.REVIEW) {
    var e,
    o;
    if (bob.b_allow_new_moves = 0, !bob.movers_active()) return movelist = bob.get_moves(),
    bob.b_checkmate ? (e = bob.cur_to_move == computer_color ? 1 : 0, o = icon_checkmate + '<em class=wrn>Checkmate</em><br>' + (e ? 'Well done!' : 'Better luck next time')) : (e = bob.color2code[bob.cur_to_move], bob.chess_stalemate(e) && (o = icon_draw + '<em class=wrn>Draw</em> (stalemate)')),
    o ? (cur_mode = modes.REVIEW, set_status(o), void enable_buttons(1)) : computer_color != bob.cur_to_move ? (cur_mode != modes.WAITING && report_error('Unexpected cur_mode: ' + cur_mode + ', user move, not modes.WAITING', 1), bob.b_allow_new_moves = 1, cur_mode = modes.MOVE, set_status('<img class=img-i src="/img/i/arrow-000-medium.png" style="margin: -4px 2px -2px 0;"><em>Your move</em>', 1), void enable_buttons(1)) : void (cur_mode == modes.MOVE ? (o = (o = bob.chess_get_last_move()).replace(/\-/, ''), enable_buttons(0), all_moves.push(o), compute_best_move()) : report_error('Unexpected cur_mode: ' + cur_mode + ' computer move, not modes.MOVE', 1));
    setTimeout(callback_record_move, 100)
  }
}
function compute_best_move() {
  enable_buttons(0),
  make_move_wait = get_time() + 1000,
  cur_mode = modes.WAITING,
  set_status('<em class=span-wait>Thinking&hellip;</em>', 1);
  var e = get_book_move();
  if (e) return all_moves.push(e),
  comp_moves += '=' + e,
  void make_move(e);
  e = 'position startpos';
  all_moves.length && (e += ' moves ' + all_moves.join(' ')),
  stockfish.postMessage(e),
  console.log('STATE: ' + e),
  stockfish.postMessage('setoption name MultiPV value ' + (level < 3 ? 5 : 1)),
  next_move.depth = 0,
  next_move.move = '',
  stockfish.postMessage('go movetime ' + ce_max_time + ' depth ' + ce_max_depth)
}
function enable_buttons(e) {
  var o = gk_get_el('new_game_button');
  o && (o.disabled = !e, set_css_class(o, 'big', e && cur_mode == modes.REVIEW ? 1 : 0)),
  (o = gk_get_el('switch_sides_button')) && (o.disabled = !e)
}
function callback_click_move(e) {
  cur_mode == modes.REVIEW && bob.anim_move(e)
}
function callback_validate_move() {
  return cur_mode == modes.MOVE || cur_mode == modes.REVIEW
}
function make_move(e) {
  get_time() < make_move_wait ? setTimeout(function () {
    make_move(e)
  }, 100) : bob.submit_move(e)
}
function pop_msg(e, o, t) {
  gui_pop_message(e, bob.board || document.body, o || 3000, t)
}
function set_status(e, o) {
  var t = gk_get_el('status');
  t && (t.innerHTML = e),
  o || pop_msg(e, 1000)
}
function get_level_name() {
  return ['Easy',
  'Beginner',
  'Casual',
  'Intermediate',
  'Advanced',
  'Expert',
  'Grandmaster',
  'Impossible'][level] || 'Unknown'
}
function start_new_game(e) {
  if (cur_mode = modes.MOVE, enable_buttons(0), bob.b_allow_new_moves = 0, bob.reset_all(), bob.b_allow_new_moves = 1, movelist = bob.get_moves(), comp_moves = '', set_status(icon_good + '<em>Ready!<br>Your move</em>', !e), stockfish.postMessage('ucinewgame'), all_moves = [
  ], init_ml) for (var o = 0; o < bob.moves.length; o++) {
    var t = bob.moves[o];
    all_moves.push(t.replace(/\-/, ''))
  }
  var s = 1;
  bob.cur_to_move == computer_color && (e ? (bob.flip(), computer_color = 'w' == computer_color ? 'b' : 'w') : (compute_best_move(), s = 0)),
  enable_buttons(s)
  console.error("HI!");
}
function get_book_move() {
  if ('undefined' == typeof book) return '';
  var e = book[0];
  if (!e) return '';
  for (var o = 0; o < bob.moves.length; o++) {
    var t = e[s = (s = bob.moves[o]).replace(/\-/, '')];
    if (!t) return '';
    if (!(e = book[t])) return ''
  }
  var s,
  r = [
  ];
  for (s in e) 'string' == typeof s && r.push(s);
  return r.length ? r[Math.floor(Math.random() * r.length)] : ''
}
function get_pgn() {
  var e = '',
  o = new Date,
  t = o.getMonth() + 1;
  t < 10 && (t = '0' + t);
  var s = o.getDate();
  s < 10 && (s = '0' + s);
  var r = o.getFullYear() + '.' + t + '.' + s,
  l = '*',
  o = bob.color2code[bob.cur_to_move];
  bob.chess_checkmate(o) ? l = o ? '0-1' : '1-0' : bob.chess_stalemate(o) && (l = '1/2-1/2');
  t = gk_uid,
  s = 'Computer (' + get_level_name() + ' level)';
  if ('w' == computer_color && (o = t, t = s, s = o), e += '[Event "http://gameknot.com/chess-computer.pl"]\n', e += '[Site "http://gameknot.com/"]\n', e += '[Date "' + r + '"]\n', e += '[Round "-"]\n', e += '[White "' + (t = t || 'unknown') + '"]\n', e += '[Black "' + (s = s || 'unknown') + '"]\n', e += '[Result "' + l + '"]\n', e += '\n', 0 < bob.moves_list.length) {
    var m = bob.moves_list.slice();
    for ('b' == bob.start_plyr() && m.unshift('...'), i = 0; i < m.length; i++) {
      i % 2 == 0 && (e += i / 2 + 1 + '. ');
      var a = all_moves[i];
      e += (a = (a = (a = a.replace(/\s*e\.p\.\s*/i, ' ')).replace(/\s+\+/, '+')).replace(/\s+/, ' ')) + ' '
    }
  }
  return e += l,
  e += '\n\n'
}
function show_pgn() {
  var e = get_pgn();
  gui_pop_form('<div style="white-space: normal;"><div class=pp>PGN notation for the game:</div><div class=pp><textarea style="width: 500px; height: 400px;" readonly onClick="select()">' + e + '</textarea></div><div class=pp style="text-align: center;"><INPUT TYPE="button" VALUE="  Ok  " onClick="gui_pop_form_remove()"></div></div>', bob.board || document.body, {
    dir: 4,
    align: 1,
    header: 'PGN notation:'
  })
}
function switch_sides() {
  cur_mode != modes.WAITING && (bob.flip(), computer_color = 'w' == computer_color ? 'b' : 'w', cur_mode == modes.MOVE && compute_best_move())
}
function report_error(e, o) {
  e = void 0 !== e.message ? e.message : e.toString();
  gk_log_error(e + '\nMoves: ' + movelist + '\nComp: ' + comp_moves + '\nTime: ' + ce_max_time + '\nDepth: ' + ce_max_depth + (bob ? '\nFlip: ' + bob.b_flip : '') + '\nComputer color: ' + computer_color),
  o || gui_pop_form('<div style="white-space: normal; max-width: 500px;"><div class=pp><em class=err>ERROR:</em> ' + e + '</div><div class=pp>This error message has been logged. If the problem persists, please contact customer service.</div><div class=pp style="text-align: center;"><INPUT TYPE="button" VALUE="  Ok  " onClick="location.reload(true);"></div></div>', bob.board || document.body, {
    dir: 4,
    align: 1,
    header: 'Run-time Error:'
  })
}
function show_error(e) {
  gui_pop_form('<div style="white-space: normal; max-width: 500px;"><div class=pp><em class=err>ERROR:</em> ' + e + '</div><div class=pp style="text-align: center;"><INPUT TYPE="button" VALUE="  Ok  " onClick="gui_pop_form_remove()"></div></div>', bob.board || document.body, {
    dir: 4,
    align: 1,
    header: 'Chess Engine Error:'
  })
}
