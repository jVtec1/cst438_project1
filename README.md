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

### Andy Espinoza 

- [My pull requests](https://github.com/jVtec1/cst438_project1/pulls?q=is%3Apr+author%3AjVtec1+is%3Aclosed)
- [Issues](https://github.com/jVtec1/cst438_project1/issues?q=is%3Aissue%20state%3Aopen%20assignee%3AjVtec1)

#### What was your role / which stories did you work on
I worked both on the frontent and backend, but mostly the backend. I setup the basic [navigation](https://github.com/jVtec1/cst438_project1/issues/7) between the app pages (once logged in) and provided the tab bar UI for users to switch between pages, which also included some visuals and icons for the tabs. I added and created the [database](https://github.com/jVtec1/cst438_project1/issues/11) for our app, allowing users to create accounts that we could store and retrieve, used to login. I also added [JUnit test functionality](https://github.com/jVtec1/cst438_project1/issues/26) to our app and created tests for most of our [pages](https://github.com/jVtec1/cst438_project1/issues/28) to ensure they properly rendered/worked. 

+ What was the biggest challenge?
    - The biggest challenge for me was getting the JUnit tests functionality added to the project and actually creating the Unit Tests.
  
+ Why was it a challenge?
    - There was barely any documentation I could find online for our specific project (Expo-go + React Native + Typescript + SQLiteDatabase) and I needed to use a specific npm library and React Native library.

+ How was the challenge addressed?
    - Was able to find just enough documention and videos online, along with a little copy and pasting error messages into google and chat gpt, to piece together how to properly implement and create tests for our app.
  
+ Favorite / most interesting part of this project
    - The most interesting part of this project for me was learning and using a new language in React.
  
+ If you could do it over, what would you change?
    - Maybe I could try taking more frontend work, as I mostly did backend work that the user doesn't see.
 
+ What is the most valuable thing you learned?
    - The most valuable thing I learned was communicating thoroughly and clearly with teammates so everyone knows whos working on what and when.


### Sergio Gonzalez 
1. Teammate's pull requests are [here](https://github.com/Jonathan-Welham/Bits-Bots/pulls/@CarolDanvers)
1. Teammate's Github issues are [here](https://github.com/FedericoRubino/cst438_project2/issues/created_by/@FedericoRubino)

#### What was your role / which stories did you work on
My role dealt with working both on the FrontEnd and the BackEnd. I set up a [FlatList](https://github.com/jVtec1/cst438_project1/issues/10) In order to display the vehicles currently in the apps selection along with the information required so our users can make their decision on the best car. I created the barebones [Information Page](https://github.com/jVtec1/cst438_project1/issues/5) when we were first starting out in order to display a user's info. After setting up the flatlist I was tasked with connecting the [Search Page & Recycler View](https://github.com/jVtec1/cst438_project1/issues/24) in order to ensure that the results on the list matched the search on both model and make of vehicle.

+ What was the biggest challenge? 
  To me the biggest challenge was getting familiar coding style of react-native. There was so much that I had too look into that a lot of the times I was just trying to learn and adapt as I completed my stories. Related to the stories, creating a flatlist was the biggest challenge. Setting it up and then having to merge it with the search options. 
+ Why was it a challenge?
  I think this goes back to the part of having to learn everything as I went. There was a steep learning curve for me snd especially when dealing with API retrieval and then adding the data into the flatlist, it became complicated to me. 
  + How was the challenge addressed?
    I Found the documentation and videos to aide me in the process of setting up the code so that it would run well together. I do owe some praise to chatgpt as well for helping me with some instances of when my code would just not work. 
+ Favorite / most interesting part of this project
  Favorite part of the project was learning how to retreive information from the API. I think it was nice seeing all the info translate in realtime onto our app. 
+ If you could do it over, what would you change?
  I wouldn't change much of the code but I would incorporate more into the project and add more functions that would maximize the API data that we used. I would also take the chance to communicate better with my teammates and bring up any issues or concerns that I have beforehand than waiting on the day its due.
+ What is the most valuable thing you learned?
  The most valuable thing I learned was that I shouldn't be afraid to ask for help especially from my teammates. It hinders my progress and without the help I dont get anything done. 


### Alberto Rodriguez 
1. Teammate's pull requests are [here](https://github.com/jVtec1/cst438_project1/pulls?q=is%3Apr+is%3Aclosed+author%3AAlbertoCsumb)
1. Teammate's Github issues are [here](https://github.com/jVtec1/cst438_project1/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AAlbertoCsumb)

#### What was your role / which stories did you work on

I worked on user tools and settings. Allowing the user to sign in using the sign in page  [Sign In page](https://github.com/jVtec1/cst438_project1/issues/3). allowing the user to enter the site after signing up. Later on allowing them to change their password within the site in the profile page [Edit Profile](https://github.com/jVtec1/cst438_project1/issues/6). Within the same sense i set up the delete account code, making sure the interaction with the database caused thie info to be deleted. [Delete Account](https://github.com/jVtec1/cst438_project1/issues/13). After the work had been done in the backend it allowed to work on my pages backend connected my sign in page with the database [SignUp Page backend](https://github.com/jVtec1/cst438_project1/issues/22).


+ What was the biggest challenge? 
One of the biggest challanged was time managenment and not remembering to allow comments for myself when comming back to the code at a differnt time. time managemnet was also a large issue for me.
  
  
+ Why was it a challenge?
  I didnt take the time to organize and set up comments that will help me understand how far i got and the next steps i need to make. also not having a great schedule when it comes to free time off of work.

  + How was the challenge addressed?
  I managed to find a good time thoughout the week to work on the project and complete my portions of the work.
+ Favorite / most interesting part of this project
  seeing how my portion connected to others, such as the sign up page working well with the database allowing the user in.
  
+ If you could do it over, what would you change?
 I would orgainze my work more effectly. allowing myself more time and a clearer idea of how i want my work to look. Manage my time well and cooridate with teammates about quetions on new ideas
 
+ What is the most valuable thing you learned?
  The ability to look for help in mutliple sources such as past projects or viedos posted of others working in similar projects


## Conclusion

- How successful was the project?
  - Think in terms of what did you set out to do and what actually got done?
    
    Our project was successful in the fact that we got the minimum requirements for it, including: displaying information from an API and having a logged-in user's information display.
    We wanted to do a lot more with our project, but we got the basic functionality of allowing a user to create an account and sign in, search for vehicles, and add and remove vehicles in cart. We also styled our app. 
- What was the largest victory?

    Getting difficult things to work, such as getting the database up and running, and figuring out how to get our API to work in the app in addition to connecting two code files that made those API calls. Completing the search page felt very good because it felt like our app was really coming together. 
- Final assessment of the project

  This was a good first project to learn React Native and Expo, and to practice putting together a frontend and backend of an application from scratch. 
