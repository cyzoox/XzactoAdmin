import React from "react";
import { Text, StyleSheet, View, TouchableOpacity,ScrollView} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { Card, List } from 'react-native-paper';
import {  ListItem, Avatar} from "react-native-elements";
import { useStore } from "../context/StoreContext";




const WarehouseReports = ({navigation}) => {
  const {products} = useStore();
  const [expanded, setExpanded] = React.useState(true);

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

      <ListItem underlayColor={"#dedede"} onPress={()=> navigation.navigate('WarehouseExpiredReport')} containerStyle={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems:'center'}} bottomDivider>
        <Avatar containerStyle={{
              borderColor: 'grey',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor:'gray'
            }} size={45} icon={{ name: 'calendar-times-o', type: 'font-awesome', color: '#ffffff' }}/>
        <ListItem.Content >
          <ListItem.Title>Expired Reports</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem underlayColor={"#dedede"} onPress={()=> navigation.navigate('WarehouseDeliveryStockReport')} containerStyle={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems:'center'}} bottomDivider>
        <Avatar containerStyle={{
              borderColor: 'grey',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor:'gray'
            }} size={45} icon={{ name: 'calendar-times-o', type: 'font-awesome', color: '#ffffff' }}/>
        <ListItem.Content >
          <ListItem.Title>Delivery Reports</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
  
      <ListItem underlayColor={"#dedede"} onPress={()=> navigation.navigate('TransferLogs')} containerStyle={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems:'center'}} bottomDivider>
        <Avatar containerStyle={{
              borderColor: 'grey',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor:'gray'
            }} size={45} icon={{ name: 'calendar-times-o', type: 'font-awesome', color: '#ffffff' }}/>
        <ListItem.Content >
          <ListItem.Title>Transfer Logs</ListItem.Title>
          <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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
  }
});

export default WarehouseReports;
