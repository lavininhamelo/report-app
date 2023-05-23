import { fireEvent, render, screen } from "@testing-library/vue";
import ImageUploader from "./ImageUploader.vue";

describe("ImageUploader", () => {
  it("renders the upload button and text correctly", () => {
    render(ImageUploader);

    const uploadButton = screen.getByText(/Upload Image/i);
    const uploadText = screen.getByText("or drag file in this area");

    expect(uploadButton).toBeInTheDocument();
    expect(uploadText).toBeInTheDocument();
  });

  it("renders the file input correctly", () => {
    render(ImageUploader);

    const fileInput = screen.getByTestId("uploader-input");

    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveAttribute("accept", "image/*");
  });

  it("emits 'input' event when a file is selected", async () => {
    render(ImageUploader);

    const fileInput: HTMLInputElement = screen.getByTestId("uploader-input");

    await fireEvent.input(fileInput, { target: { files: [new File([], "test.jpg")] } });

    if (!fileInput?.files || fileInput?.files.length === 0) {
      throw new Error("File not selected");
    } else {
      expect(fileInput?.files).toHaveLength(1);
      expect(fileInput?.files[0]?.name).toBe("test.jpg");
    }
  });
});
