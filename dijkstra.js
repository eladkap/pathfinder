function dijkstra(grid, startVertex, endVertex) {
  let S = new Set();
  for (let i = 0; i < grid.rows; i++) {
    for (let j = 0; j < grid.cols; j++) {
      let v = grid.at(i, j);
      v.setDistance(Infinity);
      v.setParent(null);
      S.add(v);
    }
  }
  startVertex.setDistance(0);
  let c = 0;
  while (S.size > 0) {
    console.log(c);
    c++;
    let u = grid.getVertexWithMinDist();
    S.delete(u);

    for (let neighbor of u.getNeighbors()) {
      let alt = u.getDistance() + grid.getDist(u, neighbor);
      if (alt < neighbor.getDistance()) {
        neighbor.setDistance(alt);
        neighbor.setParent(u);
      }
    }
  }
}
