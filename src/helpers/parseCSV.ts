import parseError from "./parseError";
import csv from "csvtojson";

const parseCSV = async (filepath: string) => {
  try {
    const data = await csv().fromFile(filepath);
    return data;
  } catch (error) {
    return parseError(error);
  }
};

export default parseCSV;
