![COMAP Compass website image](./math-modeling-papers-website/assets/COMAP-Compass-Website.png "COMAP Compass Website")

# COMAP Compass
CSCI 367 FINAL Database/Web Programming Project

By Kade, Matthew, and Anthony

## Overview
### Inspiration:
Each year, the Consortium for Mathematics and its Applications (COMAP) hosts an international math modeling competition for undergraduate students. Over a span of 100 hours, teams of up to three tackle one of several open math modeling questions for the opportunity to learn about the math modeling process and flex their creative problem-solving skills. For teams interested in taking part in these competitions, one of the best pieces of advice is to take a look at what other teams have done previously and see what methods, styles, or strategies have been used before that you can use too. Our website, COMAP Compass, is designed to help these participants find winning papers from previous COMAP competitions that can provide them with this sort of helpful information.

### Technology Stack:
We used the following tools to create this website:
* MySQL: Database for math modeling papers
* Docker: Simplified deployment and dependency management for the database
* Node.js: Used for the backend API and server
* Express: A framework for simplifying API creation in Node.js
* HTML, CSS, JavaScript: Coding UI and frontend for website
* GitHub: Code management system

### Functionality
The user may enter part or all of a keyword and a table will display with all of the papers that used that keyword. If the user would rather see all papers at once, they can search without entering a keyword. There are also filters for the years and problem types to help narrow the search.

## How to run the website
### Software to install
* Docker Desktop: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
* Node.js: [Download Node.js](https://nodejs.org/en)

### Start the database
Navigate to the project folder and then into the math-modeling-papers-database folder:

```bash
cd math-modeling-papers-database
```

Run the Docker Compose command to create the Docker container for the MySQL database:

```bash
docker-compose up -d
```

### Running the backend server

Navigate back to the parent directory using `cd ..` and get to the math-modeling-backend folder:

```bash
cd math-modeling-backend
```

Then run the following command to start the server:

```bash
node server.js
```

> [!NOTE]
> If you get an error, try running `npm insall express` first.

### Running the website

Now that the server is running, open another terminal and navigate to the math-modeling-papers-website folder.
Run this command:

```bash
npx serve .
```

Paste the local link it gives you into your web browser.

If you don't want to install serve, you can instead copy the path of the index.html file located in the math-modeling-papers-website folder and paste it into your browser's address bar.