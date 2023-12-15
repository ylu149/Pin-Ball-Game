class Brick extends RectObject {

	constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, width, height, numOfCollisions){
        super(x_coord, y_coord, fill_color, stroke_color, ID, ctx, width, height, numOfCollisions);
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

    IncreNumBounces() {
        super.IncreNumBounces();
    }
    
    getNumBounces() {
        return super.getNumBounces();
    }

    getBounds() {
        return super.getBounds();
    }

    getRect() {
        return super.getRect();
    }

    draw() {
        super.draw();
    }

    update() {
        if(this.numOfCollisions > 0){
            this.y_coord = 700;
            this.x_coord = 700;
            this.velocity = 0;
            this.dx = 0;
            this.dy = 0;
        }

    }

}