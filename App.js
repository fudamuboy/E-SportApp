import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import AuthPage from './screens/AuthPage';
import RegisterPage from './screens/RegisterPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>

        <Stack.Navigator initialRouteName='AuthPage' >
          <Stack.Screen name='AuthPage' component={AuthPage} options={{ headerShown: false }} />
          <Stack.Screen name='RegisterPage' component={RegisterPage} options={{ headerShown: false }} />
          <Stack.Screen name='MainApp' component={DrawerNavigator} options={{ headerShown: false }} />

        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});