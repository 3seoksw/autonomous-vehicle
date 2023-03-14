// Road Canvas
const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 200

// Network Canvas
const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 300

// Contexts
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9)

const N = 1
const cars = generateCars(N)

let leadingCar = cars[0]

if (localStorage.getItem("optimal")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("optimal"))

        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2)
        }
    }
}

const NUMBER_OF_CARS = 100
let traffic = []
for (let i = 0; i < NUMBER_OF_CARS; i++) {
    const LANE_NUMBER = Math.floor(Math.random() * 3)
    const Y_COORD = i * (-200) - 100
    traffic.push(new Car(road.getLaneCentre(LANE_NUMBER), Y_COORD, 30, 50, "DUMMY", 2))
}

animate()

function generateCars(N) {
    const cars = []

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCentre(1), 100, 30, 50, "AI"))
    }

    return cars
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic, road.lanes)
    }

    // TODO: find an optimal fitness function
    //leadingCar = cars.find(car => car.y == Math.min(...cars.map(car => car.y)))
    leadingCar = fitnessFunc(cars)

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    carCtx.save()
    carCtx.translate(0, -leadingCar.y + carCanvas.height * 0.7)

    road.draw(carCtx)

    // drawing cars
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red")
    }

    carCtx.globalAlpha = 0.2
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue")
    }
    carCtx.globalAlpha = 1
    leadingCar.draw(carCtx, "blue", true)

    carCtx.restore()

    networkCtx.lineDashOffset = -time / 50
    Visualizer.drawNetwork(networkCtx, leadingCar.brain)
    requestAnimationFrame(animate)
}


function save() {
    localStorage.setItem("optimal", JSON.stringify(leadingCar.brain))
}

function discard() {
    localStorage.removeItem("optimal")
}
