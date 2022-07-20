import parseCSV from "../parseCSV";
import csv from "csvtojson";

jest.mock("csvtojson");

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});
describe("parseCSV", () => {
  describe("when parsing CSV file", () => {
    describe("if parsing is successful", () => {
      beforeEach(() => {});
      it("should return data object", async () => {
        const _csv = {
          fromFile: jest.fn().mockReturnThis(),
        };

        (csv as any).mockReturnValueOnce(_csv);

        await expect(parseCSV("filename")).resolves.toBeDefined();
        expect(csv).toBeCalledTimes(1);
      });
    });

    describe("if parsing failed", () => {
      beforeEach(() => {});
      it("should return data object", async () => {
        jest.clearAllMocks();
        const _csv = {
          fromFile: jest.fn().mockReturnThis(),
        };

        (csv as any).mockReturnValueOnce(
          _csv.fromFile.mockRejectedValue("filename")
        );

        await expect(parseCSV("filename")).resolves.toBeDefined();
      });
    });
  });
});
