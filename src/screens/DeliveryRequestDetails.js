import React, { useEffect } from "react";
import { Text, StyleSheet, View , FlatList, TouchableOpacity} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../themes/colors";
import { Divider, TextInput } from "react-native-paper";
import ZigzagView from "react-native-zigzag-view"
import AppHeader from "../components/AppHeader";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import moment from 'moment'
import {Input, Overlay, Button} from 'react-native-elements';
import { ScrollView } from "react-native";
import uuid from 'react-native-uuid';
import { useAuth } from "../context/AuthContext";
import SearchInput, { createFilter } from 'react-native-search-filter';
import PinCodeInput from "../components/PinCodeInput";
import { useState } from "react";
import { ModalInputForm } from "../components/ModalInputForm";
import { ModalInputForm1 } from "../components/ModalInputForm1";
const KEYS_TO_FILTERS = ['request_id'];
const KEYS_TO_FILTERS1 = ['status'];

const DeliveryRequestDetails = ({navigation, route}) => {
    const { request, store } = route.params;
    console.log(request)
    const {user} = useAuth();
    const [visible2, setVisible] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [item, setItem] = useState([])
    const [qty, setQty] = useState('')
    const [errorText, setErrorText] = useState('')
    const [errorText1, setErrorText1] = useState('')
    const [errorText2, setErrorText2] = useState('')
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayVisible2, setOverlayVisible2] = useState(false);
    const [reason, setReason] = useState('')
    const [reason1, setReason1] = useState('')
    const {  delivery_request,
        delivery_req_details,
      
        createDeliveryReport, 
        createStoreDeliverySummary,
        onSendProducts,
        createtransferLogs,
        ReturnDelivery,
        ReturnSingleItem
       } = useStore();

       const filteredDetails = delivery_req_details.filter(createFilter(request._id, KEYS_TO_FILTERS))

       const filteredReturnDetails = filteredDetails.filter(createFilter("Returned", KEYS_TO_FILTERS1))
    
    const onAcceptRequest = () => {
        filteredDetails.forEach(items => {
          if(items.status === "Pending"){
            let wproducts = {
              partition: `project=${user.id}`,
              id: uuid.v4(),
              name: items.pr_name,
              brand: items.brand,
              oprice: items.pr_oprice,
              sprice: items.pr_sprice,
              unit: items.unit,
              category: items.pr_category,
              store_id: items.store_id,
              store: items.store,
              stock: items.stock,
              sku:'',
              img:items.img,
              pr_id: items.pr_id,
              withAddons: false,
              withVariants: false,
              withOptions: false
            }

         onSendProducts(wproducts, items);
          }
  
        });
        saveToDeliveryReports()
    }

    const onReturnDelivery = () => {
      // if(errorText.length === 0){
      //   setErrorText('Please fill in return reason.')
      //   return;
      // }
      ReturnDelivery(request, reason)
      setOverlayVisible(false)
      navigation.goBack()
    }

    const saveToDeliveryReports = () => {
        let dates = moment().unix()
         // let year = moment(date, "MMMM DD, YYYY").format('YYYY');
         // let month = moment(date, "MMMM DD, YYYY").format('MMMM');
         // let week = moment(date, "MMMM DD, YYYY").format('WW');
     
         
         let drs = {
           partition: `project=${user.id}`,
           id: uuid.v4(),
           timeStamp: moment().unix(),
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
           store_id: store._id,
           store_name: store.name,
         }
         createStoreDeliverySummary(drs)
       
         filteredDetails.forEach(items => {
          if(items.status === "Pending"){
            let delivery = {
              partition: `project=${user.id}`,
              id: uuid.v4(),
              timeStamp: moment().unix(),
              year :moment.unix(dates).format('YYYY'),
              year_month :moment.unix(dates).format('MMMM-YYYY'),
              year_week :moment.unix(dates).format('WW-YYYY'),
              date: moment.unix(dates).format('MMMM DD, YYYY'),
              product: items.pr_name,
              quantity: items.stock,
              oprice: items.pr_oprice,
              sprice: items.pr_sprice,
              supplier: 'Warehouse',
              supplier_id: 'Warehouse',
              delivered_by: 'C/o Warehouse',
              received_by: 'C/o Warehouse',
              delivery_receipt: 'C/o Warehouse',
              store_id: store._id,
              store_name: store.name,
              tr_id: drs.id
            }
          
            let trproducts = {
              partition: `project=${user.id}`,
              id:uuid.v4(),
              timeStamp: moment().unix(),
              year :moment.unix(dates).format('YYYY'),
              year_month :moment.unix(dates).format('MMMM-YYYY'),
              year_week :moment.unix(dates).format('WW-YYYY'),
              date: moment.unix(dates).format('MMMM DD, YYYY'),
              product: items.pr_name,
              quantity: items.stock,
              oprice: items.pr_oprice,
              sprice: items.pr_sprice,
              store_id: store._id,
              store_name: store.name,
              transferred_by :'Admin',
              unit: items.unit,
              category: items.pr_category
            }
            createDeliveryReport(delivery)
            createtransferLogs(trproducts)
          }
            
         });
       
         
             navigation.goBack()
     
     }
     
     
      const calculateTotal = () => {
        let total = 0;
        filteredDetails.forEach(list => {
          if(list .status === "Pending"){
            total += list.stock * list.pr_sprice
          }
               
        });
       return total;
    }

    const onReturnSingleItem = () => {
      if(reason1.length === 0){
        setErrorText1('Please fill in return reason.')
        return;
      }else{
        setErrorText1('')
      }
      if(qty.length === 0){
        setErrorText2('Please fill in quantity.')
        return;
      }else{
        setErrorText2('')
      }
      ReturnSingleItem(item, reason1, qty, request)
      navigation.goBack()
     
      }
      

    const renderItem = ({ item }) => 
      {
      return(
        item.status == "Pending" &&
        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 3, height: 40,alignItems:"center"}}>
        <View style={{flexDirection:'column',flex: 2}}>
        <Text>{item.pr_name} </Text>
        <Text>{Math.round(item.stock  * 100) / 100} x {formatMoney(item.pr_sprice, { symbol: "₱", precision: 1 })}</Text>
        </View>
       
        <Text style={{flex: 1,fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>{formatMoney(item.stock*item.pr_sprice, { symbol: "₱", precision: 1 })}</Text>
        <TouchableOpacity onPress={()=> {setItem(item), setVisible3(true)}}  style={{backgroundColor: colors.red, justifyContent:'center', alignItems:'center', paddingHorizontal:5, borderRadius: 15, height: 30}}>
          <Text style={{fontSize:10, color: colors.white, paddingHorizontal: 10}}>Return</Text>
        </TouchableOpacity>
        {/* <ModalInputForm1
         displayComponent={
             <>
         <TouchableOpacity onPress={()=> setOverlayVisible2(true)}  style={{backgroundColor: colors.red, justifyContent:'center', alignItems:'center', paddingHorizontal:5, borderRadius: 15, height: 30}}>
          <Text style={{fontSize:10, color: colors.white, paddingHorizontal: 10}}>Return</Text>
        </TouchableOpacity>
             </>
         }
         overlays ={overlayVisible2}
         title="Return Product" 
      >
         
        
       </ModalInputForm1> */}
    </View>
      )
    }
        
      
      const renderItem1 = ({ item }) => (
      
          <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 3, height: 40,alignItems:"center"}}>
              <View style={{flexDirection:'column',flex: 2}}>
              <Text>{item.pr_name} </Text>
              <Text>{Math.round(item.stock  * 100) / 100} x {formatMoney(item.pr_sprice, { symbol: "₱", precision: 1 })}</Text>
              </View>
             
              <Text style={{ justifyContent:'center', alignItems:'center',textAlign:'center'}}>{item.return_reason}</Text>
             
           
          </View>
        )
  
//  const printReceipt = async () => {
//                 try {
//                     await BluetoothEscposPrinter.printerInit();
//                     await BluetoothEscposPrinter.printerLeftSpace(0);

//                     await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
//                     await BluetoothEscposPrinter.setBlob(0);
//                     await  BluetoothEscposPrinter.printText(`${store.name}\r\n`, {
//                         encoding: 'CP437',
//                         codepage: 0,
//                         widthtimes: 1,
//                         heigthtimes: 0,
//                         fonttype: 4
//                     });
//                     await BluetoothEscposPrinter.setBlob(0);
//                     await  BluetoothEscposPrinter.printText(`${store.branch}\r\n\r\n`, {
//                         encoding: 'CP437',
//                         codepage: 0,
//                         widthtimes: 0,
//                         heigthtimes: 1,
//                         fonttype: 3
//                     });
//                     await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
//                     await  BluetoothEscposPrinter.printText(`Receipt No :        ${transactions.timeStamp} \r\n`,  {
//                       encoding: 'CP437',
//                       codepage: 0,
//                       widthtimes: 0,
//                       heigthtimes: 1,
//                       fonttype: 3
//                   });
//                     await  BluetoothEscposPrinter.printText("Date / Time :       " + `${moment.unix(transactions.timeStamp).format('DD MMM YYYY hh:mmA')}` + "\r\n",{
//                       encoding: 'CP437',
//                       codepage: 0,
//                       widthtimes: 0,
//                       heigthtimes: 1,
//                       fonttype: 3
//                   });
//                     await  BluetoothEscposPrinter.printText(`Attendant :         ${transactions.attendant_name}\r\n`,  {
//                       encoding: 'CP437',
//                       codepage: 0,
//                       widthtimes: 0,
//                       heigthtimes: 1,
//                       fonttype: 3
//                   });
//                   await  BluetoothEscposPrinter.printText("--------------------------------", {});
//                     let columnWidths = [35,8];
//                     await BluetoothEscposPrinter.printColumn(columnWidths,
//                         [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
//                         ["Description", "Amount"], {
//                           encoding: 'CP437',
//                           codepage: 15,
//                           widthtimes: 0,
//                           heigthtimes: 0,
//                           fonttype: 1
//                         });
//                       trdetails.map(async(item,index) => {
//                         await BluetoothEscposPrinter.printColumn(columnWidths,
//                           [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
//                           [`${item.name} - ${item.brand} ${item.quantity}x${formatMoney(item.sprice, { symbol: "₱", precision: 2 })}   `, `${formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 2 })}`], {
//                             encoding: 'CP437',
//                             codepage: 15,
//                             widthtimes: 0,
//                             heigthtimes: 0,
//                             fonttype: 1
//                           });
//                       await  BluetoothEscposPrinter.printText("\r\n", {});
//                       });
                  
//                     await  BluetoothEscposPrinter.printText("--------------------------------", {});
//                     let columnWidthss = [21,6,8, 8];
//                     await BluetoothEscposPrinter.printColumn(columnWidthss,
//                         [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
//                         ["Total", '','', `${formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}`], {  encoding: 'Cp1254',
//                         encoding: 'CP437',
//                             codepage: 15,
//                             widthtimes: 0,
//                             heigthtimes: 0,
//                             fonttype: 1});
//                     await BluetoothEscposPrinter.printColumn(columnWidthss,
//                         [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
//                         ["Cash", '','', `${formatMoney(0, { symbol: "₱", precision: 2 })}`], { 
//                           encoding: 'CP437',
//                             codepage: 15,
//                             widthtimes: 0,
//                             heigthtimes: 0,
//                             fonttype: 1
//                         });
//                     await BluetoothEscposPrinter.printColumn(columnWidthss,
//                         [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
//                         ["Total", '',' ', `${formatMoney(0, { symbol: "₱", precision: 2 })}`], { 
//                           encoding: 'CP437',
//                             codepage: 15,
//                             widthtimes: 0,
//                             heigthtimes: 0,
//                             fonttype: 1
//                         });
                          
//                       await  BluetoothEscposPrinter.printText("\r\n", {});
//                 } catch (e) {
//                     alert(e.message || "ERROR");
//             }
//    }


  


  return (
    <View style={{flex: 1}}>
        <AppHeader
            centerText="Request Details"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
              } 
              rightComponent={
                <TouchableOpacity onPress={()=> printReceipt()}>
                  <Feather name={'printer'} size={25} color={colors.white}/>
                </TouchableOpacity>
              } 
        />
        <View style={{marginHorizontal: 10,  marginBottom:100}}>
        <ScrollView
            
            contentContainerStyle={{
             
            justifyContent: "space-between"
            }}
        >
            {/* <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize: 17, fontWeight:'700'}}>Company Name</Text>
                <Text style={{fontSize: 15}}>Address</Text>
                <Text>Contact</Text>
            </View> */}
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text style={{fontSize: 16, fontWeight:'600'}}>{request.timeStamp}</Text>
                <Text style={{fontSize: 13}}>{moment.unix(request.timeStamp).format('DD MMM YYYY hh:mmA')}</Text>
            </View>
            <Divider style={{margin: 10}}/>
            <View style={{flex: 1,flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30, marginBottom: 15}}>
                <Text style={{flex:2, fontSize: 15, fontWeight:"bold"}}>ITEM</Text>
                <Text style={{flex:1, fontSize: 15, fontWeight:"bold"}}>TOTAL</Text>
                <Text style={{ fontSize: 15, fontWeight:"bold"}}>Action</Text>

            </View> 
            <FlatList
      
                keyExtractor={(key) => key.name}
                data={filteredDetails}
                renderItem={renderItem}
                />
            
            <Divider style={{margin: 10}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Total</Text>
                <Text>{formatMoney(calculateTotal(), { symbol: "₱", precision: 1 })}</Text>
            </View>
           { 
           filteredReturnDetails.length !== 0 ?
           <>
           <Divider style={{margin: 10}}/>
            <Text style={{flex:2, fontSize: 15, fontWeight:"bold", textAlign:'center', marginTop: 10, marginBottom: 5}}>RETURNED ITEMS</Text>
            <View style={{flex: 1,flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30, marginBottom: 15}}>
                <Text style={{flex:2, fontSize: 15, fontWeight:"bold"}}>ITEM</Text>
                <Text style={{ fontSize: 15, fontWeight:"bold"}}>REASON</Text>

            </View> 
            <FlatList
              keyExtractor={(key) => key.name}
              data={filteredReturnDetails}
              renderItem={renderItem1}
              />
              </> : null}
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text style={{color: colors.red}}>Discount</Text>
                <Text style={{color: colors.red}}> - {formatMoney(transactions.discount, { symbol: "₱", precision: 1 })}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text style={{color: colors.green, fontSize: 18, fontWeight:'bold'}}>Total</Text>
                <Text style={{color: colors.green, fontSize: 18, fontWeight:'bold'}}>{formatMoney(calculateTotal()-transactions.discount, { symbol: "₱", precision: 1 })}</Text>
            </View> */}
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15, marginTop: 10}}>
                <Text>Received</Text>
                <Text>{formatMoney(transactions.received, { symbol: "₱", precision: 1 })}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15, marginTop: 10}}>
                <Text>Change</Text>
                <Text>{formatMoney(transactions.received -( calculateTotal()-transactions.discount), { symbol: "₱", precision: 1 })}</Text>
            </View> */}
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15, marginTop: 10}}>
                <Text>VAT Sales</Text>
                <Text>{formatMoney(calculateTotal()-(calculateTotal()*0.12), { symbol: "₱", precision: 1 })}</Text>
            </View>
           */}
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>VAT Amount</Text>
                <Text>{formatMoney(calculateTotal()*0.12, { symbol: "₱", precision: 1 })}</Text>
            </View> */}
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Cash</Text>
                <Text>{formatMoney(transactions.received, { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Change.</Text>
                <Text>{formatMoney(transactions.received+transactions.change, { symbol: "₱", precision: 2 })}</Text>
            </View> */}
            {/* <View style={{justifyContent:'center', alignItems: 'center', marginVertical: 15}}>
                {/* <Text style={{fontSize: 15, fontWeight:'600'}}>Attendant: {transactions.attendant_name}</Text>
            </View> */}
            <TouchableOpacity onPress={()=> setVisible(true)} style={styles.btn}>
                <Text style={{textAlign:"center", fontSize: 18,color: colors.white, fontWeight:'bold'}}>Accept</Text>
            </TouchableOpacity>
            <ModalInputForm1
             displayComponent={
                 <>
             <TouchableOpacity onPress={()=> setOverlayVisible(true)} style={[styles.btn, {backgroundColor: colors.red, width:'93%'}]}>
                <Text style={{textAlign:"center", fontSize: 18,color: colors.white, fontWeight:'bold'}}>Return</Text>
            </TouchableOpacity>
                 </>
             }
             overlays ={overlayVisible}
             title="Return Product" 
          >
              <Text style={{textAlign:'center'}}>
                Are you sure you want to return this delivery request?
              </Text>
              <View style={{justifyContent:'center', alignItems:'center'}}>
              <TextInput
                style={{width: '80%', height: 45, marginTop: 10}}
                 mode="outlined"
                 label="Reason"
                 placeholder="Reason"
                 onChangeText={(text)=> setReason(text)}
                 />
                 {
                  errorText.length === 0 ? null : 
                  <Text style={{color: colors.red, textAlign: 'center'}}>{errorText}</Text>
                 }
                   <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical: 15}}>
            <View  style={{flex: 1, marginHorizontal: 15}} >
                <Button buttonStyle={{backgroundColor: colors.red}} title="Cancel" onPress={()=> setOverlayVisible(false)}/>
            </View>
            <View  style={{flex: 1, marginHorizontal: 15}} >
             <Button buttonStyle={{backgroundColor: colors.green}}  title="Save" onPress={()=>  reason.length !== 0 ?  onReturnDelivery() : setErrorText('Please fill in return reason.')}/>
            </View>
        </View>
              </View>
            
           </ModalInputForm1>
           
        </ScrollView>
        </View>
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
             <PinCodeInput pinCode={store.password} onCheckPassword={onAcceptRequest}/>
           </View>
       </Overlay>
       <Overlay overlayStyle={{width: '70%', borderRadius: 10}} isVisible={visible3} onBackdropPress={setVisible3}>
       <Text style={{textAlign:'center', fontSize:18, marginBottom: 10}}>
           Return Product?
          </Text>
       <Text style={{textAlign:'center'}}>
            Are you sure you want to return <Text style={{fontWeight:'bold'}}>{item.pr_name}</Text>?
          </Text>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <TextInput
            style={{width: '80%', height: 45, marginTop: 10}}
             mode="outlined"
             label="Reason"
             placeholder="Reason"
             onChangeText={(text)=> setReason1(text)}
             />
             {
              errorText1.length === 0 ? null : 
              <Text style={{color: colors.red, textAlign: 'center'}}>{errorText1}</Text>
             }
              <TextInput
            style={{width: '80%', height: 45, marginTop: 10}}
             mode="outlined"
             label="Quantity"
             placeholder="Quantity"
             onChangeText={(text)=> setQty(text)}
             />
             {
              errorText2.length === 0 ? null : 
              <Text style={{color: colors.red, textAlign: 'center'}}>{errorText2}</Text>
             }
               <View style={{flexDirection:'row', justifyContent:'space-evenly', marginVertical: 15}}>
        <View  style={{flex: 1, marginHorizontal: 15}} >
            <Button buttonStyle={{backgroundColor: colors.red}} title="Cancel" onPress={()=> setOverlayVisible2(false)}/>
        </View>
        <View  style={{flex: 1, marginHorizontal: 15}} >
         <Button buttonStyle={{backgroundColor: colors.green}}  title="Save" onPress={()=> onReturnSingleItem()}/>
        </View>
    </View>
          </View>
       </Overlay>
    </View>
    
  );
};

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor:colors.accent, padding: 10, marginTop: 25,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
  }
});

export default DeliveryRequestDetails;
