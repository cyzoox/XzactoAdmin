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


  // useEffect(() => {
  //   Orientation.lockToPortrait()
  // });


 



  return (
    <View style={{flex: 1}}>
        <View style={styles.xlgridStyle}>
            <Text style={{fontSize: 40, color: 'white', fontWeight:'700', marginBottom: 20, marginLeft: 20,textAlign:'center', marginTop: 60}}>Warehouse</Text>
        </View>
       
        <Grid style={{ height:windowHeight/ 4, margin: 10}}>
        <ScrollView>
          
              <Row>
                <TouchableOpacity style={styles.lgridStyle} onPress={()=> navigation.navigate('WarehouseProducts')} >
                <View>
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/warehouseicons/warehouse1.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Inventory Management</Text>
                </View>
                <View>
                  
                </View>
                </TouchableOpacity>
             
            </Row>
            <Row>
                <TouchableOpacity style={styles.lgridStyle} onPress={()=> navigation.navigate('WarehouseReports')} >
                <View >
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/warehouseicons/logs.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Warehouse Reports</Text>
                </View>
                <View>
                  
                </View>
                </TouchableOpacity>
             
            </Row>
            <Row>
                <TouchableOpacity style={styles.lgridStyle} onPress={()=> navigation.navigate('WarehouseSupplier')} >
                <View >
                <Image style={{height: 60, width: 60}} source={require('../../assets/xzacto_icons/iconsstore/supplier1.png')} />
                </View>
                <View>
                    <Text style={{color:'gray', fontSize: 19, fontWeight:'900'}}>Suppliers</Text>
                </View>
                <View>
                  
                </View>
                </TouchableOpacity>
             
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
    flex:1,
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
