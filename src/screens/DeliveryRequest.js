import React from "react";
import { Text, StyleSheet, View,TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../themes/colors";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const DeliveryRequest = () => {
  return (
  <View>
     <AppHeader 
          centerText="Delivery Request" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        screen="Store"
        />
    <Text style={styles.text}>Delivery Request</Text>
  </View>
);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default DeliveryRequest;
