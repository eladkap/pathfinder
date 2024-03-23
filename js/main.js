var app = new Application();

/* Mouse Events */
// document.onmousedown = function(e) {
//   app.onMouseClicked(e);
// }
app.canvas.onmousedown = function(e) {
  app.onMouseClicked(e);
}

// document.drag = function(e) {
//   app.onMouseDragged(e);
// }

function setup() {
  app.setup();
}

function update() {
  app.update();
}

setup();
update();
