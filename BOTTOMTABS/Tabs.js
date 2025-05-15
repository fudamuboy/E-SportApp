import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Evenement from '../screens/Evenement';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
export default function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="event" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name="Olay" component={Evenement}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubbles" size={size} color={color} />),
                    tabBarInactiveTintColor: "gray",
                    title: "chat"
                }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})