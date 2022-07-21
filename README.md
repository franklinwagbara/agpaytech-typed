# Agpaytech Frontend Coding Challenge

## Overview of this Project

This is a backend api for countries and currencies search.


## Dependencies

## Steps on how to run this project

- STEP 1: Clone this Repository
  - To clone this repository use this command: git clone https://github.com/franklinwagbara/agpaytech-typed.git
- STEP 2: Install the node modules
  - To install the node modules use this command: npm install or yarn install
- STEP 3: Access the endpoint url
  - Use API platforms like Postman to query the endpoints: base endpoint url is http://localhost:<PORTNUMBER>/api   --> PORTNUMBER defaults to 3000 || 500 depending on your environment settings.

## API Endpoints
- ### Countries Endpoint
  -To upload csv file containing list of countries use POST http://localhost:<PORTNUMBER>/api/countries/uploadcsv   --> via API platform like Postman or 
  - To upload csv through the a web brower use the url: http://localhost:<PORTNUMBER>/api/countries/uploadpage
  - To get the list of countries use GET http://localhost:PORTNUMBER/api/countries   --> Returns a paginated result
  - To query the countries dataset with optional query parameters use GET http://localhost:<PORTNUMBER>/api/countries?page=<number>&size=<number>&continent_code=AS for example   --> Returns a paginated result

- ### Currencies Endpoint
  - To upload csv file containing list of currencies use POST http://localhost:<PORTNUMBER>/api/currencies/uploadcsv   --> via API platform like Postman or 
  - To upload csv through the a web brower use the url: http://localhost:<PORTNUMBER>/api/currencies/uploadpage
  - To get the list of currencies use GET http://localhost:PORTNUMBER/api/currencies   --> Returns a paginated result
  - To query the currencies dataset with optional query parameters use GET http://localhost:<PORTNUMBER>/api/currencies?page=<number>&size=<number>&continent_code=AS for example   --> Returns a paginated result
