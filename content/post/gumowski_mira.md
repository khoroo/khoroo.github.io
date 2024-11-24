+++
title = "Gumowski-Mira Mapping Rendering"
date = 2024-11-24
[extra]
math = true
+++

The Gumowski-Mira mapping is defined as:  

$x_{n+1} = y_n + \mu x_n + \frac{2(1-\mu)x_n^2}{1+x_n^2} + \alpha(1-\beta y_n^2)y_n$  

$y_{n+1} = -x_n + \mu x_{n+1} + \frac{2(1-\mu)x_{n+1}^2}{1+x_{n+1}^2}$  

where:  

$\mu \in [-1,1]$  

$\alpha \in [0,1]$  

$\beta \in [0,1]$  

The rotating header images of this blog are generated using this mapping with various parameters within their respective domains. Each visualization is created by iterating the system from $n=2000$ to $n=20000$ to capture the stable patterns.
