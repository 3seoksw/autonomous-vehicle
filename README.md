# Self Driving Car (Javascript)

### Table of Contents
<ul>
    <li><a href="abstract">Abstract</a></li>
    <li><a href="#intro">Introduction</a></li>
    <li><a href="#showcase">Showcase</a></li>
    <li><a href="#algorithms">Algorithms</a></li>
</ul>

<h3 id="abstract">Abstract</h3>
For the better understanding of a basic neural network, the following project's main priority is to implement a neural network from scratch which will eventually learn how to drive by itself. <br>
Given a road and a traffic, objective of the car is to not crash to the traffic or borders of the road using ray sensors.

<h3 id="intro">Introduction</h3>
In order to train a car how to drive itself, a neural network is required. The network is consists of three layers which are input layer, hidden layer 1, and output layer. <br>
<img src="/imgs/nn.png">

By calculating the randomized parameters which are weights and biases for each nodes, output layer will return an action either move forward, left, right, or reverse. Repeating the following procedure and remembering the previous result will eventually be trained.

<h3 id="showcase">Showcase</h3>
<img src="/showcase/addLanes.gif" width="200%" height="200%">


<h3 id="algorithms">Algorithms</h3>
Input layer will be given an offset detected by a ray sensor inferring a distance between the ray sensor and a border whether it's a car or a road. <br>
Hidden layer will use the input information then use the activation function (here, sigmoid function). <br>
Similarly, output layer will apply the activation function using the hidden layer's value then returns an action whether to move forward, left, or right. <br>
<br>

Every nodes are fully connected and have its' own weights and biases. These parameters are initially randomized then will be modified by the previous generation. Every generation, the neural network will be mutated by adjusting the weights and biases resulting the car to be trained.
