function getVertexWithLowestFValue(vertexSet) {
  minValue = vertexSet[0].getFValue();
  minIndex = 0;
  for (let i = 0; i < vertexSet.length; i++) {
    if (vertexSet[i].getFValue() < minValue) {
      minIndex = i;
      minValue = vertexSet[i].getFValue();
    }
  }
  return vertexSet[minIndex];
}

async function astar(grid, startVertex, endVertex) {
  console.log("A*");

  let openSet = [];

  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let vertex = grid.get(i, j);
      vertex.setFValue(Infinity);
      vertex.setGValue(Infinity);
    }
  }

  startVertex.setGValue(0);
  startVertex.setFValue(Utils.euclideanDistance(startVertex, endVertex));

  openSet.push(startVertex);
 
  while (openSet.length > 0) {
    // Get the current vertex from open set that has the lowest f value
    let current = getVertexWithLowestFValue(openSet);

    // If we reached the end
    if (current == endVertex) {
      console.log("End.");
      return true;
    }

    Utils.removeFromArray(openSet, current);

    for (let neighbor of current.getNeighbors()) {
      let d = neighbor.getVertexType() != WALL_VERTEX ? 1 : Infinity;
      let gValue = current.getGValue() + d;
      if (gValue < neighbor.getGValue()) {
        neighbor.setParent(current);
        neighbor.setGValue(gValue);
        neighbor.setFValue(gValue + Utils.euclideanDistance(neighbor, endVertex));
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return false;
}
