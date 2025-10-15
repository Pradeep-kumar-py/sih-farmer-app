import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./constants";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chat: any = null;

  constructor() {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key is required");
      }
      this.ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY
      });
    } catch (error) {
      console.error("Error initializing GoogleGenAI:", error);
    }
  }

  async initializeChat(initialHistory: ChatMessage[] = []) {
    try {
      if (!this.ai) {
        throw new Error("GoogleGenAI not initialized");
      }

      // Convert our message format to Gemini's expected format
      const history = initialHistory
        .filter(msg => msg.text && msg.text.trim()) // Filter out empty messages
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        }));

      this.chat = this.ai.chats.create({
        model: "gemini-1.5-flash", // Use a more stable model
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
      if (!message || !message.trim()) {
        throw new Error("Message cannot be empty");
      }

      if (!this.chat) {
        const initialized = await this.initializeChat();
        if (!initialized) {
          throw new Error("Failed to initialize chat");
        }
      }

      // Try streaming first
      try {
        const stream = await this.chat.sendMessageStream({
          message: message.trim()
        });

        let fullResponse = '';
        for await (const chunk of stream) {
          if (chunk && chunk.text) {
            fullResponse += chunk.text;
          }
        }

        if (fullResponse.trim()) {
          return fullResponse.trim();
        }
      } catch (streamError) {
        console.warn("Streaming failed, trying direct message:", streamError);
      }

      // Fallback to direct message
      const response = await this.chat.sendMessage({
        message: message.trim()
      });

      return response.text || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message to Gemini");
    }
  }

  async sendMessageWithHistory(message: string, chatHistory: ChatMessage[]): Promise<string> {
    try {
      if (!message || !message.trim()) {
        throw new Error("Message cannot be empty");
      }

      // Reinitialize chat with current history
      const initialized = await this.initializeChat(chatHistory);
      if (!initialized) {
        throw new Error("Failed to initialize chat with history");
      }
      
      return await this.sendMessage(message);
    } catch (error) {
      console.error("Error sending message with history:", error);
      throw new Error("Failed to send message to Gemini");
    }
  }

  resetChat() {
    this.chat = null;
  }

  // Health check method
  isInitialized(): boolean {
    return this.ai !== null;
  }
}

export const geminiService = new GeminiService();