import React, { useEffect } from "react";
import { Text, StyleSheet, View , FlatList, TouchableOpacity} from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../themes/colors";
import { Divider } from "react-native-paper";
import ZigzagView from "react-native-zigzag-view"
import AppHeader from "../components/AppHeader";
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import moment from 'moment'

import { ScrollView } from "react-native";
import uuid from 'react-native-uuid';
import { useAuth } from "../context/AuthContext";
import SearchInput, { createFilter } from 'react-native-search-filter';

const KEYS_TO_FILTERS = ['request_id'];

const DeliveryRequestDetails = ({navigation, route}) => {
    const { request, store } = route.params;
    console.log(request)
    const {user} = useAuth();
    const {  delivery_request,
        delivery_req_details,
      
        createDeliveryReport, 
        createStoreDeliverySummary,
        onSendProducts,
        createtransferLogs,
       } = useStore();

       const filteredDetails = delivery_req_details.filter(createFilter(request._id, KEYS_TO_FILTERS))
    
    const onAcceptRequest = () => {
        delivery_req_details.forEach(items => {
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
        });
        saveToDeliveryReports()
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
       
         delivery_req_details.forEach(items => {
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
         });
       
         
             navigation.goBack()
     
     }
     
     
      const calculateTotal = () => {
        let total = 0;
        delivery_req_details.forEach(list => {
                total += list.stock * list.pr_sprice
        });
       return total;
    }

    const renderItem = ({ item }) => (
        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 3, height: 40,alignItems:"center"}}>
            <Text>{item.pr_name} {Math.round(item.stock  * 100) / 100} x {Math.round(item.pr_sprice * 100) / 100}</Text>
            <Text style={{fontWeight:'bold', justifyContent:'center', alignItems:'center'}}>{formatMoney(item.stock*item.pr_sprice, { symbol: "₱", precision: 1 })}</Text>
         
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
        <View style={{marginHorizontal: 10}}>
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
                <Text style={{ fontSize: 15, fontWeight:"bold"}}>ITEM</Text>
                <Text style={{ fontSize: 15, fontWeight:"bold"}}>TOTAL</Text>
              

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
            <TouchableOpacity onPress={()=> onAcceptRequest()} style={styles.btn}>
                <Text style={{textAlign:"center", fontSize: 18,color: colors.white, fontWeight:'bold'}}>Accept</Text>
            </TouchableOpacity>
          
        </ScrollView>
        </View>
        
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
