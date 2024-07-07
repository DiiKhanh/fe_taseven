import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeTaskScreen, AddTaskScreen, TaskDetail, ListTasks, TaskNotifications} from '../screens';
import { StatusBar } from 'react-native';

const TaskNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeTaskScreen" component={HomeTaskScreen} />
      <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetail} />
      <Stack.Screen name="ListTasks" component={ListTasks} />
      <Stack.Screen name="TaskNotifications" component={TaskNotifications} />
    </Stack.Navigator>
    </>
  );
};

export default TaskNavigator;
