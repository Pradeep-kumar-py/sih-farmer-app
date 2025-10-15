import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState(['', '', '', '', '', '', '', '', '', '']);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  // Refs for input focus management
  const phoneRefs = useRef<(TextInput | null)[]>([]);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newPhoneNumber = [...phoneNumber];
    newPhoneNumber[index] = value;
    setPhoneNumber(newPhoneNumber);

    // Auto-focus to next input
    if (value && index < 9) {
      phoneRefs.current[index + 1]?.focus();
    }
  };

  const handlePhoneKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !phoneNumber[index] && index > 0) {
      phoneRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (value && index === 5) {
      const completeOtp = newOtp.join('');
      if (completeOtp.length === 6) {
        verifyOtp(completeOtp);
      }
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const sendOtp = () => {
    const phone = phoneNumber.join('');
    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
    
    // Simulate OTP sending
    setIsOtpSent(true);
    Alert.alert('OTP Sent', `OTP has been sent to +91${phone}`);
    
    // Auto-focus first OTP input
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 500);
  };

  const verifyOtp = (otpCode: string) => {
    // Simulate OTP verification
    if (otpCode === '123456') {
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => router.push("/(tabs)") }
      ]);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const isPhoneComplete = phoneNumber.join('').length === 10;
  const isOtpComplete = otp.join('').length === 6;

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
        
        {/* Phone Number Display */}
        {phoneNumber.join('').length > 0 && (
          <View className="mb-4 p-3 bg-white rounded-lg border border-gray-300">
            <Text className="text-center text-lg font-semibold text-gray-800">
              +91 {phoneNumber.join('').replace(/(\d{5})(\d{5})/, '$1 $2')}
            </Text>
          </View>
        )}
        
        {/* Phone Number Input Boxes */}
        <View className="flex-row justify-between mb-6">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <View
              key={index}
              className={`w-8 h-12 rounded border items-center justify-center ${
                phoneNumber[index] ? 'bg-white border-green-500' : 'bg-gray-300 border-gray-400'
              }`}
            >
              <TextInput
                ref={(ref) => {phoneRefs.current[index] = ref}}
                className="text-center font-semibold w-full h-full"
                value={phoneNumber[index]}
                onChangeText={(value) => handlePhoneChange(value, index)}
                onKeyPress={({ nativeEvent }) => handlePhoneKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => setPhoneNumber(['', '', '', '', '', '', '', '', '', ''])}
            className="flex-1 py-3 px-6 rounded-lg bg-gray-500"
          >
            <Text className="text-white text-center font-semibold">Clear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={sendOtp}
            disabled={!isPhoneComplete}
            className={`flex-1 py-3 px-6 rounded-lg ${
              isPhoneComplete ? 'bg-green-600' : 'bg-gray-400'
            }`}
          >
            <Text className="text-white text-center font-semibold">
              {isOtpSent ? 'Resend OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voice Input */}
        {/* <View className="flex-row items-center bg-white rounded-lg border border-gray-300 px-4 py-3 mb-6">
          <Ionicons name="mic" size={20} color="#6b7280" className="mr-3" />
          <Text className="flex-1 text-gray-500 ml-3">
            Tap & Speak or Enter Phone Number
          </Text>
          <TouchableOpacity>
            <Ionicons name="volume-high" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* OTP Section */}
      {isOtpSent && (
        <View className="px-6 mb-8">
          <Text className="text-gray-600 text-sm font-medium mb-4 uppercase tracking-wide text-center">
            ENTER OTP
          </Text>
          
          {/* OTP Input Boxes */}
          <View className="flex-row justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <View
                key={index}
                className={`w-12 h-12 flex mr-2 rounded border items-center justify-center ${
                  digit ? 'bg-white border-green-500' : 'bg-gray-300 border-gray-400'
                }`}
              >
                <TextInput
                  ref={(ref) => {otpRefs.current[index] = ref}}
                  className="text-center text-lg font-semibold w-full h-full"
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                />
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => setOtp(['', '', '', '', '', ''])}
              className="flex-1 py-3 px-6 rounded-lg bg-gray-500"
            >
              <Text className="text-white text-center font-semibold">Clear OTP</Text>
            </TouchableOpacity>
            
            <Pressable
              // onPress={() => verifyOtp(otp.join(''))}
              onPress={() => router.push("/(tabs)")}
              disabled={!isOtpComplete}
              className={`flex-1 py-3 px-6 rounded-lg ${
                isOtpComplete ? 'bg-green-600' : 'bg-gray-400'
              }`}
            >
              <Text className="text-white text-center font-semibold">
                Verify OTP
              </Text>
            </Pressable>
          </View>

          {/* Auto Proceed Text */}
          <Text className="text-center text-gray-600 text-sm mt-4">
            Once OTP is detected, you{'\n'}will proceed automatically
          </Text>
          
          {/* Demo OTP Hint */}
          <Text className="text-center text-blue-600 text-xs mt-2">
            Demo OTP: 123456
          </Text>
        </View>
      )}

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
