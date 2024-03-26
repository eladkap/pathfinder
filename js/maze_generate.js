async function generateMazeRecursivelyAux(grid, startRow, endRow, startCol, endCol) {
  if (endRow - startRow < 6 || endCol - startCol < 6) {
    return;
  }

  divideRow = Math.floor((startRow + endRow) / 2);
  divideCol = Math.floor((startCol + endCol) / 2);

  for (let j = startCol; j <= endCol; j++) {
    grid.setVertexType(divideRow, j, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC * 2);
  }

  for (let i = startRow; i <= endRow; i++) {
    grid.setVertexType(i, divideCol, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC * 2);
  }

  // open passage
  leftColOpen = Utils.randomRange(startCol + 1, divideCol - 1);
  grid.setVertexType(divideRow, leftColOpen, BLANK_VERTEX);

  bottomRowOpen = Utils.randomRange(divideRow + 1, endRow - 1)
  grid.setVertexType(bottomRowOpen, divideCol, BLANK_VERTEX);

  rightColOpen = Utils.randomRange(divideCol + 1, endCol - 1)
  grid.setVertexType(divideRow, rightColOpen, BLANK_VERTEX);

  // go to upper-left sub-grid
  await generateMazeRecursivelyAux(grid, startRow, divideRow - 1, startCol, divideCol - 1);

  // go to upper-right sub-grid
  await generateMazeRecursivelyAux(grid, startRow, divideRow - 1, divideCol, endCol - 1);

  // go to bottom-left sub-grid
  await generateMazeRecursivelyAux(grid, divideRow, endRow - 1, startCol, divideCol - 1);

  // go to bottom-right sub-grid
  await generateMazeRecursivelyAux(grid, divideRow, endRow - 1, divideCol, endCol - 1);
}

async function createMazeFrame(grid) {
  for (i = 0; i < grid.getRows(); i++) {
    grid.setVertexType(i, 0, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC * 2);
  }

  for (j = 0; j < grid.getCols(); j++) {
    grid.setVertexType(0, j, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC * 2);
  }

  for (i = 0; i < grid.getRows(); i++) {
    grid.setVertexType(i, grid.getCols() - 1, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC * 2);
  }

  for (j = 0; j < grid.getCols(); j++) {
    grid.setVertexType(grid.getRows() - 1, j, WALL_VERTEX);
    await Utils.sleep(DELAY_IN_MILLISEC) * 2;
  }
}

async function generateMazeRecursively(grid) {
  grid.clearWalls();
  await createMazeFrame(grid);
  await generateMazeRecursivelyAux(grid, 1, grid.getRows() - 2, 1, grid.getCols() - 2);
}

async function GenerateMazeIterative(grid, initVertex) {
  // Start with grid full of walls
  for (let vertex of grid.vertices) {
    if (vertex.vertexType != START_VERTEX && vertex.vertexType != END_VERTEX) {
      vertex.setVertexType(WALL_VERTEX);
      vertex.setVisited(false);
    }
  }

  let stack = new Stack();
  let vertex = initVertex;
  vertex.setVisited(true);
  stack.push(vertex);

  while (!stack.isEmpty()) {
    await Utils.sleep(500);
    let current = stack.pop();

    // Choose random free direction

    let directionsOptions = new Array("left", "right", "top", "bottom");
    let chosenDirection = random(directionsOptions);

    let neighbor1 = current.directions[chosenDirection];
    let neighbor2 = neighbor1.directions[chosenDirection];
    if (
      (neighbor1 != null) & (neighbor2 != null) &&
      !neighbor1.isVisited() &&
      !neighbor2.isVisited()
    ) {
      let neighbor1 = current.directions[chosenDirection];
      let neighbor2 = neighbor1.directions[chosenDirection];
      neighbor1.setVertexType(BLANK_VERTEX);
      neighbor1.setVisited(true);
      stack.push(neighbor1);
      neighbor2.setVertexType(BLANK_VERTEX);
      neighbor2.setVisited(true);
      stack.push(neighbor2);
    }
  }
}

async function GenerateMazePrim() {
  // Start with grid full of walls
  for (let vertex of grid.vertices) {
    if (vertex.vertexType != START_VERTEX && vertex.vertexType != END_VERTEX) {
      vertex.setVertexType(WALL_VERTEX);
      vertex.setVisited(false);
    }
  }

  let wallsSet = new Set();
  let vertex = startVertex;
  vertex.setVisited(true);

  // Add the walls of the cell to the wall set
  for (let neighbor of vertex.getNeighbors()) {
    if (neighbor.vertexType == WALL_VERTEX) {
      wallsSet.add(neighbor);
    }
  }

  while (wallsSet.size > 0) {
    // Pick random wall cell from the set
    let wallVertex = GetRandomItem(wallsSet);
    if (!wallVertex.isVisited()) {
      wallVertex.setVertexType(BLANK_VERTEX);
      wallVertex.setVisited(true);
      wallsSet.add(wallVertex);
    }
    wallsSet.delete(wallVertex);
    await Utils.sleep(500);
  }
}

function GetRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}
