import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


export default function Home() {
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({})