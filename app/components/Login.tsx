import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      
      {/* Header */}
      <View className="px-6 pt-8 pb-4">
        <Text className="text-2xl font-bold text-gray-800 text-center">
          KisanSathi
        </Text>
      </View>

      {/* Farmer Avatar */}
      <View className="items-center py-8">
        <View className="w-48 h-48 rounded-full bg-orange-200 overflow-hidden">
          {/* Farmer illustration - using a placeholder for now */}
          <View className="w-full h-full bg-gradient-to-b from-orange-200 to-orange-300 items-center justify-center">
            <View className="w-32 h-32 bg-green-600 rounded-full items-center justify-center">
              <Ionicons name="person" size={60} color="white" />
            </View>
            {/* Simple landscape background */}
            <View className="absolute bottom-0 w-full h-16 bg-green-400 rounded-b-full" />
            <View className="absolute bottom-0 w-full h-8 bg-green-500" />
          </View>
        </View>
      </View>

      {/* Phone Number Section */}
      <View className="px-6 mb-8">
        <Text className="text-gray-600 text-sm font-medium mb-4 uppercase tracking-wide">
          ENTER PHONE NUMBER
        </Text>
        
        {/* Phone Number Input Boxes */}
        <View className="flex-row justify-between mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <View
              key={index}
              className="w-8 h-10 bg-gray-300 rounded border border-gray-400"
            />
          ))}
        </View>

        {/* Voice Input */}
        <View className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3 mb-6">
          <Ionicons name="mic" size={20} color="#6b7280" className="mr-3" />
          <Text className="flex-1 text-gray-500 ml-3">
            Tap & Speak or Enter Phone Number
          </Text>
          <TouchableOpacity>
            <Ionicons name="volume-high" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* OTP Section */}
      <View className="px-6 mb-8">
        <Text className="text-gray-600 text-sm font-medium mb-4 uppercase tracking-wide text-center">
          ENTER OTP
        </Text>
        
        {/* OTP Input Boxes */}
        <View className="flex-row justify-center space-x-3 mb-6">
          {otp.map((digit, index) => (
            <View
              key={index}
              className="w-12 h-12 bg-gray-300 rounded border border-gray-400 items-center justify-center"
            >
              <TextInput
                className="text-center text-lg font-semibold"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            </View>
          ))}
        </View>

        {/* Auto Proceed Text */}
        <Text className="text-center text-gray-600 text-sm">
          Once OTP is detected, you{'\n'}will proceed automatically
        </Text>
      </View>

      {/* Footer */}
      <View className="absolute bottom-6 right-6">
        <Text className="text-gray-400 text-xs">
          @next.update_09_25
        </Text>
      </View>
      <Pressable onPress={() => router.push("/(tabs)")} className="absolute bottom-6 left-6">
        <Text>Redirect</Text>
      </Pressable>
    </SafeAreaView>
    
  );
};

export default Login;
