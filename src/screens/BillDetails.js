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
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";

const BillDetails = ({navigation, route}) => {
    const { transactions } = route.params;
    const store =  route.params.store
    const {getTRDetails,trdetails } = useStore();


    useEffect(() => {
        getTRDetails(transactions._id)
      },[]);
    
     
      const calculateTotal = () => {
        let total = 0;
        trdetails.forEach(list => {
                total += list.quantity * list.sprice  
        });
       return total;
    }

    const renderItem = ({ item }) => (
        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginVertical: 3}}>
            <Text>{item.name} {Math.round(item.quantity  * 100) / 100} x {Math.round(item.sprice * 100) / 100}</Text>
            <Text>{formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 1 })}</Text>
        </View>
      )

 const printReceipt = async () => {
                try {
                    await BluetoothEscposPrinter.printerInit();
                    await BluetoothEscposPrinter.printerLeftSpace(0);

                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                    await BluetoothEscposPrinter.setBlob(0);
                    await  BluetoothEscposPrinter.printText(`${store.name}\r\n`, {
                        encoding: 'CP437',
                        codepage: 0,
                        widthtimes: 1,
                        heigthtimes: 0,
                        fonttype: 4
                    });
                    await BluetoothEscposPrinter.setBlob(0);
                    await  BluetoothEscposPrinter.printText(`${store.branch}\r\n\r\n`, {
                        encoding: 'CP437',
                        codepage: 0,
                        widthtimes: 0,
                        heigthtimes: 1,
                        fonttype: 3
                    });
                    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                    await  BluetoothEscposPrinter.printText(`Receipt No :        ${transactions.timeStamp} \r\n`,  {
                      encoding: 'CP437',
                      codepage: 0,
                      widthtimes: 0,
                      heigthtimes: 1,
                      fonttype: 3
                  });
                    await  BluetoothEscposPrinter.printText("Date / Time :       " + `${moment.unix(transactions.timeStamp).format('DD MMM YYYY hh:mmA')}` + "\r\n",{
                      encoding: 'CP437',
                      codepage: 0,
                      widthtimes: 0,
                      heigthtimes: 1,
                      fonttype: 3
                  });
                    await  BluetoothEscposPrinter.printText(`Attendant :         ${transactions.attendant_name}\r\n`,  {
                      encoding: 'CP437',
                      codepage: 0,
                      widthtimes: 0,
                      heigthtimes: 1,
                      fonttype: 3
                  });
                  await  BluetoothEscposPrinter.printText("--------------------------------", {});
                    let columnWidths = [35,8];
                    await BluetoothEscposPrinter.printColumn(columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["Description", "Amount"], {
                          encoding: 'CP437',
                          codepage: 15,
                          widthtimes: 0,
                          heigthtimes: 0,
                          fonttype: 1
                        });
                      trdetails.map(async(item,index) => {
                        await BluetoothEscposPrinter.printColumn(columnWidths,
                          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                          [`${item.name} - ${item.brand} ${item.quantity}x${formatMoney(item.sprice, { symbol: "₱", precision: 2 })}   `, `${formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 2 })}`], {
                            encoding: 'CP437',
                            codepage: 15,
                            widthtimes: 0,
                            heigthtimes: 0,
                            fonttype: 1
                          });
                      await  BluetoothEscposPrinter.printText("\r\n", {});
                      });
                  
                    await  BluetoothEscposPrinter.printText("--------------------------------", {});
                    let columnWidthss = [21,6,8, 8];
                    await BluetoothEscposPrinter.printColumn(columnWidthss,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["Total", '','', `${formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}`], {  encoding: 'Cp1254',
                        encoding: 'CP437',
                            codepage: 15,
                            widthtimes: 0,
                            heigthtimes: 0,
                            fonttype: 1});
                    await BluetoothEscposPrinter.printColumn(columnWidthss,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["Cash", '','', `${formatMoney(0, { symbol: "₱", precision: 2 })}`], { 
                          encoding: 'CP437',
                            codepage: 15,
                            widthtimes: 0,
                            heigthtimes: 0,
                            fonttype: 1
                        });
                    await BluetoothEscposPrinter.printColumn(columnWidthss,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                        ["Total", '',' ', `${formatMoney(0, { symbol: "₱", precision: 2 })}`], { 
                          encoding: 'CP437',
                            codepage: 15,
                            widthtimes: 0,
                            heigthtimes: 0,
                            fonttype: 1
                        });
                          
                      await  BluetoothEscposPrinter.printText("\r\n", {});
                } catch (e) {
                    alert(e.message || "ERROR");
            }
   }


  


  return (
    <View style={{flex: 1}}>
        <AppHeader
            centerText="Bill Details"
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
        <ZigzagView
            backgroundColor="#f1f1f1"
            surfaceColor="#FFF"
            contentContainerStyle={{
            justifyContent: "space-between"
            }}
        >
            <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 10}}>
                <Text style={{fontSize: 17, fontWeight:'700'}}>Company Name</Text>
                <Text style={{fontSize: 15}}>Address</Text>
                <Text>Contact</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text style={{fontSize: 16, fontWeight:'600'}}>{transactions.timeStamp}</Text>
                <Text style={{fontSize: 13}}>{moment.unix(transactions.timeStamp).format('DD MMM YYYY hh:mmA')}</Text>
            </View>
            <Divider style={{margin: 10}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30, marginBottom: 15}}>
                <Text>Item</Text>
                <Text>Total</Text>
            </View>
            <FlatList
                keyExtractor={(key) => key.name}
                data={trdetails}
                renderItem={renderItem}
                />
            
            <Divider style={{margin: 10}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Total</Text>
                <Text>{formatMoney(calculateTotal(), { symbol: "₱", precision: 1 })}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Cash</Text>
                <Text>{formatMoney(transactions.received, { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 15}}>
                <Text>Change.</Text>
                <Text>{formatMoney(transactions.change, { symbol: "₱", precision: 2 })}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center', marginVertical: 15}}>
                <Text style={{fontSize: 15, fontWeight:'600'}}>Attendant: {transactions.attendant_name}</Text>
            </View>
        </ZigzagView>
        </View>
        
    </View>
    
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default BillDetails;
