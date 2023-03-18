import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import CardTiles from "../components/CardTiles";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import colors from "../themes/colors";

const WarehouseScreen = () => {
  return (
    <View  style={{flex:1}}>
      <AppHeader centerText="Warehouse" gradient/>
      <ScrollView>  
      <CardTiles
              rightTileText="Suppliers"
              leftTileText="Products"
              iconRightName='md-settings-outline'
              iconLeftName='md-person-add-outline'
              leftRouteName="WarehouseProducts"
              rightRouteName="WarehouseSupplier"
              extraProps={[]}
          />
          <CardTiles
              rightTileText="Stocks Delivered"
              leftTileText="Reports"
              iconRightName='md-settings-outline'
              iconLeftName='md-person-add-outline'
              leftRouteName="WarehouseReports"
              rightRouteName="WarehouseDeliveryStockReport"
              extraProps={[]}
          />
           <View style={{flexDirection:'column', margin: 10,padding: 10, backgroundColor: colors.charcoalGrey, borderRadius: 10}}>
            <View>
                <Text style={{color: colors.white, fontWeight:'900', fontSize: 17}}>Actual Capital of Stocks in Bodega</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{color: colors.white, fontSize: 17}}>{formatMoney(0, { symbol: "₱", precision: 2 })}</Text>
            </View>
          </View>
          <View style={{flexDirection:'column', margin: 10,padding: 10, backgroundColor: colors.charcoalGrey, borderRadius: 10}}>
            <View>
                <Text style={{color: colors.white, fontWeight:'900', fontSize: 17}}>Amount of Stocks in Bodega less B.O</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{color: colors.white, fontSize: 17}}>{formatMoney(0, { symbol: "₱", precision: 2 })}</Text>
            </View>
          </View>
          <View style={{flexDirection:'column', margin: 10,padding: 10, backgroundColor: colors.charcoalGrey, borderRadius: 10}}>
            <View>
                <Text style={{color: colors.white, fontWeight:'900', fontSize: 17}}>Projected Income</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Text style={{color: colors.white, fontSize: 17}}>{formatMoney(0, { symbol: "₱", precision: 2 })}</Text>
            </View>
          </View>
        </ScrollView>  
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default WarehouseScreen;
