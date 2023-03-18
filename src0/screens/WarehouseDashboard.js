import React,{useEffect} from "react";
import { Text, StyleSheet, View, Dimensions , TouchableOpacity, Image, ScrollView } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
// import Orientation from 'react-native-orientation';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WarehouseDashboard = ({navigation}) => {
  const { 
    transfer_logs,
    warehouse_products,
    warehouse_delivery_report_summary
  } = useStore();

  // useEffect(() => {
  //   Orientation.lockToPortrait()
  // });


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




  return (
    <View style={{flex: 1}}>
        <View style={styles.xlgridStyle}>
            <Text style={{fontSize: 40, color: 'white', fontWeight:'700', marginBottom: 20, marginLeft: 20,textAlign:'center', marginTop: 60}}>Warehouse</Text>
        </View>
       
        <Grid style={{ height:windowHeight/ 4, margin: 10}}>
        <ScrollView>
            <Row style={{ height: 100, marginBottom: 5 }}>
                <Col  style={styles.sgridStyle}>
                    <TouchableOpacity onPress={()=> navigation.navigate('WarehouseProducts')} style={{flex : 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{marginHorizontal:10, fontSize: 20, fontWeight: '700'}}>Inventory</Text>
                        <View style={{marginHorizontal:10,  backgroundColor: colors.boldGrey, padding:10,overflow: 'hidden',borderRadius: 50}} onPress={()=> {}}>
                       
                            <Image style={{height: 30, width: 30}} source={require('../../assets/inventory.png')} />
                        </View>
                    </TouchableOpacity>
                </Col>
                <Col  style={styles.sgridStyle}>
                        <TouchableOpacity style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=> navigation.navigate('WarehouseReports')}>
                            <Text style={{marginHorizontal:10, fontSize: 20, fontWeight: '700'}}>Reports</Text>
                            <View style={{marginHorizontal:10,  backgroundColor: colors.boldGrey, padding:10,overflow: 'hidden',borderRadius: 50}} onPress={()=> {}}>
                            <Image style={{height: 30, width: 30}} source={require('../../assets/statistics.png')} />
                            </View>
                           
                        </TouchableOpacity>
                </Col>
            </Row>
          
            <Row style={styles.lgridStyle}>
                <View style={{height: 50, width: 50, backgroundColor:colors.boldGrey, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
                <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 16}}>  Remaining Stocks Capital</Text>
                </View>
                <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}>{formatMoney(calculateTotalCapital(), { symbol: '₱', precision: 2 })}</Text>
                </View>
            </Row>
            <Row style={styles.lgridStyle}>
            <View style={{height: 50, width: 50, backgroundColor: colors.boldGrey, borderRadius: 30, justifyContent:'space-between', alignItems:'center'}}>
            <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
                </View>
                <View sty>
                    <Text style={{color:'gray', fontSize: 16}}>  Remaining Stocks SRP</Text>
                </View>
                <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateCapitalInStock(), { symbol: '₱', precision: 2 })}</Text>
                </View>
            </Row>
            <Row style={styles.lgridStyle}>
            <View style={{height: 50, width: 50, backgroundColor: colors.boldGrey, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
            <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 16}}> SRP Capital Margin</Text>
                </View>
                <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateProjectedIncome(), { symbol: '₱', precision: 2 })}</Text>
                </View>
            </Row>
            <Row style={styles.lgridStyle}>
            <View style={{height: 50, width: 50, backgroundColor: colors.boldGrey, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
            <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 16}}>  Received Stocks Capital</Text>
                </View>
                <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateTotalReceived(), { symbol: '₱', precision: 2 })}</Text>
                </View>
            </Row>
            <Row style={styles.lgridStyle}>
            <View style={{height: 50, width: 50, backgroundColor: colors.boldGrey, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
            <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 16}}>  Delivered Stocks Capital</Text>
                </View>
                <View>
                    <Text style={{color:colors.secondary, fontSize: 16}}> {formatMoney(calculateTotalDelivery(), { symbol: '₱', precision: 2 })}</Text>
                </View>
            </Row>
            </ScrollView>
        </Grid>
   
    </View>
  );
};

WarehouseDashboard.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  cgridStyle : {
    backgroundColor: colors.white, 
    height: 100, width: windowWidth/1.5, 
    marginTop: -60, 
    alignSelf:'center', 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  sgridStyle : {
    backgroundColor:colors.white, 
    marginRight: 5, 
    borderRadius: 15,
    alignItems:'center', 
    flexDirection:'row', 
    justifyContent:'space-between',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  lgridStyle : {
    height: 90,
    backgroundColor: colors.white, 
    margin: 5, 
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
  },
  xlgridStyle: {
    backgroundColor: colors.secondary, 
    height:windowHeight/ 4, 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    justifyContent:'center',
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

export default WarehouseDashboard;
