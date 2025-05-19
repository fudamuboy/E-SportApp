import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contacts from './screens/Contacts';
import Tabs from './BOTTOMTABS/Tabs';
import AntDesign from '@expo/vector-icons/AntDesign';





const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                drawerPosition: 'left',
                drawerType: 'front',
            }}
        >
            {/* Utilisez Tabs comme écran principal pour conserver vos onglets */}
            <Drawer.Screen name="Main" component={Tabs} />
            <Drawer.Screen name="Profile" component={Contacts} options={{
                drawerIcon: ({ focused, size }) => (
                    <AntDesign name="contacts" size={size} color={focused ? '#7cc' : '#ccc'} />
                )
            }}
            />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({}) 