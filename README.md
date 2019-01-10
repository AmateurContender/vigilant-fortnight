# bookingfinder
[![Build Status](https://travis-ci.org/AmateurContender/fantastic-octo-succotash.svg?branch=master)](https://travis-ci.org/AmateurContender/fantastic-octo-succotash) [![Maintainability](https://api.codeclimate.com/v1/badges/e472ff7d6bc5e508b2ca/maintainability)](https://codeclimate.com/github/AmateurContender/fantastic-octo-succotash/maintainability) 

## Details
- The code in the project follows the javascript standard style.
- The code is structured in the format recommended by express.
- All the logic is located in services/SearchService.js
- All the provided use cases are test cases
- The code coverage shows 100% for all checks in SearchService but it is just a metric
- An assumption is made that this api is going to be called by someone who has knowledge of what the params and response will look like
- An assumption is also made that the inputs will all be in the same format as the example
- An assumption is that the inputs are validated and the endpoint is only exposed to verified testers
- The tests take 50ms to pass, When the data set is increased 100x the tests take 180ms to pass. This is not a definitive performance test but gives a fair idea of the performance.

## Getting up and running
- Clone this repository
- Create a .env file based on the .env.sample file provided
- run npm install && npm run dev

## Running test suite
Mocha is the test suite used. The request is stubbed using [nock](https://github.com/nock/nock).
The test coverage report is presented after running the tests. The tests are only for the services file where all the logic rests.
Tests can be run using the command npm t or npm run test

## Making Requests
Any of the params can be changed or omitted
The options for orderBy are 'hotel' or 'price'

#### Curl Request
curl --request GET \
  --url 'http://localhost:4000/search?hotel=golden%20tulip&city=paris&price=%24100%3A%24200&date=10-10-2020%3A15-10-2020&orderBy=hotel'

#### Node Request 
var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:4000/search',
  qs:
   { hotel: 'golden tulip',
     city: 'paris',
     price: '$100:$200',
     date: '10-10-2020:15-10-2020',
     orderBy: 'hotel' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
