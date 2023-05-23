import service from "./index";

export async function uploadImage(image: File) {
    try {
      const formData = new FormData();
      formData.append("file", image);


  
      const response = await service.post("/new-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "user-reference": "123456789",
        },
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }