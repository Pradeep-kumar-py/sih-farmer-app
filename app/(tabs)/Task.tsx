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
    View,
} from 'react-native';

interface Task {
    id: string;
    title: string;
    description: string;
    category: 'planting' | 'watering' | 'fertilizing' | 'harvesting' | 'maintenance';
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
    completed: boolean;
}

const Task = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: 'Water the Wheat Field',
            description: 'Water the wheat field in the morning',
            category: 'watering',
            priority: 'high',
            dueDate: '2025-01-20',
            completed: false,
        },
        {
            id: '2',
            title: 'Apply Fertilizer',
            description: 'Apply NPK fertilizer to tomato plants',
            category: 'fertilizing',
            priority: 'medium',
            dueDate: '2025-01-22',
            completed: false,
        },
        {
            id: '3',
            title: 'Harvest Potatoes',
            description: 'Harvest potatoes from the north field',
            category: 'harvesting',
            priority: 'high',
            dueDate: '2025-01-18',
            completed: true,
        },
        {
            id: '4',
            title: 'Check Irrigation System',
            description: 'Inspect and maintain irrigation pipes',
            category: 'maintenance',
            priority: 'medium',
            dueDate: '2025-01-25',
            completed: false,
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'maintenance' as Task['category'],
        priority: 'medium' as Task['priority'],
        dueDate: '',
    });

    const categoryIcons = {
        planting: 'leaf-outline',
        watering: 'water-outline',
        fertilizing: 'nutrition-outline',
        harvesting: 'basket-outline',
        maintenance: 'build-outline',
    };

    const priorityColors = {
        high: 'bg-red-100 border-red-300',
        medium: 'bg-yellow-100 border-yellow-300',
        low: 'bg-green-100 border-green-300',
    };

    const toggleTaskCompletion = (taskId: string) => {
        setTasks(prev => 
            prev.map(task => 
                task.id === taskId 
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const addNewTask = () => {
        if (!newTask.title.trim()) {
            Alert.alert('Error', 'Please enter a task title');
            return;
        }

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description,
            category: newTask.category,
            priority: newTask.priority,
            dueDate: newTask.dueDate,
            completed: false,
        };

        setTasks(prev => [task, ...prev]);
        setNewTask({
            title: '',
            description: '',
            category: 'maintenance',
            priority: 'medium',
            dueDate: '',
        });
        setShowAddModal(false);
    };

    const deleteTask = (taskId: string) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => setTasks(prev => prev.filter(task => task.id !== taskId))
                },
            ]
        );
    };

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" /> */}
            
            {/* Header */}
            <View className="mx-4 mt-4 mb-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-gray-800">
                        Farm Tasks
                    </Text>
                    <TouchableOpacity 
                        onPress={() => setShowAddModal(true)}
                        className="bg-green-600 rounded-full p-3"
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                
                {/* Stats */}
                <View className="flex-row justify-between mt-4">
                    <View className="bg-white rounded-lg p-3 flex-1 mr-2 border border-gray-200">
                        <Text className="text-2xl font-bold text-green-600">{pendingTasks.length}</Text>
                        <Text className="text-gray-600 text-sm">Pending</Text>
                    </View>
                    <View className="bg-white rounded-lg p-3 flex-1 ml-2 border border-gray-200">
                        <Text className="text-2xl font-bold text-blue-600">{completedTasks.length}</Text>
                        <Text className="text-gray-600 text-sm">Completed</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4">
                {/* Pending Tasks */}
                {pendingTasks.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-gray-800 mb-3">
                            Pending Tasks
                        </Text>
                        {pendingTasks.map((task) => (
                            <View 
                                key={task.id} 
                                className={`bg-white rounded-xl p-4 mb-3 border-2 ${priorityColors[task.priority]} shadow-sm`}
                            >
                                <View className="flex-row items-start justify-between">
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-2">
                                            <Ionicons 
                                                name={categoryIcons[task.category] as any} 
                                                size={20} 
                                                color="#059669" 
                                                className="mr-2" 
                                            />
                                            <Text className="text-lg font-semibold text-gray-800 flex-1">
                                                {task.title}
                                            </Text>
                                            <View className="flex-row">
                                                <TouchableOpacity 
                                                    onPress={() => toggleTaskCompletion(task.id)}
                                                    className="mr-2"
                                                >
                                                    <Ionicons 
                                                        name="checkmark-circle-outline" 
                                                        size={24} 
                                                        color="#059669" 
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => deleteTask(task.id)}>
                                                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {task.description && (
                                            <Text className="text-gray-600 text-sm mb-2">
                                                {task.description}
                                            </Text>
                                        )}
                                        <View className="flex-row items-center justify-between">
                                            <Text className="text-xs text-gray-500">
                                                Due: {task.dueDate}
                                            </Text>
                                            <View className={`px-2 py-1 rounded-full ${
                                                task.priority === 'high' ? 'bg-red-200' :
                                                task.priority === 'medium' ? 'bg-yellow-200' : 'bg-green-200'
                                            }`}>
                                                <Text className={`text-xs font-medium ${
                                                    task.priority === 'high' ? 'text-red-800' :
                                                    task.priority === 'medium' ? 'text-yellow-800' : 'text-green-800'
                                                }`}>
                                                    {task.priority.toUpperCase()}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <View className="mb-6">
                        <Text className="text-lg font-semibold text-gray-800 mb-3">
                            Completed Tasks
                        </Text>
                        {completedTasks.map((task) => (
                            <View 
                                key={task.id} 
                                className="bg-white rounded-xl p-4 mb-3 border border-gray-200 opacity-75"
                            >
                                <View className="flex-row items-start justify-between">
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-2">
                                            <Ionicons 
                                                name={categoryIcons[task.category] as any} 
                                                size={20} 
                                                color="#6b7280" 
                                                className="mr-2" 
                                            />
                                            <Text className="text-lg font-semibold text-gray-500 flex-1 line-through">
                                                {task.title}
                                            </Text>
                                            <View className="flex-row">
                                                <TouchableOpacity 
                                                    onPress={() => toggleTaskCompletion(task.id)}
                                                    className="mr-2"
                                                >
                                                    <Ionicons 
                                                        name="checkmark-circle" 
                                                        size={24} 
                                                        color="#059669" 
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => deleteTask(task.id)}>
                                                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {task.description && (
                                            <Text className="text-gray-500 text-sm mb-2 line-through">
                                                {task.description}
                                            </Text>
                                        )}
                                        <Text className="text-xs text-gray-400">
                                            Due: {task.dueDate}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Empty State */}
                {tasks.length === 0 && (
                    <View className="items-center justify-center py-16">
                        <Ionicons name="list-outline" size={64} color="#d1d5db" />
                        <Text className="text-gray-500 text-lg mt-4">No tasks yet</Text>
                        <Text className="text-gray-400 text-sm mt-2">Tap + to add your first task</Text>
                    </View>
                )}
            </ScrollView>

            {/* Add Task Modal */}
            <Modal
                visible={showAddModal}
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <SafeAreaView className="flex-1 bg-white">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                        <TouchableOpacity onPress={() => setShowAddModal(false)}>
                            <Text className="text-green-600 text-lg">Cancel</Text>
                        </TouchableOpacity>
                        <Text className="text-lg font-semibold">Add New Task</Text>
                        <TouchableOpacity onPress={addNewTask}>
                            <Text className="text-green-600 text-lg font-semibold">Add</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 p-4">
                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Task Title</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                                placeholder="Enter task title"
                                value={newTask.title}
                                onChangeText={(text) => setNewTask(prev => ({ ...prev, title: text }))}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Description</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg p-3 text-gray-800 h-24"
                                placeholder="Enter task description"
                                multiline
                                value={newTask.description}
                                onChangeText={(text) => setNewTask(prev => ({ ...prev, description: text }))}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Category</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {Object.keys(categoryIcons).map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        onPress={() => setNewTask(prev => ({ ...prev, category: category as Task['category'] }))}
                                        className={`px-4 py-2 rounded-lg border ${
                                            newTask.category === category 
                                                ? 'bg-green-100 border-green-500' 
                                                : 'bg-gray-100 border-gray-300'
                                        }`}
                                    >
                                        <Text className={`capitalize ${
                                            newTask.category === category ? 'text-green-700' : 'text-gray-700'
                                        }`}>
                                            {category}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Priority</Text>
                            <View className="flex-row gap-2">
                                {['low', 'medium', 'high'].map((priority) => (
                                    <TouchableOpacity
                                        key={priority}
                                        onPress={() => setNewTask(prev => ({ ...prev, priority: priority as Task['priority'] }))}
                                        className={`px-4 py-2 rounded-lg border ${
                                            newTask.priority === priority 
                                                ? 'bg-green-100 border-green-500' 
                                                : 'bg-gray-100 border-gray-300'
                                        }`}
                                    >
                                        <Text className={`capitalize ${
                                            newTask.priority === priority ? 'text-green-700' : 'text-gray-700'
                                        }`}>
                                            {priority}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-700 font-medium mb-2">Due Date</Text>
                            <TextInput
                                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                                placeholder="YYYY-MM-DD"
                                value={newTask.dueDate}
                                onChangeText={(text) => setNewTask(prev => ({ ...prev, dueDate: text }))}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

export default Task;