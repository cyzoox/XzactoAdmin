import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import {TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert, Image, TextInput as TextInput2} from 'react-native';
import styles from "../../stylesheet";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import { Text } from "react-native";
import { View } from "react-native";
import AppHeader from "./AppHeader";
import { useStore } from "../context/StoreContext";
import { useNavigation } from '@react-navigation/native';
import { Card, TextInput } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker"
import Scanner from "./BarcodeScanner";
import SelectDropdown from 'react-native-select-dropdown'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import app from "../../getRealmApp";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function ProductDetailsWarehouse({route}) {
  const navigation = useNavigation();
    const product = route.params.product;
    const store = route.params.store;
    const categories = route.params.categories;
    const [photos, setPhoto] = useState('https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png');
    const {createStore,
      deleteTask,
      stores,
      loading,
      createProducts,
      products,
      createCategories,
      category,
      createExpenses,
      expenses,
      createCustomer,
      customers,
      createStaff,
      staffs,
      updateProduct} = useStore();
      const customData = app.currentUser.customData;

    const [name, setName] = useState(product.name);
    const [brand, setBrand] = useState(product.brand);
    const [oprice, setOPrice] = useState(product.oprice);
    const [sprice, setSPrice] = useState(product.sprice);
    const [stock, setQty] = useState(product.stock);
    const [edit, setEditable] = useState(false);
    const [unit, setUnit] = useState(product.unit);
    const [new_categories, setCategory] = useState(product.category);
    const [visible, toggleOverlay] = useState(false);
    const [sku, setSKU] = useState(product.sku)
    const [img,setImg] = useState(product.img)
    const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container","Bottle", "Sachet","Cup"]
    const [visible2, setVisible] = useState(false);
    const [code, setCode] = useState('');
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(null);
    const filterCategory = () => {
      let holder = [];
      
      categories.forEach(item => {
        if(item.store_id === store._id){
         holder.push(item)
        }
      });
      return holder;
    }

    const onSaveImg = (photo) => {

      let new_products = {
        name: name,
        brand: brand,
        oprice: parseFloat(oprice),
        sprice: parseFloat(sprice),
        stock: parseFloat(stock),
        unit: unit,
        category: new_categories,
        sku: sku,
        img: photo
      }

      updateProduct(product ,new_products);
 
    }
    const onPressSave = () => {

      let new_products = {
        name: name,
        brand: brand,
        oprice: parseFloat(oprice),
        sprice: parseFloat(sprice),
        stock: parseFloat(stock),
        unit: unit,
        category: new_categories,
        sku: sku,
        img: img
      }

      updateProduct(product ,new_products);
      toggleOverlay(true);
      setVisible(false)
      setCode('')
      setError(null)
    }

    const renderSubContent = () => {
        if(edit){
            return(
                <View>
                  
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flex: 3}}>
                    <TextInput
                        label="Quantity"
                        mode="outlined"
                        value={`${stock}`}
                        onChangeText={(text) => setQty(text)}
                        autoFocus={false}
                        editable={edit}
                        />
                    </View>  
                </View>
                <Picker
            selectedValue={unit}
            style={{borderWidth: 1, borderColor:'black'}}
            onValueChange={(itemValue, itemIndex) =>
              setUnit(itemValue)
            }>
            <Picker.Item label="Select Unit" value="Select Unit" />
                    <Picker.Item label="Kilo" value="Kilo" />
                    <Picker.Item label="Gram" value="Gram" />
                    <Picker.Item label="Piece" value="Piece" />
                    <Picker.Item label="Liter" value="Liter" />
                    <Picker.Item label="Bundle" value="Bundle" />
                    <Picker.Item label="Dozen" value="Dozen" />
                    <Picker.Item label="Whole" value="Whole" />
                    <Picker.Item label="Half-Dozen" value="Half-Dozen" />
                    <Picker.Item label="Ounce" value="Ounce" />
                    <Picker.Item label="Milliliter" value="Milliliter" />
                    <Picker.Item label="Milligrams" value="Milligrams" />
                    <Picker.Item label="Pack" value="Pack" />
                    <Picker.Item label="Ream" value="Ream" />
                    <Picker.Item label="Box" value="Box" />
                    <Picker.Item label="Sack" value="Sack" />
                    <Picker.Item label="Serving" value="Serving" />
                    <Picker.Item label="Gallon" value="Gallon" />
                    <Picker.Item label="Container" value="Container" />
          </Picker>
          <Picker
            selectedValue={new_categories}
            onValueChange={(itemValue, itemIndex) =>
              setCategory(itemValue)
            }>
              <Picker.Item label="Select Category" value="Select Category" />
            {
              categories.map(item => {
                return(
                  <Picker.Item label={item.name} value={item.name} />
                )
              })
            }
          </Picker>
          <Button title="Save" onPress={()=> onPressSave()} buttonStyle={{marginVertical: 10, marginHorizontal: 20}}/>
            </View>
            )
        }else{
            return(
                <View>
                <TextInput
                label="Quantity"
                mode="outlined"
                placeholder={`${Math.round(product.stock * 100) / 100}`}
                onChangeText={(text) => setName(text)}
                autoFocus={true}
                editable={edit}
              />
            <TextInput
                label="Unit"
                mode="outlined"
                placeholder={product.unit}
                onChangeText={(text) => setName(text)}
                autoFocus={true}
                editable={edit}
              />
            <TextInput
               label="Category"
               mode="outlined"
               placeholder={product.category}
                onChangeText={(text) => setName(text)}
                autoFocus={true}
                editable={edit}
              />
              
              </View>
            )
        }
    }

    const onCheckPassword = () => {
      if(code === customData.pin){
        onPressSave()
      }else{
        setCode('')
            setError('Incorrect password, please try again!')
      }
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
  

  return (
    <>
     <View style={{flex: 1}}>

        <AppHeader
            centerText="Product Details"
            leftComponent={
                <TouchableOpacity onPress={()=> {}}>
                  <EvilIcons name={'close-o'} size={30} color={colors.white} onPress={()=> navigation.goBack()}/>
                </TouchableOpacity>
            }
        
        />
        <>
       
        <ScrollView style={{marginHorizontal: 20}}>
        <TouchableOpacity onPress={()=> openGallery()} style={style.imageContainer}>
                    <Image source={{ uri: img }} style={style.backgroundImage}/>
                  </TouchableOpacity>
                  <TextInput
            mode="outlined"
            label="Name"
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
        
          />
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <TextInput
           style={{flex: 1}}
          mode="outlined"
          
            label="Brand"
            value={brand}
            onChangeText={(text) => setBrand(text)}
      
          />
          <TextInput
           style={{flex: 1, marginLeft: 5}}
          mode="outlined"
            label="Stock"
            value={`${Math.round(stock * 100) / 100}`}
            onChangeText={(text) => setQty(text)}
            keyboardType="numeric"
          
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          
          <TextInput
            style={{flex: 1}}
          mode="outlined"
            label="Original Price"
            value={`${oprice}`}
            keyboardType="numeric"
            onChangeText={(text) => setOPrice(text)}
      
          />
          <TextInput
          style={{flex: 1, marginLeft: 5}}
          mode="outlined"
            label="Selling Price"
            value={`${sprice}`}
            keyboardType="numeric"
            onChangeText={(text) => setSPrice(text)}
          
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <SelectDropdown
                    data={units}
                    defaultButtonText={unit}
                    onSelect={(selectedItem, index) => {
                      setUnit(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}
                    buttonStyle={{
                        marginTop: 5,
                        flex: 1, 
                        height: 50,
                        backgroundColor: "#FFF",
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#444",}}
                        buttonTextStyle={{textAlign: 'left', color: 'grey', fontSize: 15}}
                  />
                <SelectDropdown
                    data={filterCategory()}
                    defaultButtonText={new_categories}
                    onSelect={(selectedItem, index) => {
                      setCategory(selectedItem.name)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem.name
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item.name
                    }}
                    buttonStyle={{
                        marginTop: 5,
                        flex: 1,
                        marginRight: 10,
                        height: 50,
                        backgroundColor: "#FFF",
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#444",}}
                        buttonTextStyle={{textAlign: 'left', color: 'grey', fontSize: 15}}
                  />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', borderWidth: 1, marginTop: 10, borderRadius: 5, alignItems:'center'}}>
            <TextInput2
              style={{flex: 3, paddingVertical:13}}
              value={sku}
              label="Barcode"
              onChangeText={(text) => setSKU(text)}
            
            />
            <Scanner barcode={setSKU}/>
          </View>

        </ScrollView>
        <TouchableOpacity onPress={()=> setVisible(true)} style={style.uploadButton}>
          <Text style={style.uploadButtonText}>Save</Text>
        </TouchableOpacity>
        </>
       

        <Overlay isVisible={visible2} onBackdropPress={setVisible}>
            <Text style={{textAlign:'center', fontSize: 18, fontWeight:'bold', marginVertical: 10}}>Enter PIN</Text>
            <View style={{padding: 20}}>
            <SmoothPinCodeInput password mask="﹡"
              cellStyle={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 15
              }}
              cellSize={45}
            codeLength={4}
            value={code}
            onTextChange={code => setCode(code)}/>
            <Button  title="Save" buttonStyle={{marginVertical: 10, backgroundColor: colors.accent, borderRadius: 10, marginTop: 30}} onPress={()=> onCheckPassword()}/>
            {
                error &&
                <Text style={{textAlign:'center', color: colors.red}}>{error}</Text>
            }
            </View>
        </Overlay>
    </View>
    </>
  );
}

const style = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#000000',
    height: Dimensions.get('window').height /4,
    marginHorizontal: 50,
    borderRadius: 20
  },
  backgroundImage: {
   flex: 1,
    resizeMode:'stretch',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 1,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto'
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto'
  }
});