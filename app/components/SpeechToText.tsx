import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const SpeechToText = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const startRecognition = async () => {
    try {
      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        'YOUR_AZURE_SPEECH_KEY',   // 🔑 replace with your subscription key
        'YOUR_REGION'              // 🌍 e.g., "eastus"
      );

      speechConfig.speechRecognitionLanguage = 'en-US';

      // Get audio input from default microphone
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

      const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

      setIsRecognizing(true);

      recognizer.recognizeOnceAsync(result => {
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          setRecognizedText(result.text);
        } else {
          setRecognizedText('Speech not recognized. Try again.');
        }
        setIsRecognizing(false);
        recognizer.close();
      });
    } catch (error) {
      console.error('Recognition Error:', error);
      setRecognizedText('Error: ' + error);
      setIsRecognizing(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={isRecognizing ? 'Listening...' : 'Start Recognition'} onPress={startRecognition} />
      <Text style={{ marginTop: 20, fontSize: 16 }}>{recognizedText}</Text>
      <Text>hii</Text>
    </View>
  );
};

export default SpeechToText;