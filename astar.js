async function astar(grid, startVertex, endVertex) {
  console.log("A*");
  // Set hueristics value of each node to the euclidean distance from the target
  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let vertex = grid.mat[i][j];
      //   let h = euclideanDistance(vertex, endVertex);
      let h = manhattanDistance(vertex, endVertex);
      vertex.setHeuristics(h);
    }
  }

  let queue = new Queue();
}
