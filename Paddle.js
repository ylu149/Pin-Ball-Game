class Paddle extends RectObject{
	constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, width, height, velocity, numOfCollisions) {
    	super(x_coord, y_coord, fill_color, stroke_color, ID, ctx, width, height, velocity, numOfCollisions);
      this.isRightArrowPressed = false;
      this.isLeftArrowPressed = false;
      this.isUpArrowPressed = false;
      this.isDownArrowPressed = false;
    }
    
    draw(){
    	super.draw();
    }

    getX() {
      return super.getX();
    }

    getY() {
        return super.getY();
    }

    getID() {
      return super.getID();
    }

    getType() {
      return super.getType();
    }

    getBounds() {
      return super.getBounds();
    }

    getRect() {
      return super.getRect();
    }

    setDirection(){
      return false;
    }

    setVelocity(velocity){
      this.velocity = velocity;
    }

    IncreNumBounces() {
        super.IncreNumBounces();
    }

    update() {
      return;
    }

    getNumBounces() {
        return super.getNumBounces();
    }

    On_RightArrowKeyPress() {
      ctx.clearRect(this.x_coord - 2, this.y_coord - 2, this.width + 4, this.height + 4);
    	this.x_coord += this.velocity;
        super.draw();
    }
    
    On_LeftArrowKeyPress() {
      ctx.clearRect(this.x_coord - 2, this.y_coord - 2, this.width + 4, this.height + 4);
    	this.x_coord -= this.velocity;
        super.draw();
    }
    
    On_UpArrowKeyPress() {
      ctx.clearRect(this.x_coord - 2, this.y_coord - 2, this.width + 4, this.height + 4);
    	this.y_coord -= this.velocity;;
        super.draw();
    }
 
    On_DownArrowKeyPress() {
      ctx.clearRect(this.x_coord - 2, this.y_coord - 2, this.width + 4, this.height + 4);
    	this.y_coord += this.velocity;;
        super.draw();
    }
    
    initialize() {
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
          this.isRightArrowPressed = true;
        }
        if (event.key === "ArrowLeft") {
          this.isLeftArrowPressed = true;
        }
        if (event.key === "ArrowUp") {
          this.isUpArrowPressed = true;
        }
        if (event.key === "ArrowDown") {
          this.isDownArrowPressed = true;
        }
      });
  
      document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowRight") {
          this.isRightArrowPressed = false;
        }
        if (event.key === "ArrowLeft") {
          this.isLeftArrowPressed = false;
        }
        if (event.key === "ArrowUp") {
          this.isUpArrowPressed = false;
        }
        if (event.key === "ArrowDown") {
          this.isDownArrowPressed = false;
        }
      });
  }
}

