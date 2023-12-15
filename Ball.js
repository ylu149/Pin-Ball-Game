class Ball extends GameObject {

	constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, radius) {
    	super(x_coord, y_coord, fill_color, stroke_color, ctx);
        this.radius = radius;
        this.ID = ID;
        this.dx = 1;
        this.dy = 1;
        this.velocity = 0.5;
        this.numOfCollisions = 0;
    }

    getX(){
        return this.x_coord;
    }

    getY(){
        return this.y_coord;
    }
    
    getBounds(){
        return {x: this.radius, y: this.radius};
    }

    getRect(){
        return this.getBounds();
    }

    getType() {
        return "ball";
    }

    getID() {
        return this.ID;
    }

    setVelocity() {
        this.velocity *= 1.25;
    }
    
    setDirection(otherBall) {
        let dx = otherBall.getX() - this.x_coord;
        let dy = otherBall.getY() - this.y_coord;
        const angle = Math.atan2(dy, dx);
        const thisSpeed = Math.sqrt(this.dx ** 2 + this.dy ** 2);
        const thisAngle = Math.atan2(this.dy, this.dx);        
        const thisNewVelocityX = thisSpeed * Math.cos(thisAngle - angle);
        const thisNewVelocityY = thisSpeed * Math.sin(thisAngle - angle);
        this.dx = thisNewVelocityX;
        this.dy = thisNewVelocityY;
        return this.update();
    }

    IncreNumBounces() {
        this.numOfCollisions+=1;
        this.velocity += this.velocity*0.01;
        this.velocity += this.velocity*0.01;
    }

    getNumBounces() {
        return this.numOfCollisions;
    }

    rectBallColl() {
        this.dx *= -1;
        this.dy *= -1;
        this.update();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x_coord, this.y_coord, this.radius, 0, 2*Math.PI);
        this.ctx.strokeStyle = this.stroke_color;
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.fillStyle = this.fill_color;
        this.ctx.fill();
    }

    check_sign(){
        if(this.y_coord + this.dy < this.radius /*|| this.y_coord + this.dy > this.ctx.canvas.clientHeights*/){
            this.dy *= -1;
        }

        if(this.x_coord + this.dx > this.ctx.canvas.clientWidth - this.radius || 
            this.y_coord + this.dy > this.ctx.canvas.clientHeight - this.radius ||
            this.x_coord + this.dx < -this.radius)
        {
            this.y_coord = Number.MAX_SAFE_INTEGER;
            this.x_coord = Number.MAX_SAFE_INTEGER;
            this.velocity = 0;
            this.dx = 0;
            this.dy = 0;
            return true;
        }
        return false;
    }
    
    update() {
        this.y_coord += this.velocity * this.dy;
        this.x_coord += this.velocity * this.dx;
        return(this.check_sign());
    }
}