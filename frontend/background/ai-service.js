class AIService {
  constructor() {
    this.session = null;
    this.systemPrompt = `You are a helpful AI assistant that provides concise and accurate responses.
Your goal is to help users understand and analyze the text they select.
Keep responses clear, informative, and to the point.`;
  }

  async ensureSession() {
    if (!this.session) {
      try {
        this.session = await chrome.aiOriginTrial.languageModel.create({
          systemPrompt: this.systemPrompt
        });
      } catch (error) {
        console.error('Failed to create AI session:', error);
        throw new Error('Could not initialize AI service');
      }
    }
    return this.session;
  }

  async getResponse(text) {
    try {
      const session = await this.ensureSession();
      return await session.prompt(`Please analyze and respond to the following text:\n\n${text}`);
    } catch (error) {
      console.error('AI Response Error:', error);
      throw new Error('Failed to get AI response');
    }
  }
}