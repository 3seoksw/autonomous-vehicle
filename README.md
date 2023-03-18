# Autonomous Vehicle in Single Environment

### Table of Contents
<ul>
    <li><a href="#intro">Introduction</a></li>
    <li><a href="#env">Environment</a></li>
    <li><a href="#car">Car</a></li>
    <li><a href="#sensor">Sensor</a></li>
    <li><a href="#nn">Neural Network</a></li>
    <li><a href="#showcase">Showcase</a></li>
</ul>

<h3 id="intro">Introduction</h3>
In order to test transformer on autonomous vehicle, first and main objective is to successfully build an autonomous vehicle equipping neural network. To do so, building an adequate environment and designing a satisfactory car is necessary. <br>

In this branch, the way environment is built and the design of a vehicle will be discussed. <br>


<h3 id="env">Environment</h3>
First, with the aim of an self-driving system, appropriate environment is required. To test out whether the car drives itself, it requires obstacles. In this project, obstacles will be as follows: road borders and traffic. <br>

Simple and best way to find out if the vehicle is successfully driving itself is to observe collision. Therefore the road borders and traffic will be the given environment for the autonomous vehicle.

<h4>Road Borders</h4>
The project will use one-way, straight forward road. A number of lanes may differ based on the test set and this will be discussed in <b>other</b> branch. <br>

Detecting a collision on a road environment is to see whether the car crashes through road borders. Hence, whilst declaring a road class, declaring borders of the road is also necessary. <br>


<h4>Traffic</h4>
Next obstacle environment is a traffic. Since road is always full of other cars, great example of the obstacle for autonomous vehicle is a traffic. <br>
It will be sufficient enough to arrange multiple cars on a road on random lanes. Although cars of the traffic are dummy cars, traffic will be implemented with a car class. <br>

<h3 id="car">Car</h3>
The most import job of this project to design and build a car. Just like any other objects, car class will be used. Its key properties are as follows:
<ul>
    <li>Coordinates</li>
        <p>where the car is currently at</p>
    <li>Size of the car</li>
        <p>width and height of the car</p>
    <li>Speed</li>
        <p>current speed</p>
    <li>Acceleration</li>
        <p>current acceleration</p>
    <li>Max speed</li>
        <p>at max speed, acceleration no longer increases</p>
    <li>Friction</li>
        <p>in order to prevent car moving forward infinitely after brake</p>
    <li>Controls</li>
        <p>if the car is not a dummy, use brain to control the car</p>
    <li>Use brain</li>
        <p>if the car is not a dummy, use the following properties as well</p>
        <ul>
            <li>Brain</li>
                <p>neural network</p>
            <li>Sensor</li>
                <p>ray sensor to detect obstacles</p>
        </ul>
    <li>Score</li>
        <p>in order to find out optimal brain from multiple agents, keep scoring the cars</p>
</ul>

<h3 id="sensor">Sensor</h3>
Autonomous vehicle, which are not a dummy cars, is equipped with ray sensor to detect obstacles like road borders and traffic. <br>

<img src="/imgs/sensors.png">

When sensor detects obstacle, it calculates the distance (offset) between the sensor and the detected obstacle then show it with black colour.


<h3 id="nn">Neural Network</h3>
Input layer will be given an offset detected by a ray sensor inferring a distance between the ray sensor and a border whether it's a car or a road. <br>
Hidden layer will use the input information then use the activation function (here, sigmoid function). <br>
Similarly, output layer will apply the activation function using the hidden layer's value then returns an action whether to move forward, left, or right. <br>

<img src="/imgs/nn.png">
<br>

Every nodes are fully connected and have its' own weights and biases. These parameters are initially randomized then will be modified by the previous generation. Every generation, the neural network will be mutated by adjusting the weights and biases resulting the car to be trained.

<h3 id="showcase">Showcase</h3>

<img src="/showcase/self-driving-showcase.gif">


By calculating the randomized parameters which are weights and biases for each nodes, output layer will return an action either move forward, left, right, or reverse. Repeating the following procedure and remembering the previous result will eventually be trained.
