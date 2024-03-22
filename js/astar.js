function getVertexWithLowestFValue(vertexSet) {
  minValue = vertexSet[0].getFValue();
  minIndex = 0;
  for (let i = 0; i < vertexSet.length; i++) {
    if (vertexSet[i].getFValue() < vertexSet[minIndex].getFValue()) {
      minIndex = i;
      minValue = vertexSet[i].getFValue();
    }
  }
  return vertexSet[minIndex];
}

async function astar(grid, startVertex, endVertex) {
  console.log("A*");

  let openSet = [];
  let closedSet = [];

  openSet.push(startVertex);

  // Init each vertex f value to infinity
  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let vertex = grid.get(i, j);
      vertex.setFValue(Infinity);
    }
  }

  startVertex.setFValue(0);
  while (openSet.length > 0) {
    // Get the current vertex from open set that has the lowest f value
    let current = getVertexWithLowestFValue(openSet);

    // If we reached the end
    if (current == endVertex) {
      console.log("End.");
      return true;
    }

    Utils.removeFromArray(openSet, current);
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
          Utils.manhattanDistance(neighbor, endVertex)
        );
        neighbor.setHValue(heuristics);
        neighbor.setFValue(neighbor.getGValue() + neighbor.getHValue());
        neighbor.setParent(current);

        if (neighbor != endVertex) {
          await Utils.sleep(DELAY_IN_MILLISEC);
          neighbor.setBackcolor(BLUE);
        }
      }
    }
  }

  return false;
}
