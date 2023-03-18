import React, {Component, useEffect, useState} from 'react';
import {ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    NativeModules,
    FlatList,
PermissionsAndroid,
TouchableHighlight} from 'react-native';
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";

import moment from 'moment'
import AppHeader from '../components/AppHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import AntDesign from 'react-native-vector-icons/AntDesign'

import colors from "../themes/colors";

import AlertwithChild from '../components/AlertwithChild';
var {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothSettings =({navigation})=> {


 const  _listeners = [];

  
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFounDs] = useState([]);
    const [bleOpend, setBleOpend] = useState(false);
    const [printerVisible, setPrinterVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [boundAddress, setBA] = useState('');
    const [debugMsg, setDebugMsg] = useState('');
    const [name, setName] = useState('')
    const [selected_address,setSelectedAddress]= useState('')
    const [selected_name,setSelectedName]= useState('')
    const [printerss, setPrinterList] = useState([]);


    const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);


  const print = async() => {
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await BluetoothEscposPrinter.setBlob(0);
    await  BluetoothEscposPrinter.printText("广州俊烨\n\r",{
      encoding:'GBK',
      codepage:0,
      widthtimes:3,
      heigthtimes:3,
      fonttype:1
    });
    await BluetoothEscposPrinter.setBlob(0);
    await  BluetoothEscposPrinter.printText("销售单\n\r",{
      encoding:'GBK',
      codepage:0,
      widthtimes:0,
      heigthtimes:0,
      fonttype:1
    });
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
    await  BluetoothEscposPrinter.printText("客户：零售客户\n\r",{});
    await  BluetoothEscposPrinter.printText("单号：xsd201909210000001\n\r",{});
    await  BluetoothEscposPrinter.printText("日期："+(dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"))+"\n\r",{});
    await  BluetoothEscposPrinter.printText("销售员：18664896621\n\r",{});
    await  BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    let columnWidths = [12,6,6,8];
    await BluetoothEscposPrinter.printColumn(columnWidths,
      [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["商品",'数量','单价','金额'],{});
    await BluetoothEscposPrinter.printColumn(columnWidths,
      [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["React-Native定制开发我是比较长的位置你稍微看看是不是这样?",'1','32000','32000'],{});
        await  BluetoothEscposPrinter.printText("\n\r",{});
      await BluetoothEscposPrinter.printColumn(columnWidths,
      [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["React-Native定制开发我是比较长的位置你稍微看看是不是这样?",'1','32000','32000'],{});
    await  BluetoothEscposPrinter.printText("\n\r",{});
    await  BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    await BluetoothEscposPrinter.printColumn([12,8,12],
      [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.RIGHT],
      ["合计",'2','64000'],{});
    await  BluetoothEscposPrinter.printText("\n\r",{});
    await  BluetoothEscposPrinter.printText("折扣率：100%\n\r",{});
    await  BluetoothEscposPrinter.printText("折扣后应收：64000.00\n\r",{});
    await  BluetoothEscposPrinter.printText("会员卡支付：0.00\n\r",{});
    await  BluetoothEscposPrinter.printText("积分抵扣：0.00\n\r",{});
    await  BluetoothEscposPrinter.printText("支付金额：64000.00\n\r",{});
    await  BluetoothEscposPrinter.printText("结算账户：现金账户\n\r",{});
    await  BluetoothEscposPrinter.printText("备注：无\n\r",{});
    await  BluetoothEscposPrinter.printText("快递单号：无\n\r",{});

    await  BluetoothEscposPrinter.printText("--------------------------------\n\r",{});
    await  BluetoothEscposPrinter.printText("电话：\n\r",{});
    await  BluetoothEscposPrinter.printText("地址:\n\r\n\r",{});
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
    await  BluetoothEscposPrinter.printText("欢迎下次光临\n\r\n\r\n\r",{});
    await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
  }

  console.log(list)
  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }    
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  }

  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
  
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

  const handleDiscoverPeripheral = (peripheral) => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  }

  const testPeripheral = (peripheral) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
                let p = peripherals.get(peripheral.id);
                if (p) {
                  p.rssi = rssi;
                  peripherals.set(peripheral.id, p);
                  setList(Array.from(peripherals.values()));
                }                
              });                                          
            });

            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = '13333333-3333-3333-3333-333333333337';
              var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
              var crustCharacteristic = '13333333-3333-3333-3333-333333330001';
              setTimeout(() => {
                BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
                  console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => {
                    BleManager.write(peripheral.id, service, crustCharacteristic, [0]).then(() => {
                      console.log('Writed NORMAL crust');
                      BleManager.write(peripheral.id, service, bakeCharacteristic, [1,95]).then(() => {
                        console.log('Writed 351 temperature, the pizza should be BAKED');
                        
                        //var PizzaBakeResult = {
                        //  HALF_BAKED: 0,
                        //  BAKED:      1,
                        //  CRISPY:     2,
                        //  BURNT:      3,
                        //  ON_FIRE:    4
                        //};
                      });
                    });
                  }, 500);
                }).catch((error) => {
                  console.log('Notification error', error);
                });
              }, 200);
            });

            

          }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }

  }

  useEffect(() => {
      getPrinterList()
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
          if (result) {
            console.log("Permission is OK");
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("User accept");
              } else {
                console.log("User refuse");
              }
            });
          }
      });
    }  
    
    return (() => {
      console.log('unmount');
      bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
      bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }, []);

  const renderItem = (row) => {
    return (
        <TouchableOpacity key={new Date().getTime()} style={selected_address === row.id ? [styles.wtf,{borderWidth: 1, borderColor: colors.accent}]: styles.wtf} onPress={()=>{              
            setSelectedAddress(row.id)
            setSelectedName(row.name)
}}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
        style={styles.address}>{row.id}</Text></TouchableOpacity>
    );
  }

    const getPrinterList = async() =>{
        const storedArray = await  AsyncStorage.getItem('printer');
        let array = JSON.parse(storedArray)

        if( array === null || !array){
            array = []
        }
     
    setPrinterList(array)
    }
   
   const onSavePrinter = async() => {
    const existingProducts = await AsyncStorage.getItem('printer')

    let newProduct = JSON.parse(existingProducts);
        if( newProduct === null ){
        newProduct = []
        }

    newProduct.push({'name': selected_name, 'address': selected_address})    

    await AsyncStorage.setItem('printer', JSON.stringify(newProduct) )
        .then( ()=>{
        console.log('It was saved successfully')
        } )
        .catch( ()=>{
        console.log('There was an error saving the product')
        } )

    getPrinterList()
    setPrinterVisible(false)
   }

  
    
 


   const _renderRow =(rows)=>{
        let items = [];
        for(let i in rows){
            let row = rows[i];
            if(row.address) {
                items.push(
                    <TouchableOpacity key={new Date().getTime()+i} style={selected_address === row.address ? [styles.wtf,{borderWidth: 1, borderColor: colors.accent}]: styles.wtf} onPress={()=>{
                           
                            setSelectedAddress(row.address)
                            setSelectedName(row.name)
                  {/*  
                   setLoading(true)
                    BluetoothManager.connect(row.address)
                        .then((s)=>{
                            setLoading(false)
                            setBA(row.address)
                            setName(row.name || "UNKNOWN")
                            
                        },(e)=>{
                            setLoading(false)
                            alert(e);
                        }
                    )*/}

                }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                        style={styles.address}>{row.address}</Text></TouchableOpacity>
                );
            }
        }
        return items;
    }

 

    const onCancelCustomDisc = () => {
        setPrinterVisible(false)
    }

        return (
        <View style={{flex: 1}}>
            <AlertwithChild visible={printerVisible} onCancel={onCancelCustomDisc} onProceed={()=>onSavePrinter()} title="Choose Printer"  confirmTitle="SAVE">
                <FlatList
                data={list}
                renderItem={({ item }) => renderItem(item) }
                keyExtractor={item => item.id}
            />     
             <View style={{margin: 10, borderRadius: 20}}>
              <TouchableOpacity
                style={{borderRadius: 20, backgroundColor: colors.statusBarCoverLight, paddingVertical: 7}}
                onPress={() => startScan() } 
              >
                  <Text style={{textAlign:'center', color: colors.white}}>{'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}</Text>
            </TouchableOpacity>           
            </View>
            </AlertwithChild>
             <AppHeader 
          centerText="Bluettoth Settings" 
          leftComponent={
            <TouchableOpacity onPress={()=> navigation.goBack()}>
              <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
            </TouchableOpacity>
          }
        
          gradient

          />
           {/* <TouchableOpacity onPress={BLEControl} style={styles.bleButton}>
                
                {
                    bleOpend ? 
                    <>
                    <FontAwesome name={'bluetooth'} size={20} color={colors.statusBarCoverLight}  style={{marginRight: 10}}/>
                    <Text style={{fontSize: 15, fontWeight: '700', color: colors.statusBarCoverLight}}>Turn Off Bluetooth</Text>
                    </>
                    : <>
                     <FontAwesome name={'bluetooth'} size={25} color={colors.statusBarCoverDark}  style={{marginRight: 10}}/>
                     <Text>Turn ON Bluetooth</Text>
                    </>
               
            </TouchableOpacity> */ }
            <ScrollView style={styles.container}>
                <Text  style={styles.title}>Bluetooth Printers</Text>
          
                <View>
                
                {
                  printerss.map(item => {
                    return(
                        <View>
                        <TouchableOpacity style={styles.printers}  onPress={()=> {
                                 setLoading(true)
                                 BluetoothManager.connect(item.address)
                                     .then((s)=>{
                                         setLoading(false)
                                         setBA(item.address)
                                         setName(item.name || "UNKNOWN")
                                         
                                     },(e)=>{
                                         setLoading(false)
                                         alert(e);
                                     }
                                 )
                            }}>
                            {
                                boundAddress === item.address ?
                                <AntDesign name={'printer'} size={30} color={colors.green} />:
                                <AntDesign name={'printer'} size={30} color={colors.statusBarCoverDark} />
                            }
                            
                            <View style={{flexDirection:'column'}}>
                                <Text>{item.name}</Text>
                                <Text>{item.address}</Text>
                            </View>
                            <TouchableOpacity onPress={()=> {
                                 setLoading(true)
                                 BluetoothManager.connect(item.address)
                                     .then((s)=>{
                                         setLoading(false)
                                         setBA(item.address)
                                         setName(item.name || "UNKNOWN")
                                         
                                     },(e)=>{
                                         setLoading(false)
                                         alert(e);
                                     }
                                 )
                            }}>
                            {
                                boundAddress === item.address ?
                                <Text style={{color: colors.green, fontWeight:'700'}}>Connected</Text>:
                                <Text >Tap to Connect</Text>}
                            </TouchableOpacity>
                           
                        </TouchableOpacity>
                    </View>
                    )
                  
                  })
                }
                
            </View>
               
            </ScrollView>

            <View>
                <TouchableOpacity onPress={()=> setPrinterVisible(true)} style={{backgroundColor: colors.statusBarCoverLight,padding: 15, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize: 18, fontWeight:'700', color:colors.white}}>Add Printer</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
}

export default BluetoothSettings;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },

    title:{
        width:width,
        backgroundColor:"#eee",
        color:"#232323",
        paddingLeft:8,
        paddingVertical:4,
        textAlign:"center",
        fontWeight:'700',
        fontSize: 17
    },
    wtf:{

        flexDirection:'column',
        alignItems:"center", 
        marginVertical: 2,
        marginHorizontal: 2,
        backgroundColor: '#fff',
        paddingVertical: 6,
  
        borderRadius: 3,
        shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 6,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 3,
    },
    name:{
       fontSize: 10
    },
    address:{
        color: 'blue',
        fontSize: 10
    },
    bleButton : {
        backgroundColor: '#fff',
        shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 2,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 2,
    flexDirection:'row', justifyContent:'center', alignItems:'center', marginHorizontal: 10, padding: 15, borderRadius: 10
    },
    printers: {
        flexDirection:'row', 
        borderRadius: 12,
        justifyContent:'space-between', 
        marginHorizontal: 10, 
        marginVertical: 5,
        alignItems:'center',
        backgroundColor:colors.white, 
        padding: 10,
        shadowColor: "#EBECF0",
        shadowOffset: {
          width: 0,
          height: 2,
         
        },
        shadowOpacity: 0.89,
        shadowRadius: 2,
        elevation: 2,
    },
    scrollView: {
        backgroundColor: colors.white,
      },
      engine: {
        position: 'absolute',
        right: 0,
      },
      body: {
        backgroundColor: colors.white,
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.black,
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: colors.black,
      },
      highlight: {
        fontWeight: '700',
      },
      footer: {
        color: colors.black,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
      },
});