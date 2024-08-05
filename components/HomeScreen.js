import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookListScreen from '../Screens/BookListScreen';
import BookDetailScreen from '../Screens/BookDetailScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="BookListScreen" 
        component={BookListScreen} 
        options={{ title: 'Books' }} 
      />
      <Stack.Screen 
        name="BookDetailScreen" 
        component={BookDetailScreen} 
        options={{ title: 'Book Details' }} 
      />
    </Stack.Navigator>
  );
}

export default HomeScreen;