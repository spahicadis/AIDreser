import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY})

export const image_visualizer = async(image, prompt) => {

  const imageBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Extract base64 part
      resolve(base64String);
    };
    reader.onerror = reject;
  });


const result = await ai.models.generateContent({

  model: "gemini-2.0-flash",
  contents: [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    },
    { text: prompt + "You are the best dog trainer in the world. Please answer the question about the dog in the picture. If the dog executes the command well in the answer to the first word, put Yes and then the praise text. If the dog does not perform the command well, then write No for the first word and the rest of the text advice on how to do better, also if it does not perform the command well, write below, if you do not manage with this command, feel free to contact me in the Ask the Trainer section. IMPORTAN let the all text be in Croatian(dont mix english and croatina)."}
  ],
})
return result.text

}