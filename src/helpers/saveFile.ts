//const path = require("path");
import fileUpload from "express-fileupload";
import path from "path";
import parseError from "./parseError";

const uploadPath = path.join(__dirname, "../../upload", "/");

const saveFile = function (file: fileUpload.UploadedFile) {
  try {
    file.mv(uploadPath + file.name, (error) => {
      console.log(error);
    });
  } catch (error) {
    return parseError(error);
  }
};

export default saveFile;
