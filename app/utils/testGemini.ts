// Simple test for Gemini service
// You can run this in a Node.js environment to test the API

import { geminiService } from './geminiService';

async function testGeminiService() {
  console.log('Testing Gemini Service...');
  
  try {
    // Test 1: Simple message
    console.log('\n--- Test 1: Simple greeting ---');
    const response1 = await geminiService.sendMessage('Hello, introduce yourself as a farming assistant.');
    console.log('Response:', response1);

    // Test 2: Farming-specific question
    console.log('\n--- Test 2: Farming question ---');
    const response2 = await geminiService.sendMessage('What are the best crops to grow in India during monsoon season?');
    console.log('Response:', response2);

    // Test 3: Chat with history
    console.log('\n--- Test 3: Chat with history ---');
    const chatHistory = [
      { role: 'user' as const, text: 'I have a 5-acre farm in Punjab', timestamp: new Date() },
      { role: 'model' as const, text: 'That\'s great! Punjab has excellent farming conditions. What crops are you planning to grow?', timestamp: new Date() }
    ];
    
    const response3 = await geminiService.sendMessageWithHistory('What irrigation methods would you recommend?', chatHistory);
    console.log('Response with history:', response3);

    console.log('\n✅ All tests passed! Gemini service is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Uncomment the line below to run the test
// testGeminiService();

export { testGeminiService };
