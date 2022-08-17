# LAP 2 Portfolio Week Project Habit Tracker Server Side

This is the server side repository of a habit tracker website.The client side repository of this website can be found [here](https://github.com/LAP2GroupProject/client-side). The client side is responsible for interacting with the server side to display user inputs upon request. The server side repository is responsible for taking in user's habit inputs and storing them, so they can be accessed for display on the user's request. This server side project was deployed on [Heroku](https://id.heroku.com) and can be found [here](https://habit-tracker-118.herokuapp.com/). This project makes use of the MVC (Model-View-Controller) pattern, for its software design, to implement user interfaces, data and control logic.

## Installation & usage

### Installation

- Use **_git clone_** to clone the repository.
- Use **_git init_** to get the most update version of the repository.
- Download the repository at the top of this GitHub page.
- Use **_git pull_** to get the most update version of the repository once inside a terminal.

#### **bash scripts/startDev.sh**

- starts client, api & db services.
- runs db migrations.
- seeds db for development.
- serves client on localhost:8080.
- serves api on localhost:3000.

#### **bash scripts/startTest.sh**

- starts api & db services.
- runs db migrations.
- attaches to api container and triggers full test run.
- no ports mapped to local host.

#### **bash scripts/teardown.sh**

- stop all running services.
- removes containers.
- removes volumes.

### Usage

1. Open project in a code editor.
1. Navigate into the client folder.
1. Open index.html file with live server.
1. Project will run in browser.

## Changelog

### server.js

- [Link to server.js](./api/server.js)
- Uses routes required from the [routes](./api/routes/) folder.

### index.js

- [Link to index.js](./api/index.js)
- Listens on port 3000.

## Bugs

- [Your Completed Habits](./client/user_habit_completed.html) page shows all habits in the database instead of those belonging to the current user.
- Non logged in users can still access all pages.

## Wins & Challenges

### Wins

- Link server side with client side.
- Achieving a minimum of 60% coverage.
- Using [Thunder](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) to check post requests.

### Challenges

- Getting habits of logged in user instead of all habits.
- Deploying to [Heroku](https://id.heroku.com) with a PostgreSQL database.
- Designing database.
