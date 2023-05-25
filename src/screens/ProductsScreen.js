import React,{useState, useEffect} from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import {TextInput } from 'react-native-paper';
import AppHeader from "../components/AppHeader";
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import SearchBar from "../components/SearchBar";
import colors from "../themes/colors";
import { AddProduct } from "../components/AddProduct";
import { useStore } from "../context/StoreContext";
import { useRoute } from '@react-navigation/native';
import { Categories } from "../components/Categories";
import Products from "../components/Products";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { ModalInputForm } from "../components/ModalInputForm";
import CustomModal from "../components/CustomModal";
import {Input, Overlay, Button} from 'react-native-elements';
import { useAuth } from "../context/AuthContext";
import uuid from 'react-native-uuid';
import moment from 'moment'

import app from "../../getRealmApp";
import PinCodeInput from "../components/PinCodeInput";
import Alert from "../components/Alert";
const KEYS_TO_FILTERS = ['name', 'category'];

const ProductsScreen = ({ navigation }) => {
  // const customData = app.currentUser.customData;
  const route = useRoute();
  const STORE =  route.params.store
  const {user} = useAuth();
  const [term, setTerm] = useState('');
  const [toggled, setToggle] = useState(false);
  const [categories, setCategory] = useState('')
  const [code, setCode] = useState('');
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null);
  const [visible2, setVisible] = useState(false);
  const [upgrade_plan, setUpgradePlan] = useState(false)
 
  const { 
      
          createProducts,
          products,
          createCategories,
          category,
          createExpired,
          createBO,
          createReturned,
          user_info
        } = useStore();
        console.log(category)
        const [confirm, setConfirm] = useState(false);
        const [product_name, setProduct] = useState([]);
        const [product_qty, setProductQty] = useState(0)
        const [bo_qty, setBoqty] =  useState(1);
        const [exp_qty, setExpqty] =  useState(1);
        const [return_qty, setReturnQty] =  useState(1);
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
        const [product_info, setProductInfo] = useState([]);
        const [pullout_qty,setPOutqty] = useState(1)

  const filteredProducts = products.filter(createFilter(term, KEYS_TO_FILTERS))
  const onTabChange = (sterm) => {
    setTerm(sterm)
  }

   const onSaveCategory = () => {
    createCategories(categories, STORE._id)
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

  const onCheckPassword = () => {
      navigation.navigate('BatchEdit',{info: STORE})
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
  const onSaveExpired = () => {
    let date = moment().unix();
    let expired = {
      partition: `project=${user.id}`,
      id: uuid.v4(),
      exp_date : '',
      date : moment.unix(date).format('MMMM DD, YYYY'),
      timeStamp: moment().unix(),
      year :moment.unix(date).format('YYYY'),
      year_month :moment.unix(date).format('MMMM-YYYY'),
      year_week :moment.unix(date).format('WW-YYYY'),
      product: product_info.name,
      quantity: exp_qty,
      oprice : product_info.oprice,
      sprice: product_info.sprice,
      brand: product_info.brand,
      attendant: 'admin',
      attendant_id: 'admin',
      store: STORE.name,
      store_id: STORE._id
    }
    createExpired(expired, product_info)
    onCancelCustomModal(2)
  }

  const onSaveBO = () => {
    let date = moment().unix();
    let BO ={
      partition: `project=${user.id}`,
      id: uuid.v4(),
      store_name: STORE.name,
      store_id: STORE._id,
      date : moment.unix(date).format('MMMM DD, YYYY'),
      timeStamp: moment().unix(),
      product_name: product_info.name,
      product_id: product_info._id,
      total: product_info.sprice*bo_qty,
      year :moment.unix(date).format('YYYY'),
      year_month :moment.unix(date).format('MMMM-YYYY'),
      year_week :moment.unix(date).format('WW-YYYY'),
      attendant_name: 'admin',
      attendant_id: 'admin',
      quantity: bo_qty,
      sprice: product_info.sprice,
      oprice: product_info.oprice,
      brand: product_info.brand,
    }
    createBO(BO, product_info)
    onCancelCustomModal(1)
  }

  const onSaveReturn = () => {
    let date = moment().unix();
   let returned = {
     partition: `project=${user.id}`,
    id: uuid.v4(),
    store_name: STORE.name,
    store_id: STORE._id,
    date : moment.unix(date).format('MMMM DD, YYYY'),
    timeStamp: moment().unix(),
    product_name: product_info.name,
    product_id: product_info._id,
    total: product_info.sprice*return_qty,
    year :moment.unix(date).format('YYYY'),
    year_month :moment.unix(date).format('MMMM-YYYY'),
    year_week :moment.unix(date).format('WW-YYYY'),
    attendant_name: 'admin',
    attendant_id: 'admin',
    quantity: return_qty,
    reason: reason,
    receipt_no: receipt_no
  }
  createReturned(returned, product_info)
  onCancelCustomModal(3)
  }

  return (
    <View style={{flex:1}}>
      <Alert visible={upgrade_plan} onCancel={()=> setUpgradePlan(false)} onProceed={()=> setUpgradePlan(false)}  title="Upgrade Plan" content="Maximum number of products has been reach please upgrade your plan." confirmTitle="OK"/>
        <CustomModal 
          title="Choose what to do with the product"
          visible={custom_modal}
          confirmTitle="Proceed"
          onCancel={() => onCancelCustomModal(0)}
          onProceed={onProceedSelection}
          >
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal: 5}}>
              <TouchableOpacity style={selected === 1 ? [styles.customBox, {borderColor: colors.accent}] : styles.customBox } onPress={()=> setSelected(1)}>
                  <Ionicons name={'trash-bin-outline'} size={30} color={selected === 1 ? colors.accent :colors.statusBarCoverDark}/>
                  <Text style={selected === 1 ? {color: colors.accent }:{color: colors.statusBarCoverDark }}>   B.O   </Text>
              </TouchableOpacity>

              <TouchableOpacity style={selected === 2 ? [styles.customBox, {borderColor: colors.accent}] : styles.customBox }  onPress={()=> setSelected(2)}>
                  <Ionicons name={'ios-time-outline'} size={30} color={selected === 2 ? colors.accent :colors.statusBarCoverDark}/>
                  <Text style={selected === 2 ? {color: colors.accent }:{color: colors.statusBarCoverDark }}>Expired</Text>
              </TouchableOpacity>

              <TouchableOpacity style={selected === 3 ? [styles.customBox, {borderColor: colors.accent}] : styles.customBox }  onPress={()=> setSelected(3)}>
                  <Ionicons name={'md-arrow-redo-circle-outline'} size={30} color={selected === 3 ? colors.accent :colors.statusBarCoverDark}/>
                  <Text style={selected === 3 ? {color: colors.accent }:{color: colors.statusBarCoverDark }}>Returns</Text>
              </TouchableOpacity>

             {/* <TouchableOpacity style={selected === 4 ? [styles.customBox, {borderColor: colors.accent}] : styles.customBox }  onPress={()=> setSelected(4)}>
                  <Ionicons name={'md-arrow-redo-circle-outline'} size={30} color={selected === 3 ? colors.accent :colors.statusBarCoverDark}/>
                  <Text style={selected === 4 ? {color: colors.accent }:{color: colors.statusBarCoverDark }}>Pullout</Text>
  </TouchableOpacity>*/}
            </View>
          </CustomModal>
          <CustomModal
           title={`B.O for ${product_info.name}`}
           visible={custom_modal1}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(1)}
           onProceed={onSaveBO}
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
           title={`Number of ${product_info.name} to Pullout`}
           visible={custom_modal4}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(4)}
           onProceed={onSaveExpired}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={pullout_qty === 1 ? ()=> {} : ()=> setPOutqty(pullout_qty-1)} style={{borderWidth: .5, paddingVertical: 10, marginVertical: 10,paddingHorizontal: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={{borderWidth: .5,paddingVertical: 10, paddingHorizontal: 30}}>
                    <Text>{pullout_qty}</Text>
                  </View>
                  <TouchableOpacity onPress={pullout_qty !== product_qty ? ()=> setPOutqty(pullout_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={{borderWidth: .5,paddingVertical: 10,paddingHorizontal: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
                  <Feather name={'plus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                </View> 
            </View>
          </CustomModal>
          <CustomModal
           title={`Number of expired ${product_info.name}`}
           visible={custom_modal2}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(2)}
           onProceed={onSaveExpired}
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
            </View>
          </CustomModal>
          <CustomModal
           title={`Number of returned ${product_info.name}`}
           visible={custom_modal3}
           confirmTitle="Proceed"
           onCancel={()=> onCancelCustomModal(3)}
           onProceed={onSaveReturn}
          >
            <View>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={return_qty === 1 ? ()=> {} : ()=> setReturnQty(return_qty-1)} style={{borderWidth: .5, paddingVertical: 10, marginVertical: 10,paddingHorizontal: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                  <Feather name={'minus-square'} size={20} color={colors.primary}/>
                  </TouchableOpacity>
                  <View style={{borderWidth: .5,paddingVertical: 10, paddingHorizontal: 30}}>
                    <Text>{return_qty}</Text>
                  </View>
                  <TouchableOpacity onPress={return_qty !== product_qty ? ()=> setReturnQty(return_qty+1): ()=> alert("Exceeded the total number of stocks")}  style={{borderWidth: .5,paddingVertical: 10,paddingHorizontal: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
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
          centerText="Products" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
        }
      
      />
      {/*
        !toggled ? 
        <View style={styles.backgroundStyle}>
          <TouchableOpacity style={styles.barStyle} onPress={()=> setToggle(true)}>
           <Feather name="search" style={styles.iconStyle}/>
           <View style={styles.iconStyle}>
              <Text >Search</Text>
          </View>
          
          </TouchableOpacity>
         
              <AddProduct createProducts={createProducts} store={STORE} categories={category}>
              <Text style={{fontSize: 10 , color: colors.white}}>Add Product</Text>
              </AddProduct>
              <ModalInputForm
                displayComponent={
                    <>
                        <EvilIcons style={{textAlign:'center'}}  name={'plus'} size={30} color={colors.white}/>
                        <Text style={{fontSize: 10 , color: colors.white}}>Add Category</Text>
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
              <TouchableOpacity style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10, marginTop:2}}>
              <Feather style={{textAlign:'center'}}  name={'edit'} size={20} color={colors.white}/>
                <Text style={{fontSize: 10 , color: colors.white, marginTop:2}}>Batch Edit</Text>
              </TouchableOpacity>
        </View> :
        <SearchBar 
            term={term} 
            onTermChange={setTerm}
        >
           <TouchableOpacity style={styles.iconStyle} onPress={()=> setToggle(!toggled)}>
        <Feather  name={'x-circle'} size={25} color={colors.black}/>
        </TouchableOpacity>
        </SearchBar>
              */ }
      <View style={{flexDirection:"column"}}>
        <View>
          <SearchBar 
              term={term} 
              onTermChange={setTerm}
          >
           
          </SearchBar>
        </View>
        <View style={styles.deck}>
        {
          user_info[0].no_of_products === products.length || user_info[0].no_of_products < products.length ?
          <TouchableOpacity style={styles.flexStyle} onPress={()=>setUpgradePlan(true)}>
          <Image 
                  resizeMode="cover"
                  source={require('../../assets/add_product.png')}
                  style={{width:40, height:40}}
                />
                <Text style={{textAlign:'center',fontSize: 10 }}>Add Products</Text>
          </TouchableOpacity> :  <AddProduct createProducts={createProducts} store={STORE} categories={category}>
        <Text style={{textAlign:'center',fontSize: 10 }}>Add Products</Text>
        </AddProduct>
        }
       
          <ModalInputForm
                displayComponent={
                    <>
                        <Image 
                          resizeMode="cover"
                          source={require('../../assets/add_cat.png')}
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
         
          <TouchableOpacity style={{justifyContent:"center", alignItems:'center'}}  onPress={()=> setVisible(true)}>
            <Image 
              resizeMode="cover"
              source={require('../../assets/batch_edit.png')}
              style={{width:40, height:40}}
            />
            <Text style={{textAlign:'center',fontSize: 10 }}>Batch Edit</Text>
          </TouchableOpacity>
       
       {
         user_info[0].no_of_products === products.length || user_info[0].no_of_products < products.length ?
         <TouchableOpacity style={{justifyContent:'center', alignItems:"center"}} onPress={()=> setUpgradePlan(true)}>
         <Image 
           resizeMode="cover"
           source={require('../../assets/batch_add.png')}
           style={{width:40, height:40}}
         />
         <Text style={{textAlign:'center',fontSize: 10 }}>Batch Adding</Text>
           </TouchableOpacity>:
               <TouchableOpacity onPress={()=> navigation.navigate('BatchAddingStore',{store: STORE})} style={{justifyContent:"center", alignItems:'center'}}>
               <Image 
                 resizeMode="cover"
                 source={require('../../assets/batch_add.png')}
                 style={{width:40, height:40}}
               />
               <Text style={{textAlign:'center',fontSize: 10 }}>Batch Adding</Text>
                 </TouchableOpacity>
       }
  
        </View>
      </View>
      <Categories tabs = {category} store={STORE} onTabChange={onTabChange}  origin={'store'}/>
      <Products product_info={setProductInfo} modal_visible={setCustomModal} categories={category} products={filteredProducts} store={STORE} navigation={navigation}/>
      <Overlay isVisible={visible2} onBackdropPress={setVisible}>
           
            <View style={{padding: 20}}>
            {/* <SmoothPinCodeInput password mask="﹡"
              cellStyle={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 15
              }}
              cellSize={45}
            codeLength={4}
            value={code}
            onTextChange={code => setCode(code)}/> */}
              <PinCodeInput pinCode={user_info[0].pin} onCheckPassword={onCheckPassword}/>
            </View>
        </Overlay>
    </View>
  );
};

ProductsScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor: colors.charcoalGrey,
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
customBox : {
  backgroundColor: colors.white,
  borderWidth: .5, 
  paddingHorizontal: 5, 
  paddingVertical: 15, 
  borderRadius: 10,
  
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
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
}
});

export default ProductsScreen;
