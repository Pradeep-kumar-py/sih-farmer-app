import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Farm {
  id: string;
  name: string;
  location: string;
  size: string;
  cropType: string;
  plantedDate: string;
  status: 'Growing' | 'Ready to Harvest' | 'Harvested';
}

interface MarketPrice {
  id: string;
  crop: string;
  mandi: string;
  price: number;
  unit: string;
  lastUpdated: string;
}

const More = () => {
  const [activeTab, setActiveTab] = useState<'farms' | 'market'>('farms');

  // Sample data for farms - in real app, this would come from API/database
  const farms: Farm[] = [
    {
      id: '1',
      name: 'Field A',
      location: 'North Block, Sector 1',
      size: '2.5 acres',
      cropType: 'Wheat',
      plantedDate: '2024-10-15',
      status: 'Growing'
    },
    {
      id: '2',
      name: 'Field B',
      location: 'South Block, Sector 2',
      size: '1.8 acres',
      cropType: 'Rice',
      plantedDate: '2024-09-20',
      status: 'Ready to Harvest'
    },
    {
      id: '3',
      name: 'Field C',
      location: 'East Block, Sector 3',
      size: '3.2 acres',
      cropType: 'Corn',
      plantedDate: '2024-08-10',
      status: 'Harvested'
    }
  ];

  // Sample data for market prices - in real app, this would come from API
  const marketPrices: MarketPrice[] = [
    {
      id: '1',
      crop: 'Wheat',
      mandi: 'Central Mandi',
      price: 2200,
      unit: 'per quintal',
      lastUpdated: '2024-12-17 10:30 AM'
    },
    {
      id: '2',
      crop: 'Rice',
      mandi: 'Agricultural Market',
      price: 2800,
      unit: 'per quintal',
      lastUpdated: '2024-12-17 09:45 AM'
    },
    {
      id: '3',
      crop: 'Corn',
      mandi: 'Farmers Market',
      price: 1950,
      unit: 'per quintal',
      lastUpdated: '2024-12-17 11:15 AM'
    },
    {
      id: '4',
      crop: 'Tomato',
      mandi: 'Vegetable Mandi',
      price: 45,
      unit: 'per kg',
      lastUpdated: '2024-12-17 08:20 AM'
    },
    {
      id: '5',
      crop: 'Onion',
      mandi: 'Central Mandi',
      price: 35,
      unit: 'per kg',
      lastUpdated: '2024-12-17 09:00 AM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Growing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ready to Harvest':
        return 'bg-green-100 text-green-800';
      case 'Harvested':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMyFarms = () => (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">My Farms</Text>
      {farms.map((farm) => (
        <View key={farm.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-semibold text-gray-800">{farm.name}</Text>
            <View className={`px-3 py-1 rounded-full ${getStatusColor(farm.status)}`}>
              <Text className="text-xs font-medium">{farm.status}</Text>
            </View>
          </View>
          <Text className="text-gray-600 mb-1">📍 {farm.location}</Text>
          <Text className="text-gray-600 mb-1">📏 Size: {farm.size}</Text>
          <Text className="text-gray-600 mb-1">🌾 Crop: {farm.cropType}</Text>
          <Text className="text-gray-600">📅 Planted: {new Date(farm.plantedDate).toLocaleDateString()}</Text>
        </View>
      ))}
      {farms.length === 0 && (
        <View className="bg-gray-50 rounded-lg p-8 items-center">
          <Text className="text-gray-500 text-center">No farms added yet</Text>
          <Text className="text-gray-400 text-center mt-2">Add your first farm to get started</Text>
        </View>
      )}
    </ScrollView>
  );

  const renderMarketPrices = () => (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Current Market Prices</Text>
      {marketPrices.map((price) => (
        <View key={price.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-lg font-semibold text-gray-800">{price.crop}</Text>
            <Text className="text-xl font-bold text-green-600">₹{price.price}</Text>
          </View>
          <Text className="text-gray-600 mb-1">📍 {price.mandi}</Text>
          <Text className="text-gray-600 mb-1">📦 {price.unit}</Text>
          <Text className="text-xs text-gray-500">Last updated: {price.lastUpdated}</Text>
        </View>
      ))}
      {marketPrices.length === 0 && (
        <View className="bg-gray-50 rounded-lg p-8 items-center">
          <Text className="text-gray-500 text-center">No market data available</Text>
          <Text className="text-gray-400 text-center mt-2">Please check back later</Text>
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      {/* Tab Header */}
      <View className="bg-white shadow-sm">
        <View className="flex-row">
          <TouchableOpacity
            className={`flex-1 py-4 ${activeTab === 'farms' ? 'border-b-2 border-green-500' : ''}`}
            onPress={() => setActiveTab('farms')}
          >
            <Text className={`text-center font-semibold ${activeTab === 'farms' ? 'text-green-600' : 'text-gray-500'}`}>
              My Farms
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-4 ${activeTab === 'market' ? 'border-b-2 border-green-500' : ''}`}
            onPress={() => setActiveTab('market')}
          >
            <Text className={`text-center font-semibold ${activeTab === 'market' ? 'text-green-600' : 'text-gray-500'}`}>
              Market Prices
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      {activeTab === 'farms' ? renderMyFarms() : renderMarketPrices()}
    </SafeAreaView>
  );
};

export default More;