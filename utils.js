function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function EuclideanDistance(vertex1, vertex2) {
  return dist(vertex1.row, vertex2.row, vertex1.col, vertex2.col);
}

function ManhattanDistance(vertex1, vertex2) {
  return (
    Math.abs(vertex1.row - vertex2.row) + Math.abs(vertex1.col - vertex2.col)
  );
}

function RemoveFromArray(arr, element) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == element) {
      arr.splice(i, 1);
    }
  }
}
