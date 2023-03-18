import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity,View,ScrollView, Dimensions, Image, Pressable,TextInput as TextInput2 } from "react-native";
import * as ImagePicker from "react-native-image-picker"
import { TextInput } from "react-native-paper";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Alert from "../components/Alert";
import AppHeader from "../components/AppHeader";
import { ModalInputForm } from "../components/ModalInputForm";
import { useStore } from "../context/StoreContext";
import colors from "../themes/colors";

export const useTogglePasswordVisibility = () => {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');



  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};


const StoreSettings = ({route, navigation}) => {
  const {updateStore} = useStore();
  const STORE =  route.params.store
  const [img,setImg] = useState(null)
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
const [password, setPassword] = useState('');
const [oldPin, setOldPIN] = useState(STORE.password);
const [newPin, setNewPIN] =useState('')
const [visible, setVisible] =useState(false)
const [store_name, setStore] =useState(STORE.name)
const [vat, setVAt] =useState(STORE.vat)
const [lowStock, setLowStock] =useState(STORE.lowstock)
const [toggle, setToggle] =useState(STORE.cashierview)

const onChangePIN = () => {
  if(STORE.password !== oldPin){
    return setVisible(true)
  }
  setOldPIN(newPin)
}

const onSaveSettings = () => {
  let settings={
    name: store_name,
    password: newPin.length === 0 ? oldPin : newPin,
    lowstock: parseFloat(lowStock),
    vat: parseFloat(vat),
    cashierview: toggle
  }
  updateStore(STORE,settings)
  navigation.goBack()
}

const toggleView = () => {
  setToggle(!toggle)
}

  const openGallery = () => {
   

    ImagePicker.launchImageLibrary({
        maxWidth:500,
        maxHeight: 500,
        mediaType: 'photo',
        includeBase64: true
    },
     image => {
      if (image.didCancel) {
        console.log('User cancelled image picker');
      } else if (image.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        
        let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/sbpcmedia/upload'
        let base64Img = `data:image/jpg;base64,${image.assets[0].base64}`
        let data = {
            "file" : base64Img,
            "upload_preset" : "ancbewi9"
        }
        fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then(async r => {
            let data = await r.json()
            let photo = 'https'+data.url.slice(4)
            setImg('https'+data.url.slice(4))
            onSaveImg(photo)

        }).catch(error =>{
            console.log('error : ', error)
        })
      }
    })

  
}
  return(
    <View style={{flex:1}}>
        <Alert visible={visible} onCancel={()=> setVisible(false)} onProceed={()=> setVisible(false)}  title="Incorrect old PIN" content="Please try again!" confirmTitle="OK"/>
          <AppHeader  
        centerText= "Settings"
        leftComponent={
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
          </TouchableOpacity>
      }
   
        />
        <ScrollView contentContainerStyle={{marginBottom: 16}}>
       
          <TextInput
          value={store_name}
            label={'Store Name'}
            onChangeText={(text)=> setStore(text)}
            mode="outlined"
            style={{marginHorizontal: 15, marginTop: 10}}
          />
           <TextInput
            label={'VAT'}
            value={`${vat}`}
            onChangeText={(text)=> setVAt(text)}
            mode="outlined"
            style={{marginHorizontal: 15, marginTop: 10}}
          />
           <TextInput
            label={'Low Stock Warning'}
            onChangeText={(text)=> setLowStock(text)}
            value={`${lowStock}`}
            mode="outlined"
            style={{marginHorizontal: 15, marginTop: 10}}
          />
         <View style={styles.inputContainer}>
        <TextInput2
          style={[styles.inputField, {width: '80%'}]}
          mode='outlined'
          name="password"
          placeholder="Cashier Sales View"
          editable={false}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
        />
        {toggle === true ?  
        <Pressable onPress={toggleView}>
          <MaterialCommunityIcons name={'toggle-switch'} size={50} color={colors.green} />
        </Pressable>:
        <Pressable onPress={toggleView}>
        <MaterialCommunityIcons name={'toggle-switch-off'} size={50} color={colors.red} />
      </Pressable>
        }
        </View>
          <View style={styles.inputContainer}>
        <TextInput2
          style={styles.inputField}
          mode='outlined'
          name="password"
          placeholder="Enter password"
          editable={false}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={oldPin}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
        />
          <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>
       
        <ModalInputForm
              displayComponent={
                  <>
                  <View style={{padding:5, backgroundColor: colors.accent, borderRadius: 15, marginLeft: 10}}>
                    <Text style={{color: colors.white}}>Change PIN</Text>
                  </View>
                  </>
              }
              title="Change PIN"
              onSave={()=> onChangePIN()}
            >
             <TextInput
              label={'Enter old pin'}
              onChangeText={(text)=> setOldPIN(text)}
              mode="outlined"
             />
              <TextInput
              label={'Enter new pin'}
              onChangeText={(text)=> setNewPIN(text)}
              mode="outlined"
             />
      </ModalInputForm>
      
     
     
      </View>
        </ScrollView>
        <TouchableOpacity onPress={()=> onSaveSettings()} style={{padding: 10, backgroundColor: colors.accent, borderRadius: 15, margin: 15}}>
          <Text style={{textAlign:"center", color: colors.white, fontSize: 18, fontWeight:'bold'}}>Save</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  imageContainer: {
    backgroundColor: '#000000',
    height: Dimensions.get('window').height /4,
    marginHorizontal: 50,
    borderRadius: 20
  },
  backgroundImage: {
    flex: 1,
   },
   inputContainer: {
    backgroundColor: 'white',
 
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    marginTop: 10,
     marginHorizontal: 15,
     paddingVertical: 4,
     borderColor:colors.boldGrey
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: colors.white,
    width: '60%', marginLeft: 10
  }
});

export default StoreSettings;
