import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity,FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from "../themes/colors";
import { ListItem, Card } from 'react-native-elements'

import formatMoney from 'accounting-js/lib/formatMoney.js'
import { useStore } from "../context/StoreContext";

const TransactionSetailsScreen = ({navigation, route}) => {
const { transactions } = route.params;
const {getTRDetails,trdetails } = useStore();

  useEffect(() => {
    getTRDetails(transactions._id)
  },[]);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
                <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text>x{item.quantity}</Text>
                    <Text>{item.name}</Text>
                    <Text style={{color: colors.red}}>{formatMoney(item.quantity * item.sprice, { symbol: "₱", precision: 2 })}</Text>
                </ListItem.Content>
            </ListItem>
  )

  const calculateTotal = () => {
    let total = 0;
    trdetails.forEach(list => {
            total += list.quantity * list.sprice  
    });
   return total;
}

  return (
      <View>
          <AppHeader 
            centerText="Transaction Details"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
            } 
           
          />
          <Card containerStyle={{padding: 0}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15}}>
              <View>
                <Text style={{fontWeight:'bold'}}>Customer : {transactions.customer_name ? transactions.customer_name : "None"}</Text>
                <Text style={{fontWeight:'bold'}}>Date :           {transactions.date}</Text>
                
              </View>
              <View>
              <AntDesign name={'printer'} size={25} color={colors.red}/>
              </View>
            </View>
          
                <ListItem bottomDivider>
                <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold'}}>Qty</Text>
                    <Text style={{fontWeight:'bold'}}>Product</Text>
                    <Text style={{fontWeight:'bold'}}>Total</Text>
                </ListItem.Content>
               
            </ListItem>
            <FlatList
                keyExtractor={(key) => key.name}
                data={trdetails}
                renderItem={renderItem}
                />
                <ListItem>
                  <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold'}}>Total</Text>
                      <Text></Text>
                      <Text style={{fontWeight:'bold', color: colors.red}}>{formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}</Text>
                  </ListItem.Content>
                </ListItem>
            </Card>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default TransactionSetailsScreen;
