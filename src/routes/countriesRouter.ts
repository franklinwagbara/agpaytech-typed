import express from "express";
import { countriesController } from "../controllers";
import { ICountry, IService } from "../interfaces";
import { paginateResults } from "../middlewares";
import { countriesService } from "../services";

// Route constants ///////////////
const router = express.Router();
//////////////////////////////////

/*
    @Route  GET /api/countries/
    @Desc   Return file upload page
    @Access Public
*/
router.get("/uploadpage", countriesController.get_uploadPage);

/*
    @Route  GET /api/countries/
    @Desc   Returns all the countries data
    @Access Public
*/
router.get("/", countriesController.get_countries);

/*
    @Route  POST /api/countries/uploadcsv
    @Desc   import csv file to populate database
    @Access Public
*/
router.post("/uploadcsv", countriesController.post_uploadCSV);

export default router;
