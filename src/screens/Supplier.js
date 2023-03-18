import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, FlatList , View} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { ListItem, Avatar } from 'react-native-elements'
import { ModalInputForm } from "../components/ModalInputForm";
import { useStore } from "../context/StoreContext";
import { TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { useAuth } from "../context/AuthContext";
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['store_id'];

const Supplier = ({ navigation, route }) => {
    const store_data =  route.params.store
    const { user } = useAuth();
    const {suppliers, createSupplier } = useStore();
    const [supplier, setSupplier] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const filteredSupplier = suppliers.filter(createFilter(store_data._id, KEYS_TO_FILTERS))

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem bottomDivider containerStyle={styles.listStyle}>
          <Avatar containerStyle={{
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor:colors.white
        }} size={50} source={require('../../assets/xzacto_icons/iconsstore/supplier2.png')}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )
    

    const saveSupplier = () => {
      
        let suppliers = {
            id: uuid.v4(),
            partition: `project=${user.id}`,
            name: supplier,
            contact: contact,
            address: address,
            store_id: store_data._id
        }
        createSupplier(suppliers)
    }

  return(
      <View>
          <AppHeader 
            centerText="Supplier"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              }
            rightComponent={
                <ModalInputForm title="Add Supplier" onSave={saveSupplier}
                    displayComponent={
                        <>
                        <EvilIcons style={{textAlign:'center'}}  name={'plus'} size={30} color={colors.white}/>
                    
                        </>
                    }
                >
                <TextInput
                    mode="outlined"
                    label="Supplier Name"
                    placeholder="Supplier Name"
                    onChangeText={(text)=> setSupplier(text)}
                    />
                <TextInput
                    mode="outlined"
                    label="Contact Details"
                    placeholder="Contact Details"
                    onChangeText={(text)=> setContact(text)}
                    />
                <TextInput
                    mode="outlined"
                    label="Address"
                    placeholder="Address"
                    onChangeText={(text)=> setAddress(text)}
                    />
                </ModalInputForm>
            }
          />
           <FlatList
            keyExtractor={keyExtractor}
            data={filteredSupplier}
            renderItem={renderItem}
        />
      </View>
  );
};

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

export default Supplier;
