# CRUD USERS API

### Server app built with Node.js and Typescript

### How to run

- clone this repository `git clone https://github.com/JimakPasha/crud-api-nodejs.git`
- go to app folder `cd crud-api-nodejs`
- go to `dev` branch
- run `npm install` to install the dependencies
- rename `.env.example` to `.env`

### Use the following scripts:

- run the application in development mode `npm run start:dev`
- run the application in production mode `npm run start:prod`
- run tests scenarios for API `npm run test`

### API Endpoints

- GET `api/users` get all users

- GET `api/users/${userId}` get user by ID

- POST `api/users` create new user

- PUT `api/users/${userId}` update existing user

- DELETE `api/users/${userId}` delete existing user

### Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

### Errors Types
- `400` — for GET, PUT, DELETE if userId is invalid (not uuid)
- `400` — for POST if request body does not contain required fields
- `404` — for GET, PUT, DELETE if record with `id === userId` doesn't exist
- `404` — for all if the passed url is incorrect
- `500` — internal server error

### Technologies used

- Node.js
- Typescript
- Nodemon
- Uuid
- Dotenv
- Cross-env
- Jest
- Supertest
- Prettier
- eslint

------------
Have fun! :)
