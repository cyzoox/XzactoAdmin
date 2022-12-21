import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, StatusBar, Alert, TouchableOpacity,Image,TextInput,ImageBackground, ScrollView } from "react-native";
import AuthForm from "../components/AuthForm";
// import Loader from "../components/Loader";
import NavLink from "../components/NavLink";
import { useAuth } from "../context/AuthContext";
// import AnimatedSplash from "react-native-animated-splash";
import colors from "../themes/colors";
// import messaging from '@react-native-firebase/messaging';
// import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({ navigation }) => {
  const { user, signUp, signIn, projectData  } = useAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [conpass, setConPass] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    // AnimatedSplash.hide()
    if (user != null) {
      // onAppBootstrap()
      navigation.navigate("Dashboard", {
        name: "My Project",
        projectPartition: `project=${user.id}` ,
        projectData
      });
    }
  }, [user]);

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
  const onPressSignIn = async () => {
    setLoading(true)
  
    try {
      await signUp(email, password);
      setLoading(false)
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
      setLoading(false)
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View style={styles.background}>
    {/* <Loader loading={loading} /> */}
     <ImageBackground source={require('../../assets/splashbg.jpg')} resizeMode="cover" imageStyle={{}} style={styles.header}>
 
 <Image source={require('../../assets/logo.png')} style={{height:140,width:140, resizeMode:"contain"}}/>
 </ImageBackground>

 
 <View style={styles.subview}>
 <Text style={styles.text}>Sign up</Text>
 <TextInput style={styles.input}
 placeholderTextColor="#CBCBCB"
 onChangeText={setEmail}
 placeholder="Enter email"
 />
  <TextInput style={styles.input}
   onChangeText={setPassword}
 placeholderTextColor="#CBCBCB"
 placeholder="Enter password"
 />
   <TextInput style={styles.input}
   onChangeText={setConPass}
 placeholderTextColor="#CBCBCB"
 placeholder="Confirm password"
 />
 <TouchableOpacity onPress={onPressSignIn} style={styles.button}>
 <Text style={styles.buttonText}>SIGN UP</Text>
 </TouchableOpacity>

<NavLink text="Already have account?" routename="SigninScreen"/>
   </View>
   
 </View>
  );
};

SignupScreen.navigationOptions = () => {
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
    height:200,
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
    overflow:'hidden'
  },
  header2:{
    backgroundColor:"#33C1B2",
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

export default SignupScreen;
