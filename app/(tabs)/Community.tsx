import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  category: 'question' | 'tip' | 'market' | 'weather';
}

interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  icon: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'market'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'question' | 'tip' | 'market' | 'weather'>('question');

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Ramesh Sharma',
      authorAvatar: '👨‍🌾',
      time: '2 hours ago',
      content: 'My wheat crop is getting spots on the leaves. What should I do? Can anyone suggest?',
      likes: 12,
      comments: 8,
      isLiked: false,
      category: 'question'
    },
    {
      id: '2',
      author: 'Sunita Devi',
      authorAvatar: '👩‍🌾',
      time: '5 hours ago',
      content: 'Use organic fertilizer for tomato farming. I got 30% more production!',
      image: '🍅',
      likes: 25,
      comments: 15,
      isLiked: true,
      category: 'tip'
    },
    {
      id: '3',
      author: 'Mukesh Patel',
      authorAvatar: '👨‍🌾',
      time: '1 day ago',
      content: 'Today Delhi market price for rice is ₹2,280 per quintal. Good time to sell.',
      likes: 18,
      comments: 6,
      isLiked: false,
      category: 'market'
    }
  ]);

  const communityGroups: CommunityGroup[] = [
    {
      id: '1',
      name: 'Wheat Farmers Community',
      members: 1245,
      description: 'Share wheat farming knowledge',
      icon: '🌾'
    },
    {
      id: '2',
      name: 'Organic Farming',
      members: 890,
      description: 'Farmers using organic methods',
      icon: '🌱'
    },
    {
      id: '3',
      name: 'Market Price Updates',
      members: 2156,
      description: 'Daily market prices and information',
      icon: '📊'
    },
    {
      id: '4',
      name: 'Weather Updates',
      members: 1876,
      description: 'Weather information for farming',
      icon: '🌤️'
    }
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: 'You',
        authorAvatar: '👤',
        time: 'Just now',
        content: newPostContent,
        likes: 0,
        comments: 0,
        isLiked: false,
        category: selectedCategory
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setShowCreatePost(false);
      Alert.alert('Success!', 'Your post has been published.');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'question': return '❓';
      case 'tip': return '💡';
      case 'market': return '💰';
      case 'weather': return '🌤️';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'tip': return 'bg-green-100 text-green-800';
      case 'market': return 'bg-yellow-100 text-yellow-800';
      case 'weather': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPost = (post: Post) => (
    <View key={post.id} className="bg-white rounded-xl mx-4 mb-4 shadow-sm">
      {/* Post Header */}
      <View className="p-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Text className="text-2xl mr-3">{post.authorAvatar}</Text>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">{post.author}</Text>
              <Text className="text-sm text-gray-500">{post.time}</Text>
            </View>
          </View>
          <View className={`px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
            <Text className="text-xs font-medium">
              {getCategoryIcon(post.category)} {post.category === 'question' ? 'Question' : 
                post.category === 'tip' ? 'Tip' : 
                post.category === 'market' ? 'Market' : 'Weather'}
            </Text>
          </View>
        </View>
      </View>

      {/* Post Content */}
      <View className="p-4">
        <Text className="text-gray-800 text-base leading-6 mb-3">{post.content}</Text>
        {post.image && (
          <View className="bg-gray-100 rounded-lg p-8 items-center mb-3">
            <Text className="text-6xl">{post.image}</Text>
          </View>
        )}
      </View>

      {/* Post Actions */}
      <View className="flex-row items-center justify-between px-4 py-3 border-t border-gray-100">
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => handleLike(post.id)}
        >
          <Ionicons 
            name={post.isLiked ? "heart" : "heart-outline"} 
            size={20} 
            color={post.isLiked ? "#ef4444" : "#6b7280"} 
          />
          <Text className={`ml-2 text-sm ${post.isLiked ? 'text-red-500' : 'text-gray-600'}`}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
          <Text className="ml-2 text-sm text-gray-600">{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="share-outline" size={20} color="#6b7280" />
          <Text className="ml-2 text-sm text-gray-600">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeed = () => (
    <ScrollView className="flex-1">
      {/* Create Post Button */}
      <TouchableOpacity 
        className="bg-white rounded-xl mx-4 my-4 p-4 border-2 border-green-500 shadow-sm"
        onPress={() => setShowCreatePost(true)}
      >
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">👤</Text>
          <Text className="flex-1 text-gray-500">Share your thoughts...</Text>
          <Ionicons name="create-outline" size={20} color="#059669" />
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View className="flex-row justify-around mx-4 mb-4">
        {[
          { title: 'Ask Question', icon: 'help-circle-outline', category: 'question' },
          { title: 'Share Tip', icon: 'bulb-outline', category: 'tip' },
          { title: 'Market Price', icon: 'trending-up-outline', category: 'market' },
          { title: 'Weather', icon: 'cloudy-outline', category: 'weather' }
        ].map((action, index) => (
          <TouchableOpacity 
            key={index}
            className="bg-white rounded-xl p-3 items-center shadow-sm border border-gray-200"
            onPress={() => {
              setSelectedCategory(action.category as any);
              setShowCreatePost(true);
            }}
          >
            <Ionicons name={action.icon as any} size={24} color="#059669" />
            <Text className="text-xs text-gray-600 mt-1 text-center">{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Posts */}
      {posts.map(renderPost)}
    </ScrollView>
  );

  const renderGroups = () => (
    <ScrollView className="flex-1">
      <View className="mx-4 my-4">
        <Text className="text-xl font-bold text-gray-800 mb-4">Community Groups</Text>
        {communityGroups.map((group) => (
          <TouchableOpacity key={group.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center">
              <Text className="text-3xl mr-4">{group.icon}</Text>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 text-lg">{group.name}</Text>
                <Text className="text-gray-600 text-sm mb-1">{group.description}</Text>
                <Text className="text-green-600 text-sm font-medium">{group.members} members</Text>
              </View>
              <TouchableOpacity className="bg-green-600 px-4 py-2 rounded-lg">
                <Text className="text-white font-medium">Join</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderMarket = () => (
    <ScrollView className="flex-1">
      <View className="mx-4 my-4">
        <Text className="text-xl font-bold text-gray-800 mb-4">Today's Market Prices</Text>
        
        {[
          { crop: 'Wheat', price: '₹2,280', change: '+₹30', icon: '🌾' },
          { crop: 'Rice', price: '₹1,950', change: '-₹15', icon: '🌾' },
          { crop: 'Corn', price: '₹1,720', change: '+₹25', icon: '🌽' },
          { crop: 'Soybean', price: '₹4,150', change: '+₹80', icon: '🫘' },
          { crop: 'Chickpea', price: '₹5,200', change: '+₹45', icon: '🫛' },
          { crop: 'Mustard', price: '₹4,850', change: '-₹20', icon: '🌻' }
        ].map((item, index) => (
          <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">{item.icon}</Text>
                <View>
                  <Text className="font-semibold text-gray-800 text-lg">{item.crop}</Text>
                  <Text className="text-gray-600">Per quintal</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-bold text-xl text-gray-800">{item.price}</Text>
                <Text className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity className="bg-green-600 rounded-xl p-4 mt-4">
          <Text className="text-white text-center font-semibold text-lg">View More Market Prices</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View className="bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-2xl font-bold text-gray-800">Farmer Community</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row">
          {[
            { key: 'feed', label: 'Feed', icon: 'home-outline' },
            { key: 'groups', label: 'Groups', icon: 'people-outline' },
            { key: 'market', label: 'Market', icon: 'trending-up-outline' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row items-center justify-center py-3 ${
                activeTab === tab.key ? 'border-b-2 border-green-600' : ''
              }`}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? '#059669' : '#6b7280'} 
              />
              <Text className={`ml-2 font-medium ${
                activeTab === tab.key ? 'text-green-600' : 'text-gray-600'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      {activeTab === 'feed' && renderFeed()}
      {activeTab === 'groups' && renderGroups()}
      {activeTab === 'market' && renderMarket()}

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePost}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <Text className="text-green-600 font-medium">Cancel</Text>
            </TouchableOpacity>
            <Text className="font-semibold text-lg">New Post</Text>
            <TouchableOpacity onPress={handleCreatePost}>
              <Text className="text-green-600 font-medium">Post</Text>
            </TouchableOpacity>
          </View>

          <View className="p-4">
            {/* Category Selection */}
            <Text className="font-medium text-gray-800 mb-3">Choose Category:</Text>
            <View className="flex-row flex-wrap mb-4">
              {[
                { key: 'question', label: 'Question', icon: '❓' },
                { key: 'tip', label: 'Tip', icon: '💡' },
                { key: 'market', label: 'Market', icon: '💰' },
                { key: 'weather', label: 'Weather', icon: '🌤️' }
              ].map((category) => (
                <TouchableOpacity
                  key={category.key}
                  className={`mr-3 mb-3 px-4 py-2 rounded-full border ${
                    selectedCategory === category.key
                      ? 'bg-green-600 border-green-600'
                      : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSelectedCategory(category.key as any)}
                >
                  <Text className={`${
                    selectedCategory === category.key ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.icon} {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-base min-h-32"
              placeholder="Write your thoughts or questions..."
              multiline
              value={newPostContent}
              onChangeText={setNewPostContent}
              textAlignVertical="top"
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Community;