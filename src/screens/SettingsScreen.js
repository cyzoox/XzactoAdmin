import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import { useStore } from "../context/StoreContext";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";


const SettingsScreen = ({navigation}) => {
  
  const { createStore, updateSettings} = useStore();
  const [settings,setSettings] = useState([{allow_credit: true}])

  const addStore = () => {
    createStore();
  }

  const onClickSwitch = () => {
    updateSettings(!settings[0].allow_credit);
  }

  return (
    <View>
        <AppHeader 
           leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
          centerText="SETTINGS" />
     
        
          {/*
          <TouchableOpacity  style={{ margin: 5, borderRadius: 10, borderColor: colors.accent, borderWidth: 1, flexDirection:'row', justifyContent:'space-between', padding: 10}} onPress={()=> onClickSwitch()}>
          <View style={{flexDirection: 'column',}}>
            <Text style={{fontSize: 17}}>Allow credits</Text>
            <Text style={{color: colors.boldGrey}}>Allow credit options on stores</Text>
          </View>
 <TouchableOpacity onPress={()=> onClickSwitch()}>
            {
              settings[0].allow_credit == true ?
              <MaterialCommunityIcons  name={'toggle-switch'} size={45} color={colors.green}/> :
              <MaterialCo
              
              \]mmunityIcons  name={'toggle-switch-off'} size={45} color={colors.red}/>
            }
            
          </TouchableOpacity>
        </TouchableOpacity>
          */}
         
        <TouchableOpacity  style={{ margin: 5, borderRadius: 10, borderColor: colors.accent, borderWidth: 1, flexDirection:'row', justifyContent:'space-between', padding: 10}} onPress={()=>{}}>
          <View style={{flexDirection: 'column',}}>
            <Text style={{fontSize: 17}}>Currency</Text>
            <Text style={{color: colors.boldGrey}}>Choose or change currency DISABLED</Text>
          </View>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 18, marginLeft: 100}}>PHP</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={()=> {}}>
              <MaterialCommunityIcons  name={'chevron-right'} size={30} color={colors.black}/>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity  style={{ margin: 5, borderRadius: 10, borderColor: colors.accent, borderWidth: 1, flexDirection:'row', justifyContent:'space-between', padding: 10}} onPress={()=> navigation.navigate('Bluetooth')}>
          <View style={{flexDirection: 'column',}}>
            <Text style={{fontSize: 17}}>Bluetooth Settings</Text>
            <Text style={{color: colors.boldGrey}}>Choose Blutooth Printer</Text>
          </View>
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 18, marginLeft: 100}}>PHP</Text>
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={()=> {}}>
              <MaterialCommunityIcons  name={'chevron-right'} size={30} color={colors.black}/>
          </TouchableOpacity>
        </TouchableOpacity>
    </View>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default SettingsScreen;
