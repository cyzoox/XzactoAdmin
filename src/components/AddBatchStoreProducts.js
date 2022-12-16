import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView ,TouchableOpacity} from "react-native";
import colors from "../themes/colors";
import AppHeader from "./AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import { FAB } from 'react-native-paper';
import { useStore } from "../context/StoreContext";
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import { useAuth } from "../context/AuthContext";
import AlertwithChild from "./AlertwithChild";
import {Picker} from '@react-native-picker/picker';
import AddVariants from "./AddVariants";
import { set } from "react-native-reanimated";
import { CheckBox } from "react-native-elements";
import { Container, Header, Content, Accordion } from "native-base";
const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container","Bottle"]

const AddBatchStoreProducts = ({navigation,route}) => {
    const store = route.params.store;
    const {user} = useAuth();
    const {createProducts,products, category,createDeliveryReport, createStoreDeliverySummary} = useStore();
    const [product_holder, setProductHolder] = useState([
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4(), pr_id:uuid.v4(), addons:[], variants:[], options:[], withAddons: false, withOptions: false, withVariants: false},
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4(), pr_id:uuid.v4(), addons:[], variants:[],  options:[], withAddons: false, withOptions: false, withVariants: false}
    ])
    const [sku, setSKU] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [query,setQuery] = useState('')
    const [delivery_no, setDeliveryNo] = useState('')
    const [delivered_by, setDeliveredBy] = useState('')
    const [supplier, setSupplier] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [alert_visible,alertVisible] = useState(false)
    const [optionsVisible, setOptionVisible]  = useState(false)
    const [variantVisible, setVariantVisible]  = useState(false)
    const [addonsVisible, setAddonsVisible]  = useState(false)
    const [variants, setVariant] =useState([{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0}])
    const [options, setOptions] =useState([{"no": uuid.v4(),option:'option 1'},{"no": uuid.v4(),option:'option 2'},{"no": uuid.v4(),option:'option 3'}])
    const [addons, setAddons] =useState([{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0},{"no": uuid.v4(),name:'set name', price:0,cost:0}])
    const [optionData, setCreateOptionData] = useState([])
    const [variantData, setCreateVariantsData] = useState([])
    const [addonData, setCreateAddonData] = useState([])
    const [withAddons, setWithAddons] = useState(false)
    const [withOptions, setWithOptions] = useState(false)
    const [withVariants, setWithVariants] = useState(false)
    const [expended,setExpanded] = useState(false)

  

    const onAddItem = () => {
        const items =  product_holder.concat([{"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, id: uuid.v4(), pr_id:uuid.v4(), addons:[{'name': 'test', 'price': 10}]}])
       setProductHolder(items)
     }

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
  console.log(product_holder)
  const onUpdateAddons = () => {
    const newArr = product_holder.map(obj => {
      if (obj.id === addonData.id) {
        return {...obj, addons: addons, withAddons: true };
      }
    
      return obj;
    });

    setProductHolder(newArr)
    setAddonsVisible(false)
  }

  const onUpdateVariants = () => {
    const newArr = product_holder.map(obj => {
      if (obj.id === variantData.id) {
        return {...obj, variants: variants, withVariants: true };
      }
    
      return obj;
    });

    setProductHolder(newArr)
    setVariantVisible(false)
  }
  const onUpdateOptions = () => {
    const newArr = product_holder.map(obj => {
      if (obj.id === optionData.id) {
        return {...obj, options: options , withOptions: true};
      }
    
      return obj;
    });

    setProductHolder(newArr)
    setOptionVisible(false)
  }


     const totalSupply = () => {
      let total =0;
      product_holder.forEach(item => {
          total += parseFloat(item.qty)* item.oprice
      });
  
      return total;
  }
    
     const onSaveProducts = () => {
      const dates = moment().unix();
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
            id: items.id,
            name: items.name,
            brand: items.brand,
            oprice: parseFloat(items.oprice),
            pr_id:items.pr_id,
            sprice: parseFloat(items.sprice),
            unit: items.unit,
            category: items.category,
            store_id: store._id,
            store: store.name,
            stock: parseFloat(items.qty),
            sku:sku,
            img : 'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png'
          }
          let delivery = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment().unix(),
            year :moment.unix(dates).format('YYYY'),
            year_month :moment.unix(dates).format('MMMM-YYYY'),
            year_week :moment.unix(dates).format('WW-YYYY'),
            date: moment.unix(dates).format('MMMM DD, YYYY'),
            product: items.name,
            quantity: parseFloat(items.qty),
            oprice: parseFloat(items.oprice),
            sprice: parseFloat(items.sprice),
            supplier: supplier,
            supplier_id: 'no_id',
            delivered_by: delivered_by,
            received_by: '',
            delivery_receipt: delivery_no,
            store_id: store._id,
            store_name: store.name,
          }
         
          createDeliveryReport(delivery)
          
          createProducts(products);
        })
        let drs = {
          partition: `project=${user.id}`,
          id: uuid.v4(),
          timeStamp: moment().unix(),
          year :moment.unix(dates).format('YYYY'),
          year_month :moment.unix(dates).format('MMMM-YYYY'),
          year_week :moment.unix(dates).format('WW-YYYY'),
          date: moment.unix(dates).format('MMMM DD, YYYY'),
          supplier: supplier,
          supplier_id: 'no_id',
          delivered_by: delivered_by,
          received_by: '',
          delivery_receipt: delivery_no,
          total: 0,
          store_id: store._id,
          store_name: store.name,
        }
        createStoreDeliverySummary(drs)
        navigation.goBack()
     }

     const handleRemoveItem = no => {
      setProductHolder(product_holder.filter(item => item.no !== no))
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

  const onCreateOptions = (item) => {
      setOptions(item.options)
      setOptionVisible(true)
      setWithOptions(true)
      setCreateOptionData(item)
  }
  const onCreateVariants = (item) => {
    setVariant(item.variants)
    setVariantVisible(true)
    setWithVariants(true)
    setCreateVariantsData(item)
}
const onCreateAddons = (item) => {
  setCreateAddonData(item)
  setAddons(item.addons)
  setAddonsVisible(true)
 
  product_holder.forEach((element, index) => {
    if(element.id === item.id) {
      product_holder[index] = item;
    }
});
}



  return (
      <View style={{flex: 1}}>
        <AlertwithChild visible={optionsVisible} onProceed={onUpdateOptions} onCancel={()=> setOptionVisible(false)}  title="Add Options"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddOptions()}>
      
        <ScrollView>
       { options.map((element, index) =>
                 <View style={{flexDirection:'row',justifyContent:'center', marginVertical: 2, alignItems:'center'}}>
         
                 <Text style={{textAlign:'center', fontSize: 15, fontWeight: '400'}}>Option {index+1}: </Text>
                 <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
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

        <AddVariants visible={variantVisible} onProceed={onUpdateVariants} onCancel={()=> setVariantVisible(false)}  title="Add Variants"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddVariants()}>
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
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.option}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.name = e.nativeEvent.text;
                 setVariant([...variants]);
               }}
            />
        </View>
        <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.option}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.price = e.nativeEvent.text;
                 setVariant([...variants]);
               }}
            />
        </View>
               <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.option}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.cost = e.nativeEvent.text;
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
      <AddVariants visible={addonsVisible} onProceed={onUpdateAddons} onCancel={()=> setAddonsVisible(false)}  title="Add Addons"  confirmTitle="S A V E" addButton={true} onPressAddbtn={()=> onAddAddons()}>
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
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.name}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.name = e.nativeEvent.text;
                 setOptions([...options]);
               }}
            />
        </View>
        <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.price}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.price = e.nativeEvent.text;
                 setOptions([...options]);
               }}
            />
        </View>
               <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
            <TextInput
              style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
              underlineColorAndroid = 'transparent'
              placeholderTextColor='red'
              disableFullscreenUI={true}
              defaultValue={element.cost}
              multiline={true}
              numberOfLines={1}
              onEndEditing={(e) => {
                 element.cost = e.nativeEvent.text;
                 setOptions([...options]);
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
        <AppHeader 
                centerText="Batch Adding Products" 
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
         />
         {errorMsg.length !== 0 ? <Text style={{textAlign:'center', color: colors.red, fontWeight: '700'}}>{errorMsg}</Text>: null}
         <View>
             <View style={{flexDirection:'row'}}>
                <View style={{borderWidth: 1,flex: 1, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
                    <TextInput
                        style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                        underlineColorAndroid = 'transparent'
                                onChangeText={(text)=> setSupplier(text)}
                                disableFullscreenUI={true}
                                placeholder="Supplier"
                                defaultValue={supplier}
                    />
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
      
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Product Name</Text>
               <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Qty</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Unit</Text>
               <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Capital Price</Text>
               <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Selling Price</Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Category</Text>
               {/* <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Variants</Text>
               <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Addons</Text>
               <Text style={{width: 50, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Options</Text> */}
           </View>
           {
                product_holder.map((element, index) => 
                <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', marginVertical: 3}}>
           
            <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, flexDirection:'row'}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={element.name}
                multiline={true}
                numberOfLines={1}
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
                                  
                                {
                                    products.map((item,index) => 
                                {return (<Picker.Item label={item.name} value={item} />)}
                                    )
                                }
                                
                                </Picker>
          </View>
   
          <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                keyboardType="numeric"
                multiline={true}
                numberOfLines={1}
                defaultValue={`${element.qty}`}
                onEndEditing={(e) => {
                   element.qty = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center"}}>
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
          <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                keyboardType="numeric"
                disableFullscreenUI={true}
                multiline={true}
                numberOfLines={1}
                defaultValue={`${element.oprice}`}
              onEndEditing={(e) => {
                   element.oprice = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 50, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={`${element.sprice}`}
                keyboardType="numeric"
                multiline={true}
                numberOfLines={1}
                onEndEditing={(e) => {
                   element.sprice = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
          </View>
          <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center"}}>
          <Picker
                            selectedValue={element.category}
                            onValueChange={(itemValue, itemIndex) =>
                               { element.category = itemValue,
                                setProductHolder([...product_holder])}
                              }>
                                <Picker.Item label="Category" value="default"/>
                            {
                                category.map(item => 
                                <Picker.Item label={item.name} value={item.name} />
                                )
                            }
                            
                            </Picker>
          </View>
          {/* <View style={{ width: 50, height: 35,  borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center", alignItems:'center'}}>
            <CheckBox
                  center
                  checked={element.withVariants}
                  onPress={() => onCreateVariants(element)}
                />          
          </View>
          <View style={{ width: 50, height: 35, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center", alignItems:'center'}}>
            <CheckBox
                  center
                  checked={element.withAddons}
                  onPress={() => onCreateAddons(element)}
                />          
          </View>
      
          <View style={{ width: 50, height: 35, borderColor: colors.boldGrey, marginHorizontal:2, justifyContent:"center", alignItems:'center'}}>
            <CheckBox
                  center
                  checked={element.withOptions}
                  onPress={() =>  onCreateOptions(element)}
                />          
          </View> */}
        
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> handleRemoveItem(element.no)} style={{backgroundColor:colors.red, justifyContent:'center', marginHorizontal: 10, padding:5, borderRadius:25}}>
            <EvilIcons name={'trash'} size={26} color={colors.white}/>
           
            </TouchableOpacity>
          </View>
       
            </View>
          {/* {element.addons.length === 0 ? null :  <View style={{ flex: 1, flexDirection:'column',marginLeft: 20}}>
              <Text style={{fontSize: 18}}>Addons</Text>
              <View style={{flexDirection:"row"}}>
                <Text style={{width: 100, textAlign:'center', fontWeight:'bold'}}>Name</Text>
                <Text  style={{width: 50, textAlign:'center', fontWeight:'bold'}}>Price</Text>
                <Text  style={{width: 50, textAlign:'center', fontWeight:'bold'}}>Cost</Text>
              </View>
            {
              element.addons.map((element, index) => 
              <View style={{flexDirection:"row", marginVertical:5}}>
              <Text style={{width: 100, textAlign:'center'}}>{element.name}</Text>
              <Text  style={{width: 50, textAlign:'center'}}>{element.price}</Text>
              <Text  style={{width: 50, textAlign:'center'}}>{element.cost}</Text>
            </View>
              )
            }
          </View>} */}

  {/* {  element.variants.length  === 0 ? null :     <View style={{ flex: 1, flexDirection:'column',marginLeft: 20}}>
              <Text style={{fontSize: 18}}>Variants</Text>
              <View style={{flexDirection:"row"}}>
                <Text style={{width: 100, textAlign:'center', fontWeight:'bold'}}>Name</Text>
                <Text  style={{width: 50, textAlign:'center', fontWeight:'bold'}}>Price</Text>
                <Text  style={{width: 50, textAlign:'center', fontWeight:'bold'}}>Cost</Text>
              </View>
            {
              element.variants.map((element, index) => 
              <View style={{flexDirection:"row", marginVertical:5}}>
              <Text style={{width: 100, textAlign:'center'}}>{element.name}</Text>
              <Text  style={{width: 50, textAlign:'center'}}>{element.price}</Text>
              <Text  style={{width: 50, textAlign:'center'}}>{element.cost}</Text>
            </View>
              )
            }
          </View>} */}

    {/* {   element.options.length  === 0 ? null :     <View style={{ flex: 1, flexDirection:'column',marginLeft: 20}}>
              <Text style={{fontSize: 18}}>Options</Text>
              <View style={{flexDirection:"row"}}>
                <Text style={{width: 100, textAlign:'center', fontWeight:'bold'}}>Option</Text>
              </View>
            {
              element.options.map((element, index) => 
              <View style={{flexDirection:"row", marginVertical:5}}>
              <Text style={{width: 100, textAlign:'center'}}>{element.option}</Text>
        
            </View>
              )
            }
          </View>} */}
     
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
          onProceed={onSaveProducts}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:20,
    backgroundColor: '#F6483B'
  },
  accordion:{
    width: '90%',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding:20,
    justifyContent: 'center'
  },
  accordionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10,    

  },
  accordionTitle: {
    fontSize: 20, 
    fontWeight:'bold',
    marginBottom: 20,
    color: '#62625A'
  },
  accordionItems: {
    borderRadius: 5,
    backgroundColor:'white',

  },
  accordionItemValue:{
    flexDirection: 'row',
    justifyContent:"space-between",
    padding: 10,

  },
  accordionItemValueBadge: {
    color: '#42C382',
    padding: 5,
    fontWeight: 'bold'
  },
  accordionItemValueName: {
    color: '#62625A'
  }
});

export default AddBatchStoreProducts;
