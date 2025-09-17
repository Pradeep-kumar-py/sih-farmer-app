import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ChatModal from './ChatModal';

const Home = () => {
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      <ScrollView className="flex-1">
        {/* Header with Today's Update */}
        <View className="mx-4 mt-6 mb-8">
          <View className="bg-white rounded-xl border-2 border-green-500 p-4">
            <Text className="text-lg font-bold text-gray-800 text-center mb-2">
              Today's Update
            </Text>
            <Text className="text-gray-600 text-center text-sm mb-1">
              Weather: 28°C, Sunny
            </Text>
            <Text className="text-gray-600 text-center text-sm">
              wind Speed: 10 km/h NW
            </Text>
          </View>
        </View>

        {/* Tap to Speak Button */}
        <View className="items-center mb-8">
          <TouchableOpacity 
            className="w-56 h-56 bg-green-600 rounded-full items-center justify-center shadow-lg"
            onPress={() => setIsChatModalVisible(true)}
          >
            <Ionicons name="mic" size={60} color="white" className="mb-2" />
            <Text className="text-white text-xl font-semibold">
              Tap to Speak
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-center space-x-4 mb-8 px-4">
          {/* Take Photo Button */}
          <Pressable className="flex-1 bg-white rounded-xl  items-center max-w-36">
            <Ionicons name="camera" size={32} color="#374151" className="mb-2" />
            <Text className="text-gray-700 font-medium text-center">
              Take Photo
            </Text>
          </Pressable>

          {/* Chat Button */}
          <Pressable 
            className="flex-1 bg-white rounded-xl items-center max-w-36"
            onPress={() => setIsChatModalVisible(true)}
          >
            <Ionicons name="chatbubble" size={32} color="#374151" className="mb-2" />
            <Text className="text-gray-700 font-medium text-center">
              Chat
            </Text>
          </Pressable>
        </View>

        <View className="flex-row text-[20px] font-bold p-2 justify-center space-x-4 mb-8 px-4 border-[1px] border-green-500 mx-4 rounded-xl">
          <Text className='text-[20px] font-bold'>Add Crop</Text>
        </View>

        {/* Latest News Section */}
        <View className="mx-4 mb-6">
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Ionicons name="newspaper" size={20} color="#059669" className="mr-2" />
              <Text className="text-lg font-bold text-gray-800">
                Latest News
              </Text>
            </View>
            
            {/* News Items */}
            <View className="space-y-3">
              <View className="flex-row items-start">
                <Text className="text-orange-500 font-bold mr-3 mt-1">1.</Text>
                <View className="flex-1 flex-row items-center">
                  <Text className="flex-1 text-gray-700 text-sm">
                    Govt. Launches New Crop Insurance Scheme
                  </Text>
                  <Ionicons name="checkmark" size={16} color="#10b981" className="ml-2" />
                </View>
              </View>
              
              <View className="flex-row items-start">
                <Text className="text-orange-500 font-bold mr-3 mt-1">2.</Text>
                <Text className="flex-1 text-gray-700 text-sm">
                  Monsoon Forecast looks Promising This Year
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Chat Modal */}
      <ChatModal
        visible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
      />

    </SafeAreaView>
  );
};

export default Home;
