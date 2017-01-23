var position = function (x, y, angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
};
var rect = function (width, height) {
    this.width = width;
    this.height = height;
  }
  /*
   * @brief convert unit to unit
   * @param val converted value
   * @param from base unit
   * @param to target unit
   */
function convert_unit(val, from, to) {
  var dpi = window.sessionStorage.getItem("dpi");
  var k = 1.0;
  switch (from) {
  case "pt":
    switch (to) {
    case "mm":
      k = 72 / 25.4; // 1pt = 1/72in = 25.4/72mm
      break;
    case "cm":
      k = 72 / 2.54; //1cm = 10mm
      break;
    case "in":
      k = 72; //1pt = 1/72in
      break;
    case "pt":
      k = 1;
      break;
    case "px":
      k = dpi / 72; // 1px = 1/72dpi
      break;
    }
    break;
  case "mm":
    switch (to) {
    case "cm":
      k = 0.1; //1cm = 10mm
      break;
    case "in":
      k = 1 / 25.4; //1in = 25.4mm
      break;
    case "pt":
      k = 72 / 25.4; // 1pt = 1/72in = 25.4/72mm
      break;
    case "px":
      k = dpi / 25.4; // 1px = 1/72dpi = 25.4/72mm
      break;
    }
    break;
  default:
    break;
  }
  return val * k;
}

function fillsize() {
  var dpi = window.sessionStorage.getItem("dpi");
  var elm_u = document.getElementById("unit");
  document.getElementById("slaveUnit0").innerHTML = elm_u.value; // Margin unit of the paper
  var paper_size = document.getElementById("paper_size");
  var elm_w = document.getElementById("paper_width");
  var elm_h = document.getElementById("paper_height");
  var margin_x = document.getElementById("margin_x");
  var margin_y = document.getElementById("margin_y");
  //  console.log("paper_size: " + paper_size.value);
  switch (paper_size.value) {
  case "A4":
    elm_w.value = convert_unit(210, "mm", elm_u.value).toFixed(2); // mm
    elm_h.value = convert_unit(297, "mm", elm_u.value).toFixed(2); // mm
    elm_w.disabled = true;
    elm_h.disabled = true;
    margin_x.value = convert_unit(14.0, "mm", elm_u.value).toFixed(2); // mm
    margin_y.value = convert_unit(11.0, "mm", elm_u.value).toFixed(2); // mm
    break;
  case "B5":
    elm_w.value = convert_unit(176, "mm", elm_u.value).toFixed(2); // mm
    elm_h.value = convert_unit(250, "mm", elm_u.value).toFixed(2); // mm
    elm_w.disabled = true;
    elm_h.disabled = true;
    margin_x.value = convert_unit(10.0, "mm", elm_u.value).toFixed(2); // mm
    margin_y.value = convert_unit(9.0, "mm", elm_u.value).toFixed(2); // mm
    break;
  case "Letter":
    elm_w.value = convert_unit(215.9, "mm", elm_u.value).toFixed(2); // mm
    elm_h.value = convert_unit(279.4, "mm", elm_u.value).toFixed(2); // mm
    elm_w.disabled = true;
    elm_h.disabled = true;
    margin_x.value = convert_unit(14.0, "mm", elm_u.value).toFixed(2); // mm
    margin_y.value = convert_unit(11.0, "mm", elm_u.value).toFixed(2); // mm
    break;
  default:
    elm_w.disabled = false;
    elm_h.disabled = false;
    elm_w.value = elm_w.value.toFixed(2);
    elm_h.value = elm_h.value.toFixed(2);
    break;
  }
  // swap width for height according to attribute of paper: landscape and portrait
  var isSwap = (document.getElementById("landscape").checked && 1.0 * elm_w.value < 1.0 * elm_h.value) || (document.getElementById("portrait").checked && 1.0 * elm_w.value > 1.0 * elm_h.value);
  if (isSwap) {
    //    console.log("w: " + elm_w.value + ", H: " + elm_h.value + ", isLandscape: " + document.getElementById("landscape").checked);
    var tmp = elm_w.value;
    elm_w.value = elm_h.value;
    elm_h.value = tmp;
    tmp = margin_x.value;
    margin_x.value = margin_y.value;
    margin_y.value = tmp;
  }
  //  console.log("margin:" + margin_x.value + ", " + margin_y.value);
  var card_size = document.getElementById("card_size");
  var elm_cw = document.getElementById("card_width");
  var elm_ch = document.getElementById("card_height");
  var rows = document.getElementById("card_rows");
  var cols = document.getElementById("card_cols");
  var elm_cmx = document.getElementById("cardMarginX");
  var elm_cmy = document.getElementById("cardMarginY");
  // card size format
  switch (card_size.value) {
  case "tokyo4":
    elm_cw.value = convert_unit(91, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(55, "mm", elm_u.value).toFixed(2);
    rows.value = 5;
    cols.value = 2;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    break;
  case "smart":
    elm_cw.value = convert_unit(89, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(51, "mm", elm_u.value).toFixed(2);
    rows.value = 5;
    cols.value = 2;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    break;
  case "full":
    elm_cw.value = elm_w.value - 2 * margin_x.value;
    elm_ch.value = elm_h.value - 2 * margin_y.value;
    rows.value = 1;
    cols.value = 1;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    break;
  case "sqrt":
    elm_cw.value = convert_unit(60, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(60, "mm", elm_u.value).toFixed(2);
    rows.value = 4;
    cols.value = 3;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    elm_ch.disabled = false;
    elm_cw.disabled = false;
    break;
  case "KPC-HH110-20":
    elm_cw.value = convert_unit(86.4, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(50.8, "mm", elm_u.value).toFixed(2);
    rows.value = 5;
    cols.value = 2;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    margin_x.value = convert_unit(18.6, "mm", elm_u.value).toFixed(2);
    margin_y.value = convert_unit(21.5, "mm", elm_u.value).toFixed(2);
    break;
  case "KPC-HH112-20":
    elm_cw.value = convert_unit(84, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(42, "mm", elm_u.value).toFixed(2);
    rows.value = 6;
    cols.value = 2;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = convert_unit(4, "mm", elm_u.value).toFixed(2);
    elm_cmy.value = 0;
    margin_x.value = convert_unit(19.0, "mm", elm_u.value).toFixed(2);
    margin_y.value = convert_unit(22.5, "mm", elm_u.value).toFixed(2);
    break;
  case "KPC-HH124-20":
    elm_cw.value = convert_unit(66, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(35, "mm", elm_u.value).toFixed(2);
    rows.value = 8;
    cols.value = 3;
    elm_ch.disabled = true;
    elm_cw.disabled = true;
    elm_cmx.value = 0;
    elm_cmy.value = 0;
    margin_x.value = convert_unit(6.0, "mm", elm_u.value).toFixed(2);
    margin_y.value = convert_unit(8.5, "mm", elm_u.value).toFixed(2);
    break;
  default:
    //
    elm_cw.value = convert_unit(elm_cw.value, "mm", elm_u.value).toFixed(2);
    elm_ch.value = convert_unit(elm_ch.value, "mm", elm_u.value).toFixed(2);
    elm_ch.disabled = false;
    elm_cw.disabled = false;
    break;
  }
  document.getElementById("slaveUnit1").innerHTML = elm_u.value; // Card size
  document.getElementById("slaveUnit2").innerHTML = elm_u.value; // Card margin
  var card_id = document.getElementById("card_id");
  if (document.getElementById("multiple").checked) {
    card_id.style.display = "inline";
  }
  else {
    card_id.style.display = "none";
    card_id.value = 0;
    //    setId();
  }
  var id = card_id.value;
  if (Math.round(id) !== id) {
    card_id.value = Math.round(id);
  }
  //  console.log("rows*cols: " + rows.value * cols.value);//  console.log("elm_u.disabled: " + elm_u.disabled);
}

function load_card_id() {
  var card_id = document.getElementById("card_id");
  var id = card_id.value;
  var dat_card = JSON.parse(window.sessionStorage.getItem("card" + id));
  if (dat_card === null) {
    document.getElementById("cap").value = "";
    document.getElementById("subcap").value = "";
    document.getElementById("icon_str").value = "";
    document.getElementById("card_layout").value = "center";
    // document.getElementById("iconFont").value = "FontAwesome" ;
    // document.getElementById("iconFont").style.fontFamily = "FontAwesome" ;
    // nothing
  }
  else {
    document.getElementById("cap").value = dat_card.cap;
    document.getElementById("subcap").value = dat_card.subcap;
    document.getElementById("icon_str").value = dat_card.icon_str;
    document.getElementById("iconFont").value = dat_card.icon_family;
    document.getElementById("icon_str").style.fontFamily = dat_card.icon_family;
    document.getElementById("card_layout").value = dat_card.layout;
    // console.log("current icon family: "+ document.getElementById("iconFont").style.fontFamily);
  }
  switch (dat_card.icon_family) {
  case "FontAwesome":
    document.getElementById("icon_str").placeholder = " icon";
    break;
  case "FontBotamochi":
    document.getElementById("icon_str").placeholder = " icon";
    break;
  }
}
/**
 * @brief card object constructor
 */
var card = function (id) {
  // console.log("create card" + id);
  this.id = id;
  this.layout = "center";
  this.cap = "caption";
  this.subcap = "subcaption";
  this.icon_str = "&#xf2b4;";
  this.icon_family = "FontAwesome";
};
/**
 * @brief Card/label Class for svg elements
 */
var card_group = function () {
  // calculate position from id
  // i:row, j:col
  // id = i * cols + j
  var unit = document.getElementById("unit").value;
  var rows = Number(document.getElementById("card_rows").value);
  var cols = Number(document.getElementById("card_cols").value);
  this.rect = new rect(convert_unit(document.getElementById("card_width").value, unit, "pt"), convert_unit(document.getElementById("card_height").value, unit, "pt"));
  var margin = new position(convert_unit(document.getElementById("margin_x").value, unit, "pt"), convert_unit(document.getElementById("margin_y").value, unit, "pt"), 0);
  var card_margin = new position(convert_unit(document.getElementById("cardMarginX").value, unit, "pt"), convert_unit(document.getElementById("cardMarginY").value, unit, "pt"), 0);
  this.paper = new rect(convert_unit(document.getElementById("paper_width").value, unit, "pt"), convert_unit(document.getElementById("paper_height").value, unit, "pt"));
  // var offset = new position(0.5 * paper_width - margin.x - 0.5 * this.rect.width * cols - 0.5 * card_margin.x * (cols - 1), 0.5 * paper_height - margin.y - 0.5 * this.rect.height * rows - 0.5 * card_margin.y * (rows - 1), 0)
  switch (arguments.length) {
  case 1:
    this.id = arguments[0];
    var row = Math.floor(this.id / cols);
    var col = this.id % cols;
    // console.log("id: " + this.id + ", rows: " + rows + ", cols: " + cols);
    // console.log(toString.call(rows));
    // console.log("row: " + row + ", col: " + col);
    this.pos = new position(margin.x + col * this.rect.width + col * card_margin.x, margin.y + row * this.rect.height + row * card_margin.y, 0);
    break;
  case 3:
    this.id = arguments[0];
    this.pos = new position(arguments[1], arguments[2], 0);
    break;
  default:
    break;
  }
  this.ref_rect = new rect(0, 0);
  this.ref_pos = new rect(0, 0, 0);
  this.stnd = 1;
  this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  this.cap = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  this.subcap = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  this.icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  // this.id_group = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  this.outline;
  if (!document.getElementById("multiple").checked) {
    this.id = 0;
  }
  var dat_card = JSON.parse(window.sessionStorage.getItem("card" + this.id));
  if (dat_card === null) {
    this.cap.innerHTML = "null";
    this.subcap.innerHTML = "";
    this.icon.innerHTML = "";
    this.layout = "center";
  }
  else {
    this.cap.innerHTML = dat_card.cap;
    this.subcap.innerHTML = dat_card.subcap;
    this.icon.innerHTML = dat_card.icon_str;
    this.icon_family = dat_card.icon_family;
    this.layout = dat_card.layout;
    // console.log("dat_card.icon_family: " + dat_card.icon_family);
  }
  // console.log("finish creating card group");
};
card_group.prototype.setOutline = function () {
  // console.log("execute setOutline");
  var outlineType = document.getElementById("card_outline").value;
  //  Outline
  // console.log("outlineType: " + outlineType);
  switch (outlineType) {
  case "ellipse":
    // Ellipse outline
    this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    this.outline.setAttributeNS(null, 'cx', this.pos.x + 0.5 * this.rect.width);
    this.outline.setAttributeNS(null, 'cy', this.pos.y + 0.5 * this.rect.height);
    this.outline.setAttributeNS(null, 'rx', 0.5 * this.rect.width);
    this.outline.setAttributeNS(null, 'ry', 0.5 * this.rect.height);
    this.ref_rect.width = 0.9 * this.rect.width;
    this.ref_rect.height = 0.9 * this.rect.height;
    this.ref_pos.x = this.pos.x + 0.5 * (this.rect.width - this.ref_rect.width);
    this.ref_pos.y = this.pos.y + 0.5 * (this.rect.height - this.ref_rect.height);
    if (this.ref_rect.width > this.ref_rect.height) {
      this.stnd = this.ref_rect.height;
    }
    else {
      this.stnd = this.ref_rect.width;
    }
    break;
  case "diamond":
    this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var d = "M " + (this.pos.x) + " " + (this.pos.y + 0.5 * this.rect.height);
    d += " L " + (this.pos.x + 0.5 * this.rect.width) + " " + (this.pos.y + this.rect.height);
    d += " L " + (this.pos.x + this.rect.width) + " " + (this.pos.y + 0.5 * this.rect.height);
    d += " L " + (this.pos.x + 0.5 * this.rect.width) + " " + (this.pos.y) + " z";
    this.outline.setAttributeNS(null, 'd', d);
    this.ref_rect.width = 0.707 * this.rect.width;
    this.ref_rect.height = 0.707 * this.rect.height;
    this.ref_pos.x = this.pos.x + 0.5 * (this.rect.width - this.ref_rect.width);
    this.ref_pos.y = this.pos.y + 0.5 * (this.rect.height - this.ref_rect.height);
    if (this.ref_rect.width > this.ref_rect.height) {
      this.stnd = this.ref_rect.height;
    }
    else {
      this.stnd = this.ref_rect.width;
    }
    break;
  case "capsule":
    this.ref_rect.width = this.rect.width;
    this.ref_rect.height = this.rect.height;
    this.ref_pos.x = this.pos.x;
    this.ref_pos.y = this.pos.y;
    if (this.ref_rect.width > this.ref_rect.height) {
      this.stnd = this.ref_rect.height;
    }
    else {
      this.stnd = this.ref_rect.width;
    }
    this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.outline.setAttributeNS(null, 'x', this.pos.x);
    this.outline.setAttributeNS(null, 'y', this.pos.y);
    this.outline.setAttributeNS(null, 'width', this.rect.width);
    this.outline.setAttributeNS(null, 'height', this.rect.height);
    this.outline.setAttributeNS(null, 'rx', 0.5 * this.stnd);
    this.outline.setAttributeNS(null, 'ry', 0.5 * this.stnd);
    break;
  case "hexagon":
    const PI = 3.14195;
    this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var d = "M " + (this.pos.x + 0.5 * this.rect.width) + " " + (this.pos.y);
    for (var i = 1; i < 6; i++) {
      d += " L " + (this.pos.x + 0.5 * this.rect.width - 0.5 * this.rect.width * Math.sin(PI * i / 3)) + " " + (this.pos.y + 0.5 * this.rect.height - 0.5 * this.rect.height * Math.cos(PI * i / 3));
    }
    d += " z";
    // console.log(d);
    // console.log(Math.sin(PI * 0.5));
    this.outline.setAttributeNS(null, 'd', d);
    this.ref_rect.width = 0.9 * this.rect.width;
    this.ref_rect.height = 0.9 * this.rect.height;
    this.ref_pos.x = this.pos.x + 0.5 * (this.rect.width - this.ref_rect.width);
    this.ref_pos.y = this.pos.y + 0.5 * (this.rect.height - this.ref_rect.height);
    if (this.ref_rect.width > this.ref_rect.height) {
      this.stnd = this.ref_rect.height;
    }
    else {
      this.stnd = this.ref_rect.width;
    }
    break;
  default:
    this.ref_rect = this.rect;
    this.ref_pos = this.pos;
    if (this.ref_rect.width > this.ref_rect.height) {
      this.stnd = this.ref_rect.height;
    }
    else {
      this.stnd = this.ref_rect.width;
    }
    this.outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.outline.setAttributeNS(null, 'x', this.pos.x);
    this.outline.setAttributeNS(null, 'y', this.pos.y);
    this.outline.setAttributeNS(null, 'width', this.rect.width);
    this.outline.setAttributeNS(null, 'height', this.rect.height);
    break;
  }
  this.outline.setAttributeNS(null, 'stroke', 'blue');
  this.outline.setAttributeNS(null, 'stroke-width', this.stnd / 500);
  this.outline.setAttributeNS(null, 'fill', 'none');
  this.outline.setAttributeNS(null, 'stroke-dasharray', this.rect.width / 100 + "," + this.rect.height / 50);
  // console.log("outline: " + this.outline);
  this.group.appendChild(this.outline);
  if (document.getElementById("ref_on_card").checked && outlineType != "rect") {
    var ref_box = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ref_box.setAttributeNS(null, 'x', this.ref_pos.x); // 1/sqrt(2) = 1/1.41 = 0.707
    ref_box.setAttributeNS(null, 'y', this.ref_pos.y);
    ref_box.setAttributeNS(null, 'width', this.ref_rect.width);
    ref_box.setAttributeNS(null, 'height', this.ref_rect.height);
    ref_box.setAttributeNS(null, 'stroke', 'red');
    ref_box.setAttributeNS(null, 'stroke-width', this.stnd / 500);
    ref_box.setAttributeNS(null, 'fill', 'none');
    ref_box.setAttributeNS(null, 'stroke-dasharray', this.rect.width / 100 + "," + this.rect.height / 50);
    this.group.appendChild(ref_box);
  }
};
card_group.prototype.setContents = function () {
    // console.log("execute setContents");
    this.cap.setAttributeNS(null, 'font-weight', "bold");
    this.cap.setAttributeNS(null, 'text-anchor', "middle");
    this.cap.setAttributeNS(null, 'dominant-baseline', "central");
    this.subcap.setAttributeNS(null, 'text-anchor', "middle");
    this.subcap.setAttributeNS(null, 'dominant-baseline', "central");
    this.icon.setAttributeNS(null, 'text-anchor', "middle");
    this.icon.setAttributeNS(null, 'dominant-baseline', "central");
    if (this.icon.innerHTML != "") {
      if (this.cap.innerHTML != "") {
        if (this.subcap.innerHTML != "") {
          // Full contents
          switch (document.getElementById("card_layout").value) {
          case "left":
            if (this.ref_rect.width / this.ref_rect.height > 2) {
              this.icon.setAttributeNS(null, 'font-size', 0.8 * this.stnd);
              this.cap.setAttributeNS(null, 'font-size', 0.4 * this.stnd);
              this.subcap.setAttributeNS(null, 'font-size', 0.2 * this.stnd);
              this.cap.setAttributeNS(null, 'x', this.ref_pos.x + this.stnd + 0.5 * (this.ref_rect.width - this.stnd));
              this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.4 * this.ref_rect.height);
              this.subcap.setAttributeNS(null, 'x', this.ref_pos.x + this.stnd + 0.5 * (this.ref_rect.width - this.stnd));
              this.subcap.setAttributeNS(null, 'y', this.ref_pos.y + 0.7 * this.ref_rect.height);
              this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.stnd);
              this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
            }
            else {
              this.icon.setAttributeNS(null, 'font-size', 0.6 * this.stnd);
              this.cap.setAttributeNS(null, 'font-size', 0.3 * this.stnd);
              this.subcap.setAttributeNS(null, 'font-size', 0.15 * this.stnd);
              this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.75 * this.ref_rect.width);
              this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.4 * this.ref_rect.height);
              this.subcap.setAttributeNS(null, 'x', this.ref_pos.x + 0.75 * this.ref_rect.width);
              this.subcap.setAttributeNS(null, 'y', this.ref_pos.y + 0.7 * this.ref_rect.height);
              this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.25 * this.ref_rect.width);
              this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
            }
            break;
          case "center":
            this.icon.setAttributeNS(null, 'font-size', 0.4 * this.stnd);
            this.cap.setAttributeNS(null, 'font-size', 0.15 * this.stnd);
            this.subcap.setAttributeNS(null, 'font-size', 0.1 * this.stnd);
            this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
            this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.66 * this.ref_rect.height);
            this.subcap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
            this.subcap.setAttributeNS(null, 'y', this.ref_pos.y + 0.83 * this.ref_rect.height);
            this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
            this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.33 * this.ref_rect.height);
            break;
          default:
            break;
          }
        }
        else {
          // Icon & Caption
          switch (this.layout) {
          case "left":
            if (this.ref_rect.width / this.ref_rect.height > 2) {
              this.icon.setAttributeNS(null, 'font-size', 0.8 * this.stnd);
              this.cap.setAttributeNS(null, 'font-size', 0.5 * this.stnd);
              this.cap.setAttributeNS(null, 'x', this.ref_pos.x + this.stnd + 0.5 * (this.ref_rect.width - this.stnd));
              this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
              this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.stnd);
              this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
            }
            else {
              this.icon.setAttributeNS(null, 'font-size', 0.6 * this.stnd);
              this.cap.setAttributeNS(null, 'font-size', 0.3 * this.stnd);
              this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.75 * this.ref_rect.width);
              this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
              this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.25 * this.ref_rect.width);
              this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
            }
            break;
          case "center":
            this.icon.setAttributeNS(null, 'font-size', 0.4 * this.stnd);
            this.cap.setAttributeNS(null, 'font-size', 0.15 * this.stnd);
            this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
            this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.75 * this.ref_rect.height);
            this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
            this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.4 * this.ref_rect.height);
            break;
          default:
            break;
          }
        }
      }
      else {
        // Only icon
        switch (this.layout) {
        case "left":
          this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.25 * this.ref_rect.width);
          this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
          this.icon.setAttributeNS(null, 'font-size', 0.6 * this.stnd);
          break;
        case "center":
          this.icon.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
          this.icon.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
          this.icon.setAttributeNS(null, 'text-anchor', "middle");
          this.icon.setAttributeNS(null, 'dominant-baseline', "central");
          this.icon.setAttributeNS(null, 'font-size', 0.8 * this.stnd);
        default:
          break;
        }
      }
    }
    else if (this.cap.innerHTML != "") {
      if (this.subcap.innerHTML != "") {
        this.cap.setAttributeNS(null, 'font-size', 0.4 * this.stnd);
        this.subcap.setAttributeNS(null, 'font-size', 0.3 * this.stnd);
        switch (this.layout) {
        case "left":
          this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.33 * this.ref_rect.width);
          this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.25 * this.ref_rect.height);
          this.subcap.setAttributeNS(null, 'x', this.ref_pos.x + 0.33 * this.ref_rect.width);
          this.subcap.setAttributeNS(null, 'y', this.ref_pos.y + 0.75 * this.ref_rect.height);
          break;
        case "center":
          this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
          this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.25 * this.ref_rect.height);
          this.subcap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
          this.subcap.setAttributeNS(null, 'y', this.ref_pos.y + 0.75 * this.ref_rect.height);
          break;
        default:
          break;
        }
      }
      // Caption Only
      this.cap.setAttributeNS(null, 'font-size', 0.5 * this.stnd);
      switch (this.layout) {
      case "left":
        this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.33 * this.ref_rect.width);
        this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
        break;
      case "center":
        this.cap.setAttributeNS(null, 'x', this.ref_pos.x + 0.5 * this.ref_rect.width);
        this.cap.setAttributeNS(null, 'y', this.ref_pos.y + 0.5 * this.ref_rect.height);
        break;
      default:
        break;
      }
    }
    this.cap.setAttributeNS(null, 'font-family', "Helvetica,Arial");
    this.cap.setAttributeNS(null, 'fill', '#2B2B2B');
    this.cap.setAttributeNS(null, 'id', 'card' + this.id + "_caption");
    //    console.log( "Value: "+document.getElementById("cap").list)
    this.group.appendChild(this.cap);
    this.subcap.setAttributeNS(null, 'font-family', "Helvetica,Arial");
    this.subcap.setAttributeNS(null, 'fill', '#2B2B2B');
    this.subcap.setAttributeNS(null, 'id', 'card' + this.id + "_subcaption");
    //    console.log( "Value: "+document.getElementById("cap").list)
    this.group.appendChild(this.subcap);
    this.icon.setAttributeNS(null, 'font-family', this.icon_family);
    this.icon.setAttributeNS(null, 'fill', '#2B2B2B');
    this.icon.setAttributeNS(null, 'id', 'card' + this.id + "_icon");
    this.group.appendChild(this.icon);
    if (document.getElementById("ref_on_card").checked) {
      var card_id = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      card_id.setAttributeNS(null, 'text-anchor', "start");
      card_id.setAttributeNS(null, 'dominant-baseline', "text-before-edge");
      card_id.setAttributeNS(null, 'x', this.ref_pos.x + 0.05 * this.stnd);
      card_id.setAttributeNS(null, 'y', this.ref_pos.y + 0.05 * this.stnd);
      card_id.setAttributeNS(null, 'font-size', 0.1 * this.stnd);
      card_id.setAttributeNS(null, 'font-family', "Helvetica");
      card_id.setAttributeNS(null, 'fill', '#C7C7CC');
      card_id.innerHTML = this.id;
      this.group.appendChild(card_id);
    }
    // rendering
    // modify font size of caption and subcaption
    this.test_render();
    var cap_width = document.getElementById(this.cap.id).getComputedTextLength();
    if (cap_width > this.ref_rect.width) {
      // caption is overflowing its reference rect.
      var fontSize = this.cap.getAttributeNS(null, 'font-size') * this.ref_rect.width / cap_width;
      this.cap.setAttributeNS(null, 'font-size', fontSize);
    }
    var subcap_width = document.getElementById(this.subcap.id).getComputedTextLength();
    if (subcap_width > this.ref_rect.width) {
      // caption is overflowing its reference rect.
      var fontSize = this.subcap.getAttributeNS(null, 'font-size') * this.ref_rect.width / subcap_width;
      this.subcap.setAttributeNS(null, 'font-size', fontSize);
    }
    // if (true) {
    //   // http://www.h2.dion.ne.jp/~defghi/svgMemo/svgMemo_15.htm
    //   console.log("this.cap: " + this.cap);
    //   console.log("ComputedTextLength: " + this.cap.getComputedTextLength());
    //   console.log("NumberOfChars: " + this.cap.getNumberOfChars() );
    //   console.log("TextLength: " + this.cap.textLength );
    //   var cap_obj = document.getElementById(this.cap.id);
    //   console.log(cap_obj);
    //   console.log("ComputedTextLength: " + cap_obj.getComputedTextLength());
    //   console.log("font-size: " + this.cap.getAttributeNS(null, 'font-size'));
    // }
    // console.log("finish contents");
  }
  /**
   * @brief Paper Class
   */
  // Set up
card_group.prototype.test_render = function () {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'version', '1.1');
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("width", this.rect.width + "pt");
  svg.setAttribute("height", this.rect.height + "pt");
  var viewBox = "0 0 " + this.rect.width + " " + this.rect.height;
  svg.setAttribute("viewBox", viewBox);
  svg.appendChild(this.group);
  var tagObj = document.getElementById("minicard");
  tagObj.innerHTML = svg.outerHTML;
}

function setup() {
  if (window.sessionStorage) {
    // ------------------------------------------------------------
    // get session strage object
    // ------------------------------------------------------------
    var session_storage = window.sessionStorage;
    // 出力テスト
    console.log("session_storage is available.");
    console.log(session_storage);
  }
  else {
    console.log("session_storage is unavailable.");
    alert("Error, This brewzer cannot use this application.");
  }
  var ua = window.navigator.userAgent;
  // define dpi(dots per inch)
  var dpi = 72;
  if (ua.match(/Win/)) {
    var dpi = 96;
  }
  window.sessionStorage.setItem("dpi", dpi);
}

function disp() {
  var str = window.sessionStorage.getItem("card0");
  //  console.log(JSON.parse(str));
  console.log(str);
  var cap_obj = document.getElementById("card0_caption");
  console.log(cap_obj);
  console.log("ComputedTextLength: " + cap_obj.getComputedTextLength());
}
/* onchange function of card/label contents div. */
function create_card() {
  var card_id = document.getElementById("card_id");
  var id = card_id.value;
  if (Math.round(id) !== id) {
    card_id.value = Math.round(id);
    id = Math.round(id);
  }
  var mycard = new card(id);
  mycard.cap = document.getElementById("cap").value;
  mycard.subcap = document.getElementById("subcap").value;
  mycard.icon_str = document.getElementById("icon_str").value;
  mycard.icon_family = document.getElementById("iconFont").value;
  mycard.layout = document.getElementById("card_layout").value;
  var json_text = JSON.stringify(mycard);
  window.sessionStorage.setItem("card" + mycard.id, json_text);
  // console.log("create card" + id);
}
/**
 * @brief draw svg image of one of the cards on the window.
 */
function minicard() {
  var dpi = window.sessionStorage.getItem("dpi");
  // Show Clock to debug
  var date_obj = new Date();
  console.log("minicord: " + date_obj.toString());
  // Get card size
  var unit = document.getElementById("unit").value;
  var card_width = convert_unit(document.getElementById("card_width").value, unit, "pt");
  var card_height = convert_unit(document.getElementById("card_height").value, unit, "pt");
  //  console.log("card size: " + card_width + "x" + card_height);
  // Generate SVG image
  //http://qiita.com/niiyz/items/f790807cf30e9685a533
  // var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // svg.setAttributeNS(null, 'version', '1.1');
  // svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  // svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  // svg.setAttribute("width", card_width + "pt");
  // svg.setAttribute("height", card_height + "pt");
  // var viewBox = "0 0 " + card_width + " " + card_height;
  // console.log("viewBox: " + viewBox);
  // svg.setAttribute("viewBox", viewBox);
  var paper = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  paper.setAttributeNS(null, 'x', 0);
  paper.setAttributeNS(null, 'y', 0);
  paper.setAttributeNS(null, 'width', card_width);
  paper.setAttributeNS(null, 'height', card_height);
  paper.setAttributeNS(null, 'stroke', '#1F1F21');
  paper.setAttributeNS(null, 'stroke-width', card_width / 500);
  paper.setAttributeNS(null, 'fill', 'none');
  var id = document.getElementById("card_id").value;
  // create card object
  var mycard = new card_group(id, 0, 0);
  mycard.group.appendChild(paper);
  mycard.setOutline();
  mycard.setContents();
  mycard.test_render();
  // svg.appendChild(mycard.group);
  // var tagObj = document.getElementById("minicard");
  // tagObj.innerHTML = svg.outerHTML;
}

function cardMake() {
  var tagObj = document.getElementById("svg");
  tagObj.innerHTML = "";
  var isPrint = false;
  var isDownload = false;
  var isId = false;
  //  Read Flags
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + ": " + arguments[i]);
    if (arguments[i] == "print") isPrint = true;
    if (arguments[i] == "download") isDownload = true;
    if (arguments[i] == "id") isId = true;
  }
  var dpi = window.sessionStorage.getItem("dpi");
  // Show Clock to debug
  var date_obj = new Date();
  console.log("cardMake: " + date_obj.toString());
  // Get paper size
  var unit = document.getElementById("unit").value;
  var paper_width = convert_unit(document.getElementById("paper_width").value, unit, "pt");
  var paper_height = convert_unit(document.getElementById("paper_height").value, unit, "pt");
  var margin = new position(convert_unit(document.getElementById("margin_x").value, "mm", "pt"), convert_unit(document.getElementById("margin_y").value, "mm", "pt"), 0);
  console.log("svg");
  // Generate SVG image
  //http://qiita.com/niiyz/items/f790807cf30e9685a533
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttributeNS(null, 'version', '1.1');
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("width", paper_width + "pt");
  svg.setAttribute("height", paper_height + "pt");
  var viewBox = "0 0 " + paper_width + " " + paper_height;
  svg.setAttribute("viewBox", viewBox);
  var paper = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  paper.setAttributeNS(null, 'x', 0);
  paper.setAttributeNS(null, 'y', 0);
  paper.setAttributeNS(null, 'width', paper_width);
  paper.setAttributeNS(null, 'height', paper_height);
  paper.setAttributeNS(null, 'stroke', '#1F1F21');
  if (isPrint) {
    paper.setAttributeNS(null, 'stroke-width', 0);
  }
  else {
    paper.setAttributeNS(null, 'stroke-width', paper_width / 1000);
  }
  paper.setAttributeNS(null, 'fill', 'none');
  var rows = document.getElementById("card_rows").value;
  var cols = document.getElementById("card_cols").value;
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  console.log("add cards");
  for (var id = 0; id < rows * cols; id++) {
    var mycard = new card_group(id);
    mycard.setOutline();
    mycard.setContents();
    svg.appendChild(mycard.group);
  }
  console.log("start to make credit object");
  console.log("margin: " + margin.x + ", " + margin.y);
  console.log("paper: " + paper_width + ", " + paper_height);
  var credit = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  credit.setAttributeNS(null, 'x', margin.x);
  credit.setAttributeNS(null, 'y', paper_height - 0.7 * margin.y);
  credit.setAttributeNS(null, 'font-size', paper_height / 100);
  //    text.setAttributeNS(null, 'font-family', "Times");
  credit.setAttributeNS(null, 'fill', '#2B2B2B');
  credit.innerHTML = "https://github.com/botamochi6277/botamochi6277.github.io/tree/master/cardMaker, " + date_obj.toString();
  console.log("attach credit and paper to svg group object");
  group.appendChild(credit);
  group.appendChild(paper);
  if (!isPrint) {
    console.log("start to print");
    var draw = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    draw.setAttributeNS(null, 'x', margin.x);
    draw.setAttributeNS(null, 'y', margin.y);
    draw.setAttributeNS(null, 'width', paper_width - 2 * margin.x);
    draw.setAttributeNS(null, 'height', paper_height - 2 * margin.y);
    draw.setAttributeNS(null, 'stroke', '#1F1F21');
    draw.setAttributeNS(null, 'stroke-width', paper_width / 1000);
    draw.setAttributeNS(null, 'stroke-dasharray', paper_width / 100 + "," + paper_width / 100);
    draw.setAttributeNS(null, 'fill', 'none');
    group.appendChild(draw);
  }
  console.log("attach groups to svg object");
  svg.appendChild(group);
  tagObj.innerHTML = svg.outerHTML;
  if (isPrint) {
    //    window.location.href = "svg.html?" + escape(svg.outerHTML);
    document.getElementById("svgPrint").style.display = "block";
    document.getElementById("svgPrint").innerHTML = svg.outerHTML;
    document.getElementById("container").style.display = "none";
    window.print();
    revail();
  }
  if (isDownload) {
    var header = "";
    downloadAsFile("botalab-card-" + date_obj.toISOString() + ".svg", header + svg.outerHTML);
  }
  //    document.write(svg.outerHTML);
  // 文字列として出力
  //    console.log(svg.outerHTML);
}

function revail() {
  // console.log(document.getElementById("container").style.display);
  document.getElementById("container").style.display = "block";
  document.getElementById("svgPrint").innerHTML = "";
  document.getElementById("svgPrint").style.display = "none";
}