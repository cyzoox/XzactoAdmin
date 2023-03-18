import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, StatusBar, Alert, TouchableOpacity,Image,TextInput,ImageBackground } from "react-native";
import AuthForm from "../components/AuthForm";
// import Loader from "../components/Loader";
import NavLink from "../components/NavLink";
import { useAuth } from "../context/AuthContext";
// import AnimatedSplash from "react-native-animated-splash";
import colors from "../themes/colors";
// import messaging from '@react-native-firebase/messaging';
// import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
  const { user, signUp, signIn, projectData, forgotPassword  } = useAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


/*  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();
  
    // Get the token
    const token = await messaging().getToken();
  
    // Save the token
    await firestore()
    .collection('tokens')
    .doc(user.id)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
          });
  }*/

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSend = async () => {
    setLoading(true)
  
    try {
      await forgotPassword(email);
      setLoading(false)
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
      setLoading(false)
    }
  };



  return (
    <View style={styles.background}>
    {/* <Loader loading={loading} /> */}
     <ImageBackground  resizeMode="cover" imageStyle={{}} style={styles.header}>
 
 <Image source={require('../../assets/logo.png')} style={{height:140,width:140, resizeMode:"contain"}}/>
 </ImageBackground>
 

 <View style={styles.subview}>
 <Text style={styles.text}>Forgot Password? Please enter your email.</Text>
 <TextInput style={styles.input}
 placeholderTextColor="#CBCBCB"
 onChangeText={setEmail}
 placeholder="Enter email"
 />
 <TouchableOpacity onPress={onPressSend} style={styles.button}>
 <Text style={styles.buttonText}>Send Email</Text>
 </TouchableOpacity>
<NavLink text="No account yet?" routeName="Signup" />

   </View>
   
 </View>
  );
};

ForgotPassword.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
  },
  header:{
    backgroundColor: colors.primary,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:230,
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
    overflow:'hidden'
  },
  header2:{
    backgroundColor:colors.primary,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    height:230,
    borderBottomEndRadius:45,
    borderBottomStartRadius:45,
 
  },
  background: {
    backgroundColor: "#FFF",
    flex:1,
    alignItems:"center",
    // justifyContent:"center"
  },
  subview:{
    width:"90%",
    alignItems:"flex-start"
  },
  text:{
    marginTop:40,
    color:"#333333",
    fontSize:18,
    fontWeight:"bold",
   
  },
  input:{
    borderColor:"#CCC",
    borderWidth:1,
    width:"100%",
    fontSize:14,
    marginTop:30,
    borderRadius:4,
    paddingHorizontal:10,
    paddingVertical:10
  },
  button:{
    width:180,
    marginTop:40,
    paddingVertical:16,
    paddingHorizontal:8,
    borderRadius:4,
    elevation:3,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.accent
  },
  buttonText:{
    color:"#FFF",
    fontSize:15,
    fontWeight:"bold"
  },
  button2:{
    width:180,
    marginTop:40,
    paddingVertical:16,
    paddingHorizontal:8,
    borderRadius:4,
    elevation:3,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#33C1B2"
  },
  background2: {
    flex:1,
    alignItems:"center",
    // justifyContent:"center"
  },
});

export default ForgotPassword;
