import React, { useState } from "react";
import { Overlay,  Button, CheckBox } from "react-native-elements";
import {TouchableOpacity, StyleSheet, View, TextInput as TextInput2, Image, Text, Dimensions} from 'react-native';
import uuid from 'react-native-uuid';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from "../themes/colors";
import { useAuth } from "../context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import AppHeader from "./AppHeader";
import { ScrollView } from "react-native";
import { Title, Headline, TextInput  } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment'
import { useStore } from "../context/StoreContext";
import Scanner from "./BarcodeScanner";
import AlertwithChild from "./AlertwithChild";
import AddVariants from "./AddVariants";
import * as ImagePicker from "react-native-image-picker"

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddProduct({ createProducts, store, categories, children }) {
  const { user,  } = useAuth();
  const {createDeliveryReport, createStoreDeliverySummary, createInventory, inventory, createAddon, createOption, suppliers} = useStore();
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
  const [selected_supplier,setSelectedSupplier]=useState([])
  const [sku, setSKU] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState();
  const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container"]
  const [withAddons, setWithAddons] = useState(false)
  const [withOptions, setWithOptions] = useState(false)
  const [withVariants, setWithVariants] = useState(false)
  const [variants, setVariant] =useState([])
  const [options, setOptions] =useState([])
  const [addons, setAddons] =useState([])
  const [optionsVisible, setOptionVisible]  = useState(false)
  const [variantVisible, setVariantVisible]  = useState(false)
  const [addonsVisible, setAddonsVisible]  = useState(false)
  const [img,setImg] = useState('')
  const [nameError, setNameError] = useState('')
  const [opriceError, setOpriceError] = useState('')
  const [spriceError, setSpriceError] = useState('')
  const [supplierError, setSupplierError] = useState('')
  const [unitError, setUnitError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const onAddOptions = () => {
    const items =  options.concat([{"no": uuid.v4(), option:'custom option'}])
   setOptions(items)
 }

 const onAddVariants = () => {
  const items =  variants.concat([{"no": uuid.v4(),name:'set name', price:0,cost:0}])
  setVariant(items)
}

const onAddAddons = () => {
const items =  addons.concat([{"no": uuid.v4(),name:'set name', price:0,cost:0}])
setAddons(items)
}

const handleRemoveOption = no => {
  setOptions(options.filter(item => item.no !== no))
}
const handleRemoveVariants= no => {
setVariant(variants.filter(item => item.no !== no))
}
const handleRemoveAddons= no => {
setAddons(addons.filter(item => item.no !== no))
}

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
if(name.length === 0){
  setNameError('Name is required')
  return
}
if(oprice.length === 0){
  setOpriceError('Original price is required')
  return
}
if(sprice.length === 0){
  setSpriceError('Selling price is required')
  return
}
if(unit.length === 0){
  setUnitError('Unit is required')
  return
}

if(selected_supplier.length === 0){
  setSupplierError('Supplier  is required')
  return
}

if(category.length === 0){
  setCategoryError('Category is required')
  return
}


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
    img : img,
    withAddons: withAddons,
    withVariants: withVariants,
    withOptions: withOptions

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
    supplier: selected_supplier.name,
    supplier_id: selected_supplier._id,
    delivered_by: deliveredby,
    received_by: receivedby,
    delivery_receipt: deliveryno,
    store_id: store._id,
    store_name: store.name,
  }
  let drs = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    uid: uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    supplier: selected_supplier.name,
    supplier_id: selected_supplier._id,
    delivered_by: deliveredby,
    received_by: receivedby,
    delivery_receipt: deliveryno,
    total: parseFloat(stock)* parseFloat(oprice),
    store_id: store._id,
    store_name: store.name,
  }
  if(withAddons){
    createAddon(products.id, addons)
  }
  if(withOptions){
    createOption(products.id, options)
  }
 if(withVariants){
  createInventory(products.id, variants)
 }

  createDeliveryReport(delivery)
  createStoreDeliverySummary(drs)
  createProducts(products);
  setOverlayVisible(false);
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
     <AlertwithChild visible={optionsVisible} onProceed={()=> {setWithOptions(true), setOptionVisible(false)}} onCancel={()=> setOptionVisible(false)}  title="Add Options"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddOptions()}>
      
      <ScrollView>
     { options.map((element, index) =>
               <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
       
               <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400'}}>Option {index+1}: </Text>
               <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
            <TextInput2
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.option}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.option = e.nativeEvent.text;
                 setOptions([...options]);
               }}
            />
        </View>
        <TouchableOpacity onPress={()=> handleRemoveOption(element.no)}>
        <EvilIcons name={'trash'} size={26} color={colors.red} style={{marginTop:5}}/>
        </TouchableOpacity>
       
               </View>
      )}
      </ScrollView>
      </AlertwithChild>

      <AddVariants visible={variantVisible}  onProceed={()=> {setWithVariants(true), setVariantVisible(false)}} onCancel={()=> setVariantVisible(false)}  title="Add Variants"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddVariants()}>
      <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
      <View style={{width: 150, marginHorizontal:2}}>
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Name</Text>
      </View>
      <View style={{width: 50, marginHorizontal:2}}>
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Price</Text>
      </View>
      <View style={{width: 50, marginHorizontal:2}}> 
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Cost</Text>
      </View>
      <TouchableOpacity>
      <EvilIcons name={'trash'} size={26} color={colors.white} style={{marginTop:5}}/>
      </TouchableOpacity>
      </View>
     
    <ScrollView>
   { variants.map((element, index) =>
             <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
     <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            defaultValue={element.name}
            
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.name = e.nativeEvent.text;
               setVariant([...variants]);
             }}
          />
      </View>
      <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            defaultValue={`${element.price}`}
            keyboardType="numeric"
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.price = parseFloat(e.nativeEvent.text);
               setVariant([...variants]);
             }}
          />
      </View>
             <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            keyboardType="numeric"
            defaultValue={`${element.cost}`}
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.cost = parseFloat(e.nativeEvent.text);
               setVariant([...variants]);
             }}
          />
      </View>
      <TouchableOpacity onPress={()=> handleRemoveVariants(element.no)}>
      <EvilIcons name={'trash'} size={26} color={colors.red} style={{marginTop:5}}/>
      </TouchableOpacity>
     
             </View>
    )}
    </ScrollView>
    </AddVariants>
    <AddVariants visible={addonsVisible}  onProceed={()=> {setWithAddons(true), setAddonsVisible(false)}} onCancel={()=> setAddonsVisible(false)}  title="Add Addons"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddAddons()}>
      <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
      <View style={{width: 150, marginHorizontal:2}}>
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Name</Text>
      </View>
      <View style={{width: 50, marginHorizontal:2}}>
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Price</Text>
      </View>
      <View style={{width: 50, marginHorizontal:2}}> 
        <Text style={{fontWeight:'700', textAlign:'center', fontSize:15}}>Cost</Text>
      </View>
      <TouchableOpacity>
      <EvilIcons name={'trash'} size={26} color={colors.white} style={{marginTop:5}}/>
      </TouchableOpacity>
      </View>
     
    <ScrollView>
   {addons.map((element, index) =>
             <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
     <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            defaultValue={element.name}
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.name = e.nativeEvent.text;
               setAddons([...addons]);
             }}
          />
      </View>
      <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            defaultValue={element.price}
            keyboardType="numeric"
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.price = parseFloat(e.nativeEvent.text);
               setAddons([...addons]);
             }}
          />
      </View>
             <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
          <TextInput2
            style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
            underlineColorAndroid = 'transparent'
            placeholderTextColor='red'
            disableFullscreenUI={true}
            defaultValue={element.cost}
            keyboardType="numeric"
            multiline={true}
            numberOfLines={1}
            onEndEditing={(e) => {
               element.cost = parseFloat(e.nativeEvent.text);
               setAddons([...addons]);
             }}
          />
      </View>
      <TouchableOpacity onPress={()=> handleRemoveAddons(element.no)}>
      <EvilIcons name={'trash'} size={26} color={colors.red} style={{marginTop:5}}/>
      </TouchableOpacity>
     
             </View>
    )}
    </ScrollView>
    </AddVariants>
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
        <TouchableOpacity onPress={()=> openGallery()} style={styles.imageContainer}>
                    <Image resizeMode="contain" source={img.length === 0?{uri:'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'}:{ uri: img }} style={styles.backgroundImage}/>
        </TouchableOpacity>
          <TextInput
            mode="outlined"
            placeholder="Name"
            onChangeText={(text) => setName(text)}

          />
         {nameError.length ===0 ?null: <Text style={{color: colors.red}}>**{nameError}</Text>}
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
          <View style={{flex: 1}}>
          <TextInput
            style={{flex: 1}}
          mode="outlined"
            placeholder="Original Price"
            keyboardType="numeric"
            onChangeText={(text) => setOPrice(text)}
    
          />
          {opriceError.length ===0 ?null: <Text style={{color: colors.red}}>**{opriceError}</Text>}
          </View>
        <View style={{flex: 1}}>
        <TextInput
          style={{flex: 1, marginLeft: 5}}
          mode="outlined"
            placeholder="Selling Price"
            keyboardType="numeric"
            onChangeText={(text) => setSPrice(text)}
     
          />
            {spriceError.length ===0 ?null: <Text style={{color: colors.red}}>**{spriceError}</Text>}
        </View>
       
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
          {unitError.length ===0 ?null: <Text style={{color: colors.red}}>**{unitError}</Text>}
          {categoryError.length ===0 ?null: <Text style={{color: colors.red}}>**{categoryError}</Text>}
          <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <SelectDropdown
                    data={suppliers}
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
          {supplierError.length ===0 ?null: <Text style={{color: colors.red}}>**{supplierError}</Text>}
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          
                 <TextInput
                  style={{flex: 1}}
                  mode="outlined"
                    placeholder="Delivery No."
                    onChangeText={(text) => setDeliveryNo(text)}
            
                  />
                <TextInput
                  style={{flex: 1, marginLeft: 5}}
                  mode="outlined"
                    placeholder="Received by"
                    onChangeText={(text) => setReceivedBy(text)}
            
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

  <CheckBox
      center
      title="Variants"
      checked={withVariants}
      onPress={() => setVariantVisible(!variantVisible)}
    />
      <CheckBox
      center
      title="Addons"
      checked={withAddons}
      onPress={() => setAddonsVisible(!addonsVisible)}
    />
      <CheckBox
      center
      title="Options"
      checked={withOptions}
      onPress={() => setOptionVisible(!optionsVisible)}
    />
        
          <Button
          buttonStyle={{marginHorizontal: 20, marginBottom: 10, backgroundColor: colors.primary, marginTop: 20, paddingVertical: 15}}
            title="Save"
            onPress={() => {
             
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
},
imageContainer: {
  backgroundColor: colors.grey,
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