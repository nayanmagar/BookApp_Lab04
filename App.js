import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BorrowProvider } from './components/BorrowContext';
import HomeScreen from './components/HomeScreen';
import BorrowedScreen from './components/BorrowedScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BorrowProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Borrowed') {
                iconName = focused ? 'book' : 'book-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.text,
            tabBarStyle: {
              backgroundColor: colors.background,
              borderTopColor: colors.primary,
              borderTopWidth: 2,
            },
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.background,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Book Library' }} />
          <Tab.Screen name="Borrowed" component={BorrowedScreen} options={{ title: 'My Books' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </BorrowProvider>
  );
}