import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity,View } from "react-native";
import { Overlay } from "react-native-elements";
import BarcodeScanner from 'react-native-scan-barcode';
import colors from "../themes/colors";
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { RNCamera } from 'react-native-camera';


const Scanner = ({barcode}) => {
    const [scanner, setScanner] = useState(false)
    const [cameraType, setCameraType] = useState('back')
    const [torchMode, setTorchMode] = useState('on')
    const [overlayVisible, setOverlayVisible] = useState(false)

    const barcodeReceived = (e) => {

            barcode(e.data)
            setOverlayVisible(false)
        }
  return (
      <>
    <Overlay
    overlayStyle={{padding:0}}
      fullScreen
      isVisible={overlayVisible}
      
      onBackdropPress={() => setOverlayVisible(false)}
    >
         
     <BarcodeScanner
        onBarCodeRead={barcodeReceived}
        style={{ flex: 1 }}
        torchMode={torchMode}
        cameraType={cameraType}
        viewFinderHeight={100}
        viewFinderWidth={250}
        viewFinderBorderColor={colors.statusBarCoverLight}
      >
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginHorizontal: 10}}>
          <TouchableOpacity onPress={()=> torchMode === 'off' ? setTorchMode('on'): setTorchMode('off')}>
          <FontAwesome name={'flash'} size={25} color={colors.white}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>  setOverlayVisible(false)}>
          <FontAwesome name={'close'} size={25} color={colors.white}/>
          </TouchableOpacity>
     
        </View>
       
      </BarcodeScanner>
 
      </Overlay>
      <TouchableOpacity onPress={()=> setOverlayVisible(true)}>
          <Ionicons style={{marginRight: 15}} name={'barcode-outline'} size={35} color={colors.primary}/>
      </TouchableOpacity>
      <RNCamera/>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Scanner;
