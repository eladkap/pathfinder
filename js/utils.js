class Utils {
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  static endVertexuclideanDistance(vertex1, vertex2) {
    return dist(vertex1.row, vertex2.row, vertex1.col, vertex2.col);
  }
  
  static manhattanDistance(vertex1, vertex2) {
    return (
      Math.abs(vertex1.row - vertex2.row) + Math.abs(vertex1.col - vertex2.col)
    );
  }
  
  static removeFromArray(arr, element) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == element) {
        arr.splice(i, 1);
      }
    }
  }
  
  static translateMouseToCanvasPosition(mouseX, mouseY, canvas, canvasRect) {
    let mx = mouseX - canvasRect.left - scrollX;
    let my = mouseY - canvasRect.top - scrollY;
    mx /= canvasRect.width;
    my /= canvasRect.height;
    mx *= canvas.width;
    my *= canvas.height;
    return new Vector(mx, my);
  }
}
