import React,{useEffect} from "react";
import { Text, StyleSheet, View, Dimensions , TouchableOpacity, Image, ScrollView } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";

import formatMoney from 'accounting-js/lib/formatMoney.js'
import { COLORS } from "../../constants";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Warehouse = () => {
  return (
    <View style={{flex: 1}}>
    <View style={styles.xlgridStyle}>
        <Text style={{fontSize: 40, color: 'white', fontWeight:'700', marginBottom: 20, marginLeft: 20,textAlign:'center', marginTop: 60}}>Warehouse</Text>
    </View>
   
    <Grid style={{ height:windowHeight/ 4, margin: 10, marginBottom: windowHeight/ 6}}>
    <ScrollView>
        <Row style={{ height: 100, marginBottom: 5 }}>
            <Col  style={styles.sgridStyle}>
                <TouchableOpacity onPress={()=> navigation.navigate('WarehouseProducts')} style={{flex : 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{marginHorizontal:10, fontSize: 20, fontWeight: '700'}}>Inventory</Text>
                    <View style={{marginHorizontal:10,  backgroundColor: COLORS.gray, padding:10,overflow: 'hidden',borderRadius: 50}} onPress={()=> {}}>
                   
                        <Image style={{height: 30, width: 30}} source={require('../../assets/inventory.png')} />
                    </View>
                </TouchableOpacity>
            </Col>
            <Col  style={styles.sgridStyle}>
                    <TouchableOpacity style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} onPress={()=> navigation.navigate('WarehouseReports')}>
                        <Text style={{marginHorizontal:10, fontSize: 20, fontWeight: '700'}}>Reports</Text>
                        <View style={{marginHorizontal:10,  backgroundColor: COLORS.gray, padding:10,overflow: 'hidden',borderRadius: 50}} onPress={()=> {}}>
                        <Image style={{height: 30, width: 30}} source={require('../../assets/statistics.png')} />
                        </View>
                       
                    </TouchableOpacity>
            </Col>
        </Row>
      
        <Row style={styles.lgridStyle}>
            <View style={{height: 50, width: 50, backgroundColor:COLORS.gray, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
            <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
            </View>
            <View>
                <Text style={{color:'gray', fontSize: 16}}>  Remaining Stocks Capital</Text>
            </View>
            <View>
                <Text style={{color:COLORS.secondary, fontSize: 16}}>{formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
            </View>
        </Row>
        <Row style={styles.lgridStyle}>
        <View style={{height: 50, width: 50, backgroundColor: COLORS.gray, borderRadius: 30, justifyContent:'space-between', alignItems:'center'}}>
        <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
            </View>
            <View sty>
                <Text style={{color:'gray', fontSize: 16}}>  Remaining Stocks SRP</Text>
            </View>
            <View>
                <Text style={{color:COLORS.secondary, fontSize: 16}}> {formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
            </View>
        </Row>
        <Row style={styles.lgridStyle}>
        <View style={{height: 50, width: 50, backgroundColor: COLORS.gray, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
        <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
            </View>
            <View>
                <Text style={{color:'gray', fontSize: 16}}> SRP Capital Margin</Text>
            </View>
            <View>
                <Text style={{color:COLORS.secondary, fontSize: 16}}> {formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
            </View>
        </Row>
        <Row style={styles.lgridStyle}>
        <View style={{height: 50, width: 50, backgroundColor: COLORS.gray, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
        <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
            </View>
            <View>
                <Text style={{color:'gray', fontSize: 16}}>  Received Stocks Capital</Text>
            </View>
            <View>
                <Text style={{color:COLORS.secondary, fontSize: 16}}> {formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
            </View>
        </Row>
        <Row style={styles.lgridStyle}>
        <View style={{height: 50, width: 50, backgroundColor: COLORS.gray, borderRadius: 30, justifyContent:'center', alignItems:'center'}}>
        <Image style={{height: 30, width: 30}} source={require('../../assets/capital.png')} />
            </View>
            <View>
                <Text style={{color:'gray', fontSize: 16}}>  Delivered Stocks Capital</Text>
            </View>
            <View>
                <Text style={{color:COLORS.secondary, fontSize: 16}}> {formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
            </View>
        </Row>
        </ScrollView>
    </Grid>

</View>
  );
};

export default Warehouse;

const styles = StyleSheet.create({
    text: {
      fontSize: 30
    },
    cgridStyle : {
      backgroundColor: COLORS.white, 
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
      backgroundColor:COLORS.white, 
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
      backgroundColor: COLORS.white, 
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
      backgroundColor: COLORS.secondary, 
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
  