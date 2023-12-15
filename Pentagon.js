class Pentagon extends GameObject {

    constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, radius, rotAngle) {
    	super(x_coord, y_coord, fill_color, stroke_color, ctx);
        this.radius = radius;
        this.dx = 1;
        this.dy = 1;
        this.velocity = 3;
        this.numOfCollisions = 0;
        this.rotAngle = rotAngle;
        this.collided = false;
        this.ID = ID;
    }

    draw() {
        const angle = (2*Math.PI) / 5;
        const rotRadians = this.rotAngle * (Math.PI / 180);
        let pent_pts = [];
        for (let ii = 0; ii < 5; ii++){
            pent_pts[ii] = {x: this.x_coord + this.radius * Math.cos(angle * ii + rotRadians), 
                y: this.y_coord + this.radius * Math.sin(angle * ii + rotRadians)};
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.stroke_color;
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(pent_pts[0].x, pent_pts[0].y); 
        this.ctx.lineTo(pent_pts[1].x, pent_pts[1].y); 
        this.ctx.lineTo(pent_pts[2].x, pent_pts[2].y);
        this.ctx.lineTo(pent_pts[3].x, pent_pts[3].y);
        this.ctx.lineTo(pent_pts[4].x, pent_pts[4].y);
        this.ctx.lineTo(pent_pts[0].x, pent_pts[0].y);
        this.ctx.closePath();
        this.ctx.fillStyle = this.fill_color;
        this.ctx.fill();
        this.ctx.stroke();

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
        return {x: this.radius, y: this.radius};
    }

    getID() {
        return this.ID;
    }

    getType() {
        return "pentagon";
    }

    setDirection(){
        return false;
    }

    setCollFlag(flag){
        this.collided = flag;
    }
    
    getCollFlag(){
        return this.collided;
    }

    IncreNumBounces() {
        this.numOfCollisions+=1;
    }

    getNumBounces() {
        return this.numOfCollisions;
    }

    update() {

    }

}