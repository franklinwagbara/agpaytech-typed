//const express = require("express");
//const { countriesController } = require("../controllers");

import express from "express";
import { countriesController } from "../controllers";

// Route constants ///////////////
const router = express.Router();
//////////////////////////////////

/*
    @Route  GET /api/countries/
    @Desc   Return file upload page
    @Access Public
*/
//router.get("/uploadpage", countriesController.countries_uploadPage_get);

/*
    @Route  GET /api/countries/
    @Desc   Returns all the countries data
    @Access Public
*/
//router.get("/", countriesController.countries_list_get);
router.get("/", countriesController.get_countries);

/*
    @Route  POST /api/countries/uploadcsv
    @Desc   import csv file to populate database
    @Access Public
*/
//router.post("/uploadcsv", countriesController.countries_uploadCSV_post);

export default router;
