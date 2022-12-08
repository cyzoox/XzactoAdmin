import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
import {Home, Wallet, Notifications, Settings} from '../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import {useNavigation} from '@react-navigation/native';
import Stores from '../screens/home/Stores';
import Warehouse from '../screens/home/Warehouse';
import StoreNavigator from './StoreNavigator';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: COLORS.dark,
      tabBarStyle: styles.tabBarStyle,
      tabBarActiveTintColor: COLORS.bgColor,
      tabBarIcon: ({color, size, focused}) => {
        let iconName;

        if (route.name === ROUTES.HOME_TAB) {
          iconName = focused ? 'home-outline' : 'home-outline';
        } else if (route.name === ROUTES.STORE_NAVIGATOR) {
          iconName = focused ? 'storefront-outline' : 'storefront-outline';
        } else if (route.name === ROUTES.WAREHOUSE) {
          iconName = focused ? 'garage-variant' : 'garage-variant';
        } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
          iconName = focused
            ? 'md-notifications-sharp'
            : 'md-notifications-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
      },
    })}
    
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={Home}
       
      />
      <Tab.Screen
        name={ROUTES.STORE_NAVIGATOR}
        component={StoreNavigator}
      
      />
      <Tab.Screen
        name={ROUTES.WAREHOUSE}
        component={Warehouse}
      
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
  
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    bottom: 25,
    right: 20,
    left: 20,
    height: 92,
    borderRadius: 15,
    elevation: 3
  },
});
