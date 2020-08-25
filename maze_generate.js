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
    await sleep(500);
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
    await sleep(500);
  }
}

function GetRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}
