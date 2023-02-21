import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";

const config = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
})

export const openai = new OpenAIApi(config);
