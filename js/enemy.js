class enemy {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    move() {
        this.y--;
    }
}