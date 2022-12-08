import React, { useState } from "react";
import { Overlay, Input, Button,Text } from "react-native-elements";
import {TouchableOpacity, View} from 'react-native';
import styles from "../../stylesheet";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import { TextInput } from "react-native-paper";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function EditStaff({  store, staff}) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState(staff.name);
  const [password, setPassword] = useState(staff.password);


  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "70%" , paddingHorizontal: 30, paddingBottom: 20, paddingTop:15}}
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <>
        <Text style={{textAlign:'center', fontSize: 18, fontWeight:'700', marginBottom:10}}>Add Staff</Text>
          <TextInput
          mode="outlined"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            autoFocus={true}
          />
          <TextInput
          mode="outlined"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            autoFocus={true}
            maxLength={6}
          />

          <View style={{flexDirection:'row'}}>
          <CheckBox
              center
              title="Click Here"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check2}
              onPress={() => setCheck2(!check2)}
            />
            <CheckBox
              center
              title="Click Here"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={check2}
              onPress={() => setCheck2(!check2)}
            />
          </View>
          <Button
            title="Create"
            buttonStyle={{marginTop: 20, backgroundColor: colors.accent}}
            onPress={() => {
              setOverlayVisible(false);
              createStaff(name, store._id, store.name, password)
            }}
          />
        </>
      </Overlay>
      <TouchableOpacity onPress={()=>setOverlayVisible(true)}>
            <EvilIcons  name={'plus'} size={30} color={colors.white}/>
      </TouchableOpacity>
    </>
  );
}
