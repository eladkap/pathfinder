function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function euclideanDistance(vertex1, vertex2) {
  return Math.sqrt(
    Math.pow(vertex1.row - vertex2.row, 2) +
      Math.pow(vertex1.col - vertex2.col, 2)
  );
}

function manhattanDistance(vertex1, vertex2) {
  return (
    Math.abs(vertex1.row - vertex2.row) + Math.abs(vertex1.col - vertex2.col)
  );
}
