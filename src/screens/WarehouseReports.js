import React from "react";
import { Text, StyleSheet, View, TouchableOpacity,ScrollView, Image} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { Card, List } from 'react-native-paper';
import {  ListItem, Avatar} from "react-native-elements";
import { useStore } from "../context/StoreContext";

import formatMoney from 'accounting-js/lib/formatMoney.js'


const WarehouseReports = ({navigation}) => {
  const {products,   transfer_logs,
    warehouse_products,
    warehouse_delivery_report_summary} = useStore();
  const [expanded, setExpanded] = React.useState(true);

  const calculateTotalCapital = () => {
    let total = 0
    warehouse_products.forEach(items => {
      total += items.oprice * items.stock
    });
    return total;
  }

  const calculateTotalReceived = () => {
    let total = 0
    warehouse_delivery_report_summary.forEach(items => {
      total += items.total
    });
    return total;
  }

  const calculateTotalDelivery = () => {
    let total = 0
    transfer_logs.forEach(items => {
      total += items.quantity * items.oprice
    });
    return total;
  }


  const calculateCapitalInStock = () => {
    let total = 0
    warehouse_products.forEach(items => {
      total += items.sprice * items.stock
    });
    return total;
  }

  const calculateProjectedIncome = () => {
    let total = 0
    warehouse_products.forEach(items => {
      total += (items.sprice - items.oprice ) * items.stock
    });
    return total;
  }


  const calculateActualTotal = () => {
    let total = 0;

    products.forEach(item => {
      total += item.oprice*item.stock
    });

    return total;
  }

  const calculateStocksTotal= () => {
    let total = 0;

    products.forEach(item => {
      total += item.sprice*item.stock
    });

    return total;
  }

  const handlePress = () => setExpanded(!expanded);
  return (
    <View style={{flex: 1}}>
        <AppHeader 
          centerText="Reports" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        screen="Warehouse"
        />
        <ScrollView style={{flex: 1, marginBottom: 10}}>

        <View style={{   borderRadius: 10,
        borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 15,
    padding: 10}}>
 <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Stocks Summary Report</Text> 
       <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3, fontWeight:'bold'}}>Remaining Stocks Capital</Text>
          <View>
            <Text style={{color:colors.secondary, fontSize: 16}}>{formatMoney(calculateTotalCapital(), { symbol: '₱', precision: 2 })}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3, fontWeight:'bold'}}>Remaining Stocks SRPl</Text>
          <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateCapitalInStock(), { symbol: '₱', precision: 2 })}</Text>
                </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3, fontWeight:'bold'}}>SRP Capital Margin</Text>
          <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateProjectedIncome(), { symbol: '₱', precision: 2 })}</Text>
                </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3, fontWeight:'bold'}}>Received Stocks Capital</Text>
          <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateTotalReceived(), { symbol: '₱', precision: 2 })}</Text>
                </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3, fontWeight:'bold'}}>Delivered Stocks Capital</Text>
          <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateTotalDelivery(), { symbol: '₱', precision: 2 })}</Text>
                </View>
        </View>
        </View>
      <TouchableOpacity  onPress={()=> navigation.navigate('WarehouseExpiredReport')} style={styles.cardStyle}>
      <View>
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/callendar5.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Expired Products</Text>
                </View>
                <View>
                  
                </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> navigation.navigate('WarehouseDeliveryStockReport')} style={styles.cardStyle}>
      <View >
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/warehouseicons/transfer.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Delivery Reports</Text>
                </View>
                <View>
                  
                </View>
      </TouchableOpacity>
    
      <TouchableOpacity  onPress={()=> navigation.navigate('TransferLogs')} style={styles.cardStyle}>
      <View >
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/warehouseicons/report.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Transfer Logs</Text>
                </View>
                <View>
                  
                </View>
      </TouchableOpacity>
      
            </ScrollView>
        
    </View>
  );
};

WarehouseReports.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  cardStyle: {
    flex:1,
    height: 90,
    backgroundColor: colors.white, 
    marginHorizontal: 20, 
    marginBottom: 10,
    marginTop: 10, 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingHorizontal: 10, 
    alignItems:'center',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  }
});

export default WarehouseReports;
