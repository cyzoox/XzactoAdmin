import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Leaderboard from 'react-native-leaderboard';
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['store_id'];

const TopSeller = ({navigation, route}) => {
  const store = route.params.info;
  const { alltrdetails} = useStore();
  const filteredProducts = alltrdetails.filter(createFilter(store._id, KEYS_TO_FILTERS));

const reducerArray= ()=>{  
    const result = filteredProducts.reduce((r, { product_id, name, quantity }) => {
        var temp = r.find(o => o.product_id === product_id);
        if (!temp) {
            r.push({ product_id, name, quantity });
        } else {
            temp.quantity += Math.round(quantity * 100) / 100;
        }
        return r;
    }, []);
 

   const  results = result.sort((a, b) =>  b.quantity - a.quantity);

    return results;
       
    }

 

  return(
      <View style={{flex: 1}}>
          <AppHeader
          centerText="Top Seller" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          } 
          />
        <View style={{marginHorizontal: 10}}>
        <View
          style={{
            paddingTop: 20,
            backgroundColor: colors.charcoalGrey,
            alignItems: "center",
            justifyContent:'center',
            alignItems:'center'
          }}
        >
        <Text style={{ fontSize: 30, color: "white", paddingBottom: 10, color: colors.accent }}>
            Top Selling Products
        </Text>
        </View>
          <Leaderboard 
            data={reducerArray()} 
            sortBy='quantity' 
            labelBy='name'
            rankStyle={{fontSize: 15}}
            scoreStyle={{fontSize: 15}}
            labelStyle={{fontSize: 15}}
            />
        </View>
         
      </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default TopSeller;
