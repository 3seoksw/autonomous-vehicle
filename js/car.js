const ACCELERATION = 0.2
const MAX_SPEED = 3
const FRICTION = 0.05 
const ANGLE_DIF = 0.03

class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.speed = 0
        this.acceleration = ACCELERATION 
        this.maxSpeed = maxSpeed 
        this.friction = FRICTION
        this.angle = 0
        this.damaged = false

        if (controlType === "KEYS") {
            this.sensor = new Sensor(this)
        }
        this.controls = new Controls(controlType)
    }

    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.#move()
            this.polygon = this.#createPolygon()
            this.damaged = this.#assessDamage(roadBorders, traffic)
        }

        if (this.sensor) {
            this.sensor.update(roadBorders, traffic)
        }
    }

    #assessDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            if (polyIntersect(this.polygon, roadBorders[i])) {
                return true
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            if (polyIntersect(this.polygon, traffic[i].polygon)) {
                return true
            }
        }

        return false
    }

    #createPolygon() {
        const points = []
        const rad = Math.hypot(this.width, this.height) / 2
        const theta = Math.atan2(this.width, this.height)
        points.push({
            x: this.x - Math.sin(this.angle - theta) * rad,
            y: this.y - Math.cos(this.angle - theta)* rad
        }) // top right point
        points.push({
            x: this.x - Math.sin(this.angle + theta) * rad,
            y: this.y - Math.cos(this.angle + theta)* rad
        }) // top left
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - theta) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - theta)* rad
        }) // bottom left
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + theta) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + theta)* rad
        }) // bottom right

        return points
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed
        }
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed
        }

        if (this.speed > 0) {
            this.speed -= this.friction
        }
        if (this.speed < 0) {
            this.speed += this.friction
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1

            if (this.controls.left) {
                this.angle += ANGLE_DIF * flip
            }
            if (this.controls.right) {
                this.angle -= ANGLE_DIF * flip
            }
        }
        this.x -= Math.sin(this.angle) * this.speed
        this.y -= Math.cos(this.angle) * this.speed

    }

    draw(ctx, colour) {
        if (this.damaged) {
            ctx.fillStyle = "gray"
        }
        else {
            ctx.fillStyle = colour
        }
        ctx.beginPath()
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        ctx.fill()

        if (this.sensor) {
            this.sensor.draw(ctx)
        }
    }
}
