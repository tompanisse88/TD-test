class projectile {
    constructor(x, y, radius, angleX, angleY, speed, movement) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.bulletMovementX = angleX;
        this.bulletMovementY = angleY;
        this.bulletSpeed = speed;
        this.movement = movement;
    }
    move() {
            this.x = this.x + this.bulletMovementX * this.bulletSpeed;
            this.y = this.y + this.bulletMovementY * this.bulletSpeed;
    }
}