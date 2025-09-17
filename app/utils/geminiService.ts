import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./constants";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

class GeminiService {
  private ai: GoogleGenAI;
  private chat: any = null;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY
    });
  }

  async initializeChat(initialHistory: ChatMessage[] = []) {
    try {
      // Convert our message format to Gemini's expected format
      const history = initialHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      this.chat = this.ai.chats.create({
        model: "gemini-2.5-flash",
        history: history
      });

      return true;
    } catch (error) {
      console.error("Error initializing chat:", error);
      return false;
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      if (!this.chat) {
        await this.initializeChat();
      }

      const stream = await this.chat.sendMessageStream({
        message: message
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
      }

      return fullResponse;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message to Gemini");
    }
  }

  async sendMessageWithHistory(message: string, chatHistory: ChatMessage[]): Promise<string> {
    try {
      // Reinitialize chat with current history
      await this.initializeChat(chatHistory);
      return await this.sendMessage(message);
    } catch (error) {
      console.error("Error sending message with history:", error);
      throw new Error("Failed to send message to Gemini");
    }
  }

  resetChat() {
    this.chat = null;
  }
}

export const geminiService = new GeminiService();