class Sprite {
    constructor(url, cnt, width, height) {
        this.spriteSheet = loadImage(url);
        this.width = width;
        this.height = height;
        this.spriteCount = cnt;
    }

    setup(speed=0.17, range=0.02) {
        const r = random();
        const g = random();
        const b = random();
        this.animation = [];
        for (let i = 0; i < this.spriteCount; i++) {
            const img = this.spriteSheet.get(i * this.width, 0, this.width, this.height);
            img.loadPixels();
            for (let i = 0; i < img.pixels.length; i += 4) {
               img.pixels[i] *= r;
               img.pixels[i+1] *= g;
               img.pixels[i+2] *= b;
            }
            img.updatePixels();
            this.animation.push(img);
        }
        this.index = Math.floor(random(this.animation.length));
        this.speed = random(speed-range, speed+range);
    }

    show() {
        const len = this.animation.length;
        const i = Math.floor(this.index) % len;
        image(this.animation[i], 0, 0, this.width, this.height);
    }

    tick() {
        this.index += this.speed;
    }
}
