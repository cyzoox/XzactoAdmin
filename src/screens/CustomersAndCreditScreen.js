import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import { AddCustomer } from "../components/AddCustomer";
import { ListItem, Avatar, Overlay, Button } from 'react-native-elements'
import { useState } from "react";
import { TextInput } from "react-native-paper";

const CustomersAndCreditScreen = ({navigation, route}) => {
  const STORE =  route.params.store
  const { 
   
    createCustomer,
    customers,
    updateCustomer
  } = useStore();
 
  const [c_name, setName] = useState('');
  const [c_address, setAddress]= useState('');
  const [c_mobile, setMobile]= useState('');
  const [c_balance, setBalance]= useState('');
  const [c_info, setCustomerInfo]= useState([]);
  const [overlayVisible, setOverlayVisible]= useState(false);
  const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }) => (
  item.store_id === STORE._id &&
  
  <ListItem underlayColor={'#fffff'} 
  // onPress={()=> navigation.navigate('CreditDetails', {customer: item, store: STORE})}
   bottomDivider containerStyle={styles.listStyle}>
         <Avatar title={item.name[0]} size={60} source={require('../../assets//xzacto_icons/iconsstore/customer.png')}/>
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
    </ListItem.Content>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=> {setCustomerInfo(item),setAddress(item.address),setName(item.name),setMobile(item.mobile_no),setBalance(item.credit_balance), setOverlayVisible(true)}}>
        <FontAwesome name={'edit'} size={25} color={colors.primary}/>
      </TouchableOpacity>
    
    <View style={{width: 20}}></View>
    <FontAwesome name={'expeditedssl'} size={25} color={colors.red}/>
    <View style={{width: 10}}></View>
    </View>
   
  </ListItem>
)

  return (
    <View>
        <AppHeader 
          centerText="Customers & Credits" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        rightComponent={
          <AddCustomer createCustomer={createCustomer} store={STORE} />
        }/>
        <FlatList
        keyExtractor={keyExtractor}
        data={customers}
        renderItem={renderItem}
      />
        <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "70%" , paddingHorizontal: 30, paddingBottom: 20, paddingTop:15}}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
        <Text style={{textAlign:'center', fontSize: 18, fontWeight:'700', marginBottom:10}}>Edit Customer Details</Text>
          <TextInput
          mode="outlined"
          value={c_name}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
           
          />
           <TextInput
          mode="outlined"
          value={c_address}
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
           
          />
        <TextInput
          mode="outlined"
          value={c_mobile}
            placeholder="Mobile No."
            onChangeText={(text) => setMobile(text)}
           
          />
         <TextInput
          mode="outlined"
          value={`${c_balance}`}
            placeholder="Credit Balance"
            onChangeText={(text) => setBalance(text)}
           
          />
          <Button
            title="Save"
            buttonStyle={{marginTop: 20, backgroundColor: colors.accent}}
            onPress={() => {
              setOverlayVisible(false);
              updateCustomer(c_info,{name: c_name, address: c_address, mobile_no: c_mobile,credit_balance: parseFloat(c_balance) })
            }}
          />
        </>
      </Overlay>
    </View>
  );
};

CustomersAndCreditScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  listStyle: {
    flex:1,
    height: 75,
    backgroundColor: colors.white, 
    marginHorizontal: 15,
    paddingHorizontal: 15, 
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

export default CustomersAndCreditScreen;
