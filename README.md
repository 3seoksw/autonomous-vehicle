# Self-Driving Car

### Abstract 
As the growth of a self-driving car (autonomous vehicle) industry, building an agent which can eventually to be able to drive itself will stimulate the understanding of basic autonomous vehicle and machine learning concepts.  

In this project, autonomous vehicle will be built on 2D space using neural network. Its objective is not to crash towards traffic, and road borders. Then transformer will be used to make the agent adapt to a new environment or to a new restriction. These three parts' (*i.e.* 1; building autonomous vehicle, 2; using transformer to adapt to a new environment, 3; using transformer to adapt to a new restriction) details will be given and be discussed thoroughly in other branches of this repository.  

### Table of Contents
- [Introduction](#introduction)
- [Showcase](#showcase)
- [Objectives](#objectives)
- [Algorithms](#algorithms)
    - [Linear Interpolation](#linear-interpolation)
    - [Get Intersection](#get-intersection)

### Introduction 
In order to train a car how to drive itself, a neural network is required. The network is consists of three layers which are input layer, hidden layer 1, and output layer.  

![NN Image](/imgs/nn.png)

By calculating the randomized parameters which are weights and biases for each nodes, output layer will return an action either move forward, left, right, or reverse. Repeating the following procedure and remembering the previous result will eventually be trained.

### Showcase 
#### Testing Autonomous Driving
![showcase gif](/showcase/self-driving-showcase.gif)

#### Detecting Lanes (Test Case 1)
<img src="/showcase/DL_test1.gif" width="200%">

#### Detecting Lanes (Test Case 2)
<img src="/showcase/DL_test2.gif" width="200%">


### Algorithms 
Input layer will be given an offset detected by a ray sensor inferring a distance between the ray sensor and a border whether it's a car or a road.  
Hidden layer will use the input information then use the activation function (here, sigmoid function).  
Similarly, output layer will apply the activation function using the hidden layer's value then returns an action whether to move forward, left, or right.

#### Linear Interpolation
[Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) is a method of curve fitting using linear polynomials to construct new data points within the range of a discrete set of know data points.  
Say, given two points, $P_A(a)$ and $P_B(b)$ on one dimensional space and we want to find a point where its located between $P_A$ and $P_B$ at m:n. Then we can use linear interpolation as follows:

$$a + (b - a) \times \frac{m}{m + n}$$

The above equation or rule can be applied on multi-dimensional space either. Given two points, $P_A(x_a, y_a)$ and $P_B(x_b, y_b)$ and want to locate a point where its on $t \times \overline{{P_B}{P_A}}$, say point $P_C$, the point can be expressed as follows:

$$ P_C(x_a + (x_b - x_a) \times t, y_a + (y_b - y_a) \times t) $$

#### Get Intersection
Using [linear interpolation](#linear-interpolation), an intersection of the given two points can be found.

$$
\begin{flalign*}
(x_b - x_a)t + (x_a - x_c) &= (x_d - x_c)u \cdots \space \cdots \space 1 \\
(y_b - y_a)t + (y_a - y_c) &= (y_d - y_c)u \cdots \space \cdots \space 2 
\end{flalign*}
$$
<br>

By multiplying $(x_d-x_c)$ to equation 1, $\text{Equation 2} \times {(x_d-x_c)}$,
$$(y_b - y_a)(x_d-x_c)t + (y_a - y_c)(x_d-x_c) = (y_d - y_c)(x_d-x_c)u \cdots \space \cdots \space 3$$
<br>
  
From $\text{equation 1}$, since $(x_d-x_c)u = (x_b - x_a)t + (x_a - x_c)$, *RHS* of the $\text{equation 3}$ can be changed as follows:
$$(y_b - y_a)(x_d-x_c)t + (y_a - y_c)(x_d-x_c) = (y_d - y_c)(x_b - x_a)t + (y_d - y_c)(x_a - x_c) \cdots \space \cdots \space 4$$
<br>

By solving the equation for $t$, we can get $t$ as follows:

$$
\begin{flalign*}
\{(y_b - y_a)(x_d-x_c) - (y_d - y_c)(x_b - x_a)\}t &= (y_d - y_c)(x_a - x_c) - (y_a - y_c)(x_d-x_c) \\
t &= \frac{(y_d - y_c)(x_a - x_c) - (y_a - y_c)(x_d-x_c)}{(y_b - y_a)(x_d-x_c) - (y_d - y_c)(x_b - x_a)} \cdots \space \cdots \space 5 
\end{flalign*}
$$
<br>

By using $\text{equation 5}$, we can get $t$, noting denominator of $t$ cannot be 0. $t$ can be expressed as an offset between the given two points with a range of $[0, 1]$. Steps above are coded in `/js/utils.js`.


<!--Every nodes are fully connected and have its' own weights and biases. These parameters are initially randomized then will be modified by the previous generation. Every generation, the neural network will be mutated by adjusting the weights and biases resulting the car to be trained.-->
