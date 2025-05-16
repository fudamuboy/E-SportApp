import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from '../DrawerNavigator';

const Drawer = createDrawerNavigator();


export default function Home() {
    return (
        <DrawerNavigator />
    )
}

const styles = StyleSheet.create({})