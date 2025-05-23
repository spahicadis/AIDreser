import { GoogleGenAI } from "@google/genai";



const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY})



export const image_visualizer = async(image_url, prompt) => {

  const imageBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image_url);
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
    { text: prompt}
  ],
})
console.log(result.text)

}