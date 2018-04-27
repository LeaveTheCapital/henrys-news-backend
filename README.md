# HENRYS NEWS - A UNIQUE TWIST ON THE NORTHCODERS NEWS API

I Have created a restful API based on the Norchoders News Api (which can be viewed here http://northcoders-news-api.herokuapp.com/). Using a MongoDB database hosted with mLab, my functioning API is hosted at https://henrys-news.herokuapp.com/api/
The main goals for this project were to get to grips with Mongo and Mongoose, learn to deploy a project into production, practice complex Promise chains and use throrough TDD throughout including for error handling.

## Getting Started

These instructions will get you a copy of the API up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need an understanding of core JavaScript as well as Mongo and Mongoose. You will need a development environment on your machine and potentially some command line skills.

### Installing

Run npm install in the command line to get the required dependencies.

```
npm install -D
```

To initially seed your database, run the seed:dev script

```
npm run seed:dev
```

To start the server running locally at port 9021, use the following script

```
npm run dev
```

Then you should be able to access the api and make get requests as per the options here:

```
localhost:9021/api
```

## Running the tests

Run npm -D to install developer dependencies (chai and supertest).
Run npm test to run the automated tests.

Before each set of tests, the test database is reseeded

### End to end tests for each route

These tests check that the data is in the required format and has the correct http status code.

```
expect get requests to have a status 200 and return the correct data
```

Error handling tests provide a bad request of some sort and then check the status code and error message

```
expect bad put requests to /api/comments/comment_id have a status 400 and leave the vote count unchanged
```

## Deployment

To deploy on a live system, follow the instructions at mLab to seed your database there and then set up a Heroku app, link it to your fork of this GitHub repo and set up your environment variables.

## Built With

* [mLab](https://mlab.com/) - Used to host the mongoDB database
* [Heroku](https://www.heroku.com/) - Dependency Management
* [faker](https://www.npmjs.com/package/faker) - Used to generate random comments

## Contributing

Please don't contribute, if you want to study then join the Northcoders bootcamp and you can fork your own version!!

## Versioning

For the versions available, see the [tags on this repository](https://github.com/LeaveTheCapital/BE-FT-northcoders-news/tags).

## Authors

* **Henry Withers** - _Northcoder Student_ - [GitHub](https://github.com/LeaveTheCapital)

## Acknowledgments

* Thanks to my fellow members of March 19th Cohort
* Thanks to @A-R-H for tips on error handling
