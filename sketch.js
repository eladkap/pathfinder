var btnSearch;
var speedSlider;
var algoTypeSelector;

var fps;

var grid;


function setup() {
  //createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  createCanvas(windowWidth, windowHeight);
  fps = 30;
  frameRate(fps);
  setButtons();
  setSliders();
  setSelectors();
  setGrid();
}

function draw() {
  background(WHITE);
  grid.draw();
}

function setGrid(){
  grid = new Grid(GRID_POS_X, GRID_POS_Y, GRID_ROWS, GRID_COLS);
}

function setButton(value, action, foreColor, backColor, pos, fontSize, borderRadius){
  let btn = createButton(value);
  btn.position(pos[0], pos[1]);
  btn.mousePressed(action);
  btn.style('background-color', backColor);
  btn.style('color', foreColor);
  btn.style('text-align', 'center');
  btn.style('font-size', fontSize);
  btn.style('border-radius', borderRadius);
  return btn;
}

function setButtons(){
  btnSort = setButton('Search', search, color(YELLOW), color(BLUE), [width / 2 + 200, HEADER_HEIGHT / 3], FONT_SIZE3, '5%');
}

function setSlider(pos, minValue, maxValue, value, step, inputAction){
	let slider = createSlider(minValue, maxValue,value, step);
	slider.position(pos.x, pos.y);
	slider.input(inputAction);
	return slider;
}

function setSliders(){
  speedSlider = setSlider(createVector(SCREEN_WIDTH * 0.2, HEADER_HEIGHT / 2), MIN_FPS, MAX_FPS, 10, 25, setSpeed);
}

function setSelector(pos, options, changeAction){
	let sel = createSelect();
	sel.position(pos.x, pos.y);
	for (let option of options){
		sel.option(option);
	}
	sel.changed(changeAction);
	return sel;
}

function setSelectors(){
	algoTypeSelector = setSelector(createVector(SCREEN_WIDTH * 0.4, HEADER_HEIGHT / 2), SEARCH_TYPES, setAlgo);
}

function setSpeed(){
  fps = speedSlider.value();
  frameRate(fps);
}

function search(){

}

function setAlgo(){

}

/* Mouse Events */

//function mouseMoved(){}
  
//function mousePressed(){}
