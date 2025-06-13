import axios from "axios";
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

//Razmisliti kasnije o ubacivanju authentication signatures.
export const cloundinaryUplodImage = async (fileImage) => {
  const formData = new FormData();
  formData.append("file", fileImage);
  formData.append("upload_preset", "dog-photos");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`,
      formData
    );
    const image = response.data;
    return image.url;
  } catch (err) {
    throw new Error(err.message);
  }
};
