import React, { useState,useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image, ScrollView , TextInput as TextInput2} from "react-native";
import { Card, ListItem, Avatar, Badge , Overlay, Input, Button,PricingCard} from "react-native-elements";
import Picker from '@react-native-picker/picker'
// import Loader from "../components/Loader";
import { useStore } from "../context/StoreContext";  
import colors from "../themes/colors";

import formatMoney from 'accounting-js/lib/formatMoney.js'

import { TextInput } from "react-native-paper";
// import Orientation from 'react-native-orientation';

import { useAuth } from "../context/AuthContext";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StoresList = ({ navigation }) => {
  const {user} = useAuth();
  const { createStore,  stores, loading, transactions ,
    user_info} = useStore();
  
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayVisible2, setOverlayVisible2] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setStoreType] = useState('');


  // useEffect(() => {
  //   Orientation.lockToPortrait()
 
  // });

  const onCreateStore = () => {
    if(password !== confirmPassword){
      alert('Password doesnt match.')
      return;
    }
    createStore(newTaskName, branch, password, 'Grocery');
  }

  const calculateDailySales = (id) => {
    let total = 0;

    transactions.forEach(item => {
      if(item.store_id === id && item.status === "Completed"){
        total += item.total;
      }
    });

    return total;
  }

    const renderItem = ({ item }) => (
    
        <ListItem bottomDivider underlayColor="white" containerStyle={style.storeCard} onPress={()=> navigation.navigate('StoreDashboard', {'storess': item})}>
          <Avatar title={item.name[0]} size='large' source={require('../../assets/store.png')}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.branch}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{fontSize: 17, fontWeight:'700', color: colors.primary}}>{formatMoney(calculateDailySales(item._id), { symbol: '₱', precision: 2 })}</Text>
        </ListItem>
      )

      const onAddStore = () => {
        switch (stores.length) {
          case 0:
            setOverlayVisible(true)
            break;
          case 1:
            setOverlayVisible(true)
            break;
          case 2:
            setOverlayVisible(true)
            break;
          case 3:
            setOverlayVisible(true)
            break;

          default:
            break;
        }
      }

    return (
        <View style={{flex:1}}>
            {/* <Loader loading={loading}/> */}
            <View style={style.xlgridStyle}>
              <Text style={{fontSize: 40, color: 'white', fontWeight:'700', marginBottom: 20, marginLeft: 20,textAlign:'center',marginTop: 70}}>STORES</Text>
              <TouchableOpacity style={{position: 'absolute', top: 30, right: 20}} onPress={()=> onAddStore()}>
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
        overlayStyle={{ width: "80%" }}
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
          />
          <TextInput
            placeholder="Branch"
            onChangeText={(text) => setBranch(text)}
           
            mode="outlined"
          />
        
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
        
            secureTextEntry
            maxLength={6}
            mode="outlined"
          />
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
          
            secureTextEntry
            maxLength={6}
            mode="outlined"
          />
          <View style={{flexDirection:'row', justifyContent:"space-evenly", alignItems:'center'}}>
          <Button
            title="Cancel"
            buttonStyle={{backgroundColor: colors.red, marginTop: 10, width: '80%', alignSelf:'center'}}
            onPress={() => {
              setOverlayVisible(false);
           
            }}
          />
           <Button
            title="Create"
            buttonStyle={{backgroundColor: colors.green, marginTop: 10, width: '80%', alignSelf:'center'}}
            onPress={() => {
              setOverlayVisible(false);
              onCreateStore()
            }}
          />
          </View>
         
        </>
      </Overlay>
      <Overlay
        isVisible={overlayVisible2}
        overlayStyle={{ width: "80%" }}
        onBackdropPress={() => setOverlayVisible2(false)}
      >
           <TouchableOpacity onPress={()=> setOverlayVisible2(false)} style={{position:'absolute', right: 10, top: 10}}>
              <Text style={{textDecorationLine:'underline', fontSize:14, color: 'red'}}>Close</Text>
            </TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'700', textAlign:'center', marginTop: 10}}>Choose Plan</Text>
        <View style={{justifyContent:'center', alignItems:'center', marginBottom: 10}}>
          <ScrollView contentContainerStyle={{marginTop: 10}} horizontal>
          <PricingCard
          color="#cd7f32"
          title="Bronze Plan"
          price="₱250.00"
          info={['2 Stores', 'Basic Support', '']}
          button={{ title: ' SUBSCRIBE' }}
        />
        <PricingCard
          color="#C0C0C0"
          title="Silver Plan"
          price="₱500.00"
          info={['5 Stores', 'Priority CS','']}
          button={{ title: ' SUBSCRIBE' }}
        />
        <PricingCard
          color="#D4AF37"
          title="Gold Plan"
          price="₱1000.00"
          info={['10 Store', 'Priority CS', 'Access to Warehouse Feature']}
          button={{ title: ' SUBSCRIBE' }}
        />
          </ScrollView>
        
        </View>
      </Overlay>
        </View>
      );
};

StoresList.navigationOptions = () => {
  return {
    headerShown: false
  };
}
const style = StyleSheet.create({
  text: {
    fontSize: 30
  },
  xlgridStyle: {
    backgroundColor: colors.primary, 
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
  }
});

export default StoresList;
