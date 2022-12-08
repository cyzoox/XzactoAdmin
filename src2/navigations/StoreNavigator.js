import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants';
import Stores from '../screens/home/Stores';
import StoreDashboard from '../screens/home/StoreDashboard';
import Reports from '../screens/home/Reports';
import Expenses from '../screens/home/Expenses';
import Products from '../screens/home/Products';
import Bills from '../screens/home/Bills';
import Customers from '../screens/home/Customers';
import Attendants from '../screens/home/Attendants';

const Stack = createStackNavigator();

function StoreNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.STORES} component={Stores} />
      <Stack.Screen name={ROUTES.STORE_DASHBOARD} component={StoreDashboard} />
      <Stack.Screen name={ROUTES.STORE_REPORTS} component={Reports} />
      <Stack.Screen name={ROUTES.STORE_EXPENSES} component={Expenses} />
      <Stack.Screen name={ROUTES.STORE_PRODUCTS} component={Products} />
      <Stack.Screen name={ROUTES.STORE_BILLS} component={Bills} />
      <Stack.Screen name={ROUTES.STORE_CUSTOMERS} component={Customers} />
      <Stack.Screen name={ROUTES.STORE_ATTENDANTS} component={Attendants} />
    </Stack.Navigator>
  );
}

export default StoreNavigator;
