
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// List of models to try in order of preference/speed
const MODELS_TO_TRY = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-1.5-pro"
];

export const generateStoryFromImage = async (imageBase64: string) => {
    if (!API_KEY) {
        throw new Error("Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your env.");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    // Strip the data:image/jpeg;base64, prefix if present
    const base64Data = imageBase64.split(',')[1] || imageBase64;

    const prompt = `
        You are a writer for "Petty Mayo", a gossip and entertainment blog known for its sassy, "tea-spilling" tone.
        Look at this image and generate a sensational, clickbait-style news story about it.
        
        Return a JSON object with the following fields:
        {
            "headline": "The catchy title",
            "slug": "url-friendly-slug",
            "category": "One of: news, gossip, politics, entertainment, reality-tv, opinion",
            "body": "The article html body (use <p>, <b>, <i> tags). At least 3 paragraphs. Be dramatic."
        }
        
        Make it sound like a real Petty Mayo exclusive.
    `;

    let lastError = null;

    // Try each model in sequence until one works
    for (const modelName of MODELS_TO_TRY) {
        try {
            console.log(`Attempting generation with model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const response = await result.response;
            const text = response.text();

            // Clean up markdown code blocks if present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonStr); // Success! Return immediately.

        } catch (error: any) {
            console.warn(`Model ${modelName} failed:`, error.message);
            lastError = error;
            // Continue to next model...
        }
    }

    // If we get here, all models failed
    console.error("All Gemini models failed.");
    throw lastError || new Error("Failed to generate story with any available model.");
};
