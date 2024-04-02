class Vector {
    /**
     * C'tor
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    /**
     * 
     * @returns {string} vector string
     */
    toString() {
      return `(${this.x},${this.y})`;
    }
  
    /**
     * Set vector (x,y) coordinates
     * 
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    set(x, y) {
      this.x = x;
      this.y = y;
    }
  
    /**
     * Adds other vector to this vector
     * 
     * @param {*Vector} other - other vector
     */
    add(other) {
      this.x += other.x;
      this.y += other.y;
    }
  
    /**
     * 
     * @returns {number} length of the vecor
     */
    magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    /**
     * 
     * @returns {number} angle of the vector
     */
    angle() {
      return Math.atan(this.y / this.x);
    }
  
    /**
     * 
     * @param {number} factor - multiply factor
     */
    multiply(factor) {
      this.x *= factor;
      this.y *= factor;
    }
  
    /**
     * 
     * @param {number} angle - angle of result vector
     * @param {number} mag - length of result vector
     * @returns 
     */
    static fromAngle(angle, mag) {
      let x = mag * Math.cos(angle);
      let y = mag * Math.sin(angle);
      return new Vector(x, y);
    }
  }
