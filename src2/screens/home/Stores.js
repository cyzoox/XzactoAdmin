import { Text, StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image, ScrollView , TextInput as TextInput2, Picker} from "react-native";
import { Card, ListItem, Avatar, Badge , Overlay, Input, Button,PricingCard} from "react-native-elements";
import { TextInput } from "react-native-paper";
import React from 'react';
import {COLORS, ROUTES} from '../../constants';
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { useState } from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stores = ({navigation}) => {
    const [stores, setStores] = useState([{id: '1', name: 'BGC', branch: 'Langihan'}])
    const [overlayVisible2, setOverlayVisible2] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [branch, setBranch] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setStoreType] = useState('');

    const renderItem = ({ item }) => (
    
        <ListItem bottomDivider underlayColor="white" containerStyle={style.storeCard} onPress={()=> navigation.navigate(ROUTES.STORE_DASHBOARD, {'storess': item})}>
          <Avatar title={item.name[0]} size='large' source={require('../../assets/store.png')}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.branch}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{fontSize: 17, fontWeight:'700', color: COLORS.primary}}>{formatMoney(0, { symbol: '₱', precision: 2 })}</Text>
        </ListItem>
      )


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayLight,
      }}>
         <View style={style.xlgridStyle}>
              <Text style={{fontSize: 40, color: 'white', fontWeight:'700', marginBottom: 20, marginLeft: 20,textAlign:'center',marginTop: 70}}>STORES</Text>
              <TouchableOpacity style={{position: 'absolute', top: 30, right: 20}} onPress={()=> overlayVisible(true)}>
                <Image style={{width: 60, height: 60}} source={require('../../assets/AddStore.png')}/>
              </TouchableOpacity>
            </View>
        <FlatList
                keyExtractor={(key) => key._id}
                data={stores}
                renderItem={renderItem}
                />
        <Overlay
            isVisible={overlayVisible}
            overlayStyle={{ width: "80%", paddingHorizontal: 30, paddingVertical:30 }}
            onBackdropPress={() => setOverlayVisible(false)}
            >
        <View style={{justifyContent:'center', alignItems:'center', marginBottom: 10}}>
          <Text style={{fontSize: 18, fontWeight:'700'}}>Create New Store</Text>
        </View>
        <>
          <TextInput
            placeholder="New Store Name"
            onChangeText={(text) => setNewTaskName(text)}
            autoFocus={true}
            mode="outlined"
            theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
          />
          <TextInput
            placeholder="Branch"
            onChangeText={(text) => setBranch(text)}
            theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
            mode="outlined"
          />
       
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
            secureTextEntry
            maxLength={6}
            mode="outlined"
          />
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
            secureTextEntry
            maxLength={6}
            mode="outlined"
          />
          <View style={{flexDirection:'row', justifyContent:"space-evenly", alignItems:'center', marginTop: 20}}>
          <Button
            title="Cancel"
            buttonStyle={{backgroundColor: COLORS.complimentary, marginTop: 10, width: '80%', alignSelf:'center'}}
            onPress={() => {
              setOverlayVisible(false);
           
            }}
          />
           <Button
            title="Create"
            buttonStyle={{backgroundColor: COLORS.bgColor, marginTop: 10, width: '80%', alignSelf:'center'}}
            onPress={() => {
              setOverlayVisible(false);
              onCreateStore()
            }}
          />
          </View>
         
        </>
      </Overlay>
    </View>
  );
};

export default Stores;

const style = StyleSheet.create({
    text: {
      fontSize: 30
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
    },
    storeCard: {
      margin: 10, 
      borderRadius: 10,
      shadowColor: "#EBECF0",
      shadowOffset: {
        width: 0,
        height: 5,
       
      },
      shadowOpacity: 0.89,
      shadowRadius: 2,
      elevation: 5,
      height: windowHeight /9
    }
  });