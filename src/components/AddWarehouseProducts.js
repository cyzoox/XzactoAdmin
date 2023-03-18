import React, { useState } from "react";
import { Overlay, Input, Button, Text } from "react-native-elements";
import {TouchableOpacity, View, StatusBar, TextInput as CustomInput, StyleSheet, Dimensions, Image} from 'react-native';
import styles from "../../stylesheet";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import moment from 'moment'
import { Title,TextInput, Headline  } from "react-native-paper";
import AppHeader from "./AppHeader";
import { ScrollView } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { useStore } from "../context/StoreContext";
import uuid from 'react-native-uuid';
import {Picker} from '@react-native-picker/picker';
import Scanner from "./BarcodeScanner";
import * as ImagePicker from "react-native-image-picker"
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddWarehouseProducts({ navigation }) {
  const {user} = useAuth();
  const {warehouse_category,createWarehouseProducts,  warehouse_products,createWarehouseDeliveryReport, 
    createDeliveryReport,
    createDeliverySummary,
    warehouse_supplier} = useStore();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [oprice, setOprice] = useState('');
  const [sprice, setSprice] = useState('');
  const [categories, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [password, setPassword] = useState("");
  const [receivedby, setReceivedBy] = useState("");
  const [deliveredby, setDeliveredBy] = useState("");
  const [receiptno, setDeliveryNo] = useState("");
  const [id, setId] = useState("");
  const [sku, setSKU] = useState("");
  const [date, setDate] = useState(new Date())
  const [selected_supplier,setSelectedSupplier]=useState([])
  const [selectSupplier, setSelectSupplier] = useState('');
  const [img,setImg] = useState('')
const [errorMsg, setErrorMsg] = useState('');
  const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container"]

  let new_category = warehouse_category.map(a => a.name);



  const onSaveProduct = () => {
    if(selected_supplier.length === 0){
      setErrorMsg('Please select supplier.')
      return;
    }
    if(name.length === 0){
      setErrorMsg('Please fill in product name.')
      return;
    }
    if(unit.length === 0){
      setErrorMsg('Please select product unit.')
      return;
    }
    if(brand.length === 0){
      setErrorMsg('Please fill in product brand.')
      return;
    }
    if(quantity.length === 0){
      setErrorMsg('Please fill in product quantity.')
      return;
    }
    if(oprice.length === 0){
      setErrorMsg('Please fill in product original price.')
      return;
    }
    if(sprice.length === 0){
      setErrorMsg('Please fill in product selling price.')
      return;
    }
    if(categories.length === 0){
      setErrorMsg('Please select product category.')
      return;
    }
    if(deliveredby.length === 0){
      setErrorMsg('Please fill in  delivered by.')
      return;
    }
    if(receivedby.length === 0){
      setErrorMsg('Please fill in  received by.')
      return;
    }
    if(receiptno.length === 0){
      setErrorMsg('Please fill in delivery receipt number.')
      return;
    }
    let products = {
      partition: `project=${user.id}`,
      id: uuid.v4(),
      name: name,
      brand: brand,
      oprice: parseFloat(oprice),
      sprice: parseFloat(sprice),
      unit: unit,
      category: categories,
      owner_id: user.id,
      stock: parseFloat(quantity),
      pr_id: uuid.v4(),
      sku:'test', 
      img: img.length === 0 ? 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png' : img
    }
    createWarehouseProducts(products);
    saveToDeliveryReports()
  }

  const saveToDeliveryReports = () => {

    let year = moment(date, "MMMM DD, YYYY").format('YYYY');
    let month = moment(date, "MMMM DD, YYYY").format('MMMM');
    let week = moment(date, "MMMM DD, YYYY").format('WW');
  
  
        let products = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment(date).unix(),
            year :year,
            year_month : month+'-'+year,
            year_week : week+'-'+year,
            date: moment(date, "MMMM DD, YYYY").format('MMMM DD, YYYY'),
            product :name,
            quantity: parseFloat(quantity),
            oprice: parseFloat(oprice),
            sprice: parseFloat(sprice),
            supplier: selected_supplier.name,
            supplier_id: selected_supplier._id,
            delivered_by: deliveredby,
            received_by: '',
            delivery_receipt: receiptno,
            brand: brand,
            type:'',
            owner_id: user.id,
            store_id: 'testid',
            store_name: 'testid'
          }
          createWarehouseDeliveryReport(products)

  
        let productss = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment(date).unix(),
            year :year,
            year_month : month+'-'+year,
            year_week : week+'-'+year,
            date: moment(date, "MMMM DD, YYYY").format('MMMM DD, YYYY'),
            supplier: selected_supplier.name,
            supplier_id: selected_supplier._id,
            pr_id: uuid.v4(),       
            delivered_by: deliveredby,
            received_by: '',
            delivery_receipt: receiptno,
            total: parseFloat(quantity)*parseFloat(oprice)
          }
        createDeliverySummary(productss)
        navigation.goBack()
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
       

      }).catch(error =>{
          console.log('error : ', error)
      })
    }
  })


}

  return (
    <>
        <AppHeader 
        centerText="Warehouse Products"
        leftComponent={
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <EvilIcons name="arrow-left" size={30} color={colors.white}/>
          </TouchableOpacity>
        }
        screen="Warehouse"
        />
          <TouchableOpacity onPress={()=> openGallery()} style={style.imageContainer}>
                    <Image resizeMode="contain" source={{ uri: img }} style={style.backgroundImage}/>
                  </TouchableOpacity>
        <Text style={{color: colors.red, textAlign: 'center'}}>{errorMsg.length === 0 ? null : errorMsg}</Text>
        <ScrollView style={{margin: 15}}>
        <View style={{flexDirection:'row', borderWidth: 1, borderRadius: 5, borderColor: colors.coverDark}}>
        <CustomInput
                  style={{flex: 3}}
                    placeholder="Product Name"
                    onChangeText={(text)=> setName(text)}
                    value={name}
                    />
        
        </View>
       
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TextInput
                    style={{flex: 1}}
                    mode="outlined"
                    label="Brand"
                    placeholder="Brand"
                    value={brand}
                    onChangeText={(text)=> setBrand(text)}
                    />
                <TextInput
                style={{flex: 1, marginLeft: 10}}
                    mode="outlined"
                    label="Quantity"
                    placeholder="Quantity"
                    value={`${quantity}`}
                    keyboardType="number-pad"
                    onChangeText={(text)=> setQuantity(text)}
                    />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TextInput
              style={{flex: 1}}
                    mode="outlined"
                    label="Original Price"
                    keyboardType='numeric'
                    placeholder="Original Price"
                    value={`${oprice}`}
                    onChangeText={(text)=> setOprice(text)}
                    />
                <TextInput
                style={{flex: 1, marginLeft: 10}}
                    mode="outlined"
                    label="Selling Price"
                    keyboardType='numeric'
                    placeholder="Selling Price"
                    value={`${sprice}`}
                    onChangeText={(text)=> setSprice(text)}
                    />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <SelectDropdown
                    data={units}
                    defaultButtonText="Unit"
                    defaultValue={unit}
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
                    data={new_category}
                    defaultValue={categories}
                    defaultButtonText="Category"
                    onSelect={(selectedItem, index) => {
                      setCategory(selectedItem)
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
            <CustomInput
              style={{flex: 3, paddingVertical:13}}
              value={sku}
              placeholder="Barcode"
              onChangeText={(text)=> setSKU(text)}
              
            />
            <Scanner barcode={setSKU}/>
          </View>
     
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <SelectDropdown
                    data={warehouse_supplier}
                    defaultButtonText="Supplier"
                    onSelect={(selectedItem, index) => {
                      setSelectedSupplier(selectedItem)
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
                        height: 60,
                        backgroundColor: "#FFF",
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#444",}}
                        buttonTextStyle={{textAlign: 'left', color: 'grey', fontSize: 15}}
                  />
              

                  
          </View>
                <TextInput
                    mode="outlined"
                    label="Received by"
                    placeholder="Received by"
                    value={receivedby}
                    onChangeText={(text)=> setReceivedBy(text)}
                    />
                <TextInput
                    mode="outlined"
                    label="Delivered by"
                    placeholder="Delivered by"
                    value={deliveredby}
                    onChangeText={(text)=> setDeliveredBy(text)}
                    />
                <TextInput
                    mode="outlined"
                    label="Delivery Receipt No."
                    value={receiptno}
                    placeholder="Delivery Receipt No."
                    onChangeText={(text)=> setDeliveryNo(text)}
                    />
               
       
        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical: 15}}>
            <View  style={{flex: 1, marginHorizontal: 15}} >
             <Button buttonStyle={{padding: 15, backgroundColor: colors.primary}} title="Save" onPress={()=> onSaveProduct()}/>
            </View>
        </View>
        </ScrollView>
     
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 10,
    elevation: 3,
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