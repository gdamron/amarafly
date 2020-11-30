const ALIGN = 40;
const COHESE = 64;
const SEPARATE = 80;

class Boid {
    constructor(sprite, align=ALIGN, cohese=COHESE, separate=SEPARATE) {
        this.maxForce = 0.01;
        this.maxSpeed = 2.0;
        this.sprite = sprite;
        this.perception = {
            align,
            cohese,
            separate
        }
    }

    setup(scale=1.0) {
        this.scale = scale;
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 3))
        this.acceleration = createVector()
        this.sprite.setup();
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading() + HALF_PI);
        scale(this.scale, this.scale);
        this.sprite.show();
        pop();
    }

    align(boids) {
        let perception = this.perception.align;
        let total = 0;
        let steering = createVector();
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perception) {
                steering.add(other.velocity);
                total++
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perception = this.perception.cohese;
        let total = 0;
        let steering = createVector();
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perception) {
                steering.add(other.position);
                total++
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separation(boids) {
        let perception = this.perception.separate;
        let total = 0;
        let steering = createVector();
        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perception) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
        this.sprite.tick();
    }
}
