import React,{useEffect, useState} from "react";
import { Text, StyleSheet, View, Dimensions , TouchableOpacity, Image, ScrollView } from "react-native";
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Divider } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
// import Loader from "../components/Loader";
import app from "../../getRealmApp";
import moment from 'moment'

import AlertwithChild from "../components/AlertwithChild";
import { Button } from "react-native-elements";
const DashboardScreen = ({navigation}) => {
  const {signOut, projectData} = useAuth();
  const { 
    stores,
    loading,
    products,
    expenses, 
    transactions,
   
   
  } = useStore();
// Access a logged in user's read-only custom data
const [sub_alert, setSubsciptionAlert] = useState(false)
const [alert_visible, alertVisible] = useState(false);
const customData = app.currentUser.customData;
const [text, setText] = useState('');
  const hasUnsavedChanges = Boolean(text);
const [totalDuration, setTotalDuration] = useState(0);

const userData = async() => {
  await app.currentUser.refreshCustomData();
}



useEffect(
    () =>
     {  navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return
  })
      userData()

      const date = moment().unix()
  
      if(moment().unix() > parseInt(customData.privilege_due)){
        setSubsciptionAlert(true)
      }
      },
    [navigation, hasUnsavedChanges]
  );
  
  const calculateTotalCapital = () => {
    let total = 0
    products.forEach(items => {
      total += items.oprice * items.stock
    });
    return total;
  }

  const calculateCapitalInStock = () => {
    let total = 0
    products.forEach(items => {
      total += items.sprice * items.stock
    });
    return total;
  }

  const calculateStoreExpenses = (id) => {
    let total = 0;
    expenses.forEach(item => {
      if(item.store_id === id){
        total += item.amount
      }
      
    });
    return total;
  }

  const calculateProjectedIncome = () => {
    let total = 0
    products.forEach(items => {
      total += (items.sprice - items.oprice ) + items.stock
    });
    return total;
  }

  const calculateStoreSale = (id) => {
      let total = 0;

      transactions.forEach(item => {
        if(item.store_id === id  && item.status === "Completed"){
          total += item.total;
        }
       
      });

      return total;
  }

  const onsignOut = () => {
    alertVisible(true)
  }


  return (
    <View style={{flex: 1}}>
      {/* <Loader loading={loading}/> */}
 
        <AlertwithChild
          visible={alert_visible}
          onProceed={signOut}
          title="Sign Out?"
          confirmTitle="Sign Out"
          onCancel={()=> alertVisible(false)}
        >
          <Text style={{paddingHorizontal:30, textAlign:'center', paddingVertical:10}}>Are you sure you want to sign out?</Text>
        </AlertwithChild>
       <View style={styles.xlgridStyle}>
         <View style={{position: 'absolute', top: 20, left: 20}}>
           <Text style={{fontSize:25, color: colors.white, marginLeft:15}}>XZACTO ADMIN</Text>
         </View>
           
    
              <TouchableOpacity style={{position: 'absolute', top: 20, right: 20}} onPress={onsignOut}>
                <Image style={{width: 40, height: 40}} source={require('../../assets/logout.png')}/>
              </TouchableOpacity>
           <View style={styles.xlsubgrid}>
            <View style={{flex:1}}>
              <View style={styles.xlsubgrid2}>
                <Text style={{color: colors.primary, fontWeight:'700', marginRight:10, fontSize:17}}>{`${customData.name}`}</Text>
                <Button onPress={()=> navigation.navigate('Subscription')} buttonStyle={{ flex:1,backgroundColor: colors.primary, marginRight: 20}} title={`     ${customData.privilege}     `} />
                
              </View>
              <View style={styles.xlsubgrid3}>
              <TouchableOpacity style={{justifyContent:'center', marginRight: 20}}  onPress={onsignOut}>
                <Image style={{width: 38, height: 38}} source={require('../../assets/expired.png')}/>
              </TouchableOpacity>
                 
                  <Button buttonStyle={{borderColor:colors.coverDark}} titleStyle={{color:colors.primary, fontSize:13}} title={`${moment.unix(customData.privilege_due).format('DD MMM YYYY hh:mm:ss A')}`} type="outline"/>
              
              </View>
              </View>
            
           </View>
      
        </View>

    <ScrollView>
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
                        <Text style={{fontSize: 15}}>{formatMoney(calculateStoreSale(item._id), { symbol: "₱ ", precision: 2 })}</Text>
                      </View>
                      )
                     
                    })
                  }
                 
                 
                </View>
                <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>Total</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>{formatMoney(0, { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
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
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Today's Expenses </Text> 
        <Divider/>
                <View>
                {
                    stores.map((item, index) => {
                      return(
                        <View key={index} style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                        <Text style={{fontSize: 15}}>{formatMoney(calculateStoreExpenses(item._id), { symbol: "₱ ", precision: 2 })}</Text>
                      </View>
                      )
                     
                    })
                  }
                </View>
                <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>Total</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>{formatMoney(0, { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
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
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Capital</Text>
        <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                    <Text style={{fontSize: 15}}>Remaining Stocks Capital</Text>
                    <Text style={{fontSize: 15}}>{formatMoney(calculateTotalCapital(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                    <Text style={{fontSize: 15}}>Remaining Stocks SRP</Text>
                    <Text style={{fontSize: 15}}>{formatMoney(calculateCapitalInStock(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                </View>
                </View>
    </View>
    </ScrollView>
    </View>
  );
};

DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  cgridStyle : {
    backgroundColor: colors.white, 
    height: 100, width: windowWidth/1.5, 
    marginTop: -60, 
    alignSelf:'center', 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
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
  sgridStyle : {
    backgroundColor:colors.white, 
    marginRight: 5, 
    borderRadius: 15,
    alignItems:'center', 
    flexDirection:'row', 
    justifyContent:'space-between',
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
    backgroundColor: colors.white, 
    margin: 5, 
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
  },
  xlgridStyle: {
    backgroundColor: colors.primary, 
    height:150, 
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
    marginBottom:50
  },
  xlsubgrid:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:colors.white,
    marginHorizontal: 30,
    borderRadius:10,
    marginBottom: -120,
    padding:20,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5
  },
  xlsubgrid2:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10
  },
  xlsubgrid3:{
    flexDirection:'row',
    justifyContent:'center'
  }
});

export default DashboardScreen;
