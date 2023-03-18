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

const WarehouseSupplier = ({ navigation }) => {
    const { user } = useAuth();
    const {warehouse_supplier, createWarehouseSupplier } = useStore();
    const [supplier, setSupplier] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
          <Avatar source={{uri: item.avatar_url}} />
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
            owner_id: user.id
        }
        createWarehouseSupplier(suppliers)
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
            data={warehouse_supplier}
            renderItem={renderItem}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default WarehouseSupplier;
