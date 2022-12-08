import React, { useState } from "react";
import { Overlay,  Button } from "react-native-elements";
import {TouchableOpacity, StyleSheet, View, TextInput as TextInput2, Image} from 'react-native';
import uuid from 'react-native-uuid';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import AppHeader from "./AppHeader";
import { ScrollView } from "react-native";
import { Title,TextInput, Headline  } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment'
import { useStore } from "../context/StoreContext";
import Scanner from "./BarcodeScanner";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddProduct({ createProducts, store, categories, children }) {
  const { user,  } = useAuth();
  const {createDeliveryReport, createStoreDeliverySummary} = useStore();
  const [overlayVisible, setOverlayVisible] = useState(false);
  
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [oprice, setOPrice] = useState("");
  const [sprice, setSPrice] = useState("");
  const [stock, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [receivedby, setReceivedBy] = useState("");
  const [deliveredby, setDeliveredBy] = useState("");
  const [deliveryno, setDeliveryNo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [sku, setSKU] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState();
  const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container"]

  
 const filterCategory = () => {
   let holder = [];
   categories.forEach(item => {
     if(item.store_id === store._id){
      holder.push(item)
     }
   });
   return holder;
 }
 const  onSaveProducts = () => {
  const date = moment().unix();


  let products = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    name: name,
    brand: brand,
    oprice: parseFloat(oprice),
    sprice: parseFloat(sprice),
    unit: unit,
    category: category,
    store_id: store._id,
    store: store.name,
    stock: parseFloat(stock),
    sku:sku,
    img : 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'
  }
  let delivery = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    product: name,
    quantity: parseFloat(stock),
    oprice: parseFloat(oprice),
    sprice: parseFloat(sprice),
    supplier: supplier,
    supplier_id: 'no_id',
    delivered_by: deliveredby,
    received_by: receivedby,
    delivery_receipt: deliveryno,
    store_id: store._id,
    store_name: store.name,
  }
  let drs = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    supplier: supplier,
    supplier_id: 'no_id',
    delivered_by: deliveredby,
    received_by: receivedby,
    delivery_receipt: deliveryno,
    total: parseFloat(stock)* parseFloat(oprice),
    store_id: store._id,
    store_name: store.name,
  }

  createDeliveryReport(delivery)
  createStoreDeliverySummary(drs)
  createProducts(products);
  }

  return (
    <>
      <Overlay
      overlayStyle={{padding:0}}
        fullScreen
        isVisible={overlayVisible}
        
        onBackdropPress={() => setOverlayVisible(false)}
      >
        <AppHeader
          centerText="Add Product"
          leftComponent={
            <TouchableOpacity onPress={()=> setOverlayVisible(false)}>
              <EvilIcons  name={'close-o'} size={30} color={colors.white}/>
            </TouchableOpacity>
          }
        />
        <>
        <ScrollView style={{marginHorizontal: 20}}>
          <TextInput
            mode="outlined"
            placeholder="Name"
            onChangeText={(text) => setName(text)}

          />
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <TextInput
           style={{flex: 1}}
          mode="outlined"
            placeholder="Brand"
            onChangeText={(text) => setBrand(text)}
    
          />
          <TextInput
           style={{flex: 1, marginLeft: 5}}
          mode="outlined"
            placeholder="Quantity"
            onChangeText={(text) => setQuantity(text)}
            keyboardType="numeric"
    
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          
          <TextInput
            style={{flex: 1}}
          mode="outlined"
            placeholder="Original Price"
            keyboardType="numeric"
            onChangeText={(text) => setOPrice(text)}
    
          />
          <TextInput
          style={{flex: 1, marginLeft: 5}}
          mode="outlined"
            placeholder="Selling Price"
            keyboardType="numeric"
            onChangeText={(text) => setSPrice(text)}
     
          />
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <SelectDropdown
                    data={units}
                    defaultButtonText="Unit"
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
                    defaultButtonText="Category"
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
              placeholder="Barcode"
              onChangeText={(text) => setSKU(text)}
        
            />
            <Scanner barcode={setSKU}/>
          </View>

        
          <TextInput
          mode="outlined"
            placeholder="Received By"
            onChangeText={(text) => setReceivedBy(text)}
          
          />
          <TextInput
          mode="outlined"
            placeholder="Delivered By"
            onChangeText={(text) => setDeliveredBy(text)}
         
          />
          <TextInput
          mode="outlined"
            placeholder="Delivery Receipt No."
            onChangeText={(text) => setDeliveryNo(text)}
            keyboardType="numeric"
  
          />
          <TextInput
          mode="outlined"
            placeholder="Supplier"
            onChangeText={(text) => setSupplier(text)}
       
          />
          <Button
          buttonStyle={{marginHorizontal: 20, marginBottom: 10, backgroundColor: colors.primary, marginTop: 20, paddingVertical: 15}}
            title="Save"
            onPress={() => {
              setOverlayVisible(false);
              onSaveProducts()
            }}
          />
         
          </ScrollView>
        </>
      </Overlay>
      <TouchableOpacity style={styles.flexStyle} onPress={()=>setOverlayVisible(true)}>
      <Image 
              resizeMode="cover"
              source={require('../../assets/add_product.png')}
              style={{width:40, height:40}}
            />
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