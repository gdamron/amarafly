class Plant {
    constructor(sprite) {
        this.sprite = sprite;
    }

    setup(x, y, speed, scale=1.0) {
        this.position = createVector(x, y);
        this.sprite.setup(speed);
        this.scale = scale;
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        scale(this.scale, this.scale);
        this.sprite.show();
        pop();
    }

    update() {
        this.sprite.tick();
    }
}
