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
router.get("/uploadpage", countriesController.getUploadPage);

/*
    @Route  GET /api/countries/
    @Desc   Returns all the countries data
    @Access Public
*/
router.get("/", countriesController.getAll);

/*
    @Route  POST /api/countries/uploadcsv
    @Desc   import csv file to populate database
    @Access Public
*/
router.post("/uploadcsv", countriesController.postUploadCSV);

export default router;
