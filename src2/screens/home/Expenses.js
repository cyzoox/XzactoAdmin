import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView,Modal,Image } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {COLORS} from '../../constants';
import AppHeader from '../../components/AppHeader';
import { useState } from 'react';
import { ModalInputForm } from '../../components/ModalInputForm';
import {TextInput } from 'react-native-paper';

const Expenses = () => {
    const [description, setExpense] = useState('')
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayLight,
      }}>
   <AppHeader 
          centerText="Expenses"
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={COLORS.white}/>
            </TouchableOpacity>
        }
        rightComponent={
          <ModalInputForm
                displayComponent={
                    <>
                        <EvilIcons style={{textAlign:'center'}}  name={'plus'} size={30} color={COLORS.white}/>
                    </>
                }
                title="Add Expenses" 
                onSave={()=>{}}>
              <TextInput
                    mode="outlined"
                    label="Description"
                    placeholder="Description"
                    onChangeText={(text)=> setExpense(text)}
                    theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
                    />
              <TextInput
                    mode="outlined"
                    label="Amount"
                    placeholder="Amount"
                    onChangeText={(text)=> setAmount(text)}
                    theme={{ colors: { primary: COLORS.primary,underlineColor:'transparent',}}}
                    />
              </ModalInputForm>
      }
         />
      <View>
        <View>
            <Text style={{marginLeft: 15, marginTop: 20, fontSize: 18, fontWeight:'700'}}>Nov 30, Wednesday</Text>
        </View>
        <View style={{backgroundColor: COLORS.gray, height:3, marginHorizontal: 15, marginVertical:10}}/>
      </View>
      <View style={{justifyContent:'space-between', marginHorizontal: 20, flexDirection:'row', alignItems:"center"}}>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../../assets/expenses.png')} style={{height: 35, width: 35, marginRight:20}}/>
        <Text style={{fontSize: 16, fontWeight:'bold'}}>Food</Text>
        </View>
   
        <Text style={{fontSize: 16, fontWeight:'bold', color: COLORS.complimentary, textAlign:'center'}}>- P50.00</Text>
      </View>
      <View style={{backgroundColor: COLORS.gray, height:1, marginHorizontal: 20, marginVertical:10}}/>
      <View style={{justifyContent:'space-between', marginHorizontal: 20, flexDirection:'row', alignItems:"center"}}>
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../../assets/expenses.png')} style={{height: 35, width: 35, marginRight:20}}/>
        <Text style={{fontSize: 16, fontWeight:'bold'}}>Food</Text>
        </View>
        <Text style={{fontSize: 16, fontWeight:'bold', color: COLORS.complimentary}}>- P50.00</Text>
      </View>
      <View style={{backgroundColor: COLORS.gray, height:1, marginHorizontal: 20, marginVertical:10}}/>
    </View>
  );
};

export default Expenses;
