import React,{useEffect, useRef} from "react";
import { useState } from "react";
import { Text, StyleSheet, View,TouchableOpacity,Image,Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import colors from "../themes/colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment'
const Registration = ({navigation}) => {
    const {user} = useAuth();
    const [name, setName] = useState('');
    const [pin, setPin] =useState('');
    const [cpin, setCPin] =useState('');
    const [error, setError] =useState('');
    const [stores, setStores] =useState('')
    const realmRef = useRef(null);
    useEffect(() => {

        const OpenRealmBehaviorConfiguration = {
          type: 'openImmediately',
        };
        const config = {
          sync: {
            user: user,
            partitionValue: `project=${user.id}`,
            newRealmFileBehavior: OpenRealmBehaviorConfiguration,
            existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
          },
        }
        Realm.open(config).then((projectPOS) => {

     
            const date = moment().unix();
            realmRef.current = projectPOS;
            const syncStore = projectPOS.objects("UserInfo");
            setStores([...syncStore]);
            syncStore.addListener(() => {
              setStores([...syncStore]);
            
            });

            return () => {
                // cleanup function
                const projectPOS = realmRef.current;
                if (projectPOS) {
                  projectPOS.close();
                  realmRef.current = null;
                  setStores([]);
               
                  setLoading(false)
                }
              };

            });
 
            
            }, [user]);

        

    const onCreateUserInfo = async() => {
        if(cpin !== pin){
            setError('Pin does not match!')
            return;
        }
        let date = moment().unix()
        let info ={
            id: user.id,
            partition: `project=${user.id}`,
            name: name,
            pin: pin,
            status: "Active",
            privilege: 'Free',
            privilege_due: `${moment.unix(date).add(30, 'day').startOf('day')/ 1000}`
        }
        createUserInfo(info)
        await AsyncStorage.setItem('registered', 'Registered' )
        user.logOut();
     
    }

  return(
    <View>
          <View style={styles.xlgridStyle}>
         <View style={{position: 'absolute', top: 20, left: 25}}>
           <Text style={{fontSize:25, color: colors.white,textAlign:'center'}}>Additional Information</Text>
         </View>
           
           <View style={styles.xlsubgrid}>
                <View style={{flex:1, flexDirection:"column"}}>
                    <Text style={{textAlign:"center", paddingVertical: 5, color:'red'}}>{error}</Text>
                    <TextInput
                    label="Full Name"
                    onChangeText={(text)=> setName(text)}
                    mode="outlined"
                    />     
                    <TextInput
                    label="Pin"
                    mode="outlined"
                    onChangeText={(text)=> setPin(text)}
                    keyboardType="number-pad"
                    maxLength={4}
                    />    
                    <TextInput
                    label="Confirm Pin"
                    onChangeText={(text)=> setCPin(text)}
                    keyboardType="number-pad"
                    maxLength={4}
                    mode="outlined"
                    />       
                    <TouchableOpacity onPress={()=> onCreateUserInfo()} style={{backgroundColor:colors.accent, justifyContent:"center", alignItems:'center', padding: 15, marginTop: 10, marginHorizontal: 30, borderRadius: 15}}>

                        <Text style={{fontWeight:'bold', fontSize: 15, color: colors.primary}}>Proceed</Text>
                        
                    </TouchableOpacity> 
                </View>  
             
           </View>
        
        </View>
    </View>
  );
};


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
      backgroundColor:colors.white,
      marginHorizontal: 30,
      borderRadius:10,
      marginBottom: -350,
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

export default Registration;
