class GameObject {
    /**
     * Create a new GameObject.
     * @param {number} x - The X-coordinate of the object on the Canvas.
     * @param {number} y - The Y-coordinate of the object on the Canvas.
     * @param {string} fill_color - A string representing the "fill color" of the object.
     * @param {string} stroke_color - A string representing the "stroke color" of the object.
     * @param {CanvasRenderingContext2D} ctx - Canvas Context
     */
      constructor(x_coord, y_coord, fill_color, stroke_color, ctx) {
          this.x_coord = x_coord;
          this.y_coord = y_coord;
          this.fill_color = fill_color;
          this.stroke_color = stroke_color;
          this.ctx = ctx;
    }
    
    /**
     * Draw the current object on the canvas (Currently does nothing).
     */
    draw() {
    }
    
    /**
     * Update the object fields for the next animation frame (Currently does nothing).
     */
    update() {
    }

    /**
     * returns the x-coordiante of the objects center point (Currently does nothing).
     */
    getX() {
    }

    /**
     * returns the y-coordiante of the objects center point (Currently does nothing).
     */
    getY() {
    }

    /**
     * returns the bounding rectangle of the object (Currently does nothing).
     */
    getRect() {
    }

    /**
     * Adjusts the bounce direction of the object (Currently does nothing).
     */
    setDirection(){
    }

  }