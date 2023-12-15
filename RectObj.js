class RectObject extends GameObject {

	constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, width, height) {
    	super(x_coord, y_coord, fill_color, stroke_color, ctx);
        this.width = width;
        this.height = height;
        this.dx = 1;
        this.dy = 1;
        this.velocity = 1;
        this.ID = ID;
        this.numOfCollisions = 0;
    }

    getX() {
        return (this.x_coord + this.width/2);
    }

    getY() {
        return (this.y_coord + this.height/2);
    }
    rectBallColl(){

    }

    getID() {
        return this.ID;
    }

    getType() {
        return "rectangle";
    }

    getBounds() {
        const rad = Math.max(this.width/2,  this.height/2)
        return {x: rad, y: rad};
    }

    getRect() {
        return {x: this.width/2,  y: this.height/2};
    }

    setDirection(){
        this.dx *= -1;
        this.dy *= -1;
        this.update();
        return false;
    }

    IncreNumBounces() {
        this.numOfCollisions+=1;
    }
    
    getNumBounces() {
        return this.numOfCollisions;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x_coord, this.y_coord, this.width, this.height);
        this.ctx.strokeStyle = this.stroke_color;
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.fillStyle = this.fill_color;
        this.ctx.fill();
    }

    check_sign(){
        if(this.x_coord + this.width > this.ctx.canvas.clientWidth || this.x_coord < 0){
            this.dx *= -1;
        }

        if(this.y_coord + this.height > this.ctx.canvas.clientHeight || this.y_coord < 0){
            this.dy *= -1;
        }
    }

    update() {
        this.check_sign();
        this.y_coord += this.velocity * this.dy;
        this.x_coord += this.velocity * this.dx;
    }
}