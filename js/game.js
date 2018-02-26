var man = new obj(10, 250, 30, 30, "img/man.png"), speedMan = 1.7;
var bug = [], bug2 = [], bug3 = [], speedBug = 1;
var times = score = level = 0;
var nbug = TBug = 200;

var Area = {
  canvas: document.createElement("canvas"),
  key: [],
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

function Start() {
  var c = Area.canvas;
  c.width = 940; c.height = 460;
  Area.context = Area.canvas.getContext("2d");
  var pos = document.getElementById("right");
  pos.insertBefore(c, pos.childNodes[0]);
  Area.interval = setInterval(UpdateGame, 1);
  window.addEventListener('keydown', function (e) { Area.key[e.keyCode] = 1; });
  window.addEventListener('keyup', function (e) { Area.key[e.keyCode] = 0; });
}

function obj(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.SX = this.SY = 0;
  if (this.color == "img/man.png") {
    this.image = new Image();
    this.image.src = color;
  }
  this.update = function () {
    this.x += this.SX;
    this.y += this.SY;
    this.SX = this.SY = 0;
    var t = Area.context;
    if (this.color == "img/man.png") {
      t.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else {
      t.fillStyle = color;
      t.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

function touch(a, b) {
  var l1 = a.x, r1 = a.x + a.width, t1 = a.y, b1 = a.y + a.height;
  var l2 = b.x, r2 = b.x + b.width, t2 = b.y, b2 = b.y + b.height;
  if (r1 < l2 - 1 || l1 > r2 + 1 || t1 > b2 + 1 || b1 < t2 - 1) return false;
  return true;
}

function newBug() {
  var x = Area.canvas.width, Height = Area.canvas.height;
  var rmin = man.height * 3, rmax = man.height * 6;
  var hmin = 40, hmax = 300;
  var hUp = Math.floor(Math.random() * (hmax - hmin) + hmin);
  var rong = Math.floor(Math.random() * (rmax - rmin) + rmin);
  bug.push(new obj(x, -1000, 10, hUp + 1000, "green"));
  bug.push(new obj(x, hUp + rong, 10, 1000, "green"));
}

function newBug2() {
  var lenmin = 100, lenmax = 200;
  var len = Math.floor(Math.random() * (lenmax - lenmin) + lenmin);
  var y = Math.floor(Math.random() * Area.canvas.height - 10);
  bug2.push(new obj(Area.canvas.width, y, len, 10, "chocolate"));
}

function newBug3() {
  var lenmin = 100, lenmax = 200;
  var len = Math.floor(Math.random() * (lenmax - lenmin) + lenmin);
  var y = Math.floor(Math.random() * Area.canvas.height - 10);
  bug3.push(new obj(-len, y, len, 10, "blue"));
}

function UpdateGame() {
  Area.clear();
  //-------------
  if (++nbug > TBug) {
    nbug = 0; newBug();
    if (level > 1) newBug2();
    if (level > 2) newBug3();
  }
  //-------------
  for (i = 0; i < bug.length; i++) {
    if (touch(man, bug[i])) GameOver();
    bug[i].SX -= speedBug;
    if (level > 0) bug[i].SY = Math.random() * 4 - 2;
    bug[i].update();
  }
  for (k = 0; k < bug.length && bug[k].x <= 0; bug.shift());
  //-------------
  for (i = 0; i < bug2.length; i++) {
    if (touch(man, bug2[i])) GameOver();
    bug2[i].SX = -speedBug * 1.1;
    bug2[i].update();
  }
  for (k = 0; k < bug2.length && bug2[k].x + bug2[k].width <= 0; bug2.shift());
  //------------
  for (i = 0; i < bug3.length; i++) {
    if (touch(man, bug3[i])) GameOver();
    bug3[i].SX = speedBug * 0.9;
    bug3[i].update();
  }
  for (k = 0; k < bug3.length && bug3[k].x >= Area.canvas.width; bug3.shift());
  //------------
  if (Area.key[37] && man.x > 0) man.SX = -speedMan;
  if (Area.key[38] && man.y > 0) man.SY = -speedMan;
  if (Area.key[39] && man.x + man.width < Area.canvas.width) man.SX = speedMan;
  if (Area.key[40] && man.y + man.height < Area.canvas.height) man.SY = speedMan;
  man.update();
  //------
  ++times;
  score = Math.floor(times / 15);
  var nlevel = Math.floor(score / 100);
  document.getElementById("score").innerHTML = "SCORE : &nbsp;" + score;
  document.getElementById("level").innerHTML = "LEVEL : &nbsp;" + nlevel;
  //-----
  if (nlevel > level) {
    level = nlevel;
    speedBug += 0.25;
    speedMan += 0.25;
    TBug -= 25;
    if (TBug < 0) TBug = 1;
  }
}
