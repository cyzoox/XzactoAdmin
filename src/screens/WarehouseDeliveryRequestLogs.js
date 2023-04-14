import React from "react";
import { Text, StyleSheet, View,TouchableOpacity,FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../themes/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'

import {  ListItem, Avatar} from "react-native-elements";
import { useStore } from "../context/StoreContext";
const WarehouseDeliveryRequestLogs = ({navigation, route}) => {
 
  const {  delivery_request,
    delivery_req_details} = useStore();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listStyle} onPress={()=> navigation.navigate('DeliveryRequestDetails', {request : item, store:store})}>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10}}>
          <Avatar containerStyle={styles.avatarStyle} size={45} source={require('../../assets/xzacto_icons/iconsstore/bills1.png')}/>
        </View>
        <View>
          <Text style={{color: colors.coverDark, marginBottom: 3, fontWeight:'700', fontSize: 15}}>
            {item.date}
          </Text>
          <Text style={{color: colors.charcoalGrey, fontSize: 15}}>
            {formatMoney(item.total, { symbol: "₱", precision: 1 })}
          </Text>
        </View>
      </View>
      <View style={{justifyContent:'center', alignItems:'center'}}>
          
          <Text style={item.status === "Pending" ? {fontSize: 17, color: colors.red, fontWeight: '700'}:  {fontSize: 17, color: colors.green, fontWeight: '700'}}>{item.status}</Text>
          <Text style={{fontSize: 10, color: colors.boldGrey, textDecorationLine:'underline'}}>Tap to view `{">>"}`</Text>
      </View>
    </TouchableOpacity>
  );
  return (
  <View style={{flex:1}}>
     <AppHeader 
          centerText="Delivery Request Logs" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        screen="Store"
        />
     <FlatList
        style={{marginBottom: 50}}
        data={delivery_request}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
  </View>
);
};

const styles = StyleSheet.create({
  
  avatarStyle: {

    backgroundColor:colors.white
  },
  listStyle: {
    flexDirection:'row',
    justifyContent:'space-between', 
    backgroundColor: colors.white,
   
    shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 5,
  paddingVertical: 15, 
  marginHorizontal: 10, 
  marginVertical: 5,
  paddingHorizontal: 10, 
  borderRadius: 10},
  filterStyle: {
    backgroundColor:colors.white, 
    paddingVertical: 9, 
    width: '45%',
    borderRadius: 5,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
    borderColor: colors.white,
    borderWidth:  1
  },
  storeList: {
    flex: 1,
    borderColor: colors.boldGrey,
    borderWidth: 1,
    paddingVertical: 8,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
  },
  dateFilter : {
    borderWidth: 1, 
    borderRadius: 5, 
    flexDirection:'row', 
    alignItems:'center', 
    flex: 1, 
    margin: 2, 
    justifyContent:'center', 
    borderColor: colors.accent,
  backgroundColor: colors.accent},
  bottomTotal : {
    position:'absolute', 
    bottom: 0, 
    flexDirection:"row", 
    justifyContent:'space-between', 
    padding: 10,
    backgroundColor: colors.accent,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
  margin: 5,
  borderRadius: 5}
});

export default WarehouseDeliveryRequestLogs;
