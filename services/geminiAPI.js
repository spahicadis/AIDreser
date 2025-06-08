import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY})


//Command review feature
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
    { text: prompt + "You are the best dog trainer in the world. Please answer the question about the dog in the picture. If the dog executes the command well in the answer to the first word, put Yes and then the praise text. If the dog does not perform the command well, then write No for the first word and the rest of the text advice on how to do better, also if it does not perform the command well, write below, if you do not manage with this command, feel free to contact me in the Ask the Trainer section. IMPORTAN let the all text be in Croatian(dont mix english and croatina). IMPORTAN dont answer with english words like YES and NO. Can you response with JSON object. Can you answer with a JSON object? Key status, rating, message. The status contains the value yes or no depending on whether the dog successfully executes the command. The rating contains a value from 1-5, if the dog executes the command perfectly, give it 5 or 4. The rest 3 or 2 or 1. The message contains text with this information for the user."}
  ],
})

function extractJsonFromCodeBlock(text) {
  const match = text.match(/```(?:json)\s*([\s\S]*?)```/)//Koristimo regex za izvlacenje teksta(JSON) koji je unutar code blocka
  if(match) { //Ako je match pronaden vraca samo taj sadrzaj unutar tj. cisti JSON string bez md/code blocka
    return match[1]
  }
  return result.text
}

const cleanJson = extractJsonFromCodeBlock(result.text)

return JSON.parse(cleanJson)

}


//Ask trainer feature
export const ask_trainer = async(obj) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      { text: 
      `You are the best dog trainer in the world. The user asked a question about this command: ${obj.command}. The content of the question is: ${obj.question}. IMPORTANT: Reply in Croatian language. Provide a clear, simple, and concise answer in plain text. DO NOT USE MARKDOWN, bullet points, bold, italic, or any formatting. Answer in a friendly and professional tone, focusing on practical advice.`
      }
    ]
  })
  return response.text
}