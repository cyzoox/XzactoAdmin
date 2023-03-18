import React,{useState} from "react";
import { Text, StyleSheet, View, TouchableOpacity,ScrollView, FlatList, Image, TextInput as TextInput2 } from "react-native";
import AppHeader from "../components/AppHeader";
import { Grid, Col, Row } from "react-native-easy-grid";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import colors from "../themes/colors";
import moment from 'moment'
import { useStore } from "../context/StoreContext";
import uuid from 'react-native-uuid';
import { Categories } from "../components/Categories";

import SearchInput, { createFilter } from 'react-native-search-filter';
import { useAuth } from "../context/AuthContext";
import { ModalInputForm } from "../components/ModalInputForm";
import {TextInput } from 'react-native-paper';

import DataTable from '../components/DataTable';
import Alert from "../components/Alert";
import CustomModal from "../components/CustomModal";
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import formatMoney from 'accounting-js/lib/formatMoney.js'
const KEYS_TO_FILTERS = ['name', 'category'];

import { FlatGrid } from 'react-native-super-grid';
import SearchBar from "../components/SearchBar";

const MyFlatListInGrid = ({filteredProducts, navigation, categories}) => {
 return( <>
  <FlatGrid
    itemDimension={80}
    data={filteredProducts}
    // staticDimension={300}
    // fixed
    spacing={15}
    renderItem={({ item }) => (
     <TouchableOpacity onLongPress={()=>{ modal_visible(true), product_info(item)}} onPress={()=> navigation.navigate('ProductWarehouseDetails', { product: item, categories: categories})} style={[styles.itemContainer]}>
    
        <Image source={{uri: item.img}} resizeMode="stretch" style={{flex: 2, height: 80, width: '100%'}}/>
        <View style={{paddingVertical: 5}}>
          <Text style={{textAlign:'center', fontSize:10, fontWeight:'700'}}>{item.name}</Text>
          <Text style={{textAlign:'center', fontSize:9}}>{item.brand}</Text>
          <Text style={{textAlign:'center', fontSize:9}}>{Math.round(item.stock * 100) / 100} In Stock</Text>
        </View>
        {
            item.stock < 10 ?<Text style={{paddingHorizontal: 2,paddingVertical: 2, backgroundColor:colors.red, borderRadius: 15,position: 'absolute', right: 10, top: 10,}}>
               <MaterialCommunityIcons name={'alert-octagram-outline'} size={20} color={colors.white}/>
            </Text> : null
          }
       {item.stock <= 10 ? <View style={styles.container}>
                <View style={[styles.label,
                        {height:20},
                        ]}>
                  <Text style={{color: colors.white, fontSize:11, fontWeight:'bold'}}>Low stock</Text>
                </View>
         </View>: null}
      </TouchableOpacity>
    )}
  />
  </>)
}

const MyFlatListInList = ({filteredProducts, totalPrice, setCustomModal2,setCustomModal4, setProduct, setProductQty}) => {
  return(
    <>
     <DataTable
            total ={totalPrice}
            quantity={0}
            headerTitles={['Product', 'Stocks','Price','Actions']}
            alignment="center"
            >
            <FlatList
              keyExtractor={(key) => key.key}
              data={filteredProducts}
              renderItem={({item})=>
              (
              <Row style={{height: 40,shadowColor: "#EBECF0", marginVertical:1.5,marginHorizontal: 5,backgroundColor: item.stock > 10 ? colors.white: colors.red}}>     
                <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                    <Text  style={styles.textColor}>{item.name}</Text>
                </Col>  
                <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                    <Text  style={styles.textColor}>{Math.round(item.stock * 100) / 100}</Text>
                </Col>
                <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
                    <Text  style={styles.textColor}>{formatMoney(item.sprice, { symbol: "₱", precision: 2 })}</Text>
                </Col>
                <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                <Row style={{justifyContent:'space-between'}}>
               
                <TouchableOpacity style={{marginHorizontal: 3, justifyContent:'center'}} onPress={()=> {setCustomModal2(true), setProduct(item), setProductQty(item.stock)}}>
                <Image 
                        source={require('../../assets/xzacto_icons/callendar5.png')}
                        style={{width: 40, height: 40}}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginHorizontal: 5, justifyContent:'center'}} onPress={()=>{ setCustomModal4(true), setProduct(item), setProductQty(item.stock)}}>
                      <Image 
                        source={require('../../assets/xzacto_icons/warehouseicons/transfer.png')}
                        style={{width: 40, height: 40}}
                      />
                  </TouchableOpacity>
                {/*  <TouchableOpacity style={{marginHorizontal: 3}} onPress={()=>{ setCustomModal4(true), setProduct(item), setProductQty(item.stock)}}>
                      <Feather name={'edit'} size={25} color={colors.red}/>
              </TouchableOpacity>*/}
                </Row>
                  
                </Col>
                
            </Row>
            ) }             
              />
          </DataTable>
    </>
  )
  
}

const WarehouseProducts = ({ navigation }) => {
  
  const { user } = useAuth();
  const [term, setTerm] = useState('');
  const [categories, setCategory]= useState('');
  const [toggled, setToggle] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [product_name, setProduct] = useState([]);
  const [product_qty, setProductQty] = useState(0)
  const [bo_qty, setBoqty] =  useState(1);
  const [exp_qty, setExpqty] =  useState(1);
  const [tr_qty, setTrQty] =  useState(1);
  const [reason, setReason] = useState('');
  const [selected_store, setSelectedStore] = useState([])
  const [receipt_no, setReceiptNo] = useState('');
  const [custom_modal, setCustomModal] = useState(false);
  const [custom_modal1, setCustomModal1] = useState(false);
  const [custom_modal2, setCustomModal2] = useState(false);
  const [custom_modal3, setCustomModal3] = useState(false);
  const [custom_modal4, setCustomModal4] = useState(false);
  const [selected, setSelected] = useState(0);
  const [alertVisible, setAlert] = useState(false);

  const [displayType, setDisplayType] = useState('list');

  const { 
  
          stores,   
          createWarehouseExpired,
          createWarehouseCategories,
          warehouse_category,
          warehouse_products,
          onSendProducts,
          createtransferLogs,
          createStoreDeliverySummary,
          createDeliveryReport
        } = useStore();

    


  const filteredProducts = warehouse_products.filter(createFilter(term, KEYS_TO_FILTERS));
console.log(selected_store)
  
 const  onTransferProducts = () => {
  const date = moment().unix();

  let wproducts = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    name: product_name.name,
    brand: product_name.brand,
    oprice: product_name.oprice,
    sprice: product_name.sprice,
    unit: product_name.unit,
    category: product_name.category,
    store_id: selected_store._id,
    store: selected_store.name,
    stock: tr_qty,
    sku:'',
    img:'',
    pr_id: product_name._id
  }

  let trproducts = {
    partition: `project=${user.id}`,
    id:uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    product: product_name.name,
    quantity: tr_qty,
    oprice: product_name.oprice,
    sprice: product_name.sprice,
    store_id: selected_store._id,
    store_name: selected_store.name,
    transferred_by :'Admin',
    unit: product_name.unit,
    category: product_name.category
  }

  let delivery = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    product: product_name.name,
    quantity: tr_qty,
    oprice: product_name.oprice,
    sprice: product_name.sprice,
    supplier: 'Warehouse',
    supplier_id: 'Warehouse',
    delivered_by: 'C/o Warehouse',
    received_by: 'C/o Warehouse',
    delivery_receipt: 'C/o Warehouse',
    store_id: selected_store._id,
    store_name: selected_store.name,
  }

  let drs = {
    partition: `project=${user.id}`,
    id: uuid.v4(),
    timeStamp: moment().unix(),
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    date: moment.unix(date).format('MMMM DD, YYYY'),
    supplier: 'Warehouse',
    supplier_id: 'Warehouse',
    delivered_by: 'C/o Warehouse',
    received_by: 'C/o Warehouse',
    delivery_receipt: 'C/o Warehouse',
    total: tr_qty*product_name.oprice,
    store_id: selected_store._id,
    store_name: selected_store.name,
  }


  onSendProducts(wproducts, product_name);
  createStoreDeliverySummary(drs)
  createtransferLogs(trproducts)
  createDeliveryReport(delivery)
  setCustomModal4(false)
  setTrQty(1)
  setSelectedStore([])
  }

  const onSaveExpired = () => {
    let date = moment().unix()
    let Expired = {
          partition: `project=${user.id}`,
          id: uuid.v4(),
          owner_id : user.id,
          exp_date : '',
          date : moment.unix(date).format('MMMM DD, YYYY'),
          timeStamp: moment().unix(),
          year :moment.unix(date).format('YYYY'),
          year_month :moment.unix(date).format('MMMM-YYYY'),
          year_week :moment.unix(date).format('WW-YYYY'),
          product: product_name.name,
          quantity: parseFloat(exp_qty),
          oprice: product_name.oprice,
          sprice: product_name.sprice,
          brand: product_name.brand,
          processed_by: ''
    }
    createWarehouseExpired(Expired, product_name)
   setCustomModal2(false)
  }

  const renderItem = ({ item }) => {
    const editable = false;
    return(
        <Row style={{height: 40,shadowColor: "#EBECF0", marginVertical:1.5,marginHorizontal: 5,backgroundColor:'white'}}>     
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{item.name}</Text>
        </Col>  
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{Math.round(item.stock * 100) / 100}</Text>
        </Col>
        <Col  style={[styles.ColStyle,{alignItems: 'center'}]}>
            <Text  style={styles.textColor}>{formatMoney(item.sprice, { symbol: "₱", precision: 2 })}</Text>
        </Col>
        <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
        <Row style={{justifyContent:'space-between'}}>
        <TouchableOpacity style={{marginHorizontal: 3}} onPress={()=> {setCustomModal2(true), setProduct(item), setProductQty(item.stock)}}>
              <Ionicons name={'ios-time-outline'} size={25} color={colors.black}/>
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 3}} onPress={()=>{ setCustomModal4(true), setProduct(item), setProductQty(item.stock)}}>
              <Entypo name={'swap'} size={25} color={colors.red}/>
          </TouchableOpacity>
        </Row>
          
        </Col>
        
    </Row>
    );   
  }

  const calculateTotalPrice = () => {
    let total = 0;
    filteredProducts.forEach(items => {
      total += items.oprice* items.stock
    });

    return total;
  }

  const onProceedSelection = () => {
    switch(selected) {
 
      case 1:
        setCustomModal(false)
        setCustomModal1(true)
        break;
      
      case 2:
        setCustomModal(false)
        setCustomModal2(true)
        break;
 
      case 3:
        setCustomModal(false)
        setCustomModal3(true)
        break;
 
      case 4:
        setCustomModal(false)
        setCustomModal4(true)
        break;
 
      default:
        alert("NUMBER NOT FOUND");
    
      }
  }

  const onSaveCategory = () => {
    createWarehouseCategories(categories)
  }

  const onTabChange = (sterm) => {
    setTerm(sterm)
  }

  const onCancel = () => {
    setConfirm(false)
  }

  const onCancelCustomModal =(number)=> {
    switch(number) {
      case 0:
        setCustomModal(false)
        break;

      case 1:
        setCustomModal1(false)
        break;
      
      case 2:
        setCustomModal2(false)
        break;
 
      case 3:
        setCustomModal3(false)
        break;
 
      case 4:
        setCustomModal4(false)
        break;
 
      default:
        alert("NUMBER NOT FOUND");
    
      }
  }

const onCancelAlert = () => {
  setAlert(false)
}

  return (
    <View style={{flex:1}}>
      <Alert visible={alertVisible} onCancel={onCancelAlert} onProceed={onCancelAlert} title="Create Categoies" content="Please create categories first." confirmTitle="OK"/>
     
      <CustomModal 
          title="Choose what to do with the product"
          visible={custom_modal}
          confirmTitle="Proceed"
          onCancel={() => onCancelCustomModal(0)}
          onProceed={onProceedSelection}
          >
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal: 10}}>
              <TouchableOpacity style={selected === 1 ? [styles.customBox, {borderColor: colors.primary}] : styles.customBox } onPress={()=> setSelected(1)}>
                  <Ionicons name={'trash-bin-outline'} size={30} color={selected === 1 ? colors.primary :colors.statusBarCoverDark}/>
                  <Text style={selected === 1 ? {color: colors.primary }:{color: colors.statusBarCoverDark }}>   B.O   </Text>
              </TouchableOpacity>

              <TouchableOpacity style={selected === 2 ? [styles.customBox, {borderColor: colors.primary}] : styles.customBox }  onPress={()=> setSelected(2)}>
                  <Ionicons name={'ios-time-outline'} size={30} color={selected === 2 ? colors.primary :colors.statusBarCoverDark}/>
                  <Text style={selected === 2 ? {color: colors.primary }:{color: colors.statusBarCoverDark }}>Expired</Text>
              </TouchableOpacity>

              <TouchableOpacity style={selected === 3 ? [styles.customBox, {borderColor: colors.primary}] : styles.customBox }  onPress={()=> setSelected(3)}>
                  <Ionicons name={'md-arrow-redo-circle-outline'} size={30} color={selected === 3 ? colors.primary :colors.statusBarCoverDark}/>
                  <Text style={selected === 3 ? {color: colors.primary }:{color: colors.statusBarCoverDark }}>Returns</Text>
              </TouchableOpacity>
            </View>
          </CustomModal>
          <CustomModal
           title={`B.O for ${product_name.name}`}
           visible={custom_modal1}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(1)}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={bo_qty === 1 ? ()=> {} : ()=> setBoqty(bo_qty-1)} style={{borderWidth: .5, paddingVertical: 10, marginVertical: 10,paddingHorizontal: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={{borderWidth: .5,paddingVertical: 10, paddingHorizontal: 30}}>
                    <Text>{bo_qty}</Text>
                  </View>
                  <TouchableOpacity onPress={bo_qty !== product_qty ? ()=> setBoqty(bo_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={{borderWidth: .5,paddingVertical: 10,paddingHorizontal: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                  <Feather name={'plus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Text style={{marginLeft: 10}}>Reason :</Text>
                 <Input onChangeText={(text)=> setReason(text)} inputStyle={{borderWidth: .5, borderRadius: 5, marginTop: 5}}/>
                </View>
              
            </View>
          </CustomModal>
          <CustomModal
           title={`Transfer ${product_name.name}`}
           visible={custom_modal4}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(4)}
           onProceed={onTransferProducts}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={tr_qty === 1 ? ()=> {} : ()=> setTrQty(tr_qty-1)} style={styles.trincrmnt2}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={styles.trinput}>
                    <TextInput2
                    defaultValue={`${tr_qty}`}
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 18,textAlign:'center', marginHorizontal:10, justifyContent:'center',marginBottom:-5}}
                    keyboardType="decimal-pad"
                    onChangeText={(e) =>{e.length === 0? {}: setTrQty(parseFloat(e))}}
                    />
                  </View>
                  <TouchableOpacity onPress={tr_qty !== product_qty ? ()=> setTrQty(tr_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={styles.trincrmnt}>
                  <Feather name={'plus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Text style={{textAlign: 'center', marginTop:10, fontSize:18, fontWeight:''}}>Select Store :</Text>
                  <View style={{borderWidth:.3, borderRadius: 10, marginHorizontal:15, marginTop:5, justifyContent:'center'}}>
                  <Picker
                      selectedValue={selected_store}
                      style={{height: 40}}
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
              
            </View>
          </CustomModal>
          <CustomModal
           title={`Number of expired ${product_name.name}`}
           visible={custom_modal2}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(2)}
           onProceed={onSaveExpired}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={exp_qty === 1 ? ()=> {} : ()=> setExpqty(exp_qty-1)} style={styles.trincrmnt2}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={styles.trinput}>
                    <TextInput2
                    defaultValue={`${exp_qty}`}
                    underlineColorAndroid = 'transparent'
                    style={{fontSize: 18,textAlign:'center', marginHorizontal:10, justifyContent:'center',marginBottom:-5}}
                    keyboardType="decimal-pad"
                    onChangeText={(e) =>{e.length === 0? {}: setExpqty(parseFloat(e))}}
                    />
                  </View>
                  <TouchableOpacity onPress={exp_qty !== product_qty ? ()=> setExpqty(exp_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={styles.trincrmnt}>
                  <Feather name={'plus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                </View> 
            </View>
          </CustomModal>
          <CustomModal
           title={`Number of returned ${product_name.name}`}
           visible={custom_modal3}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(3)}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={exp_qty === 1 ? ()=> {} : ()=> setExpqty(exp_qty-1)} style={{borderWidth: .5, paddingVertical: 10, marginVertical: 10,paddingHorizontal: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={{borderWidth: .5,paddingVertical: 10, paddingHorizontal: 30}}>
                    <Text>{exp_qty}</Text>
                  </View>
                  <TouchableOpacity onPress={exp_qty !== product_qty ? ()=> setExpqty(exp_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={{borderWidth: .5,paddingVertical: 10,paddingHorizontal: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                  <Feather name={'plus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                </View> 
                <View style={{flexDirection:'column'}}>
                  <Text style={{marginLeft: 10}}>Reason :</Text>
                 <Input onChangeText={(text)=> setReason(text)} inputStyle={{borderWidth: .5, borderRadius: 5, marginTop: 5}}/>
                </View>
                <View style={{flexDirection:'column'}}>
                  <Text style={{marginLeft: 10}}>Receipt No :</Text>
                 <Input onChangeText={(text)=> setReceiptNo(text)} inputStyle={{borderWidth: .5, borderRadius: 5, marginTop: 5}}/>
                </View>
            </View>

          </CustomModal>
        
           <AppHeader 
           centerText="Warehouse Products" 
           leftComponent={
             <TouchableOpacity onPress={()=> navigation.goBack()}>
               <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
             </TouchableOpacity>
              }
              rightComponent={
                <View style={{flexDirection:'row'}}>
                  {
                    displayType === 'grid' ? 
                    <TouchableOpacity onPress={()=> setDisplayType('list')}>
                    <Ionicons name={'list'} size={23} color={colors.white}/>
                  </TouchableOpacity>:
                    <TouchableOpacity onPress={()=> setDisplayType('grid')}>
                    <Ionicons name={'grid-outline'} size={23} color={colors.white}/>
                  </TouchableOpacity>
                  }
                </View>
         
        }
           screen="Warehouse"
        />
        <View style={{flexDirection:"column"}}>
        <View>
          <SearchBar 
              term={term} 
              onTermChange={setTerm}
          >
           
          </SearchBar>
        </View>
        <View style={styles.deck}>
        
        <TouchableOpacity style={{justifyContent:"center", alignItems:'center'}}  onPress={()=> warehouse_category.length === 0 ? setAlert(true) :navigation.navigate('AddWarehouseProducts')}>
            <Image 
              resizeMode="cover"
              source={require('../../assets/xzacto_icons/addproducts.png')}
              style={{width:40, height:40}}
            />
            <Text style={{textAlign:'center',fontSize: 10 }}>Add Products</Text>
          </TouchableOpacity>
          <ModalInputForm
             displayComponent={
                 <>
                <Image 
                          resizeMode="cover"
                          source={require('../../assets/xzacto_icons/batch_edit.png')}
                          style={{width:40, height:40}}
                        />
                        <Text style={{textAlign:'center',fontSize: 10 }}>Add Category</Text>
                    
                 </>
             }
             title="Add Category" 
             onSave={onSaveCategory}>
           <TextInput
                 mode="outlined"
                 label="Category"
                 placeholder="Category"
                 onChangeText={(text)=> setCategory(text)}
                 />
           </ModalInputForm>
          <TouchableOpacity style={{justifyContent:"center", alignItems:'center'}}  onPress={()=> warehouse_category.length === 0 ? setAlert(true) : navigation.navigate('WarehouseBatchEdit')}>
            <Image 
              resizeMode="cover"
              source={require('../../assets/xzacto_icons/batch_edit_(2).png')}
              style={{width:40, height:40}}
            />
            <Text style={{textAlign:'center',fontSize: 10 }}>Batch Edit</Text>
          </TouchableOpacity>
       
      <TouchableOpacity onPress={()=> warehouse_category.length === 0 ? setAlert(true) : navigation.navigate('AddBatchWarehouseProducts')} style={{justifyContent:"center", alignItems:'center'}}>
            <Image 
              resizeMode="cover"
              source={require('../../assets/xzacto_icons/batch_adding.png')}
              style={{width:40, height:40}}
            />
            <Text style={{textAlign:'center',fontSize: 10 }}>Batch Adding</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> warehouse_category.length === 0 ? setAlert(true) : navigation.navigate('BatchTransfer')} style={{justifyContent:"center", alignItems:'center'}}>
            <Image 
              resizeMode="cover"
              source={require('../../assets//xzacto_icons/batch_transfer.png')}
              style={{width:40, height:40}}
            />
            <Text style={{textAlign:'center',fontSize: 10 }}>Batch Transfer</Text>
              </TouchableOpacity>
        </View>
      </View>
     
      <View style={{flex:1}}>
      <Categories tabs = {warehouse_category} store={user} onTabChange={onTabChange} origin={'warehouse'}/>
      {displayType === "list" ? <MyFlatListInList setCustomModal2={setCustomModal2} setCustomModal4={setCustomModal4} setProduct={setProduct} setProductQty={setProductQty} filteredProducts={filteredProducts} totalPrice={calculateTotalPrice()}/> :<MyFlatListInGrid filteredProducts={filteredProducts} navigation={navigation} categories={warehouse_category} />  }
     
      </View>
      
    </View>
  );
};

WarehouseProducts.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  textColor: {
    fontSize: 14,
    color: colors.black,
    fontWeight:'600',
    textAlign:'center'
  },
  ColStyle: {
      width: 120,
      justifyContent: 'center',
      paddingBottom: 5,
  },
  footerBar: {
      color: colors.white,
      fontWeight: 'bold'
  },
  footerContainer: {
      flexDirection:'row', 
      justifyContent:'space-between', 
      margin: 10, backgroundColor:colors.statusBarCoverDark, 
      padding: 5,
      paddingHorizontal: 5
    },
  backgroundStyle: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    backgroundColor: colors.coverDark,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 2,
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
  marginHorizontal: 8,
  flexDirection:'row',
  backgroundColor: colors.accent,
  height: 40,
  paddingHorizontal: 20,
  borderRadius:30,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 5,
},
customBox : {
  borderWidth: .5, 
  paddingHorizontal: 10, 
  paddingVertical: 15, 
  borderRadius: 10,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
},
flexStyle: {
  fontSize: 25,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 15,
  flexDirection:'column'
},
deck: {
  flexDirection:"row", 
  justifyContent:'space-evenly', 
  backgroundColor: colors.white,
  shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    borderRadius:10,
    padding:10
},
trincrmnt:{
  paddingVertical: 9,
  paddingHorizontal: 20, 
  borderTopRightRadius: 10, 
  borderBottomRightRadius: 10,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 2,
},
trincrmnt2:{
  paddingVertical: 9,
  paddingHorizontal: 20, 
  borderTopLeftRadius: 10, 
  borderBottomLeftRadius: 10,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 2,
},
trinput:{
  height:38,
  justifyContent:'center',
   shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 5,
   
  },
  shadowOpacity: 0.89,
  shadowRadius: 2,
  elevation: 2,

},
itemContainer: {
  justifyContent: 'center',
  alignItems:'center',
  borderRadius: 5,
  backgroundColor: colors.white,
  height: 150,
  shadowColor: "#EBECF0",
  shadowOffset: {
    width: 0,
    height: 1,
   
  },
  shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
},
label: {
  justifyContent: 'center',
  alignItems: 'center',
  
},
container: {
  position: 'absolute',
  transform: [{rotate: '40deg'}],
  right: -25,
  top:13,
  backgroundColor:'red',
  width:100
}
});

export default WarehouseProducts;
