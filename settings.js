/* SCREEN */
const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 900;

const FPS = 30;
const DELAY_IN_MILLISEC = 1;
const MIN_SPEED = 1;
const MAX_SPEED = 10;

/* COLORS */
const BLACK = [0, 0, 0];
const GRAY1 = [50, 50, 50];
const GRAY2 = [100, 100, 100];
const GRAY3 = [200, 200, 200];
const BLACKLIGHT = [100, 100, 100];
const WHITE = [255, 255, 255];
const RED = [200, 0, 0];
const REDLIGHT = [200, 100, 100];
const YELLOW = [255, 190, 0];
const GREEN = [0, 100, 0];
const GREENLIGHT = [50, 200, 50];
const PINK = [255, 120, 255];
const PURPLE = [255, 0, 255];
const BLUE = [50, 50, 255];
const BLUELIGHT = [100, 100, 255];
const AQUA = [0, 225, 225];
const BROWN = [128, 64, 0];
const BROWNLIGHT = [230, 115, 0];
const TURQUOISE = [32, 114, 106];
const TURQUOISELIGHT = [50, 180, 166];

/* FONT */
const FONT_FAMILY = "Copperplate Gothic Light"; // 'Bodoni MT Black'
const FONT_SIZE1 = 16;
const FONT_SIZE2 = 20;
const FONT_SIZE3 = 24;
const FONT_SIZE4 = 28;
const FONT_FACTOR = 1;

const HEADER_HEIGHT = 100;

/* VERTEX */
const VERTEX_RADIUS = 12;
const VERTEX_BORDER_SIZE = 0.5;

/* VERTEX TYPES */
const BLANK_VERTEX = "B";
const WALL_VERTEX = "W";
const START_VERTEX = "S";
const END_VERTEX = "E";

/* GRID */
const GRID_POS_X = 20;
const GRID_POS_Y = 120;
const GRID_ROWS = 30;
const GRID_COLS = 60;

const START_VERTEX_POS = [15, 20];
const END_VERTEX_POS = [15, 40];

const WALL_DENSITY = 0.2;

/* SEARCH */
const SEARCH_TYPES = [
  "BFS",
  "DFS",
  "A*",
  //'Dijkstra'
];

/* VERTEX SHAPES */
const VERTEX_SHAPES = ["Square", "Hexagon"];
