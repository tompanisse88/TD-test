class player {
    constructor(levelWidth, levelHeight, radius) {
        this.x = levelWidth / 2;
        this.y = levelHeight / 2;
        this.radius = radius;
    }

    move() {
        var directionX = mousePosX - this.x - 50;
        var directionY = mousePosY - this.y - 50;
        var abs = Math.sqrt(directionX * directionX + directionY * directionY);

        angleX = directionX / abs;
        angleY = directionY / abs;

        this.x = this.x + angleX;
        this.y = this.y + angleY;

        eye.x = this.x + (this.radius - eye.radius) * angleX;
        eye.y = this.y + (this.radius - eye.radius) * angleY;
    }
}