export async function createAISession() {
  return await chrome.aiOriginTrial.languageModel.create({
    systemPrompt: 'You are a helpful AI assistant that provides concise and accurate responses. Your goal is to help users understand and analyze the text they select. Keep responses clear, informative, and to the point.'
  });
}

export async function getAIResponse(session, text) {
  try {
    return await session.prompt(`Please analyze and respond to the following text:\n\n${text}`);
  } catch (error) {
    console.error('AI Response Error:', error);
    throw new Error('Failed to get AI response');
  }
}