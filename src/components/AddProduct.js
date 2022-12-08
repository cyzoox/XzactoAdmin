import React, { useState } from "react";
import { Overlay,  Button, CheckBox } from "react-native-elements";
import {TouchableOpacity, StyleSheet, View, TextInput as TextInput2, Image, Text} from 'react-native';
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

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddProduct({ createProducts, store, categories, children }) {
  const { user,  } = useAuth();
  const {createDeliveryReport, createStoreDeliverySummary, createInventory, inventory} = useStore();
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
  const [withAddons, setWithAddons] = useState(false)
  const [withOptions, setWithOptions] = useState(false)
  const [withVariants, setWithVariants] = useState(false)
  const [variants, setVariant] =useState([{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0}])
  const [options, setOptions] =useState([{"no": uuid.v4(),option:'option 1'},{"no": uuid.v4(),option:'option 2'},{"no": uuid.v4(),option:'option 3'}])
  const [addons, setAddons] =useState([{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0}])
  const [optionsVisible, setOptionVisible]  = useState(false)
  const [variantVisible, setVariantVisible]  = useState(false)
  const [addonsVisible, setAddonsVisible]  = useState(false)

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
    img : 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png',
    withAddons: withAddons,
    withVariants: withVariants,
    withOptions: withOptions,
    addons: addons,
    options: options

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
    uid: uuid.v4(),
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
  createInventory(products.id, variants)
  createDeliveryReport(delivery)
  createStoreDeliverySummary(drs)
  createProducts(products);
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
            defaultValue={element.price}
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
            defaultValue={element.cost}
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