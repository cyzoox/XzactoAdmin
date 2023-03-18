import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import {TouchableOpacity, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddCategory({ createCategories, store, children }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState("");



  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "90%" }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
          <Input
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            autoFocus={true}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              createCategories(name, store._id)
            }}
          />
        </>
      </Overlay>
      <TouchableOpacity style={styles.flexStyle} onPress={()=>setOverlayVisible(true)}>
            <EvilIcons  name={'plus'} size={30} color={colors.white}/>
            {children}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor: colors.coverDark,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 10,
},
barStyle: {
  alignSelf: 'center',
  height: 35,
  borderRadius: 20,
  backgroundColor: '#efefef',
  flexDirection:'row',
  justifyContent:'space-between',
},
inputStyle: {
    fontSize: 18,
    alignContent:'center'
},
iconStyle: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 15,
},
flexStyle: {
  fontSize: 25,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 15,
  flexDirection:'column'
}
});