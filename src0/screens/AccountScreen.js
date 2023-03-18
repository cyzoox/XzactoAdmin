import React,{useEffect, useState} from "react";
import { Text, StyleSheet, View,Dimensions, Image, ScrollView,RefreshControl } from "react-native";
import colors from "../themes/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import app from "../../getRealmApp";
import moment from 'moment'

import { useFocusEffect , useIsFocused } from '@react-navigation/native';
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert'
import CountDown from 'react-native-countdown-component';

const AccountSreen = ({navigation}) => {
    const customData = app.currentUser.customData;
    const [totalDuration, setTotalDuration] = useState(0);
    const [show,setShow] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();
    
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
      
      useFocusEffect(
        React.useCallback(() => {
            let date = 
            moment()
              .utcOffset('+08:00')
              .format('YYYY-MM-DD hh:mm:ss');
          
          // Getting the current date-time
          // You can set your own date-time
          let expirydate =`${moment.unix(customData.privilege_due).format('YYYY-MM-DD hh:mm:ss')}`;
      
          
          
          let diffr = 
            moment
              .duration(moment(expirydate)
              .diff(moment(date)));
          // Difference of the expiry date-time
          var hours = parseInt(diffr.asHours());
          var minutes = parseInt(diffr.minutes());
          var seconds = parseInt(diffr.seconds());
       
          // Converting in seconds
          var d = hours * 60 * 60 + minutes * 60 + seconds;
       
          // Settign up the duration of countdown
          setTotalDuration(d);
    
        }, [totalDuration])
      );


    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      let date = 
            moment()
              .utcOffset('+08:00')
              .format('YYYY-MM-DD hh:mm:ss');
          
          // Getting the current date-time
          // You can set your own date-time
          let expirydate =`${moment.unix(customData.privilege_due).format('YYYY-MM-DD hh:mm:ss')}`;
      
          
          
          let diffr = 
            moment
              .duration(moment(expirydate)
              .diff(moment(date)));
          // Difference of the expiry date-time
          var hours = parseInt(diffr.asHours());
          var minutes = parseInt(diffr.minutes());
          var seconds = parseInt(diffr.seconds());
       
          // Converting in seconds
          var d = hours * 60 * 60 + minutes * 60 + seconds;
       
          // Settign up the duration of countdown
          setTotalDuration(d);
      wait(1000).then(() => setRefreshing(false));
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            let date = 
            moment()
              .utcOffset('+08:00')
              .format('YYYY-MM-DD hh:mm:ss');
          
          // Getting the current date-time
          // You can set your own date-time
          let expirydate =`${moment.unix(customData.privilege_due).format('YYYY-MM-DD hh:mm:ss')}`;
      
          
          
          let diffr = 
            moment
              .duration(moment(expirydate)
              .diff(moment(date)));
          // Difference of the expiry date-time
          var hours = parseInt(diffr.asHours());
          var minutes = parseInt(diffr.minutes());
          var seconds = parseInt(diffr.seconds());
       
          // Converting in seconds
          var d = hours * 60 * 60 + minutes * 60 + seconds;
       
          // Settign up the duration of countdown
          setTotalDuration(d);
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
      }, []);
      

  return(
      <View style={{flex:1}}>
       
            <View style={styles.xlgridStyle}>
                    <View style={{marginHorizontal: 10, marginTop: 5, alignItems:'center'}}>
                    <Image style={{height: 60, width: 60}} source={require('../../assets/user.png')} />
                    </View>
                    <View style={{flex: 1, marginHorizontal: 10, marginTop:10}}>
                        <View style={{paddingVertical: 6, backgroundColor: colors.primary,  borderRadius: 20, marginHorizontal: 70}}>
                            <Text style={{textAlign:'center', fontSize: 20, fontWeight:'700', color: colors.white}}>Account</Text>
                 
                        </View>
                        <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', paddingVertical: 6,  borderRadius: 20,paddingHorizontal: 20}}>
                            <Text style={{textAlign:'center', fontSize: 15, fontWeight:'700', color:colors.white}}>{customData.name}</Text>
                           
                            <Text style={{textAlign:'center', fontSize: 15, fontWeight:'700', color:colors.white}}>{customData.privilege}</Text>
                            
                        </View>
                        <Text style={{textAlign:'center', fontSize: 13, fontWeight:'500' , color:colors.white}}>End of Subscription: {moment.unix(customData.privilege_due).format('DD MMM YYYY hh:mm:ss A')}</Text>
                    </View>
            </View>
            <View style={{marginVertical: 20}}>
            <CountDown
                until={totalDuration}
                //duration of countdown in seconds
                timetoShow={('H', 'M', 'S')}
                //formate to show
                onFinish={() => setShow(true)}
                //on Finish call
                onPress={() => {}}
                //on Press call
                size={20}
                />
                <Text style={{textAlign:"center"}}>Current Subscription ends until</Text>
            </View>
          
            <ScrollView
             refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Free</Text>
                    </View>
                    <View style={{marginHorizontal: 50}}>
                        <Text style={{color: colors.white, marginTop: 20, fontSize: 15, textAlign:'center'}}>One month free access to selected features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 20, padding: 20, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>1 Month Free</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Basic</Text>
                    </View>
                    <View style={{marginHorizontal: 50}}>
                        <Text style={{color: colors.white, marginTop: 20, fontSize: 15, textAlign:'center'}}>3 month free access to selected features.Can manage only 1 store.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 20, padding: 20, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>3 Months for ₱500.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Intermediate</Text>
                    </View>
                    <View style={{marginHorizontal: 50}}>
                        <Text style={{color: colors.white, marginTop: 20, fontSize: 15, textAlign:'center'}}>5 month access to all features.Maximum of 3 stores to manage + Access to warehouse features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 20, padding: 20, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>5 Months for ₱800</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={{fontSize: 25, color: colors.white, textTransform:'uppercase', fontWeight:'700', marginTop: 30}}>Advanced</Text>
                    </View>
                    <View style={{marginHorizontal: 50}}>
                        <Text style={{color: colors.white, marginTop: 20, fontSize: 15, textAlign:'center'}}>1 year  access to all features.Maximum of 10 stores to manage + Access to warehouse features.</Text>
                    </View>
                    <View>
                        <View style={{backgroundColor:colors.white, marginTop: 20, padding: 20, borderRadius: 30}}>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>1 Year for ₱2000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  xlgridStyle: {
    flexDirection:'column',
    backgroundColor: colors.coverDark, 
    height:windowHeight/ 3.5, 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  card: {

      alignItems:'center',
    height: 250, 
    backgroundColor: colors.secondary, 
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

export default AccountSreen;
