// boid
const BOID_COUNT = 20;
const BOID_ALIGN = 80;
const BOID_COHESE = 94;
const BOID_SEPARATE = 60;
const BOID_SCALE = 0.5;

const FLOWER_SPACE = 48;
const FLOWER_SPEED = 0.09;

// sprite
const SPRITE_COUNT = 4;
const SPRITE_SIZE = 128;
const SPRITE_IMG = '/img/butterfly-sprite.png';
const FLOWER_IMG = '/img/flower-sprite.png';

let flock = [];
let garden = [];

function preload() {
    for (let i = 0; i < BOID_COUNT; i++) {
        let sprite = new Sprite(SPRITE_IMG, SPRITE_COUNT, SPRITE_SIZE, SPRITE_SIZE);
        let boid = new Boid(sprite, BOID_ALIGN, BOID_COHESE, BOID_SEPARATE);
        flock.push(boid);
    }

    let flowers = windowWidth / FLOWER_SPACE;
    for (let i = 0; i < flowers; i++) {
        let sprite = new Sprite(FLOWER_IMG, SPRITE_COUNT, SPRITE_SIZE, SPRITE_SIZE);
        let plant = new Plant(sprite);
        garden.push(plant);

    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let boid of flock) {
        boid.setup(BOID_SCALE);
    }


    let ground = windowHeight - SPRITE_SIZE;
    let x = 0;
    for (let plant of garden) {
        plant.setup(x, ground, FLOWER_SPEED);
        x += FLOWER_SPACE;
    }

}

function draw() {
    background(0);
    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }

    for (let plant of garden) {
        plant.update();
        plant.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
