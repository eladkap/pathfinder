const DELAY_IN_MILLISEC = 10;
const MIN_SPEED = 1;
const MAX_SPEED = 10;

/* COLORS */
const BLACK = 'rgb(0, 0, 0)';
const GRAY1 = 'rgb(50, 50, 50)';
const GRAY2 = 'rgb(100, 100, 100)';
const GRAY3 = 'rgb(200, 200, 200)';
const BLACKLIGHT = 'rgb(100, 100, 100)';
const WHITE = 'rgb(255, 255, 255)';
const RED = 'rgb(200, 0, 0)';
const REDLIGHT = 'rgb(200, 100, 100)';
const YELLOW = 'rgb(255, 190, 0)';
const GREEN = 'rgb(0, 100, 0)';
const GREENLIGHT = 'rgb(50, 200, 50)';
const PINK = 'rgb(255, 120, 255)';
const PURPLE = 'rgb(255, 0, 255)';
const BLUEHEAVY = 'rgb(50, 50, 205)';
const BLUE = 'rgb(50, 50, 255)';
const BLUELIGHT = 'rgb(100, 100, 255)';
const BROWN = 'rgb(128, 64, 0)';
const BROWNLIGHT = 'rgb(230, 115, 0)';
const TURQUOISE = 'rgb(32, 114, 106)';
const TURQUOISELIGHT = 'rgb(50, 180, 166)';

/* FONT */
const FONT_FAMILY = "Copperplate Gothic Light";
const FONT_SIZE1 = 16;
const FONT_SIZE2 = 20;
const FONT_SIZE3 = 24;
const FONT_SIZE4 = 28;
const FONT_FACTOR = 1;

const HEADER_HEIGHT = 100;

/* VERTEX */
const VERTEX_RADIUS = 12;
const VERTEX_WIDTH = 2 * VERTEX_RADIUS;
const VERTEX_BORDER_SIZE = 1; // 0.5;

/* VERTEX TYPES */
const BLANK_VERTEX = "B";
const WALL_VERTEX = "W";
const START_VERTEX = "S";
const END_VERTEX = "E";

/* GRID */
const GRID_POS_X = 20;
const GRID_POS_Y = 120;
// const GRID_ROWS = 30;
// const GRID_COLS = 60;

// const START_VERTEX_POS = [15, 20];
// const END_VERTEX_POS = [15, 40];

const WALL_DENSITY = 0.2;

/* SEARCH */
const SEARCH_TYPES = [
    "BFS",
    "DFS",
    "A*"
];
