import { View, Text } from 'react-native'
import React from 'react'
import Home from '../components/Home'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Home />
        </SafeAreaView>
    )
}

export default index