// Road Canvas
const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 200
const carCanvasT = document.getElementById("carCanvasT")
carCanvasT.width = 400

// Network Canvas
const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 300
const networkCanvasT = document.getElementById("networkCanvasT")
networkCanvasT.width = 300

// Contexts
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const carCtxT = carCanvasT.getContext("2d");
const networkCtxT = networkCanvasT.getContext("2d");

// Road
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9)
const roadT = new Road(carCanvasT.width / 2, carCanvasT.width * 0.9, 5)

// Cars
const N = 100
const N_T = 200
const cars = generateCars(N)
const carsT = generateCarsT(N_T)

// Leading Car
let leadingCar = cars[0]
let leadingCarT = carsT[0]

if (localStorage.getItem("optimal")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("optimal"))
        carsT[i].brain = JSON.parse(localStorage.getItem("optimal"))

        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2)
            NeuralNetwork.mutate(carsT[i].brain, 0.2)
        }
    }
}

const NUMBER_OF_CARS = 100
let traffic = []
let trafficT = []
for (let i = 0; i < NUMBER_OF_CARS; i++) {
    const LANE_NUMBER = Math.floor(Math.random() * 3)
    const LANE_NUMBER_T = Math.floor(Math.random() * 5)

    const Y_COORD = i * (-100) - 100
    const Y_COORD_T = i * (-100) - 100

    traffic.push(new Car(road.getLaneCentre(LANE_NUMBER), Y_COORD, 30, 50, "DUMMY", 2))
    trafficT.push(new Car(roadT.getLaneCentre(LANE_NUMBER_T), Y_COORD_T, 30, 50, "DUMMY", 2))
}

let transformerMode = false
if (transformerMode) {
    animateT()
}
else {
    animate()
}

function generateCars(N) {
    const cars = []

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCentre(1), 100, 30, 50, "AI", 5, 6)) // ray count = 6 by declaring
    }

    return cars
}

function generateCarsT(N) {
    const cars = []

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(roadT.getLaneCentre(3), 100, 30, 50, "AI", 5)) // ray count = 5 by default
    }

    return cars
}

function animate(time) {
    if (transformerMode) {
        return
    }

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic)
    }

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight
    carCanvasT.height = window.innerHeight
    networkCanvasT.height = window.innerHeight

    // TODO: find an optimal fitness function
    //leadingCar = cars.find(car => car.y == Math.min(...cars.map(car => car.y)))
    leadingCar = fitnessFunc(cars)

    carCtx.save()
    carCtx.translate(0, -leadingCar.y + carCanvas.height * 0.7)

    road.draw(carCtx)
    roadT.draw(carCtxT)

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
    carCtxT.restore()

    networkCtx.lineDashOffset = -time / 50
    Visualizer.drawNetwork(networkCtx, leadingCar.brain)
    requestAnimationFrame(animate)
}

function animateT(time) {
    if (!transformerMode) {
        return
    }

    for (let i = 0; i < trafficT.length; i++) {
        trafficT[i].update(roadT.borders, [])
    }

    for (let i = 0; i < carsT.length; i++) {
        carsT[i].update(roadT.borders, trafficT, roadT.lanes, true)
    }

    carCanvasT.height = window.innerHeight
    networkCanvasT.height = window.innerHeight
    
    leadingCarT = fitnessFunc(carsT)

    carCtxT.save()
    carCtxT.translate(0, -leadingCarT.y + carCanvasT.height * 0.7)

    roadT.draw(carCtxT)

    for (let i = 0; i < trafficT.length; i++) {
        trafficT[i].draw(carCtxT, "red")
    }

    carCtxT.globalAlpha = 0.2
    for (let i = 0; i < carsT.length; i++) {
        carsT[i].draw(carCtxT, "blue")
    }
    carCtxT.globalAlpha = 1
    leadingCarT.draw(carCtxT, "blue", true)

    carCtxT.restore()

    networkCtxT.lineDashOffset = -time / 50
    Visualizer.drawNetwork(networkCtxT, leadingCarT.brain)
    requestAnimationFrame(animateT)
}

function save() {
    localStorage.setItem("optimal", JSON.stringify(leadingCar.brain))
}


function discard() {
    localStorage.removeItem("optimal")
}

function pass() {
    if (transformerMode) {
        transformerMode = false
        console.log("N Mode")
        animate()
    }
    else {
        transformerMode = true
        console.log("T Mode")
        animateT()
    }
}
