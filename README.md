# TODO: Make Title

### Abstract 
As the growth of a self-driving car (autonomous vehicle) industry, building an agent which can eventually to be able to drive itself will stimulate the understanding of basic autonomous vehicle and machine learning concepts.  

In this project, autonomous vehicle will be built on 2D space using neural network. Its objective is not to crash towards traffic, and road borders. Then transformer will be used to make the agent adapt to a new environment or to a new restriction. These three parts' (*i.e.* 1; building autonomous vehicle, 2; using transformer to adapt to a new environment, 3; using transformer to adapt to a new restriction) details will be given and be discussed thoroughly in other branches of this repository.  

### Table of Contents
- [Introduction](#introduction)
- [Showcase](#showcase)
- [Objectives](#objectives)
    - [Sensor](#sensor)
    - [Neural Network](#neural-network)
- [Algorithms](#algorithms)
    - [Linear Interpolation](#linear-interpolation)
    - [Get Intersection](#get-intersection)
- [Experiments](#experiments)
    - [Methods Used for Comparison](#methods-used-for-comparison)
    - [Transferring the Neural Network](#transferring-the-neural-network) 
    - [Overall Results](#overall-results)

### Introduction 
This is project is not only about building autonomous vehicle making it not to crash towards road borders and traffic, but also about make the car to adapt to a new environment or rules using predecented trained neural network. Main idea is to build a neural network consists of three layers: layer 1; input layer, 2; hidden layer, 3; output layer.  
Input layer will be fed with the offsets of the ray sensors of the car showing the distance between the car and the obstacle in the range of [0, 1].  
Hidden layer will take the offset values from input layer and calculate the result.  
Then the result will be passed to output layer. The values of the output layer will determine whether to move forward, left, right or backward which means output layer will directly control the car and the objective is to drive safely.  

How neural network is fed and trained will be discussed in [neural network](#neural-network) section.

### Objectives
Using [getIntersection() function](#get-intersection), we can get the offset between the given two points, which in this case are polynomial of the car and the obstacle such as points of road borders or traffic.  
For this, sensors and neural network should interact closely.

#### Sensor
Each cars that will be tested are equipped with ray sensors which its job is to detect obstacles and find an offset. As described, offset will be in the range of $[0, 1]$, showing that close to 0 means it's getting closer and close to 1 means it's getting far.  
Main algorithm for finding the offset is by using [linear interpolation](#linear-interpolation) and the details will be discussed thoroughly in the followed section.

#### Neural Network
As explained in the [introduction](#introduction), the network is consists of three layers which are input layer, hidden layer, and output layer.  

![NN Image](/imgs/NN_label.png)

Input layer is fed with offsets, the distance between the car and the obstacle in the range of $[0, 1]$.  
Hidden layer is to calculate output values in the range of $[0, 1]$ using input values. After the output is calculated using weights and biases from hidden layer for each level, the output consider to move forward, left, right, or reverse.  

As conventional neural network, the following network works the same way. The following is the equation showing how the output layer returns values.  
Given input matrix $I$, weight matrix for level 1 $W_1$, weight matrix for level 2 $W_2$, bias matrix for level 1 $B_1$, bias matrix for level 2 $B_2$, hidden value matrix for hidden layer $H$, and output matrix $O$, values are as follows: 

<!--TODO: Modify  Explain the notations-->
$$
I = \begin{bmatrix}
    i_0 \\
    \vdots \\
    i_5
    \end{bmatrix} \\
$$

$$
W_1 = \begin{bmatrix}
        w_{00}^1 & \dots & w_{50}^1 \\
        \vdots & \ddots & \vdots \\
        w_{06}^1 & \dots & w_{56}^1
    \end{bmatrix} \\
$$

$$
W_2 = \begin{bmatrix}
        w_{00}^2 & \dots & w_{60}^2 \\
        \vdots & \ddots & \vdots \\
        w_{03}^2 & \dots & w_{63}^2
    \end{bmatrix} \\
$$

$$
B_1 = 
\begin{bmatrix}
    b_0^1 \\
    \vdots \\
    b_6^1
\end{bmatrix} \\
$$

$$
B_2= 
\begin{bmatrix}
    b_0^2 \\
    \vdots \\
    b_3^2
\end{bmatrix} \\
$$

$$
O=
\begin{bmatrix}
    o_0 \\
    \vdots \\
    o_3
\end{bmatrix} \\
$$

Hidden values from hidden layer can be calculated as follows:

$$
\begin{align*}
    H &= I \times W_1 + B_1 \\
    &= \begin{bmatrix}
        i_0 \\
        \vdots \\
        i_5
    \end{bmatrix}
    \times
    \begin{bmatrix}
        w_{00}^1 & \dots & w_{50}^1 \\
        \vdots & \ddots & \vdots \\
        w_{06}^1 & \dots & w_{56}^1
    \end{bmatrix}
    +
    \begin{bmatrix}
        b_0^1 \\
        \vdots \\
        b_6^1
    \end{bmatrix} \\
    &= \begin{bmatrix}
    h_0 \\
    \vdots \\
    h_6
    \end{bmatrix}
\end{align*} \\
$$

$$
\therefore h_m = \sum_{n=0}^{5}{(i_n \times w_{nm}^1)} + b_{m}^1 \\
$$

Output values $o_0, o_1, o_2, o_3$ from output matrix $O$ denotes whether to move forward, left, right, or reverse respectively.

$$
\begin{align*}
    O &= 
    \begin{bmatrix}
        o_0 \\
        \vdots \\
        o_3
    \end{bmatrix} \\
    &= \begin{bmatrix}
        \text{forward} \\
        \text{left} \\
        \text{right} \\
        \text{reverse}
    \end{bmatrix}
\end{align*}
$$

Since the values are in the form of 0 or 1, output values indicate and can be calculated as follows: 

$$
\forall k, \text{where $k$} \in \{ 0, 1, 2, 3 \}, \\
o_k = 1: \text{move} \\
o_k = 0: \text{stay}
$$

$$
\begin{align*}
    O &= H \times W_2 + B_2 \\
    &= \begin{bmatrix}
    h_0 \\
    \vdots \\
    h_6
    \end{bmatrix}
    \times 
    \begin{bmatrix}
        w_{00}^2 & \dots & w_{60}^2 \\
        \vdots & \ddots & \vdots \\
        w_{03}^2 & \dots & w_{63}^2
    \end{bmatrix} 
    +
    \begin{bmatrix}
        b_0^2 \\
        \vdots \\
        b_3^2
    \end{bmatrix} \\
    &= \begin{bmatrix}
        o_0 \\
        \vdots \\
        o_3
    \end{bmatrix} \\
\end{align*} \\
$$

$$
\therefore o_k = \sum_{m=0}^{7}{(h_k \times w_{mk}^2)} + b_{k}^2 \\
$$

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
\begin{align*}
(x_b - x_a)t + (x_a - x_c) &= (x_d - x_c)u \cdots \space \cdots \space 1 \\
(y_b - y_a)t + (y_a - y_c) &= (y_d - y_c)u \cdots \space \cdots \space 2 
\end{align*}
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
\begin{align*}
\{(y_b - y_a)(x_d-x_c) - (y_d - y_c)(x_b - x_a)\}t = (y_d - y_c)(x_a - x_c) - (y_a - y_c)(x_d-x_c) \\
t = \frac{(y_d - y_c)(x_a - x_c) - (y_a - y_c)(x_d-x_c)}{(y_b - y_a)(x_d-x_c) - (y_d - y_c)(x_b - x_a)} \cdots \space \cdots \space 5 
\end{align*}
$$
<br>

By using $\text{equation 5}$, we can get $t$, noting denominator of $t$ cannot be 0. $t$ can be expressed as an offset between the given two points with a range of $[0, 1]$. Steps above are coded in `/js/utils.js`.

### Experiments
Test will be conducted by running several generations of the cars so that it drives itself eventually. Then the trained neural network will be transferred to a new environment where it has 5 lanes and required not to cross the lanes.

#### Methods Used for Comparison

#### Transferring the Neural Network

#### Overall Results
<!--Every nodes are fully connected and have its' own weights and biases. These parameters are initially randomized then will be modified by the previous generation. Every generation, the neural network will be mutated by adjusting the weights and biases resulting the car to be trained.-->
