import React from "react";
import { Text, StyleSheet, View, TouchableWithoutFeedback,Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from "react-native-linear-gradient";
import colors from "../themes/colors";
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

const CardTiles = ({ leftTileText, rightTileText, leftIconName, rightIconName, iconLeftName, iconRightName, rightRouteName, leftRouteName, extraProps, centerTileText, centerRouteName, iconCenterName }) => {
  const navigation = useNavigation();
  return (
    <Grid style={{ paddingBottom: 5, marginHorizontal: 10}}>
        <Row>
            <Col height={screenWidth / 3 - 10}>
              <TouchableWithoutFeedback   onPress={()=> navigation.navigate(leftRouteName,{store: extraProps})}>
              <Card
                 
                    wrapperStyle={{alignItems:'center'}} 
                    containerStyle={{borderRadius: 15, margin: 2, flex: 1}}
                >
                  <LinearGradient colors={[colors.accent, colors.accent]} style={{  height: 50, width: 50, borderRadius: 40, justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name={iconLeftName} size={20} color={colors.white}/>
                  </LinearGradient>
                  <Card.Divider />
                  <Card.Title style={{fontSize: 13}}>{leftTileText}</Card.Title>
                </Card>
              </TouchableWithoutFeedback>
            </Col>
            {
                centerTileText ?
                <Col height={screenWidth / 3 - 10}>
                  <TouchableWithoutFeedback onPress={()=> navigation.navigate(centerRouteName,{store: extraProps})}>
                  <Card wrapperStyle={{alignItems:'center'}} containerStyle={{borderRadius: 15, margin: 2, flex: 1}}>
                    <LinearGradient colors={[colors.accent, colors.accent]} style={{height: 50, width: 50, borderRadius: 40,justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name={iconCenterName} size={20} color={colors.white}/>
                    </LinearGradient>
                    <Card.Divider />
                    <Card.Title style={{fontSize: 13}}>{centerTileText}</Card.Title>
                    </Card> 
                  </TouchableWithoutFeedback>
                 
                </Col>  : 
                <Col/>     
            }
            {
                rightTileText ?
                <Col height={screenWidth / 3 - 10}>
                  <TouchableWithoutFeedback onPress={()=> navigation.navigate(rightRouteName,{store: extraProps})}>
                  <Card wrapperStyle={{alignItems:'center'}} containerStyle={{borderRadius: 15, margin: 2, flex: 1}}>
                    <LinearGradient colors={[colors.accent, colors.accent]} style={{height: 50, width: 50, borderRadius: 40,justifyContent:'center', alignItems:'center'}}>
                        <Ionicons name={iconRightName} size={20} color={colors.white}/>
                    </LinearGradient>
                    <Card.Divider />
                    <Card.Title style={{fontSize: 13}}>{rightTileText}</Card.Title>
                    </Card> 
                  </TouchableWithoutFeedback>
                 
                </Col>  : 
                <Col/>     
            }
        </Row>
    </Grid>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default CardTiles;
