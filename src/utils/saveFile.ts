//const path = require("path");
import fileUpload from "express-fileupload";
import path from "path";
import { ICountry, ICurrency, IResult } from "../interfaces";
import parseError from "./parseError";

const uploadPath = path.join(__dirname, "../../upload", "/");

const saveFile = async function (file: fileUpload.UploadedFile) {
  try {
    await file.mv(uploadPath + file.name);
  } catch (error) {
    console.error(error);
    return parseError(error);
  }
};

export default saveFile;
