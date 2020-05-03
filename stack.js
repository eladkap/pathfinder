class Stack {
  constructor() {
    this.arr = [];
  }

  push(x) {
    this.arr.push(x);
  }

  pop() {
    if (this.arr.length > 0) {
      return this.arr.pop();
    }
  }

  top() {
    if (this.arr.length > 0) {
      return this.arr[this.arr.length - 1];
    }
    return null;
  }

  size() {
    return this.arr.length;
  }

  isEmpty() {
    return this.arr.length == 0;
  }
}
