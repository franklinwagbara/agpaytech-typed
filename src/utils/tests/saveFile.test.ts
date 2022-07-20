import fileUpload from "express-fileupload";
import saveFile from "../saveFile";

beforeAll(() => {
  (console.log as any) = jest.fn().mockReturnValue(null);
  (console.error as any) = jest.fn().mockReturnValue(null);
});
describe("saveFile", () => {
  describe("when saving a file", () => {
    describe("if save was successful", () => {
      it("should save the file", async () => {
        const file: any = { UploadFile: "csvFile" };
        file.mv = jest.fn().mockResolvedValue(1);
        await saveFile(file);
        expect(file.mv).toBeCalled();
      });
    });

    describe("if save failed", () => {
      it("should return an error field in result", async () => {
        const file: any = { UploadFile: "csvFile" };
        file.mv = jest.fn().mockRejectedValue("error");
        const res = await saveFile(file);
        expect(res?.error).toBeDefined();
      });
    });
  });
});
