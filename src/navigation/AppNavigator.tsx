import React from "react";

import {
  NavigationContainer
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";


import LoginScreen from "../pages/Login";
import RegisterScreen from "../pages/Register";
import HomeScreen from "../pages/Home";
import AddPostScreen from "../pages/AddPost";
import ProfileScreen from "../pages/Profile";
import PostDetailsScreen from "../pages/PostDetails";
import EditPostScreen from "../pages/EditePost";


const Stack = createNativeStackNavigator();


export default function AppNavigator() {


  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
      >


        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />


        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />


        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />


        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
        />


        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />


        <Stack.Screen
          name="PostDetails"
          component={PostDetailsScreen}
        />


        <Stack.Screen
          name="EditPost"
          component={EditPostScreen}
        />


      </Stack.Navigator>


    </NavigationContainer>

  );

}