import express from "express";
import { currenciesController } from "../controllers";

// Route constants ///////////////
const router = express.Router();
//////////////////////////////////

/*
    @Route  GET /api/currencies/
    @Desc   Return file upload page
    @Access Public
*/
router.get("/uploadpage", currenciesController.get_uploadPage);

/*
    @Route  GET /api/currencies/
    @Desc   Returns all the currencies data
    @Access Public
*/
router.get("/", currenciesController.get_currencies);

/*
    @Route  POST /api/currencies/uploadcsv
    @Desc   import csv file to populate database
    @Access Public
*/
router.post("/uploadcsv", currenciesController.post_uploadCSV);

export default router;
