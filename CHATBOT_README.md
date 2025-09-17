# AI Chatbot with Speech-to-Text and Text-to-Speech

This project includes a real-time AI chatbot that integrates speech-to-text and text-to-speech functionality using Azure Cognitive Services and Google Gemini API.

## Features

- 🎤 **Speech-to-Text**: Convert spoken words to text using Azure Speech Services
- 🔊 **Text-to-Speech**: Convert AI responses to speech
- 🤖 **AI Chat**: Real-time conversation using Google Gemini API
- 📱 **Mobile UI**: Native React Native interface with modal design
- 💬 **Text Chat**: Direct text-based chatting with Gemini AI
- 🌾 **Farming Focus**: Specialized for agriculture and farming assistance

## Updated Implementation (2024)

### New Gemini Chat Service
A complete chatbot implementation has been added with the following components:

1. **`app/utils/geminiService.ts`**
   - Service class for Gemini API integration
   - Handles chat initialization and message sending
   - Manages conversation history

2. **`app/components/ChatModal.tsx`** (Updated)
   - Complete chat UI with message bubbles
   - Input field with send functionality
   - Loading states and error handling
   - Proper conversation flow

### How to Use the Chatbot

1. **Access**: Tap "Tap to Speak" or "Chat" button on home screen
2. **Chat**: Type farming questions and get AI responses
3. **Examples**: 
   - "What crops are best for monsoon season?"
   - "How to improve soil quality?"
   - "Pest control for tomatoes?"

### API Configuration
```typescript
// In app/utils/constants.ts
export const GEMINI_API_KEY = "AIzaSyAssNcQzQyz4cqJBaP6Kr77dYo77x3FTJM"
```

### Testing
Use `app/utils/testGemini.ts` to test the API functionality:
```typescript
import { testGeminiService } from './utils/testGemini';
// testGeminiService(); // Uncomment to run tests
```
- 💬 **Chat History**: View conversation history with timestamps

## Setup Instructions

### Prerequisites

1. **Azure Speech Services Account**
   - Create an Azure Cognitive Services Speech resource
   - Get your subscription key and region

2. **Google Gemini API Key**
   - Get API key from Google AI Studio
   - Enable Gemini Pro model access

### Installation

1. Install required dependencies:
```bash
npm install microsoft-cognitiveservices-speech-sdk @google/generative-ai
```

2. Configure API keys in `app/utils/constants.ts`:
```typescript
export const AZURE_KEY = "your-azure-subscription-key"
export const AZURE_ENDPOINT = "https://your-region.api.cognitive.microsoft.com/"
export const AZURE_REGION = "your-region"
export const GEMINI_API_KEY = "your-gemini-api-key"
```

### Usage

1. **Home Screen Integration**
   - Tap the large microphone button to open the chat modal
   - Or use the chat button in the action buttons section

2. **Voice Chat Flow**
   - Press and hold the microphone button in the modal
   - Speak your message
   - The AI will respond with both text and speech

3. **Chat Features**
   - View conversation history
   - Clear chat history with trash icon
   - Close modal with X button

## File Structure

```
app/
├── components/
│   ├── ChatModal.tsx          # Main chat interface
│   └── Home.tsx              # Updated home with chat integration
├── hooks/
│   └── useChatbot.ts         # Chat state management hook
├── utils/
│   ├── speechService.ts      # Azure Speech Services wrapper
│   ├── geminiService.ts      # Google Gemini API wrapper
│   └── constants.ts          # API keys and configuration
└── types/
    └── index.d.ts           # TypeScript definitions
```

## Components Overview

### ChatModal
- Full-screen modal with chat interface
- Real-time speech recognition status
- Animated microphone button
- Scrollable message history
- Loading indicators for all states

### SpeechService
- `recognizeSpeech()`: Single speech recognition
- `synthesizeSpeech(text)`: Text-to-speech output
- `startContinuousRecognition()`: Continuous listening mode

### GeminiService
- `generateResponse(message)`: Get AI response
- `generateStreamResponse()`: Streaming response (future use)

### useChatbot Hook
- Manages all chat state
- Handles speech recognition and synthesis
- Integrates with Gemini API
- Provides loading states

## Permissions

Add these permissions to your app configuration:

**iOS (ios/YourApp/Info.plist):**
```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for voice chat</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app needs speech recognition for voice commands</string>
```

**Android (android/app/src/main/AndroidManifest.xml):**
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

## Troubleshooting

### Common Issues

1. **Speech Recognition Not Working**
   - Check microphone permissions
   - Verify Azure subscription key and region
   - Ensure internet connectivity

2. **Text-to-Speech Silent**
   - Check device volume settings
   - Verify Azure Speech Services configuration
   - Test with different voice settings

3. **Gemini API Errors**
   - Verify API key is correct
   - Check API quota and billing
   - Ensure network connectivity

### Error Handling

The app includes comprehensive error handling:
- Speech recognition failures show user-friendly alerts
- Network errors are caught and displayed
- Loading states prevent multiple simultaneous operations

## Customization

### Voice Settings
Modify voice characteristics in `speechService.ts`:
```typescript
this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
this.speechConfig.speechRecognitionLanguage = "en-US";
```

### UI Theming
The chat interface uses Tailwind CSS classes and can be customized by modifying the className properties in `ChatModal.tsx`.

### AI Personality
Customize the AI responses by modifying the prompt or adding context in `geminiService.ts`.

## Performance Notes

- Speech recognition runs locally on device when possible
- Text-to-speech caches audio for better performance
- Chat history is stored in component state (consider persisting for production)
- Network requests are debounced to prevent spam

## Future Enhancements

- [ ] Persistent chat history
- [ ] Voice activity detection
- [ ] Multiple language support
- [ ] Conversation context memory
- [ ] Push-to-talk vs continuous listening toggle
- [ ] Voice command shortcuts
- [ ] Offline speech recognition fallback