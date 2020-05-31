async function astar(grid, startVertex, endVertex) {
  console.log("A*");

  let openSet = [];
  let closedSet = [];

  openSet.push(startVertex);

  // Init each vertex f value to infinity
  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let vertex = grid.at(i, j);
      vertex.setFValue(Infinity);
    }
  }

  startVertex.setFValue(0);
  while (openSet.length > 0) {
    // Get the current vertex from open set that has the lowest f value
    let currentIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].getFValue() < openSet[currentIndex].getFValue()) {
        currentIndex = i;
      }
    }
    let current = openSet[currentIndex];

    // If we reached the end
    if (current == endVertex) {
      console.log("End.");
      return true;
    }

    RemoveFromArray(openSet, current);
    closedSet.push(current);

    for (let neighbor of current.getNeighbors()) {
      if (
        neighbor.getVertexType() != WALL_VERTEX &&
        !closedSet.includes(neighbor)
      ) {
        let tempG = current.getGValue() + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.getGValue()) {
            neighbor.setGValue(tempG);
          }
        } else {
          neighbor.setGValue(tempG);
          openSet.push(neighbor);
        }

        let heuristics = neighbor.setHValue(
          ManhattanDistance(neighbor, endVertex)
        );
        neighbor.setHValue(heuristics);
        neighbor.setFValue(neighbor.getGValue() + neighbor.getHValue());
        neighbor.setParent(current);

        if (neighbor != endVertex) {
          await sleep(DELAY_IN_MILLISEC);
          neighbor.setBackcolor(BLUE);
        }
      }
    }
  }

  return false;
}
