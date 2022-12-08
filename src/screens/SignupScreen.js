import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AuthForm
          headerText= "Sign Up for Tracker"
          errorMessage="{state.errorMessage}"
          submitButtonText="Sign Up"
          routeName="mainFlow"
      />
      <NavLink
          routeName="Signin"
          text="Already have an account? Sin in instead!"
      />
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
    justifyContent:'center',
    marginBottom: 250
  },
  
 
});

export default SignupScreen;