import OpenAI from 'openai';
import { Message } from '../types';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export interface ChatRequest {
    systemPrompt: string;
    messages: Message[];
    userContext?: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<string> => {
    try {
        const formattedMessages = [
            {
                role: 'system' as const,
                content: `${request.systemPrompt}\n\n${request.userContext ? `User Context: ${request.userContext}` : ''}`,
            },
            ...request.messages.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 500,
        });

        return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to get AI response');
    }
};

export const streamChatMessage = async (
    request: ChatRequest,
    onChunk: (chunk: string) => void
): Promise<void> => {
    try {
        const formattedMessages = [
            {
                role: 'system' as const,
                content: `${request.systemPrompt}\n\n${request.userContext ? `User Context: ${request.userContext}` : ''}`,
            },
            ...request.messages.map(msg => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
            })),
        ];

        const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                onChunk(content);
            }
        }
    } catch (error) {
        console.error('OpenAI Streaming Error:', error);
        throw new Error('Failed to stream AI response');
    }
};
