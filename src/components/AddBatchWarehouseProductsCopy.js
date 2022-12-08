import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput ,FlatList} from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AppHeader from "./AppHeader";
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import {Picker} from '@react-native-picker/picker';
import { useAuth } from "../context/AuthContext";
import uuid from 'react-native-uuid';
import Orientation from 'react-native-orientation';
import DatePicker from 'react-native-date-picker';
import moment from 'moment'
import SearchInput, { createFilter } from 'react-native-search-filter';
import Alert from "./Alert";
const KEYS_TO_FILTERS = ['name'];

const AddBatchWarehouseProducts = ({navigation}) => {
    const {user} = useAuth();
  const {warehouse_category,createWarehouseProducts,  warehouse_products,createWarehouseDeliveryReport, 
    createDeliveryReport,
    createDeliverySummary} = useStore();


    const units = ["Kilo", "Gram", "Piece", "Liter","Bundle", "Dozen", "Whole", "Half-Dozen","Ounce", "Milliliter", "Milligrams", "Pack","Ream","Box","Sack","Serving","Gallon","Container","Bottle"]
  const [product_holder, setProductHolder] = useState([
      {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4()},
      {"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, category:'', id: uuid.v4()}
  ])
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [query,setQuery] = useState('')
  const [delivery_no, setDeliveryNo] = useState('')
  const [delivered_by, setDeliveredBy] = useState('')
  const [supplier, setSupplier] = useState('')
  const [term,setTerm] = useState('')
  const filteredProducts = warehouse_products.filter(createFilter(term, KEYS_TO_FILTERS))
  const [visible, setVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    Orientation.lockToLandscape()
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

 

  const onAddItem = () => {
   const items =  product_holder.concat([{"no": uuid.v4(), "name": '', 'brand': '', 'qty': 0, 'unit': '', 'oprice': 0, 'sprice': 0, id: uuid.v4()}])
  setProductHolder(items)
}

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
                img:''
              }
            createWarehouseProducts(products)
        });
        saveToDeliveryReports()
    
}

const totalSupply = () => {
    let total =0;
    product_holder.forEach(item => {
        total += parseFloat(item.qty)* item.oprice
    });

    return total;
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
            supplier: supplier,
            supplier_id: '',
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
            supplier: supplier,
            supplier_id: '',
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

const updateFieldChanged = (name, index) => (event) => {
    let newArr = product_holder.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: event.nativeEvent.text };
      } else {
        return item;
      }
    });
    setProductHolder(newArr);
  };

const onCancel = () => {
    setVisible(false)
}

  return(
    <View style={{flex: 1}}>
        <Alert visible={visible} onCancel={onCancel} onProceed={onCancel} title="Lacking of Information" content="Please fill in delivery information." confirmTitle="Proceed"/>
         <AppHeader 
          centerText="Warehouse Products" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
        rightComponent={
            <TouchableOpacity style={{paddingRight: 20}} onPress={onSaveItems}>
                <Text style={{fontSize: 16, color:'#ffffff', fontWeight:'bold'}}>SAVE</Text>
            </TouchableOpacity>
        }
      />
      <ScrollView>
        <Grid style={{margin: 5}}>
            <Text style={{color: colors.red, textAlign: 'center'}}>{errorMsg.length === 0 ? null : errorMsg}</Text>
        <Row style={{height: 30}}>
                <Col size={1.5} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                <TextInput 
                                style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                underlineColorAndroid = 'transparent'
                                onChangeText={(text)=> setSupplier(text)}
                                disableFullscreenUI={true}
                                placeholder="Supplier"
                                defaultValue={supplier}
                                
                            />
                </Col>
                <Col  style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                <TextInput 
                                style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                underlineColorAndroid = 'transparent'
                                onChangeText={(text)=> setDeliveredBy(text)}
                                disableFullscreenUI={true}
                                placeholder="Delivered By"
                                value={delivered_by}
                                
                            />
                </Col>
               
            </Row>
            <Row style={{height: 30}}>
                <Col size={1.5} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                <TextInput 
                                style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                underlineColorAndroid = 'transparent'
                                onChangeText={(text)=> setDeliveryNo(text)}
                                disableFullscreenUI={true}
                                placeholder="Delivery No."
                                value={delivery_no}
                                
                            />
                </Col>
              
                <Col  style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>setOpen(true)}>
                    <Text>{`${moment(date).format('MMMM DD, YYYY')}`}</Text>
                </TouchableOpacity>
                </Col>
            </Row>
            <Row style={{height: 25}}>
                <Col  style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                    <Text>Product List</Text>
                </Col>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <TouchableOpacity onPress={onAddItem} style={{backgroundColor:'salmon', flex: 1, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'bold'}}>+ Add Item</Text>
                    </TouchableOpacity>
                </Col>
            </Row>
           
            <Row style={{height: 35}}>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', backgroundColor:'#dedede'}}>
                    <Text style={{textAlign:'center'}}>
                        No.
                    </Text>
                </Col>
                <Col size={.8} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Name
                    </Text>
                </Col>
                <Col size={.4} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Brand
                    </Text>
                </Col>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        QTY
                    </Text>
                </Col>
                <Col size={.8} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Unit
                    </Text>
                </Col>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Capital Price
                    </Text>
                </Col>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Selling Price
                    </Text>
                </Col>
                <Col size={.8} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Category
                    </Text>
                </Col>
                <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                    <Text style={{textAlign:'center'}}>
                        Action
                    </Text>
                </Col>
            </Row>
            {
                product_holder.map((element, index) => 
                   
                        <Row style={{height: 35}}>
                        <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center', backgroundColor:'#dedede'}}>
                            <TextInput 
                                style={{textAlign:'center',paddingBottom:0, paddingTop: 0}}
                                underlineColorAndroid = 'transparent'
                                placeholderTextColor='red'
                                editable={false}
                                placeholder={`${index + 1}`}
                                disableFullscreenUI
                            />
                        </Col>
                        <Col size={.8} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                           <View style={{flexDirection:'row', justifyContent:'space-evenly', flex: 1}}>
                                <TextInput 
                                 style={{textAlign:'center', flex: 3, paddingBottom:0, paddingTop: 0}}
                                 underlineColorAndroid = 'transparent'
                                 placeholderTextColor='red'
                                 disableFullscreenUI={true}
                                defaultValue={element.name}

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
                                    warehouse_products.map(item => 
                                        
                                        <Picker.Item label={item.namde} value={item} />
                                        )
                                }
                                
                                </Picker>
                            
                                </View>
                                     {/* <TextInput 
                                 style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                 underlineColorAndroid = 'transparent'
                                 placeholderTextColor='red'
                                 disableFullscreenUI={true}
                                defaultValue={element.name}

                                onEndEditing={(e) => {
                                    element.name = e.nativeEvent.text;
                                    setProductHolder([...product_holder]);
                                  }}
                                />*/}
                        </Col>
                        <Col size={.4} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                            <TextInput 
                                 style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                 underlineColorAndroid = 'transparent'
                                 placeholderTextColor='red'
                                 disableFullscreenUI={true}
                                 defaultValue={`${element.brand}`}
                                 onEndEditing={(e) => {
                                    element.brand = e.nativeEvent.text;
                                    setProductHolder([...product_holder]);
                                  }}
                            />
                          
                        </Col>
                        <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                            <TextInput 
                                 style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
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
                          
                        </Col>
                        <Col size={.8} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
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
                        </Col>
                        <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                            <TextInput 
                                 style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                 underlineColorAndroid = 'transparent'
                                 placeholderTextColor='red'
                                 keyboardType="numeric"
                                 disableFullscreenUI={true}
                                 defaultValue={`${element.oprice}`}
                               onEndEditing={(e) => {
                                    element.oprice = e.nativeEvent.text;
                                    setProductHolder([...product_holder]);
                                  }}
                            />
                        </Col>
                        <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center'}}>
                            <TextInput 
                                 style={{textAlign:'center', flex: 1, paddingBottom:0, paddingTop: 0}}
                                 underlineColorAndroid = 'transparent'
                                 placeholderTextColor='red'
                                 disableFullscreenUI={true}
                                 defaultValue={`${element.sprice}`}
                                 keyboardType="numeric"
                                 onEndEditing={(e) => {
                                    element.sprice = e.nativeEvent.text;
                                    setProductHolder([...product_holder]);
                                  }}
                            />
                        </Col>
                        <Col size={.8} style={{borderWidth: .4, borderColor: 'grey', justifyContent:'center'}}>
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
                         
                        </Col>
                        <Col size={.3} style={{borderWidth: .2, borderColor: 'grey', justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={()=> handleRemoveItem(element.no)}>
                                <EvilIcons name={'trash'} size={30} color={colors.red}/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    
                    
                )
            }
        </Grid>
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
        </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default AddBatchWarehouseProducts;
