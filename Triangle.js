class Triangle extends GameObject {

  constructor(x_coord, y_coord, fill_color, stroke_color, ID, ctx, pt_2, pt_3) {
      super(x_coord, y_coord, fill_color, stroke_color, ctx);
      this.pt_2 = pt_2;
      this.pt_3 = pt_3;
      this.dx = 1;
      this.dy = 1;
      this.velocity = 1;
      this.bounced = false;
      this.angularMomentum = 0;
      this.numOfCollisions = 0;
      this.ID = ID;
  }

  calculateCentroid() {
      const centroidX = (this.x_coord + this.pt_2.x + this.pt_3.x) / 3;
      const centroidY = (this.y_coord + this.pt_2.y + this.pt_3.y) / 3;
      return { x: centroidX, y: centroidY };
  }

  getX() {
      return this.calculateCentroid().x;
  }

  getY() {
      return this.calculateCentroid().y;
  }

  getID() {
      return this.ID;
  }

  getType() {
    return "triangle";
    }

  IncreNumBounces() {
      this.numOfCollisions += 1;
  }

  getNumBounces() {
      return this.numOfCollisions;
  }

  getBounds() {
      const min_x = Math.min(this.x_coord, this.pt_2.x, this.pt_3.x);
      const max_x = Math.max(this.x_coord, this.pt_2.x, this.pt_3.x);
      const min_y = Math.min(this.y_coord, this.pt_2.y, this.pt_3.y);
      const max_y = Math.max(this.y_coord, this.pt_2.y, this.pt_3.y);
      const maxRad = Math.max((max_x - min_x) / 2, (max_y - min_y) / 2);
      return { x: maxRad, y: maxRad };
  }

  getRect(){
    return getBounds();
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
    this.update();
    this.bounced = true;
    return false;
    }

  rotate(angleInRadians) {
      const canvasWidth = this.ctx.canvas.width;
      const canvasHeight = this.ctx.canvas.height;
      const centroid = this.calculateCentroid();

      const pt1translatedX = this.x_coord - centroid.x;
      const pt1translatedY = this.y_coord - centroid.y;
      const pt2TranslatedX = this.pt_2.x - centroid.x;
      const pt2TranslatedY = this.pt_2.y - centroid.y;
      const pt3TranslatedX = this.pt_3.x - centroid.x;
      const pt3TranslatedY = this.pt_3.y - centroid.y;

      const rotatedX = pt1translatedX * Math.cos(angleInRadians) - pt1translatedY * Math.sin(angleInRadians);
      const rotatedY = pt1translatedX * Math.sin(angleInRadians) + pt1translatedY * Math.cos(angleInRadians);
      const pt2RotatedX = pt2TranslatedX * Math.cos(angleInRadians) - pt2TranslatedY * Math.sin(angleInRadians);
      const pt2RotatedY = pt2TranslatedX * Math.sin(angleInRadians) + pt2TranslatedY * Math.cos(angleInRadians);
      const pt3RotatedX = pt3TranslatedX * Math.cos(angleInRadians) - pt3TranslatedY * Math.sin(angleInRadians);
      const pt3RotatedY = pt3TranslatedX * Math.sin(angleInRadians) + pt3TranslatedY * Math.cos(angleInRadians);

      const pt1_x = rotatedX + centroid.x;
      const pt1_y = rotatedY + centroid.y;
      const pt2_x = pt2RotatedX + centroid.x;
      const pt2_y = pt2RotatedY + centroid.y;
      const pt3_x = pt3RotatedX + centroid.x;
      const pt3_y = pt3RotatedY + centroid.y;

      if (
          pt1_x < 0 || pt1_x > canvasWidth ||
          pt1_y < 0 || pt1_y > canvasHeight ||
          pt2_x < 0 || pt2_x > canvasWidth ||
          pt2_y < 0 || pt2_y > canvasHeight ||
          pt3_x < 0 || pt3_x > canvasWidth ||
          pt3_y < 0 || pt3_y > canvasHeight
      ) {
          return;
      }

      this.x_coord = pt1_x;
      this.y_coord = pt1_y;
      this.pt_2.x = pt2_x;
      this.pt_2.y = pt2_y;
      this.pt_3.x = pt3_x;
      this.pt_3.y = pt3_y;
  }

  draw() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.stroke_color;
      this.ctx.lineWidth = 3;
      this.ctx.moveTo(this.x_coord, this.y_coord); // Start at the first vertex
      this.ctx.lineTo(this.pt_2.x, this.pt_2.y);     // Draw a line to the second vertex
      this.ctx.lineTo(this.pt_3.x, this.pt_3.y);     // Draw a line to the third vertex
      this.ctx.lineTo(this.x_coord, this.y_coord); // Draw a line back to the first vertex to close the path
      this.ctx.closePath();
      this.ctx.fillStyle = this.fill_color;
      this.ctx.fill();
      this.ctx.stroke();
  }

  test_collision() {
      const canvasWidth = this.ctx.canvas.width;
      const canvasHeight = this.ctx.canvas.height;

      if (this.x_coord < 0 || this.pt_2.x < 0 || this.pt_3.x < 0 ||
          this.x_coord > canvasWidth || this.pt_2.x > canvasWidth || this.pt_3.x > canvasWidth) {
          this.dx *= -1;
          this.bounced = true;
      }

      if (this.y_coord < 0 || this.pt_2.y < 0 || this.pt_3.y < 0 ||
          this.y_coord > canvasHeight || this.pt_2.y > canvasHeight || this.pt_3.y > canvasHeight) {
          this.dy *= -1;
          this.bounced = true;
      }
  }

  update() {
      this.test_collision();

      if (this.bounced) {
          const temp = 0.02 * (this.dx + this.dy);
          this.angularMomentum = (Math.abs(temp) > 2 * Math.PI) ? 0 : temp;
          this.bounced = false;
      }

      this.x_coord += this.velocity * this.dx;
      this.y_coord += this.velocity * this.dy;
      this.pt_2.x += this.velocity * this.dx;
      this.pt_2.y += this.velocity * this.dy;
      this.pt_3.x += this.velocity * this.dx;
      this.pt_3.y += this.velocity * this.dy;
      this.rotate(this.angularMomentum);
  }
}
