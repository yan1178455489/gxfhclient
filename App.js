// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discovary from './src/discovary.js'
import Recommend from './src/recommend.js'
import Profile from './src/profile.js'


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '发现') {
              iconName = focused
                ? 'search-outline'
                : 'search-sharp';
            } else if (route.name === '推荐') {
              iconName = focused ? 'heart-outline' : 'heart-sharp';
            }
            else if(route.name === '个人主页'){
              iconName = focused ? 'home-outline' : 'home-sharp';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          tabBarInactiveTintColor: 'gray',
          headerShown: false ,
        })
        }
      initialRouteName="发现">
        <Tab.Screen name="发现" component={Discovary} />
        <Tab.Screen name="推荐" component={Recommend} />
        <Tab.Screen name="个人主页" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}