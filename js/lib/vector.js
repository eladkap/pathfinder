class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return `(${this.x},${this.y})`;
    }
  
    set(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(other) {
      this.x += other.x;
      this.y += other.y;
    }
  
    magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    angle() {
      return Math.atan(this.y / this.x);
    }
  
    multiply(factor) {
      this.x *= factor;
      this.y *= factor;
    }
  
    static fromAngle(angle, mag) {
      let x = mag * Math.cos(angle);
      let y = mag * Math.sin(angle);
      return new Vector(x, y);
    }
  }
  