# Self-Driving Car

### Abstract 
As the growth of a self-driving car (autonomous vehicle) industry, building an agent which can eventually be be able to drive itself will stimulate the understanding of basic autonomous vehicle and machine learning concepts.  

In this project, autonomous vehicle will be built on 2D space using neural network. Its objective is not to crash towards traffic, and road borders. Then transformer will be used to make the agent adapt to a new environment or to new restriction. These three parts' (i.e. 1; building autonomous vehicle, 2; use transformer to adapt to a new environment, 3; use transformer to adapt to a new restriction) details will be given and be discussed thoroughly in other branches of this repository. <br>

### Table of Contents
- [Introduction](#introduction)
- [Showcase](#showcase)
- [Objectives](#objectives)
- [Algorithms](#algorithms)

### Introduction 
In order to train a car how to drive itself, a neural network is required. The network is consists of three layers which are input layer, hidden layer 1, and output layer.  

![NN Image](/imgs/nn.png)

By calculating the randomized parameters which are weights and biases for each nodes, output layer will return an action either move forward, left, right, or reverse. Repeating the following procedure and remembering the previous result will eventually be trained.

### Showcase 
![showcase gif](/showcase/self-driving-showcase.gif)


### Algorithms 
Input layer will be given an offset detected by a ray sensor inferring a distance between the ray sensor and a border whether it's a car or a road. <br>
Hidden layer will use the input information then use the activation function (here, sigmoid function). <br>
Similarly, output layer will apply the activation function using the hidden layer's value then returns an action whether to move forward, left, or right. <br>
Linear Interpolation
$$x_a+x_b=x$$
$x+y=10$

Every nodes are fully connected and have its' own weights and biases. These parameters are initially randomized then will be modified by the previous generation. Every generation, the neural network will be mutated by adjusting the weights and biases resulting the car to be trained.
