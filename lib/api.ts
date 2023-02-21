import { openai } from "./openapi";

interface OpenApiRequest {
    prompt: string;
    model: string;
}

export const openApiRequest = async (args: OpenApiRequest) => {
    try {
        const res = await openai.createCompletion({
            ...args,
            top_p: 1,
            temperature: 0.9,
            max_tokens: 1000,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
    
        const { data: { choices } } = await res;

        return choices.at(0)?.text ?? '';
    } catch (_error) {
        return 'ChatGPT did not get any answer for the given prompt';
    }
    
}