Project 1 for CST 438. This application will allow users to login or signup and search for vehicles to add and/or remove from their cart. Vehicle/user information will be displayed. 

Versions: 
Node - LTS version 22.18.0
React Native - ^0.79.5
Expo SDK - ~53.0.22

# Project 01 Retrospective and overview

<!-- [Video Walkthrough](https://www.youtube.com/watch?v=o-YBDTqX_ZU) -->
<!-- Ads have really ruined rick-rolling. -->
[Github Repo](https://github.com/jVtec1/cst438_project1)

## Overview
This is a virtual car dealership that allows users to add and remove cars from their cart, making use of an API we found [here](https://www.auto.dev/).

## Introduction

* How was communication managed

  We managed communication through Slack, messaging each other on a weekly basis.
* How many stories/issues were initially considered

  We initially considered/created 18 issues.
* How many stories/issues were completed

## Team Retrospective

### Jeslyn See

- [My pull requests](https://github.com/pulls?q=is%3Apr+archived%3Afalse+is%3Aclosed+author%3Ajeslynsee+repo%3AjVtec1%2Fcst438_project1)
- [Issues](https://github.com/jVtec1/cst438_project1/issues)

#### What was your role / which stories did you work on
I worked on both frontend and backend. I set up the basic layout of [Login page](https://github.com/jVtec1/cst438_project1/issues/2), also giving it basic restrictions. I completed the [search page dropdown functionality](https://github.com/jVtec1/cst438_project1/issues/9) with the API call filling the dropdown menus. I also set up the [checkout/my cart page](https://github.com/jVtec1/cst438_project1/issues/8) functionality and layout by creating a contexts folder and context file for cart functionality, covering [issue #14](https://github.com/jVtec1/cst438_project1/issues/14) and [issue #16](https://github.com/jVtec1/cst438_project1/issues/16). I created a [unit test](https://github.com/jVtec1/cst438_project1/issues/35) for the my cart page and styled both the search and my cart page. I also added a [confirm purchase](https://github.com/jVtec1/cst438_project1/issues/33) button to the checkout page. 

+ What was the biggest challenge?

  The biggest challenge was downloading the dependencies and setting up an unit test. 
+ Why was it a challenge?

  My project broke as I was downloading different dependencies, thinking it would get a step closer in troubleshooting to set up correct tests. 
  + How was the challenge addressed?

    My teammate was able to figure out what dependencies exactly to download and how to set up the test. With his help, I followed his testing format to create a unit test for one of the pages I was working on. 
+ Favorite / most interesting part of this project

  My favorite part of this project was realizing how much easier it was to do things in React Native than in Android Studio. 
+ If you could do it over, what would you change?

  As far as pacing went while doing the project, it felt like my team and I were on the right track. The only thing I would change is if I am going to try to do something that might break the project: changing folder names, downloading dependencies for unit tests, I would create a different branch to do it on, so I can just ignore it if everything goes bad. 
+ What is the most valuable thing you learned?

Time management and also make good comments, so my teammates understand what is happening in the file.

### Teammate
1. Teammate's pull requests are [here](https://github.com/Jonathan-Welham/Bits-Bots/pulls/@CarolDanvers)
1. Teammate's Github issues are [here](https://github.com/FedericoRubino/cst438_project2/issues/created_by/@FedericoRubino)

#### What was your role / which stories did you work on
Carol mostly worked on getting the app to run faster, better, and higher.  She did the best work possible but her contributions were overpowered and not well received by the fans.

+ What was the biggest challenge? 
  + Managing pull requests and merges
+ Why was it a challenge?
  + We were all new to git/github and not everyone followed convention
  + How was the challenge addressed?
  + I went to the TA for help and used ChatGPT and web resources to get more comfortable with git.
+ Favorite / most interesting part of this project
  + Finally getting the IDs from the API calls to store in the ROOM database
+ If you could do it over, what would you change?
  + I would get the ROOM database setup FIRST
+ What is the most valuable thing you learned?
  + Do the work early and document EVERYTHING


## Conclusion

- How successful was the project?
  - Think in terms of what did you set out to do and what actually got done?
- What was the largest victory?
- Final assessment of the project
