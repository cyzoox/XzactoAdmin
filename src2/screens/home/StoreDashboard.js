import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Dimensions, ScrollView, TouchableOpacity, Modal } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {COLORS, ROUTES} from '../../constants';
import CardTiles from '../../components/CardTiles';
import AppHeader from "../../components/AppHeader";
import formatMoney from 'accounting-js/lib/formatMoney.js'

const StoreDashboard = ({navigation, route}) => {
    const STORE =  route.params.storess
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayLight,
      }}>
    <AppHeader  
        centerText= {`${STORE.name}`}
        leftComponent={
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <EvilIcons name={'arrow-left'} size={30} color={COLORS.white}/>
          </TouchableOpacity>
      }
   
    />
     <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal:10}}>
      <TouchableOpacity onPress={()=> navigation.navigate('StoreSales', {store: STORE})} style={style.storeCard}>
            <Text style={{fontSize: 15, fontWeight:'400', color: COLORS.primary}}>Sales</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: COLORS.primary}}>{formatMoney(0, { symbol: "₱", precision: 2 })}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Expenses', {store: STORE})}style={style.storeCard}>
            <Text style={{fontSize: 15, fontWeight:'400', color: COLORS.primary}}>Expenses</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: COLORS.primary}}>{formatMoney(0, { symbol: "₱", precision: 2 })}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'space-between', marginHorizontal:10}}>
      <View style={style.storeCard}>
            <Text style={{fontSize: 15, fontWeight:'400', color: COLORS.primary}}>Products Sold</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: COLORS.primary}}>{0}</Text>
        </View>
        <View style={style.storeCard}>
            <Text style={{fontSize: 15, fontWeight:'400', color: COLORS.primary}}>Returns/Refunds</Text>
            <Text style={{fontSize: 18, fontWeight:'700', color: COLORS.primary}}>0.00</Text>
        </View>
      </View>
    <ScrollView style={{flex: 1, height: 200, marginTop:20}}>
    <CardTiles
              rightTileText="Products"
              leftTileText="Reports"
              iconRightName='md-barcode-outline'
              iconLeftName='md-podium-outline'
              leftRouteName={ROUTES.STORE_REPORTS}
              rightRouteName={ROUTES.STORE_PRODUCTS}
              centerTileText="Expenses"
              centerRouteName={ROUTES.STORE_EXPENSES}
              iconCenterName="document-text-outline"
              extraProps={STORE}
          />
          <CardTiles
              rightTileText="Attendants"
              leftTileText="Bills"
              iconRightName='md-people-circle-outline'
              iconLeftName='ios-receipt-outline'
              leftRouteName={ROUTES.STORE_BILLS}
              rightRouteName={ROUTES.STORE_ATTENDANTS}
              centerTileText="Customers"
              centerRouteName={ROUTES.STORE_CUSTOMERS}
              iconCenterName="md-people-circle-outline"
              extraProps={STORE}
          />
    </ScrollView>
    </View>
  );
};

export default StoreDashboard;

const style = StyleSheet.create({
    storeCard: {
      shadowColor: "#EBECF0",
      shadowOffset: {
        width: 0,
        height: 5,
       
      },
      shadowOpacity: 0.89,
      shadowRadius: 2,
      elevation: 5,
      flex: 1,
      backgroundColor: COLORS.secondary, 
      paddingVertical: 10, 
      margin: 5, 
      padding: 15, 
      borderRadius: 10
    }
  });