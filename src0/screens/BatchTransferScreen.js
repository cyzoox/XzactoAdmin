import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView ,TouchableOpacity} from "react-native";
import colors from "../themes/colors";

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import uuid from 'react-native-uuid';
import { FAB } from 'react-native-paper';
import { useStore } from "../context/StoreContext";
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import { useAuth } from "../context/AuthContext";
import AlertwithChild from "../components/AlertwithChild";
import AppHeader from "../components/AppHeader";
const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container","Bottle"]
import {Picker} from '@react-native-picker/picker';

const BatchTransferScreen = ({navigation,route}) => {

    const {user} = useAuth();
    const {stores,warehouse_category,createWarehouseProducts,  warehouse_products,createWarehouseDeliveryReport, 
        createDeliveryReport, createStoreDeliverySummary,onSendProducts,createtransferLogs} = useStore();

    const [product_holder, setProductHolder] = useState([
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4()},
        {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4()}
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
    const [selected_store, setSelectedStore] = useState([])
    const onAddItem = () => {
        const items =  product_holder.concat([{"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, id: uuid.v4()}])
       setProductHolder(items)
     }

     const totalSupply = () => {
      let total =0;
      product_holder.forEach(item => {
          total += parseFloat(item.qty)* item.oprice
      });
  
      return total;
  }
    
 const onSaveItems = () => {
  
         product_holder.forEach(items => {
            console.log('test: ',items)
             let wproducts = {
                partition: `project=${user.id}`,
                id: uuid.v4(),
                name: items.name,
                brand: items.brand,
                oprice: parseFloat(items.oprice),
                sprice: parseFloat(items.sprice),
                unit: items.unit,
                category: items.category,
                store_id: selected_store._id,
                store: selected_store.name,
                stock: parseFloat(items.qty),
                sku:'',
                img:'https://res.cloudinary.com/sbpcmedia/image/upload/v1652251290/pdn5niue9zpdazsxkwuw.png',
                pr_id: items.id
              }
              onSendProducts(wproducts, items);
         });
         saveToDeliveryReports()
     
 }

 const calculateTotal = () => {
    let total = 0;

    product_holder.forEach(items => {
        total += items.qty*items.oprice
    });
    return total;
 }

 const saveToDeliveryReports = () => {
   let dates = moment().unix()
    let year = moment(date, "MMMM DD, YYYY").format('YYYY');
    let month = moment(date, "MMMM DD, YYYY").format('MMMM');
    let week = moment(date, "MMMM DD, YYYY").format('WW');
  
    product_holder.forEach(items => {
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
            oprice: items.oprice,
            sprice: items.sprice,
            supplier: 'Warehouse',
            supplier_id: 'Warehouse',
            delivered_by: 'C/o Warehouse',
            received_by: 'C/o Warehouse',
            delivery_receipt: 'C/o Warehouse',
            store_id: selected_store._id,
            store_name: selected_store.name,
          }
        
          let trproducts = {
            partition: `project=${user.id}`,
            id:uuid.v4(),
            timeStamp: moment().unix(),
            year :moment.unix(dates).format('YYYY'),
            year_month :moment.unix(dates).format('MMMM-YYYY'),
            year_week :moment.unix(dates).format('WW-YYYY'),
            date: moment.unix(dates).format('MMMM DD, YYYY'),
            product: items.name,
            quantity: parseFloat(items.qty),
            oprice: items.oprice,
            sprice: items.sprice,
            store_id: selected_store._id,
            store_name: selected_store.name,
            transferred_by :'Admin',
            unit: items.unit,
            category: items.category
          }
          createDeliveryReport(delivery)
          createtransferLogs(trproducts)
    });
  
    

          let drs = {
            partition: `project=${user.id}`,
            id: uuid.v4(),
            timeStamp: moment(dates).unix(),
            year :moment.unix(dates).format('YYYY'),
            year_month :moment.unix(dates).format('MMMM-YYYY'),
            year_week :moment.unix(dates).format('WW-YYYY'),
            date: moment.unix(dates).format('MMMM DD, YYYY'),
            supplier: 'Warehouse',
            supplier_id: 'Warehouse',
            delivered_by: 'C/o Warehouse',
            received_by: 'C/o Warehouse',
            delivery_receipt: 'C/o Warehouse',
            total: calculateTotal(),
            store_id: selected_store._id,
            store_name: selected_store.name,
          }
          createStoreDeliverySummary(drs)
        alertVisible(false)
        navigation.goBack()

}


     const handleRemoveItem = no => {
      setProductHolder(product_holder.filter(item => item.no !== no))
  }

  return (
      <View style={{flex: 1}}>
        <AppHeader 
                centerText="Batch Transfer" 
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
  <View style={{flexDirection:'column'}}>
                  <View style={{borderWidth:.3, borderRadius: 10, marginHorizontal:15, marginTop:5, justifyContent:'center',}}>
                  <Picker
                      selectedValue={selected_store}
                      style={{height: 50}}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedStore(itemValue)
                      }>
                        <Picker.Item label="Select store" value="default"/>
                      {
                        stores.map(element => 
                          <Picker.Item label={element.name} value={element} />
                        )
                      }
                     
                    </Picker>
                    </View>
                </View>
         <ScrollView contentContainerStyle={{flex: 1}}>
          <ScrollView horizontal contentContainerStyle={{flexDirection:'column', marginTop: 20}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{ marginHorizontal: 10, padding:5, borderRadius:25}}>       </Text>
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Product Name</Text>
   
               <Text style={{width: 150, textAlign:'center', marginHorizontal:2, fontWeight:'700'}}>Qty</Text>
       
           </View>
           {
                product_holder.map((element, index) => 
            <View style={{flexDirection:'row', marginVertical: 3}}>
            <TouchableOpacity onPress={()=> handleRemoveItem(element.no)} style={{backgroundColor:colors.red, justifyContent:'center', marginHorizontal: 10, padding:5, borderRadius:25}}>
            <EvilIcons name={'trash'} size={26} color={colors.white}/>
            </TouchableOpacity>
            <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2, flexDirection:'row'}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                defaultValue={element.name}
                editable={false}
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
        
          <View style={{borderWidth: 1, width: 150, height: 35, borderRadius: 10, borderColor: colors.boldGrey, marginHorizontal:2}}>
              <TextInput
                style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                underlineColorAndroid = 'transparent'
                placeholderTextColor='red'
                disableFullscreenUI={true}
                keyboardType="numeric"
                defaultValue={`${element.qty}`}
             
                onEndEditing={(e) => {
                   element.qty = e.nativeEvent.text;
                   setProductHolder([...product_holder]);
                 }}
              />
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

export default BatchTransferScreen;
