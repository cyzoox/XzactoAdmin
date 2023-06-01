import React,{useEffect, useState} from "react";
import { Text, StyleSheet, View, Dimensions , TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Divider, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import Loader from "../components/Loader";
import app from "../../getRealmApp";
import moment from 'moment'
import SubscribeCard from "react-native-subscribe-card";
import uuid from 'react-native-uuid';
import { Avatar, Button, Overlay, Tooltip  } from "react-native-elements";
import AlertwithChild3 from "../components/AlertwithChild3";
const { width: ScreenWidth } = Dimensions.get("screen");
import SearchInput, { createFilter } from 'react-native-search-filter';
import * as ImagePicker from "react-native-image-picker"
const KEYS_TO_FILTERS = ['date'];
const DashboardScreen = ({navigation}) => {
  const {user,signOut, projectData} = useAuth();
  const { 
    stores,
    loading,
    products,
    expenses, 
    transactions,
    user_info,
    onCreateUserPlan,
    staffs,
    onUpdatePlan
  } = useStore();
// Access a logged in user's read-only custom data
const [sub_alert, setSubsciptionAlert] = useState(false)
const [alert_visible, alertVisible] = useState(false);
// const customData = app.currentUser.customData;
const [text, setText] = useState('');
const [hasUnsavedChanges,sethasUnsavedChanges] = useState(false)
const [totalDuration, setTotalDuration] = useState(0);
const [subscriptionVisible, setSubscriptionVisible] = useState(true);
const [plan0, setPlan0] = useState(true);
const [plan1, setPlan1] = useState(false);
const [plan2, setPlan2] = useState(false);
const [plan3, setPlan3] = useState(false);
const [username, setUserName] = useState('');
const [pinCode, setPinCode] = useState('');
const [cpinCode, setCPinCode] = useState('');
const [error,setError] = useState('')
const [no_of_branch,setNoOfBranch] = useState(1)
const [no_of_cashier,setNoOfCashier] = useState(1)
const [no_of_products,setNoOfProducts] = useState(1)
const [open, setOpen] = useState(false);
const [selectPlanVisible, setselectPlanVisible] = useState(false);
const [plan_three_selected, setPlanThreeSelected] = useState(false);
const [plan_one_selected, setPlanOneSelected] = useState(false);
const [e, setEData] = useState([]);
const [selectedYear, setSelectedYear] = useState('');
const date = moment().unix()
const today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
const [edit_profile, setEditProfile] = useState(false);
const [img,setImg] = useState('')
const [item,setItem] = useState([])

const filteredTransaction = transactions.filter(createFilter(today, KEYS_TO_FILTERS))
const filteredExpenses= expenses.filter(createFilter(today, KEYS_TO_FILTERS))

console.log('user',user_info)

useEffect(
    () =>
    navigation.addListener('beforeRemove', (e) => {
      if(hasUnsavedChanges){
        navigation.dispatch(e.data.action)
      }
        // If we don't have unsaved changes, then we don't need to do anything
        e.preventDefault();
        return; 
    }),[navigation, hasUnsavedChanges]
   
  );


  
  // const calculateTotalCapital = () => {
  //   let total = 0
  //   products.forEach(items => {
  //     total += items.oprice * items.stock
  //   });
  //   return total;
  // }

  // const calculateCapitalInStock = () => {
  //   let total = 0
  //   products.forEach(items => {
  //     total += items.sprice * items.stock
  //   });
  //   return total;
  // }

  const calculateStoreExpenses = (id) => {
    let total = 0;
    filteredExpenses.forEach(item => {
      if(item.store_id === id){
        total += item.amount
      }
      
    });
    return total;
  }

  const calculateExpenses = () => {
    let total = 0;
    filteredExpenses.forEach(item => {
    
        total += item.amount
  
      
    });
    return total;
  }

  const _totalSubscriptionPlan = () => {
    let branchPrice = 784;
    let cashierPrice = 35;
    let productPrice = 0.0200;
    let total = 0;
    let subtotal = 0

 if (selectedYear == '1 yr'){
      subtotal =((no_of_branch * branchPrice)  + (no_of_cashier*cashierPrice)*no_of_branch + (no_of_products*productPrice)*no_of_branch) / 10;

      total = (((no_of_branch * branchPrice)  + (no_of_cashier*cashierPrice)*no_of_branch + (no_of_products*productPrice)*no_of_branch) - subtotal)*12;
    }else if(selectedYear == '3 mos'){
      total = ((no_of_branch * branchPrice)  + (no_of_cashier*cashierPrice)*no_of_branch + (no_of_products*productPrice)*no_of_branch)*3;
    }else{
      total = (no_of_branch * branchPrice)  + (no_of_cashier*cashierPrice)*no_of_branch + (no_of_products*productPrice)*no_of_branch;
    }

    return total;
  }

  const calculateProjectedIncome = () => {
    let total = 0
    products.forEach(items => {
      total += (items.sprice - items.oprice ) + items.stock
    });
    return total;
  }

  const calculateStoreSale = (id, sid) => {
      let total = 0;

      filteredTransaction.forEach(item => {
        if(item.attendant_id === id  && item.status === "Completed" && item.store_id === sid){
          total += item.total;
        }
       
      });

      return total;
  }

  const calculateStoreSaleProfit = (id, sid) => {
    let total = 0;

    filteredTransaction.forEach(item => {
      if(item.attendant_id === id  && item.status === "Completed" && item.store_id === sid){
        total += item.profit;
      }
     
    });

    return total;
}

  const calculateSale = () => {
    let total = 0;

    filteredTransaction.forEach(item => {
      if(item.status === "Completed"){
        total += item.total;
      }
       
      
     
    });

    return total;
}


const calculateProfit = () => {
  let total = 0;

  filteredTransaction.forEach(item => {
    if(item.status === "Completed"){
      total += item.profit;
    }
   
    
   
  });

  return total;
}

function checkBranchInput(input) {

  if (input < 0) {
   setNoOfBranch(1)
  } else if (input > 120) {
    setNoOfBranch(120)
  }else if (isNaN(input)){
    setNoOfBranch(1)
  } else {
    setNoOfBranch(input)
  }
}

function checkCashierInput(input) {

  if (input < 0) {
   setNoOfCashier(1)
  } else if (input > 4) {
    setNoOfCashier(4)
  }else if (isNaN(input)){
    setNoOfCashier(1)
  } else {
    setNoOfCashier(input)
  }
}

function checkProductInput(input) {

  if (input < 0) {
   setNoOfProducts(1)
  } else if (input > 3200) {
    setNoOfProducts(3200)
  }else if (isNaN(input)){
    setNoOfProducts(1)
  } else {
    setNoOfProducts(input)
  }
}
  const onsignOut = () => {
    alertVisible(true)
    sethasUnsavedChanges(true)
  }

  const onSelectFreePlan = () => {
    if(pinCode !== cpinCode){
      setError('Pin code does not match!')
      return;
    }

    const date = moment().unix()
    let plan={
      partition: `project=${user.id}`,
      id: uuid.v4(),
      name: username,
      pin: pinCode,
      privilege: 'Free Plan',
      privilege_due:  `${moment.unix(date).add(60, 'day').startOf('day')/ 1000}`
    }
    onCreateUserPlan(plan)
    setSubscriptionVisible(false)
    setselectPlanVisible(false)
  }

  const onSelectCustomPlan = () => {
    if(pinCode !== cpinCode){
      setError('Pin code does not match!')
      return;
    }
    if(user_info.length >= 1){
      if(selectedYear == '3 mos'){
        const date = moment().unix()
        let plan={
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(90, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onUpdatePlan(plan, user)
      }else if(selectedYear == '1 yr'){
        const date = moment().unix()
        let plan={
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(365, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onUpdatePlan(plan, user)
      }else{
        const date = moment().unix()
        let plan={
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(30, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onUpdatePlan(plan, user)
      }
     
    }else{
      if(selectedYear == '3 mos'){
        const date = moment().unix()
        let plan={
          partition: `project=${user.id}`,
          owner_id: user.id,
          id: uuid.v4(),
          name: "Custom User",
          pin: "1234",
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(90, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onCreateUserPlan(plan)
      }else if(selectedYear == '1 yr'){
        const date = moment().unix()
        let plan={
          partition: `project=${user.id}`,
          id: uuid.v4(),
          owner_id: user.id,
          name: "Custom User",
          pin: "1234",
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(365, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onCreateUserPlan(plan)
      }else{
        const date = moment().unix()
        let plan={
          partition: `project=${user.id}`,
          id: uuid.v4(),
          owner_id: user.id,
          name: "Custom User",
          pin: "1234",
          privilege: 'Custom Plan',
          privilege_due:  `${moment.unix(date).add(30, 'day').startOf('day')/ 1000}`,
          no_of_stores : parseInt(no_of_branch),
          no_of_cashiers : parseInt(no_of_cashier),
          no_of_products : parseInt(no_of_products)
        }
        onCreateUserPlan(plan)
      }
     
    }

    setPlanThreeSelected(false)
    setSubscriptionVisible(false)
  }

  const onSelectPlan = () => {
    if(plan0 == true){
      setselectPlanVisible(true)
    }
    if(plan1 == true){
      setPlanOneSelected(true)
    }
    if(plan3 == true){
      setPlanThreeSelected(true)
    }
  }

  const onSelectPlanOne = () => {
    const date = moment().unix()
    if(user_info.length >= 1){
      let plan={
        privilege: 'Starter Plan',
        privilege_due:  `${moment.unix(date).add(60, 'day').startOf('day')/ 1000}`,
        no_of_stores : 1,
        no_of_cashiers :1,
        no_of_products : 12
      }
      onUpdatePlan(plan, user)
    }else{
      let plan={
        partition: `project=${user.id}`,
        owner_id: user.id,
        id: uuid.v4(),
        name: "Name not set",
        pin: "1234",
        privilege: 'Starter Plan',
        privilege_due:  `${moment.unix(date).add(60, 'day').startOf('day')/ 1000}`,
        no_of_stores : 1,
        no_of_cashiers :1,
        no_of_products : 12
      }
      onCreateUserPlan(plan)
    }
   
    setPlanOneSelected(false)
    setSubscriptionVisible(false)
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
            onSaveImg(photo)

        }).catch(error =>{
            console.log('error : ', error)
        })
      }
    })

  
}
  return (
    <View style={{flex: 1}}>
      {/* <Loader loading={loading}/> */}
      <AlertwithChild3
          visible={edit_profile}
          onProceed={()=>{}}
          title="Edit Profile"
          confirmTitle="Save"
          onCancel={()=> setEditProfile(false)}
        >
          <Text style={{color: colors.red, textAlign:'center'}}>Note: Develoment in progress, currently not working.</Text>
          <View style={{justifyContent:"center", alignItems:"center"}}>
          <TouchableOpacity onPress={()=> openGallery()} style={styles.imageContainer}>
              <Image resizeMode="contain" source={{ uri: img }} style={styles.backgroundImage}/>
          </TouchableOpacity>
         
          </View>
          <View style={{marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}>
          <TextInput 
            onChangeText={(text)=> setUserName(text)}
            defaultValue={item.name}
            mode="outlined"
            label="Set name"
            style={{height: 50}}
          />
           <TextInput 
            onChangeText={(text)=> setUserName(text)}
            mode="outlined"
            label="Change PIN"
            style={{height: 50}}
          />
          </View>
        </AlertwithChild3>
        <AlertwithChild3
          visible={alert_visible}
          onProceed={()=>{navigation.goBack(), user.logOut()}}
          title="Sign Out?"
          confirmTitle="Sign Out"
          onCancel={()=> alertVisible(false)}
        >
          <Text style={{paddingHorizontal:30, textAlign:'center', paddingVertical:10}}>Are you sure you want to sign out?</Text>
        </AlertwithChild3>
        <AlertwithChild3
          visible={selectPlanVisible}
          onProceed={onSelectFreePlan}
          title="AVAIL FREE PLAN"
          confirmTitle="Proceed"
          onCancel={()=> setselectPlanVisible(false)}
        >
          {error.length > 0 ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text> : null}
          <Text style={{padding: 10, marginLeft: 10}}>Please fill in additinal information :</Text>
          <View style={{paddingHorizontal: 20}}>
          <TextInput 
            onChangeText={(text)=> setUserName(text)}
            mode="outlined"
            label="Set your Username"
            style={{height: 50}}
          />
           <TextInput 
            onChangeText={(text)=> setPinCode(text)}
            mode="outlined"
            label="Set your Pin"
            style={{height: 50}}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
          />
           <TextInput 
            onChangeText={(text)=> setCPinCode(text)}
            mode="outlined"
            label="Confirm Pin"
            style={{height: 50}}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
          />
          </View>
        
        </AlertwithChild3>
        <AlertwithChild3
          visible={plan_three_selected}
          onProceed={onSelectCustomPlan}
          title="CUSTOM PLAN"
          confirmTitle="Proceed"
          onCancel={()=> setPlanThreeSelected(false)}
        >
          {error.length > 0 ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text> : null}
          <Text style={{padding: 10, marginLeft: 10}}>Customize plan suitable to your needs</Text>
          <View style={{paddingHorizontal: 20}}>
            <View style={{margin: 5}}>
              <Text style={{fontWeight:'800'}}> No. of Branch</Text>
              <View style={{justifyContent:"space-around", flexDirection:'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={no_of_branch < 1 ? ()=> setNoOfBranch(1):  no_of_branch > 1 ? ()=> setNoOfBranch(no_of_branch-1): null } style={[styles.btn,{ backgroundColor: colors.boldGrey}]}>
                  <Text style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>-</Text>
                </TouchableOpacity>
                <TextInput 
                  mode='outlined' 
                  value={`${no_of_branch}`} 
                  style={{height: 30, width: 70, textAlign:'center'}} 
                  onChangeText={(text) => checkBranchInput(parseInt(text))}
                />
            
                <TouchableOpacity    onPress={no_of_branch > 120 ? ()=> setNoOfBranch(120):  no_of_branch < 120 ? ()=> setNoOfBranch(no_of_branch+1): null } style={[styles.btn,{ backgroundColor: colors.primary}]}>
                  <Text  style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{textAlign:'center', fontSize: 12}}>Maximum  120</Text>
            </View>
            <View style={{margin: 5}}>
              <Text style={{fontWeight:'800'}}> No. of Cashiers</Text>
              <View style={{justifyContent:"space-around", flexDirection:'row', alignItems: 'center'}}>
                <TouchableOpacity  onPress={no_of_cashier < 1 ? ()=> setNoOfCashier(1):  no_of_cashier > 1 ? ()=> setNoOfCashier(no_of_cashier-1): null }   style={[styles.btn,{ backgroundColor: colors.boldGrey}]}>
                  <Text style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>-</Text>
                </TouchableOpacity>
                <TextInput 
                  mode='outlined' 
                  value={`${no_of_cashier}`} 
                  style={{height: 30, width: 70, textAlign:'center'}} 
                  onChangeText={(text) => checkCashierInput(parseInt(text))}
                />


                <TouchableOpacity  onPress={no_of_cashier > 4 ? ()=> setNoOfCashier(4):  no_of_cashier < 4 ? ()=> setNoOfCashier(no_of_cashier+1): null } style={[styles.btn,{ backgroundColor: colors.primary}]}>
                  <Text  style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{textAlign:'center', fontSize: 12}}>Maximum  4</Text>
            </View>
            <View style={{margin: 5}}>
              <Text style={{fontWeight:'800'}}> No. of Products</Text>
              <View style={{justifyContent:"space-around", flexDirection:'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={no_of_products < 1 ? ()=> setNoOfProducts(1):  no_of_products > 1 ? ()=> setNoOfProducts(no_of_products-1): null }  style={[styles.btn,{ backgroundColor: colors.boldGrey}]}>
                  <Text style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>-</Text>
                </TouchableOpacity>
                <TextInput 
                  mode='outlined' 
                  value={`${no_of_products}`} 
                  style={{height: 30, width: 70, textAlign:'center'}} 
                  onChangeText={(text) => checkProductInput(parseInt(text))}
                />


                <TouchableOpacity  onPress={no_of_products > 3200 ? ()=> setNoOfProducts(3200):  no_of_products < 3200 ? ()=> setNoOfProducts(no_of_products+1): null } style={[styles.btn,{ backgroundColor: colors.primary}]}>
                  <Text  style={{color: colors.white, fontSize: 15, fontWeight:'bold'}}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{textAlign:'center', fontSize: 12}}>Maximum  3200</Text>
            </View>
            <Text style={{marginTop: 10, fontWeight:'800'}}>Subscription Duration</Text>
            <View style={{flexDirection:"row", justifyContent:'space-around', marginVertical: 10}}>
            <TouchableOpacity onPress={()=> setSelectedYear('1 mos')} style={selectedYear == '1 mos' ? [styles.year_select,{borderColor: colors.compliment}] : styles.year_select}>
                  <Text style={{textAlign:'center'}}>1 month</Text>
                  
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> setSelectedYear('3 mos')} style={selectedYear == '3 mos' ? [styles.year_select,{borderColor: colors.compliment}] : styles.year_select}>
                  <Text>3 months</Text>
                 
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> setSelectedYear('1 yr')} style={selectedYear == '1 yr'? [styles.year_select,{borderColor: colors.compliment}] : styles.year_select}>
              <Text>1 year</Text>
              <Text style={{fontSize: 10}}>less 10%</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems:'center', paddingVertical: 10, borderColor: colors.boldGrey, borderWidth: 0.5, borderRadius: 10}}>
              <Text>{formatMoney(_totalSubscriptionPlan(), { symbol: "₱", precision: 2 })}</Text>
           
            </View>
            <Text style={{textAlign: 'center', fontSize: 18, fontWeight:'bold'}}>Total</Text>
          </View>
        
        </AlertwithChild3>
        <AlertwithChild3
          visible={plan_one_selected}
          onProceed={onSelectPlanOne}
          title="STARTER PLAN"
          confirmTitle="Proceed"
          onCancel={()=> setPlanOneSelected(false)}
        >
          {error.length > 0 ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text> : null}
          <Text style={{padding: 10, marginLeft: 10}}>Suitable for small scale business</Text>
          <View style={{paddingHorizontal: 20}}>
              <Text>Inclusions : </Text>
              <View style={{marginLeft: 20}}>
                <Text style={{fontWeight: '900', marginVertical:3}}>1 store</Text>
                <Text style={{fontWeight: '900', marginVertical:3}}>1 cashier</Text>
                <Text style={{fontWeight: '900', marginVertical:3}}>12 products</Text>
                <Text style={{fontWeight: '900', marginVertical:3}}>+ 1 month free subscription for first time subscriber. </Text>
              </View>
          </View>
        
        </AlertwithChild3>
       <View style={styles.xlgridStyle}>
         <View style={{position: 'absolute', top: 20, left: 20}}>
           <Text style={{fontSize:25, color: colors.white, marginLeft:15}}>XZACTO ADMIN</Text>
         </View>
           
    
              <TouchableOpacity style={{position: 'absolute', top: 20, right: 20}} onPress={onsignOut}>
                <Image style={{width: 40, height: 40}} source={require('../../assets/logout.png')}/>
              </TouchableOpacity>
            {
              user_info.map(item => {
                return(
                  <View style={styles.xlsubgrid}>
                  <View style={{flex:1}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <View>
                          <View style={styles.xlsubgrid2}>
                            <Text style={{color: colors.primary, fontWeight:'700', marginRight:10, fontSize:17, marginLeft: 20}}>{`${item.name}`}</Text> 
                          </View>
                          <View style={{marginLeft: 20}}>
                            <Text>{item.privilege} | {moment.unix(item.privilege_due).format('MMM DD, YYYY')}</Text>
                          </View>
                        </View>
                        <View>
                            <Avatar 
                              size={'medium'} 
                              source={require('../../assets/user.png')}
                              avatarStyle={{borderRadius: 30,borderColor: colors.primary, borderWidth: 1}} />
                        </View>
                    </View>
                  
                    <View style={styles.xlsubgrid3}>
                        <Button 
                          onPress={()=> {setSubscriptionVisible(true),setItem(item)}} 
                          buttonStyle={{backgroundColor:colors.coverDark, borderRadius: 20, paddingHorizontal: 10, marginTop: 5, marginRight: 5}} 
                          titleStyle={{color:colors.white, fontSize:13}} 
                          title="Change Subscription" 
                          type="outline"/>
                        <Button 
                          onPress={()=> setEditProfile(true)} 
                          buttonStyle={{borderColor:colors.coverDark, borderRadius: 20, paddingHorizontal: 10, marginTop: 5}} 
                          titleStyle={{color:colors.primary, fontSize:13}} 
                          title="Edit Profile" 
                          type="outline"/>
                    </View>
                    </View>
                  
                 </View>
                )
        
              })
            }
     
      
        </View>

    <ScrollView>
    <View style={{   borderRadius: 10,
        borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 15}}>
       <View>
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Today's Sale </Text> 
       <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
          <Text style={{fontSize: 15, flex: 3}}></Text>
          <Text style={{fontSize: 15, textAlign:'center', fontWeight:'bold', color: colors.red}}>Sales</Text>
          <Text style={{fontSize: 15, marginLeft: 40, fontWeight:'bold', color: colors.green}}>Profit</Text>
        </View>
        <Divider/>
                <View>
                {
                    stores.map((item, index) => {
                      return(
                        <View key={index} style={{flexDirection:'column', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                        <Text style={{fontSize: 18, flex: 3, fontWeight: 'bold'}}>{item.name}</Text>
                        {
                          staffs.map(subitem => 
                            subitem.store_id === item._id &&
                            <View  style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                            <Text style={{fontSize: 15, flex: 3}}>{subitem.name}</Text>
                            <Text style={{fontSize: 15}}>{formatMoney(calculateStoreSale(subitem._id, item._id), { symbol: "₱ ", precision: 2 })}</Text>
                            <Text style={{fontSize: 15, marginLeft: 30}}>{formatMoney(calculateStoreSaleProfit(subitem._id, item._id), { symbol: "₱ ", precision: 2 })}</Text>
                            </View>
                          )
                        }
                       {/* <Text style={{fontSize: 15}}>{formatMoney(calculateStoreSale(item._id), { symbol: "₱ ", precision: 2 })}</Text>
                        <Text style={{fontSize: 15, marginLeft: 30}}>{formatMoney(calculateStoreSaleProfit(item._id), { symbol: "₱ ", precision: 2 })}</Text>  */}
                      </View>
                      )
                     
                    })
                  }
                </View>
                <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{fontSize: 15, fontWeight:'bold', flex: 3}}>Total</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>{formatMoney(calculateSale(), { symbol: "₱ ", precision: 2 })}</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold', marginLeft: 30}}>{formatMoney(calculateProfit(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                </View>
                </View>
    </View>
        <View style={{   borderRadius: 10,
        borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 15}}>
       <View>
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Today's Expenses </Text>
        <Divider/>
                <View>
                  {
                    stores.map((item, index) => {
                      return(
                        <View key={index} style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                        <Text style={{fontSize: 15}}>{formatMoney(calculateStoreExpenses(item._id), { symbol: "₱ ", precision: 2 })}</Text>
                      </View>
                      )
                     
                    })
                  }
                 
                 
                </View>
                <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10, paddingVertical: 10}}>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>Total</Text>
                    <Text style={{fontSize: 15, fontWeight:'bold'}}>{formatMoney(calculateExpenses(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                </View>
                </View>
    </View>
   

    {/* <View style={{   borderRadius: 10,
        borderColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 15}}>
       <View>
       <Text style={{textAlign:'center', fontSize: 19, fontWeight:'900', paddingVertical: 10}}>Capital</Text>
        <Divider/>
                <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                    <Text style={{fontSize: 15}}>Remaining Stocks Capital</Text>
                    <Text style={{fontSize: 15}}>{formatMoney(calculateTotalCapital(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 10,paddingVertical: 10}}>
                    <Text style={{fontSize: 15}}>Remaining Stocks SRP</Text>
                    <Text style={{fontSize: 15}}>{formatMoney(calculateCapitalInStock(), { symbol: "₱ ", precision: 2 })}</Text>
                  </View>
                </View>
                </View>
    </View> */}
    </ScrollView>
    <Overlay fullScreen isVisible={subscriptionVisible} onBackdropPress={()=> setSubscriptionVisible(false)}>
      <View style={{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
      }}>
  <View style={{position:'absolute', right: 20, top: 20}}>
  { user_info.length == 0 ?  
        <TouchableOpacity onPress={()=> setSubscriptionVisible(false)}>
              <EvilIcons name={'close-o'} size={40} color={colors.black}/>
        </TouchableOpacity> :
        <Tooltip
        visible={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        popover={<Text style={{ color: "#fff" }}>Tooltip text</Text>}
      >
        <TouchableOpacity onPress={()=> setSubscriptionVisible(false)}>
              <EvilIcons name={'close-o'} size={40} color={colors.black}/>
        </TouchableOpacity>
      </Tooltip>
      }
      </View>
      <View style={{ width: "80%", marginTop: "10%" }}>
      <Text
        style={{
          textAlign: "center",
          color: colors.black,
          fontSize: 32,
          fontFamily: "Roboto-Bold",
        }}
      >
        Pricing Plan
      </Text>
      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            color: colors.black,
            lineHeight: 15,
            textAlign: "center",
            fontFamily: "Roboto-Medium",
          }}
        >
          Choose a subscription plan to unlock all the functionality of the
          application
        </Text>
      </View>
    </View>
    <View
      style={{ height: "55%", marginTop: 64, justifyContent:"space-evenly" }}
    >

      <SubscribeCard
        title="STARTER PLAN"
        descriptionPrice=""
        description="1 store, 1 cashier, 12 products"
        currency="₱"
        price={198}
        isSelected={plan1}
        timePostfix="/mo"
        onPress={() => {setPlan0(false), setPlan1(true), setPlan2(false), setPlan3(false)}}
        containerStyle={{backgroundColor: colors.primary, borderRadius:10, borderColor:colors.grey}}
        outerContainerStyle={{borderColor:colors, backgroundColor:colors.grey}}
        selectedContainerStyle={{backgroundColor:colors.compliment}}
        selectedOuterContainerStyle={{backgroundColor:colors.compliment, borderColor: colors.primary}}
        selectedDescriptionPriceTextStyle={{color: colors.primary}}
        selectedPriceTextStyle={{color: colors.primary}}
        selectedCurrencyTextStyle={{color: colors.primary}}
        priceTextStyle={{color: colors.white}}
        descriptionPriceTextStyle={{color: colors.white}}
        currencyTextStyle={{color: colors.white}}
      />
    
      <SubscribeCard
        title="CUSTOM PLAN"
        currency="₱"
        description="customize your plan"
        price={819.02}
        isSelected={plan3}
        timePostfix="/mo"
        onPress={() =>  {setPlan0(false), setPlan1(false), setPlan2(false), setPlan3(true)}}
        containerStyle={{backgroundColor: colors.primary, borderRadius:10, borderColor:colors.grey}}
        outerContainerStyle={{borderColor:colors, backgroundColor:colors.grey}}
        selectedContainerStyle={{backgroundColor:colors.compliment}}
        selectedOuterContainerStyle={{backgroundColor:colors.compliment, borderColor: colors.primary}}
        selectedDescriptionPriceTextStyle={{color: colors.primary}}
        selectedPriceTextStyle={{color: colors.primary}}
        selectedCurrencyTextStyle={{color: colors.primary}}
        priceTextStyle={{color: colors.white}}
        descriptionPriceTextStyle={{color: colors.white}}
        currencyTextStyle={{color: colors.white}}
      />
    </View>
    <View
      style={{
        flex: 1,
        marginBottom: 16,
        justifyContent: "flex-end",
      }}
    >
      <TouchableOpacity
        style={{
          height: 50,
          borderRadius: 12,
          width: ScreenWidth * 0.9,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.primary,
          shadowRadius: 12,
          shadowOpacity: 0.5,
          shadowColor: "#805bfa",
          shadowOffset: {
            width: 0,
            height: 3,
          },
        }}
        onPress={()=> onSelectPlan()}
      >
        <Text style={{ color: "#fff", fontFamily: "Roboto-Bold" }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
    </View>
    </Overlay>
    </View>
  );
};

DashboardScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  cgridStyle : {
    backgroundColor: colors.white, 
    height: 100, width: windowWidth/1.5, 
    marginTop: -60, 
    alignSelf:'center', 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
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
  sgridStyle : {
    backgroundColor:colors.white, 
    marginRight: 5, 
    borderRadius: 15,
    alignItems:'center', 
    flexDirection:'row', 
    justifyContent:'space-between',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
  },
  lgridStyle : {
    backgroundColor: colors.white, 
    margin: 5, 
    marginTop: 10, 
    borderRadius: 15, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    paddingHorizontal: 10, 
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
  xlgridStyle: {
    backgroundColor: colors.primary, 
    height:150, 
    borderBottomLeftRadius: 35, 
    borderBottomRightRadius: 35, 
    justifyContent:'center',
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
    marginBottom:50
  },
  xlsubgrid:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:colors.white,
    marginHorizontal: 30,
    borderRadius:10,
    marginBottom: -120,
    padding:20,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5
  },
  xlsubgrid2:{
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  xlsubgrid3:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft: 15
  },
  btn: {
    backgroundColor: colors.red,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5
  },
  year_select: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    borderColor: colors.boldGrey,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    margin: 5,
    paddingVertical: 10,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5
  },
  imageContainer: {
   
    backgroundColor: '#000000',
    height: Dimensions.get('window').height /5,
    width: Dimensions.get('window').height /5,
    marginHorizontal: 50,
    borderRadius: 120
  },
  backgroundImage: {
   flex: 1,
  },
});

export default DashboardScreen;
