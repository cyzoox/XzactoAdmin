import React, { useState,useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image, ScrollView , TextInput as TextInput2} from "react-native";
import { Card, ListItem, Avatar, Badge , Overlay, Input, Button,PricingCard} from "react-native-elements";
import Picker from '@react-native-picker/picker'
// import Loader from "../components/Loader";
import { useStore } from "../context/StoreContext";  
import colors from "../themes/colors";

import formatMoney from 'accounting-js/lib/formatMoney.js'
import moment from 'moment'
import { TextInput } from "react-native-paper";
// import Orientation from 'react-native-orientation';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['date'];
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
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
  const [upgrade_plan, setUpgradePlan] = useState(false)
  const date = moment().unix()
  const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
  
  const filteredTransaction = transactions.filter(createFilter(today, KEYS_TO_FILTERS))

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

    filteredTransaction.forEach(item => {
      if(item.store_id === id && item.status === "Completed"){
        total += item.total;
      }
    });

    return total;
  }

    const renderItem = ({ item }) => (
    
        <ListItem bottomDivider underlayColor="white" containerStyle={style.lgridStyle} onPress={()=> navigation.navigate('StoreDashboard', {'storess': item})}>
          <Avatar title={item.name[0]} size='large' source={require('../../assets/xzacto_icons/iconsstore/stores2.png')}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.branch}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{fontSize: 17, fontWeight:'700', color: colors.primary}}>{formatMoney(calculateDailySales(item._id), { symbol: '₱', precision: 2 })}</Text>
        </ListItem>
      )
     
      const onAddStore = () => {
          if(user_info[0].no_of_stores === stores.length || user_info[0].no_of_stores < stores.length){
            setUpgradePlan(true)
          }else{
            setOverlayVisible(true)
          }
      }

    return (
        <View style={{flex:1}}>
           <Alert visible={upgrade_plan} onCancel={()=> setUpgradePlan(false)} onProceed={()=> setOverlayVisible2(true)}  title="Upgrade Plan" content="Maximum number of stores has been reach please upgrade your plan." confirmTitle="OK"/>
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
        overlayStyle={{ width: "90%", borderRadius: 15 }}
        onBackdropPress={() => setOverlayVisible2(false)}
      >

            <Text style={{fontSize:25, fontWeight:'700', textAlign:'center', marginTop: 10, color: colors.primary}}>Upgrade your plan</Text>
        <View style={{justifyContent:'center', alignItems:'center', marginBottom: 10}}>
          <ScrollView contentContainerStyle={{marginTop: 10}} horizontal>
          <PricingCard
          color={colors.accent}
          containerStyle={{borderRadius: 15, borderColor: colors.primary}}
          title="Basic Plan"
          price="180.00"
          info={['1 Store', '1 Cashier', '15 products']}
          button={{ title: ' SUBSCRIBE' }}
        />
        <PricingCard
          color={colors.accent}
          containerStyle={{borderRadius: 15, borderColor: colors.primary}}
          title="Standard Plan"
          price="480.00"
          info={['1 Store', '2 Cashier','30 Products']}
          button={{ title: ' SUBSCRIBE'}}
        />
        <PricingCard
           color={colors.accent}
           containerStyle={{borderRadius: 15, borderColor: colors.primary}}
            
          title="Premium Plan"
          price="820.00"
          info={['2 Store', '2 Cashier', '100 Products']}
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
  },
  lgridStyle : {
    flex:1,
    height: 90,
    padding:10,
    backgroundColor: colors.white, 
    marginHorizontal: 15, 
    marginTop: 10, 
    marginBottom: 5,
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
});

export default StoresList;
