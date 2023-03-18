import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import { AddCustomer } from "../components/AddCustomer";
import { ListItem, Avatar } from 'react-native-elements'

const CustomersAndCreditScreen = ({navigation, route}) => {
  const STORE =  route.params.store
  const { 
   
    createCustomer,
    customers
  } = useStore();


  const keyExtractor = (item, index) => index.toString()

const renderItem = ({ item }) => (
  item.store_id === STORE._id &&
  <ListItem onPress={()=> navigation.navigate('CreditDetails', {customer: item, store: STORE})} bottomDivider containerStyle={{borderRadius: 10, marginHorizontal: 15, marginVertical: 2}}>
         <Avatar title={item.name[0]} size='medium' source={require('../../assets/user.png')}/>
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
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
  }
});

export default CustomersAndCreditScreen;
