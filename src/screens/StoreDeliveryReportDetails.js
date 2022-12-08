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

const StoreDeliveryReportDetails = ({navigation, route}) => {
  const { delivery } = route.params;
  const {store_delivery, getStoreDelivery, } = useStore();

  useEffect(() => {
    const date = moment().unix()
    const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
    getStoreDelivery(today, 1)
  },[]);

  const filterProducts = () => {
    let product = [];
    store_delivery.forEach(item => {
      if(delivery.timeStamp === item.timeStamp){
        product.push(item)
      }
    });

    return product;
  }


    const calculateTotal = () => {
      let total = 0;
      filterProducts().forEach(list => {

              total += list.quantity * list.oprice  
      });
     return total;
  }

  const renderItem = ({ item }) => (
      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 3}}>
          <Text>{item.product} {item.quantity} x {item.oprice}</Text>
          <Text>{formatMoney(item.quantity*item.oprice, { symbol: "₱", precision: 1 })}</Text>
      </View>
    )
  return (
    <View style={{flex: 1}}>
        <AppHeader
            centerText="Delivery Details"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              } 
              rightComponent={
                <TouchableOpacity onPress={()=> {}}>
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
                <Text style={{fontSize: 17, fontWeight:'700'}}>{delivery.supplier}</Text>
                
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text style={{fontSize: 16, fontWeight:'600'}}>{delivery.delivery_receipt}</Text>
                <Text style={{fontSize: 13}}>{moment.unix(delivery.timeStamp).format('DD MMM YYYY hh:mmA')}</Text>
            </View>
            <Divider style={{margin: 10}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30, marginBottom: 15}}>
                <Text>Item</Text>
                <Text>Total</Text>
            </View>
            <FlatList
                keyExtractor={(key) => key.name}
                data={filterProducts()}
                renderItem={renderItem}
                />
            
            <Divider style={{margin: 10}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Total</Text>
                <Text>{formatMoney(calculateTotal(), { symbol: "₱", precision: 1 })}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center', marginVertical: 15}}>
                <Text style={{fontSize: 15, fontWeight:'600'}}>Received By: {delivery.received_by}</Text>
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

export default StoreDeliveryReportDetails;
