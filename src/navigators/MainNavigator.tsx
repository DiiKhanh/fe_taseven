import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';
import {
  NotFound,
  ProfileScreen,
  NotificationsScreen,
  SearchEvents,
} from '../screens';
import ExploreEvents from '../screens/events/ExploreEvents';
import EventDetail from '../screens/events/EventDetail';
import PaymentScreen from '../screens/events/PaymentScreen';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="SearchEvents" component={SearchEvents} />
      <Stack.Screen name="ExploreEvents" component={ExploreEvents} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
