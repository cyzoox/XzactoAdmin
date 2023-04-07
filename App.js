import React from "react";
import "react-native-gesture-handler";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import { StoreProvider } from './src/context/StoreContext';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BillsAndReceiptsScreen from './src/screens/BillsAndReceiptsScreen';
import CustomersAndCreditScreen from './src/screens/CustomersAndCreditScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {withIAPContext} from 'react-native-iap';

import ReportsScreen from './src/screens/ReportsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SigninScreen from './src/screens/SigninScreen';
 import SignupScreen from './src/screens/SignupScreen';
import StaffsScreen from './src/screens/StaffsScreen';
import StoresList from './src/screens/StoresListScreen';
// import WarehouseScreen from './src/screens/WarehouseScreen';
import { ProductDetails } from "./src/components/ProductDetails";
import TransactionSetailsScreen from "./src/screens/TR_Details";
import SummaryReport from "./src/screens/SummaryReports";
import DeliveryStockReport from "./src/screens/DeliveryStockReport";
import BOEPScreen from "./src/screens/BOEP";
import InventoryScreen from "./src/screens/InventoryLIst";
import TopSeller from "./src/screens/TopSeller";
import WarehouseProducts from "./src/screens/WarehouseProducts";
import ProductsScreen from "./src/screens/ProductsScreen";
import WarehouseSupplier from "./src/screens/WarehouseSupplier";
import { AddWarehouseProducts } from "./src/components/AddWarehouseProducts";
import { ProductWarehouseDetails } from "./src/components/ProductWarehouseDetails";
import WarehouseReports from "./src/screens/WarehouseReports";
import WarehouseBOReport from "./src/screens/WarehouseBOReports";
import WarehousePulloutReport from "./src/screens/WarehousePulloutReports";
import WarehouseExpiredReport from "./src/screens/WarehouseExpiredReports";
import WarehouseInventory from "./src/screens/WarehouseInventory";
import WarehouseDeliveryStockReport from "./src/screens/WarehouseDeliveryStockReport";

import DashboardScreen from "./src/screens/DashboardScreen";
import WarehouseDashboard from "./src/screens/WarehouseDashboard";
import OverAllReportScreen from "./src/screens/OverAllReportScreen";
import AddBatchWarehouseProducts from "./src/components/AddBatchWarehouseProducts";
import BillDetails from "./src/screens/BillDetails";
import OverAllExpenses from "./src/screens/OverAllExpenses";
// import BluetoothSettings from "./src/screens/BluetoothSettings";
import StoreSales from "./src/screens/StoreSales";
import WarehouseDeliveryStockReportDetails from "./src/screens/WarehouseDeliveryStockReportDetails";
import CustomerCreditDetails from "./src/screens/CustomerCredtiDetails";
import TransferLogs from "./src/screens/TransferLogs";
import StoreDeliveryReportDetails from "./src/screens/StoreDeliveryReportDetails";
import Discount from "./src/screens/Discount";
 import AccountSreen from "./src/screens/AccountScreen";
import BatchEditScreen from "./src/components/BatchEditScreen";
import XZReadScreen from "./src/screens/XZReadScreen";
import AddBatchStoreProducts from "./src/components/AddBatchStoreProducts";
import WarehouseBatchEditScreen from "./src/components/WarehouseBatchEditScreen";
// import notifee from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
import StoreFFScreen from "./src/screens/StoreFFScreen";
import StoreScreens from "./src/screens/StoreScreen";
import { ProductDetailsWarehouse } from "./src/components/ProductDetailsWarehouse";
// import Subscription from "./src/screens/Subscription";
import BatchTransferScreen from "./src/screens/BatchTransferScreen";
import PinCodeInput from "./src/components/PinCodeInput";
import Registration from "./src/screens/Registration";
import Onboarding from "./src/screens/Onboarding";
import ForgotPassword from "./src/screens/ForgotPassword";
import Supplier from "./src/screens/Supplier";
import StoreSettings from "./src/screens/StoreSettings";
import DeliveryRequest from "./src/screens/DeliveryRequest";
import WarehouseRemainingStock from "./src/screens/WarehouseRemainingStocks";
import DeliveryRequestDetails from "./src/screens/DeliveryRequestDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const WarehouseStack = createStackNavigator();
const StoreStack = createStackNavigator();

// messaging().onMessage(onMessageReceived);
// messaging().setBackgroundMessageHandler(onMessageReceived);

// async function  onMessageReceived(message) {
//   const channelId = await notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//     sound:"doorbell"
//     });
//   notifee.displayNotification({
//     title: message.notification.title,
//       body: message.notification.body,
//       android: {
//         channelId,
//         sound:"doorbell"
      
//       },
//   });
// }

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      
      <HomeStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerShown:false}}
      />
      <HomeStack.Screen
        name="OverAllReports"
        component={OverAllReportScreen}
        options={{headerShown:false}}
      />
     
       <HomeStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown:false}}
      />
       <HomeStack.Screen
        name="OverAllExpenses"
        component={OverAllExpenses}
        options={{headerShown:false}}
      />
      {/* <HomeStack.Screen
        name="Bluetooth"
        component={BluetoothSettings}
        options={{headerShown:false}}
      /> */}
       {/* <HomeStack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown:false}}
      /> */}
       <HomeStack.Screen
        name="AccountSreen"
        component={AccountSreen}
        options={{headerShown:false}}
      />
    </HomeStack.Navigator>
  );
}

function StoreStackScreen() {
  return(
    <StoreStack.Navigator>
       <StoreStack.Screen
        name="StoreList"
        component={StoresList}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="StoreFFDashboard"
        component={StoreFFScreen}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="StoreDashboard"
        component={StoreScreens}
        options={{headerShown:false}}
      />
          <StoreStack.Screen
        name="Income"
        component={IncomeScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="Customers"
        component={CustomersAndCreditScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="Staffs"
        component={StaffsScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="TR_Details"
        component={TransactionSetailsScreen}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{headerShown:false}}
      />
<StoreStack.Screen
        name="StoreSales"
        component={StoreSales}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="CreditDetails"
        component={CustomerCreditDetails}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="StoreDeliveryDetails"
        component={StoreDeliveryReportDetails}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="SummaryReports"
        component={SummaryReport}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="DeliveryStockReports"
        component={DeliveryStockReport}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="BOEP"
        component={BOEPScreen}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="TopSeller"
        component={TopSeller}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="BillsAndReceipt"
        component={BillsAndReceiptsScreen}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="BillDetails"
        component={BillDetails}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="Discount"
        component={Discount}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="BatchEdit"
        component={BatchEditScreen}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="XZRead"
        component={XZReadScreen}
        options={{headerShown:false}}
      />
        <StoreStack.Screen
        name="BatchAddingStore"
        component={AddBatchStoreProducts}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="Suppliers"
        component={Supplier}
        options={{headerShown:false}}
      />
       <StoreStack.Screen
        name="StoreSettings"
        component={StoreSettings}
        options={{headerShown:false}}
      />
      <StoreStack.Screen
        name="DeliveryRequest"
        component={DeliveryRequest}
        options={{headerShown:false}}
      />
 <StoreStack.Screen
        name="DeliveryRequestDetails"
        component={DeliveryRequestDetails}
        options={{headerShown:false}}
      />
    </StoreStack.Navigator>
  )
}

function WarehouseStackScreens() {
  return(
    <WarehouseStack.Navigator>
        <WarehouseStack.Screen
        name="WarehouseScreen"
        component={WarehouseDashboard}
        options={{headerShown:false}}
      />
        <WarehouseStack.Screen
        name="WarehouseProducts"
        component={WarehouseProducts}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
        name="WarehouseSupplier"
        component={WarehouseSupplier}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
        name="AddWarehouseProducts"
        component={AddWarehouseProducts}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
        name="ProductWarehouseDetails"
        component={ProductWarehouseDetails}
        options={{headerShown:false}}
      />
        <WarehouseStack.Screen
        name="WarehouseReports"
        component={WarehouseReports}
        options={{headerShown:false}}
      />
        <WarehouseStack.Screen
        name="WarehouseBOReports"
        component={WarehouseBOReport}
        options={{headerShown:false}}
      />
       <WarehouseStack.Screen
        name="WarehousePulloutReport"
        component={WarehousePulloutReport}
        options={{headerShown:false}}
      />
       <WarehouseStack.Screen
        name="WarehouseExpiredReport"
        component={WarehouseExpiredReport}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
        name="WarehouseInventory"
        component={WarehouseInventory}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
        name="WarehouseDeliveryStockReport"
        component={WarehouseDeliveryStockReport}
        options={{headerShown:false}}
      />
      <WarehouseStack.Screen
      name="AddBatchWarehouseProducts"
      component={AddBatchWarehouseProducts}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
    <WarehouseStack.Screen
      name="WarehouseDeliveryDetail"
      component={WarehouseDeliveryStockReportDetails}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
    <WarehouseStack.Screen
      name="TransferLogs"
      component={TransferLogs}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
     <WarehouseStack.Screen
      name="WarehouseBatchEdit"
      component={WarehouseBatchEditScreen}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
     <WarehouseStack.Screen
      name="BatchTransfer"
      component={BatchTransferScreen}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
     <WarehouseStack.Screen
      name="WarehouseRemainingStocks"
      component={WarehouseRemainingStock}
      options={{headerShown:false, tabBarVisible:false}}
      
    />
    </WarehouseStack.Navigator>
  )
}

function TabScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
        } else if (route.name === 'Stores') {
          iconName = focused ? 'storefront-outline' : 'storefront-outline';
        } else if (route.name === 'Warehouse') {
          iconName = focused ? 'garage-variant' : 'garage-variant';
        }

        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
       
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
        <Tab.Screen name="Home" component={HomeStackScreen} />  
        <Tab.Screen name="Stores" component={StoreStackScreen} />  
        <Tab.Screen name="Warehouse" component={WarehouseStackScreens} />  
     
    </Tab.Navigator>
  );
}



const App = () => {

  return (
    <AuthProvider>
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={SigninScreen}
            options={{ headerShown: false}}
          />
        <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false}}
          />
        
         <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false}}
          />
             <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false}}
          />
          <Stack.Screen name="Dashboard" options={{headerShown: false}}>
          {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition,projectData } = route.params;
            return(
              <StoreProvider user={user} projectPartition={projectPartition} projectData={projectData}>

                <TabScreen navigation={navigation} route={route} />
             
              </StoreProvider>
              );
            }
            }
          </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;