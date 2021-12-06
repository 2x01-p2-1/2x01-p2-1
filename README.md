# Project Zoomaway
# Introduction
Meaningful gamefication is the use of gameful and playful layers to help a user find personal connections that motivate engagement with a specific context for long term change. Due to this concept, there have been developments in trying to make educational classes fun and interactive for students, in order to keep them motivated and interested in learning. 

Thus, the purpose of this project is to provide teachers with an intuitive method that they can use in order to make programming lessons enriching and engaging for their students by utilizing a web interface that can communicate with a robot car. We hope to create a user-friendly and interactive web interface to make learning more meaningful for the students.

# Running The Project
Ensure that you have [NodeJS](https://nodejs.org/en/) and [MongoDB Compass](https://www.mongodb.com/products/compass) installed on your machine.
1. Clone the project.
```
git clone https://github.com/2x01-p2-1/2x01-p2-1.git
```
2. Ensure that you cd into the Zoomaway folder.
```
cd Zoomaway
```
3. Install the project dependencies.
```
npm install
```
4. Start the project.
```
npm start
```
5. You should see the following output message.
```
> backend@1.0.0 start D:\voltz\Documents\Github\2x01-p2-1\ZoomAway
> node server.js

HTTP Server starting on localhost:3000
TCP Server Listening on Port:5000
```
6. Access the web interface by typing ```localhost:3000``` into your preferred web browser.

# Development Workflow
In terms of branch management, our team decided to create branches based on the various features that the website has to offer. Each member would then be in-charge of developing said features on the specified branches thus, only committing code to their allocated branches.

Upon completing their implementation of said features, they will initiate a pull request to the development branch. Once a pull request is opened, either Cheng Liang (Team Leader) or Aidil Irfan (Tech Lead) will review the potential changes and merge the changes into the development branch. 

# User Acceptance Test (UAT)
## Use Case Diagram
![Updated Use case for milestone 2 (3)](https://user-images.githubusercontent.com/71886838/144853161-c111824c-ab16-49cc-bfee-9fab6967b9bf.png)

## System State Diagram
![System State Diagram - Page 2 (4)](https://user-images.githubusercontent.com/71886838/144857450-4ed12e2c-7472-4959-a124-2fefc991fa17.png)

## System Test Case Video
https://user-images.githubusercontent.com/90236272/144888818-23144079-83a8-4371-8d95-7bc30319324f.mp4

## White-Box Testing
Our team has decided to perform a code coverage test for the Challenges controller class by using [MochaJS](https://mochajs.org/), [ChaiJS](https://www.chaijs.com/) and [SuperTest](https://www.npmjs.com/package/supertest).

The test code resides in the test folder as "challenges.js":
```
📦ZoomAway
 ┣ 📂controllers
 ┣ 📂helper
 ┣ 📂models
 ┣ 📂public
 ┃ ┣ 📂audio
 ┃ ┣ 📂css
 ┃ ┣ 📂img
 ┃ ┣ 📂js
 ┃ ┗ 📂MSP432 Files
 ┣ 📂routes
 ┣ 📂test
 ┃ ┗ 📜challenges.js
 ┣ 📂views
 ┃ ┣ 📂admin
 ┃ ┣ 📂common
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```
The test code tests the class's functionality to:
1. Create a Challenge
2. Delete a Challenge
3. Get all Challenges
4. Get a Challenge

Some of the functionalities listed requires an admin user to be logged in, thus, the test code will account for that as well.

To execute the test, execute this command in the Zoomaway directory.
```
npm test
```
Here is a video showcasing the test suite.

https://user-images.githubusercontent.com/90236272/144889016-b5434941-e69e-455f-8b88-83cf113748f3.mp4


If successful, the test should execute all 8 test cases successfully.
```
Challenges
    /POST Login
Result { formatter: [Function: formatter], errors: [] }
      ✔ it should login with correct credentials (242ms)
    /POST Login
Result { formatter: [Function: formatter], errors: [] }
      ✔ it should not login with incorrect credentials (212ms)
    /POST challenges
      ✔ it should not POST a challenge when not authenticated
    /POST challenges
      ✔ it should not POST a challenge with invalid fields (60ms)
    /POST challenges
Result { formatter: [Function: formatter], errors: [] }
      ✔ it should POST a challenge when authenticated and has valid fields (65ms)
    /GET challenges
61ae3c6e7235a19caffa83e6
      ✔ it should GET all challenges
    /GET/:id challenge
      ✔ it should GET a challenge by the given id
    /DELETE challenges
      ✔ it should DELETE a challenge (88ms)

  8 passing (1s)
```
