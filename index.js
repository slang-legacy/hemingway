var writeState = 'edit';
var yellowSentenceState = 'on';
var redSentenceState = 'on';
var adverbState = 'on';
var stuffyState = 'on';
var passiveState = 'on';
var purpleTooltipActive = false;
var greenTooltipActive = false;
var lastAnalysis = [];
var updateCount = 0;
var s;
updateAll();
$('#btn-edit')['button']('toggle');
$('body')['on']('load', function() {
  $('#editor')['focus']();
});
$('#editor-highlighter')['on']('click', function() {
  $('#editor')['focus']();
});
$('#editor')['on']('keyup', function(_0x2c3axc) {
  if (writeState == 'edit' && _0x2c3axc['keyCode'] != 16 && _0x2c3axc['keyCode'] != 17) {
    if (_0x2c3axc['keyCode'] == 13) {
      updateAll();
      scaleTextBoxes();
    } else {
      updateAll();
    };
  };
  var _0x2c3axd = _0x2c3axc['ctrlKey'] || _0x2c3axc['metaKey'];
  if (_0x2c3axd && _0x2c3axc['keyCode'] == 90) {
    updateAll();
  };
});
$('#editor')['keydown'](function(_0x2c3axc) {
  if (_0x2c3axc['keyCode'] === 9) {
    var _0x2c3axe = this['selectionStart'];
    var _0x2c3axf = this['selectionEnd'];
    var _0x2c3ax10 = $(this);
    var _0x2c3ax11 = _0x2c3ax10['val']();
    _0x2c3ax10['val'](_0x2c3ax11['substring'](0, _0x2c3axe) + ' ' + _0x2c3ax11['substring'](_0x2c3axf));
    this['selectionStart'] = this['selectionEnd'] = _0x2c3axe + 1;
    _0x2c3axc['preventDefault']();
  };
});
$('#editor')['on']('paste', function() {
  if (writeState == 'edit') {
    window['setTimeout'](updateAll, 110);
  }
  window['setTimeout'](scaleTextBoxes, 30);
  scrollFix();
});
$('#editor')['on']('scroll', function() {
  $('#editor-highlighter')['scrollTop']($('#editor')['scrollTop']());
});
$('#btn-write')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    writeState = 'write';
    clearAll();
    var _0x2c3ax12 = $('#editor')['scrollTop']();
    $('#editor')['delay'](50)['focus']();
    $('#editor')['scrollTop'](_0x2c3ax12);
    $('#editor')['css']('opacity', 1);
  };
});
$('#btn-edit')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    writeState = 'edit';
    $('#editor-highlighter')['fadeIn'](200);
    $('#right-panel-ui')['fadeIn'](200);
    scrollFix();
    updateAll();
    var _0x2c3ax12 = $('#editor')['scrollTop']();
    $('#editor')['delay'](50)['focus']();
    $('#editor')['scrollTop'](_0x2c3ax12);
    $('#editor')['css']('opacity', 0.6);
  };
});
$('#yellowSentenceOn')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    yellowSentenceState = 'on';
    showYellowSentences();
  };
});
$('#yellowSentenceOff')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    yellowSentenceState = 'off';
    hideYellowSentences();
  };
});
$('#redSentenceOn')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    redSentenceState = 'on';
    showRedSentences();
  };
});
$('#redSentenceOff')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    redSentenceState = 'off';
    hideRedSentences();
  };
});
$('#adverbsOn')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    adverbState = 'on';
    showAdverbs();
  };
});
$('#adverbsOff')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    adverbState = 'off';
    hideAdverbs();
  };
});
$('#stuffyOn')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    stuffyState = 'on';
    showStuffy();
  };
});
$('#stuffyOff')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    stuffyState = 'off';
    hideStuffy();
  };
});
$('#passiveOn')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    passiveState = 'on';
    showPassive();
  };
});
$('#passiveOff')['on']('click', function() {
  if (!$(this)['hasClass']('active')) {
    passiveState = 'off';
    hidePassive();
  };
});
$('#yellowSentenceContainer')['hover'](showYellowToggle, hideYellowToggle);
$('#redSentenceContainer')['hover'](showRedToggle, hideRedToggle);
$('#adverbContainer')['hover'](showAdverbToggle, hideAdverbToggle);
$('#stuffyContainer')['hover'](showStuffyToggle, hideStuffyToggle);
$('#passiveContainer')['hover'](showPassiveToggle, hidePassiveToggle);
$('#editor')['mousemove'](checkHover);
$('.more-info')['tooltip']();
$('#readability-mark')['popover']();
$('#yesToDesktop')['button']();
$('#noToDesktop')['button']();
$('#yesToDesktop')['on']('click', function() {
  var _0x2c3ax13 = $(this);
  _0x2c3ax13['button']('loading');
  setTimeout(function() {
    _0x2c3ax13['button']('reset');
  }, 3000);
  window['location'] = 'email-form.html';
});
$('#noToDesktop')['on']('click', function() {
  var _0x2c3ax13 = $(this);
  _0x2c3ax13['button']('loading');
  setTimeout(function() {
    _0x2c3ax13['button']('reset');
  }, 3000);
  window['setTimeout'](closeDesktopModal, 500);
});

function scaleTextBoxes() {
  var _0x2c3ax15 = $('#editor')[0]['scrollHeight'];
  _0x2c3ax15 += 30;
  if (_0x2c3ax15 > 600) {
    $('#editingSpan')['css']('overflow-y', 'scroll');
  };
  $('#editor')['height'](_0x2c3ax15);
  $('#editor-highlighter')['height'](_0x2c3ax15);
  if ($('#spell-highlighter')['length'] > 0) {
    $('#spell-highlighter')['height'](_0x2c3ax15);
  };
};

function scrollFix() {
  window['setTimeout'](function() {
    $('#editor-highlighter')['scrollTop']($('#editor')['scrollTop']());
  }, 110);
};

function updateAll() {
  var _0x2c3ax18 = $('#editor')['val']();
  applyText(_0x2c3ax18);
  var _0x2c3ax19 = analyzeS();
  var _0x2c3ax1a = analyze(_0x2c3ax19);
  sentenceUI(_0x2c3ax1a[2]);
  adverbUI(_0x2c3ax1a[3]);
  statsUI(_0x2c3ax1a);
  readabilityUI(_0x2c3ax1a[4], _0x2c3ax1a[2]);
  stuffyUI();
  passiveUI(_0x2c3ax1a[2]);
  lastAnalysis = _0x2c3ax1a;
  updateCount++;
  var _0x2c3ax1b = updateCount % 10;
  if (updateCount == 4) {
    var _0x2c3ax1c = 'Grade ' + _0x2c3ax1a[4];
  }
};

function clearAll() {
  $('#editor-highlighter')['fadeOut'](200);
  $('#right-panel-ui')['fadeOut'](200);
}


var simpleList=[{"orig":"a number of","replace":"Many, some"},{"orig":"﻿abundance","replace":"Enough, plenty"},{"orig":"accede to","replace":"Allow, agree to"},{"orig":"accelerate","replace":"Speed up"},{"orig":"﻿accentuate","replace":"Stress"},{"orig":"﻿accompany","replace":"Go with, with"},{"orig":"﻿accomplish","replace":"Do"},{"orig":"﻿accorded","replace":"Given"},{"orig":"﻿accrue","replace":"Add, gain"},{"orig":"acquiesce","replace":"Agree"},{"orig":"acquire","replace":"Get"},{"orig":"additional","replace":"More, extra"},{"orig":"adjacent to","replace":"Next to"},{"orig":"adjustment","replace":"Change"},{"orig":"admissible","replace":"Allowed, accepted"},{"orig":"advantageous","replace":"Helpful"},{"orig":"adversely impact","replace":"Hurt"},{"orig":"advise","replace":"Tell﻿"},{"orig":"aforementioned","replace":"Remove"},{"orig":"aggregate","replace":"Total﻿, add"},{"orig":"aircraft","replace":"Plane"},{"orig":"all of","replace":"All"},{"orig":"alleviate","replace":"Ease, reduce"},{"orig":"allocate","replace":"Divide"},{"orig":"along the lines of","replace":"Like, as in"},{"orig":"already existing","replace":"Existing"},{"orig":"alternatively","replace":"Or"},{"orig":"ameliorate","replace":"Improve, help"},{"orig":"anticipate","replace":"Expect"},{"orig":"apparent","replace":"Clear, plain"},{"orig":"appreciable","replace":"Many"},{"orig":"as a means of","replace":"To"},{"orig":"as of yet","replace":"Yet"},{"orig":"as to","replace":"on, about"},{"orig":"as yet","replace":"Yet"},{"orig":"ascertain","replace":"Find out, learn"},{"orig":"assistance","replace":"Help﻿"},{"orig":"at this time","replace":"Now﻿﻿﻿"},{"orig":"attain","replace":"Meet"},{"orig":"attributable to","replace":"Because"},{"orig":"authorize","replace":"Allow, let"},{"orig":"because of the fact that","replace":"because"},{"orig":"belated","replace":"late"},{"orig":"benefit from","replace":"enjoy"},{"orig":"bestow","replace":"give, award"},{"orig":"by virtue of","replace":"by, under"},{"orig":"cease","replace":"stop"},{"orig":"close proximity","replace":"near"},{"orig":"commence","replace":"Begin or start"},{"orig":"comply with","replace":"follow"},{"orig":"concerning","replace":"about, on"},{"orig":"consequently","replace":"so﻿﻿"},{"orig":"consolidate","replace":"join, merge"},{"orig":"constitutes","replace":"is, forms, makes up"},{"orig":"demonstrate","replace":"prove, show"},{"orig":"depart","replace":"leave, go"},{"orig":"designate","replace":"choose, name"},{"orig":"discontinue","replace":"drop, stop"},{"orig":"due to the fact that","replace":"because, since"},{"orig":"each and every","replace":"Each"},{"orig":"economical","replace":"cheap"},{"orig":"eliminate","replace":"cut, drop, end"},{"orig":"elucidate","replace":"explain"},{"orig":"employ","replace":"use"},{"orig":"endeavor","replace":"try"},{"orig":"enumerate","replace":"count"},{"orig":"equitable","replace":"fair"},{"orig":"equivalent","replace":"equal"},{"orig":"evaluate","replace":"test, check"},{"orig":"evidenced","replace":"showed"},{"orig":"exclusively","replace":"only"},{"orig":"expedite","replace":"hurry"},{"orig":"expend","replace":"spend"},{"orig":"expiration","replace":"end"},{"orig":"facilitate","replace":"ease, help"},{"orig":"factual evidence","replace":"facts, evidence"},{"orig":"feasible","replace":"workable"},{"orig":"finalize","replace":"complete, finish"},{"orig":"first and foremost","replace":"first"},{"orig":"for the purpose of,","replace":"to"},{"orig":"forfeit","replace":"lose, give up"},{"orig":"formulate","replace":"plan"},{"orig":"honest truth","replace":"truth"},{"orig":"however","replace":"but, yet"},{"orig":"if and when","replace":"use either word; not both"},{"orig":"impacted","replace":"affected, harmed, changed"},{"orig":"implement","replace":"install, put in place; tool"},{"orig":"in a timely manner","replace":"on time"},{"orig":"in accordance with","replace":"by, under"},{"orig":"in addition","replace":"also, besides, too"},{"orig":"in all likelihood","replace":"probably"},{"orig":"in an effort to","replace":"to"},{"orig":"in between","replace":"between"},{"orig":"in excess of","replace":"more than"},{"orig":"in lieu of","replace":"instead"},{"orig":"in light of the fact that","replace":"because"},{"orig":"in many cases","replace":"often"},{"orig":"in order to","replace":"to"},{"orig":"in regard to","replace":"about, concerning, on"},{"orig":"in some instances ","replace":"sometimes"},{"orig":"in terms of","replace":"omit﻿﻿; for, as, with"},{"orig":"in the near future","replace":"soon"},{"orig":"in the process of","replace":"omit"},{"orig":"inception","replace":"start"},{"orig":"incumbent upon","replace":"must"},{"orig":"indicate","replace":"say, state, or show"},{"orig":"indication","replace":"sign"},{"orig":"initiate","replace":"start"},{"orig":"is applicable to","replace":"applies to"},{"orig":"is authorized to","replace":"may"},{"orig":"is responsible for","replace":"handles"},{"orig":"it is essential","replace":"must, need to"},{"orig":"magnitude","replace":"size"},{"orig":"maximum","replace":"greatest, largest, most"},{"orig":"methodology","replace":"method"},{"orig":"minimize","replace":"cut"},{"orig":"minimum","replace":"least, smallest﻿, small"},{"orig":"modify","replace":"change"},{"orig":"monitor","replace":"check, watch, track"},{"orig":"multiple","replace":"many"},{"orig":"necessitate","replace":"cause, need"},{"orig":"nevertheless","replace":"still, besides, even so"},{"orig":"not certain","replace":"uncertain"},{"orig":"not many","replace":"few"},{"orig":"not often","replace":"rarely"},{"orig":"not unless","replace":"only if"},{"orig":"not unlike","replace":"similar, alike"},{"orig":"notwithstanding","replace":"in spite of, still"},{"orig":"null and void","replace":"use either null or void"},{"orig":"numerous","replace":"many"},{"orig":"objective","replace":"aim, goal"},{"orig":"obligate","replace":"bind, compel"},{"orig":"obtain","replace":"get"},{"orig":"on the contrary","replace":"but, so"},{"orig":"on the other hand","replace":"omit; but, so"},{"orig":"one particular","replace":"one"},{"orig":"optimum","replace":"best, greatest, most"},{"orig":"overall","replace":"omit"},{"orig":"owing to the fact that","replace":"because, since"},{"orig":"participate","replace":"take part"},{"orig":"particulars","replace":"details"},{"orig":"pass away","replace":"die"},{"orig":"pertaining to","replace":"about, of, on"},{"orig":"point in time","replace":"time, point, moment﻿, now"},{"orig":"portion","replace":"part"},{"orig":"possess","replace":"have, own"},{"orig":"preclude","replace":"prevent"},{"orig":"previously","replace":"before"},{"orig":"prior to","replace":"before"},{"orig":"prioritize","replace":"rank, focus on"},{"orig":"procure","replace":"buy, get"},{"orig":"proficiency","replace":"skill"},{"orig":"provided that","replace":"if"},{"orig":"purchase","replace":"buy﻿﻿﻿, sale"},{"orig":"put simply","replace":"omit"},{"orig":"readily apparent","replace":"clear"},{"orig":"refer back","replace":"refer"},{"orig":"regarding","replace":"about, of, on"},{"orig":"relocate","replace":"move"},{"orig":"remainder","replace":"rest"},{"orig":"remuneration","replace":"payment"},{"orig":"require","replace":"must, need"},{"orig":"requirement","replace":"need, rule"},{"orig":"reside","replace":"live"},{"orig":"residence","replace":"house"},{"orig":"retain","replace":"keep"},{"orig":"satisfy","replace":"meet, please"},{"orig":"shall","replace":"must﻿﻿﻿, will"},{"orig":"should you wish","replace":"if you want"},{"orig":"similar to","replace":"like"},{"orig":"solicit","replace":"ask for, request"},{"orig":"span across","replace":"span, cross"},{"orig":"strategize","replace":"plan"},{"orig":"subsequent","replace":"later, next, after, then"},{"orig":"substantial","replace":"large, much"},{"orig":"successfully complete","replace":"complete, pass"},{"orig":"sufficient","replace":"enough"},{"orig":"terminate","replace":"end, stop"},{"orig":"the month of","replace":"omit"},{"orig":"therefore","replace":"thus, so"},{"orig":"time period","replace":"time, period"},{"orig":"took advantage of","replace":"preyed﻿ on"},{"orig":"transmit","replace":"send"},{"orig":"transpire","replace":"happen"},{"orig":"until such time as","replace":"until"},{"orig":"utilization","replace":"use﻿﻿﻿﻿"},{"orig":"utilize","replace":"use"},{"orig":"validate","replace":"confirm"},{"orig":"various different","replace":"various, different"},{"orig":"very","replace":"omit"},{"orig":"whether or not","replace":"whether"},{"orig":"with respect to","replace":"on, about"},{"orig":"with the exception of","replace":"except for"},{"orig":"witnessed","replace":"saw, seen"}];

var passiveList=[{"orig":"awoken","replace":"awoke"},{"orig":"beaten","replace":"beat"},{"orig":"begun","replace":"began"},{"orig":"bent","replace":"bent"},{"orig":"bitten","replace":"bit"},{"orig":"bled","replace":"bled"},{"orig":"blown","replace":"blew"},{"orig":"broken","replace":"broke"},{"orig":"brought","replace":"brought"},{"orig":"built","replace":"built"},{"orig":"bought","replace":"bought"},{"orig":"caught","replace":"caught"},{"orig":"chosen","replace":"chose"},{"orig":"cut","replace":"cut"},{"orig":"dealt","replace":"dealt"},{"orig":"done","replace":"did"},{"orig":"drawn","replace":"drew"},{"orig":"driven","replace":"drove"},{"orig":"eaten","replace":"ate"},{"orig":"fed","replace":"fed"},{"orig":"felt","replace":"felt"},{"orig":"fought","replace":"fought"},{"orig":"found","replace":"found"},{"orig":"forbidden","replace":"forbade"},{"orig":"forgotten","replace":"forgot"},{"orig":"forgiven","replace":"forgave"},{"orig":"frozen","replace":"froze"},{"orig":"gotten","replace":"got"},{"orig":"given","replace":"gave"},{"orig":"ground","replace":"ground"},{"orig":"ground","replace":"ground, grinded"},{"orig":"hung","replace":"hung"},{"orig":"heard","replace":"heard"},{"orig":"hidden","replace":"hid"},{"orig":"hit","replace":"hit"},{"orig":"held","replace":"held"},{"orig":"hurt","replace":"hurt"},{"orig":"kept","replace":"kept"},{"orig":"known","replace":"knew"},{"orig":"laid","replace":"laid"},{"orig":"led","replace":"led"},{"orig":"left","replace":"left"},{"orig":"let","replace":"let"},{"orig":"lost","replace":"lost"},{"orig":"made","replace":"made"},{"orig":"meant","replace":"meant"},{"orig":"met","replace":"met"},{"orig":"paid","replace":"paid"},{"orig":"proven","replace":"proved"},{"orig":"put","replace":"put"},{"orig":"read","replace":"read"},{"orig":"ridden","replace":"rode"},{"orig":"rung","replace":"rang"},{"orig":"run","replace":"ran"},{"orig":"said","replace":"said"},{"orig":"seen","replace":"saw"},{"orig":"sold","replace":"sold"},{"orig":"sent","replace":"sent"},{"orig":"shaken","replace":"shook"},{"orig":"shaved","replace":"shaved"},{"orig":"shot","replace":"shot"},{"orig":"shown","replace":"showed"},{"orig":"shut","replace":"shut"},{"orig":"sung","replace":"sung"},{"orig":"sunk","replace":"sunk"},{"orig":"slain","replace":"slew"},{"orig":"slid","replace":"slid"},{"orig":"spoken","replace":"spoke"},{"orig":"spent","replace":"spent"},{"orig":"spun","replace":"spun"},{"orig":"split","replace":"split"},{"orig":"spread","replace":"spread"},{"orig":"stolen","replace":"stole"},{"orig":"struck","replace":"struck"},{"orig":"swept","replace":"swept"},{"orig":"swung","replace":"swung"},{"orig":"taken","replace":"took"},{"orig":"taught","replace":"taught"},{"orig":"torn","replace":"tore"},{"orig":"told","replace":"told"},{"orig":"thought","replace":"thought"},{"orig":"thrown","replace":"threw"},{"orig":"undergone","replace":"underwent"},{"orig":"understood","replace":"understood"},{"orig":"upset","replace":"upset"},{"orig":"woken","replace":"woke"},{"orig":"worn","replace":"wore"},{"orig":"won","replace":"won"},{"orig":"withdrawn","replace":"withdrew"},{"orig":"written","replace":"wrote"}];


function applyText(_0x2c3ax18) {
  _0x2c3ax18 = _0x2c3ax18['replace'](/(<)([^>]*)(>)/g, '<i>$1</i>$2<i>$3</i>');
  var _0x2c3ax21 = _0x2c3ax18['match'](/^(\n)+/);
  if (_0x2c3ax21) {
    var _0x2c3ax22 = _0x2c3ax21[0]['split'](/\n/);
    console['log'](_0x2c3ax22['length']);
    var _0x2c3ax23 = '';
    for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax22['length'] - 1; _0x2c3ax24++) {
      _0x2c3ax23 += '<br/>';
    };
    _0x2c3ax18 = _0x2c3ax18['replace'](/^(\n)+/, _0x2c3ax23);
  };
  _0x2c3ax18 = _0x2c3ax18['replace'](/(\n\n)( )+(\n\n)/g, '$1$3');
  _0x2c3ax18 = _0x2c3ax18['replace'](/((\n\n)*)(\n\n)/g, '</span></p><p>$1<span>');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\b(Mr|Ms|Mrs|Dr|U\.S|Col|Sgt|Lt|Adm|Maj|Sen|Rep|Jan|Feb|Apr|Mar|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec|Pvt|Cpl|Capt|Gen|Ave|St|inc|ft|Gov|Jr|Sr|ltd|Rev|M|Mme|Prof|Pres|Hon|[A-Z])(\.)\s/g, '<s>$1</s> ');
  _0x2c3ax18 = _0x2c3ax18['replace'](/(etc|vs|\.\.|e\.g|i\.e|a\.m|p\.m)(\.)(\"|\”)?(\s)?([a-z])/g, '<s>$1</s>$3$4$5');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\.(\)|\"|\”|\')?( |\n)/g, '.$1</span><span>$2');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\?(\)|\"|\”|\')?( |\n)/g, '?$1</span><span>$2');
  _0x2c3ax18 = _0x2c3ax18['replace'](/!(\)|\"|\”|\')?( |\n)/g, '!$1</span><span>$2');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\n\t/g, '</span></p><p class="tab-graph"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  _0x2c3ax18 = _0x2c3ax18['replace'](/(•)\t/g, '$1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\n$/, '<br/>&nbsp;');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\n/g, '</span><br/><span>');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\s(\s)/g, '<u> </u><u>$1</u>');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\b(a number of|abundance|accede to|accelerate|accentuate|accompany|accomplish|accorded|accrue|acquiesce|acquire|additional|adjacent to|adjustment|admissible|advantageous|adversely impact|advise|aforementioned|aggregate|aircraft|all of|alleviate|allocate|along the lines of|already existing|alternatively|ameliorate|anticipate|apparent|appreciable|as a means of|as of yet|as to|as yet|ascertain|assistance|at this time|attain|attributable to|authorize|because of the fact that|belated|benefit from|bestow|by virtue of|cease|close proximity|commence|comply with|concerning|consequently|consolidate|constitutes|demonstrate|depart|designate|discontinue|due to the fact that|each and every|economical|eliminate|elucidate|employ|endeavor|enumerate|equitable|equivalent|evaluate|evidenced|exclusively|expedite|expend|expiration|facilitate|factual evidence|feasible|finalize|first and foremost|for the purpose of|forfeit|formulate|honest truth|however|if and when|impacted|implement|in a timely manner|in accordance with|in addition|in all likelihood|in an effort to|in between|in excess of|in lieu of|in light of the fact that|in many cases|in order to|in regard to|in some instances|in terms of|in the near future|in the process of|inception|incumbent upon|indicate|indication|initiate|is applicable to|is authorized to|is responsible for|it is essential|magnitude|maximum|methodology|minimize|minimum|modify|monitor|multiple|necessitate|nevertheless|not certain|not many|not often|not unless|not unlike|notwithstanding|null and void|numerous|objective|obligate|obtain|on the contrary|on the other hand|one particular|optimum|overall|owing to the fact that|participate|particulars|pass away|pertaining to|point in time|portion|possess|preclude|previously|prior to|prioritize|procure|proficiency|provided that|purchase|put simply|readily apparent|refer back|regarding|relocate|remainder|remuneration|require|requirement|reside|residence|retain|satisfy|shall|should you wish|similar to|solicit|span across|strategize|subsequent|substantial|successfully complete|sufficient|terminate|the month of|therefore|time period|took advantage of|transmit|transpire|until such time as|utilization|utilize|validate|various different|very|whether or not|with respect to|with the exception of|witnessed)\b/gi, '<b>$1</b>');
  _0x2c3ax18 = _0x2c3ax18['replace'](/\b(is|are|was|were|be|been|being)(\s)(([a-z]+ed)|awoken|beaten|begun|bent|bitten|bled|blown|broken|brought|built|bought|caught|chosen|cut|dealt|done|drawn|driven|eaten|fed|felt|fought|found|flown|forbidden|forgotten|forgiven|frozen|gotten|given|ground|hung|heard|hidden|hit|held|hurt|kept|known|laid|led|left|let|lost|made|meant|met|paid|proven|put|read|ridden|rung|run|said|seen|sold|sent|shaken|shaved|shot|shown|shut|sung|sunk|slain|slid|spoken|spent|spun|split|spread|stolen|struck|swept|swung|taken|taught|torn|told|thought|thrown|undergone|understood|upset|woken|worn|won|withdrawn|written)(\sby)?\b/gi, '<q>$1$2$3$5</q>');
  _0x2c3ax18 = _0x2c3ax18['replace'](/(\b)(famil|ugl|onl|definitel|unfortunatel|friendl|especiall|finall|likel|sill|lonel|earl|exactl|recentl|ital|jul|latel|immediatel|shortl|chill|currentl|allegedl|dail|nightl|weekl|hourl|monthl|yearl|quarterl|rarel|additionall|roughl|deadl|completel|all|anomal|assembl|bell|rall|repl|appl|timel|previousl|bel|elderl|compl|impl|multipl|rel|repl|exclusivel|suppl|tall|bull|hol|doll|doil|alternativel|gull|hillbill|consequentl|holl|homil|jell|lil|monopol|mentall|panopl|potbell|underbell|butterfl|dragonfl|firefl|gadfl|horsefl|moll|troll|foll|bubbl|worldl|bristl|crinkl|crumbl|cuddl|luckil|giggl|jiggl|smell|sparkl|wrinkl|presumabl|approximatel|usuall|particularl|emil|ashel|ashl|bail|bradl|bill|carl|charl|karl|doll|ell|hill|sill|dill|hall|hail|harl|holl|jill|joll|kell|karl|lill|loll|lil|moll|poll|pual|paull|shell|sall|shirl|tall|waverl|will)(y)(\b)/gi, '<i>$2</i>y');
  _0x2c3ax18 = _0x2c3ax18['replace'](/(\b)([a-z]{2,}ly)(\b)/gi, '$1<em class="alert alert-info">$2</em>$3');
  $('#editor-highlighter')['html']('<p><span>' + _0x2c3ax18 + '</span></p>');
};

function analyze(_0x2c3ax19) {
  var _0x2c3ax26 = _0x2c3ax19[1],
    _0x2c3ax27 = _0x2c3ax19[0];
  var _0x2c3ax28 = _0x2c3ax19[2];
  var _0x2c3ax29 = $('#editor-highlighter p');
  var _0x2c3ax2a = _0x2c3ax29['length'];
  var _0x2c3ax2b = null;
  if (_0x2c3ax27 > 0) {
    _0x2c3ax2b = getReadingLevel(_0x2c3ax2a, _0x2c3ax28, _0x2c3ax26, _0x2c3ax27);
  };
  if (_0x2c3ax2b < 0 || _0x2c3ax2b === null) {
    _0x2c3ax2b = 0;
  };
  var _0x2c3ax1a = [_0x2c3ax27, _0x2c3ax26, _0x2c3ax28, _0x2c3ax2a, _0x2c3ax2b];
  return _0x2c3ax1a;
};

function analyzeP() {
  var _0x2c3ax29 = $('#editor-highlighter p');
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax29['length']; _0x2c3ax24++) {
    var _0x2c3ax2d = $(_0x2c3ax29[_0x2c3ax24])['children']();
    var _0x2c3ax2e = 0,
      _0x2c3ax2f = 0;
    for (var _0x2c3ax30 = 0; _0x2c3ax30 < _0x2c3ax2d['length']; _0x2c3ax30++) {
      _0x2c3ax2f += $(_0x2c3ax2d[_0x2c3ax30])['data']('words');
      _0x2c3ax2e += $(_0x2c3ax2d[_0x2c3ax30])['data']('chars');
    };
    $(_0x2c3ax29[_0x2c3ax24])['removeData']();
    $(_0x2c3ax29[_0x2c3ax24])['data']('words', _0x2c3ax2f);
    $(_0x2c3ax29[_0x2c3ax24])['data']('chars', _0x2c3ax2e);
  };
};

function analyzeS() {
  s = $('#editor-highlighter span');
  var _0x2c3ax32 = 0,
    _0x2c3ax33 = 0,
    _0x2c3ax34 = s['length'];
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < s['length']; _0x2c3ax24++) {
    var _0x2c3ax35 = $(s[_0x2c3ax24])['text']();
    var _0x2c3ax36 = _0x2c3ax35['replace'](/['";:,.?¿\-\—!¡]+/g, '')['match'](/\S+/g);
    if (_0x2c3ax36) {
      _0x2c3ax36 = _0x2c3ax36['length'];
    };
    var _0x2c3ax37 = _0x2c3ax35['replace'](/\s/g, '')['length'];
    _0x2c3ax32 += _0x2c3ax36;
    _0x2c3ax33 += _0x2c3ax37;
    var _0x2c3ax38 = getReadingLevel(1, 1, _0x2c3ax36, _0x2c3ax37);
    if (_0x2c3ax38 > 12 && _0x2c3ax38 <= 16 && _0x2c3ax36 > 14) {
      $(s[_0x2c3ax24])['addClass']('alert');
    } else {
      if (_0x2c3ax38 > 16 && _0x2c3ax36 > 14) {
        $(s[_0x2c3ax24])['addClass']('alert');
        $(s[_0x2c3ax24])['addClass']('alert-error');
      } else {
        if ($(s[_0x2c3ax24])['hasClass']('alert')) {
          $(s[_0x2c3ax24])['removeClass']('alert');
          if ($(s[_0x2c3ax24])['hasClass']('alert-error')) {
            $(s[_0x2c3ax24])['removeClass']('alert-error');
          };
        };
      };
    }; if (_0x2c3ax36 === null) {
      _0x2c3ax34--;
      if (_0x2c3ax24 != s['length'] - 1) {
        $(s[_0x2c3ax24])['remove']();
      };
    };
  };
  return [_0x2c3ax33, _0x2c3ax32, _0x2c3ax34];
};

function getReadingLevel(_0x2c3ax29, s, _0x2c3ax3a, _0x2c3ax3b) {
  var _0x2c3ax3c = Math['round']((4.75 * (_0x2c3ax3b / _0x2c3ax3a)) + (0.5 * (_0x2c3ax3a / s)) - 21.43);
  return _0x2c3ax3c;
};

function wordFreq(_0x2c3ax3e) {
  var _0x2c3ax3a = _0x2c3ax3e['replace'](/['";:,.?¿\-!¡]+/g, '')['match'](/\S+/g);
  var _0x2c3ax3f = [];
  if (_0x2c3ax3a === null) {
    _0x2c3ax3a = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax3a['length']; _0x2c3ax24++) {
    var _0x2c3ax40 = _0x2c3ax3a[_0x2c3ax24];
    _0x2c3ax40 = _0x2c3ax40['toLowerCase']();
    if (_0x2c3ax40['charAt'](_0x2c3ax40['length'] - 1) == 's') {
      _0x2c3ax40 = _0x2c3ax40['substring'](0, _0x2c3ax40['length'] - 1);
    };
    if (_0x2c3ax40['length'] > 3) {
      var _0x2c3ax21 = $['grep'](_0x2c3ax3f, function(_0x2c3axc) {
        return _0x2c3axc['word'] == _0x2c3ax40;
      });
      if (_0x2c3ax21['length'] > 0) {
        _0x2c3ax21[0]['count']++;
      } else {
        _0x2c3ax3f['push'](new wordObj(_0x2c3ax40, 1));
      };
    };
  };
  _0x2c3ax3f['sort'](compare);
  var _0x2c3ax41 = _0x2c3ax3f['slice'](0, 10);
  $('#wordFreq')['empty']();
  $('#wordFreq')['html']('<strong>Most common words:</strong><br/>');
  for (_0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax41['length']; _0x2c3ax24++) {
    $('#wordFreq')['append'](_0x2c3ax41[_0x2c3ax24]['word'] + ' (' + _0x2c3ax41[_0x2c3ax24]['count'] + '")<br>');
  };
};

function wordObj(_0x2c3ax43, _0x2c3ax44) {
  this['word'] = _0x2c3ax43;
  this['count'] = _0x2c3ax44;
};

function compare(_0x2c3ax46, _0x2c3ax47) {
  if (_0x2c3ax46['count'] < _0x2c3ax47['count']) {
    return 1;
  };
  if (_0x2c3ax46['count'] > _0x2c3ax47['count']) {
    return -1;
  };
  return 0;
};

function sentenceUI(_0x2c3ax34) {
  var _0x2c3ax49 = $('span.alert-error')['length'];
  var _0x2c3ax4a = $('span.alert')['length'] - _0x2c3ax49;
  $('#sentenceYellow')['text'](_0x2c3ax4a);
  $('#sentenceRed')['text'](_0x2c3ax49);
  $('span.sentenceCount')['text'](_0x2c3ax34);
};

function hideYellowSentences() {
  var _0x2c3ax4c = $('span.alert')['not']('span.alert-error');
  if (_0x2c3ax4c === null) {
    _0x2c3ax4c = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax4c['length']; _0x2c3ax24++) {
    $(_0x2c3ax4c[_0x2c3ax24])['addClass']('hideHighlight');
  };
};

function showYellowSentences() {
  var _0x2c3ax4c = $('span.alert')['not']('span.alert-error');
  if (_0x2c3ax4c === null) {
    _0x2c3ax4c = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax4c['length']; _0x2c3ax24++) {
    if ($(_0x2c3ax4c[_0x2c3ax24])['hasClass']('hideHighlight')) {
      $(_0x2c3ax4c[_0x2c3ax24])['removeClass']('hideHighlight');
    };
  };
};

function hideRedSentences() {
  var _0x2c3ax4f = $('span.alert-error');
  if (_0x2c3ax4f === null) {
    _0x2c3ax4f = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax4f['length']; _0x2c3ax24++) {
    $(_0x2c3ax4f[_0x2c3ax24])['addClass']('hideHighlight');
  };
};

function showRedSentences() {
  var _0x2c3ax4f = $('span.alert-error');
  if (_0x2c3ax4f === null) {
    _0x2c3ax4f = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax4f['length']; _0x2c3ax24++) {
    if ($(_0x2c3ax4f[_0x2c3ax24])['hasClass']('hideHighlight')) {
      $(_0x2c3ax4f[_0x2c3ax24])['removeClass']('hideHighlight');
    };
  };
};

function adverbUI(_0x2c3ax29) {
  var _0x2c3ax52 = $('em')['length'];
  var _0x2c3ax53 = _0x2c3ax29;
  if (_0x2c3ax52 === null) {
    _0x2c3ax52 = 0;
  };
  $('#adverbCount')['text'](_0x2c3ax52);
  if (_0x2c3ax53 === null) {
    _0x2c3ax53 = 0;
  };
  var _0x2c3ax54 = Math['round'](_0x2c3ax53 / 3);
  $('#adverbTarget')['text'](_0x2c3ax54);
};

function hideAdverbs() {
  var _0x2c3ax56 = $('em');
  if (_0x2c3ax56 === null) {
    _0x2c3ax56 = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax56['length']; _0x2c3ax24++) {
    $(_0x2c3ax56[_0x2c3ax24])['addClass']('hideHighlight');
  };
};

function showAdverbs() {
  var _0x2c3ax56 = $('em');
  if (_0x2c3ax56 === null) {
    _0x2c3ax56 = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax56['length']; _0x2c3ax24++) {
    if ($(_0x2c3ax56[_0x2c3ax24])['hasClass']('hideHighlight')) {
      $(_0x2c3ax56[_0x2c3ax24])['removeClass']('hideHighlight');
    };
  };
};

function hideStuffy() {
  var _0x2c3ax59 = $('b');
  if (_0x2c3ax59 === null) {
    _0x2c3ax59 = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax59['length']; _0x2c3ax24++) {
    $(_0x2c3ax59[_0x2c3ax24])['addClass']('hideHighlight');
  };
};

function showStuffy() {
  var _0x2c3ax59 = $('b');
  if (_0x2c3ax59 === null) {
    _0x2c3ax59 = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax59['length']; _0x2c3ax24++) {
    if ($(_0x2c3ax59[_0x2c3ax24])['hasClass']('hideHighlight')) {
      $(_0x2c3ax59[_0x2c3ax24])['removeClass']('hideHighlight');
    };
  };
};

function hidePassive() {
  var _0x2c3ax5c = $('q');
  if (_0x2c3ax5c === null) {
    _0x2c3ax5c = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax5c['length']; _0x2c3ax24++) {
    $(_0x2c3ax5c[_0x2c3ax24])['addClass']('hideHighlight');
  };
};

function showPassive() {
  var _0x2c3ax5c = $('q');
  if (_0x2c3ax5c === null) {
    _0x2c3ax5c = 0;
  };
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax5c['length']; _0x2c3ax24++) {
    if ($(_0x2c3ax5c[_0x2c3ax24])['hasClass']('hideHighlight')) {
      $(_0x2c3ax5c[_0x2c3ax24])['removeClass']('hideHighlight');
    };
  };
};

function readabilityUI(_0x2c3ax2b, _0x2c3ax28) {
  if (_0x2c3ax28 > 1) {
    $('#readability-score')['html']('Grade ' + _0x2c3ax2b);
    setReadColor(_0x2c3ax2b);
  } else {
    $('#readability-score')['html']('Not enough text');
    hideReadWord();
  };
  positionArrow(_0x2c3ax2b);
};

function hideReadWord() {
  $('#readability-word')['hide']();
};

function setReadColor(_0x2c3ax2b) {
  $('#readability-word')['show']();
  if (_0x2c3ax2b > 16) {
    $('#readability-score')['css']('color', '#951e26');
    $('#readability-word-score')['text']('Bad');
    $('#readability-arrow')['css']('border-color', 'transparent transparent #951e26 transparent');
  } else {
    if (_0x2c3ax2b > 10) {
      $('#readability-score')['css']('color', '#cecc22');
      $('#readability-word-score')['text']('OK');
      $('#readability-arrow')['css']('border-color', 'transparent transparent #cecc22 transparent');
    } else {
      $('#readability-score')['css']('color', '#178c3a');
      $('#readability-word-score')['text']('Good');
      $('#readability-arrow')['css']('border-color', 'transparent transparent #178c3a transparent');
    };
  };
};

function positionArrow(_0x2c3ax2b) {
  var _0x2c3ax62 = (_0x2c3ax2b - 4) * 5;
  if (_0x2c3ax62 < 0) {
    _0x2c3ax62 = 0;
  };
  if (_0x2c3ax62 > 100) {
    _0x2c3ax62 = 100;
  };
  var _0x2c3ax63 = (_0x2c3ax62 / 100) * 76;
  var _0x2c3ax64 = _0x2c3ax63 + '%';
  $('#readability-arrow')['css']('left', _0x2c3ax64);
};

function statsUI(_0x2c3ax1a) {
  var _0x2c3ax27 = _0x2c3ax1a[0];
  var _0x2c3ax26 = _0x2c3ax1a[1];
  var _0x2c3ax28 = _0x2c3ax1a[2];
  var _0x2c3ax2a = _0x2c3ax1a[3];
  $('#stats')['html']('<strong>Paragraphs: </strong>' + _0x2c3ax2a + '<br><strong>Sentences: </strong>' + _0x2c3ax28 + '<br><strong>Words: </strong>' + _0x2c3ax26 + '<br><strong>Characters: </strong>' + _0x2c3ax27);
};

function showYellowToggle() {
  $('#yellowSentenceToggle')['fadeIn'](100);
};

function hideYellowToggle() {
  $('#yellowSentenceToggle')['fadeOut'](100);
};

function showRedToggle() {
  $('#redSentenceToggle')['fadeIn'](100);
};

function hideRedToggle() {
  $('#redSentenceToggle')['fadeOut'](100);
};

function showAdverbToggle() {
  $('#adverbToggle')['fadeIn'](100);
};

function hideAdverbToggle() {
  $('#adverbToggle')['fadeOut'](100);
};

function showStuffyToggle() {
  $('#stuffyToggle')['fadeIn'](100);
};

function hideStuffyToggle() {
  $('#stuffyToggle')['fadeOut'](100);
};

function showPassiveToggle() {
  $('#passiveToggle')['fadeIn'](100);
};

function hidePassiveToggle() {
  $('#passiveToggle')['fadeOut'](100);
};

function stuffyUI() {
  var _0x2c3ax71 = $('#editor-highlighter b')['length'];
  $('#stuffyCount')['html'](_0x2c3ax71);
};

function passiveUI(_0x2c3ax28) {
  var _0x2c3ax73 = $('#editor-highlighter q')['length'];
  if (_0x2c3ax73 === null) {
    _0x2c3ax73 = 0;
  };
  $('#passiveCount')['html'](_0x2c3ax73);
  var _0x2c3ax74 = 0;
  if (_0x2c3ax73 != 0 && _0x2c3ax28 != 0) {
    _0x2c3ax74 = Math['round'](_0x2c3ax28 / 5);
  };
  $('#passiveGoal')['html'](_0x2c3ax74);
};

function checkHover(_0x2c3ax76) {
  var _0x2c3ax30 = _0x2c3ax76['pageX'];
  var _0x2c3ax77 = _0x2c3ax76['pageY'];
  var _0x2c3ax78 = $('#editor-highlighter b');
  var _0x2c3ax79 = $('#editor-highlighter q');
  checkLongHover(_0x2c3ax78, _0x2c3ax30, _0x2c3ax77);
  checkPassiveHover(_0x2c3ax79, _0x2c3ax30, _0x2c3ax77);
};

function checkLongHover(_0x2c3ax78, _0x2c3ax30, _0x2c3ax77) {
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax78['length']; _0x2c3ax24++) {
    var _0x2c3ax7b = $(_0x2c3ax78[_0x2c3ax24])['offset']();
    var _0x2c3ax7c = _0x2c3ax7b['left'];
    var _0x2c3ax7d = _0x2c3ax7b['top'];
    var _0x2c3ax7e = $(_0x2c3ax78[_0x2c3ax24])['outerWidth']();
    var _0x2c3ax7f = $(_0x2c3ax78[_0x2c3ax24])['outerHeight']();
    var _0x2c3ax80 = _0x2c3ax7c + _0x2c3ax7e;
    var _0x2c3ax81 = _0x2c3ax7d + _0x2c3ax7f;
    if (_0x2c3ax77 > _0x2c3ax7d && _0x2c3ax77 < _0x2c3ax81 && _0x2c3ax30 > _0x2c3ax7c && _0x2c3ax30 < _0x2c3ax80) {
      showSimple(_0x2c3ax78[_0x2c3ax24]);
      break;
    } else {
      hideTooltip(_0x2c3ax78[_0x2c3ax24]);
      if (_0x2c3ax24 == _0x2c3ax78['length'] - 1) {
        purpleTooltipActive = false;
      };
    };
  };
};

function checkPassiveHover(_0x2c3ax79, _0x2c3ax30, _0x2c3ax77) {
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < _0x2c3ax79['length']; _0x2c3ax24++) {
    var _0x2c3ax7b = $(_0x2c3ax79[_0x2c3ax24])['offset']();
    var _0x2c3ax7c = _0x2c3ax7b['left'];
    var _0x2c3ax7d = _0x2c3ax7b['top'];
    var _0x2c3ax7e = $(_0x2c3ax79[_0x2c3ax24])['outerWidth']();
    var _0x2c3ax7f = $(_0x2c3ax79[_0x2c3ax24])['outerHeight']();
    var _0x2c3ax80 = _0x2c3ax7c + _0x2c3ax7e;
    var _0x2c3ax81 = _0x2c3ax7d + _0x2c3ax7f;
    if (_0x2c3ax77 > _0x2c3ax7d && _0x2c3ax77 < _0x2c3ax81 && _0x2c3ax30 > _0x2c3ax7c && _0x2c3ax30 < _0x2c3ax80) {
      showPassiveTooltip(_0x2c3ax79[_0x2c3ax24]);
      break;
    } else {
      hideTooltip(_0x2c3ax79[_0x2c3ax24]);
      if (_0x2c3ax24 == _0x2c3ax79['length'] - 1) {
        greenTooltipActive = false;
      };
    };
  };
};

function showPassiveTooltip(_0x2c3ax84) {
  var _0x2c3ax85 = $(_0x2c3ax84)['text']();
  _0x2c3ax85 = _0x2c3ax85['match'](/(\b)(\s)(\w)+(by)?/i)[0]['toLowerCase']();
  _0x2c3ax85 = $['trim'](_0x2c3ax85);
  if (_0x2c3ax85['charAt'](_0x2c3ax85['length'] - 2) == 'e' && _0x2c3ax85['charAt'](_0x2c3ax85['length'] - 1) == 'd') {
    var _0x2c3ax86 = 'Change to Active Voice » Someone [' + _0x2c3ax85 + '] something.';
    showGreenTooltip(_0x2c3ax86, _0x2c3ax84);
  } else {
    for (var _0x2c3ax24 = 0; _0x2c3ax24 < passiveList['length']; _0x2c3ax24++) {
      var _0x2c3ax87 = passiveList[_0x2c3ax24]['orig'];
      if (_0x2c3ax85 == _0x2c3ax87) {
        var _0x2c3ax86 = passiveList[_0x2c3ax24]['replace'];
        var _0x2c3ax88 = 'Change to Active Voice » Someone [' + _0x2c3ax86 + '] something.';
        showGreenTooltip(_0x2c3ax88, _0x2c3ax84);
      };
    };
  };
};

function showSimple(_0x2c3ax84) {
  var _0x2c3ax18 = $(_0x2c3ax84)['text']();
  _0x2c3ax18 = _0x2c3ax18['toLowerCase']();
  for (var _0x2c3ax24 = 0; _0x2c3ax24 < simpleList['length']; _0x2c3ax24++) {
    var _0x2c3ax87 = simpleList[_0x2c3ax24]['orig'];
    _0x2c3ax87 = $['trim'](_0x2c3ax87);
    _0x2c3ax87 = _0x2c3ax87['toLowerCase']();
    if (_0x2c3ax87 == _0x2c3ax18) {
      var _0x2c3ax86 = simpleList[_0x2c3ax24]['replace'];
      _0x2c3ax86 = $['trim'](_0x2c3ax86);
      var _0x2c3ax88 = 'offset' + _0x2c3ax86;
      showPurpleTooltip(_0x2c3ax88, _0x2c3ax84);
    };
  };
};

function showPurpleTooltip(_0x2c3ax8b, _0x2c3ax84) {
  if (purpleTooltipActive == false) {
    $(_0x2c3ax84)['attr']('title', _0x2c3ax8b);
    $(_0x2c3ax84)['tooltip']('show');
    purpleTooltipActive = true;
  };
};

function showGreenTooltip(_0x2c3ax8b, _0x2c3ax84) {
  if (greenTooltipActive == false) {
    $(_0x2c3ax84)['attr']('title', _0x2c3ax8b);
    $(_0x2c3ax84)['tooltip']('show');
    greenTooltipActive = true;
  };
};

function hideTooltip(_0x2c3ax84) {
  $(_0x2c3ax84)['tooltip']('destroy');
};
