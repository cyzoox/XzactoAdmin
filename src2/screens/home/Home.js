import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import { Divider } from "react-native-paper";
import { useState } from 'react';
import formatMoney from 'accounting-js/lib/formatMoney.js'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const [stores, setStores] = useState([{id: '1', name: 'BGC'}])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.grayLight,
      }}>
        <View style={styles.xlgridStyle}>
          <View style={{flex: 1, flexDirection: 'row',alignItems:'center', justifyContent:'space-between', marginHorizontal: 30, marginTop: 10}}>
            <Text style={{textAlign:'center', fontSize: 20, fontWeight:'700', color: COLORS.white}}>Xzacto Admin</Text>
            <TouchableOpacity>
                <Image style={{height: 35, width: 35}} source={require('../../assets/user.png')}/>
            </TouchableOpacity>
          </View>

             <View style={{ flex:2,  borderRadius: 25,
                  borderColor: '#fff',
                  backgroundColor: COLORS.secondary,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  marginHorizontal: 30,
                  marginVertical: 20}}>
                      <View style={{
                        backgroundColor: COLORS.complimentary,
                        width: windowWidth /5,
                        marginHorizontal:15,
                        marginTop:10,
                        borderRadius:25,
                        padding: 5
                      }}>
                        <Text style={{textAlign:'center', fontSize:15, fontWeight:'bold', color: COLORS.white}}>Free</Text>
                      </View>
                      <View style={{marginRight: 20}}>
                        <Text style={{textAlign:'right', color: COLORS.primary, fontWeight:'700', fontSize: 20, marginBottom:10}}>CYRIL QUISMUNDO</Text>
                      </View>
                  </View>
        </View>
        <View style={{   borderRadius: 10,
                  borderColor: '#fff',
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  margin: 15}}>
       <View>
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Today's Sale </Text>
        <Divider/>
                <View>
                  {
                    stores.map((item, index) => {
                      return(
                        <View key={index} style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                        <Text style={{fontSize: 15}}>{formatMoney(0, { symbol: "₱ ", precision: 2 })}</Text>
                      </View>
                      )
                     
                    })
                  }
                 
                 
                </View>
                <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>Total</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>0</Text>
                  </View>
                </View>
                </View>
    </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  xlgridStyle: {
    backgroundColor: COLORS.primary, 
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
});
