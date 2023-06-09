import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';


import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants";

const AppHeader = ({ centerText, gradient, leftComponent, rightComponent, screen }) => {
  const navigation = useNavigation();

  if(leftComponent){
    return(
      <View>
        <Header
          ViewComponent={LinearGradient} // Don't forget this!
          leftComponent={leftComponent}
          centerComponent={{ text: centerText, style: { color: COLORS.white,  fontSize: 20, fontWeight:'bold' } }}
          rightComponent={rightComponent}
          linearGradientProps={{
            
            colors:screen === "Warehouse" ? [COLORS.secondary, COLORS.secondary] : [COLORS.primary, COLORS.primary],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          statusBarProps={{
            translucent:true,
             backgroundColor: 'transparent'
          }}
          containerStyle={{marginBottom: 5, paddingVertical: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingTop: 20, paddingBottom: 15}}
        />
      </View>
    );
  }

  return (
      <View>
        <Header
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: centerText, style: { color: COLORS.primary,  fontSize: 20 } }}
          linearGradientProps={{
            colors: [COLORS.secondary, COLORS.secondary],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          statusBarProps={{
            translucent:true,
             backgroundColor: 'transparent'
          }}
          containerStyle={{marginBottom: 5}}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default AppHeader;
