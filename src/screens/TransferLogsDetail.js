import React, { useEffect } from "react";
import { Text, StyleSheet, View , FlatList, TouchableOpacity} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../themes/colors";
import { Divider } from "react-native-paper";
import ZigzagView from "react-native-zigzag-view"
import AppHeader from "../components/AppHeader";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import moment from 'moment'
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";

const TransferLogDetail = () => {
  return (
    <View style={{flex: 1}}>
    <AppHeader
        centerText="Bill Details"
        leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          } 
          rightComponent={
            <TouchableOpacity onPress={()=> printReceipt()}>
              <Feather name={'printer'} size={25} color={colors.white}/>
            </TouchableOpacity>
          } 
    />
    <View style={{marginHorizontal: 10}}>
    <ZigzagView
        backgroundColor="#f1f1f1"
        surfaceColor="#FFF"
        contentContainerStyle={{
        justifyContent: "space-between"
        }}
    >
        <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 17, fontWeight:'700'}}>Company Name</Text>
            <Text style={{fontSize: 15}}>Address</Text>
            <Text>Contact</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
            <Text style={{fontSize: 16, fontWeight:'600'}}>{transactions.timeStamp}</Text>
            <Text style={{fontSize: 13}}>{moment.unix(transactions.timeStamp).format('DD MMM YYYY hh:mmA')}</Text>
        </View>
        <Divider style={{margin: 10}}/>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30, marginBottom: 15}}>
            <Text>Item</Text>
            <Text>Total</Text>
        </View>
        <FlatList
            keyExtractor={(key) => key.product}
            data={trdetails}
            renderItem={renderItem}
            />
        
        <Divider style={{margin: 10}}/>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
            <Text>Total</Text>
            <Text>{formatMoney(calculateTotal(), { symbol: "₱", precision: 1 })}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
            <Text>Cash</Text>
            <Text>0.00</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
            <Text>Change.</Text>
            <Text>0.00</Text>
        </View>
        <View style={{justifyContent:'center', alignItems: 'center', marginVertical: 15}}>
            <Text style={{fontSize: 15, fontWeight:'600'}}>Transferred By: {transactions.attendant_name}</Text>
        </View>
    </ZigzagView>
    </View>
    
</View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default TransferLogDetail;
