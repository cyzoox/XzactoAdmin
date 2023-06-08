import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView ,TouchableOpacity, Image} from "react-native";
import {Picker} from '@react-native-picker/picker';
import colors from "../themes/colors";
import AppHeader from "./AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import uuid from 'react-native-uuid';
import { FAB } from 'react-native-paper';
import { useStore } from "../context/StoreContext";
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import { useAuth } from "../context/AuthContext";
import AlertwithChild from "./AlertwithChild";

const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container","Bottle"]
import * as ImagePicker from "react-native-image-picker"

const AddBatchWarehouseProducts = ({navigation,route}) => {

    const {user} = useAuth();
    const {warehouse_category,createWarehouseProducts,  warehouse_products,createWarehouseDeliveryReport, 
        createDeliveryReport,
        createDeliverySummary,
        warehouse_supplier} = useStore();

    const [product_holder, setProductHolder] = useState([
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4(), img: 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'},
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4(), img: 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'}
    ])
    const [sku, setSKU] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [query,setQuery] = useState('')
    const [delivery_no, setDeliveryNo] = useState('')
    const [delivered_by, setDeliveredBy] = useState('')
    const [supplier, setSupplier] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [alert_visible,alertVisible] = useState(false)
    const [img,setImg] = useState('')
    const onAddItem = () => {
        const items =  product_holder.concat([{"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, id: uuid.v4(), img: 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'}])
       setProductHolder(items)
     }

     const totalSupply = () => {
      let total =0;
      product_holder.forEach(item => {
          total += parseFloat(item.qty)* item.oprice
      });
  
      return total;
  }
    console.log(product_holder)
 const onSaveItems = () => {
     if(supplier.length === 0){
         setErrorMsg('Please fill in supplier.')
         return;
     }
     if(delivered_by.length === 0){
         setErrorMsg('Please fill in delivered by.')
         return;
     }
     if(delivery_no.length === 0){
         setErrorMsg('Please fill in delivered number.')
         return;
     }
         product_holder.forEach(items => {
             let products = {
                 partition: `project=${user.id}`,
                 id:  items.id,
                 name: items.name,
                 brand: items.brand,
                 oprice: parseFloat(items.oprice),
                 sprice: parseFloat(items.sprice),
                 unit: items.unit,
                 category: items.category,
                 owner_id: user.id,
                 stock: parseFloat(items.qty),
                 sku: '',
                 img:items.img
               }
             createWarehouseProducts(products)
         });
         saveToDeliveryReports()
     
 }

 const saveToDeliveryReports = () => {
   
    let year = moment(date, "MMMM DD, YYYY").format('YYYY');
    let month = moment(date, "MMMM DD, YYYY").format('MMMM');
    let week = moment(date, "MMMM DD, YYYY").format('WW');
  
    product_holder.forEach(items => {
        let products = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment(date).unix(),
            year :year,
            year_month : month+'-'+year,
            year_week : week+'-'+year,
            date: moment(date, "MMMM DD, YYYY").format('MMMM DD, YYYY'),
            product :items.name,
            quantity: parseFloat(items.qty),
            oprice: parseFloat(items.oprice),
            sprice: parseFloat(items.sprice),
            supplier: supplier._id,
            supplier_id: supplier.name,
            delivered_by: delivered_by,
            received_by: '',
            delivery_receipt: delivery_no,
            brand: items.brand,
            type:'',
            owner_id: user.id,
            store_id: 'testid',
            store_name: 'testid'
          }
          createWarehouseDeliveryReport(products)
    });
  
        let products = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment(date).unix(),
            year :year,
            year_month : month+'-'+year,
            year_week : week+'-'+year,
            date: moment(date, "MMMM DD, YYYY").format('MMMM DD, YYYY'),
            supplier: supplier._id,
            supplier_id: supplier.name,
            delivered_by: delivered_by,
            received_by: '',
            delivery_receipt: delivery_no,
            total: totalSupply()
          }
        createDeliverySummary(products)
        navigation.goBack()

}


     const handleRemoveItem = no => {
      setProductHolder(product_holder.filter(item => item.no !== no))
  }

  const openGallery = (element) => {
   

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
            
            element.img = photo
            setProductHolder([...product_holder]);
  
        }).catch(error =>{
            console.log('error : ', error)
        })
      }
    })
  }

  return (
      <View style={{flex: 1}}>
        <AppHeader 
                centerText="Batch Adding Warehouse" 
                leftComponent={
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity onPress={()=> alertVisible(true)} style={{paddingRight: 20}}>
                        <Text style={{fontSize: 16, color:'#ffffff', fontWeight:'bold'}}>SAVE</Text>
                    </TouchableOpacity>
                }
                screen="Warehouse"
         />
         {errorMsg.length !== 0 ? <Text style={{textAlign:'center', color: colors.red, fontWeight: '700'}}>{errorMsg}</Text>: null}
         <View>
             <View style={{flexDirection:'row'}}>
             <View style={{borderWidth: 1, width: 190, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center"}}>
                <Picker
                  selectedValue={supplier}
                  onValueChange={(itemValue, itemIndex) =>
                    setSupplier(itemValue)
                  }>
                    <Picker.Item label="Supplier" value="default" />
                 {
                                warehouse_supplier.map(item => 
                                  
                                <Picker.Item label={item.name} value={item} />
                                )
                            } 
                </Picker>
                </View>
                <View style={{borderWidth: 1,flex: 1, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
                    <TextInput
                        style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                        underlineColorAndroid = 'transparent'
                        onChangeText={(text)=> setDeliveredBy(text)}
                        disableFullscreenUI={true}
                        placeholder="Delivered By"
                        value={delivered_by}
                    />
                </View>
             </View>
             <View style={{flexDirection:'row', marginTop: 2}}>
                <View style={{borderWidth: 1,flex: 1, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
                    <TextInput
                        style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                        underlineColorAndroid = 'transparent'
                        onChangeText={(text)=> setDeliveryNo(text)}
                        disableFullscreenUI={true}
                        placeholder="Delivery No."
                        value={delivery_no}
                    />
                </View>
                <View style={{borderWidth: 1,flex: 1, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setOpen(true)}>
                    <Text style={{textAlign:'center'}}>{`${moment(date).format('MMMM DD, YYYY')}`}</Text>
                </TouchableOpacity>
                </View>
             </View>
         </View>
         <ScrollView>
          <ScrollView showsHorizontalScrollIndicator horizontal contentContainerStyle={{flexDirection:'column', marginTop: 20}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}></Text>
          <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Image</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Product Name</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Brand</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Qty</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Unit</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Capital Price</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Selling Price</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Category</Text>
           </View>
           {
                product_holder.map((element, index) => 
            <View style={{flexDirection:'row', marginVertical: 3,width: 150}}>
            <TouchableOpacity onPress={()=> handleRemoveItem(element.no)} style={{backgroundColor:colors.red, justifyContent:'center', marginHorizontal: 10, padding:5, borderRadius:25}}>
            <EvilIcons name={'trash'} size={26} color={colors.white}/>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={()=> {
                
   

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
                          
                          element.img = photo
                          setProductHolder([...product_holder]);
                
                      }).catch(error =>{
                          console.log('error : ', error)
                      })
                    }
                  })
                
              }}>
                <Image 
                  source={{uri: element.img}}
                  style={{height:50, width: 50}}
                />
              </TouchableOpacity>
            </View>
            <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 5, borderColor: colors.boldGrey, marginHorizontal:2, flexDirection:'row'}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={element.name}
                multiline={true}
                onEndEditing={(e) => {
                    element.name = e.nativeEvent.text;
                    setProductHolder([...product_holder]);
                }}
              />
               <Picker
                                style={{flex: 1, borderLeftWidth: 1, borderColor:'#000'}}
                                selectedValue={element.name}
                                onValueChange={(itemValue, itemIndex) =>
                                   { element.id = itemValue._id,
                                        element.category = itemValue.category,
                                        element.name = itemValue.name,
                                        element.brand = itemValue.brand,
                                        element.unit = itemValue.unit,
                                        element.oprice = itemValue.oprice,
                                        element.sprice = itemValue.sprice,
                                        element.qty = 1,
                                        setProductHolder([...product_holder])
                                }
                                  }>
                                    <Picker.Item label="Select Product" value={[]} />
                                  
                                {
                                    warehouse_products.map((item,index) => 
                                {return (<Picker.Item label={item.name} value={item} />)}
                                    )
                                }
                                
                                </Picker>
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={`${element.brand}`}
                multiline={true}
                onEndEditing={(e) => {
                   element.brand = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                keyboardType="numeric"
                multiline={true}
                defaultValue={`${element.qty}`}
                onEndEditing={(e) => {
                   element.qty = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center"}}>
          <Picker
                            selectedValue={element.unit}
                            onValueChange={(itemValue, itemIndex) =>
                               { element.unit = itemValue,
                                setProductHolder([...product_holder])}
                              }>
                                <Picker.Item label="Unit" value="default"/>
                            {
                                units.map(item => 
                                <Picker.Item label={item} value={item} />
                                )
                            }
                            
                            </Picker>
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                keyboardType="numeric"
                multiline={true}
                disableFullscreenUI={true}
                defaultValue={`${element.oprice}`}
              onEndEditing={(e) => {
                   element.oprice = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={`${element.sprice}`}
                keyboardType="numeric"
                multiline={true}
                onEndEditing={(e) => {
                   element.sprice = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 50, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center"}}>
          <Picker
                            selectedValue={element.category}
                            onValueChange={(itemValue, itemIndex) =>
                               { element.category = itemValue,
                                setProductHolder([...product_holder])}
                              }>
                                <Picker.Item label="Category" value="default"/>
                            {
                                warehouse_category.map(item => 
                                <Picker.Item label={item.name} value={item.name} />
                                )
                            }
                            
                            </Picker>
          </View>
            </View>
                )}
         
          </ScrollView>
          </ScrollView>
          <FAB
                icon="plus"
                style={styles.fab}
                onPress={onAddItem}
            />
             <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        <AlertwithChild
          visible={alert_visible}
          onProceed={onSaveItems}
          title="Save Products?"
          confirmTitle="Save"
          onCancel={()=> alertVisible(false)}
        >
          <Text style={{paddingHorizontal:30, textAlign:'center', paddingVertical:10}}>Please check product details before saving.</Text>
        </AlertwithChild>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  fab: {
    position: 'absolute',
    backgroundColor: colors.accent,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AddBatchWarehouseProducts;
