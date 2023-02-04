function lerp(A, B, t) {
    return A + (B - A) * t
}

/** Between two lines, check if there's an intersection */
function getIntersection(a, b, c, d) {
    const tTop = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)
    const uTop = (c.y - a.y) * (a.x - b.x) - (c.x - a.x) * (a.y - b.y)
    const bottom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y)

    if (bottom != 0) {
        const t = tTop / bottom
        const u = uTop / bottom

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(a.x, b.x, t),
                y: lerp(a.y, b.y, t),
                offset: t
            }
        }
  }
}

/** p1: polygons of the car, p2: polygons of the road */
function polyIntersect(p1, p2) {
    for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
            const touch = getIntersection(
                p1[i],
                p1[(i + 1) % p1.length],
                p2[j],
                p2[(j + 1) % p2.length]
            )

            if (touch) {
                return true
            }
        }
    }
    return false
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
}

function getRGBA(value) {
    const alpha = Math.abs(value)
    const R = value < 0 ? 0 : 255
    const G = R
    const B = value > 0 ? 0 : 255
    return "rgba("+R+","+G+","+B+","+alpha+")"
}

function findLeading(cars) {
    const WEIGHT = 0.3
    const maxY = cars.find(car => car.y == Math.min(...cars.map(car => car.y))).y
    cars.forEach(car => car.score += car.y / maxY * WEIGHT)
}

function findShortest(cars) {
    const WEIGHT = 0.7
    const longestDist = cars.find(car => car.distance == Math.max(...cars.map(car => car.distance))).distance
    cars.forEach(car => car.score += car.distance / longestDist * WEIGHT)
}

function fitnessFunc(cars) {
    findLeading(cars)
    findShortest(cars)

    const car = cars.find(car => car.score == Math.max(...cars.map(car => car.score)))
    console.log(car)
    return car
    //leadingCar = cars.find(car => car.y == Math.min(...cars.map(car => car.y)))
}
