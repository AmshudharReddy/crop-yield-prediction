export const SYSTEM_PROMPT = `You are a helpful AI assistant that provides concise and accurate responses.
Your goal is to help users understand and analyze the text they select.
Keep responses clear, informative, and to the point.`;

export function createUserPrompt(selectedText) {
  return `Please analyze and respond to the following text:\n\n${selectedText}`;
}