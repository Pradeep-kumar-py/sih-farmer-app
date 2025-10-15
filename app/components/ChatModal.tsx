import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatMessage, geminiService } from '../utils/geminiService';
import SpeechToText from './SpeechToText';
import { Ionicons } from '@expo/vector-icons';

interface ChatModalProps {
    visible: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            text: 'Hello! I\'m your farming assistant. How can I help you today?',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Check if gemini service is initialized
        const checkInitialization = () => {
            if (geminiService.isInitialized()) {
                setIsInitialized(true);
            } else {
                setIsInitialized(false);
                console.warn('Gemini service not initialized properly');
            }
        };
        
        checkInitialization();
    }, [visible]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        if (!isInitialized) {
            Alert.alert('Service Unavailable', 'Chat service is not available. Please try again later.');
            return;
        }

        const userMessage: ChatMessage = {
            role: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await geminiService.sendMessageWithHistory(inputText, messages);

            const botMessage: ChatMessage = {
                role: 'model',
                text: response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Error', 'Failed to send message. Please try again.');

            const errorMessage: ChatMessage = {
                role: 'model',
                text: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        // Scroll to bottom when messages change
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
        >
            <SafeAreaView className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-800">Farming Assistant</Text>
                        {!isInitialized && (
                            <Text className="text-sm text-orange-600">⚠️ Service limited - some features may not work</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        onPress={onClose}
                        className="px-4 py-2 bg-gray-100 rounded-lg"
                    >
                        <Text className="text-gray-600 font-medium">Close</Text>
                    </TouchableOpacity>
                </View>

                {/* Messages */}
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 p-4"
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((message, index) => (
                        <View
                            key={index}
                            className={`mb-4 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <View
                                className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                                        ? 'bg-blue-500 rounded-br-none'
                                        : 'bg-gray-100 rounded-bl-none'
                                    }`}
                            >
                                <Text
                                    className={`text-base ${message.role === 'user' ? 'text-white' : 'text-gray-800'
                                        }`}
                                >
                                    {message.text}
                                </Text>
                                <Text
                                    className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                >
                                    {formatTime(message.timestamp)}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {isLoading && (
                        <View className="items-start mb-4">
                            <View className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                                <ActivityIndicator size="small" color="#666" />
                                <Text className="text-gray-500 text-sm mt-1">Thinking...</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Input */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="border-t border-gray-200"
                >
                    <View className="flex-row items-center p-4 space-x-3">
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Ask about farming, crops, weather..."
                            className="flex-1 border border-gray-300 rounded-xl px-4 text-base"
                            multiline
                            maxLength={500}
                            onSubmitEditing={sendMessage}
                            editable={!isLoading}
                        />
                        <TouchableOpacity
                            onPress={sendMessage}
                            disabled={!inputText.trim() || isLoading}
                            className={`px-6 py-3 rounded-full ${inputText.trim() && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                        >
                            <Text
                                className={`font-medium ${inputText.trim() && !isLoading ? 'text-white' : 'text-gray-500'
                                    }`}
                            >
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Mic Button */}
                    <View className="items-center pb-2">
                        <TouchableOpacity 
                            className="w-24 h-24 bg-green-500 rounded-full items-center justify-center shadow-lg"
                            onPress={() => {
                                // TODO: Add voice recording functionality
                                Alert.alert('Voice Input', 'Voice recording feature coming soon!');
                            }}
                        >
                            <Ionicons name="mic" size={64} color="white" />
                        </TouchableOpacity>
                    </View>
                    <SpeechToText/>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    )
}

export default ChatModal